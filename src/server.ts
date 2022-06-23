import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import book_route from './handlers/books'
import user_route from './handlers/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

book_route(app)
user_route(app)


/* app.get('/books', (_req: Request, res: Response) => {
    try {
        res.send('This is the index route')
    } catch(err){
        res.status(400)
        res.json(err)
    }
})

app.get('/books/:id', (_req: Request, res: Response) => {
    try {
        res.send('this SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
app.post('/books', (req: Request, res: Response) => {
    const book: Book = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        totalPages: req.body.totalPages,
        summary: req.body.summary
    }
    try {
        res.send('this CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.put('/books/:id', (req:Request, res: Response) => {
    const book: Book = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        totalPages: req.body.totalPages,
        summary: req.body.summary
    }
    try {
        res.send('this EDIT route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.delete('/books/:id', (_req: Request, res: Response) => {
    try {
        res.send('This is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}) */


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
