import * as Joi from 'joi';
import {
  CreatePostRequest,
  ListPostsFilter,
  ListPostsRequest,
  PaginationRequest, SearchPostRequest,
} from '@/grpc/posts/posts';

export const createPostRequestSchema = Joi.object<CreatePostRequest>({
  categoryId: Joi.number().integer().required(),
  authorId: Joi.number().integer().required(),
  header: Joi.string().required(),
  content: Joi.string().required(),
});

export const listPostsRequestSchema = Joi.object<ListPostsRequest>({
  pagination: Joi.object<PaginationRequest>({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }).optional(),
  filter: Joi.object<ListPostsFilter>({
    categoryId: Joi.number().integer().optional(),
    authorId: Joi.number().integer().optional(),
  }).optional(),
});

export const searchPostRequestSchema = Joi.object<SearchPostRequest>({
  id: Joi.number().integer().optional(),
  content: Joi.string().optional(),
  header: Joi.string().optional(),
});
