if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}
const router = require('express').Router()
const {pool} = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {userVerification} = require('../Middleware/authMiddleware')

router.post("/sign",(req,res)=>{
    const {email,password,photoUrl,name} = req.body
    try{
        pool.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{
            if (err) throw err
            if(result[0]){
                res.json({error:"User already exists"})
            }else{
                bcrypt.hash(password,10).then((hash)=>{
                    pool.query("INSERT INTO users (email,password,photoUrl,name) VALUES (?,?,?,?)",[email,hash,photoUrl,name],(err,result)=>{
                        if (err) throw err
                        const token = jwt.sign({id:result.insertId},process.env.JWT_KEY,{
                            expiresIn:'3d'
                        })
                        res.json({user:{email:email,photoUrl:photoUrl,name:name,id:result.insertId},token:token})
                    })
            })
            }
        })
    }catch(err){
        console.error(err)
    }
})

router.post("/login",(req,res)=>{
    const {email,password}=req.body
    console.log(email)
    try{
        pool.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{
            if (err) throw err
            console.log(result[0])
            if(!result[0]){
                return res.json({error:"User does not exist"})
            }else{
                let user = result[0]
                const authorised=bcrypt.compare(password,result[0].password)
                if(authorised){
                    const token = jwt.sign({id:result.insertId},process.env.JWT_KEY,{
                        expiresIn:'3d'
                    })
                    res.json({user:{email:result[0].email,photoUrl:result[0].photoUrl,name:result[0].name,id:result[0].id},token:token})
                }else{
                    res.json({error:"Incorrect email or password"})
                }
            }
        })
    }catch(err){

    }
})

router.post("/signGoogle",(req,res)=>{
    const {email,password,photoUrl} = req.body
    pool.query("SELECT id,email,photoUrl,name FROM users WHERE email=?",[email],(err,result)=>{
        
    })


})

router.get("/userVerification",userVerification)

router.get("/getUsers",(req,res)=>{
    pool.query("SELECT id,email,photoUrl,name FROM users",(err,result)=>{
        if(err) throw err
        res.json({users:result})
    })
})

module.exports=router