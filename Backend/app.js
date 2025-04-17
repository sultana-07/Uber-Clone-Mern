const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors")
const cookiesParser = require("cookie-parser")
const express = require("express")
const userRoutes = require("./routes/user.route")
const connectToDB = require("./db/db")
connectToDB();
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookiesParser())

app.get('/',(req,res) => {
    res.send("hello world")
})

app.use("/users",userRoutes)

module.exports = app;