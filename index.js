const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect( 'mongodb+srv://MonUser:Dotsuka91210@cluster0.e54xl.mongodb.net/cook?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('co OK'))
.catch(() => console.log('co ERROR'));

app.use(cors());
app.use(express.json()); 
app.use('/', router);
app.listen(process.env.PORT || 3000);
