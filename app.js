import api from 'api/author'
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let params = {
            js_code: res.code
        }
        // 获取openid  {session_key: "kPG8/lUc3Bc3LV4Tp3DBiQ==", openid: "okNKA4hJQNWoe8f6O28D3n0dpdbM"}
        api.code2Session(params).then(res => {    
            this.globalData.session_key = res.session_key;
            this.globalData.openid = res.openid;
            //防止异步
            if(this.openidCallback)     {
                this.openidCallback(res.openid)
            }
            if (this.sessionKeyCallback) {
                this.sessionKeyCallback(res.session_key)
            }
        })
        // 获取access_token
        api.getAccessToken().then(res => {
            this.globalData.access_token = res.access_token;
            if (this.accessTokenCallback) {
                this.accessTokenCallback( res.access_token )
            }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })    
  },
  globalData: {
    userInfo: null
  }
})