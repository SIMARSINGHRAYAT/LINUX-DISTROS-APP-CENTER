#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../MICROSOFT-DESKTOP-APPS/scripts/install-linux-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then exec "$LOCAL_SCRIPT" Google-Apps google-apps 'Google Apps' google-colab.png "$(CDPATH= cd -- "$(dirname "$0")" && pwd)"; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/MICROSOFT-DESKTOP-APPS/scripts/install-linux-app.sh | LINUX_DESKTOP_DISTRO=debian sh -s -- Google-Apps google-apps 'Google Apps' google-colab.png
