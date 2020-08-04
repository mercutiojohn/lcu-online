// var iframe = document.getElementsByTagName("iframe");
// iframe[1].onload = function () {
//     alert("iframe load  done");
// };
// import Grid from 'vue-js-grid'
// Vue.use(Grid);
// document.querySelector("body").style.filter = "blur(120px)";

var vm = new Vue({
    el: '#view',
    data: {
        // items: [
        //     'a',
        //     'b',
        //     'c'
        // ],
        date: '',
        currentItem: {},
        wrap: {
            status: true
        },
        bgStatus: true,
        lowQuality: true,
        save: ['', ''],
        notes: "",
        img_url: 'img/',
        done: [],
        searchWrapDisplay: false,
        timeWrapDisplay: false,
        notiWrapDisplay: false,
        todoDisplay: true,
        leftColDisplay: false,
        musicWrapDisplay: false,
        timePreferences: {
            showSecond: false,
            twelveFormat: true,
            twelveLabel: ''
        },
        mainTabColor: '',
        blocksPreferences: {
            showAll: false
        },
        targetUrl: {
            "title": "百度一下，你就知道",
            "url": "http://www.baidu.com/s",
            "queryWord": "wd"
        },
        searchUrls: {
            doge: {
                "title": "多吉",
                "url": "https://www.dogedoge.com/results",
                "queryWord": "q"
            },
            wenku: {
                "title": "文库",
                "url": "https://wenku.baidu.com/search",
                "queryWord": "word"
            },
            mdn: {
                "title": "MDN",
                "url": "https://developer.mozilla.org/zh-CN/search",
                "queryWord": "q"
            },
            google: {
                "title": "谷歌",
                "url": "https://www.google.com/search",
                "queryWord": "q"
            },
            baidu: {
                "title": "百度",
                "url": "http://www.baidu.com/s",
                "queryWord": "wd"
            },
            ibook: {
                "title": "i-Book.in",
                "url": "https://book.tstrs.me/psdle",
                "queryWord": "q"
            },



        },
        musicSites: [{
                //     title: "滴答清单",
                //     status: true,
                //     bg: 'white',
                //     url: "https://www.dida365.com/webapp/#q/all/today"
                // }, {
                title: "白噪音",
                status: false,
                bg: 'transparent',
                icon: "neteasemusic.svg",
                url: "https://music.163.com/outchain/player?type=4&id=526504585&auto=1&height=520"
            }, {
                title: "Hits",
                status: false,
                bg: 'transparent',
                url: "https://embed.music.apple.com/us/playlist/todays-hits/pl.f4d106fed2bd41149aaacabb233eb5eb?app=music",
                icon: "applemusic.svg"

            }, {
                title: "音乐盒",
                status: false,
                // bg: 'transparent',
                bg: 'transparent',
                icon: "neteasemusic.svg",
                url: "https://music.163.com/outchain/player?type=0&id=4995805373&auto=1&height=520",
            }, {
                title: "私藏",
                status: false,
                bg: 'black',
                icon: "neteasemusic.svg",
                url: "https://mp.music.163.com/5c1c8d76bea7983a7b58ce2d/fm.html"
            }, {
                title: "DI.FM",
                status: false,
                bg: 'black',
                icon: "neteasemusic.svg",
                url: "https://music.163.com/st/difm/index.html"
            }, {
                title: "A-Pop",
                status: false,
                bg: 'transparent',
                url: "https://embed.music.apple.com/us/playlist/a-list-pop/pl.5ee8333dbe944d9f9151e97d92d1ead9?app=music",
                icon: "applemusic.svg"

            }, {
                title: "能量充电",
                status: true,
                bg: 'transparent',
                url: "https://embed.music.apple.com/cn/playlist/%E8%83%BD%E9%87%8F%E5%85%85%E7%94%B5/pl.pm-d5779e520ff52d7f1461ff2469dc00ff",
                icon: "applemusic.svg"

            }, {
                title: "B站动态",
                status: false,
                bg: 'white',
                icon: "bilibili.png",
                url: "https://t.bilibili.com/pages/nav/index_new"
            }

        ],
        noti: [{
                title: "学习通",
                status: true,
                url: "http://notice.chaoxing.com/pc/notice/myNotice"
            }, {
                title: "U+",
                status: false,
                url: "http://ee-c.lcu.edu.cn/si/student/studentInform"
            },
            {
                title: "传智播客",
                status: false,
                url: "http://stu.ityxb.com/notice/msg"
            }

        ],
        links: [{
                title: "教务系统",
                url: "http://jwcweb.lcu.edu.cn/jwglxt/xtgl/login_slogin.html",
                icon: "",
                color: "white"
            }, {
                title: "聊大VPN",
                url: "https://vpn.lcu.edu.cn/",
                icon: "",
                color: "white"
            }, {
                title: "Apple Music",
                url: "https://music.apple.com/",
                icon: "applemusic.svg",
                color: "white"
            }, {
                title: "网易云音乐",
                url: "https://music.163.com/#/my",
                icon: "neteasemusic.svg",
                color: "white"
            }, {
                title: "Telegram",
                url: "https://web.telegram.org/",
                icon: "telegram.svg",
                color: "white"
            }, {
                title: "Twitter",
                url: "https://twitter.com/home",
                icon: "twitter.svg",
                color: "white"
            }, {
                title: "鸠摩搜书",
                url: "https://www.jiumodiary.com/",
                icon: "",
                color: "white"
            }, {
                title: "FreeCodeCamp",
                url: "https://www.freecodecamp.one/",
                icon: "",
                color: "white"
            }, {
                title: "Runoob",
                url: "http://www.runoob.com/",
                icon: "",
                color: "white"
            }, {
                title: "LeetCode",
                url: "https://leetcode.com/problemset/all/",
                icon: "",
                color: "white"
            }, {
                title: "Kuangbin带你飞",
                url: "https://vjudge.net/article/187",
                icon: "",
                color: "white"
            }, {
                title: "日历",
                icon: "",
                url: "https://outlook.live.com/calendar/0/"
            }, {
                title: "学习通",
                icon: "",

                url: "http://i.chaoxing.com/base"
            },
            {
                title: "U+",
                icon: "",

                url: "http://ee-c.lcu.edu.cn/si/student/group"
            },
            {
                title: "Unipus",
                icon: "",

                url: "http://210.44.112.108"
            },
            {
                title: "传智播客",
                icon: "",

                url: "http://stu.ityxb.com/Classroom/course/learning"
            },
            {
                title: "Runoob",
                icon: "",

                url: "http://runoob.com/"
            },
            {
                title: "斗鱼",
                icon: "",

                url: "https://www.douyu.com/directory/myFollow"
            },
            {
                title: "We Learn",
                icon: "",

                url: "https://welearn.sflep.com/2019/student/index.aspx"
            },
            {
                title: "有道",
                icon: "",
                url: "https://ke.youdao.com/user/mycourse/"

            },
            {
                title: "千锋",
                icon: "",

                url: "http://nz.1000phone.com/studentIndex"
            },
            {
                title: "B站",
                icon: "",

                url: "https://space.bilibili.com/4325844/favlist"
            },
            {
                title: "腾讯课堂",
                icon: "",

                url: "https://imissu.ke.qq.com/user/index/index.html"
            },
            {
                title: "计划",
                icon: "",

                url: "https://www.notion.so/mercutio/8029f70aeeaf44fc9312f788507414fd"
            }
        ],
        //DataBases
        platforms: [{
                "title": "超星",
                "img": "chaoxing.png",
                "bgColor": "#b52831",
                "color": 1
            }, {
                "title": "BiliBili",
                "img": "bilibili.png",
                "bgColor": "#00b5e5",
                "color": 1
            },
            {
                "title": "U+工科云",
                "img": "uplus.png",
                "bgColor": "#1e83ca",
                "color": 1
            },
            {
                "title": "传智播客",
                "img": "ityxb.png",
                "bgColor": "",
                "color": 0
            },
            {
                "title": "有道精品课",
                "img": "youdao.png",
                "bgColor": "#0bb55a",
                "color": 1
            },
            {
                "title": "中国大学MOOC",
                "img": "mooc.png",
                "bgColor": "",
                "color": 0
            },
            {
                "title": "Unipus",
                "img": "unipus.png",
                "bgColor": "#289cfb",
                "color": 1
            },
            {
                "title": "文件",
                "img": "",
                "bgColor": "",
                "color": 0
            },
            {
                "title": "批改网",
                "img": "pigai.png",
                "bgColor": "#28aae1",
                "color": 1
            }, {
                "title": "优学院",
                "img": "youxy.png",
                "bgColor": "#ea5145",
                "color": 1
            }, {
                "title": "U+(校外)",
                "img": "uplus.png",
                "bgColor": "#1e83ca",
                "color": 1
            }, {
                "title": "斗鱼",
                "img": "douyu.svg",
                "bgColor": "#ea5145",
                "color": 1
            },
        ],

        tabs: [
            // {
            //     title: "日历",
            //     status: false,
            //     url: "https://outlook.live.com/calendar/0/"
            // },
            {
                title: "导航",
                status: false,
                url: "http://i.chaoxing.com/base"
            },
            {
                title: "学习通",
                status: false,
                url: "http://i.chaoxing.com/base"
            },
            {
                title: "U+",
                status: false,
                url: "http://ee-c.lcu.edu.cn/si/student/group"
            },
            {
                title: "Unipus",
                status: false,
                url: "http://210.44.112.108"
            },
            {
                title: "传智播客",
                status: false,
                url: "http://stu.ityxb.com/Classroom/course/learning"
            }, {
                title: "滴答清单",
                status: false,
                url: "https://www.dida365.com/webapp/#q/all/today"
            }, {
                title: "自定义",
                status: false,
                url: "https://www.baidu.com/"
            }
            // {
            //     title: "Runoob",
            //     status: false,
            //     url: "http://runoob.com/"
            // },
            // {
            //     title: "斗鱼",
            //     status: false,
            //     url: "https://www.douyu.com/directory/myFollow"
            // },
            // {
            //     title: "We Learn",
            //     status: false,
            //     url: "https://welearn.sflep.com/2019/student/index.aspx"
            // },
            // {
            //     title: "有道",
            //     url: "https://ke.youdao.com/user/mycourse/",
            //     status: false
            // },
            // {
            //     title: "千锋",
            //     status: false,
            //     url: "http://nz.1000phone.com/studentIndex"
            // },
            // {
            //     title: "B站",
            //     status: false,
            //     url: "https://space.bilibili.com/4325844/favlist"
            // },
            // {
            //     title: "腾讯课堂",
            //     status: false,
            //     url: "https://imissu.ke.qq.com/user/index/index.html"
            // },
            // {
            //     title: "",
            //     status: false,
            //     url: ""
            // },
            // {
            //     title: "计划",
            //     status: false,
            //     url: "https://www.notion.so/mercutio/8029f70aeeaf44fc9312f788507414fd"
            // }

        ],

        blocks: [{
            "title": "六级",
            "url": [{
                "title": 5,
                "ref": "https://live.youdao.com/live/index.html?courseId=50664&lesson=2808486&type=1&groupId=-1"
            }, {
                "title": 5,
                "note": "详情页",
                "ref": "https://ke.youdao.com/course/detail/50664"
            }]

        }, {
            "title": "Java",
            "url": [{
                    "title": 4,
                    "ref": "http://stu.ityxb.com/learning/3b97338b3d7546e6936aabd43f7d16a9/preview/list"
                }, {
                    "title": 3,
                    "ref": "http://ee-c.lcu.edu.cn/si/student/studentHeadline/fb017e8c6e789fd9016f0ee96f2d3285/stuCourseInfo"
                }


            ]
        }, {
            "title": "数据库",
            "url": [{
                    "title": 3,
                    "note": "王玉亭",
                    "ref": "http://ee-c.lcu.edu.cn/si/student/studentHeadline/8a7d8a95703d185c01704941e4ac1c63/teachClassStudent"
                }, {
                    "title": 2,
                    "note": "清华大学",
                    "ref": "https://www.bilibili.com/video/av20449194",
                },
                {
                    "title": 3,
                    "ref": "http://ee-c.lcu.edu.cn/si/student/studentHeadline/8a7d8a95703d185c0170438b164e0e01/teachClassStudent"
                }, {
                    "title": 12,
                    "ref": "https://www.douyu.com/2398207"
                }
            ]
        }, {
            "title": "操作系统",
            "url": [{
                    "title": 2,
                    "note": "王道",
                    "ref": "https://www.bilibili.com/video/av70156862",
                }, {
                    "note": "清华大学",
                    "title": 2,
                    "ref": "https://www.bilibili.com/video/av6538245?p=38"
                },
                {
                    "title": 1,
                    "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=206110716&clazzid=12235279&vc=1&cpi=111705708&enc=bf057bda6247443f83107bcb0a9c8280"
                },
            ]
        }, {
            "title": "英语",
            "url": [{
                    "title": 1,
                    "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=205991712&clazzid=11988613&vc=1&cpi=111705708&enc=5631fa62522de5e965a295121b2fbfac",
                },
                {
                    "title": 7,
                    "ref": "http://210.44.112.108/book/book184/index.php?Quiz=N&whichActionPage="
                },
                {
                    "title": 9,
                    "ref": "http://www.pigai.org/index.php?c=write&a=myclass&f2=login"
                }
            ]
        }, {
            "title": "概率论",
            "url": [{
                "title": 1,
                "note": "木叔·期末",
                "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=211385159&clazzid=24036284&vc=1&cpi=111705708&enc=09e2a0a81536875d9a857ad629ffd029"
            }, {
                "title": 1,
                "note": "孟之天",
                "ref": "https://mooc1-1.chaoxing.com/mycourse/studentstudy?chapterId=220494725&courseId=207354731&clazzid=14743425&enc=eed97f64c9fa8563d5339dd8ab5ab9d5"
            }, {
                "title": 2,
                "note": "宋浩",
                "ref": "https://www.bilibili.com/video/av36206436"
            }, {
                "title": 2,
                "note": "熙哥·基础知识",
                "ref": "https://www.bilibili.com/video/av46968562"
            }, {
                "title": 2,
                "note": "熙哥·总复习",
                "ref": "https://www.bilibili.com/video/av46963412"
            }]
        }, {
            "title": "信息安全",
            "url": [{
                    "title": 1,
                    "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=207249971&clazzid=14930293&vc=1&cpi=111705708&enc=e454a5f8505f2152eb41c36cee1b3860",
                },
                {
                    "title": 6,
                    "ref": "https://www.icourse163.org/learn/UESTC-1003046001?tid=1450291448#/learn/content"
                },
            ]
        }, {
            "title": "团队激励",
            "url": [{
                    "title": 3,
                    "ref": "http://ee-c.lcu.edu.cn/si/student/studentHeadline/fb017e8c6f7b40d50170051da1a23929/teachClassStudent",
                },
                {
                    "title": 1,
                    "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=206154273&clazzid=12280027&vc=1&cpi=111705708&enc=8ecc8a9eb332bff5933d64040d9c2230"
                },
                {
                    "title": 11,
                    "ref": "https://www.eec-cn.com/si/student/studentHeadline/ff808081705d9b1a01706178fe2c69ea/WebcastList"
                }
            ]
        }, {
            "title": "电子创新设计与实践",
            "url": [{
                "title": 1,
                "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=206800366&clazzid=14695409&vc=1&cpi=111705708&enc=2b0d88d82a0507b0f0c78c0845beb90b"
            }, ]
        }, {
            "title": "数学建模-工科班",
            "url": [{
                "title": 1,
                "ref": "https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=206188383&vc=1&clazzid=12340999&enc=eabaa8ccce45db9f646bc2967cd6e6e6"
            }, ]
        }, {
            "title": "毛概",
            "url": [{
                    "title": 1,
                    "ref": "https://mooc1-1.chaoxing.com/mycourse/studentstudy?chapterId=258362314&courseId=206752418&clazzid=13628828&enc=728905676290eef8d0dc38cdee3f5482"
                },

            ]
        }, {
            "title": "形势与政策",
            "url": [{
                    "title": 10,
                    "ref": "https://www.ulearning.cn/umooc/learner/study.do?operation=studyReport&courseID=12961"
                }

            ]
        }],

        weekly: [
            [0, 2, 10],
            [0, 6, 2, 3, 11],
            [0, 7, 1, 5, 4],
            [0, 4, 6],
            [0, 3, 1, 5],
            [0, 8, 9],
            [0]
        ]


    },
    methods: {
        getTempIframe() {
            this.tabs[5].url = prompt("请键入链接");
            this.tabs[5].title = prompt("请键入名称");
        },
        getTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            // add a zero in front of numbers<10 
            m = this.checkTime(m);
            s = this.checkTime(s);

            if (this.timePreferences.twelveFormat) {
                // h = '下午' + (h % 12);
                if (h / 12 >= 1) {
                    this.timePreferences.twelveLabel = "下午";
                } else {
                    this.timePreferences.twelveLabel = "上午";
                }
                h = (h % 12);
                // TODO
            }

            var result = (h + ":" + m);

            if (this.timePreferences.showSecond) {
                result = (h + ":" + m + ":" + s);
            }
            return result;
        },
        ifToday(index) {
            var today = new Date();
            // var day = (0 + 7 - 1) % 7;
            var day = (today.getDay() + 7 - 1) % 7;
            for (var i = 0; i < this.weekly[day].length; i++) {
                if (index == this.weekly[day][i]) {
                    return true;
                }
            }
            return false;
        },
        // getJsonInfo() {

        //     this.$http.get('info.json').then(function(response){
        //         console.log(response.data.data);
        //         var resdata = response.data.data;
        //         this.peps = resdata;
        //     }).catch(function(response){
        //         console.log(response);
        //         console.log("居然没有弹窗");
        //     })
        // },
        changeTab(selectedTab, tabGroup) {
            // this.currentItem = selectedTab;
            if (selectedTab == "wrap") {
                this.wrap.status = true;
            } else if (tabGroup == this.tabs) {
                this.wrap.status = false;
            }
            for (var i = 0; i < tabGroup.length; i++) {
                tabGroup[i].status = false;
            }
            // if (selectedTab == this.tabs.length - 1)
            // this.wrap.status = true;
            // else
            tabGroup[selectedTab].status = true;
            return tabGroup;
        },
        // getHeight() {
        //     var h = window.innerHeight || document.documentElement.clientHeight || document.body
        //         .clientHeight;
        //     this.contentStyleObj.height = h - document.getElementById("container").offsetHeight - 15 +
        //         'px';
        //     this.wrapStyleObj.height = h + 'px';
        //     this.wrapSearchStyleObj.marginTop = document.getElementById("container").offsetHeight +
        //         this.getCss(document.querySelector('#timeContent'), 'offsetHeight') + 'px';

        // },
        // getCss(curEle, attr) {
        //     var val = null,
        //         reg = null;
        //     if ("getComputedStyle" in window) {
        //         val = window.getComputedStyle(curEle, null)[attr];
        //     } else { //ie6~8不支持上面属性
        //         //不兼容
        //         if (attr === "opacity") {
        //             val = curEle.currentStyle["filter"]; //'alpha(opacity=12,345)'
        //             reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i;
        //             val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        //         } else {
        //             val = curEle.currentStyle[attr];
        //         }
        //     }
        //     reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i;
        //     return reg.test(val) ? parseFloat(val) : val;
        // },
        // Cookies
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            // console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            // console.info(document.cookie);
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            // console.log("<cookies> 获取cookie,现在循环")
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                // console.log("<cookies> " +c);
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        clearCookie() {
            // this.setCookie("username", "", -1);
        },
        checkCookie() {
            this.notes = this.getCookie("notes");
            this.done = JSON.parse(this.getCookie("done"));
            this.targetUrl = JSON.parse(this.getCookie("targetUrl"));
            this.blocksPreferences = JSON.parse(this.getCookie("blocksPreferences"));
            this.timePreferences = JSON.parse(this.getCookie("timePreferences"));
            this.bgStatus = JSON.parse(this.getCookie("bgStatus"));
            // var user = this.getCookie("username");
            // if (user != "") {
            //     console.info("Welcome again " + user);
            // } else {
            //     user = prompt("Please enter your name:", "");
            //     if (user != "" && user != null) {
            //         this.setCookie("username", user, 365);
            //     }
            // }
        },
        defineColor(obj) {
            return 'background-color:' + obj.bgColor + ';color:' +
                (obj.color ? '#fff' : 'var(--main-color)') + ';';
        },
        checkTime(i) {
            if (i < 10) {
                i = "0" + i
            }
            return i
        }

    },
    beforeCreate() {
        this.date = this.getTime();
        this.checkCookie();

    },
    mounted() {
        window.vue = this;
        let _this = this;
        this.timer = setInterval(() => {
            _this.date = _this.getTime();
        }, 1000);
        // const todos = fetch('https://mercutio_john.coding.net/p/LCUOnline/d/LCUOnline/git/raw/master/blocks.json').then(res => {
        //     return res.json();
        // }).then(todos => {
        //     // console.log(blocks);
        //     // this.todos = todos;
        // });
        var mode = getComputedStyle(document.documentElement).getPropertyValue('--mode').trim();
        // console.log(mode);
        // var a = document.getElementsByTagName("meta")[6].content;
        // console.log(document.getElementsByTagName("meta")[6].content);
        // if (mode == 'dark') {
        var bodyColor = getComputedStyle(document.documentElement).getPropertyValue('--body-color').trim();
        // console.log("bodycolor is " + bodyColor);
        // document.getElementsByTagName("meta")[6].content = bodyColor;
        document.querySelectorAll('meta')[6].setAttribute('content', bodyColor);
        // console.log(document.getElementsByTagName("meta")[6].content);
        // }
    },
    created() {
        this.JSON.parse(JSON.stringify)
        // this.blocks = require('blocks.json');
        // console.log(require('blocks.json'));
        // this.$http.get('tabs.json').then(response => {
        //     console.log(response)
        // }, response => {
        //     console.log('tabs数据加载失败')
        // });
        // this.currentItem = this.tabs[0];
        // this.tabs[this.tabs.length - 1].status = true;
        // this.tabs[0].status = true;
        // this.getHeight();

        /*console.log(document.getElementsByTagName("iframe")[0].offsetHeight);
        var i = document.getElementsByTagName("iframe").length;
        // while (i--) document.getElementsByTagName("iframe")[i].height = this.frameHeight;
        while (--i) document.getElementsByTagName("iframe")[i].offsetHeight = this.frameHeight;
        console.log(document.getElementsByTagName("iframe")[0].offsetHeight);*/
        this.timer = setInterval(() => {
            // document.querySelector("#view").style.filter = "blur(10px)";
            document.querySelector("#view").style.transform = "scale(1)";

        }, 500);
        this.timer = setTimeout(() => {
            this.bgStatus = true;
            // document.querySelector("#view").style.transform = "scale(1)";
            document.querySelector("#view").style.filter = "none";
        }, 1000);
        // RGBaster.colors(document.querySelector('#bgImg'), {
        //     exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
        //     success: function (payload) {
        //         document.querySelector('.mainTab').style.backgroundColor = payload.dominant;
        //     }
        // });
        let deferredPrompt;
        const addBtn = document.querySelector('.add-button');
        addBtn.style.display = 'none';

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
            addBtn.style.display = 'block';

            addBtn.addEventListener('click', (e) => {
                // hide our user interface that shows our A2HS button
                addBtn.style.display = 'none';
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            });
        });
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
    destroyed() {
        // window.removeEventListener('resize', this.getHeight);
    },
    computed: {
        // contentHeight: function () {
        //     var h = window.innerHeight || document.documentElement.clientHeight || document.body
        //         .clientHeight;
        //     return (h - document.getElementById("container").offsetHeight - 15 + 'px');
        // },
        // wrapHeight: function () {
        //     var h = window.innerHeight || document.documentElement.clientHeight || document.body
        //         .clientHeight;
        //     return h + 'px';
        // },
        week: function () {
            function getYearWeek(date) {
                var date2 = new Date(date.getFullYear(), 0, 1);
                var day1 = date.getDay();
                if (day1 == 0) day1 = 7;
                var day2 = date2.getDay();
                if (day2 == 0) day2 = 7;
                var d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
                return Math.ceil(d / 7) + 1;
            }
            var start = new Date(2020, 2, 17);
            return getYearWeek(start);
        },
        mode: function () {
            return getComputedStyle(document.documentElement).getPropertyValue('--mode').trim();
            // TODO: change theme color while change mode 
        }
    },
    watch: {
        lowQuality: function () {
            if (this.lowQuality == true) {
                // this.save[0] = document.querySelector("#searchWrap").style.backdropFilter;
                // this.save[1] = document.querySelector("#searchWrap").style.background;
                // document.querySelector("#searchWrap").style.backdropFilter = "none";
                // document.querySelector("#searchWrap").style.background = "var(--bg-color)";

            } else {
                // document.querySelector("#searchWrap").style.backdropFilter = this.save[0];
                // document.querySelector("#searchWrap").style.background = this.save[1];
            }

        },
        notes: function () {
            this.setCookie("notes", this.notes, 365);
        },
        done: function () {
            this.setCookie("done", JSON.stringify(this.done), 365);
            // TODO: weekly check
        },
        targetUrl: function () {
            this.setCookie("targetUrl", JSON.stringify(this.targetUrl), 1);
        },
        blocksPreferences: function () {
            this.setCookie("blocksPreferences", JSON.stringify(this.blocksPreferences), 365);
        },
        timePreferences: function () {
            this.setCookie("timePreferences", JSON.stringify(this.timePreferences), 365);
        },
        bgStatus: function () {
            this.setCookie("bgStatus", JSON.stringify(this.bgStatus), 365);
        },
        mode: function () {
            var bodyColor = getComputedStyle(document.documentElement).getPropertyValue('--body-color').trim();
            document.querySelectorAll('meta')[6].setAttribute('content', bodyColor);
            console.log("bodyColor:" + bodyColor);
            console.log("metaContent:" + document.querySelectorAll('meta')[6].content);
            // TODO: change theme color while change mode 
        }


    }
})