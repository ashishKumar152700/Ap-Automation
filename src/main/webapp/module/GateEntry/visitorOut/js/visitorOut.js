$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    $("#save").trigger("click")

    
    $("#gate_number").on("keypress", function (event) {
    if (event.keyCode === 13) {
        $("#pass_out").trigger("click");
    }
    });


    $("#pass_out").click(()=>{
        let gateNumber = $("#gate_number").val()

        let outTime = new Date().toLocaleString();
        $.ajax({
            url: `${[test[0].url]}/visitor/update?gateNumber=${gateNumber}`,                                                                                                       
            type: "PUT",
            data: JSON.stringify({
                // labelId: label,
               out_time : outTime,
               status : "GATE-OUT"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            success: function (data, status, xhr) {
                console.log(data)
              
                console.log(xhr);
                if (xhr.status == 200) {
                    swal("", "Visitor Checked Out Successfully.", "success").then(()=>{
                        window.open("../../visitorIn/template/visitor.jsp", "_self");
                    })

                }
                else{

                        $.errorMessage(xhr.responseJSON.message);
                }
                
            },
            
    
            error: function (xhr, httpStatusMessage, customErrorMessage) {
    
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
            }
        });

        
    })

    
    $("#myModal5").on("hide.bs.modal",function (){
        window.open("../../visitorIn/template/visitor.jsp", "_self");
    })
    
})

