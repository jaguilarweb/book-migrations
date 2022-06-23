import express, {Request, Response} from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken' 

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password
  }
  try {
      const newUser = await store.create(user)
      var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!)
      res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
      const u = await store.authenticate(user.username, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET!);
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}



const user_route = (app: express.Application) => {
  app.get('/users', index)
  app.post('/users/authenticate', authenticate)
  app.post('/users', create)
}

export default user_route;