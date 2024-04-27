import { Utils } from './Utils/utils';
import {Server} from './server'


const server = new Server().server;
const port=process.env.PORT || 8000

//   const dd=Utils.calculateEndTime("4h")
//         console.log(dd,'hhh')


server.listen(port,()=>{
 console.log(`[daddiesKart.server] running on http://localhost:${port}`);
})
