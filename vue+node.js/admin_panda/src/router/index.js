/* 
* @Author: Marte
* @Date:   2018-04-19 11:20:23
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-04 22:37:33
*/
const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const user=require('./user');
const url=require('url');
const apiResult=require('../utils/apiResult');
const jwt = require('jsonwebtoken');
const product = require('./product')
// const product=require('./product');
// const cp = require('cookie-parser');
// const session = require('express-session');
const app=express();
// const uploadFile=require('../utils/uploadFile');
// app.use(cp());
// app.use(session({
//     secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
//     name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//     cookie: {maxAge: 500000},  //设置maxAge是5000ms，即5s后session和相应的cookie失效过期
//     resave: false,
//     saveUninitialized: true,    
// }));
// const trade=require('./transition')
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, auth, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
const filter = (req, res, next) => {
    if(url.parse(req.url).pathname==='/login'||url.parse(req.url).pathname==='/tabs'){
        next();
    }else{
        let token = req.headers['auth'];
        if(!token){
            res.send(apiResult(false, {}, 'unauth'));
        } else {
            jwt.verify(token, '123456', (error, result) => {
                if(error){
                    res.send(apiResult(false, error, 'unauth'))
                } else {
                    next();
                }
            })
        }
    }
}
//全局使用use,表示进入所有目标路由前都会先进入过滤器方法
// app.use(filter);
//访问静态资源文件
app.use(express.static(path.join(__dirname, '../html/')));
//所有 post 使用 body-parser
app.use(bodyParser.urlencoded({extended: false}));
user.login(app);
user.product_manage(app);
user.admin(app);
user.product_query(app);
user.tabchange(app);
user.shop_cart(app);
product.singleUpload(app);
user.appLoginRegister(app);
module.exports = {
    start(_port = 66){
        app.listen(_port);
    }
}