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
          <el-option v-for="item in classroomList"  :label="item" :value="item"></el-option>
        </el-select>
        <el-date-picker
          v-model="datePicker"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!-- 表格 -->
      <div class="course-table">
        <div class="all-classroom" v-show="listFlag">
          <div class="item" v-for="item in classroomList" @click="listFlag=false;currentItem=item">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="classroom-detail" v-show="!listFlag">
      <div class="title">{{currentItem}}
      <el-button type="primary" @click="listFlag=true" size="mini" class="float-right">返回</el-button>        
      </div>
      <table>
        <thead>
          <tr>
            <td>08:30-09:15</td>
            <td>09:15-10:00</td>
            <td>10:45-11:30</td>
            <td>11:30-12:15</td>
            <td>13:55-14:40</td>
            <td>14:40-15:25</td>
            <td>14:40-15:25</td>
            <td>15:25-16:15</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
export default {
  data() {
    return {
      listFlag:true,
      currentItem:'',
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
      tableInfo:{
        state
      }
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
    .course-table{
      .all-classroom{
        display: flex;
        flex-wrap: wrap;
        .title{
          font-size: 14px;
        }
        .item{
          width: 10%;
          text-align: center;
          border: 1px solid #ccc;
          margin-top: -1px;
          margin-left: -1px;
          cursor: pointer;
          padding: 5px 10px;
          color: #888;
        }
      }
    }
  }
}
</style>

