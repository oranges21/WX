export let apiLink=(data)=>{
  return new Promise((resolve,reject)=>{
      wx.request({
        ...data,
        success(ok){
          resolve(ok)
        },
        fail(error){
          reject(error)
        }
      })
  })
}