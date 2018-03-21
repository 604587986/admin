<template>
  <div id="tianjiaquanxianzu">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <div class="wrapper">
            <div class="item">
                <div class="left">标题</div>
                <div class="right"><input type="text" v-model="title"></div>
            </div>
            <div class="item">
                <div class="left">权限</div>
                <div class="right">
                     <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedPowers" @change="handleCheckedPowersChange">
                    <el-checkbox v-for="power in powers" :label="power" :key="power">{{power}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
const powerOptions = ["查看权限列表", "添加权限信息", "编辑权限信息", "查看角色列表","添加角色信息","查看后台用户列表","添加后台用户信息","编辑后台用户信息","删除后台用户信息","查看网站站点信息","编辑网站站点信息","查看备份数据","添加备份数据","查看操作日志"];
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
          name: "添加角色组",
          url: ""
        }
      ],
      title:'',
      checkAll: false,
      checkedPowers: [],
      powers: powerOptions,
      isIndeterminate: true
    };
  },
  methods: {
    submit() {
      console.log(this.checkedPowers);
    },
    handleCheckAllChange(val) {
      this.checkedPowers = val ? powerOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedPowersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.powers.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.powers.length;
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
#tianjiaquanxianzu {
    padding-bottom: 50px;
  .wrapper {
    color: #606266;
    .item {
      display: flex;
      .left {
        width: 200px;
        text-align: center;
        margin-top: 6px;
      }
      .right {
        flex: 1;
        input {
          border: 1px solid #888;
          padding: 5px 10px;
        }
        .el-checkbox{
          margin: 10px 15px 5px 0;
        }
      }
    }
  }
}
</style>
