import {fetch} from "./apiConfig"
import qs from 'qs'
import apiList from './api'
const api = {};
const role = {};
var baseUrl = '/ls'
if(process.env.NODE_ENV === 'production'){
    baseUrl = '/auxiliary'
}
apiList.forEach((item,index)=>{
    if(item.type === 'url'){
        api[item.name] =baseUrl + item.url;
    }else{
        api[item.name] = (params,config)=> {
            let param = ''
            if(config && config.params){
              param = '?' + qs.stringify(config.params);
            }
           return fetch(baseUrl + item.url + param, {
                method: item.method,
                headers: (()=>{
                    if(config && config.type && config.type==='file'){
                        return{}
                    }else {
                        return {
                            'Content-Type': config && config.type && config.type === 'json' ? 'application/json' : 'application/x-www-form-urlencoded'
                        }
                    }
                })(),
                body: (()=>{
                    if(config && config.type && config.type==='file'){
                        return params;
                    }else if(item.method==='post'&&config && config.type&&config.type === 'json'){
                        return JSON.stringify(params)
                    }else if(item.method==='post'){
                        return qs.stringify(params);
                    }else{
                        return null;
                    }
                    // params config && config.type && config.type==='file' ? params : item.method==='post' ? qs.stringify(params) : null,
                })(),
               credentials: 'include',
               notToJson: config&&config.notToJson? true:false
            })
        }

    }
})
export {api,role}