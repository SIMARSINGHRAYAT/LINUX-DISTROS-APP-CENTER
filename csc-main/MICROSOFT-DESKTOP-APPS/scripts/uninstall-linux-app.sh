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

case "$DISTRO" in
  deb)
    if [ "$CLEAN_APP_DATA" -eq 1 ]; then
      PACKAGE_STATUS=$($SUDO dpkg-query -W -f='${db:Status-Status}' "$DEB_PACKAGE" 2>/dev/null || true)
      if [ -n "$PACKAGE_STATUS" ] && [ "$PACKAGE_STATUS" != not-installed ]; then
        $SUDO apt-get purge -y "$DEB_PACKAGE"
      fi
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
  for APP_DATA_NAME in "$PRODUCT_NAME" "$APP_PACKAGE_NAME" "$DEB_PACKAGE"; do
    for APP_DATA_ROOT in "$CONFIG_HOME" "$CACHE_HOME" "$DATA_HOME" "$STATE_HOME"; do
      rm -rf "$APP_DATA_ROOT/$APP_DATA_NAME"
    done
  done
  rm -f "$DATA_HOME/applications/$DEB_PACKAGE.desktop"
  rm -f "${XDG_BIN_HOME:-$HOME/.local/bin}/$DEB_PACKAGE"
  rm -rf "$DATA_HOME/linux-desktop-apps/$DEB_PACKAGE"
fi

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "${XDG_DATA_HOME:-$HOME/.local/share}/applications" 2>/dev/null || true
fi

printf '%s\n' "$DISPLAY_NAME uninstalled."