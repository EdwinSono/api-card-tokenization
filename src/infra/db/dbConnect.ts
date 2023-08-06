import { DataSource } from "typeorm"
import { Card } from "./entities/cardEntity"
import config from "../../config";

const configPostgres: any = {
  type: "postgres",
  host: config.database.DB_HOST,
  username: config.database.DB_USER,
  password: config.database.DB_PASSWORD,
  database: config.database.DB_NAME,
  port: config.database.DB_PORT,
  entities: [Card],
  synchronize: true,
  logging: false,
}

export const dataSource = new DataSource(configPostgres);

export async function connectDB() {
  try {        
      await dataSource.initialize();
      console.log("Data Source has been initialized!")
  } catch (err) {
      console.error("Error during Data Source initialization", err)
      throw err;
  }
}
