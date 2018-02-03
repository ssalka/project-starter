import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { expressPort } from './config';
import routes from './routes';

if (process.env.NODE_ENV !== 'production') {
  // start webpack dev server
  import('src/server.dev');
}

express()
  .use([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser()
  ])
  .use('/', routes)
  .listen(expressPort);
