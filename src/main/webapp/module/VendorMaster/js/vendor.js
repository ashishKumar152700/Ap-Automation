$(document).ready(function(){

    const token = JSON.parse(localStorage.getItem("token"));
    // Show loader on page load
    $(window).load(()=>{
        $("#loader").addClass("sk-loading")
    })


    var login = $.login();

    $.fn.DataTable.ext.pager.numbers_length = 5;
    //  $("#form6Example8")[0].value = "";


    // $("#model").click(() => {
    //     $("#col1_filter")[0].value = "";
    // })

    var tab;
    var table;

    console.log(`${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20V&%24limit=20000`);

   
    $.ajax ({

        type: 'GET',    

        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20V&%24limit=20000`,

        headers: {

            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)

        },

        success : function(data) {

            
            var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;
            // console.log(supplier);
            
                for(let i = 0 ; i < supplier.length ; i++)
                {
                    $("#role").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
                }
        },
        error: function (xhr,ajaxOptions,throwError){
        //Error block
        },
        complete : ()=>{      


                tab = $("#role").DataTable({
                language: {
                'paginate': {
                'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                }
                },
                dom: '<"top">ft<"bottom"ilp>',
                ordering: true,
                lengthMenu : [10,20,25,50],
                pagingType: "simple_numbers",
                select: true,
                columnDefs: [
                    {
                        "defaultContent": "-", // Set default content for empty cells
                        "targets": "_all"
                    },
                    { responsivePriority: 1, targets: 0 }, // Set responsive priorities for columns
                    // { responsivePriority: -1, targets: 3 }
                ]
            });

            $("#loader").removeClass("sk-loading")
            $("#loader").removeClass("ibox-content")
            $(".sk-spinner").addClass("d-none")
            // table.column(2).visible(false);
            
        }

        })


    // var tab = $("#role").DataTable({
    //     // Configure DataTables
    //     dom: '<"top">t<"bottom"ilp>',
    //     ajax:{
    //     url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20E`, // Set the URL for AJAX data retrieval
    //         dataSrc : "data",
    //         complete : ()=>{

    //             tab = $("#Vtable").DataTable({
    //                 language: {
    //                 'paginate': {
    //                 'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
    //                 'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
    //                 }
    //                 },
    //                 dom: '<"top">t<"bottom"ip>',
    //                 ordering: true,
    //                 lengthMenu : [5,10,20,25,50],
    //                 pagingType: "simple_numbers",
    //                 select: true,

    //                 columnDefs: [
    //                     {
    //                         "defaultContent": "-", // Set default content for empty cells
    //                         "targets": "_all"
    //                     },
    //                     { responsivePriority: 1, targets: 0 }, // Set responsive priorities for columns
    //                     { responsivePriority: -1, targets: 3 }
    //                 ]
    //             });
    //             table.column(2).visible(false);
    //             // Remove loader and spinner after data is loaded
    //             $("#loader").removeClass("sk-loading")
    //             $("#loader").removeClass("ibox-content")
    //             $(".sk-spinner").addClass("d-none")
    //         }
    //     },
    //     // columns : [
    //     //     {data : "roleid"}, // Specify data columns
    //     //     {data : "rolecode"},
    //     //     {data : "role_description"},
    //     //     {
    //     //         // Render custom buttons in the last column
    //     //         data: "id", render: function (data, type, row, meta) {
    //     //             return `
    //     //                 <div class="btn-group">
    //     //                     <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;    
    //     //                     <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
    //     //                     <button class='btn btn-outline-primary btn-sm view'>View</button>
    //     //                 </div>
    //     //             `;
    //     //         }
    //     //     } 
    //     // ],
        
    // });

    // Handle global search input
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    // tab.column(0).visible(false); // Hide the first column

    $("#search").click(()=>{
        // Perform search when search button is clicked
        $('#role').DataTable().column(0).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    });

    $("#col1_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            // Perform search when Enter key is pressed in the search input
            $('#role').DataTable().column(0).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });
    $("#searchName").click(()=>{
        // Perform search when search button is clicked
        $('#role').DataTable().column(1).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    });

    $("#col2_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            // Perform search when Enter key is pressed in the search input
            $('#role').DataTable().column(1).search(
                $('#col' + 2 + '_filter').val(),
                $('#col' + 2 + '_smart').prop('checked')
            ).draw();
        }
    });

    // $("#role").on("click", ".delete", function () {
    //     // Handle delete button click
    //     var [test[0].url] = $.[test[0].url]();
    //     var raw = $(this).closest("tr").children();
    //     var row = tab.row(raw).data().roleid;

    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-sm btn-success mx-1',
    //             cancelButton: 'btn btn-sm btn-danger mx-1'
    //         },
    //         buttonsStyling: false,
    //     });

    //     swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Delete',
    //         cancelButtonText: 'Cancel!',
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // Perform delete operation if confirmed
    //             $.ajax({
    //                 url: `${[test[0].url]}/rolemaster/deleterole/${row}`,
    //                 type: "delete",
    //                 dataSrc: "data",
    //                 success: function (data) {
    //                     tab.ajax.reload();
    //                 },
    //                 error : function(xhr){
    //                     swalWithBootstrapButtons.fire({
    //                         text: `${xhr.responseJSON.message}`,
    //                         icon: 'warning',
    //                         confirmButtonText: 'OK',
    //                     });
    //                 }
    //             });
    //         } else if (result.dismiss === Swal.DismissReason.cancel) {
    //             // Show cancel message if operation is cancelled
    //             swalWithBootstrapButtons.fire(
    //                 'Cancelled',
    //                 'Your Data is safe :)',
    //             );
    //         }
    //     });
    // });

    // $("#role").on("click", ".edit", function () {
    //     // Handle edit button click
    //     var [test[0].url] = $.[test[0].url]();
    //     var raw = $(this).closest("tr").children();
    //     var row = tab.row(raw).data().roleid;

    //     $.ajax({
    //         url: `${[test[0].url]}/rolemaster/role/${row}`,
    //         dataSrc: "data",
    //         success: function (data) {
    //             console.log(data);
    //             sessionStorage.setItem('roles', JSON.stringify(data.data));
    //             window.location.href = `../template/updateRole.jsp`;
    //         }
    //     });
    // });
    
    // $("#role").on("click", ".view", function () {
    //     // Handle view button click
    //     var [test[0].url] = $.[test[0].url]();
    //     var raw = $(this).closest("tr").children();
    //     var row = tab.row(raw).data().roleid;
    //     $('#myModal5').modal('show');

    //     $.ajax({
    //         url: `${[test[0].url]}/rolemaster/role/${row}`,
    //         dataSrc: "data",
    //         success: function (data) {
    //             $("#form6Example1").val(data.data.rolecode).css("font-weight" , "bold");
    //             $("#form6Example5").val(data.data.role_description).css("font-weight" , "bold");
    //         }
    //     });
    // });

    // $("#add_user").click(()=>{
    //     // Redirect to adduser.jsp when add_user button is clicked
    //     window.open("adduser.jsp","_self");
    // });
});
