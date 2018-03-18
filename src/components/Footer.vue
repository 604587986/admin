/*
 * @Author: alex (chenzeyongjsj@163.com) 
 * @Date: 2018-01-25 22:03:48 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-01-30 17:36:01
 */
<template>
  <div id="Footer">
    <div class="footer-container">
      <p class="float-left">站群管理系统V1.0
        <a href="javascript:void(0);" target="_blank">杭州启焕网络科技有限公司</a> ©版权所有</p>
      <div class="float-right">
        <div class="tools float-left" v-if="systemFooterShow">
          <i class="iconfont icon-wangyeshengcheng"></i>
          <a href="./page_generation.html">
            <span>网页生成</span>
          </a>
        </div>
        <div class="tools float-left" v-if="systemFooterShow">
          <i class="iconfont icon-youqinglianjie"></i>
          <a href="./friendship_link.html">
            <span>友情链接</span>
          </a>
        </div>
        <div class="tools float-left" @click="cache_open = true" v-if="systemFooterShow">
          <i class="iconfont icon-gengxinhuancun"></i>
          <span class="cache-btn">更新缓存</span>
        </div>
        <div class="tools float-left" v-if="systemFooterShow">
          <i class="iconfont icon-huishouzhan"></i>
          <a href="./recycle_bin.html">
            <span>回收站</span>
          </a>
        </div>
        <div class="tools  float-left" @click="tools_open = true">
          <i class="iconfont icon-gongjuxiang"></i>
          <span>工具箱</span>
        </div>
      </div>
      <!-- 工具箱dialog -->
      <el-dialog title="工具箱" :visible.sync="tools_open" class="tools-pop">
        <!--天气-->
        <iframe allowtransparency="true" id="weather" frameborder="0" width="180" height="36" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=1&v=0&d=1&bd=0&k=000000&f=808080&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=180&h=36&align=center"></iframe>
        <ul class="pop-tools-list">
          <li class="float-left">
            <a href="javascript:void(0);" target="_blank">
              <i class="iconfont icon-shiyongzhinan"></i>
              <p>后台使用指南</p>
            </a>
          </li>
          <li class="float-left">
            <a href="https://www.tuyitu.com/" target="_blank">
              <i class="iconfont icon-ps"></i>
              <p>在线PS处理</p>
            </a>
          </li>
          <li class="float-left">
            <a href="https://cn.office-converter.com/" target="_blank">
              <i class="iconfont icon-wendangzhuanhuan"></i>
              <p>在线文档转换</p>
            </a>
          </li>
          <li class="float-left">
            <a href="./pages/tools/jianfanzhuanhuan.html" target="_blank">
              <i class="iconfont icon-jianfanzhuanhuan"></i>
              <p>在线简繁转换</p>
            </a>
          </li>
          <li class="float-left">
            <a href="./pages/tools/daxiaoxiezhuanhuan.html" target="_blank">
              <i class="iconfont icon-daxiaoxiezhuanhuan"></i>
              <p>在线大小写转换</p>
            </a>
          </li>
          <li class="float-left">
            <a href="http://ocr.wdku.net/" target="_blank">
              <i class="iconfont icon-tuwenzhuanhuan"></i>
              <p>在线图片转文字</p>
            </a>
          </li>
        </ul>
      </el-dialog>
      <!-- 更新缓存dialog -->
      <el-dialog title="提示" :visible.sync="cache_open" class="cache-dialog">
        <p class="cache-info">是否要更新缓存?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cache_open = false">取 消</el-button>
          <el-button type="primary" @click="cache_open = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    systemFooterShow: true //系统管理员页面隐藏模块
  },
  data() {
    return {
      tools_open: false, //打开工具箱
      cache_open: false //打开缓存
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config.less";
#Footer {
  width: 100%;
  padding: 24px 0;
  .footer-container {
    width: 1200px;
    margin: 0 auto;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    p {
      font-size: 14px;
      color: @base_grey;
      a {
        color: @base_grey;
        transition: all 0.3s;
        &:hover {
          color: @text-hover;
        }
      }
    }
    .tools {
      margin-left: 15px;
      &:hover {
        > .iconfont,
        span {
          color: @text-hover;
        }
      }
      .iconfont,
      span {
        font-size: 16px;
        color: @base_grey;
        cursor: pointer;
        transition: all 0.3s;
      }
      span {
        font-size: 14px;
      }
    }
    .tools-pop {
      .el-dialog {
        width: 600px;
        .el-dialog__body {
          padding-top: 8px;
        }
      }
      #weather {
        position: absolute;
        top: 7px;
        left: 50%;
        transform: translateX(-50%);
      }
      .pop-tools-list {
        width: 100%;
        margin-top: 30px;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        li {
          width: 25%;
          height: 75px;
          text-align: center;
          margin-bottom: 20px;
          border: 1px solid transparent;
          transition: all 0.3s;
          &:hover {
            border: 1px solid #ccc;
          }
          a {
            display: block;
            width: 100%;
            height: 75px;
            position: relative;
            .iconfont {
              font-size: 30px;
              color: @base_grey;
              position: absolute;
              top: 10px;
              left: 50%;
              transform: translateX(-50%);
            }
            .icon-jianfanzhuanhuan {
              font-size: 32px;
            }
            p {
              color: @base_grey;
              font-size: 12px;
              position: absolute;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  .cache-dialog {
    .cache-info {
      font-size: 18px;
    }
    .el-dialog {
      width: 600px;
    }
  }
}
</style>
