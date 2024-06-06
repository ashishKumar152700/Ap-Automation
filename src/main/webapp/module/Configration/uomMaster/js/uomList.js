$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    var my_object = []

    var tab = $("#Dtable").DataTable({


        dom: '<"top">ft<"bottom"ilp>',
        ordering: true,
        processing: true,

        ajax: {

            url: `${[test[0].url]}/dualUOM/get`,
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
            { data: "fromUnit" },
            { data: "toUnit" },
            { data: "conversionFactor" },

            
            {
                data: "id", render: function (data, type, row, meta) {

                    return `
                        <div class="btn-group">
                        <button class='btn btn-outline-danger btn-sm delete'>Delete</button>&nbsp;&nbsp;  
                        <button class='btn btn-outline-success btn-sm edit'>Edit</button>&nbsp;&nbsp;
                        <button class='btn btn-outline-primary btn-sm view'>View</button>
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
            { responsivePriority: -2, targets: 2 }
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
                    url: `${[test[0].url]}/dualUOM/delete/${row}`,
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
        console.log(row);
        sessionStorage.setItem('uom_id', JSON.stringify(row))
        window.location.href = `../template/updateUOM.jsp`;
        // $.ajax({
        //     url: `http://192.168.50.81:8080/ap_automation_backend/tax/list?id=${row}`,
        //     dataSrc: "data",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token
        //     },
        //     success: function (data,status,xhr) {
        //         if(xhr.status == 200)
        //         {
        //             console.log(data    );
        //             sessionStorage.setItem('object', JSON.stringify(data.data))
        //         }
        //         else{

        //                 $.errorMessage(xhr.responseJSON.message);
        //         }
                
        //     },
        //     error: function (xhr) {
        //         if(xhr.status == 498)
        //         {
        //             $.tokenError();
        //         }
        //         else if(xhr.status >= 400 && xhr.status < 500){

        //                 $.errorMessage(xhr.responseJSON.message);
        //         }
        //         else{
        //                 $.errorMessage(xhr.responseJSON.error)
        //         }
        //     }
        // })

    })

    $("#Dtable").on("click", ".view", function () {
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        $('#myModal5').modal('show');
        $.ajax({
            url: `${[test[0].url]}/dualUOM/get?id=${row}`,
            dataSrc: "data",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (data,status,xhr) {
                console.log(data);

                if (xhr.status == 200) {
                    uom_detail = data.data[0];
            
                    console.log(uom_detail , "uom_detail");
            
                    call(uom_detail);
                  } else {
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



    function call(uom_detail) {
        for (let i = 0; i < $(".check").length; i++) {
          const element = $(".check")[i];
    
          if (uom_detail[`${$(element).attr("id")}`]) {
            let out = uom_detail[`${$(element).attr("id")}`];
    
            $(element).val(out) || $(element).html(out);
          }
        }
    }
    
    
    $("#myModal5").on('hide.bs.modal' , function(){
        $("#status").children().remove();
    })

  

})