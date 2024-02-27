import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import path from "path";
// import { User } from "./entity/User";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DBNAME,
  synchronize: true,
  logging: false,
  entities: [path.resolve(__dirname, "..", "entity", "*.entity.{ts,js}")],
});
