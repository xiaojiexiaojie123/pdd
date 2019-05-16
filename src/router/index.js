import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

// 一级路由
const Home = () => import('./../views/Home/Home')
const Me = () => import('./../views/Me/Me')
const UserInfo = () => import('./../views/Me/UserInfo')
const Setting = () => import('./../views/Me/Setting')
const Login = () => import('./../views/Login/Login')
const Chat = () => import('./../views/Cart/Cart')
const Recommend = () => import('./../views/Recommend/Recommend')
const Search = () => import('./../views/Search/Search')
const ShopDetail = () => import('./../views/ShopDetail/ShopDetail')
const Cms = () => import('./../views/Cms/Cms')
const ManagerLogin = () => import('./../views/ManagerLogin/ManagerLogin')

// 二级路由
const Hot = () => import('./../views/Home/Children/Hot/Hot')
const Order = () => import('./../views/Cms/child/Order')
const Chart = () => import('./../views/Cms/child/Chart')
const GoodsInfo = () => import('./../views/Cms/child/GoodsInfo')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        tabBarShow: true
      },
      redirect: '/home/hot',
      children: [
        // 热门版块
        {
          path: 'hot',
          component: Hot,
          meta: {
            tabBarShow: true
          }
        }
      ]
    },
    {
      path: '/recommend',
      component: Recommend,
      meta: {
        tabBarShow: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Chat,
      meta: {
        tabBarShow: true
      }
    },
    {
      path: '/me',
      component: Me,
      meta: {
        tabBarShow: true
      }
    },
    {
      path: '/user_info',
      component: UserInfo
    },
    {
      path: '/setting',
      component: Setting
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search',
      component: Search,
      meta: {
        tabBarShow: true
      }
    },
    {
      path: '/shop_detail',
      component: ShopDetail
    },
    {
      path: '/cms',
      component: Cms,
      redirect: '/cms/goodsInfo',
      children: [
        {
          path: 'order',
          component: Order
        },
        {
          path: 'chart',
          component: Chart
        },
        {
          path: 'goodsInfo',
          component: GoodsInfo
        }
      ]
    },
    {
      path: '/managerLogin',
      component: ManagerLogin
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let isLogin = store.state.userInfo.user_id
  if (to.name === 'cart') {
    if (!isLogin) {
      next({path: '/me'})
    }
    next()
  }
  next()
})

export default router
