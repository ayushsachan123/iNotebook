const connectToMongo = require('./db');
const express = require("express");
var cors = require('cors')

connectToMongo();
var app = express()
app.use(cors())
const port = 5000;

//If we want to use req.body then we have to use middleware
app.use(express.json());
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, function(){
    console.log(`iNotebook backend listening at http://localhost:${port}`);
})
