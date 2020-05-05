const db = require('../database/dbConfig');
const Users = require('./user-model.js');

it('true is true', () => {
    expect(true).toBe(true);
})

describe('users api', () => {
    describe('add()', () => {
        it('should insert user into the db and return length of array', async () => {
            await Users.add({username: 'ej', password: 'password' });
            
            addedUser = await db('users');
            expect(addedUser).toHaveLength(1);
        });

        it('should insert movies into the db', async () => {
            await Users.add({username: 'eddie', password: 'password' });

            addedUserTwo = await db('users');
            expect(addedUserTwo[0].username).toMatch('eddie')

        });
    });

    describe('/login .add()', () => {
        it('should insert user to log in and hide password', async () => {
            await Users.add({username: 'ej', password: 'password' });
            
            addedUserThree = await db('users');
            expect(addedUserThree[0].password).toMatch('password');
        });

        it('the data is a username', async () => {

            return await Users.add({username: 'ej', password: 'password' }).then(data => {
              expect(data.username).toBe('ej');
            });
        });
    });
});

beforeEach(async () => {
    await db('users').truncate();
})
