import * as grpc from '@grpc/grpc-js';
import { BooksClient, GetAllBooksRequest } from './generated/proto/book'

const client = new BooksClient('localhost:50051', grpc.credentials.createInsecure());

const request: GetAllBooksRequest = { 
  id: '1',
  sort: 'name:asc'
};

client.getAllBooks(request, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('Book received:', response);
});
