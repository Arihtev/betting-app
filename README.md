# Betting App

## Overview

### Description

The Betting App is a web application designed for users to view and place bets on various sports events. The application allows users to authenticate, view upcoming events, and place bets with detailed odds. This repository includes both frontend and backend services

### Tech Stack

#### Frontend

- React with TypeScript for a robust, type-safe UI.
- Material UI for a polished and consistent component library.
- React Context for global state management of user authentication.
- Axios for API communication with the backend.

#### Backend

- Node.js and Express for handling RESTful API requests.
- TypeORM as the ORM for managing database interactions.
- PostgreSQL as the primary relational database for storing users, bets, and events.
- bcrypt for secure password hashing.
- JWT for secure user authentication tokens.

### Features

- User Authentication: Secure login functionality for users to access their accounts.
- Event Listings: View upcoming sports events with detailed information, including teams, odds, and scheduled dates.
- Placing Bets: Users can place bets on their selected events, with real-time updates on odds.
- Responsive Design: A mobile-friendly interface that adapts to various screen sizes.
- Dark Mode: Toggle between light and dark themes for improved usability in different lighting conditions.
- Event filtering: Users can filter the events based on sport type.

## Setup
To set up and run the Betting App, follow the instructions provided in each respective folder:

- [Frontend Setup and Instructions](./frontend/README.md)
- [Backend Setup and Instructions](./backend/README.md)

Each README provides step-by-step details for installation, environment configuration, running the application, and testing for both the frontend and backend.

With this setup, you can seamlessly start both servers and interact with the app's features.
