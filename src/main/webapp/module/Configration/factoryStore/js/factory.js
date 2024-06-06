$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

    $(window).load(()=>{
        $("#loader").addClass("sk-loading")
    })

    var tab=$("#Dtable").DataTable({

        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,
        
        ajax: {

            url: `${[test[0].url]}/factoryStore/findcompanystore`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
              complete : ()=>{

                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $("#spin").addClass("d-none")
        

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
            { data: "storeCode" },
            { data: "store_name"},
            { data: "unit_name" },
            {
                data: "id", render: function (data, type, row, meta) {

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
            { responsivePriority: -2, targets: 4 }
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

        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $("#spin").removeClass("d-none")

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
                    url: `${[test[0].url]}/factoryStore/delete/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data,status,xhr) {
                        $("#loader").removeClass("sk-loading")
                        $("#loader").removeClass("ibox-content")
                        $("#spin").addClass("d-none")
                        if(xhr.status == 200)
                        {
                            
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                            ).then(() => {
                                tab.ajax.reload()
                            })
                        }
                        else{

                            $.errorMessage(xhr.responseJSON.message);
                       }
                       
                    },
                    error: function (xhr) {
                        $("#loader").removeClass("sk-loading")
                        $("#loader").removeClass("ibox-content")
                        $("#spin").addClass("d-none")
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

        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $("#spin").removeClass("d-none")

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(row);
        $.ajax({
            url: `${[test[0].url]}/factoryStore/findcompanystore?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status,xhr) {

                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $("#spin").addClass("d-none")

                if(xhr.status == 200)
                {
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updatefactoryStore.jsp`;
                }
                else{

                    $.errorMessage(xhr.responseJSON.message);
               }

            },
            error: function (xhr) {

                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $("#spin").addClass("d-none")
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

        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $("#spin").removeClass("d-none")

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        $('#myModal5').modal('show');
        $.ajax({
            url: `${[test[0].url]}/factoryStore/findcompanystore?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status,xhr) {
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $("#spin").addClass("d-none")
                if(xhr.status == 200)
                {
                    $("#store_code").val(data.data[0].storeCode).css("font-weight", "bold");
                    $("#store_name").val(data.data[0].store_name).css("font-weight", "bold");
                    $("#unitname").val(data.data[0].unit_name).css("font-weight", "bold");
                }
                else{

                    $.errorMessage(xhr.responseJSON.message);
               }
               
               

            },
            error: function (xhr) {
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $("#spin").addClass("d-none")
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
        $("#myModal5").on('hide.bs.modal' , function(){
            $("#status").children().remove();
        })

    })

})