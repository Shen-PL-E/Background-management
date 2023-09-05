// axios 第一次封装
import axios from "axios";
import router from "@/router";
// import userstore from "@/stores/index.js";
import store from "@/stores";
// 配置根路径

// const store = userstore() //pinia仓库

axios.defaults.baseURL = 'http://119.3.122.213:8090/api/private/v1/';
// 设置请求拦截
axios.interceptors.request.use((config: any): any => {
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
})
// 设置响应拦截
axios.interceptors.response.use((res): any => {
    // 对响应数据进行过滤
    if (res.data.meta.msg == '无效token') {
        store.commit('setToken','');
        localStorage.setItem('token', '')
        router.push({
            path: '/login'
        })
        return res.data
    }
    return res.data
})
// 封装请求方法

let request = (url: string, method: RequestMethod, params?: Params): Promise<any> => {
    // GET 传参可以直接拼接再路径中，也可以放入params
    return new Promise((resolve: Function, reject: Function) => {
        axios({
            url:url,
            method:method,
            params:method=='GET'?params:null,
            data:method!='GET'?params:null,
        }).then(res=>{
            resolve(res)
        })
        // .catch(err=>{
        //     reject(err)
        // })
    })
}

export default request



