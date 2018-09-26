const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const angRoutes = require('./routes/angrouter');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname, "angular"))); // OVO JE ZA ANGULAR ako ce biti single Server

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use('/ang', angRoutes);
app.use((req, res, next) => { // OVO JE ZA ANGULAR ako ce biti single Server
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
