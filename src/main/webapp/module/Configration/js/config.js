

$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    $(window).load(()=>{
        $("#loader").addClass("sk-loading")
    })

    var test = $.test()

    var tab = $("#Dtable").DataTable({
        
        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing : true,
        ajax: {
            url: `${[test[0].url]}/configmaster/configs`,
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
            },
            complete : ()=>{
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
            },
        },
        
        columns: [
            { data: "id" },
            { data: "url" },
            { data: "env" },
            { data: "type" },
            { data: "url_active" },
            // { data: "username" },


            // { data: "password" },
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
            { responsivePriority: -1, targets: 5 }
        ],
        
    });

    tab.column(0).visible(false);
    // tab.column(2).visible(false);


    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });


    $("#search").click(() => {
        $('#Dtable').DataTable().column(2).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    })

    $("#col1_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            $('#Dtable').DataTable().column(2).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });


    $("#searchName").click(() => {
        $('#Dtable').DataTable().column(3).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })

    $("#col2_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            $('#Dtable').DataTable().column(3).search(
                $('#col' + 2 + '_filter').val(),
                $('#col' + 2 + '_smart').prop('checked')
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
                    url: `${[test[0].url]}/configmaster/deleteconfig/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer '+ token,
                      },
                    success: function (data,status,xhr) {
                        if(xhr.status == 200)
                        {
                              window.location.reload();

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
            url: `${[test[0].url]}/configmaster/configs/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status, xhr) {
                if(xhr.status == 200)
                {
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updateConfig.jsp`;
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
        $('#myModal5').modal('show');


        $.ajax({
            url: `${[test[0].url]}/configmaster/configs/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    $("#url").val(data.data.url).css("font-weight" , "bold");
                    $("#user").val(data.data.username).css("font-weight" , "bold");
                    $("#jdePassword").val(data.data.password).css("font-weight" , "bold");
    
                    $("#env").val(data.data.env).css("font-weight" , "bold");
                    $("#type").val(data.data.type).css("font-weight" , "bold");
                    $("#urlactive").val(data.data.url_active).css("font-weight" , "bold");
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
       
    // $("#myModal5").on('hide.bs.modal' , function(){
    //     $("#countries").children().remove();
    }
    )
    
})

