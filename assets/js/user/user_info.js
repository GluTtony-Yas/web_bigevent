$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用form.val（）快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', e => {
        e.preventDefault()
        initUserInfo()
    })
    // 监听表单提交事件
    $('.layui-form').on('submit', e => {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
                window.parent.getUserInfo()
            }
        })
    })
})