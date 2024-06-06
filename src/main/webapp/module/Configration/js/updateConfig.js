

$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"));

  var sessionString = sessionStorage.getItem('object');
  var object = JSON.parse(sessionString);
  console.log(object);

  var test = $.test()


  var jdeUrl = $("#jdeUrl").val(object.url);
  $("#jdeUser").val(object.username);
  var jdePassword = $("#jdePassword").val(object.password);
  // var urlactive = $("#urlactive").prop('checked' ,object.url_active);

  let elementValue = object.url_active
  $("#urlactive").prop('checked', elementValue);

  $("#urlactive").change(function () {
    elementValue = $("#urlactive")[0].checked
    console.log(elementValue)
  })
 
  var jdeType = $("#jdeType").filterMultiSelect({
    placeholderText: "No Env Selected",
  });

  jdeType.selectOption(object.env)

  var jdeEnv = $("#jdeEnv").filterMultiSelect({
    placeholderText: "No Type Selected",
  });

  jdeEnv.selectOption(object.type)


  var arr1;
  var arr2;
  $("#form").submit((e) => {

    var items = $("#jdeType .item")

    items.map((index, value) => {

      arr1 = value.innerText.split("\n")[0];
    })

    var items1 = $("#jdeEnv .item")

    items1.map((index, value) => {

      arr2 = value.innerText.split("\n")[0];
    })

    console.log("type..", arr1);
    console.log("Env .. ", arr2);


    // let checkboxValue;
    // elementValue= $("#urlactive")[0].checked
    // console.log(elementValue);
    e.preventDefault();

    $.ajax({
      type: "PUT",
      url: `${[test[0].url]}/configmaster/updateconfig/${object.id}`,
      dataSrc: "",
      data: JSON.stringify({

        "url": $("#jdeUrl").val(),
        username: $("#jdeUser").val(),
        "password": jdePassword[0].value,
        "url_active": elementValue,
        "env": arr1,
        "type": arr2

        //  "env": arr[0],
        //  "type": arr[1],

      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      success: function (data, status, xhr) {
        
        if(xhr.status == 200)
        {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            title: 'Config updated',
            icon: 'success',
            confirmButtonText: 'OK',
            reverseButtons: true
          }).then((result) => {
  
            window.open("../template/config.jsp", "_self");
  
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
    })
  });



  $("#cancel").click(() => {
    window.open("../template/config.jsp", "_self");
  })
})