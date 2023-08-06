# API de Tokenización de Tarjetas


### Databse
```sh
docker-compose up -d postgres
docker-compose ps
docker-compose exec postgres bash
psql -h localhost -d dbBank -U admin
docker inspect <ID_CONTAINER>
docker-compose down
```

### Tabla
```sql
CREATE TABLE cards (
	id serial PRIMARY KEY,
	email VARCHAR ( 250 ) NOT NULL,
    card_number VARCHAR ( 250 ) NOT NULL,
    cvv VARCHAR ( 10 ) NOT NULL,
    expiration_year VARCHAR ( 10 ) NOT NULL,
    expiration_month VARCHAR ( 10 ) NOT NULL,
    token VARCHAR ( 250 ) NOT NULL,
	completed boolean DEFAULT false
);
```
## Install
```sh
npm install
```
## Build
```sh
npm run build
```

## Run
```sh
npm start
```

## Show app

[Show app](http://localhost:3000/)
[Crear de un token](http://127.0.0.1:3000/api/v1/card)
[Obtener datos de tarjeta](http://127.0.0.1:3000/api/v1/card?token=112414sfafafaf16)


## Case 1: Generate Token
```sh
curl --location 'http://127.0.0.1:3000/api/v1/card' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "edwinsono@gmail.com",
    "card_number": "4817831283193913",
    "cvv": "156",
    "expiration_year": "2026",
    "expiration_month": "05"
}'
```

## Case 2: Read Token
```sh
curl --location 'http://127.0.0.1:3000/api/v1/card?token=mEHGefSNpKahCbWu'
```


## Test
```sh
npm run test
```

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
