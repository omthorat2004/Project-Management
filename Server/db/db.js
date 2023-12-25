const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'new_password',
    database:'PROJECT_MANAGEMENT'
})
const connectToDb = ()=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`Connected to id ${connection.threadId}`)
    })
}

module.exports = {pool,connectToDb}