/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:28:14
 */


<template>
    <div id="yonghuguanli">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>

        <!-- Table -->
        <div class="table-container">
            <!-- 表格筛选 -->
            <div class="table-filter">
                <router-link to="/pages/system_administrators/System_Administrators/tianjiayonghu" class="float-left filter-link">
                    <el-button size="mini" type="primary">添加用户</el-button>
                </router-link>
                <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select title-search float-right" size="mini">
                    <el-button slot="append" icon="el-icon-search" @click.enter="search"></el-button>
                </el-input>
            </div>
            <!-- 表格 -->
            <div class="table-body">
                <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
                    <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
                    <el-table-column prop="id" label="ID" width="50px"></el-table-column>
                    <el-table-column prop="name" label="用户名"></el-table-column>
                    <el-table-column prop="nickname" label="昵称"></el-table-column>
                    <el-table-column prop="group" label="用户组"></el-table-column>
                    <el-table-column prop="logined" label="最后登录时间"></el-table-column>
                    <el-table-column prop="createtime" label="本次登录时间"></el-table-column>
                    <el-table-column prop="times" label="登录次数"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="control-btn">
                            <el-button size="mini" @click="xiugaiyonghu">编辑</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="mini" class="control-btn-del">删除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 表格控制 -->
            <div class="table-filter">
                <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
                <el-button type="primary" size="mini" @click="batchDeleting()">批量删除</el-button>
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

/* 用户列表 */
export default {
  name: "UserList",
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
          name: "系统设置",
          url: ""
        },
        {
          name: "用户管理",
          url: ""
        }
      ],
      //栏目检索
      searchValue: "",
      //表格
      tableInfo: [],
      tableList: []
    };
  },
  components: {
    Crumb,

    Paging
  },
  mounted: function() {
    var that = this;
    that.getData();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  methods: {
    //跳转到修改用户
    xiugaiyonghu() {
      this.$router.push(
        "/pages/system_administrators/System_Administrators/xiugaiyonghu"
      );
    },
    //请求数据的ajax封装
    getData() {
      var that = this;
      that //默认发送的ajax请求
        .$http({
          method: "post",
          url: "/Admin/user/index",
          data: {
            currentPage: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            keyword: that.searchValue,
            token: window.localStorage.getItem("token")
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          //格式化
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ]
        })
        .then(function(res) {
          for (let item in res.data.auth_group) {
            //从用户组循环遍历，将用户组title赋值给tableInfo的group
            for (let index in res.data.data) {
              if (
                res.data.data[index].AuthGroupAccess.group_id ==
                res.data.auth_group[item].id
              ) {
                res.data.data[index].group = res.data.auth_group[item].title;
              }
            }
          }

          that.tableInfo = res.data.data;
          that.currentPaging.totals = Number(res.data.count);
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
    search() {
      this.getData();
    },
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
    //表格排序
    sortBlur(a, b) {
      console.log(b[a].uid);
    },
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = val;
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
