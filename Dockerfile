FROM node:16 
WORKDIR /server

COPY package*.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "serve"]
