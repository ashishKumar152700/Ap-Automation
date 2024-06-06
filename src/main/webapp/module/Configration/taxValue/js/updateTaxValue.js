
$(document).ready(() => {
    
    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    var test = $.test()

    $("#input-text1").val(object[0].tax);
    $("#input-text2").val(object[0].type);

    $("#form1").submit((e) => {

        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: `http://192.168.50.81:8080/ap_automation_backend/tax/update?id=${object[0].id}`,
            
            data: JSON.stringify({
                id: object.id,
                tax: $("#input-text1").val(),
                type: $("#input-text2").val(),
              
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                
            },
            success: function (data, status, xhr) {
               if(xhr.status == 200)
               {
                   const swalWithBootstrapButtons = Swal.mixin({
                       customClass: {
                           confirmButton: 'btn btn-primary',
                       },
                       buttonsStyling: false
                   })
               
                   
                   swalWithBootstrapButtons.fire({
                       title: 'Tax  updated',
                       icon: 'success',
                       confirmButtonText: 'OK',
                       reverseButtons: true
                   }).then((result) => {
           
                       window.open("../template/taxValue.jsp", "_self")
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
        window.open("../template/taxValue.jsp", "_self")
    })

})

