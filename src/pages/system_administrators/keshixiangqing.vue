/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="keshixiangqing">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <div class="head-wrapper clearfix">
        <el-button type="primary" class="float-right" size="mini">导入EXCEL</el-button>
        <el-button type="primary" class="float-right" style="margin-right:20px"  size="mini">导出EXCEL</el-button>
    </div>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格 -->
      <div class="table-body">
          <el-table :data="tableInfo" size="small" style="margin-bottom:30px">
           <el-table-column prop="name" label="老师姓名"></el-table-column>
          <el-table-column prop="department" label="所属院系"></el-table-column>
          <el-table-column prop="weekCount" label="本周课时"></el-table-column>
          <el-table-column prop="monthCount" label="本月课时"></el-table-column>          
          <el-table-column prop="termCount" label="本学期课时"></el-table-column>               
          </el-table>

        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="tableId" label="上课时间"></el-table-column>
          <el-table-column prop="department" label="课时"></el-table-column>
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
          name: "课表管理",
          url: ""
        },
        {
          name: "课时管理",
          url: ""
        },
        {
          name: "课时详情",
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
      //表格
      tableInfo: [
        {
          id: 1,
          tableId: "001",
          class: "14工业甲班",
          department: "工业设计系",
          date: "2017-2018第一学期",
          weekCount: "5",
          monthCount: "5",
          termCount: "5",
          name:"张三"
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
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  methods: {
    //课表查看
    kebiaochakan() {
      this.$router.push(
        "/pages/system_administrators/System_Administrators/kebiaochakan"
      );
    },
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
.head-wrapper {
  margin-bottom: 20px;
  &::after {
    content: " ";
    display: block;
    clear: both;
  }
}
</style>
