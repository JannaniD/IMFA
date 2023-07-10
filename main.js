var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require("path")
const { MongoClient, ServerApiVersion } = require('mongodb');

const fs = require('fs');

const directoryPath = path.join(__dirname, 'imfa\\flask\\static\\uploads');

const app = express()

var verifyId = ""
var verifySC = ""

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static(path.resolve(__dirname, "imfa")));
app.use(bodyParser.urlencoded({
    extended: true
}))


const uri = "mongodb+srv://test:test123@cluster0.vg8ltdo.mongodb.net/?retryWrites=true&w=majority";

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

app.post("/sign-up", async (req, res) => {
    var name = req.body.name; 
    var email = req.body.email;
    var phno = req.body.phno;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "verify_id":"123",
        "verify_sc" :"123"
    }
    console.log(data)
    try {
        await client.connect();
        await client.db("admin12").collection('users').insertOne(data, (err, _collection) => {
             if (err) throw err;
             console.log(("Record Inserted Successfully"))

         });

    } finally {
      await client.close()   
    }
    return res.redirect('signup1.html');


})

app.post("/sign-up0", async (req, res) => {
  var IDnumber = req.body.IDnumber;   

  // var data = {
  //     "IDnumber":IDnumber,
      
  // }

  try {
    await client.connect();
    const database = client.db('admin12');
    const collection = database.collection('users');

    // Update data with a condition using the `updateOne` or `updateMany` method
    const filter = { "verify_id":"123" };
    const update = { $set: {  "verify_id":IDnumber } };

    // To update a single document
    const result = await collection.updateOne(filter, update);

    // To update multiple documents
    // const result = await collection.updateMany(filter, update);

    console.log(`${result.modifiedCount} document(s) updated.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
return res.redirect('signup3.html');

})

app.post("/sign-up1", async (req, res) => {
  var SCnumber = req.body.SCnumber;   

  // var data = {
  //     "SCnumber":SCnumber,
      
  // }

  try {
    await client.connect();
    const database = client.db('admin12');
    const collection = database.collection('users');

    // Update data with a condition using the `updateOne` or `updateMany` method
    const filter = {  "verify_sc" :"123" };
    const update = { $set: {  "verify_sc":SCnumber } };

    // To update a single document
    const result = await collection.updateOne(filter, update);

    // To update multiple documents
    // const result = await collection.updateMany(filter, update);

    console.log(`${result.modifiedCount} document(s) updated.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
return res.redirect('signup4.html');

})
  

app.post("/sign-in", async (req, res) => {
  var name = req.body.name; 
  var email = req.body.email;

  try {
      await client.connect();
      const database = client.db('admin12');
      const collection = database.collection('users');
  
      // Query with a double field condition using the `$and` operator
      const query = {
        $and: [
          { name: name },
          { email: email }
        ]
      };
  
      const result = await collection.find(query).toArray();
  
      console.log(result);

      verifyId = result[0].verify_id
  
  if(result.length>0){
      return res.redirect("signin1.html")
  }else{
      return res.send("no login detail")
  }
       

  } finally {
    await client.close()   
  }
  // return res.redirect('signup1.html');
  // return res.send("data")

})

app.post("/verify-number", async (req, res) => {
  var random = req.body.randomValue; 
  var user = req.body.userValue;
  console.log(random)
  console.log(user)
  console.log(verifyId)

  const array = verifyId.split('')
  console.log(array)
  console.log(
      array[random[0]],
      array[random[1]],
      array[random[2]],
      array[random[3]],
  )
  if(  array[parseInt(random[0])]==user[0]&&
  array[parseInt(random[1])]==user[1] &&
  array[parseInt(random[2])]==user[2] &&
  array[parseInt(random[3])]==user[3] 
  ){
      console.log("match")
      return res.redirect("signin2.html")
  }else{
      console.log("unmatch")
      return res.send("unmatching")
      
  }

})


app.get("/signin4", (req,res) =>{
  
  var arr = [];

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {

        console.log(file); 
        arr.push(file);
    });
    res.json(arr)

    console.log(arr);

});




})

app.get("/", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('index.html');

}).listen(5000);

console.log("Listening on Port 5000");
