$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    // Initialization and setup

    // Get the test variable using jQuery's test() function
    var test = $.test()

    // Function to populate the "to_status" dropdown based on the selected "from_status"
    function toStatus(fromstatus) {
        $.ajax({
            url: `${[test[0].url]}/status/get`,
            type: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {

                    $("#to_status").children().remove();
                    if (fromstatus == 1000) {
                        for (let i = 0; i < data.data.length; i++) {
                            if (data.data[i].code == 999 || data.data[i].code == 200 || data.data[i].code == 150 || data.data[i].code == 100) {
                                // Add an option to the "to_status" dropdown for code 999
                                $b = $(`<option value="${data.data[i].code}">${data.data[i].label}</option>`);
                                $("#to_status").append($b);
                            }
                        }
                    } else {
                        for (let i = 0; i < data.data.length; i++) {
                            console.log(data.data[i].code);
                            console.log("fromstatus", fromstatus);
                            if (data.data[i].code == 999) {
                                // Add an option to the "to_status" dropdown for code 999
                                $b = $(`<option value="${data.data[i].code}">${data.data[i].label}</option>`);
                                $("#to_status").append($b);
                            }
                            if (data.data[i].code == 1000) {
                                // Add an option to the "to_status" dropdown for code 999
                                $b = $(`<option value="${data.data[i].code}">${data.data[i].label}</option>`);
                                $("#to_status").append($b);
                            }
                            if (fromstatus > data.data[i].code) {
                                if (data.data[i].code != 999) {
                                    $b = $(`<option value="${data.data[i].code}">${data.data[i].label}</option>`);
                                    $("#to_status").append($b);
                                }
                                // Add an option to the "to_status" dropdown for codes less than the selected "from_status"
                            }
                            if (fromstatus == 999) {
                                // If "from_status" is 999, remove all options from the "to_status" dropdown
                                $("#to_status").children().remove();
                            }
                        }
                    }
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
        });
    }

    // Event handler for the "view" button click
    $("#Dtable").on("click", ".view", function () {

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        console.log(row);
        $('#myModal5').modal('show');
        $.ajax({
            url: `${[test[0].url]}/gate/getAll?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    console.log(data.data[0].gate_number);
                    console.log(row);
                    $("#row_id").val(row).css("font-weight", "bold");
                    $("#from_status").val(data.data[0].status.label).css("font-weight", "bold");
                    $("#gateid").html(data.data[0].gate_number).css("font-weight", "bold");
                    toStatus(data.data[0].status.code);
                    $("#to_status").val(data.data[0].mcu).css("font-weight", "bold");
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
        });
        $("#myModal5").on('hide.bs.modal', function () {
            $("#status").children().remove();
        });
    });

    // Event handler for the "change_status" button click
    $("#change_status").click((e) => {

        var gate_id = +($("#row_id").val());
        var code = $("#to_status").val();

        $.ajax({
            url: `${[test[0].url]}/gate/updateStatus/${gate_id}`,
            type: "PUT",
            data: JSON.stringify({
                status: { code },
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
            success: function (data, status, xhr) {
                if (xhr.status == 200) {
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
        });
    });

    // Function to generate the HTML for the "gate_number" column
    function gateNumber(data) {
        if (status1 == "Verification") {
            return `
                <div class="btn-group">
                <button class="btn gate_number">${data}</button>&nbsp;  
                </div>`;
        } else {
            return `
                <div class="btn-group">
                <button class="btn gate_number" disabled>${data}</button>&nbsp;  
                </div>`;
        }
    }

    // DataTable initialization and configuration
    // var tab = $("#Dtable").DataTable({
    //     dom: '<"top">t<"bottom"ilp>',
    //     ajax: {
    //         url: `${[test[0].url]}/gate/getAll`,
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //           },
    //           error: function (xhr) {
    //             if(xhr.status == 498)
    //             {
    //                 $.tokenError();
    //             }
    //             else if(xhr.status >= 400 && xhr.status < 500){

    //                 $.errorMessage(xhr.responseJSON.message);
    //           }
    //           else{
    //                 $.errorMessage(xhr.responseJSON.error)
    //           }
    //         }
    //     },
    //     columns: [
    //         { data: "id" },
    //         {
    //             data: "status.label", render: function (data, type, row, meta) {
    //                 status1 = data;
    //             }
    //         },
    //         { data: "gate_number" },
    //         {
    //             data: "status.label", render: function (data, type, row, meta) {
    //                 // Generate labels based on the status value
    //                 if (data == "Scan") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-primary">${data}</div>&nbsp;  
    //                     </div>`;
    //                 } else if (data == "Store") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-info">${data}</div>&nbsp
    //                     </div>`;
    //                 }else if (data == "Unload") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-warningg">${data}</div>&nbsp
    //                     </div>`;
    //                 } 
    //                 else if (data == "Quality") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-warning">${data}</div>&nbsp  
    //                     </div>`;
    //                 } else if (data == "Finance") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-success">${data}</div>&nbsp  
    //                     </div>`;
    //                 } else if (data == "Vouchered") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-infoo">${data}</div>&nbsp  
    //                     </div>`;
    //                 } else if (data == "Canceled") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-danger">${data}</div>&nbsp  
    //                     </div>`;
    //                 }else if (data == "Error") {
    //                     return `<div class="btn-group">
    //                         <div class="label label-danger">${data}</div>&nbsp  
    //                     </div>`;
    //                 }
    //             }
    //         },
    //         {
    //             data: "id", render: function (data, type, row, meta) {
    //                 // Generate the "Change Status" button
    //                 return `<div class="btn-group">
    //                     <button class='btn btn-outline-success btn-sm view'>Change Status</button>&nbsp;&nbsp;
    //                 </div>`;
    //             }
    //         },
    //     ],
    //     columnDefs: [
    //         {
    //             "defaultContent": "-",
    //             "targets": "_all"
    //         },
    //         { responsivePriority: 1, targets: 0 },
    //         { responsivePriority: -2, targets: 4 }
    //     ],
    // });




    var tab = $("#Dtable").DataTable({

        "dom": '<"top"B>t<"bottom"ilp>',
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
                d.status =  $('#col2_filter').val() || "";
                d.gate =  $('#col1_filter').val()
                // d.transactionType = $('#Transaction').val();
                // d.date =  $('#col3_filter').val()
                // d.search = $("input[type='search']").val()
                // status = "";

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
            { data: "gate_number" },
            {
                data: "status.label", render: function (data, type, row, meta) {
                    // Generate labels based on the status value
                    if (data == "Scan") {
                        return `<div class="btn-group">
                            <div class="label label-primary">${data}</div>&nbsp;  
                        </div>`;
                    } else if (data == "Store") {
                        return `<div class="btn-group">
                            <div class="label label-info">${data}</div>&nbsp
                        </div>`;
                    }else if (data == "Unload") {
                        return `<div class="btn-group">
                            <div class="label label-warningg">${data}</div>&nbsp
                        </div>`;
                    } 
                    else if (data == "Quality") {
                        return `<div class="btn-group">
                            <div class="label label-warning">${data}</div>&nbsp  
                        </div>`;
                    } else if (data == "Finance") {
                        return `<div class="btn-group">
                            <div class="label label-success">${data}</div>&nbsp  
                        </div>`;
                    } else if (data == "Vouchered") {
                        return `<div class="btn-group">
                            <div class="label label-infoo">${data}</div>&nbsp  
                        </div>`;
                    } else if (data == "Canceled") {
                        return `<div class="btn-group">
                            <div class="label label-danger">${data}</div>&nbsp  
                        </div>`;
                    }else if (data == "Flaw-Fix") {
                        return `<div class="btn-group">
                            <div class="label label-danger">${data}</div>&nbsp  
                        </div>`;
                    }
                }
            },
            {
                data: "id", render: function (data, type, row, meta) {
                    // Generate the "Change Status" button
                    return `<div class="btn-group">
                        <button class='btn btn-outline-success btn-sm view'>Change Status</button>&nbsp;&nbsp;
                    </div>`;
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

        // "pageLength": 10, // Number of records per page
        // // "pagingType": "full_numbers", // Pagination style
        // "lengthMenu": [10, 25, 50, 100], // Records per page options
        // // "language": {
        // //     "paginate": {
        // //         "first": "First",
        // //         "last": "Last",
        // //         "next": "Next",
        // //         "previous": "Previous"
        // //     },
        //     "search": "Search:",
        //     // "lengthMenu": "Show _MENU_ entries per page",
        //     "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        //     "infoEmpty": "Showing 0 to 0 of 0 entries",
        //     "infoFiltered": `(filtered from  total entries)`,
        // // },


        rowCallback: function (row, data, index) {
            var labelColor = ""; // This will store the color value based on the label value
            
            // if(data.is_reserved == "Y")
            // {
            //     $(row).css("background-color", "lightgray")
            // } 
            
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
              case "Error":
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














    // Hide unnecessary columns
    tab.column(0).visible(false);
    tab.column(1).visible(false);

    // Global search event handler
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    // Search button click event handler
    $("#search").click(() => {
        $('#Dtable').DataTable().column(2).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    });

    // Enter key press event handler for search input
    $("#col1_filter").keypress((event) => {
        if (event.keyCode === 13) {
            $('#Dtable').DataTable().column(2).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });

    // Change event handler for column 2 filter
    $("#col2_filter").change(() => {
        $('#Dtable').DataTable().column(3).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    });

    // Event handler for "gate_number" button click
    $("#Dtable").on("click", ".gate_number", function () {
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        var gate_number = tab.row(raw).data().gate_number;
        console.log(row);
        sessionStorage.setItem('gateid', JSON.stringify(row));
        sessionStorage.setItem('gateno', JSON.stringify(gate_number));
        window.open("../template/addGateInvoice.jsp", "_self");
    });

    // Fetch status data and populate the filter dropdown
    $.ajax({
        url: `${[test[0].url]}/status/get`,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success: function (data,status,xhr) {
            if(xhr.status == 200)
            {
                for (let i = 0; i < data.data.length; i++) {
                    $b = $(`<option value="${data.data[i].label}">${data.data[i].label}</option>`);
                    $("#col2_filter").append($b);
                }
            }
            else{

                    $.errorMessage(xhr.responseJSON.message);
            }
        },
        error: function (error) {
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
});
