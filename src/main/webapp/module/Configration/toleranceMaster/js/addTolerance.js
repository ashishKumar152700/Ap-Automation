$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

    // $.ajax({
    //     url: `${[test[0].url]}/gate/gatehdrcolumn`,
    //     success: function (data, status, xhr) {
    //       console.log(data);
    //       data.map(value => {
    //         console.log(value);
    //         $("#grn_column").append(`<option value="${value}">${value}</option>`)
    //       })
    //     //   call();
    //       // $('.new_labels').select2();
    //     },
      
    //     complete: () => {
    //         $("#grn_column").filterMultiSelect({
    //             placeholderText: "",
    //           });
        
    //     }
    //   })


    $("form")[0].reset();
    const d = new Date();


   
    $('#form').submit(function (e) {
        e.preventDefault();


        // var label = $("#labelid").val()
        var labelname = $("#labelname").val()
        // var tagname = $("#tagname").val()
        // var tagdescription = $("#tagdescription").val()
        var labeltype = $("#label_type").val()
        // var grn_columns = $("#grn_column .item").map((index, value) => value.innerText.split("\n")[0]).get();


        // var checkbox = $("#labelrequired")[0].checked

        // let grn_column = grn_columns[0]
        // console.log(label,labelname,tagname,tagdescription,grn_column);
        
        // console.log("the grn",grn_column);
        // let value = checkbox ? 1 : 0;
        // var tags = $("#form6Example8").val()

        // console.log(checkbox);

        $.ajax({
            // url: `${[test[0].url]}/label/add`,                                                                                                       
            url: `${[test[0].url]}/tolerance/add`,                                                                                                       
            type: "POST",
            data: JSON.stringify({
                "process": labelname,
                "tolerance": labeltype
              }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            success: function (data, status, xhr) {
                console.log(data)
                console.log(xhr);


                if (xhr.status == 200) {
                    window.open("../template/toleranceMaster.jsp", "_self");
                    $("form")[0].reset();
                }
                else{

                        $.errorMessage(xhr.responseJSON.message);
                        $("form")[0].reset();
                }
                
            },
            

            error: function (xhr, httpStatusMessage, customErrorMessage) {

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
            }
        });

    });



    $(".cancel").click((e) => {
        e.preventDefault();
        window.open("../template/toleranceMaster.jsp", "_self");
    })



    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Dtable').DataTable().column(1).search(

                $('#col' + 1 + '_filter').val(),

                $('#col' + 1 + '_smart').prop('checked')

            ).draw();

        }

    });

});





