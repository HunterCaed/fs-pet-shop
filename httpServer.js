'use strict'
const fs = require('fs');
const http = require('http')
const url = require('url')
const port = process.env.PORT || 8000;
const path = require('./pets.json')
//console.log(path[0])
const petRegExp = /^\/pets\/(.*)$/;


const server = http.createServer(function(req,res){
     var adr = req.url;
     var q = url.parse(adr, true)
     console.log(q.host)
     console.log(q.pathname)
     //localhost:800 host /pets pathname
     

    if (req.method === 'GET' && q.pathname == '/pets') {
        var pets = JSON.stringify(path)
        res.setHeader('Content-Type', 'application/json');
        res.end(pets);
        res.statusCode = 200;
    } else if (req.method === 'GET' && req.url == '/pets/0') {
        var firstPet = JSON.stringify(path[0])
        res.setHeader('Content-Type', 'application/json');
        res.end(firstPet);
    } else if (req.method === 'GET' && req.url == '/pets/1') {
        var secondPet = JSON.stringify(path[1])
        res.setHeader('Content-Type', 'application/json');
        res.end(secondPet);
    } else if (req.method === 'GET' && req.url == '/pets/2' || req.url == '/pets/-1') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
})

server.listen(port, function(){
    console.log('Server listening on port', port);
})
//var petsPath = path.join(__dirname, 'guests.json');
// var meow = "meow";
// var guestsJSON = JSON.stringify(meow);

// res.setHeader('Content-Type', 'application/json');
// res.end(guestsJSON);
// }