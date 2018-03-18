/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:40:59
 */


<template>
  <div id="kebiaoshangchuan">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <div class="prompt">
        <p class="title">提示：</p>
        <p>1.请先下载标准EXCEL模板，按格式进行填写课程。</p>
        <p>2.课表上传后可在课表管理进行编辑修改。</p>
      <el-button size="large" type="primary">模板下载</el-button>        
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="选择班级：">
                    <el-select v-model="columnListValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="上传文件：">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
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
import Instructions from "@/components/Instructions";
/* 添加附件 */
export default {
  name: "DataBackup",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "课表管理",
          url: ""
        },
        {
          name: "课表上传",
          url: ""
        }
      ],
            //选择栏目
      columnList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      columnListValue: "",
      //使用说明
      instructionsInfo: [
        {
          title: "标题1",
          content: "添加站点使用说明"
        },
        {
          title: "标题2",
          content: "添加站点使用说明"
        }
      ],
      //提交按钮loading
      subLoading: false,
      form: {
        title: "",
        format: ""
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            min: 1,
            //max: 5,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        format: [
          {
            required: true,
            message: "请选择格式",
            trigger: "change"
          }
        ]
      },
      //upload
      fileList: []
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
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
    },
    //upload
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
#kebiaoshangchuan {
  .prompt {
    font-size: 14px;
    color: @text-color;
    line-height: 24px;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
    }
  }
}
</style>
