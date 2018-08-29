const promise=require('../../Promise/promise')
module.exports={
    //查询用户 by openid
    selectOneByOpenid:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`select * from users where openid="${openid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询用户all
    selectAllUsers:function(req,res){
        function sel(req,res){            
            var sql=`select * from users;`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //插入用户
    insertUsers:function(req,res){
        function sel(req,res){         
            var openid=req.query.openid; 
            var name=req.query.name;
            var school=req.query.school;
            var icon_url=req.query.icon_url;
            var age=req.query.age;
            var love=req.query.love;
            var birthday=req.query.birthday;
            var city=req.query.city;
            var sign=req.query.sign;  
            var sql=`insert into users values("${openid}","${name}","${school}","${icon_url}","${age}","${love}","${birthday}","${city}","${sign}");`;
            console.log(sql)
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}