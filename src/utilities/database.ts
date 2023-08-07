import { DataSource } from "typeorm";
import "dotenv/config";

export const Database = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRESS_HOST,
  database: process.env.POSTGRES_DATABASE,
  entities: ["build/src/entities/**/*.js"],
});
