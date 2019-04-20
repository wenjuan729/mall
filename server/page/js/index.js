(function () {

    function init() {
        sendAjax('GET', '/getUserMsg?offset=0&limit=8', function (res) {
            renderData(JSON.parse(res).rows, $('.contentTable1').find('.tab-body'));
            renderTurnPage('.contentTable1', JSON.parse(res).total, $(".contentTable1 .pagination"), 'getUserMsg', renderData, $('.contentTable1').find('.tab-body'), "#exampleModal1");
        })
        // 手机
        sendAjax('GET', '/getPhoneGoodsByPage?currentPage=0&pageSize=8', function (res) {
            renderData1(JSON.parse(res), $('.contentTable2 #phone').find('.tab-body'), "#exampleModal1", bindEvent1)
        })
        sendAjax('GET', '/getPhoneGoodsCount', function (res) {
            renderTurnPage('#phone', JSON.parse(res)[0].count, $(".contentTable2 #phone .pagination"), 'getPhoneGoodsByPage', renderData1, $('.contentTable2 #phone').find('.tab-body'), "#exampleModal1", bindEvent1);
        })
        // 服装
        sendAjax('GET', '/getClothesGoodsByPage?currentPage=0&pageSize=8', function (res) {
            renderData1(JSON.parse(res), $('.contentTable2 #clothes').find('.tab-body'), "#exampleModal2", bindEvent1)
        })
        sendAjax('GET', '/getClothesGoodsCount', function (res) {
            renderTurnPage('#clothes', JSON.parse(res)[0].count, $(".contentTable2 #clothes .pagination"), 'getClothesGoodsByPage', renderData1, $('.contentTable2 #clothes').find('.tab-body'), "#exampleModal2", bindEvent1);
        })
        // 美妆
        sendAjax('GET', '/getBeautyGoodsByPage?currentPage=0&pageSize=8', function (res) {
            renderData1(JSON.parse(res), $('.contentTable2 #beauty').find('.tab-body'), "#exampleModal2", bindEvent1)
        })
        sendAjax('GET', '/getBeautyGoodsCount', function (res) {
            renderTurnPage('#beauty', JSON.parse(res)[0].count, $(".contentTable2 #beauty .pagination"), 'getBeautyGoodsByPage', renderData1, $('.contentTable2 #beauty').find('.tab-body'), "#exampleModal2", bindEvent1);
        })
        // 其它
        sendAjax('GET', '/getOtherGoodsByPage?currentPage=0&pageSize=8', function (res) {
            renderData1(JSON.parse(res), $('.contentTable2 #other').find('.tab-body'), "#exampleModal2", bindEvent1)
        })
        sendAjax('GET', '/getOtherGoodsCount', function (res) {
            renderTurnPage('#other', JSON.parse(res)[0].count, $(".contentTable2 #other .pagination"), 'getOtherGoodsByPage', renderData1, $('.contentTable2 #other').find('.tab-body'), "#exampleModal2", bindEvent1);
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
    function renderData1(arr, dom, exampleModal, bindFunc, firstNum = 0) {
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
        bindFunc(arr);
    }

    function renderTurnPage(type, total, dom, url, func, dom1, exampleModal, bindFunc) {
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
        truePageClick(type, len, url, func, dom1, exampleModal, bindFunc)
    }

    function truePageClick(type, num, url, func, dom, exampleModal, bindFunc) {
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
                        func(JSON.parse(res), dom, exampleModal, bindFunc, i * 8);
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

    function bindEvent1(res) {
        // 手机
        var $goodsId = null;
        $('.contentTable2 #phone').find('.updateInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            $goodsId = res[ $(this).parent().attr('data') ].goods_id;
            $('.contentTable2 #phone').find('.goods-name').val(data.title);
            $('.contentTable2 #phone').find('.goods-price').val(data.price);
            $('.contentTable2 #phone').find('.goods-ad').val(data.address);
            $('.contentTable2 #phone').find('.goods-des').val(data.introduce);
        })
        $('.contentTable2 #phone').find('.btn-primary').on('click', function () {
            var goodName = $('.contentTable2 #phone').find('.goods-name').val();
            var goodPrice = $('.contentTable2 #phone').find('.goods-price').val();
            var goodAd = $('.contentTable2 #phone').find('.goods-ad').val();
            var goodDes = $('.contentTable2 #phone').find('.goods-des').val();
            if (goodName && goodPrice && goodAd && goodDes) {
                sendAjax('GET', `/AdminUpdateGoodList?title=${goodName}&price=${goodPrice}&address=${goodAd}&introduce=${goodDes}&goods_id=${$goodsId}`, function (res) {
                    console.log(JSON.parse(res));
                    if (JSON.parse(res).msg == '商品信息修改成功') {
                        alert('商品信息修改成功')
                        $('#exampleModal1').css('display', 'none');
                        $('.modal-backdrop').css('display', 'none')
                        init();
                    }
                })
            } else {
                alert('请填写完整信息');
            }
        })
    }

    init();

})()