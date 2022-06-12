# Storefront Backend Project

## Installation & Local Run
Ensure you have node 10 or higher.

1. `npm install`
2. `npm run start`

## Database setup example
1. run `psql postgres` 
2. `CREATE USER shopping_user WITH PASSWORD 'password123';`
3. `CREATE DATABASE storefront_db;`
4. `CREATE DATABASE storefront_test_db;`
5. `\c shopping`
6. `GRANT ALL PRIVILEGES ON DATABASE storefront_db TO shopping_user;`
6. `GRANT ALL PRIVILEGES ON DATABASE storefront_test_db TO shopping_user;`

## Environment Variables
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_TEST_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- ENV
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET