<template>
    <div id="baobiaoyulan">
    <Crumb :crumbs="crumbs"></Crumb>      
        <div class="table-body">
            <el-table ref="multipleTable" :data="tableInfo1" stripe size="small">
                <el-table-column prop="date" label="时间"></el-table-column>
                <el-table-column prop="shouldNum" label="应到人数"></el-table-column>
                <el-table-column prop="actualNum" label="实到人数"></el-table-column>
                <el-table-column prop="leaveNum" label="请假人数"></el-table-column>
                <el-table-column prop="missNum" label="旷课人数"></el-table-column>
                <el-table-column prop="rate" label="到课率"></el-table-column>
            </el-table>
        </div>
        <div id="echarts-container" style="width: 1000px;height:400px;"></div>
        <div class="table-filter">
            <el-date-picker
                  v-model="dateValue"
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  class="float-left">
            </el-date-picker>
            <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" class="float-left state-selection">
                <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="classValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
                <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="table-body">
            <el-table ref="multipleTable" :data="tableInfo2" stripe size="small">
                <el-table-column prop="date" label="时间"></el-table-column>
                <el-table-column prop="shouldNum" label="应到人数"></el-table-column>
                <el-table-column prop="actualNum" label="实到人数"></el-table-column>
                <el-table-column prop="leaveNum" label="请假人数"></el-table-column>
                <el-table-column prop="missNum" label="旷课人数"></el-table-column>
                <el-table-column prop="rate" label="到课率"></el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <paging></paging>
    </div>
</template>
<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");

import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
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
          name: "信息推送",
          url: ""
        },
        {
          name: "报表推送",
          url: ""
        },
        {
          name: "报表预览",
          url: ""
        }
      ],
      tableInfo1: [
        {
          date: "今日",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          rate: "96.96%"
        },
        {
          date: "昨日",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          rate: "96.96%"
        }
      ],
      tableInfo2: [
        {
          date: "7月1日",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          rate: "96.96%"
        },
        {
          date: "7月2日",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          rate: "96.96%"
        }
      ],
      echartsInfo: {
        title: {
          show: true,
          text: "到课率"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#00a0e9"
            }
          }
        },
        xAxis: {
          data: [
            "2016/1/11（周一）",
            "2016/1/12（周二）",
            "2016/1/13（周三）",
            "2016/1/14（周四）",
            "2016/1/15（周五）"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "到课率",
            type: "line",
            data: [0.9, 0.96, 0.99, 0.93, 0.98, 0.9],
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(84,195,241,1)"
              }
            }
          }
        ],
        toolbox: {
          //将图表保存为图片
          feature: {
            saveAsImage: {}
          }
        }
      },
      dateValue: "",
      departmentList: [
        {
          value: 0,
          label: "1系"
        },
        {
          value: 1,
          label: "2系"
        },
        {
          value: 2,
          label: "3系"
        },
        {
          value: 3,
          label: "4系"
        }
      ],
      departmentValue: "",
       classList: [
        {
          value: 0,
          label: "1班"
        },
        {
          value: 1,
          label: "2班"
        },
        {
          value: 2,
          label: "3班"
        },
        {
          value: 3,
          label: "4班"
        }
      ],
      classValue: "",
    };
  },
  mounted() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
    //echarts
    var that = this;
    var myChart = echarts.init(document.getElementById("echarts-container"));
    myChart.setOption(that.echartsInfo);
  },
  components: {
    Crumb,
    Paging
  }
};
</script>
<style lang="less">
#baobiaoyulan {
  .table-filter {
    margin-bottom: 20px;
    &::after {
      content: " ";
      display: block;
      clear: both;
    }
  }
}
</style>

