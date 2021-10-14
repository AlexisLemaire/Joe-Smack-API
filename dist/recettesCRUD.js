const RecetteSchema = require('./schemas/recettes.js');
const SelectBy = (req, res) => {
    if (req.params.type === "all") {
        RecetteSchema.find()
            .then(result => res.json(result))
            .catch(error => res.json({ error }));
    }
    else {
        RecetteSchema.find({ type: req.params.type })
            .then(result => res.json(result))
            .catch(error => res.json({ error }));
    }
};
const SelectOne = (req, res) => {
    RecetteSchema.findOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(error => res.json({ error }));
};
const Create = (req, res) => {
    if (req.body.secretKey !== process.env.secretKey) {
        res.json({ error: { message: "La clef secrete est incorrecte, donc la recette n'a pas pu être créée" } });
    }
    else {
        const title = req.body.title;
        const type = req.body.type;
        const text = req.body.text;
        const ingredients = req.body.ingredients;
        const prix = req.body.prix;
        const prepDuration = req.body.prepDuration;
        const nbPersonnes = req.body.nbPersonnes;
        const insert = new RecetteSchema({
            title: title,
            text: text,
            type: type,
            ingredients: ingredients,
            prix: prix,
            prepDuration: prepDuration,
            nbPersonnes: nbPersonnes
        });
        insert.save()
            .then(recette => res.json(recette))
            .catch(error => res.json({ error }));
    }
};
//Update une recette selon son id 
const UpdateOne = (req, res) => {
    if (req.body.secretKey !== process.env.secretKey) {
        res.json({ error: { message: "La clef secrete est incorrecte, donc la recette n'a pas pu être mise à jour" } });
    }
    else {
        const title = req.body.title;
        const type = req.body.type;
        const text = req.body.text;
        const ingredients = req.body.ingredients;
        const prix = req.body.prix;
        const prepDuration = req.body.prepDuration;
        const nbPersonnes = req.body.nbPersonnes;
        const recetteID = req.params.id;
        RecetteSchema.updateOne({ _id: recetteID }, {
            title: title,
            text: text,
            type: type,
            ingredients: ingredients,
            prix: prix,
            prepDuration: prepDuration,
            nbPersonnes: nbPersonnes
        })
            .then(recette => res.json(recette))
            .catch(error => res.json({ error }));
    }
};
const DeleteOne = (req, res) => {
    if (req.params.secretKey !== process.env.secretKey) {
        res.json({ error: { message: "La clef secrete est incorrecte, donc la recette n'a pas pu être supprimée" } });
    }
    else {
        const recetteID = req.params.id;
        RecetteSchema.deleteOne({ _id: recetteID })
            .then(() => res.json("OK"))
            .catch(error => res.json({ error }));
    }
};
// Quand on upload une image, set son nom dans le schema de la recette grâce à son titre
const UploadImg = (req, res) => {
    if (req.body.secretKey !== process.env.secretKey) {
        res.json({ error: { message: "La clef secrete est incorrecte, donc l'image n'a pas pu être ajoutée" } });
    }
    else {
        const title = req.body.title;
        const imgName = req.files[0].originalname;
        RecetteSchema.updateOne({ title: title }, { imgName: imgName })
            .then(() => res.json("OK"))
            .catch(error => res.json({ error }));
    }
};
module.exports = {
    SelectBy, SelectOne, Create, UpdateOne, DeleteOne, UploadImg
};
//# sourceMappingURL=recettesCRUD.js.map