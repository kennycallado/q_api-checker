import express, { Application } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'

export const app: Application = express();

process.env.NODE_ENV === 'development'
  ? app.use(morgan('dev'))
  : app.use(morgan('combined', { skip: function (_req, res) { return res.statusCode < 400 } }));

app.use(bodyParser.json())
app.use(helmet());

['SIGINT', 'SIGTERM', 'SIGQUIT']
  .forEach(signal => process.on(signal, () => {
    /** do your logic */
    process.exit();
  }));
