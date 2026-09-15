import http from 'node:http'
import { createTour, getStats, getTours } from './controller.js';




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
        // ======== END ============
        
        // ======== Getting tours-Stats ============
        else if(pathname === "/api/tours/stats" && req.method === "GET")
            {
                getStats( req , res)
                return
            }
        // ======== END ============
        
        // =========== CREATING DATA (Tours) ============
        else if(pathname === "/api/tours" && req.method === "POST")
            {
                createTour(req , res)
                return
            }
        // =========== END ============
    
    })



server.listen(PORT || 8000,()=>
    {
        console.log(`Server is running at ${PORT}`)
    })