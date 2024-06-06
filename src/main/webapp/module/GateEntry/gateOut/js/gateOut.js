$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    $("#save").trigger("click")


    let gate_number_out = JSON.parse(sessionStorage.getItem("gate_number_out"))

    $("#gate_number").val(gate_number_out)

    $("#gate_number").on("keypress", function (event) {
        console.log("hello");
        if (event.keyCode === 13) {
            $("#pass_out").trigger("click");
        }
      });



    $("#pass_out").click(()=>{
        let gateNumber = $("#gate_number").val()

        // console.log(gateNumber);

        let outTime = new Date().toLocaleString();
        $.ajax({
            url: `${[test[0].url]}/gate/put?gateNumber=${gateNumber}`,                                                                                                       
            type: "PUT",
            data: JSON.stringify({
                // labelId: label,
               out_time : outTime,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            success: function (data, status, xhr) {
                
                if (xhr.status == 200) {

                    sessionStorage.removeItem("gate_number_out")
                    window.open("../../gate/template/gate.jsp", "_self");
                    // $("form")[0].reset();
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

        
    })

    
    $("#myModal5").on("hide.bs.modal",function (){
        window.open("../../gate/template/gate.jsp", "_self");
    })
    
})

