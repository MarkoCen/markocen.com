import { config } from "dotenv";
config();

import { createServer, Server } from "http";
import app from "./app";
import { PORT } from "./environments";

const server: Server = createServer(app);

server.listen(PORT, () => {
    console.log(`my-blog server listen on ${PORT}`);
});
