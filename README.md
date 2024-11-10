# Cinema Scout

Cinema Scout is a NestJS-based application for exploring a cinema database. Currently, it supports only one route (host/films/film-name).

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Seeding the Database](#seeding-the-database)
- [Running Tests](#running-tests)
- [Migrations](#migrations)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/cinema-scout.git
cd cinema-scout
```
2. Install dependencies:
```sh
yarn install
```

3. Copy .env.example to .env and change it based on your needs:
```sh
cp .env.example .env
nvim .env
```

## Running the Application
1. Run Docker and Redis containers:
```sh
docker compose up
```
2. Start the application in development mode:
```sh
yarn start:dev
```

## Seeding the database
1. Download and unzip the zip archive from [here](https://neon.tech/postgresqltutorial/dvdrental.zip).

2. Put the tar archive into the seeder folder.

3. Run the following command:
```sh
yarn seed
```

## Running tests:
1. Run all tests:
```sh
yarn test
```

## Migrations:
1. Generate a new migration:
```sh
yarn migration:generate
```

2. Apply migrations:
```sh
yarn migration:up
```