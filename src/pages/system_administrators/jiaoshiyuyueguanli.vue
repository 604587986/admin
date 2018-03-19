/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="jiaoshiyuyueguanli">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="stateValue" clearable placeholder="选择状态" size="mini" class="float-left state-selection">
          <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
          <router-link to="/pages/system_administrators/System_Administrators/kongjiaoshichaxun">
          <el-button type="primary" size="mini" style="margin: 0 20px">
           查询空教室
          </el-button>           
           </router-link>
        <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select title-search float-left" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
        <el-button type="primary"  style="margin: 0 20px" size="mini" class="float-right">导出EXCEL</el-button>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
          <el-table-column prop="uid" label="申请编号"></el-table-column>
          <el-table-column prop="applyDate" label="申请时间"></el-table-column>
          <el-table-column prop="people" label="申请人"></el-table-column>
          <el-table-column prop="applyCount" label="申请次数"></el-table-column>
          <el-table-column prop="classroom" label="申请教室"></el-table-column>          
          <el-table-column prop="date" label="使用时间"></el-table-column>          
          <el-table-column prop="state" label="状态">
            <div slot-scope="scope">
              <el-tag close-transition :class="scope.row.stateClass" size="mini">{{scope.row.state}}</el-tag>
            </div>
          </el-table-column>
          <el-table-column prop="approve" label="审批人"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small" @click="jiaoshiyuyuexiangqing">查看</el-button>
              <el-button size="small">审核</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="small" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batchDeleting()">批量删除</el-button>
        <el-button type="primary" size="mini">批量审核</el-button>
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
          name: "申请审批",
          url: ""
        },
        {
          name: "教室预约管理",
          url: ""
        }
      ],
      stateList: [
        {
          value: 0,
          label: "已审核"
        },
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 2,
          label: "已撤销"
        }
      ],
      stateValue: "",
      //栏目检索
      searchValue: "",
      //表格
      tableInfo: [
        {
          uid: 20160926002,
          applyDate: "2017-02-20 08:32",
          people: "张三",
          applyCount: "5",
          course: "工业设计导论",
          mergeClass: "14工业甲班，14工业乙班",
          classroom: "A301",
          theTeacher: "李四",
          date: "第八周 周五1，2节",
          class: "14工业甲班",
          state: "已审批",
          approve: "王五 2016-06-29 |08:33",
          remark: ""
        },
        {
          uid: 20160926002,
          applyDate: "2017-02-20 08:32",
          people: "张三",
          applyCount: "5",
          mergeClass: "14工业甲班，14工业乙班",
          classroom: "A301",
          course: "社会实践1",
          date: "第八周 周五1，2节",
          class: "14工业甲班",
          state: "已审批",
          approve: "王五 2016-06-29 |08:33",
          remark: ""
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
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  methods: {
    //跳转到教室预约详情
    jiaoshiyuyuexiangqing() {
      this.$router.push(
        "/pages/system_administrators/System_Administrators/jiaoshiyuyuexiangqing"
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
