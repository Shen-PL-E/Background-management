<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getAllGoods } from '@/api/goods'
import { Delete, Edit, Setting, } from '@element-plus/icons-vue'
import showMsg from "@/utils/showmessage.js";
// import router from '@/router/index.js'

// 获取商品数据
let currentPage = ref(1)
let pageSize = ref(10)
let total = ref(0)
let goodslist = ref([])
let page = reactive({
    query: '',
    pagenum: 1,
    pagesize: 10,
})


function getGoodsList(pag: any) {
    getAllGoods(pag).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
            goodslist.value = res.data.goods
            total.value = res.data.total
        } else {
            showMsg(res.meta.msg, 'error')
        }
    })
}
getGoodsList(page)

// 分页
const background = ref(false)
const disabled = ref(false)
const small = ref(false)
const handleSizeChange = (val: number) => {
    // console.log(`${val} items per page`)
    pageSize.value = val
    page.pagesize = val
    console.log(page);
    getGoodsList(page)

}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    currentPage.value = val
    page.pagenum = val
    console.log(page);
    getGoodsList(page)

}

// 编辑删除
let editGood = () => {

}

let delGood = () => {

}

// 搜索功能
const input = ref('')
// const formSize = ref('default')
let search = () => {
    page.query = input.value
    getGoodsList(page)

}
// 添加商品
let emit = defineEmits(['addGood'])
let addGood = () => {

    emit('addGood', '/home/addGoods')
}

// 单元格样式

</script>
<template>
    <div>
        <!-- 搜索模块 -->
        <div class="big">
            <div class="mt-4">
                <el-input v-model="input" placeholder="请输入关键字" class="input-with-select">
                    <template #append>
                        <el-button :icon="Search" @click="search" />
                    </template>
                </el-input>
            </div>
            <el-button type="primary" @click="addGood">添加商品</el-button>
        </div>
        <!-- 显示数据页面 -->
        <el-table :data="goodslist" border style="width: 100%" >
            <el-table-column prop="goods_id" label="商品id" />
            <el-table-column prop="goods_name" label="商品名称" width='590'/>
            <el-table-column prop="goods_price" label="商品价格" />
            <el-table-column prop="goods_number" label="商品数量" />
            <el-table-column prop="goods_weight" label="商品重量" />
            <el-table-column prop="address" label="操作" >
                <template #default="{ row }">
                    <el-row>
                        <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
                            <el-button type="primary" :icon="Edit" @click="editGood()">编辑</el-button>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
                            <el-button type="danger" :icon="Delete" @click="delGood()">删除</el-button>
                        </el-tooltip>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <div class="demo-pagination-block">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                    :small="small" :disabled="disabled" :background="background"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>


    </div>
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

.page {
    margin: 10px 0;
}
</style>