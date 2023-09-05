<script lang="ts" setup>
import UserTable from '@/components/User/UserTable.vue'
import UserSearch from '@/components/User/UserSearch.vue'
import { ref, reactive } from 'vue';
import { UserData } from '@/api/user';

// 请求数据
let currentPage = ref(1)
let pageSize = ref(5)
let total = ref(0)
let page: UserData =reactive ({
    query: '',
    pagenum: currentPage.value,
    pagesize: pageSize.value,
})
UserData(page).then(res=>{
    total.value=res.data.total
})

// 分页
const background = ref(false)
const disabled = ref(false)
const small = ref(false)
const handleSizeChange = (val: number) => {
    // console.log(`${val} items per page`)
    pageSize.value=val
    page.pagesize=val
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    currentPage.value=val
    page.pagenum=val
}
</script>
<template>
    <div>

        <div class="cont">
            <div class="search">
                <UserSearch></UserSearch>
            </div>
            <div class="con">
                <UserTable :page="page" :currentPage="currentPage" :pageSize="pageSize" ></UserTable>
            </div>
            <!-- 分页 -->
            <div class="page">
                <div class="demo-pagination-block">
                    <!-- <div class="demonstration">All combined</div> -->
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[5, 10, 15, 20]" :small="small" :disabled="disabled" :background="background"
                        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.cont {
    width: 100%;
    // background: #F1F1F1;
}
</style>