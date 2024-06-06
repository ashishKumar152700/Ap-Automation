$(document).ready(function(){

    const token = JSON.parse(localStorage.getItem("token"));
    // Show loader on page load
    $(window).load(()=>{
        $("#loader").addClass("sk-loading")
    })

    var test = $.test(); // Assign the value of test to the variable 'test'

    var tab = $("#role").DataTable({
        // Configure DataTables
        dom: '<"top">t<"bottom"ilp>',
        ajax:{
            url: `${[test[0].url]}/rolemaster/roles`, // Set the URL for AJAX data retrieval
            dataSrc : "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
              error: function (xhr) {
                console.log(xhr);
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
            complete : ()=>{
                // Remove loader and spinner after data is loaded
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
            }
        },
        columns : [
            {data : "roleid"}, // Specify data columns
            {data : "rolecode"},
            {data : "role_description"},
            {
                // Render custom buttons in the last column
                data: "id", render: function (data, type, row, meta) {
                    return `
                        <div class="btn-group">
                            <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;    
                            <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
                            <button class='btn btn-outline-primary btn-sm view'>View</button>
                        </div>
                    `;
                }
            } 
        ],
        columnDefs: [
            {
                "defaultContent": "-", // Set default content for empty cells
                "targets": "_all"
            },
            { responsivePriority: 1, targets: 0 }, // Set responsive priorities for columns
            { responsivePriority: -1, targets: 3 }
        ]
    });

    // Handle global search input
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    tab.column(0).visible(false); // Hide the first column

    $("#search").click(()=>{
        // Perform search when search button is clicked
        $('#role').DataTable().column(1).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    });

    $("#col1_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            // Perform search when Enter key is pressed in the search input
            $('#role').DataTable().column(1).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });

    $("#role").on("click", ".delete", function () {
        // Handle delete button click

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().roleid;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform delete operation if confirmed
                $.ajax({
                    url: `${[test[0].url]}/rolemaster/deleterole/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data,status,xhr) {
                        if(xhr.status == 200)
                        {
                            tab.ajax.reload();
                        }
                        else{

                                $.errorMessage(xhr.responseJSON.message);
                        }
                        
                    },
                    error : function(xhr){

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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Show cancel message if operation is cancelled
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Data is safe :)',
                );
            }
        });
    });

    $("#role").on("click", ".edit", function () {
        // Handle edit button click
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().roleid;

        $.ajax({
            url: `${[test[0].url]}/rolemaster/role/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    console.log(data);
                    sessionStorage.setItem('roles', JSON.stringify(data.data));
                    window.location.href = `../template/updateRole.jsp`;
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
    });
    
    $("#role").on("click", ".view", function () {
        // Handle view button click
                 $("#loader1").addClass("sk-loading")
                $("#loader1").addClass("ibox-content")
                $("#spin1").removeClass("d-none")

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().roleid;
        $('#myModal5').modal('show');

        $.ajax({
            url: `${[test[0].url]}/rolemaster/role/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {

                $("#loader1").removeClass("sk-loading")
                $("#loader1").removeClass("ibox-content")
                $("#spin1").addClass("d-none")


                if(xhr.status == 200)
                {
                    $("#form6Example1").val(data.data.rolecode).css("font-weight" , "bold");
                    $("#form6Example5").val(data.data.role_description).css("font-weight" , "bold");
                }
                else{

                        $.errorMessage(xhr.responseJSON.message);
                }
            },
            error: function (xhr) {
                $("#loader1").removeClass("sk-loading")
                $("#loader1").removeClass("ibox-content")
                $("#spin1").addClass("d-none")

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
    });

    $("#add_user").click(()=>{
        // Redirect to adduser.jsp when add_user button is clicked
        window.open("adduser.jsp","_self");
    });
});
