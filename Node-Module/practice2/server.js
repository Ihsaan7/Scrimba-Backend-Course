import { tours } from "./toursData.js"
import http from "http"

const server = http.createServer((req,res)=>
    {

        // ================ TASK 1 ===================
        //         if(req.url.startsWith("/api/tours/"))
        //             {
        //                 const parts = req.url.split("/");
        //                 const urlId = Number(parts[3]);
        
        //                 const data = tours.find(t => t.id === urlId)
        //                 if(data)
//                     {
//                         res.writeHead(200 ,{'content-type':'application/json'});
//                         res.end(JSON.stringify(data))
//                     }
//                 else{
//                         res.writeHead(404 , {"content-type":"application/json"})
//                         res.end(JSON.stringify({error:"Tour not found!"}))
//                 }
//             }
//         else{
    //              res.writeHead(404 , {"content-type":"application/json"})
    //                         res.end(JSON.stringify({error:"Tour not found!"}))
    //         }
    
    // ================ TASK 2 ===================
    // e.g., "http://localhost:8000/api/tours?maxPrice=300"

    // const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
    // const pathname = parsedUrl.pathname;

    // if(pathname === "/api/tours" && req.method === "GET")
    //     {
    //         const maxPriceParam = parsedUrl.searchParams.get("maxPrice")
    //         if(maxPriceParam){ 
    //             const maxPrice = Number(maxPriceParam)
    //             const filterTour = tours.filter(tour => tour.price <= maxPrice)

    //             res.writeHead(200 , {"content-type":"application/json"})
    //             res.end(JSON.stringify(filterTour))
    //         }else
    //             {
    //                  res.writeHead(200, { "Content-Type": "application/json" });
    //         res.end(JSON.stringify(tours));
    //             }
    //     }
    //     else {
    //     res.writeHead(404, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify({ error: "Route not found" }));
    // }

    
    const parsedUrl = new URL (req.url , `http://${req.headers.host}`)
    const pathname = parsedUrl.pathname;

    if(req.url === "/" && req.method === "GET")
        {
            res.writeHead(200 , 
                {'Content-Type':'text/html'},
                {'Access-Control-Allow-Origin':"*"}
            )
            res.end("<h1>Welcome To Wild Horizons</h1>")
        } 
    else if(req.url.startsWith("/api/tours/"))
        {
            const parts = req.url.split("/");
            const urlId = parts[3];

            const data = tours.find(t => t.id === urlId)
            res.writeHead(
                200,
                {'content-type':'application/json'},
                {'Access-Control-Allow-Origin':"*"}
            )
            res.end(JSON.stringify(data))
        }
    else if(pathname === "/api/tours" && req.method === "GET")
        {
            const maxPriceParam = parsedUrl.searchParams.get("maxPrice")
            const maxPrice = Number(maxPriceParam)

            const data = tours.filter(tour => tour.id <= maxPrice)

            if(data)
                {
            res.writeHead(
                200,
                {'content-type':'application/json'},
                {'access-control-allow-origin':"*"}
            )
            res.end(JSON.stringify(data))
            }else
                {
                    res.writeHead(
                200,
                {'content-type':'application/json'},
                {'access-control-allow-origin':"*"}
            )
            res.end(JSON.stringify(tours))
                }
        }else
            {
                 {
                    res.writeHead(
                404,
                {'content-type':'application/json'},
            )
            res.end(JSON.stringify({error:"NO TOUR ROUTE!"}))
                }
            }






    })

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});


