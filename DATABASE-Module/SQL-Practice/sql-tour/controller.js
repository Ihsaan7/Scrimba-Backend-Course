import db from "./db.js";

export function getAllTours(req , res )
    {
                 db.all("SELECT * FROM tours" , [] , (err , row)=>
            {
                if(err)
                    {
                        console.error(err.message)
                        return
                    }
                res.writeHead(
                    200,
                    {
                        "content-type":"application/json"
                    },
                )
                res.end(JSON.stringify(row))
            })
    }


    
export function getTourByName (req , res)
{
    db.all("SELECT name , difficulty FROM tours", [] , (err , row)=>
        {
            if(err)
                {
                    console.error(err.message)
                }
            res.writeHead(
                200,
                {
                    "content-type":"application/json"
                }
            )
            res.end(JSON.stringify(row))
        })
}


export function getTourByFilter(req , res , parsedUrl)
{
    const maxPriceParams = parsedUrl.searchParams.get("maxPrice")
    const difficultyParams = parsedUrl.searchParams.get("difficulty")


    if(maxPriceParams && difficultyParams)
        {
            const maxPrice = Number(maxPriceParams);
            const difficulty = difficultyParams;

            const sql = "SELECT * FROM tours  WHERE price <= ? AND difficulty = ?"

            db.all(sql, [maxPrice , difficulty] , (err , rows)=>
                {
                    if(err)
                        {
                            console.err(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while fetching from DB"}))
                            return
                        }
                
                    res.writeHead(
                        200,
                        {
                            "content-type":"application/json"
                        }
                    )
                    res.end(JSON.stringify(rows))
                })
        }
}


export function getTourByRange (req ,res , parsedUrl)
{
    const minParams = parsedUrl.searchParams.get("min")
    const maxParams = parsedUrl.searchParams.get("max")

    if(minParams && maxParams)
        {
            const min = Number(minParams)
            const max = Number(maxParams)
        
            const sql = "SELECT * FROM tours WHERE price BETWEEN ? AND ?"

            db.all(sql , [min , max] , (err , rows)=>
                {
                    if(err)
                        {
                            console.error(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while fetching from DB"}))
                            return
                        }
                    res.writeHead(
                        200,
                        {
                            "content-type":"application/json"
                        }
                    )
                    res.end(JSON.stringify(rows))
                })
        
        }else
            {
                res.writeHead(
                    400,
                    {
                        "content-type":"text/plain"
                    }
                )
                res.end("Min and Max both values are required!")
            }
    
}


export function getTourByBL(req,res , parsedUrl)
{
    const budgetParam = parsedUrl.searchParams.get("budget")
    const limitParam = parsedUrl.searchParams.get("limit") || 3;

    if(budgetParam)
        {
            const budget = Number(budgetParam)
            const limit = Number(limitParam)

            const sql = "SELECT * FROM tours WHERE price <= ? ORDER BY price DESC limit = ?"
            db.all(sql , [budget , limit], (err , rows)=>
                {
                    if(err)
                        {
                            console.error(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while fetching from DB"}))
                            return
                        }
                    res.writeHead(
                        200,
                        {
                            "content-type":"application/json"
                        }
                    )
                    res.end(JSON.stringify(rows))
                })
        }else
            {
                res.writeHead(
                    400,
                    {
                        "content-type":"text/plain"
                    }
                )
                res.end("Budget parameter is required!")
            }
}


export function getToursStats(req , res)
{
    const sql = "SELECT COUNT(*) AS total_count, AVG(price) AS average_price , MAX(price) AS max_price FROM tours";
    db.get(sql , [], (err , row)=>
        {
           
                    if(err)
                        {
                            console.error(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while fetching from DB"}))
                            return
                        }
                    res.writeHead(
                        200,
                        {
                            "content-type":"application/json"
                        }
                    )
                    res.end(JSON.stringify(row))
                    
        })
    
}

export function addTours(req,res)
{
    let body = "";

    req.on("data", (chunk)=>
        {
            body += chunk
        })
    req.on("end", ()=>
        {
            const data = JSON.parse(body)
            const { name , price , difficulty } = data;
        
            if(!(name , price , difficulty))
                {
                    res.writeHead
                    (
                        400,
                        { 'content-type':"text/plain"}
                    )
                    res.end("All fileds are required!")
                    return
                }
            const sql = `INSERT INTO tours (name , price , difficulty)
             VALUES(? , ? ,?)`

            const params = [name , price , difficulty]
            db.run(sql , params , function(err){
               if(err)
                        {
                            console.error(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while INSERTING into DB"}))
                            return
                        }
                    res.writeHead(
                        201,
                        {
                            "content-type":"application/json"
                        }
                    )
                    res.end(JSON.stringify(
                        {
                            id:this.lastID,
                            name,
                            price,
                            difficulty
                        }))
            })
        })

    
}


export function updateTour( req , res)
{

    let body = "";
    try {
            req.on("data", (chunk)=>
                {
                    body += chunk;
                })
            req.on("end", ()=>
                {
                    const data = JSON.parse(body)
                    const {id , price} = body

                    if(!id || !price)
                        {
                            res.writeHead
                            (
                                400,
                                { "content-type":"text/plain"}
                            )
                            res.end("Both fields are required!")
                            return
                        }
                    const sql= `UPDATE tours
                                SET price = ?
                                WHERE id = ?
                                `
                    const params = [id , price]
                    db.run(sql , params , function(err)
                    {
                         if(err)
                        {
                            console.error(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while UPADING the DB"}))
                            return
                        }
                        if(this.changes === 0)
                            {
                                res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"No row matched with the ID provided!"}))
                            return
                            }
                    res.writeHead(
                        200,
                        {
                            "content-type":"application/json"
                        }
                    )
                    res.end(JSON.stringify(
                        {
                            id:this.lastID,
                            price,
                        }))
                    })
                })
    } catch (error) {
        console.error(error.message)
        res.writeHead(
            500,
            {
                "content-type":"text/plain"
            }
        )
        res.end("Error while parsing the data!!!")
    }
}

export function deleteTour(req , res , tourId)
{
    if(!tourId)
        {
            res.writeHead(
                400,
                {
                    "content-type":"text/plain"
                }
            )
            res.end("Tour id missing!")
            return
        }

    const sql =`DELETE FROM tours WHERE id = ?`
    const params = Number(tourId)

    db.run(sql , params , function(err)
    {
        if(err)
                        {
                            console.error(err.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while Deleting the specific DB"}))
                            return
                        }
        res.writeHead
        (
            200,
            {
                "content-type":"application/json"
            }
        )
        res.end(JSON.stringify(
            {
                message:"Deletion successful",
                id,
            }))
    })
}


export function getToursDetails( req , res)
{
    const sql = `
        SELECT
            tours.id,
            tours.name AS tour_name,
            tours.Price,
            guides.name AS guide_name,
            guides.email AS guide_email
        FROM tours
        INNER JOIN guides ON tour.guide_id = guides.id

    `
    db.all(sql, [] , ( err , rows)=>
        {
            if(err)
                {
                    console.error("Detailed tours query failed:", err.message);
                     res.writeHead(500, { "Content-Type": "application/json" });
                     res.end(JSON.stringify({ error: "Something went wrong while fetching detailed tours." }));
                    return;
                }
            res.writeHead(
                200,
                {
                    "content-type":"application/json"
                }
            )
            res.end(JSON.stringify(rows))
        })
}

export function getAllDetail( req , res)
{
    const sql=`
        SELECT
            tours.id,
            tours.name AS tour_name,
            tours.price,
            guides.name AS guide_name,
            guides.email AS guide_email
        FROM tours
        LEFT JOIN guides ON tours.guide_id = guides.id
    `

    db.all(sql ,[] , (err , rows)=>
        {
            if(err)
                {
                    console.error("All-Detial query Failed!" , err.message)
                    res.writeHead(
                        500,
                        {   'content-type':'application/json'}
                    )
                    res.end(JSON.stringify({error:"Something went wrong while fetching detials!"}))
                }
            res.writeHead(
                200,
                {   'content-type':'application/json'}
            )
            res.end(JSON.stringify(rows))
        })
    
}

export function getWorkLoad(req , res)
{
    const sql=`
        SELECT
            guides.id AS guide_id,
            guides.name AS guide_name,
            COUNT(tours.id) AS total_tours,
        FROM guides
        LEFT JOIN guides ON guides.id = tours.guide_id
        GROUP BY guides.id
    `
    
    db.all(sql ,[] , (err , rows)=>
        {
            if(err)
                {
                    console.error("All-Detial query Failed!" , err.message)
                    res.writeHead(
                        500,
                        {   'content-type':'application/json'}
                    )
                    res.end(JSON.stringify({error:"Something went wrong while fetching detials!"}))
                    return
                }
            res.writeHead(
                200,
                {   'content-type':'application/json'}
            )
            res.end(JSON.stringify(rows))
        })
}

export function getFullSummary(req , res)
{
    const sql=`
        SELECT
            tours.id,
            tours.name AS tour_name,
            tours.price,
            guides.name AS guide_name,
            categories.name AS category_name
        FROM tours
        LEFT JOIN guides ON tours.guide_id = guides.id,
        LEFT JOIN categories ON tours.category_id = categories.id
    `

    db.all(sql ,[] , (err , rows)=>
        {
            if(err)
                {
                    console.error("All-Detial query Failed!" , err.message)
                    res.writeHead(
                        500,
                        {   'content-type':'application/json'}
                    )
                    res.end(JSON.stringify({error:"Something went wrong while fetching detials!"}))
                    return
                }
            res.writeHead(
                200,
                {   'content-type':'application/json'}
            )
            res.end(JSON.stringify(rows))
        })
}