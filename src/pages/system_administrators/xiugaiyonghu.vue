/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:12:59
 */


<template>
    <div id="xiugaiyonghu">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <!-- 使用说明 -->
        <Instructions :instructionsInfo="instructionsInfo"></Instructions>
        <!-- Form -->
        <div class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
                <el-form-item label="用户名：" class="form-item" prop="user_name">
                    <el-input v-model="form.uesr_name"></el-input>
                </el-form-item>
                <el-form-item label="密码：" class="form-item" prop="password">
                    <el-input v-model="form.password"></el-input>
                    <span class="site-item-info">最少6位，英文与数字或下划线组合</span>
                </el-form-item>
                <el-form-item label="输入新密码：" class="form-item" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="权限设置：" class="form-item" prop="password">
                    <div style="margin-bottom: 15px;">考勤管理
                    <el-checkbox-group v-model="kaoqinguanli">
                        <el-checkbox label="考勤数据"></el-checkbox>
                        <el-checkbox label="数据修改"></el-checkbox>
                        <el-checkbox label="考勤提醒设置"></el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <div style="margin-bottom: 15px;">课表管理
                    <el-checkbox-group v-model="kebiaoguanli">
                        <el-checkbox label="课表数据"></el-checkbox>
                        <el-checkbox label="课表上传"></el-checkbox>
                        <el-checkbox label="课时提醒"></el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <div style="margin-bottom: 15px;">信息管理
                    <el-checkbox-group v-model="xinxiguanli">
                        <el-checkbox label="报表推送"></el-checkbox>
                        <el-checkbox label="信息群发"></el-checkbox>
                        <el-checkbox label="信息推送"></el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <div style="margin-bottom: 15px;">数据报表
                    <el-checkbox-group v-model="shujubaobiao">
                        <el-checkbox label="数据报表"></el-checkbox>
                        <el-checkbox label="填报数据"></el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <div style="margin-bottom: 15px;">申请审批
                    <el-checkbox-group v-model="shenqingshenpi">
                        <el-checkbox label="请假管理"></el-checkbox>
                        <el-checkbox label="调课管理"></el-checkbox>
                        <el-checkbox label="并课管理"></el-checkbox>
                        <el-checkbox label="预约管理"></el-checkbox>
                        <el-checkbox label="申诉管理"></el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <div style="margin-bottom: 15px;">系统设置
                    <el-checkbox-group v-model="xitongshezhi">
                        <el-checkbox label="账号申请审核"></el-checkbox>
                        <el-checkbox label="用户管理"></el-checkbox>
                        <el-checkbox label="数据备份"></el-checkbox>
                        <el-checkbox label="管理日志"></el-checkbox>
                    </el-checkbox-group>
                    </div>
                </el-form-item>

                <el-form-item class="form-control-btn">
                    <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
/* 添加用户 */
export default {
  name: "AddUser",
  data() {
    return {
        kaoqinguanli:[],
        kebiaoguanli:[],
        xinxiguanli:[],
        shujubaobiao:[],
        shenqingshenpi:[],
        xitongshezhi:[],
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "权限管理",
          url: ""
        },
        {
          name: "用户管理",
          url: ""
        },
        {
          name: "修改用户",
          url: ""
        }
      ],
      //使用说明
      instructionsInfo: [
        {
          title: "标题1",
          content: "添加站点使用说明"
        },
        {
          title: "标题2",
          content: "添加站点使用说明"
        }
      ],
      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        user_name: "", //用户名
        name: "", //姓名
        subordinateDepartmentValue: "", //所属部门
        password: "", //密码
        user_group: "", //用户组
        site: "", //管理站点
        remarks: "", //备注
        open: true, //是否开启
        close_info: "" //关闭原因
      },
      //表单验证
      rules: {
        user_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        close_info: [
          {
            required: true,
            message: "请输入关闭原因",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "不能超过50个字",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{6,12}$/; //6-12位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-12位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        user_group: [
          {
            required: true,
            message: "请选择用户组",
            trigger: "change"
          }
        ],
        subordinateDepartmentValue: [
          {
            required: true,
            message: "请选择所属部门",
            trigger: "change"
          }
        ],
        site: [
          {
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ]
      },
      subordinateDepartment: [
        {
          value: 0,
          label: "党员办"
        },
        {
          value: 1,
          label: "组织人事"
        },
        {
          value: 2,
          label: "纪监审办公室"
        },
        {
          value: 3,
          label: "宣传部"
        },
        {
          value: 4,
          label: "研究生工作部"
        },
        {
          value: 5,
          label: "学生工作部"
        },
        {
          value: 6,
          label: "网络中心"
        },
        {
          value: 7,
          label: "教务处"
        },
        {
          value: 8,
          label: "招生办公室"
        },
        {
          value: 9,
          label: "科研创作处"
        },
        {
          value: 10,
          label: "外事处"
        },
        {
          value: 11,
          label: "计划财务处"
        },
        {
          value: 12,
          label: "校园建设和管理处"
        },
        {
          value: 13,
          label: "工会"
        },
        {
          value: 14,
          label: "保卫处"
        }
      ],
      user_group_list: [
        {
          value: 0,
          label: "系统超级管理员"
        },
        {
          value: 1,
          label: "分站管理员"
        },
        {
          value: 2,
          label: "编辑"
        }
      ],
      site_list: []
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          that.subLoading = false;
          that.$message({
            type: "success",
            message: "提交成功!"
          });
        } else {
          that.subLoading = false;
          that.$message.error("提交失败!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
