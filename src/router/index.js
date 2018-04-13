import Vue from 'vue'
import Router from 'vue-router'

//登录页
import Login from '@/pages/admin/Login'
//后台首页
import Administrators from '@/pages/administrators/Administrators'
//系统管理员后台
import System_Administrators from '@/pages/system_administrators/System_Administrators'
import Workbench from '@/pages/system_administrators/Workbench' //首页

import kaoqinshuju from '@/pages/system_administrators/kaoqinshuju'//考勤数据
import shujuxiugai from '@/pages/system_administrators/shujuxiugai'//数据修改
import dakashuju from '@/pages/system_administrators/dakashuju'//考勤数据
import kaoqintixingshezhi from '@/pages/system_administrators/kaoqintixingshezhi'//考勤提醒设置
import keshiguanli from '@/pages/system_administrators/keshiguanli'//课时管理
import keshixiangqing from '@/pages/system_administrators/keshixiangqing'//课时详情
import kebiaotixing from '@/pages/system_administrators/kebiaotixing'//课表提醒


import baobiaotuisong from '@/pages/system_administrators/baobiaotuisong'//报表推送
import baobiaoyulan from '@/pages/system_administrators/baobiaoyulan'//报表预览
import xinxituisong from '@/pages/system_administrators/xinxituisong'//信息推送
import shujubaobiao from '@/pages/system_administrators/shujubaobiao'//数据报表
import shujutianbao from '@/pages/system_administrators/shujutianbao'//数据填报
import baobiaoshujuxiugai from '@/pages/system_administrators/baobiaoshujuxiugai'//报表数据修改
import shenpishezhi from '@/pages/system_administrators/shenpishezhi'//审批设置

//课表管理
import kebiaoguanli from '@/pages/system_administrators/kebiaoguanli/kebiaoguanli'//课表管理
import kebiaoxiangqing from '@/pages/system_administrators/kebiaoguanli/kebiaoxiangqing'//课表管理
import kebiaohuishouzhan from '@/pages/system_administrators/kebiaoguanli/kebiaohuishouzhan'//课表回收站
import daorukebiao from '@/pages/system_administrators/kebiaoguanli/daorukebiao'//导入课表



//信息推送
import xinxiqunfa from '@/pages/system_administrators/xinxituisong/xinxiqunfa/xinxiqunfa'//信息群发
import xinxiqunfaxiangqing from '@/pages/system_administrators/xinxituisong/xinxiqunfa/xinxiqunfaxiangqing'//信息群发详情
import xinzengxinxiqunfa from '@/pages/system_administrators/xinxituisong/xinxiqunfa/xinzengxinxiqunfa'//新增信息群发
import xinzengjiaoshixinxiqunfa from '@/pages/system_administrators/xinxituisong/xinxiqunfa/xinzengjiaoshixinxiqunfa'//新增教师信息群发
import xinxiqunfahuishouzhan from '@/pages/system_administrators/xinxituisong/xinxiqunfa/xinxiqunfahuishouzhan'//信息群发回收站

//申请审批
import jiaoshiyuyueguanli from '@/pages/system_administrators/shenqingshenpi/jiaoshiyuyueguanli/jiaoshiyuyueguanli'//教室预约管理
import jiaoshiyuyuexiangqing from '@/pages/system_administrators/shenqingshenpi/jiaoshiyuyueguanli/jiaoshiyuyuexiangqing'//教室预约详情
import jiaoshiyuyuehuishouzhan from '@/pages/system_administrators/shenqingshenpi/jiaoshiyuyueguanli/jiaoshiyuyuehuishouzhan'//教室预约回收站
import kongjiaoshichaxun from '@/pages/system_administrators/shenqingshenpi/jiaoshiyuyueguanli/kongjiaoshichaxun'//空教室查询

import qingjiaguanli from '@/pages/system_administrators/shenqingshenpi/qingjiaguanli/qingjiaguanli'//请假管理
import qingjiaxiangqing from '@/pages/system_administrators/shenqingshenpi/qingjiaguanli/qingjiaxiangqing'//请假详情
import qingjiadayin from '@/pages/system_administrators/shenqingshenpi/qingjiaguanli/qingjiadayin'//请假打印
import qingjiahuishouzhan from '@/pages/system_administrators/shenqingshenpi/qingjiaguanli/qingjiahuishouzhan'//请假回收站
import tiaokeguanli from '@/pages/system_administrators/shenqingshenpi/tiaokeguanli/tiaokeguanli'//调课管理
import tiaokexiangqing from '@/pages/system_administrators/shenqingshenpi/tiaokeguanli/tiaokexiangqing'//调课详情
import tiaokehuishouzhan from '@/pages/system_administrators/shenqingshenpi/tiaokeguanli/tiaokehuishouzhan'//调课回收站
import bingkeguanli from '@/pages/system_administrators/shenqingshenpi/bingkeguanli/bingkeguanli'//并课管理
import bingkexiangqing from '@/pages/system_administrators/shenqingshenpi/bingkeguanli/bingkexiangqing'//并课详情
import bingkehuishouzhan from '@/pages/system_administrators/shenqingshenpi/bingkeguanli/bingkehuishouzhan'//并课回收站
import baobeiguanli from '@/pages/system_administrators/shenqingshenpi/baobeiguanli/baobeiguanli'//报备管理
import baobeixiangqing from '@/pages/system_administrators/shenqingshenpi/baobeiguanli/baobeixiangqing'//报备详情
import baobeihuishouzhan from '@/pages/system_administrators/shenqingshenpi/baobeiguanli/baobeihuishouzhan'//报备回收站
import xueshengshensuguanli from '@/pages/system_administrators/shenqingshenpi/xueshengshensuguanli/xueshengshensuguanli'//学生申诉管理
import xueshengshensuhuishouzhan from '@/pages/system_administrators/shenqingshenpi/xueshengshensuguanli/xueshengshensuhuishouzhan'//学生申诉回收站
import xueshengshensuxiangqing from '@/pages/system_administrators/shenqingshenpi/xueshengshensuguanli/xueshengshensuxiangqing'//学生申诉详情
import waichujiaoxueguanli from '@/pages/system_administrators/shenqingshenpi/waichujiaoxueguanli/waichujiaoxueguanli'//外出教学管理
import waichujiaoxuexiangqing from '@/pages/system_administrators/shenqingshenpi/waichujiaoxueguanli/waichujiaoxuexiangqing'//外出教学详情
import waichujiaoxuehuishouzhan from '@/pages/system_administrators/shenqingshenpi/waichujiaoxueguanli/waichujiaoxuehuishouzhan'//外出教学回收站




//系统设置
import zhanghaoshenhe from '@/pages/system_administrators/xitongshezhi/zhanghaoshenhe/zhanghaoshenhe'//账号审核
import yonghuguanli from '@/pages/system_administrators/xitongshezhi/yonghuguanli/yonghuguanli'//用户管理
import tianjiayonghu from '@/pages/system_administrators/xitongshezhi/yonghuguanli/tianjiayonghu'//添加用户
import xiugaiyonghu from '@/pages/system_administrators/xitongshezhi/yonghuguanli/xiugaiyonghu'//修改用户
import jueseliebiao from '@/pages/system_administrators/xitongshezhi/jueseliebiao/jueseliebiao'//角色列表
import tianjiajuesezu from '@/pages/system_administrators/xitongshezhi/jueseliebiao/tianjiajuesezu'//添加角色组
import quanxianliebiao from '@/pages/system_administrators/xitongshezhi/quanxianliebiao/quanxianliebiao'//权限列表
import tianjiaquanxian from '@/pages/system_administrators/xitongshezhi/quanxianliebiao/tianjiaquanxian'//添加权限
import bianjiquanxian from '@/pages/system_administrators/xitongshezhi/quanxianliebiao/bianjiquanxian'//编辑权限
import shujubeifen from '@/pages/system_administrators/xitongshezhi/shujubeifen/shujubeifen'//数据备份
import beifenshezhi from '@/pages/system_administrators/xitongshezhi/shujubeifen/beifenshezhi'//备份设置
import xitongrizhi from '@/pages/system_administrators/xitongshezhi/xitongrizhi/xitongrizhi'//系统日志
import rizhixiangqing from '@/pages/system_administrators/xitongshezhi/xitongrizhi/rizhixiangqing'//日志详情

//基础数据
import yuanxiliebiao from '@/pages/system_administrators/jichushuju/yuanxiliebiao/yuanxiliebiao'//院系列表
import xueshengliebiao from '@/pages/system_administrators/jichushuju/xueshengliebiao/xueshengliebiao'//学生列表
import xueshengxiangqing from '@/pages/system_administrators/jichushuju/xueshengliebiao/xueshengxiangqing'//学生详情
import daoruxueshengshuju from '@/pages/system_administrators/jichushuju/xueshengliebiao/daoruxueshengshuju'//导入学生数据
import xueshenghuishouzhan from '@/pages/system_administrators/jichushuju/xueshengliebiao/xueshenghuishouzhan'//学生回收站
import jiaoshiliebiao from '@/pages/system_administrators/jichushuju/jiaoshiliebiao/jiaoshiliebiao'//教师列表
import tianjiajiaoshi from '@/pages/system_administrators/jichushuju/jiaoshiliebiao/tianjiajiaoshi'//添加教师
import bianjijiaoshi from '@/pages/system_administrators/jichushuju/jiaoshiliebiao/bianjijiaoshi'//编辑教师
import daorujiaoshishuju from '@/pages/system_administrators/jichushuju/jiaoshiliebiao/daorujiaoshishuju'//导入教师数据
import jiaoshihuishouzhan from '@/pages/system_administrators/jichushuju/jiaoshiliebiao/jiaoshihuishouzhan'//教师回收站
import xibanshuju from '@/pages/system_administrators/jichushuju/xibanshuju/xibanshuju'//系班数据
import bianjibanji from '@/pages/system_administrators/jichushuju/xibanshuju/bianjibanji'//编辑班级
import tianjiabanji from '@/pages/system_administrators/jichushuju/xibanshuju/tianjiabanji'//添加班级
import banjihuishouzhan from '@/pages/system_administrators/jichushuju/xibanshuju/banjihuishouzhan'//班级回收站
import kechengliebiao from '@/pages/system_administrators/jichushuju/kechengliebiao/kechengliebiao'//课程列表
import bianjikecheng from '@/pages/system_administrators/jichushuju/kechengliebiao/bianjikecheng'//编辑课程
import tianjiakecheng from '@/pages/system_administrators/jichushuju/kechengliebiao/tianjiakecheng'//添加课程
import kechenghuishouzhan from '@/pages/system_administrators/jichushuju/kechengliebiao/kechenghuishouzhan'//课程回收站
import classroomList from '@/pages/system_administrators/jichushuju/classroomList/classroomList'//教室列表
import bianjiclassroom from '@/pages/system_administrators/jichushuju/classroomList/bianjiclassroom'//编辑教室
import classroomhuishouzhan from '@/pages/system_administrators/jichushuju/classroomList/classroomhuishouzhan'//教室回收站
import tianjiaclassroom from '@/pages/system_administrators/jichushuju/classroomList/tianjiaclassroom'//添加教室
import xuenianxueqi from '@/pages/system_administrators/jichushuju/xuenianxueqi/xuenianxueqi'//学年学期
import bianjixuenianxueqi from '@/pages/system_administrators/jichushuju/xuenianxueqi/bianjixuenianxueqi'//编辑学年学期
import tianjiaxuenianxueqi from '@/pages/system_administrators/jichushuju/xuenianxueqi/tianjiaxuenianxueqi'//添加学年学期
import xuenianxueqihuishouzhan from '@/pages/system_administrators/jichushuju/xuenianxueqi/xuenianxueqihuishouzhan'//学年学期回收站
import jieci from '@/pages/system_administrators/jichushuju/jieci/jieci'//节次
import tianjiajieci from '@/pages/system_administrators/jichushuju/jieci/tianjiajieci'//添加节次
import bianjijieci from '@/pages/system_administrators/jichushuju/jieci/bianjijieci'//编辑节次
import jiecihuishouzhan from '@/pages/system_administrators/jichushuju/jieci/jiecihuishouzhan'//节次回收站
import shijianduan from '@/pages/system_administrators/jichushuju/shijianduan/shijianduan'//时间段

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/pages/admin/Login',
            component: Login
        },
        {
            path: '/pages/administrators/Administrators',
            component: Administrators
        },
        {
            path: '/pages/system_administrators/System_Administrators',
            component: System_Administrators,
            children: [{
                path: '/',
                component: Workbench
            },
            {
                path: 'Workbench',
                component: Workbench
            },
            
            {//考勤管理开始
                path: 'kaoqinshuju',
                component: kaoqinshuju
            },
            {
                path: 'kaoqintixingshezhi',
                component: kaoqintixingshezhi
            },
            {
                path:"dakashuju",
                component: dakashuju                
            },
            {
                path:"shujuxiugai",
                component: shujuxiugai                
            },//考勤管理结束
            {//课表管理开始
                path: 'kebiaoguanli',
                component: kebiaoguanli
            },
            {
                path: 'kebiaohuishouzhan',
                component: kebiaohuishouzhan
            },
            {
                path: 'daorukebiao',
                component: daorukebiao
            },
            {
                path: 'kebiaoxiangqing',
                component: kebiaoxiangqing
            },
            {
                path: 'keshiguanli',
                component: keshiguanli
            },
            {
                path: 'keshixiangqing',
                component: keshixiangqing
            },
            {
                path: 'kebiaotixing',
                component: kebiaotixing
            },//课表管理结束
            {//申请审批开始
                path: 'qingjiaguanli',
                component: qingjiaguanli
            },
            {
                path: 'qingjiaxiangqing',
                component: qingjiaxiangqing
            },
            {
                path: 'qingjiadayin',
                component: qingjiadayin
            },
            {
                path: 'qingjiahuishouzhan',
                component: qingjiahuishouzhan
            },
            {
                path: 'tiaokeguanli',
                component: tiaokeguanli
            },
            {
                path: 'tiaokehuishouzhan',
                component: tiaokehuishouzhan
            },
            {
                path: 'tiaokexiangqing',
                component: tiaokexiangqing
            },
            {
                path: 'bingkeguanli',
                component: bingkeguanli
            },
            {
                path: 'bingkexiangqing',
                component: bingkexiangqing
            },
            {
                path: 'bingkehuishouzhan',
                component: bingkehuishouzhan
            },
            {
                path: 'baobeiguanli',
                component: baobeiguanli
            },
            {
                path: 'baobeixiangqing',
                component: baobeixiangqing
            },
            {
                path: 'baobeihuishouzhan',
                component: baobeihuishouzhan
            },
            {
                path: 'jiaoshiyuyueguanli',
                component: jiaoshiyuyueguanli
            },
            {
                path: 'jiaoshiyuyuehuishouzhan',
                component: jiaoshiyuyuehuishouzhan
            },
            {
                path: 'jiaoshiyuyuexiangqing',
                component: jiaoshiyuyuexiangqing
            },
            {
                path: 'kongjiaoshichaxun',
                component: kongjiaoshichaxun
            },
            {
                path: 'xueshengshensuguanli',
                component: xueshengshensuguanli
            },
            {
                path: 'xueshengshensuhuishouzhan',
                component: xueshengshensuhuishouzhan
            },
            {
                path: 'xueshengshensuxiangqing',
                component: xueshengshensuxiangqing
            },
            {
                path: 'waichujiaoxueguanli',
                component: waichujiaoxueguanli
            },
            {
                path: 'waichujiaoxuexiangqing',
                component: waichujiaoxuexiangqing
            },
            {
                path: 'waichujiaoxuehuishouzhan',
                component: waichujiaoxuehuishouzhan
            },
            {
                path: 'shenpishezhi',
                component: shenpishezhi
            },//申请审批结束
            {//信息推送开始
                path: 'baobiaotuisong',
                component: baobiaotuisong
            },
            {
                path: 'baobiaoyulan',
                component: baobiaoyulan
            },
            {
                path: 'xinxituisong',
                component: xinxituisong
            },
            {
                path: 'xinxiqunfa',
                component: xinxiqunfa
            },
            {
                path: 'xinxiqunfaxiangqing',
                component: xinxiqunfaxiangqing
            },
            {
                path: 'xinzengjiaoshixinxiqunfa',
                component: xinzengjiaoshixinxiqunfa
            },
            {
                path: 'xinxiqunfahuishouzhan',
                component: xinxiqunfahuishouzhan
            },
            {
                path: 'xinzengxinxiqunfa',
                component: xinzengxinxiqunfa
            },//信息推送结束
            {//数据报表开始
                path:'shujubaobiao',
                component:shujubaobiao
            },
            {
                path:'shujutianbao',
                component:shujutianbao
            },
            {
                path:'baobiaoshujuxiugai',
                component:baobiaoshujuxiugai
            },
            {//系统设置开始
                path:"zhanghaoshenhe",
                component:zhanghaoshenhe
            },
            {
                path:"xitongrizhi",
                component:xitongrizhi
            },
            {
                path:"rizhixiangqing",
                component:rizhixiangqing
            },
            {
                path:"yonghuguanli",
                component:yonghuguanli
            },
            {
                path:"jueseliebiao",
                component:jueseliebiao
            },
            {
                path:"tianjiajuesezu",
                component:tianjiajuesezu
            },
            {
                path:"quanxianliebiao",
                component:quanxianliebiao
            },
            {
                path:"tianjiaquanxian",
                component:tianjiaquanxian
            },
            {
                path:"bianjiquanxian",
                component:bianjiquanxian
            },
            {
                path:"tianjiayonghu",
                component:tianjiayonghu
            },
            {
                path:"xiugaiyonghu",
                component:xiugaiyonghu
            },
            {
                path:"shujubeifen",
                component:shujubeifen
            },
            {
                path:"beifenshezhi",
                component:beifenshezhi
            },
            {//基础数据开始
                path:"yuanxiliebiao",
                component:yuanxiliebiao
            },
            {
                path:"xueshengliebiao",
                component:xueshengliebiao
            },
            {
                path:"xueshengxiangqing",
                component:xueshengxiangqing
            },
            {
                path:"daoruxueshengshuju",
                component:daoruxueshengshuju
            },
            {
                path:"xueshenghuishouzhan",
                component:xueshenghuishouzhan
            },
            {
                path:"jiaoshiliebiao",
                component:jiaoshiliebiao
            },
            {
                path:"bianjijiaoshi",
                component:bianjijiaoshi
            },
            {
                path:"tianjiajiaoshi",
                component:tianjiajiaoshi
            },
            {
                path:"daorujiaoshishuju",
                component:daorujiaoshishuju
            },
            {
                path:"jiaoshihuishouzhan",
                component:jiaoshihuishouzhan
            },
            {
                path:"xibanshuju",
                component:xibanshuju
            },
            {
                path:"bianjibanji",
                component:bianjibanji
            },
            {
                path:"tianjiabanji",
                component:tianjiabanji
            },
            {
                path:"banjihuishouzhan",
                component:banjihuishouzhan
            },
            {
                path:"kechengliebiao",
                component:kechengliebiao
            },
            {
                path:"bianjikecheng",
                component:bianjikecheng
            },
            {
                path:"tianjiakecheng",
                component:tianjiakecheng
            },
            {
                path:"kechenghuishouzhan",
                component:kechenghuishouzhan
            },
            {
                path:"classroomList",
                component:classroomList
            },
            {
                path:"bianjiclassroom",
                component:bianjiclassroom
            },
            {
                path:"tianjiaclassroom",
                component:tianjiaclassroom
            },
            {
                path:"classroomhuishouzhan",
                component:classroomhuishouzhan
            },
            {
                path:"xuenianxueqi",
                component:xuenianxueqi
            },
            {
                path:"bianjixuenianxueqi",
                component:bianjixuenianxueqi
            },
            {
                path:"tianjiaxuenianxueqi",
                component:tianjiaxuenianxueqi
            },
            {
                path:"xuenianxueqihuishouzhan",
                component:xuenianxueqihuishouzhan
            },
            {
                path:"jieci",
                component:jieci
            },
            {
                path:"tianjiajieci",
                component:tianjiajieci
            },
            {
                path:"bianjijieci",
                component:bianjijieci
            },
            {
                path:"jiecihuishouzhan",
                component:jiecihuishouzhan
            },
            {
                path:"shijianduan",
                component:shijianduan
            },
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
