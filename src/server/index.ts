import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { expressPort } from './config';
import routes from './routes';

express()
  .use([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser()
  ])
  .use('/', routes)
  .listen(expressPort);
