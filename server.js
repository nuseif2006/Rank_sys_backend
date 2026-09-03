const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/task")
const forgotRoutes = require("./routes/forgot")
const delRoutes = require("./routes/del")

const app = express()
const port = 5000

app.use(express.json())

app.use(cors({
    origin: ["http://192.168.56.1:3000", "http://localhost:3000"]
}))

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)
app.use("/forgot", forgotRoutes)
app.use("/delete", delRoutes)

app.get("/",(req, res) => {
    res.send("Healthy")
})


app.listen(port,()=> console.log(`App running on http://localhost:${port}`))