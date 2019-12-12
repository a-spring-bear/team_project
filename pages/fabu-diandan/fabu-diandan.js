// pages/fabu-diandan/fabu-diandan.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    telephone: "",
    // tab切换 
    currentTab: 0,
    //设置初始值
    array: ['10',
      '15', '20',
      '25', '30',
      '35', '40',
      '45', '50',
      '55', '60'
    ],
    objectArray: [{
      id: 10,
      name: '10'
    },
    {
      id: 15,
      name: '15'
    },
    {
      id: 20,
      name: '20'
    },
    {
      id: 25,
      name: '25'
    },
    {
      id: 30,
      name: '30'
    },
    {
      id: 35,
      name: '35'
    },
    {
      id: 40,
      name: '40'
    },
    {
      id: 45,
      name: '45'
    },
    {
      id: 50,
      name: '50'
    },
    {
      id: 55,
      name: '55'
    },
    {
      id: 60,
      name: '60'
    },
    ],
    index: 0,
    //设置取消订单时长初始值
    array2: ['10',
      '15', '20',
      '25', '30',
      '35', '40',
      '45', '50',
      '55', '60'
    ],
    objectArray2: [{
      id: 10,
      name: '10'
    },
    {
      id: 15,
      name: '15'
    },
    {
      id: 20,
      name: '20'
    },
    {
      id: 25,
      name: '25'
    },
    {
      id: 30,
      name: '30'
    },
    {
      id: 35,
      name: '35'
    },
    {
      id: 40,
      name: '40'
    },
    {
      id: 45,
      name: '45'
    },
    {
      id: 50,
      name: '50'
    },
    {
      id: 55,
      name: '55'
    },
    {
      id: 60,
      name: '60'
    },
    ],
    index2: 0,
    ///////////////
    array1: ['玫瑰一楼', '玫瑰二楼', '紫荆一楼', '紫荆二楼', '丁香一楼', '丁香二楼', '京元', '朝阳'],
    objectArray1: [{
        id: 0,
        name: '玫瑰一楼'
      }, {
        id: 1,
        name: '玫瑰二楼'
      }, {
        id: 2,
        name: '紫荆一楼'
      }, {
        id: 3,
        name: '紫荆二楼'
      }, {
        id: 4,
        name: '丁香一楼'
      }, {
        id: 5,
        name: '丁香二楼'
      },
      {
        id: 6,
        name: '京元一楼'
      }, {
        id: 7,
        name: '朝阳'
      },
    ],
    index1: 0,
  },
  //普通选择器的点击事件
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  swichNav: function(e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },
  //置空
  refresh:function(){
this.setData({
inputValue:'',
index:0,
index1:0,
index2:0
})
  },
  //点单
  formSubmit: function(e) {
    console.log(e)
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/issue_order',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          // order_number: null,
          order_type: "0",
          order_status: "0",
          canteen: that.data.array1[e.detail.value.restaurant],
          s_dormitory_1: e.detail.value.lou,
          s_dormitory_2: e.detail.value.men,
          money: e.detail.value.fee,
          requirement_customer: e.detail.value.require,
          requirement_delivery: null, //配送员
          order_delivery_time: "null", //订单配对时间
          scheduled_delivery_countdown: that.data.array[e.detail.value.time1] ,
          result_countdown: that.data.array2[e.detail.value.time2] ,
          telephone_delivery: null,
          telephone_customer: that.data.telephone,
        }
      },
      success(res) {
        that.refresh()
        console.log(res)
        wx.showModal({
          title: '发布成功',
          content: '刷新广场吧',
          showCancel: true, //是否显示取消按钮
          confirmText: "确定",//默认是“确定”
          confirmColor: '#fde073',//确定文字的颜色
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              //点击确定,默认隐藏弹框
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
          },
          fail: function (res) { }, //接口调用失败的回调函数
          complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }
    })
  },
  //配送
  formSubmit1: function(e) {
    console.log(e)
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/issue_order',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          // order_number: null,
          order_type: "1",
          order_status: "0",
          canteen: that.data.array1[e.detail.value.restaurant_],
          s_dormitory_1: e.detail.value.lou_,
          s_dormitory_2: "",
          money: e.detail.value.fee_,
          requirement_customer: null,
          requirement_delivery: e.detail.value.require_,
          order_delivery_time: "null",
          scheduled_delivery_countdown: that.data.array[e.detail.value.time1_],
          result_countdown: that.data.array2[e.detail.value.time2_],
          telephone_delivery: that.data.telephone,
          telephone_customer: null,
        }
      },
      success(res) {
        console.log(res)
        if (res.data.data.result == 1) {
          wx.showModal({
            title: '发布成功',
            content: '刷新广场吧',
            showCancel: true, //是否显示取消按
             confirmText: "确定",//默认是“确定”
            confirmColor: '#fde073',//确定文字的颜色
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                that.refresh()
                //点击确定,默认隐藏弹框
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }
            },
            fail: function(res) {}, //接口调用失败的回调函数
            complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      telephone: app.globalData.telephone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  jump: function() {
    wx.navigateTo({
      url: '/pages/fabu-peisong/fabu-peisong',
    })
  },
  submit: function() {
    wx.navigateTo({
      url: '/susu/order_detail/order_detail',
    })
  }
})