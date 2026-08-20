const express = require("express")
const router = express.Router()

router.post("/register", (req, res) => {
    const {fname, lname, email, pass} = req.body
    if (fname == "" || lname == "" || email == "" || pass == "") return res.send("Error occured", 404)
    
})

router.post("/login", (req, res)=> {
    const {name} = req.body
})

module.exports = router