<script setup lang="ts">
import SlideBar from '@/components/SlideBar.vue';

import router from '@/router';

import { ref, reactive } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RightOutlined,
} from '@ant-design/icons-vue';

const collapsed = ref<boolean>(false);
let obj: any = ref({
  router: '',
  name: '',
  tit: '',
});
let isshow=ref(false)
router.push('/home/shome')
let quit = () => {
  localStorage.removeItem('token');
  router.push('/login')
}
let getRouter = (val: any) => {
  obj.value = val;
  console.log(obj);
  isshow=ref(true)
  addgoods.value=false
  router.push(val.router);
}
let toHome=()=>{
  router.push('/home/shome')
  obj.value={}
  addgoods.value=false
  isshow=ref(false)
}

// 接收添加商品
let addgoods=ref(false)
let addGood=(val:string)=>{
  console.log(val);
  addgoods.value=true
  router.push(val)
} 


</script>
<template>
  <a-layout class="conent">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="userinfo">
        <img src="../assets/logo.svg" alt=""><br>
        <p>
          admin <span :class="{ 'block': collapsed == true }">管理员</span>
        </p>
      </div>
      <SlideBar @send-router="getRouter"></SlideBar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a class="quit" @click="quit">退出</a>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <div class="tit">
          <ul>
            <li @click="toHome"><b>首页</b></li>
            <li v-show="isshow"><right-outlined /><span> {{ obj.name }}</span></li>
            <li v-show="isshow"><right-outlined /><span> {{ obj.tit }}</span></li>
            <li v-show="addgoods"><right-outlined /><span>  添加商品 </span></li>
          </ul>
        </div>
        <router-view @addGood="addGood"></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.conent {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.trigger {
  margin-left: 20px;
  font-size: 24px;
}

.quit {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-left: 1600px;
  color: #FFF;
  background: #409EFF;
  padding: 5px 10px;
  border-radius: 4px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.userinfo {
  text-align: center;
  margin: 80px 0;
  color: #fff;

  img {
    width: 60px;
    padding: 4px;
    border: 1px solid #5c5c5c;
  }

  p {
    min-width: 60px;
    font-size: 18px;
    margin-top: 1em;
  }
}

.block {
  display: block;
}
.tit{
  ul{
    display: flex;
    list-style: none;
    li{
      // padding: 4px 8px;
      display: flex;
      justify-content: space-between;
      span{
        padding: 0 2px;
      }
    }
  }
}
</style>