import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const databaseUrl = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

if (!databaseUrl) {
    console.error('NEXT_PUBLIC_DRIZZLE_DB_URL is not defined');
    throw new Error('Database URL is not configured');
}

console.log('Database URL configured:', databaseUrl ? 'Yes' : 'No');

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });