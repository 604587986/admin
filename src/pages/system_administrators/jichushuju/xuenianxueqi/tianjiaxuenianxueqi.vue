/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="tianjiaxuenianxueqi">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="130px" size="mini" label-position="right">
                <el-form-item label="学年学期：" class="form-item" prop="school_year">
                    <el-input v-model="form.school_year"></el-input>
                </el-form-item>
                <el-form-item label="开始时间：" class="form-item" prop="start_time">
                    <el-date-picker
                        v-model="form.start_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>      
                </el-form-item>
                <el-form-item label="结束时间：" class="form-item" prop="end_time">
                    <el-date-picker
                        v-model="form.end_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="教学周次：" class="form-item" prop="week">
                    <el-input-number v-model="form.week"></el-input-number>
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
          name: "学年学期",
          url: "/pages/system_administrators/System_Administrators/xuenianxueqi"
        },
        {
          name: "添加学年学期",
          url: ""
        }
      ],

      //提交按钮loading
      //表单
      form: {},
      //表单验证
      rules: {
        school_year: [
          {
            required: true,
            message: "请输入学年学期",
            trigger: "blur"
          }
        ],
        start_time: [
          {
            required: true,
            message: "请输入开始时间",
            trigger: "blur"
          }
        ],
        end_time: [
          {
            required: true,
            message: "请输入结束时间",
            trigger: "blur"
          }
        ],
        week: [
          {
            required: true,
            message: "请输入周次",
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
    // getData() {
    //   var that = this;
    //   that
    //     .$http({
    //       method: "get",
    //       url: "/Admin/classroom/add"
    //     })
    //     .then(function(res) {
    //       that.dataList = res.data.category;
    //     });
    // },

    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that
            .$http({
              method: "post",
              url: "/Admin/schoolyear/add",
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
                        "/pages/system_administrators/System_Administrators/xuenianxueqi"
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
