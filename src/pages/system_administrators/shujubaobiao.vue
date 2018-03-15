/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="ContentManagement">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
     <div class="table-container" style="margin-bottom:30px">
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="firstTableInfo" stripe size="small">
          <el-table-column prop="date" label="时间" ></el-table-column>
          <el-table-column prop="shouldNum" label="应到人数"></el-table-column>
          <el-table-column prop="actualNum" label="实到人数"></el-table-column>
          <el-table-column prop="leaveNum" label="请假人数"></el-table-column>
          <el-table-column prop="missNum" label="旷课人数" ></el-table-column>
          <el-table-column prop="efficiency" label="到课率" ></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="siteListValue" clearable placeholder="按日期查看" size="mini" class="float-left state-selection">
          <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" round style="float:right" size="mini">导出EXCEL</el-button>
        <el-button type="primary" round style="float:right" size="mini">打印报表</el-button>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="secondTableInfo" stripe size="small">
          <el-table-column prop="date" label="时间" ></el-table-column>
          <el-table-column prop="shouldNum" label="应到人数"></el-table-column>
          <el-table-column prop="actualNum" label="实到人数"></el-table-column>
          <el-table-column prop="leaveNum" label="请假人数"></el-table-column>
          <el-table-column prop="missNum" label="旷课人数" ></el-table-column>
          <el-table-column prop="efficiency" label="到课率" ></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <Paging></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Instructions from "@/components/Instructions";
/* 内容管理 */
export default {
  name: "ContentManagement",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "数据报表",
          url: ""
        },
        {
          name: "数据报表",
          url: ""
        }
      ],
      //使用说明
      instructionsInfo: [
        {
          title: "标题1",
          content: "添加站点使用说明"
        },
        {
          title: "标题2",
          content: "添加站点使用说明"
        }
      ],
      //选择站点
      siteList: [
        {
          value: 0,
          label: "9401中国美术学院"
        }
      ],
      siteListValue: "",
      //选择栏目
      columnList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      columnListValue: "",
      //选择发布状态
      stateList: [
        {
          value: 0,
          label: "已发"
        },
        {
          value: 1,
          label: "待审"
        },
        {
          value: 2,
          label: "草稿"
        }
      ],
      stateValue: "",
      //栏目检索
      titleSearchValue: "",
      //表格1
      firstTableInfo: [
        {
          date: "今日",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          efficiency: "90%"
        },
        {
          date: "昨日",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          efficiency: "90%"
        }
      ],
      //表格2
      secondTableInfo: [
        {
          date: "7月1号",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          efficiency: "90%"
        },
        {
          date: "7月2号",
          shouldNum: "856",
          actualNum: "800",
          leaveNum: "30",
          missNum: "26",
          efficiency: "90%"
        }
      ],
      tableList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //检索
    articleSearch() {},
    //删除表格行
    deleteRow(index, rows) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = val;
      //console.log(val[0].uid)
      //this.tableInfo.splice(val.uid, 1)
      //console.log(this.tableList)
    },
    //全选
    selection(rows) {
      var that = this;
      if (this.tableInfo.length !== this.tableList.length) {
        rows.forEach(row => {
          that.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        that.$refs.multipleTable.clearSelection();
      }
    },
    //批量删除
    batchDeleting() {
      for (var i = 0; i < this.tableList.length; i++) {
        //console.log(this.tableList[i].uid)
      }
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
