const mysql=require('mysql');

function con(){
    var db=mysql.createConnection({
        host:'loaclhost',
        user:'root',
        password:'yexuan0628',
        database:'logistics_1'
    });
    return db;
}

module.exports={
    dbupAsync:function(sql) {
        const p = new Promise((resolve, reject) => {
            var db=con();
            db.query(sql,(err,data)=>{
                if(err){
                    resolve(`{ "success": "false" }`);          
                }
                else{
                    resolve(data);
                }
            });
        });
        return p;
    }
} 
