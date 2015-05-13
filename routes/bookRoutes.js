var express = require('express');

var routes = function(Book){
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', function(req, res, next){
    Book.findById(req.params.bookId, function(err, book){
      if (err) {
        res.status(500).send(err);
      } else if(book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get(function(req, res){
      res.json(req.book);
    })
    .put(function(req, res){
      book = req.book;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save(function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .patch(function(req, res){
      if(req.body._id) {
        delete req.body._id;
      }

      for(var p in req.body) {
        req.book[p] = req.body[p];
      }
      req.book.save(function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .delete(function(req, res){
      req.book.remove(function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });
  return bookRouter;
};

module.exports = routes;







