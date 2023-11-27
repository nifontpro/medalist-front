version=1.1
image=web
repo=skaterpunisher
DOCKER_BUILDKIT=1 docker build . --platform=linux/amd64 -t $repo/$image:$version
docker push $repo/$image:$version
ssh artem@nmedalist.ru << EOF
  cd ~/front;
  docker pull $repo/$image:$version
  docker compose up -d
EOF
