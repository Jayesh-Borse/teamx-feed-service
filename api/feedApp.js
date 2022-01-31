const express = require("express");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts.route.js")

//Azure Cosmos DB connection

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.COSMOS_DB_URI)
// .then(() => {
//   console.log('Database connection successful')
// })
// .catch(err => {
//   console.error('Database connection error: ' + err)
// })


//Test DB connection
mongoose.connect(
    process.env.MONGO_DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);
  
app.use(express.json());
app.use(helmet);
app.use(morgan("common"));

app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Feed Service Backend server is running!");
});