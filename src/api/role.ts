// 角色
import request from "@/utils/requset";
// 获取
let getAllRole=()=>{
    return request('roles','GET')
}
// 添加
let addRole=(data:AddRole)=>{
    return request('roles','POST',data)
}
// 编辑
let editRole=(id:string,data:AddRole)=>{
    return request(`roles/${id}`,'PUT',data)
}
// 删除
let delRole=(id:string)=>{
    return request(`roles/${id}`,'DELETE')
}

//删除指定权限
let delOneRole=(roleid:string,rightid:string)=>{
    return request(`roles/${roleid}/rights/${rightid}`,'DELETE')
} 

// 获取全部的权限
let getAllRight=(type:string)=>{
    return request(`/rights/${type}`,'GET')
}

//角色授权

let setRoleRight=(id:string,rids:any)=>{
    return request(`roles/${id}/rights`,'POST',{rids})
}

export {
    getAllRole,
    addRole,
    editRole,
    delRole,
    delOneRole,
    getAllRight,
    setRoleRight
}