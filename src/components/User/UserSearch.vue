<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import bus from '@/utils/bus.js'
import type { FormRules } from 'element-plus';
const input = ref('')
const formSize = ref('default')
let add = ref(false)
// let emit = defineEmits(['query', 'addUser'])

const ruleForm = reactive({
    username: '',
    password: '',
    email: '',
    mobile: '',
})
interface RuleForm {
    username: string,
    password: string,
    email: string,
    mobile: string
}
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
        // 添加正则验证 ^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$
    ],
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        // {min:11,max:11,message:'请输入正确的手机号',trigger:'blur'},
        // 添加正则验证 /^1[3|4|5|7|8][0-9]{9}$/
        // {}
    ],
})
// 发布消息
let addUser=()=>{
    add.value=false
    bus.emit('addUser',ruleForm)
}

let search=()=>{
    bus.emit('query',input.value)
}



</script>
<template>
    <div class="big">
        <!-- <el-input v-model="input" placeholder="Please input" /> -->
        <div class="mt-4">
            <el-input v-model="input" placeholder="请输入关键字" class="input-with-select">
                <template #append>
                    <el-button :icon="Search" @click="search"/>
                </template>
            </el-input>
        </div>
        <el-button type="primary" @click="add=true">添加用户</el-button>
    </div>

    <el-dialog v-model="add" title="添加用户">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="ruleForm.mobile" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="add = false">取消</el-button>
                <el-button type="primary" @click="addUser">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
.big {
    display: flex;
    padding: 0 10px 10px 0;
    justify-content: space-between;
    width: 410px;

    .mt-4 {
        width: 300px;
    }
}
</style>