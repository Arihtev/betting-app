# Betting API

## Overview

### Description

This service provides a backend for a betting application, handling user authentication and bet placement functionalities. Key features include:

- Authentication: Secure user login and JWT-based authorization.
- Event Retrieval: Users can view sports events available for betting.
- Bet Placement: Secure handling of user bets, including validations for stake and selections.
- Data Persistence: All user and bet data is stored and managed in a PostgreSQL database for persistence and reliability.

This service is built using TypeScript and Express, with TypeORM for database interactions, ensuring a structured and modular architecture.

### Design Decisions

- **Modular Design**: The server follows a modular architecture, separating concerns into distinct modules such as authentication, bets, events, and users. This ensures scalability and maintainability, making it easier to extend and modify individual parts without affecting the whole system.

- **RESTful API**: The server implements RESTful principles to ensure clear, predictable, and resource-based endpoints. This design provides simplicity and flexibility for both development and client interaction.

- **Error Handling**: Error handling has been implemented to manage different failure scenarios. This includes validation errors, authentication failures, and data retrieval issues, ensuring graceful degradation and helpful error messages.

- **Security**: Input validation and JWT-based authentication and password hashing with bcrypt are employed to ensure data integrity and user protection.

### Endpoints

- `POST - /api/auth`
  - Handles user authentication (login, token generation).
- `GET - /api/events`
  - Allows viewing of sports events available for betting.
- `POST - /api/bets`
  - Enables authorized users to place bets on events with choice selection and stake input.

### Seed data

For convenience, this project includes seed data to help you get started quickly. The seed data populates the database with initial users and events. Three users are created:

- username: `bob` ; password `bob`
- username: `john` ; password `john`
- username: `susan` ; password `susan`

Additionally, six sports events are seeded into the database, including matches such as "Manchester United vs. Liverpool" and "Real Madrid vs. Barcelona," along with various basketball games. Each event entry includes details for the type of sport, competing teams, odds for each outcome (team A win, team B win, draw), and the scheduled date and time of the event. This setup allows you to test the application without needing to manually input data.

## How to Run the Server

### Pre-requisites

1. **Clone the Repository**:

  ```sh
  git clone https://github.com/Arihtev/betting-app.git
  cd backend
  ```

2. **Install Dependencies**:

  ```sh
  npm install
  ```

3. **Set Environment Variables**:

  Create a `.env` file in the root directory and add the necessary environment variables (or copy the `.env.example` file and replace with your values):
  
  ```env
  DB_CONNECTION_URL=postgres://{username}:{password}@{host}:{port}/{database_name}
  API_PORT=3000
  JWT_SECRET='secret'
  ```

### Running the server

You have multiple options to run the server:

#### Using npm

- **Run in production mode**:

  ```sh
  npm start
  ```

- **Run in development mode**:

  ```sh
  npm run start:dev
  ```

#### Using Docker Compose

This will start both the database and the API without the need of any further setup

- **Run the Docker Compose setup**:

  ```sh
  docker-compose up
  ```

- **Stop the Docker Compose setup**:

  ```sh
  docker-compose down
  ```

#### Using Docker

```Note: This process is automated if using the docker-compose option```

This step requires manually setting up a DB

- on your local Postgres service and updating the connection string in `.env` accordingly or
- a dockerized DB where additional setup for network is needed to allow `betting_api` container to connect to your `db` container

1. **Build the Docker image**:

  ```sh
  docker build -t betting_api .
  ```

2. **Run the Docker container**:

  ```sh
  docker run betting_api
  ```

## Running tests

### Pre-requisites

1. **Install Dependencies**:

  Ensure you have all the necessary dependencies installed:

  ```sh
  npm install
  ```

2. **Set Environment Variables**:
  Make sure your `.env` file is correctly set up with the necessary environment variables.

### Running the tests

  ```sh
  npm test
  ```

  or in watch mode:

  ```sh
  npm run test:watch
  ```

### Running single test suites

  ```sh
  npm test -- -g 'Test suite name'
  ...
  # e.g.
  npm test -- -g 'AuthService'
  ```
