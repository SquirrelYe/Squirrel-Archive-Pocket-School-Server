const promise=require('../../Promise/promise')
module.exports={
    //查询最后一条记录的number
    //将用户传来的数据保存到数据库
    insertLogistics:function(req,res){
        function sel(req,res){      
            var sql=`SELECT number FROM logistics ORDER BY number desc LIMIT 1;`;
            fun(sql);
        }
        async function fun(sql) {
            const result = await promise.dbupAsync(sql);
            //console.log(JSON.parse(result).success)   当查询不到最后一个number时
            if(result.length==0){                
                var number=result[0].number+1;                
                var openid=req.query.openid;              
                var type=req.query.type;
                var icon_url=req.query.icon_url;
                var nickname=req.query.nickname;
                var gander=req.query.gander;
                var location=req.query.location;
                var details=req.query.details;
                var conditions=req.query.conditions;
                var money=req.query.money;
                var time=req.query.time;
                var log_from=req.query.log_from;
                var log_to=req.query.log_to;
                var others=req.query.others;
                var time_log=req.query.time_log;
                var key_info=req.query.key_info;
                var key_name=req.query.key_name;
                var key_phone=req.query.key_phone;

                var sql1=`insert into logistics values 
                         ("${number}","${openid}","${type}","${icon_url}","${nickname}","${gander}","${location}","${details}","${conditions}","${money}"
                         ,"${time}","${log_from}","${log_to}","${others}","${time_log}","${key_info}","${key_name}","${key_phone}");`;
                const result1 = await promise.dbupAsync(sql1);    
                res.send(result1);
            }else{
                res.redirect('../../WWW/404/index.html');
            }
        }
        sel(req,res);
    }
}