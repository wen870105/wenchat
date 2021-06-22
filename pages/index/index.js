import request from '../../utils/request'

Page({
    mixins: [require('../../mixin/themeChanged')],

    data: {
        dialog2: false,
        counter1: 0,
        counter2: 0,
        counter3: 0,
        imgs: {}
    },

    onLoad: async function () {
        // 加载header广告
        let ret = await request('/wechat/headerImg')
        this.setData({
            imgs: ret.obj.imgs
        });
        let listRet = await request('/wechat/categoryStats', 'post')
        console.log("listRet:=", listRet);
        let list = listRet.obj;
        this.setData({
            counter1: list[0].sumCnt,
            counter2: list[1].sumCnt,
            counter3: list[2].sumCnt,
        });
    },
    listenSwiper: function (e) {
        console.log(e)
    },

    toList(e) {
        console.log(e.currentTarget.dataset.id + ' =,toList ：', e)
        // wx.switchTab({url: '/pages/list/list?categoryId=' + e.currentTarget.dataset.id})
        wx.reLaunch({url: '/pages/list/list?categoryId=' + e.currentTarget.dataset.id})
    },
    toLive(e) {
        wx.reLaunch({url: '/pages/live/live'})
    },
    toTop(e){
        wx.reLaunch({url: '/pages/top/top'})
    }


});