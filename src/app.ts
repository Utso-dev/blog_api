import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { postRouter } from './module/post/post.route';
import { auth } from './utils/auth';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
  console.log('hello word ');
});

app.use('/post', postRouter);

export default app;
