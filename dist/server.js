"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var book_1 = __importDefault(require("./handlers/book"));
var users_1 = __importDefault(require("./handlers/users"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
(0, book_1["default"])(app);
(0, users_1["default"])(app);
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
    console.log("starting app on: ".concat(address));
});
