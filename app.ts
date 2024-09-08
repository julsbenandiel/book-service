require('dotenv').config()

import express, { Request, Response } from 'express';
import { writeToServiceRegistry } from './helper';
import { bookModel, connectToDb } from './database';

const app = express();
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_: Request, res: Response) => {
  res.send('book service works!');
});

app.get('/health', (_: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/book', async (_: Request, res: Response) => {
  try {
    const books = await bookModel.find()
    res.status(200).json(books)

  } catch (error) {
    res.status(400).json(error)
  }
});

// app.get('/populate', async (req: Request, res: Response) => {
//   await bookModel.insertMany([
//     {
//       title: "The Mentalist",
//       author: new mongoose.Types.ObjectId('66dcb8b9fc056c13414c7ce9'),
//       isbn: "123-456-789-10"
//     },
//     {
//       title: "Psychology for Dummies",
//       author: new mongoose.Types.ObjectId('66dcb8b9fc056c13414c7ce9'),
//       isbn: "112-456-789-11"
//     },
//     {
//       title: "Aiming with One Eye Closed",
//       author: new mongoose.Types.ObjectId('66dcb8b9fc056c13414c7ceb'),
//       isbn: "423-543-344-15"
//     },
//     {
//       title: "Hostage Negotiation 101",
//       author: new mongoose.Types.ObjectId('66dcb8b9fc056c13414c7cec'),
//       isbn: "423-543-344-15"
//     },
//   ])

//   res.status(200).json({ message: "Data created"})
// })

app.listen(port, async () => {

  await Promise.all([
    connectToDb(),
    writeToServiceRegistry()
  ])

  console.log(`Book service running at http://${host}:${port}`);
});