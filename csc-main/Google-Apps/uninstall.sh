#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../scripts/uninstall-linux-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then exec "$LOCAL_SCRIPT" google-apps 'Google Apps'; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/scripts/uninstall-linux-app.sh | sh -s -- google-apps 'Google Apps'
