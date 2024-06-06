$(document).ready(() => {
  var eaEmailArr = []
  var hodEmailArr = []
  let ea_tab, hod_tab, ea_filter, hod_filter;

  ea_filter = $("#eaemail").filterMultiSelect()

  $('#addemail').on('click', function () {
    let ea_values = ea_filter.getSelectedOptionsAsJson(includeDisabled=true);

    if(JSON.parse(ea_values).eaemail.length != 0 )
    {
      eaEmailArr = []

      ea_tab.destroy();

      $("#ea_tbody").empty();

      JSON.parse(ea_values).eaemail.map((value)=>{

        eaEmailArr.push({
          'email': value,
          'emailType': "EA_email"
        })

        $("#ea_tbody").append(`<tr><td>${value}</td><td>EA_email</td></tr>`)
      })


      ea_tab = $("#Datable").DataTable({
        language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      });

    }

    else{

      eaEmailArr = []

      ea_tab.destroy();

      $("#ea_tbody").empty();

      JSON.parse(ea_values).eaemail.map((value)=>{

        eaEmailArr.push({
          'email': value,
          'emailType': "EA_email"
        })

        $("#ea_tbody").append(`<tr><td>${value}</td><td>EA_email</td></tr>`)
      })


      ea_tab = $("#Datable").DataTable({
        language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      });

    }
    $('#myModal5').modal('show');
  });

  $('#button-addon1').on('click', function () {

    let emailVal = $('#eaemail2').val();

    if (emailVal !== "") {
      let emailType = "EA_email"

      eaEmailArr.push({
        'email': emailVal,
        'emailType': emailType
      })

      ea_tab.destroy();

      $("#ea_tbody").append(`<tr><td>${emailVal}</td><td>${emailType}</td></tr>`)

      ea_tab = $("#Datable").DataTable({
        language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      });

      $("#eaemail2").val("")
      
    }
  });


  $('#selectRecords').on('click', function () {

    let EA_Dropdown = `<label for="eaemail">EA Emails*</label> <br><select id="eaemail" name="eaemail" class="form-control" multiple
    placeholder="EA Email">`

    for (let i = 0; i < eaEmailArr.length; i++) {
      EA_Dropdown += `<option value=${eaEmailArr[i]['email']}>${eaEmailArr[i]['email']}</option>`
    }

    EA_Dropdown += `</select>`

    document.getElementById('eaEmailDropdown').innerHTML = EA_Dropdown

    ea_filter = $("#eaemail").filterMultiSelect()

    ea_filter.selectAll()

  });

  hod_filter = $("#hodemail").filterMultiSelect()

  $('#addemail2').on('click', function () {

    let hod_values = hod_filter.getSelectedOptionsAsJson(includeDisabled=true);
    

    if(JSON.parse(hod_values).hodemail.length != 0 )
    {
      hodEmailArr = []

      hod_tab.destroy();

      $("#hod_tbody").empty();

      JSON.parse(hod_values).hodemail.map((value)=>{

        hodEmailArr.push({
          'email': value,
          'emailType': "HOD_email"
        })

        $("#hod_tbody").append(`<tr><td>${value}</td><td>HOD_email</td></tr>`)
      })


      hod_tab = $("#Datable2").DataTable({
        language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      });

    }
    else{

      hodEmailArr = []

      hod_tab.destroy();

      $("#hod_tbody").empty();

      JSON.parse(hod_values).hodemail.map((value)=>{

        hodEmailArr.push({
          'email': value,
          'emailType': "HOD_email"
        })

        $("#hod_tbody").append(`<tr><td>${value}</td><td>HOD_email</td></tr>`)
      })


      hod_tab = $("#Datable2").DataTable({
        language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      });



    }
    
    $('#myModal6').modal('show');
    // $('#hodemail').val('');
  });

  $('#button-addon2').on('click', function () {

    let emailVal = $('#hodemail2').val();

    if (emailVal !== "") {
      let emailType = "HOD_email"

      hodEmailArr.push({
        'email': emailVal,
        'emailType': emailType
      })

      hod_tab.destroy();

      $("#hod_tbody").append(`<tr><td>${emailVal}</td><td>${emailType}</td></tr>`)

      hod_tab = $("#Datable2").DataTable({
        language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      });

      $("#hodemail2").val("")

    }
  });

  $('#selectRecords2').on('click', function () {

    let HOD_Dropdown = `<label for="hodemail">HOD Emails*</label> <br><select id="hodemail" name="hodemail" class="form-control" multiple
    placeholder="HOD Email">`

    for (let i = 0; i < hodEmailArr.length; i++) {
      HOD_Dropdown += `<option value=${hodEmailArr[i]['email']}>${hodEmailArr[i]['email']}</option>`
    }

    HOD_Dropdown += `</select>`

    document.getElementById('hodEmailDropdown').innerHTML = HOD_Dropdown

    hod_filter = $("#hodemail").filterMultiSelect()

    hod_filter.selectAll()
  });


  $('#ea_email_container').hide();

  $('#ea').change(function () {
    var selectedValue = $("#ea").val();

    if (selectedValue === 'N') {
      $('#ea_email_container').hide();
    }

    else {
      $('#ea_email_container').show();
    }
  });

  $('#hod').change(function () {
    var selectedValue = $("#hod").val();

    if (selectedValue === 'N') {

      $('#hod_field').hide();
      // $("#addemail2").hide();
    }

    else {
      $('#hod_field').show();
      // $("#addemail2").show();
    }
  });

  ea_tab = $("#Datable").DataTable({

    language: {
        
        'paginate': {

        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',

        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'

      }

    },

    dom: '<"top">t<"bottom"ip>',

    ordering: true,

    lengthMenu: [5, 10, 20, 25, 50],
  });

  hod_tab = $("#Datable2").DataTable({

    language: {
      "info": "",
      'paginate': {

        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',

        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'

      }

    },

    dom: '<"top">t<"bottom"ip>',

    ordering: true,

    lengthMenu: [5, 10, 20, 25, 50],

    pagingType: "simple_numbers",
  });


  

  const token = JSON.parse(localStorage.getItem("token"));
  $("form")[0].reset();
  let test = $.test();

 

  $('#form').submit(function (e) {

    e.preventDefault();

    eaEmailArr = []
    hodEmailArr = []

    let ea_values = JSON.parse(ea_filter.getSelectedOptionsAsJson(includeDisabled=true)).eaemail

    let hod_values = JSON.parse(hod_filter.getSelectedOptionsAsJson(includeDisabled=true)).hodemail

    

    ea_values.map((value)=>{
      eaEmailArr.push({email : value , emailType : "EA_email"})
    })
    
    hod_values.map((value)=>{
      hodEmailArr.push({email : value , emailType : "HOD_email"})
    })


    var departmentcode = $("#departmentcode").val()
    var departmentname = $("#departmentname").val()
    var naming = $('#name').val();
    var ea = $("#ea").val();
    var hodname = $("#hodname").val();
    var hod = $("#hod").val();
    var emailArr = eaEmailArr.concat(hodEmailArr)


    console.log("email send : ",emailArr);

    console.log(JSON.stringify({
      departmentName: departmentname,
      departmentCode: departmentcode,
      name: naming,
      e_A: ea,
      hod_name: hodname,
      hod: hod,
      emails: emailArr
    }));


    $.ajax({
      url: `${[test[0].url]}/department/add`,
      type: "POST",
      data: JSON.stringify({
        departmentName: departmentname,
        departmentCode: departmentcode,
        name: naming,
        e_A: ea,
        hod_name: hodname,
        hod: hod,
        emails: emailArr
      }),

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

      success: function (data, status, xhr) {
        console.log(data);


        if (xhr.status == 200) {
          window.open("../template/department.jsp", "_self");
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

  $(".cancel").click((e) => {
    e.preventDefault();
    window.open("../template/department.jsp", "_self");
  })

});