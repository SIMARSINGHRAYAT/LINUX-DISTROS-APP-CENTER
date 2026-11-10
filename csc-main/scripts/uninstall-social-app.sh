#!/bin/sh
set -eu

if [ "$#" -ne 2 ]; then
  printf '%s\n' "Usage: $0 APP_ID PROFILE_NAME" >&2
  exit 2
fi

APP_ID=$1
PROFILE_NAME=$2
rm -f "${XDG_DATA_HOME:-$HOME/.local/share}/applications/$APP_ID.desktop"
rm -f "${XDG_DATA_HOME:-$HOME/.local/share}/icons/linux-desktop-apps/$APP_ID.png"
rm -rf "${SOCIAL_APP_PROFILE_DIR:-${XDG_CONFIG_HOME:-$HOME/.config}/linux-desktop-apps/$PROFILE_NAME}"
if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "${XDG_DATA_HOME:-$HOME/.local/share}/applications" 2>/dev/null || true
fi
printf '%s\n' "$APP_ID uninstalled."
