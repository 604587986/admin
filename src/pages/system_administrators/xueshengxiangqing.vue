/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="xueshengxiangqing">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>

       <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
                <el-form-item label="姓名：" class="form-item" prop="user_name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="学号：" class="form-item" prop="user_name">
                    <el-input v-model="form.student_num"></el-input>
                </el-form-item>
                <el-form-item label="名族：" class="form-item" prop="user_name">
                    <el-input v-model="form.nation"></el-input>
                </el-form-item>
                 <el-form-item label="性别：" style="width:300px" prop="status">
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="0">女</el-radio>                                          
                </el-form-item>
                <el-form-item label="电话：" class="form-item" prop="user_name">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" class="form-item" prop="user_name">
                    <el-input v-model="form.id_number"></el-input>
                </el-form-item>
                <el-form-item label="学院名称：" class="form-item" prop="user_name">
                    <el-input v-model="form.college"></el-input>
                </el-form-item>
                <el-form-item label="系名称：" class="form-item" prop="nick_name">
                    <el-select v-model="form.faculty_id" clearable placeholder="选择系" size="mini" class="float-left state-selection" @change='showClass'>
                        <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级名称：" class="form-item" prop="nick_name">
                    <el-select v-model="form.grade_id" clearable placeholder="选择班级" size="mini" class="float-left state-selection">
                        <el-option :value="form.grade_id" :label="defaultClass" checked></el-option>
                        <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业名称：" class="form-item" prop="nick_name">
                    <el-input v-model="form.specialty"></el-input>
                </el-form-item>
                <el-form-item label="学制：" class="form-item" prop="nick_name">
                    <el-input v-model="form.systme"></el-input>
                </el-form-item>
                <el-form-item label="学籍状态：" class="form-item" prop="nick_name">
                    <el-input v-model="form.school_rol_status"></el-input>
                </el-form-item>
                <el-form-item label="所在级：" class="form-item" prop="nick_name">
                    <el-input v-model="form.grade"></el-input>
                </el-form-item>
                <el-form-item label="培养层次：" class="form-item" prop="nick_name">
                    <el-input v-model="form.gradation"></el-input>
                </el-form-item>
                <el-form-item label="在校状态：" class="form-item" prop="nick_name">
                    <el-radio v-model="form.status" label="1">在校</el-radio>
                    <el-radio v-model="form.status" label="0">离校</el-radio>
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
          name: "基础数据",
          url: ""
        },
        {
          name: "学生列表",
          url:
            "/pages/system_administrators/System_Administrators/xueshengliebiao"
        },
        {
          name: "查看详情",
          url: ""
        }
      ],

      //表单
      form: {},
      //表单验证
      rules: {},

      departmentList: [],
      allClass: [],
      classList: [],

      //默认的班级
      defaultClass:''
    };
  },
  components: {
    Crumb
  },
  mounted: function() {
    var that = this;
    that
      .$http({
        method: "get",
        url: "/Admin/Student/edit?id=" + that.$route.query.id
      })
      .then(function(res) {
        that.form = res.data.student;
        that.departmentList = res.data.category;
        that.allClass = res.data.squad;
        for(let i in that.allClass){
            if(that.allClass[i].id == that.form.grade_id){
                that.defaultClass = that.allClass[i].name
            }
        }
      });
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 8);
    this.$store.commit("update_system_menu_idx", 8);
  },
  methods: {
    //显示联动的班级
    showClass(val) {
      this.classList = [];
      for (let i in this.allClass) {
        if (this.allClass[i].faculty_id == val) {
          this.classList.push(this.allClass[i]);
        }
      }
    },
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
              url: "/Admin/user/update",
              data: {
                id: that.form.id,
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
                    that.$router.push(
                      "/pages/system_administrators/System_Administrators/yonghuguanli"
                    );
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
