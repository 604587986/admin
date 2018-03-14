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
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="columnListValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="date" label="时间" width="150"></el-table-column>
          <el-table-column prop="course" label="课程" width="100"></el-table-column>
          <el-table-column prop="department" label="所属系" width="150"></el-table-column>
          <el-table-column prop="class" label="所属班级" width="150"></el-table-column>
          <el-table-column prop="teacher" label="老师" width="95"></el-table-column>
          <el-table-column prop="shouldNum" label="应到人数" width="100"></el-table-column>          
          <el-table-column prop="actualNum" label="实到人数" width="100"></el-table-column>  
          <el-table-column prop="leaveNum" label="请假人数" width="100"></el-table-column>                  
          <el-table-column prop="missNum" label="旷课人数" width="80"></el-table-column>   
          <el-table-column prop="efficiency" label="旷课率" width="80"></el-table-column>   
          <el-table-column label="操作" width="150">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">数据确认</el-button>
              <el-button size="small">数据修改</el-button>
              <el-button size="small">打卡数据</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
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
          name: "考勤管理",
          url: ""
        },
        {
          name: "考勤数据",
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
          date: "2017-02-20 08:32",
          people: "张三",
          course: "工业设计导论",
          department: "工业设计系",
          class: "14工业甲班",
          teacher: "周波",
          shouldNum: "50",
          actualNum: "44",
          leaveNum: "5",
          missNum: "1",
          efficiency:"80%"
        },
        {
          id: 1,
          date: "2017-02-20 08:32",
          people: "张三",
          course: "工业设计导论",
          department: "工业设计系",
          class: "14工业甲班",
          teacher: "周波",
          shouldNum: "50",
          actualNum: "44",
          leaveNum: "5",
          missNum: "1",
          efficiency:"80%"
        },
        
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
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
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
