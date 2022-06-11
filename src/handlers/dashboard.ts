import express, { Request, Response } from "express";
import verifyAuthToken from "../services/auth/verify_auth_token";
import { DashBoardQueries } from "../services/dashboard";

const dashboard = new DashBoardQueries();

const currentOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const orders = await dashboard.currentOrdersByUser(userId);
        console.log(orders);

        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
const completedOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const orders = await dashboard.completedOrdersByUser(userId);

        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const productsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = req.params.category;
        const products = await dashboard.productByCategory(category);

        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const mostPopularProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await dashboard.mostPopularProducts();

        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const dashboardRoutes = (app: express.Application) => {
    app.get('/users/:id/current-orders',verifyAuthToken, currentOrders);
    app.get('/users/:id/completed-orders',verifyAuthToken, completedOrders);
    app.get('/products-by-category/:category', productsByCategory);
    app.get('/most-popular-products',mostPopularProducts)
}

export default dashboardRoutes;