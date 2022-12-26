const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt.config")

module.exports = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if(!bearerHeader){
        return res.status(400).send({
            message: "Token is missing"
        })
    }
    const bearerToken = bearerHeader.split(" ")
    const bearer = bearerToken[1]
    req.token = bearer
    
    try{
        jwt.verify(bearer, jwtConfig.JWTSECRET, (err, data)=>{
            if(err){
                return res.status(403).send({
                    "message": "User token invalid"
                })
            }
            
            req.body.username = data.username
            req.body.userId = data.userId
    
            return next()
        })
    }catch(err){
        return res.status(401).send(err.message)
    }
    
}