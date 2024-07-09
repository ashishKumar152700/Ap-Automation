
$(document).ready(() => {


    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test();

    // var data_length , bol_val = false;
    
    
    $(window).load(()=>{
        $("#loader").addClass("sk-loading")

        // let date =  new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // console.log(date);

        // $("#col3_filter").val(date.split("/").join("-"))

        // $("#col2_filter").trigger("change")
        
    
    })
    let status = "Scan";


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
        if (status1 == "Scan") {
            return '<button class="btn btn-sm cancel">Cancel</button>&nbsp;&nbsp;';
        } else {
            return '';
        }
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


    let table_rows = [];
    let count = 0;



    // let detroyTbale = $("#Dtable").DataTable();
    // detroyTbale.destroy();

    var tab = $("#Dtable").DataTable({

        "dom": '<"top"Bf>t<"bottom"ilp>',
        // "fixedHeader": true,

        // "buttons": [
        //     'copyHtml5',
        //     'excelHtml5',
        //     'csvHtml5',
        //     'pdfHtml5'
        // ],
        ordering: false,
        "processing": true,
        "serverSide": true,
        // "fixedHeader": true,
        search: {
            return: true
        },
        
        ajax: {
            url: `${[test[0].url]}/gate/getAll`,
            // "dataSrc": "data.content",
            dataFilter: function(data){

                var json = JSON.parse( data );

                console.log('json ---->' ,json);

                json.recordsTotal = json.data.totalElements;
                json.recordsFiltered = json.data.totalElements;
                data_length = json.data.totalElements

                console.log('data length ---->' , json.data.totalElements);
                json.data = json.data.content;

                console.log(JSON.stringify(this.url));
                // json.pageLength = json.data.numberOfElements

     
                return JSON.stringify( json ); // return JSON string
            },
            data : function(d){
                $("#loader").addClass("sk-loading")
                $("#loader").addClass("ibox-content")
                $(".sk-spinner").removeClass("d-none")

                // console.log(bol_val);
                // console.log(data_length);
                
                d.page = (d.start / d.length);
                // d.size =  bol_val ? data_length : d.length;
                d.size =  d.length;
                d.status ="";
                d.gate =  $('#col1_filter').val()
                // d.transactionType = $('#Transaction').val();
                // d.date =  $('#col3_filter').val()
                d.search = $("input[type='search']").val()
                status = "";


                

                // bol_val = false
                console.log('d ---->' ,d);
                console.log("search" , $('#col1_filter').val());
            },
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            //   success : function(data)
            //   {

            //     console.log("response :" ,data);
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
                
            },
            complete : ()=>{

                
        // $("#col2_filter").trigger("change")
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")

                // if(bol_val || bol_val)
                // {
                //     console.log(tab.rows().data())
                // }

                // bol_val = false

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
                    // console.log(data);

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
            { data: "out_time" },
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
                data: "id", render: function (data, type, row, meta) {

                    return `
            <div class="btn-group">
            ${lock(row)}
            <button class="btn btn-outline-success btn-sm gate_out">Out</button>
            </div>`
                }
            },


           

            
        ],


        columnDefs: [

            {
                "defaultContent": "-",
                "targets": "_all"
            },
            { responsivePriority: -3, targets: 0 },
            { responsivePriority: 1, targets: 5 },
            { responsivePriority: 1, targets: 4 },
            { responsivePriority: -2, targets: 7 },
            { responsivePriority: -2, targets: 8 },
            { responsivePriority: -2, targets: 9 },
            { responsivePriority: -2, targets: 11 },
            { responsivePriority: -2, targets: 12 },
          
        ],

      


        rowCallback: function (row, data, index) {
            var labelColor = ""; // This will store the color value based on the label value
            if(data.is_reserved == "Y")
                {
                    $(row).css("background-color", "lightgray")
                } 
         
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
            $(row).find(".gate_out").css("border-color", labelColor);
            // let back_color = $(row).find(".cancel").css("color");
            
            // $(row).find(".cancel").hover(
            //     function() {
            //       // Code to be executed when the mouse enters the button
            //       $(this).css('background-color', labelColor);
            //       $(this).css('color', "white");
            //     },
            //     function() {
            //       // Code to be executed when the mouse leaves the button
            //       $(this).css('background-color', '');
            //       $(this).css('color', labelColor);
            //     }
            //   );
        }

    });


    // $("#export").click(()=>{

    //     bol_val = true
    //     $('#Dtable').DataTable().draw();
        
    //     // tab.rows().data().map((value)=>{
    //     //     console.log(value);
    //     // })
    // })






  
   

    // console.log(editbutton());

    tab.column(0).visible(false);
    tab.column(1).visible(false);






    

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

    $("#col1_filter").keyup((event)=> {
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

        $('#Dtable').DataTable().column(11).search(
            $('#col' + 2 + '_filter').val(),
            // $('#col' + 2 + '_smart').prop('checked')
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

        
        var code=999;                                                                // target the rows having same id

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(row);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-secondary mx-1'
            },
            buttonsStyling: false
        })


        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Close',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${[test[0].url]}/gate/updateStatus/${row}`,
                    type: "put",
                    dataSrc: "data",
                    data: JSON.stringify({
                        status:{code},
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
                    error:function(xhr){
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


    $("#Dtable").on("click", ".print", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        var row1 = tab.row(raw).data();
        console.log(row);

        $.ajax({
            url: `${[test[0].url]}/gate/getAll?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status, xhr) {
                if(xhr.status == 200)
                {
                    let obj = data.data[0];
    
                    $(".row").hide();
                    $("#hide").hide();
                    $(".handler").hide();
                    $(".row").addClass("vw-100");
                
                    $("#print_invoice_page").removeClass("d-none");
                    $("#print_invoice_page").show();
                    $("#print_invoice_page").children().show();
                    $("#print_invoice_page").children().children().show();
                    $("#print_invoice_page").children().children().children().show();
                
                    $("#modal_gate_id").html(obj.gate_number);
                    $("#modal_vendor_name").html(obj.vendorname);
                    $("#modal_vehicle_no").html(obj.vehicle_nbr);
                    $("#modal_invoice_no").html(obj.invoice_number);
                    $("#receipt_number").html(obj.receipt_number);
                    $("#modal_material_type").html(obj.material_type);
                    $(".detail_po_no").html(obj.po_number);
                    $(".qty_1").html(obj.weight);
                    $(".remark_1").html(obj.remark);
                    $("#modal_user_name").html($(".name")[1].innerText);
                    var currentDate = new Date();
                
                    var formattedDate = currentDate.toLocaleDateString();
                    var formattedTime = currentDate.toLocaleTimeString();
                
                    $("#data_time").html("  " + formattedDate + "   " + formattedTime);
    
    
                    $("#modal_table_details").empty();
    
                    for(let i = 0 ; i < obj.details.length ; i++)
                    {
                        $("#modal_table_details").append(`<tr>
                                    <td class="text-center border py-2 po_1" id="detail_po_no">${obj.po_number}</td>
                                    <td class="text-center border py-2 des_1" id="">${obj.details[i].item_code}</td>
                                    <td class="text-center border py-2 qty_1">${obj.details[i].quantity}</td>
                                    <td class="text-center border py-2 unit_1"></td>
                                    <td class="text-center border py-2 remark_1"></td>
                                  </tr>`);
                        // const element = $(".check")[i];
                        // if (req_body[`${$(element).attr("id")}`]) {
                        //     $(element).val(req_body[`${$(element).attr("id")}`])
                        // }
                      }
    
    
                      options = {
                        bcid: "code128",     // Specify the barcode format (e.g., code128, ean13, etc.)
                        text: obj.gate_number,  // Replace with the actual value you want to encode
                        scale: 2,           // Adjust the barcode size (2 is default)
                      };
              
                       // Generate the barcode
                        bwipjs.toCanvas("barcode", options, function (err, canvas) {
                        if (err) {
                        // Handle error if barcode generation fails
                        console.error(err);
                        } else {
                            // Set the desired width and height for the canvas
                        canvas.style.width = "200px";
                        canvas.style.height = "100px";
                        // Append the generated barcode canvas to the DOM
                        document.body.appendChild(canvas);
                        }
                        });
                    
                
                    window.print();
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



    $("#Dtable").on("click", ".gate_out", function () {


        let raw = $(this).closest("tr").children();
        let row = tab.row(raw).data().gate_number;
        sessionStorage.setItem("gate_number_out" , JSON.stringify(row)) 

        window.open("../../gateOut/template/gateOut.jsp", "_self");


    })



    $(window).on("afterprint", function () {
        $(".row").show();
        $("#hide").show();
        $(".handler").show();
        $(".row").removeClass("vw-100");
        $("#print_invoice").css("display", "none");
      });



    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        var row1 = tab.row(raw).data();
        console.log(row);

        $.ajax({
            url: `${[test[0].url]}/gate/getAll?id=${row}`,
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
        sessionStorage.setItem('object', JSON.stringify(row_data))
        window.open("../template/updateGate2.jsp", "_self")


     
  

    })

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

            $("#col2_filter").val("Scan")
            // $("#col2_filter").trigger("change")


            
        },
        error: function (xhr) {
            console.log('xhr ---->' ,xhr);
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
