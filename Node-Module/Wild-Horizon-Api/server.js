import http from 'http'
import { getTourById , getTours } from './tourController.js'

const PORT = 8000;

const server = http.createServer((req , res)=>
    {
        const parsedUrl = new URL(req.url , `http://${req.headers.host}`)
        const pathname = parsedUrl.pathname;

        if(req.url === "/api/tours" && req.method === "GET")
            {
                res.writeHead(
                    200,
                    {
                        'content-type':'text/html',
                        "Access-Control-Allow-Origin": "*"
                    }
                )
                res.end(`<h1>HOME PAGE for WILD HORIZON</h1>`)
            }
        else if(pathname === "/api/tours" && req.method === "GET")
            {
                getTours(req ,res , parsedUrl)
                return
            }
        else if(pathname.startsWith("/api/tours/") && req.method === "GET")
            {
                 const parts = pathname.split("/");
                        const tourId = parts[3];
                
                        getTourById(req,res,tourId);
                        return
            }

         res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});


server.listen(PORT, () => {
  console.log(`Practice server running at http://localhost:${PORT}`);
        
    })