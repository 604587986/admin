/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="xueshengliebiao">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" class="float-left state-selection" @change='showClass'>
          <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="classValue" clearable placeholder="选择班级" size="mini" class="float-left state-selection">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <router-link to="/pages/system_administrators/System_Administrators/xueshenghuishouzhan"><el-button type="primary" size="mini" style="float:right;">回收站</el-button>  </router-link>      
        <router-link to="/pages/system_administrators/System_Administrators/daoruxueshengshuju"><el-button type="primary" size="mini" style="float:right;margin-right:10px">导入学生数据</el-button></router-link>
      </div>
    <div class="table-filter">
      <el-select v-model="stateValue" clearable placeholder="选择状态" size="mini" class="float-left state-selection">
          <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select title-search float-left" size="mini">
      </el-input>
      <div style="margin-top:50px">
        <el-button type="primary" @click="articleSearch()" size="mini">搜索</el-button>
      </div>
            
    </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
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
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/xueshengxiangqing',query:{id:scope.row.id}}"><el-button size="mini">查看详情</el-button></router-link>
              <el-button size="mini" @click="pwd(scope.row.id)">还原密码</el-button>
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
          name: "学生列表",
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

      stateList: [
        {
          value: 1,
          label: "在校"
        },
        {
          value: 0,
          label: "离校"
        }
      ],
      stateValue: "",

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
          url: "/Admin/Student/index",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            title: that.searchValue,
            status: that.stateValue,
            faculty_id: that.departmentValue,
            grade_id: that.classValue
          }
        })
        .then(function(res) {
          that.tableInfo = res.data.Student;
          that.currentPaging.totals = Number(res.data.count);
          that.departmentList = res.data.category;
          that.allClass = res.data.squad;
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
              url: "/Admin/Student/del",
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
    //还原密码
    pwd(id) {
      this.$confirm("是否还原密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          that
            .$http({
              method: "get",
              url: "/Admin/Student/pwd",
              params: {
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "密码还原成功!",
                  duration: 1000
                });
              } else {
                that.$message({
                  type: "error",
                  message: "密码还原失败!"
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
#xueshengliebiao {
  .title-search {
    width: 160px;
  }
}
</style>
