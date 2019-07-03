// pages/rich_text/rich_text.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "textArr":[],
    "imageArr":[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
  },
  saveData(e){
    let _val
    // console.log(e.detail.length)
    that.data.textArr = []
    that.data.imageArr = []
    that.data.focus = ''
    //push to text or image
    let i = 0;
    // wx.setStorageSync('focus', e.detail[0].info)
    wx.removeStorageSync('textArr')
    for(i in e.detail){
      // console.log(e.detail[i])
      //textArr数据
      if (e.detail[i].type === 0) {
        that.data.textArr.push(e.detail[i].info)
        wx.setStorageSync('textArr', that.data.textArr)
      }
      //image数据
      if (e.detail[i].type === 1) {
        that.data.imageArr.push(e.detail[i].info)
        wx.setStorageSync('imageArr', that.data.imageArr)
      }
      //focus数据
      if(e.detail[i].type === 2){
        that.data.focus = e.detail[i].info
        wx.setStorageSync('focus', that.data.focus)
      }
    }
    wx.navigateBack()
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