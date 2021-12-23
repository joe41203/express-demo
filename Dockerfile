FROM node:17.3-alpine as builder
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY src src
COPY tsconfig.json tsconfig.json
COPY prisma prisma
RUN npx prisma generate
RUN npm run build

FROM node:17.3-alpine
WORKDIR /app
RUN apk update
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
EXPOSE 3000
CMD ["npm", "run", "start"]
