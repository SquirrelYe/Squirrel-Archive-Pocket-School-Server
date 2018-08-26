const mysql=require('mysql');

module.exports.fun=function(){
    this.res=null;
    //1.连接(client)
    //creatConnection（哪台服务器，用户名，密码，库）
    var db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'yexuan0628',
        database:'node_js'
    });
    //console.log(db);

    //2.查询
    //query(干啥，回调)
    db.query("select * from users;",(err,data)=>{
        if(err)
            console.log("出错了",err);
        else{
            console.log("成功了");
           // console.log(data);
            var la=data;
            return la;
           // console.log(JSON.stringify(res));
           // console.log(JSON.stringify(data));
        }
    })
}



