import http from 'http';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  if (req.url === '/client.js') {
    const client = fs.createReadStream('dist/client.js');
    client.pipe(res);
    return;
  }

  const render = ReactDOMServer.renderToString(<App />);
  const html = `<!doctype html>
<html>
  <head>
    <title>Simple SSR example</title>
  </head>
  <body>
    <div id="container">${render}</div>
    <script src="/client.js"></script>
  </body>
</html>`;

  res.write(html);
  res.end();
});

server.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
