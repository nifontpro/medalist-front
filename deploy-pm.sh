branch=develop_keycloak_Artem
ssh web@83.147.244.213 << EOF
  cd ~/front;
  git pull
  git checkout $branch
  npm i
  npm run build
  pm2 restart medals
EOF
