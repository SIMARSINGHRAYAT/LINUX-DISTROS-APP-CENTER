#!/bin/sh
set -eu

if [ "$#" -ne 4 ]; then
  printf '%s\n' "Usage: $0 APP_ID DISPLAY_NAME APP_URL PROFILE_NAME" >&2
  exit 2
fi

APP_ID=$1
DISPLAY_NAME=$2
APP_URL=$3
PROFILE_NAME=$4

for browser in google-chrome google-chrome-stable chromium chromium-browser; do
  if command -v "$browser" >/dev/null 2>&1; then
    break
  fi
done

if ! command -v "$browser" >/dev/null 2>&1; then
  printf '%s\n' 'Install Google Chrome or Chromium before installing this app.' >&2
  exit 127
fi

PROFILE_DIR=${SOCIAL_APP_PROFILE_DIR:-${XDG_CONFIG_HOME:-$HOME/.config}/linux-desktop-apps/$PROFILE_NAME}
APPLICATION_DIR=${XDG_DATA_HOME:-$HOME/.local/share}/applications
DESKTOP_FILE=$APPLICATION_DIR/$APP_ID.desktop
mkdir -p "$PROFILE_DIR" "$APPLICATION_DIR"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=$DISPLAY_NAME
Comment=$DISPLAY_NAME web app
Exec=$browser --app=$APP_URL --user-data-dir=$PROFILE_DIR --no-first-run --no-default-browser-check --disable-gpu --class=$APP_ID
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
