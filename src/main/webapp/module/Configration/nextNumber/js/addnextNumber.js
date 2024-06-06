$(document).ready(() => {

  var gate;
  $('#gatetype').change(function () {
    var selectedValue = $("#gatetype").val();

    if (selectedValue === 'asn') {
      $('#gateId').hide();
      $('#gateIDLabel').hide();
    }

    else {
      $('#gateId').show();
      $('#gateIDLabel').hide();

    }
  });

  const token = JSON.parse(localStorage.getItem("token"));
  var test = $.test()
  $("form")[0].reset();
  const d = new Date();

  var currentDate = new Date();
  console.log("Month", currentDate.getMonth() + 1)

  var startYear = currentDate.getMonth() + 1 <= 3 ? ((currentDate.getFullYear() - 1) % 100) : (currentDate.getFullYear() % 100);
  console.log(" start year ", startYear);
  var endYear = currentDate.getMonth() + 1 <= 3 ? (startYear) % 100 : (startYear) % 100;
  console.log("years ", endYear)


  document.getElementById("year").value = endYear
  $('#form').submit(function (e) {
    e.preventDefault();


    var company = $("#form6Example10").val()
    var mcu = $("#form6Example8").val()
    var process = $("#process").val()
    var year = $("#year").val()
    var length1 = $("#length").val()
    var gateid = $("#gateId").val()
    var unitName = $('#unitname').val();
    var gatetype = $('#gatetype').val();
 
    if($('#gatetype').val()== "gate"){
      gate=$("#gateId").val()
    }else{
      gate="ASN"
    }
  
 
  
    $.ajax({
      url: `${[test[0].url]}/gate/number`,
      type: "POST",
      data: JSON.stringify({
        company: company,
        mcu: mcu,
        process: process,
        year: year,
        length: length1,
        gateId: gate,

      }),

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      success: function (data, status, xhr) {

        if (xhr.status == 200) {
          window.open("../template/nextNumber.jsp", "_self");
          $("form")[0].reset();
        }
        else {

          $.errorMessage(xhr.responseJSON.message);
        }

      },

      error: function (xhr, httpStatusMessage, customErrorMessage) {


        if (xhr.status == 498) {
          $.tokenError();
        }
        else if (xhr.status >= 400 && xhr.status < 500) {

          $.errorMessage(xhr.responseJSON.message);
          $("form")[0].reset();
        }
        else {
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
      if (xhr.status == 200) {
        data.data.forEach(value => {
          $("#unitname").append(`<option value="${value.unit_name}">${value.unit_name}</option>`);
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
    }
  });

  $('#unitname').on('change', function () {
    var selectedOption = $(this).val();
    console.log('Selected Option:', selectedOption);
    var unitName = selectedOption;
    var apiUrl = `${[test[0].url]}/factory/findcompanygate?unit_name=` + encodeURIComponent(unitName);
    // var apiUrl = `${[test[0].url]}/factory/findcompanygate?unit_name=` + encodeURIComponent(unitName);
    // var apiUrl = `http://192.168.0.214:8050/factory/findcompanygate?unit_name=` + encodeURIComponent(unitName);
    $.ajax({
      url: apiUrl,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      success: function (data, status, xhr) {

        if (xhr.status == 200) {
          $("#gateId").empty();
          data.data.forEach(value => {
            $("#gateId").append(`<option value="${value.final_gate_number}">${value.final_gate_number}</option>`);
          });
        }
        else {
          $.errorMessage(xhr.responseJSON.message);
          $("#gateId").empty();
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
        $("#gateId").empty();
      }
    });
  });

  $(".cancel").click((e) => {
    e.preventDefault();
    window.open("../template/nextNumber.jsp", "_self");
  })

});
