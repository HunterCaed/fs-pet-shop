const { Pool } = require('pg');
const { application, json, query } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const path = require('./pets.json')
const client = require('./db')
//const petsPath = path.join(_dirname, 'pets.json')

const PORT = process.env.PORT || 4000

const look = `
SELECT *
FROM pets
`;

app.use(express.json())

app.route('/pets')
    .get(async (req, res) => {  //get all from Database
        try {
            const result = await client.query(look)
            res.json(result.rows)
        } catch (err) {
            res.status(500).json({ error: err});
        }     
    })

    .post(async (req, res) => {  //INSERT INTO owners (name, age) VALUES ('John', 33); DB Insert
        try {               
                const { name, age, kind } = req.body;
                const insert = await client.query('INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3);', [name, age, kind])
                res.json({ success: true, message: `Pet Added`}).status(201)
                    
        } catch (err){
            res.status(500).json({ error: err })
        }
              
    })
 
app.route('/pets/:id')

    .get(async (req, res) =>{ //.get with setting a var at /pets/:id //get 1
        try {
                const id = req.params.id     
                const results = await client.query('SELECT * FROM pets WHERE id = $1;', [id])
                res.json(results.rows[0])
            }
        catch (err){
            res.status(500).json({ error: err})
        }
    })

    .put(async (req, res) => { // .patch where we are inserting into the json file //UPDATE owners SET age = 30 WHERE name = 'Jane';
        try {
            const { name, age, kind } = req.body
            const { id } = req.params    
            await client.query('UPDATE pets SET name = $1, age = $2, kind = $3 WHERE id = $4', [name, age, kind, id])
                
            res.json({ message: `Updated id: ${id} Pet name: ${name}`}).status(204)
        } catch (err) {
            //res.status(500).type('text/plain').send('Internal Server Error .patch')
            res.status(500).json({err})
        }
    })         
    
    .delete(async (req, res) => {
        try {
            const {id} = req.params
            await client.query('DELETE FROM pets WHERE id = $1', [id])
            res.json({ message: `Deleted id: ${id}`}).status(204)
        } catch (err) {
            res.status(500).json({err})
        }
    })
 

app.listen(PORT, function(){
    console.log(`listening on port: 4000 `)
})