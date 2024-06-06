
$(document).ready(()=>{
  const token = JSON.parse(localStorage.getItem("token"));

  var test = $.test()
    let sessionString = sessionStorage.getItem("menuObject");

    let roleName = JSON.parse(sessionString);

    console.log(roleName.id);

    $("#menus").val(roleName.name)

    
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
    
      function call(){
        var role = $("#roleCode").filterMultiSelect();

        for(let obj of roleName.assignroles)
        {
          role.selectOption(obj.rolecode);
        }

      }



      $("#formMenu").submit((e)=>{

          e.preventDefault();

          var assignroles = [];

            var span = $(".item");

            span.map((index, value) => {
            rolecode = value.innerText.split("\n")[0];
            assignroles.push({ rolecode })
            });

            console.log(assignroles);

          
               $.ajax({
               type: "PUT",
               url: `${[test[0].url]}/menumaster/updatemenu/${roleName.id}`,
               dataSrc:"",
               data: JSON.stringify({
                 assignroles : assignroles,
               }),
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+ token,
               },
               success: function(data,status,xhr) {
                if(xhr.status == 200)
                {
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

