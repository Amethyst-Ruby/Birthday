<template>
  <div class="birthday">
    <!-- 单行 -->
    <div v-show="textStyle === true">
      <div class="title">
        和
        <span class="fw">{{ selectedUser.label }}</span>
        相遇已有
        <span class="fw">{{ displayDay }}</span>
        天
      </div>
    </div>

    <!-- 多行 -->
    <div v-show="textStyle === false">
      <div class="title">
        和
        <span class="fw">{{ name }}</span>
      </div>
      <div class="title">
        相遇已有
        <span class="fw">{{ displayDay }}</span>
        天
      </div>
    </div>

    <!-- 秒数 -->
    <div class="secondBox">
      <span class="secondNumber">{{ second }} </span> 秒
    </div>

    <!-- 按钮 -->
    <div class="btnBox">
      <!-- 设置按钮 -->
      <el-button icon="el-icon-setting" circle @click="settingBtn"></el-button>
      <!-- 添加按钮 -->
      <el-button icon="el-icon-plus" circle @click="addBtn"></el-button>
      <!-- 查看个人信息 -->
      <!-- <el-button icon="el-icon-plus" circle @click="addBtn"></el-button> -->
    </div>

    <!-- 弹出框：添加朋友 -->
    <el-dialog title="添加朋友" v-model="dialogAddVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
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

        <el-form-item label="主页显示：" prop="delivery">
          <el-switch
            v-model="form.delivery"
            active-text="显示"
            inactive-text="不显示"
          ></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 弹出框：设置 -->
    <el-dialog title="设置" v-model="dialogSettingVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="主页展示：">
          <el-select
            v-model="selectedUser"
            filterable
            placeholder="请选择主页展示的朋友姓名"
            style="width: 100%"
            @change="changeUser"
          >
            <el-option
              v-for="(item, index) in userList"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间点：">
          <el-date-picker
            v-model="selectedMeetingDate"
            type="date"
            placeholder="重新选择相识的日期"
            :shortcuts="shortcuts"
            :disabled-date="disabledDate"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="文字样式：">
          <el-switch
            v-model="textStyle"
            active-text="单行"
            inactive-text="多行"
            @change="changeTextStyle"
          >
          </el-switch>
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
</template>

<script >
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      name: '新垣结衣',
      form: {},
      dialogSettingVisible: false,
      dialogAddVisible: false,

      selectedUser: '', // 主页选择了的用户，默认为第一个
      userList: [],

      selectedMeetingDate: '',
      shortcuts: [],
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      second: '0',
      textStyle: '', // 文字样式
    };
  },
  methods: {
    changeUser(e) {
      console.log(e);
      this.selectedMeetingDate = e.value;
    },

    settingBtn() {
      // console.log('缓存中获取birthday_user:>>', this.birthday_user);
      if (this.birthday_user) {
      } else {
        this.dialogSettingVisible = true;
      }
    },

    addBtn() {
      console.log('缓存中获取birthday_user:>>', this.birthday_user);
      if (this.birthday_user) {
      } else {
        this.$confirm('只有登录才能保存朋友哦~去登录吧?', '提示', {
          confirmButtonText: '好的~',
          cancelButtonText: '就不！',
          type: 'warning',
        })
          .then(() => {
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });
            window.location.href = '/login';
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
        // ElMessage('只是消息')
        // window.location.href = '/login';
      }
    },

    init() {
      return new Promise((resolve) => {
        // 默认的用户列表
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
        const todayDay = String(today.getDate()).padStart(2, '0');
        // console.log(todayYear, todayMonth, todayDay);
        const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;
        this.userList = [
          {
            value: todayStr,
            label: 'Ruby',
          },
          {
            value: '2020-01-01',
            label: '新垣结衣',
          },
        ];
        this.name = this.userList[0].label;
        this.selectedUser = this.userList[0];
        this.selectedMeetingDate = this.selectedUser.value;
        this.textStyle = true;
        this.shortcuts = [
          {
            text: '今天',
            value: new Date(),
          },
          {
            text: '昨天',
            value: (() => {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            })(),
          },
          {
            text: '一周前',
            value: (() => {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            })(),
          },
        ];
        resolve();
      });
    },

    computedSecond() {
      const time = setInterval(() => {
        const now = new Date();
        const selectedTime = new Date(this.selectedMeetingDate);
        this.second = parseInt((now - selectedTime) / 1000);
      }, 1000);
    },

    changeTextStyle() {
      console.log(this.textStyle);
    },
  },
  async mounted() {
    // 初始化人员列表
    await this.init();
    // 计算时间
    this.computedSecond();
  },
  computed: {
    displayDay() {
      const now = new Date();
      const before = new Date(this.selectedUser.value);
      console.log((now - before) / 1000 / 60 / 60 / 24);
      return parseInt((now - before) / 1000 / 60 / 60 / 24) + 1;
    },
  },
};
</script>

<style scoped>
.birthday {
  padding-top: 7%;
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
.secondBox {
  width: 100%;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: white;
  font-weight: bold;
}
.secondNumber {
  font-size: 60px;
}
</style>
