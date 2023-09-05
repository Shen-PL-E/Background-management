// 用户数据类型
interface UserData{
    query?:string|null,
    pagenum: number|string,
    pagesize:number|string
}

interface EditObj{
    email?:string,
    mobile?:string
}

interface Adduser{
    username:string,
    password:string,
    email?:string,
    mobile?:string
}

