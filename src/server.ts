/**
 * Here is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'

import routes from './routing'

const PORT: number = parseInt(process.env.PORT || '3000')

// Create Express server
const app: Application = express();

// Express configuration
process.env.NODE_ENV === 'development' ?
  app.use(morgan('dev')) :
  app.use(morgan('combined', { skip: function (_req, res) { return res.statusCode < 400 } }));

app.use(bodyParser.json())
app.use(helmet());

// Routes
app.use(routes);

// Start Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
