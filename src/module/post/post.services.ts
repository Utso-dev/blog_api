import type { Post } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';

const dbPostCreateService = async (
  data: Omit<Post, 'id' | 'created_at' | 'updated_at'>
) => {
  const result = await prisma.post.create({
    data,
  });

  return result;
};

const dbAllPostService = async () => {
    const result = await prisma.post.findMany();
    return result;
};
const singlePostService = async (id: string) => {
    const result = await prisma.post.findUnique({
        where: { id },
    });
    return result;
}

export const postService = { dbPostCreateService, dbAllPostService, singlePostService };
