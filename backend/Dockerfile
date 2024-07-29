FROM node:18-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev && yarn install

RUN mkdir -p /temp/prod
COPY package.json prisma /temp/prod/
RUN cd /temp/prod && yarn install --production && npx prisma generate

FROM base AS build
COPY . .
COPY --from=install /temp/dev/node_modules node_modules
RUN npx prisma generate
RUN yarn run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY prisma prisma
COPY --from=build /usr/src/app/dist/index.cjs release/
COPY --from=build /usr/src/app/src/data release/data

EXPOSE 3002

CMD ["node", "release/index.cjs"]
