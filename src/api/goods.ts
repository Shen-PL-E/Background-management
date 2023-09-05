import request from "@/utils/requset";

let getAllGoods=(obj:UserData)=>{
    return request('goods','GET',obj)
}

let getcategories=()=>{
    return request('categories','GET')

}



export {
    getAllGoods,
    getcategories
}