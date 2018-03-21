<template>
  <div id="kongjiaoshichaxun">
          <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 提示 -->
       <div class="title">
        设计艺术学院18幢教学楼空教室查询
      </div>
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
         <el-select v-model="classValue" clearable placeholder="选择教室" size="large" class="float-left state-selection">
          <el-option v-for="(item,index) in classroomList"  :label="item" :value="item" :key="index"></el-option>
        </el-select>
        <el-date-picker
          v-model="datePicker"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!-- 表格 -->
       <div class="course-table">
        <div class="head">
            <div>时间</div>
            <div>{{classValue}}</div>
        </div>
        <div class="body">
          <div>
            <div class="col">08:30-09:15</div>
            <div class="col">09:15-10:00</div>
            <div class="col">10:45-11:30</div>
            <div class="col">11:30-12:15</div>
            <div class="col">13:10-13:55</div>
            <div class="col">13:55-14:40</div>
            <div class="col">14:40-15:25</div>
            <div class="col">15:25-16:15</div>
          </div>
          <div>
            <div class="col"  v-for="item in classroomState">{{item}}</div>
          </div>
        </div>        
      </div>
  </div>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
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
          name: "教师预约管理",
          url: ""
        },
        {
          name: "空教室查询",
          url: ""
        }
      ],
      datePicker: "",
      classValue: "",
      classroomList: [
        "a101",
        "a202",
        "a303",
        "a404",
        "a505",
        "a606",
        "a101",
        "a202",
        "a303",
        "a404",
        "a505",
        "a606",
        "a101",
        "a202",
        "a303",
        "a404",
        "a505",
        "a606",
        "a606",
        "a101",
        "a202",
        "a303",
        "a404",
        "a505",
        "a606"
      ],
      classroomState:['占用','占用','占用','占用','占用','占用','占用','占用',]
    };
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
@import "../../assets/css/less_config.less";
#kongjiaoshichaxun {
  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;
  }
  .table-container {
    .course-table {
      color:#888;
      .head {
        display: flex;
        margin-bottom: 20px;
        >div{
          flex:1;
        }
      }
      .body{
        display: flex;
        >div{
          flex:1;
          .col{
            height: 30px;
          }
        }
      }
    }
  }
}
</style>

