// pages/authority/authority.js
var app = getApp();
const WXAPI = require('../../wxapi/main')


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo: function (e) {
    // 此处授权得到userInfo
    // console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      // console.log(app.globalData.userInfo)
      let params = {
        headImgUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        userId: app.globalData.userId
      }
      WXAPI.getUserInfoApi(params).then(res => { })
      wx.navigateBack({
        delta: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})