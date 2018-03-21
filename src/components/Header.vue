/*
 * @Author: alex (chenzeyongjsj@163.com) 
 * @Date: 2018-01-17 18:14:52 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 15:25:14
 */

<template>
  <div id="Header">
    <div class="header-container">
      <div class="float-left header-left">
        <p class="site float-left">
          <span class="float-left">中国美术学院艺术设计学院智慧管理系统</span>
          <!-- <span class="float-left">{{site}}</span> -->
        </p>
        <!-- <p class="reception float-left">
          <router-link to="/" class="underline-hover" target="_blank">前台首页</router-link>
        </p> -->
      </div>
      <div class="float-right header-right">
        <div class="user float-left">
          <i class="iconfont icon-user float-left"></i>
          <span class="float-left header-name">欢迎您，{{user}}</span>
        </div>
        <div class="control-box float-left">
          <a href="javascript:void(0);" class="underline-hover float-left">修改密码</a>
          <i class="iconfont icon-shuxian float-left"></i>
          <a href="javascript:void(0);" class="underline-hover float-left" @click="clear_local()">退出</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: "(管理员)",
      site: "学院官网"
    };
  },
  mounted: function() {
    this.user = localStorage.getItem("headerName");
  },
  methods: {
    clear_local() {
      localStorage.clear(); //退出登录清除登录信息
      sessionStorage.setItem("system_menu_idx", 0); //退出登录清除登录信息
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config";
#Header {
  width: 100%;
  min-width: 1200px;
  background: @base-color;
  .header-container {
    width: 1200px;
    height: 36px;
    margin: 0 auto;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    .header-left {
      .site {
        span {
          display: block;
          font-size: 14px;
          color: #fff;
          line-height: 36px;
        }
      }
      .reception {
        margin-left: 50px;
        a {
          display: block;
          line-height: 36px;
          font-size: 14px;
          color: #fff;
          transition: all 0.3s;
          &:hover {
            color: @text-hover;
          }
        }
        .underline-hover:before {
          bottom: 8px;
        }
      }
    }
    .header-right {
      .user {
        float: left;
        .icon-user {
          color: #fff;
          line-height: 36px;
        }
        span {
          display: block;
          font-size: 14px;
          color: #fff;
          line-height: 36px;
          margin-left: 10px;
        }
      }
      .control-box {
        float: left;
        margin-left: 30px;
        a {
          font-size: 14px;
          line-height: 36px;
          color: #fff;
          transition: all 0.3s;
          &:hover {
            color: @text-hover;
          }
        }
        .underline-hover:before {
          bottom: 8px;
        }
        .icon-shuxian {
          line-height: 36px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
