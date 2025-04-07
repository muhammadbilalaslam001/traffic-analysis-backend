# Traffic Analysis App Backend

A Node.js backend service for traffic analysis, built with Express.js, TypeScript, and PostgreSQL.

## System Architecture

The application follows a modern microservices architecture with the following components:

- **Backend Service**: Node.js/Express.js application written in TypeScript
- **Database**: PostgreSQL for data persistence
- **ORM**: Prisma for database operations and migrations
- **Containerization**: Docker and Docker Compose for easy deployment
- **Testing**: Jest for unit and integration tests

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Setup Instructions

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd traffic-analysis-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgresql://postgres:123456@localhost:5432/traffic_db
   PORT=4000
   NODE_ENV=development
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Deployment

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at `http://localhost:4000`

## Available Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the TypeScript application
- `npm run start:dev`: Start development server with nodemon
- `npm run start:prod`: Start production server
- `npm test`: Run tests

## API Documentation

The API documentation will be available at `/api-docs` when the server is running.

## Testing

Run the test suite:
```bash
npm test
```
