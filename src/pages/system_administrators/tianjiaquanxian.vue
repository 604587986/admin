<template>
  <div id="tianjiaquanxian">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <div class="wrapper">
            <div class="item">
                <div class="left">权限名称</div>
                <div class="right"><input type="text" v-model="form.name"><span>(如：User/index)</span></div>
            </div>
            <div class="item">
                <div class="left">权限标题</div>
                <div class="right"><input type="text" v-model="form.title"><span>(如：查看日志)</span></div>
            </div>
            <div class="item">
                <div class="left">控制器</div>
                <div class="right"><input type="text" v-model="form.controller"><span>(如：User)</span></div>
            </div>
            <div class="item">
                <div class="left">状态</div>
                <div class="right"><input type="text"  v-model="form.state" disabled><span>初始状态未避免访问受限，只允许设为禁用！  请先 获取权限，再设为有效！</span></div>
            </div>
        </div>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
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
          name: "系统设置",
          url: ""
        },
        {
          name: "添加权限",
          url: ""
        }
      ],
      form:{
          name:'',
          title:'',
          controller:'',
          state:'禁用'
      }
    };
  },
  methods:{
      submit(){
          console.log(this.form);
          
      }
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
#tianjiaquanxian{
    .wrapper{
        color: #606266;
        .item{
            display: flex;
            height: 60px;
            .left{
                width: 200px;
                text-align: center;
                margin-top: 6px;
            }
            .right{
                flex:1;
                input{
                    border: 1px solid #888;
                    padding: 5px 10px;
                }
                span{
                    margin-left: 10px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
