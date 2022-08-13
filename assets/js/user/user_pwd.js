$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: value => {
            if (value === $('.layui-form-item [name=oldPwd]').val()) {
                return '新旧密码不能一致!'
            }
        },
        rePwd: value => {
            if (value !== $('.layui-form-item [name=newPwd]').val()) {
                return '两次密码不一致!'
            }
        }
    })
    $('.layui-form').on('submit', e => {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})