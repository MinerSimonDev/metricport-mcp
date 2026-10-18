#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const url = process.env.METRICPORT_URL || "https://metricport.io/api/mcp";
const args = process.argv.slice(2);
const keyIndex = args.findIndex((a) => a === "--key" || a === "-k");
const key = keyIndex >= 0 ? args[keyIndex + 1] : process.env.METRICPORT_API_KEY;
const passthrough = args.filter((_, i) => i !== keyIndex && i !== keyIndex + 1);

if (args.includes("--help") || args.includes("-h")) {
  process.stdout.write(`metricport-mcp

Connects an MCP client (Claude Desktop, Cursor, Windsurf, VS Code, ...) to the hosted
MetricPort server for Google Search Console, Google Ads and AdSense.

Usage:
  npx metricport-mcp                      sign in with your MetricPort account (browser opens once)
  npx metricport-mcp --key mp_xxx         use an API key from https://metricport.io/app/keys
  METRICPORT_API_KEY=mp_xxx npx metricport-mcp

Create a free account and connect your Google accounts at https://metricport.io
`);
  process.exit(0);
}

const remote = require.resolve("mcp-remote/dist/proxy.js");
const remoteArgs = [remote, url, ...passthrough];
if (key) remoteArgs.push("--header", `Authorization: Bearer ${key}`);

const child = spawn(process.execPath, remoteArgs, { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 0));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
