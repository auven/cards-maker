/**
 * Created by Andy--张剑 on 2017/3/2.
 */

var $ = require('./js/jquery-3.1.1.min.js');
require('./js/iscroll-zoom.js');
require('./js/hammer.min.js');
require('./js/lrz.all.bundle.js');
var PhotoClip =  require('./js/PhotoClip.js');
var Clipboard = require('./js/clipboard.min.js');

require('./css/main.css');
require('./css/style.css');

var hasAvatar = '';
var savedURL = '';
var picSrc = '';

$(document).ready(function () {
    var imgW = $('#previewAvatar').width();
    $('.text-box div').eq(0).css({'font-size': imgW*(40/408), 'margin-bottom': imgW*(15/408), 'height': 1.2*imgW*(40/408)});
    $('.text-box div').eq(1).css({'font-size': imgW*(45/408), 'margin-bottom': imgW*(15/408), 'height': 1.2*imgW*(45/408)});
    $('.text-box div').eq(2).css({'font-size': imgW*(20/408), 'height': 3.6*imgW*(20/408)});
    $('.shareBox .wrap').height($('.shareBox').height());
    $('.up-save').width($('.wrap').width());
    $('.bas').width($('.wrap').width());

    var inputs = $('#addText input');
    inputs.eq(0).on('input',function () {
        // alert(inputs.eq(0).val());
        if(inputs.eq(0).val() == '') {
            $('.text-box div').eq(0).text('name');
            //alert('asdsadsa');
        } else {
            $('.text-box div').eq(0).text(inputs.eq(0).val());
        }
    });
    inputs.eq(1).on('input',function () {
        if(inputs.eq(1).val() == '') {
            $('.text-box div').eq(1).text('1');
            //alert('asdsadsa');
        } else {
            $('.text-box div').eq(1).text(inputs.eq(1).val());
        }
    });
    inputs.eq(2).on('input',function () {
        if(inputs.eq(2).val() == '') {
            $('.text-box div').eq(2).text('description');
            //alert('asdsadsa');
        } else {
            $('.text-box div').eq(2).text(inputs.eq(2).val());
        }
    });

    //点击上传按钮，触发上传事件
    // $('#upload').click(function () {
    //     alert('11');
    //     $('#file').click();
    // });

    //当文件改变时触发
    $('#file').change(function () {
        getFileType(this);
    });
    clipAvatar();

    $('#save').click(function () {
        var addText = $('#addText input');
        //console.log(addText[0].value);
        var text1 = addText[0].value;
        var text2 = addText[1].value;
        var text3 = addText[2].value;
        if(hasAvatar !== '') {
            if(text1 !== '' && text2 !== '' && text3 !== '') {
                // $('.loading').show();
                save(text1, text2, text3);
            } else if(text1 == '') {
                alert('请输入name!');
            } else if(text2 == '') {
                alert('请输入number!');
            } else if(text3 == '') {
                alert('请输入description!');
            }
        } else {
            alert('请先上传头像！');
        }
    })

    $('.back').click(function () {
        $('.edit').show();
        $('.clip').hide();
        $('.saved').hide();
        $('.shareBox').hide();
    })

    $('.share').click(function () {
        $('.edit').hide();
        $('.clip').hide();
        $('.saved').hide();
        $('.shareBox').show();
    })

    $('.close').click(function () {
        $('.edit').hide();
        $('.clip').hide();
        $('.saved').show();
        $('.shareBox').hide();
    })

    // $('#clipBtn').click(function () {
    //     console.log('点击ok开始截图');
    //     $('.edit').hide();
    //     $('.clip').hide();
    //     $('.saved').hide();
    //     $('.shareBox').hide();
    //     $('.loading').show();
    // })

    $('.download').click(function () {
        // download(savedURL);
        // uploadIMG(savedURL);
        savepic(savedURL);
        // downloadFile('andy.png', savedURL);
    });


    shareOtherPlatform();
});

//判断上传文件类型
function getFileType(e) {
    // var file = e.files[0];
    var filePath = $(e).val();
    var fileName = filePath.match(/[^\\]*$/)[0].split('.').pop().toLowerCase();
    // console.log('文件名：' + filePath.match(/[^\\]*$/)[0]);
    // console.log('文件后缀名：' + filePath.match(/[^\\]*$/)[0].split('.').pop().toLowerCase());
    // console.log('文件名：' + file.size);
    if ((fileName!='jpg')&&(fileName!='gif')&&(fileName!='jpeg')&&(fileName!='png')&&(fileName!='bmp'))
    {
        alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 ！");
    } else {
        $('.edit').hide();
        $('.clip').show();
        $('.saved').hide();
        $('.shareBox').hide();
    }
}


//分享
function shareOtherPlatform(){
    var fUrl = 'http://www.facebook.com/sharer/sharer.php?';
    fUrl += 'u=' + location.href;
    fUrl += '&t=' + document.title;
    $('.Facebook').attr('href',fUrl);

    var redditUrl = '//www.reddit.com';
    $('.Reddit').attr('href',redditUrl);
    new Clipboard('#copy-share-link-reddit');
    $('.Reddit').attr('data-clipboard-text',location.href);

    var twitterUrl = '//twitter.com/share?';
    twitterUrl += 'url=' + location.href;
    twitterUrl += '&text=' + document.title;
    $('.Twitter').attr('href',twitterUrl);
    //copy link
    new Clipboard('#copy-share-link-lower');
    $('.CopyLink').attr('data-clipboard-text',location.href);
}

//下载图片
function savepic(dataurl) {
    // var re;
    // if (document.all.a1 == null) {
    //     objIframe = document.createElement("IFRAME");
    //     document.body.insertBefore(objIframe);
    //     objIframe.outerHTML = "<iframe name=a1 style='width:400px;hieght:300px' src=" + picSrc + "></iframe>";
    //     re = setTimeout("savepic()", 1)
    // }
    // else {
    //     clearTimeout(re);
    //     pic = window.open(picSrc, "a1")
    //     pic.document.execCommand("SaveAs")
    //     document.all.a1.removeNode(true)
    // }

    var blob = dataURLtoBlob(dataurl);

    var $a = $("<a></a>").attr("href", URL.createObjectURL(blob)).attr("download", "img.png");
        console.log($a);
        $a[0].click();
}

//上传图片到服务器
function uploadIMG(dataURL) {

}


//**dataURL to blob**
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

//下载
// function download(imgData) {
//     var type = 'png';
//     /**
//      * 获取mimeType
//      * @param  {String} type the old mime-type
//      * @return the new mime-type
//      */
//     var _fixType = function(type) {
//         type = type.toLowerCase().replace(/jpg/i, 'jpeg');
//         var r = type.match(/png|jpeg|bmp|gif/)[0];
//         return 'image/' + r;
//     };
//
//     // 加工image data，替换mime type
//     imgData = imgData.replace(_fixType(type),'image/octet-stream');
//
//
//     /**
//      * 在本地进行文件保存
//      * @param  {String} data     要保存到本地的图片数据
//      * @param  {String} filename 文件名
//      */
//     var saveFile = function(data, filename){
//         var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
//         save_link.href = data;
//         save_link.download = filename;
//
//         var event = document.createEvent('MouseEvents');
//         event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//         save_link.dispatchEvent(event);
//     };
//
//     // 下载后的问题名
//     var filename = 'modchat_' + (new Date()).getTime() + '.' + type;
//     // download
//     saveFile(imgData,filename);
// }


//下载2
function downloadFile(fileName, content){

    var aLink = document.createElement('a');
    var blob = dataURLtoBlob(content); //new Blob([content]);

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);

    aLink.dispatchEvent(evt);
}


//截图函数
function clipAvatar() {
    var pc = new PhotoClip('#clipArea', {
        size: 200,
        outputSize: 640,
        //adaptive: ['60%', '80%'],
        file: '#file',
        view: '#view',
        // ok: '#clipBtn',
        //img: 'img/mm.jpg',
        loadStart: function() {
            console.log('开始读取照片');
        },
        loadComplete: function() {
            console.log('照片读取完成');
        },
        done: function(dataURL) {
            // console.log(dataURL);
            // $('.loading').hide();
            // alert('done')
            // alert(dataURL)
            saveAvatar(dataURL);
        },
        fail: function(msg) {
            alert(msg);
        }
    });
    // alert(96);
    $('#clipBtn').off('click').on('click',function () {
        $('.loading').show();
        pc.clip();
        return false;
    })
    console.log(pc)
}

//保存合成头像的函数
function saveAvatar(dataURL) {
    var canvas = document.createElement('canvas');
    $(canvas).attr({ width: '408px', height: '575px'});
    var ctx = canvas.getContext('2d');

    // alert('saveAvatar里面的'+canvas);

    // var dataurl = yuan_image(thumb_image(dataURL, 108, 108));

    // alert(dataurl);
    var avatar = new Image();


    var images = new Image();


    // if (avatar.complete && images.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
    //
    //     alert('avatar的complete事件'+avatar.src);
    //
    //     ctx.drawImage(avatar, 150, 110, 108, 108);
    //     ctx.drawImage(images, 0, 0);
    //
    //     //addText(ctx, 'andy andy andyv andyvg andy', '14552365454226655', 'SAML single sign-on, automated provisioning and deprovisioning, 24/5 support, and guaranteed uptime.');
    //     $('#previewAvatar').attr('src', canvas.toDataURL());
    //     hasAvatar = canvas.toDataURL();
    //     console.log('截图完成');
    //
    //     $('.edit').show();
    //     $('.clip').hide();
    //     $('.saved').hide();
    //     $('.shareBox').hide();
    //
    //
    //     return; // 直接返回，不用再处理onload事件
    // }

    avatar.onload = function () {

        // alert('avatar的onload事件'+avatar.src);

        ctx.drawImage(avatar, 150, 110, 108, 108);

        images.onload = function () {

            // alert('images的onload事件'+images.src);

            ctx.drawImage(images, 0, 0);

            //addText(ctx, 'andy andy andyv andyvg andy', '14552365454226655', 'SAML single sign-on, automated provisioning and deprovisioning, 24/5 support, and guaranteed uptime.');
            $('#previewAvatar').attr('src', canvas.toDataURL());
            hasAvatar = canvas.toDataURL();
            console.log('截图完成');

            $('.loading').hide();
            $('.edit').show();
            $('.clip').hide();
            $('.saved').hide();
            $('.shareBox').hide();
        }
        images.src = './img/main.png';
    }


    avatar.src = dataURL;
}

//最终合成
function save(text1, text2, text3) {
    var canvas = document.createElement('canvas');
    $(canvas).attr({ width: '408px', height: '575px'});
    var ctx = canvas.getContext('2d');

    var images = new Image();
    images.src = hasAvatar;

    var shuiyin = new Image();
    shuiyin.src = './img/watermark.png';

    images.onload = function () {
        ctx.drawImage(images, 0, 0);

        addText(ctx, text1, text2, text3);

        shuiyin.onload = function () {
            ctx.drawImage(shuiyin, 0, 0);

            $('#saved').attr('src', canvas.toDataURL());
            console.log('合成完成');
            savedURL = canvas.toDataURL();

            $('.edit').hide();
            $('.clip').hide();
            $('.saved').show();
            $('.shareBox').hide();
        }

    }
}


//以下是生成圆形图的函数
/**
 * 生成图片的缩略图
 * @param  {[type]} img    图片(img)对象或地址
 * @param  {[type]} width  缩略图宽
 * @param  {[type]} height 缩略图高
 * @return {[type]}        return base64 png图片字符串
 */
function thumb_image(img, width, height) {
    if (typeof img !== 'object') {
        var tem = new Image();
        tem.src = img;
        img = tem;
    }
    // alert(img.src);
    var _canv = document.createElement('canvas');
    _canv.width = width;
    _canv.height = height;
    _canv.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    // alert(_canv.toDataURL());
    return _canv.toDataURL();
}
/**
 * 把图片处理成圆形,如果不是正方形就按最小边一半为半径处理
 * @param  {[type]} img 图片(img)对象或地址
 * @return {[type]}     return base64 png图片字符串
 */
function yuan_image(img) {
    if (typeof img !== 'object') {
        var tem = new Image();
        tem.src = img;
        img = tem;
    }
    var w, h, _canv, _contex, cli;
    if (img.width > img.height) {
        w = img.height;
        h = img.height;
    } else {
        w = img.width;
        h = img.width;
    }
    _canv = document.createElement('canvas');
    _canv.width = w;
    _canv.height = h;
    _contex = _canv.getContext("2d");
    cli = {
        x: w / 2,
        y: h / 2,
        r: w / 2
    };
    _contex.clearRect(0, 0, w, h);
    _contex.save();
    _contex.beginPath();
    _contex.arc(cli.x, cli.y, cli.r, 0, Math.PI * 2, false);
    _contex.clip();
    _contex.drawImage(img, 0, 0);
    _contex.restore();
    return _canv.toDataURL();
}

//合成字体函数
function addText(ctx, text1, text2, text3) {
    var style1 = '#25f3ff';
    var style2 = '#ffffff';
    var font1 = "italic 40px fantasy";
    var font2 = "italic 45px fantasy";
    var font3 = "normal 20px sans-serif";

    //设置文字居中对齐。
    ctx.textAlign = 'center';

    //设置用户文本的大小字体等属性
    ctx.font = font1;
    //设置用户文本填充颜色
    ctx.fillStyle = style1;
    //绘制文字
    // ctx.fillText(text1.toUpperCase(),204,320);
    xz(text1.toUpperCase(), ctx, 204, 320);

    //设置用户文本的大小字体等属性
    ctx.font = font2;
    //设置用户文本填充颜色
    ctx.fillStyle = style2;
    //绘制文字
    // ctx.fillText(text2,204,380);
    xz(text2.toUpperCase(), ctx, 204, 380);

    //设置用户文本的大小字体等属性
    ctx.font = font3;
    //设置用户文本填充颜色
    ctx.fillStyle = style1;
    //绘制文字
    //ctx.fillText(text3.toUpperCase(),204,420);
    canvasTextAutoLine(text3.toUpperCase(), ctx, 204, 420, 25);
}

//canvas文本自动换行
/*
 str:要绘制的字符串
 ctx:canvas.getContext对象
 initX:绘制字符串起始x坐标
 initY:绘制字符串起始y坐标
 lineHeight:字行高
 */
function canvasTextAutoLine(str,ctx,initX,initY,lineHeight){

    var cishu = 0;
    var s1 = autoLine(str);
    console.log('这是s1:',s1);
    var s2 = autoLine(s1);
    console.log('这是s2:',s2);
    var s3 = autoLine(s2);
    console.log('这是s3:',s3);

    function autoLine(STR) {
        if(STR) {
            var lineWidth = 0;

            for (var i = 0; i < STR.length; i++) {
                lineWidth += ctx.measureText(STR[i]).width;
                if (lineWidth > 314) { //宽度已经写死在这里，以后要改可以配置
                    // alert(lineWidth);
                    var str1 = STR.substring(0, i);
                    var str2 = STR.substring(i);
                    var index = str1.lastIndexOf(' ');
                    var index2 = str2.indexOf(' ');
                    if(index == -1 || index == 0 || index == i || index2 == 0) {
                        index = i;
                    }

                    var str2 = STR.substring(0, index);
                    console.log(str2);
                    var str3 = STR.substring(index);
                    console.log(str3);

                    if(cishu == 2) {
                        str2 = str1.substring(0, index-3);
                        ctx.fillText(str2+'...', initX, initY);
                    } else {
                        ctx.fillText(str2, initX, initY);
                        console.log(index);
                    }
                    initY += lineHeight;
                    cishu++;

                    return str3;
                }
                if (i == STR.length - 1) {
                    ctx.fillText(STR.substring(0, i + 1), initX, initY);
                }
            }
        }
    }
}

//限制name和number的长度
/*
 str:要绘制的字符串
 ctx:canvas.getContext对象
 initX:绘制字符串起始x坐标
 initY:绘制字符串起始y坐标
 */
function xz(str,ctx,initX,initY) {
    var lineWidth = 0;

    for (var i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > 314) { //宽度已经写死在这里，以后要改可以配置
            var str1 = str.substring(0, i-3);
            ctx.fillText(str1+'...', initX, initY);
            break;
        }
        if(i == str.length - 1) {
            ctx.fillText(str.substring(0, i + 1), initX, initY);
        }
    }
}
