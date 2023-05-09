const promise = require('../../../database/promise');
const time = require('../../../time/time');
module.exports = {
  //用户查询自己发布的订单
  selectLogByUserOpenid: function (req, res) {
    function sel(req, res) {
      var openid_cus = req.query.openid_cus;
      var sql = `select * from orders where openid_cus="${openid_cus}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户查询自己发布的订单 by openid conditions
  selectLogByUserOpenidConditions: function (req, res) {
    function sel(req, res) {
      var openid_cus = req.query.openid_cus;
      var conditions = req.query.conditions;
      var sql = `select * from orders where openid_cus="${openid_cus}" and conditions="${conditions}";`;
      //console.log(sql)
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户删除自己发布的订单
  deleteLogByMeNumber: function (req, res) {
    function sel(req, res) {
      var number = req.query.number;
      var openid = req.query.openid;
      var sql = `update logistics set conditions="-1" where number="${number}" and openid="${openid}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户更新自己发布的订单  暂时不启用
  updateLogByMeNumberOpenid: function (req, res) {
    function sel(req, res) {
      var number = req.query.number;
      var openid = req.query.openid;
      var details = req.query.details;
      var log_from = req.query.log_from;
      var log_to = req.query.log_to;
      var time_log = req.query.time_log;
      var key_info = req.query.key_info;
      var key_name = req.query.key_name;
      var key_phone = req.query.key_phone;

      var sql = `update logistics set details="${details}",log_from="${log_from}",log_to="${log_to}",time_log="${time_log}",
                    key_info="${key_info}",key_name="${key_name}",key_phone="${key_phone}" where number="${number}" and openid="${openid}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户催单
  reMinder: function (req, res) {
    //do something...
    function sel(req, res) {
      var openid = req.query.openid;
      var sql = `select e_mail,phone from authenticate where openid="${openid}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户联系大使
  contactTaker: function (req, res) {
    function sel(req, res) {
      var number = req.query.number;
      var sql = `select tak_phone from orders where number="${number}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户发表评论
  commitCallback: function (req, res) {
    function sel(req, res) {
      var number = req.query.number;
      var cus_callback = req.query.cus_callback;
      var sql = `UPDATE orders SET cus_callback="${cus_callback}",callback_time="${time.getTime()}" WHERE number="${number}";`;
      fun(sql);
    }
    async function fun(sql) {
      const result = await promise.dbupAsync(sql);
      res.send(result);
    }
    sel(req, res);
  },

  //用户设置订单已完成 complete
  setOrderComplete: function (req, res) {
    function sel(req, res) {
      var number = req.query.number;
      var sql = `UPDATE orders SET conditions="4" WHERE number="${number}";`;
      console.log(sql);
      fun(sql, req, res);
    }
    async function fun(sql, req, res) {
      var number = req.query.number;
      const result = await promise.dbupAsync(sql);
      if (result.affectedRows == 1) {
        var sql1 = `UPDATE logistics SET conditions="4" WHERE number="${number}";`;
        console.log(sql1);
        const result1 = await promise.dbupAsync(sql1);
        res.send(result1);
      }
    }
    sel(req, res);
  }
};
