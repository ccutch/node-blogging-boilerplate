var uuid = require('node-uuid')
var fs = require('fs')
var path = require('path')
var util = require('./util')
var articleDir = process.env.ARTICLE_DIR || '/tmp/blog/articles/'
var articleExtension = process.env.ARTICLE_EXTENSION || '.article'
var multer  = require('multer')
var upload = multer({ dest: path.join(articleDir, 'temp-uploads') })

// Exports
exports.Article = Article;
exports.createRoutes = function(app) {
  util.initPath(articleDir)
  app.post('/articles', upload.single('article'), uploadArticle)
  app.get('/articles/:id', getArticle)
  app.get('/articles', listArticles)
  app.post('/articles/:id', updateArticle)
  app.delete('articles/:id', deleteArticle)
}

// Prototype
function Article(id, title, data) {
  this.title = title || id ? id.split('-')[0] : 'UNTITLED'
  this.id = id ? id : this.title + '-' + uuid.v4()
  this.data = data || ''
  this.fileName = this.id + articleExtension
  this.fileLocation = path.join(articleDir, this.fileName)
  this.save = function(callback) {
    fs.writeFile(this.fileLocation, this.data, callback)
  }
  this.load = function(callback) {
    var self = this
    fs.readFile(this.fileLocation, 'utf-8', function(err, data) {
      self.data = data
      callback(err)
    })
  }
  this.delete = function(callback) {
    fs.unlink(this.fileLocation, callback)
  }
  this.toString = function() {
    var replacer = function(key, value) {
      if(typeof value === 'function') return undefined
      return value
    }
    return JSON.stringify(this, replacer)
  }
  return this
}

// Create
function uploadArticle(req, res) {
  fs.readFile(req.file.path, 'utf-8', function(err, data) {
    if(util.isNotError(err, res)) {
      var article = new Article(null, req.file.originalname.split('.')[0], data)
      article.save(function(err) {
        if(util.isNotError(err, res)) {
          res.send(article.toString())
        }
      })
    }
  })
}

// Retrieve
function listArticles(req, res) {
  res.send('List of articles')
}

function getArticle(req, res) {
  var id = req.params.id
  var article = new Article(id)
  article.load(function(err) {
    if(util.isNotError(err, res)) {
      res.send(article.toString())
    }
  })
}

// Update
function updateArticle(req, res) {
  fs.readFile(req.file.path, 'utf-8', function(err, data) {
    if(util.isNotError(err, res)) {
      var id = req.params.id
      var article = new Article(null, req.file.originalname.split('.')[0], data)
      article.save(function(err) {
        if(util.isNotError(err, res)) {
          res.send(article.toString())
        }
      })
    }
  })
}

// Delete
function deleteArticle(req, res) {
  var id = req.params.id
  var article = new Article(id)
  article.delete(function(err) {
    if(util.isNotError(err, res)) {
      res.send(JSON.stringify({}))
    }
  })
}

