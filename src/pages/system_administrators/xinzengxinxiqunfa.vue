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
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="my-container">
      <div class="form-container">
        <!-- 表单 -->
        <el-form ref="form" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="接收用户：" class="form-item">
          <el-input  @focus="tableFlag=true"></el-input>
        </el-form-item>
            <div class="table-container" v-show="tableFlag">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="columnListValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-left" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
          <el-table-column prop="id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="addUser()">添加</el-button>
      </div>
  </div>
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
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">预览</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
/* 添加组件 */
export default {
  name: "AddComponent",
  data() {
    return {
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
      //栏目检索
      titleSearchValue: "",
      //table的显示隐藏
      tableFlag: false,
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
      fileList: [],
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
      //表单
      form: {
        title: "", //站点名称
        code: "",
        type: "",
        gave: "",
        sort: "", //排序
        remarks: "" //备注
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请选择接收用户",
            trigger: "blur"
          },
          {
            max: 100,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请选择编码",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        gave: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ]
      },
      //编码
      code_list: [
        {
          value: 0,
          label: "UTF8"
        },
        {
          value: 1,
          label: "GBK"
        }
      ],
      type_list: [
        {
          value: 0,
          label: "组件"
        },
        {
          value: 1,
          label: "第三方组件"
        }
      ],
      //授权
      gave_list: [
        {
          value: 0,
          label: "党员办"
        },
        {
          value: 1,
          label: "组织人事"
        },
        {
          value: 2,
          label: "纪监审办公室"
        },
        {
          value: 3,
          label: "宣传部"
        },
        {
          value: 4,
          label: "研究生工作部"
        },
        {
          value: 5,
          label: "学生工作部"
        },
        {
          value: 6,
          label: "网络中心"
        },
        {
          value: 7,
          label: "教务处"
        },
        {
          value: 8,
          label: "招生办公室"
        },
        {
          value: 9,
          label: "科研创作处"
        },
        {
          value: 10,
          label: "外事处"
        },
        {
          value: 11,
          label: "计划财务处"
        },
        {
          value: 12,
          label: "校园建设和管理处"
        },
        {
          value: 13,
          label: "工会"
        },
        {
          value: 14,
          label: "保卫处"
        }
      ],
      //表格
      tableInfo: [
        {
          id: 20160926002,
          name: "张三"
        },
        {
          id: 20160926002,
          name: "张三"
        }
      ]
    };
  },
  components: {
    Crumb,
    Instructions
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
    },

    handleSelectionChange(val) {
      this.tableList = val;
      //console.log(val[0].uid)
      //this.tableInfo.splice(val.uid, 1)
      //console.log(this.tableList)
    },
    addUser() {
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
}
</style>
