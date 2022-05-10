FROM node:16 as builder
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
RUN yarn

COPY . .
RUN yarn build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# CMD ["npx", "prisma", "migrate", "dev","--name", "init"]
CMD yarn serve
