<template>
  <div id="kebiaoxiangqing">
          <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 提示 -->
       <div class="title">
        {{title}}
      </div>
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-select v-model="zhou" clearable placeholder="选择周次" size="mini" class="float-left column-selection" @change="search">
            <el-option v-for="item in 20" :key="item" :label="'第'+item+'周'" :value="item"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
      <div class="course-table">
        <div class="left float-left">
          <div class="item">时间</div>
          <div class="item" v-for="item in timeList" :key="item.time">{{item.time}}</div>
        </div>
        <div class="right float-left">
          <div class="col" v-for="item in tableInfo" :key="item.id">
            <div class="item">
              <p>{{item.week}}</p>
              <p>{{item.date}}</p>
            </div>
            <div class="item"><span v-show="item.first_course">{{item.first_course}}/{{item.first_teacher}}/{{item.first_classroom}}</span></div>
            <div class="item"><span v-show="item.second_course">{{item.second_course}}/{{item.second_teacher}}/{{item.second_classroom}}</span></div>
            <div class="item"><span v-show="item.thirdly_course">{{item.thirdly_course}}/{{item.thirdly_teacher}}/{{item.thirdly_classroom}}</span></div>
            <div class="item"><span v-show="item.fourthly_course">{{item.fourthly_course}}/{{item.fourthly_teacher}}/{{item.fourthly_classroom}}</span></div>
            <div class="item"><span v-show="item.fifth_course">{{item.fifth_course}}/{{item.fifth_teacher}}/{{item.fifth_classroom}}</span></div>
            <div class="item"><span v-show="item.sixth_course">{{item.sixth_course}}/{{item.sixth_teacher}}/{{item.sixth_classroom}}</span></div>
            <div class="item"><span v-show="item.seventh_course">{{item.seventh_course}}/{{item.seventh_teacher}}/{{item.seven_classroom}}</span></div>
            <div class="item"><span v-show="item.eighth_course">{{item.eighth_course}}/{{item.eighth_teacher}}/{{item.eighth_classroom}}</span></div>
            <div class="item"><span v-show="item.ninth_course">{{item.ninth_course}}/{{item.ninth_teacher}}/{{item.ninth_classroom}}</span></div>
            <div class="item"><span v-show="item.tenth_course">{{item.tenth_course}}/{{item.tenth_teacher}}/{{item.tenth_classroom}}</span></div>
          </div>
        </div>

      </div>

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
          name: "课表管理",
          url: ""
        },
        {
          name: "课表管理",
          url: "/pages/system_administrators/System_Administrators/kebiaoguanli"
        },
        {
          name: "课表查看",
          url: ""
        }
      ],
      //课表的标题
      title:
        this.$route.query.category +
        this.$route.query.squad +
        this.$route.query.school_year +
        "课表",
      //周次..默认显示第一周
      zhou: "",
      //课程节次时间列表
      timeList: [],
      //课程信息
      tableInfo: []
    };
  },
  mounted: function() {
    var that = this;
    //验证token是否登陆
    token().then(res => {
      if (res.verify == true) {
        this.search();
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
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  methods: {
    search() {
      this.$http({
        method: "post",
        url: "/Admin/Schedule/Schedule",
        data: {
          zhou: this.zhou || "1",
          coding: this.$route.query.coding
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
          that.$alert(res.data.error, "提示", {
            confirmButtonText: "确定",
            callback: () => {
              // that.$router.go(-1);
            }
          });
        } else {
          this.timeList = res.data.section;
          this.tableInfo = res.data.data;
        }
      });
    }
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
#kebiaoxiangqing {
  .title {
    text-align: center;
    margin: 20px;
    font-size: 20px;
    font-weight: 500;
  }
  .course-table {
    margin-top: 20px;
    color: #606266;
    &:after {
      display: block;
      content: " ";
      clear: both;
    }
    .left {
      width: 150px;
      .item {
        height: 60px;
        line-height: 60px;
        text-align: center;
        border: 1px solid #dcdfe6;
        margin-top: -1px;
        &:first-child {
          height: 60px;
        }
      }
    }
    .right {
      width: 800px;
      .col {
        float: left;
        .item {
          font-size: 13px;
          margin-top: -1px;
          margin-left: -1px;
          padding: 2px;
          text-align: center;
          height: 60px;
          border: 1px solid #dcdfe6;
          width: 114px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: wrap;
          &:first-child {
            height: 60px;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>

