const promise=require('../../../Promise/promise')
module.exports={

    //用户查询自己发布的信息
    selectLogByUserOpenid:function(req,res){
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

    //用户删除自己发布的信息
    deleteLogByMeNumber:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var openid=req.query.openid;
            var sql=`delete from logistics where number="${number}" and openid="${openid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //用户更新自己发布的信息
    updateLogByMeNumberOpenid:function(req,res){
        function sel(req,res){           
            var number=req.query.number;                
            var openid=req.query.openid;  
            var details=req.query.details;
            var log_from=req.query.log_from;
            var log_to=req.query.log_to;
            var time_log=req.query.time_log;
            var key_info=req.query.key_info;
            var key_name=req.query.key_name;
            var key_phone=req.query.key_phone;

            var sql=`update logistics set details="${details}",log_from="${log_from}",log_to="${log_to}",time_log="${time_log}",
                    key_info="${key_info}",key_name="${key_name}",key_phone="${key_phone}" where number="${number}" and openid="${openid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}