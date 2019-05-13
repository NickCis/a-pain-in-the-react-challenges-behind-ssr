import App from './App';
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import routes from './routes';
import nodeFetch from 'node-fetch';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/data', (req, res) => res.json({ data: 'nice data' }))
  .get('/*', async (req, res) => {
    const fetch = (url, opts = {}) =>
      nodeFetch(`${req.protocol}://${req.headers.host}${url}`, {
        ...opts,
        headers: {
          ...req.headers,
          ...opts.headers
        }
      });

    // Requested url
    const url = req.url;

    // XXX: should handle exceptions!
    const initialState = (await Promise.all(
      routes.map(route => {
        const match = matchPath(url, route);
        const { getInitialProps } = route.component;

        return match && getInitialProps
          ? getInitialProps({ fetch, match }).then(d => ({ [url]: d }))
          : undefined;
      })
    )).reduce((state, element) => Object.assign(state, element), {});
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App initialState={initialState} />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
    </body>
</html>`
      );
    }
  });

export default server;
