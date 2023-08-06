import 'dotenv/config'

export default {
  "port": (process.env.PORT || 3000) as number,
  "host": process.env.HOST as string,
  "db_url": process.env.DB_URL as string,
  "database": {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: (process.env.DB_PORT || 5432) as number
  },
  "apiSecretToken": process.env.API_SECRET_KEY as string,
  "environment": process.env.ENVIRONMENT as string,
}
