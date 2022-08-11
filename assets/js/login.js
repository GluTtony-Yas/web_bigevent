$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui中获取from对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify（）函数定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}/, '密码必须6-12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, res => {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功!');
            $('#link_login').click()
        })
    })

    // 监听登陆表单的提交事件
    $('#form_login').on('submit', e => {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            // 快速获取表单数据
            data: $('#form_login').serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                // 将登陆成功得到的token字符串保存到loaclStorage中
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})