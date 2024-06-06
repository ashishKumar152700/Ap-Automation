$(function() {

    const token = JSON.parse(localStorage.getItem("token"));
    // Set the number of visible page numbers in the DataTable pager
    $.fn.DataTable.ext.pager.numbers_length = 5;

    // Get the required elements
    const $Dtable = $('#Dtable');
    const $col1_filter = $('#col1_filter');

    // Perform a [test[0].url]
    var test = $.test();
    


    const tab = $Dtable.DataTable({

        dom: '<"top"f>t<"bottom"ilp>',
        // "fixedHeader": true,

        // "buttons": [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        //     'pdfHtml5'
        // ],
        ordering: false,
        "processing": true,
        "serverSide": true,
        // "fixedHeader": true,
        search: {
            return: true
        },
        
        ajax: {
            url: `${[test[0].url]}/usermaster/users`,
            // "dataSrc": "data.content",
            dataFilter: function(data){

                var json = JSON.parse( data );

                console.log('json ---->' ,json);

                json.recordsTotal = json.data.totalElements;
                json.recordsFiltered = json.data.totalElements;
                data_length = json.data.totalElements

                console.log('data length ---->' , json.data.totalElements);
                json.data = json.data.content;

                console.log(JSON.stringify(this.url));
                // json.pageLength = json.data.numberOfElements

     
                return JSON.stringify( json ); // return JSON string
            },
            data : function(d){
                $("#loader").addClass("sk-loading")
                $("#loader").addClass("ibox-content")
                $(".sk-spinner").removeClass("d-none")

                // console.log(bol_val);
                // console.log(data_length);
                
                d.page = (d.start / d.length);
                // d.size =  bol_val ? data_length : d.length;
                d.size =  d.length;
                // d.status =  status || $('#col2_filter').val();
                // d.gate =  $('#col1_filter').val()
                // d.transactionType = $('#Transaction').val();
                // d.date =  $('#col3_filter').val()
                d.search = $("input[type='search']").val() || $('#col1_filter').val()

                // bol_val = false
                console.log('d ---->' ,d);
                console.log("search" , $('#col1_filter').val());
            },
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            //   success : function(data)
            //   {

            //     console.log("response :" ,data);
            //   },
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
            complete : ()=>{

                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")

            }
        },
        columns: [
            // Specify the data columns for the DataTable
            { data: "userid" },
            { data: "username" },
            { data: "address_number" },
            { data: "email" },
            { data: "active" },
            {
                data: "id",
                render: function (data, type, row, meta) {
                    // Render buttons for delete, edit, and view actions

                    // console.log(row.active ,"row value");

                    let row_value = row.active ? `<button class='btn btn-outline-info success btn-sm delete'>Active</button>&nbsp;&nbsp;` : `<button class='btn btn-outline-danger btn-sm delete'>Inactive</button>&nbsp;&nbsp;`
                    return `
                        <div class="btn-group">
                            ${row_value} 
                            <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
                            <button class='btn btn-outline-primary btn-sm view'>View</button>
                        </div>
                    `;
                }
            }
        ],
        columnDefs: [
            // Set default content for all columns
            { "defaultContent": "-", "targets": "_all" },
            // Set priority for responsive columns
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: -2, targets: 4 }
        ],
        rowCallback: function (row, data, index) {
            
           
            console.log('row value ---->' ,$(row).find(".btn-outline-success"));

            $(row).find(".btn-outline-success").css("border-color", "#28A745 !important");
            $(row).find(".btn-outline-success").css("color", "#28A745 !important");
           

            },
        

     

       
        

    });

    // Initialize the DataTable
    // tab = $Dtable.DataTable({
    //     // Define the DOM structure for the DataTable
    //     dom: '<"top"f>t<"bottom"ilp>',
    //     ordering: true,
    //     processing: true,
    //     ajax: {
    //         // Specify the URL for data retrieval
    //         url: `${[test[0].url]}/usermaster/users`,
    //         dataSrc: "data",
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //           },
    //           error: function (xhr) {
    //             if(xhr.status == 498)
    //             {
    //                 $.tokenError();
    //             }
    //             else if(xhr.status >= 400 && xhr.status < 500){

    //                     $.errorMessage(xhr.responseJSON.message);
    //             }
    //             else{
    //                     $.errorMessage(xhr.responseJSON.error)
    //             }
    //         },
    //         complete: () => {
    //             // Remove loader and spinner when data loading is complete
    //             $("#loader").removeClass("sk-loading ibox-content");
    //             $(".sk-spinner").addClass("d-none");
    //         }
    //     },
    //     columns: [
    //         // Specify the data columns for the DataTable
    //         { data: "userid" },
    //         { data: "username" },
    //         { data: "address_number" },
    //         { data: "email" },
    //         // { data: "" },
    //         {
    //             data: "id",
    //             render: function (data, type, row, meta) {
    //                 // Render buttons for delete, edit, and view actions
    //                 return `
    //                     <div class="btn-group">
    //                         <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;  
    //                         <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
    //                         <button class='btn btn-outline-primary btn-sm view'>View</button>
    //                     </div>
    //                 `;
    //             }
    //         }
    //     ],
    //     columnDefs: [
    //         // Set default content for all columns
    //         { "defaultContent": "-", "targets": "_all" },
    //         // Set priority for responsive columns
    //         { responsivePriority: 1, targets: 0 },
    //         { responsivePriority: -2, targets: 4 }
    //     ]
    // });

    // Hide the first column (userid)
    tab.column(0).visible(false);
    tab.column(4).visible(false);

    // Global filter event handler
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    // Search button click event handler
    $("#search").click(() => {
        tab.column(1).search(
            $('#col1_filter').val(),
            $('#col1_smart').prop('checked')
        ).draw();
    });

    // Enter key press event handler for column filter
    $col1_filter.keypress((event) => {
        if (event.keyCode === 13) {
            tab.column(1).search(
                $col1_filter.val(),
                $('#col1_smart').prop('checked')
            ).draw();
        }
    });

    // Delete button click event handler
    $Dtable.on("click", ".delete", function () {

        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $(".sk-spinner").removeClass("d-none")
        // Get the row data and perform delete operation
        const raw = $(this).closest("tr").children();
        const row = tab.row(raw).data().userid;
        const userStatus = tab.row(raw).data().active;
        

        console.log('user status value ---->' , userStatus);

        console.log('raw value ---->' ,raw);
        console.log('row value ---->' ,row);

        // Display a confirmation dialog using Swal (SweetAlert2)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: userStatus ? "Deactivate" : "Activate" ,
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the delete operation using AJAX
                $.ajax({
                    // url: `${[test[0].url]}/usermaster/deleteuser/${row}`,
                    url: `${[test[0].url]}/usermaster/updateuser?userActive=${!userStatus}&id=${row}`,
                    // type: "delete",
                    type: "put",

                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data, status, xhr) {
                        $("#loader").removeClass("sk-loading")
                        $("#loader").removeClass("ibox-content")
                        $(".sk-spinner").addClass("d-none")

                        console.log(xhr)
                        if (xhr.status == 200) {
                            // Display success message and reload the DataTable

                            swalWithBootstrapButtons.fire({
                                title: '',
                                text: `${xhr.responseJSON.message}`,
                                icon: 'success',
                                confirmButtonText: 'OK',
                            }).then(() => {
                                tab.ajax.reload();
                            });
                                
                        } 
                        else{

                                $.errorMessage(xhr.responseJSON.message);
                        }
                    },
                    error: function (xhr) {
                        $("#loader").removeClass("sk-loading")
                        $("#loader").removeClass("ibox-content")
                        $(".sk-spinner").addClass("d-none")
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
            } else{
                swalWithBootstrapButtons.fire('Cancelled', 'Your Data is safe :(');
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
            }
        });
    });

    // Edit button click event handler
    $Dtable.on("click", ".edit", function () {

        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $(".sk-spinner").removeClass("d-none")
        // Get the row data and redirect to update page
        const raw = $(this).closest("tr").children();
        const row = tab.row(raw).data().userid;
        $.ajax({
            url: `${[test[0].url]}/usermaster/users/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {

                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
                if(xhr.status == 200)
                {
                    sessionStorage.setItem('object', JSON.stringify(data.data));
                    window.location.href = `../template/updateUser.jsp`;
                }
                else{

                        $.errorMessage(xhr.responseJSON.message);
                }
            },
            error: function (xhr) {
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
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

    // View button click event handler
    $Dtable.on("click", ".view", function () {
        // Get the row data and display in a modal
        const raw = $(this).closest("tr").children();
        const row = tab.row(raw).data().userid;
        $('#myModal5').modal('show');

        $("#loader1").addClass("sk-loading")
        $("#loader1").addClass("ibox-content")
        $("#spin1").removeClass("d-none")



        // Fetch user data using AJAX and populate the modal fields
        $.ajax({
            url: `${[test[0].url]}/usermaster/users/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)

                {
                    
                    $("#input-text11").text(`${data.data.first_name}`);
                    $("#input-text12").text(data.data.username);
                    $("#form6Example3").val(data.data.first_name).css("font-weight", "bold");
                    $("#form6Example4").val(data.data.last_name).css("font-weight", "bold");
                    $("#form6Example10").val(data.data.role_ids).css("font-weight", "bold");
                    $("#form6Example5").val(data.data.address_number).css("font-weight", "bold");
                    $("#gate_id").val(data.data.gate_id).css("font-weight", "bold");
                    $("#input-text13").text(data.data.email);
    
                    // Display assigned roles or a message if none
                    if (data.data.assignroles.length === 0) {
                        $("#countries").append(`<p class="border p-2 bg-primary">NO ROLE ASSIGNED</p>`);
                    } else {
                        data.data.assignroles.forEach((value) => {
                            $("#countries").append(`<button type="button" class="btn btn-success my-1 mx-1">${value.rolecode}</button>`);
                        });
                    }
                    if (data.data.assigncompany.length === 0) {
                        $("#unitname").append(`<p class="border p-2 bg-primary">NO UNIT NAME ASSIGNED</p>`);
                    } else {
                        data.data.assigncompany.forEach((value) => {
                            // console.log(value);
                            $("#unitname").append(`<button type="button" class="btn btn-success my-1 mx-1">${value.unitName}</button>`);
                        });
                    }


                $("#loader1").removeClass("sk-loading")
                $("#loader1").removeClass("ibox-content")
                $("#spin1").addClass("d-none")

                }
                else{

                        $.errorMessage(xhr.responseJSON.message);

                        $("#loader1").removeClass("sk-loading")
                        $("#loader1").removeClass("ibox-content")
                        $("#spin1").addClass("d-none")
                }
                // console.log(data.data);
                // Update modal fields with user data
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

    // Modal hide event handler
    $("#myModal5").on('hide.bs.modal', function () {
        // Clear the contents of the modal
        $("#countries").empty();
        $("#unitname").empty();
    });

    // Add user button click event handler
    $("#add_user").click(() => {
        // Open the add user page
        window.open("adduser.jsp", "_self");
    });
});
