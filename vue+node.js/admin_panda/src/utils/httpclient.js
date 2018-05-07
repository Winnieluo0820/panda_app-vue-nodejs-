import axios from 'axios'
import router from '../router'
const baseUrl = 'http://localhost:66/'
let filterUrl = (_url) => {
    if(_url && _url.startsWith('http')){
        return _url;
    }
    return baseUrl + _url;
}
export default {
    get(_url, _params = {}){
        return new Promise((resolve, reject) => {
            axios({
                url:filterUrl(_url),
                params:_params,
                method:'get',
                headers:{
                    'auth':window.localStorage.getItem('token_name')
                }
            }).then((res)=>{
                if(!res.data.status&& res.data.message=='unauth'){console.log('get')
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
                    console.log(res.data.status,res.data.message);
                    router.push({name:'login'});
                    return false;
                }           
                resolve(res.data);
            }).catch(error => {
                reject(error)
            })     
        })
    },
    upload(_params){
        // $.ajax({
        //     url: filterUrl(_params.url),
        //     type: 'post',
        //     data: _params.data,
        //     contentType: false,
        //     processData: false,
        //     success: function(res){
        //         if(!res.status && res.message == 'unauth'){
        //             window.location.href = 'login.html';
        //         } else {
        //             _params.cb(res);
        //         }
        //     }
        // })   
        axios.post(filterUrl(_params.url),_params.data).then(function (res){
            console.log(555);
            // if(!res.status && res.message == 'unauth'){
            //     window.location.href = 'login.html';
            // } else {
            //     _params.cb(res);
            // }
            console.log(res);
        })   
    }
}