const promise=require('../../Promise/promise');
const time=require('../../time/time');
module.exports={

    //用户（大使）查询自己支出的订单
    selectOrdByOpenid:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`select * from orders where openid_cus="${openid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //（大使）查询自己收入的订单
    selectOrdInputByOpenid:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`select * from orders where openid_tak="${openid}";`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //用户（大使）查询自己的支出订单总和
    selectTotalOutputMoney:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`SELECT SUM(money) as totalOutputMoney FROM orders WHERE openid_cus='${openid}';`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //用户（大使）查询自己的支出订单总和
    selectTotalInputMoney:function(req,res){
        function sel(req,res){            
            var openid=req.query.openid;
            var sql=`SELECT SUM(money) as totalInputMoney FROM orders WHERE openid_tak='${openid}';`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //用户（大使）模糊查询自己订单
    selectOrdLike:function(req,res){
        function sel(req,res){      
            var judge_select=req.query.judge_select;   
            var like=req.query.like;
            var openid=req.query.openid;
            if(judge_select=='1'){
                var sql=`SELECT * FROM orders WHERE  details LIKE '%${like}%' AND openid_cus='${openid}';`;
            }else{
                var sql=`SELECT * FROM orders WHERE  details LIKE '%${like}%' AND openid_tak='${openid}';`;
            }
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    },

    //用户（大使）快速筛选自己订单
    selectQuick:function(req,res){
        function sel(req,res){      
            var judge_select=req.query.judge_select;   
            var openid=req.query.openid;
            var judge_quick=req.query.judge_quick;
            var low_price=req.query.low_price;
            var high_price=req.query.high_price;
            var empty_price=req.query.empty_price;
            
            if(empty_price=='1'){
                if(judge_select=='1'){
                    if(judge_quick=='1'){
                        var sql=`SELECT * FROM orders WHERE types='1' AND openid_cus='${openid}' ;`;
                    }else if(judge_quick=='2'){
                        var sql=`SELECT * FROM orders WHERE types='2' AND openid_cus='${openid}' ;`;
                    }else if(judge_quick=='3'){
                        var sql=`SELECT * FROM orders WHERE types='3' AND openid_cus='${openid}' ;`;
                    }
                }else{
                    if(judge_quick=='1'){
                        var sql=`SELECT * FROM orders WHERE types='1' AND openid_tak='${openid}' ;`;
                    }else if(judge_quick=='2'){
                        var sql=`SELECT * FROM orders WHERE types='2' AND openid_tak='${openid}' ;`;
                    }else if(judge_quick=='3'){
                        var sql=`SELECT * FROM orders WHERE types='3' AND openid_tak='${openid}' ;`;
                    }
                }
            }else{
                if(judge_select=='1'){
                    if(judge_quick=='1'){
                        var sql=`SELECT * FROM orders WHERE types='1' AND openid_cus='${openid}' AND money BETWEEN ${low_price} AND ${high_price};`;
                    }else if(judge_quick=='2'){
                        var sql=`SELECT * FROM orders WHERE types='2' AND openid_cus='${openid}' AND money BETWEEN ${low_price} AND ${high_price};`;
                    }else if(judge_quick=='3'){
                        var sql=`SELECT * FROM orders WHERE types='3' AND openid_cus='${openid}' AND money BETWEEN ${low_price} AND ${high_price};`;
                    }
                }else{
                    if(judge_quick=='1'){
                        var sql=`SELECT * FROM orders WHERE types='1' AND openid_tak='${openid}' AND money BETWEEN ${low_price} AND ${high_price};`;
                    }else if(judge_quick=='2'){
                        var sql=`SELECT * FROM orders WHERE types='2' AND openid_tak='${openid}' AND money BETWEEN ${low_price} AND ${high_price};`;
                    }else if(judge_quick=='3'){
                        var sql=`SELECT * FROM orders WHERE types='3' AND openid_tak='${openid}' AND money BETWEEN ${low_price} AND ${high_price};`;
                    }
                }
            }
            fun(sql);
        }
        async function fun(sql) {
            console.log(sql)
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}