import Vue from 'vue'
import Router from 'vue-router'
//前台首页
import Home from '@/pages/index/Home'
import Search from '@/pages/index/Search' //前台搜索页
import Rank from '@/pages/index/Rank' //前台排行榜页
//登录页
import Login from '@/pages/admin/Login'
//后台首页
import Administrators from '@/pages/administrators/Administrators'
//系统管理员后台
import System_Administrators from '@/pages/system_administrators/System_Administrators'
import Workbench from '@/pages/system_administrators/Workbench' //首页

import qingjiaguanli from '@/pages/system_administrators/qingjiaguanli'//请假管理
import qingjiaxiangqing from '@/pages/system_administrators/qingjiaxiangqing'//请假详情
import tiaokeguanli from '@/pages/system_administrators/tiaokeguanli'//调课管理
import tiaokexiangqing from '@/pages/system_administrators/tiaokexiangqing'//调课详情
import kaoqinshuju from '@/pages/system_administrators/kaoqinshuju'//考勤数据
import dakashuju from '@/pages/system_administrators/dakashuju'//考勤数据
import kaoqintixingshezhi from '@/pages/system_administrators/kaoqintixingshezhi'//考勤提醒设置
import kebiaoguanli from '@/pages/system_administrators/kebiaoguanli'//课表管理
import kebiaoshangchuan from '@/pages/system_administrators/kebiaoshangchuan'//课表上传
import kebiaochakan from '@/pages/system_administrators/kebiaochakan'//课表查看
import keshiguanli from '@/pages/system_administrators/keshiguanli'//课时管理
import keshixiangqing from '@/pages/system_administrators/keshixiangqing'//课时详情
import kebiaotixing from '@/pages/system_administrators/kebiaotixing'//课表提醒
import bingkeguanli from '@/pages/system_administrators/bingkeguanli'//并课管理
import bingkexiangqing from '@/pages/system_administrators/bingkexiangqing'//并课详情
import baobeiguanli from '@/pages/system_administrators/baobeiguanli'//报备管理
import baobeixiangqing from '@/pages/system_administrators/baobeixiangqing'//报备详情
import jiaoshiyuyueguanli from '@/pages/system_administrators/jiaoshiyuyueguanli'//教室预约管理
import jiaoshiyuyuexiangqing from '@/pages/system_administrators/jiaoshiyuyuexiangqing'//教室预约详情
import kongjiaoshichaxun from '@/pages/system_administrators/kongjiaoshichaxun'//空教室查询
import xueshengshensuguanli from '@/pages/system_administrators/xueshengshensuguanli'//学生申诉管理
import shensuxiangqing from '@/pages/system_administrators/shensuxiangqing'//申诉详情
import waichujiaoxueguanli from '@/pages/system_administrators/waichujiaoxueguanli'//外出教学管理
import waichujiaoxuexiangqing from '@/pages/system_administrators/waichujiaoxuexiangqing'//外出教学详情
import baobiaotuisong from '@/pages/system_administrators/baobiaotuisong'//报表推送
import baobiaoyulan from '@/pages/system_administrators/baobiaoyulan'//报表预览
import xinxituisong from '@/pages/system_administrators/xinxituisong'//信息推送
import xinxiqunfa from '@/pages/system_administrators/xinxiqunfa'//信息群发
import shujubaobiao from '@/pages/system_administrators/shujubaobiao'//数据报表
import xinzengxinxiqunfa from '@/pages/system_administrators/xinzengxinxiqunfa'//新增信息群发
import shujutianbao from '@/pages/system_administrators/shujutianbao'//数据填报
import baobiaoshujuxiugai from '@/pages/system_administrators/baobiaoshujuxiugai'//报表数据修改
import shenpishezhi from '@/pages/system_administrators/shenpishezhi'//审批设置
import zhanghaoshenhe from '@/pages/system_administrators/zhanghaoshenhe'//账号审核
import xitongrizhi from '@/pages/system_administrators/xitongrizhi'//系统日志
import yonghuguanli from '@/pages/system_administrators/yonghuguanli'//用户管理
import jueseliebiao from '@/pages/system_administrators/jueseliebiao'//角色列表
import tianjiajuesezu from '@/pages/system_administrators/tianjiajuesezu'//添加角色组
import quanxianliebiao from '@/pages/system_administrators/quanxianliebiao'//权限列表
import tianjiaquanxian from '@/pages/system_administrators/tianjiaquanxian'//添加权限
import tianjiayonghu from '@/pages/system_administrators/tianjiayonghu'//添加用户
import xiugaiyonghu from '@/pages/system_administrators/xiugaiyonghu'//修改用户
import shujubeifen from '@/pages/system_administrators/shujubeifen'//数据备份
import beifenshezhi from '@/pages/system_administrators/beifenshezhi'//备份设置
import shujuxiugai from '@/pages/system_administrators/shujuxiugai'//数据修改
import yuanxiliebiao from '@/pages/system_administrators/yuanxiliebiao'//院系列表
import xueshengliebiao from '@/pages/system_administrators/xueshengliebiao'//学生列表
import jiaoshiliebiao from '@/pages/system_administrators/jiaoshiliebiao'//教师列表
import xibanshuju from '@/pages/system_administrators/xibanshuju'//系班数据
import kechengliebiao from '@/pages/system_administrators/kechengliebiao'//课程列表
import classroomList from '@/pages/system_administrators/classroomList'//教室列表
import xuenianxueqi from '@/pages/system_administrators/xuenianxueqi'//学年学期
import jieci from '@/pages/system_administrators/jieci'//节次
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/pages/index/Home',
            component: Home
        },
        {
            path: '/pages/index/Search',
            component: Search
        },
        {
            path: '/pages/index/Rank',
            component: Rank
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
            },{
                path: 'kebiaoshangchuan',
                component: kebiaoshangchuan
            },
            {
                path: 'kebiaochakan',
                component: kebiaochakan
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
                path: 'tiaokeguanli',
                component: tiaokeguanli
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
                path: 'baobeiguanli',
                component: baobeiguanli
            },
            {
                path: 'baobeixiangqing',
                component: baobeixiangqing
            },
            {
                path: 'jiaoshiyuyueguanli',
                component: jiaoshiyuyueguanli
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
                path: 'shensuxiangqing',
                component: shensuxiangqing
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
                path:"jiaoshiliebiao",
                component:jiaoshiliebiao
            },
            {
                path:"xibanshuju",
                component:xibanshuju
            },
            {
                path:"kechengliebiao",
                component:kechengliebiao
            },
            {
                path:"classroomList",
                component:classroomList
            },
            {
                path:"xuenianxueqi",
                component:xuenianxueqi
            },
            {
                path:"jieci",
                component:jieci
            }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
