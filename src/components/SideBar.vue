/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 14:35:20 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 18:27:03
 */

<template>
  <div id="SideBar" class="float-left">
    <ul class="side-ul">
      <li v-for="(item,index) in side_bar" :key="item.id" :class="{'li-active':item.column_open}">
        <div class="menu-link-container" @click="open_column(index)">
          <i class="iconfont float-left" :class="item.column_icon"></i>
          <span class="side-text float-left">{{item.first_class_column_name}}</span>
          <i class="iconfont icon-down"></i>
        </div>
        <ol>
          <li v-for="(list,index) in item.second_class_column" :key="list.id">
            <router-link :to="'/pages/system_administrators/System_Administrators/'+list.column_url" class="side-click" active-class="menu-active">{{list.column_name}}</router-link>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      side_bar: [
        {
          first_class_column_name: "工作台",
          first_class_column_url: "Workbench",
          column_icon: "icon-gongzuotai",
          column_open: false,
          no_second: true,
          second_class_column: []
        },
        {
          first_class_column_name: "考勤管理",
          first_class_column_url: "",
          column_icon: "icon-kaoqinguanli",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "考勤数据",
              column_url: "kaoqinshuju",
              column_active: false
            },
            {
              column_name: "考勤提醒设置",
              column_url: "kaoqintixingshezhi",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "课表管理",
          first_class_column_url: "",
          column_icon: "icon-kebiaoguanli",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "课表管理",
              column_url: "kebiaoguanli",
              column_active: false
            },
            {
              column_name: "课表上传",
              column_url: "kebiaoshangchuan",
              column_active: false
            },
            {
              column_name: "课时管理",
              column_url: "keshiguanli",
              column_active: false
            },
            {
              column_name: "课表提醒",
              column_url: "kebiaotixing",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "门禁管理",
          first_class_column_url: "",
          column_icon: "icon-menjinguanli",
          column_open: false,
          no_second: false
        },
        {
          first_class_column_name: "信息推送",
          first_class_column_url: "",
          column_icon: "icon-wangzhanmoban",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "报表推送",
              column_url: "baobiaotuisong",
              column_active: false
            },
            {
              column_name: "信息群发",
              column_url: "xinxiqunfa",
              column_active: false
            },
            {
              column_name: "信息推送",
              column_url: "xinxituisong",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "数据报表",
          first_class_column_url: "",
          column_icon: "icon-shujubaobiao",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "数据报表",
              column_url: "shujubaobiao",
              column_active: false
            },
            {
              column_name: "数据填报",
              column_url: "shujutianbao",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "申请审批",
          first_class_column_url: "",
          column_icon: "icon-shenqingshenpi",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "请假管理",
              column_url: "qingjiaguanli",
              column_active: false
            },
            {
              column_name: "调课管理",
              column_url: "tiaokeguanli",
              column_active: false
            },
            {
              column_name: "并课管理",
              column_url: "bingkeguanli",
              column_active: false
            },
            {
              column_name: "报备管理",
              column_url: "baobeiguanli",
              column_active: false
            },
            {
              column_name: "教室预约管理",
              column_url: "jiaoshiyuyueguanli",
              column_active: false
            },
            {
              column_name: "学生申诉管理",
              column_url: "xueshengshensuguanli",
              column_active: false
            },
            {
              column_name: "外出教学管理",
              column_url: "waichujiaoxueguanli",
              column_active: false
            },
            {
              column_name: "审批设置",
              column_url: "shenpishezhi",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "系统设置",
          first_class_column_url: "",
          column_icon: "icon-xitongshezhi",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "账号审核",
              column_url: "zhanghaoshenhe",
              column_active: false
            },
            {
              column_name: "用户管理",
              column_url: "yonghuguanli",
              column_active: false
            },
            {
              column_name: "角色列表",
              column_url: "jueseliebiao",
              column_active: false
            },
            {
              column_name: "权限列表",
              column_url: "quanxianliebiao",
              column_active: false
            },
            {
              column_name: "添加权限",
              column_url: "tianjiaquanxian",
              column_active: false
            },
            {
              column_name: "数据备份",
              column_url: "shujubeifen",
              column_active: false
            },
            {
              column_name: "系统日志",
              column_url: "xitongrizhi",
              column_active: false
            }
          ]
        },
        {
           first_class_column_name: "基础数据",
          first_class_column_url: "",
          column_icon: "icon-jichushuju",
          column_open: false,
          no_second: false,
           second_class_column: [
            {
              column_name: "学生列表",
              column_url: "xueshengliebiao",
              column_active: false
            },
            {
              column_name: "教师列表",
              column_url: "jiaoshiliebiao",
              column_active: false
            },
            {
              column_name: "系班数据",
              column_url: "xibanshuju",
              column_active: false
            },
            {
              column_name: "课程列表",
              column_url: "kechengliebiao",
              column_active: false
            }
          ]
        }
      ],
      menu_idx: 0 //导航定位
    };
  },
  watch: {
    update_system_menu_idx(newVal, oldVal) {
      for (let obj of this.side_bar) {
        obj.column_open = false;
      }
      this.side_bar[newVal].column_open = true; //定位导航
    }
  },
  computed: {
    update_system_menu_idx() {
      return this.$store.state.system_menu_idx;
    }
  },
  mounted: function() {
    //定位导航
    if (sessionStorage.getItem("system_menu_idx")) {
      this.menu_idx = sessionStorage.getItem("system_menu_idx");
      this.side_bar[this.menu_idx].column_open = true;
    }
  },
  methods: {
    open_column: function(index) {
      for (let obj of this.side_bar) {
        //obj.column_open = false;
      }
      if (index == 0) {
        this.$router.push({
          path: "/pages/system_administrators/System_Administrators/Workbench"
        });
      }
      this.side_bar[index].column_open = !this.side_bar[index].column_open; //展开栏目
      sessionStorage.setItem("system_menu_idx", index); //将导航idx存入sessionStorage数据库
      this.$store.commit("update_system_menu_idx", index); //更新vuex
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config";
#SideBar {
  width: 163px;
  background: #fff;
  border-radius: 3px;
  .side-ul {
    width: 100%;
    padding: 10px 0;
    overflow: hidden;
    > li {
      width: 100%;
      &:first-of-type {
        .icon-down {
          display: none;
        }
      }
      &:hover {
        .menu-link-container {
          background: #dff2fc;
          &::before {
            left: 0;
          }
        }
      }
      .menu-link-container {
        display: block;
        width: 100%;
        height: 40px;
        padding-left: 20px;
        position: relative;
        background: #fff;
        transition: all 0.3s;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          left: -6px;
          top: 0;
          display: block;
          width: 6px;
          height: 100%;
          background: @base-color2;
          transition: all 0.3s;
        }
        .iconfont,
        span {
          line-height: 40px;
          color: @base_grey;
          font-size: 16px;
          position: relative;
          z-index: 10;
        }
        .icon-fujianguanli {
          font-size: 14px;
        }
        .icon-down {
          position: absolute;
          right: 26px;
          transition: all 0.3s;
        }
        .side-text {
          margin-left: 10px;
        }
      }
      > ol {
        width: 100%;
        > li {
          width: 100%;
          height: 0;
          overflow: hidden;
          transition: all 0.3s;
          .side-click {
            display: block;
            width: 100%;
            line-height: 38px;
            font-size: 14px;
            padding-left: 20px;
            color: @base_grey;
            transition: all 0.3s;
            &:hover {
              color: @base-color2;
            }
          }
        }
        .router-link-exact-active.menu-active {
          color: @base-color2;
        }
      }
    }
    .li-active {
      .menu-link-container {
        background: #dff2fc;
        &::before {
          left: 0;
        }
        .icon-down {
          transform: rotateZ(180deg);
        }
      }
      > ol {

        > li {
          height: 38px;
        }
      }
    }
  }
}
</style>
