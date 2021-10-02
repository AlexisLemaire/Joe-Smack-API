const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json()); 
app.use(cors());
require("dotenv").config(); //COMMENT ON PROD

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.e54xl.mongodb.net/cook?retryWrites=true&w=majority`, 
{useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('co OK'))
.catch(() => console.log('co ERROR'));

const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './img'); },
    filename: (req, file, cb) => { cb(null , file.originalname); }
});
const upload = multer({ storage: storage })

app.get('/img/:imgName', (req,res) => {
    res.sendFile(req.params.imgName, { root: 'img/' });
})

// ************************************************* ROUTES *************************************************************** //

const CRUDRecettes = require('./CRUD/recettes');
app.post('/Recettes/Create', CRUDRecettes.Create);
app.post('/Recettes/CreateImg', upload.any(), CRUDRecettes.CreateImg); //UPLOAD DANS IMG/
app.get('/Recettes/SelectByType/:type', CRUDRecettes.SelectBy);
app.get('/Recettes/SelectOne/:id', CRUDRecettes.SelectOne);
app.delete('/Recettes/DeleteOne/:id/:secretKey', CRUDRecettes.DeleteOne);
app.put('/Recettes/UpdateOne/:id', CRUDRecettes.UpdateOne);
app.post('/Recettes/UploadImg', upload.any(), (req,res) => {}); //UPLOAD DANS IMG/

// app.use(app.json()); 
app.listen(process.env.PORT || 3001);
