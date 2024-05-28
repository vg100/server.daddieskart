import SocketManager from './Utils/soket';
import {Server} from './server'


const app = new Server().app;
const port=process.env.PORT || 8000

const server = SocketManager.initSocket(app);

server.listen(port,()=>{
 console.log(`[daddiesKart.server] running on http://localhost:${port}`);
})
