$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    $("form")[0].reset();
    const d = new Date();
    var test = $.test()
    $('#form').submit(function (e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        console.log('data  ---->' ,data);


        $.ajax({
            url: `${[test[0].url]}/dualUOM/add`,
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            success: function (data, status, xhr) {

                if (xhr.status == 200) {
                    window.open("../template/uomList.jsp", "_self");
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
        window.open("../template/uomList.jsp", "_self");
    })

});
