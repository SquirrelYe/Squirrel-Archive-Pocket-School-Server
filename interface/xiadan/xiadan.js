const promise = require('../../database/promise');
const time = require('../../time/time');
module.exports = {
  //查询最后一条记录的number
  //将用户传来的数据保存到数据库
  insertLogistics: function (req, res) {
    function sel(req, res) {
      var sql = `SELECT number FROM logistics ORDER BY number desc LIMIT 1;`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      //console.log(JSON.parse(result).success)   当查询不到最后一个number时
      if (result.length == 1) {
        var number = result[0].number + 1;
        var openid = req.query.openid;
        var type = req.query.type;
        var icon_url = req.query.icon_url;
        var nickname = req.query.nickname;
        var gander = req.query.gander;
        var location = req.query.location;
        var details = req.query.details;
        var conditions = req.query.conditions;
        var sum = req.query.sum;
        var money = req.query.money;
        var time = req.query.time;
        var log_from = req.query.log_from;
        var log_to = req.query.log_to;
        var others = req.query.others;
        var time_log = req.query.time_log;
        var key_info = req.query.key_info;
        var key_name = req.query.key_name;
        var key_phone = req.query.key_phone;

        var sql1 = `insert into logistics values 
                         ("${number}","${openid}","${type}","${icon_url}","${nickname}","${gander}","${location}","${details}","${conditions}","${sum}","${money}"
                         ,"${time}","${log_from}","${log_to}","${others}","${time_log}","${key_info}","${key_name}","${key_phone}");`;
        //console.log(sql1)

        var sql2 = `insert into orders(number,types,openid_cus,conditions,cus_name,icon,details,sum,money,create_time,cus_phone,cus_callback,tak_callback)
                        values("${number}","${type}","${openid}","${conditions - 1}","${nickname}","${icon_url}","${details}","${sum}","${money}","${time}","${key_phone}","0","0");`;
        //console.log(sql2)

        const result1 = await promise.dbupAsync(sql1);
        if (result1.affectedRows == 1) {
          const result2 = await promise.dbupAsync(sql2);
          if (result2.affectedRows == 1) {
            res.send(`{ "success": "true" }`);
          } else {
            res.send(`{ "success": "false" }`);
          }
        } else {
          res.send(`{ "success": "false" }`);
        }
      } else {
        res.redirect('../../WWW/404/index.html');
      }
    }
    sel(req, res);
  }
};
