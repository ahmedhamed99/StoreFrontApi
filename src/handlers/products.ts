import { Product, ProductStore } from "../models/product";
import express, { Request , Response } from "express";
import verifyAuthToken from "../services/auth/verify_auth_token";

const store = new ProductStore();

const index = async(req: Request, res: Response): Promise<void> => {
    try{
        const products = await store.index();

        res.json(products);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async(req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try{
        const product = await store.show(id);

        res.json(product);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async(req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category
    };

    try{
        const newProduct = await store.create(product);

        res.json(newProduct);
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

const productRoutes = (app: express.Application) => {
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',verifyAuthToken,create);
    app.delete('/products/:id',destroy);
}

export default productRoutes;