# Node Blogging Boilerplate

Simple boiler plate for a node powered, rest based blogging boilerplate. Simple example for a friend with no rendering or frontend support.

Installation && Running
====
```bash
git clone http://github.com/ccutch/node-blogging-boilerplate
cd node-blogging-boilerplate
npm install
npm start
```

Usage
====
list articles (functionallity comming)
 - `curl http://localhost:5150/articles`
 
get article
 - `curl http://localhost:5150/articles/:id`

create article
 - `curl -F article=@filename http://localhost:5150/articles`

update article
 - `curl -F article=@filename http://localhost:5150/articles/:id`

delete article
 - `curl -X DELETE http://localhost:5150/articles/:id`
 
Data Model
====
```javascript
Article = {
  title: Sting,
  id: String,
  data: String,
  fileName: String,
  fileLocation: String,
  save: Function,
  load: Function,
  delete: Function,
  toString: Function
}
```

Environment Variables
====
```
ARTICLE_DIR = Where to store articles // default = /tmp/blog/articles/
ARTICLE_EXTENSION = File extention for articles // default = .article
```
