// 登录
import request from "@/utils/requset";

let UserLogin = (obj:LoginParams)=>{
    return request('/login','POST',obj)

}



export { UserLogin }
