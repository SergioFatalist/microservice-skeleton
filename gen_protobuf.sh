#!/bin/sh

OUT_DIR=./src/grpc

[ -d ${OUT_DIR} ] || mkdir -p ${OUT_DIR}

if [ "${OS}X" = "Windows_NTX" ]
then
 plugin="./node_modules/.bin/protoc-gen-ts_proto.cmd"
else
 plugin="./node_modules/.bin/protoc-gen-ts_proto.sh"
fi

protoc --plugin=${plugin} \
  --ts_proto_opt=nestJs=true \
  --ts_proto_opt=esModuleInterop=true \
  --ts_proto_opt=addGrpcMetadata=true \
  --ts_proto_opt=removeEnumPrefix=true \
  --ts_proto_out=${OUT_DIR} \
  -I ./vendor/protos ./vendor/protos/*/*.proto
