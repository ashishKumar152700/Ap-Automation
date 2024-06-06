$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test();
    $("form")[0].reset();
   
    $('#form').submit(function (e) {
        e.preventDefault();
        var unitname = $("#unit_name").val()
        var name = $("#name").val()
        var statelocation = $("#state_location").val()
        var businessunit = $("#form6Example8").val()
        var company = $("#form6Example10").val()
        var doccompany = $("#doc_company").val()
        // var gstin = $("#gstin").val()

        $.ajax({

            url: `${[test[0].url]}/companymaster/add`,
            type: "POST",
            data: JSON.stringify({
                unit_name: unitname,
                name: name,
                state_location: statelocation,
                business_unit:businessunit,
                company: company,
                doc_company: doccompany,
                // gstin: gstin,
                
            }),
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

            success: function (data, status, xhr) {
              
                if (xhr.status == 200) {
                    window.open("../template/company.jsp", "_self");
                    $("form")[0].reset();
                }
                else{
                    swal("", xhr.responseJSON.message, "warning")
                }
            },

            error: function (xhr, httpStatusMessage, customErrorMessage) {

                console.log(xhr);

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
        window.open("../template/company.jsp", "_self");
    })

});
