import { describe, expect, it} from 'bun:test'
import { insertUser } from './queries'
import { dbConn } from './db'

describe('insertUser', ()=>{
    it('Should insert a user into the database', async ()=>{
        const db = dbConn()
        const email = 'testmail@yahoo.com';
        const password = 'supersecret22'        
        const userId = await insertUser(db, email, password);
        console.log(userId);
        
        expect(userId).toBeDefined();
    })
})