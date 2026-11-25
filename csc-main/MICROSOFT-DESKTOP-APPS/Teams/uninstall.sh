#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../scripts/uninstall-linux-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then LINUX_DESKTOP_DISTRO=debian exec "$LOCAL_SCRIPT" microsoft-teams 'Microsoft Teams' 'Microsoft Teams' microsoft-teams-desktop; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/MICROSOFT-DESKTOP-APPS/scripts/uninstall-linux-app.sh | LINUX_DESKTOP_DISTRO=debian sh -s -- microsoft-teams 'Microsoft Teams' 'Microsoft Teams' microsoft-teams-desktop