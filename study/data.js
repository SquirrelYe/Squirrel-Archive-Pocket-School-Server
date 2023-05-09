//控制时间格式
function toDou(n) {
  return n < 10 ? '0' + n : '' + n;
}

//几种不一样的时间表示
//1.
var myDate = new Date();
myDate.getYear(); //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)  1280977330748
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)
myDate.toLocaleDateString(); //获取当前日期
var mytime = myDate.toLocaleTimeString(); //获取当前时间
myDate.toLocaleString(); //获取日期与时间

//两种不一样的时间显示
console.log(myDate); //-->2018-07-21T09:42:35.348Z
console.log(
  //-->2018-07-21 17:42:35
  myDate.getFullYear() + '-' + toDou(myDate.getMonth() + 1) + '-' + toDou(myDate.getDate()) + ' ' + toDou(myDate.getHours()) + ':' + toDou(myDate.getMinutes()) + ':' + toDou(myDate.getSeconds())
);

// 1532166918000    下面的结果
// 1532166918960
// 1532166918960
//2.
var timestamp1 = Date.parse(new Date());
console.log(timestamp1);
//3.
var timestamp2 = new Date().valueOf();
console.log(timestamp2);
//4.
var timestamp3 = new Date().getTime();
console.log(timestamp3);
