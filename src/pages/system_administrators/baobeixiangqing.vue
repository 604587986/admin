/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:45:31
 */


<template>
  <div id="baobeixiangqing">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Form -->
    <div class="form-container" style="margin-bottom:30px">
    <div class="title" style="font-size:20px ;border-bottom:1px solid #ccc;margin-bottom:25px">申请信息</div>   
    <div class="content">
        <div class="left">
            <div class="item">申请编号</div>
            <div class="item">申请时间</div>
            <div class="item">申请人</div>
            <div class="item">申请次数</div>
            <div class="item">请假天数</div>
            <div class="item">学年学期</div>
            <div class="item">开始时间</div>
            <div class="item">结束时间</div>
            <div class="item">课程名称</div>
            <div class="item">所在班级</div>
            <div class="item">请假理由</div>
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
          name: "报备管理",
          url: ""
        },
        {
          name: "报备详情",
          url: ""
        }
      ],
      listInfo: [
        "20160926002",
        "2016-06-29 08：32",
        "张三",
        "2",
        "1",
        "2017-2018学年第一学期（两学期）",
        "第八周 周五",
        "第九周 周一",
        "工业设计导论（K210067）图形叙事（K210068",
        "14工业甲班（B2016001）",
        "教学需要，需要使用公共教室"
      ],
      approveInfo: ["李四", "待审批"]
    };
  },
  components: {
    Crumb
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
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
#baobeixiangqing {
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
