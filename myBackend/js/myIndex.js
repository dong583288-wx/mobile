// 该文件用于写首页的js交互

// 1.进度条
// 不要进度条显示圆圈
NProgress.configure({
    showSpinner: false
});

// $.ajax( {
//     type:请求方式
//     url:请求地址
//     data:请求数据
//     beforesend:function () { 请求开始时执行 }
//     success:function () { 请求成功时执行 }
//     error:function() { 失败时的回调函数 }
//     commplete:function () { 请求完成时的回调 }
// })

// ajax全局事件
// $().ajaxStart() 文档中某个ajax调用开始
// $().ajaxComplete()某个ajax调用完成

// 全局监听 当页面中某个ajax请求发起的时候,进度条开始
$(window).ajaxStart(function () {
    NProgress.start()
})

//  当ajax请求完成时,进度条也完成
$(window).ajaxComplete(function () {
    NProgress.done()
})

//  功能2: 点击左侧的惨淡按钮,让左侧的侧边栏消失,右侧的内容占满全屏
var bar = $('[data-menu]')
bar.on('click', function () {
    $('.lt-aside').toggle()
    $('.lt-section').toggleClass('menu')
})


//  点击分类管理滑出菜单
$('.menu').on('click', '[href="javascript:;"]', function () {
    // console.log(1);
    var _this = $(this);

    var child = _this.siblings('.child');
    console.log(child);
    child.slideToggle();
})


// 4.功能:点击退出按钮,弹出遮罩层 发起请求  退出用户登录
// 1.点击确定按钮
$('#myModal').on('click', '.out', function () {
    // console.log(1)
    // 2.发起ajax请求
    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        data: {},
        dataType: 'json',
        success: function (data) {
            //    console.log(data)
            if (data.success == true) {
                $('#myModal').modal('hide');
                setTimeout(function () {
                    location.href = './login.html'
                }, 500);
            }
        }
    })
})