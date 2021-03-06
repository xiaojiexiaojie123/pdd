import axios from './http.js'

// 获取首页轮播
export const getHomecasual = () => axios.get('api/homecasual')

// 获取首页导航
export const getHomenav = () => axios.get('api/homenav')

// 获取首页商品列表
export const getHomeShopList = (query) => axios.get('api/homeshoplist', query)

// 获取推荐商品列表
export const getRecommendShopList = (params) => axios.get('api/recommendshoplist', params)

// 获取推荐商品列表拼单用户
export const getRecommendUser = () => axios.get('api/recommenduser')

// 获取搜索分类列表
export const getSearchGoods = () => axios.get('api/searchgoods')

// 获取短信验证码
export const getVerification = (params) => axios.post('api/phone_verification', params)

// 获取图形验证码
export const svgCaptcha = () => axios.get('api/svg_captcha')

// 密码登录
export const passwordLogin = (params) => axios.post('api/password_login', params)

// 验证码登录
export const verificationLogin = (params) => axios.post('api/verification_login', params)

// 获取用户信息
export const getUserInfo = () => axios.get('api/user_info')

// 修改用户信息
export const updateUserInfo = (params) => axios.post('api/update_user_info', params)

// 加入购物车
export const addShopCart = (params) => axios.post('api/add_shop_cart', params)

// 获取购物车列表
export const cartShopList = () => axios.get('api/shop_cart_list')

// 删除购物车商品
export const deleteGoods = (params) => axios.post('api/delete_goods', params)

// 退出
export const loginOut = () => axios.get('api/login_out')

// 获取商品详情信息
export const getShopDetail = (query) => axios.get('/api/shop_detail', query)

// 获取搜索列表
export const getSearchList = (query) => axios.get('/api/search_goods', query)

// 登陆后台系统
export const managerlogin = (params) => axios.post('/api/managerlogin', params)

// 查询服装信息
export const searchGoodsInfo = (query) => axios.get('/api/searchGoodsInfo', query)

// 查询上下架服装信息
export const updownGoodsInfo = (query) => axios.get('/api/updownGoodsInfo', query)

// 更新上下架服装信息
export const updownShelfGoodsInfo = (query) => axios.get('/api/updownShelfGoodsInfo', query)

// 上传服装信息
export const uploadGoodsInfo = (query) => axios.get('/api/uploadGoodsInfo', query)

// 查询订单信息
export const searchOrdersInfo = (query) => axios.get('/api/searchOrdersInfo', query)

// 查询订单排名
export const goodsRank = (query) => axios.get('/api/goodsRank', query)

// 查询订单排名
export const orderLatestSeven = () => axios.get('/api/orderLatestSeven')

// 查询用户信息
export const searchUserInfo = (query) => axios.get('/api/searchUserInfo', query)

// 查询管理员信息
export const searchManagerInfo = (query) => axios.get('/api/searchManagerInfo', query)

// 删除管理员信息
export const delManagerInfo = (query) => axios.get('/api/delManagerInfo', query)

// 增加管理员信息
export const addManagerInfo = (query) => axios.get('/api/addManagerInfo', query)

// 获取订单信息
export const getUserOrder = (query) => axios.get('/api/get_user_order', query)

// 生成订单信息
export const payOrder = (query) => axios.get('/api/payOrder', query)

// 发货
export const deliverGoods = (query) => axios.get('/api/deliverGoods', query)

// 评论
export const uploadComment = (query) => axios.get('/api/uploadComment', query)

// 获取评论
export const getComment = (query) => axios.get('/api/getComment', query)
