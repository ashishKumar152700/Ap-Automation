$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var nextNumberObject = JSON.parse(sessionString);
    
    object=nextNumberObject[0];
    console.log(object);
    
    var test = $.test()

    var val = 0;
    $('#toggle-switch').on('change', function () {

        if ($(this).is(':checked')) {

            $('#toggle-label').text('Active');

            $(this).val(1);

            val = $(this).val()


        } else {

            $('#toggle-label').text('Inactive');

            $(this).val(0);

            val = $(this).val()

        }
    });

    if (object.status == 1) {
        $('#toggle-label').text('Active');
        $('#toggle-switch').attr('checked', 'checked');
    }
    else
    {
        $('#toggle-label').text('Inactive');
        $('#toggle-switch').removeAttr('checked');
    }
 
   

    $("#form6Example10").val(object.company);
    $("#form6Example8").val(object.mcu);
    $("#input-text4").val(object.process);
    $("#input-text5").val(object.year);
    $("#input-text8").val(object.length);
    $("#toggle-switch").val(object.status);
    $("#gateId").val(object.gateId);



    $("#form1").submit((e) => {

        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/gate/number/${object.id}`,
            data: JSON.stringify({
                id: object.id,
                company: $("#form6Example10").val(),
                mcu: $("#form6Example8").val(),
                process: $("#input-text4").val(),
                year: $("#input-text5").val(),
                length: $("#input-text8").val(),
                gateId: $("#gateId").val(),
                status : val
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
                        title: 'Nextnumber  updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {
            
                        window.open("../template/nextNumber.jsp", "_self")
    
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

    var tab1 = $(".nav-link")[0];
                    var tab2 = $(".nav-link")[1];
                    var tab3 = $(".nav-link")[2];

                    $(".nextt").click(()=>{
                       next();
                    })
                    $(".prev").click(()=>{
                       prev();
                    })
                    $(".last").click(()=>{
                       lpage();
                    })
                    
                    function next(){
                      $(tab2).trigger("click");
                    }
                    function prev(){
                      $(tab1).trigger("click");
                    }

                    function lpage(){
                      $(tab3).trigger("click");
                    }


                    $(".cancel").click((e) => {
                        e.preventDefault();
                        window.open("../template/nextNumber.jsp", "_self");
                      })

                 
  
})

