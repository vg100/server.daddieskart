"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const server = new server_1.Server().app;
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`==> Open server running on http://localhost:${port}`);
});
