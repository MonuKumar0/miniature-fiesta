import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes.js';
import Constants from './config/constants.js';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(Constants.port, () => {
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
