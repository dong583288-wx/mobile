// 表单验证
$(function () {
    $('#login-form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名name属性值
            username: {
                message: '用户名还没有验证',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 1,
                        max: 16,
                        message: '用户名长度在1到16位之间'
                    },
                    callback: {
                        message: '用户名不存在!'
                    }
                }
            },
            password: {
                message: '密码还没有验证',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度在6到16之间'
                    },
                    different: {
                        field: 'username',
                        message: '密码不能和用户名相同'
                    },
                    callback: {
                        message: '密码错误!'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        console.log($form.serialize())
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');
        // Use Ajax to submit form data使用ajax提交表单信息
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            dataTypa: 'json',
            success: function (data) {
                // 一共三种情况,用户名错误1000,密码错误1001,true
                if (data.success == true) {
                    // 用户名密码正确
                    window.location.href = "/mybackend/index.html"
                } else if (data.error == 1001) {
                    // 密码错误
                    $('#login-form').data("bootstrapValidator").updateStatus("username", "INVALID", 'callback');
                } else if (data.error == 1000) {
                    // 用户名错误
                    $('#login-form').data("bootstrapValidator").updateStatus("password", "INVALID", 'callback');

                }
            }
        })
    });
})