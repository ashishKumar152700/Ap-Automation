$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test();
    var tab=$("#Dtable").DataTable({

        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,
        ajax: {

            url: `${[test[0].url]}/companymaster/companies`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
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
        },
        columns: [
            { data: "id" },
            { data: "unit_name" },
            { data: "name" },
            { data: "state_location" },
            { data: "business_unit" },
            { data: "company" },
            { data: "doc_company" },
            // { data: "gstin" },

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
            { responsivePriority: -2, targets: 7 }
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

    $("#col1_filter").keypress((event)=> {
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
                    url: `${[test[0].url]}/companymaster/delete/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data,status,xhr) {

                        if(xhr.status == 200)
                        {
                            {
                                swalWithBootstrapButtons.fire(
                                    'Entry Deleted!',
                                ).then(() => {
                                    // window.location.reload();
                                })
                            }
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
        console.log(row);

        $.ajax({
            url: `${[test[0].url]}/companymaster/company/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {

                if(xhr.status == 200){
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updateCompany.jsp`;
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
        
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        $('#myModal5').modal('show');
        $.ajax({
            url: `${[test[0].url]}/companymaster/company/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                
                if(xhr.status == 200)
                {
                    $("#unit_name").val(data.data.unit_name).css("font-weight", "bold");
                    $("#name").val(data.data.name).css("font-weight", "bold");
                    $("#state_location").val(data.data.state_location).css("font-weight", "bold");
                    $("#business_unit").val(data.data.business_unit).css("font-weight", "bold");
                    $("#doc_company").val(data.data.doc_company).css("font-weight", "bold");
                    $("#company").val(data.data.company).css("font-weight", "bold");
                    $("#gstin").val(data.data.gstin).css("font-weight", "bold");
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
        $("#myModal5").on('hide.bs.modal' , function(){
            $("#status").children().remove();
        })

    })

})