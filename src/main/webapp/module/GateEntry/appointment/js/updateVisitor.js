

$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    console.log(object[0]);

    $("#first_name").val(object[0].first_name);
    $("#last_name").val(object[0].last_name);
    $("#mobile").val(object[0].mobile);
    $("#email").val(object[0].email);
    $("#in_time").val(object[0].in_time);
    $("#vehicle_nbr").val(object[0].vehicle_number);
    $("#person_to_meet").val(object[0].person_to_meet);
    $("#purpose").val(object[0].purpose);
    $("#request").val(object[0].request);
    $("#address").val(object[0].address);
    $("#gate_number").html(object[0].gate_number);



var test = $.test()
   



   

$("#confirm").click(()=>{
   
  
    // var label = $("#labelid").val()
    var firstname = $("#first_name").val();
    var lastname = $("#last_name").val();
    var vehicleNumber = $("#vehicle_nbr").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();
    var personToMeet = $("#person_to_meet").val();
    var purpose = $("#purpose").val();
    var inTime = $("#in_time").val();
    var request = $("#request").val();
    var address = $("#address").val();
    var gate_number = $("#gate_number").html();

 



    $.ajax({
        url: `${[test[0].url]}/visitor/update?id=${object[0].id}`,                                                                                                       
        type: "PUT",
        data: JSON.stringify({
            // labelId: label,
            first_name : firstname,
            last_name : lastname,
            mobile : mobile,
            email : email,
            address : address,
            person_to_meet : personToMeet,
            purpose : purpose,
            vehicle_number: vehicleNumber,
            gate_number : gate_number,
            request: request
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
                // swal("", "", "success")
                window.open("../template/visitor.jsp", "_self");
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
})



    
    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Dtable').DataTable().column(1).search(

                $('#col' + 1 + '_filter').val(),

                $('#col' + 1 + '_smart').prop('checked')

            ).draw();

        }

    });
  
    $("#cancel").click(() => {
        window.open("../template/visitor.jsp", "_self")
    })

})

