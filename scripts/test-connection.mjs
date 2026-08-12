// scripts/test-connection.mjs
// Run: node scripts/test-connection.mjs
// Verifies Supabase connection and checks all tables exist.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Load .env.local manually (Node doesn't auto-load it)
const envLines = readFileSync(".env.local", "utf-8").split("\n");
const env = {};
for (const line of envLines) {
  const [key, ...rest] = line.trim().split("=");
  if (key && rest.length) env[key] = rest.join("=");
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Missing env vars. Check .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const TABLES = [
  "site_settings",
  "hero_content",
  "about_content",
  "skills",
  "portfolio_categories",
  "portfolio_projects",
  "experience",
  "testimonial",
  "contact_info",
  "contact_messages",
];

console.log(`\n🔌 Connecting to: ${SUPABASE_URL}\n`);

let allOk = true;

for (const table of TABLES) {
  const { data, error, count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: false })
    .limit(1);

  if (error) {
    console.log(`  ❌ ${table.padEnd(25)} → ${error.message}`);
    allOk = false;
  } else {
    console.log(`  ✅ ${table.padEnd(25)} → ${count ?? data?.length ?? 0} rows`);
  }
}

console.log(allOk ? "\n✅ All tables OK!\n" : "\n⚠️  Some tables have errors — run the migration SQL first.\n");
