const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors")
const cookiesParser = require("cookie-parser")
const express = require("express")
const userRoutes = require("./routes/user.route")
const captainRoutes = require("./routes/captain.route")
const mapsRoutes = require("./routes/maps.routes")
const rideRoutes = require("./routes/ride.route")
const connectToDB = require("./db/db")
connectToDB();
const app = express();

app.use(cors({
    origin : "https://uber-clon.netlify.app",
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookiesParser())

app.get('/',(req,res) => {
    res.send("hello world")
})

app.use("/users",userRoutes)
app.use("/captains",captainRoutes)
app.use("/maps",mapsRoutes)
app.use("/rides",rideRoutes)

module.exports = app;