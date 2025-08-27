import { afterEach, beforeEach, describe, expect, it} from 'bun:test'
import { insertUser } from './queries'
import { creatTestDb } from '../test/test.db'
import { Database } from 'bun:sqlite'

let db: Database;

beforeEach(()=>{
    db = creatTestDb();
})
afterEach(()=>{
    db.close;
})

describe('insertUser', ()=>{
    it('Should insert a user into the database', async ()=>{
        const email = 'testmail@yahoo.com';
        const password = 'supersecret22'        
        const userId = await insertUser(db, email, password);
        console.log(userId);
        
        expect(userId).toBeDefined();
    })

    it('should throw an error if an email already exitst', async ()=>{
        const email = 'testmail@yahoo.com';
        const password = 'somepass';
    
        await insertUser(db,email, password ) // inserting the email first time
        try {
            // trying to reinsert the same email
            await insertUser(db,email, password )
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            // @ts-ignore
            expect(error.message).toMatch(/UNIQUE constraint failed/)
        }
    })

    it('Should throw an error if password is empty', async() => {
        const email = "test@yahoo.com"
        const password = ''
        try {
        await insertUser(db, email, password)
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            // @ts-ignore
            expect(error.message).toMatch(/password must not be empty/);
        }
    })
})