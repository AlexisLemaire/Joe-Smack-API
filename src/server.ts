import cors from 'cors'
import express from 'express'
const routes = require("./routes");

const app = express();
app.use(express.json()); 
app.use(cors());
app.use("/", routes);

console.log(`App listening on ${process.env.PORT || 3001}`)
app.listen(process.env.PORT || 3001);
