import config from "../config.js";
import fs from "fs";
import { v4 } from "uuid";

const json_books = fs.readFileSync("src/books.json", "utf-8");
let books = JSON.parse(json_books);

export const renderIndexPage = (req, res) => res.render("index", { books });

export const renderAboutPage = (req, res) => res.render("about", config);

export const renderNewEntryPage = (req, res) => res.render("new-entry");

export const createNewEntry = (req, res) => {
  const { producto, precio, codigo, descripcion } = req.body;

  if (!producto || !precio || !codigo || !descripcion) {
    res.status(400).send("Las entradas deben tener un título y un cuerpo.");
    return;
  }

  var newBook = {
    id: v4(),
    producto,
    precio,
    codigo,
    descripcion,
  };

  books.push(newBook);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/books.json", json_books, "utf-8");

  res.redirect("/");
};

export const deleteBook = (req, res) => {
  console.log({ books });
  books = books.filter((book) => book.id != req.params.id);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/books.json", json_books);
  res.redirect("/");
};
