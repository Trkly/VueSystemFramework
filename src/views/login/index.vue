<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input placeholder="password" name="password" :type="passwordType" v-model="loginForm.password"></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <span class="svg-container">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
          </span>
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" style="width: 100%; margin-bottom: 30px">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
/**
 * trigger:触发器
 * blur: 失去焦点
 * change:发生改变
 * trigger: 'blur'---意思是当表单失去焦点时触发验证规则
 */
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword
    }
  ]
})

// 处理密码框文本显示
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(225, 225, 225, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: none;
        border-radius: 0px;
        padding: 12px 15px 12px 5px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-size: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
