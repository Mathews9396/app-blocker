const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('./db/mongoose');
// const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

//Importing Schemas & converting same to models
const User = require('./models/userModel');
const Schedule = require('./models/scheduleModel');
const App = require('./models/appModel');

//Importing Routes
const scheduleRoute = require('./routes/scheduleRoute');
const userRoute = require('./routes/userRoute');
const appRoute = require('./routes/appRoute');

const app = express();

//Middlewaress
app.use(express.json());
app.use('/schedules', scheduleRoute);
app.use('/user', userRoute);
app.use('/apps', appRoute);


//Routes
 app.get('/', (req,res)=>{
    res.send('Homepage');
 });

// const publicDirPath = path.join(__dirname, '../public');
// console.log(publicDirPath);
// app.use(express.static(publicDirPath));

app.listen(port, () => {
    console.log(`Server up and running on ${port}`);
})