<template>
  <el-table :data="userlist" border style="width: 100%">
    <el-table-column prop="id" label="用户id" />
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="mobile" label="电话" />
    <el-table-column prop="role_name" label="角色" />
    <el-table-column prop="mg_state" label="状态">
      <template #default="{ row }">
        <el-switch v-model="row.mg_state" @change="change(row.id, row.mg_state)" />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template #default="{ row }">
        <el-row>
          <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" :icon="Edit" circle
              @click="editUser(row.id, row.username, row.email, row.mobile)"></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
            <el-button type="danger" :icon="Delete" circle @click="delUser(row.id)" />
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top">
            <el-button type="warning" :icon="Setting" circle @click="roleUser = true" />
          </el-tooltip>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑弹出框 -->
  <el-dialog v-model="dialogFormVisible" title="编辑用户">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" disabled />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="edit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 分配角色弹出框 -->
  <el-dialog v-model="roleUser" title="分配角色">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      分配角色
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roleUser = false">取消</el-button>
        <el-button type="primary" @click="roleUser = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- {{props.tableData}} -->
</template>
<script lang="ts" setup>
import { watch, computed, ref, reactive, onMounted, onUnmounted } from 'vue';
import { UserData, ChangeState, EditUser, DelUser, AddUser } from '@/api/user';
import { Delete, Edit, Setting, } from '@element-plus/icons-vue'
import showMsg from "@/utils/showmessage.js";
import bus from '@/utils/bus.js'
// import store from '@/stores/index'
// if (!store.state.token) {
//   router.push('/login')
// }
let props = defineProps({
  page: {
    type: Object
  },
  currentPage: {
    type: Number
  },
  pageSize: {
    type: Number
  }
});
let userlist = ref([]);
UserData({
  query: '',
  pagenum: 1,
  pagesize: 5,
}).then(res => {
  console.log(res);
  if (res.meta.status == 200) {
    userlist.value = res.data.users
  } else {
    alert('888')
  }
})

console.log(props.page);
watch(() => props.currentPage, (n, o) => {
  console.log(n);
  UserData(props.page as any).then(res => {
    console.log(res);
    if (res.meta.status == 200) {
      userlist.value = res.data.users
    } else {
      alert('666')
    }
  })
})
watch(() => props.pageSize, (n, o) => {
  console.log(n);
  UserData(props.page as any).then(res => {
    console.log(res);
    if (res.meta.status == 200) {
      userlist.value = res.data.users
    } else {
      alert('999')
    }
  })
})
// 更改状态
function change(id: number, state: boolean) {
  console.log(id, state);
  ChangeState(id, state).then(res => {
    console.log(res);
  })
}

// 右侧三个按钮
import type { FormRules } from 'element-plus'
import router from '@/router';
let dialogFormVisible = ref(false)
let roleUser = ref(false)
// const formLabelWidth = '140px'
const formSize = ref('default')
const ruleForm = reactive({
  name: '',
  email: '',
  phone: '',
})
interface RuleForm {
  name: string,
  email: string,
  phone: string
}
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
    // 添加正则验证 ^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    // {min:11,max:11,message:'请输入正确的手机号',trigger:'blur'},
    // 添加正则验证 /^1[3|4|5|7|8][0-9]{9}$/
    // {}
  ],
})

let editId = ref('')

// 将数据回显并将id保存
let editUser = (id: string, username: string, email: string, mobile: string) => {
  dialogFormVisible.value = true
  ruleForm.name = username;
  ruleForm.email = email;
  ruleForm.phone = mobile;
  editId.value = id
}
// 发送请求
let edit = () => {
  dialogFormVisible.value = false
  let editObj = {
    email: ruleForm.email,
    mobile: ruleForm.phone
  }
  console.log(editObj);
  EditUser(editId.value, editObj).then(res => {
    console.log(res);
    if (res.meta.status == 200) {
      showMsg(res.meta.msg, 'success')
      UserData({ query: '', pagenum: 1, pagesize: 5 }).then(res => {
        userlist.value = res.data.users
      })
    } else {
      showMsg(res.meta.msg, 'errpr')
    }
  })
}
// 删除请求
let delUser = (id: string) => {
  console.log(id);
  DelUser(id).then(res => {
    if (res.meta.status == 200) {
      showMsg(res.meta.msg, 'success')
      UserData({ query: '', pagenum: 1, pagesize: 5 }).then(res => {
        userlist.value = res.data.users
      })
    } else {
      showMsg(res.meta.msg, 'error')
    }
  })
}
// 分配角色


// 接收订阅消息
onMounted(() => {
  bus.on('query', val => {
    // console.log(val);
    UserData({ query: val as string, pagenum: 1, pagesize: 5 }).then(res => {
      userlist.value = res.data.users
    })
  })

  bus.on('addUser', val => {
    console.log(val);
    AddUser(val as Adduser).then(res => {
      console.log(res);
      if (res.meta.status == 201) {
        showMsg(res.meta.msg, 'success')
        UserData({ query: '', pagenum: 1, pagesize: 5 }).then(res => {
          userlist.value = res.data.users
        })
      }else{
        showMsg(res.meta.msg,'error')
      }
    })
  })

})
onUnmounted(() => {
  bus.off('query')
  bus.off('addUser')
})






</script>

<style lang="less"></style>