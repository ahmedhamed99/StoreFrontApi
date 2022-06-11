import Client from "../database";
import { Order } from "../models/order";
import { Product } from "../models/product";

export class DashBoardQueries {
    async currentOrdersByUser(id: string): Promise<Order[]> {
        try {
            console.log('12')
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const result = await conn.query(sql, [id,"open"]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`could not get current orders by user ${id}: ${err}`)
        }
    }

    async completedOrdersByUser(id: string): Promise<Order[]> {
        try {

            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const result = await conn.query(sql, [id,"completed"]);

            conn.release();

            return result.rows;
        } catch (err) {

            throw new Error(`could not get completed orders by user ${id}: ${err}`)
        }
    }
    
    async productByCategory(category: string): Promise<Product[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql,[category]);

            conn.release();

            return result.rows;
        }catch(err){
            throw new Error(`could not get products by category ${category}: ${err}`)
        }
    }

    async mostPopularProducts(): Promise<string[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT product_id FROM order_products ORDER BY quantity DESC LIMIT 5';
            const result = await conn.query(sql);
            

            conn.release();

            return result.rows;
        }catch(err){
            throw new Error(`could not get most popular products : ${err}`)
        }
    }
}