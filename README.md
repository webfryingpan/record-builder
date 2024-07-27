# Installation

Install [Docker](https://docs.docker.com/engine/install/)

Clone this project

```bash
git clone https://github.com/webfryingpan/board-manager.git
```

Configure your data in `backend/src/data`

And configure `.env` files!!!

Build with docker-compose

```bash
cd record-builder

docker-compose build
```

Run

```bash
docker-compose up
```

Migrate database

```bash
docker exec builder-backend npx prisma migrate dev --name init
```

Congratulations!
