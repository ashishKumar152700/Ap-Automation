<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Update Gate</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <!-- <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css"> -->

    <!-- <link rel="stylesheet" href="../css/gate.css"> -->


    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

    <script src="../../../../static/js/bootstrap.js"></script>

    
    <script src="../../../Configration/js/globalConfig.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>

    <!-- Mainly scripts -->
    <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>

    <!-- <script src="../js/updateGate.js"></script> -->


    <!-- jQuery UI -->
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>



    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->

    <script src="../../../Basic/js/updatestatus.js"></script>

    <style>
        .card{
            flex-direction: row !important;
        }
        .gate_number{
            padding-top:11px ;
        }

        .filter-multi-select>.dropdown-menu {
    position: relative !important;
}

.filter-multi-select>.viewbar>.selected-items>.item {

    background-color: #24537f !important;

}
    </style>

</head>

<body>

    <script>
        let sessionString = localStorage.getItem("userrole")

        let name = JSON.parse(sessionString);
        if(name != null)
        {
            if(name.includes("STORE") || name.includes("Admin"))
            {
    
            }
            else{
               window.location.href = "../../../Basic/template/404.jsp";
            }
        }
        else{
            window.location.href = "../../../Basic/template/404.jsp";
        }

   </script>


    <div id="wrapper">

        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content  ">

            <div class="row">
                <div class="col-lg-12 ">
                <div class="card mx-auto white-bg">
                            <div class="col-5">
                                <div class="form-group row gate_number">
                                    <div class="col-8"><h3 id="gate_number" class="my-1"></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
                                <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
                            </div>
                    </div>
                </div>
            </div><br>

            <div class="row">
                <div class="col-lg-12 ">
                    <div class="card mx-auto p-4 white-bg">
                        <div class="card-body ">
                            <div class="container ">

                                <form class="contact-form" id="form1">
                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-1"></div>
                                            <div class="col-md-4">
                                                <!-- <div class="form-group row"><label class="col-3 col-form-label">Invoice No.</label>
                                                    <div class="col-9"><input type="text" class="form-control input_size fetch_check" required="" id="invoice_no">
                                                    </div>
                                                </div> -->
                                                <div class="form-group"><label>Vehicle Number*</label> <input
                                                        type="text" placeholder="Enter Vehicle Number"
                                                        class="form-control fetch_check" required="" maxlength="20"
                                                        id="vehicle_nbr"></div>
                                                <div class="form-group"><label>Vendor Name*</label> <input type="text"
                                                        required="" maxlength="25" id="vendorname"
                                                        placeholder="Enter Vender Name" class="form-control fetch_check"></div>
                                                <div class="form-group"><label>Material Type*</label> <input type="text"
                                                        required="" maxlength="20" id="material_type"
                                                        placeholder="Enter Material Type" class="form-control fetch_check"></div>
                                                <div class="form-group"><label>Weight*</label> <input type="text"
                                                        required="" maxlength="10" id="weight"
                                                        placeholder="Enter Weight" class="form-control fetch_check"></div>

                                                        <div class="form-group"><label>Report Time*</label><input type="text"
                                                            required="" maxlength="8" id="in_time" step="1"
                                                            placeholder="Address no" class="form-control fetch_check" readonly></div>
                                            </div>
                                            <div class="col-2"></div>
                                            <div class="col-md-4">
                                                <!-- <div class="form-group"><label>Gate Number*</label><input type="text"
                                                        required="" maxlength="20" id="gate_number" readonly
                                                        placeholder="Gate no" class="form-control"></div> -->
                                                
                                                <div class="form-group"><label>Out Time*</label><input type="time"
                                                       maxlength="8" id="out_time" step="1"
                                                        placeholder="Address no" class="form-control fetch_check"></div>
                                                <div class="form-group"><label>Division*</label> <input type="text"
                                                        required="" maxlength="25" id="division"
                                                        placeholder="Enter Division" class="form-control fetch_check"></div>
                                                <div class="form-group"><label>Remark*</label> <input type="text"
                                                        required="" maxlength="25" id="remark"
                                                        placeholder="Enter Remark" class="form-control fetch_check" required="">
                                                </div>

                                                <div id="content" class="d-none"></div>

                                                <div class="form-group"><label for="roles">Tag</label> <br> 
                                                    <select name="roles" id="roles"></select>
                                                </div>

                                            </div>

                                            <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                                                <button class="btn btn-outline-danger pt-2 m-1" id="cancel1">Back</button>
                                                <button class="btn btn-outline-danger pt-2 m-1" id="save">Save</button>
                                                <button type="submit" class="btn add btn-primary pt-2 m-1">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    <script src="../../../../custom/js/breadcrumb.js"></script>

    <script src="../js/updateGate.js?v=" + $.getCurrentVersion()></script>



    <script>

// var sessionString =  sessionStorage.getItem("userrole")
//  var auth = JSON.parse(sessionString);

// if (auth.includes("GATE")) {

        
//         $(document).ready(() => {
//             var sessionString = sessionStorage.getItem('object');
//             var object = JSON.parse(sessionString);
//             $.checkstatus(object.id,true)
    
//             console.log(object);

        //     var test = $.test()

            // var vehicle_nbr = $("#vehicle_nbr").val(object.vehicle_nbr);
            // var vendorname = $("#vendorname").val(object.vendorname);
            // var material_type = $("#material_type").val(object.material_type);
            // var weight = $("#weight").val(object.weight);
            // var gate_number = $("#gate_number").html(object.gate_number);
            // var in_time = $("#in_time").val(object.in_time);
            // var division = $("#division").val(object.division);
            // var remark = $("#remark").val(object.remark);

            

            // $("#cancel").click((e) => {

            //     var test = $.test()
            //     var code = 100;
            //     console.log($("#gate_number").html());

        //         e.preventDefault();

                // $.ajax({
                //     type: "PUT",
                //     url: `${test}/gate/put/${object.id}`,
                //     data: JSON.stringify({
                //         "gate_number": $("#gate_number").html(),
                //         "vendorname": $("#vendorname").val(),
                //         "vehicle_nbr": $("#vehicle_nbr").val(),
                //         "material_type": $("#material_type").val(),
                //         "in_time": $("#in_time").val(),
                //         "division": $("#division").val(),
                //         "remark": $("#remark").val(),
                //         "weight":$("#weight").val(),
                //         "status" : {code}
                //     }),
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',

        //             },
        //             success: function (data, status, xhr) {
        //                 console.log(data);

        //                 if(xhr.status == 200){

        //                     const swalWithBootstrapButtons = Swal.mixin({
        //                     customClass: {
        //                         confirmButton: 'btn btn-success',
        //                     },
        //                     buttonsStyling: false
        //                 })


        //                 swalWithBootstrapButtons.fire({
        //                     title: 'Gate updated',
        //                     icon: 'success',
        //                     confirmButtonText: 'OK',
        //                     reverseButtons: true
        //                 }).then((result) => {

                        //     window.open("../template/gate.jsp", "_self")
                        // })

        //                 }
        //                 else{
        //                     swal("",xhr.responseJSON.message, "error")
        //                 }

                        

        //             },
        //             error: function (xhr) {
        //                 console.log(xhr);
        //             },
        //         });
        //     });

    //         $("#form1").submit((e)=>{
    //         e.preventDefault();
    //         var code = 200 ; 

            
    //         var test = $.test()

    //             e.preventDefault();

    //             $.ajax({
    //                 type: "PUT",
    //                 url: `${test}/gate/put/${object.id}`,
    //                 data: JSON.stringify({
    //                     "gate_number": $("#gate_number").html(),
    //                     "vendorname": $("#vendorname").val(),
    //                     "vehicle_nbr": $("#vehicle_nbr").val(),
    //                     "material_type": $("#material_type").val(),
    //                     "in_time": $("#in_time").val(),
    //                     "division": $("#division").val(),
    //                     "remark": $("#remark").val(),
    //                     "weight":$("#weight").val(),
    //                     "status" : {code}
    //                 }),
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',

    //                 },
    //                 success: function (data, status, xhr) {
    //                     console.log(data);

    //                     if(xhr.status == 200){

    //                         const swalWithBootstrapButtons = Swal.mixin({
    //                         customClass: {
    //                             confirmButton: 'btn btn-success',
    //                         },
    //                         buttonsStyling: false
    //                     })


    //                     swalWithBootstrapButtons.fire({
    //                         title: 'Gate updated',
    //                         icon: 'success',
    //                         confirmButtonText: 'OK',
    //                         reverseButtons: true
    //                     }).then((result) => {

    //                         window.open("../template/gate.jsp", "_self")
    //                     })

    //                     }
    //                     else{
    //                         alert("error")
    //                         swal("",xhr.responseJSON.message, "error")
    //                     }

                        

    //                 },
    //                 error: function (xhr) {
    //                     console.log(xhr);
    //                 },
    //             });
    //     })
    //     })
    // }
    // else{
    //     window.open("../../../Basic/template/404.jsp" , "_self")
    // }


    </script>

</body>

</html>