$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素 
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 
        aspectRatio: 1,
        // 指定预览区域 
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options)

    $('#btnUpImg').on('click', () => {
        $('#file').click()
    })
    // 为文件选择框绑定change事件
    $('#file').on('change', e => {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请上传图片!')
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3. 先 销毁 旧的裁剪区域，再 重新设置图片路径 ，之后再 创建新的裁剪区域 ：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域 
            .attr('src', newImgURL) // 重新设置图片路径 
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#btnUpload').on('click', () => {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布 
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!')
                }
                layer.msg('更换头像成功!')
                window.parent.getUserInfo()
            }
        })
    })
})