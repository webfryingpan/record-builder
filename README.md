# Board Manager

A project to manage boards using Docker and Prisma.

## Installation

### Prerequisites

1. [Docker](https://docs.docker.com/engine/install/) - Ensure Docker is installed and running on your machine.
2. [Git](https://git-scm.com/downloads) - Ensure Git is installed.

### Steps

### 1. Clone the Repository

```bash
git clone https://github.com/webfryingpan/board-manager.git
```

### 2. Configure Your Data

Modify the data in `backend/src/data` according to your requirements.

### 3. Set Up Environment Variables

Create and configure `.env` files in the appropriate directories:

- For the backend: backend/.env
- For the frontend: frontend/.env

Ensure all necessary environment variables are set correctly.

### 4. Build the Project with Docker Compose

```bash
cd board-manager

docker-compose build
```

### 5. Run the Project

```bash
docker-compose up
```

### 7. Congratulations

Your project should now be up and running.

## Updating the app

### 1. Pull from repository

```bash
git pull
```

### 2. Build

```bash
docker-compose build
```

## Additional Information

### Accessing the Application

The application should be accessible at `http://localhost:PORT` or at `http://YOUR_IP:PORT`

## Troubleshooting

- Docker

  You can administrate your app with Docker desktop app

- Environment Variables

  Double-check that all required environment variables are set correctly in the .env files.

For further assistance, please refer to the project's issues section or contact me.
