import express from 'express';
import cookieSession from 'cookie-session';
import path from 'path';
import helmet from 'helmet';
var crypto = require("crypto");

const app = express();
const port = 3000;

const sleep = secs => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, secs * 1000)
})

app.get('*', (req, res, next) => {
  console.log(req.url);
  next();
})

app.get('/signin', (req, res) => {
  res.redirect(200, '/oauth/success');
});

app.get('/oauth/success', (req, res) => {
  let code = crypto.randomBytes(20).toString('hex');
  res.setHeader('Location', 'https://rollplays.me/redirect?code=' + code);
  res.status(302);
  res.json({});
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))