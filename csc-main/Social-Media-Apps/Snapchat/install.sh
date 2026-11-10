#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../../scripts/install-social-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then exec "$LOCAL_SCRIPT" snapchat 'Snapchat' 'https://web.snapchat.com/' snapchat; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/scripts/install-social-app.sh | sh -s -- snapchat 'Snapchat' 'https://web.snapchat.com/' snapchat
