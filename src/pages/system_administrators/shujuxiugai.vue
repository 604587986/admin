<template>
  <div id="shujuxiugai">
          <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 提示 -->
       <div class="prompt">
        <p class="title">提示：</p>
        <p>1.任课老师只有一次修改数据机会，提交后将不能修改数据；</p>
        <p>2.如果提交后又误请联系系统管理员。</p>
      </div>
        <div class="detail">
            <div class="item">
                <label>上课时间：</label><span>2016-06-29 10：00-12：00</span>
            </div>
            <div class="item">
                <label>上课地点：</label><span>11号楼</span>
            </div>
            <div class="item">
                <label>课程：</label><span>社会实践</span>
            </div>
            <div class="item">
                <label>所属系：</label><span>工业设计系</span>
            </div>
            <div class="item">
                <label>所属班级：</label><span>14工业甲班</span>
            </div>
            <div class="item">
                <label>老师：</label><span>周波</span>
            </div>
            <div class="item">
                <label>应到人数：</label><input type="text">
            </div>
            <div class="item">
                <label>实到人数：</label><input type="text">
            </div>
            <div class="item">
                <label>请假人数：</label><input type="text">
            </div>
            <div class="item">
                <label></label><el-button  type="primary">提交修改</el-button>
            </div>
        </div>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
export default {
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "考勤管理",
          url: ""
        },
        {
          name: "考勤数据",
          url: ""
        },
        {
          name: "数据修改",
          url: ""
        }
      ]
    };
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
@import "../../assets/css/less_config.less";
#shujuxiugai {
  .prompt {
    font-size: 14px;
    color: @text-color;
    line-height: 24px;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
    }
  }
  .detail{
      .item{
          margin-bottom: 10px;
          font-size: 14px;
          label{
              text-align: right;
              display: inline-block;
              width: 100px;
              margin-right: 20px;
          }
          span{

          }
          input{
              border: 1px solid #eee;
              padding: 2px 5px;;
          }
          button{
          }
      }
  }
}
</style>

