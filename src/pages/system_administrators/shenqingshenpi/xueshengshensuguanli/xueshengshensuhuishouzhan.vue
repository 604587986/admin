/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="xueshengshensuhuishouzhan">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="statusValue" clearable placeholder="选择状态" size="mini" class="float-left state-selection" @change="getData">
          <el-option  label="待审批" value="1"></el-option>
          <el-option  label="已审批" value="2"></el-option>
          <el-option  label="已驳回" value="3"></el-option>
        </el-select>
        <!-- <el-input placeholder="申请人关键字" v-model="searchValue" class="input-with-select title-search float-left" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input> -->
        
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="request_num" label="申请编号"></el-table-column>
          <el-table-column prop="time" label="申请时间"></el-table-column>
          <el-table-column prop="name" label="申请人"></el-table-column>
          <el-table-column prop="frequency" label="申请次数"></el-table-column>
          <el-table-column prop="appeal_type" label="申诉类型">
            <div slot-scope="scope">
              <el-tag close-transition  size="mini" v-show="scope.row.status==1" type="warning">忘打卡</el-tag>
              <el-tag close-transition  size="mini" v-show="scope.row.status==2" type="warning">数据有误</el-tag>
              <el-tag close-transition  size="mini" v-show="scope.row.status==3" type="warning">其他</el-tag>
            </div>
            </el-table-column>         
          <el-table-column prop="course" label="课程名称"></el-table-column>         
          <el-table-column prop="date" label="上课时间"></el-table-column>                              
          <el-table-column label="状态">
            <div slot-scope="scope">
              <el-tag close-transition  size="mini" v-show="scope.row.status==1" type="danger">待审批</el-tag>
              <el-tag close-transition  size="mini" v-show="scope.row.status==2" type="success">已审批</el-tag>
              <el-tag close-transition  size="mini" v-show="scope.row.status==3" type="warning">已驳回</el-tag>
            </div>
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small" @click="restore(scope.row.id)">还原</el-button>
              <el-button size="small" @click="del(scope.row.id)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>

      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini">批量审核</el-button>
        <el-button type="primary" size="mini">批量驳回</el-button>
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
          name: "学生申诉管理",
          url:
            "/pages/system_administrators/System_Administrators/xueshengshensuguanli"
        },
        {
          name: "调学生申诉回收站",
          url: ""
        }
      ],
      //状态值
      statusValue: "",
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
          url: "/Admin/appeal/dellist",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize,
            status: that.statusValue,
            title: that.searchValue
          }
        })
        .then(function(res) {
          that.tableInfo = res.data;
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
    //彻底删除
    del(id) {
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
              url: "/Admin/appeal/delete",
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
              url: "/Admin/appeal/restore",
              params: {
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
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
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = val;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
