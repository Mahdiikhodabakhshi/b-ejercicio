require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api.route');
const personas = require('./routes/personas/personas');
const path = require('path');

const app = express();


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , '/views'));
app.use(express.static(path.join(__dirname,'/public')));


//routes
app.use('/api',apiRoutes);
app.use('/personas',personas)

app.get('/' , (req, res) => res.send('index route'));


//server

app.listen(process.env.PORT , ()=>{
    console.log(`Server on port: ${process.env.PORT}`)
});


mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log('DB ATLAS CONNECTED'))
    .catch((err) => console.log(err));

