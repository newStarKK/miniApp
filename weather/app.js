//app.js
// import Wux from 'component/wux'
// import WxValidate from 'plugins/WxValidate'
const WXAPI = require('./wxapi/main')
App({
  onLaunch: function (options) {
    let userId
    if (options.query.introducer) {
      userId = options.query.introducer;
    }
    let that = this
    // 登录
    wx.login({
      success: res => {
        // console.log(res)
        WXAPI.login({
          code: res.code,
          introducer: userId || ''
        }).then(res => {
          if (res.code == 0) {
            // console.log('login')
            that.globalData.userId = res.data
          }
          // this.globalData.userId = res.data.userId
          // this.globalData.shareImg = res.data.shareImg

          // WXAPI.getOpenId(res.data).then(res => {
          //   this.globalData.openId = res.data
          // })
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取openId

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              let params = {
                headImgUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
                userId: this.globalData.userId
              }
              WXAPI.getUserInfoApi(params).then(res => { })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          //获取用户信息失败后。请跳转授权页面
          // wx.showModal({
          //   title: '您尚未授权',
          //   content: '请点击确定跳转到授权页面进行授权。',
          //   success: function (res) {
          //     if (res.confirm) {
                wx.navigateTo({
                  url: '../authority/authority',
                })
          //     }
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: null,
    shareImg: '',
    cinList:'',
    mainPicUrl:'https://i-pro.oss-cn-hangzhou.aliyuncs.com/sign/signactive1.jpg'
  },
  // Wux: Wux,
  // WxValidate: (rules, messages) => new WxValidate(rules, messages),
})