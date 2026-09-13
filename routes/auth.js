require("dotenv").config()
const express = require("express")
const router = express.Router()
const {db} = require("../firebaseConfig")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } = require("firebase/auth")
const {auth} = require("../firebaseConfig1")
const { sign, decode } = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    const {fname, lname, email, pass} = req.body
    if (fname == "" || lname == "" || email == "" || pass == "") return res.status(400).json({msg: "Error occured"})
    try{
        const Data =await createUserWithEmailAndPassword(auth, email, pass)
        const uid = Data.user.uid
        await sendEmailVerification(Data.user)
        const payload = {fname, lname, email, uid}
        const score = "0"
        const refreshToken = sign(payload, process.env.SECRET_KEY, {expiresIn: "30d"})
        await db.collection("users").add({
            fname,
            lname,
            email,
            token: refreshToken,
            score
        })
        res.status(201).json({msg: `Account created, check your inbox`, refreshToken})
    }
    catch(error){
        if (error.code == "auth/email-already-in-use") return res.status(403).json({msg: "Email already in use"})
        res.status(400).json({msg: "Error occured"})
    }
})

router.post("/login", async (req, res)=> {
    const {email, pass} = req.body
    if (email == "" || pass == "") return res.status(400).json({msg: "Error occured"})
    try{
        const Data = await signInWithEmailAndPassword(auth, email, pass)
        await Data.user.reload()
        if (!Data.user.emailVerified) {
            await sendEmailVerification(Data.user)
            return res.status(404).json({msg: "Verify Account email link"})
        }
        const select = await db.collection("users").where("email", "==", email).get()
        const user = select.docs[0].data()
        if (!user) return res.status(400).json({msg: "Something went wrong"})
            const data = user.token
            const fname = user.fname
            const lname = user.lname
        const decoded = decode(data)
        const isExpired = Date.now() >= decoded.exp * 1000
        const payload = {fname, lname, email}
        if (isExpired){
            const refreshToken = sign(payload, process.env.SECRET_KEY, {expiresIn: "30d"})
            const accessToken = sign(payload, refreshToken, {expiresIn: "1h"})
            const update = db.prepare("update users set token =? where email = ?")
            update.run(refreshToken, email)
            return res.status(201).json({type: "new", refreshToken, accessToken})
        }
        const accessToken = sign(payload, data, {expiresIn: "1h"})
        res.status(200).json({type: "old", refreshToken: data, accessToken})
    }
    catch(error){
        if (error.code == "auth/email-not-verified"){
            return res.status(403).json({msg: `Verify Account email link sent to ${email}`})
        }
        else{
            return res.status(400).json({msg: "Invalid Credentials"})
        }
    }
})

module.exports = router