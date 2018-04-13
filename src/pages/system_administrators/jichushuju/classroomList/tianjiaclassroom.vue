/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="tianjiaclassroom">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="130px" size="mini" label-position="right">
                <el-form-item label="教室名称：" class="form-item" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="教室位置：" class="form-item" prop="classroom_location">
                    <el-input v-model="form.classroom_location"></el-input>
                </el-form-item>
                <el-form-item label="是否开启预约：" class="form-item" prop="status">
                    <el-radio-group v-model="form.status">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="form-control-btn">
                    <el-button type="primary" @click="submitForm('form')" size="large">提交</el-button>
                    <el-checkbox label="提交后是否返回？" v-model="back" style="margin-left:104px" border size="large"></el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token";

/* 添加用户 */
export default {
  data() {
    return {
      //是否返回列表
      back: true,
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
          name: "教室列表",
          url:
            "/pages/system_administrators/System_Administrators/classroomList"
        },
        {
          name: "添加教室",
          url: ""
        }
      ],
      dataList: [],

      //提交按钮loading
      //表单
      form: {
        name: "",
        classroom_location: "",
        status: ""
      },
      //表单验证
      rules: {
        name: [
          {
            required: true,
            message: "请输入教室名称",
            trigger: "blur"
          }
        ],
        classroom_location: [
          {
            required: true,
            message: "请输入教室位置",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }
        ]
      }
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
        // that.getData();
        return;
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
          url: "/Admin/classroom/add"
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
            that.dataList = res.data.category;
          }
        });
    },

    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that
            .$http({
              method: "post",
              url: "/Admin/classroom/add",
              data: that.form,
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
            .then(function(res) {
              if (res.data.code == 6) {
                that.$alert(res.data.error, "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    // this.$router.go(-1);
                  }
                });
              } else if (res.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "提交成功!",
                  duration: 1000,
                  onClose: function() {
                    that.$refs.form.resetFields();
                    if (that.back) {
                      that.$router.push(
                        "/pages/system_administrators/System_Administrators/classroomList"
                      );
                    }
                  }
                });
              }
            });
        } else {
          that.$message.error("提交失败!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
