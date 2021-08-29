const express = require('express');
const r = express.Router();

const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './img'); },
    filename: (req, file, cb) => { cb(null , file.originalname); }
});
const upload = multer({ storage: storage })


const CRUDRecettes = require('./m_crud/recettes');
r.post('/Recettes/Create', CRUDRecettes.Create);
r.post('/Recettes/CreateImg', upload.any(), CRUDRecettes.CreateImg); //UPLOAD DANS IMG/
r.get('/Recettes/SelectAll', CRUDRecettes.SelectAll);
r.get('/Recettes/SelectByType/:type', CRUDRecettes.SelectBy);
r.get('/Recettes/SelectOne/:id', CRUDRecettes.SelectOne);
r.delete('/Recettes/DeleteOne/:id', CRUDRecettes.DeleteOne);
r.put('/Recettes/UpdateOne/:id', CRUDRecettes.UpdateOne);
r.post('/Recettes/UploadImg', upload.any(), (req,res) => {}); //UPLOAD DANS IMG/

const CRUDUsers = require('./m_crud/users');
r.post('/Utilisateurs/Create', CRUDUsers.Create);
r.post('/Utilisateurs/Login', CRUDUsers.Login);

r.get('/img/:imgName', (req,res) => {
    res.sendFile(req.params.imgName, { root: 'img/' });
})

module.exports = r;
