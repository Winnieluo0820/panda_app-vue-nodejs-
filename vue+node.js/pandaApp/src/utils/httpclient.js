/* 
* @Author: Marte
* @Date:   2018-04-28 20:05:07
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-05 09:22:55
*/
import axios from 'axios'
import router from '../router/router'
const baseUrl = 'http://10.3.133.58:66/'

let filterUrl = (_url) => {
    if(_url && _url.startsWith('http')){
        return _url;
    }
    return baseUrl + _url;
}
export default {
    get(_url, _params = {}){
    	console.log(_params)
        return new Promise((resolve, reject) => {
            axios({
                url:filterUrl(_url),
                params:_params,
                method:'get',
                headers:{
                    'auth':window.localStorage.getItem('token_name')
                }
            }).then((res)=>{
                if(!res.data.status&& res.data.message=='unauth'){
                    router.push({name:'login'});
                }else{
                    resolve(res.data);
                }
            }).catch((error)=>{
                reject(error);
            })
        })
    },
    post(_url, _params = {}){
        return new Promise((resolve, reject) => {
            axios({
                url: filterUrl(_url),
                method: 'post',
                data: _params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'auth':window.localStorage.getItem('token_name') 
                },
                transformRequest: [function (data) {
                    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }], 
            }).then(res => {
                if(!res.data.status && res.data.message == "unauth"){
                    router.push({name:'login'});
                    return false;
                }               
                resolve(res.data);
            }).catch(error => {
                reject(error)
            })     
        })
    }
}