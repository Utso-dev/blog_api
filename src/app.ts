import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { postRouter } from './module/post/post.route';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
  console.log('hello word ');
});

app.use('/post', postRouter);

export default app;
