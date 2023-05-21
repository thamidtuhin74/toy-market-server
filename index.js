const express = require('express');
var cors = require('cors');//first line
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.port || 5000;

// middle war
app.use(cors());//2nd line
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.vqsktco.mongodb.net/?retryWrites=true&w=majority`;


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

    // create database
    const database  = client.db('toysDB');//create database
    const toysCollection = database.collection('toys');//collection in database

    // const results = toysCollection.updateMany( {}, { $rename: { "seller.name": "seller.sellerName" } } );
    // console.log('change: ',results );


    app.get('/all-toys',async(req, res) => {
        const cursor = toysCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
    app.get('/all-toys/:id',async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const singleToy = await toysCollection.findOne(query);
        res.send(singleToy);
        console.log('singleToy: ',singleToy);
    })

    app.post('/add-a-toy' , async(req,res)=>{
        const toy = req.body;
        console.log('new user : ',toy);
              //sent to DB
        const result = await toysCollection.insertOne(toy);//send to MongDB
        res.send(result);
        console.log(result)
      })
    
    app.delete('/all-toys/:id', async(req, res)=>{
      const id  =  req.params.id;
      console.log('delete id from server: ', id);
      const query = {_id: new ObjectId(id)}
      const result  = await toysCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/all-toys/:id', async(req, res) => {
      const id  = req.params.id;
      const updatedToy  = req.body;
      console.log(updatedToy);
      
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('simple CRUD is RUNNING');
})

app.listen(port ,()=>{
    console.log(`simple CRUD server is running on port: ${port}`);
})