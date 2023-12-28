const {pool} = require('../db/db')
const router = require('express').Router()

router.post('/createComment',(req,res)=>{
    const {projectId,userId,comment} = req.body

    pool.query("INSERT INTO commentsData (projectId,userId,comment) VALUES (?,?,?) ",[projectId,userId,comment],(err,result)=>{
        if (err) {
            return res.json({error:"Failed to create comment"})
        }
        return res.json({success:true})
    })
})

router.get("/getComments/:id",(req,res)=>{
    let {id} = req.params
    id=Number(id)
    pool.query("SELECT users.photoUrl,users.name,projectsTable.id AS projectId,commentsData.comment,commentsData.id FROM users INNER JOIN commentsData ON commentsData.userID=users.id INNER JOIN projectsTable ON commentsData.projectID=projectsTable.id WHERE projectsTable.id=? ",[id],(err,result)=>{
        if (err) {
            console.log(err)
            
            return res.json({error:"Server Error"})
        }
        console.log(result)
        // console.log(result)
        res.json({result:result})
    })
})

module.exports = router
