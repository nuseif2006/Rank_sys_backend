const express = require("express")
const router = express.Router()
const db = require("../db")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } = require("firebase/auth")
const {auth} = require("../firebaseConfig")

router.post("/register", async (req, res) => {
    const {fname, lname, email, pass} = req.body
    if (fname == "" || lname == "" || email == "" || pass == "") return res.status(400).json({msg: "Error occured"})
    try{
        const Data =await createUserWithEmailAndPassword(auth, email, pass)
        await sendEmailVerification(Data.user)
        const insert =db.prepare("insert into users (fname, lname, email, pass) values(?,?,?,?)")
        insert.run(fname, lname, email, pass)
        res.status(201).json({msg: `Account created, check your inbox`})
    }
    catch(error){
        console.log(error)
    }
})

router.post("/login", async (req, res)=> {
    const {email, pass} = req.body
    if (email == "" || pass == "") return res.status(400).json({msg: "Error occured"})
    try{
        const Data = await signInWithEmailAndPassword(auth, email, pass)
        await Data.user.reload()
        if (!Data.user.emailVerified) return res.status(404).json({msg: "Account not found"})
        // const select = db.prepare("select * from users where email = ? and pass = ?")
        // const user = select.get(email, pass)
        // if (!user) return res.status(404).json({msg: "Account not found"})
    }
    catch{
        res.json({msg: "Invalid Credentials"})
    }
})

module.exports = router