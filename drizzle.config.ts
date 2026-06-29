import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ override: true });

const databaseUrl = new URL(process.env.DATABASE_URL!);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.slice(1),
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
