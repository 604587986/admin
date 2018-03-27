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
                     <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedPowers">
                    <el-checkbox v-for="item in powers" :label="item.id" :key="item.id" style="width:200px">{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token.js";
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
      title: "",
      checkAll: false,
      checkedPowers: [],
      powers: [],
      isIndeterminate: true
    };
  },
  methods: {
    //请求数据的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/Role/add",
          // data: {
          //   currentPage: that.currentPaging.currentPage,
          //   pageSize: that.currentPaging.pageSize,
          //   keyword: that.searchValue
          // },
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
          that.powers = res.data;
        });
    },
    submit() {
      var that = this;
      that
        .$http({
          method: "post",
          url: "/Admin/Role/insert",
          data: {
            title: that.title,
            rules: that.checkedPowers
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
        .then(function(res) {
          if (res.data.code == 1) {
            that.$message({
              type: "success",
              message: "添加成功!",
              duration: 1000,
              onClose: function() {
                that.$router.push(
                  "/pages/system_administrators/System_Administrators/jueseliebiao"
                );
              }
            });
          } else {
            that.$message({
              type: "success",
              message: "添加失败!"
            });
          }
        });
    }
  },
  mounted: function() {
    var that = this;
    //默认请求数据加验证token是否登陆
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
        .el-checkbox {
          margin: 10px 15px 5px 0;
        }
      }
    }
  }
}
</style>
