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
        src: '',
        courseId: ""
    },
    onLoad: function (options) {
        console.log("options=", options)
        this.setData({
            courseId: options.courseId
        })
        console.log("courseId=", this.data.courseId)
    },
    bindInputBlur(e) {
        this.inputValue = e.detail.value
    },

    bindButtonTap() {
        const that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: ['front', 'back'],
            success(res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    },

    bindPlayVideo() {
        console.log('1')
        this.videoContext.play()
    },
    bindSendDanmu() {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: getRandomColor()
        })
    },

    videoErrorCallback(e) {
        console.log('视频错误信息:')
        console.log(e.detail.errMsg)
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
    }
})