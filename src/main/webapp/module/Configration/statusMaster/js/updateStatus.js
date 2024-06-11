
$(document).ready(() => {
    
    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    var test = $.test()

    $("#input-text1").val(object.code);
    $("#input-text2").val(object.description);
    $("#input-text3").val(object.label);

    $("#form1").submit((e) => {

        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/status/update/${object.id}`,
            
            data: JSON.stringify({
                id: object.id,
                code: $("#input-text1").val(),
                description: $("#input-text2").val(),
                label: $("#input-text3").val(),
              
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
                       title: 'Status  updated',
                       icon: 'success',
                       confirmButtonText: 'OK',
                       reverseButtons: true
                   }).then((result) => {
           
                       window.open("../template/status.jsp", "_self")
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
        window.open("../template/status.jsp", "_self")
    })

})
