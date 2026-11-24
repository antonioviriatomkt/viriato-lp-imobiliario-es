var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;

if(isSafari) $('body *').addClass('safari');

if($.fancybox !== undefined){
    $.fancybox.defaults.hideScrollbar = false;
    $.fancybox.defaults.backFocus = false;
    $.fancybox.defaults.loop = true;
    $.fancybox.defaults.timer = false;
    $.fancybox.defaults.thumbs = false;
}

var r = document.querySelector(':root');

function searchAlt(e){
    if($('form input[name="s"]').val().replaceAll(' ','') !== '' && $('form input[name="s"]').val().replaceAll(' ','').length > 0){
        $('nav *[data-child="search"]').addClass('submit');
        if($('form input[name="s"]').val().replaceAll(' ','').length > 0 && $('form input[name="s"]').val().replaceAll(' ','').length < 3) {
            $('form input[name="s"]')[0].setCustomValidity($('form input[name="s"]').data('min')+' ('+$('form input[name="s"]').data('current')+' '+ $('form input[name="s"]').val().replaceAll(' ', '').length + ')');
        }else{
            $('form input[name="s"]')[0].setCustomValidity('');
        }
    }else if($('form input[name="s"]').val().replaceAll(' ','') == '' && $('form input[name="s"]').val().replaceAll(' ','').length == 0){
        $('form input[name="s"]')[0].setCustomValidity($('form input[name="s"]').data('min'));
        $('nav *[data-child="search"]').removeClass('submit');
    }else if($('nav *[data-child="search"]').hasClass('submit')){
        $('nav *[data-child="search"]').removeClass('submit');
    }
    console.log($(e.target).hasClass('nav'));
    if($(e.target).hasClass('nav')){
        $('#slider form input[name="s"]').val($('nav form input[name="s"]').val());
    }else{
        $('nav form input[name="s"]').val($('#slider form input[name="s"]').val());
    }
    //$('#slider form input[name="s"]').val($('nav form input[name="s"]').val());
}
if($('form input[name="s"]')[0] !== undefined){

    $('form input[name="s"]')[0].setCustomValidity($('form input[name="s"]').data('min'));

//$(document).on('blur', 'nav *[data-child="langs"], nav *[data-child="menu"], nav form input', function () {
//    $('*[data-name]').removeClass('show');
//    $('*[data-child]').removeClass('active');
//});

    $(document).on('input change', 'form input[name="s"]', searchAlt);

//$(document).on('click', 'nav *[data-child="search"].submit', function () {
//    if($('*[data-name="' + $(this).data('child') + '"]').hasClass('show') && $('form[data-name="search"] input').val().replaceAll(' ','') !== '' && $('form[data-name="search"] input').val().replaceAll(' ','').length > 2){
//        $('form[data-name="search"]').submit();
//        return;
//    }
//});

    $(document).on('click', 'nav *[data-child]', function () {
        if($(this).data('child') == 'search'){
            if($(this).hasClass('active') && $('form[data-name="search"] input').val().replaceAll(' ','') !== '' && $('form[data-name="search"] input').val().replaceAll(' ','').length > 2){
                $('form[data-name="search"]').submit();
                return;
            }
        }
        if (!$(this).hasClass('active')) {
            $('nav *[data-child]:not([data-child="' + $(this).data('child') + '"])').removeClass('active');
            $('nav *[data-name]:not([data-name="' + $(this).data('child') + '"])').removeClass('show');
            $('nav *[data-name="' + $(this).data('child') + '"]').addClass('show');
            $(this).addClass('active');
            if($(this).data('child') == 'search'){
                searchAlt($('nav form[data-name="search"] input'));
                $('nav form[data-name="search"] input').focus();
            }
        } else {
            $('nav *[data-name="' + $(this).data('child') + '"]').removeClass('show');
            $(this).removeClass('active');
        }
    });

    $(document).on('click', 'nav *[data-searchtype]', function () {
        if (!$(this).hasClass('active')) {
            $('nav *[data-searchtype]').removeClass('active');
            $('nav *[data-type]:not([data-type="' + $(this).data('searchtype') + '"])').removeClass('show');
            $('nav *[data-type="' + $(this).data('searchtype') + '"]').addClass('show');
            $(this).addClass('active');
            if($(this).data('searchtype') == 's'){
                $('nav input[name="s"]').val('');
                $('nav input[name="s"]').focus();
            }
        }
    });

    $('.cropdone').on('click touch',function(e){
        var blog = cropper.getCroppedCanvas({fillColor: '#fff'}).toDataURL('image/jpeg');
        console.log(blog);
        $('#pesquisa input[name="s"]').val(blog);
        //$('#pesquisa').attr('method','post');
        $('#pesquisa').submit();
    });

    $('.cropcancel').on('click touch',function(e){
        $('#crop').removeClass('show');
        $('#imgInp').val('');
    });

    var dragTimer;
    var image = document.getElementById('image');
    $(document).on('dragover', function(e) {
        //if(!$('nav *[data-child="search"]').hasClass('active')){
        var dt = e.originalEvent.dataTransfer;
        if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
            //$('div[data-type="image"]').addClass('show');
            $('[data-searchtype="s"],nav *[data-child]:not([data-child="search"])').removeClass('active');
            $('[data-searchtype="image"],nav *[data-child="search"]').addClass('active');
            $('[data-type="s"],nav *:not([data-name="search"])').removeClass('show');
            $('*[data-child="search"],*[data-name="search"],[data-type="image"]').addClass('show');
            //window.clearTimeout(dragTimer);
        }
        //}
    });

    $('input.ajust').on('change input', function(e) {
        var ajust = [];
        ajust['s'] = $('input#saturate').val();
        ajust['l'] = $('input#brighten').val();
        ajust['c'] = $('input#contrast').val();

        const file = document.querySelector('input.dropimg').files[0];
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            var blob = new Blob([event.target.result]);
            window.URL = window.URL || window.webkitURL;
            var blobURL = window.URL.createObjectURL(blob);

            var image = new Image();
            image.src = blobURL;
            image.onload = function() {
                cropper.replace(resizeMe(image,ajust), true);
            };

        }, false);

        if (file) {
            reader.readAsArrayBuffer(file);
        }
    }).on('mousedown input', function(e) {
        $('div.ajust').addClass('adjusting')
    }).on('mouseup touchend', function(e) {
        $('div.ajust').removeClass('adjusting')
    });
}

var hero = {
    timers: [],
    time: 8000,
    init: function(current){
        //if($('.info',$('.hero').eq(current))[0] !== undefined && ) {
        //$('.hero').eq(current).find('section.slides').find('section').removeClass('active');
        if($('.info',$('.hero').eq(current))[0] !== undefined) {
            $('.info', $('.hero').eq(current)).next().next().addClass('next');
        }
        if($('.hero').eq(current).data('auto') !== undefined && $('.hero').eq(current).data('auto') == true){
            var time = ($('.hero').eq(current).data('time') !== undefined)?parseInt($('.hero').eq(current).data('time'))*1000:hero.time;
            hero.timers[current] = setInterval(function(){
                hero.nav($('.hero').eq(current),'next');
            },time);
            $('.hero').eq(current).append('<style nonce="230230d3d82ce796c18a761f8cfb29315182a8d9125f60a1017bffdf47462b07">.hero:nth-child('+(current+1)+') section.active span.timer{' +
                'transition: '+time+'ms cubic-bezier(0.42,0,0.58,1) !important;' +
                '-moz-transition: '+time+'ms cubic-bezier(0.42,0,0.58,1) !important;' +
                '-o-transition: '+time+'ms cubic-bezier(0.42,0,0.58,1) !important;' +
                '-webkit-transition: '+time+'ms cubic-bezier(0.42,0,0.58,1) !important;' +
                '}</style>');
        }else{
            $('.hero').eq(current).find('span.timer').remove();
        }
        $('.hero').eq(current).find('section.slides').find('section').delay(1).fadeIn(function(){
            if($('.info',$('.hero').eq(current))[0] == undefined) {
                $('.hero').eq(current).find('section.slides').find('section').eq(0).addClass('active');
            }else{
                $('.info',$('.hero').eq(current)).next().addClass('active');
            }
        },0);
    },
    nav: function(h,index){
        if($('.info',h)[0] == undefined || $('.info',h).hasClass('bg')){
            if($('.info',h)[0] !== undefined) {
                $('.info', h).remove();
                h.find('section.slides')[0].scrollLeft = 20;
            }
            var active = $('section.slides section.active',h);
            if(index=='next'){
                index = active.index();
                if(index == ($('section.slides section',h).length - 1)){
                    $('section.slides section',h).removeClass('active').removeClass('next');
                    $('section.slides section',h).eq(0).addClass('active');
                    $('section.slides section',h).eq(0).next().addClass('next');
                }else{
                    active.next().next().addClass('next');
                    if(active.next().index() == ($('section.slides section',h).length - 1)){
                        active.next().prev().addClass('next');
                    }
                    active.next().removeClass('next').addClass('active');
                    active.removeClass('active');
                }
            }else if(index=='prev'){
                index = active.index();
                if(index == 0){
                    $('section.slides section',h).removeClass('active').removeClass('next');
                    $('section.slides section',h).eq(($('section.slides section',h).length - 1)).addClass('active');
                    $('section.slides section',h).eq(($('section.slides section',h).length - 1)).prev().addClass('next');
                }else{
                    $('section.slides section.next',h).removeClass('next');
                    active.prev().addClass('active');
                    active.removeClass('active').addClass('next');
                }
            }else{
                $('section.slides section',h).removeClass('active').removeClass('next');
                $('section.slides section',h).eq(index).addClass('active');
                $('section.slides section',h).eq(index).next().addClass('next');
                if(index == ($('section.slides section',h).length - 1)){
                    $('section.slides section',h).eq(index).prev().addClass('next');
                }
            }
            h.find('section.slides').stop().animate({ scrollLeft: ($('section.slides section.active',h).index())*($('section.slides section:last-of-type',h).width()+20) },300, function(){});
            if($(h).data('auto') !== undefined && $(h).data('auto') == true) {
                var time = ($(h).data('time') !== undefined)?parseInt($(h).data('time'))*1000:hero.time;
                clearInterval(hero.timers[h.index()]);
                hero.timers[h.index()] = setInterval(function () {
                    hero.nav(h, 'next');
                }, time);
            }
        }
    },
    setActions: function(index){
        if($('.info',hero)[0] == undefined || $('.info',hero).hasClass('bg')){
            $('.info',hero).remove();
            var active = $('section.active',hero);
            if(index=='next'){
                index = active.index();
                if(index == ($('section',hero).length - 1)){
                    $('section',hero).removeClass('active').removeClass('next');
                    $('section',hero).eq(0).addClass('active');
                    $('section',hero).eq(0).next().addClass('next');
                }else{
                    active.next().next().addClass('next');
                    if(active.next().index() == ($('section',hero).length - 1)){
                        active.next().prev().addClass('next');
                    }
                    active.next().removeClass('next').addClass('active');
                    active.removeClass('active');
                }
            }else if(index=='prev'){
                index = active.index();
                if(index == ($('section',hero).length - 1)){
                    $('section',hero).removeClass('active').removeClass('next');
                    $('section',hero).eq(0).addClass('active');
                    $('section',hero).eq(0).next().addClass('next');
                }else{
                    active.next().next().addClass('next');
                    if(active.next().index() == ($('section',hero).length - 1)){
                        active.next().prev().addClass('next');
                    }
                    active.next().removeClass('next').addClass('active');
                    active.removeClass('active');
                }

            }
            hero.stop().animate({ scrollLeft: ($('section.active',hero).index())*($('section:last-of-type',hero).width()+20) },300, function(){});
        }
    }
};

$(document).on('touch click', '.hero section.nav button', function(){
    if($(this).hasClass('next')){
        hero.nav($(this).parents('.hero'),'next');
    }else{
        hero.nav($(this).parents('.hero'),'prev');
    }
});
var animatedScroll = false;
$('#gallery section.images').on('scroll resize', function(){
    if(!animatedScroll) findMiddleElement($('#gallery section.images'));
});
$(document).on('touchstart mousedown', '#gallery section.nav button', function(){
    animatedScroll = true;
});
$(document).on('touchend mouseup', '#gallery section.nav button', function(){
    var active = $('#gallery section.images picture.active').index();
    if($(this).hasClass('next')){
        active = (active < ($('#gallery section.images picture').length - 1))?(active+1):0;
    }else{
        active = (active > 0)?(active-1):($('#gallery section.images picture').length - 1);
    }
    $('#gallery section.images picture').removeClass('active');
    $('#gallery section.images picture').eq(active).addClass('active');
    $('#gallery section.images').stop().animate({ scrollLeft: $('#gallery section.images picture.active')[0].offsetLeft },300, function(){
        $('#gallery section.images picture.active').delay(100).fadeIn(function(){
            animatedScroll = false;
            },0);
    });
});
$(document).on('touch click', 'section.slides > section:not(.active, .info)', function(){
    if($('.info',$(this).parents('.hero'))[0] !== undefined) {
        hero.nav($(this).parents('.hero'),$(this).index()-1);
    }else{
        hero.nav($(this).parents('.hero'),$(this).index());
    }
});

var isFilteredInit = false;

// $(window).on('load', function(){
    $('.hero').each(function(index){
        // console.log(index);
        hero.init(index);
    });
// });

var findMiddleElement = (function(docElm){

    var viewportWidth = docElm.clientWidth,
        // here i'm using pre-cached DIV elements, but you can use anything you want.
        // Cases where elements are generated dynamically are more CPU intense ofc.
        elements = $('#gallery picture');

    return function(e){
        var middleElement;
        if( e && e.type == 'resize' )
            viewportWidth = docElm.clientWidth;

        // console.log('------');
        elements.each(function(){
            var pos = this.getBoundingClientRect().left;
            // if an element is more or less in the middle of the viewport
            // console.log('pos',pos);
            // console.log('viewportWidth',(viewportWidth/2));
            if( pos < (viewportWidth/2)){
                if(!$(this).hasClass('active')) {$('#gallery picture').removeClass('active'); $(this).addClass('active');}
                //return false; // stop iteration
            }
        });

    }
})(document.documentElement);


// if($('#gallery')[0] !== undefined){
//     document.addEventListener('mousemove', function(event) {
//         r.style.setProperty('--cursor-y', event.clientY+'px');
//         r.style.setProperty('--cursor-x', event.clientX+'px');
//     });
//     $('#gallery picture').on('mousemove mouseenter', function() {
//         if($(this).hasClass('active')){
//             if(!$('#gallery div.cursor').hasClass('zoomout')){
//                 $('#gallery div.cursor').addClass('zoomout').removeClass('zoomin');
//                 $('#gallery div.cursor span').text('Zoom out');
//             }
//         }else{
//             if(!$('#gallery div.cursor').hasClass('zoomin')){
//                 $('#gallery div.cursor').addClass('zoomin').removeClass('zoomout');
//                 $('#gallery div.cursor span').text('Zoom in');
//             }
//         }
//     });
// }
if($('.projects section[data-auto="true"]')[0] !== undefined){
    setInterval(function(){
        listActions.activeArea = 'team';
        listActions.activeParent = $('section.projects');
        listActions.gotoareaproject('next');
    },5000);
}
var styless = "<style nonce=\"230230d3d82ce796c18a761f8cfb29315182a8d9125f60a1017bffdf47462b07\">";
$('section.threesixty header > ul > li').each(function(){
    var liParent = this;
    var liIndex = $(this).index();
    var delay = (1000*liIndex);
    var rotation = ((360 / $('section.threesixty header > ul > li').length) * liIndex);
    var rotationCompensation = rotation-((360-(360 / $('section.threesixty header > ul > li').length))/2);
    styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+"){ " +
        "transition-delay: "+delay+"ms cubic-bezier(0.42,0,0.58,1); " +
        "-moz-transition-delay: "+delay+"ms cubic-bezier(0.42,0,0.58,1); " +
        "-o-transition-delay: "+delay+"ms cubic-bezier(0.42,0,0.58,1); " +
        "-webkit-transition-delay: "+delay+"ms cubic-bezier(0.42,0,0.58,1);" +
        "transform: rotate("+rotation+"deg);" +
        "}";
    styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > button > span{ opacity:1;}";
    //if($(this).index() > 0){
    styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul{ opacity: 1; }";
    styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > button{ transform: translate(-50%,-50%) rotate("+(-1 * rotation)+"deg); }";
    if(rotation > 20 && rotation < 140){
        styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > button > span{ opacity:1; text-align: left; left: 100%; top: 50%; transform: translate(15px,-50%); }";
    }else if(rotation < 340 && rotation > 220){
        styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > button > span{ opacity:1; text-align: right; right: 100%; left: auto; top: 50%; transform: translate(-15px,-50%); }";
    }else if(rotation > 140 && rotation < 220){
        styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > button > span{ opacity:1; top: 100%; transform: translate(-50%,15px); }";
    }
    //}
    $('ul li',this).each(function(){
        var distanceBetween = (180 / $(this).parent('ul').find('li').length);
        var childRotation = (distanceBetween * $(this).index());
        var rotationCompensation = childRotation-((180-distanceBetween)/2);
        styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+"){ " +
            "transition-delay: "+(delay*2)+"ms cubic-bezier(0.42,0,0.58,1); " +
            "-moz-transition-delay: "+(delay*2)+"ms cubic-bezier(0.42,0,0.58,1); " +
            "-o-transition-delay: "+(delay*2)+"ms cubic-bezier(0.42,0,0.58,1); " +
            "-webkit-transition-delay: "+(delay*2)+"ms cubic-bezier(0.42,0,0.58,1);" +
            "transform: rotate("+(rotationCompensation)+"deg);" +
            "}";
        styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") >  button{ transform: translate(-50%,-50%) rotate("+(-1 * ((rotationCompensation)+rotation))+"deg); }";
        //styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") >  button{ transform: translate(-50%,-50%) rotate(-90deg); }";

        //styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ text-align: left; left: 0%; top: 50%; transform-origin: center left; transform: translate(30px, -50%); }";


        if(rotation > 20 && rotation < 140){
            styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ text-align: left; left: 100%; top: 50%; transform: translate(15px,-"+(((60-rotationCompensation) < 0)?(-1*(60-rotationCompensation)):(60-rotationCompensation))+"%); }";
        }else if(rotation < 340 && rotation > 220){
            styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ text-align: right; right: 100%; left: auto; top: 50%; transform: translate(-15px,-"+((60+rotationCompensation > 0)?(60+rotationCompensation):(-1*(60+rotationCompensation)))+"%); }";
        }else if(rotation > 140 && rotation < 220){
            styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ top: 100%; transform: translate(-"+((60+rotationCompensation > 0)?(60+rotationCompensation):(-1*(60+rotationCompensation)))+"%, 15px); }";
        }else{
            if(rotationCompensation < 0){
                styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ transform: translate(-90%,-120%); }";
            }else if(rotationCompensation > 0){
                styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ transform: translate(-10%,-120%); }";
            }else{
                styless += "section.threesixty.show header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ transform: translate(-50%,-120%); }";
            }
        }
        //styless += "section.threesixty header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button{ transform: translate(-50%,-50%) rotate("+(-1 * (childRotation+rotation))+"deg); }";
        //styless += "section.threesixty header > ul > li:nth-child("+(liIndex+1)+") > ul > li:nth-child("+($(this).index()+1)+") > button > span{ text-align: left; left: 100%; top: 50%; transform: translate(15px,-50%); }";
    });
});
styless += "</style>";
$('section.threesixty').append(styless);
$("section.threesixty").delay(500).fadeIn(function(){
    $("section.threesixty").addClass('show');
    if(!$("section.threesixty").hasClass('done')){
        $("section.threesixty").addClass('done')
        var animTime = 2000 / $("section.threesixty header > ul > li:has(ul)").length;
        total = $("section.threesixty header > ul > li:has(ul)").length;
        setTimeout(function(){
            timerr = setInterval(function(){
                $("section.threesixty header > ul > li:has(ul)").eq(start++).addClass('active');
                if(total == start) {
                    clearInterval(timerr);
                    start = 0;
                    timerr = setInterval(function(){
                        $("section.threesixty header > ul > li:has(ul)").eq(start++).removeClass('active');
                        if(total == start) {
                            clearInterval(timerr);
                        }
                    },animTime);
                }
            },animTime);
        },1000);
    }
},0);

document.addEventListener('mousemove', function(event){
    r.style.setProperty('--mouse-y', -1*((0.4*(event.clientY*100)/$(window).height())-20)+'vmin');
    r.style.setProperty('--mouse-x', -1*((0.4*(event.clientX*100)/$(window).width())-20)+'vmin');
});

var heroActions = {
    activeHero : null,
    nav: function(index){
        if(area !== undefined){
            $('section.projects section[data-area]').removeClass('nav');
            $('section.projects').stop().animate({ scrollTop: $('section.projects section[data-area="'+area+'"]').index()*$('section.projects').height() },300);
            if($('section.projects section[data-area="'+area+'"] > div').length > 1){
                $('section.projects section[data-area="'+area+'"]').addClass('nav');
                $('section.projects ul.nav').removeClass('hide');
            }else{
                $('section.projects ul.nav').addClass('hide');
            }
            $('.projects ul.nav p strong').text($('section.projects section[data-area="'+area+'"] > div.active').index()+1);
            $('.projects ul.nav p span').text($('section.projects section[data-area="'+area+'"] > div').length);
        }
    },
    init: function(){
        listActions.gotoarea($('.list li.active button').data('area'));
    }
}

//$(document).on('click','.hero',function(){
//    if($('.info',this)[0] == undefined || $('.info',this).hasClass('bg')){
//        $('.info',this).remove();
//        var active = $('section.active',this);
//        var index = active.index();
//        if(index == ($('section',this).length - 1)){
//            $('section',this).removeClass('active').removeClass('next');
//            $('section',this).eq(0).addClass('active');
//            $('section',this).eq(0).next().addClass('next');
//        }else{
//            active.next().next().addClass('next');
//            if(active.next().index() == ($('section',this).length - 1)){
//                active.next().prev().addClass('next');
//            }
//            active.next().removeClass('next').addClass('active');
//            active.removeClass('active');
//        }
//
//        //console.log('scrollleft Width',);
//        $('header.hero').stop().animate({ scrollLeft: ($('section.active',this).index())*($('section:last-of-type',this).width()+20) },300, function(){});
//        //$('header.hero').stop().animate({ scrollLeft: goto },300,function(){
//        //    //$('header.hero').stop().animate({ scrollLeft: $('section.active',this).offset().left+40 },100);
//        //});
//
//    }
//});

$(window).resize(function(){
    $('header.hero section.slides').stop().animate({ scrollLeft: ($('.hero section.slides section.active').index())*($('.hero section.slides section:last-of-type').width()+20) },0);
    // $('#gallery picture').each(function(){
    //     $(this).attr('style','');
    //     $(this).removeClass('active');
    // });
    if($('section.aside')[0] !== undefined) whatsinview();
});

const isElementXPercentInViewport = function(el, percentVisible) {
    let
        rect = el.getBoundingClientRect(),
        windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    return !(
        Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
        Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
};

function whatsinview(){
    $('section.aside > div > section').each(function (){
        let weakSelf = this;
        if(isElementXPercentInViewport(weakSelf,50)){
            $('section.aside aside a').removeClass('active');
            $('section.aside aside a[data-href="#'+$(weakSelf).attr('id')+'"]').addClass('active');
            $('button.showfilters small').text($('section.aside aside a[data-href="#'+$(weakSelf).attr('id')+'"]').text());
        }
    });
}

$(document).on('click touch', 'a.goto', function(e){
    if($(this).hasClass('landing')){
        window.origem = $(this).data('origem');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: $(this).data('evento'),
            produto: 'geral',
            origem_cta: $(this).data('origem')
        });
    }
    e.preventDefault();
    let hash = $(this).attr('href').split('#');
    hash.reverse();
    // console.log(hash);
    $('#'+hash[0]).removeClass('hidden');
    $('html,body').stop().animate({ scrollTop:$('#'+hash[0]).offset().top-100 } ,300);
    // $($(this).attr('href')).parent().parent()[0].scrollIntoView({ behavior: "smooth", inline: "center" });
});

if($('section.aside')[0] !== undefined) $('aside a.focus').trigger('click');


var total = 0;
var start = 0;
var timerr = null;
$(window).scroll(function(e){
    if( $('.scrollfocus')[0] !== undefined){
        var scroll = 150+$('.scrollfocus').offset().top+($('html,body')[0].scrollTop-$('.scrollfocus').offset().top);
        $('.scrollfocus header h2[data-area]').each(function(){
            if(scroll >= $(this).offset().top-150 && scroll <= ($(this).offset().top+$(this).height()) && $('ul[data-service="'+$(this).data('area')+'"] li.active').length == 0){
                listActions.activeParent = $('section.projects');
                listActions.gotoarea($(this).data('area'));
            };
        });
    }
    // $('section.work section.images picture').removeClass('show');
    $('section.work div.projects a, section.work div.projects section').removeClass('hide').removeClass('active');
    $('ul.areas button.filter').removeClass('has');
    if($('section.aside')[0] !== undefined) whatsinview();
});

whatsinview();

var listActions = {
    activeArea : null,
    activeParent : null,
    gotoarea: function(area){
        console.log('area',area);
        console.log('activeParent',$(listActions.activeParent));
        if(area !== undefined){
            $('section[data-area]',listActions.activeParent).removeClass('nav');
            $(listActions.activeParent).stop().animate({ scrollTop: $('section[data-area="'+area+'"]',listActions.activeParent).index()*$(listActions.activeParent).height() },300);
            if($('section[data-area="'+area+'"] > div',listActions.activeParent).length > 1){
                $('section[data-area="'+area+'"]',listActions.activeParent).addClass('nav');
                $('ul.nav',listActions.activeParent).removeClass('hide');
            }else{
                $('ul.nav',listActions.activeParent).addClass('hide');
            }
            $('ul.nav p strong',listActions.activeParent).text($('section[data-area="'+area+'"] > div.active',listActions.activeParent).index()+1);
            $('ul.nav p span',listActions.activeParent).text($('section[data-area="'+area+'"] > div',listActions.activeParent).length);
        }
    },
    gotoareaproject: function(goto){
        var next = $('section[data-area="'+listActions.activeArea+'"] > div.active',listActions.activeParent).index();
        var total = $('section[data-area="'+listActions.activeArea+'"] > div',listActions.activeParent).length;
        if(goto == 'next'){
            goto = next+1;
            console.log('next',goto);
            if(goto >= total){
                goto = 0;
            }
        }else if(goto == 'prev'){
            goto = next-1;
            console.log('next',goto);
            if(goto < 0){
                goto = total-1;
            }
        }
        console.log('active',next);
        console.log('total',total);
        console.log('goto',goto);
        $('section[data-area="'+listActions.activeArea+'"] > div',listActions.activeParent).removeClass('active');
        $('section[data-area="'+listActions.activeArea+'"] > div',listActions.activeParent).eq(goto).addClass('active');
        $('section[data-area="'+listActions.activeArea+'"]',listActions.activeParent).stop().animate({ scrollLeft: goto*$(listActions.activeParent).width() },300);
        $('ul.nav p strong',listActions.activeParent).text(goto+1);
        $('ul.nav p span',listActions.activeParent).text(total);
    },
    init: function(){
        listActions.gotoarea($('ul.areas li.active button').data('area'));
    }
}

listActions.init();

$(document).on('click','li:not(.active) button:not(.parent, .nav)',function(){

    var parent = $(this).parents('ul.areas');
    if($(this).hasClass('goto')){
        $('html,body').stop().animate({ scrollTop: $(':not(button)[data-area="'+$(this).data('area')+'"]').offset().top-150 } ,300);
    }else if(!$(this).parent('li').hasClass('active')){
        $('div',parent).slideUp(300);
        $('li',parent).removeClass('active');
        $(this).next('div').slideDown(300,function(){
            var weakSelf = this;
            console.log('parent',$(parent).parent());
            // if($(parent).parent().height() > $(parent).parent().parent().find('section').height()*1.2){
            if(!$(this).parents('ul.closable').hasClass('noscroll')) $('html,body').stop().animate({ scrollTop: $(weakSelf).offset().top-200 },300);
            // }else{
            //     $('html,body').stop().animate({ scrollTop: $(parent).parent().parent().offset().top },300);
            // }
        });
        if($(this).parents('ul[data-name]')[0] == undefined) $(this).parent().addClass('active');
        listActions.activeParent = $('section.'+parent.data('section'));
        listActions.gotoarea($(this).data('area'));
        if($(this).hasClass('filter')){
            $('section.work div.projects a,section.work div.projects section').addClass('not');
            $('section.work div.projects a.'+$(this).data('filter')+', section.work div.projects section.'+$(this).data('filter')).removeClass('not');
            $('html,body').stop().animate({ scrollTop: $('section.tabs').offset().top-100 } ,0);
            if($(this).parents('ul[data-name]').parent().find('button.parent')[0] !== undefined){
                $(this).parents('ul[data-name]').parent().find('button.parent span.brand').text($(this).text());
                $(this).parents('ul[data-name]').parent().addClass('active');
                $(this).parents('ul[data-name]').removeClass('show');
                $(this).parents('ul[data-name]').prev('button.parent').removeClass('active');
                $(this).parents('ul[data-name]').find('li').removeClass('active');
                $(this).parent().addClass('active');
            }else{
                $('button.parent').removeClass('active');
                $('button.parent').next('ul').removeClass('show');
                $('button.parent span.brand').text($('button.parent span.brand').data('default'));
            }
        }
    }else if($('picture',this)[0] !== undefined){
        $(this).next('div').slideUp(300);
        $(this).parent().removeClass('active');
    }else if($(this).parents('li').hasClass('active')){
        $(this).parent().removeClass('active');
        $('ul.areas button.filter').eq(0).parents('li').addClass('active');
        $('section.work div.projects a, section.work div.projects section').removeClass('not');
        $('html,body').stop().animate({ scrollTop: $('section.tabs').offset().top-100 } ,0);
        $('button.parent').parent().removeClass('active');
        $('button.parent').removeClass('active');
        $('button.parent').next('ul').removeClass('show');
        $('button.parent span.brand').text($('button.parent span.brand').data('default'));
    }
    $('button.showfilters small').text($('section.tabs ul.areas > li.active > button > span').text());
   $('section.tabs ul.areas, button.showfilters').removeClass('show');
});
$(document).on('click','ul.closable li.active button:not(.parent, .nav)',function(){
    var parent = $(this).parents('ul.areas');
    if($(this).hasClass('goto')){
        $('html,body').stop().animate({ scrollTop: $(':not(button)[data-area="'+$(this).data('area')+'"]').offset().top-150 } ,300);
    }else if($('picture',this)[0] !== undefined){
        $(this).next('div').slideUp(300);
        $(this).parent().removeClass('active');
    }else if($(this).parents('li').hasClass('active')){
        $(this).parent().removeClass('active');
        $('ul.areas button.filter').eq(0).parents('li').addClass('active');
        $('section.work div.projects a, section.work div.projects section').removeClass('not');
        $('html,body').stop().animate({ scrollTop: $('section.tabs').offset().top-100 } ,0);
        $('button.parent').parent().removeClass('active');
        $('button.parent').removeClass('active');
        $('button.parent').next('ul').removeClass('show');
        $('button.parent span.brand').text($('button.parent span.brand').data('default'));
    }
    $('button.showfilters small').text($('section.tabs ul.areas > li.active > button > span').text());
   $('section.tabs ul.areas, button.showfilters').removeClass('show');
});

$(document).on('click','button.showfilters',function(){
    if(!$(this).hasClass('show')){
        $(this).addClass('show');
        $('ul.areas, aside').addClass('show');
    }else{
        $(this).removeClass('show');
        $('ul.areas, aside').removeClass('show');
    }
});

$(document).on('click','aside nav a:not(.contact)',function(){

    let hash = $(this).attr('href').split('#');
    hash.reverse();
    window.history.pushState({},'','/landing/'+$('html').attr('lang')+'/'+hash[0]);
    $('ul.areas, aside, button.showfilters').removeClass('show');
});

$(document).on('click','#popup button',function(){
    $('#popup').remove();
});

$(document).on('click','.projects ul.nav button:not(.parent)',function(){
    listActions.activeArea = $('ul.areas li.active button').data('area');
    listActions.activeParent = $('section.projects');
    listActions.gotoareaproject($(this).data('index'));
});

$(document).on('click','button.burger',function(){
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $('nav ul.menu').addClass('show');
    }else{
        $(this).removeClass('active');
        $('nav ul.menu').removeClass('show');
    }
});
$(document).on('click','nav button[data-child]',function(){
    if(!$(this).hasClass('show')){
        $(this).addClass('show');
        $(this).next().addClass('show');
    }else{
        $(this).removeClass('show');
        $(this).next().removeClass('show');
    }
});

$(document).on('click','button.parent',function(){
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $(this).next('ul').addClass('show');
    }else{
        $(this).removeClass('active');
        $(this).next('ul').removeClass('show');
    }
});


$(document).on('click','button.scrolldown',function(){
    var weakSelf = this;
    $('main > *').each(function(){
        if($(this).find(weakSelf)[0] !== undefined){
            $('html,body').stop().animate({ scrollTop: $('main > *').eq($(this).index()+1).offset().top-100 } ,300);
            return;
        }
    });
});

$(document).on('click','button.gotofilter',function(){
    $('button.cometo[data-filter="'+$(this).data('filter')+'"]').parent().removeClass('active');
    $('button.cometo[data-filter="'+$(this).data('filter')+'"]').trigger('click');
});

var hoverTimer = null;

$(document).on('mouseover','section.work div.projects a:not(.btn), section.work div.projects section',function(){
    //clearTimeout(hoverTimer);
    var weakself = this;
    $('section.work section.images picture[data-id="'+$(this).data('id')+'"]').addClass('show');
    //hoverTimer = setTimeout(function(){
         $('section.work div.projects a:not(.btn, [data-id="'+$(weakself).data('id')+'"])').removeClass('active').addClass('hide');
         $('section.work div.projects section:not(.btn, [data-id="'+$(weakself).data('id')+'"])').removeClass('active').addClass('hide');
    //},0);
    var classes = $(this).attr('class').split(' ');
    $('ul.areas button.filter[data-filter="'+classes.join('"],ul.areas button.filter[data-filter="')+'"]').addClass('has');
}).on('mouseleave','section.work div.projects a:not(.btn), section.work div.projects section',function(){
    //clearTimeout(hoverTimer);
    $('section.work section.images picture').removeClass('show');
    $('section.work div.projects a, section.work div.projects section').removeClass('hide').removeClass('active');
    $('ul.areas button.filter').removeClass('has');
});


$(document).on('scroll', 'section.tabs div.projects', function() {
    // console.log($(this)[0].scrollHeight);
    // console.log(($(this).scrollTop() + $(this).innerHeight()));
    if(($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) {
        $('section.tabs').removeClass('sticky');
    }else{
        $('section.tabs').addClass('sticky');
    }
});

//$(document).on('click touch', 'section.work a', function(e) {
//    if(!$(this).hasClass('active')){
//        e.preventDefault();
//        $(this).addClass('active')
//    }
//});



function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

function initFilters() {
    if(getAllUrlParams().filter !== undefined){
        $('button.filter[data-filter="'+getAllUrlParams().filter+'"]').trigger('click');
    }
    if(getAllUrlParams().area !== undefined){
        $('button[data-area="'+getAllUrlParams().area+'"]').trigger('click');
    }
}

initFilters();

$('#gallery picturess').on('click touch', function(){
    if(!$('html').hasClass('drag')){

        $(this).toggleClass('active');
        var h = $('img:not(.back)',this).height()+'px';
        if(!$(this).hasClass('active')){
            h = 'calc('+$('img:not(.back)',this).height()+'px + 20vmin)';
        }
        $(this)[0].style.height = h;
        var scrollTo = (($('img:not(.back)',this).height()-$(window).height())/2);
        if($(this).hasClass('active')){
            if(!$('#gallery div.cursor').hasClass('zoomout')){
                $('#gallery div.cursor').addClass('zoomout').removeClass('zoomin');
                $('#gallery div.cursor span').text('Zoom out');
            }
        }else{
            if(!$('#gallery div.cursor').hasClass('zoomin')){
                $('#gallery div.cursor').addClass('zoomin').removeClass('zoomout');
                $('#gallery div.cursor span').text('Zoom in');
            }
            var vmin = ($(window).height() > $(window).width())?($(window).width() * .2):($(window).height() * .2);
            scrollTo = (($('img:not(.back)',this).height()+vmin-$(window).height())/2);
        }
        $([document.documentElement, document.body]).stop().animate({
            scrollTop: $(this).offset().top+scrollTo
        },500);
    }
});


var drag = false;

$('body').on('mousedown','#gallery section.images', function(e){
    //console.log('mouse down');
    $(this).addClass('down');
    drag = true;
    $(this).data('left', this.scrollLeft);
    $(this).data('x', e.clientX);
});

$('body').on('mousemove','#gallery section.images', function(e){
    if(drag){
        $(this).addClass('drag');
        var dx = e.clientX - $(this).data('x');
        this.scrollLeft = $(this).data('left') - dx;
        //console.log('left',this.scrollLeft);
    }else{
        $(this).removeClass('drag');
    }
});

$('body').on('mouseup', function(e) {
    $('#gallery section.images').removeClass('down').removeClass('drag');
    drag = false;
});

let formFirstFocus = false;

$(document).on('focus','#contactoForm input, #contactoForm select, #contactoForm textarea',function (){
    if(!formFirstFocus){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'form_start',
            produto: 'geral',
            origem_cta: 'forumlario'
        });
        formFirstFocus = true;
        console.log('form_start');
    }
});

$(document).on('click touch','a.gwhatsapp',function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'whatsapp_click',
        produto: 'geral',
        origem_cta: $(this).data('origem')
    });
    console.log('whatsapp_click');
});

$(document).on('click touch','a.gtel',function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'phone_click',
        produto: 'geral',
        origem_cta: $(this).data('origem')
    });
    console.log('phone_click');
});

$(document).on('click touch','a.gemail',function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'email_click',
        produto: 'geral',
        origem_cta: $(this).data('origem')
    });
    console.log('phone_click');
});
$(document).on('click touch','a.landing:not(.goto)',function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: $(this).data('evento'),
        produto: 'geral',
        origem_cta: $(this).data('origem')
    });
    console.log('phone_click');
});