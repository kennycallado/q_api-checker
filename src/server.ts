import express, { Application } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'

import routes from './routing'

const PORT: number = parseInt(process.env.PORT || '3000')

const app: Application = express();

process.env.NODE_ENV === 'development' ?
  app.use(morgan('dev')) :
  app.use(morgan('combined', { skip: function (_req, res) { return res.statusCode < 400 } }));

app.use(bodyParser.json())
app.use(helmet());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
