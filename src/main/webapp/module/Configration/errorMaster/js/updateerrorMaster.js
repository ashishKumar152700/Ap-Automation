
$(document).ready(() => {
    
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);
    console.log(object);
    

    $("#input-text1").val(object[0]. error_code);
    $("#input-text2").val(object[0].error_description);
    $("#input-text3").val(object[0]. error_type);
    $("#input-text4").val(object[0].error_resolution);

  


   

    $("#form").submit((e) => {

        
       
        e.preventDefault();
       
        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/errorMsg/update/${object[0].id}`,
            data: JSON.stringify({
                id: object.id,
                error_code: $("#input-text1").val(),
                error_description: $("#input-text2").val(),
                error_type: $("#input-text3").val(),
                error_resolution: $("#input-text4").val(),

               


            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                
            },
            success: function (data, status, xhr) {

              if(xhr.status == 200){
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false
                })
            
                
                swalWithBootstrapButtons.fire({
                    title: 'ErrorMessage Updated',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then((result) => {
        
                    window.open("../template/error.jsp", "_self")
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
        window.open("../template/error.jsp", "_self")
    })

})

