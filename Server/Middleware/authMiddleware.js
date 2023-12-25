if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}
const jwt = require('jsonwebtoken')


const userVerification = (req,res)=>{
    const token = req.headers.authentication
    jwt.verify(token,process.env.JWT_KEY,(err,decode)=>{
        if(err){
            res.json({valid:false})
        }else{
            res.json({valid:true})
        }
    })
    
}

module.exports={userVerification}