FROM node:20-buster

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . /app

EXPOSE 3000:3000
# CMD ["npm", "run", "dev"]
RUN ["npm","run","build"]
CMD ["npm", "start"]
