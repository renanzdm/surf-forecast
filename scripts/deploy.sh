mkdir -p ~/.ssh
echo -e "${SSH_KEY}//_/\\N" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -p  9922 -t rsa kamino.deploy.umbler.com 2>&1 >> ~/.ssh/know_hosts