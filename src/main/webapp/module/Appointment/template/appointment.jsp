<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Appointment</title>

    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../../../static/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="../../../static/css/plugins/steps/jquery.steps.css" rel="stylesheet">
    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">

    <style>
        body {
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            width: 100%;
            background-color: transparent !important;
        }

        a {
            /* background-color: #24537f !important; */
        }

        .wizard>.actions a,
        .wizard>.actions a:hover,
        .wizard>.actions a:active {
            background-color: #24537f !important;
        }

        .wizard>.steps .current a,
        .wizard>.steps .current a:hover,
        .wizard>.steps .current a:active {
            background-color: #6c757d !important;

        }

        .wizard>.steps .done a,
        .wizard>.steps .done a:hover,
        .wizard>.steps .done a:active {
            background-color: #24537f !important;

        }

        /* .wizard>.content {
                background-color: transparent !important;
            }
    
            .ibox-content {
                background-color: transparent !important;
    
            } */

        /* label,
            h1,
            h2 {
                color: white !important;
            } */
        .additional-image {
            position: absolute;
            top: 10px;
            /* Adjust the top position as needed */
            left: 10px;
            /* Adjust the right position as needed */
            width: 120px;
            /* Adjust the width as needed */
            height: auto;
            z-index: 100
        }
    </style>

</head>

<body>
    <div class="container d-flex justify-content-center align-items-center">
        <img src="RSB_logo.png" alt="Additional Image" class="additional-image">
        <div class="row w-100">
            <div class="col-lg-12">
                <div class="ibox">
                    <div class="ibox-content">
                        <div class="ibox-content" id="loader">
                            <div class="sk-spinner sk-spinner-double-bounce">
                                <div class="sk-double-bounce1"></div>
                                <div class="sk-double-bounce2"></div>
                            </div>
                            <form id="form" action="#" class="wizard-big">
                                <h1>Visitor</h1>
                                <fieldset>
                                    <h2>Visitor Information</h2>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label>Visitor Name *</label>
                                                <input id="name" name="name" type="text" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Mobile No. *</label>
                                                <input id="mobile" name="mobile" type="text" class="form-control"
                                                    pattern="[0-9]{10}" maxlength="10" minlength="10">
                                            </div>

                                            <div class="form-group">
                                                <label>Visitor's Emergency Contact No.</label>
                                                <input id="emergency_contact_no" name="" type="text"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label>Visitor's Company *</label>
                                                <input id="visitor_company" name="" type="text" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Email *</label>
                                                <input id="email" name="email" type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>
                                <h1>Meeting</h1>
                                <fieldset>
                                    <h2>Meeting Details</h2>
                                    <div class="row">
                                        <div class="col-lg-6">

                                            <label for="department">Department *</label>
                                            <select class="form-control depart_data" id="department" name="department">
                                                <option value="" disabled selected>Select</option>
                                            </select><br>

                                            <label for="location">Location *</label>
                                            <select class="form-control" id="location" name="location">
                                                <option value="" disabled selected>Select</option>
                                                <option value="RSB Transmissions (I) Ltd., Jamshedpur - Unit 1">RSB
                                                    Transmissions (I) Ltd., Jamshedpur - Unit 1</option>
                                                <option
                                                    value="RSB Transmissions (I) Ltd. - Jamshedpur Unit II (CMI Division)">
                                                    RSB Transmissions (I) Ltd. - Jamshedpur
                                                    Unit II (CMI Division)</option>
                                                <option
                                                    value="RSB Transmissions (I) Ltd. Jamshedpur Unit III (Axle Division)">
                                                    RSB Transmissions (I) Ltd. Jamshedpur
                                                    Unit III (Axle Division)</option>
                                                <option
                                                    value="RSB Transmissions (I) Ltd. Jamshedpur Unit IV. (Running Gear Systems)">
                                                    RSB Transmissions (I) Ltd.
                                                    Jamshedpur
                                                    Unit IV. (Running Gear Systems)</option>
                                            </select><br>

                                            <div class="form-group">
                                                <label for="from_date">From Date*</label>
                                                <input type="date" id="from_date" class="form-control fetch_check">
                                            </div>

                                            <div class="form-group">
                                                <label for="to_date">To Date*</label>
                                                <input type="date" id="to_date" class="form-control fetch_check">
                                            </div>

                                        </div>
                                        <div class="col-lg-6">

                                            <label for="toMeet">Person to meet *</label>
                                            <select class="form-control" id="toMeet" name="toMeet">
                                                <option value="" disabled selected>Select</option>

                                            </select><br>

                                            <div class="form-group">
                                                <label for="from_time">From Time*</label>
                                                <input type="time" id="from_time" class="form-control fetch_check">
                                            </div>

                                            <div class="form-group">
                                                <label for="to_time">To Time*</label>
                                                <input type="time" id="to_time" class="form-control fetch_check">
                                            </div>

                                        </div>
                                    </div>
                                </fieldset>

                                <h1>Equipment</h1>
                                <fieldset style="overflow-y: scroll; max-height: 400px;" class="w-100">
                                    <h2>Equipment Details</h2>
                                    <label for="option">Do you need material / equipment /
                                        laptop?</label><br>
                                    <div class="d-flex">
                                        <div>
                                            <input type="radio" id="yes" name="option" class="toggleMaterialFields"
                                                value="yes">
                                            <label for="yes">Yes</label><br>
                                        </div>
                                        <div class="mx-3">
                                            <input type="radio" id="no" name="option" class="toggleMaterialFields_no"
                                                value="no">
                                            <label for="no">No</label>
                                        </div>
                                    </div>

                                    <div id="materialFields" style="display: none;">
                                        <div id="equipmentTemplate">
                                            <div class="row">
                                                <div class="col-2">
                                                    <div class="form-group"><label>Material Name</label>
                                                        <input type="text" id="materialName_0" name="materialName_0"
                                                            placeholder="Material Name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="form-group"><label>Purpose of Material Entry</label>
                                                        <input type="text" id="materialpurpose_0"
                                                            placeholder="Purpose of Material Entry"
                                                            class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-3">
                                                    <div class="form-group"><label>Material Identification No.</label>
                                                        <input type="text" id="identificationNo_0"
                                                            placeholder="Material Identification No."
                                                            class="form-control identity">
                                                    </div>
                                                    
                                                </div>
                                                <div class="col-3">
                                                    <label for="returnable">Returnable or Non-returnable?</label>
                                                    <select class="form-control" id="returnable_0" name="returnable_0">
                                                        <option value="" disabled selected>Select</option>
                                                        <option value="returnable">Returnable</option>
                                                        <option value="non-returnable">Non-returnable</option>
                                                    </select>
                                                </div>
                                                <div class="col-1 d-flex justify-content-center align-items-center">
                                                        <input type="checkbox" class="row-checkbox">
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <input type="button" id="addEquipment" value="Add Equipment" class="mr-3">
                                            <input type="button" id="deleteSelected" value="Delete Selected"
                                                class="d-none">
                                        </div>
                                    </div>
                                </fieldset>

                                <h1>Vehicle</h1>
                                <fieldset>
                                    <h2>Vehicle Details</h2>
                                    <label for="option1">Is Visitor Coming by any Vehicle?</label><br>
                                    <div class="d-flex">
                                        <div>
                                            <input type="radio" id="yes1" name="option1" class="toggleMaterialFields1"
                                                value="yes">
                                            <label for="yes1">Yes</label><br>
                                        </div>
                                        <div class="mx-3">
                                            <input type="radio" id="no1" name="option1" class="toggleMaterialFields_no1"
                                                value="no">
                                            <label for="no1">No</label>
                                        </div>
                                    </div>
                                    <div id="materialFields1" style="display: none;">
                                        <div class="form-group"><label>Vehicle Number*</label>
                                            <input type="text" placeholder="Enter Vehicle Number"
                                                class="form-control fetch_check col-6" id="vehicle_nbr"
                                                name="vehicleNbr">
                                        </div>
                                        <div class="form-group"><label>Driver Name*</label>
                                            <input type="text" placeholder="Enter Driver Name"
                                                class="form-control fetch_check col-6" id="driver_name"
                                                name="driverName">
                                        </div>
                                    </div>
                                    <h2>Terms and Conditions</h2>
                                    <input id="acceptTerms" name="acceptTerms" type="checkbox" class="required">
                                    <label for="acceptTerms">I confirm and declare that the information given above is
                                        true and correct to the best of my knowledge. In case the visitors are found
                                        working in the plant, I will be responsible for suitable discipilinary action as
                                        per company's regulation</label>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>



    <!-- Mainly scripts -->
    <script src="../../../static/js/jquery-3.1.1.min.js"></script>
    <script src="../../../static/js/popper.min.js"></script>
    <script src="../../../static/js/bootstrap.js"></script>
    <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../static/js/inspinia.js"></script>
    <script src="../../../static/js/plugins/pace/pace.min.js"></script>

    <!-- Steps -->
    <script src="../../../static/js/plugins/steps/jquery.steps.min.js"></script>

    <!-- Jquery Validate -->
    <script src="../../../static/js/plugins/validate/jquery.validate.min.js"></script>

    <script src="../../Configration/js/globalConfig.js"></script>

    <script src="../../../cdn/js/sweetalert2.js"></script>


    <script>
        $(document).ready(function () {

            var test = $.test();


            const token = JSON.parse(localStorage.getItem("token"));
            $("#toMeet").empty()
            $("#toMeet").prepend(`<option disabled selected>Select</option>`)

            $("#wizard").steps();
            let test = $.test();
            let depart_data;

            $.ajax({
                url: `${[test[0].url]}/department/get`,
                headers: {
                    // 'Authorization': 'Bearer ' + token,
                },
                success: function (data, status, xhr) {

                    console.log('data ---->', data);

                    depart_data = data.data;


                    data.data.map((value) => {
                        $("#department").append(`<option>${value.departmentName}</option>`)
                    })

                    $("#department").change(() => {

                        let matched_data = depart_data.filter((value) => value.departmentName == $("#department").val())
                        console.log("matched data: ", matched_data);
                        // $("#approver").empty()
                        $("#toMeet").empty()
                        // matched_data[0].emails.map((value)=>{
                        //     $("#approver").append(`<option>${value.email}</option>`)
                        // })
                        if (matched_data[0].e_A == "Y") {
                            $("#toMeet").append(`<option>${matched_data[0].name}</option>`)
                        } else {
                            $("#toMeet").append(`<option>${matched_data[0].hod_name}</option>`)
                        }
                        // $("#approver").prepend(`<option disabled selected>Select</option>`)
                        $("#toMeet").prepend(`<option disabled selected>Select</option>`)
                    })


                },
                error: function (xhr) {
                    console.log(xhr);
                }

            })


            var currentIndex_validation = 0
            $("#form").steps({
                bodyTag: "fieldset",
                onStepChanging: function (event, currentIndex, newIndex) {
                    // Always allow going backward even if the current step contains invalid fields!
                    if (currentIndex > newIndex) {
                        return true;
                    }

                    // Forbid suppressing "Warning" step if the user is to young
                    if (newIndex === 3 && Number($("#age").val()) < 18) {
                        return false;
                    }
                    var form = $(this);

                    // Clean up if user went backward before
                    if (currentIndex < newIndex) {
                        // To remove error styles
                        $(".body:eq(" + newIndex + ") label.error", form).remove();
                        $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
                    }

                    // Disable validation on fields that are disabled or hidden.
                    form.validate().settings.ignore = ":disabled,:hidden";

                    // Start validation; Prevent going forward if false
                    return form.valid();
                },
                onStepChanged: function (event, currentIndex, priorIndex) {
                    // Suppress (skip) "Warning" step if the user is old enough.
                    if (currentIndex === 2 && Number($("#age").val()) >= 18) {
                        $(this).steps("next");
                    }

                    console.log(currentIndex);

                    currentIndex_validation = currentIndex

                    // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
                    if (currentIndex === 3 && priorIndex === 3) {
                        $(this).steps("previous");
                    }

                },
                onFinishing: function (event, currentIndex) {
                    var form = $(this);

                    // Disable validation on fields that are disabled.
                    // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
                    form.validate().settings.ignore = ":disabled";

                    // Start validation; Prevent form submission if false
                    return form.valid();
                },
                onFinished: function (event, currentIndex) {
                    var form = $(this);

                    // var test = $.test();

                    console.log(form);

                    // Submit form input
                    $("#form").click(() => {
                        var addtionalEquipment = getInputFieldValues();
                        console.log(addtionalEquipment);
                        $("#loader").addClass("ibox-content")
                        $("#loader").addClass("sk-loading")
                        $("#spin").removeClass("d-none")
                        $.ajax({
                            type: "POST",
                            url: `${[test[0].url]}/appointment/add`,
                            data: JSON.stringify({
                                mobileNumber: $("#mobile").val(),
                                visitorName: $("#name").val(),
                                visitorCompany: $("#visitor_company").val(),
                                visitorEmail: $("#email").val(),
                                emergencyContactNo: $("#emergency_contact_no").val(),
                                location: $("#location").val(),
                                department: $("#department").val(),
                                // approver: $("#approver").val(),
                                toMeet: $("#toMeet").val(),
                                fromDate: $("#from_date").val(),
                                toDate: $("#to_date").val(),
                                fromTime: $("#from_time").val(),
                                toTime: $("#to_time").val(),
                                equipment: $("input[name='option']:checked").val(),
                                addtionalEqupment: addtionalEquipment,
                                vehicle: $("input[name='option1']:checked").val(),
                                vehicleNumber: $("#vehicle_nbr").val(),
                                driver_name: $("#driver_name").val()
                            }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                // 'Authorization': 'Bearer ' + token
                            },
                            success: function (data, status, xhr) {
                                console.log(xhr.status);
                                console.log(data);

                                if (xhr.status == 200) {
                                    $("#loader").removeClass("ibox-content")
                                    $("#loader").removeClass("sk-loading")
                                    $("#spin").addClass("d-none")
                                    const swalWithBootstrapButtons = Swal.mixin({
                                        customClass: {
                                            confirmButton: 'btn btn-success',
                                        },
                                        buttonsStyling: false
                                    });

                                    swalWithBootstrapButtons.fire({
                                        title: 'Appointment Requested',
                                        text: 'Thank you for scheduling an appointment with us. We look forward to meeting you.',
                                        icon: 'success',
                                        confirmButtonText: 'Okay',
                                        reverseButtons: true
                                    }).then((result) => {
                                        window.open("../template/image.jsp", "_self");
                                    });
                                }
                                else {

                                    // $.errorMessage(xhr.responseJSON.message);
                                    // swal("", error.responseJSON.message, "error")
                                    console.log(xhr.responseJSON.message);
                                }

                            },
                            error: function (xhr) {
                                if (xhr.status == 498) {
                                    $.tokenError();
                                }
                                else if (xhr.status >= 400 && xhr.status < 500) {

                                    // swal("", error.responseJSON.message, "error")
                                    // $.errorMessage(xhr.responseJSON.message);
                                    console.log(xhr.responseJSON.message);
                                }
                                else {
                                    // $.errorMessage(xhr.responseJSON.error)
                                    // swal("", error.responseJSON.message, "error")
                                    console.log(xhr.responseJSON.message);
                                }
                            }
                        });
                    });
                }
            }).validate({
                errorPlacement: function (error, element) {
                    element.before(error);
                },
                rules: {
                    name: "required",
                    mobile: {
                        required: true,
                        minlength: 10,
                        maxlength: 10,
                        digits: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    materialName: {
                        required: function () {
                            // Conditionally require materialName based on the value of the 'option' radio button
                            return $("input[name='option']:checked").val() === "yes";
                        }
                    },
                    vehicleNbr: {
                        required: function () {
                            // Conditionally require vehicleNbr based on the value of the 'option' radio button
                            return $("input[name='option1']:checked").val() === "yes";
                        }
                    },
                    // Add more rules for other fields as needed
                },
                messages: {
                    name: "Please enter your name",
                    mobile: {
                        required: "Please enter your mobile number",
                        minlength: "Mobile number must be 10 digits",
                        maxlength: "Mobile number must be 10 digits",
                        digits: "Please enter only digits",
                    },
                    email: "Please enter a valid email address",
                    materialName: "Please enter material name",
                    vehicleNbr: "Please enter vehicle number"
                    // Add more messages for other fields as needed
                },
            });

            toggleCheckboxVisibility();

            // Initialize the checkbox count
            var checkboxCount = 0;
            var idSuffix = 0

            // Add a new row when the "Add Row" button is clicked
            $("#addEquipment").on("click", function () {

                let identity = $(".identity")[$(".identity").length - 1].getAttribute("id")

                if($(`#${identity}`).val() != "")
                {
                    idSuffix++;
                    $("#equipmentTemplate").append(`<div class="row">
                                                    <div class="col-2">
                                                        <div class="form-group">
                                                            <input type="text" id="materialName_${idSuffix}" name="materialName_${idSuffix}"
                                                                placeholder="Material Name" class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="form-group">
                                                            <input type="text" id="materialpurpose_${idSuffix}"
                                                                placeholder="Purpose of Material Entry"
                                                                class="form-control">
                                                        </div>
                                                    </div>
    
                                                    <div class="col-3">
                                                        <div class="form-group">
                                                            <input type="text" id="identificationNo_${idSuffix}"
                                                                placeholder="Material Identification No."
                                                                class="form-control identity">
                                                        </div>
                                                        
                                                    </div>
                                                    <div class="col-3">
                                                        <select class="form-control" id="returnable_${idSuffix}" name="returnable_${idSuffix}">
                                                            <option value="" disabled selected>Select</option>
                                                            <option value="returnable">Returnable</option>
                                                            <option value="non-returnable">Non-returnable</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <input type="checkbox" class="row-checkbox">
                                                    </div>
                                                    
                                                </div>`);
                                            }
                                            toggleCheckboxVisibility();
            });


            var rowCount
            // Show the "Delete Selected" button when any checkbox is ticked
            $("#equipmentTemplate").on("change", ".row-checkbox", function () {
                rowCount = $("#equipmentTemplate .row").length;

                if (rowCount > 1) {
                    if (this.checked) {
                        checkboxCount++;
                    } else {
                        checkboxCount--;
                    }

                    $(".row-checkbox").show();
                    toggleDeleteButtonVisibility();
                } else {
                    $(".row-checkbox").hide();
                }
            });

            // Delete selected rows when the "Delete Selected" button is clicked
            $("#deleteSelected").on("click", function () {
                console.log("checkboxCount", checkboxCount);
                console.log("rowCount   ", rowCount);
                if (rowCount - checkboxCount != 0) {
                    $("#equipmentTemplate .row").each(function () {
                        var checkbox = $(this).find(".row-checkbox");
                        if (checkbox.prop("checked")) {
                            checkboxCount = 0
                            $(this).remove();
                        }
                    });
                }
                // Hide the "Delete Selected" button after deletion
                toggleDeleteButtonVisibility();
            });

            function toggleCheckboxVisibility() {
                var rowCount = $("#equipmentTemplate .row").length;
                if (rowCount > 1) {
                    $(".row-checkbox").show();
                } else {
                    $(".row-checkbox").hide();
                }
            }

            function toggleDeleteButtonVisibility() {
                var deleteButton = $("#deleteSelected");
                if ($("#equipmentTemplate .row-checkbox:checked").length > 0) {
                    $("#deleteSelected").removeClass("d-none")
                } else {
                    $("#deleteSelected").addClass("d-none")
                }
            }

            // Function to retrieve and display input field values
            function getInputFieldValues() {
                // Create an object to store the values
                var fieldValues = [];

                // Loop through each row (assuming you have a known number of rows)
                for (var i = 0; i <= $("#equipmentTemplate .row").length; i++) { // Adjust the loop count according to the number of rows you have
                    // Construct IDs for the input elements
                    var materialNameId = $("#materialName_" + i).val();
                    var materialPurposeId = $("#materialpurpose_" + i).val();
                    var identificationNoId = $("#identificationNo_" + i).val();
                    var returnableId = $("#returnable_" + i).val();

                    console.log(materialNameId);

                    // Store the values in the object
                    if (materialNameId != undefined) {
                        // Create an object for the current row
                        var rowObject = {
                            "materialName": materialNameId,
                            "purposeOfMaterial": materialPurposeId,
                            "materialIdentityNumber": identificationNoId,
                            "returnable": returnableId
                        };

                        // Push the object into the array
                        fieldValues.push(rowObject);
                    }
                }

                // Display the values in the console (you can also display them on the page)
                // console.log(fieldValues);
                return fieldValues;
            }


            const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format
            $("#from_date").attr("min", today);
            $("#to_date").attr("min", today);

            // Get references to the date inputs
            var fromDateInput = $('#from_date');
            var toDateInput = $('#to_date');

            // When the "From Date" input changes
            fromDateInput.on('change', function () {
                // Get the selected date from "From Date" input
                var selectedDate = fromDateInput.val();

                // Set the "min" attribute of "To Date" input to the selected date
                toDateInput.attr('min', selectedDate);
            });



            $(".toggleMaterialFields").click(() => {
                const yesRadio = document.getElementById('yes');
                console.log(yesRadio);
                const materialFields = document.getElementById('materialFields');

                if (yesRadio.checked) {
                    materialFields.style.display = 'block';
                } else {
                    materialFields.style.display = 'none';
                }
            })
            $(".toggleMaterialFields_no").click(() => {
                const noRadio = document.getElementById('no');
                console.log(noRadio);
                const materialFields = document.getElementById('materialFields');

                if (noRadio.checked) {
                    materialFields.style.display = 'none';
                } else {
                    materialFields.style.display = 'block';
                }
            })
            $(".toggleMaterialFields1").click(() => {
                const yesRadio = document.getElementById('yes1');
                console.log(yesRadio);
                const materialFields = document.getElementById('materialFields1');

                if (yesRadio.checked) {
                    materialFields.style.display = 'block';
                } else {
                    materialFields.style.display = 'none';
                }
            })
            $(".toggleMaterialFields_no1").click(() => {
                const noRadio = document.getElementById('no1');
                console.log(noRadio);
                const materialFields = document.getElementById('materialFields1');

                if (noRadio.checked) {
                    materialFields.style.display = 'none';
                } else {
                    materialFields.style.display = 'block';
                }
            })
        });



    </script>


</body>

</html>