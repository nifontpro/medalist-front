branch=develop_keycloak_Artem
ssh web@83.147.244.213 << EOF
  cd ~/front;
  git pull
  git checkout $branch
  rm .env.local

  npm i
  npm run build
  pm2 restart medals
  pm2 save
EOF
