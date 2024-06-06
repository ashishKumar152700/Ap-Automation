$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    $("form")[0].reset();
    const d = new Date();
    var test = $.test()
    $('#form').submit(function (e) {
        e.preventDefault();


        var tax = $("#tax").val()
        var type = $("#type").val()

        $.ajax({
            url: `http://192.168.50.81:8080/ap_automation_backend/tax/add`,
            type: "POST",
            data: JSON.stringify({
                tax: tax,
                type: type,
          
            
            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            success: function (data, status, xhr) {

                if (xhr.status == 200) {
                    window.open("../template/taxValue.jsp", "_self");
                    $("form")[0].reset();
                }
                else{
                    
                    $.errorMessage(xhr.responseJSON.message);
                    $("form")[0].reset();
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
        window.open("../template/taxValue.jsp", "_self");
    })

});
