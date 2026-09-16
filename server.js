const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/task")
const forgotRoutes = require("./routes/forgot")
const delRoutes = require("./routes/del")
const rankRoutes = require("./routes/rank")
const http = require("http")
const { Server } = require("socket.io")
const { db } = require("./firebaseConfig")

const app = express()
const port = 5000
const server = http.createServer(app)
const allowedOrigins = ["https://rank-sys-frontend.vercel.app"]

const io = new Server(server, {
  cors: {
    origin: allowedOrigins
  }
})

app.use(express.json())
app.use(cors({ origin: allowedOrigins }))

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)
app.use("/forgot", forgotRoutes)
app.use("/delete", delRoutes)
app.use("/rank", rankRoutes)

const getUsers = await db.collection("users").get()
const data = getUsers.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
}));
io.on("connection", async (socket) => {
    io.emit("users", data)
})

app.get("/", (req, res) => {
  res.send("Healthy")
})

server.listen(port, () => console.log(`Server running on port ${port}`))