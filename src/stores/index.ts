// import { defineStore } from "pinia";
// const userstore=defineStore('adminStore',{
//     state:()=> {
//         return{
//             token:localStorage.getItem('token')?localStorage.getItem('token'):null
//         }
//     },
//     // 方法
//     actions:{
//         setToken(token:string){
//             this.token=token
//         }

//     },
//     // 计算属性
//     getters:{

//     }
// })
// export default userstore

import { createStore } from "vuex"

export default createStore({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null
    },
    // 方法
    mutations: {
        setToken(state,token: string) {
            state.token = token
        }
    },
    // 计算属性
    getters: {

    }

})




