FROM node:20-buster

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . /app

ENV KEYCLOAK_URL https://nmedalist.ru:9443
ENV APP_URL https://nmedalist.ru
ENV API_SERVER_URL https://nmedalist.ru:8765

#EXPOSE 3000:3000
# CMD ["npm", "run", "dev"]
RUN ["npm","run","build"]
CMD ["npm", "start"]

# docker compose build
# docker build . --platform=linux/amd64 -t 8881981/web:1.1
# docker push 8881981/web:1.1
