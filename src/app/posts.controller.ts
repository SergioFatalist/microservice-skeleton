import { Controller, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  CreatePostRequest,
  ListPostsRequest,
  ListPostsResponse,
  Post,
  PostsServiceController,
  SearchPostRequest,
} from '@/grpc/posts/posts';
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod } from '@nestjs/microservices';
import { JoiValidationPipe } from '@/middleware/joi-validation.pipe';
import {
  createPostRequestSchema,
  listPostsRequestSchema,
  searchPostRequestSchema,
} from '@/validation/posts-schemas';

@Controller()
export class PostsController implements PostsServiceController {
  constructor(private readonly postsService: PostsService) {}

  @GrpcMethod('PostsService', 'CreatePost')
  @UsePipes(new JoiValidationPipe(createPostRequestSchema))
  public async createPost(request: CreatePostRequest, _metadata?: Metadata): Promise<Post> {
    return this.postsService.createPost(request);
  }

  @GrpcMethod('PostsService', 'ListPosts')
  @UsePipes(new JoiValidationPipe(listPostsRequestSchema))
  public async listPosts(
    request: ListPostsRequest,
    _metadata?: Metadata,
  ): Promise<ListPostsResponse> {
    return this.postsService.listPosts(request);
  }

  @GrpcMethod('PostsService', 'SearchPost')
  @UsePipes(new JoiValidationPipe(searchPostRequestSchema))
  public async searchPost(request: SearchPostRequest, _metadata?: Metadata): Promise<Post> {
    return this.postsService.searchPost(request);
  }
}
