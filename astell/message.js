function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = '\n';
console.log(re);
re.toString = function() {
    showMessage('略~这里什么都没有', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得注明出处nia~', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
console.warn("%c -本站由山东兰德互娱提供技术支持及页面托管-", "color:black;font-weight:bold;font-size:2em");
console.log("%c 咦, 又有人打开这个网页了", "color:orange;font-weight:bold;font-size:2em");
console.log("%c 好麻烦, 又要开始营业了", "color:blue;font-weight:bold;font-size:2em");
console.log("%c ", "background: url(https://s1.ax1x.com/2020/08/26/dRH04e.png) no-repeat center;padding-left:300px;padding-bottom: 300px");
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的伙伴owo';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'google') {
            text = '嗨！ 来自 404搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 6) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
            } else if (now > 6 && now <= 7) {
                text = '一日之计在于晨，早安嗷！';
            } else if (now > 7 && now <= 11) {
                text = '上午吼！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '晚饭时间owo';
            } else if (now > 19 && now <= 21) {
                text = '晚吼~今天过得怎么样呀w';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，安安ww';
            } else {
                text = '嗨~ 快来玩吧！';
            }
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,50000);

function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn/',function(result){
      showMessage('偶尔休息一下吧, 别总盯着屏幕了', 5000);
        //防喝茶 showMessage(result.hitokoto, 5000);
        console.error(result.hitokoto);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d (){
    $('.hide-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    })
}
initLive2d ();