const express = require("express")

const route= express.Router()

route.post("/", (req, res) => {
    const {email} = req.body
    if (email == undefined){
        res.status(404).send("Error occured")
        return
    }
    res.send(`Your email is ${email}`)
})

module.exports = route