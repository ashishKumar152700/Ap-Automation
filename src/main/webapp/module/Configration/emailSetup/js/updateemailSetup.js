
$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);
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

      let value;

    //   console.log(object);

    $("#input-text1").val(object.name);
    $("#input-text2").val(object.priority);
    $("#input-text3").val(object.username);
    $("#input-text4").val(object.password);
    $("#input-text5").val(object.smtp_server);
    $("#input-text6").val(object.smtp_port);

    let languages = $('input[name="fav_language"]');


    for(let i = 0 ; i < languages.length ; i++)
    {
        if(languages[i].value == object.connection)
        {
            languages[i].checked = true;
            break;
        }
    }    

    if(object.debugging == 1){
        $("#input-text8").prop("checked",true)
    }
    else
    {
        $("#input-text8").prop("checked",false)

    }


    $("#form").submit((e) => {

        let radio;

        e.preventDefault();
        value = $("#input-text8")[0].checked
        // console.log(value);
        for(let i = 0 ; i < $('input[name="fav_language"]').length ; i++ )
        {
            if($('input[name="fav_language"]')[1].checked)
            {
               radio =  $('input[name="fav_language"]')[1].value
            }
        }

        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/emailConfig/update/${object.id}`,
            
            data: JSON.stringify({
                id: object.id,
                name: $("#input-text1").val(),
                priority: $("#input-text2").val(),
                username: $("#input-text3").val(),
                password: $("#input-text4").val(),
                smtp_server: $("#input-text5").val(),
                smtp_port: $("#input-text6").val(),
                connection: fav_language?fav_language : radio,
                debugging: value? 1 : 0,

        
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                
            },
            success: function (data, status, xhr) {
                console.log(data);

                if(xhr.status == 200)
                {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false
                    })
                
                    
                    swalWithBootstrapButtons.fire({
                        title: 'Email  updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {
            
                        window.open("../template/email.jsp", "_self")
                    })
                }
                else{

                    $.errorMessage(xhr.responseJSON.message);
               }
                
                
            },
            error: function (xhr) {
                if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >= 400 && xhr.status < 500){

                    $.errorMessage(xhr.responseJSON.message);
               }
               else{
                    $.errorMessage(xhr.responseJSON.error)
               }
            },
        });
    });

   

    $(".cancel").click(() => {
        window.open("../template/email.jsp", "_self")
    })

})

