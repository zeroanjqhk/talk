const express = require("express");
const router = express.Router();

const maria = require("../maria");


router.post("/login/select", async function(req, res, next) {
    let { id, pw } = req.query;
    id = '1';
    
    const db = await maria.init();

    console.log(`login select`.id);
    try {
        const [row] = await db.query('select * from tb_user where user_id=' + id);
        console.log("se");
        res.send(row);
    } catch (err) {
        console.log("errr");
    }
});

router.post("/select", async function(req, res, next) {
    let { id, pw } = req.body;
    console.log(req.body);
   
    const db = await maria.init();

    console.log(`login select2`,id);
    req.session.user = {
        id: id,
        pw: pw
    };
    console.log(`login select3`.id);
    try {
        const [row] = await db.query('select * from tb_user where user_id=' + id);
        console.log(row);
        res.send(row);
        console.log(`끗-------------------------------------================`)
    } catch (err) {
        console.log("errr");
    }
});

router.get("/list/select", async function(req, res, next) {
    let { id, pw } = req.query;
    id = '1';
 
    const db = await maria.init();
   console.log(`여긴가?`,id);
    try {
        const [row] = await db.query('select * from tb_user where user_id=' + id);
        console.log(row);
        res.send(row);
    } catch (err) {
        console.log("errr");
    }
});

router.post("/add/search", async function(req, res, next) {
    let { id } = req.body;

    const db = await maria.init();
    try {
        const [row] = await db.query('select * from tb_user where user_id=' + id);
        res.send(row);
    } catch (err) {
        console.log("error");
    }
});

router.post("/add/insert", async function(req, res, next) {
    const db = await maria.init();
    let { ID, USER_ID, USER_NAME, USER_MESSAGE } = req.body;
    ID = req.session.user.id;

    try {
        const sql = 'insert into tb_list values(?,?,?,?)';
        const [row] = await db.query(sql, [ID, USER_ID, USER_NAME, USER_MESSAGE]);
       
        res.send(row);
    } catch (err) {
        console.log("error");
    }
});

router.post("/add/check", async function(req, res, next) {
    const db = await maria.init();

    let { id } = req.body;
    const user_id = req.session.user.id;
    try {
        const sql = 'select * from tb_list where ID = ? and F_ID = ?';
        console.log(user_id, id);
        const [row] = await db.query(sql, [user_id, id]);
        console.log(row, '없어?');
        res.send(row);
    } catch (err) {
        console.log("error");
    }
});

router.post("/list/friend/list", async function(req, res, next) {
    const db = await maria.init();
    console.log(`여기는 왜 안돼??????`)
    const user_id = req.session.user.id;
    try {
        const sql = 'select * from tb_list where ID = ?';
       
        const [row] = await db.query(sql, [user_id]);
      
        res.send(row);
    } catch (err) {
        console.log("error");
    }
});

router.post("/chatList/list", async function(req, res, next) {
    const db = await maria.init();

    const user_id = req.session.user.id;
    try {
        const sql = 'select * from tb_chat_messages'
        + ' WHERE (room_id, in_dt) in ( '
        + ' SELECT room_id, max(in_dt) from tb_chat_messages WHERE id =? group by room_id)';
        const [row] = await db.query(sql, [user_id]);
        console.log(row);
        res.send(row);
    } catch (err) {



        console.log("error");
    }
});




router.post("/chatting/List", async function(req, res, next) {
    const db = await maria.init();
    console.log(req.body)

    
    let { id, friendId, roomName } = req.body;
    try {
        const sql = 'select * from tb_chat_messages where ROOM_ID = ?';
        const [row] = await db.query(sql, [roomName]);
        console.log(row);
        res.send(row);
    } catch (err) {



        console.log("error");
    }
});

router.post("/chatting/list/read", async function(req, res, next) {
    const db = await maria.init();
    console.log(req.body)

    
    let { id, friendId, roomName } = req.body;

    console.log(id, roomName , "===================")
    try {
        const sql = 'update tb_chat_messages set IS_READ = 0  where ROOM_ID = ? and SEND_ID = ?';
        const [row] = await db.query(sql, [roomName,id]);
        console.log(row);
        res.send(row);
    } catch (err) {



        console.log("error");
    }
});



module.exports = router;












/*

const express =require("express");
const router = express.Router();

const maria = require("../maria");
const db = maria.init();
var user = [
    {id: '001', name: '이정재'},
    {id: '001',  name: '조인성'},
    {id: '001', name: '차은우'}
]


router.post("/login/select", function(req ,res, next){
    let {id,pw} = req.query;
    id='1'
console.log(id);
    db.query('select * from tb_user where user_id='+id, function(err, rows, fields){
        if(!err){
            console.log("se");
            res.send(rows);
        }else{
            console.log("errr");
        }
    })
});


router.post("/select", function(req ,res, next){
    let {id,pw} = req.body;
    console.log(req.query)
    console.log(id);
    req.session.user ={
        id:id,
        pw:pw
    }
console.log(id);
    db.query('select * from tb_user where user_id='+id, function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log("errr");
        }
    })
});


router.get("/list/select", function(req ,res, next){
    let {id,pw} = req.query;
    id='1'
console.log(id);
    db.query('select * from tb_user where user_id='+id, function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log("errr");
        }
    })
});


router.post("/add/search", function(req, res, next){
    let { id } = req.body
    console.log(req.body); // 전체 요청 본문을 확인합니다.

    db.query('select * from tb_user where user_id=' + id, function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log("error");
        }
    });
});




router.post("/add/insert", function(req, res, next){
    let { ID ,USER_ID, USER_NAME, USER_MESSAGE  } = req.body
    ID = req.session.user.id;
    console.log(ID, USER_ID,USER_NAME,USER_MESSAGE)
    const sql = 'insert into tb_list values(?,?,?,?)';
    db.query(sql,[ID,USER_ID,USER_NAME,USER_MESSAGE], function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log("error");
        }
    });
});


router.post("/add/check", function(req, res, next){
    console.log(req.body);
    let { id } = req.body
    const user_id = req.session.user.id;
    const sql = 'select * from tb_list where ID = ? and F_ID = ?'
    console.log(user_id,id);
    db.query(sql,[user_id,id], function(err, rows, fields){
        if(!err){
            console.log(rows, '없어?');
            res.send(rows);
        }else{
            console.log("error");
        }
    });
});


router.post("/list/friend/list", function(req, res, next){
    
    const user_id = req.session.user.id;
    const sql = 'select * from tb_list where ID = ?'
    console.log(user_id);
    db.query(sql,[user_id], function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log("error");
        }
    });
});


router.post("/chatList/list", function(req, res, next){
    
    const user_id = req.session.user.id;
    const sql = 'select * from tb_list where ID = ?'
    console.log(user_id);
    db.query(sql,[user_id], function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log("error");
        }
    });
});




module.exports=router; */