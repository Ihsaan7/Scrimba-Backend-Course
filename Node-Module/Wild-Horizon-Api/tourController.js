import {tours} from './toursData.js'

export function getTours(req,res, parsedUrl)
{
    const maxPriceParams = parsedUrl.searchParams.get("maxPrice");
    const difficultyParams = parsedUrl.searchParams.get("difficulty");
    
    let filteredTours = tours

    if(maxPriceParams)
        {
            const maxPrice = Number(maxPriceParams)
            filteredTours = filteredTours.filter(t=> t.price <= maxPrice)
        }
    if(difficultyParams)
        {
            filteredTours = filteredTours.filter(t=> t.difficulty.toLowerCase() === difficultyParams.toLowerCase())
        }


    res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(filteredTours));
}


export function getTourById(req, res, tourId) {

  const filteredTourId = tours.filter(t => t.id === tourId)
  if(filteredTourId)
    {
        res.writeHead(
            200,
            {
                "content-type":"application/json",
                "Access-Control-Allow-Origin": "*"
            }
        )
        res.end(JSON.stringify(filteredTourId))
    }
  else
    {
         res.writeHead(
            404,
            {
                "content-type":"application/json",
            }
        )
        res.end(JSON.stringify({error:"No tour found with that id!"}))
    }
}
