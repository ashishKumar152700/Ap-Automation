
$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    
    
    $(window).load(()=>{
        $("#loader").addClass("sk-loading")

        // let date =  new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // console.log(date);

        // $("#col3_filter").val(date.split("/").join("-"))

        // $("#col3_filter").trigger("change")
    
    })

    let status = "Unload";

    $("#calendar").click(()=>{

        $('#col3_filter').datepicker('show');

    })
    $('#col3_filter').datepicker({
      dateFormat: 'dd-mm-yy' // Set your desired date format here
    });


    var status1;
    function editbutton() {
        if (status1 == "Scan") {
            return '<button class="btn btn-outline-success btn-sm edit">Edit</button>&nbsp;&nbsp;';
        } else {
            return '<button class="btn btn-outline-success btn-sm" disabled>Edit</button>&nbsp;&nbsp;';
        }
    }
    function cancelbutton() {
        return '<button class="btn btn-sm cancel">Message</button>&nbsp;&nbsp;';
    }
    function gateNumber(data) {

            return `
                    <div class="btn-group">
                    <button class="btn gate_number">${data}</button>&nbsp;  
                    </div>`
    }

    function lock(row){

        if (row.is_reserved == "Y") {
            return '<button class="btn lock"><i class="fa fa-lock"></i></button>&nbsp;&nbsp'
        } else {
            return '<button class="btn"><i class="fa fa-unlock"></i></button>&nbsp;&nbsp'
        }

    }


    var tab = $("#Dtable").DataTable({

        dom: '<"top"f>t<"bottom"ilp>',
        ordering: false,
        "processing": true,
        "serverSide": true,
        search: {
            return: true
        },
        ajax: {
            url: `${[test[0].url]}/gate/getAll`,
            dataFilter: function(data){

                var json = JSON.parse( data );

                console.log('json ---->' ,json);

                json.recordsTotal = json.data.totalElements;
                json.recordsFiltered = json.data.totalElements;
                json.data = json.data.content;

                console.log(this);
                // json.pageLength = json.data.numberOfElements

     
                return JSON.stringify( json ); // return JSON string
            },
            data : function(d){
                $("#loader").addClass("sk-loading")
                $("#loader").addClass("ibox-content")
                $(".sk-spinner").removeClass("d-none")
                // d.search.regex = true
                console.log('d ---->' ,d);

                d.page = (d.start / d.length);
                d.size = d.length;
                d.status =  status || $('#col2_filter').val();
                d.gate =  $('#col1_filter').val()
                d.transactionType = $('#Transaction').val();
                d.date =  $('#col3_filter').val()
                d.search = $("input[type='search']").val()

                status = ""
            },
            headers: {
                'Authorization': 'Bearer ' + token,
              },
              error: function (xhr) {
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
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
            }
        },



        columns: [
            { data: "id" },
            {
                data: "status.label", render: function (data, type, row, meta) {

                    status1 = data;
                }
            },
            {
                data: "gate_number", render: function (data, type, row, meta) {

                    return gateNumber(data)
                }
            },
            { data: "vendor_code" },
            { data: "vendorname" },
            { data: "invoice_number" },
            { data: "vehicle_nbr" },
            { data: "createdAt" },
            { data: "in_time" },
            { data: "transactionType" },
            {
                data: "status.label", render: function (data, type, row, meta) {
                    // status1 = data;
                    // alert(data.status)
                    // console.log("status :" , data);
                    if (data == "Scan") {

                        return `
            <div class="btn-group">
                <div class="label label-primary">${data}</div>&nbsp;  
            </div>`
                    }
                    else if (data == "Store") {
                        return `
            <div class="btn-group">
            <div class="label label-info">${data}</div>&nbsp
            </div>`
                    }
                    else if (data == "Quality") {
                        return `
            <div class="btn-group">
            <div class="label label-warning">${data}</div>&nbsp  
            </div>`
                    }
                    else if (data == "Finance") {
                        return `
            <div class="btn-group">
            <div class="label label-success">${data}</div>&nbsp  
            </div>`
                    }
                    else if (data == "Vouchered") {
                        return `
            <div class="btn-group">
            <div class="label label-infoo">${data}</div>&nbsp  
            </div>`
                    }
                    else if (data == "Canceled") {
                        return `
            <div class="btn-group">
            <div class="label label-danger">${data}</div>&nbsp  
            </div>`
                    }
                    else if (data == "Flaw-Fix") {
                        return `
            <div class="btn-group">
            <div class="label label-danger">${data}</div>&nbsp  
            </div>`
                    }
                    else if (data == "Unload") {
                        return `
            <div class="btn-group">
            <div class="label label-warningg">${data}</div>&nbsp  
            </div>`
                    }
                }
            },
            {
                data: "error_message", render: function (data, type, row, meta) {

                    return `
            <div class="btn-group"> 
            ${lock(row)}
            ${cancelbutton()}
            </div>`
                }
            },
        ],

        columnDefs: [
            {
                "defaultContent": "-",
                "targets": "_all"
            },
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: -2, targets: 10 },
            { responsivePriority: -2, targets: 11 },
            { responsivePriority: -2, targets: 9 },
            { responsivePriority: -2, targets: 8 }
        ],

        rowCallback: function (row, data, index) {
            var labelColor = ""; // This will store the color value based on the label value
            
            if(data.is_reserved == "Y")
            {
                $(row).css("background-color", "lightgray")
            } 
            
            // Map the label value to the corresponding color value
            switch (data.status.label) {
              case "Scan":
                labelColor = "#007bff"; // done
                break;
              case "Store":
                labelColor = "#FF7900"; // done
                break;
              case "Quality":
                labelColor = "#728C00"; // done
                break;
              case "Finance":
                labelColor = "#046307"; // done
                break;
              case "Vouchered":
                labelColor = "#4B0082";
                break;
              case "Canceled": 
              labelColor  = '#dc3545'; // done
                break;
              case "Flaw-Fix":
                labelColor = '#dc3545'; // done
              break;
              case "Unload":
                labelColor = "#D2691E"; // done
                break;
              default:
                labelColor = "#333"; // Default color for other labels
            }
        
            // Apply the labelColor to the row text
            $(row).find("td").css("color", labelColor);
            $(row).find("button").css("color", labelColor);
            $(row).find(".cancel").css("border-color", labelColor);
            let back_color = $(row).find(".cancel").css("color");
            
            $(row).find(".cancel").hover(
                function() {
                  // Code to be executed when the mouse enters the button
                  $(this).css('background-color', labelColor);
                  $(this).css('color', "white");
                },
                function() {
                  // Code to be executed when the mouse leaves the button
                  $(this).css('background-color', '');
                  $(this).css('color', labelColor);
                }
              );

        }

    });

    // console.log(editbutton());

    tab.column(0).visible(false);
    tab.column(1).visible(false); 
    // $('#Dtable').DataTable().order([2, 'desc']).draw()


    $("#Transaction").trigger("change")
    $("#col1_filter").trigger("change")
    $("#col2_filter").trigger("change")
    $("#col3_filter").trigger("change")


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

    $("input[type='search']").keyup((event)=> {
        console.log('change');
        if (event.keyCode === 13) {
            console.log('change trigger');
            // $("input[type='search']").val() = ""
            $('#Dtable').DataTable().column(2).search(
                $("input[type='search']").val(),
                // $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });

    $("#col2_filter").change(() => {

        $('#Dtable').DataTable().column(10).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })
    $("#Transaction").change(() => {

        $('#Dtable').DataTable().column(9).search(
            $('#Transaction').val()
            // $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })
    $("#col3_filter").change(() => {
        $('#Dtable').DataTable().column(7).search(
            $('#col' + 3 + '_filter').val(),
            $('#col' + 3 + '_smart').prop('checked')
        ).draw();
    })



    $("#Dtable").on("click", ".cancel", function () {

        
        var code=999;

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().error_message;
        console.log(row);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-secondary mx-1'
            },
            buttonsStyling: false
        })


        swalWithBootstrapButtons.fire({
            title: `${row}`,
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Close',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // $.ajax({
                //     url: `${[test[0].url]}/gate/updateStatus/${row}`,
                //     type: "put",
                //     dataSrc: "data",
                //     data: JSON.stringify({
                //         status:{code},
                //     }),
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     success: function (data) {
                //         window.location.reload();
                //     },
                //     error:function(xhr){
                //         console.log(xhr);
                //     }

                // })
            }
        })
    })




    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        var row1 = tab.row(raw).data();
        console.log(row);

        $.ajax({
            url: `${[test[0].url]}/gate/get?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    // console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/updateGate.jsp`;
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

        $.ajax({
            url: `${[test[0].url]}/gate/get?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    console.log(data);
                    sessionStorage.setItem('object', JSON.stringify(data.data))
                    window.location.href = `../template/view.jsp`;
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


    $("#Dtable").on("click", ".lock", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().gate_number;
        var row_data = tab.row(raw).data()
        console.log("row id :" , row);
        row_data.is_reserved = "N"
        console.log("row_data : ", row_data.is_reserved);

        
                $.ajax({
                    url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${row}&username=${$(".name")[1].innerText}`,
                    type: "delete",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token,
                    },
                    success: function (data,status,xhr) {
                        console.log(data);
                        console.log(xhr);
                        if(xhr.status == 200)
                        {
                            tab.ajax.reload();
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


    $("#Dtable").on("click", ".gate_number", function () {

        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $(".sk-spinner").removeClass("d-none")

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().status.label;
        var row_data = tab.row(raw).data();
        var gateid = tab.row(raw).data().id;
        var gate_number = tab.row(raw).data().gate_number;

        console.log(row);


        if(row == "Unload")
        {
            
        

        $.ajax({
            url: `${[test[0].url]}/reservationMaster/add`,
            type: "post",
            data : JSON.stringify({
                username : $(".name")[1].innerText,
                gateNumber : gate_number
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
            success: function (data,status,xhr) {
                console.log(data);
                console.log(xhr);
                if(xhr.status == 200)
                {
                    $("#loader").removeClass("sk-loading")
                    $("#loader").removeClass("ibox-content")
                    $(".sk-spinner").addClass("d-none")

                if(row == "Unload")
                {
                    sessionStorage.setItem('object', JSON.stringify(row_data))
                    window.open("../template/exceptionHandle.jsp", "_self")
                }
                else{
                    sessionStorage.setItem('gateid', JSON.stringify(gateid))
                    sessionStorage.setItem('gateno', JSON.stringify(gate_number))
                    console.log(gate_number);
                console.log(row);
                    window.open("../template/view.jsp", "_self")
                }
                    // tab.ajax.reload();                            // window.location.reload();
                }
                else{
                        $.errorMessage(data.message);
                        $("#loader").removeClass("sk-loading")
                        $("#loader").removeClass("ibox-content")
                        $(".sk-spinner").addClass("d-none")

                }
            },
            error: function (xhr) {
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")

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
        else{

            $("#loader").removeClass("sk-loading")
            $("#loader").removeClass("ibox-content")
            $(".sk-spinner").addClass("d-none")

            
            sessionStorage.setItem('gateid', JSON.stringify(gateid))
            sessionStorage.setItem('gateno', JSON.stringify(gate_number))
            console.log(gate_number);
        console.log(row);
            window.open("../template/view.jsp", "_self")
        }

    })

    // $("#Dtable").on("click", ".gate_number", function () {

    //     var raw = $(this).closest("tr").children();
    //     var row = tab.row(raw).data().status.label;
    //     var row_data = tab.row(raw).data();
    //     var gateid = tab.row(raw).data().id;
    //     var gate_number = tab.row(raw).data().gate_number;
    //     console.log(row);

    //     if(row == "Unload")
    //     {
    //         sessionStorage.setItem('object', JSON.stringify(row_data))
    //         window.open("../template/exceptionHandle.jsp", "_self")
    //     }
    //     else{
    //         sessionStorage.setItem('gateid', JSON.stringify(gateid))
    //         sessionStorage.setItem('gateno', JSON.stringify(gate_number))
    //         console.log(gate_number);
    //     console.log(row);
    //         window.open("../template/view.jsp", "_self")
    //     }



    //     // sessionStorage.setItem('gateid', JSON.stringify(row))
    //     // sessionStorage.setItem('gateno', JSON.stringify(gate_number))

    //     // window.open("../template/addGateInvoice.jsp", "_self")

    // })

    $.ajax({
        url:   `${[test[0].url]}/status/get`,
        // async: false,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success: function (data,status,xhr) {
            if(xhr.status == 200)
            {
                for (let i = 0; i < data.data.length; i++) {
                    // console.log();
                    // console.log(data.data[i].code);
                    // console.log(data.data[i].label);
    
                    $b = $(`<option value="${data.data[i].label}">${data.data[i].label}</option>`);
                    $("#col2_filter").append($b);
                }
            }
            else{

                    $.errorMessage(xhr.responseJSON.message);
            }



        },
        complete : ()=>{
            $("#col2_filter").val("Unload")
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
    });


    $("#myModal5").on('hide.bs.modal', function () {
        $("#countries").children().remove();
    })




    $("#add_user").click(() => {
        window.open("adduser.jsp", "_self");
    })
})
