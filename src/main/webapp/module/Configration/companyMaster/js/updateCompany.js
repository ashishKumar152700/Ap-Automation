
$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

        var test = $.test()

        $("#input-text1").val(object.unit_name);
        $("#input-text2").val(object.state_location);
        $("#input-text3").val(object.doc_company);
        $("#input-text4").val(object.name);
            $("#form6Example8").val(object.business_unit);
        $("#form6Example10").val(object.company);
        // $("#input-text2").val(object.gstin);
 



    $("#form1").submit((e) => {
            e.preventDefault();

        $.ajax({
            url: `${[test[0].url]}/companymaster/update/${object.id}`,
            type: "PUT",
            data: JSON.stringify({
                // id: object.id,
                unit_name: $("#input-text1").val(),
                state_location: $("#input-text2").val(),
                doc_company: $("#input-text3").val(),
                name: $("#input-text4").val(),
                business_unit: $("#form6Example8").val(),
                company: $("#form6Example10").val(),
                // gstin: $("#input-text2").val(),
 
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                
            },
            success: function (data, status, xhr) {
                // console.log(data);
                
                if(xhr.status ==200)
                {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false
                })
            
                
                swalWithBootstrapButtons.fire({
                    title: 'Company  updated',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then((result) => {
        
                    window.open("../template/company.jsp", "_self")
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
        window.open("../template/company.jsp", "_self")
    })

})

