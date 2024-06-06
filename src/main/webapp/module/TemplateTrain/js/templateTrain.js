




$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    let user_store = JSON.parse(localStorage.getItem("store"));
    var test = $.test();
   
   
    $(window).load(()=>{
        $("#loader").addClass("sk-loading")

        // let date =  new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // console.log(date);

        // $("#col3_filter").val(date.split("/").join("-"))

        // $("#col3_filter").trigger("change")
    
    })

    let status = "Vouchered";

    $("#calendar").click(()=>{

            $('#col3_filter').datepicker('show');

        })
        $('#col3_filter').datepicker({
          dateFormat: 'dd-mm-yy' // Set your desired date format here
        });

        


    var status1;
    function editbutton() {
        if (status1 == "Vouchered") {
            return '<button class="btn btn-outline-success btn-sm edit">Edit</button>&nbsp;&nbsp;';
        } else {
            return '<button class="btn btn-outline-success btn-sm" disabled>Edit</button>&nbsp;&nbsp;';
        }
    }

    function cancelbutton() {
        if (status1 == "Vouchered") {
            return '<button class="btn btn-sm delete">Cancel</button>&nbsp;&nbsp;';
        } else {
            return '<button class="btn btn-sm delete" disabled>Cancel</button>&nbsp;&nbsp;';
        }
    }
    function gateNumber(data) {

        if (status1 == "Vouchered") {
            // console.log(status1);
            // console.log(data);
            return `
                    <div class="btn-group">
                    <button class="btn gate_number" >${data}</button>&nbsp;  
                    </div>`
        } else {
            return `
                    <div class="btn-group">
                    <button class="btn gate_number">${data}</button>&nbsp;  
                    </div>`
        }
    }

    function lock(row){

        if (row.is_reserved == "Y") {
            return '<button class="btn lock"><i class="fa fa-lock"></i></button>';
        } else {
            return '<button class="btn"><i class="fa fa-unlock"></i></button>';
        }

    }





    var tab = $("#Dtable").DataTable({

        dom: '<"top"f>t<"bottom"ilp>',
        // ordering: true,
        "processing": true,
        // "serverSide": true,
        ajax: {
            url: `${[test[0].url]}/gate/template/status`,
            
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            //   success : function(data, status, xhr){
            //     console.log(data);
            //   },
              error: function (xhr) {

                console.log(xhr);
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

            { data: "vendorName" },
            { data: "vendorCode" },
            { data: "invoiceCount" },
            { data: "templateAvailable" },
            
        ],

        columnDefs: [
            {
                "defaultContent": "-",
                "targets": "_all"
            },
            // { responsivePriority: 1, targets: 0 },
            // { responsivePriority: -2, targets: 10 },
            // { responsivePriority: -2, targets: 11 },
            // { responsivePriority: -2, targets: 12 },
            // { responsivePriority: -2, targets: 9 },
            // { responsivePriority: -2, targets: 7 }
        ],

          
        // rowCallback: function (row, data, index) {

        //     var labelColor = ""; // This will store the color value based on the label value
        
        //     // console.log("row : ", $(row));
        //     if(data.is_reserved == "Y")
        //     {
        //         $(row).css("background-color", "lightgray")
        //         // $(row).find(".gate_number").attr("disabled" , "disabled")

        //     } 

        //     // Map the label value to the corresponding color value

        //     switch (data.status.label) {
        //       case "Scan":
        //         labelColor = "#007bff"; // Blue color
        //         break;
        //       case "Store":
        //         labelColor = "#17a2b8"; // Gray color
        //         break;
        //       case "Quality":
        //         labelColor = "#28a745"; // Green color
        //         break;
        //       case "Finance":
        //         labelColor = "#ffc107"; // Yellow color
        //         break;
        //       case "Vouchered":
        //         labelColor = "#17a2b8"; // Cyan color
        //         break;
        //       case "Canceled": 
        //       labelColor  = '#dc3545';
        //         break;
        //       case "Error":
        //         labelColor = '#dc3545';
        //       break;
        //       case "Unload":
        //         labelColor = "#f0932b"; // 
        //         break;
        //       default:
        //         labelColor = "#333"; // Default color for other labels
        //     }
        
        //     // Apply the labelColor to the row text
        //     $(row).find("td").css("color", labelColor);
        //     $(row).find("button").css("color", labelColor);
        //     $(row).find(".delete").css("border-color", labelColor);
        //     let back_color = $(row).find(".delete").css("color");
            
        //     $(row).find(".delete").hover(
        //         function() {
        //           // Code to be executed when the mouse enters the button
        //           $(this).css('background-color', labelColor);
        //           $(this).css('color', "white");
        //         },
        //         function() {
        //           // Code to be executed when the mouse leaves the button
        //           $(this).css('background-color', '');
        //           $(this).css('color', labelColor);
        //         }
        //       );


        //     },
          

    });

    // $('.excel').on('click', function () {
    //     var myexcel = [];
    
    //     let table_rows = tab.rows().data()  
    //     table_rows.each(function (value) {

    //         // console.log(index);
    //         // var statusText = $(this).find('.label.label-primary').text().trim();
            
    //         // if (statusText === '') {
    //         //     statusText = $(this).find('td:nth-child(10)').text().trim();
    //         // }

            
    //         var exceldata = {
    //             // gateNumber: $(this).find('.gate_number').text(),
    //             vendorName: value.vendorName,
    //             vendorCode: value.vendorCode,
    //             TemplateTrain: value.templateAvailable,
    //         };
    
    //         myexcel.push(exceldata);
    //     });
    //     console.log(myexcel)
    
    //     var csv = "VendorName,VendorCode,TemplateAvailable\n";
    //     myexcel.forEach(function (row) {
    //         csv += `${row.vendorName},${row.vendorCode},${row.TemplateTrain}\n`;
    //     });
    
    //     var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    
    //     saveAs(blob, `${$(".name")[1].innerText}.csv`);
    // } );






    $('.excel').on('click', function () {
        var myexcel = [];

        let filter_val = $("#col2_filter").val();
    
        let table_rows = tab.rows().data().filter((value)=> {
            
            if(filter_val != '')
            {
                return value.templateAvailable == $("#col2_filter").val()
            }
            if(filter_val == ''){
                return value.templateAvailable
            }

        }
        );
        // console.log(' table rows    ---->' ,table_rows);
        table_rows.each(function (value) {
            var exceldata = {
                vendorName: value.vendorName,
                vendorCode: value.vendorCode,
                IvoiceCount : value.invoiceCount,
                TemplateTrain: value.templateAvailable,
            };
    
            myexcel.push(exceldata);
        });

        console.log(myexcel);

        const formattedDate = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).replace(/\s/g, '').split(",").join("_");
    
        var ws = XLSX.utils.json_to_sheet(myexcel);


    
        // Autofit columns
        var colWidths = myexcel.map(row => Object.values(row).map(String).map(value => value.length));
        var maxLengths = colWidths.reduce((acc, val) => val.map((v, i) => Math.max(v, acc[i])), Array(colWidths[0].length).fill(0));
        ws['!cols'] = maxLengths.map(width => ({ width: width + 2 })); // Add some extra padding
    
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
        // Use XLSX.write to generate the Excel file as a string
        var excelDataString = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    
        // Convert the string to a Blob
        var blob = new Blob([s2ab(excelDataString)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        saveAs(blob, `Template_info_${formattedDate}.xlsx`);
    });
    
    // Helper function to convert string to ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    

    


    

    // tab.column(0).visible(false);
    // tab.column(1).visible(false);
    // $('#Dtable').DataTable().order([2, 'desc']).draw()



    user_store.map((value)=>{

        $("#col4_filter").append(`<option value="${value}">${value}</option>`)
        
    })



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
            $('#Dtable').DataTable().column(0).search(
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
        $('#Dtable').DataTable().column(3).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })
    
    $("#col3_filter").change(() => {
        $('#Dtable').DataTable().column(7).search(
            $('#col' + 3 + '_filter').val(),
            $('#col' + 3 + '_smart').prop('checked')
        ).draw();
    })
    $("#col4_filter").change(() => {
        $('#Dtable').DataTable().column(10).search(
            $('#col' + 4 + '_filter').val().split("-").reverse().join("-"),
            $('#col' + 4 + '_smart').prop('checked')
        ).draw();
    })

    $("#Transaction").change(() => {

        $('#Dtable').DataTable().column(9).search(
            $('#Transaction').val()
            // $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })

    $("#col3_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            $('#Dtable').DataTable().column(5).search(
                $('#col' + 3 + '_filter').val(),
                $('#col' + 3 + '_smart').prop('checked')
            ).draw();
        }
    });


    $("#Dtable").on("click", ".delete", function () {


        var code = 100;

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
            confirmButtonText: 'cancel',
            cancelButtonText: 'Ignore',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${[test[0].url]}/gate/updateStatus/${row}`,
                    type: "put",
                    dataSrc: "data",
                    data: JSON.stringify({
                        status: { code },
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token,
                    },
                    success: function (data,status,xhr) {

                        console.log(data);
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
                            tab.ajax.reload();                            // window.location.reload();
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











    $("#Dtable").on("click", ".edit", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        $.ajax({
            url: `${[test[0].url]}/gate/getAll?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    sessionStorage.setItem('object2', JSON.stringify(data.data))
                    window.location.href = `../template/updateGateInvoice.jsp`;
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

    // $("#Dtable").on("click", ".view", function () {

    //     var [test[0].url] = $.[test[0].url]()
    //     var raw = $(this).closest("tr").children();
    //     var row = tab.row(raw).data().id;
    //     console.log(row);

    //     $.ajax({
    //         url: `${[test[0].url]}/gate/get/${row}`,
    //         dataSrc: "data",
    //         success: function (data) {
    //             console.log(data);
    //             // sessionStorage.setItem('object', JSON.stringify(data.data))
    //             // window.location.href = `../template/view.jsp`;
    //         }
    //     })

    // })



    






    $("#Dtable").on("click", ".gate_number", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        var row_data = tab.row(raw).data()
        var label = tab.row(raw).data().status.label;
        var trans_type = tab.row(raw).data().transactionType;
        var gate_number = tab.row(raw).data().gate_number;
        console.log(label);
        console.log(trans_type);
        $("#loader").addClass("sk-loading")
        $("#loader").addClass("ibox-content")
        $(".sk-spinner").removeClass("d-none")

        if(label == "Vouchered" && trans_type == "Credit_Note")
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

                if(label == "Vouchered" && trans_type != "Service_PO" && trans_type != "Credit_Note" && trans_type != "ServiceWithMaterial")
                {
                    sessionStorage.setItem('gateid', JSON.stringify(row))
                    sessionStorage.setItem('gateno', JSON.stringify(gate_number))
                    sessionStorage.setItem('object', JSON.stringify(row_data))
                    console.log(gate_number);
                    console.log(row);

                        // alert("update")
                        window.open("../template/viewVoucher.jsp", "_self")
                        }
                else{
                    sessionStorage.setItem('gateid', JSON.stringify(row))
                    sessionStorage.setItem('gateno', JSON.stringify(gate_number))
                    console.log(gate_number);
                    console.log(row);

                    // alert("view")
                window.open("../template/viewVoucher.jsp", "_self")
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
            
            sessionStorage.setItem('gateid', JSON.stringify(row))
            sessionStorage.setItem('gateno', JSON.stringify(gate_number))
            console.log(gate_number);
            console.log(row);

            // alert("view")
        window.open("../template/viewVoucher.jsp", "_self")
        }

        


    })


    // $.ajax({
    //     url: `${[test[0].url]}/status/get`,
    //     type: "GET",
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //       },
    //     success: function (data,status,xhr) {
    //         if(xhr.status == 200)
    //         {
    //             for (let i = 0; i < data.data.length; i++) {
    //                 $b = $(`<option value="${data.data[i].label}">${data.data[i].label}</option>`);
    //                 $("#col2_filter").append($b);
    //             }
    //         }
    //         else{

    //                 $.errorMessage(xhr.responseJSON.message);
    //         }
           
            
    //     },
    //     complete : ()=>{
    //         $("#col2_filter").val("Vouchered")
    //     },
    //     error: function (xhr) {
    //         if(xhr.status == 498)
    //         {
    //             $.tokenError();
    //         }
    //         else if(xhr.status >= 400 && xhr.status < 500){

    //             $.errorMessage(xhr.responseJSON.message);
    //       }
    //       else{
    //             $.errorMessage(xhr.responseJSON.error)
    //       }
    //     }
    // })


    // $("#Dtable").on("click", ".view", function () {
    //     var [test[0].url] = $.[test[0].url]()
    //     var raw = $(this).closest("tr").children();
    //     var row = tab.row(raw).data().id;
    //     $('#myModal5').modal('show');

    //     $.ajax({
    //         url: `${[test[0].url]}/gate/get/${row}`,
    //         dataSrc: "data",
    //         success: function (data) {

    //             console.log(data.data.details.length);
    //             $("#billto_name").val(data.data.billto_name).css("font-weight", "bold");
    //             $("#billto_address1").val(data.data.billto_address1).css("font-weight", "bold");
    //             $("#billto_address2").val(data.data.billto_address2).css("font-weight", "bold");
    //             $("#billto_address3").val(data.data.billto_address3).css("font-weight", "bold");
    //             $("#billto_gstin").val(data.data.billto_gstin).css("font-weight", "bold");
    //             $("#billto_city").val(data.data.billto_city).css("font-weight", "bold");
    //             $("#billto_state").val(data.data.billto_state).css("font-weight", "bold");
    //             $("#billto_zipcode").val(data.data.billto_zipcode).css("font-weight", "bold");

    //             $("#shipto_name").val(data.data.shipto_name).css("font-weight", "bold");
    //             $("#shipto_address1").val(data.data.shipto_address1).css("font-weight", "bold");
    //             $("#shipto_address2").val(data.data.shipto_address2).css("font-weight", "bold");
    //             $("#shipto_address3").val(data.data.shipto_address3).css("font-weight", "bold");
    //             $("#shipto_gstin").val(data.data.shipto_gstin).css("font-weight", "bold");
    //             $("#shipto_city").val(data.data.shipto_city).css("font-weight", "bold");
    //             $("#shipto_state").val(data.data.shipto_state).css("font-weight", "bold");
    //             $("#shipto_zipcode").val(data.data.shipto_zipcode).css("font-weight", "bold");

    //             $("#supplier_invoice_nbr").val(data.data.supplier_invoice_nbr).css("font-weight", "bold");
    //             $("#supplier_date").val(data.data.supplier_date).css("font-weight", "bold");
    //             $("#supplier_order_nbr").val(data.data.supplier_order_nbr).css("font-weight", "bold");
    //             $("#supplier_vehicle_nbr").val(data.data.supplier_vehicle_nbr).css("font-weight", "bold");
    //             $("#supplier_order_date").val(data.data.supplier_order_date).css("font-weight", "bold");
    //             $("#supplier_supply_place").val(data.data.supplier_supply_place).css("font-weight", "bold");
    //             $("#supplier_supply_date").val(data.data.supplier_supply_date).css("font-weight", "bold");
    //             $("#supplier_supply_time").val(data.data.supplier_supply_time).css("font-weight", "bold");
    //             $("#supplier_despatch_mode").val(data.data.supplier_despatch_mode).css("font-weight", "bold");

    //             $("#gate_id").val(data.data.gate_id).css("font-weight", "bold");
    //             $("#status").val(data.data.status).css("font-weight", "bold");
    //             $("#vehicle_nbr").val(data.data.vehicle_nbr).css("font-weight", "bold");
    //             $("#material_type").val(data.data.material_type).css("font-weight", "bold");
    //             $("#weight").val(data.data.weight).css("font-weight", "bold");
    //             $("#in_time").val(data.data.in_time).css("font-weight", "bold");
    //             $("#out_time").val(data.data.out_time).css("font-weight", "bold");
    //             $("#devision").val(data.data.devision).css("font-weight", "bold");
    //             $("#remark").val(data.data.remark).css("font-weight", "bold");
    //             $("#queue_id").val(data.data.queue_id).css("font-weight", "bold");

    //             // console.log(data.data.details.length);

    //             for (let i = 0; i < data.data.details.length - 1; i++) {
    //                 $("#add_row").trigger("click");
    //             }

    //             for (let i = 0; i < data.data.details.length; i++) {
    //                 let line_number = $(".line_num")[i];
    //                 let status = $(".details_status")[i];
    //                 let gate_id = $(".details_gate_id")[i];
    //                 let item_code = $(".item_code")[i];
    //                 let hsn_code = $(".hsn_code")[i];
    //                 let quantity = $(".quantity")[i];
    //                 let uom = $(".uom")[i];
    //                 let rate = $(".rate")[i];
    //                 let amount = $(".amount")[i];


    //                 $(line_number).val(data.data.details[i].line_number);
    //                 $(status).val(data.data.details[i].status);
    //                 $(gate_id).val(data.data.details[i].gate_id);
    //                 $(item_code).val(data.data.details[i].item_code);
    //                 $(hsn_code).val(data.data.details[i].hsn_code);
    //                 $(quantity).val(data.data.details[i].quantity);
    //                 $(uom).val(data.data.details[i].uom);
    //                 $(rate).val(data.data.details[i].rate);
    //                 $(amount).val(data.data.details[i].amount);


    //             }

    //             $("#myModal5").on('hide.bs.modal', function () {
    //                 for (let i = 0; i < data.data.details.length - 1; i++) {
    //                     $("#delete_row").trigger("click");
    //                 }
    //             })
    //         }
    //     })

    // })

})
