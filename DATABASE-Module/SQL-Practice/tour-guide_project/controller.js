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