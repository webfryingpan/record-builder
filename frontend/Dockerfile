FROM node:18-alpine AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package.json ./
RUN yarn install

FROM base AS build
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./release/

EXPOSE 3000

CMD ["npx", "serve", "release"]
