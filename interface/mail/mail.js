const mailUtil=require('./mailUtils')
module.exports={
    //login验证
    register:function(req,res){          
        var mail_address=req.query.mail_address;  
        var name=req.query.name;    
        var code=req.query.code;
        mailUtil(`${mail_address}`,`PocketSchool 验证短信...`, `HELLO ${name},您的验证码为：${code}`,res);
    }
}