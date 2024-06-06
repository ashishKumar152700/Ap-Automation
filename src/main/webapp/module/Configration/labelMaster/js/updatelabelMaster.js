

$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);

    console.log(object);


// $("#grn_column").filterMultiSelect({
//     placeholderText: "",
//   });



var test = $.test()
    let col;


    function getGRNColumn(table){
        
        $.ajax({
            url: `${[test[0].url]}/columnNames?table=GATE_ENTRY_${table}`,
            headers: {
                'Authorization': 'Bearer ' + token,
              },
              async:false,
            success: function (data, status, xhr) {
                if(xhr.status == 200)
                {
                    console.log(data);
                    data.map(value => {
                      console.log(value);
                      $("#grn_column").append(`<option value="${value}">${value}</option>`)
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
          
            complete: () => {

                try{

                
                    $("#input-text1").val(object.id);
                    $("#input-text2").val(object.label_name);
                    $("#input-text3").prop('checked' ,object.label_required);
                    $("#form6Example8").val(object.tag.label); 
                    $("#label_type").val(object.label_type) 
    
    
                    
                    $("#grn_column").val(object.grn_column);
                    // $("#grn_column").val(object.grn_column)
            
            
                  
                }
                catch(error){
                    console.log(error);
                }


                // $("#grn_column").filterMultiSelect({
                //     placeholderText: "",
                //   });
            
            }
          })
    }

    getGRNColumn(object.label_type)



    $("#label_type").change(function () {
        if ($("#label_type").val()=="Header") {
            $("#grn_column").removeAttr("disabled")
            $("#grn_column").empty();
            getGRNColumn("HDR")
            
        }else if($("#label_type").val()=="Details"){
            $("#grn_column").removeAttr("disabled")
            $("#grn_column").empty();
            getGRNColumn("DTL")
            
        }else if($("#label_type").val()=="LH"){
            $("#grn_column").empty();
            $("#parentid").val(null);
            $("#grn_column").attr("disabled","disabled");

        }
        
      });







    // $.ajax({
    //     url: `${[test[0].url]}/gate/gatehdrcolumn`,
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //       },
    //     success: function (data, status, xhr) {
    //       if(xhr.status == 200)
    //       {
    //           data.map(value => {
           
    //             $("#grn_column").append(`<option value="${value}">${value}</option>`)
    //           })
    //       }
    //       else{

    //         $.errorMessage(xhr.responseJSON.message);
    //     }
       
    //     },
    //     error: function (xhr) {
    //         if(xhr.status == 498)
    //         {
    //             $.tokenError();
    //         }
    //         else if(xhr.status >= 400 && xhr.status < 500){

    //                 $.errorMessage(xhr.responseJSON.message);
    //         }
    //         else{
    //                 $.errorMessage(xhr.responseJSON.error)
    //         }
    //     },
        
      
    //     complete: () => {
    //         col = $("#grn_column").filterMultiSelect({
    //             placeholderText: "",
    //           });
        
    //           try{

                
    //             $("#input-text1").val(object.id);
    //             $("#input-text2").val(object.label_name);
    //             $("#input-text3").prop('checked' ,object.label_required);
    //             $("#form6Example8").val(object.tag.label); 
    //             $("#label_type").val(object.label_type) 


                
    //             col.selectOption(object.grn_column);
    //             // $("#grn_column").val(object.grn_column)
        
        
              
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
    //   })


   

    $("#form1").submit((e) => {

        var elementValue;
        e.preventDefault();
        let checkboxValue;
            elementValue= $("#input-text3")[0].checked
            console.log(elementValue);

        var grn_columns = $("#grn_column .item").map((index, value) => value.innerText.split("\n")[0]).get();
     
        let grn_column = grn_columns[0]
   
        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/label/update/${object.id}`,

            data: JSON.stringify({
                // id: object.id,
                labelId: $("#input-text1").val(),
                label_name: $("#input-text2").val(),
                label_required: elementValue,
                grn_column : grn_column,
                tag: {id : $.id ? $.id : object.tag.id},
                label_type : $("#label_type").val()

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,

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
                        title: 'Label updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {
    
                        window.open("../template/label.jsp", "_self")
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
                    $("form")[0].reset();
                }
                else{
                    $.errorMessage(xhr.responseJSON.error)
                    $("form")[0].reset();
                }
            },
        });
    });

    
    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Dtable').DataTable().column(1).search(

                $('#col' + 1 + '_filter').val(),

                $('#col' + 1 + '_smart').prop('checked')

            ).draw();

        }

    });
  
    $(".cancel").click(() => {
        window.open("../template/label.jsp", "_self")
    })

})

