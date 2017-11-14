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
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '用户列表' },
            { path: '/form', component: Form, name: '用户渠道' },
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
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '测试类管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;