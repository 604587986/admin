/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="shujubaobiao">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
     <div class="table-container" style="margin-bottom:30px">
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="firstTableInfo" stripe size="small">
          <el-table-column prop="ip" label="登录ip" ></el-table-column>
          <el-table-column prop="address" label="登录地址"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="posttime" label="操作时间" ></el-table-column>
          <el-table-column prop="table" label="操作表" ></el-table-column>
          <el-table-column prop="type" label="操作类型" ></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-container">
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="secondTableInfo" stripe size="small">
          <el-table-column prop="columnname" label="字段" ></el-table-column>
          <el-table-column prop="column" label="名称"></el-table-column>
          <el-table-column prop="3" label="添加值" v-if="type=='1'?true:false"></el-table-column>
          <el-table-column prop="1" label="旧值" v-if="type=='2'?true:false"></el-table-column>
          <el-table-column prop="2" label="新值" v-if="type=='2'?true:false"></el-table-column>
          <el-table-column prop="3" label="删除值" v-if="type=='3'?true:false"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token";

// import Paging from "@/components/Paging";

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
          url: "/pages/system_administrators/System_Administrators/xitongrizhi"
        },
        {
          name: "日志详情",
          url: ""
        }
      ],

      //表格1
      firstTableInfo: [],
      //表格2
      secondTableInfo: [],

      type: ""
    };
  },
  components: {
    Crumb
    // Paging
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
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Log/particulars",
          params: {
            id: that.$route.query.id
          }
        })
        .then(function(res) {
          that.firstTableInfo.push(res.data.log);

          that.type = res.data.log.typeof;

          for (let i in res.data.logson) {
            that.secondTableInfo.push(res.data.logson[i]);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
