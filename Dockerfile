FROM node:12-alpine

WORKDIR /root/src

COPY . .

RUN npm install

CMD ["npm", "start"]