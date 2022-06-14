import { Order, OrderStore } from "../models/order";
import express, { Request , Response } from "express";
import verifyAuthToken from "../services/auth/verify_auth_token";

const store = new OrderStore();

const index = async(req: Request, res: Response): Promise<void> => {
    try{
        const orders = await store.index();

        res.json(orders);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async(req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try{
        const order = await store.show(id);

        res.json(order);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async(req: Request, res: Response): Promise<void> => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id
    };

    try{
        const newOrder = await store.create(order);

        res.json(newOrder);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const destroy = async(req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try{
        const order = await store.delete(id);

        res.json(order);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const addProduct = async(req: Request, res: Response): Promise<void> => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    try{
        const addedProduct = await store.addProduct(quantity,orderId,productId);

        res.json(addedProduct);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders',verifyAuthToken,index);
    app.get('/orders/:id',verifyAuthToken,show);
    app.post('/orders',verifyAuthToken,create);
    app.post('/orders/:id/products',verifyAuthToken,addProduct);
    app.delete('/orders/:id',verifyAuthToken,destroy);
}

export default orderRoutes;