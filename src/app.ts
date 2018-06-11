import * as express from 'express';
import * as morgan from 'morgan';
import rootRouter from './routers/root';

const app: express.Application = express();

app.use(morgan('combined'));

app.use('/', rootRouter);

export default app;
