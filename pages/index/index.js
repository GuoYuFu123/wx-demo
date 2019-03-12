//index.js
//获取应用实例
import api from '../../api/author'
const app = getApp()

Page({
  data: {
    session_key: '',
    openid: '',
    access_token:''
    
  }, 
  /*******************生命周期*********************************** */
  onLoad: function () {
    console.log('onload', wx.getStorageSync('openid'), wx.getStorageSync('session_key'))
    this.setData({
        session_key: wx.getStorageSync('session_key') || '',
        openid: wx.getStorageSync('openid') || '',
        access_token: wx.getStorageSync('access_token') || '',
    })  
    //设置转发
    wx.showShareMenu({
        withShareTicket: true,
        success: function (res) {
            console.log(res)
        }
    })  
    //绘制小程序码
      console.log(this.data.session_key)
    //   api.getWXACodeUnlimit(this.data.session_key)

  },
    onShow() {
        console.log('show',wx.getStorageSync('session_key'))
    },
    onReady() {
        console.log('ready', wx.getStorageSync('session_key'))
    },
  /*********************函数************************************** */
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShareAppMessage: function(res) {        
        console.log('share')
        console.log(res)
        return {
            title: '好海奥',
            path: 'pages/index/index',
            imageUrl: '../../static/image/home.png',
        }
    }
    
})
