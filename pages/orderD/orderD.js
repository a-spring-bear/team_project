// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_number:0,
    canteen:"",
    s_dormitory_1:"",
    s_dormitory_2: "",
    money:"",
    scheduled_delivery_time:"",
    requirement_customer:"",
    requirement_delivery:"",
    neutral_appraise: 0,
    good_appraise: 0,
    bad_appraise: 0,
    telephone_delivery:"",
    telephone_customer:"",
    result_time: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit:function(e){
    console.log("确定点单-门号：" + e.detail.value.men)
    console.log("确定点单-备注：" + e.detail.value.remark)

    var that=this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/get_order',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
          order_type: 0,
          order_status: 1,
          canteen: that.data.canteen,
          s_dormitory_1: that.data.s_dormitory_1,
          s_dormitory_2: e.detail.value.men,
          money: that.data.money,
          requirement_customer: e.detail.value.remark,
          requirement_delivery: that.data.requirement_delivery,
          telephone_customer: app.globalData.telephone,  
          telephone_delivery: that.data.telephone_delivery,         
        },
      },
      success(res) {
        console.log(res)
        wx.showModal({
          title: '点单成功',
          content: '用餐愉快！',
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
  onLoad: function(options) {
    console.log("options.order_number:"+options.order_number)
    console.log("options:" + options)

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
          order_number: that.data.order_number,
        },
      },
      success(res) {
        console.log(res)

        that.setData({
          canteen:res.data.data.canteen,
          s_dormitory_1: res.data.data.s_dormitory_1,
          scheduled_delivery_time: res.data.data.scheduled_delivery_time,
          money: res.data.data.money,
          requirement_customer: res.data.data.requirement_customer,
          requirement_delivery: res.data.data.requirement_delivery,
          s_dormitory_2: res.data.data.s_dormitory_2,
          neutral_appraise: res.data.data.neutral_appraise,
          good_appraise: res.data.data.good_appraise,
          bad_appraise: res.data.data.bad_appraise,
          telephone_delivery: res.data.data.telephone_delivery,
          telephone_customer: res.data.data.telephone_customer,
          result_time: res.data.data.result_time
        })
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