/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="tianjiajiaoshi">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
          <router-link to="/pages/system_administrators/System_Administrators/daorujiaoshishuju"  style="margin-left:40px">
            <el-button type="primary" size="mini">Excel导入</el-button>
          </router-link>
        <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
                <el-form-item label="姓名：" class="form-item" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="工号：" required class="form-item" prop="job_num">
                    <el-input v-model="form.job_num"></el-input>
                </el-form-item>
                <el-form-item label="性别：" class="form-item" prop="sex">
                      <el-radio-group v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                      </el-radio-group>
                </el-form-item>
                <el-form-item label="部门：" class="form-item" prop="faculty_id">
                    <el-select v-model="form.faculty_id" clearable placeholder="请选择" size="mini" class="float-left column-selection">
                      <el-option v-for="item in dataList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职务：" required class="form-item" prop="duty">
                    <el-input v-model="form.duty"></el-input>
                </el-form-item>
                <el-form-item label="电话：" required class="form-item" prop="tel">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="密码：" required class="form-item" prop="password">
                    <el-input v-model="form.password"></el-input>
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
      //是否返回用户列表
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
          name: "教师列表",
          url:
            "/pages/system_administrators/System_Administrators/jiaoshiliebiao"
        },
        {
          name: "添加教师",
          url: ""
        }
      ],
      dataList: [],

      //提交按钮loading
      //表单
      form: {},
      //表单验证
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        job_num: [
          {
            required: true,
            message: "请输入工号",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }
        ],
        faculty_id: [
          {
            required: true,
            message: "请选择部门",
            trigger: "blur"
          }
        ],
        duty: [
          {
            required: true,
            message: "请输入职务",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入电话",
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
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/teacher/add"
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
            that.dataList = res.data;
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
              url: "/Admin/teacher/add",
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
                        "/pages/system_administrators/System_Administrators/jiaoshiliebiao"
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
