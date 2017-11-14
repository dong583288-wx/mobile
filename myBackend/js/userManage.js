$(function () {
    // 获取呈现数据 (利用ajax多次获取)
    var getUserManageData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: pageNum || 1,
                pageSize: 2
            },
            success: function (data) {
                // 启用模版
                var userManageList = template('usermanage-template', data)
                // 把那道的数据放到页面中
                $('table tbody').html(userManageList)
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
                        getUserManageData(page);
                    }
                });
            }
        })
    }

    // 调用获取数据的函数,在页面刚在如时执行
    getUserManageData()

    // 禁用启用功能
    $('tbody').on('click', '.btn', function () {
        var name = $(this).data('name')
        var id = $(this).data('id')
        // 判断按钮的类名确定isDelete的值(1代表禁用0启用)
        var isDelete = $(this).hasClass("btn-danger") ? 1 : 0;

        // 根据点击的禁用还是启用设置相应状态
        if (isDelete == 1) {
            $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要禁用' + name + '吗?')
        } else {
            $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要启用' + name + '吗?')
        }

        $('#manage-modal').on('click', '.btn-primary', function () {
            // 把禁用启用的信息用ajax发给后台
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                dataType: 'json',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    if (data.success == true) {
                        $('#manage-modal').modal('hide')
                        // 重新刷新页面
                        getUserManageData()
                    }
                }
            })
        })


    })

})