<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Update Invoice</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">

    <link rel="stylesheet" href="../css/updateInvoice.css">

    <script src="../../../../static/js/bootstrap.js"></script>

    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>


    <style>
        /* .form-control {
            padding: 2px 2px !important;
            height: 22px;
        }

        .form-group {
            margin-bottom: 0.6rem;
        }

        label {
            display: inline-block;
            margin-bottom: .5rem;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .btn-outline-success {
            border-color: #24537f !important;
        }

        .btn-outline-success:hover {
            background-color: #24537f !important;
        }

        .col-form-label {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
        }

        .size {

            min-width: 800px;
        }
        .btn-success {
            border: 1px solid #24537f !important;
            background-color: #24537f !important;
        }
        .resize{
          
            margin-bottom: 0.8rem!important;
        } */
        .card{
            flex-direction: row !important;
        }
        .gate_number{
            padding-top:11px ;
        }
    </style>

</head>

<body>

    <script>
        let sessionString = localStorage.getItem("userrole")
        let menus = JSON.parse(localStorage.getItem("menuData"))
        let menuroles;
        let name = JSON.parse(sessionString);

        
        if(name != null)
        {
             let data_menu = menus.map((item)=> {
                 if(item.id == 24){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                 }
                 }
             )
             let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Store")  || name.includes("Admin"))
             if(returned_arr.flat(Infinity).includes(true))
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
                            <div class="col-6">
                                <div class="form-group row gate_number "><label class="col-3 col-form-label">Gate Number</label>
                                    <div class="col-9"><input type="text"
                                        required="" maxlength="20" id="gate_number" readonly
                                        placeholder="Gate no" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
                            </div>
                    </div>
                </div>
            </div><br>

            <form action="" id="invoice_form">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="ibox ">
                            <div class="ibox-content py-3">
                                <input class="my-0 btn btn-primary " type="file" id="inputimg" accept="*"
                                    onchange="previewFile()" crossorigin="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="ibox ">
                            <div class="ibox-content py-2">
                                <div class="text-center  my-2 resize d-flex justify-content-center">
                                    <input type="submit" class="btn btn-primary mx-2" id="invoice"
                                        value="Submit Invoice">
                                    <input type="button" id="btn_panel"
                                        class="image-minimalize btn btn-primary px-4 mx-2" style="z-index: 1;"
                                        value="Hide Panel">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="container-fluid  d-flex my-1 bg-white ">
                    <div class="upload-image box p-0 d-fix p-2 border rounded" style="z-index: 1;">
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            Default Panel
                                        </div>
                                        <div class="panel-body">
                                            <!-- <div class="container"> -->
                                            <div class="row">
                                                <div class="col-6 b-r" id="form1">
                                                    <h4 class=" w-100 font-weight-bold">Billed To</h4>
                                                    <hr>

                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label ">Name</label>
                                                        <div class=" col-9"><input type="text" class="form-control  "
                                                                required="" id="billto_name" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Address</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="billto_address1">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label invisible">:</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="billto_address2">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row "><label
                                                            class="col-3 col-form-label invisible ">:</label>
                                                        <div class="col-9"><input type="text" class="form-control "
                                                                required="" id="billto_address3"></div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">GSTIN</label>
                                                        <div class="col-9"><input type="text" class="form-control  "
                                                                required="" id="billto_gstin">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">City</label>
                                                        <div class="col-9"><input type="text" class="form-control  "
                                                                required="" id="billto_city">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">State</label>
                                                        <div class="col-9"><input type="text" class="form-control  "
                                                                required="" id="billto_state">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">State Code</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="billto_zipcode">
                                                        </div>
                                                    </div><br>
                                                </div>

                                                <div class="col-6 " id="form2">
                                                    <h4 class="w-100 font-weight-bold">Shipped To</h4>
                                                    <hr>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Name</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="shipto_name">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Address</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="shipto_address1">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label invisible">:</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="shipto_address2">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label invisible">:</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="shipto_address3">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">GSTIN</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="shipto_gstin">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">City</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="shipto_city">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">State</label>
                                                        <div class="col-9"><input type="text" class="form-control "
                                                                required="" id="shipto_state">
                                                        </div>

                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">State Code</label>
                                                        <div class="col-9"><input type="text" class="form-control "
                                                                required="" id="shipto_zipcode">
                                                        </div>
                                                    </div><br>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            Default Panel
                                        </div>
                                        <div class="panel-body">
                                            <!-- <div class="container"> -->
                                            <div class="row">

                                                <div class="col-6 b-r" id="form3">
                                                    <h4 class="w-100 font-weight-bold">Supplier</h4>
                                                    <hr>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Invoice No.</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="supplier_invoice_nbr">
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label class="col-3 col-form-label">Date </label>
                                                        <div class="col-9"><input type="date" class="form-control "
                                                                required="" id="supplier_date">
                                                        </div>
                                                    </div>

                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Order No.</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="supplier_order_nbr">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Vehicle No.</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="supplier_vehicle_nbr">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Order Date</label>
                                                        <div class="col-9"><input type="date" class="form-control"
                                                                required="" id="supplier_order_date">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Place of
                                                            Supply</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="supplier_supply_place">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-4 col-form-label">Date
                                                            & Time of
                                                            Supply</label>
                                                        <div class="col-4"><input type="date" class="form-control"
                                                                required="" id="supplier_supply_date">
                                                        </div>
                                                        <div class="col-4"><input type="time" step="1"
                                                                class="form-control" required=""
                                                                id="supplier_supply_time">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-4 col-form-label">Mode
                                                            of
                                                            Dispatch</label>
                                                        <div class="col-8"><input type="text" class="form-control"
                                                                required="" id="supplier_despatch_mode">
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="col-6" id="form4">
                                                    <h4 class="w-100 font-weight-bold invisible">Info</h4>
                                                    <hr>
                                                    <div class="form-group row"><label class="col-3 col-form-label">Gate
                                                            Id</label>
                                                        <div class="col-3"><input type="text" class="form-control"
                                                                required="" id="gate_id"></div>
                                                        <label class="col-3 col-form-label">Status</label>
                                                        <div class="col-3"><input type="text" class="form-control "
                                                                required="" id="status"></div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Vehicle Nbr</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="vehicle_nbr">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Material
                                                            Type</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="material_type">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Weight</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="weight"></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-3 col-form-label">In
                                                            & Out
                                                            Time</label>
                                                        <div class="col-4"><input type="time" step="1"
                                                                class="form-control" required="" id="in_time"></div>
                                                        <div class="col-5"><input type="time" step="1"
                                                                class="form-control" required="" id="out_time"></div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Devision</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="devision"></div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Remark</label>
                                                        <div class="col-9"><input type="text" class="form-control"
                                                                required="" id="remark"></div>

                                                    </div>
                                                    <div class="form-group row">
                                                        <label class="col-3 col-form-label">Queue Id</label>
                                                        <div class="col-9"><input type="text" class="form-control "
                                                                required="" id="queue_id"></div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            Default Panel
                                        </div>
                                        <div class="panel-body">
                                            <div class="row d-flex justify-content-end">
                                                <div class="container overflow-auto">
                                                    <div class="row clearfix">
                                                        <div class="size">
                                                            <table class="table table-bordered table-hover"
                                                                id="tab_logic">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-center"> Sr. No </th>
                                                                        <th class="text-center"> line nummber</th>
                                                                        <th class="text-center"> Status </th>
                                                                        <th class="text-center"> Gate Id </th>
                                                                        <th class="text-center">Item Code</th>
                                                                        <th class="text-center"> HSN Code </th>
                                                                        <th class="text-center"> Quantity </th>
                                                                        <th class="text-center"> UOM </th>
                                                                        <th class="text-center"> Rate </th>
                                                                        <th class="text-center"> Amount </th>
                                                                        <th class="text-center"> Action </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr id='addr0'>
                                                                        <td><input type="number"
                                                                                class="form-control one" value="1" />
                                                                        </td>
                                                                        <td><input type="number" readonly
                                                                                class="form-control line_num"
                                                                                required="" id="line_num" value="1" />
                                                                        </td>
                                                                        <td><input type="number"
                                                                                class="form-control details_status"
                                                                                required="" id="details_status" />
                                                                        </td>
                                                                        <td><input type="number" id="details_gate_id"
                                                                                required=""
                                                                                class="form-control details_gate_id" />
                                                                        </td>
                                                                        <td><input type="text" id="item_code"
                                                                                required=""
                                                                                class="form-control item_code" />
                                                                        </td>
                                                                        <td><input type="number" id="hsn_code"
                                                                                required=""
                                                                                class="form-control hsn_code" />
                                                                        </td>
                                                                        <td><input type="number" id="quantity"
                                                                                required=""
                                                                                class="form-control quantity" />
                                                                        </td>
                                                                        <td><input type="text" id="uom" required=""
                                                                                class="form-control uom" /></td>
                                                                        <td><input type="number" id="rate" required=""
                                                                                class="form-control rate" /></td>
                                                                        <td><input type="number" id="amount" required=""
                                                                                class="form-control amount" /></td>
                                                                        <td><button type="button"
                                                                                onclick="deleteRow(this)"
                                                                                class="btn btn-sm btn-danger border p-0 w-100">
                                                                                X </button></td>

                                                                    </tr>
                                                                    <tr id='addr1'></tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="row d-flex justify-content-start ml-1">
                                                        <input type="button" id="add_row"
                                                            class="btn btn-default pull-left border float-right "
                                                            value="Add row" />&nbsp;
                                                        <input type="button" id='delete_row'
                                                            class="pull-right btn btn-default border float-right"
                                                            value="Delete row" />
                                                    </div><br><br>
                                                </div>
                                                <!-- <input type="submit" class="btn btn-outline-success mt-4 mr-5" id="invoice"
                                                    value="submit invoice"> -->
                                            </div><br><br>

                                        </div>

                                    </div>
                                </div>

                            </div>
            </form>

        </div>
    </div>

    <div class="handler  bg-white "></div>
    <div class="upload-image box border bg-body rounded d-f" id="hide" style="z-index: 1;">
        <div class="container-fluid h-100 p-0 ravi">

        </div>
    </div>
    </div>
    </div>
    <br>
    <!--% including footer %-->
    <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    

    <script src="../../../../custom/adjustable-invoice/js/index.js"></script>

    <!-- adduser ../../../../JS -->

    <script src="../../../Configration/js/globalConfig.js"></script>
    <script src="../js/addInvoice.js?v=" + $.getCurrentVersion()></script>
    <script src="../js/updateInvoice.js?v=" + $.getCurrentVersion()></script>


    <!-- Mainly scripts -->
    <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>


    <!-- jQuery UI -->
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>



    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>

</body>

</html>