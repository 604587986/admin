/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="classroomList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <el-button size="small" type="primary" @click="open">添加院系</el-button>
    <!-- Table -->
    <div class="table-container">

      <!-- 表格 -->
        <el-table :data="tableInfo" stripe size="small">
          <el-table-column prop="id" label="ID" width="100"></el-table-column>
          <el-table-column prop="title" label="类别名称" width="300"></el-table-column>
          <el-table-column prop="grade" label="类型" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">添加子类</el-button>
              <el-button size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
          
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
          name: "院系列表",
          url: ""
        }
      ],

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
    open() {
      var that = this;
      that
        .$prompt("请输入院系名称", "添加院系", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
        .then(({ value }) => {
          that
            .$http({
              method: "get",
              url: "/Admin/Category/insert",
              params: {
                title: value,
                parentid: "0",
                p_id: "0",
                type: "1",
                grade: "1"
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                  duration: 1000,
                  onClose() {
                    that.getData();
                  }
                });
              } else {
                that.$message({
                  type: "error",
                  message: "添加失败！"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Category/index"
        })
        .then(function(res) {
          for (let i in res.data) {
            if (res.data[i].grade == "1") {
              res.data[i].grade = "顶级类别";
            } else if (res.data[i].grade == "2") {
              res.data[i].grade = "二级类别";
              res.data[i].title = ">>>" + res.data[i].title;
            } else if (res.data[i].grade == "3") {
              res.data[i].grade = "三级类别";
              res.data[i].title = ">>>>>>" + res.data[i].title;
            }
          }
          that.tableInfo = res.data;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
