import Client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

export type User = {
    id?: string,
    firstName?: string,
    lastName?: string,
    username: string,
    password: string
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id,firstName,lastName,username FROM users';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`could not get users ${err}`);
        }
    }
    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT id,firstName,lastName,username FROM users WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`could not get user ${id} :${err}`);
        }
    }
    async create(user: User): Promise<User> {
        const conn = await Client.connect();
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql,[user.username]);
            if( result.rows.length ){
                throw new Error('username already exists');
            }
        }catch(err){
            throw new Error(`${err}`)
        }
        try {
            const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES ($1,$2,$3,$4) RETURNING *';

            const hash = bcrypt.hashSync(
                user.password + pepper,
                parseInt(saltRounds)
            );
            const result = await conn.query(sql, [user.firstName, user.lastName, user.username, hash]);
            const createdUser = result.rows[0];
            conn.release();

            return createdUser;
        } catch (err) {
            throw new Error(`could not create user ${user.firstName} ${user.lastName} :${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();

            const sql = 'SELECT password FROM users WHERE firstName=($1)';

            const result = await conn.query(sql, [username]);

            if (result.rows.length) {
                const user = result.rows[0];

                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user
                }
            }
            return null;
        } catch (err) {
            throw new Error(`could not authenticate user ${username}: ${err}`);
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect();

            const sql = 'DELETE FROM users WHERE id=($1) RETURNING id,firstName,lastName,username';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`could not get user ${id} :${err}`);
        }
    }
}