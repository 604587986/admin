/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="bianjikecheng">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>

       <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
                <el-form-item label="课程名称：" class="form-item" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="课程编码：" class="form-item" prop="course_num">
                    <el-input v-model="form.course_num" type="number"></el-input>
                </el-form-item>     
                <el-form-item label="所属系：" class="form-item" prop="faculty_id">
                    <el-select v-model="form.faculty_id" clearable placeholder="选择系" size="mini" class="float-left state-selection">
                        <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>                               
                <el-form-item label="任课老师：" class="form-item" prop="teach">
                    <el-input v-model="form.teach"></el-input>
                </el-form-item>                                       
                <el-form-item class="form-control-btn">
                    <el-button type="primary" @click="submitForm('form')" size="large">提交</el-button>
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
          name: "课程列表",
          url:
            "/pages/system_administrators/System_Administrators/kechengliebiao"
        },
        {
          name: "编辑课程",
          url: ""
        }
      ],

      //表单
      form: {},
      //表单验证
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        job_num: [{ required: true, message: "不能为空", trigger: "blur" }],
        sex: [{ required: true, message: "不能为空", trigger: "blur" }],
        tel: [{ required: true, message: "不能为空", trigger: "blur" }],
        faculty_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        duty: [{ required: true, message: "不能为空", trigger: "blur" }]
      },

      departmentList: []
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
    //默认请求的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/course/edit?id=" + that.$route.query.id
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
            that.form = res.data.course;
            that.departmentList = res.data.category;
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
              url: "/Admin/course/edit",
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
                that
                  .$confirm("修改成功，是否返回课程列表?", "提示", {
                    confirmButtonText: "返回",
                    cancelButtonText: "留在当前页",
                    type: "success"
                  })
                  .then(() => {
                    that.$router.push(
                      "/pages/system_administrators/System_Administrators/kechengliebiao"
                    );
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
