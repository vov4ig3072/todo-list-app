import express from "express";
import path from "path"
import config from "config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js"
import todoRoutes from "./routes/todo.routes.js"

const __dirname = path.resolve()
const PORT = config.get('port') || 5000
const app = express()

mongoose.set('strictQuery', true)

app.use(express.json({extendet: true}))
app.use("/api/auth", authRoutes)
app.use("/api/todo", todoRoutes)

if(process.env.NODE_ENV === "production"){
    app.use("/", express.static(path.join(__dirname, "client", "build")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}

async function start(){ 
    try{
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => console.log(`Server has been start on port ${PORT}...`))

    }catch (e){
        console.log("server Error", e.message)
        process.exit(1)
    }

}

start()
