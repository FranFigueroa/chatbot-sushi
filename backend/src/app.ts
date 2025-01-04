import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Test Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

export default app;