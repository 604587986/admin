<template>
  <div id="Header">
    <div class="header-container">
      <div class="nav-logo float-left">
        <router-link to="/">
          <img src="static/img/logo2.png" alt="">
        </router-link>
      </div>
      <div class="float-left header-left">
        <p class="site float-left">
          <span class="float-left">中国美术学院艺术设计学院智慧管理系统</span>
          <!-- <span class="float-left">{{site}}</span> -->
        </p>
        <!-- <p class="reception float-left">
          <router-link to="/" class="underline-hover" target="_blank">前台首页</router-link>
        </p> -->
      </div>
      <div class="float-right header-right" v-if="user">
        <div class="user float-left">
          <i class="iconfont icon-user float-left"></i>
          <span class="float-left header-name">欢迎您，{{user}}</span>
        </div>
        <div class="control-box float-left">
          <router-link :to="{path:'/pages/system_administrators/System_Administrators/xiugaiyonghu',query:{id:id}}"><span class="underline-hover float-left">修改密码</span></router-link>
          <a href="javascript:void(0);"></a>
          <i class="iconfont icon-shuxian float-left"></i>
          <a href="javascript:void(0);" class="underline-hover float-left" @click="clear_local()">退出</a>
        </div>
      </div>
      <div class="float-right header-right" v-else>
        <div class="user float-left">
          <router-link to="/pages/system_administrators/System_Administrators/login"><span class="float-left header-name">登录</span></router-link>
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
      user: "",
      id: window.localStorage.getItem("id")
    };
  },
  mounted: function() {
    this.user = localStorage.getItem("headerName");
  },
  methods: {
    clear_local() {
      this.$http({
        method: "get",
        url: "/Admin/Login/logout"
      }).then(res => {
        localStorage.clear(); //退出登录清除登录信息
        sessionStorage.setItem("system_menu_idx", 0); //退出登录清除登录信息
        this.$router.push({ path: "/" });
      });
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
    height: 57px;
    margin: 0 auto;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    .nav-logo {
      width: 110px;
      height: 35px;
      margin-top: 11px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header-left {
      .site {
        span {
          display: block;
          font-size: 14px;
          color: #fff;
          line-height: 57px;
          margin-left: 64px;
          cursor: pointer;
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
          line-height: 57px;
        }
        span {
          display: block;
          font-size: 14px;
          color: #fff;
          line-height: 57px;
          margin-left: 10px;
        }
      }
      .control-box {
        float: left;
        margin-left: 30px;
        a {
          font-size: 14px;
          line-height: 57px;
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
          line-height: 57px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>