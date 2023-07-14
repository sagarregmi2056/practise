const express = require('express');
// defining the package
const cors = require('cors')
const router = require('./router/user_router');
const connectdb = require('./db/db');
const bodyParser = require('body-parser');
const path = require('path');

connectdb();   
// it is the call back of database function
const app = express();
app.use('/',express.static(path.join(__dirname, 'files')));

app.use(bodyParser.urlencoded({ extended: false }))
// postman json fomate
app.use(express.json());
app.use(cors()); 
// connection error hatauna cors use garyako



// const router = require('./router/user_router');

app.use(router);
// call back
// using router


// testing app.get 
app.get('/', function (req, res) {

    // this code is to host 
  res.send('Hello World')

//   here it is sending response 
})

app.get('/home', function (req, res) {

    // this code is to host 
  res.send('Hello home sulochana')

//   here it is sending response 
})

app.get('/address', function (req, res) {

    // this code is to host 
  res.send('Hello address')

//   here it is sending response 
})


app.listen(4000,function(){
    console.log("it is running at port 4000");
}) 