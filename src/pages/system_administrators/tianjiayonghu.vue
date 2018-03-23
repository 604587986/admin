/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="tianjiayonghu">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
       
        <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
                <el-form-item label="用户名：" class="form-item" prop="user_name">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" required class="form-item" prop="nick_name">
                    <el-input v-model="form.nick_name"></el-input>
                </el-form-item>
                <el-form-item label="登录密码：" class="form-item" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                    <span class="site-item-info">6~15位，英文与数字或下划线组合</span>
                </el-form-item>
                <el-form-item label="确认密码：" class="form-item" prop="comfirmPassword">
                    <el-input type="password" v-model="form.comfirmPassword"></el-input>
                </el-form-item>
                <el-form-item label="角色：" class="form-item">
                    <el-select v-model="form.role" clearable placeholder="请选择角色" size="mini" class="float-left column-selection">
                      <el-option v-for="item in dataList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="form-control-btn">
                    <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
                    <el-checkbox label="提交后是否返回？" v-model="back" style="margin-left:104px" border size="large"></el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
/* 添加用户 */
export default {
  name: "AddUser",
  data() {
    return {
      //是否返回用户列表
      back: true,
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "权限管理",
          url: ""
        },
        {
          name: "用户管理",
          url: ""
        },
        {
          name: "添加用户",
          url: ""
        }
      ],

      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        user_name: "", //用户名
        nick_name: "", //昵称
        password: "", //密码
        comfirmPassword: "", //确认密码
        role: "" //角色ID
      },
      //ajax获取到的
      dataList: [],
      //表单验证
      rules: {
        user_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-15位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        comfirmPassword: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
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
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);

    that
      .$http({
        method: "post",
        url: "/Admin/user/add",
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
        that.dataList = res.data;
      });
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          that.subLoading = false;
          that
            .$http({
              method: "post",
              url: "/Admin/user/insert",
              data: {
                name: that.form.user_name,
                nickname: that.form.nick_name,
                password: that.form.password,
                group_id: that.form.role,
                token: window.localStorage.getItem("token")
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
            .then(function(res) {
              if (res.data.code == 1) {
                that.subLoading = false;
                that.$message({
                  type: "success",
                  message: "提交成功!",
                  duration: 1000,
                  onClose: function() {
                    that.$refs.form.resetFields();
                    if (that.back) {
                      that.$router.push(
                        "/pages/system_administrators/System_Administrators/yonghuguanli"
                      );
                    }
                  }
                });
              } else if (res.data.code == 2) {
                that.subLoading = false;
              }
            });
        } else {
          that.subLoading = false;
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
