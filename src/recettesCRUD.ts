import { recette } from "./types/types";

const RecetteSchema = require('./schemas/recettes.js');

const SelectBy = (req,res) => { 
    if(req.params.type === "all"){
        RecetteSchema.find()
        .then(result => res.json(result))
        .catch(error => res.json({ error }));
    } else {
        RecetteSchema.find({ type: req.params.type })
        .then(result => res.json(result))
        .catch(error => res.json({ error }));
    }
}
 
const SelectOne = (req,res) => { 
    RecetteSchema.findOne({ _id: req.params.id })
    .then(result => res.json(result))
    .catch(error => res.json({ error }));
}

const Create = (req,res) => { 
    if(req.body.secretKey !== process.env.secretKey){
        res.json({ error: "La clef secrete est incorrecte, donc la recette n'a pas pu être créée" });
    }
    else {
        const postedRecette : recette = req.body;
        const insert = new RecetteSchema({ 
            title: postedRecette.title, 
            text: postedRecette.text, 
            type: postedRecette.type, 
            ingredients: postedRecette.ingredients, 
            prix: postedRecette.prix,
            prepDuration: postedRecette.prepDuration,
            nbPersonnes: postedRecette.nbPersonnes,
            imgName: postedRecette.imgName
        });
        insert.save()
        .then(recette => res.json(recette))
        .catch(error => res.json({ error }));
    }
}

//Update une recette selon son id 
const UpdateOne = (req,res) => { 
    if(req.body.secretKey !== process.env.secretKey){
        res.json({ error: "La clef secrete est incorrecte, donc la recette n'a pas pu être mise à jour" });
    }
    else {
        const postedRecette : recette = req.body;
        const recetteID : number = req.params.id;
        RecetteSchema.updateOne({ _id: recetteID }, 
            { 
                title: postedRecette.title, 
                text: postedRecette.text, 
                type: postedRecette.type, 
                ingredients: postedRecette.ingredients, 
                prix: postedRecette.prix,
                prepDuration: postedRecette.prepDuration,
                nbPersonnes: postedRecette.nbPersonnes,
                imgName: postedRecette.imgName
            }
        )
        .then(() => res.json({ success: "OK" }))
        .catch(error => res.json({ error }));
    }
}

const DeleteOne = (req,res) => { 
    if(req.params.secretKey !== process.env.secretKey){
        res.json({ error: "La clef secrete est incorrecte, donc la recette n'a pas pu être supprimée" });
    }
    else {
        const recetteID : number = req.params.id;
        RecetteSchema.deleteOne({ _id: recetteID })
        .then(() => res.json({ success: "OK" }))
        .catch(error => res.json({ error })); 
    }
}

export default {
    SelectBy, SelectOne, Create, UpdateOne, DeleteOne
}