// page/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    src1: '/img/chicken/yummy2.png',
    src2: '/img/chicken/happy2.png',
    src3: '/img/chicken/ono2.png',
    result: "0",
    head_link: '',
    order_number: 0,
    telephone: "",
    telephone1: "",
    telephone2: "",
  },
  click1: function() {
    this.setData({
      src1: '/img/chicken/yummy.png',
      src2: '/img/chicken/happy2.png',
      src3: '/img/chicken/ono2.png',
      result: "0"
    })
  },
  click2: function() {
    this.setData({
      src1: '/img/chicken/yummy2.png',
      src3: '/img/chicken/ono2.png',
      src2: '/img/chicken/happy.png',
      result: "1"
    })
  },
  click3: function() {
    this.setData({
      src1: '/img/chicken/yummy2.png',
      src2: '/img/chicken/happy2.png',
      src3: '/img/chicken/ono.png',
      result: "2"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("评价")
    console.log("options.order_number:" + options.order_number)
    console.log("options:" + options)

    this.setData({
      order_number: options.order_number
    })
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_order_detail',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number
        }
      },

      success(res) {
        console.log(res)
        that.setData({
          //head_link: res.data.data.head_link,
          telephone1: res.data.data.telephone_customer,
          telephone2: res.data.data.telephone_delivery,
          order_number: res.data.data.order_number
        })
        console.log("customer：" + that.data.telephone1)
        console.log("delivery:" + that.data.telephone2)
        //筛选出要评价的是对方
        if (that.data.telephone1 == app.globalData.telephone) {
          that.setData({
            telephone: that.data.telephone2
          })
        } else {
          that.setData({
            telephone: that.data.telephone1
          })
        }
        wx.request({
          url: 'https://www.sssxfd.top:8080/show_personal_information',
          method: "POST",
          header: {
            'content-type': ' application/json'
          },
          data: {
            error_code: 0,
            data: {
              telephone: that.data.telephone,
            }
          },
          //加载出被评价人的订单
          success(res) {
            console.log(res)
            that.setData({
              head_link: res.data.data[0].head_link
            })
          }
        })
      }
    })
  },
  submit: function() {
    var that = this;
    
    console.log("res:" + this.data.result)
    console.log("tel:" + this.data.telephone)

    wx.request({
      url: 'https://www.sssxfd.top:8080/content',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
          telephone: that.data.telephone,
          flag: that.data.result
        }
      },
      success(res) {
        console.log("ord_num:" + that.data.order_number)
        console.log("res:" + that.data.result)
        console.log("tel:" + that.data.telephone)
        console.log("res:" + res)
        wx.showModal({
          title: '评价成功',
          content: '',
          showCancel: false, //是否显示取消按
          confirmText: "确定", //默认是“确定”
          confirmColor: '#fde073', //确定文字的颜色
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack({
                url: '/pages/myorder/myorder',
              })
            }
          },
          fail: function(res) {}, //接口调用失败的回调函数
          complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
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