# Demo Express Backend

## Description

This project demonstrates backend service using NodeJS and ExpressJS.

### Code Structure

This project mainly 10 sub folders:-

1. `configs` - files related to config such as database
2. `controllers` - files related to controller which will be used at route and handle response
3. `entities` - files related to PostgresSQL table for TypeORM entity
4. `exceptions` - files related to error handling
5. `interfaces` - files related to typescript object interface
6. `middlewares` - files related to services used before api logic called such input or jwt validation
7. `routes` - files to maintain all api route
8. `services` - files keep all the logic for all the api
9. `utils` - files keep util service such as logger with winston
10. `validations` - files keep all api validation schema

## Stack and lib used

- NodeJS
- ExpressJS
- JWT
- BcryptJS
- Axios
- Node Postgres
- Lodash
- Winston

## Requirement

- Node
- Yarn
- PostgresSQL database
- Docker

## Usage

### Deployment

#### Install dependencies with:

```
yarn install
```
Run locally: 

```
yarn start:dev
```

#### Deploy to server
Start
```
docker compose up -d
```
Stop
```
docker compose down
```
