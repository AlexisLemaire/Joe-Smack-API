import cors from 'cors'
import express from 'express'
import routes from './routes'

const app = express();
app.use(express.json()); 
app.use(cors());
app.use("/", routes);
// require("dotenv").config(); //COMMENT ON PROD

console.log(`App listening on ${process.env.PORT || 3001}`)
app.listen(process.env.PORT || 3001);
