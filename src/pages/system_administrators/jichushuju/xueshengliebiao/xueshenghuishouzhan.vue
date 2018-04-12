/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="xueshenghuishouzhan">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>          
          <el-table-column prop="id" label="ID" width="60"></el-table-column>
          <el-table-column prop="student_num" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column label="性别" width="60">
            <div slot-scope="scope">
              <el-tag :type="scope.row.sex==0?'danger':''" v-html="scope.row.sex==0?'女':'男'">
              </el-tag>
            </div>
          </el-table-column>
          <el-table-column prop="tel" label="电话"></el-table-column>                  
          <el-table-column prop="faculty_id" label="所属院系"></el-table-column>     
          <el-table-column prop="specialty" label="专业名称"></el-table-column>                         
          <el-table-column prop="grade_id" label="所属班级"></el-table-column>  
          <el-table-column prop="systme" label="学制" width="50"></el-table-column>   
          <el-table-column prop="school_rol_status" label="学籍状态"></el-table-column> 
          <el-table-column prop="grade" label="所在级"></el-table-column> 
          <el-table-column label="操作">
            <div slot-scope="scope"  class="control-btn">
              <el-button type="warning" size="mini" @click="restore(scope.row.id)">还原数据</el-button>
              <el-button type="danger" size="mini" @click="clear(scope.row.id)">彻底删除</el-button>
            </div>
          </el-table-column>                                                                         
        </el-table>
      </div>
                  <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batch('restore')" :disabled="tableList.length==0">批量还原</el-button>
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
          name: "学生列表",
          url:
            "/pages/system_administrators/System_Administrators/xueshengliebiao"
        },
        {
          name: "学生回收站",
          url: ""
        }
      ],

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
          url: "/Admin/Student/dellist",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize
          }
        })
        .then(function(res) {
          if (res.data.code == 6) {
            this.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // this.$router.go(-1);
              }
            });
          } else {
            that.currentPaging.totals = Number(res.data.count);
            that.tableInfo = res.data.student;
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

    //还原
    restore(id) {
      var that = this;
      that
        .$confirm("是否还原?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that
            .$http({
              method: "get",
              url: "/Admin/Student/restore",
              params: {
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 6) {
                this.$alert(res.data.error, "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    // this.$router.go(-1);
                  }
                });
              } else if (res.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "还原成功!",
                  duration: 500,
                  onClose() {
                    that.getData();
                  }
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //彻底删除
    clear(id) {
      var that = this;
      that
        .$confirm("是否彻底删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that
            .$http({
              method: "get",
              url: "/Admin/Student/delete",
              params: {
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 6) {
                this.$alert(res.data.error, "提示", {
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
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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
            url: "/Admin/Student/batch",
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
