var bookController = function(Book){

  var post = function(req, res){
    var book = new Book(req.body);
    var msg = ' ';
    var error = false;

    if(!req.body.title){
      error = true;
      msg += 'Title is required. ';
    } else if (!req.body.author) {
      error = true;
      msg += 'Author is required. ';
    }
    if (error) {
      res.status(400);
      res.send(msg);
    } else {
      book.save();
      res.status(201);
      res.send(book);
    }
  };

  var get = function(req, res){
    var query = [];
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, function(err, books){
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  return {
    post: post,
    get: get
  }

};

module.exports = bookController;