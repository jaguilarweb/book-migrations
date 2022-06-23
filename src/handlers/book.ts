import express, {Request, Response} from 'express'
import { Book, BookStore } from '../models/book'

const store = new BookStore()

const index = async (_req: Request, res: Response) => {
  const books = await store.index()
  res.json(books)
}

const show = async (req: Request, res: Response) => {
  const book = await store.show(req.params.id)
  res.json(book)
}

const create = async (req: Request, res: Response) => {
  try {
    const book: Book = {
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      totalPages: req.body.totalPages,
      summary: req.body.summary,
    }
    const newBook = await store.create(book)
    res.json(newBook)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async(req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}

const book_route = (app: express.Application) => {
  app.get('/books', index)
  app.get('/books/:id', show)
  app.post('/books', create)
  app.delete('/books/:id', destroy)
}

export default book_route;