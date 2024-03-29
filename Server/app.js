if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
const {Server} = require('socket.io')
const exp = require('constants')
const {pool,connectToDb} = require('./db/db')
const userRouter = require('./routes/userRoutes')
const projectRouter = require('./routes/projectRoutes.js')
const commentRouter = require('./routes/commentRoutes.js')
const {createUserTable} = require('./db/userTable')

const {createUserProjectTable} = require('./db/userProjectTable')
const {createProjectTable} = require('./db/projectTable')
const createCommentTable = require('./db/commentTable.js')



createCommentTable()

app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/',projectRouter)
app.use('/',commentRouter)

connectToDb()
// createUserTable()
createProjectTable()
createUserProjectTable()
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    
    socket.on('send-comment', (data) => {
        console.log(`Received comment from ${socket.id}: ${data.comment}`);
        console.log(data)
        // Broadcast the received comment to all clients except the sender
         socket.broadcast.emit('receive-comment', {...data});
      });
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      socket.removeAllListeners('send-comment');
      socket.removeAllListeners('disconnect');
      
    });
});

http.listen(process.env.PORT,(req,res)=>{
    console.log(`Server connect at post ${process.env.PORT}`)
})
