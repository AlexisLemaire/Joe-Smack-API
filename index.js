const cors = require('cors');
const express = require('express')();
const router = require('./router');
const mongoose = require('mongoose');
require("dotenv").config(); //COMMENT ON PROD

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.e54xl.mongodb.net/cook?retryWrites=true&w=majority`, 
{useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('co OK'))
.catch(() => console.log('co ERROR'));

express.use(cors());
express.use(express.json()); 
express.use('/', router);
express.listen(process.env.PORT || 3000);
