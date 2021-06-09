import request from "../../utils/request";

function getRandomColor() {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length === 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}

Page({

    onReady() {
        this.videoContext = wx.createVideoContext('myVideo')
    },

    data: {
        dialog2: false,
        src: '',
        detail: {}
    },

    onLoad: async function (options) {
        console.log("options=", options)
        let ret = await request('/wechat/detail', {id: options.courseId})
        console.log("detail=", ret)
        this.setData({
            detail: ret.obj
        })
    },
    downloadPpt(e) {
        console.log('download ', e.currentTarget.dataset.id)
        wx.downloadFile({
            url: e.currentTarget.dataset.id,
            success: function (res) {
                console.log(res);
                var rr = res.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: rr,
                    success(res) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },
    close: function () {
        this.setData({
            dialog2: false
        });
    },
    open2() {
        this.setData({
            dialog2: true
        });
    },
    checkPwd:async function(e) {
        let ret = await request('/wechat/detail', {id: options.courseId})
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.value.pwd)
    // wx.request({
    //   url: 'http://127.0.0.1:8080/wechat/code',
    //   method: 'post',
    //   data: {
    //     code: res.code
    //   },
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })
}
})