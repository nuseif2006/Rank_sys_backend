const express = require("express")
const router = express.Router()
const {db} = require("../firebaseConfig")
const { verify } = require("jsonwebtoken")

function verifyToken(req, res, next){
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    if (token == null) return res.status(400).json({msg: "Something went wrong"})
    verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) return res.status(403).json({msg: "Something went wrong"})
        req.user = payload
        next()
    })
}

router.get("/",verifyToken , async (req, res)=> {
    try{
        const tasks = await db.collection("tasks").get()
        if (tasks.empty) return res.status(403).json({msg: "Error occured"})
        const data = tasks.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        const user =req.user
        res.status(200).json({user, data})
    }
    catch{
        res.json({msg: "Error occured"})
    }
})

router.put("/update", verifyToken, async (req, res) => {
    const {score} = req.body
    const email = req.user.email
    try{
        const getScore = await db.collection("users").where("email", "==", email).get()
        const data = getScore.docs[0].data()
        const updateData = getScore.docs[0].ref
        const totalScore= Number(data.score) + Number(score)
        await updateData.update({
            score: totalScore.toString()
        })
        const getUsers = await db.collection("users").get();
        const data1 = getUsers.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        req.io.emit("users", data1)
        res.send("updated Successfuly")
    }
    catch{
        res.json({msg: "Error occured"})
    }
})

module.exports = router