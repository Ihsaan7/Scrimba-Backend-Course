import http from 'node:http'
import { getStats, getTours } from './controller.js';




const PORT = 8000;

const server = http.createServer(async( req ,res)=>
    {
        //-----Getting Url and Pathname--------------
        const parsedUrl = new URL(req.url , `http://${req.headers.host}`)
        const pathname = parsedUrl.pathname;
        
        // ======== Getting all Tours ============
        if(pathname === "/api/tours" && req.method === "GET")
            {
                getTours(req , res);
                return;
            }
        // ======== Getting all Tours ============
        
        // ======== Getting tours-Stats ============
        else if(pathname === "/api/tours/stats" && req.method === "GET")
            {
                getStats( req , res)
                return
            }
        // ======== Getting tours-Stats ============
    })

server.listen(PORT || 8000,()=>
    {
        console.log(`Server is running at ${PORT}`)
    })