FROM node:20-buster
#FROM node:20-bullseye

#ENV NODE_ENV production
#ENV NEXT_TELEMETRY_DISABLED 1

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
# RUN npm install --production
RUN npm install

COPY . /app

ENV KEYCLOAK_URL https://md-auth.ru
ENV APP_URL https://nmedalist.ru
ENV API_SERVER_URL https://nmedalist.ru/api/v1

ENV KEYCLOAK_CLIENT_ID medalist-client
ENV KEYCLOAK_REALM medalist-realm
ENV KEYCLOAK_LOGOUT_URL https://md-auth.ru/realms/medalist-realm/protocol/openid-connect/logout

#EXPOSE 3000:3000
# CMD ["npm", "run", "dev"]
RUN ["npm","run","build"]
CMD ["npm", "start"]

# docker compose build
# docker build . --platform=linux/amd64 -t 8881981/web:1.1
# docker push 8881981/web:1.1
