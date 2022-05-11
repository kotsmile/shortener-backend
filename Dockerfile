FROM node:16 
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma

RUN yarn

COPY . .
RUN yarn build


EXPOSE 3000
CMD yarn serve