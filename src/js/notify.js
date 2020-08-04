    window.onload = function () {
        var ifra = document.getElementById('U+'); //选中iframe   
        var test = ifra.contentWindow.document.getElementsByClassName('qst-tecs-src-layout-header-studentHeader_');
        // test[0].style.display = "none";
        test[0].style.height = "0";

        //通过contentWindow来查询iframe内部元素
        // for (var i = 0; i < test.length; i++) {
        //     var tmp = test[i];
        //     console.log(tmp);
        //     tmp.style.height = "20px";
        // }

    }