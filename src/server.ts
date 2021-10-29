import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import CRUDRecettes from './recettesCRUD'

const app = express();
app.use(express.json()); 
app.use(cors());
// require("dotenv").config(); //COMMENT ON PROD

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.e54xl.mongodb.net/cook?retryWrites=true&w=majority`, 
{useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('co OK'))
.catch(() => console.log('co ERROR'));

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './img'); },
    filename: (req, file, cb) => { cb(null , file.originalname); }
});
const upload = multer({ storage: storage })

app.get('/img/:imgName', (req,res) => {
    res.sendFile(req.params.imgName, { root: 'img/' });
})
app.post('/Recettes/UploadImg', upload.any(), (req,res) => {
    res.json({success: "L'upload de l'image a bien fonctionné"});
}); 

// ************************************************* ROUTES *************************************************************** //

app.post('/Recettes/Create', CRUDRecettes.Create);
app.get('/Recettes/SelectByType/:type', CRUDRecettes.SelectBy);
app.get('/Recettes/SelectOne/:id', CRUDRecettes.SelectOne);
app.delete('/Recettes/DeleteOne/:id/:secretKey', CRUDRecettes.DeleteOne);
app.put('/Recettes/UpdateOne/:id', CRUDRecettes.UpdateOne);
 
console.log(`App listening on ${process.env.PORT || 3001}`)
app.listen(process.env.PORT || 3001);
