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
      <p class="prompt">提示：选择待审批状态可批量审核或驳回</p> 
      
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="statusValue" clearable placeholder="选择状态" size="mini" class="float-left state-selection" @change="getData">
          <el-option  label="待审批" value="1"></el-option>
          <el-option  label="已审批" value="2"></el-option>
          <el-option  label="已驳回" value="3"></el-option>
        </el-select>
        <el-input placeholder="申请人关键字" v-model="searchValue" class="input-with-select title-search float-left" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
       <router-link to="/pages/system_administrators/System_Administrators/kongjiaoshichaxun">
          <el-button type="primary" size="mini" style="margin: 0 20px">
           查询空教室
          </el-button>           
      </router-link>
      <router-link to="/pages/system_administrators/System_Administrators/jiaoshiyuyuehuishouzhan"><el-button type="primary" size="mini" style="float:right;">回收站</el-button>  </router-link> 
        
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange" @sort-change="sort" :default-sort="{prop:'application_num'}">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="application_num" label="申请编号" sortable='custom' width="120"></el-table-column>
          <el-table-column prop="application_time" label="申请时间" sortable='custom' width="120"></el-table-column>
          <el-table-column prop="proposer" label="申请人"></el-table-column>
          <el-table-column prop="frequency" label="申请次数" width="70"></el-table-column>
          <el-table-column prop="classroom" label="申请教室"></el-table-column>          
          <el-table-column prop="start_time" label="开始时间" width="100"></el-table-column>          
          <el-table-column prop="end_time" label="结束时间" width="100"></el-table-column>          
          <el-table-column label="状态">
            <div slot-scope="scope">
              <el-tag close-transition  size="mini" v-show="scope.row.status==1" type="danger">待审批</el-tag>
              <el-tag close-transition  size="mini" v-show="scope.row.status==2" type="success">已审批</el-tag>
              <el-tag close-transition  size="mini" v-show="scope.row.status==3" type="warning">已驳回</el-tag>
            </div>
          </el-table-column>
          <el-table-column prop="approver" label="审批人"></el-table-column>
          <el-table-column label="操作" width="70">
            <div slot-scope="scope" class="control-btn">
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/jiaoshiyuyuexiangqing',query:{application_num:scope.row.application_num}}"><el-button size="small">详情</el-button></router-link>
              <el-button size="small" @click="submit(scope.row.application_num,2)" v-if="scope.row.status=='1'">审核</el-button>
              <el-button @click="submit(scope.row.application_num,3)" size="small" v-if="scope.row.status=='1'">驳回</el-button>
              <el-button @click="del(scope.row.application_num)" size="small">删除</el-button>              
            </div>
          </el-table-column>
        </el-table>
      </div>
            <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batch('pass')" :disabled="tableList.length==0" v-show="statusValue==1">批量审核</el-button>
        <el-button type="primary" size="mini" @click="batch('reject')" :disabled="tableList.length==0" v-show="statusValue==1">批量驳回</el-button>
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
          name: "申请审批",
          url: ""
        },
        {
          name: "教室预约管理",
          url: ""
        }
      ],
      //状态值
      statusValue: "",
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
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  methods: {
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Classroomsubscribe/index",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            status: that.statusValue,
            title: that.searchValue,
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
            that.tableInfo = res.data.classroomsub;
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
    //单个审核与驳回
    submit(id, status) {
      var that = this;
      var title = "";
      status == 2 ? (title = "通过") : (title = "驳回");
      this.$prompt("请输入备注", title, {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        that
          .$http({
            method: "post",
            url: "/Admin/Classroomsubscribe/audit",
            data: {
              application_num: id,
              status: status,
              remarks: value
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
            if (res.data.code == 6) {
              that.$alert(res.data.error, "提示", {
                confirmButtonText: "确定",
                callback: () => {
                  // this.$router.go(-1);
                }
              });
            } else if (res.data.code == 1) {
              that.$message({
                message: "操作成功",
                type: "success"
              });
              that.getData();
            } else {
              that.$message({
                message: "操作失败",
                type: "error"
              });
            }
          });
      });
    },
    //软删除
    del(id) {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Classroomsubscribe/del",
          params: {
            application_num: id
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
            that.$alert("删除成功", "操作提示", {
              confirmButtonText: "确定",
              callback: () => {
                that.getData();
              }
            });
          } else {
            that.$alert("删除失败", "操作提示", {
              confirmButtonText: "确定"
            });
          }
        });
    },
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = [];
      for (let i in val) {
        this.tableList.push(val[i].application_num);
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
      if (operation == "del") {
        this.$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http({
              method: "post",
              url: "/Admin/Classroomsubscribe/batch",
              data: {
                operation: operation,
                application_num: this.tableList
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
      } else {
        this.$prompt("请输入备注", title, {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({ value }) => {
            this.$http({
              method: "post",
              url: "/Admin/Classroomsubscribe/batch",
              data: {
                operation: operation,
                application_num: this.tableList,
                remarks: value
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
