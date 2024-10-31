# Betting App

## Overview

### Description

The Betting App is a web application designed for users to view and place bets on various sports events. The application allows users to authenticate, view upcoming events, and place bets with detailed odds.

### Features

- User Authentication: Secure login functionality for users to access their accounts.
- Event Listings: View upcoming sports events with detailed information, including teams, odds, and scheduled dates.
- Placing Bets: Users can place bets on their selected events, with real-time updates on odds.
- Responsive Design: A mobile-friendly interface that adapts to various screen sizes.
- Dark Mode: Toggle between light and dark themes for improved usability in different lighting conditions.
- Event filtering: Users can filter the events based on sport type.

### Seed data

For convenience, this project includes seed data to help you get started quickly. The seed data populates the database with initial users and events. Three users are created and ready for use:

- username: `bob` ; password `bob`
- username: `john` ; password `john`
- username: `susan` ; password `susan`

Additionally, six sports events are seeded into the database, including matches such as "Manchester United vs. Liverpool" and "Real Madrid vs. Barcelona," along with various basketball games. Each event entry includes details for the type of sport, competing teams, odds for each outcome (team A win, team B win, draw), and the scheduled date and time of the event. This setup allows you to test the application without needing to manually input data.

## How to Run the App

### Pre-requisites

1. **Clone the Repository**:

  ```sh
  git clone https://github.com/repo.git
  cd frontend
  ```

2. **Install Dependencies**:

  ```sh
  npm install
  ```

3. **Set Environment Variables**:

  Create a `.env` file in the root directory and add the necessary environment variables (or copy the `.env.example` file and replace with your values):
  
  ```env
  VITE_API_BASE_URL=http://localhost:3000/api
  ```

_Note: Make sure the API URL is correct based on the backend configuration._

### Running the application

  ```sh
  npm run dev
  ```

### Building the application

  ```sh
  npm run build
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
  npm test -t 'Test suite name'
  ...
  # e.g.
  npm test -t 'EventInfo'
  ```
