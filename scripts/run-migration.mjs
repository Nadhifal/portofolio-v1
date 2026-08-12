// scripts/run-migration.mjs
// Runs the migration SQL and seed SQL against Supabase via the REST API.
// Run: node scripts/run-migration.mjs
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local

import { readFileSync } from "fs";
import { join } from "path";

// ── Load .env.local ────────────────────────────────────────────────────────
const envLines = readFileSync(".env.local", "utf-8").split("\n");
const env = {};
for (const line of envLines) {
  const [key, ...rest] = line.trim().split("=");
  if (key && rest.length) env[key] = rest.join("=");
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌ Missing env vars. Check .env.local");
  process.exit(1);
}

// ── Helper: execute SQL via pg REST ───────────────────────────────────────
async function runSQL(label, sql) {
  console.log(`\n⏳ Running: ${label}...`);

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ sql }),
  });

  if (!response.ok) {
    const body = await response.text();
    // If exec_sql function doesn't exist, fall back to pg endpoint
    if (response.status === 404 || body.includes("does not exist")) {
      return runSQLViaPg(label, sql);
    }
    console.error(`  ❌ HTTP ${response.status}: ${body}`);
    return false;
  }

  console.log(`  ✅ ${label} executed successfully`);
  return true;
}

async function runSQLViaPg(label, sql) {
  // Use Supabase Management API to execute SQL
  const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)\./)?.[1];
  if (!projectRef) {
    console.error("  ❌ Could not extract project ref from URL");
    return false;
  }

  const response = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    console.error(`  ❌ Management API ${response.status}: ${body}`);
    console.log(`\n  📋 Alternatively, run this SQL manually in Supabase Dashboard → SQL Editor:\n`);
    console.log(`  File: ${label}`);
    return false;
  }

  console.log(`  ✅ ${label} executed via Management API`);
  return true;
}

// ── Read SQL files ─────────────────────────────────────────────────────────
const migrationSQL = readFileSync(
  join("supabase", "migrations", "0001_init.sql"),
  "utf-8"
);
const seedSQL = readFileSync(join("supabase", "seed.sql"), "utf-8");

console.log("🚀 Starting database setup...");
console.log(`📡 Project: ${SUPABASE_URL}`);

// ── Run migration ──────────────────────────────────────────────────────────
const migrationOk = await runSQL("Migration (0001_init.sql)", migrationSQL);

if (!migrationOk) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           MANUAL SETUP REQUIRED                              ║
║                                                              ║
║  1. Open: ${SUPABASE_URL.replace("https://", "")}            
║  2. Go to: SQL Editor (left sidebar)                         ║
║  3. Run the contents of:                                     ║
║     supabase/migrations/0001_init.sql                        ║
║  4. Then run:                                                ║
║     supabase/seed.sql                                        ║
║  5. Run: node scripts/test-connection.mjs to verify          ║
╚══════════════════════════════════════════════════════════════╝
`);
  process.exit(0);
}

// ── Run seed ───────────────────────────────────────────────────────────────
await runSQL("Seed data (seed.sql)", seedSQL);

console.log("\n🎉 Database setup complete!\n");
console.log("Next: node scripts/test-connection.mjs");
