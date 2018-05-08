import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import ClassList from './views/nav2/classList.vue'
import ClassIndex from './views/nav2/classIndex.vue'
import FreeList from './views/nav2/freeList.vue'
import ClassDetail from './views/nav2/classDetail.vue'
import ClassChapter from './views/nav2/classChapter'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import BannerList from './views/nav3/bannerList.vue'
import OrderPayList from './views/nav4/orderPayList.vue'
import TestList from './views/nav5/testList.vue'
import TestUserList from './views/nav5/testUserList.vue'
import QuestionList from './views/nav5/questionList.vue'
import AnswerList from './views/nav5/answerList.vue'
import Advister from './views/wxapp/advister.vue'
import Tabbar from './views/wxapp/tabbar.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa el-icon-message',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/table', component: Table, name: '用户管理' },
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/form', component: Form, name: '用户渠道',hidden: true },
            { path: '/user', component: user, name: '列表',hidden:true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-id-card-o',
        leaf:true,
        children: [
            { path: '/classList', component: ClassList, name: '课程管理' },
            { path: '/classIndex/:id', component: ClassIndex, name: '课程首页' },
            { path: '/freeList/:id', component: FreeList, name: '试看列表' },
            { path: '/classDetail/:id', component: ClassDetail, name: '课程章节' },
            { path: '/classChapter/:id/:classId', component: ClassChapter, name: '课程章节列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '业务管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/bannerList', component: BannerList, name: '轮播图管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/orderPayList', component: OrderPayList, name: '订单管理' },
            { path: '/page6', component: Page6, name: '未付款',hidden:true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '测试类管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/testList', component: TestList, name: '测试类列表' },
            { path: '/testUserList', component: TestUserList, name: '测试用户列表' },
            { path: '/questionList/:id', component: QuestionList, name: '测试题目列表',hidden:true },
            { path: '/answerList/:id', component: AnswerList, name: '测试答案列表',hidden:true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '平台数据',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '收入统计' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '比分小程序管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/advister', component: Advister, name: '广告列表' },
            { path: '/tabbar', component: Tabbar, name: '底部tab' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;