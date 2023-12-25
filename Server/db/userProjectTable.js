const {pool} = require('./db')

 const createUserProjectTable = ()=>{
    pool.query("CREATE TABLE IF NOT EXISTS userProject(id INT PRIMARY KEY AUTO_INCREMENT,userId int ,projectId INT)")
}
module.exports = {createUserProjectTable}