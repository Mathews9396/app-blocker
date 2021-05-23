const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://cluster0.k5kwd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    dbName:'app_blocker',
    user:'mathews96',
    pass:'u66EsUHdmxPmDEbE',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (error, client) => {
    if (error) {
        return console.log(`Unable to connect to DB - ${error}`)
    }
    console.log('db connected');    
});

// mongoose.connect('mongodb://127.0.0.1:27017/app-blocker-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// }, (error, client) => {
//     if (error) {
//         return console.log(`Unable to connect to DB - ${error}`)
//     }
//     console.log('db connected');
    
// });