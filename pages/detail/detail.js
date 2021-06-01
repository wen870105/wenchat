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