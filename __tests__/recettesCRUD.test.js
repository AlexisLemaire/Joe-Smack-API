const axios = require("axios");
// require("dotenv").config(); // COMMENT ON PROD 

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

const expectedRecette = {
    _id: expect.any(String),
    title: expect.any(String),
    type: expect.any(String),
    text: expect.any(String),
    ingredients: expect.any(Array),
    prix: expect.any(Number),
    prepDuration: expect.any(Number),
    nbPersonnes: expect.any(Number)
}

describe("UNIT RECETTES CRUD TESTS", () => {
    let id;

    it("should POST a recette & verify if it was correctly POST", async () => {
        let res = (await axios.post("https://joe-smack-api.herokuapp.com/Recettes/Create", fakeRecette)).data;
        await expect(res).toMatchObject(expectedRecette);
        await (id = res._id);
    });

    it("should UPDATE a recette & verify if it was correctly UPDATE", async () => {
        await (fakeRecette.title = "Epinards sans crème");
        let res = (await axios.put(`https://joe-smack-api.herokuapp.com/Recettes/UpdateOne/${id}`, fakeRecette)).data;
        await expect(res).toEqual("OK");
    });

    it("should DELETE a recette & verify if it was correctly DELETE", async () => {
        let res = (await axios.delete(`https://joe-smack-api.herokuapp.com/Recettes/DeleteOne/${id}/${process.env.secretKey}`)).data;
        await expect(res).toEqual("OK");
    });
});

