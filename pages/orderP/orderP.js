// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_number:0,
    canteen: "",
    money: "",
    scheduled_delivery_time: "",
    s_dormitory_1: "",
    s_dormitory_2: "",
    requirement_customer: "",
    requirement_delivery: "",
    telephone_delivery:"",
    telephone_customer:"",
    neutral_appraise: 0,
    good_appraise: 0,
    bad_appraise: 0,
    result_time:""
  },
  formsubmit:function(e){
    console.log("配送员备注：" + e.detail.value.remark)

    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/get_order',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
          order_type: 1,
          order_status: 1,
          canteen: that.data.canteen,
          s_dormitory_1: that.data.s_dormitory_1,
          s_dormitory_2: that.data.s_dormitory_2,
          money: that.data.money,
          requirement_customer: that.data.requirement_customer,
          requirement_delivery: e.detail.value.remark,
          telephone_delivery: app.globalData.telephone ,
          telephone_customer: that.data.telephone_customer,
          
        },
      },
      success(res) {
        console.log(res)
        wx.showModal({
          title: '接单成功',
          content: '注意送达时间！',
          showCancel: false,//是否显示取消按钮
          confirmText: "返回广场",//默认是“确定”
          confirmColor: '#fde073',//确定文字的颜色
          success: function (res) {
            if (res.confirm) {
              //点击确定
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("options.data:" +options.order_number)
    console.log("option:" + options)

    this.setData({
      order_number: options.order_number,
    })

    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_order_detail',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: options.order_number,
         // order_number: "",
        },
      },
      success(res) {
        console.log(res)
        that.setData({
          canteen: res.data.data.canteen,
          money: res.data.data.money,
          scheduled_delivery_time: res.data.data.scheduled_delivery_time,
          s_dormitory_1: res.data.data.s_dormitory_1,
          s_dormitory_2: res.data.data.s_dormitory_2,
          requirement_customer: res.data.data.requirement_customer,
          requirement_delivery: res.data.data.requirement_delivery,
          telephone_delivery: res.data.data.telephone_delivery,
          telephone_customer: res.data.data.telephone_customer,
          neutral_appraise: res.data.data.neutral_appraise,
          good_appraise: res.data.data.good_appraise,
          bad_appraise: res.data.data.bad_appraise,
          result_time: res.data.data.result_time
        })
        console.log(that.data.result_time)
      }

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

  }
})