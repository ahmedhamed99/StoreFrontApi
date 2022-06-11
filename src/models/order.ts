
import Client from "../database";

export type Order = {
    id?: string,
    status: string,
    user_id: string
};

export class OrderStore {
    async index(): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders';
        const result = await conn.query(sql);

        conn.release();
        return result.rows;
    }

    async show(id: string): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const result = await conn.query(sql, [id]);

        conn.release();
        return result.rows[0];
    }

    async create(order: Order): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'INSERT INTO orders (status, user_id) VALUES ($1,$2) RETURNING *';
        const result = await conn.query(sql, [order.status, order.user_id]);

        const newOrder = result.rows[0];

        conn.release();

        return newOrder;
    }

    async delete(id: string): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
        const result = await conn.query(sql, [id]);

        conn.release();
        return result.rows[0];
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<{ id: string, quantity: number, orderId: string, productId: string }> {
        const conn = await Client.connect();
        try{
            const orderSql = 'SELECT * FROM orders WHERE id=($1)';
            const orderResult = await conn.query(orderSql,[orderId]);
            
            const order = orderResult.rows[0];
            
            if (order.status == "completed"){
                throw new Error(`order ${orderId} already completed`);
            }
        }catch(err){
            throw new Error(`${err}`)
        }
        try {
            const sql = 'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}