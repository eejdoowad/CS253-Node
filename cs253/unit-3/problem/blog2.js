'use strict';
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let router = express.Router();
let path = require('path');
let db = new sqlite3.Database(path.join(__dirname, 'blog.db'));

function validTitle (title) {
  return /^[a-zA-Z0-9 _-]{1,20}$/.test(title);
}

function validContent (content) {
  return content !== '';
}

router.post('/', (req, res) => {
  const deleteID = req.body.deleteID;
  if (deleteID !== undefined) {
    deleteEntryThenRender(deleteID, res);
  } else {
    res.redirect('/unit-3/problem/blog');
  }
});

router.post('/newpost', (req, res) => {
  const postTitle = req.body.postTitle;
  const content = req.body.content;
  const isValidTitle = validTitle(postTitle);
  const isValidContent = validContent(content);
  if (isValidTitle && isValidContent) {
    addEntryThenRender(req, res, {
      title: postTitle,
      content: content
    });
  } else {
    const titleError = isValidTitle
      ? ''
      : 'Invalid Title';
    const contentError = isValidContent
      ? ''
      : 'You must enter something!';
    renderNewPost(res, postTitle, content, titleError, contentError);
  }
});

router.get('/', (req, res) => {
  renderContent(res);
});

router.get('/newpost', (req, res) => {
  renderNewPost(res);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('id: ' + id);
  renderBlogPost(res, id);
});

function addEntryThenRender (req, res, entry) {
  db.run(
    'INSERT INTO blog (title, content, time) VALUES (?, ?, CURRENT_TIMESTAMP)',
    entry.title,
    entry.content,
    (err) => {
      if (err) console.log(err);
      db.get('SELECT last_insert_rowid()', (err, row) => {
        if (err) console.log(err);
        res.redirect('/unit-3/problem/blog/' + row['last_insert_rowid()']);
      });
    });
}

function deleteEntryThenRender (deleteID, res) {
  db.run(
    'DELETE FROM blog WHERE id = ?',
    deleteID,
    (err) => {
      if (err) console.log(err);
      res.redirect('/unit-3/problem/blog');
    });
}

function renderContent (res, postTitle, content, titleError, contentError) {
  const query = 'SELECT * FROM blog ORDER BY time DESC';
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    res.render('unit-3/blog', {
      title: 'blog',
      postTitle: postTitle,
      entries: rows,
      titleError: titleError,
      contentError: contentError
    });
  });
};


function renderNewPost (res, postTitle, content, titleError, contentError) {
  const query = 'SELECT * FROM blog ORDER BY time DESC';
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    res.render('unit-3/blog/newpost', {
      title: 'blog',
      postTitle: postTitle,
      content: content,
      titleError: titleError,
      contentError: contentError
    });
  });
};

function renderBlogPost (res, id) {
  const query = 'SELECT * FROM blog WHERE id = ?';
  db.get(query, id, (err, row) => {
    if (err) console.log(err);
    res.render('unit-3/blog/post', {
      title: row.title,
      entry: row
    });
  });
};

// db.serialize(function () {
//   query();
// });

module.exports = router;
