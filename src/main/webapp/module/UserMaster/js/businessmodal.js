$(document).ready(() => {
    // Set the number of pager numbers to be displayed
    $.fn.DataTable.ext.pager.numbers_length = 5;

    var login = $.login();

    // Clear the filter value on "model" button click
    $("#model").click(() => {
        $("#col1_filter")[0].value = "";
    });

    var tab;
    var table;

    $("#modeldata").click(()=>{

        try {
            table.destroy();
            $("#tbodyy").empty();
        } catch (error) {
            
        }

        table = $("#Datable").DataTable({
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

        $("#col2_filter").val("")
        
        $("#searchrecord").trigger("click")
    })
    
    $("#model").click(()=>{

        try {
            tab.destroy();
            $("#tbody").empty();
        } catch (error) {
            
        }

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


        $("#col1_filter").val("")
        
        $("#search").trigger("click")
    })







    $("#search").click(() => {

        $("#loader7").addClass("ibox-content")
        $("#loader7").addClass("sk-loading")
        $("#spin7").removeClass("d-none")

        
    // Fetch data for table Dtable
    $.ajax({
        type: 'GET',
        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0006?$field=F0006.MCU&$field=F0006.DL01&$filter=F0006.STYL%20EQ%20BP*&$limit=100`,
        headers: {
            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
        },
        success: function (data) {

            try {
                tab.destroy();
                $("#tbody").empty();
            } catch (error) {
                
            }

            // Populate table Dtable with fetched data
            var Business = data.fs_DATABROWSE_F0006.data.gridData.rowset;
            for (let i = 0; i < Business.length; i++) {
                $("#tbody").append(`<tr><td>${Business[i].F0006_MCU}</td><td>${Business[i].F0006_DL01}</td></tr>`);
            }

            $("#loader7").removeClass("ibox-content")
            $("#loader7").removeClass("sk-loading")
            $("#spin7").addClass("d-none")

           
        },
        error : function(xhr)
        {
            $("#loader7").removeClass("ibox-content")
            $("#loader7").removeClass("sk-loading")
            $("#spin7").addClass("d-none")
        },
        complete: () => {
            // Initialize DataTable for Dtable
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

        }
    });

})


$("#searchrecord").click(() => {

    $("#loader6").addClass("ibox-content")
        $("#loader6").addClass("sk-loading")
        $("#spin6").removeClass("d-none")

   
    // Fetch data for table Datable
    $.ajax({
        type: 'GET',
        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&%24field=F0101.ALPH&%24filter=F0101.AT1%20EQ%20O&$limit=1000`,
        headers: {
            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
        },
        success: function (data) {
            console.log("hello");

            try {
                table.destroy();
                $("#tbodyy").empty();
            } catch (error) {
                
            }
            // Populate table Datable with fetched data
            var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;
            for (let i = 0; i < supplier.length; i++) {
                $("#tbodyy").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td></tr>`);
            }
            $("#loader6").removeClass("ibox-content")
            $("#loader6").removeClass("sk-loading")
            $("#spin6").addClass("d-none")
        },
        error: function(xhr){
            $("#loader6").removeClass("ibox-content")
            $("#loader6").removeClass("sk-loading")
            $("#spin6").addClass("d-none")
        },
        complete: () => {
            // Initialize DataTable for Datable
            table = $("#Datable").DataTable({
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
    });

})

    // Handle row click event for table Dtable
    $('#Dtable tbody').on('click', 'tr', function () {
        var data = tab.row(this).data();
        var row = $(this)[0];
        
        // Perform search and update input value on "select" button click
        function search() {
            $("#form6Example8").val(data[0]);
            $(row).removeClass("selected");
        }

        $("#select").click(() => {
            search(data);
        });
    });

    // Handle row click event for table Datable
    $('#Datable tbody').on('click', 'tr', function () {
        var dataa = table.row(this).data();
        var roww = $(this)[0];

        // Perform search and update input value on "selectt" button click
        function searchh() {
            console.log(dataa[0]);
            $("#form6Example10").val(dataa[0]);
            $(roww).removeClass("selected");
        }

        $("#selectt").click(() => {
            searchh(dataa);
        });
    });

    // Handle global filter input change event
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    // Search button click event for table Dtable
    // $("#search").click(() => {
    //     $('#Dtable').DataTable().column(0).search(
    //         $('#col1_filter').val(),
    //         $('#col1_smart').prop('checked')
    //     ).draw();
    // });

    // Search on Enter key press for table Dtable
    $("#col1_filter").keypress((event) => {
        if (event.keyCode === 13) {
            $("#search").trigger("click")
            // $('#Dtable').DataTable().column(0).search(
            //     $('#col1_filter').val(),
            //     $('#col1_smart').prop('checked')
            // ).draw();
        }
    });

    // Search button click event for table Datable
    // $("#searchrecord").click(() => {
    //     $('#Datable').DataTable().column(0).search(
    //         $('#col2_filter').val(),
    //         $('#col2_smart').prop('checked')
    //     ).draw();
    // });

    // Search on Enter key press for table Datable
    $("#col2_filter").keypress((event) => {
        if (event.keyCode === 13) {
            $("#searchrecord").trigger("click")
            // $('#Datable').DataTable().column(0).search(
            //     $('#col2_filter').val(),
            //     $('#col2_smart').prop('checked')
            // ).draw();
        }
    });
});
