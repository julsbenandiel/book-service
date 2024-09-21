# npx grpc_tools_node_protoc \
#   --ts_out=src/generated \
#   --grpc_out=src/generated \
#   --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts \
#   --proto_path=./proto \
#   ./proto/book.proto

# protoc \
#   --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
#   --ts_proto_out=./src/output \
#   --ts_proto_opt=esModuleInterop=true,forceLong=string,useOptionals=all \
#   -I ./proto ./proto/*.proto

# protoc \
#   --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
#   --ts_proto_out=./src/output \
#   --ts_proto_opt=esModuleInterop=true,forceLong=string,useOptionals=all,outputServices=grpc-js \
#   -I ./proto ./proto/book.proto

# protoc --plugin=protoc-gen-ts_proto=$(which protoc-gen-ts_proto) \
#        --ts_proto_out=./generated \
#        ./proto/book.proto
PROTO_DIR=./generated

# yarn run grpc_tools_node_protoc \
#     --js_out=import_style=commonjs,binary:${PROTO_DIR} \
#     --grpc_out=${PROTO_DIR} \
#     --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
#     -I ./proto \
#     proto/*.proto

# yarn run grpc_tools_node_protoc \
#     --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
#     --ts_out=${PROTO_DIR} \
#     -I ./proto \
#     proto/*.proto

protoc \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=outputServices=grpc-js \
    --ts_proto_out=generated ./proto/book.proto