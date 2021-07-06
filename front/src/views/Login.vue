<template>
  <div class="login">
    <div class="left">
      <p class="title">友人帐</p>
      <p class="description">记录你与友人的相识，相知 🍂</p>
    </div>
    <!-- 书签装饰品，主页那边可以加个 hover -->
    <div></div>
    <div class="right">
      <div class="formBox">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :label-position="labelPosition"
        >
          <el-form-item label="姓名">
            <el-input
              v-model="form.name"
              placeholder="请填写姓名 / 手机号"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-button style="width: 100%" @click="login">登录</el-button>
          <el-form-item style="width: 100%"> </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      form: {},
      labelPosition: 'top',
    };
  },
  methods: {
    login() {
      let form = this.form;
      axios
        .post('/api/login', form)
        .then((res) => {})
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
}
.left {
  width: 50%;
  height: 100vh;
  position: relative;
}
.left::before {
  content: '';
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: rgb(131, 175, 155)
    /* background-color: rgb(255, 255, 255); */ /*孩子绝对定位*/;
  position: absolute;
  right: -65px;
  top: 25px;
  z-index: 1;
}
.title {
  line-height: 100px;
  font-size: 100px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.description {
  line-height: 0px;
  font-weight: bold;
  color: white;
  text-align: center;
}
.right {
  width: 50%;
  height: 100vh;
  background-color: #fff;
}
.formBox {
  width: 40%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>
