import fs from "node:fs";

const envPath = ".env";
const databaseName = process.argv[2];

if (!databaseName) {
  throw new Error("Usage: node scripts/set-database-url-path.mjs <database>");
}

const text = fs.readFileSync(envPath, "utf8");
const lines = text.split(/\r?\n/).map((line) => {
  if (!line.startsWith("DATABASE_URL=")) {
    return line;
  }

  const raw = line.slice("DATABASE_URL=".length).trim();
  const quote = raw.startsWith('"') || raw.startsWith("'") ? raw[0] : "";
  const value = quote ? raw.slice(1, -1) : raw;
  const url = new URL(value);
  url.pathname = `/${databaseName}`;

  return `DATABASE_URL=${quote}${url.toString()}${quote}`;
});

fs.writeFileSync(envPath, lines.join("\n"));
console.log(`DATABASE_URL database path set to ${databaseName}`);
