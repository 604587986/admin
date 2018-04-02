/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="xibanshuju">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" class="float-left state-selection">
          <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <el-input placeholder="请输入班级关键字" v-model="searchValue" class="input-with-select title-search float-left" size="mini">
        </el-input>
          <el-button type="primary" @click="articleSearch()" size="mini" style="margin-left:20px">搜索</el-button>     
          <router-link to="/pages/system_administrators/System_Administrators/banjihuishouzhan"><el-button type="primary" size="mini" style="float:right;">回收站</el-button>  </router-link>      
          <router-link to="/pages/system_administrators/System_Administrators/tianjiabanji"><el-button type="primary" size="mini" style="float:right;margin-right:10px">添加班级</el-button></router-link>   
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <!-- <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column> -->
          <el-table-column prop="id" label="ID" width="60"></el-table-column>
          <el-table-column prop="name" label="班级名称"></el-table-column>          
          <el-table-column prop="faculty_id" label="系名称"></el-table-column>
          <el-table-column prop="director" label="系主任"></el-table-column>                    
          <el-table-column prop="secretary" label="系秘书"></el-table-column>                       
          <el-table-column label="操作">
            <div slot-scope="scope"  class="control-btn">
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/bianjibanji',query:{id:scope.row.id}}"><el-button  size="mini">编辑</el-button></router-link>
              <el-button size="mini" @click="deleteRow(scope.$index, scope.row.id,tableInfo)">删除</el-button>
            </div>
          </el-table-column>               
        </el-table>
      </div>
      <!-- 分页 -->
        <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import { token } from "@/publicjs/token";

/* 内容管理 */
export default {
  name: "ContentManagement",
  data() {
    return {
      //分页数据
      currentPaging: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        totals: null
      },
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "基础数据",
          url: ""
        },
        {
          name: "系班数据",
          url: ""
        }
      ],
      //select内容

      departmentList: [],
      departmentValue: "",
      searchValue: "",
      //表格
      tableInfo: []
    };
  },
  components: {
    Crumb,

    Paging
  },
  mounted: function() {
    var that = this;
    //验证token是否登陆
    token().then(res => {
      if (res.verify == true) {
        that.getData();
      } else if (res.verify == false) {
        that.$alert("请先登录", "用户尚未登录", {
          confirmButtonText: "确定",
          callback: function() {
            that.$router.push(
              "/pages/system_administrators/System_Administrators/login"
            );
          }
        });
      }
    });

    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 8);
    this.$store.commit("update_system_menu_idx", 8);
  },
  methods: {
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/squad/index",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            name: that.searchValue,
            faculty_id: that.departmentValue
          }
        })
        .then(function(res) {
          that.tableInfo = res.data.squad;
          that.currentPaging.totals = Number(res.data.count);
          that.departmentList = res.data.category;
        });
    },
    //处理sizeChange
    handleSizeChange(val) {
      this.currentPaging.pageSize = val;
      this.currentPaging.currentPage = 1;
      this.getData();
    },
    //处理currentChange
    handleCurrentChange(val) {
      this.currentPaging.currentPage = val;
      this.getData();
    },
    //检索
    articleSearch() {
      this.getData();
    },
    //删除
    deleteRow(index, id, rows) {
      this.$confirm("此操作将删除该行数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          that
            .$http({
              method: "get",
              url: "/Admin/squad/del",
              params: {
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "删除成功!",
                  duration: 500,
                  onClose() {
                    that.getData();
                  }
                });
              } else {
                that.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
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
