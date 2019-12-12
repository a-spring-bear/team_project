const app = getApp()
Page({
  data: {
    // list2:点单 list3:配送
    list2: [],
    list3: [],
    currentTab: 0,
    telephone: "",
    order_number: 0,
  },
  //swiper
  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    var line;
    if (that.data.currentTab == 0) {
      line = that.data.list2.length;
    } else if (that.data.currentTab == 1) {
      console.log(1)
      line = that.data.list3.length;
    }
    this.setData({
      aheight: 230 * line+83
    });
  },
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
    var line;
    if (this.data.currentTab == 0) {
      line = this.data.list2.length;
    } else if (this.data.currentTab == 1) {
      console.log(1)
      line = this.data.list3.length;
    }
    this.setData({
      aheight: 230 * line+83
    });

  },
  //点单详情
  detail1: function (e) {
    console.log("尝试进入订单详情")
    console.log(e)
    var index = e.currentTarget.dataset.id
    console.log("点单号：" + this.data.list2[index].order_number)
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?order_number=' + this.data.list2[index].order_number,
    })
  },
  //配送详情
  detail2: function (e) {
    console.log("尝试进入配送单详情")
    console.log(e)
    var index = e.currentTarget.dataset.id
    console.log("配送单号：" + this.data.list2[index].order_number)

    wx.navigateTo({
      url: '/pages/order_detail_ing/order_detail_ing?order_number=' + this.data.list3[index].order_number,
    })
  },
  // //修改配送单
  // changeOrderP: function (e) {
  //   console.log("尝试修改配送单")
  //   console.log(e)
  //   console.log("e" + e.currentTarget.dataset)
  //   var index = e.currentTarget.dataset.id
  //   console.log("id:")
  //   wx.navigateTo({
  //     url: '/pages/xiugai-peisong/xiugai-peisong?order_number=' + this.data.list3[index].order_number,
  //   })
  // },
  // //修改点单
  // changeOrderD: function (e) {
  //   console.log("尝试修改点单")
  //   console.log("e" + e)
  //   wx.navigateTo({
  //     url: '/pages/xiugai-diandan/xiugai-diandan?order_number=' + this.data.list2[index].order_number,
  //   })
  // },
  //取消点单
  cancelOrder1: function (e) {
    console.log(e),
      console.log("id:" + e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id;
    console.log("list2_order_number:" + this.data.list2[index].order_number)

    var that = this;
    that.setData({
      order_number: that.data.list2[index].order_number,
    })

    wx.request({
      url: 'https://www.sssxfd.top:8080/delete_order',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.list2[index].order_number,
        }
      },
      success(res) {
        console.log(res)
        console.log("取消点单成功")
        if (res.data.data.result == "1") {

        }
        wx.showModal({
          title: '取消发布成功！',
          content: '',
          showCancel: true,//是否显示取消按钮
          cancelText: "确定",//默认是“取消”
          cancelColor: '#fde073',//取消文字的颜色
          confirmText: "发布新单",//默认是“确定”
          confirmColor: '#fde073',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              //点击确定
              wx.switchTab({
                url: '/pages/fabu-diandan/fabu-diandan',
              })
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }
    })
  },
  //取消配送单
  cancelOrder2: function (e) {
    console.log(e)
    console.log("id:" + e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id;
    console.log("list3_order_number:" + this.data.list3[index].order_number)
    this.setData({
      order_number: this.data.list3[index].order_number
    })
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/delete_order',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
        }
      },
      success(res) {
        console.log(res)
        console.log("取消成功！")
        wx.showModal({
          title: '取消发布成功!',
          content: '',
          showCancel: true,//是否显示取消按钮
          cancelText: "确定",//默认是“取消”
          cancelColor: '#fde073',//取消文字的颜色
          confirmText: "发布新单",//默认是“确定”
          confirmColor: '#fde073',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              //点击确定
              wx.switchTab({
                url: '/pages/fabu-diandan/fabu-diandan',
              })
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }
    })
  },
  //确认送达-点单
  confirm1: function (e) {
    console.log(e)
    console.log("确认送达：id:" + e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id;
    console.log("list2_order_number:" + this.data.list2[index].order_number)
    this.setData({
      order_number: this.data.list2[index].order_number
    })
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/confirm_order',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
        }
      },
      success(res) {
        console.log(res)
        console.log("确认成功！")
        wx.showModal({
          title: '确认成功',
          content: '快去评价吧!',
          showCancel: true,//是否显示取消按钮
          cancelText: "不评价",//默认是“取消”
          cancelColor: '#fde073',//取消文字的颜色
          confirmText: "好的",//默认是“确定”
          confirmColor: '#fde073',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
            else {
              //this.load()
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }
    })
  },
  //确认送达-配送
  confirm2: function (e) {
    console.log(e)
    console.log("确认送达：id:" + e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id;
    console.log("list3_order_number:" + this.data.list3[index].order_number)
    this.setData({
      order_number: this.data.list3[index].order_number
    })
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/confirm_order',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
        }
      },
      success(res) {
        console.log(res)
        console.log("确认成功！")
        wx.showModal({
          title: '确认成功',
          content: '快去评价吧!',
          showCancel: true,//是否显示取消按钮
          cancelText: "不评价",//默认是“取消”
          cancelColor: '#fde073',//取消文字的颜色
          confirmText: "好的",//默认是“确定”
          confirmColor: '#fde073',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
            else {
              //this.load()
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }
    })
  },
  //评价-点单
  comment1: function (e) {
    console.log("尝试进入评价点单")
    console.log(e)
    var index = e.currentTarget.dataset.id
    console.log("单号：" + this.data.list2[index].order_number)
    wx.navigateTo({
      url: '/pages/w_comment/w_comment?order_number=' + this.data.list2[index].order_number,
    })
  },
  //评价-配送
  comment2: function (e) {
    console.log("尝试进入评价配送单")
    console.log(e)
    var index = e.currentTarget.dataset.id
    console.log("配送单号：" + this.data.list3[index].order_number)
    wx.navigateTo({
      url: '/pages/w_comment/w_comment?order_number=' + this.data.list3[index].order_number,
    })
  },
  load: function () {
    console.log("加载订单数据")
    var that = this;
    //点单
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_historical_business_orders',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          telephone: app.globalData.telephone,
        }
      },
      success(res) {
        console.log(res)
        that.setData({
          list3: res.data.data
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var line;
        if (that.data.currentTab == 0) {
          line = that.data.list2.length;
        } else if (that.data.currentTab == 1) {
          console.log(1)
          line = that.data.list3.length;
        }
        that.setData({
          aheight: 230 * line + 83
        });
      }
    })
    //配送单
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_historical_customer_orders',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          telephone: app.globalData.telephone,
        }
      },
      success(res) {
        console.log(res)
        that.setData({
          list2: res.data.data
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var line;
        if (that.data.currentTab == 0) {
          line = that.data.list2.length;
        } else if (that.data.currentTab == 1) {
          line = that.data.list3.length;
        }
        that.setData({
          aheight: 230 * line
        });
      }
    })
  },
  onLoad: function (options) {
    var that = this
    setInterval(function () {
      that.load();
      console.log("轮播请求5秒触发一次");
    }, 8000)
    wx.showLoading({
      title: '加载中....',
    })
    that.load()
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.showToast({
      title: '下拉刷新',
      duration: 1500
    })
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },

  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})