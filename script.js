const MICROSOFT_APP_BASE_URL = 'https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/MICROSOFT-DESKTOP-APPS';

function microsoftCommands(appDirectory) {
  const command = (action, distro) => `curl -fsSL ${MICROSOFT_APP_BASE_URL}/${appDirectory}/${action}.sh | LINUX_DESKTOP_DISTRO=${distro} bash`;
  return {
    ubuntuInstall: command('install', 'ubuntu'),
    ubuntuUninstall: command('uninstall', 'ubuntu'),
    debianInstall: command('install', 'debian'),
    debianUninstall: command('uninstall', 'debian')
  };
}

const microsoftAppCommands = {
  teams: microsoftCommands('Teams'),
  powerbi: microsoftCommands('PowerBI'),
  outlook: microsoftCommands('Outlook'),
  powerAutomate: microsoftCommands('PowerAutomate'),
  powerApps: microsoftCommands('PowerApps'),
  azure: microsoftCommands('Azure'),
  onedrive: microsoftCommands('OneDrive'),
  whiteboard: microsoftCommands('Whiteboard')
};

const SOCIAL_APP_BASE_URL = 'https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Social-Media-Apps';

function socialCommands(appDirectory) {
  const base = `${SOCIAL_APP_BASE_URL}/${appDirectory}`;
  const installCommand = `curl -fsSL ${base}/install.sh | LINUX_DESKTOP_DISTRO=debian bash`;
  const uninstallCommand = `curl -fsSL ${base}/uninstall.sh | bash`;
  return {
    commands: {
      debianInstall: installCommand,
      debianUninstall: uninstallCommand
    },
    installCommand,
    uninstallCommand
  };
}

const categories = [
  {
    id: 'top-ai-dev-apps',
    name: 'Top 10 AI Developer Apps',
    description: 'Developer tools for coding, AI, and ML workflows.',
    apps: [
      { name: 'GitHub', slug: 'github', icon: './csc-main/logo/github.png', readme: './csc-main/Top-10-AI-Developer-Apps/GitHub/README.md', commands: { ubuntuInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitHub/install.sh | bash', ubuntuUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitHub/uninstall.sh | bash', debianInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitHub/install.sh | bash', debianUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitHub/uninstall.sh | bash', kaliInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitHub/install.sh | bash', kaliUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitHub/uninstall.sh | bash' } },
      { name: 'GitHub Desktop', slug: 'github-desktop', icon: './csc-main/logo/github.png', readme: './csc-main/Top-10-AI-Developer-Apps/GitHub Desktop/README.md', installCommand: 'cd ~/Downloads && sudo apt install -y ./GitHubDesktop-linux-amd64-3.4.13-linux1.deb && echo "GitHub Desktop installed successfully." && /usr/bin/github-desktop', uninstallCommand: 'sudo apt remove -y github-desktop || sudo dpkg -r github-desktop' },
      { name: 'GitLab', slug: 'gitlab', icon: './csc-main/logo/gitlab.png', readme: './csc-main/Top-10-AI-Developer-Apps/GitLab/README.md', commands: { ubuntuInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitLab/install.sh | bash', ubuntuUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitLab/uninstall.sh | bash', debianInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitLab/install.sh | bash', debianUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitLab/uninstall.sh | bash', kaliInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitLab/install.sh | bash', kaliUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GitLab/uninstall.sh | bash' } },
      { name: 'Kaggle', slug: 'kaggle', icon: './csc-main/logo/Kaggle.png', readme: './csc-main/Top-10-AI-Developer-Apps/Kaggle/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Kaggle/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Kaggle/uninstall.sh | bash' },
      { name: 'Jupyter', slug: 'jupyter', icon: './csc-main/logo/jupyter.png', readme: './csc-main/Top-10-AI-Developer-Apps/Jupyter/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Jupyter/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Jupyter/uninstall.sh | bash' },
      { name: 'LeetCode', slug: 'leetcode', icon: './csc-main/logo/leetcode.png', readme: './csc-main/Top-10-AI-Developer-Apps/LeetCode/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/LeetCode/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/LeetCode/uninstall.sh | bash' },
      { name: 'Hugging Face', slug: 'hugging-face', icon: './csc-main/logo/hugging-face.png', readme: './csc-main/Top-10-AI-Developer-Apps/HuggingFace/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/HuggingFace/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/HuggingFace/uninstall.sh | bash' },
      { name: 'Google Colab', slug: 'google-colab', icon: './csc-main/logo/google-colab.png', readme: './csc-main/Top-10-AI-Developer-Apps/GoogleColab/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GoogleColab/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/GoogleColab/uninstall.sh | bash' },
      { name: 'Roboflow', slug: 'roboflow', icon: './csc-main/logo/Roboflow.png', readme: './csc-main/Top-10-AI-Developer-Apps/Roboflow/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Roboflow/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Roboflow/uninstall.sh | bash' },
      { name: 'Codeforces', slug: 'codeforces', icon: './csc-main/logo/codeforces.png', readme: './csc-main/Top-10-AI-Developer-Apps/Codeforces/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Codeforces/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Top-10-AI-Developer-Apps/Codeforces/uninstall.sh | bash' }
    ]
  },
  {
    id: 'ai-apps',
    name: 'AI Apps',
    description: 'Desktop AI assistants and chat applications for Linux.',
    apps: [
      { name: 'Qwen', slug: 'qwen', icon: './ai/Qwen/icon.svg', readme: './ai/Qwen/README.md', commands: { ubuntuInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/484161a66e5fd8f2e550a1ebf8fcac7fa65c36fe/ai/Qwen/install.sh | LINUX_DESKTOP_DISTRO=ubuntu sh', ubuntuUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/uninstall.sh | sh', debianInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/484161a66e5fd8f2e550a1ebf8fcac7fa65c36fe/ai/Qwen/install.sh | LINUX_DESKTOP_DISTRO=debian sh', debianUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/uninstall.sh | sh', kaliInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/484161a66e5fd8f2e550a1ebf8fcac7fa65c36fe/ai/Qwen/install.sh | LINUX_DESKTOP_DISTRO=kali sh', kaliUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/uninstall.sh | sh' } },
      { name: 'Kimi', slug: 'kimi', icon: './ai/Kimi/logo.svg', readme: './ai/Kimi/README.md', commands: { ubuntuInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/install.sh?v=node22 | LINUX_DESKTOP_DISTRO=ubuntu sh', ubuntuUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/uninstall.sh | LINUX_DESKTOP_DISTRO=ubuntu sh', debianInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/install.sh?v=node22 | LINUX_DESKTOP_DISTRO=debian sh', debianUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/uninstall.sh | LINUX_DESKTOP_DISTRO=debian sh', kaliInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/install.sh?v=node22 | LINUX_DESKTOP_DISTRO=kali sh', kaliUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/uninstall.sh | LINUX_DESKTOP_DISTRO=kali sh' } },
      { name: 'Copilot', slug: 'copilot', icon: './ai/Copilot/logo.svg', readme: './ai/Copilot/README.md', commands: { ubuntuInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/install.sh?v=2f264cd | LINUX_DESKTOP_DISTRO=ubuntu sh', ubuntuUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/uninstall.sh | sh', debianInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/install.sh?v=2f264cd | LINUX_DESKTOP_DISTRO=debian sh', debianUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/uninstall.sh | sh', kaliInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/install.sh?v=2f264cd | LINUX_DESKTOP_DISTRO=kali sh', kaliUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/uninstall.sh | sh' } },
      { name: 'Meta AI', slug: 'meta-ai', icon: './ai/Meta%20AI/icon.png', readme: './ai/Meta%20AI/README.md', commands: { ubuntuInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/install.sh | LINUX_DESKTOP_DISTRO=ubuntu sh', ubuntuUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/uninstall.sh | sh', debianInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/install.sh | LINUX_DESKTOP_DISTRO=debian sh', debianUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/uninstall.sh | sh', kaliInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/install.sh | LINUX_DESKTOP_DISTRO=kali sh', kaliUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/uninstall.sh | sh' } },
      { name: 'Grok', slug: 'grok', icon: './ai/Grok/logo.png', readme: './ai/Grok/README.md', url: 'https://grok.com', commands: { ubuntuInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/install.sh | LINUX_DESKTOP_DISTRO=ubuntu sh', ubuntuUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/uninstall.sh | sh', debianInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/install.sh | LINUX_DESKTOP_DISTRO=debian sh', debianUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/uninstall.sh | sh', kaliInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/install.sh | LINUX_DESKTOP_DISTRO=kali sh', kaliUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/uninstall.sh | sh' } }
    ]
  },
  {
    id: 'microsoft-apps',
    name: 'Microsoft Apps',
    description: 'Official productivity apps for Linux desktop workflows.',
    apps: [
      {
        name: 'Microsoft Teams',
        slug: 'teams',
        icon: './csc-main/logo/Microsoft_Office_Teams_Logo_512px.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/Teams/README.md',
        commands: microsoftAppCommands.teams
      },
      {
        name: 'Power BI',
        slug: 'powerbi',
        icon: './csc-main/logo/Microsoft-Power-Bi--Streamline-Svg-Logos.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/PowerBI/README.md',
        commands: microsoftAppCommands.powerbi
      },
      {
        name: 'Outlook',
        slug: 'outlook',
        icon: './csc-main/logo/Microsoft_Office_Outlook_Logo_512px.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/Outlook/README.md',
        commands: microsoftAppCommands.outlook
      },
      {
        name: 'Power Automate',
        slug: 'power-automate',
        icon: './csc-main/logo/icons8-microsoft-power-automate-2020-96.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/PowerAutomate/README.md',
        description: 'Build and manage workflows in the official Power Automate portal.',
        url: 'https://make.powerautomate.com/',
        websiteUrl: 'https://www.microsoft.com/en-in/power-platform/products/power-automate',
        commands: microsoftAppCommands.powerAutomate
      },
      {
        name: 'Power Apps',
        slug: 'power-apps',
        icon: './csc-main/logo/icons8-microsoft-power-apps-2020-96.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/PowerApps/README.md',
        description: 'Build and use business apps in the official Power Apps portal.',
        url: 'https://make.powerapps.com/',
        websiteUrl: 'https://www.microsoft.com/en-in/power-platform/products/power-apps',
        commands: microsoftAppCommands.powerApps
      },
      {
        name: 'Microsoft Azure',
        slug: 'azure',
        icon: './csc-main/logo/microsoft-azure.svg',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/Azure/README.md',
        url: 'https://portal.azure.com',
        commands: microsoftAppCommands.azure
      },
      {
        name: 'Microsoft OneDrive',
        slug: 'onedrive',
        icon: './csc-main/logo/Microsoft-Onedrive--Streamline-Svg-Logos.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/OneDrive/README.md',
        description: 'Store, access, and share files online with Microsoft OneDrive.',
        url: 'https://www.microsoft365.com/launch/onedrive',
        websiteUrl: 'https://www.microsoft.com/en-in/microsoft-365/onedrive/online-cloud-storage',
        actionLabel: 'Open OneDrive',
        commands: microsoftAppCommands.onedrive
      },
      {
        name: 'Whiteboard',
        slug: 'whiteboard',
        icon: './csc-main/logo/Microsoft-whiteboard-94.png',
        readme: './csc-main/MICROSOFT-DESKTOP-APPS/Whiteboard/README.md',
        commands: microsoftAppCommands.whiteboard
      }
    ]
  },
  {
    id: 'streaming-apps',
    name: 'Streaming Apps',
    description: 'Entertainment and video streaming apps packaged for Linux.',
    apps: [
      { name: 'Netflix', slug: 'netflix', icon: './csc-main/logo/netflix.png', readme: './csc-main/Streaming-Apps/Netflix/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/Netflix/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/Netflix/uninstall.sh | bash' },
      { name: 'Prime Video', slug: 'prime-video', icon: './csc-main/logo/prime.png', readme: './csc-main/Streaming-Apps/PrimeVideo/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/PrimeVideo/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/PrimeVideo/uninstall.sh | bash' },
      { name: 'JioHotstar', slug: 'jiohotstar', icon: './csc-main/logo/jiohotstar.png', readme: './csc-main/Streaming-Apps/JioHotstar/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/JioHotstar/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/JioHotstar/uninstall.sh | bash' },
      { name: 'Apple TV', slug: 'appletv', icon: './csc-main/logo/apple-tv.png', readme: './csc-main/Streaming-Apps/AppleTV/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/AppleTV/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/AppleTV/uninstall.sh | bash' },
      { name: 'Crunchyroll', slug: 'crunchyroll', icon: './csc-main/logo/Crunchyroll.png', readme: './csc-main/Streaming-Apps/Crunchyroll/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/Crunchyroll/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/Crunchyroll/uninstall.sh | bash' },
      { name: 'MX Player', slug: 'mxplayer', icon: './csc-main/logo/mx-player.png', readme: './csc-main/Streaming-Apps/MXPlayer/README.md', installCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/MXPlayer/install.sh | bash', uninstallCommand: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Streaming-Apps/MXPlayer/uninstall.sh | bash' }
    ]
  },
  {
    id: 'social-media-apps',
    name: 'Social Media Apps',
    description: 'Persistent desktop launchers for popular social networks.',
    apps: [
      { name: 'WhatsApp', slug: 'whatsapp', icon: './social-app logo/whatsapp.png', readme: './csc-main/Social-Media-Apps/WhatsApp/README.md', ...socialCommands('WhatsApp') },
      { name: 'Telegram', slug: 'telegram', icon: './social-app logo/telegram.png', readme: './csc-main/Social-Media-Apps/Telegram/README.md', ...socialCommands('Telegram') },
      { name: 'Pinterest', slug: 'pinterest', icon: './social-app logo/pinterest.png', readme: './csc-main/Social-Media-Apps/Pinterest/README.md', ...socialCommands('Pinterest') },
      { name: 'Twitter (X)', slug: 'twitter-x', icon: './social-app logo/twitter.png', readme: './csc-main/Social-Media-Apps/Twitter-X/README.md', ...socialCommands('Twitter-X') },
      { name: 'Discord', slug: 'discord', icon: './social-app logo/discord.png', readme: './csc-main/Social-Media-Apps/Discord/README.md', ...socialCommands('Discord') },
      { name: 'Threads', slug: 'threads', icon: './social-app logo/threads.png', readme: './csc-main/Social-Media-Apps/Threads/README.md', ...socialCommands('Threads') },
      { name: 'Instagram', slug: 'instagram', icon: './social-app logo/instagram.png', readme: './csc-main/Social-Media-Apps/Instagram/README.md', ...socialCommands('Instagram') },
      { name: 'WeChat', slug: 'wechat', icon: './social-app logo/wechat.png', readme: './csc-main/Social-Media-Apps/WeChat/README.md', ...socialCommands('WeChat') },
      { name: 'LinkedIn', slug: 'linkedin', icon: './social-app logo/linkedin.png', readme: './csc-main/Social-Media-Apps/LinkedIn/README.md', ...socialCommands('LinkedIn') },
      { name: 'Snapchat', slug: 'snapchat', icon: './social-app logo/snapchat.png', readme: './csc-main/Social-Media-Apps/Snapchat/README.md', ...socialCommands('Snapchat') },
      { name: 'Facebook', slug: 'facebook', icon: './social-app logo/facebook.png', readme: './csc-main/Social-Media-Apps/Facebook/README.md', ...socialCommands('Facebook') }
    ]
  },
  {
    id: 'google-apps',
    name: 'Google Apps',
    description: 'Official Google productivity apps in one desktop hub.',
    apps: [
      { name: 'Google Apps', slug: 'google-apps', icon: './csc-main/logo/google-colab.png', readme: './csc-main/Google-Apps/README.md', commands: { debianInstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Google-Apps/install.sh | LINUX_DESKTOP_DISTRO=debian bash', debianUninstall: 'curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/Google-Apps/uninstall.sh | LINUX_DESKTOP_DISTRO=debian bash' } }
    ]
  },
  {
    id: 'games',
    name: 'Games',
    description: 'Games you can launch from the Linux desktop.',
    apps: [
      {
        name: 'GTA 5',
        slug: 'gta-5',
        icon: './csc-main/logo/games.svg',
        description: 'Launch the GTA 5 web game in an Electron desktop app.',
        url: 'https://v2.fiveplay.lol/launcher.html',
        actionLabel: 'Play GTA 5',
        desktopLauncher: true,
        readme: './csc-main/Games/GTA5/README.md',
        commands: {
          ubuntuInstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/csc-main/Games/GTA5/install.sh | sh',
          ubuntuUninstall: 'curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/csc-main/Games/GTA5/uninstall.sh | sh'
        }
      }
    ]
  }
];

const floatingLogosList = [
  './assets/Glossy Linux Distros App Centre Logo.png',
  './csc-main/logo/apple-tv.png',
  './csc-main/logo/codeforces.png',
  './csc-main/logo/Crunchyroll.png',
  './csc-main/logo/games.svg',
  './csc-main/logo/github.png',
  './csc-main/logo/gitlab.png',
  './csc-main/logo/google-colab.png',
  './csc-main/logo/hugging-face.png',
  './csc-main/logo/jiohotstar.png',
  './csc-main/logo/jupyter.png',
  './csc-main/logo/Kaggle.png',
  './csc-main/logo/leetcode.png',
  './csc-main/logo/microsoft-azure.svg',
  './csc-main/logo/Microsoft-Onedrive--Streamline-Svg-Logos.png',
  './csc-main/logo/icons8-microsoft-power-apps-2020-96.png',
  './csc-main/logo/icons8-microsoft-power-automate-2020-96.png',
  './csc-main/logo/Microsoft-Power-Bi--Streamline-Svg-Logos.png',
  './csc-main/logo/Microsoft-whiteboard-94.png',
  './csc-main/logo/Microsoft_Office_Outlook_Logo_512px.png',
  './csc-main/logo/Microsoft_Office_Teams_Logo_512px.png',
  './csc-main/logo/mx-player.png',
  './csc-main/logo/netflix.png',
  './csc-main/logo/prime.png',
  './csc-main/logo/Roboflow.png',
  './ai/Copilot/icon.png',
  './ai/Copilot/logo.png',
  './ai/Grok/logo.png',
  './ai/Kimi/logo.svg',
  './ai/Meta AI/icon.png',
  './ai/Qwen/icon.svg'
];

function getIconSrc(name) {
  const lookup = {
    github: './csc-main/logo/github.png',
    'github desktop': './csc-main/logo/github.png',
    gitlab: './csc-main/logo/gitlab.png',
    kaggle: './csc-main/logo/Kaggle.png',
    'google colab': './csc-main/logo/google-colab.png',
    'hugging face': './csc-main/logo/hugging-face.png',
    jupyter: './csc-main/logo/jupyter.png',
    leetcode: './csc-main/logo/leetcode.png',
    netflix: './csc-main/logo/netflix.png',
    'prime video': './csc-main/logo/prime.png',
    jiohotstar: './csc-main/logo/jiohotstar.png',
    'apple tv': './csc-main/logo/apple-tv.png',
    crunchyroll: './csc-main/logo/Crunchyroll.png',
    mxplayer: './csc-main/logo/mx-player.png',
    'microsoft teams': './csc-main/logo/Microsoft_Office_Teams_Logo_512px.png',
    'power bi': './csc-main/logo/Microsoft-Power-Bi--Streamline-Svg-Logos.png',
    'microsoft onedrive': './csc-main/logo/Microsoft-Onedrive--Streamline-Svg-Logos.png',
    'power apps': './csc-main/logo/icons8-microsoft-power-apps-2020-96.png',
    'power automate': './csc-main/logo/icons8-microsoft-power-automate-2020-96.png',
    whiteboard: './csc-main/logo/Microsoft-whiteboard-94.png',
    outlook: './csc-main/logo/Microsoft_Office_Outlook_Logo_512px.png',
    roboflow: './csc-main/logo/Roboflow.png',
    whatsapp: './social-app logo/whatsapp.png',
    telegram: './social-app logo/telegram.png',
    instagram: './social-app logo/instagram.png',
    linkedin: './social-app logo/linkedin.png',
    snapchat: './social-app logo/snapchat.png',
    facebook: './social-app logo/facebook.png',
    codeforces: './csc-main/logo/codeforces.png',
    'gta 5': './csc-main/logo/games.svg',
    qwen: './ai/Qwen/icon.svg',
    kimi: './ai/Kimi/logo.svg',
    'meta ai': './ai/Meta%20AI/icon.png',
    copilot: './ai/Copilot/logo.png',
    grok: './ai/Grok/logo.png'
  };
  return lookup[String(name).toLowerCase()] || './csc-main/logo/github.png';
}

function buildFloatingLogos() {
  const container = document.getElementById('floating-logos');
  if (!container || !document.body.classList.contains('landing-page')) return;
  container.innerHTML = '';

  const total = 40;
  for (let i = 0; i < total; i++) {
    const item = floatingLogosList[i % floatingLogosList.length];
    const logo = document.createElement('div');
    const img = document.createElement('img');
    logo.className = 'logo-float';
    img.src = item;
    img.alt = 'App Logo';

    const col = (i / total) * 100 + (Math.random() * 4 - 2);
    const duration = 8.5 + Math.random() * 8.5; // 8.5s to 17s
    const delay = -(Math.random() * duration); // negative delay so they are falling immediately
    const size = 66 + Math.floor(Math.random() * 20); // 66px to 86px
    const imgSize = Math.floor(size * 0.58);

    logo.style.left = `${Math.max(1, Math.min(94, col))}%`;
    logo.style.width = `${size}px`;
    logo.style.height = `${size}px`;
    logo.style.animationDuration = `${duration}s`;
    logo.style.animationDelay = `${delay}s`;
    img.style.width = `${imgSize}px`;
    img.style.height = `${imgSize}px`;

    logo.appendChild(img);
    container.appendChild(logo);
  }
}

function renderCategories() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;

  grid.innerHTML = categories.map((category) => {
    const first = category.apps[0]?.name || 'App';
    const icon = getIconSrc(first);
    return `
      <article class="category-card">
        <div class="icon-wrap">
          <img src="${icon}" alt="${category.name}" />
        </div>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <div class="card-footer">
          <a class="action-btn" href="./apps.html?category=${encodeURIComponent(category.id)}">Open</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderApps() {
  const grid = document.getElementById('apps-grid');
  const title = document.getElementById('app-list-title');
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('category');
  const selected = categories.find((item) => item.id === categoryId) || categories[0];

  if (title) title.textContent = selected.name;

  grid.innerHTML = selected.apps.map((app) => `
    <article class="app-card">
      <div class="app-header">
        <div class="app-icon">
          <img src="${app.icon || getIconSrc(app.name)}" alt="${app.name}" />
        </div>
        <span class="badge">${app.desktopLauncher ? 'Electron app' : 'Linux'}</span>
      </div>
      <h3>${app.name}</h3>
      <p>${escapeHtml(app.description || `Desktop app wrapper for ${app.name}.`)}</p>
      <div class="meta">
        <span></span>
        <a class="action-btn" href="./app.html?app=${encodeURIComponent(app.slug)}&category=${encodeURIComponent(selected.id)}">View</a>
      </div>
    </article>
  `).join('');
}

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

const distroDefinitions = [
  { key: 'ubuntu', name: 'Ubuntu', installKey: 'ubuntuInstall', uninstallKey: 'ubuntuUninstall' },
  { key: 'debian', name: 'Debian', installKey: 'debianInstall', uninstallKey: 'debianUninstall' },
  { key: 'mint', name: 'Linux Mint', installKey: 'mintInstall', uninstallKey: 'mintUninstall' },
  { key: 'fedora', name: 'Fedora Linux', installKey: 'fedoraInstall', uninstallKey: 'fedoraUninstall' },
  { key: 'arch', name: 'Arch Linux', installKey: 'archInstall', uninstallKey: 'archUninstall' },
  { key: 'kali', name: 'Kali Linux', installKey: 'kaliInstall', uninstallKey: 'kaliUninstall' }
];

function buildReadmeBlocks(app) {
  const installCommand = app.installCommand || 'Install command not found.';
  const uninstallCommand = app.uninstallCommand || 'Uninstall command not found.';

  const renderBlock = (label, content, id) => `
    <div class="code-block">
      <header>
        <h3>${label}</h3>
        <button class="copy-btn" aria-label="Copy ${label} command" data-copy="${id}">Copy command</button>
      </header>
      <pre id="${id}">${escapeHtml(content || 'No command available for this section.')}</pre>
    </div>
  `;

  if (app.commands) {
    const commands = app.commands;
    const availableDistros = distroDefinitions.filter(
      (d) => commands[d.installKey] || commands[d.uninstallKey]
    );

    if (availableDistros.length > 0) {
      const tabsHtml = availableDistros.map((d, index) => `
        <button class="distro-tab ${index === 0 ? 'active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-distro-tab="${d.key}">${d.name}</button>
      `).join('');

      const panelsHtml = availableDistros.map((d, index) => `
        <div class="distro-panel ${index === 0 ? 'active' : ''}" data-distro-panel="${d.key}">
          ${renderBlock(`${d.name} installation`, commands[d.installKey], `${d.key}-installation-block`)}
          ${renderBlock(`${d.name} uninstallation`, commands[d.uninstallKey], `${d.key}-uninstallation-block`)}
        </div>
      `).join('');

      return `
        <div class="distro-tabs" role="tablist" aria-label="Choose your Linux distribution">
          ${tabsHtml}
        </div>
        ${panelsHtml}
      `;
    }
  }

  return `
    ${renderBlock('Installation', installCommand, 'installation-block')}
    ${renderBlock('Uninstallation', uninstallCommand, 'uninstallation-block')}
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderAppDetail() {
  const detail = document.getElementById('app-detail');
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const appSlug = params.get('app');
  const categoryId = params.get('category');
  const category = categories.find((item) => item.id === categoryId) || categories[0];
  const app = category.apps.find((item) => item.slug === appSlug) || category.apps[0];

  detail.innerHTML = `
    <article class="app-detail-card">
      <div class="app-detail-header">
        <div class="large-icon">
          <img src="${app.icon || getIconSrc(app.name)}" alt="${app.name}" />
        </div>
        <div>
          <h1>${app.name}</h1>
          <p>${category.name}</p>
        </div>
      </div>

      <div class="detail-actions">
        <a class="back-btn" href="./apps.html?category=${encodeURIComponent(category.id)}">Back to apps</a>
        ${app.url ? `<a class="back-btn" href="${escapeHtml(app.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(app.actionLabel || `Open ${app.name}`)}</a>` : ''}
        ${app.websiteUrl ? `<a class="back-btn" href="${escapeHtml(app.websiteUrl)}" target="_blank" rel="noopener noreferrer">Product information</a>` : ''}
      </div>

      ${app.url && !app.commands && !app.installCommand ? `
        <div class="detail-intro">
          <p class="eyebrow">Online access</p>
          <h2>Use ${escapeHtml(app.name)} online</h2>
          <p>${escapeHtml(app.description || `Open ${app.name} in your browser.`)}</p>
        </div>
      ` : `
        <div class="detail-intro">
          <p class="eyebrow">Installation commands</p>
          <h2>${escapeHtml(app.name)} installation commands</h2>
          <p>Copy a command, paste it into your system terminal, and press Enter. Websites cannot run commands directly on your computer.</p>
        </div>
        <div class="copy-group">
          ${buildReadmeBlocks(app)}
        </div>
      `}
    </article>
  `;

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = button.getAttribute('data-copy');
      const source = document.getElementById(target);
      if (!source) return;
      const original = button.textContent;
      const originalLabel = button.getAttribute('aria-label');
      try {
        await copyText(source.textContent);
      } catch {
        button.textContent = 'Copy failed';
        button.setAttribute('aria-label', 'Copy failed. Select and copy the command manually.');
        button.title = 'Select and copy the command manually.';
        setTimeout(() => {
          button.textContent = original;
          if (originalLabel) button.setAttribute('aria-label', originalLabel);
          button.removeAttribute('title');
        }, 2500);
        return;
      }
      button.textContent = 'Copied';
      button.setAttribute('aria-label', 'Command copied');
      setTimeout(() => {
        button.textContent = original;
        if (originalLabel) button.setAttribute('aria-label', originalLabel);
      }, 1200);
    });
  });

  document.querySelectorAll('[data-distro-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      const distro = button.dataset.distroTab;
      document.querySelectorAll('[data-distro-tab]').forEach((tab) => {
        tab.classList.toggle('active', tab === button);
        tab.setAttribute('aria-selected', String(tab === button));
      });
      document.querySelectorAll('[data-distro-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.distroPanel === distro));
    });
  });
}

async function initSupportPage() {
  const status = document.getElementById('support-status');
  const buttons = [...document.querySelectorAll('[data-support-action]')];
  const continueButton = document.querySelector('.support-continue');
  if (!status || !buttons.length || !continueButton) return;

  const targetRepos = [
    'https://github.com/SIMARSINGHRAYAT/Linux-Shortcut-Center',
    'https://github.com/SIMARSINGHRAYAT/GitHubCrazy.com',
    'https://github.com/SIMARSINGHRAYAT/GitHubUniverse.com',
    'https://github.com/SIMARSINGHRAYAT/GitHubUpgrade.com',
    'https://github.com/SIMARSINGHRAYAT/LINUX-DISTROS-APP-CENTER'
  ];

  const state = { repo: false, profile: false };
  const update = () => {
    buttons.forEach((button) => {
      const done = state[button.dataset.supportAction];
      button.classList.toggle('done', done);
      button.disabled = done;
      const taskState = button.querySelector('.task-state');
      if (taskState) taskState.textContent = done ? '✓' : '○';
    });
    const ready = state.repo && state.profile;
    continueButton.disabled = !ready;
    continueButton.classList.toggle('enabled', ready);
  };

  try {
    const response = await fetch('./api/auth/github/status', { credentials: 'same-origin' });
    if (!response.ok) throw new Error('not authenticated');
    const account = await response.json();
    const isOwner = account.isOwner === true;
    state.repo = isOwner || account.repoStarred === true;
    state.profile = isOwner || account.profileFollowed === true;
    status.textContent = isOwner
      ? `Signed in as @${account.user.login}. Creator access enabled.`
      : `Signed in as @${account.user.login}. Complete both actions below:`;
    buttons.forEach((btn) => (btn.disabled = false));
    update();
  } catch {
    status.textContent = 'Complete both actions below to unlock the dashboard:';
    buttons.forEach((btn) => (btn.disabled = false));
    update();
  }

  buttons.forEach((button) => button.addEventListener('click', async () => {
    const action = button.dataset.supportAction;
    button.disabled = true;
    button.classList.add('loading');
    try {
      const response = await fetch('./api/auth/github/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ action })
      });
      if (!response.ok) throw new Error('support action failed');
      state[action] = true;
      status.textContent = action === 'repo' ? 'All 5 repositories starred on GitHub!' : 'Profile @SIMARSINGHRAYAT followed on GitHub!';
    } catch {
      // Fallback for offline or local preview
      state[action] = true;
      if (action === 'repo') {
        targetRepos.forEach((url) => window.open(url, '_blank'));
        status.textContent = 'All 5 repositories marked & starred!';
      } else {
        window.open('https://github.com/SIMARSINGHRAYAT', '_blank');
        status.textContent = 'Profile @SIMARSINGHRAYAT followed!';
      }
    } finally {
      button.classList.remove('loading');
      update();
    }
  }));

  continueButton.addEventListener('click', () => {
    if (state.repo && state.profile) {
      window.location.href = './categories.html';
    }
  });
}

function initInstantGetStarted() {
  const btn = document.getElementById('get-started-btn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './signin.html';
    });
  }
}

function initSignIn() {
  const button = document.querySelector('.github-signin-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    button.setAttribute('aria-busy', 'true');
    button.classList.add('loading');
    const label = button.querySelector('.github-signin-label');
    if (label) label.textContent = 'Connecting to GitHub...';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initInstantGetStarted();
  initSignIn();
  buildFloatingLogos();
  initSupportPage();
  renderCategories();
  renderApps();
  renderAppDetail();
});
