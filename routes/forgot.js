const express = require("express")
const { sendPasswordResetEmail} = require("firebase/auth")
const {auth} = require("../firebaseConfig")
const db = require("../db")

const route= express.Router()

route.post("/", async (req, res) => {
    const {email} = req.body
    if (email == undefined){
        res.status(404).json({msg: "Error occured"})
        return
    }
    const check = db.prepare("select email from users where email =?")
    const data = await check.get(email)
    if (data == undefined) return res.status(403).json({msg: "Invalid email"})
    try{
        await sendPasswordResetEmail(auth ,email)
        res.json({msg: `Email send to ${email} check your inbox`})
    }
    catch{
        res.json({msg: "Error occured"})
    }
})

module.exports = route