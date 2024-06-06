$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    $('#summernote').summernote({
        // placeholder: 'Hello Bootstrap 4',
        tabsize: 2,
        height: 300
    });

    $(".cancel").click(() => {
        window.open("../template/emailTemplate.jsp", "_self")
    })

    // Get references to the tab links
    var tab1 = $(".nav-link")[0];
    var tab2 = $(".nav-link")[1];
    var tab3 = $(".nav-link")[2];

    // Handle next button click
    $(".nextt").click(() => {
        next();
    });

    // Handle previous button click
    $(".prev").click(() => {
        prev();
    });

    // Handle last button click
    $(".last").click(() => {
        lpage();
    });

    // Function to navigate to the next tab
    function next() {
        $(tab2).trigger("click");
    }

    // Function to navigate to the previous tab
    function prev() {
        $(tab1).trigger("click");
    }

    // Function to navigate to the last tab
    function lpage() {
        $(tab3).trigger("click");
    }

    var test = $.test()

    console.log(object);

    $("#name").val(object.name);
    $("#subject").val(object.subject);
    $("#send_email").val(object.send_email);
    $("#to_email").val(object.to_email);
    $("#cc").val(object.cc);
    $("#outgoing_mail_server").val(object.outgoing_mail_server);
    // $(".note-editable p").append(object.content);
    var htmlContent = atob(object.html_content);
    $('#summernote').summernote('code', htmlContent);



    // console.log(base64Content);


    $("#form").submit((e) => {

        var aHTML = $('#summernote').summernote('code');
        // console.log(aHTML);
        var base64Content = btoa(aHTML);
        // console.log(aHTML);
        var test = $.test()

        e.preventDefault();

        var summernoteContent = $('#summernote').summernote('code'); // Check if the Summernote content is empty
        if (summernoteContent === '' || summernoteContent === '<p><br></p>' || summernoteContent === '<h3><br></h3>') { // Prevent form submission and display an error message
            swal("", "Please enter your text in the Summernote field.", "error")
        } else {

            $.ajax({
                type: "PUT",
                url: `${[test[0].url]}/emailTemplate/update/${object.id}`,

                data: JSON.stringify({

                name:$("#name").val(),
                subject:$("#subject").val(),
                send_email:$("#send_email").val(),
                to_email:$("#to_email").val(),
                cc:$("#cc").val(),
                outgoing_mail_server:$("#outgoing_mail_server").val(),
                content:"",
                html_content: base64Content,
            }),
            headers: {
                'Accept': 'application/json; text/html',
                'Content-Type': 'application/json; text/html; charset=utf-8',
                'Authorization': 'Bearer ' + token,
            },
            success: function (data, status, xhr) {
                // console.log(data);
                // console.log(xhr.status);
                
                if(xhr.status == 200)
                {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false
                    })
                
                    
                    swalWithBootstrapButtons.fire({
                        title: 'Email Template updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {
            
                        window.open("../template/emailTemplate.jsp", "_self")
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
    } 
    })
});

