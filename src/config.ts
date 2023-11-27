import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { POSTS_PACKAGE_NAME } from '@/grpc/posts/posts';

const basePath = join(process.cwd(), 'vendor', 'protos');

function protoPath(protoName: string): string {
  return join(basePath, protoName, `${protoName}.proto`);
}

export default () => ({
  grpc: {
    server: <GrpcOptions>{
      transport: Transport.GRPC,
      options: {
        package: POSTS_PACKAGE_NAME,
        protoPath: [protoPath(POSTS_PACKAGE_NAME)],
        url: '0.0.0.0:8080',
        loader: {
          includeDirs: [basePath],
        },
      },
    },
  },
});
