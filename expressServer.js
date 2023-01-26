//require express
const express = require('express')
const fs = require('fs')
//const { type } = require('os') //not sure what this does
//invoke express
const app = express()
//access the pets.json file
const path = require('./pets.json')

const PORT = process.env.PORT || 8000

app.use(express.json())

app.get('/pets', function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(path)
    

})

app.get('/pets/:id', function(req, res){
    
    if(!path[req.params.id]) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.send('Not Found')
        
    } else {       
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(path[req.params.id]) 
    }

})
//This posts data to the JSON file  on lines 34 and 35it is parsing the body from the Post request, and creating a variable
//It then looks for the edge cases and returns Bad request if outof bounds
//Then reads and writes to the fs
app.post('/pets/', function(req, res){
    req.on('data', function(data){
        let petObj = JSON.parse(data.toString())
        console.log(petObj);
    if(!petObj.age || !petObj.kind || !petObj.name || typeof(petObj.age) == "string" || petObj.kind.trim() == "" || petObj.name.trim() == "") {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.send('Bad Request')
    } else {  
        
        fs.readFile('./pets.json', 'utf-8', function(error, data){
            if (error) {
                console.log(err)
            } else {
                var pets = JSON.parse(data)
                pets.push(petObj)
                fs.writeFile('./pets.json', JSON.stringify(pets), function(error){
                    if (error) {
                        console.log(error)
                    } else console.log(data) 
                })
            }
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(petObj)
        }
    })  
})

app.listen(PORT, function (){
    console.log('the port is working')
})

 // fs.readFile('./pets.json', 'utf-8', (error, data) => {
            //     if (error){
            //         res.status(500).type('test/plain').send('Internal Server Error')
            //     } 
            //     let pets = JSON.parse(data)
            //     pets.push(petObj)
            //     fs.writeFile('./pets.json', JSON.stringify(pets), err => {
            //         if (err) {
            //             res.status(500).type('text/plain').send('Internal Server Error')
            //         } else {
            //             res.status(200).type('application/json').json(pets)
            //         }
            //     }) 
            // }) 
        // let id = req.params.id
        // let petToUpdate = path[id]
       
        // Object.assign(petToUpdate, req.body)

        // path[id] = petToUpdate

        // fs.writeFile('./pets.json', JSON.stringify(path), (err) => {
        //     if (err) {
        //        res.status(500).type('text/plain').send('Internal Server Error')
        //     } else {
        //        res.status(200).type('application/json').json(path[id]);
        //     }
        // })
        // console.log (path[id])
    // }) 
