// index.js
// 获取应用实例
import request from '../../utils/request'

const app = getApp()

Page({
    data: {
        motto: 'Hello World111',
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    // 事件处理函数
    bindViewTap() {
        console.log("login")
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo
                    })
                }
            })
        }
    },

    getUserInfo: async function (e) {
        console.log("getUserInfo=", e)
        wx.login({
            success: async (res) => {
                if (res.code) {

                    let ret = await request('/wechat/code', {code: res.code}, 'POST')
                    console.log('code ' + res.code + ",ret=", ret)
                    if (ret.code == '200') {
                        wx.setStorage({
                            key: "token",
                            data: ret.obj.token
                        })

                        app.globalData.userInfo = e.detail.userInfo
                        this.setData({
                            userInfo: e.detail.userInfo
                        })

                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else {
                        console.log('code ' + res.code + ",ret=", ret)
                        wx.showToast({
                            title: '登录失败,请重新登录',
                            icon: 'error',
                            duration: 2000
                        })
                    }
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    }
})
