import express, { Router } from 'express';
import { postController } from './post.controller';
const router = express.Router();

router.post('/', postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getSinglePost);

export const postRouter: Router = router;
