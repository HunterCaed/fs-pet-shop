
const { application, json } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const path = require('./pets.json')
//const petsPath = path.join(_dirname, 'pets.json')

//let petData = JSON.parse('./pets.json')

const PORT = process.env.PORT || 4000

app.use(express.json())


app.route('/pets')
    .get((req, res) => {  //generic .get that retrieves all pets at /pets
        res.status(200).type('application/json').json(path)
        console.log(path[1])
    })

    .post((req, res) => { //posts new pets to pets.json
        let petObj = req.body
        console.log(req.body)
        if(!petObj.age || !petObj.kind || !petObj.name || typeof(petObj.age) == "string" || petObj.kind.trim() == "" || petObj.name.trim() == "") {
            res.status(404).type('text/plain').send('Bad Request')
        } else {
            fs.readFile('./pets.json', 'utf-8', (error, data) => {
                if (error){
                    res.status(500).type('test/plain').send('Internal Server Error')
                } 
                let pets = JSON.parse(data)
                pets.push(petObj)
                fs.writeFile('./pets.json', JSON.stringify(pets), err => {
                    if (err) {
                        res.status(500).type('text/plain').send('Internal Server Error')
                    } else {
                        res.status(200).type('application/json').json(pets)
                    }
                }) 
            })
        }
    })
 


// app.post('/pets/', function(req, res){
//     req.on('data', function(data){
//         let petObj = JSON.parse(data.toString())
//         console.log(petObj);
//     if(!petObj.age || !petObj.kind || !petObj.name || typeof(petObj.age) == "string" || petObj.kind.trim() == "" || petObj.name.trim() == "") {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.send('Bad Request')
//     } else {  
        
//         fs.readFile('./pets.json', 'utf-8', function(error, data){
//             if (error) {
//                 console.log(err)
//             } else {
//                 var pets = JSON.parse(data)
//                 pets.push(petObj)
//                 fs.writeFile('./pets.json', JSON.stringify(pets), function(error){
//                     if (error) {
//                         console.log(error)
//                     } else console.log(data) 
//                 })
//             }
//         })
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(petObj)
//         }
//     })  
// })


app.route('/pets/:id')

    .get((req, res) =>{ //.get with setting a var at /pets/:id
        if(!path[req.params.id]) {
            res.status(404).type('text/plain').send('Not Found')        
        } else {       
            res.status(200).type('application/json').send(path[req.params.id]);
        }
    })

    .patch((req, res) => { // .patch where we are inserting into the json file
        let id = req.params.id
        let petToUpdate = path[id]
       
        Object.assign(petToUpdate, req.body)

        path[id] = petToUpdate

        fs.writeFile('./pets.json', JSON.stringify(path), (err) => {
            if (err) {
               res.status(500).type('text/plain').send('Internal Server Error')
            } else {
               res.status(200).type('application/json').json(path[id]);
            }
        })
        console.log (path[id])
    })  

    .delete((req, res) => {
        let id = req.params.id
        let petToUpdate = path[id]

        path.splice(id, 1) //splice's out the requsted elmenet in the array

        fs.writeFile('./pets.json', JSON.stringify(path), (err) => {
            if (err) {
                res.status(500).type('text/plain').send('Internal Server Error')
            } else {
               res.status(200).type('application/json').json(petToUpdate);
            }
        })
        
    }) 

app.listen(PORT, function(){
    console.log(`listening on port: 4000 `)
})