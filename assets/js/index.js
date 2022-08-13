$(function () {
    var layer = layui.layer
    getUserInfo()
    // 点击按钮，实现退出功能
    $('#btnLoginout').on('click', function () {
        layer.confirm('是否退出登陆！', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转登陆页面
            location.href = './login.html'
            // 关闭confirm询问框
            layer.close(index)
        });
    })
})
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: res => {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用 renderAvatar()渲染用户头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.跳转回登陆页面
        //         location.href = './login.html'
        //     }
        // }
    })
    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        }
        else {
            var first = name[0].toUpperCase()
            $('.layui-nav-img').hide()
            $('.text-avatar').html(first).show()
        }
    }
}