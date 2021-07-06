<template>
  <div class="birthday">
    <!-- 单行 -->
    <div class="title">
      和
      <span class="fw">{{ name }}</span>
      相遇已有
      <span class="fw">{{ day }}</span>
      天
    </div>
    <!-- 多行 -->
    <div v-if="false">
      <div class="title">
        和
        <span class="fw">{{ name }}</span>
      </div>
      <div class="title">
        相遇已有
        <span class="fw">{{ day }}</span>
        天
      </div>
    </div>
    <div class="btnBox">
      <!-- 设置按钮 -->
      <el-button icon="el-icon-setting" circle id="settingBtn"></el-button>
      <!-- 添加按钮 -->
      <el-button
        icon="el-icon-plus"
        circle
        id="settingBtn"
        @click="dialogSettingVisible = true"
      ></el-button>
    </div>

    <!-- 弹出框：添加朋友 -->
    <el-dialog
      title="添加朋友"
      v-model="dialogSettingVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名：">
          <el-input
            v-model="form.name"
            prefix-icon="el-icon-user"
            style="width: 100%"
            placeholder="请输入朋友的名字~"
          ></el-input>
        </el-form-item>

        <el-form-item label="相识：">
          <el-date-picker
            type="date"
            placeholder="请选择认识的时间~"
            v-model="form.date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="出壳日：">
          <el-date-picker
            type="date"
            placeholder="请选择朋友的生日"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSettingVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogSettingVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- <div class="formStyle">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input
          v-model="form.name"
          prefix-icon="el-icon-search"
          style="width: 100%"
        ></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-date-picker
          type="date"
          placeholder="日期"
          v-model="form.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-date-picker
          type="date"
          placeholder="日期"
          v-model="form.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div> -->
</template>

<script >
export default {
  data() {
    return {
      name: '新垣结衣',
      day: '100',
      form: {},
      dialogSettingVisible: false,
    };
  },
};
</script>

<style scoped>
.birthday {
  padding-top: 10%;
}

.title {
  font-size: 80px;
  text-align: center;
  color: #ffffff;
  /* font-family: 'Courier New', Courier, monospace; */
}
h1 {
  font-size: 100px;
  font-weight: bold;
}
.fw {
  font-weight: bold;
  font-size: 120px;
}
.btnBox {
  position: absolute;
  right: 1%;
  bottom: 1%;
}
</style>
