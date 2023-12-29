const router = require('express').Router()
const {pool} = require('../db/db')

router.post('/createProject',(req,res)=>{
    const {title,dueDate,description,selectedItems,assigner} = req.body
    pool.query("INSERT INTO projectsTable (title,dueDate,description,assigner) VALUES (?,?,?,?)",[title,dueDate,description,assigner],(err,result)=>{
        if (err) throw err
        selectedItems.forEach(element => {
            pool.query("INSERT INTO userProject (userId,projectId) VALUES (?,?)",[element.value,result.insertId],(err,insertResult)=>{
                if(err) throw err
            })
        });
        return res.json({message:"Successfully created project",success:true,project:{title,dueDate,description,selectedItems,assigner,id:result.insertId}})
    })
})

router.get("/getProjects",(req,res)=>{
    try{
        pool.query("SELECT  p.*,GROUP_CONCAT(u.photoUrl ORDER BY u.photoUrl  SEPARATOR ', ') AS url,GROUP_CONCAT(u.id ORDER BY u.id SEPARATOR ', ') AS usersId FROM users u INNER JOIN userProject up  ON u.id=up.userId INNER JOIN projectsTable p ON p.id=up.projectId GROUP BY p.id",(err,result)=>{
            if (err) throw err
            console.log(result)
        
            res.json({result:result}) 
        })

    }catch(err){
        console.error(err)
    }
})

router.delete("/delete/:id",(req,res)=>{
    const {id} = req.params
    pool.query("DELETE FROM projectsTable WHERE id=?",[Number(id)],(err,result)=> {
        if (err) throw err
    })
    pool.query("DELETE FROM commentsData WHERE projectId=?",[Number(id)],(err,result)=>{
        if (err) throw err
        
    })
    res.json({id})
})
module.exports = router