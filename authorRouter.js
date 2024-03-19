const express = require('express');
const fs = require('fs');
const router = express.Router();

const authorDataFile = './data/authors.json';

function readAuthorsFromFile() {
  const data = fs.readFileSync(authorDataFile);
  return JSON.parse(data);
}

function writeAuthorsToFile(authors) {
  fs.writeFileSync(authorDataFile, JSON.stringify(authors, null, 2));
}

router.get('/', (req, res) => {
  const authors = readAuthorsFromFile();
  res.json(authors);
});

router.post('/', (req, res) => {
  const newAuthor = req.body;
  let authors = readAuthorsFromFile();
  authors.push(newAuthor);
  writeAuthorsToFile(authors);
  res.status(201).send('Author added successfully');
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedAuthor = req.body;
  let authors = readAuthorsFromFile();
  authors = authors.map(author => (author.id === id ? updatedAuthor : author));
  writeAuthorsToFile(authors);
  res.send('Author updated successfully');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let authors = readAuthorsFromFile();
  authors = authors.filter(author => author.id !== id);
  writeAuthorsToFile(authors);
  res.send('Author deleted successfully');
});

module.exports = router;
