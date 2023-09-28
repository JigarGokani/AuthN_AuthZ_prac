const express = require("express")
const app = express();
require("dotenv").config();





const PORT = process.env.PORT || 4000;

app.use(express.json());



const user = require("./routes/user")
app.use("/api/v1",user);

const dbConnect = require("./config/database");
dbConnect();


app.listen(PORT,()=>{
    console.log(`App is running at port no ${PORT}`);
});



app.get("/",(req,res)=>{
    res.send("This is my default route!")
})
