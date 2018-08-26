var request = require('request');
module.exports={
    //查询用户 openid_unionid
    selectOpenidUnionid:function(req,res){
        function sel(req,res){            
            var appid=req.query.appid;     
            var secret=req.query.secret;     
            var grant_type=req.query.grant_type;     
            var js_code=req.query.js_code;    
            // 参考链接：https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html
            var url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=${grant_type}&js_code=${js_code}`;
            fun(url,appid);
        }
        function fun(url,appid) {
            request(url,function(error,response,body){
                if(!error && response.statusCode == 200){
                    //输出返回的内容
                    console.log("appid --->",appid);
                    res.send(body);
                }
            });
        }
        sel(req,res);
    }
}
