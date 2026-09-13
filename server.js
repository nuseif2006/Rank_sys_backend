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
const port = process.env.PORT || 5000
const server = http.createServer(app)
const allowedOrigins = ["https://rank-sys-frontend.vercel.app"]

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
})

app.use(express.json())
app.use(cors({ origin: allowedOrigins }))

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)
app.use("/forgot", forgotRoutes)
app.use("/delete", delRoutes)
app.use("/rank", rankRoutes)

db.collection("users").onSnapshot(
  (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    io.emit("users", data)
  },
  (error) => {
    console.error("Firestore snapshot error:", error)
  }
)

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

app.get("/", (req, res) => {
  res.send("Healthy")
})

server.listen(port, () => console.log(`Server running on port ${port}`))