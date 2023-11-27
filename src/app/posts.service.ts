import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/app/prisma.service';
import {
  CreatePostRequest,
  ListPostsRequest,
  ListPostsResponse,
  Post,
  SearchPostRequest,
} from '@/grpc/posts/posts';
import { RpcException } from '@nestjs/microservices';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private readonly prisma: PrismaService) {}

  public async createPost(request: CreatePostRequest): Promise<Post> {
    try {
      const post = await this.prisma.post.create({
        data: {
          header: request.header,
          content: request.content,
          author: {
            connect: {
              id: request.authorId,
            },
          },
          category: {
            connect: {
              id: request.categoryId,
            },
          },
        },
        select: {
          id: true,
          author: true,
          category: true,
          header: true,
          content: true,
        },
      });

      // todo: Will be simplified, full object show only as example
      return {
        id: post.id,
        category: {
          id: post.category.id,
          name: post.category.name,
          description: post.category.description,
        },
        author: {
          id: post.author.id,
          name: post.author.name,
          email: post.author.email,
        },
        header: post.header,
        content: post.content,
      };
    } catch (e) {
      this.logger.error(e.message);
      this.logger.debug(e.trace);

      throw new RpcException({
        code: Status.INTERNAL,
        message: e.message,
      });
    }
  }

  public async listPosts(request: ListPostsRequest): Promise<ListPostsResponse> {
    try {
      const take = request.pagination?.limit ?? undefined;
      const skip =
        request.pagination?.page && request.pagination?.limit
          ? (request.pagination.page - 1) * request.pagination.limit
          : undefined;

      const where: Prisma.PostWhereInput = {
        categoryId: request.filter?.categoryId ?? undefined,
        authorId: request.filter?.authorId ?? undefined,
      };

      const total = await this.prisma.post.count({ where });

      const posts = await this.prisma.post.findMany({
        include: {
          category: true,
          author: true,
        },
        where,
        take,
        skip,
      });

      return {
        pagination: {
          total,
          pages: take ? Math.ceil(total / take) : 1,
        },
        posts,
      };
    } catch (e) {
      this.logger.error(e.message);
      this.logger.debug(e.trace);

      throw new RpcException({
        code: Status.INTERNAL,
        message: e.message,
      });
    }
  }

  public async searchPost(request: SearchPostRequest): Promise<Post> {
    try {
      return this.prisma.post.findFirst({
        include: {
          category: true,
          author: true,
        },
        where: {
          ...request,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      this.logger.debug(e.trace);

      throw new RpcException({
        code: Status.INTERNAL,
        message: e.message,
      });
    }
  }
}
