import http from "node";
import { getAllTours, getTourByFilter, getTourByName, getTourByRange , getTourByBL, getToursStats, addTours, updateTour, deleteTour, getToursDetails, getAllDetail, getWorkLoad } from "./controller.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
  // GET /api/tours
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (pathname === "/api/tours" && req.med) {
    getAllTours(req, res);
    return;
  } else if (pathname === "/api/tours/basic" && req.method === "GET"){
    getTourByName(req, res);
    return;
  }else if(pathname === "/api/tours/search" && req.method === "GET")
    {
        getTourByFilter(req , res , parsedUrl)
        return
    }
else if(pathname === "/api/tours/range" && req.method === "GET")
    {
        getTourByRange(req , res , parsedUrl)
        return
    } 
else if(pathname === "/api/tours/limit" && req.method === "GET")
    {
        getTourByBL(req , res , parsedUrl)
        return
    }
else if(pathname === "/api/tours/stats" && req.method === "GET")
  {
    getToursStats( req , res)
    return
  }
else if(pathname === "/api/tours" && req.method === "POST")
  {
      addTours(req , res)
      return
  }
else if(pathname === "/api/tours/update" && req.method === "PATCH")
    {
      updateTour(req ,res)
      return
    }
else if(pathname.startsWith === "/api/tours/delete/" && req.medod === "DELETE")
  {
    const tourId = parsedUrl.searchParams.get("id")
    deleteTour(req , res ,tourId);
    return
  }
else if(pathname === "/api/tours/detailed" && req.method === "GET")
  {
    getToursDetails( req , res)
    return;
  }
else if(pathname === "/api/tours/all-detailed" && req.method === "GET")
    {
      getAllDetail( req , res)
      return
    }
else if(pathname === "api/tours/workload" && req.method === "GET")
  {
    getWorkLoad( req , res)
    return
  }
  else {
    res.writeHead(404, {
      "content-type": "text/plain",
    });
  res.end("No Route FOUND!");
  }
});
