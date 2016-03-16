'use strict';
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let router = express.Router();

const blogTitle = 'blog2';
const URLRoot = '/unit-3/problem/blog2';
const templateRoot = 'unit-3/blog2';
const pages = {
  index: '/',
  newpost: '/newpost',
  post: '/post'
};
const templates = {
  index: '/index',
  newpost: '/newpost',
  post: '/post'
};

function fullPath (page) {
  return URLRoot + page;
}
function templatePath (template) {
  return templateRoot + template;
}

class BlogPost {
  constructor (title, content) {
    this.title = title;
    this.content = content;
  }
  get validTitle () {
    return /^[a-zA-Z0-9 _-]{1,20}$/.test(this.title);
  }
  get validContent () {
    return this.content !== '';
  }
  get valid () {
    return this.validTitle && this.validContent;
  }
  get titleErrorMessage () {
    return this.validTitle
      ? ''
      : 'Invalid Title';
  }
  get contentErrorMessage () {
    return this.validContent
      ? ''
      : 'Invalid Title';
  }
}
class EmptyBlogPost extends BlogPost {
  constructor () {
    super('', '');
  }
  get titleErrorMessage () {
    return '';
  }
  get contentErrorMessage () {
    return '';
  }
}

class Blog {
  constructor (dbName) {
    this.db = new sqlite3.Database('./databases/' + dbName + '.db');
  }
  addPost (post, callback) {
    this.db.run(
      'INSERT INTO blog (title, content, time) VALUES (?, ?, CURRENT_TIMESTAMP)',
      post.title,
      post.content,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  deletePost (id, callback) {
    this.db.run(
      'DELETE FROM blog WHERE id = ?',
      id,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  getPost (id, callback) {
    const query = 'SELECT * FROM blog WHERE id = ?';
    this.db.get(query, id, (err, row) => {
      if (err) console.log(err);
      callback(row);
    });
  }
  getAllPosts (callback) {
    const query = 'SELECT * FROM blog ORDER BY time DESC';
    this.db.all(query, (err, rows) => {
      if (err) console.log(err);
      callback(rows);
    });
  }
  getLastPostID (callback) {
    this.db.get('SELECT last_insert_rowid()', (err, row) => {
      if (err) console.log(err);
      callback(row['last_insert_rowid()']);
    });
  }
}

let blog = new Blog(blogTitle);


router.route(pages.index)
  .get((req, res) => {
    renderIndex(res);
  })
  .post((req, res) => {
    const deleteID = req.body.deleteID;
    if (deleteID !== undefined) {
      blog.deletePost(deleteID, () => {
        res.redirect(fullPath(pages.index));
      });
    } else {
      res.redirect(fullPath(pages.index));
    }
  });

router.route(pages.newpost)
  .get((req, res) => {
    renderNewpost(res, new EmptyBlogPost());
  })
  .post((req, res) => {
    const post = new BlogPost(req.body.postTitle, req.body.content);
    if (post.valid) {
      blog.addPost(post, () => {
        blog.getLastPostID((id) => {
          res.redirect(fullPath(pages.post) + '/' + id);
        });
      });
    } else {
      renderNewpost(res, post);
    }
  });

router.route(pages.post + '/:id')
  .get((req, res) => {
    const id = req.params.id;
    blog.getPost(id, (post) => {
      renderPost(res, post);
    });
  });

function renderIndex (res) {
  blog.getAllPosts((posts) => {
    res.render(templatePath(templates.index), {
      title: blogTitle,
      posts: posts
    });
  });
};

function renderNewpost (res, post) {
  res.render(templatePath(templates.newpost), {
    title: 'new post',
    post: post
  });
};

function renderPost (res, post) {
  res.render(templatePath(templates.post), {
    title: post.title,
    post: post
  });
};

module.exports = router;
