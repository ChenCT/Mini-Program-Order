// pages/order/order.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus:false,
    numb:0,
    cost:0,
    product:null,
    nowProduct:null,
    indexI:[],
    indexJ: [],
    menu:[
      { typeName: "热销推荐",
        menuContent: [
          {
            src:"../../image/毛肚.jpg",
            name:"毛肚",
            price: "68",
            numb:0
          },
          {
            src:"../../image/3.jpg",
            name:"鸭肠",
            price: "48",
            numb: 0
          },
          {
            src:"../../image/4.jpg",
            name:"鹅肝",
            price: "68",
            numb: 0
          },
          {
            src:"../../image/肥牛.jpg",
            name:"肥牛",
            price: "38",
            numb: 0
          }
        ] },
      { typeName: "特色菜品",
        menuContent: [
          {
            src:"../../image/5.jpg",
            name:"鸭肠",
            price: "48",
            numb: 0
          },
          {
            src:"../../image/毛肚.jpg",
            name:"鹅肝",
            price: "68",
            numb: 0
          },
          {
            src:"../../image/肥牛.jpg",
            name:"肥牛",
            price: "38",
            numb: 0
          }
        ] }, 
      { typeName: "爽口凉菜",
        menuContent: [
          { 
            src:"../../image/肥牛.jpg",
            name:"海带丝",
            price: "12",
            numb: 0
          },
          { 
            src:"../../image/肥牛.jpg",
            name:"裙带菜",
            price: "12",
            numb: 0
          },
          {
            src:"../../image/肥牛.jpg",
            name:"爽口木耳",
            price: "12",
            numb: 0
          }
        ] }
    ],
    inimenu:null
  },
  //切换菜单
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },
  //添加购物车
  addToTrolley: function (e) {
    var info= this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    var nCost = Number(this.data.cost) + Number(this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price);
    var num = this.data.numb+1;
    this.setData({ menu: info, cost: nCost,numb:num});

    // var info = this.data.menu;
    // info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    // this.data.number = + this.data.number + 1;
    // var number = this.data.number;
    // var flag = this.data.flag;
    // var cost = Number(this.data.cost) + Number(this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price);
    // console.log(cost);

    // console.log('number=' + number);
    // if (flag === "0") {
    //   app.globalData.menu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    //   app.globalData.menu.cost = cost;
    //   app.globalData.menu.number = number;
    // } else if (flag === "1") {
    //   app.globalData.wmmenu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    //   app.globalData.wmmenu.cost = cost;
    //   app.globalData.wmmenu.number = number;
    // } else if (flag === "2") {
    //   app.globalData.pdmenu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    //   app.globalData.pdmenu.cost = cost;
    //   app.globalData.pdmenu.number = number;
    // }
    // this.setData({
    //   cost: cost,
    //   menu: info,
    //   number: number,
    //   flag: flag
    // })
  },
  //减少
  removeFromTrolley: function(e) {
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--; 
    var nCost = Number(this.data.cost) - Number(this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price);
    var num = this.data.numb - 1;
    this.setData({ menu: info, cost: nCost, numb: num });
  },
  viewProduct: function() {
    var that=this;
    if (that.data.cost != 0) {
      var nProduct = {
        cost: that.data.cost,
        numb: that.data.numb,
        order: []
      }
      var i=0;var j=0;
      that.data.menu.forEach(function (m) { 
        m.menuContent.forEach(function (c) {
          if (c.numb > 0) {
            that.data.indexI.push(i);
            that.data.indexJ.push(j);
            nProduct.order.push(c);
          }
          j++;
        }, this)
        i++;
      }, this);
      this.setData({
        nowProduct: nProduct
      })
      
      var state = that.data.showModalStatus;
      this.setData({
        showModalStatus: !state
      })
    } 
  },
  //购物车中减
  remove:function(e){ 
    var index = e.currentTarget.dataset.index; 
    
    var info = this.data.menu;
    var I = this.data.indexI;
    var J = this.data.indexJ;
    info[I[index]].menuContent[J[index]].numb--;
    var nCost = Number(this.data.cost) - Number(this.data.menu[I[index]].menuContent[J[index]].price);
    var num = this.data.numb - 1;
    this.setData({ menu: info, cost: nCost, numb: num });

    var list = this.data.nowProduct;
    list.order[index].numb--;
    list.numb--;
    list.cost -= list.order[index].price;
    if (list.order[index].numb == 0) {
      list.order.splice(index, 1);
      I.splice(index, 1);
      J.splice(index, 1);
    }
    if(list.order.length==0){
      this.setData({
       showModalStatus: false
      })
    }
    this.setData({ nowProduct: list, indexI: I, indexJ:J });
  },
  //购物车中加
  add:function(e){
    var index = e.currentTarget.dataset.index;

    var info = this.data.menu;
    var I = this.data.indexI;
    var J = this.data.indexJ;
    info[I[index]].menuContent[J[index]].numb++;
    var nCost = Number(this.data.cost) + Number(this.data.menu[I[index]].menuContent[J[index]].price);
    var num = this.data.numb + 1;
    this.setData({ menu: info, cost: nCost, numb: num });

    var list = this.data.nowProduct;
    list.order[index].numb++;
    list.numb++;
    list.cost += list.order[index].price;
    
    this.setData({ nowProduct: list, indexI: I, indexJ: J });
  },
  //清空购物车
  empty:function(){
    var that = this;
    wx.showModal({
      title: '',
      content: '清空购物车？',
      success: function (res) {
        if (res.confirm) {
          //初始化菜单数据
          var initial = that.data.inimenu;
          that.setData({
            nowProduct: null, product: null, showModalStatus: false, cost: 0, numb: 0, menu: initial
          })
        } else if (res.cancel) {
        }
      }
    })  
    
  },
  //选好了
  buy: function () {
    var that=this;
    var submitData= {
      cost: that.data.cost,
      numb: that.data.numb,
      order:[],
      time: null
    }
    that.data.menu.forEach(function (m){
      m.menuContent.forEach(function (c) {
        if(c.numb>0){
          submitData.order.push(c);
        }
      },this)
    },this);
    wx.setStorage({
      key: "submitData",
      data: submitData,
      complete:function(){
        if (that.data.cost != 0){
          wx.navigateTo({
            url: '../submit/submit'
          })
        }
      }
    })
    // wx.getStorage({
    //   key: 'menu',
    //   fail: function () { console.log("失败")},
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    // var that = this;
    // wx.getStorage({
    //   key: 'name',
    //   success: function (res) {
    //     console.log(res.data);
    //     var tjdata = {
    //       cost: that.data.cost,
    //       number: that.data.number,
    //       name: res.data,
    //       order: []
    //     }
    //     that.data.menu.forEach(function (v) {
    //       v.menuContent.forEach(function (m) {
    //         if (m.numb > 0) {
    //           tjdata.order.push(m);
    //         }
    //       }, this);
    //     }, this);
    //     var letdata = JSON.stringify(tjdata);
    //     //存本地缓存
    //     wx.setStorage({
    //       key: "letdata",
    //       data: letdata,
    //       complete: function () {
    //         //选好了，点击购买
    //         var url = '../dcxz/dcxz';
    //         if (that.options.flag == '1') {
    //           url = '../dcxz/dcxzwm';
    //         }
    //         if (that.data.cost != 0) {
    //           wx.redirectTo({
    //             url: url
    //           });
    //         }
    //       }
    //     })
    //   }
    // });
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var me= this.data.menu;
    this.setData({
      selected: 0,
      inimenu: me
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