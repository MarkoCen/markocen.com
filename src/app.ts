import * as express from 'express';
import rootRouter from './routers/root';

const app: express.Application = express();

app.use('/', rootRouter);

export default app;