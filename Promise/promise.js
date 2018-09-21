const mysql=require('mysql');

function con(){
    var db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'yexuan0628',
        database:'logistics'
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
                    db.end();      
                }
                else{
                    resolve(data);
                    db.end();      
                }
            });
        });
        return p;
    }
} 