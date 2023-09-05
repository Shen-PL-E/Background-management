
import { ElMessage } from "element-plus";

function showMsg(message:string,type:MessageType){
    ElMessage({
        message:message,
        type: type,
        // type:'success'
    })
}

export default showMsg



