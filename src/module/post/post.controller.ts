import type { Request, Response } from 'express';
import { postService } from './post.services';

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.dbPostCreateService(req.body);

    res.status(201).json({
      message: 'Post created successfully',
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating post',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.dbAllPostService();

    res.status(200).json({
      message: 'Posts retrieved successfully',
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving posts',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};
const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await postService.singlePostService(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Post retrieved successfully',
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving post',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const postController = { createPost, getAllPosts, getSinglePost };
