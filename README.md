# API de Tokenización de Tarjetas

### Run Databse
```sh
docker-compose up -d postgres
```

## Install
```sh
npm install
```

## Run
```sh
npm run start-ts
```

## Test api

### Case 1: Generate Token
```sh
curl --location 'http://127.0.0.1:3000/api/v1/card' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "edwinso@gmail.com",
    "card_number": "4280820153812676",
    "cvv": "159",
    "expiration_year": "2026",
    "expiration_month": "05"
}'
```

### Case 2: Read Card by Token
```sh
curl --location 'http://127.0.0.1:3000/api/v1/card?token=pO3JkD0fHZ8kleSM'
```


## Test
```sh
npm run test
```

## Run Lint
```sh
npm run lint
npm run lint-and-fix
```

### Others commads

### Docker
```sh
docker-compose ps
docker-compose exec postgres bash
psql -h localhost -d dbBank -U admin
docker inspect <ID_CONTAINER>
docker-compose down
```

### Build
```sh
npm run build
```

### Show Table
src/infra/db/migrations/query.sql


## Tecnologías:
- *Backend*: TypeScript
- *BD relacional*: PostgreSql
- *BD no relacional*: Redis
- *Test*: Jest


## Reference
- https://keygen.io/
- https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-80.php
- https://daily.dev/blog/how-to-build-blazing-fast-apis-with-fastify-and-typescript
- https://marketsplash.com/tutorials/typescript/jest-typescript/
- https://www.scaler.com/topics/typescript/jest-typescript/
