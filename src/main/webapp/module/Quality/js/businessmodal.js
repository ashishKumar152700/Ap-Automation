

$(document).ready(() => {

    $.fn.DataTable.ext.pager.numbers_length = 5;
    //  $("#form6Example8")[0].value = "";
    var login = $.login();


    $("#model").click(() => {
        $("#col1_filter")[0].value = "";
    })

    var tab;
    var table;

    $.ajax({

        type: 'GET',

        url: `${[login[0].url]}/jderest/v2/dataservice/table/F3701?$field=F3701.QTST&$field=F3701.MCU&$field=F3701.TTTY&$field=F3701.DSC1&$field=F3701.EFFF&$field=F3701.EFFT&$filter=F3701.STAW%20LT%200`,

        // dataSrc : "fs_DATABROWSE_F0006",
        headers: {

            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)

        },

        success: function (data) {

            //Success block  
            // console.log(data);


            var Business = data.fs_DATABROWSE_F3701.data.gridData.rowset;

            // var Description = data.fs_DATABROWSE_F0006.data.gridData.rowset.map(value=> value.F0006_MCU);

            console.log(Business);

            for (let i = 0; i < Business.length; i++) {


                $("#Business_body").append(`<tr><td>${Business[i].F3701_QTST}</td><td>${Business[i].F3701_MCU}</td><td>${Business[i].F3701_EFFT}</td><td>${Business[i].F3701_EFFF}</td><td>${Business[i].F3701_DSC1}</td><td>${Business[i].F3701_TTTY}</td></tr>`)

            }

        },

        error: function (xhr, ajaxOptions, throwError) {

            //Error block

        },

        complete: () => {

            tab = $("#Btable").DataTable({

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
        }

    })

    let qualityTest = [];
    var data;
    var search;

    $('#Btable tbody').on('click', 'tr', function () {
        data = tab.row(this).data();
        var row = $(this)[0];
        // console.log(row);
        // console.log(data[0]);
        search = ()=> {
            // console.log(data);
            
            
            var f = $("#tab_logicc tr").length - 2;
            
            // console.log(f);
            // qualityTest.push(data[0]);
            // console.log(qualityTest);
            // console.log(data[0]);
            
            
            if( qualityTest.length==0 || qualityTest.includes(data[0])==false){
                
                $(".test_id")[f].value = data[0];
                $(".business_unit")[f].value = data[1];
                $(".effective_Thru")[f].value = data[2];
                $(".effective_From")[f].value = data[3];
                $(".description")[f].value = data[4];
                $(".test_Type")[f].value = data[5];
            }
            
            
            
            // console.log(row);
            
            let r = $(".fetch_check")[f].value;
            $(row).removeClass("selected");
            // var f = $("#tab_logicc tr").length - 2;
            // console.log(f);
            // console.log(r);
            
            return r;
            
        }
        
    });
    $("#select").click(() => {
        
        let resultSearch=search()
        if(resultSearch !=""){
            qualityTest.push(resultSearch);
        }
        console.log(qualityTest);
        // console.log(qualityTest);

    })

   

    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    $("#business_search").click(() => {
        $('#Btable').DataTable().column(1).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })

    $("#col2_filter").keypress((event) => {
        if (event.keyCode === 13) {
            $('#Btable').DataTable().column(1).search(
                $('#col' + 2 + '_filter').val(),
                $('#col' + 2 + '_smart').prop('checked')
            ).draw();
        }
    });


})
