$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    $("form")[0].reset();
    const d = new Date();

    $('#summernote').summernote({
        // placeholder: 'Hello Bootstrap 4',
        tabsize: 2,
        height: 300,

    });

    $('#form').submit(function (e) {
        e.preventDefault();

        var name = $("#name").val()
        var subject = $("#subject").val()
        var send_email = $("#send_email").val()
        var to_email = $("#to_email").val()
        var cc = $('#cc').val();
        var aHTML = $('#summernote').summernote('code');
        console.log(aHTML);
        // let strings = JSON.stringify(aHTML)

        // let blob = new Blob([strings], { type: 'text/html' });
        // console.log(blob);
        var base64Content = btoa(aHTML);
        console.log(base64Content);
        var outgoing_mail_server = $('#outgoing_mail_server').val();
        var test = $.test();

        var summernoteContent = $('#summernote').summernote('code'); // Check if the Summernote content is empty
        if (summernoteContent === '' || summernoteContent === '<p><br></p>') { // Prevent form submission and display an error message
            swal("", "Please enter your text in the Summernote field.", "error")
        } else {
            $.ajax({
                url: `${[test[0].url]}/emailTemplate/add`,
                type: 'post',
                data: JSON.stringify({
                    name: name,
                    subject: subject,
                    send_email: send_email,
                    to_email: to_email,
                    cc: cc,
                    outgoing_mail_server: outgoing_mail_server,
                    content: "",
                    html_content: base64Content,
                }),
                headers: {
                    'Accept': 'application/json; text/html',
                    'Content-Type': 'application/json; text/html; charset=utf-8',
                    'Authorization': 'Bearer ' + token,
                },
                success: function (data, status, xhr) {

                    if (xhr.status == 200) {
                        window.open("../template/emailTemplate.jsp", "_self");
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

        // $.ajax({
        //     url: 'http://192.168.0.198:8050/register',
        //     type: 'post',
        //     data: JSON.stringify({
        //         // name: name,
        //         subject: subject,
        //         from: send_email,
        //         email: to_email,
        //         cc: cc,
        //         // outgoing_mail_server: outgoing_mail_server,
        //         poType: "OP",
        //         supplierName: "shashi",
        //         poNumber: "749835",
        //         body: aHTML,
        //     }),
        //     headers: {
        //         'Accept': 'application/json; text/html',
        //         'Content-Type': 'application/json; text/html; charset=utf-8'
        //     },
        //     // success: function () {
        //     //     alert('Your content was successfully saved');
        //     // }
        //     success: function (data, status, xhr) {

        //         // console.log(data);
        //         // console.log(xhr.status);

        //         if (xhr.status == 200) {
        //             window.open("../template/emailTemplate.jsp", "_self");
        //             $("form")[0].reset();
        //         }
        //     },

        //     error: function (xhr, httpStatusMessage, customErrorMessage) {

        //         swal("", xhr.responseJSON.message, "error")
        //         $("form")[0].reset();
            }
        });
    // });

    $(".cancel").click((e) => {
        e.preventDefault();
        window.open("../template/emailTemplate.jsp", "_self");
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

});
