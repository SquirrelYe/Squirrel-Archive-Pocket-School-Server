const promise=require('../../../Promise/promise')
module.exports={

    //用户查询自己发布的订单
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

    //用户删除自己发布的订单
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

    //用户更新自己发布的订单
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
    },

    //用户催单 
    reMinder:function(req,res){
        //do something...
    },

    //用户联系大使
    contactTaker:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var sql=`select tak_phone from orders where number="${number}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //用户发表评论
    commitCallback:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var cus_callback=req.query.cus_callback;
            var sql=`UPDATE orders SET cus_callback="${cus_callback}" WHERE number="${number}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

}