require("dotenv").config(); 

const fakeRecette = {
    secretKey: process.env.secretKey,
    title: "Epinards à la crème",
    type: "plat",
    text: "Recette...",
    ingredients: ["Epinards","Crème","Sel"],
    prix: 3,
    prepDuration: 20,
    nbPersonnes: 3
}

module.exports = {
    fakeRecette
}