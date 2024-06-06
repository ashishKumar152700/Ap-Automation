$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

    var tab=$("#Dtable").DataTable({

        dom: '<"top"f>t<"bottom"ilp>',
        ordering: true,
        processing: true,
        
        ajax: {

            url: `${[test[0].url]}/reservationMaster/reservation`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            //   success:function(data){
            //     console.log(data);
                
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
            }
        },


        columns: [
             {
                data: `gateNumber`, render: function (data, type, row, meta) {

                    return `<input type="checkbox" class="checkbox_val" id=""/>`
                    
                    
                }
            },
            // { data: "id" },
            { data: "gateNumber" },
            { data: "username" },
            { data: "host_name" },
            {
                data: "id", render: function (data, type, row, meta) {

                    return `
                    <div class="btn-group">
                    <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;  
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
            { responsivePriority: -2, targets: 4 }
        ],

    });
    // tab.column(0).visible(false);


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

    
      $("#select_all").click(function(e){
        if($(this).prop("checked")){
            $('.checkbox_val').prop("checked", "checked")
        }
        else{
            $('.checkbox_val').removeAttr("checked")

        }
      })

    $('#deleteAll').on('click', function() {
        var selectedRows = [];
        $('.checkbox_val:checked').each(function() {
          var row = $(this).closest('tr');
          console.log(row)
          var rowData = tab.row(row).data().gateNumber;
          selectedRows.push(rowData);
        });

        console.log(selectedRows);
        // Perform further operations with selectedRows
        console.log(selectedRows.join(","));


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
                console.log("yes");
                $.ajax({
                    url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${selectedRows.join(",")}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    success: function (data,status,xhr) {
                        console.log('sucess ---->' ,xhr);
                        if(xhr.status == 200)
                        {
                            swalWithBootstrapButtons.fire(
                                'Entry Deleted!',
                            ).then(() => {
                                tab.ajax.reload();
                            })
                        }
                        else{

                            $.errorMessage(xhr.responseJSON.message);
                        }
                    },
                    error: function (xhr) {

                        console.log('error ---->' ,xhr);
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

      });


    
    $("#Dtable").on("click", ".delete", function () {

        var raw = $(this).closest("tr").children();

        console.log('raw ---->' ,raw);
        var row = tab.row(raw).data().gateNumber;

        console.log("row data :" ,row);

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
                    url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data,status,xhr) {
                        if(xhr.status == 200)
                        {
                            swalWithBootstrapButtons.fire(
                                'Entry Deleted!',
                            ).then(() => {
                             tab.ajax.reload();
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

})