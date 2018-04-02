<template>
  <div id="tianjiaquanxian">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <div class="form-container">
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
            <el-form-item label="控制器：" style="width:300px">
              <el-input v-model="form.state" value='1' disabled size="mini">禁用</el-input>
              <span class="site-item-info">初始状态未避免访问受限，只允许设为禁用！请先获取权限，再设为有效！</span>                                          
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="submit('form')">提交</el-button>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";

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
          name: "系统设置",
          url: ""
        },
        {
          name: "权限列表",
          url: "/pages/system_administrators/System_Administrators/quanxianliebiao"
        },
        {
          name: "添加权限",
          url: ""
        }
      ],
      form: {
        name: "",
        title: "",
        controller: "",
        state: "禁用"
      },
      //表单验证规则
      rules: {
        name: [{ required: true, message: "权限不能为空", trigger: "blur" }],
        title: [{ required: true, message: "权限标题不能为空", trigger: "blur" }],
        controller: [{ required: true, message: "控制器不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    submit(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that
            .$http({
              method: "post",
              url: "/Admin/Auth/insert",
              data: {
                name: that.form.name,
                title: that.form.title,
                controller: that.form.controller,
                status:that.form.status
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
                that.$message({
                  type: "success",
                  message: "添加成功!",
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
                  message: "添加失败!"
                });
              }
            });
        }
      });
    }
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
#tianjiaquanxian {
  .el-form-item {
    float: none;
    margin-left: 10px;
  }
}
</style>
