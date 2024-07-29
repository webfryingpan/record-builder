FROM node:18-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev && yarn

FROM base AS build
COPY . .
COPY --from=install /temp/dev/node_modules node_modules
RUN yarn run build

FROM base AS release
COPY --from=build /usr/src/app/dist/ release/

EXPOSE 3000

CMD ["npx", "serve", "release"]
