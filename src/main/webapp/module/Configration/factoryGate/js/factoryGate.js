$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"));
    $("form")[0].reset();
    var test = $.test();

    $("#gatetype").filterMultiSelect({
      placeholderText: "No Gate Type Selected",
    });
  
    $('#form').submit(function (e) {

        e.preventDefault();
        $("#unitname .item").map((index,value)=>{
            array1 = value.innerText.split("\n")[0];
          })

          $("#gatetype .item").map((index,value)=>{
            array2 = value.innerText.split("\n")[0];
          })

        // console.log(fav_language);
        
        var gatenumber = $("#gatenumber").val()
        var scanlocation = $("#scanlocation").val()
        var scanusername = $("#scanusername").val()
        var scanpassword = $("#scanpassword").val()
        // var gatesequence = $("#gatesequence").val()

    

        $.ajax({
            url: `${[test[0].url]}/factory/add`,
            type: "POST",
            data: JSON.stringify({
                gate_number: gatenumber,
                scan_location: scanlocation,
                scan_folder_username: scanusername,
                scan_folder_password: scanpassword,
                // gate_sequence: gatesequence,
               unit_name : array1,
               gate_type: array2,
            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },

            success: function (data, status, xhr) {
                console.log(data);

                if (xhr.status == 200) {
                    window.open("../template/factory.jsp", "_self");
                    $("form")[0].reset();
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
                $("form")[0].reset();
              }
              else{
                $.errorMessage(xhr.responseJSON.error)
                $("form")[0].reset();
              }
            }
        });

    });

    $.ajax({
        url: `${[test[0].url]}/companymaster/companies`,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data, status, xhr) {

          if(xhr.status == 200)
          {
            data.data.forEach(value => {
              $("#unitname").append(`<option value="${value.unit_name}">${value.unit_name}</option>`);
              // $("#unitname").attr("multiple", ""); // Set the 'multiple' attribute for multi-select
            });
            calls(); // Call the 'calls' function
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
      }
      });
    
      // Initialize the filterMultiSelect plugin
      function calls() {
        $("#unitname").filterMultiSelect({
          placeholderText: "No Unit Name Selected",
        });
      }
    $(".cancel").click((e) => {
        e.preventDefault();
        window.open("../template/factory.jsp", "_self");
    })

});