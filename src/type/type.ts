export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED', // Assuming standard status options
}

export interface PostType {
  id: string;
  title: string;
  content?: string | null;
  published: boolean;
  tumbnail?: string | null; // Note: preserved your spelling "tumbnail"
  isFeatured: boolean;
  status: PostStatus;
  tags: string[];
  views: number;
  authorId: string;
  created_at: Date;
  updated_at: Date;

  // Relations
  comments?: Comment[];
}
export interface CommentType {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  status: CommentStatus;
  created_at: Date;
  updated_at: Date;

  // Relations (Optional based on include/fetch logic)
  parent?: Comment | null;
  replies?: Comment[];
}
export enum CommentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
