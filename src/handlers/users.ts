import { User, UserStore } from "../models/user";
import express, { Request, Response, NextFunction } from "express";
import verifyAuthToken from "../services/auth/verify_auth_token";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await store.index();

        console.log(users);
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const user = await store.show(id);
        

        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    };

    try {
        const newUser = await store.create(user);
        
        var token = jwt.sign({user: newUser},process.env.TOKEN_SECRET as string);
        
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const authenticate = async(req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password
    }
    
    try {
        const authenticatedUser = await store.authenticate(user.username,user.password);
        
        var token = jwt.sign({user: authenticatedUser}, process.env.TOKEN_SECRET as string);
        
        res.json(token);
    }catch(err){
        res.status(401);
        res.json({ err });
    }
}

const destroy = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const user = await store.delete(id);
        

        res.json(user);
    } catch (err) {
        res.status(400);
        console.log(err)
        res.json(err);
    }
};
const userRoutes = (app: express.Application)=> {
    app.get('/users',verifyAuthToken,index);
    app.get('/users/:id',verifyAuthToken,show);
    app.post('/users',create);
    app.post('/users/authenticate',authenticate);
    app.delete('/users/:id',destroy);
}

export default userRoutes;