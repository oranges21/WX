// pages/index/index.js
import {apiLink} from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    linkarr:[],
    shoparr:[],
    pagenum:1,
    sectiondata:[
      {height:"400rpx",title:"优惠专区",img:"https://wxapp.im20.com.cn/impublic/waimai/imgs/index/dicount.jpg"},
      {height:"600rpx",title:"为你优选",img:"https://wxapp.im20.com.cn/impublic/waimai/imgs/index/preferred.jpg"},
      {height:"200rpx",title:"特色频道",img:"https://wxapp.im20.com.cn/impublic/waimai/imgs/index/special.jpg"},
    ],
    tapid:1,
    scrollDown:false,
    scrollHeight: 0, // 动态高度
  },
  tapFilter (value) {
    this.setData({
      tapid:value.target.dataset.id
    })
  },
  fun(){
    wx.navigateTo({
      url: '../../pages/shop/shop',
    })
  },
  onScroll(e){
    // console.log("滚动事件触发:", e);
    if (e.detail.scrollTop > 100) {
      this.setData({
        scrollDown: true,
      });
    } else if (e.detail.scrollTop < 100) {
      this.setData({
        scrollDown: false,
      });
    }
  },
  searchlink() {
    wx.navigateTo({
      url: './search'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '请等待！',
    })
    Promise.all([apiLink({
      url:"http://localhost:9988/swiperdata",
      method:"GET"
    }),
    apiLink({
      url:"http://localhost:9988/linkitem",
      method:"GET"
    }),
    apiLink({
      url:"http://localhost:9988/shops?_page=1&_limit=4",
      method:"GET"
    })
  ]).then((ok)=>{
    wx.hideLoading()
    this.setData({
      arr:ok[0].data,
      linkarr:ok[1].data,
      shoparr:ok[2].data
    })
  }).catch((err)=>{
    console.log(err);
  })
    //调用封装的数据请求
    // apiLink({
    //   url:"http://localhost:9988/swiperdata",
    //   method:"GET"
    // }).then((ok) => {
    //   console.log(ok);
    //   wx.hideLoading()
    //   this.setData({
    //     arr:ok.data
    //   })
    // }).catch((err)=>{
    //   console.log(err);
    // })
    // apiLink({
    //   url:"http://localhost:9988/linkitem",
    //   method:"GET"
    // }).then((ok) => {
    //   console.log(ok);
    //   wx.hideLoading()
    //   this.setData({
    //     arr:ok.data
    //   })
    // }).catch((err)=>{
    //   console.log(err);
    // })
    //动态计算高度
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight, // 设置 scroll-view 高度为窗口高度
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("触底事件触发");
    this.setData({
      pagenum:this.data.pagenum+1
    })
    apiLink({
      url:"http://localhost:9988/shops?_page="+this.data.pagenum+1+"&_limit=4",
      method:"GET"
    }).then((ok) => {
      // console.log(ok.data);
      this.setData({
        shoparr:[...this.data.shoparr,...ok.data]
      })
    }).catch((err)=>{
      console.log(err);
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})