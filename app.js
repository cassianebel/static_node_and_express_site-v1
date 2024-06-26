const express = require('express');
const app = express();

const data = require('./data.json');

app.set('view engine', 'pug');

app.use( '/static', express.static('public') );

/** 
 * Routes
 */

app.get("/", (req, res, next) => {
  res.render('index', data);
});

app.get("/about", (req, res, next) => {
  res.render('about');
});

app.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = data.projects[projectId];
  if(project) {
    res.render('project', project);
  } else {
    const err = new Error('Sorry, the requested page was not found.');
    err.status = 404;
    next(err);
  }
});


/**
 * Error Handling
 */

app.use((req, res, next) => {
  const err = new Error('Sorry, the requested page was not found.');
  err.status = 404;
  console.error(err.status, err.message);
  res.render('page-not-found', {
    message: err.message,
    error: err
  });
});

app.use((err, req, res, next) => {
  if(!err) {
    const err = new Error('Sorry, there has been an error.');
    err.status = 500;
  }
  console.error(err.status, err.message);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(3000, () => {
  console.log(`App is listening on port 3000`);
});

