/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="classroom">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="statusValue" clearable placeholder="选择状态" size="mini" class="float-left state-selection" @change="search">
          <el-option v-for="item in statusList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>    
          <router-link to="/pages/system_administrators/System_Administrators/classroomhuishouzhan"><el-button type="primary" size="mini" style="float:right;">回收站</el-button>  </router-link>      
          <router-link to="/pages/system_administrators/System_Administrators/tianjiaclassroom"><el-button type="primary" size="mini" style="float:right;margin-right:10px">添加教室</el-button></router-link>   
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange"  @sort-change="sort" :default-sort="{prop:'id'}">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="ID" width="100" sortable='custom'></el-table-column>
          <el-table-column prop="name" label="教室名称"></el-table-column>          
          <el-table-column prop="classroom_location" label="教室位置"></el-table-column>
          <el-table-column  label="是否开启预约">
             <div slot-scope="scope">
              <el-tag :type="scope.row.status==1?'':'danger'" v-html="scope.row.status==1?'是':'否'">
              </el-tag>
            </div>
          </el-table-column>  
          <el-table-column label="操作">
            <div slot-scope="scope"  class="control-btn">
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/bianjiclassroom',query:{id:scope.row.id}}"><el-button  size="mini">编辑</el-button></router-link>
              <el-button size="mini" @click="deleteRow(scope.$index, scope.row.id,tableInfo)">删除</el-button>
            </div>
          </el-table-column>               
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batch('del')" :disabled="tableList.length==0">批量删除</el-button>
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
          name: "教室列表",
          url: ""
        }
      ],
      //select内容
      statusList: [
        {
          id: 1,
          title: "可预约"
        },
        {
          id: 0,
          title: "不可预约"
        }
      ],
      statusValue: "",
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
          url: "/Admin/classroom/index",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            status: that.statusValue,
            order: that.sortRule
          }
        })
        .then(function(res) {
          if (res.data.code == 6) {
            that.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // this.$router.go(-1);
              }
            });
          } else {
            that.tableInfo = res.data.classroom;
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
    //检索
    search() {
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
              url: "/Admin/classroom/del",
              params: {
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 6) {
                that.$alert(res.data.error, "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    // this.$router.go(-1);
                  }
                });
              } else if (res.data.code == 1) {
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
        case "pass":
          title = "批量审核选中项";
          break;
        case "reject":
          title = "批量驳回选中项";
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
            url: "/Admin/classroom/batch",
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
        this.sortRule = val.prop + " " + type;
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
