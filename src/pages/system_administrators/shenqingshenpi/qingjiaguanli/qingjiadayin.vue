<template>
  <div id="qingjiadayin">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <div id="needprint">
    <div class="print-wrapper">
        <div class="title">中国美术学院学生请假单</div>
        <div class="student-info">
            <div class="item">所在教学单位</div>
            <div class="item">设计艺术学院</div>
            <div class="item">请假人姓名</div>
            <div class="item">{{dataList.name}}</div>
            <div class="item">所在系</div>
            <div class="item"></div>
            <div class="item">请假人学号</div>
            <div class="item">{{dataList.student_num}}</div>
            <div class="item">专业班级</div>
            <div class="item">{{dataList.squad}}</div>
            <div class="item">本人联系电话</div>
            <div class="item"></div>
            <div class="item">文化班级</div>
            <div class="item"></div>
            <div class="item">家庭联系电话</div>
            <div class="item"></div>
        </div>
        <div class="request-info">
            <div class="item">学生申请时间</div>
            <div class="item">{{dataList.time}}</div>
            <div class="item">请假时间</div>
            <div class="item">{{dataList.start_time}}&nbsp;至&nbsp;{{dataList.end_time}}</div>
            <div class="item">天数</div>
            <div class="item">{{dataList.year}}</div>
            <div v-for="(i,index) in courses" :key="index" class="row">
                <div class="item">课程/教师</div>
                <div class="item">{{i}}</div>
            </div>
        </div>
        <div class="reason">
            <p class="placeholder">请假事由（如病假需附指定医院诊断证明）:</p>
            <p class="content">{{dataList.reason}}</p>
        </div>
        <div class="prove">
            <div class="item">学院医务室审核意见</div>
            <div class="item"></div>
            <div class="item">所在系秘书审批</div>
            <div class="item"></div>
            <div class="item">所在学院审批（盖章）</div>
            <div class="item"></div>
            <div class="item">销假时间</div>
            <div class="item"></div>
        </div>
    </div>
    </div>
    <div style="text-align:center;margin-top:20px">
        <el-button type="primary" @click="print">打印</el-button>
    </div>
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
          name: "请假管理",
          url:
            "/pages/system_administrators/System_Administrators/qingjiaguanli"
        },
        {
          name: "打印",
          url: ""
        }
      ],
      dataList: [],
      courses: []
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
    //ajax
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Request/particular",
          params: {
            id: that.$route.query.id
          }
        })
        .then(function(res) {
          if (res.data.code == 6) {
            this.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // this.$router.go(-1);
              }
            });
          } else {
            that.dataList = res.data.data;
            that.courses = res.data.data.curriculum.split(",");
          }
        });
    },
    print() {
      var printhtml = document.getElementById("needprint").innerHTML;
      document.getElementById("app").innerHTML = printhtml;
      window.print();
      window.location.reload();
    }
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
@media screen {
  .print-wrapper {
    margin: 0 auto;
    width: 600px;
    text-align: center;
    color: #606266;
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
    .student-info {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      .item {
        border: 1px solid #909399;
        width: 25%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-top: -1px;
        &:nth-child(2n + 1) {
          border-right: 0;
        }
        &:nth-child(4n + 2) {
          border-right: 0;
        }
      }
    }
    .request-info {
      display: flex;
      flex-wrap: wrap;
      .item {
        border: 1px solid #909399;
        width: 50%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-top: -1px;
        &:nth-child(2n + 1) {
          border-right: 0;
        }
      }
      .row {
        display: flex;
        width: 100%;
        .item {
          border: 1px solid #909399;
          width: 50%;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          margin-top: -1px;
          &:nth-child(2n + 1) {
            border-right: 0;
          }
        }
      }
    }
    .reason {
      border: 1px solid #909399;
      margin-top: -1px;
      padding: 10px;
      min-height: 150px;
      text-align: left;
      .placeholder {
        font-size: 14px;
        color: dimgray;
      }
      .content {
        margin-top: 6px;
        word-break: break-all;
        text-indent: 2em;
      }
    }
    .prove {
      display: flex;
      flex-wrap: wrap;
      .item {
        border: 1px solid #909399;
        width: 50%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-top: -1px;
        &:nth-child(2n + 1) {
          border-right: 0;
        }
      }
    }
  }
}
@media print {
  #app {
    padding: 0;
    margin: 0;
    position: relative;
  }
  .print-wrapper {
    position: absolute;
    right: 50%;
    top: 40px;
    margin-right: -340px;
    width: 800px;
    text-align: center;
    color: #606266;
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }
    .student-info {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      .item {
        border: 1px solid #909399;
        width: 25%;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        margin-top: -1px;
        &:nth-child(2n + 1) {
          border-right: 0;
        }
        &:nth-child(4n + 2) {
          border-right: 0;
        }
      }
    }
    .request-info {
      display: flex;
      flex-wrap: wrap;
      .item {
        border: 1px solid #909399;
        width: 50%;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        margin-top: -1px;
        &:nth-child(2n + 1) {
          border-right: 0;
        }
      }
      .row {
        display: flex;
        width: 100%;
        .item {
          border: 1px solid #909399;
          width: 50%;
          height: 60px;
          line-height: 60px;
          font-size: 18px;
          margin-top: -1px;
          &:nth-child(2n + 1) {
            border-right: 0;
          }
        }
      }
    }
    .reason {
      border: 1px solid #909399;
      margin-top: -1px;
      padding: 20px;
      min-height: 300px;
      text-align: left;
      .placeholder {
        font-size: 18px;
        color: dimgray;
      }
      .content {
        margin-top: 12px;
        word-break: break-all;
        text-indent: 2em;
      }
    }
    .prove {
      display: flex;
      flex-wrap: wrap;
      .item {
        border: 1px solid #909399;
        width: 50%;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        margin-top: -1px;
        &:nth-child(2n + 1) {
          border-right: 0;
        }
      }
    }
  }
}
</style>
