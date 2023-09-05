import request from "@/utils/requset";

let UserData = (obj:UserData)=>{
    return request('/users','GET',obj)
    
}

let AddUser=(data:Adduser)=>{
    return request('/users','POST',data)

}

let ChangeState=(id:number,state:Boolean)=>{
    return request(`users/${id}/state/${state}`,'PUT')
}

let EditUser=(id:string,editObj:EditObj)=>{
    return request(`users/${id}`,'PUT',editObj)
}

let DelUser=(id:string)=>{
    return request(`users/${id}`,'DELETE')
}
export {
    UserData,
    ChangeState,
    AddUser,
    EditUser,
    DelUser,
}