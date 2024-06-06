
$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"));
    
    var test = $.test()
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);
    console.log(object);
    

    $("#store_code").val(object[0].storeCode);
    $("#store_name").val(object[0].store_name);
    

    var type= $("#type").filterMultiSelect({
        placeholderText: "No Gate Type Selected",
      });
    
     type.selectOption(object[0].gate_type)



    // var unitname = $("#unitname").filterMultiSelect();
    // unitname.selectOption(object[0].unit_name)

      var arr1;
      var arr2;
    $("#form").submit((e) => {

        var items = $("#unitname .item")
            
        items.map((index,value)=>{

          arr1 = value.innerText.split("\n")[0];
        })

        var items1 = $("#type .item")

        items1.map((index, value) => {
    
          arr2 = value.innerText.split("\n")[0];
        })
    
       
        e.preventDefault();
       
        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/factoryStore/update/${object[0].id}`,
            data: JSON.stringify({
                id: object.id,
                storeCode: $("#store_code").val(),
                store_name: $("#store_name").val(),

                "unit_name": arr1,


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
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false
                })
            
                
                swalWithBootstrapButtons.fire({
                    title: 'Factory Store updated',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then((result) => {
        
                    window.open("../template/factory.jsp", "_self")
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
      let unit_name = $("#unitname").filterMultiSelect({
          placeholderText: "No Unit Name Selected",
        });
    
        unit_name.selectOption(object[0].unit_name)

        // for (let obj of object.assigncompany) {
        //   unit_name.selectOption(obj.unitName);
        // }
      }

   

   

    $(".cancel").click(() => {
        window.open("../template/factory.jsp", "_self")
    })

})

