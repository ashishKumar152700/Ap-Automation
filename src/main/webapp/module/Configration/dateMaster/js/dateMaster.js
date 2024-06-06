$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    var my_object = []

    var tab = $("#Dtable").DataTable({


        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,

        ajax: {

            url: `${[test[0].url]}/dateFormat/list`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            error: function (xhr) {
                console.log(xhr);
                if (xhr.status == 498) {
                    $.tokenError();
                }
                else if (xhr.status >= 400 && xhr.status < 500) {

                    $.errorMessage(xhr.responseJSON.message);
                }
                else {
                    $.errorMessage(xhr.responseJSON.error)
                }
            }
        },

        columns: [
            { data: "id" },
            { data: "dateFormat" },
            
            {
                data: "id", render: function (data, type, row, meta) {

                    return `
                        <div class="btn-group">
                        <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;  
                        <button class='btn btn-outline-success btn-sm edit' data-toggle="modal" data-target="#editModal">Edit</button>&nbsp;&nbsp;
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
            { responsivePriority: -2, targets: 1 }
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


    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Dtable').DataTable().column(1).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }

    });


   


    $("#Dtable").on("click", ".delete", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(row);

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
                    url: `${[test[0].url]}/dateFormat/delete?id=${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    success: function (data, status, xhr) {
                        {
                            if (xhr.status == 200) {
                                swalWithBootstrapButtons.fire(
                                    'Entry Deleted!',
                                ).then(() => {
                                    tab.ajax.reload()
                                })
                            }
                            else {

                                $.errorMessage(xhr.responseJSON.message);
                            }

                        }
                    },
                    error: function (xhr) {
                        if (xhr.status == 498) {
                            $.tokenError();
                        }
                        else if (xhr.status >= 400 && xhr.status < 500) {

                            $.errorMessage(xhr.responseJSON.message);
                        }
                        else {
                            $.errorMessage(xhr.responseJSON.error)
                        }
                    }
                })
            }
        })
    })

    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;

        console.log("Hello")

        $.ajax({
            url: `${[test[0].url]}/dateFormat/list?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            success: function (data, status, xhr) {
                if (xhr.status == 200) {
                    console.log(data.data[0].id);
                    console.log(data.data[0].dateFormat);
                    $("#editidformat").val(data.data[0].id);

                    $("#editDateInput").val(data.data[0].dateFormat);

                    // sessionStorage.setItem('objectdata', JSON.stringify(data.data))
                    // openEditModal()
                    // window.location.href = `../template/updateDepartment.jsp`;
                }

                else {

                    $.errorMessage(xhr.responseJSON.message);
                }

            },
            error: function (xhr) {
                if (xhr.status == 498) {
                    $.tokenError();
                }
                else if (xhr.status >= 400 && xhr.status < 500) {

                    $.errorMessage(xhr.responseJSON.message);
                }
                else {
                    $.errorMessage(xhr.responseJSON.error);
                }
            }
        })

    })

    var openEditModal = () => {

        var sessionString = sessionStorage.getItem('Objectdata');
        my_object = JSON.parse(sessionString);
        console.log(my_object);
        
        $("#editModal").modal('show')

        $("#editDateInput").val(object[0].dateFormat);


        

    }

    $('#editDate').click(function () {
        // alert("Hello! I am an alert box!!");

        var editDateString = $("#editDateInput").val();
        var editId = $("#editidformat").val();
        


        $.ajax({
            url: `${[test[0].url]}/dateFormat/update?id=${editId}`,
            method: "PUT",
            data: JSON.stringify({
                dateFormat: editDateString,
            }),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

          

           
            // error: function (xhr) {
            //     console.log(xhr);
            // },
            success: function (data, status, xhr) {
                console.log(data);

                if (xhr.status == 200) {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false
                    })


                    swalWithBootstrapButtons.fire({
                        title: 'Date Updated',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then((result) => {

                        window.open("../template/dateMaster.jsp", "_self")
                    })
                }
                else {

                    $.errorMessage(xhr.responseJSON.message);
                }


            },
            error: function (xhr) {
                if (xhr.status == 498) {
                    $.tokenError();
                }
                else if (xhr.status >= 400 && xhr.status < 500) {

                    $.errorMessage(xhr.responseJSON.message);
                }
                else {
                    $.errorMessage(xhr.responseJSON.error)
                }
            },
        });

    })

    $("#editDate").click(function () {
        $("#editModal").modal("hide");
    });

})