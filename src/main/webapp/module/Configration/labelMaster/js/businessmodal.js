
$(document).ready(() => {
    var token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    $.fn.DataTable.ext.pager.numbers_length = 5;
    //  $("#form6Example8")[0].value = "";


    $("#model").click(() => {
        $("#col1_filter")[0].value = "";
    })

    var tab;
    var table;

    $.ajax({

        type: 'GET',

        url: `${[test[0].url]}/tag/tags`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        // dataSrc : "fs_DATABROWSE_F0006",

        success: function (data,status,xhr) {
            if(xhr.status == 200)
            {
                var Business = data.data;
               
                // var Description = data.fs_DATABROWSE_F0006.data.gridData.rowset.map(value=> value.F0006_MCU);
               
               //  console.log(Business);
               
                for(let i = 0 ; i < Business.length ; i++)
               
                {
               
                $("#tbody").append(`<tr><td>${Business[i].id}</td><td>${Business[i].label}</td><td>${Business[i].description}</td></tr>`)
               
                }
            }
            else{

                $.errorMessage(xhr.responseJSON.message);
            }
            
        
        },

        error: function (xhr, ajaxOptions, throwError) {

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

            tab = $("#Dtable").DataTable({

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
            tab.column(0).visible(false);
        }

    })

    // console.log(tab);

    


    $('#Dtable tbody').on('click', 'tr', function () {
        var data = tab.row(this).data();
        var row = $(this)[0];
        function search() {

            $.id = data[0]
            $("#form6Example8").val(data[1]);
            // $("#description").val(data[2]);


            $(row).removeClass("selected");
        }

        $("#select").click(() => {

            search(data);

        })
    });


    $('#Datable tbody').on('click', 'tr', function () {
        var dataa = table.row(this).data();
        var roww = $(this)[0];

        // console.log(dataa[0]);
        function searchh() {
            // console.log(dataa[0]);
            $("#form6Example10").val(dataa[0]);

            $(roww).removeClass("selected");
        }

        $("#selectt").click(() => {
            searchh(dataa);

        })
    });


    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });


    $("#search").click(() => {
        $('#Dtable').DataTable().column(0).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    })


    $("#searchrecord").click(() => {
        $('#Datable').DataTable().column(0).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })

})
