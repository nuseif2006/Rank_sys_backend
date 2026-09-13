const express = require("express")
const router = express.Router()
const { verify } = require("jsonwebtoken")
const {adminAuth, db} = require("../firebaseConfig")

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
    try{
        await adminAuth.deleteUser(uid)
        const getRemove =await db.collection("users").where("email", "==", email).get()
        if (getRemove.empty) return res.status(403).json({msg: "Account not found"})
        const remove = getRemove.docs[0].ref
        await remove.delete()
        res.status(200).json({msg: "Account Deleted Successfuly"})
    }
    catch{
        res.json({msg: "Error occured"})
    }
})

module.exports = router