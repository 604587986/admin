/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:45:31
 */


<template>
  <div id="waichujiaoxuexiangqing">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title" style="font-size:20px ;border-bottom:1px solid #ccc;margin-bottom:25px">申请信息</div>   
    <div class="content">
        <div class="left">
            <div class="item">申请编号</div>
            <div class="item">申请时间</div>
            <div class="item">申请人</div>
            <div class="item">申请次数</div>
            <div class="item">学年学期</div>
            <div class="item">原上课时间</div>
            <div class="item">原课程名称</div>
            <div class="item">上课班级</div>
            <div class="item">申请理由</div>
        </div>
        <div class="right">
            <div class="item" v-for="item in listInfo">{{item}}</div>
        </div>
    </div>           
    </div>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title" style="font-size:20px ;border-bottom:1px solid #ccc;margin-bottom:25px">附件信息</div>   
        <el-table>
            <el-table-column
                prop="date"
                label="序号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                label="附件名称"
                width="250">
            </el-table-column>
            <el-table-column
                prop="name"
                label="下载"
                width="180">
                <div slot-scope="scope">
                    <el-button>下载</el-button>
                </div>
            </el-table-column>
      </el-table>         
    </div>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title" style="font-size:20px ;border-bottom:1px solid #ccc;margin-bottom:25px">审核信息</div>  
        <div class="content">
        <div class="left">
            <div class="item">审批人</div>
            <div class="item">审批状态</div>
        </div>
        <div class="right">
            <div class="item">{{approveInfo[0]}}</div>
            <div class="item">
                <el-tag>{{approveInfo[1]}}</el-tag>
            </div>
        </div>
    </div>             
    </div>
    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title" style="font-size:20px ;border-bottom:1px solid #ccc;margin-bottom:25px">审批操作</div>  
    <el-button type="primary">通过</el-button>            
    <el-button type="danger">驳回</el-button>            
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
/* 添加站点 */
export default {
  name: "AddSite",
  data() {
    return {
      //

      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "申请审批",
          url: ""
        },
        {
          name: "外出教学管理",
          url: ""
        },
        {
          name: "查看详情",
          url: ""
        }
      ],
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
      listInfo: [
        "20160926002",
        "2016-06-29 08：32",
        "张三（工号：20154101）",
        "2",
        "2017-2018学年第一学期",
        "第八周 周五 1，2节",
        "工业设计导论（K210067）",        
        "14工业甲班（B2016001）,14工业乙班（B2016002）",
        "教学需要，需要在某某公司现场观摩",
      ],
      approveInfo: ["李四", "待审批"]
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
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
#waichujiaoxuexiangqing {
  .form-container {
    font-size: 14px;
    .content {
      display: flex;
      .left {
        flex: 0 0 120px;
        line-height: 40px;
      }
      .right {
        line-height: 40px;
        flex: 1;
      }
    }
  }
}
</style>
