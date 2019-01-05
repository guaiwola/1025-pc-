
window.addEventListener('DOMContentLoaded', function () {
    //获取dom元素
    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var headerDownNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content-main');
    var contentNode = document.querySelector('.content');

    var contentHeight = contentNode.offsetHeight;
    var arrowHalfWidth = arrowNode.offsetWidth / 2;
    var nowIndex = 0;
    var wheelTimer = null;

    //处理头部js代码
    headerHandle();
    function headerHandle() {
        arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2
            - arrowHalfWidth + 'px';
        headerDownNodes[0].style.width = '100%';

        for (var i = 0; i < headerLisNodes.length; i++) {
            headerLisNodes[i].index = i;
            headerLisNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }

    //公共move函数
    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width = '';
        }
        headerDownNodes[nowIndex].style.width = '100%';
        arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
            - arrowHalfWidth + 'px';
        contentUlNode.style.top = - nowIndex * contentHeight + 'px';
    }

    //内容区js代码
    contentHandle();
    function contentHandle() {
        //滚轮事件
        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll', wheel);

        function wheel(event) {
            event = event || window.event;
            clearTimeout(wheelTimer);
            wheelTimer = setTimeout(function () {
                var flag = '';
                if (event.wheelDelta) {
                    if (event.wheelDelta > 0) {
                        flag = 'up';
                    } else {
                        flag = 'down';
                    }
                } else if (event.detail) {
                    //firefox
                    if (event.detail < 0) {
                        flag = 'up';
                    } else {
                        flag = 'down';
                    }
                }

                switch (flag) {
                    case 'up' :
                        if (nowIndex > 0) {
                            nowIndex--;
                            move(nowIndex);
                        }
                        break;
                    case 'down' :
                        if (nowIndex < 4) {
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }

            }, 200);
            event.preventDefault && event.preventDefault();
            return false;
        }
    }

    //浏览器调整窗口大小事件
    window.onresize = function () {
        arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
            - arrowHalfWidth + 'px';
        contentUlNode.style.top = - nowIndex * contentHeight + 'px';
    }

    firstViewHandle();
    function firstViewHandle() {
        var homeCarouselNodes = document.querySelectorAll('.home-carousel li');
        var homePointNodes = document.querySelectorAll('.home-point li');

        var lastIndex = 0;
        var nowIndex = 0;

        for (var i = 0; i < homePointNodes.length; i++) {
            homePointNodes[i].index = i;
            homePointNodes[i].onclick = function () {
                //同步nowIndex的值
                nowIndex = this.index;

                if (nowIndex === lastIndex) return;

                if (nowIndex > lastIndex) {
                    //点击是右边  右边加上right-show  左边加上left-hide
                    homeCarouselNodes[nowIndex].className = 'common-title right-show';
                    homeCarouselNodes[lastIndex].className = 'common-title left-hide';
                } else {
                    //点击是左边
                    homeCarouselNodes[nowIndex].className = 'common-title left-show';
                    homeCarouselNodes[lastIndex].className = 'common-title right-hide';
                }

                homePointNodes[lastIndex].className = '';
                this.className = 'active';

                //同步上一次的值
                lastIndex = nowIndex;

            }
        }
    }


})