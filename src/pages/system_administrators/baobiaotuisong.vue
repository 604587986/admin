/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:45:31
 */


<template>
  <div id="baobiaotuisong">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
      <!-- 表单 -->
      <el-form ref="form" label-width="200px" size="mini" label-position="right">
        <el-form-item label="选择系/班级：" >
          <el-select v-model="departmentValue" clearable placeholder="请选择系" size="mini">
            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="classValue" clearable placeholder="请选择班级" size="mini">
            <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤数据报表发送至邮箱：" class="my-input-container">
          <el-input v-model="emailValue" type="textarea" :rows="2" placeholder="请输入邮箱地址，多个邮箱请用英文符号，隔开"></el-input>
        </el-form-item>
        <el-form-item label="发送频率：">
             <el-radio-group v-model="rate">
                <el-radio label="每日"></el-radio>
                <el-radio label="每周"></el-radio>
                <el-radio label="每月"></el-radio>
          </el-radio-group> 
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
           <router-link to="/pages/system_administrators/System_Administrators/baobiaoyulan"><el-button type="primary" size="large">报表预览</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
/* 添加站点 */
export default {
  name: "AddSite",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "信息推送",
          url: ""
        },
        {
          name: "报表推送",
          url: ""
        }
      ],
      //select内容
      departmentList: [
        {
          value: 0,
          label: "1系"
        },
        {
          value: 1,
          label: "2系"
        },
        {
          value: 2,
          label: "3系"
        },
        {
          value: 3,
          label: "4系"
        }
      ],
      departmentValue: "",
      classList:[
         {
          value: 0,
          label: "1班"
        },
        {
          value: 1,
          label: "2班"
        },
        {
          value: 2,
          label: "3班"
        },
        {
          value: 3,
          label: "4班"
        }
      ],
      classValue:"",
      emailValue:"",
      rate:"",
      //提交按钮loading
      subLoading: false,
    }
  },
  components: {
    Crumb,
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 4);
    this.$store.commit("update_system_menu_idx", 4);
  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.form.wechat_img = URL.createObjectURL(file.raw);
    },
    //上传限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传缩略图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传缩略图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          that.subLoading = false;
          that.$message({
            type: "success",
            message: "提交成功!"
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
#baobiaotuisong{
  .my-input-container{
    width: 560px;
  }
}
</style>
