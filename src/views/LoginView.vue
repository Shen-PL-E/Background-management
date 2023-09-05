<script setup lang="ts">
import { reactive, computed } from 'vue';
import { UserLogin } from '@/api/login.js'
import router from '@/router';
if (localStorage.getItem('token')) {
  router.push('/home')
}
const formState = reactive({
  username: '',
  password: '',
});
const onFinish = (values: any) => {
  UserLogin(values).then(res => {
    console.log(res);
    if (res.meta.status == 200) {
      localStorage.setItem('token', res.data.token)
      alert(res.meta.msg)
      router.push('/home')
    } else {
      alert(res.meta.msg)
    }
  })
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<template>
  <div class="cont">
    <div class="login">
      <h1>用户登录</h1>
      <a-form :model="formState" name="horizontal_login" autocomplete="off" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="btn">Log in</a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>
<style lang="less" scoped>
.cont {
  width: 100%;
  height: 100%;
  background: #2D3A4B;
  position: absolute;
  top: 0;
  left: 0;

  .login {
    width: 350px;
    margin: 0 auto;
    text-align: center;
    margin-top: 220px;

    h1 {
      color: #FFF;
    }

    .btn {
      width: 100%;
      color: #FFF;
      background: #409EFF;
      border: none;
    }
  }
}
</style>