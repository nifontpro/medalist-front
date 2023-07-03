FROM node:20-buster

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . /app

ENV KEYCLOAK_URL https://nmedalist.ru:9443
ENV APP_URL https://nmedalist.ru
ENV API_SERVER_URL https://nmedalist.ru:8765

ENV KEYCLOAK_CLIENT_ID='medalist-client'
ENV KEYCLOAK_SECRET='_'
ENV KEYCLOAK_ISSUER='https://nmedalist.ru:9443/realms/medalist-realm'
ENV NEXTAUTH_SECRET='supersecret'

ENV NEXTAUTH_URL=https://nmedalist.ru

EXPOSE 3000:3000
# CMD ["npm", "run", "dev"]
RUN ["npm","run","build"]
CMD ["npm", "start"]
