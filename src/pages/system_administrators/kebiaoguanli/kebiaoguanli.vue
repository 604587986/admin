/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="kebiaoguanli">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="termValue" clearable placeholder="选择学期" size="mini" class="float-left state-selection" @change='showClass'>
          <el-option v-for="item in termList" :key="item.id" :label="item.school_year" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" class="float-left state-selection" @change='showClass'>
          <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="classValue" clearable placeholder="选择班级" size="mini" class="float-left state-selection">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="getData()">查询</el-button>
        <router-link to="/pages/system_administrators/System_Administrators/kebiaohuishouzhan"><el-button type="primary" size="mini" style="float:right;">回收站</el-button>  </router-link>      
        <router-link to="/pages/system_administrators/System_Administrators/daorukebiao"><el-button type="primary" size="mini" style="float:right;margin-right:10px">导入课表</el-button></router-link>
      </div>
            
    </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange" @sort-change="sort" :default-sort="{prop:'coding'}">
          <el-table-column type="selection"></el-table-column>
          <!-- <el-table-column prop="id" label="ID" width="80" sortable='custom'></el-table-column> -->
          <el-table-column prop="coding" label="课表编码" sortable='custom'></el-table-column>
          <el-table-column prop="squad" label="班级名称"></el-table-column>
          <el-table-column prop="category" label="所属系"></el-table-column>
          <el-table-column prop="school_year" label="学年学期"></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope"  class="control-btn">
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/kebiaoxiangqing',query:{coding:scope.row.coding,category:scope.row.category,squad:scope.row.squad,school_year:scope.row.school_year}}"><el-button size="mini">查看</el-button></router-link>
              <el-button size="mini" @click="deleteRow(scope.row.coding)">删除</el-button>
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
          name: "课表管理",
          url: ""
        },
        {
          name: "课表管理",
          url: ""
        }
      ],
      //select内容
      //系
      departmentList: [],
      departmentValue: "",

      //所有班级
      allClass: [],
      classList: [],
      classValue: "",

      //学年学期
      termList: [],
      termValue: "",

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
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  methods: {
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Schedule/index",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            schoolyear: that.termValue,
            faculty_id: that.departmentValue,
            grade_id: that.classValue,
            order: that.sortRule
          }
        })
        .then(function(res) {
          if (res.data.code == 6) {
            that.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // that.$router.go(-1);
              }
            });
          } else {
            that.tableInfo = res.data.schedule;
            that.currentPaging.totals = Number(res.data.count);
            that.departmentList = res.data.category;
            that.termList = res.data.schoolyear;
            that.allClass = res.data.squad;
          }
        });
    },
    //显示联动的班级
    showClass(val) {
      this.classList = [];
      for (let i in this.allClass) {
        if (this.allClass[i].faculty_id == val) {
          this.classList.push(this.allClass[i]);
        }
      }
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

    //删除
    deleteRow(id) {
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
              url: "/Admin/Schedule/del",
              params: {
                id: id
              }
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
        this.tableList.push(val[i].coding);
      }
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
            url: "/Admin/Schedule/batch",
            data: {
              operation: operation,
              coding: this.tableList
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
              that.$alert(res.data.error, "提示", {
                confirmButtonText: "确定",
                callback: () => {
                  // that.$router.go(-1);
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
#xueshengliebiao {
  .title-search {
    width: 160px;
  }
}
</style>
