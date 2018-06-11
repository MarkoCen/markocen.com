import { config } from 'dotenv';
config();

import { createServer, Server } from 'http';
import app from './app';
import { PORT } from './environments';
import logger from './logger';

const server: Server = createServer(app);

server.listen(PORT, () => {
    logger.info(`my-blog server listen on ${PORT}`);
});
