branch=develop_keycloak_Artem
ssh web@92.53.119.253 << EOF
  cd ~/front;
  git pull
  git checkout $branch
  rm .env.local

  npm i
  npm run build
  pm2 restart medals
  pm2 save
EOF
