$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

    $.fn.DataTable.ext.pager.numbers_length = 5;
    var tab = $("#Dtable").DataTable({

        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,
        ajax: {
            url: `${[test[0].url]}/visitor/get`,
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

            {
                data: `id`, render: function (data, type, row, meta) {

                    return `<input type="checkbox" class="checkbox_val" id=""/>`
                    
                    
                }
            },
            { data: "id" },
            // { data: "labelId" },
            { data: "gate_number" },
            { data: "first_name" },
            { data: "vehicle_number" },
            { data: "in_time" },
            { data: "out_time" },
            


            {
                data: `id`, render: function (data, type, row, meta) {

                    return `
                    <div class="btn-group">
                    <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;  
                    <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
                    <button class='btn btn-outline-success btn-sm view'>View</button>
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
            { responsivePriority: -2, targets: 3 }
        ],

    });
    tab.column(1).visible(false);
   

    
  
    $('#deleteAll').on('click', function() {
        var selectedRows = [];
        $('.checkbox_val:checked').each(function() {
          var row = $(this).closest('tr');
          var rowData = tab.row(row).data().id;
          selectedRows.push(rowData);
        });

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
                $.ajax({
                    url: `${[test[0].url]}/visitor/delete?ids=${selectedRows.join(",")}`,
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

      });


      $("#select_all").click(function (){
        if($(this).prop("checked")){
            $('.checkbox_val').prop("checked", "checked")
        }
        else{
            $('.checkbox_val').removeAttr("checked")

        }
      })


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
                        url: `${[test[0].url]}/visitor/delete?ids=${row}`,
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
            $.ajax({
                url: `${[test[0].url]}/visitor/get?id=${row}`,
                dataSrc: "data",
                headers: {
                    'Authorization': 'Bearer ' + token,
                  },
                success: function (data,status,xhr) {
                    if(xhr.status == 200)
                    {
                        console.log(data);
                        sessionStorage.setItem('object', JSON.stringify(data.data))
                        window.location.href = `../template/updateVisitor.jsp`;
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

        })

        $("#Dtable").on("click", ".view", function () {
            
            var raw = $(this).closest("tr").children();
            var row = tab.row(raw).data().id;
            console.log(row);
            $('#myModal5').modal('show');

            
            $.ajax({
                url: `${[test[0].url]}/visitor/get?id=${row}`,
                dataSrc: "data",
                headers: {
                    'Authorization': 'Bearer ' + token,
                  },
                success: function (data,status,xhr) {
                    if(xhr.status == 200)
                    {
                        $("#gate-in").html() == data.data[0].status ? $("#gate-in").addClass("active") :  $("#gate-out").addClass("active")
    
                        $("#first_name").val(data.data[0].first_name).css("font-weight", "bold");
                        $("#last_name").val(data.data[0].last_name).css("font-weight", "bold");
                        $("#mobile").val(data.data[0].mobile).css("font-weight", "bold");
                        $("#email").val(data.data[0].email).css("font-weight", "bold");
                        $("#in_time").val(data.data[0].in_time).css("font-weight", "bold");
                        $("#out_time").val(data.data[0].out_time).css("font-weight", "bold");
                        $("#vehicle_nbr").val(data.data[0].vehicle_number).css("font-weight", "bold");
                        $("#person_to_meet").val(data.data[0].person_to_meet).css("font-weight", "bold");
                        $("#purpose").val(data.data[0].purpose).css("font-weight", "bold");
                        $("#request").val(data.data[0].request).css("font-weight", "bold");
                        $("#address").val(data.data[0].address).css("font-weight", "bold");
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
                $(".stats").removeClass("active")
            })

        })

    })