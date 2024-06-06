$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()

    var tab=$("#Dtable").DataTable({

        dom: '<"top">t<"bottom"ilp>',
        ordering: true,
        processing: true,
        
        ajax: {

            url: `${[test[0].url]}/emailConfig/emailConfigs`,
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
            { data: "name" },
            { data: "priority"},
            { data: "connection" },
            { data: "debugging" },
            { data: "smtp_server" },
            { data: "smtp_port" },
            { data: "username" },
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
                    url: `${[test[0].url]}/emailConfig/delete/${row}`,
                    type: "delete",
                    dataSrc: "data",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data,status,xhr) {
                        {
                            if(xhr.status == 200){
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
        })
    })



   


    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        console.log(row);
        $.ajax({
            url: `${[test[0].url]}/emailConfig/emailConfigs/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200){
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updateemailSetup.jsp`;
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



    var fav_language;

    $('input[name="fav_language"]').on('click', function() {
        fav_language = $('input[name="fav_language"]:checked').val()
        // alert(fav_language)
    });



    $("#Dtable").on("click", ".view", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(row);
        $('#myModal5').modal('show');
        $.ajax({
            url: `${[test[0].url]}/emailConfig/emailConfigs/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status,xhr) {
               
                if(xhr.status == 200)
                {
                    $("#name").val(data.data.name).css("font-weight", "bold");
                    $("#priority").val(data.data.priority).css("font-weight", "bold");
                    $("#username").val(data.data.username).css("font-weight", "bold");
                    $("#password").val(data.data.password).css("font-weight", "bold");
                    $("#smtpserver").val(data.data.smtp_server).css("font-weight", "bold");
                    $("#smtpport").val(data.data.smtp_port).css("font-weight", "bold");
                    $("#input-text7").val(data.data.connection).css("font-weight", "bold");
                    $("#input-text8").prop('checked' ,data.data.debugging).css("font-weight", "bold");
    
    
                    let languages = $('input[name="fav_language"]');
    
                    for(let i = 0 ; i < languages.length ; i++)
                    {
                        if(languages[i].value == object.connection)
                        {
                            languages[i].checked = true;
                            break;
                        }
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
        $("#myModal5").on('hide.bs.modal' , function(){
            $("#status").children().remove();
        })

    })

})