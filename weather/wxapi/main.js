// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
// const API_BASE_URL = 'http://172.16.2.198:10000'
// const API_BASE_URL = 'https://oil.zxdata.net'
const API_BASE_URL = 'https://sign.zxdata.net'

const request = (url, needSubDomain, method, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(
    function(value) {
      Promise.resolve(callback()).then(
        function() {
          return value;
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  // 登录
  login: (data) => {
    return request('/wechat/login', true, 'post', data)
  },
  // 获取openID
  getOpenId: (data) => {
    return request('/wechat/getOpenId/' + data, true, 'get')
  },
  // 用户信息
  getUserInfoApi: (data) => {
    return request('/user/update', true, 'post', data)
  },
  
}