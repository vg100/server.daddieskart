"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const server = new server_1.Server().server;
const port = process.env.PORT || 8000;
//   const dd=Utils.calculateEndTime("4h")
//         console.log(dd,'hhh')
server.listen(port, () => {
    console.log(`[daddiesKart.server] running on http://localhost:${port}`);
});
