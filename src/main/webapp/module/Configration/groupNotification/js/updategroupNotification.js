
$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    

    var test = $.test()

    $("#input-text1").val(object[0].groupName);
    $("#name").val(object[0].name);
    $("#input-text2").val(object[0].email);
    $("#vendor_code").val(object[0].supplierNumber);


    $("#form").submit((e) => {

        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/notificationgroup/update/${object[0].id}`,
            data: JSON.stringify({
                id: object[0].id,
                groupName: $("#input-text1").val(),
                name: $("#name").val(),
                email: $("#input-text2").val(),
                supplierNumber: $("#vendor_code").val(),
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
                        title: 'GroupNotification updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {
            
                        window.open("../template/group.jsp", "_self")
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

    $(".cancel").click(() => {
        window.open("../template/group.jsp", "_self")
    })

})

