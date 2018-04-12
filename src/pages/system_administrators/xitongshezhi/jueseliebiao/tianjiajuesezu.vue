<template>
  <div id="tianjiaquanxianzu">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <div class="form-container">
          <el-form ref="form" :model="form" label-width="100px" :rules="rules"  class="form-box">
            <el-form-item label="标题：" style="width:400px" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="权限：">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="form.checkedPowers"  @change="handleCheckedPowersChange">
                <el-checkbox v-for="item in powers" :label="item.id" :key="item.id" style="width:200px;margin-left:0">{{item.title}}</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <el-button size="small" type="primary" @click="submit('form')">提交</el-button>
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
          name: "角色列表",
          url: "/pages/system_administrators/System_Administrators/jueseliebiao"
        },
        {
          name: "添加角色组",
          url: ""
        }
      ],
      form: {
        title: "",
        checkedPowers: []
      },
      checkAll: false,
      powers: [],
      isIndeterminate: false,
      allPowers: [],
      //表单验证规则
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
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
          if (res.data.code == 6) {
            that.$alert(res.data.error, "提示", {
              confirmButtonText: "确定",
              callback: () => {
                that.$router.go(-1);
              }
            });
          } else {
            that.powers = res.data;
            for (let i in that.powers) {
              that.allPowers.push(that.powers[i].id);
            }
          }
        });
    },
    submit(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          that
            .$http({
              method: "post",
              url: "/Admin/Role/insert",
              data: {
                title: that.form.title,
                rules: that.form.checkedPowers
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
                that.$alert("请至少选择一种权限", "添加失败", {
                  confirmButtonText: "确定",
                  type: "warning"
                });
              }
            });
        }
      });
    },
    // 处理全选
    handleCheckAllChange(val) {
      this.form.checkedPowers = val ? this.allPowers : [];

      this.isIndeterminate = false;
    },
    handleCheckedPowersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allPowers.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allPowers.length;
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
