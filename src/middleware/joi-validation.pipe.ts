import { status } from '@grpc/grpc-js';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { RpcException } from '@nestjs/microservices';

export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, { type }: ArgumentMetadata) {
    if (value && type === 'body') {
      const { error } = this.schema.validate(value);
      if (error) {
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: `${error.message}`,
        });
      }
    }
    return value;
  }
}
