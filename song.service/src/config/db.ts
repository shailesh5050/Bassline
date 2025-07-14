import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

// Workaround for Windows SSL certificate issues with Neon
// This is a common issue on Windows when connecting to external databases
if (process.platform === 'win32') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export const sql = neon(process.env.DB_URL as string);