FROM node:18-alpine AS base
WORKDIR /usr/src/app

FROM base AS dev-dependencies
COPY package.json ./
RUN yarn install

FROM base AS prod-dependencies
COPY package.json prisma ./
RUN yarn install --production && npx prisma generate

FROM base AS build
COPY . .
COPY --from=dev-dependencies /usr/src/app/node_modules ./node_modules
RUN npx prisma generate
RUN yarn run build

FROM base AS release
COPY --from=prod-dependencies /usr/src/app/node_modules ./node_modules
COPY prisma prisma
COPY --from=prod-dependencies /usr/src/app/package.json ./
COPY --from=build /usr/src/app/dist/index.cjs ./dist/
COPY --from=build /usr/src/app/src/data ./data

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start:migration:prod"]
