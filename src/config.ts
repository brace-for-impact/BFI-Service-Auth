// src/config.ts
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface AppConfig {
    env: string;
    port: number;
  }
// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determine env file path based on NODE_ENV, default to 'development'
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

// Load environment variables from the correct file
dotenv.config({
  path: path.resolve(__dirname, `../${envFile}`),
});

// Export config object
export const config:AppConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};
