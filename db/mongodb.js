//Used for working with MongoDB along without the help of Mongoose

const {MongoClient, ObjectID} = require('mongodb');
const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017';
const databaseName = 'app-blocker';

MongoClient.connect(uri, {useUnifiedTopology:true,useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log(`Unable to connect to DB - ${error}`);
    }

    // console.log('Connected succesfully');
    const db= client.db(databaseName);
    // db.collection('users').insertOne({
    //     name:'Mathews',
    //     age:27
    // }, (error, result)=>{
    //     if(error){
    //         return console.log(`Unable to insert user to DB - ${error}`);
    //     }
    //     console.log(result.ops);
    // })

    db.collection('users').findOne({_id: new ObjectID("60a7e6d3c647753e8a2c20ce")}, (error, result) =>{
        if(error){
            return console.log(`Unable to find & delete user to DB - ${error}`);
        }
        console.log(result);
    })
})

