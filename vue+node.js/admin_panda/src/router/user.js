/* 
* @Author: Marte
* @Date:   2018-04-19 11:12:11
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-05 09:51:06
*/
var db=require('../utils/db');
const url=require('url');
const jwt = require('jsonwebtoken');
const apiResult=require('../utils/apiResult')
// const upload=require('../utils/upload')
const filter = (req, res, next) => {
    // if(url.parse(req.url).pathname==='/login'||url.parse(req.url).pathname==='/tabs'){
    //     next();
    // }else{
        let token = req.headers['auth'];
        jwt.verify(token, '123456',(error, result) => {
            if(error){
                res.send(apiResult(false, error, 'unauth'))
            } else {
                next();
            }
        })
    // }
}
module.exports={
    //app登录注册
    appLoginRegister(app){
        app.post('/login',async (req,res) => {
            let username = req.body.username;
            let password = req.body.password;
            let result = await db.select('pandaUsers',{username,password});
            if(result.status){
                let token = jwt.sign({username},'123456',{expiresIn:60*60});
                let ar = apiResult(result.status,token);
                res.send(ar)
            }else{
                res.send(result);
            }
        })
        app.post('/register',async (req,res) => {
            let username = req.body.username;
            let password = req.body.password;
            let result = await db.select('pandaUsers',{username});
            if(result.status){
                res.send(apiResult(result.status,result))
            }else{
                let result2 = await db.insert('pandaUsers',{username:username,password:password,'shop_cart':[],'order':[],'watch_history':[],'shoucang':[]})
                res.send(apiResult(result.status,result2))
            }
        })
    },
    //登录
    login(app){
        app.post('/adminlogin',async (req,res)=>{
            let username=req.body.username;
            let password=req.body.password;
            let result=await db.select('admin_users',{username,password});
            if(result.status){
                let token = jwt.sign({username},'123456', {
                'expiresIn': 60*60*24*5 //置过期时间, 24 小时
                })
                let ar=apiResult(result.status,token);
                res.send(ar);
            }else{
                res.send(result);
            }
            res.end();
        }),
        app.post('/islogin',async(req,res)=>{
            let token = req.headers['auth'];
            if(token){
                let username;
                jwt.verify(token,'123456',(error, result) =>{
                    if(error){
                        res.send('点击登录');
                    }else{
                        username=result.username;    
                        res.send(username);
                    }
                })
            }else{
                res.send('点击登录');
            }
            res.end();
        })
    },
    //后台商品管理
    product_manage(app){ 
        app.get('/product_manage',async (req,res)=>{ 
            params=url.parse(req.url,true).query;
            if(params.page===undefined){
                let result = await db.select_count('products');
                res.send(result);
            }else{
                let result = await db.select_query('products',params.page,10);
                res.send(result);   
            }
        }),
        //增加商品
        app.get('/add_product',async (req,res)=>{
            let params=url.parse(req.url,true).query;
            let result=await db.insert('products',params);
            res.send(result);
            res.end();
        }),
        //商品更新
        app.post('/edit_product',async (req,res)=>{
            

            let params = JSON.parse(req.body.params);

            let product_name=params.product_name;
            let price=params.price;
            let qty_sold=params.qty_sold;
            let product_type=params.product_type;
            let product_imgurl=params.product_imgurl;
            let imgs = params.imgs


            let product_id = params._id;
            var resultobj =await db.select('products');
            var targetObj;
            for(var i=0;i<resultobj.data.length;i++){
                if(product_id == resultobj.data[i]._id.toString()){
                    targetObj = resultobj.data[i];
                }
            } 

            let beforeproduct_name=targetObj.product_name;
            let beforeprice=targetObj.price;
            let beforeqty_sold=targetObj.qty_sold;
            let beforeproduct_type=targetObj.product_type;
            let beforeproduct_imgurl=targetObj.product_imgurl;
            let beforeimgs = targetObj.imgs

            let result=await db.update('products',{product_name:beforeproduct_name,price:beforeprice,qty_sold:beforeqty_sold,product_type:beforeproduct_type,product_imgurl:beforeproduct_imgurl,imgs:beforeimgs},{product_name,price,qty_sold,product_type,product_imgurl,imgs});
            res.send(result);
            res.end();
        }),
        //商品删除
        app.post('/del_product',async (req,res)=>{
            let params=req.body.product_name;
            let result = await db.delete('products',{'product_name':params});
            res.send(result);
        })
    },
    //用户查询
    admin(app){
        app.get('/admin',async (req,res)=>{ 
            params=url.parse(req.url,true).query;
            if(params.page===undefined){
                let result = await db.select_count('admin_users');
                res.send(result);
            }else{
                let result = await db.select_query('admin_users',params.page,10);
                res.send(result);   
            }
        }),
        app.get('/mobile',async (req,res)=>{ 
            params=url.parse(req.url,true).query;
            if(params.page===undefined){
                let result = await db.select_count('pandaUsers');
                res.send(result);
            }else{
                let result = await db.select_query('pandaUsers',params.page,10);
                res.send(result);   
            }
        })
    },
    //商品分类查询
    product_query(app){
        app.post('/query_product',async (req,res)=>{
            let params=req.body.product_type || req.body.product_id;
            let result;
            if(params==undefined){
                result = await db.select('products');
            }else{
                if(req.body.product_type){
                    result = await db.select('products',{'product_type':params});    
                }else if(req.body.product_id){
                    var resultobj =await db.select('products');
                    for(var i=0;i<resultobj.data.length;i++){
                        if(params == resultobj.data[i]._id.toString()){
                            result = resultobj.data[i];
                        }
                    }   
                }
            }
            res.send(result);
        }),
        //按销量降序排序
        app.post('/query_product_qtysold',async (req,res)=>{
            let params_type=req.body.product_type;
            let result = await db.select_sort_sold('products',{'product_type':params_type});
            res.send(result);
        }),
        //按价格降序排序
        app.post('/query_product_price',async (req,res)=>{
            let params_type=req.body.product_type;
            let result = await db.select_sort_price('products',{'product_type':params_type});
            res.send(result);
        }),
        //模糊查询
        app.post('/search',async(req,res)=>{
            let params=req.body.keyword;
            let result = await db.select_search('products',{'word':params});
            res.send(result);
        }),
        app.post('addTowatch_history',async(req,res)=>{
            let username=req.body.username;
            let product_id=req.body.product_id;
            var re=await db.select('pandaUsers',{'username':username});
            var re=re.data[0];
            re.watch_history.push({'product_id':product_id});
            let result=await db.update('pandaUsers',{'username':username},{'username':username,'password':re.password,'shopcart':re.shop_cart,'order':re.order,'watch_history':re.watch_history});
        }),
        app.post('addToshoucang',async(req,res)=>{
            let username=req.body.username;
            let product_id=req.body.product_id;
            var re=await db.select('pandaUsers',{'username':username});
            var re=re.data[0];
            re.shoucang.push({'product_id':product_id});
            let result=await db.update('pandaUsers',{'username':username},{'username':username,'password':re.password,'shopcart':re.shop_cart,'order':re.order,'watch_history':re.watch_history,'shoucang':re.shoucang});
        }),
        app.post('watch_history',async(req,res)=>{
            let username=req.body.username;
            var re=await db.select('pandaUsers',{'username':username});
            var re=re.data[0];
            res.end();
        }),
        app.post('/showshoucang',filter,async (req,res)=>{
            let token = req.headers['auth'];
            let username;
            jwt.verify(token,'123456',(error, result) =>{
                username=result.username;
            })
            let result=await db.select('pandaUsers',{'username':username});
            result=result.data[0].shoucang;
            var dataset=[];
            let re_data;
            for(let j=0;j<result.length;j++){
                var resultobj =await db.select('products');
                for(var i=0;i<resultobj.data.length;i++){
                    if(result[j].product_id == resultobj.data[i]._id.toString()){
                        re_data = resultobj.data[i];
                        // re_data.qty=result[j].product_qty;
                        dataset.push(re_data);
                    }
                }  
            }
            res.send(apiResult(dataset.length>0,dataset));
            res.end();
        })
    },
    //种类tab标签切换
    tabchange(app){
        app.post('/tabs',async(req,res)=>{
            let tabname = req.body.tabname;
            let result;
            if(tabname==undefined){
                result = await db.select('tabs');
            }else{
                result = await db.select('tabs',{title:tabname});
            }
            res.send(apiResult(result.status,result.data));
        })
    },
    //购物车
    shop_cart(app){
        app.post('/addToShopcart',filter,async (req,res)=>{
            let token = req.headers['auth'];
            let username;
            jwt.verify(token,'123456',(error, result) => {
                username=result.username;
            })
            let product_id=req.body.product_id;
            let qty=1;
            let result;
            var re=await db.select('pandaUsers',{'username':username});
            console.log(re);
            var re=re.data[0];
            var n=0;
            for(let i=0;i<re.shop_cart.length;i++){
                if(re.shop_cart[i].product_id==product_id){
                    n++;
                    re.shop_cart[i].product_qty++;
                    result=await db.update('pandaUsers',{'username':username},{'username':username,'password':re.password,'shop_cart':re.shop_cart,'order':re.order,'watch_history':re.watch_history});
                    res.send(apiResult(true));
                    break;
                }
            }
            if(n==0){
                re.shop_cart.push({'product_id':product_id,'product_qty':qty});
                result=await db.update('pandaUsers',{'username':username},{'username':username,'password':re.password,'shop_cart':re.shop_cart,'order':re.order,'watch_history':re.watch_history});
                res.send(apiResult(true));
            }
            res.end();
        }),
        app.post('/showShopcart',filter,async (req,res)=>{
            let token = req.headers['auth'];
            let username;
            jwt.verify(token,'123456',(error, result) =>{
                username=result.username;
            })
            let result=await db.select('pandaUsers',{'username':username});
            result=result.data[0].shop_cart;
            var dataset=[];
            let re_data;
            for(let j=0;j<result.length;j++){
                var resultobj =await db.select('products');
                for(var i=0;i<resultobj.data.length;i++){
                    if(result[j].product_id == resultobj.data[i]._id.toString()){
                        re_data = resultobj.data[i];
                        re_data.qty=result[j].product_qty;
                        dataset.push(re_data);
                    }
                }  
            }
            res.send(apiResult(dataset.length>0,dataset));
            res.end();
        }),
        app.post('/update_qty',filter,async (req,res)=>{
            let token = req.headers['auth'];
            let username;
            jwt.verify(token,'123456',(error, result) =>{
                username=result.username;
            })
            let result=await db.select('pandaUsers',{'username':username});
            result=result.data[0];
            let product_id=req.body.product_id;
            let qty=req.body.qty;
            for(let i=0;i<result.shop_cart.length;i++){
                if(product_id==result.shop_cart[i].product_id){
                    result.shop_cart[i].product_qty=qty;
                    break;
                }
            }
            let update_result=await db.update('pandaUsers',{'username':username},{'username':username,'password':result.password,'shop_cart':result.shop_cart,'order':result.order,'watch_history':result.watch_history})
            res.end();
        }),
        app.post('/del_shop_cart',filter,async (req,res)=>{
            let token = req.headers['auth'];
            let username;
            jwt.verify(token,'123456',(error, result) =>{
                username=result.username;
            })
            let result=await db.select('pandaUsers',{'username':username});
            result=result.data[0];
            let product_id=req.body.product_id;
            for(let i=0;i<result.shop_cart.length;i++){
                if(product_id==result.shop_cart[i].product_id){
                    result.shop_cart.splice(i,1);
                    break;
                }
            }
            let update_result=await db.update('pandaUsers',{'username':username},{'username':username,'password':result.password,'shop_cart':result.shop_cart,'order':result.order,'watch_history':result.watch_history})
            res.end();
        })
    }
}
