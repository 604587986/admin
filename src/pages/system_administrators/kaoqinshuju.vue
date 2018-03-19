/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="kaoqinshuju">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="depatmentValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="classValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
          <el-table-column prop="id" label="ID" width="50px"></el-table-column>
          <el-table-column prop="date" label="时间" width="150px"></el-table-column>
          <el-table-column prop="course" label="课程" width="100px"></el-table-column>
          <el-table-column prop="department" label="所属系" width="100px"></el-table-column>
          <el-table-column prop="class" label="所属班级" width="100px"></el-table-column>
          <el-table-column prop="teacher" label="老师" width="80px"></el-table-column>
          <el-table-column prop="shouldNum" label="应到人数"></el-table-column>          
          <el-table-column prop="actualNum" label="实到人数"></el-table-column>  
          <el-table-column prop="leaveNum" label="请假人数"></el-table-column>                  
          <el-table-column prop="missNum" label="旷课人数"></el-table-column>   
          <el-table-column prop="efficiency" label="旷课率"></el-table-column>   
          <el-table-column label="操作" width="250px">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">数据确认</el-button>
              <el-button size="small" @click="shujuxiugai()">数据修改</el-button>
              <el-button size="small" @click="dakashuju()">打卡数据</el-button>
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
      depatmentValue: "",
      classList:[
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
      classValue:"",
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
          efficiency: "80%"
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
          efficiency: "80%"
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
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //跳转到打卡数据
    dakashuju() {
      this.$router.push(
        "/pages/system_administrators/System_Administrators/dakashuju"
      );
    },
    //跳转到数据修改
    shujuxiugai() {
      this.$router.push(
        "/pages/system_administrators/System_Administrators/shujuxiugai"
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

</style>
