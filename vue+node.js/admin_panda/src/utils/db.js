/* 
* @Author: Marte
* @Date:   2018-04-18 15:57:41
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-04 17:31:46
*/
const MongoClient=require('mongodb').MongoClient;
const apiResult=require('./apiResult');
const url='mongodb://localhost:27017';
var db=null;
MongoClient.connect(url,(error,client)=>{
    db=client.db('panda');
})
module.exports={
    //基本查询
    async select(_collection,_condition={}){
        try{
            let items=await db.collection(_collection).find(_condition).toArray();
            return apiResult(items.length>0,items);
        }catch(err){
            return apiResult(false,err);
        }
    },
    //查询文档数
    async select_count(_collection,_condition={}){
        try{
            let count=await db.collection(_collection).find(_condition).count();
            return apiResult(true,count);
        }catch(err){
            return apiResult(false,err);
        }
    },
    //分页查询
    async select_query(_collection,page,qty,_condition={}){
        try{
            let items=await db.collection(_collection).find(_condition).limit(qty).skip((page-1)*qty).toArray();
            return apiResult(items.length>0,items);
        }catch(err){
            return apiResult(false,err);
        }
    },
    //插入
    async insert(_collection,_data){
        try{
            let result=await db.collection(_collection).insert(_data);
            return apiResult(result.insertedCount,result.result);
        }catch(err){
            return apiResult(false,err);
        } 
    },
    //更新
    async update(_collection,_condition={},_cont={}){
        try{
            let result=await db.collection(_collection).update(_condition,_cont);
            return apiResult(result.result.nModified>0,result);
        }catch(err){
            return apiResult(false,err);
        } 
    },
    //删除
    async delete(_collection,_condition={}){
        try{
            let result=await db.collection(_collection).remove(_condition);
            return apiResult(result.data.n>0,result);
        }catch(err){
            return apiResult(false,err);
        } 
    },
    //排序查询
    async select_sort_sold(_collection,_condition={}){
        try{
            let items=await db.collection(_collection).find(_condition,{sort:{'qty_sold': -1}}).toArray();
            return apiResult(items.length>0,items);
        }catch(err){
            return apiResult(false,err);
        } 
    },
    async select_sort_price(_collection,_condition={}){
        try{
            let items=await db.collection(_collection).find(_condition,{sort:{'price':1}}).toArray();
            return apiResult(items.length>0,items);
        }catch(err){
            return apiResult(false,err);
        } 
    },
    async select_search(_collection,keyword){
        try{
            let word=keyword.word;
            let items=await db.collection(_collection).find({product_name:{$regex:word,$options: 'i' }}).toArray();
            return apiResult(items.length>0,items);
        }catch(err){
            return apiResult(false,err);
        } 
    }
}