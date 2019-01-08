//等待页面加载（所有资源  图片、音、视频等资源）完成，才会调用此函数
window.addEventListener('DOMContentLoaded', function () {
    //获取dom元素
    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var headerDownNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content-main');
    var contentNode = document.querySelector('.content');
    var navBarNodes = document.querySelectorAll('.nav-bar li');
    var musicNode = document.querySelector('.music');
    var musicIconNode = document.querySelector('.music-icon');
    var homeNode = document.querySelector('.home');
    var planeNodes = document.querySelectorAll('.course-plane');
    var pencilNodes = document.querySelectorAll('.works-pencil');
    var aboutUlNodes = document.querySelectorAll('.about-photo');
    var teamTitleNode = document.querySelector('.team-title');
    var teamContentNode = document.querySelector('.team-content');

    var contentHeight = contentNode.offsetHeight;
    var arrowHalfWidth = arrowNode.offsetWidth / 2;
    var nowIndex = 0;
    var lastIndex = 0;
    var wheelTimer = null;

    var animationArr = [
        {
            anOut: function () {
                homeNode.style.transform = 'translateY(-200px)';
                homeNode.style.opacity = 0;
            },
            anIn: function () {
                homeNode.style.transform = 'translateY(0)';
                homeNode.style.opacity = 1;
            }
        },
        {
            anOut: function () {
                planeNodes[0].style.transform = 'translate(-200px, -200px)';
                planeNodes[1].style.transform = 'translate(-200px, 200px)';
                planeNodes[2].style.transform = 'translate(200px, -200px)';
            },
            anIn: function () {
                planeNodes[0].style.transform = 'translate(0, 0)';
                planeNodes[1].style.transform = 'translate(0, 0)';
                planeNodes[2].style.transform = 'translate(0, 0)';
            }
        },
        {
            anOut: function () {
                // 上 下 下
                pencilNodes[0].style.transform = 'translateY(-200px)';
                pencilNodes[1].style.transform = 'translateY(200px)';
                pencilNodes[2].style.transform = 'translateY(200px)';
            },
            anIn: function () {
                pencilNodes[0].style.transform = 'translateY(0)';
                pencilNodes[1].style.transform = 'translateY(0)';
                pencilNodes[2].style.transform = 'translateY(0)';
            }
        },
        {
            anOut: function () {
                aboutUlNodes[0].style.transform = 'rotate(45deg)';
                aboutUlNodes[1].style.transform = 'rotate(-45deg)';
            },
            anIn: function () {
                aboutUlNodes[0].style.transform = 'rotate(0)';
                aboutUlNodes[1].style.transform = 'rotate(0)';
            }
        },
        {
            anOut: function () {
                teamTitleNode.style.transform = 'translateX(-200px)';
                teamContentNode.style.transform = 'translateX(200px)';
            },
            anIn: function () {
                teamTitleNode.style.transform = 'translateX(0)';
                teamContentNode.style.transform = 'translateX(0)';
            }
        }
    ];
    for (var i = 0; i < animationArr.length; i++) {
        animationArr[i].anOut();
    }

    //开机
    bootAnimation();
    function bootAnimation() {
        var bootAnimationLineNode = document.querySelector('.boot-animation .line');
        var bootAnimationTopNode = document.querySelector('.boot-animation .top');
        var bootAnimationBottomNode = document.querySelector('.boot-animation .bottom');
        var bootAnimationNode = document.querySelector('.boot-animation');
        var imageArr = ['bg1.png','bg2.png','bg3.png','bg4.png','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
        var num = 0;
        var length = imageArr.length
        for (var i = 0; i < length; i++) {
            var item = imageArr[i];
            var image = new Image();
            image.src = './imgs/' + item;

            image.onload = function () {
                num++;
                bootAnimationLineNode.style.width = num / length * 100 + '%';
                if (num === length) {
                    bootAnimationTopNode.style.height = 0;
                    bootAnimationBottomNode.style.height = 0;
                    bootAnimationLineNode.style.display = 'none';

                    bootAnimationTopNode.addEventListener('transitionend', function () {
                        bootAnimationNode.remove();
                        animationArr[0].anIn();
                    })
                }
            }
        }
    }

    //处理头部
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

    //公共
    function move(nowIndex) {
        headerDownNodes[lastIndex].style.width = '';
        navBarNodes[lastIndex].className = '';
        headerDownNodes[nowIndex].style.width = '100%';
        arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
            - arrowHalfWidth + 'px';
        contentUlNode.style.top = - nowIndex * contentHeight + 'px';
        navBarNodes[nowIndex].className = 'active';
        animationArr[lastIndex].anOut();
        animationArr[nowIndex].anIn();

        lastIndex = nowIndex;
    }

    //内容区
    contentHandle();
    function contentHandle() {
        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll', wheel);

        function wheel(event) {
            event = event || window.event;
            clearTimeout(wheelTimer);
            wheelTimer = setTimeout(function () {
                var flag = '';
                if (event.wheelDelta) {
                    //ie/chrome
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

    //第一屏
    firstViewHandle();
    function firstViewHandle() {
        var homeCarouselNodes = document.querySelectorAll('.home-carousel li');
        var homePointNodes = document.querySelectorAll('.home-point li');

        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        var timer = null;

        for (var i = 0; i < homePointNodes.length; i++) {
            homePointNodes[i].index = i;
            homePointNodes[i].onclick = function () {
                var nowTime = Date.now();
                console.log(nowTime);
                if (nowTime - lastTime <= 2000) return;
                lastTime = nowTime;
                nowIndex = this.index;
                if (nowIndex === lastIndex) return;

                if (nowIndex > lastIndex) {
                    homeCarouselNodes[nowIndex].className = 'common-title right-show';
                    homeCarouselNodes[lastIndex].className = 'common-title left-hide';
                } else {
                    homeCarouselNodes[nowIndex].className = 'common-title left-show';
                    homeCarouselNodes[lastIndex].className = 'common-title right-hide';
                }
                homePointNodes[lastIndex].className = '';
                this.className = 'active';
                lastIndex = nowIndex;

            }
        }

        homeNode.onmouseenter = function () {
            clearInterval(timer);
        }

        homeNode.onmouseleave = autoPlay;

        //自动轮播
        autoPlay();
        function autoPlay() {
            timer = setInterval(function () {
                nowIndex++;
                lastTime = Date.now();

                if (nowIndex >= 4) nowIndex = 0;

                homeCarouselNodes[nowIndex].className = 'common-title right-show';
                homeCarouselNodes[lastIndex].className = 'common-title left-hide';

                homePointNodes[lastIndex].className = '';
                homePointNodes[nowIndex].className = 'active';

                lastIndex = nowIndex;
            }, 2100)
        }

    }

    //第五屏
    lastViewHandle();
    function lastViewHandle() {
        var teamUlNode = document.querySelector('.team-person');
        var teamLiNodes = document.querySelectorAll('.team-person li');

        var width = teamLiNodes[0].offsetWidth;
        var height = teamLiNodes[0].offsetHeight;
        var canvas = null;
        var createCircleTimer = null;
        var paintingTimer = null;

        for (var i = 0; i < teamLiNodes.length; i++) {
            teamLiNodes[i].index = i;
            teamLiNodes[i].onmouseenter = function () {
                for (var j = 0; j < teamLiNodes.length; j++) {
                    teamLiNodes[j].style.opacity = 0.5;
                }
                this.style.opacity = 1;

                if (!canvas) {
                    canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    canvas.className = 'canvas';
                    bubble(canvas);

                    teamUlNode.appendChild(canvas);
                }
                canvas.style.left = this.index * width + 'px';
            }
        }

        teamUlNode.onmouseleave = function () {
            for (var j = 0; j < teamLiNodes.length; j++) {
                teamLiNodes[j].style.opacity = 1;
            }
            canvas.remove();
            canvas = null;
            clearInterval(createCircleTimer);
            clearInterval(paintingTimer);
        }

        function bubble(canvas) {

            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
                var width = canvas.width;
                var height = canvas.height;

                var arr = [];
                //生成圆
                createCircleTimer = setInterval(function () {
                    var r = Math.round(Math.random() * 255);
                    var g = Math.round(Math.random() * 255);
                    var b = Math.round(Math.random() * 255);

                    var c_r = Math.round(Math.random() * 8 + 2);

                    var s = Math.round(Math.random() * 50 + 20);

                    var y = height + c_r;
                    var x = Math.round(Math.random() * width);

                    arr.push({
                        r: r,
                        g: g,
                        b: b,
                        c_r: c_r,
                        x: x,
                        y: y,
                        deg: 0,
                        s: s
                    })

                }, 50);
                //画圆
                paintingTimer = setInterval(function () {
                    ctx.clearRect(0, 0, width, height);

                    for (var i = 0; i < arr.length; i++) {
                        var item = arr[i];
                        item.deg+=6;
                        var rad = item.deg * Math.PI / 180;
                        var x = item.x + Math.sin(rad) * item.s;
                        var y = item.y - rad * item.s;
                        if (y <= -item.c_r) {
                            arr.splice(i, 1);
                            continue;
                        }

                        ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
                        ctx.beginPath();
                        ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
                        ctx.fill();

                    }

                }, 1000 / 60)

            }
        }

    }
    for (var i = 0; i < navBarNodes.length; i++) {
        navBarNodes[i].index = i;
        navBarNodes[i].onclick = function (ev) {
            nowIndex = this.index;
            move(nowIndex);
        }
    }
    //音乐播放
    musicIconNode.onclick = function () {
        if (musicNode.paused) {
            musicNode.play();
            this.style.backgroundImage = 'url("./imgs/musicon.gif")';
        } else {
            musicNode.pause();
            this.style.backgroundImage = 'url("./imgs/musicoff.gif")';
        }
    }
})