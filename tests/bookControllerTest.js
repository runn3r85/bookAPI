var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests', function(){
  describe('Post', function(){
    it('should not allow an empty title on post', function(){
      var Book = function(book){this.save = function(){}};

      var req = {
        body: {
          author: 'My author',
          genre: 'Fiction'
        }
      }

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      var bookController = require('../controllers/bookController')(Book);

      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0]);
      res.send.calledWith('Title is required. ').should.equal(true, 'Sent message:' + res.status.args[0]);
    })

    it('should not allow an empty author on post', function(){
      //Mock a book
      var Book = function(book){this.save = function(){}};

      var req = {
        body: {
          title: 'My Book Title',
          genre: 'Fiction'
        }
      }

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      var bookController = require('../controllers/bookController')(Book);

      bookController.post(req, res);
      
      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0]);
      res.send.calledWith('Author is required. ').should.equal(true);
    })

    it('should not allow an empty author nor title on post', function(){
      //Mock a book
      var Book = function(book){this.save = function(){}};

      var req = {
        body: {
          genre: 'Fiction'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../controllers/bookController')(Book);

      bookController.post(req, res);
      
      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0]);
      res.send.calledWith('Title is required. Author is required. ').should.equal(true);
    })
  })
})