
$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));

    var test = $.test()
    

    var tab = $("#Dtable").DataTable({

        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,
        ajax: {
            url: `${[test[0].url]}/gate/numbers`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
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

        },
        columns: [
            { data: "id" },
            { data: "company" },
            { data: "mcu" },
            { data: "process" },
            { data: "year" },
            { data: "currentIndex" },
            { data: "lastNumber" },
            {
                data: "status",

                render: function (data, type, row, meta) {


                    if (data == 1) {
                        return `
                        <div class="btn-group">
                        <button class='status_checks statusButton btn-success'>ACTIVE</button>
                        </div>
                        `

                    }
                    else {
                        return `
                        <div class="btn-group">
                        <button class='status_checks statusButton btn-danger'>INACTIVE</button>
                        </div>
                        `
                    }

                }
            },


            {
                data: "id", render: function (data, type, row, meta) {

                    return `
                        <div class="btn-group">
                        <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;  
                        <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
                        <button class='btn btn-outline-success btn-sm view '>View</button>
                        </div>
                        `
                }
            },
        ],

        columnDefs: [
            {
                "defaultContent": "-",
                "targets": "_all"
            },
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: -2, targets: 8 }
        ],

    });


    tab.column(0).visible(false);


    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });


    $("#search").click(() => {
        $('#Dtable').DataTable().column(1).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    })


    $("#Dtable").on("click", ".delete", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;

        console.log(row);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false
        })


        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${[test[0].url]}/gate/number/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer '+ token,
                      },
                    success: function (data,status,xhr) {
                        if(xhr.status == 200)
                        {
                            swalWithBootstrapButtons.fire(
                                'Entry Deleted!',
                            ).then(() => {
                                window.location.reload();
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
            }
            else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',

                    'Your Data is safe :)',
                )
            }
        })
    })

    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(row);
        $.ajax({
            url: `${[test[0].url]}/gate/find?getById=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updatenextNumber.jsp`;
                }
                else if(xhr.status >= 400 && xhr.status < 500){

                        $.errorMessage(xhr.responseJSON.message);
                }
                else{
                        $.errorMessage(xhr.responseJSON.error)
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

    })

    $("#Dtable").on("click", ".view", function () {
        
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        $('#myModal5').modal('show');
        $.ajax({
            url: `${[test[0].url]}/gate/find?getById=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    $("#company").val(data.data[0].company).css("font-weight", "bold");
                    $("#mcu").val(data.data[0].mcu).css("font-weight", "bold");
                    $("#gateid").val(data.data[0].gateId).css("font-weight", "bold");
    
                    $("#process").val(data.data[0].process).css("font-weight", "bold");
                    $("#year").val(data.data[0].year).css("font-weight", "bold");
                    $("#length").val(data.data[0].length).css("font-weight", "bold");
    
                    // console.log(data.data.status);
    
                    var b = data.data[0].status
                    if (b == 1) {
                        $('#status').append(`<span class="label label-primary" id="active">Active</span>`)
                        $("#active").css("font-size", "15px")
                    }
                    else {
                        $('#status').append(`<span class="label label-danger" id="inactive">Inactive</span>`)
                        $("#inactive").css("font-size", "15px")
    
                    }
                    
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
        $("#myModal5").on('hide.bs.modal', function () {
            $("#status").children().remove();
        })

    })

})