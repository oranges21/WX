export let apiLink=(obj)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
     ...obj,
      success:(ok)=>{
        resolve(ok)
      },
      fail:(error)=>{
        reject(error)
      }
    })
  })
}