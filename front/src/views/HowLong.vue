<template>
  <div>
    <!-- 认识多长时间 -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1 class="title">{{ title }}</h1>
        <label for="birthday">我们啥时候相识的？</label>
        <input type="text" id="birthday" placeholder="请输入日期YYYY-MM-DD" />
        <input type="button" value="确定" id="btn" />
        <div>
          <span>我们已经认识了</span>
          <span id="show">？？</span>
          <span>天了</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script >
export default {
  data() {
    return {
      title: '纪念摸鱼的 2021/7/5',
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 150px;
  font-weight: bold;
}
</style>
