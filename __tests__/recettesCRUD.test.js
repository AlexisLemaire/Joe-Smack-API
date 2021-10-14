const axios = require("axios");

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

describe("UNIT CRUD TESTS", () => {
    it("should post a recette and return it with id", async () => {
        await expect(
            (await axios.post("http://localhost:3001/Recettes/Create", fakeRecette)).data
        )
        .toMatchObject(expectedRecette);
    })
})

