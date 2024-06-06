$(document).ready(() => {

    
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

    var sessionString = sessionStorage.getItem('objectdata');
    var object = JSON.parse(sessionString);
    console.log("obejct", object)
    // console.log(object[0].emails)

    $("#input-text1").val(object[0].departmentCode);
    $("#input-text2").val(object[0].name);
    $("#input-text3").val(object[0].departmentName);
    $("#input-text4").val(object[0].hod_name);


    $("#ea").val(object[0].e_A);
    $("#hod").val(object[0].hod);

    let ea_filter , hod_filter;

    var ea_email_visibility = () => {

        let ea = $("#ea").val();

        if (ea === 'N') {
            $('#ea_email_container').hide();
        }

        else {
            $('#ea_email_container').show();
        }

    }

    var hod_email_visibility = () => {

        let hod = $("#hod").val();
        
        if (hod === 'N') {
            $('#hod_email_container').hide();
        }

        else {
            $('#hod_email_container').show();
        }

    }

    ea_email_visibility();
    hod_email_visibility();

    $("#ea").change(function () {
        ea_email_visibility();
    })

    $("#hod").change(function () {
        hod_email_visibility();
    })

    var allEmails = object[0].emails

    var eaEmailArr = []
    var hodEmailArr = []

    var fillEmailsArray = () => {
        for (let i = 0; i < allEmails.length; i++) {
            if (allEmails[i]['emailType'] == "EA_email") {
                eaEmailArr.push(allEmails[i]);
            }

            else {
                hodEmailArr.push(allEmails[i]);
            }
        }
    }

    fillEmailsArray();

    var fill_ea_Dropdown = () => {

        let EA_Dropdown = `<label for="eaemail">EA Emails*</label> <br> <select id="eaemail" name="eaemail" class="form-control" multiple
        placeholder="EA Email">`

        for (let i = 0; i < eaEmailArr.length; i++) {
            EA_Dropdown += `<option value=${eaEmailArr[i]['email']}>${eaEmailArr[i]['email']}</option>`
        }

        EA_Dropdown += `</select>`

        document.getElementById('eaEmailDropdown').innerHTML = EA_Dropdown

        ea_filter = $("#eaemail").filterMultiSelect()

        ea_filter.selectAll()
    }

    fill_ea_Dropdown()

    var fill_ea_Modal = () => {

        for (let i = 0; i < eaEmailArr.length; i++) {
            $("#ea_tbody").append(`<tr><td>${eaEmailArr[i]['email']}</td><td>${eaEmailArr[i]['emailType']}</td></tr>`)
        }

    }

    fill_ea_Modal()

    var fill_hod_Dropdown = () => {

        let HOD_Dropdown = `<label for="hodemail">HOD Emails*</label> <br><select id="hodemail" name="hodemail" class="form-control" multiple
    placeholder="HOD Email">`

        for (let i = 0; i < hodEmailArr.length; i++) {
            HOD_Dropdown += `<option value=${hodEmailArr[i]['email']}>${hodEmailArr[i]['email']}</option>`
        }

        HOD_Dropdown += `</select>`

        document.getElementById('hodEmailDropdown').innerHTML = HOD_Dropdown

        hod_filter = $("#hodemail").filterMultiSelect()

        hod_filter.selectAll()
    }

    fill_hod_Dropdown()

    var fill_hod_Modal = () => {

        for (let i = 0; i < hodEmailArr.length; i++) {
            $("#hod_tbody").append(`<tr><td>${hodEmailArr[i]['email']}</td><td>${hodEmailArr[i]['emailType']}</td></tr>`)
        }

    }

    fill_hod_Modal()

    $('#addemail').on('click', function () {
    
    let ea_values = ea_filter.getSelectedOptionsAsJson(includeDisabled=true);

    if(JSON.parse(ea_values).eaemail.length != 0 )
    {
      eaEmailArr = []

      try {
          ea_tab.destroy();
      } catch (error) {
        
      }

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

            try {
                ea_tab.destroy();
            } catch (error) {
                
            }

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
        fill_ea_Dropdown();
    });

    $('#addemail2').on('click', function () {

    let hod_values = hod_filter.getSelectedOptionsAsJson(includeDisabled=true);
    

    if(JSON.parse(hod_values).hodemail.length != 0 )
    {
      hodEmailArr = []

      try {
          hod_tab.destroy();
      } catch (error) {
        
      }

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
        fill_hod_Dropdown()
    });


   

    $("#form").submit((e) => {
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


        var emailArr = eaEmailArr.concat(hodEmailArr)

        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/department/update?id=${object[0].id}`,

            data: JSON.stringify({
                departmentCode: $("#input-text1").val(),
                departmentName: $("#input-text3").val(),
                e_A: $("#ea").val(),
                hod_name: $("#input-text4").val(),
                hod: $("#hod").val(),
                name: $("#input-text2").val(),
                emails: emailArr
            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,

            },
            success: function (data, status, xhr) {
                console.log(data);

                if (xhr.status == 200) {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false
                    })


                    swalWithBootstrapButtons.fire({
                        title: 'Department  updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {

                        window.open("../template/department.jsp", "_self")
                    })
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
        });
    });



    $(".cancel").click(() => {
        window.open("../template/department.jsp", "_self")
    })

})

