const promise=require('../../Promise/promise')
module.exports={
    //查询物流信息 by type
    selectOneByType:function(req,res){
        function sel(req,res){            
            var type=req.query.type;
            var sql=`select * from logistics where type="${type}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询物流信息 by gander
    selectOneByGander:function(req,res){
        function sel(req,res){            
            var gander=req.query.gander;
            var sql=`select * from logistics where gander="${gander}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询all物流信息 
    selectAll:function(req,res){
        function sel(req,res){            
            var sql=`select * from logistics order by number desc;`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询物流信息 by openid
    selectOneByOpenid:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`select * from logistics where openid="${openid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    //查询物流信息 by condition
    selectOneByConditions:function(req,res){
        function sel(req,res){            
            var conditions=req.query.conditions;
            var sql=`select * from logistics where conditions="${conditions}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}