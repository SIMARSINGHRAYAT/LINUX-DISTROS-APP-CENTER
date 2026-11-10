#!/bin/sh
set -eu

if [ "$#" -ne 5 ]; then
  printf '%s\n' "Usage: $0 APP_ID DISPLAY_NAME APP_URL PROFILE_NAME LOGO_FILE" >&2
  exit 2
fi

APP_ID=$1
DISPLAY_NAME=$2
APP_URL=$3
PROFILE_NAME=$4
LOGO_FILE=$5

for browser in google-chrome google-chrome-stable chromium chromium-browser; do
  if command -v "$browser" >/dev/null 2>&1; then
    break
  fi
done

if ! command -v "$browser" >/dev/null 2>&1; then
  if [ "${LINUX_DESKTOP_DISTRO:-}" = debian ] && command -v apt-get >/dev/null 2>&1; then
    if [ "$(id -u)" -eq 0 ]; then SUDO=; elif command -v sudo >/dev/null 2>&1; then SUDO=sudo; else
      printf '%s\n' 'sudo is required to install Chromium on Debian.' >&2
      exit 1
    fi
    $SUDO apt-get update
    $SUDO apt-get install -y chromium
    browser=chromium
  else
    printf '%s\n' 'Install Google Chrome or Chromium before installing this app.' >&2
    exit 127
  fi
fi

PROFILE_DIR=${SOCIAL_APP_PROFILE_DIR:-${XDG_CONFIG_HOME:-$HOME/.config}/linux-desktop-apps/$PROFILE_NAME}
APPLICATION_DIR=${XDG_DATA_HOME:-$HOME/.local/share}/applications
DESKTOP_FILE=$APPLICATION_DIR/$APP_ID.desktop
ICON_DIR=${XDG_DATA_HOME:-$HOME/.local/share}/icons/linux-desktop-apps
ICON_PATH=$ICON_DIR/$APP_ID.png
mkdir -p "$PROFILE_DIR" "$APPLICATION_DIR"
mkdir -p "$ICON_DIR"
if [ -f "$(dirname "$0")/../../social-app logo/$LOGO_FILE" ]; then
  cp "$(dirname "$0")/../../social-app logo/$LOGO_FILE" "$ICON_PATH"
else
  curl -fsSL "https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/social-app%20logo/$LOGO_FILE" -o "$ICON_PATH"
fi

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=$DISPLAY_NAME
Comment=$DISPLAY_NAME web app
Exec=$browser --app=$APP_URL --user-data-dir=$PROFILE_DIR --no-first-run --no-default-browser-check --disable-gpu --class=$APP_ID
Icon=$ICON_PATH
Terminal=false
Type=Application
StartupNotify=true
StartupWMClass=$APP_ID
Categories=Network;Social;
EOF

chmod 644 "$DESKTOP_FILE"
if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$APPLICATION_DIR" 2>/dev/null || true
fi

printf '%s\n' "$DISPLAY_NAME installed. Sign in or create an account in the app window."
exec "$browser" --app="$APP_URL" --user-data-dir="$PROFILE_DIR" --no-first-run --no-default-browser-check --disable-gpu --class="$APP_ID"
