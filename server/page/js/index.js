(function () {

    function init() {
        sendAjax('GET', '/getUserMsg?offset=0&limit=8', function (res) {
            renderData(JSON.parse(res).rows, $('.contentTable1').find('.tab-body'));
            renderTurnPage('.contentTable1', JSON.parse(res).total, $(".contentTable1 .pagination"), 'getUserMsg', renderData, $('.contentTable1').find('.tab-body'), "#exampleModal1");
        })
        // $('#shangpin').on('click', function (){
            // 手机
            sendAjax('GET', '/getPhoneGoodsByPage?currentPage=0&pageSize=8', function (res) {
                renderData1(JSON.parse(res), $('.contentTable2 #phone').find('.tab-body'), "#exampleModal1", bindEvent1, $('.contentTable2 #phone'))
            })
            sendAjax('GET', '/getPhoneGoodsCount', function (res) {
                renderTurnPage('#phone', JSON.parse(res)[0].count, $(".contentTable2 #phone .pagination"), 'getPhoneGoodsByPage', renderData1, $('.contentTable2 #phone').find('.tab-body'), "#exampleModal1", bindEvent1, $('.contentTable2 #phone'));
            })
        // })
        // $('#clothes-tab').on('click', function () {
            // 服装
            sendAjax('GET', '/getClothesGoodsByPage?currentPage=0&pageSize=8', function (res) {
                renderData1(JSON.parse(res), $('.contentTable2 #clothes').find('.tab-body'), "#exampleModal2", bindEvent1, $('.contentTable2 #clothes'))
            })
            sendAjax('GET', '/getClothesGoodsCount', function (res) {
                renderTurnPage('#clothes', JSON.parse(res)[0].count, $(".contentTable2 #clothes .pagination"), 'getClothesGoodsByPage', renderData1, $('.contentTable2 #clothes').find('.tab-body'), "#exampleModal2", bindEvent1, $('.contentTable2 #clothes'));
            })
        // })
        // $('#beauty-tab').on('click', function () {
            // 美妆
            sendAjax('GET', '/getBeautyGoodsByPage?currentPage=0&pageSize=8', function (res) {
                renderData1(JSON.parse(res), $('.contentTable2 #beauty').find('.tab-body'), "#exampleModal3", bindEvent1, $('.contentTable2 #beauty'))
            })
            sendAjax('GET', '/getBeautyGoodsCount', function (res) {
                renderTurnPage('#beauty', JSON.parse(res)[0].count, $(".contentTable2 #beauty .pagination"), 'getBeautyGoodsByPage', renderData1, $('.contentTable2 #beauty').find('.tab-body'), "#exampleModal3", bindEvent1, $('.contentTable2 #beauty'));
            })
        // })
        // $('#other-tab').on('click', function () {
            // 其它
            sendAjax('GET', '/getOtherGoodsByPage?currentPage=0&pageSize=8', function (res) {
                renderData1(JSON.parse(res), $('.contentTable2 #other').find('.tab-body'), "#exampleModal4", bindEvent1, $('.contentTable2 #other'))
            })
            sendAjax('GET', '/getOtherGoodsCount', function (res) {
                renderTurnPage('#other', JSON.parse(res)[0].count, $(".contentTable2 #other .pagination"), 'getOtherGoodsByPage', renderData1, $('.contentTable2 #other').find('.tab-body'), "#exampleModal4", bindEvent1, $('.contentTable2 #other'));
            })
        // })
        // 订单管理
        sendAjax('GET', `/adminGetAllBuyGoodsList?offset=0&limit=6`, function (res) {
            console.log(JSON.parse(res))
            renderData2(JSON.parse(res).rows, $('#messages').find('.tab-body'))
            renderTurnPage2(JSON.parse(res).total);
        })
    }

    function sendAjax(type, url, success) {
        $.ajax({
            type: type,
            url: url,
            success: success,
            error: function (err) {
                console.error('网络错误');
            }
        })
    }

    // 用户管理页面
    function renderData(arr, dom, firstNum = 0) {
        var str = ''
        arr.forEach((ele, index) => {
            str += `<tr>
                        <td>${firstNum + index + 1}</td>
                        <td>${ele.user_name}</td>
                        <td>${ele.password}</td>
                        <td>${ele.gender}</td>
                        <td>${ele.age}</td>
                        <td>${ele.ctime}</td>
                        <td data=${index}>
                            <span class="updateInfo" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">编辑</span>
                            <span> | </span>
                            <span class="delInfo">删除</span>
                        </td>
                    </tr>`
        });
        dom.html(str);
        bindEvent(arr);
    }

    // 商品管理页面
    function renderData1(arr, dom, exampleModal, bindFunc, body, firstNum = 0) {
        var str = ''
        arr.forEach((ele, index) => {
            str += `<tr>
                        <td>${ele.user_name}</td>
                        <td>${ele.title}</td>
                        <td>${ele.price}</td>
                        <td>${ele.address}</td>
                        <td>${ele.introduce}</td>
                        <td>${ele.ctime}</td>
                        <td data=${index}>
                            <span class="updateInfo" data-toggle="modal" data-target=${exampleModal} data-whatever="@mdo">编辑</span>
                            <span> | </span>
                            <span class="delInfo">删除</span>
                        </td>
                    </tr>`
        });
        dom.html(str);
        bindFunc(arr, body, exampleModal);
    }

    // 订单管理
    function renderData2(arr, dom, firstNum = 0) {
        var str = ''
        arr.forEach((ele, index) => {
            str += `<tr>
                        <td>${firstNum + index + 1}</td>
                        <td>${ele.username}</td>
                        <td>${ele.goods_title}</td>
                        <td><img src="getPic?path=${ele.goods_img}" /></td>
                        <td>${ele.goods_price}</td>
                        <td>${ele.ctime}</td>
                        <td data=${index}>
                            <span class="delInfo">删除</span>
                        </td>
                    </tr>`
        });
        dom.html(str);
        bindEvent2(arr);
    }

    function renderTurnPage(type, total, dom, url, func, dom1, exampleModal, bindFunc, body) {
        var prevStr = `<li>
                            <a class="prev" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>`;
        var nextStr = `<li>
                            <a class="next" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>`;       
        var len = Math.ceil(total / 8);
        var str = '';
        for(var i = 0; i < len; i ++) {
            str += `<li><a class="num" href="#">${i + 1}</a></li>`;
        }
        dom.html(prevStr + str + nextStr);
        truePageClick(type, len, url, func, dom1, exampleModal, bindFunc, body)
    }

    function truePageClick(type, num, url, func, dom, exampleModal, bindFunc, body) {
        for(let i = 0; i < num; i ++) {
            $(type +" .pagination li").find(".num").eq(i).on('click', function() {
                // i * 8
                console.log(func == renderData)
                if (func == renderData) {
                    sendAjax('GET', `/${url}?offset=${i * 8}&limit=8`, function (res) {
                        func(JSON.parse(res).rows, dom, i * 8);
                    })
                } else {
                    sendAjax('GET', `/${url}?currentPage=${i}&pageSize=8`, function (res) {
                        func(JSON.parse(res), dom, exampleModal, bindFunc, body, i * 8);
                    })
                }
            })
        }
    }

    function bindEvent(res) {
        
        $('.contentTable1').find('.updateInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            console.log(data);
            $('.contentTable1').find('.user-name').val(data.user_name);
            $('.contentTable1').find('.password').val(data.password);
            $('.contentTable1').find('.des').text(data.describe);
        })
        $('.contentTable1').find('.btn-primary').on('click', function () {
            var userName = $('.contentTable1').find('.user-name').val();
            var password = $('.contentTable1').find('.password').val();
            var des = $('.contentTable1').find('.des').val();
            if (userName && password && des) {
                console.log(userName,password,des)
                sendAjax('GET', `/updateUserMsg?username=${userName}&password=${password}&describe=${des}`, function (res) {
                    if (JSON.parse(res).msg == '用户信息修改成功') {
                        alert('用户信息修改成功')
                        window.location.reload()
                    }
                })
            } else {
                alert('请填写完整信息');
            }
        })
        $('.contentTable1').find('.delInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            sendAjax('GET', `/delUserMsg?username=${data.user_name}`, function (res) {
                if (JSON.parse(res).msg == '用户信息删除成功') {
                    alert('该用户已成功注销')
                    window.location.reload()
                }
            })
        })
    }

    // 商品管理
    function bindEvent1(res, body, exampleModal) {
        var $goodsId = null;
        body.find('.updateInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            $goodsId = data.goods_id;
            body.find('.goods-name').val(data.title);
            body.find('.goods-price').val(data.price);
            body.find('.goods-ad').val(data.address);
            body.find('.goods-des').val(data.introduce);
        })
        body.find('.delInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            sendAjax('GET', `/deleatGoods?id=${data.goods_id}`, function (res) {
                if (JSON.parse(res).msg == '商品删除成功') {
                    alert('商品删除成功')
                    window.location.reload()
                }
            })
        })
        body.find('.btn-primary').on('click', function () {
            var goodName = body.find('.goods-name').val();
            var goodPrice = body.find('.goods-price').val();
            var goodAd = body.find('.goods-ad').val();
            var goodDes = body.find('.goods-des').val();
            if (goodName && goodPrice && goodAd && goodDes) {
                sendAjax('GET', `/AdminUpdateGoodList?title=${goodName}&price=${goodPrice}&address=${goodAd}&introduce=${goodDes}&goods_id=${$goodsId}`, function (res) {
                    if (JSON.parse(res).msg == '商品信息修改成功') {
                        alert('商品信息修改成功')
                        // $(exampleModal).css('display', 'none');
                        // $('.modal-backdrop').remove();
                        // $("body").css("overflow-y","auto");
                        // $("body").css("overflow-x","auto");
                        // init();
                        window.location.reload()
                    }
                })
            } else {
                alert('请填写完整信息');
            }
        })
    }

    // 订单管理
    function bindEvent2(res) {
        $('#messages').find('.delInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            sendAjax('GET', `adminDelBuyGoods?buyGoodsId=${data.buy_goods_id}`, function (res) {
                if (JSON.parse(res).msg == '用户订单删除成功') {
                    alert('用户订单删除成功')
                    window.location.reload()
                }
            })
        })
        $('#messages').find('.btn-default').on('click', function () {
            var val = $('#messages').find('.form-control').val();
            if (val.trim()) {
                sendAjax('GET', `adminGetBuyGoodsByUsername?username=${val}`, function (res) {
                    // console.log(JSON.parse(res));
                    if (JSON.parse(res).msg == '用户订单数据查询成功') {
                        renderData2(JSON.parse(JSON.parse(res).data), $('#messages').find('.tab-body'))
                    } else if (JSON.parse(res).msg == '用户暂无订单数据') {
                        $('#messages').find('.tab-body').html('用户暂无订单数据');
                    } else {
                        $('#messages').find('.tab-body').html('用户名不存在，请输入正确的用户名');
                    }
                    $('#messages').find('.page').css('display', 'none');
                    $('#messages').find('.go').css('display', 'block');
                    $('#messages').find('.err-tip').css('display', 'none');
                })
            } else {
                $('#messages').find('.err-tip').css('display', 'block');
            }
        })
        $('#messages').find('.go').on('click', function () {
            sendAjax('GET', `/adminGetAllBuyGoodsList?offset=0&limit=6`, function (res) {
                $('#messages').find('.form-control').val('');
                $('#messages').find('.go').css('display', 'none');
                $('#messages').find('.page').css('display', 'block');
                renderData2(JSON.parse(res).rows, $('#messages').find('.tab-body'))
                renderTurnPage2(JSON.parse(res).total);
            })
        })
    }

    function renderTurnPage2(total) {
        var prevStr = `<li>
                            <a class="prev" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>`;
        var nextStr = `<li>
                            <a class="next" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>`;       
        var len = Math.ceil(total / 6);
        var str = '';
        for(var i = 0; i < len; i ++) {
            str += `<li><a class="num" href="#">${i + 1}</a></li>`;
        }
        $("#messages .pagination").html(prevStr + str + nextStr);
        truePageClick2(len)
    }

    function truePageClick2(num) {
        for(let i = 0; i < num; i ++) {
            $("#messages .pagination li").find(".num").eq(i).on('click', function() {
                // i * 6
                sendAjax('GET', `/adminGetAllBuyGoodsList?offset=${i * 6}&limit=6`, function (res) {
                    renderData2(JSON.parse(res).rows, $('#messages').find('.tab-body'), i * 6);
                })
            })
        }
    }

    init();

})()