const {pool} = require('./db')

const createProjectTable = ()=>{
    pool.query("CREATE TABLE IF NOT EXISTS projectsTable (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(255),assigner VARCHAR(255),dueDate DATE,description TEXT,isComplete BOOLEAN DEFAULT 0 )")
}
module.exports = {createProjectTable}