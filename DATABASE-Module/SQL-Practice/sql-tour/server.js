import http from "node";
import { getAllTours, getTourByFilter, getTourByName, getTourByRange , getTourByBL, getToursStats, addTours, updateTour, deleteTour, getToursDetails, getAllDetail, getWorkLoad, getFullSummary, addRating, tieredTours, applyDiscount } from "./controller.js";

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
else if(pathname === "api/tours/full-summary" && req.method === "GET")
  {
    getFullSummary( req , res)
    return
  }
else if(pathname === "api/tours/rating" && req.method === "POST")
  {
    addRating(req ,res)
    return
  }
else if(pathname === "api/tours/price-tier" && req.method === "GET")
  {
    tieredTours(req ,res)
    return
  }
else if(pathname === "api/tours/apply-discount" && req.method === "POST")
  {
    applyDiscount(req ,res)
    return
  }
  else {
    res.writeHead(404, {
      "content-type": "text/plain",
    });
  res.end("No Route FOUND!");
  }
});
