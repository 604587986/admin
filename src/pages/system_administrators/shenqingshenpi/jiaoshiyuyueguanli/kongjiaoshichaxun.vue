<template>
  <div id="kongjiaoshichaxun">
    <Crumb :crumbs="crumbs"></Crumb>
    <div class="title">提示：可查询选择日期七天内的预约情况</div>
      <el-date-picker
        v-model="dateValue"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        :picker-options="pickerOption"
        >
    </el-date-picker>
    <el-select v-model="classroomValue" placeholder="请选择教室">
      <el-option
        v-for="item in classroomList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" size="medium" @click="query">查询</el-button>
<transition name="el-zoom-in-center">
    <div class="table-wrapper" v-show="showTable">
      <div class="col col-0">
        <div class="item"></div>
        <div class="item" v-for="item in timeList">
          <span>{{item.time}}</span>
        </div>
      </div>
      <div class="col col-1">
        <div class="item">{{dataList[0]}}</div>
        <div class="item" ref="11"></div>
        <div class="item" ref="12"></div>
        <div class="item" ref="13"></div>
        <div class="item" ref="14"></div>
        <div class="item" ref="15"></div>
        <div class="item" ref="16"></div>
        <div class="item" ref="17"></div>
        <div class="item" ref="18"></div>
      </div>
      <div class="col col-2">
        <div class="item">{{dataList[1]}}</div>
        <div class="item" ref="21"></div>
        <div class="item" ref="22"></div>
        <div class="item" ref="23"></div>
        <div class="item" ref="24"></div>
        <div class="item" ref="25"></div>
        <div class="item" ref="26"></div>
        <div class="item" ref="27"></div>
        <div class="item" ref="28"></div>
      </div>
      <div class="col col-3">
        <div class="item">{{dataList[2]}}</div>
        <div class="item" ref="31"></div>
        <div class="item" ref="32"></div>
        <div class="item" ref="33"></div>
        <div class="item" ref="34"></div>
        <div class="item" ref="35"></div>
        <div class="item" ref="36"></div>
        <div class="item" ref="37"></div>
        <div class="item" ref="38"></div>
      </div>
      <div class="col col-4">
        <div class="item">{{dataList[3]}}</div>        
        <div class="item" ref="41"></div>
        <div class="item" ref="42"></div>
        <div class="item" ref="43"></div>
        <div class="item" ref="44"></div>
        <div class="item" ref="45"></div>
        <div class="item" ref="46"></div>
        <div class="item" ref="47"></div>
        <div class="item" ref="48"></div>
      </div>
      <div class="col col-5">
        <div class="item">{{dataList[4]}}</div>
        <div class="item" ref="51"></div>
        <div class="item" ref="52"></div>
        <div class="item" ref="53"></div>
        <div class="item" ref="54"></div>
        <div class="item" ref="55"></div>
        <div class="item" ref="56"></div>
        <div class="item" ref="57"></div>
        <div class="item" ref="58"></div>
      </div>
      <div class="col col-6">
        <div class="item">{{dataList[5]}}</div>
        <div class="item" ref="61"></div>
        <div class="item" ref="62"></div>
        <div class="item" ref="63"></div>
        <div class="item" ref="64"></div>
        <div class="item" ref="65"></div>
        <div class="item" ref="66"></div>
        <div class="item" ref="67"></div>
        <div class="item" ref="68"></div>
      </div>
      <div class="col col-7">
        <div class="item">{{dataList[6]}}</div>
        <div class="item" ref="71"></div>
        <div class="item" ref="72"></div>
        <div class="item" ref="73"></div>
        <div class="item" ref="74"></div>
        <div class="item" ref="75"></div>
        <div class="item" ref="76"></div>
        <div class="item" ref="77"></div>
        <div class="item" ref="78"></div>
      </div>
    </div>
</transition>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token";

export default {
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "申请审批",
          url: ""
        },
        {
          name: "教室预约管理",
          url:
            "/pages/system_administrators/System_Administrators/jiaoshiyuyueguanli"
        },
        {
          name: "空教室查询",
          url: ""
        }
      ],
      //日期选择器设置
      pickerOption: {
        disabledDate: function(now) {
          let b = new Date().getTime() - 86400000;
          return now < new Date(b);
        }
      },
      showTable: false,
      dateValue: "",
      classroomList: [],
      classroomValue: "",
      dataList: [],
      timeList: []
    };
  },
  mounted: function() {
    var that = this;
    //验证token是否登陆
    token().then(res => {
      if (res.verify == true) {
        that.getData();
      } else if (res.verify == false) {
        that.$alert("请先登录", "用户尚未登录", {
          confirmButtonText: "确定",
          callback: function() {
            that.$router.push(
              "/pages/system_administrators/System_Administrators/login"
            );
          }
        });
      }
    });
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  methods: {
    getData() {
      this.$http({
        method: "get",
        url: "/Admin/Classroomsubscribe/classroom_select"
      }).then(res => {
        if (res.data.code == 6) {
          this.$alert(res.data.error, "提示", {
            confirmButtonText: "确定",
            callback: () => {
              // this.$router.go(-1);
            }
          });
        } else {
          //教室列表
          this.classroomList = res.data.classroom;
          //节次列表
          for (let j = 0; j < 8; j++) {
            this.timeList.push(res.data.section[j]);
          }
        }
      });
    },
    query() {
      if (this.dateValue == "" || this.dateValue == null) {
        this.$notify({
          title: "提醒",
          message: "请选择日期",
          type: "warning"
        });
      } else if (this.classroomValue == "") {
        this.$notify({
          title: "提醒",
          message: "请选择教室",
          type: "warning"
        });
      } else {
        this.$http({
          method: "post",
          url: "/Admin/Classroomsubscribe/classroom_select",
          data: {
            date: this.dateValue,
            classroom: this.classroomValue
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          //格式化
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ]
        }).then(res => {
          if (res.data.code == 6) {
            this.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // this.$router.go(-1);
              }
            });
          } else {
            this.showTable = true;

            this.dataList = res.data.date; //日期列表

            for (var x = 11; x <= 78; x++) {
              if (this.$refs[x] != undefined) {
                this.$refs[x].innerHTML = "可预约";
                // this.$refs[x].style.background = "#67C23A";
                this.$refs[x].style.color = "#67C23A";
              }
            }

            for (let i in res.data.submit) {
              let s = res.data.submit[i].start;
              let e = res.data.submit[i].end;
              for (var j = s; j <= e; j++) {
                if (this.$refs[j] != undefined) {
                  this.$refs[j].innerHTML = "已占用";
                  // this.$refs[j].style.background = "#409EFF";
                  this.$refs[j].style.color = "#000";
                }
              }
            }
          }
        });
      }
    }
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
#kongjiaoshichaxun {
  min-height: 645px;
  .title {
    margin: 20px 0;
    color: #909399;
    font-size: 14px;
  }
  .table-wrapper {
    margin-top: 50px;
    display: flex;
    .col {
      width: 12.5%;
      .item {
        text-align: center;
        height: 50px;
        line-height: 50px;
        border: 1px solid #dcdfe6;
        margin-top: -1px;
        margin-left: -1px;
      }
    }
  }
}
</style>
