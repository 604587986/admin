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
        <el-form ref="form" :model="form" :rules="rules" status-icon label-width="95px" size="mini" label-position="right">
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
            <el-button  @click="searchAll()">发送至全部学生</el-button>       
          </div>
          <transition name="el-zoom-in-top">
          <el-transfer v-model="form.user" :data="studentList" :titles="['待选学生列表','接收学生列表']" :button-texts="['取消', '确认']" filterable v-show="showTransfer">
          </el-transfer>
          </transition>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="showTransfer = !showTransfer" v-html="showTransfer?'收起列表':'展开列表'" v-show="showBtn">
        </el-button>
        <span class="desc">当前已选择<b>{{form.user.length}}</b>人</span>
      </el-form-item>
        <el-form-item label="群发标题：" class="form-item" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="群发内容：" class="form-item" prop="content">
          <ueditor v-model="form.content" :config="config"></ueditor>          
        </el-form-item>
        <!-- <el-form-item label="附件：" class="form-item">
          <el-upload :file-list="fileList" action="">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...最多上传10个附件,每个附件大小10M之内</div>
            </el-upload>
        </el-form-item> -->
        <el-form-item class="form-control-btn">
          <el-button type="primary" size="large" @click="submit('form')">提交</el-button>
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
import Ueditor from "vue-ueditor-wrap";

/* 添加组件 */
export default {
  name: "AddComponent",
  data() {
    return {
      //显示隐藏
      showTransfer: false,
      showBtn: false,

      //富文本编辑器的配置

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
          name: "信息群发列表",
          url: "/pages/system_administrators/System_Administrators/xinxiqunfa"
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
      // fileList: [],

      //提交按钮loading
      // subLoading: false,
      //表单
      form: {
        user: [],
        title: "",
        content: ""
      },
      config: {
        UEDITOR_HOME_URL: "./static/ueditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%"
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      },
      //搜索到的结果
      studentList: []
    };
  },
  components: {
    Crumb,
    Ueditor
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
          if (res.data.code == 6) {
            this.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // this.$router.go(-1);
              }
            });
          } else {
            that.departmentList = res.data.category;
            that.allClass = res.data.squad;
          }
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
          if (res.data.code == 6) {
            this.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                // this.$router.go(-1);
              }
            });
          } else {
            that.showTransfer = true;
            that.showBtn = true;
            that.studentList = [];
            that.form.user = [];

            for (let i in res.data.Student) {
              that.studentList.push({
                key: res.data.Student[i].id,
                label:
                  res.data.Student[i].student_num +
                  " " +
                  res.data.Student[i].name
              });
            }
          }
        });
    },
    //选择全部
    searchAll() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/information/stu",
          params: {
            all: 1
          }
        })
        .then(function(res) {
          that.showTransfer = false;
          that.showBtn = false;
          that.studentList = [];
          that.form.user = [];
          for (let i in res.data.Student) {
            that.form.user.push(res.data.Student[i].id);
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
    submit(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that
            .$http({
              method: "post",
              url: "/Admin/information/add",
              data: {
                send_obj: that.form.user,
                title: that.form.title,
                content: that.form.content
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
            .then(res => {
              if (res.data.code == 6) {
                this.$alert(res.data.error, "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    // this.$router.go(-1);
                  }
                });
              } else if (res.data.code == 1) {
                that
                  .$confirm("发送成功, 是否返回?", "提示", {
                    confirmButtonText: "返回",
                    cancelButtonText: "继续发送",
                    type: "success"
                  })
                  .then(() => {
                    that.$router.push(
                      "/pages/system_administrators/System_Administrators/xinxiqunfa"
                    );
                  })
                  .catch(() => {});
              }
            });
        } else {
          that.$message.error("提交失败!");
          return false;
        }
      });
    },
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
  .el-transfer-panel {
    width: 250px;
  }
  .desc {
    font-size: 12px;
    color: dimgray;
  }
  .content {
    text-indent: 2em;
    padding: 0 20px;
    margin-top: 10px;
  }
  #edui1 {
    z-index: inherit !important;
  }
  #edui1_iframeholder {
    z-index: inherit !important;
  }
}
</style>
