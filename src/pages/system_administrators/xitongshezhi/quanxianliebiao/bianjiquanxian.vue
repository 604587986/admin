/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="bianjiquanxian">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>

       <!-- Form -->
        <div class="form-container" v-if="form.id">
            <!-- 表单 -->
           <el-form ref="form" :model="form"  :rules="rules"  class="form-box">
            <el-form-item label="权限名称：" style="width:300px" prop="name">
              <el-input v-model="form.name" size="mini"></el-input>
              <span class="site-item-info">(如：User/index)</span>
            </el-form-item>
            <el-form-item label="权限标题：" style="width:300px" prop="title">
              <el-input v-model="form.title" size="mini"></el-input>
              <span class="site-item-info">(如：查看日志)</span>              
            </el-form-item>
            <el-form-item label="控制器：" style="width:300px" prop="controller">
              <el-input v-model="form.controller" size="mini"></el-input>
              <span class="site-item-info">(如：User)</span>                            
            </el-form-item>
            <el-form-item label="控制器：" style="width:300px" prop="status">
                <el-radio v-model="form.status" label="1">有效</el-radio>
                <el-radio v-model="form.status" label="0">禁用</el-radio>                                          
            </el-form-item>
            <el-form-item style="width:300px">
                <el-button type="primary" size="mini" @click="submit('form')">确认</el-button>                                          
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token.js";
/* 添加用户 */
export default {
  name: "AddUser",
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
          url: "/pages/system_administrators/System_Administrators/xitongshezhi"
        },
        {
          name: "权限列表",
          url:
            "/pages/system_administrators/System_Administrators/quanxianliebiao"
        },
        {
          name: "编辑权限",
          url: ""
        }
      ],

      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        id: "",
        name: "",
        title: "",
        controller: "",
        status: "",
        type: ""
      },

      //表单验证
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "权限标题不能为空", trigger: "blur" }
        ],
        controller: [
          { required: true, message: "控制器不能为空", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  components: {
    Crumb
  },
  mounted: function() {
    //默认请求数据加验证token是否登陆
    var that = this;
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
    //默认请求的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/Auth/edit?&id=" + that.$route.query.id,
          // data: { id: that.$route.query.id },
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
                that.$router.go(-1);
              }
            });
          } else {
            that.form.id = res.data.id;
            that.form.controller = res.data.controller;
            that.form.name = res.data.name;
            that.form.status = res.data.status;
            that.form.title = res.data.title;
            that.form.type = res.data.type;
          }
        });
    },
    //表单提交
    submit(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that
            .$http({
              method: "post",
              url: "/Admin/Auth/update",
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
              if (res.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "修改成功!",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push(
                      "/pages/system_administrators/System_Administrators/quanxianliebiao"
                    );
                  }
                });
              } else {
                that.$message({
                  type: "error",
                  message: "修改失败!",
                  duration: 1500
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
#bianjiquanxian {
  .el-form-item {
    float: none;
    margin-left: 10px;
  }
}
</style>
