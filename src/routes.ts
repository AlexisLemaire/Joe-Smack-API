import CRUDRecettes from './recettesCRUD'
import multer from 'multer'
import express from "express"

const router = express.Router()

var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './img'); },
    filename: (req, file, cb) => { cb(null , file.originalname); }
});
const upload = multer({ storage: storage })

router.get('/img/:imgName', (req,res) => {
    res.sendFile(req.params.imgName, { root: 'img/' });
})
router.post('/Recettes/UploadImg', upload.any(), (req,res) => {
    res.json({success: "L'upload de l'image a bien fonctionné"});
}); 

router.post('/Recettes/Create', CRUDRecettes.Create);
router.get('/Recettes/SelectByType/:type', CRUDRecettes.SelectBy);
router.get('/Recettes/SelectOne/:id', CRUDRecettes.SelectOne);
router.delete('/Recettes/DeleteOne/:id/:secretKey', CRUDRecettes.DeleteOne);
router.put('/Recettes/UpdateOne/:id', CRUDRecettes.UpdateOne);
 
export default {
    router
}