const express = require("express")
const router = express.Router()
const db = require("../db")
// const jwt = require()

router.post("/register", (req, res) => {
    const {fname, lname, email, pass} = req.body
    if (fname == "" || lname == "" || email == "" || pass == "") return res.status(400).json({msg: "Error occured"})
    try{
        const insert = db.prepare("insert into users (fname, lname, email, pass) values(?,?,?,?)")
        insert.run(fname, lname, email, pass)
        res.status(201).json({msg: `Account created, check your inbox`})
    }
    catch{
        res.status(400).json({msg: "Error occured"})
    }
})

router.post("/login", (req, res)=> {
    const {email, pass} = req.body
    if (email == "" || pass == "") return res.status(400).json({msg: "Error occured"})
    try{
        const select = db.prepare("select * from users where email = ? and pass = ?")
        const user = select.get(email, pass)
        if (!user) return res.status(400).json({msg: "Account not found"})
        res.json({msg: "success"})
    }
    catch{
        res.status(400).json({msg: "Error occured"})
    }
})

module.exports = router