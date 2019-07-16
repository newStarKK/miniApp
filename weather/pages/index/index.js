//index.js
//获取应用实例
const app = getApp()
const WXAPI = require('../../wxapi/main')
const WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    showModal: false,
    code:''
    
  },
  
  
  // 禁止屏幕滚动
  preventTouchMove: function () {
  },
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if(app.globalData.userId){
      this.uplode()
    }else{
      // 登录
      wx.login({
        success: res => {
          // console.log(res)
          WXAPI.login({
            code: res.code
          }).then(res => {
            if (res.code == 0) {
              app.globalData.userId = res.data
              this.uplode()
            }
          })
        }
      })
    }
  },
  uplode() {
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.uplode()
    // wx.hideNavigationBarLoading() //完成停止加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
    // wx.stopPullDownRefresh() //停止下拉刷新
  },
})
