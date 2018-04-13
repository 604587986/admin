/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:45:31
 */


<template>
  <div id="jiaoshiyuyuexiangqing" class="detail-wrapper">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 申请信息 -->
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>申请信息</span>
      </div>
      <div class="body">
        <p><label>申请编号:</label><span>{{dataList.application_num}}</span></p>
        <p><label>申请时间:</label><span>{{dataList.application_time}}</span></p>
        <p><label>申请人:</label><span>{{dataList.proposer}}</span></p>
        <p><label>申请教室:</label><span>{{dataList.jiaoshi}}</span></p>
        <p><label>使用人数:</label><span>{{dataList.people}}</span></p>
        <p><label>开始时间:</label><span>{{dataList.start_time}}</span></p>
        <p><label>结束时间:</label><span>{{dataList.end_time}}</span></p>
        <p><label>申请次数:</label><span>{{dataList.frequency}}</span></p>
        <p><label>申请理由:</label><span>{{dataList.reason}}</span></p>
      </div>
    </el-card>
  <!-- 审核信息 -->    
    <el-card class="box-card">
      <div slot="header">
        <span>审核信息</span>
      </div>
      <div class="body">
        <p v-show="dataList.approver"><label>审批人:</label><span>{{dataList.approver}}</span></p>
        <p v-show="dataList.status=='1'"><label>审批状态:</label><span><el-tag type="danger">待审批</el-tag></span></p>
        <p v-show="dataList.status=='2'"><label>审批状态:</label><span><el-tag type="success">已审批</el-tag></span></p>
        <p v-show="dataList.status=='3'"><label>审批状态:</label><span><el-tag type="warning">已驳回</el-tag></span></p>
        <p v-show="dataList.remarks"><label>备注:</label><span>{{dataList.remarks}}</span></p>
      </div>
    </el-card>

   
  <div class="btn-wrapper">
    <el-button type="primary" v-show="dataList.status=='1'" @click="submit(dataList.id,2)">通过</el-button>            
    <el-button type="danger" v-show="dataList.status=='1'" @click="submit(dataList.id,3)">驳回</el-button>            
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
          name: "教室预约管理",
          url:
            "/pages/system_administrators/System_Administrators/jiaoshiyuyueguanli"
        },
        {
          name: "教室预约详情",
          url: ""
        }
      ],
      listInfo: [
        "20160926002",
        "2016-06-29        08：32",
        "张三（工号：20154101",
        "2",
        "A101",
        "第八周 周五 1，2节",
        "教学需要，需要使用公共教室"
      ],
      approveInfo: ["李四", "待审批"]
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
          url: "/Admin/Classroomsubscribe/particular",
          params: {
            application_num: that.$route.query.application_num
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
