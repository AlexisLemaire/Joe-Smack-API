const axios = require("axios");
const fakeRecette = require("./helpers/fakeObjects.js").fakeRecette;

describe("UNIT RECETTES CRUD TESTS", () => {
    it("should POST a recette & verify if it was correctly POST", async () => {
        let res = (await axios.post("https://joe-smack-api.herokuapp.com/Recettes/Create", fakeRecette)).data;
        await (fakeRecette.id = res._id);
        await expect(res).toHaveProperty("_id");
    });

    it('should SELECT the fakeRecette', async () => {
        let res = (await axios.get(`https://joe-smack-api.herokuapp.com/Recettes/SelectOne/${fakeRecette.id}`)).data;
        await expect(res).toHaveProperty("_id");
    });

    it("should UPDATE the fakeRecette & verify if it was correctly UPDATE", async () => {
        await (fakeRecette.title = "Epinards sans crème");
        let res = (await axios.put(`https://joe-smack-api.herokuapp.com/Recettes/UpdateOne/${fakeRecette.id}`, fakeRecette)).data;
        await expect(res).toHaveProperty("success");
    });

    it("should DELETE a recette & verify if it was correctly DELETE", async () => {
        let res = (await axios.delete(`https://joe-smack-api.herokuapp.com/Recettes/DeleteOne/${fakeRecette.id}/${process.env.secretKey}`)).data;
        await expect(res).toHaveProperty("success");
    });
});

