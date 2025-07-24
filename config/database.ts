import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Configuration de la base de données pour O2switch
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'borneflix',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: process.env.DB_SSL === 'true' ? {} : undefined,
});

export const db = drizzle(connection);

// Test de connexion
export async function testConnection() {
  try {
    await connection.ping();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Fermer la connexion
export async function closeConnection() {
  try {
    await connection.end();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
} 