const MySchema = require('../mongoSchemas/recettes') ;
const keysSchema = require("../mongoSchemas/keys");
const success = { success : 'OK' }

//Créer une recette
exports.Create = (req,res) => { 
    keysSchema.findOne({ key: req.body.secretKey })
    .then((result) => {
        if(result === null){
            res.json({ error: { message: "La clef secrete est incorrecte" } });
        }
        else {
            const insert = new MySchema({ 
                title: req.body.title, 
                text: req.body.text, 
                type: req.body.type, 
                ingredients: req.body.ingredients, 
                prix: req.body.prix
            })
            insert.save()
            .then(() => res.json(success))
            .catch(error => res.json({ error }));
        }
    });
}

//Receptionne l'image envoyée, set son nom dans l'enregistrement de la recette/
exports.CreateImg = (req,res) => { 
    keysSchema.findOne({ key: req.body.secretKey })
    .then((result) => {
        if(result === null){
            res.json({ error: { message: "La clef secrete est incorrecte" } });
        }
        else {
            MySchema.updateOne({ title: req.body.title }, { imgName: req.files[0].originalname })
            .then(() => res.json(success))
            .catch(error => res.json({ error }));
        }
    });
}


//Récupère les recettes selon leur type (all, entree, plat, patisserie)
exports.SelectBy = (req,res) => { 
    if(req.params.type === "all"){
        MySchema.find()
        .then(result => res.json(result))
        .catch(error => res.json({ error }));
    } else {
        MySchema.find({ type: req.params.type })
        .then(result => res.json(result))
        .catch(error => res.json({ error }));
    }
}


//Récupère une recette selon son id 
exports.SelectOne = (req,res) => { 
    MySchema.findOne({ _id: req.params.id })
    .then(result => res.json(result))
    .catch(error => res.json({ error }));
}

//Delete une recette selon son id 
exports.DeleteOne = (req,res) => { 
    keysSchema.findOne({ key: req.params.secretKey })
    .then((result) => {
        if(result === null){
            res.json({ error: { message: "La clef secrete est incorrecte" } });
        }
        else {
            MySchema.deleteOne({ _id: req.params.id })
            .then(() => res.json(success))
            .catch(error => res.json({ error }));
        }
    });
}

//Update une recette selon son id 
exports.UpdateOne = (req,res) => { 
    keysSchema.findOne({ key: req.body.secretKey })
    .then((result) => {
        if(result === null){
            res.json({ error: { message: "La clef secrete est incorrecte" } });
        }
        else {
            MySchema.updateOne({ _id: req.params.id }, 
                { 
                    title: req.body.title, 
                    text: req.body.text, 
                    type: req.body.type, 
                    ingredients: req.body.ingredients, 
                    prix: req.body.prix
                }
            )
            .then(() => res.json(success))
            .catch(error => res.json({ error }));
        }
    });
}
