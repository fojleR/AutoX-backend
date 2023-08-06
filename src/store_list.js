const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/AutoX").then(function(){
    console.log("Database is connect successfully.");
}).catch(function(err){
    console.log(err);
});


const StoreSchema = new mongoose.Schema({
    Store_name: String,
    division: String,
    district: String,
    thana: String,
    url: String
  });
  
const store_list = mongoose.model('store_list', StoreSchema);

app.get('/store', async (req, res) => {
    try {
      const items = await store_list.find();
      console.log(items);
      res.send(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Error fetching items' });
    }
  });


app.listen(5000, function(){
    console.log("The server is running on port 5000");
})