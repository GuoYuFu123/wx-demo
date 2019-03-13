//index.js
//获取应用实例
import api from '../../api/author'
const app = getApp()

Page({
    data: {
        session_key: '',
        openid: '',
        access_token: '',
        imgSrc: ''
    },
    /*******************生命周期*********************************** */
    onLoad: function() {
        //session_key
        if (app.globalData.session_key) {
            this.setData({
                session_key: app.globalData.session_key
            })
        } else {
            app.sessionKeyCallback = res => {
                this.setData({
                    session_key: res
                })
            }
        }
        //openid
        if (app.globalData.openid) {
            this.setData({
                openid: app.globalData.openid
            })
        } else {
            app.openidCallback = res => {
                this.setData({
                    openid: res
                })
            }
        }
        //access_token
        if (app.globalData.access_token) {
            this.setData({
                access_token: app.globalData.access_token
            })
            // this.getAppQrCode()
        } else {
            app.accessTokenCallback = res => {
                this.setData({
                    access_token: res
                })
                // this.getAppQrCode()
            }           
        }
        //设置转发
        wx.showShareMenu({
            withShareTicket: true,
            success: (res) =>{
                // console.log(res);
            }
        })
        
    },
    onShow() {

    },
    onReady() {

    },

    /*********************函数************************************** */
    //获取小程序码
    getAppQrCode: function (){
        let params = {
            access_token: this.data.access_token,
            scene: 'guoguo+openid'
        }
       api.getWXACodeUnlimit(params).then(res => {
           let data = wx.arrayBufferToBase64(res);
           this.setData({
               imgSrc: 'data:image/png;base64,' + data
           })
       })        
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShareAppMessage: function(res) {
        console.log('share')
        console.log(res)
        return {
            title: '果果测试',
            path: 'pages/index/index',
            imageUrl: '../../static/image/app.jpg'
        }
    }
})
