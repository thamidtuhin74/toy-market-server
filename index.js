const express = require('express');
var cors = require('cors');//first line
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.port || 5000;

// middle war
app.use(cors());//2nd line
app.use(express.json());

// toy-market-agent
// 2Hzqm2ejKK9V97M

const uri = "mongodb+srv://toy-market-agent:2Hzqm2ejKK9V97M@cluster0.vqsktco.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('simple CRUD is RUNNING');
})

app.listen(port ,()=>{
    console.log(`simple CRUD server is running on port: ${port}`);
})