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
                    <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                </el-input>
            </div>
            <!-- 表格 -->
            <div class="table-body">
                <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange" @sort-change="sort" :default-sort="{prop:'id'}">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID" width="50px" sortable='custom'></el-table-column>
                    <el-table-column prop="name" label="用户名"></el-table-column>
                    <el-table-column prop="nickname" label="昵称"></el-table-column>
                    <el-table-column prop="group" label="用户组"></el-table-column>
                    <el-table-column prop="logined" label="最后登录时间"></el-table-column>
                    <el-table-column prop="createtime" label="本次登录时间"></el-table-column>
                    <el-table-column prop="times" label="登录次数"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="control-btn">
                            <router-link :to="{path:'/pages/system_administrators/System_Administrators/xiugaiyonghu',query:{id:scope.row.id}}"><el-button size="mini">编辑</el-button></router-link>
                            <el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id,tableInfo)" size="mini" class="control-btn-del">删除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batch('delete')" :disabled="tableList.length==0">批量删除</el-button>
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
      tableList: [],
      //排序规则
      sortRule: ""
    };
  },
  components: {
    Crumb,

    Paging
  },
  mounted: function() {
    var that = this;

    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
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
  },
  methods: {
    //请求数据的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/user/index",
          data: {
            currentPage: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            keyword: that.searchValue,
            order: that.sortRule
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
          if (res.data.code == 6) {
            that.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                that.$router.go(-1);
              }
            });
          } else {
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
          }
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

    //删除用户/表格行
    deleteRow(index, id, rows) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          that
            .$http({
              method: "post",
              url: "/Admin/user/delete",
              data: {
                id: id
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
              if (res.data.code == 6) {
                that.$alert(res.data.error, "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    // that.$router.go(-1);
                  }
                });
              } else if (res.data.code == 1) {
                rows.splice(index, 1);
                that.$message({
                  type: "success",
                  message: "删除成功!"
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
      this.tableList = [];
      for (let i in val) {
        this.tableList.push(val[i].id);
      }
    },
    //全选
    selection(rows) {
      var that = this;

      if (that.tableInfo.length != that.tableList.length) {
        rows.forEach(row => {
          that.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        that.$refs.multipleTable.clearSelection();
      }
    },

    //批量操作
    batch(operation) {
      var title = "";
      switch (operation) {
        case "del":
          title = "是否批量删除选中项";
          break;
        case "restore":
          title = "是否批量还原选中项";
          break;
        case "delete":
          title = "是否永久删除选中项";
          break;
      }
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "post",
            url: "/Admin/user/batch",
            data: {
              operation: operation,
              id: this.tableList
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
          }).then(res => {
            if (res.data.code == 6) {
              this.$alert(res.data.error, "提示", {
                confirmButtonText: "确定",
                callback: () => {
                  // this.$router.go(-1);
                }
              });
            } else if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "批量操作成功!"
              });
              this.getData();
            } else {
              this.$message({
                type: "error",
                message: "批量操作失败!"
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    //表格排序
    sort(val) {
      if (val.column != null) {
        let type = "";
        if (val.order == "descending") {
          type = "desc";
        } else if (val.order == "ascending") {
          type = "asc";
        }
        this.sortRule = "a." + val.prop + " " + type;
      } else {
        this.sortRule = "";
      }
      this.getData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
