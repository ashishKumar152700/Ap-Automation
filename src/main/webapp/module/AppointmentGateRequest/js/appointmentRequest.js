$(document).ready(function () {

    const token = JSON.parse(localStorage.getItem("token"));
    // Show loader on page load
    $(window).load(() => {
        $("#loader").addClass("sk-loading")
    })

    var test = $.test(); // Assign the value of test to the variable 'test'

    var tab = $("#role").DataTable({
        // Configure DataTables
        dom: '<"top">t<"bottom"ilp>',
        ajax: {
            url: `${[test[0].url]}/appointment`, // Set the URL for AJAX data retrieval
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
            },
            complete: () => {
                // Remove loader and spinner after data is loaded
                $("#loader").removeClass("sk-loading")
                $("#loader").removeClass("ibox-content")
                $(".sk-spinner").addClass("d-none")
            }
        },
        columns: [
            { data: "id" }, // Specify data columns
            { data: "visitorName" },
            { data: "visitorCompany" },
            { data: "mobileNumber" },
            { data: "visitorEmail" },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return row.fromDate + '  ' + row.fromTime;
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return row.toDate + '  ' + row.toTime;
                }
            },
            {
                // Render custom buttons in the last column
                data: "id", render: function (data, type, row, meta) {
                    return `
                        <div class="btn-group">
                            <button class='btn btn-outline-success btn-sm edit'>Approve</button>&nbsp;&nbsp;
                            <button class='btn btn-outline-danger btn-sm delete'>Reject</button>&nbsp;&nbsp;    
                            <button class='btn btn-outline-primary btn-sm view'>View</button>
                        </div>
                    `;
                }
            }
        ],
        columnDefs: [
            {
                "defaultContent": "-", // Set default content for empty cells
                "targets": "_all"
            },
            { responsivePriority: 1, targets: 0 }, // Set responsive priorities for columns
            { responsivePriority: -1, targets: 6 }
        ],
        rowCallback: function (row, data, index) {
            var labelColor = ""; // This will store the color value based on the label value

            // console.log("color data" , data.document_type);
            // Map the label value to the corresponding color value
            switch (data.approver) {
                case "YES":
                    labelColor = "#28a745"; // Blue color

                    // Add the "disable" class to the edit button
                    $(row).find(".edit").attr("disabled", "disabled");
                    $(row).find(".delete").attr("disabled", "disabled");
                    $(row).find(".edit").removeClass("btn-outline-success");
                    $(row).find(".edit").addClass("btn-success");
                    break;
                case "NO":
                    labelColor = "#dc3545"; // Gray color

                    // Add the "disable" class to the delete button
                    $(row).find(".edit").attr("disabled", "disabled");
                    $(row).find(".delete").attr("disabled", "disabled");
                    $(row).find(".delete").removeClass("btn-outline-danger");
                    $(row).find(".delete").addClass("btn-danger");
                    break;
            }

            // Apply the labelColor to the row text
            $(row).find("td").css("color", labelColor);
            // $(row).find("button").css("color", labelColor);
            // $(row).find(".cancel").css("border-color", labelColor);
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

    // Handle global search input
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    tab.column(0).visible(false); // Hide the first column

    $("#search").click(() => {
        // Perform search when search button is clicked
        $('#role').DataTable().column(1).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    });

    $("#col1_filter").keypress((event) => {
        if (event.keyCode === 13) {
            // Perform search when Enter key is pressed in the search input
            $('#role').DataTable().column(1).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });

    $("#role").on("click", ".delete", function () {
        // Handle delete button click

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to cancel this appointment?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform delete operation if confirmed
                $.ajax({
                    url: `${[test[0].url]}/appointment/update?id=${row}&approver=NO`,
                    type: "put",
                    // data: JSON.stringify({
                    //     approver: "No",
                    // }),
                    headers: {
                        // 'Authorization': 'Bearer ' + token,
                    },
                    success: function (data, status, xhr) {
                        if (xhr.status == 200) {
                            tab.ajax.reload();
                        }
                        else {

                            $.errorMessage(xhr.responseJSON.message);
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
                });
            }
        });
    });


    $("#role").on("click", ".edit", function () {
        // Handle edit button click
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(tab.row(raw).data());





        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false,
        });


        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to approve this appointment?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform delete operation if confirmed
                $.ajax({
                    url: `${[test[0].url]}/appointment/update?id=${row}&approver=YES`,
                    type: "put",
                    // data: JSON.stringify({
                    //     approver: "Yes",
                    // }),
                    headers: {
                        // 'Authorization': 'Bearer ' + token,
                    },
                    success: function (data, status, xhr) {
                        if (xhr.status == 200) {
                            console.log(data.data);

                            var options = {
                                bcid: "code128",     // Specify the barcode format (e.g., code128, ean13, etc.)
                                text: tab.row(raw).data().visitorName,  // Replace with the actual value you want to encode
                                scale: 2,            // Adjust the barcode size (2 is default)
                            };

                            // Get a reference to the canvas element
                            var canvas = document.getElementById("barcode");

                            // Generate the barcode on the canvas
                            bwipjs.toCanvas(canvas, options, function () {

                            });


                            // Check if the canvas element still exists (barcode generation was successful)
                            if (canvas) {
                                // Convert the canvas to a data URL
                                var dataURL = canvas.toDataURL("image/png");

                                // Create a new image element
                                var img = new Image();

                                // Set the data URL as the image source
                                img.src = dataURL;

                                // Set the desired width and height for the image
                                img.width = 100;
                                img.height = 50;

                                console.log("1234567");

                                // Replace the canvas element with the image
                                canvas.parentNode.replaceChild(img, canvas);
                            } else {
                                // Handle the case where the canvas element no longer exists
                                console.error("Canvas element not found.");
                            }

                            try {

                                var pdf = new jsPDF('p', 'pt', 'letter');
                                // source can be HTML-formatted string, or a reference
                                // to an actual DOM element from which the text will be scraped.

                                // $('#customers').removeClass("d-none")
                                // $('#customers').addClass("d-flex justify-content-center")


                                source = $('#customers')[0];

                                $('#mobileNumber').html(data.data.mobileNumber);
                                $('#visitorName').html(data.data.visitorName);
                                $('#visitorCompany').html(data.data.visitorCompany);
                                $('#visitorEmail').html(data.data.visitorEmail);
                                $('#emergencyContactNo').html(data.data.emergencyContactNo);
                                $('#location').html(data.data.location);
                                $('#department').html(data.data.department);
                                $('#approver').html(data.data.approver);
                                $('#toMeet').html(data.data.toMeet);
                                $('#fromDate').html(data.data.fromDate);
                                $('#toDate').html(data.data.toDate);
                                $('#fromTime').html(data.data.fromTime);
                                $('#toTime').html(data.data.toTime);
                                $('#equipment').html(data.data.equipment);
                                // $('#materialName').html(data.data.materialName);
                                // $('#materialIdentityNumber').html(data.data.materialIdentityNumber);
                                // $('#returnable').html(data.data.returnable);
                                // $('#purposeOfMaterial').html(data.data.purposeOfMaterial);
                                $('#vehicle').html(data.data.vehicle);
                                $('#vehicleNumber').html(data.data.vehicleNumber);
                                $('#returnable').html(data.data.returnable);

                                var additionalEquipment = data.data.addtionalEqupment;
                                var materialIdentityNumberElement = $('#materialIdentityNumber');
                                var returnableElement = $('#returnable');
                                var purposeOfMaterialElement = $('#purposeOfMaterial');
                                var materialNameElement = $('#materialName');

                                var materialIdentityNumbers = [];
                                var returnables = [];
                                var purposesOfMaterial = [];
                                var materialNames = [];

                                additionalEquipment.forEach(function (equipment) {
                                    materialIdentityNumbers.push(equipment.materialIdentityNumber);
                                    returnables.push(equipment.returnable);
                                    purposesOfMaterial.push(equipment.purposeOfMaterial);
                                    materialNames.push(equipment.materialName);
                                });

                                // Join the arrays with commas and set them as the text content
                                materialIdentityNumberElement.text(materialIdentityNumbers.join(', '));
                                returnableElement.text(returnables.join(', '));
                                purposeOfMaterialElement.text(purposesOfMaterial.join(', '));
                                materialNameElement.text(materialNames.join(', '));



                                // we support special element handlers. Register them with jQuery-style 
                                // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
                                // There is no support for any other type of selectors 
                                // (class, of compound) at this time.
                                specialElementHandlers = {
                                    // element with the id of "bypassme" - jQuery style selector
                                    '#bypassme': function (element, renderer) {
                                        // true = "handled elsewhere, bypass text extraction"
                                        return true;
                                    }
                                };

                                
                                margins = {
                                    top: 30,
                                    bottom: 200,
                                    left: 30,
                                    width: 522
                                };
                                $('#customers').removeClass("d-none")
                                // Calculate the horizontal center margin
                                var horizontalMargin = (pdf.internal.pageSize.width - margins.width) / 2;
                                
                                // Calculate the vertical center margin
                                var verticalMargin = (pdf.internal.pageSize.height - margins.top - margins.bottom - source.clientHeight) / 2;
                                margins = {
                                    top: margins.top + verticalMargin,
                                    bottom: margins.bottom + verticalMargin,
                                    left: margins.left + horizontalMargin,
                                    width: margins.width
                                };
                                // all coordinates and widths are in jsPDF instance's declared units
                                // 'inches' in this case
                                pdf.fromHTML(
                                    source, // HTML string or DOM elem ref.
                                    margins.left, // x coord
                                    margins.top, { // y coord
                                        'width': margins.width, // max width of content on PDF
                                        'elementHandlers': specialElementHandlers
                                    },
                                    
                                    function (dispose) {
                                        $('#customers').addClass("d-none")
                                        // dispose: object with X, Y of the last line add to the PDF 
                                        // this allows the insertion of new lines after HTML
                                        var pdfDataURI = pdf.output('datauristring');
                                        console.log(pdfDataURI); // You can inspect the data URI in the console
                                        // Here you can use pdfDataURI as needed

                                        // The base64-encoded PDF data
                                        var base64PdfData = pdfDataURI; // Replace this with your base64 data

                                        // Remove the data URI if present
                                        var base64DataWithoutURI = base64PdfData.replace(/^data:application\/pdf;base64,/, '');

                                        // Decode the base64 data to a Uint8Array
                                        var decodedData = atob(base64DataWithoutURI);
                                        var byteArray = new Uint8Array(decodedData.length);
                                        for (var i = 0; i < decodedData.length; i++) {
                                            byteArray[i] = decodedData.charCodeAt(i);
                                        }

                                        // Create a Blob from the Uint8Array
                                        var blob = new Blob([byteArray], { type: 'application/pdf' });

                                        // Set the desired file name and type
                                        // var gate_id = "appointment"; // Replace this with your desired file name
                                        var fileName = `appointment.pdf`;
                                        var fileType = blob.type; // You should use the appropriate MIME type

                                        // Create a File object from the Blob data
                                        var convertedFile_attachment = new File([blob], fileName, { type: fileType });
                                        $.appointmentRequest(data.data, "Appointment Request", convertedFile_attachment)
                                        tab.ajax.reload();
                                    }, margins);
                            } catch (error) {
                                console.error('An error occurred:', error);
                            }
                        }
                        else {

                            $.errorMessage(xhr.responseJSON.message);
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
                });
            }
        });
    });

    $("#print_tab").click(() => {


        $(".row").hide();
        // $(".row").addClass("vw-100");

        $(".modal-footer").hide();
        $(".modal-header").hide();
        $(".modal-body").show();
        $(".modal-body").children().show();
        $(".modal-body").children().children().show();
        $(".modal-body").children().children().children().show();
        $(".modal-body").children().children().children().children().show();

        window.print();

        $(".row").show();
        $(".modal-footer").show();
        $(".modal-header").show();
        $(".modal-body").show();
        $(".modal-body").children().show();
        $(".modal-body").children().children().show();
        $(".modal-body").children().children().children().show();
        $(".modal-body").children().children().children().children().show();


    });

    $("#role").on("click", ".view", function () {
        // Handle view button click

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        $('#myModal5').modal('show');

        // $("#loader1").addClass("sk-loading")
        $("#loader1").addClass("sk-loading")
        $("#loader1").addClass("ibox-content")
        $(".sk-spinner").removeClass("d-none")

        $.ajax({
            url: `${[test[0].url]}/appointment?id=${row}`,
            dataSrc: "data",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            success: function (data, status, xhr) {
                console.log("data : ", data.data[0]);
                if (xhr.status == 200) {
                    $("#MvisitorName").html(data.data[0].visitorName).css("font-weight", "bold");
                    $("#MvisitorEmail").html(data.data[0].visitorEmail).css("font-weight", "bold");
                    $("#MmobileNumber").val(data.data[0].mobileNumber).css("font-weight", "bold");
                    $("#MemergencyContactNo").val(data.data[0].emergencyContactNo).css("font-weight", "bold");
                    $("#MvisitorCompany").val(data.data[0].visitorCompany).css("font-weight", "bold");

                    $("#Mdepartment").val(data.data[0].department).css("font-weight", "bold");
                    $("#MtoMeet").val(data.data[0].toMeet).css("font-weight", "bold");
                    $("#Mlocation").val(data.data[0].location).css("font-weight", "bold");
                    $("#Mapprover").val(data.data[0].approver).css("font-weight", "bold");
                    $("#MfromDate").val(data.data[0].fromDate).css("font-weight", "bold");
                    $("#MfromTime").val(data.data[0].fromTime).css("font-weight", "bold");
                    $("#MtoDate").val(data.data[0].toDate).css("font-weight", "bold");
                    $("#MtoTime").val(data.data[0].toTime).css("font-weight", "bold");
                    $("#loader1").removeClass("sk-loading")
                    $("#loader1").removeClass("ibox-content")
                    $(".sk-spinner").addClass("d-none")
                }
                else {

                    $.errorMessage(xhr.responseJSON.message);
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
        });
    });

    // $("#add_user").click(() => {
    //     // Redirect to adduser.jsp when add_user button is clicked
    //     window.open("adduser.jsp", "_self");
    // });

    var calendar

    $("#Scheduled_Appointment").click(() => {

        // Make an AJAX call to fetch event data from the API
        $.ajax({
            url: `${[test[0].url]}/appointment?approver=YES`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {

                var final_data = data.data

                console.log(final_data);
                // Initialize FullCalendar
                calendar = $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: true,
                    droppable: true,
                    events: [], // Use the fetched data as events
                });

                // Add each event from the API to the calendar
                final_data.forEach(eventData => {
                    var fromDate = moment(eventData.fromDate + ' ' + eventData.fromTime);
                    var toDate = moment(eventData.toDate + ' ' + eventData.toTime);

                    var newEvent = {
                        id: eventData.id,
                        title: eventData.visitorName,
                        start: fromDate,
                        end: toDate,
                        // Add other event properties as needed
                    };

                    calendar.fullCalendar('renderEvent', newEvent, true);
                });
            },
            error: function (error) {
                console.error('Error fetching data from API:', error);
            }
        });


        // Wait for a short time and then trigger the "Today" button
        setTimeout(function () {
            calendar.fullCalendar('today');
        }, 500);

        $('#myModal6').modal('show');

    });

    // Add an event listener to destroy the calendar when the modal is closed
    $('#myModal6').on('hidden.bs.modal', function () {
        if (calendar) {
            calendar.fullCalendar('destroy');
            calendar = null; // Reset the calendar variable
        }
    });






    // $('#myModal6').modal('show');


    // Add the new event to the FullCalendar events array
    // calendar.fullCalendar('renderEvent', newEvent, true);







    // $("#Scheduled_Appointment").click(() => {

    //     var eventData = {
    //         "id": 12,
    //         "mobileNumber": "8052295528",
    //         "visitorName": "shashi",
    //         "visitorCompany": "RKT",
    //         "visitorEmail": "shashirbgj@gmail.com",
    //         "emergencyContactNo": "8052295528",
    //         "location": "RSB Transmissions (I) Ltd., Jamshedpur - Unit 1",
    //         "department": "Production Planning",
    //         "approver": null,
    //         "toMeet": "Mr. Nishit Behera",
    //         "fromDate": "2023-09-16",
    //         "toDate": "2023-09-19",
    //         "fromTime": "11:40",
    //         "toTime": "20:46",
    //         "equipment": "yes",
    //         "materialName": "qewrty",
    //         "materialIdentityNumber": "awertyu",
    //         "returnable": "returnable",
    //         "purposeOfMaterial": "45tyu6",
    //         "vehicle": "yes",
    //         "vehicleNumber": "rdgfhjk"
    //     };

    //     // Parse the date and time from the eventData object
    //     var fromDate = moment(eventData.fromDate + ' ' + eventData.fromTime);
    //     var toDate = moment(eventData.toDate + ' ' + eventData.toTime);

    //     // Create a FullCalendar event object
    //     var newEvent = {
    //         id: eventData.id,
    //         title: eventData.visitorName,
    //         start: fromDate,
    //         end: toDate,
    //         location: eventData.location,
    //         department: eventData.department,
    //         toMeet: eventData.toMeet,
    //         // Add other event properties as needed
    //     };

    //     /* initialize the calendar
    //      -----------------------------------------------------------------*/
    //     var date = new Date();
    //     var d = date.getDate();
    //     var m = date.getMonth();
    //     var y = date.getFullYear();

    //     var calendar = $('#calendar').fullCalendar({
    //         header: {
    //             left: 'prev,next today',
    //             center: 'title',
    //             right: 'month,agendaWeek,agendaDay'
    //         },
    //         editable: true,
    //         droppable: true, // this allows things to be dropped onto the calendar
    //         drop: function () {
    //             // is the "remove after drop" checkbox checked?
    //             if ($('#drop-remove').is(':checked')) {
    //                 // if so, remove the element from the "Draggable Events" list
    //                 $(this).remove();
    //             }
    //         },
    //         events: [
    //             // {
    //             //     title: 'All Day Event',
    //             //     start: new Date(y, m, 1)
    //             // },
    //             // {
    //             //     title: 'Long Event',
    //             //     start: new Date(y, m, d - 5),
    //             //     end: new Date(y, m, d - 2)
    //             // },
    //             // {
    //             //     id: 999,
    //             //     title: 'Repeating Event',
    //             //     start: new Date(y, m, d - 3, 16, 0),
    //             //     allDay: false
    //             // },
    //             // {
    //             //     id: 999,
    //             //     title: 'Repeating Event',
    //             //     start: new Date(y, m, d + 4, 16, 0),
    //             //     allDay: false
    //             // },
    //             // {
    //             //     title: 'Meeting',
    //             //     start: new Date(y, m, d, 10, 30),
    //             //     allDay: false
    //             // },
    //             // {
    //             //     title: 'Lunch',
    //             //     start: new Date(y, m, d, 12, 0),
    //             //     end: new Date(y, m, d, 14, 0),
    //             //     allDay: false
    //             // },
    //             // {
    //             //     title: 'Birthday Party',
    //             //     start: new Date(y, m, d + 1, 19, 0),
    //             //     end: new Date(y, m, d + 1, 22, 30),
    //             //     allDay: false
    //             // },
    //             // {
    //             //     title: 'Click for Google',
    //             //     start: new Date(y, m, 28),
    //             //     end: new Date(y, m, 29),
    //             //     url: 'http://google.com/'
    //             // }

    //         ],
    //         // viewRender: function (view, element) {
    //         //     // Check if the event is outside the current view's date range and remove it
    //         //     calendar.fullCalendar('clientEvents', function (event) {
    //         //         if (!event || !event.start || !event.end) {
    //         //             return false; // Skip invalid events
    //         //         }
    //         //         if (event.start.isBefore(view.start) || event.end.isAfter(view.end)) {
    //         //             return true; // Remove the event
    //         //         }
    //         //         return false; // Keep the event
    //         //     });
    //         // },
    //     });




    //     // Wait for a short time and then trigger the "Today" button
    //     setTimeout(function () {
    //         calendar.fullCalendar('today');
    //         // // Add the new event to the FullCalendar events array
    //         // calendar.fullCalendar('renderEvent', eventData, true);
    //     }, 500);


    //     $('#myModal6').modal('show');


    //     // Add the new event to the FullCalendar events array
    //     calendar.fullCalendar('renderEvent', newEvent, true);


    //     // Check if the event is outside the current view's date range and remove it
    //     // calendar.fullCalendar('getView').calendar.events.forEach(function (event) {
    //     //     var view = calendar.fullCalendar('getView');
    //     //     console.log(view);
    //     //     console.log(event);
    //     //     if (event.start.isBefore(view.start) || event.end.isAfter(view.end)) {
    //     //         calendar.fullCalendar('removeEvents', event.id);
    //     //     }
    //     // });

    // });


});
