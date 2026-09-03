const express = require("express")
const router = express.Router()
const { verify } = require("jsonwebtoken")
const {adminAuth} = require("../firebaseConfig")
const db = require("../db")

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

router.delete("/user", verifyToken, async (req, res)=>{
    const uid =req.user.uid
    const email = req.user.email
    if (!uid){
        return res.status(403).json({msg: "token missing"})
    }
    await adminAuth.deleteUser(uid)
    const remove=db.prepare("delete from users where email=?")
    remove.run(email)
    res.status(200).json({msg: "Account Deleted Successfuly"})
})

module.exports = router