const jwt = require("jsonwebtoken")
const User = require("../models/").users
const jwtconf = require("../config/jwt.config")
const { findOneById } = require("../controllers/posts.controller")

module.exports = (app) => {
    var router = require("express").Router()

    // login
    const login = async (req, res) => {
        const {username, password, emailId} = req.body

        User.findOne({where: {username: username}}).then(user => {
            console.log(user)
            console.log(username, password, emailId)
            if(user.password !== password || user.emailId !== emailId){
                return res.status(401).send({
                    message: "User password incorrect/ Email id not matching"
                })
            }
            delete user.password
            console.log(user.toJSON())
            const token = jwt.sign(user.toJSON(), jwtconf.JWTSECRET)

            return res.status(200).send({
                token
            })
        }).catch(err=>{
            return res.status(401).send(err.message)
        })

    }

    router.post("/", login)

    app.use('/api/login', router)

}