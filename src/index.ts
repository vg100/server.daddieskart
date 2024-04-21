import {Server} from './server'


const server = new Server().server;
const port=process.env.PORT || 8000


server.listen(port,()=>{
 console.log(`[daddiesKart.server] running on http://localhost:${port}`);
})
