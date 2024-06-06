$(document).ready(() => {

    let token = JSON.parse(localStorage.getItem("token"));
    var test = $.test();

    $(window).load(()=>{
        $("#loader").addClass("sk-loading")

        let date =  (new Date()).toISOString().split('T')[0]

        console.log(date);

        $("#col3_filter").val(date)

        $("#col3_filter").trigger("change")
    })

    $("#calendar").click(()=>{

            $('#col3_filter').datepicker('show');

        })
        $('#col3_filter').datepicker({
          dateFormat: 'yy-mm-dd' // Set your desired date format here
        });

    var tab = $("#Dtable").DataTable({

        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,
        ajax: {
            url: `${[test[0].url]}/login/auditinfo`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
              error : function(xhr){
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
              }
        },
        columns: [
            { data: "id" },
            { data: "user_id" },
            { data: "user_name" },
            { data: "ip_address" },
            { data: "log_in_time" },
            { data: "log_out_time" },
            { data: "user_agent" },
        ],


        columnDefs: [
            {
                "defaultContent": "-",
                "targets": "_all"
            },
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: -2, targets: 4 }
        ],

    });
    tab.column(0).visible(false);
    tab.column(1).visible(false);


    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });




    $("#search").click(() => {
        $('#Dtable').DataTable().column(2).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    })

    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Dtable').DataTable().column(2).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }

    });

    $("#col3_filter").change(() => {
        $('#Dtable').DataTable().column(4).search(
            $('#col' + 3 + '_filter').val().split("-").reverse().join("-"),
            $('#col' + 3 + '_smart').prop('checked')
        ).draw();
    })

    $("#col3_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            $('#Dtable').DataTable().column(4).search(
                $('#col' + 3 + '_filter').val().split("-").reverse().join("-"),
                $('#col' + 3 + '_smart').prop('checked')
            ).draw();
        }
    });


    $("#Dtable").on("click", ".delete", function () {
        var test = $.test()

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
                    url: `${[test[0].url]}/emailTemplate/delete/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data,status,xhr) {
                        {
                            if(xhr.status == 200)
                            {
                                swalWithBootstrapButtons.fire(
                                    'Entry Deleted!',
                                ).then(() => {
                                    tab.ajax.reload()
                                })
                            }
                            else{

                                $.errorMessage(xhr.responseJSON.message);
                           }
                           
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

        var test = $.test()
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        // console.log(row);
        $.ajax({
            url: `${[test[0].url]}/emailTemplate/emailTemplate/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data) {
                if(xhr.status == 200)
                {
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updateEmailTemplate.jsp`;
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
        })

    })

    $("#Dtable").on("click", ".view", function () {
        var test = $.test()
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        $('#myModal5').modal('show');
        $.ajax({
            url: `${test}/notificationgroup/notificationgroups/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {

                if(xhr.status == 200)
                {
                    $("#groupname").val(data.data.groupName).css("font-weight", "bold");
                    $("#name").val(data.data.name).css("font-weight", "bold");
                    $("#email").val(data.data.email).css("font-weight", "bold");
                    $("#vendor_code").val(data.data.supplierNumber).css("font-weight", "bold");
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
        })
        $("#myModal5").on('hide.bs.modal', function () {
            $("#status").children().remove();
        })

    })

})