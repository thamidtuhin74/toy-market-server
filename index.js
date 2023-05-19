const express = require('express');
var cors = require('cors');//first line
const app = express()
const port = process.env.port || 5000;

// middle war
app.use(cors());//2nd line
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('simple CRUD is RUNNING');
})

app.listen(port ,()=>{
    console.log(`simple CRUD server is running on port: ${port}`);
})