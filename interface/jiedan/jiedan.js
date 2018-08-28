const promise=require('../../Promise/promise')
module.exports={
    //更改订单的flag & 将订单添加到数据库
    update:function(req,res){
        function upd(req,res){
            var number=req.query.number;
            var openid_cus=req.query.openid_cus;
            var openid_tak=req.query.openid_tak;
            var conditions=req.query.conditions;
            var get_time=req.query.get_time;
            var cus_phone=req.query.cus_phone;
            var tak_phone=req.query.tak_phone;
            var sql=`UPDATE logistics SET conditions=2 WHERE number="${number}";`;
            var sql1=`insert into orders("number","openid_cus","openid_tak","conditions","get_time","cus_phone","tak_phone")
             values("${number}","${openid_cus}","${openid_tak}","${conditions}","${get_time}","${cus_phone}","${tak_phone}");`;
            upAllDB(sql,sql1);
        };
        async function upAllDB(sql,sql1) {
            const result1 = await promise.dbupAsync(sql);   
            if(result1.changedRows==1){         
                const result2 = await promise.dbupAsync(sql1);
                res.send(`{ "success": "true" }`)
            }else{
                res.send(`{ "success": "false" }`);
            }       
        }
        upd(req,res);
    },
    //检查某一number商品是否已被下单
    selectOneByNumber:function(req,res){
        function sel(req,res){            
            var number=req.query.number;
            var sql=`select * from orders where number="${number}";`;
            upAllDB(sql);
        }
        async function upAllDB(sql) {
            const result = await promise.dbupAsync(sql);
            res.send(result);
        }
        sel(req,res);
    }
}