const express=require('express');

var server=express();

//目录一 /user/
var routerUser=express.Router();

routerUser.get('/login.html',function(req,res){
    res.send('login....');
});

routerUser.get('/index.html',function(req,res){
    res.send('index....');
});

server.use('/user',routerUser);

server.listen(11111);