
const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app)
const axios= require("axios");

const session = require("express-session");
const socketIO = require("socket.io")
const moment = require("moment")
const io = socketIO(server);
const pageRouter = require('./routers/index');
console.log("hellow")
const maria = require("./maria");
const conn=maria.init();
const bodyParser = require('body-parser');
const { time } = require("console");



app.use(session({
    secret: "your-secret-key", // 세션 암호화에 사용되는 비밀키
    resave: false, // 세션 변경 사항이 없더라도 재저장 여부
    saveUninitialized: false // 초기화되지 않은 세션 저장 여부
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "src")))
app.use(express.static(__dirname + '/node_modules/axios/dist'));
app.use(pageRouter);

//app.get('',(req,res)=>{
//    res.sendFile(__dirname+'/src/page/login/login.html');
//})
const PORT = process.env.PORT || 5000;

io.on("connection" , (socket) => {
    
    console.log("연결");

    
    socket.on("chatting", async (data)=>{
        try{

            
            console.log(data);
            const { name, msg , roomName, friendId, type, isRead } = data;
            
            
            if(socket.rooms.has(roomName)){
                console.log(`있다.`);
            }else{
                console.log(`없다.`);
        
            }
        
            console.log(socket.rooms)
            socket.join(roomName);

            if(type){
                io.to(roomName).emit("chatting", {
                    name,
                    msg,
                    time:moment(new Date()).format("h:ss A"),
                    roomName,
                    isRead:1
                })
                
                const db = await maria.init();
                try {
                    db.query('INSERT INTO tb_chat_messages values(?,?,?,?,?,?)', [name, roomName, friendId, msg, isRead ,  moment().format('YYYY-MM-DD HH:mm:ss')]);
                   
                } catch (err) {
                    console.log("err222r");
                }
            }
            
            
            


        } catch(error){
            console.log(`Error savingn chat`, error);
        }
    })
})


server.listen(PORT, ()=> console.log(`server is running ${PORT}`))