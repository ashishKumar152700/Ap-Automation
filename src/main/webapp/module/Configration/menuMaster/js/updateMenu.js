
$(document).ready(()=>{
  var test = $.test();


    const token = JSON.parse(localStorage.getItem("token"));

  let all_menus = []

  $.ajax({
    // url: `${[test[0].url]}/menumaster/menus`,
    url: `${[test[0].url]}/menugetmaster/menu`,
    headers : {
      "Authorization" : `Bearer ${token}`
    },
    success: function (data, status, xhr) {
      if(xhr.status == 200)
      {
        // parentData = data.data;
        parentData = JSON.parse(data.data[0].menu_data);
        console.log(data);

        let menu_data = JSON.parse(data.data[0].menu_data)
        menu_data.forEach((value) => {
          
          $("#parentid").append(
            `<option value="${value.id}">${value.name}</option>`
            );
          });
      }
      else{

        $.errorMessage(xhr.responseJSON.message);
      }
      
      // call(); // Call the 'call' function
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

  $("#menu_type").change(function () {
    if ($("#menu_type").val()=="Parent") {

      $("#icon").removeAttr("readonly")
      
      let menuorder = Math.max(...all_menus);
      $("#parentid").attr("disabled","disabled");
      $("#parentid").val("0");
      $("#sorting").attr("value",menuorder+1)
      $("#sorting").attr("readonly","readonly")

      $("#link").attr("readonly","readonly")
      $("#link").attr("value","")
      $("#link").attr("placeholder","")
      
    }else if($("#menu_type").val()=="Child"){
      $("#parentid").removeAttr("disabled")
      $("#sorting").attr("value","")
      $("#link").removeAttr("readonly")
      
      $("#icon").attr("readonly","readonly")
      $("#icon").attr("value","")
      $("#icon").attr("placeholder","")
      $("#sorting").attr("value","")
      $("#sorting").attr("readonly","readonly")
      $("#sorting").attr("placeholder","")
    }else if($("#menu_type").val()=="PC"){
      $("#link").removeAttr("readonly")
      $("#icon").removeAttr("readonly")

      let menuorder = Math.max(...all_menus);
      $("#parentid").attr("disabled","disabled");
      $("#sorting").attr("value",menuorder+1)
      $("#sorting").attr("readonly","readonly")
    }
    
  });
  

  
  
    function call(){
      var role = $("#roleCode").filterMultiSelect();
      for(let obj of roleName.assignroles)
      {
        role.selectOption(obj.rolecode);
      }
    }

  let sessionString = sessionStorage.getItem("menuObject");
  
  let roleName = JSON.parse(sessionString);

    console.log(roleName.id);

    $("#menuname").val(roleName.name)
    $("#sorting").val(roleName.sorting)
    $("#link").val(roleName.link)
    $("#icon").val(roleName.icon)

    
      $.ajax({
        url: `${[test[0].url]}/rolemaster/roles`,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data, status, xhr) {
          if(xhr.status == 200)
          {
            data.data.map(value => {
              $("#roleCode").append(`<option value="${value.rolecode}">${value.rolecode}</option>`)
              $("#roleCode").attr("multiple", "")
            })
            call();
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
      })



      $("#formMenu").submit((e)=>{

        $("#loader").addClass("ibox-content")
        $("#loader").addClass("sk-loading")
        $("#spin").removeClass("d-none")

        var test = $.test()
          e.preventDefault();

          var assignroles = [];

            var span = $(".item");

            span.map((index, value) => {
            rolecode = value.innerText.split("\n")[0];
            assignroles.push({ rolecode })
            });

           
            let parentId;

            if ($("#parentid").val() == null) {
              parentId = 0;
            }else{
              parentId = $("#parentid").val();
            }
            let menuname = $("#menuname").val();
            console.log(parentId,menuname)

          
               $.ajax({
               type: "PUT",
               url: `${[test[0].url]}/menumaster/updatemenu/${roleName.id}`,
               dataSrc:"",
               data: JSON.stringify({
                 name: menuname,
                 assignroles : assignroles,
                 parentId: parentId
               }),
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+ token,
               },
               success: function(data,status,xhr) {

                 if(xhr.status == 200)
                 {

                  $("#loader").removeClass("ibox-content")
                  $("#loader").removeClass("sk-loading")
                  $("#spin").addClass("d-none")

                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                          confirmButton: 'btn btn-success',
                      },
                      buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                      title: 'Menu updated',
                      icon: 'success',
                      confirmButtonText: 'OK',
                      reverseButtons: true
                  }).then((result) => {
                      
                    window.open("../template/menu.jsp","_self");
    
                  })
                }
                else{

                  $("#loader").removeClass("ibox-content")
                  $("#loader").removeClass("sk-loading")
                  $("#spin").addClass("d-none")

                  $.errorMessage(xhr.responseJSON.message);
                }
                
            },
               error: function(xhr){

                $("#loader").removeClass("ibox-content")
                $("#loader").removeClass("sk-loading")
                $("#spin").addClass("d-none")
                
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

            $(".cancel").click((e) => {
                e.preventDefault();
                window.open("../template/menu.jsp", "_self");  
            })


      
})

