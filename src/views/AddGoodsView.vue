<template>
    <div>
        <!-- 上方提示 -->
        <el-alert title="添加商品信息" type="success" show-icon />
        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success" align-center process-status="process">
            <el-step title="基本信息" />
            <el-step title="商品参数" />
            <el-step title="商品属性" />
            <el-step title="商品图片" />
            <el-step title="商品内容" />
            <el-step title="完成" />
        </el-steps>

        <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs" @tab-click="next">
            <el-tab-pane label="基本信息">
                <!-- 四个输入框 -->
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    size="default" status-icon label-position="top">
                    <el-form-item label="商品名称" prop="goodName">
                        <el-input v-model="ruleForm.goodName" />
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goodPrice">
                        <el-input v-model="ruleForm.goodPrice" />
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goodPrice">
                        <el-input v-model="ruleForm.goodPrice" />
                    </el-form-item>
                    <el-form-item label="商品库存" prop="goodPrice">
                        <el-input v-model="ruleForm.goodPrice" />
                    </el-form-item>
                    <!-- 分类框 -->

                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
                Config
            </el-tab-pane>
            <el-tab-pane label="商品属性">
                Role
            </el-tab-pane>
            <el-tab-pane label="商品图片">
                Task
            </el-tab-pane>
            <el-tab-pane label="商品内容">
                Task
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import type { FormRules } from 'element-plus';
import { ref,reactive } from 'vue'
const active = ref(0)
const tabPosition = ref('left')

const next = (e: any) => {
    active.value = parseInt(e.index)
}



// 基本信息
let ruleForm = reactive({
    goodName: '',
    goodPrice: '',
})
interface RuleForm {
    goodName: string,
    goodPrice: string,

}
const rules = reactive<FormRules<RuleForm>>({
    goodName: [
        { required: true, message: 'Please input roleName', trigger: 'blur' },
    ],
    goodPrice: [
        { required: true, message: 'Please input roleDesc', trigger: 'blur' },
    ],
})


</script>
<style lang="less" scoped></style>