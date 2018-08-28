const promise=require('../../../Promise/promise');
const time=require('../../../time/time');
module.exports={

    //大使查询自己接收的订单
    selectOrdByTakerOpenid:function(req,res){
        function sel(req,res){            
            var openid_taker=req.query.openid_taker;
            var sql=`select * from orders where openid_taker="${openid_taker}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //大使查询自己接收的订单 by condition
    selectOrdByTakerCondition:function(req,res){
        function sel(req,res){            
            var condition=req.query.condition;
            var sql=`select * from orders where condition="${condition}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    
    //大使删除自己接收的订单
    deleteOrdByOrderNumber:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var openid_taker=req.query.openid_taker;
            var sql=`delete from orders where number="${number}" and openid_taker="${openid_taker}";`;
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            var number=req.query.number;
            const result = await promise.dbupAsync(sql);
            res.send(result);
            if(result.affectedRows==1){                
                var sql1=`UPDATE logistics SET conditions="1" WHERE number="${number}";`;
                const result1 = await promise.dbupAsync(sql1);
                res.send(result);
            }
        }
        sel(req,res);
    },

    //大使设置订单状态为 已接收 accept
    setOrderAccept:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var sql=`UPDATE orders SET conditions="2",accept_time="${time.getTime()}" WHERE number="${number}";`;
            console.log(sql)
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            var number=req.query.number;
            const result = await promise.dbupAsync(sql);
            //res.send(result);
            if(result.affectedRows==1){                
                var sql1=`UPDATE logistics SET conditions="2" WHERE number="${number}";`;
                console.log(sql1)
                const result1 = await promise.dbupAsync(sql1);
                res.send(result1);
            }
        }
        sel(req,res);
    },

    //大使设置订单状态为 已送达 arrive
    setOrderArrive:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var sql=`UPDATE orders SET conditions="3",post_time="${time.getTime()}" WHERE number="${number}";`;
            console.log(sql)
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            var number=req.query.number;
            const result = await promise.dbupAsync(sql);
            //res.send(result);
            if(result.affectedRows==1){                
                var sql1=`UPDATE logistics SET conditions="3" WHERE number="${number}";`;
                console.log(sql1)
                const result1 = await promise.dbupAsync(sql1);
                res.send(result1);
            }
        }
        sel(req,res);
    },

    //大使设置订单状态为 已评价 callback
    setOrderCallBack:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var tak_callback=req.query.tak_callback;
            var sql=`UPDATE orders SET conditions="4",callback_time="${time.getTime()}",tak_callback="${tak_callback}" WHERE number="${number}";`;
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            var number=req.query.number;
            const result = await promise.dbupAsync(sql);
            if(result.affectedRows==1){                
                var sql1=`UPDATE logistics SET conditions="4" WHERE number="${number}";`;
                const result1 = await promise.dbupAsync(sql1);
                res.send(result1);
            }
        }
        sel(req,res);
    }
}