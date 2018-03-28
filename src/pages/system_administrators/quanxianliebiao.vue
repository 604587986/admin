/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:28:14
 */


<template>
    <div id="quanxianliebiao">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
                                <!-- 表格控制 -->
            <div class="table-filter float-left">
                <el-button type="primary" size="mini" @click="effect" :disabled="multipleSelection.length==0?true:false">选中有效</el-button>
                <el-button type="primary" size="mini" @click="forbid" :disabled="multipleSelection.length==0?true:false">选中禁用</el-button>
                <el-button type="primary" size="mini" @click="deleted" :disabled="multipleSelection.length==0?true:false">选中删除</el-button>
            </div>
           <!-- 表格筛选 -->
            <div class="table-filter float-right">
                <router-link to="/pages/system_administrators/System_Administrators/tianjiaquanxian" class="float-left filter-link">
                    <el-button size="mini" type="primary">添加权限</el-button>
                </router-link>
            </div>
        <!-- Table -->

            <!-- 表格 -->
            <div class="table-body">
                <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>                    
                    <el-table-column prop="id" label="ID" width="80px"></el-table-column>
                    <el-table-column prop="name" label="URL"></el-table-column>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column  label="状态">
                        <div slot-scope="scope">
                            <el-tag size="small" v-html="scope.row.status==1?'有效':'禁用'" :type="scope.row.status==1?'success':'warning'"></el-tag>
                        </div>
                    </el-table-column>
                    <el-table-column prop="controller" label="控制器"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope">
                            <router-link :to="{path:'/pages/system_administrators/System_Administrators/bianjiquanxian',query:{id:scope.row.id}}"><el-button size="small" >编辑</el-button></router-link>
                        </div>
                    </el-table-column>                  
                </el-table>
            </div>
            <!-- 分页 -->
            <!-- <Paging></Paging> -->
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token.js";
// import Paging from "@/components/Paging";

/* 用户列表 */
export default {
  data() {
    return {
      multipleSelection: [],
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
          name: "权限列表",
          url: ""
        }
      ],
      //表格
      tableInfo: []
    };
  },
  components: {
    Crumb

    // Paging
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
    //请求数据的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/Auth/index",
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
          that.tableInfo = res.data;
        });
    },
    handleSelectionChange(val) {
      var arr = [];
      for (let i in val) {
        arr.push(val[i].id);
      }
      this.multipleSelection = arr;
    },
    //按钮提交的ajax封装
    options(val) {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/Auth/opts",
          data: {
            ids: that.multipleSelection,
            submit: val
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
              type: "success",
              message: "操作成功!",
              duration: 500,
              onClose: function() {
                that.getData();
              }
            });
          }
        });
    },
    effect() {
      this.options("effective");
    },
    forbid() {
      this.options("forbidden");
    },
    deleted() {
      this.options("delete");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#quanxianliebiao{
  .table-filter{
    width: auto;
  }
}
</style>
