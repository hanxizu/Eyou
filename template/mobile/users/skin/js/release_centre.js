// 编辑内容
function editArchives(obj) {
    window.location.href = $(obj).attr('data-editurl');
}

// 单个删除发布的内容
function delArchives(obj) {
    unifiedConfirmBox('是否删除该投稿？', '380px;', '200px;', function() {
        $.ajax({
            url : $(obj).attr('data-url'),
            data: {del_id: $(obj).attr('data-id')},
            type: 'post',
            dataType: 'json',
            success: function(res) {
                layer.closeAll();
                if (1 === parseInt(res.code)) {
                    showSuccessMsg(res.msg, function() {
                        window.location.reload();
                    });
                } else {
                    showErrorMsg(res.msg);
                }
            },
            error: function(e) {
                layer.closeAll();
                showErrorAlert(e.responseText);
            }
        });
    });
}

// 批量删除发布的内容
function batchDelArchives(obj, name) {
    var a = [];
    $('input[name^=' + name + ']').each(function(i, o) {
        if ($(o).is(':checked')) {
            a.push($(o).val());
        }
    })
    if (a.length == 0) {
        unifiedRemindBox('请至少选择一项！', '380px;', '200px;');
        return false;
    }

    unifiedConfirmBox('确认批量彻底删除？', '380px;', '200px;', function() {
        $.ajax({
            url : $(obj).attr('data-url'),
            data: {del_id: a},
            type: 'post',
            dataType: 'json',
            success: function(res) {
                layer.closeAll();
                if (1 === parseInt(res.code)) {
                    showSuccessMsg(res.msg, function() {
                        window.location.reload();
                    });
                } else {
                    showErrorMsg(res.msg);
                }
            },
            error: function(e) {
                layer.closeAll();
                showErrorAlert(e.responseText);
            }
        });
    });
}