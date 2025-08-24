import { Database } from 'bun:sqlite';
import { join } from 'path';


const dbPath = join('.','db.sqlite');
let db:Database;

export const dbConn = () => {
    if (!db) {
        db = new Database(dbPath)
        // a running mode from the bun documentation
        db.exec('PRAGMA journal_mode = WAL;')
        applySchema(db);
    }
    return db;
}

export const applySchema = (dbInstance:Database) => {
    dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        );`
        )
}