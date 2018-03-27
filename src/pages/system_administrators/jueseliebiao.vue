/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:28:14
 */


<template>
    <div id="jueseliebiao">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>

        <!-- Table -->
        <div class="table-container">
            <!-- 表格筛选 -->
            <div class="table-filter">
                <router-link to="/pages/system_administrators/System_Administrators/tianjiajuesezu" class="float-left filter-link">
                    <el-button size="mini" type="primary">添加角色组</el-button>
                </router-link>
            </div>
            <!-- 表格 -->
            <div class="table-body">
                <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
                    <el-table-column prop="id" label="ID" width="80px"></el-table-column>
                    <el-table-column prop="title" label="标题" width="150px">

                    </el-table-column>
                    <el-table-column label="相应权限">
                        <div slot-scope="scope">
                            <el-checkbox v-for="item in scope.row.ruleList" :key="item.id" :label="item.title" :checked="isChecked(scope.row.rules,item.id)"  @change="afun(scope.row.id,item.id)" size="mini" style="width:160px"></el-checkbox>
                        </div>
                    </el-table-column>
                    <el-table-column label="操作" width="150px">
                        <div slot-scope="scope" class="control-btn">
                            <el-button @click="open(scope.row.id,scope.row.title)" size="mini">编辑</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id,tableInfo)" size="mini" class="control-btn-del">删除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 分页 -->
            <!-- <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging> -->
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
      // currentPaging: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   pageSizes: [10, 20, 30, 40],
      //   totals: null
      // },
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
          name: "角色列表",
          url: ""
        }
      ],
      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [],

      status: null
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
    //默认请求数据加验证token是否登陆
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
    //判断当前是否选中
    isChecked(arr, id) {
      return arr.includes(id);
    },
    //打开弹出框
    open(id,title) {
      var that = this;
      that
        .$prompt("原名称："+title, "请输入新名称", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(({ value }) => {
          that
            .$http({
              method: "post",
              url: "/Admin/Role/updateTitle",
              data: {
                groupid: id,
                title: value
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
            .then(res => {
              if (res.data.code == 1) {
                that.$message({
                  message: "编辑成功",
                  type: "success",
                  duration:1000,
                  onClose(){
                    window.location.reload()
                  }
                });
              }
            });
        });
    },
    //请求数据的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/Role/index",
          // data: {
          //   currentPage: that.currentPaging.currentPage,
          //   pageSize: that.currentPaging.pageSize,
          //   keyword: that.searchValue
          // },
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
        .then(res => {
          for (var i in res.data.group) {
            res.data.group[i].ruleList = res.data.rule;
          }
          that.tableInfo = res.data.group;
        });
    },
    afun(roleId, ruleId) {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/Role/setAuthGroup",
          data: {
            id: roleId,
            rule: ruleId
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
          if (res.data.code == 1) {
            that.$message({
              type: "success",
              message: "修改成功!",
              duration: 1000,
              onClose: function() {
                that.$router.push(
                  "/pages/system_administrators/System_Administrators/jueseliebiao"
                );
              }
            });
          } else {
            that.$message({
              type: "error",
              message: "修改失败!"
            });
          }
        });
    },
    //删除用户/表格行
    deleteRow(index, id, rows) {
      this.$confirm("此操作将删除该角色组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          that
            .$http({
              method: "post",
              url: "/Admin/Role/delete",
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
            .then(function() {              
              rows.splice(index, 1);
              that.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#jueseliebiao {
  .el-checkbox {
    margin: 0 20px 5px 0;
  }
}
</style>
