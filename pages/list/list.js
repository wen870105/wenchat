import request from '../../utils/request'

Page({

    data: {
        dialog2: false,
        courseList: {},
        imgs: {}
    },

    onLoad: async function (options) {
        console.log("options=", options)
        // 加载header广告
        let ret = await request('/wechat/headerImg')
        this.setData({
            imgs: ret.obj.imgs
        });
        let listRet = await request('/wechat/list', {pageIndex: 1, categoryId: options.categoryId}, 'post')
        this.setData({
            courseList: listRet.obj.result
        });
    },

    listenSwiper: function (e) {
        console.log(e)
    },

    toDetail(e) {
        console.log(e.currentTarget.dataset.id + ' =,toDetail ：', e)
        wx.reLaunch({url: '/pages/detail/detail?courseId=' + e.currentTarget.dataset.id})
    }


});