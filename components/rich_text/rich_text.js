// components/rich_text/rich_text.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    firstCon:{
      type:String,
      value: wx.getStorageSync('focus')
    },
    initlist:{ // 用于初始化数据，例如，编辑富文本
      type:Array,
      value: []
    },
    save: {
      type: String,
      value:'save'
    },
    max_length:{ // 传入图片上限，默认为4
      type:Number,
      value:9
    }
  },
  options: { // 允许接受外部样式，根据个人喜好来处理
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    dataList:[],
    focusList:[{
      focus:false
    }],
    firstCon:'',
    isEdit:true,
    addImgView:{},
    insertIndex:0,
    width:375,
    dataText:[],
    dataImg:[]
  },
  created(){
    let that = this;
    // console.log('1')
    that.data.addImgView = that.selectComponent("#addimg");
  },
  
  attached() { // 当组件挂载到页面时，才会执行初始化
    let that = this;
    // console.log(that.data.focusList)
    that._initRichText();
    that._transportData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
    传入storage的数据；
    */
    _transportData(){
      let that = this;
      if (wx.getStorageSync('focusList')){
        that.data.focusList = wx.getStorageSync('focusList')
      }
      that.data.firstCon=wx.getStorageSync('focus')
      that.data.dataText=wx.getStorageSync('textArr')
      that.data.dataImg = wx.getStorageSync('imageArr')
      let i = 0;
      for ( i in that.data.dataImg){
      that.data.dataList.push({
        img: that.data.dataImg[i],
        info: that.data.dataText[i]
      })
      that.setData({
        dataList: that.data.dataList
      })
      }
      that.setData({
        firstCon: that.data.firstCon,
        focusList: that.data.focusList
      })
    },
    /**
     * 内部方法
     * 初始化富文本方法
     */
    _initRichText(){
      let that = this;
      if (that.data.initlist && that.data.initlist.length>0){// 初始化数据不为空
        for (let i = 0; i < that.data.initlist.length;i++){
          if(i===0){
            if (that.data.initlist[i].type===0){
              that.data.firstCon = that.data.initlist[0].info;
            }else{
              that.data.dataList.push({
                img: that.data.initlist[i].info,
                info: ''
              })
              that.data.focusList.push({
                focus: false
              })
            }
          } else {               
            if (that.data.initlist[i].type === 0) { // 文字
              that.data.dataList[that.data.dataList.length - 1].info = that.data.initlist[i].info;
            } else {
              that.data.dataList.push({
                img: that.data.initlist[i].info,
                info: ''
              })
              that.data.focusList.push({
                focus: false
              })
            }
          }           
        }
        that.setData({
          firstCon:that.data.firstCon,
          focusList: that.data.focusList,
          dataList:that.data.dataList,
          insertIndex: that.data.dataList.length
        })
      }
      // console.log('hello')    
    },
    /**
     * 富文本文字输入监听
     */
    _inputCon(e){
      let that = this;
      let index = +e.currentTarget.dataset.index;
      if(index === 0){
        that.data.firstCon = e.detail.value;
      }else{
        that.data.dataList[index - 1].info = e.detail.value;
      }
    },
    /**
     * 文本框获取焦点监听
     */
    _focusView(e){
      let that = this;
      let index = +e.currentTarget.dataset.index;
      // console.log(e.currentTarget.dataset.index)
      that.data.focusList = that.data.focusList.map(item => {
        item.focus = false;
        return item;
      });
      that.data.focusList[index].focus = true;
      that.setData({
        focusList: that.data.focusList,
        isEdit: true
      })
    },
    /**
     * 内部方法
     * 文本框失去焦点的监听事件
     * 存储失去焦点的文本框位置，为插入图片作准备
     */
    _outBlur(e){
      let that = this;
      that.data.insertIndex = +e.currentTarget.dataset.index;
      that.setData({
        firstCon:that.data.firstCon,
        dataList:that.data.dataList,
        isEdit: false
      })
    },
    /**
     * 内部方法
     * 调用添加图片事件监听
     * 此处没有做太多处理，下次添加一个上传图片的组件
     * demo存贮的是本地的临时链接，自己要自己处理哦
     */
    _addImg(){
      let that = this;
      if(that.data.dataList.length<that.data.max_length){
        wx.chooseImage({
          success: function(res) {
            that.data.dataList.splice(that.data.insertIndex, 0, {
              img: res.tempFilePaths[0],
              info: ''
            })
            that.data.focusList.splice(that.data.insertIndex + 1, 0, {
              focus: false
            })
            that.setData({
              dataList: that.data.dataList,
              focusList: that.data.focusList,
              insertIndex: that.data.insertIndex+1
            })
          },
        })
      }else{
        wx.showToast({
          title: '最多只能添加'+that.data.max_length+'张图片哦',
          mask:true,
          duration:1000
        })
      }
    },
    /**
     * 内部方法
     * 删除图片
     */
    _deletedImg(e){
      let that = this;
      let index = +e.currentTarget.dataset.index;
      if(that.data.dataList[index].info){
        wx.removeStorageSync('imageArr')
        if(index === 0){ // 最后一个
          that.data.firstCon = that.data.firstCon + that.data.dataList[index].info;
         
        }else{
          that.data.dataList[index - 1].info = that.data.dataList[index - 1].info + that.data.dataList[index].info;
        }
      }
      that.data.dataList.splice(index,1);
      that.setData({
        firstCon: that.data.firstCon,
        dataList: that.data.dataList
      })
    },
    /**
     * 暴露出来的方法
     * 返回 富文本数据list
     */
    _saveRichText(){
      let that = this;
      wx.setStorageSync('focusList', that.data.focusList)
      let list = [];
      if(that.data.firstCon){
        list.push({
          info: that.data.firstCon,
          type: 2
        })
      }else{
        wx.removeStorageSync('focus')
      }
      console.log(that.data.dataList)
      if (that.data.dataList.length!==0){
      that.data.dataList.forEach(item => {
        if(item.img){
          list.push({
            info: item.img,
            type: 1
          })
        }
        if(item.info){
          list.push({
            info: item.info,
            type: 0
          })
        }
      })
      }else{
        wx.removeStorageSync('textArr')
        wx.removeStorageSync('imageArr')
      }
      // console.log(that.data.dataList)
      that.triggerEvent('getDataList', list);
    }
  }
})
