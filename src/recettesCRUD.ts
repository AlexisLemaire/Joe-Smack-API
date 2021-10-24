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
        res.json({ error: { message: "La clef secrete est incorrecte, donc la recette n'a pas pu être créée" } });
    }
    else {
        const title : string = req.body.title;
        const type : string = req.body.type;
        const text : string = req.body.text;
        const ingredients : string[] = req.body.ingredients;
        const prix : number = req.body.prix;
        const prepDuration : number = req.body.prepDuration;
        const nbPersonnes : number = req.body.nbPersonnes;
        const imgName: string = req.body.imgName;
        const insert = new RecetteSchema({ 
            title: title, 
            text: text, 
            type: type, 
            ingredients: ingredients, 
            prix: prix,
            prepDuration: prepDuration,
            nbPersonnes: nbPersonnes,
            imgName: imgName
        });
        insert.save()
        .then(recette => res.json(recette))
        .catch(error => res.json({ error }));
    }
}

//Update une recette selon son id 
const UpdateOne = (req,res) => { 
    if(req.body.secretKey !== process.env.secretKey){
        res.json({ error: { message: "La clef secrete est incorrecte, donc la recette n'a pas pu être mise à jour" } });
    }
    else {
        const title : string = req.body.title;
        const type : string = req.body.type;
        const text : string = req.body.text;
        const ingredients : string[] = req.body.ingredients;
        const prix : number = req.body.prix;
        const prepDuration : number = req.body.prepDuration;
        const nbPersonnes : number = req.body.nbPersonnes;
        const recetteID : number = req.params.id;
        const imgName: string = req.body.imgName;
        RecetteSchema.updateOne({ _id: recetteID }, 
            { 
                title: title, 
                text: text, 
                type: type, 
                ingredients: ingredients, 
                prix: prix,
                prepDuration: prepDuration,
                nbPersonnes: nbPersonnes,
                imgName: imgName
            }
        )
        .then(() => res.json({ success: "OK" }))
        .catch(error => res.json({ error }));
    }
}

const DeleteOne = (req,res) => { 
    if(req.params.secretKey !== process.env.secretKey){
        res.json({ error: { message: "La clef secrete est incorrecte, donc la recette n'a pas pu être supprimée" } });
    }
    else {
        const recetteID : number = req.params.id;
        RecetteSchema.deleteOne({ _id: recetteID })
        .then(() => res.json({ success: "OK" }))
        .catch(error => res.json({ error })); 
    }
}

module.exports = {
    SelectBy, SelectOne, Create, UpdateOne, DeleteOne
}