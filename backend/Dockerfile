FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "prod"]