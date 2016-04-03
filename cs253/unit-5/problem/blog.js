'use strict';
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let router = express.Router();

let User = require('./user');
let userDB = require('./userDB');
let blog = require('./postDB');

const options = {
  path: '/unit-5/problem/blog',
  maxAge: 1800000,
  signed: true
};
const delOptions = {
  path: '/unit-5/problem/blog'
};

router.use('/', (req, res, next) => {
  req.show = {
    loggedIn: req.signedCookies.username ? true : false,
    username: req.signedCookies.username || '',
    id: req.signedCookies.id || ''
  };
  next();
});



const blogTitle = 'blog';
const URLRoot = '/unit-5/problem/blog';
const templateRoot = 'unit-5/blog';
const pages = {
  index: '/',
  newpost: '/newpost',
  post: '/post',
  delete: '/delete'
};
const templates = {
  home: '/home',
  newpost: '/newpost',
  post: '/post'
};

function fullPath (page) {
  return URLRoot + page;
}
function templatePath (template) {
  return templateRoot + template + '/index';
}

class BlogPost {
  constructor (title, content, author) {
    this.title = title;
    this.content = content;
    this.author = author;
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

router.route(pages.index)
  .get((req, res) => {
    blog.getAllPosts((posts) => {
      renderHome(req, res, posts);
    });
  });

router.route('/json')
  .get((req, res) => {
    blog.getAllPosts((posts) => {
      res.type('text/json').send(JSON.stringify(posts, null, 4));
    });
  });
router.route(pages.post + '/:id/json')
  .get((req, res) => {
    const id = req.params.id;
    blog.getPost(id, (post) => {
      res.type('text/json').send(JSON.stringify(post, null, 4));
    });
  });

router.route(pages.newpost)
  .get((req, res) => {
    renderNewpost(req, res, new EmptyBlogPost());
  })
  .post((req, res) => {
    const post = new BlogPost(req.body.postTitle, req.body.content, req.show.id);
    if (post.valid) {
      blog.addPost(post, () => {
        blog.getLastPostID((id) => {
          res.redirect(fullPath(pages.post) + '/' + id);
        });
      });
    } else {
      renderNewpost(req, res, post);
    }
  });

router.route(pages.post + '/:id')
  .get((req, res) => {
    const id = req.params.id;
    blog.getPost(id, (post) => {
      renderPost(req, res, post);
    });
  });

router.route(pages.delete + '/:id')
  .post((req, res) => {
    const id = req.params.id;
    blog.deletePost(id, () => {
      res.redirect(fullPath(pages.index));
    });
  });

function renderHome (req, res, posts) {
  res.render(templatePath(templates.home), {
    title: blogTitle,
    posts: posts,
    show: req.show
  });
};

function renderNewpost (req, res, post) {
  res.render(templatePath(templates.newpost), {
    title: 'new post',
    post: post,
    show: req.show
  });
};

function renderPost (req, res, post) {
  res.render(templatePath(templates.post), {
    title: post.title,
    post: post,
    show: req.show
  });
};









router.route('/register')
  .get((req, res) => {
    res.render('unit-5/blog/register', {
      title: 'register',
      show: req.show,
      validUsername: true,
      validPassword: true,
      passwordsMatch: true,
      validEmail: true,
      usernameAvailable: true
    });
  })
  .post((req, res) => {
    if (req.show.loggedIn) {
      res.redirect('/unit-5/problem/blog');
    } else {
      let newUser = new User(req.body.username,
        req.body.password, req.body.email);
      if (newUser.valid && req.body.password === req.body.password2) {
        User.userNameAvailable(newUser.username, (available) => {
          if (available) {
            userDB.add(newUser, (user) => {
              res.cookie('username', user.username, options);
              res.cookie('id', user.id, options);
              res.redirect('/unit-5/problem/blog');
            });
          } else {
            res.render('unit-5/blog/register', {
              title: 'register',
              show: req.show,
              username: req.body.username,
              password: req.body.password,
              password2: req.body.password2,
              email: req.body.email,
              validUsername: newUser.validUsername,
              validPassword: newUser.validPassword,
              passwordsMatch: req.body.password === req.body.password2,
              validEmail: newUser.validEmail,
              usernameAvailable: false
            });
          }
        });
      } else {
        res.render('unit-5/blog/register', {
          title: 'register',
          show: req.show,
          username: req.body.username,
          password: req.body.password,
          password2: req.body.password2,
          email: req.body.email,
          validUsername: newUser.validUsername,
          validPassword: newUser.validPassword,
          passwordsMatch: req.body.password === req.body.password2,
          validEmail: newUser.validEmail,
          usernameAvailable: true
        });
      }
    }
  });
router.route('/login')
  .get((req, res) => {
    res.render('unit-5/blog/login', {
      title: 'login',
      show: req.show
    });
  })
  .post((req, res) => {
    if (req.show.loggedIn) {
      res.redirect('/unit-5/problem/blog');
    } else {
      const username = req.body.username;
      const password = req.body.password;
      User.validate(username, password, (valid, user) => {
        if (valid) {
          res.cookie('username', user.username, options);
          res.cookie('id', user.id, options);
          res.redirect('/unit-5/problem/blog');
        } else {
          res.render('unit-5/blog/login', {
            title: 'login',
            show: req.show,
            loginFailed: true,
            username: user,
            password: password
          });
        }
      });
    }
  });
router.route('/logout')
  .post((req, res) => {
    res.clearCookie('username', delOptions);
    res.clearCookie('id', delOptions);
    res.redirect('/unit-5/problem/blog');
  });
router.route('/users')
  .get((req, res) => {
    userDB.getAll((users) => {
      res.render('unit-5/blog/users', {
        title: 'users',
        users: users,
        show: req.show
      });
    });
  });








module.exports = router;
