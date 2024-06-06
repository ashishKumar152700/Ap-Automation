

    $(document).ready(() => {

        const token = JSON.parse(localStorage.getItem("token"));
        $(window).load(()=>{
            $("#loader").addClass("sk-loading")
        })
        
    var test = $.test()
    var tab;
    $.ajax({
        url : `${[test[0].url]}/menumaster/menus`,
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success : function(data,status,xhr){
            if(xhr.status == 200)
            {
                console.log(data);
                data.data.map(value=>{
                    // if(value.parentId == 0)
                    // {
                        // console.log(value);
                       
                        $("#menu_body").append(`<tr><td>${value.id}</td><td>${value.name}</td><td>${value.assignroles.map(roles =>roles.rolecode)}</td><td><div class="btn-group"><button class='btn btn-outline-success btn-sm edit'>Edit</button></div></td></tr>`)
    
                    // }
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
        },
        complete : ()=>{

            $("#loader").removeClass("sk-loading")
            $("#loader").removeClass("ibox-content")
            $(".sk-spinner").addClass("d-none")

            tab = $("#Dtable").DataTable({
        
                    dom: '<"top">t<"bottom"ip>',
                    // ordering: true,
                    processing : true,
                    columnDefs: [
                                {
                                    "defaultContent": "-",
                                    "targets": "_all" 
                                },
                                { responsivePriority: 1, targets: 0 },
                                { responsivePriority: -2, targets: 2 }
                            ],
                })
                tab.column(0).visible(false);
            }
    })


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


    
    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();

        var row = tab.row(raw).data()[0];

        $.ajax({
            url: `${[test[0].url]}/menumaster/menu/${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer '+ token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    console.log(data.data);
                    sessionStorage.setItem('menuObject', JSON.stringify(data.data))
                    window.location.href = `../template/updateMenu.jsp`;
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

})
