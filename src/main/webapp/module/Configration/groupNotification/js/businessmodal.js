
$(document).ready(() => {
    var login = $.login();

    $.fn.DataTable.ext.pager.numbers_length = 5;
    //  $("#form6Example8")[0].value = "";


    $("#model").click(() => {
        $("#col1_filter")[0].value = "";
    })

    var tab;
    var table;

   
    $.ajax ({

        type: 'GET',    

        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20E`,

        headers: {

            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)

        },

        success : function(data) {

            
            var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;
            console.log(supplier);
            
                for(let i = 0 ; i < supplier.length ; i++)
                {
                    $("#Supplier_name").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
                }
        },
        error: function (xhr,ajaxOptions,throwError){
        //Error block
        },
        complete : ()=>{      


                table = $("#Vtable").DataTable({
                language: {
                'paginate': {
                'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                }
                },
                dom: '<"top">t<"bottom"ip>',
                ordering: true,
                lengthMenu : [5,10,20,25,50],
                pagingType: "simple_numbers",
                select: true,
            });
            table.column(2).visible(false);
            
        }

        })

        $('#Vtable tbody').on( 'click', 'tr', function () {
            var dataa= table.row(this).data();
            var roww  = $(this)[0];


            // console.log(roww);
            function searchh(dataa)
            { 
                $("#vendor_code").val(dataa[0]); 
                // $("#supplier_gstin").val(dataa[2])
                $("#name").val(dataa[1]);


                $(roww).removeClass("selected");
            }
            
            $("#vendor").click(()=>{
                searchh(dataa);
                
            })
        } );

        $("#vendor_search").click(() => {
        $('#Vtable').DataTable().column(0).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1    + '_smart').prop('checked')
            ).draw();
        })

        $("#col1_filter").keypress((event) => {

            if (event.keyCode === 13) {
    
                $('#Vtable').DataTable().column(0).search(
                    $('#col' + 1 + '_filter').val(),
                    $('#col' + 1    + '_smart').prop('checked')
                    ).draw();
            }
    
        });


  


   

})
