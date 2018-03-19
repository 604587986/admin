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
          <el-table-column prop="username" label="用户名" ></el-table-column>
          <el-table-column prop="log" label="操作日志"></el-table-column>
          <el-table-column prop="ip" label="操作IP"></el-table-column>
          <el-table-column prop="date" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <Paging></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";

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
          name: "系统设置",
          url: ""
        },
        {
          name: "系统日志",
          url: ""
        }
      ],
     
      
      //表格1
      tableInfo: [
        {
          username:"admin",
          log:"增加管理员： 张山",
          ip:"115.200.252.182",
          date:"2016-06-28 13:00:51"
        },
        {
          username:"admin",
          log:"增加管理员： 张山",
          ip:"115.200.252.182",
          date:"2016-06-28 13:00:51"
        }
      ],
      tableList: []
    };
  },
  components: {
    Crumb,

    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  methods: {
    
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
