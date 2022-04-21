import express from 'express';
import cors from 'cors';

import { MongoClient } from 'mongodb';
import dotenv from "dotenv"

const app = express()
dotenv.config();
const PORT=process.env.PORT;
 
const MONGO_URl=process.env.MONGO_URl;
async function createConnection(){
  const client = new MongoClient(MONGO_URl);
  await client.connect();
  console.log("Mongodb is connected");
  return client;
}
const client = await createConnection();
app.use(cors());
app.use(express.json());
app.get('/mobile', async function (req, res) {
  // db.mobile.find()
  const mobiles=await client.db("newdb").collection("mobiles").find({}).toArray();
  res.send(mobiles)
})

app.post('/mobile',async function(req,res){
  // db.mobile.insetMany(data)
  const data = req.body;

  const result= await client.db("newdb").collection("mobiles").insertMany(data);
  res.send(result)
})
// Mobiles
app.listen(PORT,()=>console.log("App Started " ,PORT))