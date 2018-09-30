const fs = require('fs')
const path = require('path')
const Hapi = require('hapi')
const http2 = require('http2')
const Inert = require('inert');

const port = 9000;

const server = new Hapi.Server({
  tls: true,
  listener: http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname + '/server.key')),
    cert: fs.readFileSync(path.join(__dirname + '/server.crt'))
  }),
  host: 'localhost',
  port
})

const start = async () => {

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/redirect',
    handler: function (request, reply) {
      // cookie
      reply.state('data', 'hello', {
        path: '/'
      });

      return reply.redirect('/');
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: { file: path.join(__dirname + '/index.html') }
  })

  server.start((err) => {
    if (err) console.error(err)
    console.log(`Started ${server.connections.length} connections`)
  })

}

start();

// app.get('/', async (req, res) => {
//   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//   res.sendFile(path.join(__dirname + '/index.html'));
// });
