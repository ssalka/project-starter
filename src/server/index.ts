import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

express()
  .use([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser()
  ])
  .get('/ping', (req, res) => res.send('pong'))
  .listen(3000);
