<script lang="ts" setup>
import { checkTagEmits, ElTree, type FormRules } from 'element-plus';
import { ref, reactive } from 'vue';
import { Delete, Edit, Setting, } from '@element-plus/icons-vue'
import showMsg from '@/utils/showmessage';
import { getAllRole, addRole, editRole, delRole, delOneRole, getAllRight,setRoleRight } from "@/api/role.js";

// 请求数据
const parentBorder = ref(false)
const childBorder = ref(false)
let tableData = ref([])
async function getinfo() {
    let res = await getAllRole()
    // console.log(res);
    if (res.meta.status == 200) {
        tableData.value = res.data
    } else {
        showMsg(res.meta.msg, 'error')
    }
}
getinfo()



// 添加角色
let add = ref(false)
const formSize = ref('default')
let ruleForm = reactive({
    roleName: '',
    roleDesc: '',
})
interface RuleForm {
    roleName: string,
    roleDesc: string,

}
const rules = reactive<FormRules<RuleForm>>({
    roleName: [
        { required: true, message: 'Please input roleName', trigger: 'blur' },
    ],
    roleDesc: [
        { required: true, message: 'Please input roleDesc', trigger: 'blur' },
    ],
})
let addnew = () => {
    add.value = true;
    ruleForm.roleName = ''
    ruleForm.roleDesc = ''
}
let addNewRole = () => {
    addRole(ruleForm).then(res => {
        console.log(res);
        if (res.meta.status == 201) {
            add.value = false
            getinfo()
        } else {
            showMsg(res.meta.msg, 'error')
        }
    })

}
// 三个按钮
// 编辑按钮
let edit = ref(false)
let editId = ref('')
let editnew = (id: string, roleName: string, roleDesc: string) => {
    edit.value = true
    console.log(id, roleName, roleDesc);
    ruleForm.roleName = roleName
    ruleForm.roleDesc = roleDesc
    editId.value = id
}

let editNewRole = () => {
    editRole(editId.value, ruleForm).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
            edit.value = false
            showMsg(res.meta.msg, 'success')
            getinfo()
        } else {
            showMsg(res.meta.msg, 'error')
        }

    })
}
// 删除按钮
let delnew = (id: string) => {
    console.log(id);
    delRole(id).then(res => {
        if (res.meta.status == 200) {
            edit.value = false
            showMsg(res.meta.msg, 'success')
            getinfo()
        } else {
            showMsg(res.meta.msg, 'error')
        }
    })
}
// 分配权限按钮
let set = ref(false)
let checked = ref<string[]>([])

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const treeRef = ref<InstanceType<typeof ElTree>>()
let id=''
let setnew = (obj: any) => {
    id=obj.id
    set.value = true
    checked.value = []
    obj.children.forEach((item: any) => {
        // checked.value.push(item.id)
        if (item.children) {
            item.children.forEach((sec: any) => {
                // checked.value.push(sec.id)
                if (sec.children) {
                    sec.children.forEach((trd: any) => {
                        checked.value.push(trd.id)
                    })
                }
            })
        }
    });
    console.log(checked.value,id);
    // checked.value=[]
}
const defaultProps = {
    children: 'children',
    label: 'authName',
}
let data = ref([])
getAllRight('tree').then(res => {
    if (res.meta.status == 200) {
        data.value = res.data
    } else {
        alert(res.meta.msg)
    }

})

let setRole = () => {
    set.value = false
    // 选中的权限id
    let arr=treeRef.value!.getCheckedKeys()
    // 半开的权限
    let arr2=treeRef.value!.getHalfCheckedKeys()
    let rids=[...arr,...arr2].join()
    console.log(rids);
    console.log(id);
    setRoleRight(id,rids).then(res=>{
        console.log(res);
        if (res.meta.status==200) {
            showMsg(res.meta.msg,'success')
            getinfo()
        } else {
            showMsg(res.meta.msg,'error') 
        }
    })

}

// 标签点击事件   待解决数据更新 页面刷新
let cls_first = (roleid: string, rightid: string) => {
    delOneRole(roleid, rightid).then(res => {
        if (res.meta.status == 200) {
            showMsg(res.meta.msg, 'success')
            getinfo()
        } else {
            showMsg(res.meta.msg, 'error')
        }
    })
}

</script>
<template>
    <div>
        <el-button type="primary" @click="addnew">添加角色</el-button>

        <el-table :data="tableData" :border="parentBorder" style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <div class="div_flex">
                        <div v-for="item in props.row.children" style="display: flex; border-bottom: 1px solid #F1F1F1;"
                            :key="item.id">
                            <div style="width: 20%;">
                                <el-tag class="mx-1" closable type="" @close="cls_first(props.row.id, item.id)">
                                    {{ item.authName }}
                                    {{ item.id }}
                                </el-tag>
                            </div>
                            <div class="div_flex" style="width: 20%;">
                                <div v-for="sec in item.children" :key="sec.id">
                                    <el-tag class="mx-1" closable type="success" @close="cls_first(props.row.id, sec.id)">
                                        {{ sec.authName }}
                                    </el-tag>
                                </div>
                            </div>
                            <div>
                                <div v-for="sec in item.children" style="display: flex;flex-wrap: wrap;">
                                    <div v-for=" trd in sec.children" :key="trd.key">
                                        <el-tag class="mx-1" closable type="warning"
                                            @close="cls_first(props.row.id, trd.id)">
                                            {{ trd.authName }}
                                        </el-tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </template>
            </el-table-column>
            <el-table-column label="角色id" prop="id" />
            <el-table-column label="角色名称" prop="roleName" />
            <el-table-column label="角色描述" prop="roleDesc" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-row>
                        <el-button type="primary" :icon="Edit"
                            @click="editnew(row.id, row.roleName, row.roleDesc)">编辑</el-button>
                        <el-popconfirm title="Are you sure to delete this?" @confirm="delnew(row.id)">
                            <template #reference>
                                <el-button type="danger" :icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="warning" :icon="Setting" @click="setnew(row)">分配权限</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加角色弹出层 -->
        <el-dialog v-model="add" title="添加角色">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                :size="formSize" status-icon>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName" />
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="ruleForm.roleDesc" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="add = false">取消</el-button>
                    <el-button type="primary" @click="addNewRole">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 编辑角色弹出层 -->
        <el-dialog v-model="edit" title="编辑角色">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                :size="formSize" status-icon>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="ruleForm.roleName" />
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="ruleForm.roleDesc" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="add = false">取消</el-button>
                    <el-button type="primary" @click="editNewRole">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 分配权限弹出层 -->
        <el-dialog v-model="set" title="分配权限" v-if="set">
            <el-tree :data="data" show-checkbox node-key="id" :default-checked-keys="checked" :props="defaultProps"
                auto-expand-parent :default-expanded-keys="checked" 
                ref="treeRef"/>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="add = false">取消</el-button>
                    <el-button type="primary" @click="setRole()">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<style lang="less">
.div_flex {
    display: flex;
    flex-direction: column;
}

.mx-1 {
    margin: 10px;
    padding: 10px;
}
</style>