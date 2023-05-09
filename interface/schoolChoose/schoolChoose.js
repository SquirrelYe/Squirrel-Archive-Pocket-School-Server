const promise = require('../../database/promise_school');
var fs = require('fs');

module.exports = {
  //查询自己的信息
  selectSchoolByUserOpenid: function (req, res) {
    function sel(req, res) {
      var openid = req.query.openid;
      var sql = `select school from users where openid="${openid}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      if (result.length != 0) {
        var school_ID = result[0].school;
        var sql1 = `select DataBaseID from school_dic where school_ID="${school_ID}";`;
        const result1 = await promise.dbupAsync(sql1);
        res.send(result1);
        //fs.writeFileSync("DataBaseID.txt",JSON.stringify(result1));
        //console.log(DB.DataBaseID[0].DataBaseID);
        fs.open('DataBaseID.txt', 'a+', function (err, fd) {
          if (err) {
            return console.error(err);
          }
          fs.writeFile(fd, JSON.stringify(result1), function (err) {
            if (err) {
              return console.error(err);
            }
          });
        });
      }
    }
    sel(req, res);
  },
  read: function (req, res) {
    var readMe_sync = fs.readFileSync('DataBaseID.txt', 'utf8');
    console.log(JSON.parse(readMe_sync)[0].DataBaseID);
    res.send(readMe_sync);
  }
};
