$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    var login = $.login();
    $(function() {
        $('#model').on('click', function() {
            var x = $('#vendorcode').val();
            var y = $('#name').val();

            var vendorcode = $('#vendorcode option:selected').text();

            var name= $('#name option:selected').text();

            if( x && x.length ) {
                $("#button-addon").filter(function() { 
                    return $(this).text() == text; 
                })
                .prop('disabled', true)
                .end().parent().val('');
            } 
        });

    
    
    });

    $('#add_roww').click(function () {

        // if($(".vendercode")[$(".vendercode").length-1].value != "")
        // {
        let newRow = `<tr>
            <td>
                <div class="input-group">
                    <input type="text" class="form-control input_size vendercode text-right " required=""
                         aria-label="Admin Theme"
                        aria-describedby="button-addon2" id="vendor_code"
                        disabled>
                    <div class="input-group-append">
                        <button type="button" id="model" class="search btn btn-primary"
                            data-toggle="modal" data-target="#myModal5">
                            Select
                        </button>
                    </div>
                </div></td>
              <td><input type="text"  class="form-control input_size names text-right" value="" id="name"></td>
              <td><input type="text"  class="form-control input_size email text-right" id="email"></td>
             
          <td><button type="button" class="btn btn-danger delete-row">Delete</button></td>
        </tr>`;
        $('#table-body').append(newRow);
        // }
    });


    $.fn.DataTable.ext.pager.numbers_length = 5;
    //  $("#form6Example8")[0].value = "";


    $("#model").click(() => {
        $("#col1_filter")[0].value = "";
    })

    var tab;
    var table;


    $.ajax({

        type: 'GET',

        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20E`,

        headers: {

            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)

        },

        success: function (data) {


            var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;
            // console.log(supplier);

            for (let i = 0; i < supplier.length; i++) {
                $("#Supplier_name").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
            }
        },
        error: function (xhr, ajaxOptions, throwError) {
            //Error block
        },
        complete: () => {


            table = $("#Vtable").DataTable({
                language: {
                    'paginate': {
                        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                    }
                },
                dom: '<"top">t<"bottom"ip>',
                ordering: true,
                lengthMenu: [5, 10, 20, 25, 50],
                pagingType: "simple_numbers",
                select: true,
            });
            table.column(2).visible(false);

        }

    })

    let vendercode;
    let name;

    $('#tab_logicc tbody').on('click', '.search', function () {

        vendercode = $(this).parent().parent().children()[0]
        name = $(this).parent().parent().parent().parent().find(".names")[0]
        // console.log($(this).parent().parent().parent().parent().find(".name"));

        $('#Vtable tbody').on('click', 'tr', function () {
            var dataa = table.row(this).data();
            var roww = $(this)[0];

            // console.log($(this));

            // console.log(roww);



            // console.log(roww);
            function searchh(dataa) {
                // console.log($(roww))
                vendercode.value = dataa[0]
                name.value = dataa[1]
                // return dataa[0]
                // $(name).val(dataa[1])

                // $(".vendercode")[$(".vendercode").length -1].value = ; 
                // $("#supplier_gstin").val(dataa[2])
                // $("#name").val(dataa[1]);


                $(roww).removeClass("selected");
            }

            $("#vendor").click(() => {
                searchh(dataa);

            })
        });

        // console.log($(this).parent().parent().parent().parent().parent());


    })


    $("#vendor_search").click(() => {
        $('#Vtable').DataTable().column(0).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    })

    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Vtable').DataTable().column(0).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }

    });


    $(document).on('click', '.delete-row', function () {
        $(this).closest('tr').remove();
    });

    var i = 1;
    // var l=1;
    $("#add_row").click(function () {
        b = i - 1;

        $('#addr' + i).html($('#addr' + b).html())
        // $('#addr'+i).html($('#addr'+b+1).html()).find('.line_num').val(i+1);
        $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
        option_list('addr' + i);
        i++;
    });

    $("#delete_row").click(function () {
        if (i > 1) {
            $("#addr" + (i - 1)).html('');
            i--;
        }
        calc();
    });


    $("form")[0].reset();
    // const d = new Date();
    $('#form').submit(function (e) {
        e.preventDefault();

        var groupName;
        var name;
        var email;
        var supplierNumber;
        var unitName;
        var storeId;
        var requestBody = []




        for (let i = 0; i < $("#tab_logicc tr").length - 1; i++) {
            groupName = $("#groupname").val()
            unitName=$("#unitname").val()
            storeId=$("#storeId").val()
           

            // var span = $(".item");

            // span.map((index, value) => {
            //     groupName = value.innerText.split("\n")[0];
            //     console.log(groupName);
            // })

            email = $(".email")[i].value
            name = $(".names")[i].value
            supplierNumber = $(".vendercode")[i].value

            requestBody.push({ groupName, name, email, supplierNumber,storeId,unitName })
        }

        // console.log(...requestBody);




        for (let j = 0; j < requestBody.length; j++) {
            $.ajax({
                url: `${[test[0].url]}/notificationgroup/add`,
                type: "POST",
                async: false,
                data: JSON.stringify(requestBody[j]),
                groupName:$("#groupname").val,
                unitName:$("#unitname").val,
                storeId:$("#storeId").val,


                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },

                success: function (data, status, xhr) {

                    if(xhr.status == 200)
                    {
                        if (j == requestBody.length - 1) {
                            if (xhr.status == 200) {
                                window.open("../template/group.jsp", "_self");
                                $("form")[0].reset();
                            }
                        }
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

        }

    });



    $.ajax({
        url: `${[test[0].url]}/status/get`,
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success: function (data, status, xhr) {
            if(xhr.status == 200)
            {
                data.data.map(value => {
                    $("#groupname").append(`<option value="${value.label}">${value.label}</option>`)
                    // $("#groupname").attr("multiple", "")
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
        }
    })

    // function call() {

    //     $("#groupname").filterMultiSelect({
    //         placeholderText: "No Group Selected",
    //     });

    // }

    $.ajax({
        url: `${[test[0].url]}/companymaster/companies`,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data, status, xhr) {
            // console.log(data.data);
          data.data.forEach(value => {
            $("#unitname").append(`<option value="${value.unit_name}">${value.unit_name}</option>`);
          });
        },
        error: function (xhr) {
          if (xhr.status == 498) {
            $.tokenError();
          }
        }
      });

    $('#unitname').on('change', function () {
        var selectedOption = $(this).val();
        // console.log('Selected Option:', selectedOption);
        var unitName = selectedOption;
    
        var storeUrl = `${[test[0].url]}/factoryStore/findcompanystore?unit_name=` + encodeURIComponent(unitName);
        $.ajax({
          url: storeUrl,
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          success: function (data, status, xhr) {
            // console.log(data);
            $("#storeId").empty();
            data.data.forEach(value => {
              $("#storeId").append(`<option value="${value.store_code}">${value.store_code}</option>`);
            });
          },
          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            }
            else {
              $("#storeId").empty();
            }
          }
        });
    
      });


    $(".cancel").click((e) => {
        e.preventDefault();
        window.open("../template/group.jsp", "_self");
    })

});
