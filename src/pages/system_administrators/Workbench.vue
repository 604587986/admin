/*
 * @Author: Alex chenzeyongjsj@163.com
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:46:11
 */

<template>
  <div id="Workbench">
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 工作台 -->
    <div class="quick-navigation">
      <ul>
        <li v-for="item in quick_navigation" class="float-left">
          <router-link :to="'/pages/system_administrators/System_Administrators/'+item.url">
            <!-- <i class="iconfont" :class="item.icon"></i> -->
            <p class="num">{{item.count}}</p>
            <p class="title">{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 数据概况 -->
    <div class="quick-navigation">
      <div class="title"><span>数据概况</span></div>
      
      <ul>
        <li v-for="item in data_all" class="float-left">
          <a :href="item.url">
            <!-- <i class="iconfont" :class="item.icon"></i> -->
            <p class="num">{{item.count}}</p>
            <p class="title">{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 今日数据 -->
    <div class="quick-navigation">
      <div class="title"><span>今日数据</span></div>
      
      <ul>
        <li v-for="item in today_data" class="float-left">
          <a :href="item.url">
            <!-- <i class="iconfont" :class="item.icon"></i> -->
            <p class="num">{{item.count}}</p>
            <p class="title">{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>

    <!-- 到课率 -->
    <div class="quick-navigation">
      <div class="title"><span>到课率</span></div>
      <DataChart></DataChart>
    </div>
  </div>
</template>
<script>
/* 引入组件 */
import DataChart from "@/components/DataChart";
import Crumb from "@/components/Crumb";
/* 工作台 */
export default {
  name: "Workbench",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: ""
        }
      ],
      tableLoading: true,
      tableLoading2: true,
      tableLoading3: true,
      //快捷导航
      quick_navigation: [
        {
          name: "请假待审批",
          url: "qingjiaguanli",
          count: 5
          // icon: "icon-quanxianguanli"
        },
        {
          name: "调课待审批",
          url: "tiaokeguanli",
          count: 1
          // icon: "icon-fujianguanli"
        },
        {
          name: "并课待审批",
          url: "bingkeguanli",
          count: 1
          // icon: "icon-xitongrizhi"
        },
        {
          name: "报备申请待审批",
          url: "baobeiguanli",
          count: 1
          // icon: "icon-shujubeifen"
        },
        {
          name: "预约教室待审批",
          url: "jiaoshiyuyueguanli",
          count: 2
          // icon: "icon-chakanzhandianneirong"
        },
        {
          name: "学生申诉待审批",
          url: "xueshengshensuguanli",
          count: 1
          // icon: "icon-chakanzhandianneirong"
        }
      ],
      //数据导航
      // data_display: [
      //   {
      //     name: "数据概况",
      //     classCon: true
      //   },
      //   {
      //     name: "访问量排行",
      //     classCon: false
      //   },
      //   {
      //     name: "文章数量排行",
      //     classCon: false
      //   },
      //   {
      //     name: "文章访问排行",
      //     classCon: false
      //   }
      // ],
      //数据总览
      data_all: [
        {
          name: "学生总数",
          count: 1198
        },
        {
          name: "教职工总数",
          count: 68
        },
        {
          name: "班级总数",
          count: 75
        },
        {
          name: "教师总数",
          count: 50
        }
      ],
      //今日数据
      today_data: [
        {
          name: "应到人数",
          count: 998
        },
        {
          name: "实到人数",
          count: 980
        },
        {
          name: "请假人数",
          count: 18
        },
        {
          name: "旷课人数",
          count: 1
        }
      ]
    };
  },
  components: {
    DataChart,
    Crumb
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 0);
    this.$store.commit("update_system_menu_idx", 0);
  },
  methods: {
    //切换
    data_switch: function(event, index) {
      let that = this;
      let url = null;
      for (let i = 0; i < that.data_display.length; i++) {
        that.data_display[i].classCon = false;
      }
      that.switch_control = index + 1;
      if (index == 1) {
        url = "./static/mock/accessRankings.json";
      } else if (index == 2) {
        url = "./static/mock/countRankings.json";
      } else if (index == 3) {
        url = "./static/mock/lookRankings.json";
      }
      that
        .$http({
          method: "get",
          url: url
        })
        .then(function(response) {
          if (index == 1) {
            that.accessRankings = response.data;
            setTimeout(function() {
              that.tableLoading = false;
            }, 300);
          } else if (index == 2) {
            that.countRankings = response.data;
            setTimeout(function() {
              that.tableLoading2 = false;
            }, 300);
          } else if (index == 3) {
            that.lookRankings = response.data;
            setTimeout(function() {
              that.tableLoading3 = false;
            }, 300);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      that.data_display[index].classCon = true;
      that.line_left = event.currentTarget.offsetLeft + "px";
      that.line_Width = event.currentTarget.offsetWidth + "px";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
.quick-navigation {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid @border_color;
  >.title{
    font-size: 20px;
    color: #000;
    margin-bottom: 30px;
    color: #888;
    >span{
      border-bottom: 3px solid #00a0e9;
      padding-bottom: 10px;
      line-height: 10px;
    }
  }
  ul {
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    li {
      margin-right: 18px;
      margin-bottom: 10px;
      &:last-of-type {
        margin-right: 0;
      }
      &:hover {
        a {
          transform: scale(1.1) translateZ(0);
        }
      }
      a {
        display: block;
        width: 172px;
        height: 100px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid @border_color;
        position: relative;
        transition: all 0.3s;
        .iconfont {
          color: @base-color2;
          font-size: 40px;
          position: absolute;
          left: 50%;
          top: 35%;
          transform: translate(-50%, -50%);
        }
        .icon-quanxianguanli {
          font-size: 38px;
        }
        .icon-shujubeifen {
          font-size: 38px;
        }
        .icon-fujianguanli {
          font-size: 33px;
        }
        .icon-xitongrizhi {
          font-size: 44px;
        }
        .num {
          font-size: 25px;
          font-weight: 700;
          margin-top: 10px;
          color: #00a0e9;
        }
        .title {
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          color: @base_grey;
          white-space: nowrap;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
