## Description

Simple microservice with:
- [NestJS](https://nestjs.com)
- [Prisma ORM](https://www.prisma.io)
- [gRPC](https://grpc.io) 
- [Joi](https://joi.dev) validation for running environment and requests
- [ESLint](https://eslint.org) - JS/TS linter
- [Prettier](https://prettier.io) - Code formatter

## Project Structure

- src - app sources directories
- src/grpc - compiled TypeScript code from .proto files
- prisma - Prisma ORM schema and migrations
- vendor - non-TypeScript project sources (such as proto files) 

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# compile .proto files
$ pnpm proto:generate

# Deploy Prisma migrations
$ pnpm prisma:migrate:deploy

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Build Docker image

```bash
$ docker build -t microservice --progress plain ./
```
