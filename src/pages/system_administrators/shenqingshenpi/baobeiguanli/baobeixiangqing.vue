/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:45:31
 */


<template>
  <div id="baobeixiangqing" class="detail-wrapper">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 申请信息 -->
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>申请信息</span>
      </div>
      <div class="body">
        <p><label>申请编号:</label><span>{{dataList.request_num}}</span></p>
        <p><label>申请时间:</label><span>{{dataList.time}}</span></p>
        <p><label>申请人:</label><span>{{dataList.name}}</span></p>
        <p><label>申请次数:</label><span>{{dataList.frequency}}</span></p>        
        <p><label>报备课程:</label><span>{{dataList.course}}</span></p>
        <p><label>报备教室:</label><span>{{dataList.classroom}}</span></p>
        <p><label>上课时间:</label><span>{{dataList.attend_time}}</span></p>
      </div>
    </el-card>
  <!-- 审核信息 -->    
    <el-card class="box-card">
      <div slot="header">
        <span>审核信息</span>
      </div>
      <div class="body">
        <p v-show="dataList.auditor"><label>审批人:</label><span>{{dataList.auditor}}</span></p>
        <p v-show="dataList.auditor_time"><label>审批时间:</label><span>{{dataList.auditor_time}}</span></p>
        <p v-show="dataList.status=='1'"><label>审批状态:</label><span><el-tag type="danger">待审批</el-tag></span></p>
        <p v-show="dataList.status=='2'"><label>审批状态:</label><span><el-tag type="success">已审批</el-tag></span></p>
        <p v-show="dataList.status=='3'"><label>审批状态:</label><span><el-tag type="warning">已驳回</el-tag></span></p>
        <p v-show="dataList.remarks"><label>备注:</label><span>{{dataList.remarks}}</span></p>
      </div>
    </el-card>

   
  <div class="btn-wrapper">
    <el-button type="primary" v-show="dataList.status=='1'" @click="submit(dataList.id,2)">通过</el-button>            
    <el-button type="danger" v-show="dataList.status=='1'"  @click="submit(dataList.id,3)">驳回</el-button>            
  </div>

  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";

import { token } from "@/publicjs/token";

/* 添加站点 */
export default {
  name: "AddSite",
  data() {
    return {
      //获取到的数据
      dataList: [],

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
          name: "报备管理",
          url: "/pages/system_administrators/System_Administrators/baobeiguanli"
        },
        {
          name: "报备详情",
          url: ""
        }
      ]
    };
  },
  components: {
    Crumb
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
    //ajax
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/report/particular",
          params: {
            id: that.$route.query.id
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
            that.dataList = res.data.data;
          }
        });
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
            url: "/Admin/report/audit",
            data: {
              id: id,
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
              this.$alert(res.data.error, "提示", {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
