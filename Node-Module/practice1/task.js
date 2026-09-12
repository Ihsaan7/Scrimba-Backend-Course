import http from "node:http";

// =========== TASK 1 ================
// const server = http.createServer((req ,res)=>
//     {
//         res.writeHead(200 , {'Content-Type':'text/html'})
//         res.end("<h1>Welcome To Wild Horizons</h1>")
//     })



// ================= TASK 2 ==================

// const server = http.createServer((req, res) => {
//   const tours = [
//     { id: 1, name: "Deep Forest Trek", price: 299 },
//     { id: 2, name: "Mountain Ridge Climb", price: 499 },
//   ];

//   if (req.url === "/" && req.method === "GET") {
//     (res.writeHead(200, { "Content-Type": "text/html" }),
//       res.end("<h1>Welcome to the Wild Horizons API!</h1>"));
//   } else if (req.url === "/api/tours" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(tours));
//   }else{
//     res.writeHead(404, {'Content-Type':'application/json'})
//     res.end(JSON.stringify({error:"Route not found"}))
//   }
// });


// ================ TASK 3 ===================

// const server = http.createServer((req , res)=>
//   {

//     const tours = [
//     { id: 1, name: "Deep Forest Trek", price: 299 },
//     { id: 2, name: "Mountain Ridge Climb", price: 499 }
//     ];

//     if(req.url.startsWith("/api/tours/"))
//       {
//         const parts = req.url.split("/")
//         const id = Number(parts[3]);

//         const data = tours.find(t => t.id === id)

//         if (data) {
//           res.writeHead(200 , {'Content-Type':'application/json'});
//           res.end(JSON.stringify(data));
//         } else {
//           res.writeHead(404 , {'Content-Type':'application/json'});
//           res.end(JSON.stringify({error:"Tour not found!"}));
//         }
//       }else
//         {
//           res.writeHead(404 , {'content-type':'application/json'})
//           res.end(JSON.stringify({error:"Tour not found!"}))
//         }
    
//   })



// ================= TASK 4 =====================



























const PORT = 8000;
server.listen(PORT)
console.log(`Server is running at ${PORT}`)