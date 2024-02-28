branch=develop_keycloak_Artem
ssh root@90.156.202.48  << EOF
  cd ~/front;
  git pull
  git checkout $branch
  rm .env.local

  npm i
  npm run build
  pm2 restart medals
  pm2 save
EOF
