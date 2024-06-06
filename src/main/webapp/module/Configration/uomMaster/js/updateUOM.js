$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    const uom_id = JSON.parse(sessionStorage.getItem("uom_id"));

    console.log(uom_id , "uom");
    $("form")[0].reset();
    const d = new Date();
    var test = $.test()




    $.ajax({
        url: `${[test[0].url]}/dualUOM/get?id=${uom_id}`,
        // dataSrc: "data",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function (data, status, xhr) {
          if (xhr.status == 200) {
            uom_detail = data.data[0];
    
            console.log(uom_detail , "uom_detail");
    
            call(uom_detail);
          } else {
            $.errorMessage(xhr.responseJSON.message);
          }
        },
        error: function (xhr) {
          console.log("error ", xhr);
        },
      });
    
      function call(uom_detail) {
        for (let i = 0; i < $(".check").length; i++) {
          const element = $(".check")[i];
    
          if (uom_detail[`${$(element).attr("id")}`]) {
            let out = uom_detail[`${$(element).attr("id")}`];
    
            $(element).val(out) || $(element).html(out);
          }
        }
    }





    $('#form').submit(function (e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        console.log('data  ---->' ,data);


        $.ajax({
            url: `${[test[0].url]}/dualUOM/update?id=${data.id}`,
            type: "PUT",
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
