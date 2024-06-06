$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"));
  // Retrieve the 'object' from sessionStorage
  var sessionString = sessionStorage.getItem('object');
  var object = JSON.parse(sessionString);

  console.log("object object", object);



  // Call the '[test[0].url]' function from the '$' object
  var test = $.test();

  // Make an AJAX request to retrieve roles
  $.ajax({
    url: `${[test[0].url]}/rolemaster/roles`,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    success: function (data, status, xhr) {
      if (xhr.status == 200) {
        data.data.map(value => {
          $("#roles").append(`<option value="${value.rolecode}">${value.rolecode}</option>`)
          $("#roles").attr("multiple", "")
        });

        // Call the 'call' function after appending options
        call()
      }
      else {

        $.errorMessage(xhr.responseJSON.message);
      }

      // Append options to the 'roles' select element
    },
    error: function (xhr) {
      if (xhr.status == 498) {
        $.tokenError();
      }
      else if (xhr.status >= 400 && xhr.status < 500) {

        $.errorMessage(xhr.responseJSON.message);
      }
      else {
        $.errorMessage(xhr.responseJSON.error)
      }
    }
  });

  // Function to handle role selection
  function call() {
    // Filter the selected roles from the 'roles' select element
    var role = $("#roles").filterMultiSelect({
      placeholderText: "NO Roles Selected"
    });

    // Select the roles specified in the 'object.assignroles'
    for (let obj of object.assignroles) {
      console.log("obj.rolecode", obj.rolecode);
      role.selectOption(obj.rolecode);
    }
  }

  $.ajax({
    url: `${[test[0].url]}/companymaster/companies`,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    success: function (data, status, xhr) {

      if (xhr.status == 200) {
        data.data.forEach(value => {
          $("#unitname").append(`<option value="${value.unit_name}">${value.unit_name}</option>`);
          // $("#unitname").attr("multiple", ""); // Set the 'multiple' attribute for multi-select
        });
      }
      else {
        $.errorMessage(xhr.responseJSON.message);
      }

    },
    error: function (xhr) {
      if (xhr.status == 498) {
        $.tokenError();
      }
      else if (xhr.status >= 400 && xhr.status < 500) {

        $.errorMessage(xhr.responseJSON.message);
      }
      else {
        $.errorMessage(xhr.responseJSON.error)
      }
    },
    complete: () => {
      $("#unitname").val(`${object.assigncompany[0].unitName}`)
    }
  });

  function populateGateOptions() {
    var selectedOption = $('#unitname').val() || object.assigncompany[0].unitName;
    // console.log('Selected Option:', selectedOption);
    var unitName = selectedOption;
    var apiUrl = `${[test[0].url]}/factory/findcompanygate?unit_name=` + encodeURIComponent(unitName);
    var storeUrl = `${[test[0].url]}/factoryStore/findcompanystore?unit_name=` + encodeURIComponent(unitName);
    $.ajax({
      url: apiUrl,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      success: function (data, status, xhr) {

        if (xhr.status == 200) {
          $("#gateId").empty();
          data.data.forEach(function (value) {
            $("#gateId").append(`<option value="${value.final_gate_number}">${value.final_gate_number}</option>`);
          });
        }
        else {

          $.errorMessage(xhr.responseJSON.message);
        }
      },
      complete: function () {
        $("#gateId").val(object.gate_id);
      },
      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        }
        else if (xhr.status >= 400 && xhr.status < 500) {

          $.errorMessage(xhr.responseJSON.message);
          $("#gateId").empty();
        }
        else {
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

        if (xhr.status == 200) {
          console.log(data);
          $("#storeId").empty();
          if (count > 0) {
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
        else {

          $.errorMessage(xhr.responseJSON.message);
        }

      },
      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        }
        else if (xhr.status >= 400 && xhr.status < 500) {

          $.errorMessage(xhr.responseJSON.message);
          $("#storeId").empty();
        }
        else {
          $.errorMessage(xhr.responseJSON.error)
          $("#storeId").empty();
        }
      }
    });
  }

  // Function to handle role selection
  function callStoreId() {
    // Filter the selected roles from the 'roles' select element
    var store = $("#storeId").filterMultiSelect({
      placeholderText: "NO Store Id Selected"
    });

    // Select the roles specified in the 'object.assignroles'
    for (let obj of object.assignstore) {

      store.selectOption(obj.storeCode);
    }
  }

  // Call the function on page load
  populateGateOptions();

  // Attach the event listener for changes
  $('#unitname').on('change', populateGateOptions);

  // Handle cancel button click
  $(".cancel").click(() => {
    // Open users page
    window.open("../template/users.jsp", "_self");
  });


  // Function to set input field values based on 'object' properties
  var setInputValue = (input, property) => $(input).val(object[property]);

  // Set input values using 'setInputValue' function
  setInputValue("#input-text3", "first_name");
  setInputValue("#input-text4", "last_name");
  setInputValue("#input-text5", "display_name");
  setInputValue("#input-text6", "address_number");
  setInputValue("#form6Example8", "business_unit");
  setInputValue("#input-text9", "company_code");
  setInputValue("#mobile_number", "mobileNumber");

  // Set text values based on 'object' properties
  $("#input-text11").text(`${object.first_name}`);
  $("#input-text12").text(object.username);
  $("#input-text13").text(object.email);

  // Handle form submission
  $("#form1").submit((e) => {

    $("#loader").addClass("ibox-content")
    $("#loader").addClass("sk-loading")
    $("#spin").removeClass("d-none")

    e.preventDefault();

    var assignroles = [];
    var assignstore = [];

    // Extract assigned roles from displayed items
    var assignroles = $("#roles .item").map((index, value) => ({ rolecode: value.innerText.split("\n")[0] })).get();
    // console.log(assignroles);
    var assigncompany = $("#unitname .item").map((index, value) => ({ unitName: value.innerText.split("\n")[0] })).get();

    var assignstore = $("#storeId .item").map((index, value) => ({ storeCode: value.innerText.split("\n")[0] })).get();

    var unitName = $('#unitname').val();
    console.log([{ unitName }]);

    var gate_id = $("#gateId").val();
    console.log(gate_id);

    // Make an AJAX request to update user
    $.ajax({
      type: "PUT",
      url: `${[test[0].url]}/usermaster/updateuser?id=${object.userid}`,
      data: JSON.stringify({
        "userid": object.userid,
        "username": object.username,
        "first_name": $("#input-text3").val(),
        "last_name": $("#input-text4").val(),
        // "display_name": $("#input-text5").val(),
        "address_number": $("#input-text6").val(),
        "email": object.email,
        // "business_unit": $("#form6Example8").val(),
        // "company_code": $("#input-text9").val(),
        "assignstore": assignstore,
        "assignroles": assignroles,
        "assigncompany": [{ unitName }],
        "gate_id": gate_id,
        "mobileNumber":$("#mobile_number").val()
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      success: function (data, status, xhr) {

        if (xhr.status == 200) {
          console.log(data.data);
          $("#loader").removeClass("ibox-content")
          $("#loader").removeClass("sk-loading")
          $("#spin").addClass("d-none")
          // Display success message using SweetAlert library
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false
          });

          swalWithBootstrapButtons.fire({
            title: 'User updated',
            icon: 'success',
            confirmButtonText: 'OK',
            reverseButtons: true
          }).then((result) => {
            // Open users page after successful update
            // console.log(data);
            window.open("../template/users.jsp", "_self");
          });
        }
        else {
          $("#loader").removeClass("ibox-content")
          $("#loader").removeClass("sk-loading")
          $("#spin").addClass("d-none")
          $.errorMessage(xhr.responseJSON.message);
        }

      },
      error: function (xhr) {
        $("#loader").removeClass("ibox-content")
        $("#loader").removeClass("sk-loading")
        $("#spin").addClass("d-none")
        if (xhr.status == 498) {
          $.tokenError();
        }
        else if (xhr.status >= 400 && xhr.status < 500) {

          $.errorMessage(xhr.responseJSON.message);
        }
        else {
          $.errorMessage(xhr.responseJSON.error)
        }
      }
    });
  });

  // Handle cancel button click
  $(".cancel").click(() => {
    // Open users page
    window.open("../template/users.jsp", "_self");
  });

  // Get references to the tab links
  var tab1 = $(".nav-link")[0];
  var tab2 = $(".nav-link")[1];
  var tab3 = $(".nav-link")[2];

  // Handle next button click
  $(".nextt").click(() => {
    next();
  });

  // Handle previous button click
  $(".prev").click(() => {
    prev();
  });

  // Handle last button click
  $(".last").click(() => {
    lpage();
  });

  // Function to navigate to the next tab
  function next() {
    $(tab2).trigger("click");
  }

  // Function to navigate to the previous tab
  function prev() {
    $(tab1).trigger("click");
  }

  // Function to navigate to the last tab
  function lpage() {
    $(tab3).trigger("click");
  }

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




  $("#Change_password").click(() => {
    // alert("dfghj")
    // $("#exampleModalCenter1").show();
    $('#exampleModalCenter1').modal('show');
    $(".reveal").on('click', function () {
      var $pwd = $(".pwd");
      if ($pwd.attr('type') === 'password') {
        // alert("hi")
        $pwd.attr('type', 'text');
        $('#show i').removeClass("fa-eye-slash");
        $('#show i').addClass("fa-eye");
      } else {
        $pwd.attr('type', 'password');

        $('#show i').addClass("fa-eye-slash");
        $('#show i').removeClass("fa-eye");
      }
    });
    $(".reveal1").on('click', function () {
      var $pwd1 = $(".pwd1");
      if ($pwd1.attr('type') === 'password') {
        // alert("hi")
        $pwd1.attr('type', 'text');
        $('#show1 i').removeClass("fa-eye-slash");
        $('#show1 i').addClass("fa-eye");
      } else {
        $pwd1.attr('type', 'password');

        $('#show1 i').addClass("fa-eye-slash");
        $('#show1 i').removeClass("fa-eye");
      }
    });
  })

  // console.log("username",username);

  $("#savePassword").click(() => {
    validatePasswords()
  })

  function validatePasswords() {
    // $("#loader").addClass("ibox-content")
    // $("#loader").addClass("sk-loading")
    // $("#spin").removeClass("d-none")
    var password = document.getElementById('pass1').value;
    var confirmPassword = document.getElementById('pass2').value;
    var errorText = document.getElementById('errorText');

    //   Check if both passwords match
    if (password == "" && confirmPassword == "") {
      errorText.innerText = "Fields are required"
      errorText.style.color = "red"
      setBorderColors();
      return false;
    }


    if (password === confirmPassword) {
      errorText.innerText = "Password Matched!";
      errorText.style.color = "green";

      // Set success message color
      resetBorderColors(); // Reset border colors (in case they were previously showing an error)

      $("#modal_close").trigger("click")

      console.log(token);
      $.ajax({
        url: `${[test[0].url]}/usermaster/updateuser?username=${object.username}&password=${password}`,
        type: `PUT`,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data, status, xhr) {

          if (xhr.status == 200) {
            $("#loader").removeClass("ibox-content")
            $("#loader").removeClass("sk-loading")
            $("#spin").addClass("d-none")
            data.data.password = password;

            // $.addUserSendEmail(data.data, "Change Password");

            // setTimeout(() => {
              swal("", "Successfully Updated", "success").then(() => {
                window.open("../template/users.jsp", "_self");
              })
            // }, 500);
          } else {
            $("#loader").removeClass("ibox-content")
            $("#loader").removeClass("sk-loading")
            $("#spin").addClass("d-none")
            $.errorMessage(xhr.responseJSON.message);
          }


        },
        error: function (xhr) {
          $("#loader").removeClass("ibox-content")
          $("#loader").removeClass("sk-loading")
          $("#spin").addClass("d-none")
          if (xhr.status == 498) {
            $.tokenError();
          }
          else if (xhr.status >= 400 && xhr.status < 500) {

            $.errorMessage(xhr.responseJSON.message);
          }
          else {
            $.errorMessage(xhr.responseJSON.error)
          }
        }
      })


    } else {
      errorText.innerText = "Password Not Matched!";
      errorText.style.color = "red"; // Set error message color
      setBorderColors(); // Set border colors to indicate error
    }
  }

  function setBorderColors() {
    $("#pass1, #pass2").css("border-color", "red");
  }

  function resetBorderColors() {
    $("#pass1, #pass2").css("border-color", "green");
  }



  $("#exampleModalCenter1").on('hide.bs.modal', function () {
    $("#pass1, #pass2").css("border-color", "#e5e6e7");
    $("#pass1, #pass2").val("")
    $("#errorText").html("")
  });
});
