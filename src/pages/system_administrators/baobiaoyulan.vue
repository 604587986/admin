<template>
    <div id="baobiaoyulan">
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
            <el-select v-model="siteListValue" clearable placeholder="选择日期" size="mini" class="float-left state-selection">
                <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="stateValue" clearable placeholder="选择系" size="mini" class="float-left state-selection">
                <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
                <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
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
    </div>
</template>
<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
export default {
  data() {
    return {
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
            data: [0.05, 0.2, 0.36, 0.1, 0.1, 0.2],
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
      }
    };
  },
  mounted() {
    var that = this;
    var myChart = echarts.init(document.getElementById("echarts-container"));
    myChart.setOption(that.echartsInfo);
  }
};
</script>
<style lang="less">

</style>

