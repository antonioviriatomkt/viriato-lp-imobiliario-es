/**
 * Created by filipemendes on 25/09/2023.
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;secure";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(){
    fetch(window.cookies.url)
        .then((response) => response.text())
.then((CookieHTML) => {
        var cookiesHTML = $.parseHTML(CookieHTML);
        //console.log(cookiesHTML);
        var CookiePopup = $(cookiesHTML[0]);
        var CookieSettings = $(cookiesHTML[2]);
        var CookieSettingsButton = $(cookiesHTML[4]);
        var cookiepopup = getCookie(window.cookies.name);
        if (cookiepopup == "") {
            $(window.cookies.footer).after(CookiePopup);
            $(window.cookies.footer).after(CookieSettings);
        }else{
            allowedCookies = cookiepopup.split('&&');
            $(window.cookies.footer).after(CookieSettings);
            $(window.cookies.footer).after(CookieSettingsButton);
            for(var a = 0;a<allowedCookies.length;a++){
                $('section.cookies.settings input[value="'+allowedCookies[a]+'"]').prop('checked', true);
            }
            if (typeof gtag === 'function') {
                gtag('consent', 'update', buildConsentUpdate(allowedCookies));
            }
        }
        $(document).on('touch click', 'button.cookies, section.cookies a.settings, section.cookies button.customize', function(){
            $('section.cookies.settings').show();
            $('section.cookies:not(.settings)').hide();
        }).on('touch click','section.cookies.settings button.cancel', function(){
            if($('section.cookies:not(.settings)')[0] == undefined){
                console.log(allowedCookies);
                //alert('[value="'+allowedCookies.join('"][value="')+'"]');
                $('section.cookies input').prop('checked', false);
                $('section.cookies input[value="'+allowedCookies.join('"], section.cookies input[value="')+'"]').prop('checked', true);
            }
            $('section.cookies.settings div,section.cookies button.cookiesparent').removeClass('open');
            $('section.cookies.settings').hide();
            $('section.cookies:not(.settings)').show();
        }).on('touch click', 'section.cookies button.cookiesparent', function(){
            if(!$(this).hasClass('open')){
                $('section.cookies.settings div,section.cookies button.cookiesparent').removeClass('open');
                $(this).parents('li').find('div').addClass('open');
                $(this).addClass('open');
            }else{
                $('section.cookies.settings div,section.cookies button.cookiesparent').removeClass('open');
            }
        }).on("change", 'section.cookies input[type="checkbox"]', function() {
            $('section.cookies input[value="'+$(this).val()+'"]').prop('checked', this.checked);
        }).on('touch click','section.cookies button.acceptall', function(){
            $('section.cookies input[type="checkbox"]').prop('checked',true);
            $('section.cookies.settings button.save').trigger('click');
        }).on('touch click', 'section.cookies button.declineall', function(){
            $('section.cookies input[type="checkbox"]:not(#essentials,#settingsessentials)').prop('checked',false);
            $('section.cookies.settings button.save').trigger('click');
        }).on('touch click', 'section.cookies button.save,section.cookies button.accept', function(){
            var newallowedCookies = [];
            $('section.cookies.settings div.form input').each(function(){
                if(this.checked) newallowedCookies.push($(this).val());
            });
            //console.log(allowedCookies.join(';;'));
            var refresh = false;
            if(allowedCookies.join('&&') !== newallowedCookies.join('&&')) refresh = true; //confirm(window.cookies.refreshed);
            allowedCookies = newallowedCookies;
            //setCookie("cookiepopupGresartSite", 'ok', 365);
            setCookie(window.cookies.name, allowedCookies.join('&&'), 365);
            if($('button.cookies')[0] == undefined) $(window.cookies.footer).after(CookieSettingsButton);
            $('section.cookies:not(.settings)').remove();
            $('section.cookies.settings').hide();
            if(refresh) window.location = window.location;
            //alert('Saved');
        });
    // },6000);

}).catch((error) => { console.warn(error); });
}
var allowedCookies = [];
checkCookie();

function buildConsentUpdate(allowedCookies) {
    var hasAnalytics = allowedCookies.indexOf('analytics') !== -1;
    var hasSocial = allowedCookies.indexOf('social') !== -1;
    var hasFunctional = allowedCookies.indexOf('functional') !== -1;
    return {
        'analytics_storage': hasAnalytics ? 'granted' : 'denied',
        'ad_storage': hasSocial ? 'granted' : 'denied',
        'ad_user_data': hasSocial ? 'granted' : 'denied',
        'ad_personalization': hasSocial ? 'granted' : 'denied',
        'functionality_storage': 'granted',  // essentials always on
        'personalization_storage': hasSocial ? 'granted' : 'denied',
        'security_storage': 'granted'
    };
}
