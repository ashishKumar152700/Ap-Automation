$(document).ready(() => {


  const token = JSON.parse(localStorage.getItem("token"));
  var test = $.test(); // Retrieve the value of $.[test[0].url]()

// Get the input element and error message element
var mobileNumberInput = document.getElementById("mobile_number");
var mobileNumberError = document.getElementById("mobile_number_error");

// Add an event listener to the input for validation
mobileNumberInput.addEventListener("input", function () {
  var inputValue = mobileNumberInput.value;

  if (inputValue.length === 10 && /^\d+$/.test(inputValue)) {
    // Valid 10-digit number, hide the error message
    mobileNumberError.style.display = "none";
  } else {
    // Invalid input, show the error message
    mobileNumberError.style.display = "block";
  }
});

  $("form")[0].reset(); // Reset the form fields

  $('#form').submit((e) => {

    $("#loader").addClass("ibox-content")
    $("#loader").addClass("sk-loading")
    $("#spin").removeClass("d-none")


    e.preventDefault(); // Prevent form submission

    // Retrieve and process form field values
    var username = $("#form6Example1").val();
    // var display = $("#form6Example6").val().split(" ");
    // var user = display.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    var password = $("#form6Example2").val();
    var first_name = $("#form6Example3").val().charAt(0).toUpperCase() + $("#form6Example3").val().slice(1).toLowerCase();
    var last_name = $("#form6Example4").val().charAt(0).toUpperCase() + $("#form6Example4").val().slice(1).toLowerCase();
    var address_number = $("#form6Example5").val();
    // var display_name = user.join(" ");
    var email = $("#form6Example7").val();
    // var business_unit = $("#form6Example8").val();
    // var company_code = $("#form6Example9").val();
    var assignroles = $("#roles .item").map((index, value) => ({ rolecode: value.innerText.split("\n")[0] })).get();
    // var assigncompany = $("#unitname .item").map((index, value) => ({ unitName: value.innerText.split("\n")[0] })).get();
    var unitName = $('#unitname').val();
    // console.log([{unitName}]);

    var mobileNumber=$("#mobile_number").val()

    var gate_id = $("#gateId").val();
    var assignstore = $("#storeId .item").map((index, value) => ({ storeCode: value.innerText.split("\n")[0] })).get();
    // console.log(gate_id);

    var store_id="null"

    // $.sendEmail(data,"addUser")

    console.log(' user object ---->' ,JSON.stringify({
      username,
      password,
      first_name,
      last_name,
      address_number,
      email,
      assignstore,
      assignroles,
      assigncompany: [{ unitName }],
      gate_id,
      mobileNumber
    }));


    $.ajax({
      url: `${[test[0].url]}/gate/find?gateid=${gate_id}`,
      async: false,
      type: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: function (data, status, xhr) {
        // console.log(data.data[0].gateNumber);
        if (data.data != null && xhr.status == 200) {
          $.ajax({
            url: `${[test[0].url]}/usermaster/adduser`,
            type: "POST",
            // async: false,
            data: JSON.stringify({
              username,
              password,
              first_name,
              last_name,
              address_number,
              email,
              assignstore,
              assignroles,
              assigncompany: [{ unitName }],
              gate_id,
              mobileNumber
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            success: function (data, status, xhr) {

              console.log(data.data);

              if(xhr.status == 200)
              {
                data.data.password = password;
  
                //  $.addUserSendEmail(data.data, "Add User");

                //  setTimeout(() => {
                  swal("", "User Created Successfully", "success").then(() => {
                    window.open("../template/users.jsp", "_self");
                  })
              // }, 500);

              }
              else{

                    $.errorMessage(xhr.responseJSON.message);
              }
             
            },
            complete: () => {

              $("#loader").removeClass("ibox-content")
              $("#loader").removeClass("sk-loading")
              $("#spin").addClass("d-none")

              
            },

            // console.log(xhr.status);
            error: function (xhr, httpStatusMessage, customErrorMessage) {
              if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >= 400 && xhr.status < 500){

                      $.errorMessage(xhr.responseJSON.message);
                      $("form")[0].reset(); // Reset the form fields after error
                }
                else{
                      $.errorMessage(xhr.responseJSON.error)
                      $("form")[0].reset(); // Reset the form fields after error
                }
            }
          });
        } else {
          swal("", "Next Number is not Created", "error").then(() => {
            $("#loader").removeClass("ibox-content")
            $("#loader").removeClass("sk-loading")
            $("#spin").addClass("d-none")
          })
        }
      },
      error: function (xhr) {
        console.log(xhr);
        swal("", xhr.responseJSON.message, "error");
        $("form")[0].reset(); // Reset the form fields after error
      }
    });
  });

  // Retrieve roles using AJAX request
  $.ajax({
    url: `${[test[0].url]}/rolemaster/roles`,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    success: function (data, status, xhr) {
      if(xhr.status == 200)
      {
        data.data.forEach(value => {
          $("#roles").append(`<option value="${value.rolecode}">${value.rolecode}</option>`);
          $("#roles").attr("multiple", ""); // Set the 'multiple' attribute for multi-select
        });
        call(); // Call the 'call' function
      }
      else{

            $.errorMessage(xhr.responseJSON.message);
      }
      
    },
    error: function (xhr) {
      if (xhr.status == 498) {
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
  function call() {
    $("#roles").filterMultiSelect({
      placeholderText: "No Roles Selected",
    });
  }
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
        });
      }
      else{

            $.errorMessage(xhr.responseJSON.message);
      }
     
    },
    error: function (xhr) {
      if (xhr.status == 498) {
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

  let count = 0;

  // Initialize the filterMultiSelect plugin
  $('#unitname').on('change', function () {
    var selectedOption = $(this).val();
    // console.log('Selected Option:', selectedOption);
    var unitName = selectedOption;

      var gateUrl = `${[test[0].url]}/factory/findcompanygate?unit_name=` + encodeURIComponent(unitName);
      var storeUrl = `${[test[0].url]}/factoryStore/findcompanystore?unit_name=` + encodeURIComponent(unitName);
      // var apiUrl = `http://192.168.0.214:8050/factory/findcompanygate?unit_name=` + encodeURIComponent(unitName);
      $.ajax({
        url: gateUrl,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data, status, xhr) {

          if(xhr.status == 200)
          {
            console.log(data);
            $("#gateId").empty();
            data.data.forEach(value => {
              $("#gateId").append(`<option value="${value.final_gate_number}">${value.final_gate_number}</option>`);
            });
          }
          else{

                $.errorMessage(xhr.responseJSON.message);
          }
          
        },
        error: function(xhr){

          if(xhr.status == 498)
          {
              $.tokenError();
          }
          else if(xhr.status >= 400 && xhr.status < 500){

                $.errorMessage(xhr.responseJSON.message);
                $("#gateId").empty();
          }
          else{
                $.errorMessage(xhr.responseJSON.error)
                $("#gateId").empty();
          }
          


        }
      });
      $.ajax({
        url: storeUrl,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data, status, xhr) {

          if(xhr.status ==200)
          {
            console.log(data);
            $("#storeId").empty();
            if(count > 0)
            {
              $("#storeId").remove();
              $("#store_dynamic").append(`<select id="storeId" name="storeId" class="form-control">
                </select>`)
            }
            count++
            data.data.forEach(value => {
              $("#storeId").append(`<option value="${value.storeCode}">${value.storeCode}</option>`);
              $("#storeId").attr("multiple", ""); // Set the 'multiple' attribute for multi-select
            });
            callStoreId(); // Call the 'callStoreId' function
          }
          else{

                $.errorMessage(xhr.responseJSON.message);
          }
         
        },
        error: function(xhr){
          if(xhr.status == 498)
          {
              $.tokenError();
          }
          else if(xhr.status >= 400 && xhr.status < 500){

                $.errorMessage(xhr.responseJSON.message);
                $("#storeId").empty();
          }
          else{
                $.errorMessage(xhr.responseJSON.error)
                $("#storeId").empty();
          }
        }
      });

      
      
    })
  });

  
  function callStoreId() {
      $("#storeId").filterMultiSelect({
        placeholderText: "No Store Id Selected",
      });
  }

  // Handle cancel button click event
  $(".cancel").click((e) => {
    e.preventDefault();
    window.open("../template/users.jsp", "_self");
  });
