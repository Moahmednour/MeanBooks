import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Book from "./books.model";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/biblio";
mongoose.connect(uri, (err) => {
  if (err) console.log(err.message);
  else console.log("Successfully Connected!");
});

app.get("/booksParPage", (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page?.toString() || "1");

  const size: number = parseInt(req.query.size?.toString() || "5");

  Book.paginate({}, { page: page, limit: size }, (err: any, books: any) => {
    if (err) res.status(500).send(err);
    else res.send(books);
  });
});

app.get("/booksSearch", (req: Request, res: Response) => {
  const search = req.query.search || "";

  const page: number = parseInt(req.query.page?.toString() || "1");
  const size: number = parseInt(req.query.size?.toString() || "5");

  Book.paginate(
    { title: { $regex: ".*(?i)" + search + ".*" } },
    { page: page, limit: size },
    (err: any, books: any) => {
      if (err) res.status(500).send(err);
      else res.send(books);
    }
  );
});

app.get("/books", (req: Request, resp: Response) => {
  Book.find((err, books: any) => {
    if (err) resp.status(500).send(err);
    else resp.send(books);
  });
});

app.post("/books", (req: Request, resp: Response) => {
  let book = new Book(req.body);
  book.save((err) => {
    if (err) resp.status(500).send(err);
    else resp.send(book);
  });
});

app.get("/books/:id", (req: Request, resp: Response) => {
  Book.findById(req.params.id, (err: any, book: any) => {
    if (err) resp.status(500).send(err);
    else resp.send(book);
  });
});

app.put("/books/:id", (req: Request, resp: Response) => {
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, book: any) => {
      if (err) resp.status(500).send(err);
      else resp.send(book);
    }
  );
});

app.delete("/books/:id", (req: Request, resp: Response) => {
  Book.findByIdAndRemove(req.params.id, (err: any, book: any) => {
    if (err) resp.status(500).send(err);
    else resp.send(book);
  });
});

app.get("/", (req, resp) => {
  resp.send("Hello World");
});

app.listen(8085, () => {
  console.log("Server is running on port 8085");
});
