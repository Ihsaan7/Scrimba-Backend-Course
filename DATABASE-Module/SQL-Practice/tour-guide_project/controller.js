import db from "./db.js";


//--------------- GETTING All Tours --------------------------
export function getTours(req , res)
{
    const sql=`
        SELECT
            tours.id, 
            tours.name AS tour_name,
            tours.price,
            tours.difficulty,
            guides.name AS guide_name
        FROM tours
        LEFT JOIN guides ON tours.guide_id = guides.id
    `

    db.all(sql , [] , (err , rows)=>
        {
            if(err)
                {
                    console.error("Cannot fetch tours from DB:", err.message)
                    res.writeHead(
                        500,
                        {'content-type':'text/plain'}
                    )
                    res.end("Something went wrong while fetching tours from DB!!!")
                    return
                }
            res.writeHead(
                200,
                {'content-type':'application/json'}
            )
            res.end(JSON.stringify(rows)

        )
        })
}

//-------------- GETTING STATS of Tours ---------------------
export function getStats(req , res)
{
    const sql =`
        SELECT
            COUNT(*) AS total_count,
            AVG(price) AS avg_price,
            MAX(price) AS max_price,
            Min(price) AS min_price
        FROM tours
    `

    db.all(sql, [], (err , rows)=>
        {
            if(err)
                {
                    console.error("Cannot fetch tours-Stats from DB:", err.message)
                    res.writeHead(
                        500,
                        {'content-type':'text/plain'}
                    )
                    res.end("Something went wrong while fetching Stats from DB!!!")
                    return
                }
            res.writeHead(
                200,
                {'content-type':'application/json'}
            )
            res.end(JSON.stringify(rows)

        )
      
        })
}

//------------- POSTING Tours -------------------
export function createTour (req , res)
{
    let body=[]

    try {
        req.on("data" , (chunk)=>
        {
            body += chunk;
        })
        req.on("end",()=>
            {
                const data = JSON.parse(body);
                const {name , price , difficulty} = data;

                if(!name || !price || !difficulty )
                    {
                    res.writeHead
                        (
                            400,
                            { 'content-type':"text/plain"}
                        )
                    res.end("All fileds are required!")
                    return
                    }

                const sql = `
                    INSERT INTO tours
                        (name , price , difficulty)
                    VALUES(?, ?, ?)
                `
                const params = [name , price , difficulty]
                db.run(sql, params , function(err)
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
                            res.end(JSON.stringify({error:"Something went wrong while INSERTING into DB"}))
                            return
                        }
                        res.writeHead(
                            201,
                            { 'content-type':"application/json"}
                        )
                        res.end(JSON.stringify(
                            {
                                id:this.lastID,
                                name,
                                price,
                                difficulty
                            }
                        ))
                    })
            })    
    } catch (error) {
        console.error(error.message)
                            res.writeHead(
                                500,
                                {
                                    "content-type":"application/json"
                                }
                            )
                            res.end(JSON.stringify({error:"Something went wrong while INSERTING into DB"}))
                            return
    }
    
}