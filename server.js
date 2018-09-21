const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const authenticate=require('./interface/authenticate/authenticate')
const jiedan=require('./interface/jiedan/jiedan')
const users=require('./interface/users/users')
const xiadan=require('./interface/xiadan/xiadan')
const logistics=require('./interface/logistics/logistics')
const openid_unionid=require('./interface/openid_unionid/openid_unionid')
const customer=require('./interface/orders/customer/customer')
const taker=require('./interface/orders/takers/taker')
const schoolChoose=require('./interface/schoolChoose/schoolChoose')
const mail = require('./interface/mail/mail')
const check=require('./interface/check/check')

var objmulter=multer({dest:"./Authenticate/Icon"});    //dest指定上传文件地址
var pathlib=path;

var server=express();
server.listen(11111);

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
  });

server.use(bodyParser.urlencoded({extended:false}));
server.use(objmulter.any());
server.use(express.static(__dirname));

server.use('/',function(req,res,next){
   next();
});
server.get('/index',function(req,res){
    res.redirect('./WWW/index/index.html');   
});

server.use('/authenticate',function(req,res){   //权限认证
    if(req.query.judge==0) authenticate.insert(req,res);
    if(req.query.judge==1) authenticate.selectOneByOpenid(req,res);    
    if(req.query.judge==2) authenticate.selectAll(req,res);
    if(req.query.judge==3) authenticate.selectOneByName(req,res); 
    if(req.query.judge==4) authenticate.selectOneByXuehao(req,res); 
    if(req.query.judge==5) authenticate.selectOneBySchool(req,res); 
    if(req.query.judge==6) authenticate.UploadRZIcon1(req,res); 
    if(req.query.judge==7) authenticate.UploadRZIcon2(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/jiedan',function(req,res){     //用户下单
    if(req.query.judge==0)  jiedan.update(req,res);
    if(req.query.judge==1)  jiedan.selectOneByNumber(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/users',function(req,res){     //用户订单操作
    if(req.query.judge==0)  users.selectOneByOpenid(req,res);
    if(req.query.judge==1)  users.selectAllUsers(req,res);    
    if(req.query.judge==2)  users.insertUsers(req,res);   
    if(req.query.judge==3)  users.selectSchoolByOpenid(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/xiadan',function(req,res){     //帮帮忙添加订单处理
    if(req.query.judge==0)  xiadan.insertLogistics(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/yx',function(req,res){        //前台调用，返还订单接口
    if(req.query.judge==0)  logistics.selectOneByType(req,res);
    if(req.query.judge==1)  logistics.selectOneByGander(req,res);    
    if(req.query.judge==2)  logistics.selectAll(req,res);
    if(req.query.judge==4)  logistics.selectOneByOpenid(req,res);
    if(req.query.judge==5)  logistics.selectOneByConditions(req,res); 
    if(req.query.judge==6)  logistics.selectLimitPage(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.post('/UploadRZIcon',function(req,res){     //获取前台用户上传的头像订单
    
});

server.use('/openid_unionid',function(req,res){        //前台调用，返还openid_unionid
    if(req.query.judge==0)  openid_unionid.selectOpenidUnionid(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/customer',function(req,res){        //用户对所发布订单进行管理
    if(req.query.judge==0)  customer.selectLogByUserOpenid(req,res);
    if(req.query.judge==1)  customer.selectLogByUserOpenidConditions(req,res);
    if(req.query.judge==2)  customer.deleteLogByMeNumber(req,res);    
    if(req.query.judge==3)  customer.updateLogByMeNumberOpenid(req,res);
    if(req.query.judge==4)  customer.reMinder(req,res);
    if(req.query.judge==5)  customer.contactTaker(req,res);
    if(req.query.judge==6)  customer.commitCallback(req,res);
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/taker',function(req,res){        //大使对所接收订单进行管理
    if(req.query.judge==0)  taker.selectOrdByTakerOpenid(req,res);
    if(req.query.judge==1)  taker.deleteOrdByOrderNumber(req,res);  
    if(req.query.judge==2)  taker.selectOrdByTakerconditions(req,res);   
    if(req.query.judge==3)  taker.setOrderAccept(req,res);  
    if(req.query.judge==4)  taker.setOrderArrive(req,res);  
    if(req.query.judge==5)  taker.setOrderCallBack(req,res);  
    if(req.query.judge==6)  taker.contactCustomer(req,res);  
    if(req.query.judge==7)  taker.getOrderCallBack(req,res);  
    if(req.query.judge==8)  taker.reCallback(req,res);  
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/school_choose',function(req,res){        //大使对所接收订单进行管理
    if(req.query.judge==0)  schoolChoose.selectSchoolByUserOpenid(req,res);
    if(req.query.judge==1)  schoolChoose.read(req,res);   
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/mail',function(req,res){        //邮箱验证
    if(req.query.judge==0)  mail.register(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/check',function(req,res){        //用户（大使）查询自己接收的订单
    if(req.query.judge==0)  check.selectOrdByOpenid(req,res); 
    if(req.query.judge==1)  check.selectTotalOutputMoney(req,res); 
    if(req.query.judge==2)  check.selectTotalInputMoney(req,res); 
    if(req.query.judge==3)  check.selectOrdInputByOpenid(req,res); 
    if(req.query.judge==4)  check.selectOrdLike(req,res); 
    if(req.query.judge==5)  check.selectQuick(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});