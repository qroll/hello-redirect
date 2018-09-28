import express from 'express';
import cookieSession from 'cookie-session';
import path from 'path';

const app = express();
const port = 9000;

const sleep = secs => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, secs * 1000)
})

app.use(cookieSession({
  secret: 'this is secret',
  path: '/',
  maxAge: 1000 * 60 * 10,
  sameSite: 'lax',
  httpOnly: false
}));

app.get('/redirect', (req, res) => {
  req.session = { myCookie: new Date() }
  res.redirect('/');
});

app.get('/ok', (req, res) => {
  req.session = { myCookie: new Date() }
  res.status(200);
  res.send('All good')
});

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))