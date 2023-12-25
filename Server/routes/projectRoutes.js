const router = require('express').Router()
const {pool} = require('../db/db')

router.post('/createProject',(req,res)=>{
    const {title,dueDate,description,selectedItems,assigner} = req.body
    pool.query("INSERT INTO projectsTable (title,dueDate,description,assigner) VALUES (?,?,?,?)",[title,dueDate,description,assigner],(err,result)=>{
        if (err) throw err
        selectedItems.forEach(element => {
            pool.query("INSERT INTO userProject (userId,projectId) VALUES (?,?)",[element.value,result.insertId],(err,insertResult)=>{
                if(err) throw err
                
                return res.json({message:"Successfully created project",success:true,project:{title,dueDate,description,selectedItems,assigner,id:result.insertId}})
            })
        });
    })
    
})

router.get("/getProjects",(req,res)=>{

    pool.query("SELECT * FROM projectsTable Order BY dueDate ASC ",(err,result)=>{
        res.json({projects:result})
    })
})

router.get("/project/:id",(req,res)=>{
    let {id} = req.params
    id = Number(id)
    // console.log(id)
    try{pool.query("SELECT userId FROM userProject WHERE projectId=?",[id],(err,result)=>{
        if (err) throw err
        // console.log(result)
        res.json({result:result})
    })
    }catch(err){
        console.error(err)
    }  
})
router.get("/projectUserUrl",(req,res)=>{
    try{
        pool.query("SELECT users.photoUrl,projectsTable.id FROM userProject INNER JOIN projectsTable ON userProject.projectId=projectsTable.id INNER JOIN users ON users.id=userProject.userId",(err,result)=>{
            if (err) throw err
            // console.log(result)
            
            res.json({result:result})
        })

    }catch(err){
        console.error(err)
    }
})
module.exports = router