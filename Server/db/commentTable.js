const {pool} = require('./db')

const createCommentTable = ()=>{
    pool.query("CREATE TABLE IF NOT EXISTS comments(id INT PRIMARY KEY AUTO_INCREMENT,userId INT , projectId INT,comment TEXT)")
}

module.exports = createCommentTable