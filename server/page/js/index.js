(function () {

    function init() {
        sendAjax('GET', '/getUserMsg?offset=0&limit=8', function (res) {
            renderData(JSON.parse(res).rows, $('.contentTable1').find('.tab-body'));
            renderTurnPage(JSON.parse(res).total);
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

    function renderTurnPage(total) {
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
        $(".pagination").html(prevStr + str + nextStr);
        truePageClick(len)
    }

    function truePageClick(num) {
        for(let i = 0; i < num; i ++) {
            $(".pagination li").find(".num").eq(i).on('click', function() {
                // i * 8
                sendAjax('GET', `/getUserMsg?offset=${i * 8}&limit=8`, function (res) {
                    renderData(JSON.parse(res).rows, $('.contentTable1').find('.tab-body'), i * 8);
                })
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
            var des = $('.contentTable1').find('.des').text();
            if (userName && password && des) {
                sendAjax('GET', `/updateUserMsg?username=${userName}&password=${password}&describe=${des}`, function (res) {
                    console.log(res);
                    // window.location.reload()
                })
            } else {
                alert('请填写完整信息');
            }
        })
        $('.contentTable1').find('.delInfo').on('click', function () {
            var data = res[ $(this).parent().attr('data') ];
            sendAjax('GET', `/delUserMsg?${data.user_name}`, function (res) {
                console.log(res);
                // window.location.reload()
            })
        })
    }

    init();

})()