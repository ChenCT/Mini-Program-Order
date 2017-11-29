// pages/submit/submit.js
var util = require('../../utils/util.js');  

Page({
  data: {
    orderInfo:null,
    List:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'submitData',
      success: function (res) {
        that.setData({ orderInfo: res.data });
      }
    })
    wx.getStorage({
      key: 'orderList',
      success: function (res) {
        that.setData({ List: res.data });
      },
      fail: function () {
      }
    })   
  },
  //提交订单
  submit:function() {
    var that=this;

    wx.showModal({
      title: '',
      content: '确认提交订单？',
      success: function (res) {
        if (res.confirm) {
          var time = util.formatTime(new Date());
          that.data.orderInfo.time = time;
          var submited = that.data.orderInfo;
          
          that.data.List.splice(0, 0, submited);

          wx.setStorage({
            key: "submitData",
            data: submited,
            complete: function () {
              wx.redirectTo({
                url: '../orderInfo/orderInfo',
              })
            }
          });
          
          wx.setStorage({
            key: "orderList",
            data: that.data.List,
            complete: function () {
              console.log(that.data.List);
            }
          })
          // wx.setStorageSync('submitData', submited);
          // wx.redirectTo({
          //   url: '../orderInfo/orderInfo',
          // })
        } else if (res.cancel) {
        }
      }
    }) 
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