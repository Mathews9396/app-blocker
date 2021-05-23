const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/app-blocker-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (error, client) => {
    if (error) {
        return console.log(`Unable to connect to DB - ${error}`)
    }
    console.log('db connected');
    
});

// newUser.save().then((newUser)=>{
//     console.log(`Successefully saved data to DB - ${newUser}`);
// }).catch((error)=>{
//     console.log(`Error! ${error}`);
// })



// const newUser = new User({
//     name:'Andew',
//     email:''
//     age:'Don'
// });

