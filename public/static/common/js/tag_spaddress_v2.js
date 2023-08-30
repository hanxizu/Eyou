var jsonData = aeb461fdb660da59b0bf4777fab9eea;
var showHeight = '200px;';
var showWidth = 1 === parseInt(jsonData.is_wap) ? '380px;' : '480px;';

// 添加收货地址
function ShopAddAddress(obj) {
    var wechat_addr_url = jsonData.shop_get_wechat_addr_url;
    if (wechat_addr_url) {
        window.location.href = wechat_addr_url;
        return false;
    }
    var url = jsonData.shop_add_address;
    if (url.indexOf('?') > -1) {
        url += '&';
    } else {
        url += '?';
    }
    url += 'type=list';
    //iframe窗
    layer.open({
        type: 2,
        title: '添加收货地址',
        shadeClose: false,
        maxmin: false, //开启最大化最小化按钮
        area: [jsonData.addr_width, jsonData.addr_height],
        content: url
    });
}

// 更新收货地址
function ShopEditAddress(addr_id){
    event.stopPropagation();
    var url = jsonData.shop_edit_address;
    if (url.indexOf('?') > -1) {
        url += '&';
    } else {
        url += '?';
    }
    url += 'addr_id='+addr_id;
    //iframe窗
    layer.open({
        type: 2,
        title: '修改收货地址',
        shadeClose: false,
        maxmin: false, //开启最大化最小化按钮
        area: [jsonData.addr_width, jsonData.addr_height],
        content: url
    });
}

// 删除收货地址
function ShopDelAddress(addr_id) {
    unifiedConfirmBox('确认删除收货地址？', showWidth, showHeight, function() {
        $.ajax({
            url : jsonData.shop_del_address,
            data: {addr_id: addr_id},
            type: 'post',
            dataType: 'json',
            success: function(res) {
                layer.closeAll();
                if (1 === parseInt(res.code)) {
                    showSuccessMsg(res.msg);
                    $("#"+addr_id+'_ul_li').remove();
                } else {
                    showErrorMsg(res.msg);
                }
            },
            error: function (e) {
                layer.closeAll();
                showErrorAlert(e.responseText);
            }
        });
    });
}

// 设置默认
function SetDefault(obj, addr_id) {
    var is_default = $(obj).attr('data-is_default');
    if (1 === parseInt(is_default)) return false;
    unifiedConfirmBox('确认设置为默认？', showWidth, showHeight, function() {
        layer_loading('正在处理');
        $.ajax({
            url : jsonData.shop_set_default,
            data: {addr_id: addr_id},
            type: 'post',
            dataType: 'json',
            success: function(res) {
                layer.closeAll();
                if (1 === parseInt(res.code)) {
                    var id = addr_id + '_color';
                    var spans = $('#' + jsonData.UlHtmlId).find('span[data-setbtn=1]');
                    spans.each(function() {
                        if (id == this.id) {
                            $('#'+this.id).html('默认地址');
                            $('#'+this.id).css('color', 'red');
                            $('#'+this.id).attr('data-is_default', 1);
                            $('#'+addr_id+'_ul_li').children('div.address-item').addClass('cur');
                        } else {
                            $('#'+this.id).html('设为默认');
                            $('#'+this.id).css('color', '#76838f');
                            $('#'+this.id).attr('data-is_default', 0);
                            $('#'+$(this).attr('data-attr_id')+'_ul_li').children('div.address-item').removeClass('cur');
                        }
                    });
                } else {
                    showErrorMsg(res.msg);
                }
            },
            error: function (e) {
                layer.closeAll();
                showErrorAlert(e.responseText);
            }
        });
    });
}

// 选中收货地址，返回到下单提交页面 - 第二套会员中心
function selectAddress_v201146(addr_id, obj) {
    event.stopPropagation();
    setCookies_v201146('PlaceOrderAddrid', addr_id);
    var gourl = $('input[name=gourl]').val();
    if (gourl && gourl.length > 0) {
        window.location.href = gourl;
    }
}

// 设置cookie
function setCookies_v201146(name, value, time) {
    var cookieString = name + "=" + escape(value) + ";";
    if (time != 0) {
        var Times = new Date();
        Times.setTime(Times.getTime() + time);
        cookieString += "expires="+Times.toGMTString()+";"
    }
    document.cookie = cookieString+"path=/";
}

function returnUrl(url) {
    window.location.href = url;
}