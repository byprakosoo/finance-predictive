import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/db/schema";

export function createDbClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  const pool = mysql.createPool(process.env.DATABASE_URL);
  return drizzle(pool, { schema, mode: "default" });
}

export type DbClient = NonNullable<ReturnType<typeof createDbClient>>;
