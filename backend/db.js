import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

const databasePath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "lexprime.db");
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    clientName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    caseType TEXT,
    preferredDate TEXT,
    preferredTime TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING',
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'UNREAD',
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS lawyers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    designation TEXT,
    specialization TEXT,
    experience INTEGER,
    barRegistration TEXT,
    education TEXT,
    languages TEXT,
    photoUrl TEXT,
    isVerified INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_appointments_created
    ON appointments(createdAt DESC);
  CREATE INDEX IF NOT EXISTS idx_enquiries_created
    ON enquiries(createdAt DESC);
`);

export function now() {
  return new Date().toISOString();
}

export function id(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}
