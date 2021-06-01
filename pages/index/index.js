import request from '../../utils/request'

Page({
    mixins: [require('../../mixin/themeChanged')],

    data: {
        dialog2: false,
        courseList: {},
        imgs: {}
    },

    onLoad: async function () {
        // 加载header广告
        let ret = await request('/wechat/headerImg')
        let listRet = await request('/wechat/list',{"pageIndex":1},'post')

        this.setData({
            imgs: ret.obj.imgs,
            courseList: listRet.obj.result
        });
        
    },
    listenSwiper: function (e) {
        console.log(e)
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
    toDetail(e){
        console.log('toDetail ：' , e)
        wx.reLaunch({url: '/pages/detail/detail?courseId='+e.currentTarget.dataset.id})
    },
    checkPwd(e) {
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


});