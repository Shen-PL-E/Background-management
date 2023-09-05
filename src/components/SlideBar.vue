<script setup lang="ts">
import { VueElement, h, reactive } from 'vue';
import { FileProtectOutlined, AppstoreOutlined ,UserOutlined,BarChartOutlined,ShoppingOutlined,ProfileOutlined } from '@ant-design/icons-vue';
import { type ItemType } from 'ant-design-vue';


let emit=defineEmits(['sendRouter'])


function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType;
}
const items: ItemType[] = reactive([
    getItem('用户管理', '用户管理', () => h(UserOutlined), [
        getItem('用户列表', '/home/user',() => h(AppstoreOutlined)),
    ]),
    getItem('权限管理', '权限管理', () => h(FileProtectOutlined), [
        getItem('角色列表', '/home/role',() => h(AppstoreOutlined)),
        getItem('权限列表', '/home/power',() => h(AppstoreOutlined)),
    ]),
    getItem('商品管理', '商品管理', () => h(ShoppingOutlined), [
        getItem('商品列表', '/home/goods',() => h(AppstoreOutlined)),
        getItem('分类参数', '/home/cata',() => h(AppstoreOutlined)),
        getItem('商品分类', '/home/goodcata',() => h(AppstoreOutlined)),
    ]),
    getItem('订单管理', '订单管理', () => h(ProfileOutlined), [
        getItem('订单列表', '/home/order',() => h(AppstoreOutlined)),
    ]),
    getItem('数据统计', '数据统计', () => h(BarChartOutlined), [
        getItem('数据报表', '/home/data',() => h(AppstoreOutlined)),
    ]),
]);

const state = reactive({
    rootSubmenuKeys: ['用户管理', '权限管理','商品管理', '订单管理','数据统计'],
    openKeys: ['用户管理'],
    selectedKeys: [],
});
const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
    console.log(latestOpenKey);
    if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
        console.log(openKeys);
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
};
interface obj{
    router:string,
    name:string,
    tit:string
}
function sendRouter(obj:obj) {
    emit('sendRouter',obj)
}

let click=(item:any)=>{
    console.log(item);
    let tit=item.item.originItemValue.label
    let itemRouter=item.key
    let name=state.openKeys[0]
    console.log(name);
    let obj={
        router:itemRouter,
        name,
        tit,
    }
    sendRouter(obj)
}
</script>

<template>
    <div >
        <a-menu v-model:selectedKeys="state.selectedKeys" style="max-width: 200px; min-width: 80px;" mode="inline" theme="dark"
            :open-keys="state.openKeys" :items="items" @openChange="onOpenChange" @click="click">
        </a-menu>
    </div>
</template>
<style scoped lang="less"></style>