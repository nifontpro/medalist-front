ssh nifont@nmedalist.ru << EOF
  cd ~/v1/front;
  docker pull skaterpunisher/web:1.1
  docker compose up -d
EOF
