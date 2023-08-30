    // 修改密码
    function ChangePwd()
    {
        var url = eyou_basefile + "?m=user&c=Users&a=change_pwd";
        //iframe窗
        layer.open({
            type: 2,
            title: '修改密码',
            shadeClose: false,
            maxmin: false, //开启最大化最小化按钮
            area: ['350px', '300px'],
            content: url
        });
    }
