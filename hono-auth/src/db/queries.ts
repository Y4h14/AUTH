import { Database } from 'bun:sqlite'
import {type UUID, randomUUID} from 'crypto'

// the reason we pass the database with the query is to 
// to simplify testing by passing a different testing database.
export const insertUser = async (db: Database, email:string, password:string) => {
    const password_hash = await Bun.password.hash(password)
    const userId = randomUUID();
    const insertQuery = db.query(
        `
        INSERT INTO users (id, email, password)
        VALUES(?, ?, ?)
        RETURNING id
        `
    )

    const user = insertQuery.get(userId, email, password_hash) as {id: UUID}
    return user.id;
}