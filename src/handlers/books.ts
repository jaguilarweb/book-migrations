import express, {Request, Response} from 'express'
import { Book, BookStore } from '../models/book'
import jwt from 'jsonwebtoken'

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
    const authorizationHeader = req.headers.authorization!
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET!)
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }

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
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
      const authorizationHeader = req.headers.authorization!
      const token = authorizationHeader.split(' ')[1]
      jwt.verify(token, process.env.TOKEN_SECRET!)
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }

  try {
      const deleted = await store.delete(req.body.id)
      res.json(deleted)
  } catch (error) {
      res.status(400)
      res.json({ error })
  }
}

const book_route = (app: express.Application) => {
  app.get('/books', index)
  app.get('/books/:id', show)
  app.post('/books', create)
  app.delete('/books/:id', destroy)
}

export default book_route;