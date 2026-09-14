import http from 'node:http'
import { getTours } from './controller.js';




const PORT = 8000;

const server = http.createServer(async( req ,res)=>
    {
        const parsedUrl = new URL(req.url , `http://${req.headers.host}`)
        const pathname = parsedUrl.pathname;
        
        if(pathname === "/api/tours" && req.method === "GET")
            {
                getTours(req , res);
                return;
            }
    })

server.listen(PORT || 8000,()=>
    {
        console.log(`Server is running at ${PORT}`)
    })