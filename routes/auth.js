const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
    const {fname, lname, email, pass} = req.body
    console.log(fname, lname, email, pass)
})

module.exports = router