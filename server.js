const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,postToken, Accept')
    next();
})
// parse application/json
app.use(bodyParser.json())

// Connection URL
var url = 'mongodb://localhost:27017/EmployeeDB';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    console.log("Connected correctly to server");

    app.get('/', function (req, res) {
        db.collection('employee').find().toArray(function (err, result) {
            res.send(result);
        })
    })

    app.post('/', function (req, res) {
        console.log(req.body);
        db.collection('employee').insert(req.body, function (err, result) {
            res.send(result);
        })
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})