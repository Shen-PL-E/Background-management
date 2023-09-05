<script lang="ts" setup>
import { ref } from 'vue'
import { getcategories } from "@/api/goods";
import showMsg from '@/utils/showmessage';
const value = ref([])

const CascaderProps={
    value:'cat_id',
    label:'cat_name',
    children:'children'
}

const handleChange = (value:any) => {
    console.log(value)
}

let  options =ref([])
function  getAllcata() {
    getcategories().then(res=>{
        console.log(res);
        
        if (res.meta.status==200) {
            options.value=res.data
        } else {
            showMsg(res.meta.msg,'error')
        }
    })
}
getAllcata()



</script>
<template>
    <div>
        <div class="m-4">
            <el-cascader v-model="value" :options="options" @change="handleChange" :props="CascaderProps" placeholder="请选择商品分类"/>
        </div>
        <el-tabs tab-position="top" style="height: 200px" class="demo-tabs" @tab-click="">
            <el-tab-pane label="基本信息" >
                User
            </el-tab-pane>
            <el-tab-pane label="商品参数">
                Config
            </el-tab-pane>
        </el-tabs>





    </div>
</template>

<style lang="less"></style>