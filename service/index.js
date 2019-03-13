/**
 * data: 2019.3.12
 * params: http-request
 * author: guoguo
 */
var Fly = require('./fly.min.js')
var fly = new Fly()
/**
 * config:配置
 * {
  headers:{}, //http请求头，
  baseURL:"", //请求基地址
  timeout:0,//超时时间，为0时则无超时限制
  //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
  parseJson:true,
  params:{}, //默认公共的url get参数
  withCredentials:false //跨域时是否发送cookie
}
 */
fly.config.timeout = 10 * 1000
// fly.config.baseURL = 'https://movie.douban.com'
/**
 * 请求拦截器
 */
//添加请求拦截器
fly.interceptors.request.use(request => {
    //给所有请求添加自定义header
    request.headers['X-Tag'] = 'flyio';

    wx.showLoading({
        title: '加载中...',
    })
    //打印出请求体
    //   console.log(request.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    response => {
        //只将请求结果的data字段返回
        setTimeout(function () {
            wx.hideLoading()
        }, 200)
        return response.data
    },
    err => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
    }
)
function fetch(url, params, methods, config) {
    var responseType = config ? (config.responseType || "") : ""
    return new Promise((res) => {
        fly
            .request(url, params, {
                method: methods,
                headers: { 'Content-Type': 'application/json' },
                responseType: responseType || ""
            })
            .then(response => {
                res(response)
            })
            .catch(error => {
                console.log(error)
            })
    })

}
function getJson(url, params = {}) {
    return fetch(url, params, 'get')
}
function postJson(url, params = {}, config) {
    console.log(config)
    return fetch(url, params, 'post', config)
}
export { getJson, postJson }
