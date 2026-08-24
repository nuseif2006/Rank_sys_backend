const express = require("express")
const router = express.Router()
const db = require("../db")
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

router.get("/",verifyToken ,(req, res)=> {
    const tasks = db.prepare("select * from tasks")
    const data= tasks.all()
    const user =req.user
    res.status(200).json({user, data})
})

module.exports = router