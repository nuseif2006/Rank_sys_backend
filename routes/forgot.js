const express = require("express")
const { sendPasswordResetEmail} = require("firebase/auth")
const {auth} = require("../firebaseConfig1")
const {db} = require("../firebaseConfig")

const route= express.Router()

route.post("/", async (req, res) => {
    const {email} = req.body
    if (email == undefined){
        res.status(404).json({msg: "Error occured"})
        return
    }
    try{
        const check = await db.collection("users").where("email", "==", email).get()
    if (check.empty) return res.status(403).json({msg: "Invalid email"})
            await sendPasswordResetEmail(auth ,email)
            res.json({msg: `Email send to ${email} check your inbox`})
    }
    catch{
        res.json({msg: "Error occured"})
    }
})

module.exports = route