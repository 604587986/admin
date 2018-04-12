/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="xinxiqunfaxiangqing">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        
        <div class="detail">
            <div class="title">{{form.title}}</div>
            <div class="desc">
                <label>发送人：</label><span>{{form.name}}</span>
                <label>发送时间：</label><span>{{form.time}}</span>
                <label>发送总人数：</label><span>{{form.count_num}}</span>
                <label>已读总人数：</label><span>{{form.read_num}}</span>
            </div>
            <div class="btn">
                <el-button type="text" @click="dialogVisible = true" class="float-right">查看发送对象与已读对象</el-button>
            </div>
            <div class="content">
                <el-card class="box-card">
                    <p v-html='form.content'></p>
                </el-card>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="60%"
            >
            <div style="margin-bottom:20px" v-if="form.read_obj"><label>已读对象：</label><p>{{form.read_obj}}</p></div>
            <div style="margin-bottom:20px" v-else><label>已读对象：</label><p>暂时无人阅读</p></div>
            <div><label>发送对象：</label><p>{{form.send_obj}}</p></div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import { token } from "@/publicjs/token";

/* 添加用户 */
export default {
  name: "AddUser",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "基础数据",
          url: ""
        },
        {
          name: "信息群发列表",
          url: "/pages/system_administrators/System_Administrators/xinxiqunfa"
        },
        {
          name: "查看详情",
          url: ""
        }
      ],
      dialogVisible: false,
      //表单
      form: {}
    };
  },
  components: {
    Crumb
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
    //默认请求的ajax封装
    getData() {
      var that = this;
      that
        .$http({
          method: "get",
          url: "/Admin/information/particulars?id=" + that.$route.query.id
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
            that.form = res.data.information;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#xinxiqunfaxiangqing {
  .detail {
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
    }
    .desc {
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      margin-bottom: 20px;
      color: #606266;
      label {
        margin-left: 10px;
      }
    }
    .btn::after {
      content: " ";
      display: block;
      clear: both;
    }
    .content {
      .box-card {
        margin: 10px auto;
        text-align: justify;
        font-size: 15px;
        line-height: 30px;
      }
    }
  }
}
</style>
