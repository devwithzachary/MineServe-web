MineServe Official APT Repository (Debian / Ubuntu)

Install commands:
  curl -fsSL https://mineserve.app/apt/mineserve-archive-keyring.gpg | sudo tee /usr/share/keyrings/mineserve-archive-keyring.gpg >/dev/null
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mineserve-archive-keyring.gpg] https://mineserve.app/apt stable main" | sudo tee /etc/apt/sources.list.d/mineserve.list >/dev/null
  sudo apt-get update && sudo apt-get install mineserve
