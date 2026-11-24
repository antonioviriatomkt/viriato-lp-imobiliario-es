/**
 * Created by filipemendes on 25/09/2023.
 */
window.reCaptcha = "6LeQ1boqAAAAAFAs1WQFyZ7Okyy52QSwNcvrRJ9s";

function formValidate(formName,uniqueName,className,keyName){
    return true;
}
var isSending = false;
var leadFlag = false;

$('#contactoForm').submit(function(e){
    //alert('here');
    e.preventDefault();
    if(formValidate('#contactoForm','required',true) && !isSending){
        isSending = true;
        $('#contactoForm').addClass('disabled');
        if($('body').hasClass('new')) {
            $('div.cookiemsg').remove();
            var popup = '<div class="cookiemsg">';
            popup += '<h3>'+window.form.sending+'...</h3>';
            popup += '</div>';
            $('form').append(popup);
            $('html,body').stop().animate({ scrollTop:$('div.cookiemsg').offset().top-100 } ,300);
        } else {
            $('#popup').remove();
            var popup = '<div id="popup"><section><h4>' + window.form.title + '</h4>';
            popup += '<p>'+window.form.sending+'...</p>';
            popup += '<button class="closepopup hidden" type="button" title="'+window.form.close+'">'+window.form.close+'</button>';
            popup += '</section></div>';
            $('main').after(popup);
        }
        $.ajax({
            url: "https://www.recaptcha.net/recaptcha/api.js?render="+window.reCaptcha,
            dataType: "script",
            scriptAttrs: { nonce: "230230d3d82ce796c18a761f8cfb29315182a8d9125f60a1017bffdf47462b07" },
            success: function( ) {
                grecaptcha.ready(function() {
                    grecaptcha.execute(reCaptcha, {action: 'submit'}).then(function (token) {
                        document.getElementById('contacto-recaptcha').value = token;
                        var formDataArray = $("#contactoForm").serializeArray();
                        var myformData = new FormData();
                        for(var i = 0;i<formDataArray.length;i++){
                            myformData.append(formDataArray[i].name+'', formDataArray[i].value);
                        }
                        if($('#cvOffer')[0] !== undefined){
                            myformData.append("cv",  $('#cvOffer')[0].files[0]);
                        }
                        //console.log(myformData);
                        $.ajax({
                            url: $('#contactoForm').attr('action'),
                            method: 'post',
                            processData: false,
                            contentType: false,
                            cache: false,
                            data: myformData,
                            enctype: 'multipart/form-data',
                            success: function(data) {
                                var response = JSON.parse(data);
                                if($('body').hasClass('new')) {
                                    $('div.cookiemsg h3').html(response.popupTitle); //response.popupTitle
                                    $('div.cookiemsg').append('<p>'+response.popupMessage+'</p>'); //response.popupTitle
                                    $('html,body').stop().animate({ scrollTop:$('div.cookiemsg').offset().top-100 } ,300);
                                } else {
                                    $('#popup p').html(response.popupMessage); //response.popupTitle
                                }
                                if(response.success == true){
                                    $('#contactoForm input:not([type="submit"],[name="action"],[name="subject"])').val('');
                                    $('#contactoForm textarea').val('');
                                    $('#contactoForm select').val('');
                                    $('#contactoForm input[type="checkbox"]').prop( "checked", false );
                                    if(leadFlag == false){
                                        window.dataLayer = window.dataLayer || [];
                                        window.dataLayer.push({
                                            event: 'generate_lead',
                                            produto: window.produto,
                                            origem_cta: window.origem
                                        });
                                        console.log('window.dataLayer.push');
                                        leadFlag = true;
                                    }
                                }
                                $('#contactoForm').removeClass('disabled');
                                $('#contactoForm input[name="wasSent"]').val(response.hash);
                                $('#popup button.closepopup').removeClass('hidden');
                                isSending=false;
                                if(typeof(gtag_report_conversion) == 'function') gtag_report_conversion(window.location.href);
                            },
                            error: function (jqXHR, exception) {
                                if($('body').hasClass('new')) {
                                    $('div.cookiemsg h3').html(window.form.error); //response.popupTitle
                                    $('html,body').stop().animate({ scrollTop:$('div.cookiemsg').offset().top-100 } ,300);
                                } else {
                                    $('#popup p').html(window.form.error);
                                    $('#popup button.closepopup').removeClass('hidden');
                                }
                                $('#contactoForm').removeClass('disabled');
                                isSending=false;
                            },
                        });
                    });
                });
            },
            error: function( ) {
                    $('#popup p').html(window.form.error); //$('div.msg h3').data('error')
                    $('#contactoForm').removeClass('disabled');
                    $('#popup button.closepopup').removeClass('hidden');
                    isSending=false;
                }
        });
        // $.getScript("https://www.recaptcha.net/recaptcha/api.js?render="+window.reCaptcha).done(function( script, textStatus ) {
        //     grecaptcha.ready(function() {
        //         grecaptcha.execute(reCaptcha, {action: 'submit'}).then(function (token) {
        //             document.getElementById('contacto-recaptcha').value = token;
        //             var formDataArray = $("#contactoForm").serializeArray();
        //             var myformData = new FormData();
        //             for(var i = 0;i<formDataArray.length;i++){
        //                 myformData.append(formDataArray[i].name+'', formDataArray[i].value);
        //             }
        //             if($('#cvOffer')[0] !== undefined){
        //                 myformData.append("cv",  $('#cvOffer')[0].files[0]);
        //             }
        //             //console.log(myformData);
        //             $.ajax({
        //                 url: $('#contactoForm').attr('action'),
        //                 method: 'post',
        //                 processData: false,
        //                 contentType: false,
        //                 cache: false,
        //                 data: myformData,
        //                 enctype: 'multipart/form-data',
        //                 success: function(data) {
        //                     var response = JSON.parse(data);
        //                     $('#popup p').html(response.popupMessage); //response.popupTitle
        //                     if(response.success == true){
        //                         $('#contactoForm input:not([type="submit"],[name="action"],[name="subject"])').val('');
        //                         $('#contactoForm textarea').val('');
        //                         $('#contactoForm input[type="checkbox"]').prop( "checked", false );
        //                     }
        //                     $('#contactoForm').removeClass('disabled');
        //                     $('#contactoForm input[name="wasSent"]').val(response.hash);
        //                     $('#popup button.closepopup').removeClass('hidden');
        //                     isSending=false;
        //                 },
        //                 error: function (jqXHR, exception) {
        //                     $('#popup p').html(window.form.error);
        //                     $('#contactoForm').removeClass('disabled');
        //                     $('#popup button.closepopup').removeClass('hidden');
        //                     isSending=false;
        //                 },
        //             });
        //         });
        //     });
        // }).fail(function( jqxhr, settings, exception ) {
        //     $('#popup p').html(window.form.error); //$('div.msg h3').data('error')
        //     $('#contactoForm').removeClass('disabled');
        //     $('#popup button.closepopup').removeClass('hidden');
        //     isSending=false;
        // });
    }
    e.preventDefault();
});

$('#confpassword').on('input change',function(e){
    if($(this).val() !== $('#password').val()){
        $(this)[0].setCustomValidity("Passwords Don't Match");
        $(this).attr('title',"Passwords Don't Match");
    }else{
        $(this)[0].setCustomValidity("");
        $(this).attr('title',"");
    }
});