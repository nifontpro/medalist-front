#docker build . -t 8881981/web:1.1
DOCKER_BUILDKIT=1 docker build . --platform=linux/amd64 -t 8881981/web:1.1
docker push 8881981/web:1.1
#ssh nifont@nmedalist.ru << EOF
#  cd ~/v1/front;
#  docker pull 8881981/web:1.1
#  docker compose up -d
#EOF
