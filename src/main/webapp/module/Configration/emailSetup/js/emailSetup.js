$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    $("form")[0].reset();
    var test = $.test();
    const d = new Date();
    var fav_language;

    $(".reveal").on('click',function() {
        var $pwd = $(".pwd");
        if ($pwd.attr('type') === 'password') {
            // alert("hi")
            $pwd.attr('type', 'text');
            $('#show i').removeClass( "fa-eye-slash" );
            $('#show i').addClass( "fa-eye" );
        } else {
            $pwd.attr('type', 'password');
           
            $('#show i').addClass( "fa-eye-slash" );
            $('#show i').removeClass( "fa-eye" );
        }
    });
   

    $('input[name="fav_language"]').on('click', function() {
        fav_language = $('input[name="fav_language"]:checked').val()
        // alert(fav_language)
    });
    $('#form').submit(function (e) {

        e.preventDefault();
        

        // console.log(fav_language);
        
        var name = $("#name").val()
        var priority = $("#priority").val()
        var username = $("#username").val()
        var password = $("#password").val()
        var smtpserver = $("#smtpserver").val()
        var smtpport = $("#smtpport").val()
        var checkbox = $("#debugging")[0].checked
        let value = checkbox? 1 : 0;
        console.log(value);

        $.ajax({
            url: `${[test[0].url]}/emailConfig/add`,
            type: "POST",
            data: JSON.stringify({
                name: name,
                priority: priority,
                username: username,
               password: password,
               smtp_server: smtpserver,
               smtp_port: smtpport ,
               connection: fav_language,
               debugging: value,

            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

            success: function (data, status, xhr) {

                if (xhr.status == 200) {
                    window.open("../template/email.jsp", "_self");
                    $("form")[0].reset();
                }
                else{

                    $.errorMessage(xhr.responseJSON.message);
               }
            },

            error: function (xhr, httpStatusMessage, customErrorMessage) {

                if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >= 400 && xhr.status < 500){

                    $.errorMessage(xhr.responseJSON.message);
                    $("form")[0].reset();
                }
                else{
                    $.errorMessage(xhr.responseJSON.error)
                    $("form")[0].reset();
               }
            }
        });

    });

    $(".cancel").click((e) => {
        e.preventDefault();

        
        window.open("../template/email.jsp", "_self");
    })

});
