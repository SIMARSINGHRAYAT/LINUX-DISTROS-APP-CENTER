#!/bin/sh
set -eu

if [ "$#" -ne 2 ] && [ "$#" -ne 4 ]; then
  printf '%s\n' "Usage: $0 DEB_PACKAGE DISPLAY_NAME [PRODUCT_NAME PACKAGE_NAME]" >&2
  exit 2
fi

DEB_PACKAGE=$1
DISPLAY_NAME=$2
CLEAN_APP_DATA=0
if [ "$#" -eq 4 ]; then
  PRODUCT_NAME=$3
  APP_PACKAGE_NAME=$4
  CLEAN_APP_DATA=1
  for APP_DATA_NAME in "$PRODUCT_NAME" "$APP_PACKAGE_NAME" "$DEB_PACKAGE"; do
    case "$APP_DATA_NAME" in
      ''|.|..|*/*)
        printf '%s\n' 'Application data names must be non-empty directory names.' >&2
        exit 2
        ;;
    esac
  done
  PRODUCT_PACKAGE_NAME=$(printf '%s' "$PRODUCT_NAME" |
    tr '[:upper:]' '[:lower:]' |
    sed 's/[^a-z0-9][^a-z0-9]*/-/g; s/^-//; s/-$//')
fi

if [ -r /etc/os-release ]; then
  . /etc/os-release
fi
RAW_DISTRO=${LINUX_DESKTOP_DISTRO:-${ID:-}}
RAW_DISTRO=$(echo "$RAW_DISTRO" | tr '[:upper:]' '[:lower:]')

case "$RAW_DISTRO" in
  ubuntu|debian|mint|linuxmint)
    DISTRO="deb"
    ;;
  kali)
    DISTRO="kali"
    ;;
  fedora)
    DISTRO="fedora"
    ;;
  arch|archlinux|manjaro|endeavouros)
    DISTRO="arch"
    ;;
  *)
    if command -v apt-get >/dev/null 2>&1; then
      DISTRO="deb"
    elif command -v dnf >/dev/null 2>&1; then
      DISTRO="fedora"
    elif command -v pacman >/dev/null 2>&1; then
      DISTRO="arch"
    else
      DISTRO="appimage"
    fi
    ;;
esac

if [ "$(id -u)" -eq 0 ]; then
  SUDO=
elif command -v sudo >/dev/null 2>&1; then
  SUDO=sudo
else
  SUDO=
fi

if [ "$CLEAN_APP_DATA" -eq 0 ]; then
  rm -f "${XDG_DATA_HOME:-$HOME/.local/share}/applications/$DEB_PACKAGE.desktop"
  rm -f "${XDG_BIN_HOME:-$HOME/.local/bin}/$DEB_PACKAGE"
  rm -rf "${XDG_DATA_HOME:-$HOME/.local/share}/linux-desktop-apps/$DEB_PACKAGE"
elif [ "$DISTRO" != deb ]; then
  printf '%s\n' 'Microsoft app data cleanup is supported only for Debian packages.' >&2
  exit 1
elif [ -z "$SUDO" ] && [ "$(id -u)" -ne 0 ]; then
  printf '%s\n' 'Install sudo or run as root to purge the Debian package.' >&2
  exit 1
elif ! command -v apt-get >/dev/null 2>&1 || ! command -v dpkg-query >/dev/null 2>&1; then
  printf '%s\n' 'apt-get and dpkg-query are required to uninstall this Debian package.' >&2
  exit 1
fi

stop_package_processes() {
  PACKAGE_FILES=$($SUDO dpkg-query -L "$1")
  PACKAGE_EXECUTABLES=$(
    printf '%s\n' "$PACKAGE_FILES" |
      while IFS= read -r PACKAGE_FILE; do
        if [ -f "$PACKAGE_FILE" ] && [ -x "$PACKAGE_FILE" ]; then
          readlink -f "$PACKAGE_FILE" 2>/dev/null || {
            printf 'Could not resolve installed executable: %s\n' "$PACKAGE_FILE" >&2
            exit 1
          }
        fi
      done
  )

  [ -n "$PACKAGE_EXECUTABLES" ] || return 0
  for PROCESS_DIR in /proc/[0-9]*; do
    [ -e "$PROCESS_DIR/exe" ] || continue
    PROCESS_EXE=$(readlink -f "$PROCESS_DIR/exe" 2>/dev/null || true)
    if [ -n "$PROCESS_EXE" ] &&
      printf '%s\n' "$PACKAGE_EXECUTABLES" | grep -Fqx -- "$PROCESS_EXE"; then
      PROCESS_PID=${PROCESS_DIR#/proc/}
      PROCESS_UID=$(ps -o uid= -p "$PROCESS_PID" 2>/dev/null |
        sed 's/^[[:space:]]*//; s/[[:space:]]*$//')
      [ "$PROCESS_UID" = "$(id -u)" ] || continue
      if ! kill -TERM "$PROCESS_PID" 2>/dev/null; then
        [ -e "$PROCESS_DIR/exe" ] || continue
        printf 'Could not stop %s process %s.\n' "$DISPLAY_NAME" "$PROCESS_PID" >&2
        return 1
      fi
      for WAIT in 1 2 3 4 5; do
        [ -e "$PROCESS_DIR/exe" ] || break
        sleep 1
      done
      if [ -e "$PROCESS_DIR/exe" ]; then
        if ! kill -KILL "$PROCESS_PID" 2>/dev/null && [ -e "$PROCESS_DIR/exe" ]; then
          printf 'Could not force-stop %s process %s.\n' "$DISPLAY_NAME" "$PROCESS_PID" >&2
          return 1
        fi
      fi
    fi
  done
}

case "$DISTRO" in
  deb)
    if [ "$CLEAN_APP_DATA" -eq 1 ]; then
      for PACKAGE_CANDIDATE in "$DEB_PACKAGE" "$APP_PACKAGE_NAME" "$PRODUCT_PACKAGE_NAME"; do
        PACKAGE_STATUS=$($SUDO dpkg-query -W -f='${db:Status-Status}' "$PACKAGE_CANDIDATE" 2>/dev/null || true)
        if [ -n "$PACKAGE_STATUS" ] && [ "$PACKAGE_STATUS" != not-installed ]; then
          stop_package_processes "$PACKAGE_CANDIDATE"
          $SUDO apt-get purge -y "$PACKAGE_CANDIDATE"
        fi
      done
    elif [ -n "$SUDO" ] || [ "$(id -u)" -eq 0 ]; then
      $SUDO apt-get remove -y "$DEB_PACKAGE" 2>/dev/null || true
    fi
    ;;
  fedora)
    if [ -n "$SUDO" ] || [ "$(id -u)" -eq 0 ]; then
      if command -v dnf >/dev/null 2>&1; then
        $SUDO dnf remove -y "$DEB_PACKAGE" 2>/dev/null || true
      elif command -v rpm >/dev/null 2>&1; then
        $SUDO rpm -e "$DEB_PACKAGE" 2>/dev/null || true
      fi
    fi
    ;;
  arch)
    if [ -n "$SUDO" ] || [ "$(id -u)" -eq 0 ]; then
      if command -v pacman >/dev/null 2>&1; then
        $SUDO pacman -R --noconfirm "$DEB_PACKAGE" 2>/dev/null || true
      fi
    fi
    ;;
esac

if [ "$CLEAN_APP_DATA" -eq 1 ]; then
  CONFIG_HOME=${XDG_CONFIG_HOME:-$HOME/.config}
  CACHE_HOME=${XDG_CACHE_HOME:-$HOME/.cache}
  DATA_HOME=${XDG_DATA_HOME:-$HOME/.local/share}
  STATE_HOME=${XDG_STATE_HOME:-$HOME/.local/state}
  BIN_HOME=${XDG_BIN_HOME:-$HOME/.local/bin}
  for APP_DATA_NAME in "$PRODUCT_NAME" "$APP_PACKAGE_NAME" "$DEB_PACKAGE" "$PRODUCT_PACKAGE_NAME"; do
    for APP_DATA_ROOT in "$CONFIG_HOME" "$CACHE_HOME" "$DATA_HOME" "$STATE_HOME"; do
      rm -rf "$APP_DATA_ROOT/$APP_DATA_NAME"
    done
    rm -f "$DATA_HOME/applications/$APP_DATA_NAME.desktop"
    rm -f "$BIN_HOME/$APP_DATA_NAME"
    rm -rf "$DATA_HOME/linux-desktop-apps/$APP_DATA_NAME"
  done
fi

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "${XDG_DATA_HOME:-$HOME/.local/share}/applications" 2>/dev/null || true
fi

printf '%s\n' "$DISPLAY_NAME uninstalled."