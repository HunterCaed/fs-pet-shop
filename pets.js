#!/usr/local/bin/node

const fs = require('fs'); // add this to the top of your js file


const arr = process.argv;
const index = process.argv[3]
const kind = process.argv[4]
const name = process.argv[5]
const placeHolder = process.argv[6]



//const petsResults = require('./pets.json');



if (arr[2] === undefined) {
    console.log('Usage: node pets.js [read | create | update | destroy]')

    process.exit(1);
} else if(arr[2] === 'read') {
    fs.readFile('./pets.json', 'utf8', function(err, data){
        if (err) {
            console.log(err)
        }
        const pets = JSON.parse(data)
        if (index < 0 || index >= pets.length) {
        console.error('Usage: node pets.js read INDEX')
        } else if(index === undefined) {
        console.log(pets)
         } else {
        console.log(pets[index])

         }
        
    })
} else if(arr[2] === 'create') {
    fs.readFile('./pets.json', 'utf-8', function(error, data){
        if (error) {
            console.log(err)
        } else {
            const pets = JSON.parse(data);
            const obj = {};
            obj.age = Number(arr[3]);
            obj.kind = arr[4]
            obj.name = arr[5]
            pets.push(obj)
            fs.writeFile('./pets.json', JSON.stringify(pets), function(error){
                if (error) {
                    console.log(error)
                } else console.log(obj)
            })
        }
    })
} else if(arr[2] === 'update') {
    fs.readFile('./pets.json', 'utf-8', function(error, data){
        if (error) {
            console.log(err)
        } 
        var pets = JSON.parse(data)
              
        if (index === undefined || kind === undefined || name === undefined || placeHolder === undefined) {
            console.log('Usage: node pets.js update INDEX AGE KIND NAME')
        } else {
            pets[index].age = Number(arr[4])
            pets[index].kind = name
            pets[index].name = placeHolder
            console.log(pets[index]);
        }

        fs.writeFile('./pets.json', JSON.stringify(pets), function(error){
            if (error) {
                console.log(error)
            } 
        })


    })
} else if(arr[2] === 'destroy') {
    fs.readFile('./pets.json', 'utf-8', function(error, data){
        if (error) {
            console.log(err)
        } 
        var pets = JSON.parse(data)

        if(index === undefined) {
            console.log('Usage: node pets.js destroy INDEX')
        } else {
            console.log(pets[index])
            pets.splice(index, 1)

        }
        fs.writeFile('./pets.json', JSON.stringify(pets), function(err, data) {
            if (error) {
                console.log(err)
            } 
        })

    })
}

    
    
// } else if (arr[2] === 'create') {
//     const obj = {}
//     obj.age = Number(arr[3]);
//     obj.kind = arr[4]
//     obj.name = arr[5]
//     petsResults.push(obj)
//     console.log(petsResults)
//     console.log('test')
//     console.log(obj)
    
    
// }

// function createPet(age, kind, name) {
//     let obj = {age: parseInt(age), kind: kind, name: name};
//     let fileResult; 
//     fs.readFile('./pets.json', 'utf8', function(error, data){
//         if(error){
//             console.log(error)
//         } else {
//             fileResult = JSON.parse(data);
//             fileResult.push(obj);
//             fs.writeFile('./pets.json', JSON.stringify(fileResult), function(error){
//                 if (error) {
//                     console.log(error)
//                 } else console.log(obj)
//             })
//         }
//     });
// }