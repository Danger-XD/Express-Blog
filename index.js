import express from "express";
const app = express();
const PORT = 2323;
import router from "./routes/api.js";

//Add body-parser middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/v1",router);

app.listen(PORT,()=>{
    console.log(`Server is running successfully on ${PORT}`);
})