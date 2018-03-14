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
import AddSite from '@/pages/system_administrators/AddSite' //添加站点
import SiteList from '@/pages/system_administrators/SiteList' //站点列表
import ContentManagement from '@/pages/system_administrators/ContentManagement' //内容管理
import DataBackup from '@/pages/system_administrators/DataBackup' //数据备份
import AddEnclosure from '@/pages/system_administrators/AddEnclosure' //添加附件
import EnclosureList from '@/pages/system_administrators/EnclosureList' //附件列表
import AddComponent from '@/pages/system_administrators/AddComponent' //添加组件
import ComponentList from '@/pages/system_administrators/ComponentList' //组件列表
import AddTemplate from '@/pages/system_administrators/AddTemplate' //添加模板
import TemplateList from '@/pages/system_administrators/TemplateList' //模板列表
import AddUser from '@/pages/system_administrators/AddUser' //添加用户
import UserList from '@/pages/system_administrators/UserList' //用户列表
import AddUserGroup from '@/pages/system_administrators/AddUserGroup' //添加用户组
import UserGroupList from '@/pages/system_administrators/UserGroupList' //用户组列表
import DepartmentList from '@/pages/system_administrators/DepartmentList' //部门列表
import SiteInfo from '@/pages/system_administrators/SiteInfo' //站点信息
import LoginLog from '@/pages/system_administrators/LoginLog' //登陆日志
import qingjiaguanli from '@/pages/system_administrators/qingjiaguanli'//请假管理
import tiaokeguanli from '@/pages/system_administrators/tiaokeguanli'//调课管理
import kaoqinshuju from '@/pages/system_administrators/kaoqinshuju'//考勤数据
import kebiaoguanli from '@/pages/system_administrators/kebiaoguanli'//课表管理
import bingkeguanli from '@/pages/system_administrators/bingkeguanli'//并课管理
import baobeiguanli from '@/pages/system_administrators/baobeiguanli'//报备管理
import jiaoshiyuyueguanli from '@/pages/system_administrators/jiaoshiyuyueguanli'//教室预约管理
import xueshengshensuguanli from '@/pages/system_administrators/xueshengshensuguanli'//学生申诉管理
import waichujiaoxueguanli from '@/pages/system_administrators/waichujiaoxueguanli'//外出教学管理
import baobiaotuisong from '@/pages/system_administrators/baobiaotuisong'//报表推送
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Home
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
        {
            path: 'AddSite',
            component: AddSite
        },
        {
            path: 'SiteList',
            component: SiteList
        },
        {
            path: 'ContentManagement',
            component: ContentManagement
        },
        {
            path: 'DataBackup',
            component: DataBackup
        },
        {
            path: 'AddEnclosure',
            component: AddEnclosure
        },
        {
            path: 'EnclosureList',
            component: EnclosureList
        },
        {
            path: 'AddComponent',
            component: AddComponent
        },
        {
            path: 'ComponentList',
            component: ComponentList
        },
        {
            path: 'AddTemplate',
            component: AddTemplate
        },
        {
            path: 'TemplateList',
            component: TemplateList
        },
        {
            path: 'AddUser',
            component: AddUser
        },
        {
            path: 'UserList',
            component: UserList
        },
        {
            path: 'AddUserGroup',
            component: AddUserGroup
        },
        {
            path: 'UserGroupList',
            component: UserGroupList
        },
        {
            path: 'DepartmentList',
            component: DepartmentList
        },
        {
            path: 'SiteInfo',
            component: SiteInfo
        },
        {
            path: 'LoginLog',
            component: LoginLog
        },
        {
            path: 'kaoqinshuju',
            component: kaoqinshuju
        },
        {
            path: 'kebiaoguanli',
            component: kebiaoguanli
        },
        {//申请审批开始
            path: 'qingjiaguanli',
            component: qingjiaguanli
        },
        {
            path: 'tiaokeguanli',
            component: tiaokeguanli
        },
        {
            path: 'bingkeguanli',
            component: bingkeguanli
        },
        {
            path: 'baobeiguanli',
            component: baobeiguanli
        },
        {
            path: 'jiaoshiyuyueguanli',
            component: jiaoshiyuyueguanli
        },
        {
            path: 'xueshengshensuguanli',
            component: xueshengshensuguanli
        },
        {
            path: 'waichujiaoxueguanli',
            component: waichujiaoxueguanli
        },//申请审批结束
        {//信息推送开始
            path: 'baobiaotuisong',
            component: baobiaotuisong
        }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
    ]
})
