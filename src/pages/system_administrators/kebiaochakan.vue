<template>
  <div id="kebiaochakan">
          <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 提示 -->
       <div class="title">
        设计艺术学院视觉传达设计系 2017-2018学年第一学期本科专业教学进程表
      </div>
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="columnListValue" clearable placeholder="选择课程" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
          <el-select v-model="columnListValue" clearable placeholder="选择月份" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
          <el-select v-model="columnListValue" clearable placeholder="选择周次" size="mini" class="float-left column-selection">
            <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
        <div>
            <table class="my-table" cellspacing="0">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>周一<p>9.18</p></th>
                        <th>周二<p>9.18</p></th>
                        <th>周三<p>9.18</p></th>
                        <th>周四<p>9.18</p></th>
                        <th>周五<p>9.18</p></th>
                        <th>周六<p>9.18</p></th>
                        <th>周日<p>9.18</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>08:30-09:15</td>
                    </tr>
                    <tr>
                        <td>09:15-10:00</td>
                    </tr>
                    <tr>
                        <td>10:45-11:30</td>
                    </tr>
                    <tr>
                        <td>11:30-12:15</td>
                    </tr>
                    <tr>
                        <td>13:10-13:55</td>
                    </tr>
                    <tr>
                        <td>13:55-14:40</td>
                    </tr>
                    <tr>
                        <td>14:40-15:25</td>
                    </tr>
                    <tr>
                        <td>15:25-16:15</td>
                    </tr>
                </tbody>
            </table>
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
          name: "课表管理",
          url: ""
        },
        {
          name: "课表管理",
          url: ""
        },
        {
          name: "课表查看",
          url: ""
        }
      ],
      columnListValue: [],
      columnList: []
    };
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
@import "../../assets/css/less_config.less";
#kebiaochakan {
  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;
  }
  .table-container {
    .my-table {
      width: 100%;
      td {
        text-align: center;
        width: 12.5%;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>

