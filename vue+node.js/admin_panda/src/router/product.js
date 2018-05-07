/* 
* @Author: Marte
* @Date:   2018-04-19 16:20:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-02 17:52:20
*/
const db = require('../utils/db');
const path = require('path');
const multer = require('multer');
const apiResult = require('../utils/apiResult');
var fs = require('fs');
//设置上传的目录，  
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _path = path.join(__dirname, "../upload");
        if(!fs.existsSync(_path)){
            fs.mkdirSync(_path);
        }
        cb(null, _path);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname);  
    }
});
// // 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })
// let filter = (req, res, next) => {
//     if(req.session.user){
//         next();
//     } else {
//         res.send(apiResult(false, null, 'upload_fail'));
//     }
// }
module.exports = {
    singleUpload(app){
        app.post('/singleUpload',upload.single('photos'), async (req,res) => {
            console.log(55);
            console.log(req.body);
            let pre_name=req.body.pre_name;
            let product_name = req.body.proname;
            let price = req.body.price;
            let product_type = req.body.type;
            let qty_sold = req.body.sold;
            let product_imgurl = `/upload/${req.file.originalname}`;
            console.log(pre_name,product_imgurl);
            // let username = req.session.user.username;
            let result = await db.update('products',{'product_name':pre_name},{product_name, price, qty_sold, product_type,product_imgurl});
            res.send(result);   
        })       
    }
}