// 类型文件
// 请求方法的类型
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' |'HEAD'|'OPTIONS'
// 请求参数
interface Params{
    [key:string]:any,
    headers?:any
}


