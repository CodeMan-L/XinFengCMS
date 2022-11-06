const homeRoutes = [{
    path: '',
    redirect: '/home/introduce'
}, {
    path: "introduce",
    name: "introduce",
    meta: {
        title: "系统介绍",
        role: "PMC001",
        icon: "el-icon-data-line",
        submenu1: true,
    },
    component: () => import("@/views/Dashboard/Introduce.vue"),
}, {
    path: "controlpanel",
    name: "controlpanel",
    meta: {
        title: "Dashboard",
        role: "PMC001",
        icon: "el-icon-odometer",
        submenu1: true,
    },
    component: () => import("@/views/Dashboard/ControlPanel.vue"),
}, {
    path: "add",
    name: "add",
    meta: {
        title: "添加商品",
        role: "PMC001",
        icon: "el-icon-plus",
        submenu1: true,
    },
    component: () => import("@/views/Dashboard/Add.vue"),
}, {
    path: "classification",
    name: "classification",
    meta: {
        title: "分类管理",
        role: "PMF200",
        icon: "el-icon-tickets",
        submenu: false,
    },
    component: () => import("@/views/model/ClassiFication.vue"),
}, {
    path: "goodsmanager",
    name: "goodsmanager",
    meta: {
        title: "商品管理",
        role: "PMG300",
        icon: "el-icon-shopping-cart-full",
        submenu: false,
    },
    component: () => import("@/views/model/GoodsManager.vue"),
}, {
    path: "membermanager",
    name: "membermanager",
    meta: {
        title: "会员管理",
        role: "PMM400",
        icon: "el-icon-user",
        submenu: false,
    },
    component: () => import("@/views/model/MemberManager.vue"),
}, {
    path: "ordermanager",
    name: "ordermanager",
    meta: {
        title: "订单管理",
        role: "PMR500",
        icon: "el-icon-s-order",
        submenu: false,
    },
    component: () => import("@/views/model/OrderManager.vue"),
}, {
    path: "bannersetting",
    name: "bannersetting",
    meta: {
        title: "轮播图设置",
        role: "PMH100",
        icon: "el-icon-picture-outline",
        submenu: true,
    },
    component: () => import("@/views/Home/BannerSetting.vue"),
}, {
    path: "goodssetting",
    name: "goodssetting",
    meta: {
        title: "热销商品设置",
        role: "PMH100",
        icon: "el-icon-star-on",
        submenu: true,
    },
    component: () => import("@/views/Home/GoodsSetting.vue"),
}, {
    path: "productsetting",
    name: "productsetting",
    meta: {
        title: "新品上线设置",
        role: "PMH100",
        icon: "el-icon-position",
        submenu: true,
    },
    component: () => import("@/views/Home/ProductSetting.vue"),
}, {
    path: "recommendsetting",
    name: "recommendsetting",
    meta: {
        title: "为你推荐设置",
        role: "PMH100",
        icon: "el-icon-thumb",
        submenu: true,
    },
    component: () => import("@/views/Home/RecommendSetting.vue"),
}, {
    path: "account",
    name: "account",
    meta: {
        title: "修改密码",
        role: "PMH100",
        icon: "el-icon-lock",
        submenu2: true,
    },
    component: () => import("@/views/system/Account.vue"),
}]

export default homeRoutes;

/* 
 /home/controlpanel   控制面板
     /home/classification   分类管理
     /home/goodsmanager   商品管理
     /home/membermanager   会员管理
     /home/ordermanager   订单管理
     /home/bannersetting   轮播图设置
     /home/goodssetting   热销商品设置
    /home/productsetting   新品上线设置
    /home/recommendsetting   为你推荐设置
以上地址都不成立   404组件
*/