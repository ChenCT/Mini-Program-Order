//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background: [ 
      { id: 1, src: 'pics/1.jpg' },
      { id: 2, src: 'pics/2.jpg' },
      { id: 3, src: 'pics/3.jpg' },
      { id: 4, src: 'pics/4.jpg' },
      { id: 5, src: 'pics/5.jpg' }]
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  viewInfo: function() {

  },
  openLocation: function(e) {
    wx.openLocation({
      longitude: 120.286410,
      latitude: 28.140320,
      name: '澳门豆捞火锅',
      address: '浙江省丽水市青田县鹤城镇圣旨街63号',
    })
  },
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '0578-6877777'
    })
  },
  makeOrder: function(){
    wx.navigateTo({
      url: '../order/order',
    })
  }
})
