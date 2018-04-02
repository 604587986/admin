/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 16:35:42
 */


<template>
  <div id="xinzengxinxiqunfa">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    
    <!-- Form -->
    <div class="my-container">
      <div class="form-container">
        <!-- 表单 -->
        <el-form ref="form" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="接收用户：" class="form-item">
         <!-- 表格筛选 -->
          <div class="table-filter" style="margin-bottom:20px">
            <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" @change='showClass'>
              <el-option v-for="item in departmentList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="classValue" clearable placeholder="选择班级" size="mini">
              <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-input placeholder="请输入关键字" v-model="searchValue" size="mini" style="display: inline-block; width:200px">
            </el-input>
            <el-button  @click="search()">搜索</el-button>       
          </div>
          <transition name="el-zoom-in-top">
          <el-transfer v-model="form.content" :data="studentList" :titles="['待选学生列表','已选列表']" filterable v-show="showTransfer">
          </el-transfer>
          </transition>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" v-show="showBtn" @click="showTransfer = !showTransfer" v-html="showTransfer?'确定':'展开列表'">
        </el-button>
      </el-form-item>
        <el-form-item label="群发标题：" class="form-item" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="群发内容：" class="form-item">
          <el-input type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="附件：" class="form-item">
          <el-upload :file-list="fileList" action="">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...最多上传10个附件,每个附件大小10M之内</div>
            </el-upload>
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" size="large" :loading="subLoading">提交</el-button>
          <el-button type="primary" size="large" :loading="subLoading">预览</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token";

/* 添加组件 */
export default {
  name: "AddComponent",
  data() {
    return {
      //显示隐藏
      showTransfer: false,
      showBtn: false,
      //checkbox的值
      tableList: [],
      //用户列表
      userList: "",

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
          name: "信息群发",
          url: ""
        },
        {
          name: "新增信息群发",
          url: ""
        }
      ],
      // select内容
      departmentList: [],
      departmentValue: "",
      allClass: [],
      classList: [],
      classValue: "",
      searchValue: "",
      fileList: [],

      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        content: []
      },
      //搜索到的结果
      studentList: [],
      //表格
      tableInfo: []
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
    sessionStorage.setItem("system_menu_idx", 4);
    this.$store.commit("update_system_menu_idx", 4);
  },
  methods: {
    //ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/information/index"
        })
        .then(function(res) {
          that.departmentList = res.data.category;
          that.allClass = res.data.squad;
        });
    },
    //筛选
    search() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/information/stu",
          params: {
            name: that.searchValue,
            faculty_id: that.departmentValue,
            grade_id: that.classValue
          }
        })
        .then(function(res) {
          that.showTransfer = true;
          that.showBtn = true;
          that.studentList = [];
          for (let i in res.data.Student) {
            that.studentList.push({
              key: res.data.Student[i].id,
              label: res.data.Student[i].student_num+' '+res.data.Student[i].name
            });
          }
        });
    },
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
    },

    handleSelectionChange(val) {
      this.tableList = val;
      //console.log(val[0].uid)
      //this.tableInfo.splice(val.uid, 1)
      //console.log(this.tableList)
    },
    addUser() {
      this.userList = "";
      this.tableList.forEach(item => {
        console.log(item);
        this.userList += item.id + "," + item.name + ";";
      });
      console.log(this.userList);

      this.tableFlag = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#xinzengxinxiqunfa {
  .my-container {
    .form-container {
      padding: 0 10px;
    }
    .table-container {
      margin-left: 95px;
    }
  }
  .el-transfer-panel{
    width: 250px
  }
}
</style>
