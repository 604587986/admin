/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="keshiguanli">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <div class="head-wrapper clearfix">
        <el-button type="primary" class="float-right" size="mini">导入EXCEL</el-button>
        <el-button type="primary" class="float-right" style="margin-right:20px"  size="mini">导出EXCEL</el-button>
    </div>

    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="teacherValue" clearable placeholder="选择老师" size="mini" class="float-left column-selection">
          <el-option v-for="item in teacherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="tableId" label="老师姓名"></el-table-column>
          <el-table-column prop="department" label="所属院系"></el-table-column>
          <el-table-column prop="weekCount" label="本周课时"></el-table-column>
          <el-table-column prop="monthCount" label="本月课时"></el-table-column>
          <el-table-column prop="termCount" label="本学期课时"></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small" type="primary" @click="keshixiangqing()">查看</el-button>
            </div>
          </el-table-column>
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
        }
      ],
      //select数据
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
      teacherList:[
         {
          value: 0,
          label: "张三"
        },
        {
          value: 1,
          label: "李四"
        },
        {
          value: 2,
          label: "王五"
        },
        {
          value: 3,
          label: "赵六"
        }
      ],
      teacherValue:"",
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
          termCount: "5"
        },
        {
          id: 1,
          tableId: "001",
          class: "14工业甲班",
          department: "工业设计系",
          date: "2017-2018第一学期",
          weekCount: "5",
          monthCount: "5",
          termCount: "5"
        }
      ],
      tableList: []
    };
  },
  components: {
    Crumb,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  methods: {
    //查看课时详情
    keshixiangqing(){
        this.$router.push('/pages/system_administrators/System_Administrators/keshixiangqing')
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
