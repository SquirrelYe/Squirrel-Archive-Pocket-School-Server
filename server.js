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

var objmulter=multer({dest:"./www/upload"});    //dest指定上传文件地址
var pathlib=path;

var server=express();
server.listen(11111);

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
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/xiadan',function(req,res){     //帮帮忙添加订单处理
    if(req.query.judge==0)  xiadan.insertLogistics(req,res);
    //if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/yx',function(req,res){        //前台调用，返还订单接口
    if(req.query.judge==0)  logistics.selectOneByType(req,res);
    if(req.query.judge==1)  logistics.selectOneByGander(req,res);    
    if(req.query.judge==2)  logistics.selectAll(req,res);
    if(req.query.judge==4)  logistics.selectOneByOpenid(req,res);
    if(req.query.judge==5)  logistics.selectOneByConditions(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.post('/UploadServlet',function(req,res){     //获取前台用户上传的头像订单
    console.log(req.files);
    //获取原始文件扩展名
    var newName=req.files[0].path+pathlib.parse(req.files[0].originalname).ext;
    console.log(pathlib.parse(req.files[0].originalname).ext);      //输出文件后缀
    console.log("--->",newName);
    fs.rename(req.files[0].path,newName,function(err){
        if(err){
            console.log("上传失败");
            res.send(JSON.parse(`{ "file upload success ?": "flase" }`))
        }else{
            console.log("上传成功");
            res.send(JSON.parse(`{ "file upload success ?": "true" }`))
        }
    })
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
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});

server.use('/school_choose',function(req,res){        //大使对所接收订单进行管理
    if(req.query.judge==0)  schoolChoose.selectSchoolByUserOpenid(req,res);
    if(req.query.judge==1)  schoolChoose.read(req,res);   
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
});