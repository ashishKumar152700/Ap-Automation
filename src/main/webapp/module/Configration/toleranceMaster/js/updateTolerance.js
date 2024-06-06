

$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    console.log(object);

    $("#input-text2").val(object[0].process)
    $("#label_type").val(object[0].tolerance)

// $("#grn_column").filterMultiSelect({
//     placeholderText: "",
//   });



var test = $.test()

   

    $("#form1").submit((e) => {

        // var elementValue;
        e.preventDefault();
       
        $.ajax({
            type: "PUT",
            // url: `${[test[0].url]}/label/update/${object.id}`,
            url: `${[test[0].url]}/tolerance/update/${object[0].id}`,

            data: JSON.stringify({
                // id: object.id,
                process: $("#input-text2").val(),
                tolerance : $("#label_type").val(),

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
                        title: 'Updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {
    
                        window.open("../template/toleranceMaster.jsp", "_self")
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
                        $("form")[0].reset();
                }
                else{
                        $.errorMessage(xhr.responseJSON.error)
                        $("form")[0].reset();
                }
              
            },
        });
    });

    
  
    $(".cancel").click(() => {
        window.open("../template/toleranceMaster.jsp", "_self")
    })

})

