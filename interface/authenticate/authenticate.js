const promise=require('../../Promise/promise')
const fs=require('fs');
const path=require('path');
const mail=require('../mail/mail');

var pathlib=path;
module.exports={
    
    insert:function(req,res){
        function ins(req,res){
            var type=req.query.type;
            var openid=req.query.openid;
            var name=req.query.name;
            var school=req.query.school;
            var xuehao=req.query.xuehao;
            var phone=req.query.phone;
            var e_mail=req.query.e_mail;
            var rz_icon=req.query.rz_icon;
            
            var sql=`insert into authenticate values("${type}","${openid}","${name}","${school}","${xuehao}","${phone}","${e_mail}","${rz_icon}");`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                mail.rz_dashi(req,res)
                //res.send(result);
            }
        }
        ins(req,res);
    },

    selectOneByOpenid:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`select * from authenticate where openid ="${openid}";`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                res.send(result);
            }
        }
        sel(req,res);
    },

    selectAll:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`select * from authenticate;`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                res.send(result);
            }
        }
        sel(req,res);
    },

    selectOneByName:function(req,res){
        function sel(req,res){            
            var name=req.query.name;
            var sql=`select * from authenticate where name ="${name}";`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                res.send(result);
            }
        }
        sel(req,res);
    },

    selectOneByXuehao:function(req,res){
        function sel(req,res){            
            var xuehao=req.query.xuehao;
            var sql=`select * from authenticate where xuehao ="${xuehao}";`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                res.send(result);
            }
        }
        sel(req,res);
    },

    selectOneBySchool:function(req,res){
        function sel(req,res){            
            var school=req.query.school;
            var sql=`select * from authenticate where school ="${school}";`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                res.send(result);
            }
        }
        sel(req,res);
    },

    UploadRZIcon1:function(req,res){
        console.log(req.files);
        var icon_name=req.query.openid
        //获取原始文件扩展名
        var newName=`Authenticate/Icon/${icon_name}`+pathlib.parse(req.files[0].originalname).ext;
        console.log(pathlib.parse(req.files[0].originalname).ext);      //输出文件后缀
        console.log("--->",newName);
        fs.rename(req.files[0].path,newName,function(err){
            if(err){
                console.log("上传失败");
                res.send(`{ "file upload success ?": "flase" ,"path":"${newName}" }`)
            }else{
                console.log("上传成功");
                res.send(`{ "file upload success ?": "true" ,"path":"${newName}" }`)
            }
        })
    },

    UploadRZIcon2:function(req,res){
        console.log(req.files);
        var icon_name=req.query.openid
        var old_path=req.query.old_path
        fs.unlinkSync(old_path); // Sync 表示是同步方法
        console.log('成功删除了 /tmp/shiyanlou');
        //获取原始文件扩展名
        var newName=`Authenticate/Icon/${icon_name}`+pathlib.parse(req.files[0].originalname).ext;
        console.log(pathlib.parse(req.files[0].originalname).ext);      //输出文件后缀
        console.log("--->",newName);
        fs.rename(req.files[0].path,newName,function(err){
            if(err){
                console.log("上传失败");
                res.send(`{ "file upload success ?": "flase" ,"path":"${newName}" }`)
            }else{
                console.log("上传成功");
                res.send(`{ "file upload success ?": "true" ,"path":"${newName}" }`)
            }
        })
    }
}