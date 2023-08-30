$(function() {
    // 默认支付方式
    $($('.pay-type-item')[0]).trigger('click');
});

// 支付方式选择
function selectPayType(obj) {
    var type = $(obj).data('type');
    // 重置支付方式
    $('#payment_type').val(type);
    // 在线支付 or 线下支付
    $('#payment_method').val(0);
    if ('hdfk_payOnDelivery' == type) $('#payment_method').val(1);
    // 余额支付执行
    $('#yezf_balance_tips').hide();
    if ('yezf_balance' == type) $('#yezf_balance_tips').show();
    // 重置选中标记
    $(obj).siblings().removeClass('active').end().addClass('active');
}

// 返回指定URL页面
function returnUrl(url) {
    if (url) {
        window.location.href = url;
    } else {
        layer.alert('没有指定URL页面', {icon:0, title: false, closeBtn: 0});
    }
}