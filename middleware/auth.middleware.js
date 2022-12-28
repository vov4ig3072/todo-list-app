import jwt from "jsonwebtoken"
import config from "config"

export default (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next()
    }

    try{
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({message: "No authorization"})
        }

        const decodet = jwt.verify(token, config.get("jwtSecret"))
        req.user = decodet
        next()

    }catch (e) {
        res.status(401).json({message: "No authorization"})
    }
}