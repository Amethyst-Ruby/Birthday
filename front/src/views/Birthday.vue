<template>
  <div class="birthday">
    <!-- 文字 -->
    <div>
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
        换算成秒的话就是 <span class="secondNumber">{{ second }} </span> 秒 😝
      </div>
    </div>

    <!-- 按钮 -->
    <div class="btnBox">
      <!-- 设置按钮 -->
      <el-button icon="el-icon-setting" circle @click="settingBtn"></el-button>
      <!-- 添加按钮 -->
      <el-button icon="el-icon-notebook-2" circle @click="addBtn"></el-button>
      <!-- 查看个人信息 -->
      <el-button icon="el-icon-s-custom" circle @click="mineBtn"></el-button>
      <el-button
        icon="el-icon-switch-button"
        circle
        @click="logoutBtn"
        v-if="birthday_userid"
      ></el-button>
    </div>

    <!-- 弹出框 -->
    <div>
      <!-- 弹出框：查看表格 -->
      <el-dialog title="友人帐" v-model="dialogAddVisible" width="70%">
        <el-dialog
          width="30%"
          title="添加朋友"
          v-model="innerVisible"
          append-to-body
        >
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
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="innerVisible = false"
                >确 定</el-button
              >
            </span>
          </template>
        </el-dialog>
        <div>
          <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column prop="name" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="address" label="相识"></el-table-column>
            <el-table-column prop="name" label="生日" width="180">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template #default="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
                <el-button type="text" size="small">删除</el-button>
                <!-- <el-button type="text" size="small">主页显示</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="formButton">
            <el-button type="text" @click="innerVisible = true"
              >添加朋友</el-button
            >
            <el-pagination layout="prev, pager, next" :total="1000">
            </el-pagination>
          </div>
          <!-- <el-row class="row-bg" justify="space-between">
            <el-col :span='1'>
              <el-button type="text">添加朋友</el-button>
            </el-col>
            <el-col :span='8'>
              <el-pagination layout="prev, pager, next" :total="1000">
              </el-pagination>
            </el-col>
          </el-row> -->
        </div>

        <!-- <el-form ref="form" :model="form" label-width="90px">
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
        </template> -->
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
        <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogSettingVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogSettingVisible = false"
              >确 定</el-button
            >
          </span>
        </template> -->
      </el-dialog>

      <!-- 弹出框：我的 -->
      <el-dialog title="我的" v-model="dialogMineVisible" width="30%">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="姓名：">
            <el-input
              v-model="form.name"
              prefix-icon="el-icon-user"
              style="width: 100%"
              placeholder="君の名は？"
            ></el-input>
          </el-form-item>
          <el-form-item label="出壳日：">
            <el-date-picker
              type="date"
              placeholder="请选择自己的生日"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogMineVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogMineVisible = false">修改</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script >
import axios from 'axios';
import jsCookie from 'js-cookie';

export default {
  data() {
    return {
      name: '新垣结衣',
      form: {},

      dialogSettingVisible: false,
      dialogAddVisible: false,
      dialogMineVisible: false,

      selectedUser: '', // 主页选择了的用户，默认为第一个
      userList: [],

      selectedMeetingDate: '',
      shortcuts: [],
      second: '0',
      textStyle: '', // 文字样式

      disabledDate(time) {
        return time.getTime() > Date.now();
      },

      birthday_username: '',
      birthday_userid: '',

      tableData: [],

      innerVisible: false,
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
      // const birthday_userid = jsCookie.get('birthday_userid');
      // console.log('缓存中获取birthday_user:>>', birthday_userid);i
      if (this.birthday_userid) {
        this.dialogAddVisible = true;
      } else {
        this.$confirm('只有登录才能保存朋友哦~去登录吧?', '提示', {
          confirmButtonText: '好的~',
          cancelButtonText: '就不！',
          type: 'warning',
        })
          .then(() => {
            window.location.href = '/login';
          })
          .catch(() => {});
      }
    },

    mineBtn() {
      if (this.birthday_userid) {
        this.dialogMineVisible = true;
      } else {
        this.$message({
          type: 'success',
          message: '已退出登录',
        });
      }
    },

    logoutBtn() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          axios.get('/api/logout').then((response) => {
            if (response.data.error === false) {
              this.$message({
                type: 'success',
                message: '已退出登录',
              });
              this.getCookie();
            }
          });
        })
        .catch(() => {});
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
        this.tableData = [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
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

    getCookie() {
      this.birthday_userid = jsCookie.get('birthday_userid');
      this.birthday_username = jsCookie.get('birthday_username');
    },
  },
  async mounted() {
    this.getCookie();
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
.formButton {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
