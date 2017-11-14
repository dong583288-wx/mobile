$(function () {
    // 页面载入显示数据
    var getFirstData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            dataType: 'json',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                // console.log(data)
                // 启用模版引擎
                var firstResult = template('first-template', data)
                // 加入
                $('tbody').html(firstResult)
                // 分页
                $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    itemTexts: function (type, page, current) { //设置显示的样式，默认是箭头
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    /*点击页面事件*/
                    onPageClicked: function (event, originalEvent, type, page) {
                        /*改变当前页再渲染 page当前点击的按钮的页面*/
                        getFirstData(page);
                    }
                });
            }
        })
    }

    //  调用getFirstData
    getFirstData()

    // 1.进行表单验证 --bootstrap-validator 按照现在的情况 是已经废弃了
    // http://blog.csdn.net/u013938465/article/details/53507109
    $('#login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            username: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 16,
                        message: '用户名长度在1到16位之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
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
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // console.log($form.serialize());
        // console.log($form); 
        // serialize(); 序列化 
        // send() 对象-- 这是自己传
        // http协议要的是什么 键值对  key=value&key1=value1
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');
        // 使用ajax提交表单数据
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
               console.log(data)
            //    加进来得刷新
                getFirstData();
            }
        })
    });
})