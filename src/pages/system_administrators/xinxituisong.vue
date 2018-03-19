/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:45:31
 */


<template>
  <div id="xinxituisong">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title">课表提醒设置</div>              
      <!-- 表单 -->
    <el-form ref="form" label-width="250px" size="mini" label-position="right">
        <el-form-item label="课程变动或提醒信息发送方式：" >
          <el-checkbox-group v-model="timetableType">
            <el-checkbox label="邮件"></el-checkbox>
            <el-checkbox label="短信"></el-checkbox>
            <el-checkbox label="微信"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发送频率：">
             <el-radio-group v-model="timetableRate">
                <el-radio label="每日"></el-radio>
                <el-radio label="每周"></el-radio>
                <el-radio label="每月"></el-radio>
          </el-radio-group> 
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title">课程提醒设置</div>              
      <!-- 表单 -->
      <el-form ref="form" label-width="250px" size="mini" label-position="right">
        <el-form-item label="选择提醒课程：" >
          <el-select v-model="departmentValue_course" clearable placeholder="请选择系" size="mini">
            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="courseValue" clearable placeholder="请选择课程" size="mini">
            <el-option v-for="item in courseList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到课率低于多少提醒：" class="my-input-container">
          <el-input v-model="form.describe" type="text" :rows="2" placeholder="请输入百分比"></el-input>
        </el-form-item>
         <el-form-item label="提醒信息发送方式：" >
          <el-checkbox-group v-model="courseType">
            <el-checkbox label="邮件"></el-checkbox>
            <el-checkbox label="短信"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发送频率：">
             <el-radio-group v-model="courseRate">
                <el-radio label="每日"></el-radio>
                <el-radio label="每周"></el-radio>
                <el-radio label="每月"></el-radio>
          </el-radio-group> 
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title">学生提醒设置</div>              
      <!-- 表单 -->
      <el-form ref="form" label-width="250px" size="mini" label-position="right">
        <el-form-item label="选择系/班级：" >
          <el-select v-model="departmentValue_student" clearable placeholder="请选择系" size="mini">
            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="classValue" clearable placeholder="请选择班级" size="mini">
            <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="旷课多少节进行提醒："  class="my-input-container">
          <el-input v-model="form.describe" type="number" :rows="2" placeholder="请输入数字"></el-input>
        </el-form-item>
                 <el-form-item label="提醒信息发送方式：" >
          <el-checkbox-group v-model="studentType">
            <el-checkbox label="邮件"></el-checkbox>
            <el-checkbox label="短信"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发送频率：">
             <el-radio-group v-model="studentRate">
                <el-radio label="每日"></el-radio>
                <el-radio label="每周"></el-radio>
                <el-radio label="每月"></el-radio>
          </el-radio-group> 
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
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
          name: "信息推送",
          url: ""
        }
      ],
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
      departmentValue_course: "",
      departmentValue_student: "",
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
      courseList:[
        {
          value: 0,
          label: "课程一"
        },
        {
          value: 1,
          label: "课程二"
        },
        {
          value: 2,
          label: "课程三"
        },
        {
          value: 3,
          label: "课程四"
        }
      ],
      courseValue:"",
      timetableType:[],
      timetableRate:"",
      courseType:[],
      courseRate:"",
      studentType:[],
      studentRate:"",
      
      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        type: "",
        title: "", //站点名称
        categoryValue: "", //所属类别
        subordinateDepartmentValue: "", //所属部门
        code: "", //编码
        alias: "", //别名
        domain_name: "", //域名
        siteAdministratorValue: "", //站点管理员
        keyword: "", //网站关键字
        describe: "", //网站描述
        access_statistics_code: "", //访问统计代码
        footer_info: "", //底部信息
        wechat_img: "", //微信公众号二维码
        weibo_img: "", //新浪微博二维码
        sort: "", //排序
        remarks: "", //备注
        open: true, //是否开启
        close_info: "系统维护 暂时关闭" //关闭原因
      },


    };
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
#xinxituisong {
  .title {
    font-size: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 25px;
    padding-bottom: 16px;
    color: #606266;    
  }
  .my-input-container {
    width: 610px;
  }
}
</style>
