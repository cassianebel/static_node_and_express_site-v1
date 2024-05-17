const express = require('express');
const app = express();

const data = require('./data.json');

app.set('view engine', 'pug');

app.use( '/static', express.static('public') );

app.get("/", (req, res, next) => {
  res.render('index', data.projects);
});

app.get("/about", (req, res, next) => {
  res.render('about');
});

app.get("/project/:id", (req, res, next) => {
  const projectId = req.params.id;
  res.render('project', data.projects[projectId]);
});

app.listen(3000, () => {
  console.log(`App is listening on port 3000`);
});

