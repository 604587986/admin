/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="xitongrizhi">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <div class="table-container">
      <div class="prompt">
        <p class="title">提示：</p>
        <p>1.为了保证后台的安全性,系统只允许超级管理员删除操作日记</p>
        <p>2.系统必须保留最近30天后台管理日志</p>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="id" label="ID" width="80px"></el-table-column>
          <el-table-column prop="ip" label="登录IP"></el-table-column>          
          <el-table-column prop="address" label="登陆地址" ></el-table-column>
          <el-table-column prop="username" label="用户名" ></el-table-column>   
          <el-table-column prop="posttime" label="操作时间"></el-table-column>                 
          <el-table-column prop="table" label="操作表"></el-table-column>
          <el-table-column prop="type" label="操作类型"></el-table-column>
          <el-table-column label="操作">
              <div slot-scope="scope" class="control-btn">
                  <router-link :to="{path:'/pages/system_administrators/System_Administrators/rizhixiangqing',query:{id:scope.row.id}}"><el-button size="mini">查看详情</el-button></router-link>
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
          name: "系统设置",
          url: ""
        },
        {
          name: "系统日志",
          url: ""
        }
      ],

      //表格1
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
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  methods: {
    //请求数据的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Log/index",
          params: {
            p: that.currentPaging.currentPage,
            pageSize: that.currentPaging.pageSize
          }
        })
        .then(function(res) {
          that.tableInfo = res.data.data;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
.prompt {
  font-size: 14px;
  color: @text-color;
  line-height: 24px;
  margin-bottom: 20px;
  .title {
    font-size: 16px;
  }
}
</style>
