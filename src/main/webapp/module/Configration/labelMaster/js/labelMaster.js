$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

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
                // $("#grn_column").filterMultiSelect({
                //     placeholderText: "",
                //   });
            
            }
          })
    }
    getGRNColumn("HDR")


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


    $("form")[0].reset();
    const d = new Date();


   
    $('#form').submit(function (e) {
        e.preventDefault();


        // var label = $("#labelid").val()
        var labelname = $("#labelname").val()
        var tagname = $("#tagname").val()
        var tagdescription = $("#tagdescription").val()
        var labeltype = $("#label_type").val()
        var sequence = $("#sequence").val()
        // var grn_columns = $("#grn_column .item").map((index, value) => value.innerText.split("\n")[0]).get();
        var grn_columns = $("#grn_column").val()



        var checkbox = $("#labelrequired")[0].checked

        // console.log(label,labelname,tagname,tagdescription,grn_column);
        
        console.log("the grn",grn_columns);
        // let value = checkbox ? 1 : 0;
        // var tags = $("#form6Example8").val()

        console.log(checkbox);

        $.ajax({
            url: `${[test[0].url]}/label/add`,                                                                                                       
            type: "POST",
            data: JSON.stringify({

                // labelId: label,
                label_name: labelname,
                label_required: checkbox,
                grn_column : grn_columns,
                label_type: labeltype,
                sequence:sequence,
                tag: {label: tagname,
                    description: tagdescription,
                    code:0},

              

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },

            success: function (data, status, xhr) {
              
                if (xhr.status == 200) {
                    window.open("../template/label.jsp", "_self");
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
        window.open("../template/label.jsp", "_self");
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





