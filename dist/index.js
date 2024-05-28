"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soket_1 = require("./Utils/soket");
const server_1 = require("./server");
const app = new server_1.Server().app;
const port = process.env.PORT || 8000;
const server = soket_1.default.initSocket(app);
server.listen(port, () => {
    console.log(`[daddiesKart.server] running on http://localhost:${port}`);
});
