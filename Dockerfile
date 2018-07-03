FROM node:alpine

WORKDIR /usr/app

#COPY package*.json ./

RUN npm install -g prisma graphql-cli --unsafe-perm
#RUN npm install --quiet --only=production

COPY . .

#EXPOSE 4000

CMD [ "ping", "-q", "localhost"]