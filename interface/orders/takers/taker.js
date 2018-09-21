const promise=require('../../../Promise/promise');
const time=require('../../../time/time');
module.exports={

    //大使查询自己接收的订单
    selectOrdByTakerOpenid:function(req,res){
        function sel(req,res){            
            var openid_tak=req.query.openid_tak;
            var sql=`select * from orders where openid_tak="${openid_tak}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //大使查询自己接收的订单 by conditions
    selectOrdByTakerconditions:function(req,res){
        function sel(req,res){            
            var openid_tak=req.query.openid_tak;
            var conditions=req.query.conditions;
            var sql=`select * from orders where openid_tak="${openid_tak}" and conditions="${conditions}";`;
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
            var openid_tak=req.query.openid_tak;
            var sql=`delete from orders where number="${number}" and openid_tak="${openid_tak}";`;
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            var number=req.query.number;
            const result = await promise.dbupAsync(sql);
            //res.send(result);
            if(result.affectedRows==1){                
                var sql1=`UPDATE logistics SET conditions="1" WHERE number="${number}";`;
                const result1 = await promise.dbupAsync(sql1);
                res.send(result1);
            }
        }
        sel(req,res);
    },

    //大使联系用户
    contactCustomer:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var sql=`select cus_phone from orders where number="${number}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
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
    },

    //大使查看评价
    getOrderCallBack:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;  
            var choice_callback=req.query.choice_callback;
            if(choice_callback=='0'){
                var sql=`SELECT orders.number , logistics.icon_url , logistics.nickname , orders.callback_time , orders.types, orders.cus_callback, orders.details , orders.money ,orders.tak_callback  FROM logistics JOIN orders on logistics.number = orders.number AND orders.openid_tak="${openid}" and orders.tak_callback <>'0';`;
            }else{
                var sql=`SELECT orders.number , logistics.icon_url , logistics.nickname , orders.callback_time , orders.types, orders.cus_callback, orders.details , orders.money ,orders.tak_callback  FROM logistics JOIN orders on logistics.number = orders.number AND orders.openid_tak="${openid}" and orders.tak_callback ='0' ;`;
            }            
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },
    
    //大使回复用户评价
    reCallback:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var tak_callback=req.query.tak_callback;
            var openid_tak=req.query.openid_tak;
            var sql=`UPDATE orders SET tak_callback="${tak_callback}" WHERE number="${number}" and openid_tak="${openid_tak}";`;
            fun(sql,req,res);
        }
        async function fun(sql,req,res) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}