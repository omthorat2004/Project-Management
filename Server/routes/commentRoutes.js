const {pool} = require('../db/db')
const router = require('express').Router()

router.post('/createComment',(req,res)=>{
    const {projectId,userId,comment} = req.body

    pool.query("INSERT INTO comments (projectId,userId,comment) VALUES (?,?,?) ",[projectId,userId,comment],(err,result)=>{
        if (err) {
            return res.json({error:"Failed to create comment"})
        }
        return res.json({success:true})
    })
})

router.get("/getComments/:id",(req,res)=>{
    const {id} = req.params

    pool.query("SELECT userId,projectId,comment FROM comments WHERE projectId=?",[id],(err,result)=>{
        if (err) {
            return res.json({error:"Server Error"})
        }
        res.json({result:result})
    })
})

module.exports = router
