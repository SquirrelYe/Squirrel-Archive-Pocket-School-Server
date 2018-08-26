const promise=require('../../Promise/promise')
module.exports={
    
    insert:function(req,res){
        function ins(req,res){
            var openid=req.query.openid;
            var name=req.query.name;
            var xuehao=req.query.xuehao;
            var school=req.query.school;
            var college=req.query.college;
            var zhuanye=req.query.zhuanye;
            var nianji=req.query.nianji;
            var sql=`insert into authenticate values("${openid}","${name}","${xuehao}","${school}","${college}","${zhuanye}","${nianji}");`;
            fun(sql);
            async function fun(sql) {
                const result = await promise.dbupAsync(sql);
                res.send(result);
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
    }
}