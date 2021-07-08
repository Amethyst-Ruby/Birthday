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
          :rules="rules"
        >
          <el-form-item label="姓名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请填写姓名 / 手机号"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              style="width: 100%"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="width: 100%" @click="login"
              >登录 & 注册</el-button
            >
          </el-form-item>

          <el-form-item>
            <el-button style="width: 100%" @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'md5-slim';
import jsCookie from 'js-cookie';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },

      labelPosition: 'top',
    };
  },
  methods: {
    login() {
      if (this.form.username === '') {
        return;
      }
      if (this.form.password === '') {
        return;
      }
      let formData = {
        username: this.form.username,
        password: md5(this.form.password),
      };
      axios
        .post('/api/login', formData)
        .then((res) => {
          console.log(res);
          if (res.data.error === true) {
            this.$message({
              type: 'error',
              message: res.data.message,
            });
          } else {
            this.$message({
              type: 'success',
              message: '登录成功，即将跳转',
            });
            const time = setTimeout(() => {
              window.location.href = '/';
              clearTimeout(time);
            }, 1000);
          }
        })
        .catch((err) => {});
    },
    back() {
      window.location.href = '/';
    },
    checkIsLogined() {
      // const birthday_userid = jsCookie.get('birthday_userid');
      // console.log('birthday_userid:>>', birthday_userid);
      // if (this.birthday_userid) {
      //   window.location.href = '/';
      // }
    },
  },
  mounted() {
    if (this.birthday_userid) {
      location.href = '/';
    }
  },
  computed: {
    birthday_userid() {
      return jsCookie.get('birthday_userid');
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
