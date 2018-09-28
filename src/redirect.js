import express from 'express';
import cookieSession from 'cookie-session';
import path from 'path';
import helmet from 'helmet';

const app = express();
const port = 9000;

const csp = {
  self: `'self'`,
  unsafeInline: `'unsafe-inline'`,
  unsafeEval: `'unsafe-eval'`,
  scripts: [
  ],
  images: [
  ],
  child: [
  ],
  styles: [
    'blob:'
  ]
}

const getDirectives = () => {
  return {
    defaultSrc: [csp.self],
    imgSrc: [csp.self, ...csp.images],
    formAction: [csp.self],
    connectSrc: [csp.self, ...csp.scripts]
    // 'report-uri': '/csp/report',
  }
}

const sleep = secs => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, secs * 1000)
})

app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: getDirectives()
// }));
app.set('view engine', 'ejs');

app.get('*', (req, res, next) => {
  console.log(req.url);
  next();
})

app.use(cookieSession({
  name: 'session',
  secret: 'this is secret',
  maxAge: 1000 * 60 * 10,
  sameSite: 'lax'
}));

app.get('/redirect', (req, res) => {
  res.header('Set-Cookie', 'sessionType=active; Path=/');
  req.session = { myCookie: new Date() }

  res.setHeader('Location', 'https://337e726f.ngrok.io/');
  res.status(302);
  res.json({});
});

app.get('/ok', (req, res) => {
  req.session = { myCookie: new Date() }
  res.status(200);
  res.send('All good')
});

app.get('/', async (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))