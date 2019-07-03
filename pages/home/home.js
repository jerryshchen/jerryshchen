// pages/home/home.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusCon: '',
    textArr: '',
    imageArr: [],
    focusList:''
  },
  bindTextBlur:function(e){
    wx.getStorage({
      key: 'textArr',
      success: function(res) {},
    })
  },
  navigateToRichText:function(e){
    wx.navigateTo({
      url: '/pages/rich_text/rich_text',
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that = this;
    that.transportData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that = this;
    that.transportData()
  },
  transportData(){
    that = this;
    let arr1 = []
    let arr2 = []
    that.data.focusCon= ''
    that.data.textArr= ''
    that.data.imageArr = []
    arr1 = wx.getStorageSync('textArr')
    arr2 = wx.getStorageSync('imageArr')
    that.data.focusCon = wx.getStorageSync('focus')
    if (arr1) {
      that.data.textArr = arr1.join('\n')
    }
    // console.log(that.data.focusCon)
    that.data.imageArr = []
    for (let i in arr2) {
      that.data.imageArr[i] = arr2[i]
    }
    // console.log(that.data.imageArr)
    // console.log(textArr)
    that.setData({
      focus: that.data.focusCon,
      textArr: that.data.textArr,
      imageArr: that.data.imageArr
    })
  },
  changeImage(){
    wx.chooseImage({
      success: function(res) {
        that.data.imageArr=[]
        that.data.focusList = []
        that.data.imageArr.push(res.tempFilePaths)
        for (let i in that.data.imageArr[0]){
          that.data.focusList.splice(0, 0, {
            focus: false
          })
        }
        that.data.focusList.splice(0, 0, {
          focus: false
        })
        wx.setStorageSync('focusList', that.data.focusList)
        wx.setStorageSync('imageArr', that.data.imageArr[0])
        that.setData({
          imageArr: that.data.imageArr[0]
        })
      },
    })
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