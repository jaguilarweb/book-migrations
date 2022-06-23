import express, {Request, Response} from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const authenticate = async (req: Request, res: Response) => {
  const user = await store.authenticate(req.body.username, req.body.password)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password
    }
    const newUser = await store.create(user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const user_route = (app: express.Application) => {
  app.get('/users', index)
  app.post('/users/authenticate', authenticate)
  app.post('/users', create)
}

export default user_route;