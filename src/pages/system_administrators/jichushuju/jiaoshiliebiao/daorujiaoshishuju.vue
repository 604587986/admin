/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="daorujiaoshishuju">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Table -->
    <div class="table-container">
      <div class="prompt">
        <p class="title">提示：</p>
        <p>请先下载模板</p>
        <a  href="/Admin/teacher/dow" ><el-button type="primary" size="mini">模板下载</el-button></a>      
      </div>
    </div>
           <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
                <el-form-item label="部门：" class="form-item" prop="category">
                    <el-select v-model="form.category" clearable placeholder="选择系" size="mini" class="float-left state-selection">
                        <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="Excel文件：" class="form-item">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="/Admin/teacher/excel"
                        :data="{'category':form.category}"
                        name="filename"
                        :on-success="success"
                        :file-list="fileList"
                        :auto-upload="false"
                        :limit='1'>
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('form')">确认上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
// import Paging from "@/components/Paging";
import { token } from "@/publicjs/token";

/* 内容管理 */
export default {
  name: "ContentManagement",
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
          name: "教师列表",
          url:
            "/pages/system_administrators/System_Administrators/jiaoshiliebiao"
        },
        {
          name: "导入教师数据",
          url: ""
        }
      ],
      //表单数据
      form: {},
      //表单验证
      rules: {
        category: [{ required: true, message: "不能为空", trigger: "blur" }],
        squad: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      //select数据
      departmentList: [],
      departmentValue: "",

      //文件列表
      fileList: []
    };
  },
  components: {
    Crumb,

    // Paging
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
    //请求数据的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/teacher/add"
        })
        .then(function(res) {
          that.departmentList = res.data;
        });
    },
   

    // 处理上传
    submitUpload(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that.$refs.upload.submit();
        } else {
          that.$message.error("上传失败!");
          return false;
        }
      });
    },
    //上传成功回调
    success(response, file, fileList) {
      var that = this;
      if (response.code == 1) {
        that.$message({
          type: "success",
          message: "提交成功!",
          duration: 1000,
          onClose(){
              that.$refs.form.resetFields();
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

.prompt {
  font-size: 14px;
  color: #606266;
  line-height: 24px;
  margin-bottom: 20px;
  .title {
    font-size: 16px;
  }
}
</style>
