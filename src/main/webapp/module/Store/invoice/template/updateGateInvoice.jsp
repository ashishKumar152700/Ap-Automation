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
    
    <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

    <link rel="stylesheet" href="../css/invoice.css">
    

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <!-- <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css"> -->


    <script src="../../../../static/js/bootstrap.js"></script>


    

    <script src="../../../../custom/adjustable-invoice/js/index.js"></script>
    <!-- adduser JS -->


    <!-- Mainly scripts -->
    <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

    <script src="../../../Configration/js/globalConfig.js"></script>
    <script src="../js/addInvoice.js?v=" + $.getCurrentVersion()></script>
    <!-- <script src="../js/updateInvoice.js"></script> -->

    <!-- <script src="../../../Basic/js/updatestatus.js"></script> -->

    <!-- jQuery UI -->
    <script src="../../../../cdn/js/dataTables.min.js"></script>

    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>

    <script src="../../../../cdn/js/dataTables.select.min.js"></script>
    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->

    <script src="../../../../cdn/js/sweetalert.min.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>


    <style>
        /* .input_size{ */
            /* padding: 2px 2px !important; */
            /* height: 25px; */
        /* } */

        /* span>.current{

                background-color: #24537f !important;
                color : #fff !important;
        } */

        #purchase_type{
            text-transform: uppercase;
        }
        div.dataTables_info span.select-item {
            display: none !important;
        }
        .btn-secondary{
            background-color : #24537f !important;
            border: none !important ;
        }
/* 
        .select{
            padding: 0px 4px !important;
            height: 25px;
        } */

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

        /* .btn-outline-success {
            border-color: #18A689 !important;
        } */

        /* .btn-outline-success:hover {
            background-color: #18A689 !important;
        } */

        .col-form-label {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
        }

        .size {

            min-width: 800px;
        }

        /* .btn-success {
            border: 1px solid #18A689 !important;
            background-color: #18A689 !important;
        } */

        .resize {
            margin-bottom: 0.8rem !important;
        }


        .purchase_container {
            display: flex;
            /* flex-direction: row; */
            align-items: center;
            /* justify-content: space-between; */
            margin-bottom: 5px;
        }

        .purchase_box {
            display: flex;
            /* flex-direction: row; */
            flex-wrap: wrap;
            align-items: center;
            padding: 10px;
        }

        .textbox {
            background-color: #FFFFFFFF;
            background-image: none;
            border: 1px solid #e5e6e7;
            color: inherit;
            display: block;
            padding: 6px 12px;
            transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
            width: 75%;
            font-size: 14px;
        }

        .textbox:focus {
            border-color: #18A689;
            outline: 0;
        }

        .one {
            width: 2.7vw;
        }


        #fetch_btn {
            margin-top: 10px;
        }


        .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
            border-top-color: #24537f !important; 
            border-top-width: 4px !important;
        }

        label{
            display: flex;
            /* justify-content: center; */
            align-items: center;
        }

        .card{
            flex-direction: row !important;
        }
        .gate_number{
            padding-top:11px ;
        }
/* 
        input[type=date]:invalid::-webkit-datetime-edit {
    color: #999;
} */


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
        
        <!--% Modal for Company Code %-->
        <div class="modal inmodal fade" id="myModal5" tabindex="2"
                role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close"
                                data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <br><br>
                            <table cellspacing="0" cellpadding="4">
                                <tbody>
                                    <tr id="filter_col2" data-column="1"
                                        class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text"
                                                        class="form-control column_filter"
                                                        placeholder="Company Code"
                                                        aria-label="Admin Theme"
                                                        aria-describedby="button-addon2"
                                                        id="col1_filter">
                                                    <div class="input-group-append"
                                                        id="comp_search">
                                                        <button
                                                            class="btn btn-primary"
                                                            type="button"
                                                            id="button-addon"><i
                                                                class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td align="center"><input
                                                type="checkbox"
                                                class="column_filter invisible"
                                                id="col1_smart"
                                                checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-body">
                            <table id="comp_table"
                                class="display responsive nowrap text-left "
                                style="width: 100%">
                                                                        <thead>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Company Code</th>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Description</th>

                                                                        </thead>
                                                                        <tbody id="company_body">
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <div class="modal-footer m-2">
                                                                    <button type="button" class="btn btn-white"
                                                                        data-dismiss="modal">Close</button>
                                                                    <button id="company" type="button"
                                                                        data-dismiss="modal"
                                                                        class="btn btn-primary">Select</button>
                                                                </div>
                                                            </div>
                            </div>
        </div>
        
        <!--% Modal for business unit %-->
        <div class="modal inmodal fade" id="myModal6" tabindex="2"
                role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close"
                                data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <br><br>
                            <table cellspacing="0" cellpadding="4">
                                <tbody>
                                    <tr id="filter_col2" data-column="1"
                                        class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text"
                                                        class="form-control column_filter"
                                                        placeholder="Business Unit"
                                                        aria-label="Admin Theme"
                                                        aria-describedby="button-addon2"
                                                        id="col2_filter">
                                                    <div class="input-group-append"
                                                        id="business_search">
                                                        <button
                                                            class="btn btn-primary"
                                                            type="button"
                                                            id="button-addon"><i
                                                                class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td align="center"><input
                                                type="checkbox"
                                                class="column_filter invisible"
                                                id="col1_smart"
                                                checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-body">
                            <table id="Btable"
                                class="display responsive nowrap text-left "
                                style="width: 100%">
                                                                        <thead>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Business
                                                                                Number</th>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Description</th>

                                                                        </thead>
                                                                        <tbody id="Business_body">
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <div class="modal-footer m-2">
                                                                    <button type="button" class="btn btn-white"
                                                                        data-dismiss="modal">Close</button>
                                                                    <button id="business" type="button"
                                                                        data-dismiss="modal"
                                                                        class="btn btn-primary">Select</button>
                                                                </div>
                                                            </div>
                                                        </div>
        </div>
        <!--% Modal for State %-->
        <div class="modal inmodal fade" id="myModal8" tabindex="2"
                role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close"
                                data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <br><br>
                            <table cellspacing="0" cellpadding="4">
                                <tbody>
                                    <tr id="filter_col2" data-column="1"
                                        class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text"
                                                        class="form-control column_filter"
                                                        placeholder="State"
                                                        aria-label="Admin Theme"
                                                        aria-describedby="button-addon2"
                                                        id="col4_filter">
                                                    <div class="input-group-append"
                                                        id="state_search">
                                                        <button
                                                            class="btn btn-primary"
                                                            type="button"
                                                            id="button-addon"><i
                                                                class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td align="center"><input
                                                type="checkbox"
                                                class="column_filter invisible"
                                                id="col1_smart"
                                                checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-body">
                            <table id="state_table"
                                class="display responsive nowrap text-left "
                                style="width: 100%">
                                                                        <thead>
                                                                            <th class="text-left" data-hide="phone">
                                                                                State</th>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Description</th>

                                                                        </thead>
                                                                        <tbody id="state_body">
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <div class="modal-footer m-2">
                                                                    <button type="button" class="btn btn-white"
                                                                        data-dismiss="modal">Close</button>
                                                                    <button id="state_btn" type="button"
                                                                        data-dismiss="modal"
                                                                        class="btn btn-primary">Select</button>
                                                                </div>
                                                            </div>
                                                        </div>
        </div>


        <!--% Modal for Document company %-->
        <div class="modal inmodal fade" id="myModal7" tabindex="2"
                role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close"
                                data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <br><br>
                            <table cellspacing="0" cellpadding="4">
                                <tbody>
                                    <tr id="filter_col2" data-column="1"
                                        class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text"
                                                        class="form-control column_filter"
                                                        placeholder="Vendor Number"
                                                        aria-label="Admin Theme"
                                                        aria-describedby="button-addon2"
                                                        id="col5_filter">
                                                    <div class="input-group-append"
                                                        id="vendor_search">
                                                        <button
                                                            class="btn btn-primary"
                                                            type="button"
                                                            id="button-addon"><i
                                                                class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td align="center"><input
                                                type="checkbox"
                                                class="column_filter invisible"
                                                id="col5_smart"
                                                checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-body">
                            <table id="Vtable"
                                class="display responsive nowrap text-left "
                                style="width: 100%">
                                                                        <thead>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Vendor Number</th>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Description</th>
                                                                            <th class="text-left" data-hide="phone">
                                                                                Vendor Tax</th>

                                                                        </thead>
                                                                        <tbody id="Vendor_body">
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <div class="modal-footer m-2">
                                                                    <button type="button" class="btn btn-white"
                                                                        data-dismiss="modal">Close</button>
                                                                    <button id="vendor" type="button"
                                                                        data-dismiss="modal"
                                                                        class="btn btn-primary">Select</button>
                                                                </div>
                                                            </div>
                                                        </div>
        </div>
        
        

        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content  ">

            <div class="row">
                <div class="col-lg-12 ">
                <div class="card mx-auto white-bg">
                            <div class="col-5">
                                <div class="form-group row gate_number ">
                                    <!-- <label class="col-4 col-form-label">Gate Number</label> -->
                                    <div class="col-8"><h3 id="gate_number"></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
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
                            <div class="form-group row invisible"><label
                                    class="col-2 col-form-label mx-2 font-weight-bold">Gate Id : </label>
                                <div class="col-4"><input type="text" readonly class="form-control font-weight-bold"
                                        required="" id="gateId">
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="ibox">
                            <div class="ibox-content py-2">
                                <div class="text-center  my-2 resize d-flex justify-content-center">
                                    <input type="button" id="btn_panel"
                                        class="image-minimalize btn btn-primary px-4 mx-2" style="z-index: 1;"
                                        value="Hide Invoice" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div class="container-fluid  d-flex my-1 bg-white ">
                    <div class="upload-image box p-0 d-fix p-2 border rounded  " style="z-index: 1;">
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            Organization Detail
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">

                                                <div class="col-6 b-r" id="form1">
                                               
                                                    
                                     <div class="input-group col p-0"> 
                                        <label class="col-3 col-form-label p-0 mr-2">Company Code</label>   
                                        <input type="text" class="form-control input_size fetch_check" required=""
                                             aria-label="Admin Theme"
                                            aria-describedby="button-addon2" readonly id="company_code">
                                        <div class=" input-group-append">
                                            <button type="button" id="modeldata" class="btn btn-secondary select"
                                                data-toggle="modal" data-target="#myModal5">
                                                Select
                                            </button>
                                        </div>        
                                    </div>

                                    <br> <div class="input-group col p-0"> 
                                        <label class="col-3 col-form-label p-0 mr-2">Business Unit</label>   
                                        <input type="text" class="form-control input_size fetch_check" required=""
                                             aria-label="Admin Theme"
                                            aria-describedby="button-addon2" readonly id="business_unit">
                                        <div class=" input-group-append">
                                            <button type="button" id="modeldata" class="btn btn-secondary select"
                                                data-toggle="modal" data-target="#myModal6">
                                                Select
                                            </button>
                                        </div>        
                                    </div>

                                                  

                                                </div>
                                                <div class="col-6 b-r" id="form1">
                                                   
                                                    <div class="input-group col p-0"> 
                                                        <label class="col-3 col-form-label p-0 mr-2">Doc. Company</label>   
                                                        <input type="text" class=" form-control input_size required=""
                                                             aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" readonly id="form6Example10">
                                                        <div class=" input-group-append">
                                                            <button type="button" id="modeldata" class="btn btn-secondary select"
                                                                data-toggle="modal" data-target="#myModal">
                                                                Select
                                                            </button>
                                                        </div>        
                                                    </div>
                                                    <br><div class="input-group col p-0"> 
                                                        <label class="col-3 col-form-label p-0 mr-2">State</label>   
                                                        <input type="text" class=" form-control input_size fetch_check" required=""
                                                             aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" readonly id="state">
                                                        <div class=" input-group-append">
                                                            <button type="button" id="modeldata" class="btn btn-secondary select"
                                                                data-toggle="modal" data-target="#myModal8">
                                                                Select
                                                            </button>
                                                        </div>        
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
                                            Invoice Details
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">

                                                <div class="col-6 b-r" id="form3">
                                                    
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Invoice No.</label>
                                                        <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                                required="" id="invoice_no">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                        class="col-3 col-form-label">Invoice type</label>
                                                    <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                            required="" id="invoice_type">
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label
                                                    class="col-3 col-form-label">Currency Code</label>
                                                <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                        required="" id="curr_code">
                                                </div>
                                            </div>

                                            <div class="form-group row"><label
                                                class="col-3 col-form-label">Supplier GSTIN</label>
                                            <div class="col-9"><input type="text" readonly class="form-control input_size fetch_check"
                                                    required="" id="supplier_gstin">
                                            </div>
                                        </div>

                                        <div class="form-group row"><label
                                            class="col-3 col-form-label">TDS Code</label>
                                        <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                required="" id="tds_code">
                                        </div>
                                    </div>


                                     <div class="input-group col p-0"> 
                                        <label class="col-3 col-form-label p-0 mr-2">Vendor code</label> 
                                        <input type="text" class=" col-9 form-control input_size fetch_check" required=""
                                             aria-label="Admin Theme"
                                            aria-describedby="button-addon2" readonly id="vendor_code">
                                        <div class=" input-group-append">
                                            <button type="button" id="modeldata" class="btn btn-secondary select"
                                                data-toggle="modal" data-target="#myModal7">
                                                Select
                                            </button>
                                        </div>
                                   

                                    </div>
                            </div>

                                                <div class="col-6" id="form4">
                                                

                                                    <div class="form-group row">
                                                        <label class="col-3 col-form-label">Invoice Date </label>
                                                        <div class="col-9"><input type="date" class="form-control input_size fetch_check "
                                                                required="" id="invoice_date">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label class="col-3 col-form-label">GL Date</label>
                                                        <div class="col-9"><input type="date" class="form-control input_size fetch_check"
                                                                required="" id="gl_date">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-3 col-form-label">Amount</label>
                                                        <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                                required="" id="amount"></div>
    
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Source</label>
                                                        <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                                required="" id="source">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Physical Doc. Rec.</label>
                                                        <div class="col-9"><input type="text" class="form-control input_size fetch_check"
                                                                required="" id="physical_doc_rec">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label
                                                            class="col-3 col-form-label">Vendor name</label>
                                                        <div class="col-9"><input type="text" class="form-control input_size fetch_check" readonly
                                                                required="" id="vendor_name">
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                                
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            </div>
                            <div class="row"> 
                                <div class="col-12 ">
                                    <div class="panel panel-primary ">
                                        
                                        <div class="panel-body">
                                            <div class="" id="form5">
                                                <div class="">
                                                    <div class="">
                                                        <div class="row ">
                                                            <!-- <div class="purchase_box col-sm-10"> -->
                                                            <!-- <div class="col-1"></div> -->
                                                            <div class="col-4 b-r p-0 ">
                                                                <div class="d-flex">
                                                                    <div class="form-group col-6 mt-3 pt-1">
                                                                        <label class="control-label">Purchase Order</label>
                                                                        <input type="text" class="form-control" id="purchase_order" placeholder="PO">
                                                                    </div>
                                                                    
                                                                    <div class="form-group col-6 mt-3 pt-1">
                                                                        <label class="control-label">Purchase Order Type</label>
                                                                        <input type="text" class="form-control" id="purchase_type" placeholder="PO Type">
                                                                    </div>
                                                                </div>

                                                            
                                                            
                                                            <div class="form-group  p-2">
                                                                <input type="button" class="btn btn-secondary col-12" id="fetch_btn" value="Fetch Data">
                                                            </div>
                                                        </div>

                                                           <div class="col-8 p-0">
                                                            <div class="col d-flex justify-content-end">
                                                                <div class="container overflow-auto">
                                                                    <div class="row clearfix">
                                                                        <div class="">
                                                                            <table class="table table-bordered" id="tab_logic">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <!-- <th class="text-center"> PO No. </th> -->
                                                                                        <th class="text-center"> PO Number </th>
                                                                                        <th class="text-center"> PO Type</th>
                                                                                        <th class="text-center"> Company Code</th>
                                                                                        <th class="text-center"> Currency</th>
                                                                                        <th class="text-center"> Total </th>
                                                                                        <th class="text-center"> Amount </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr id="addr0">
                                                                                        
                                                                                        <td><input type="text" class="form-control input_size po text-right" required="" readonly value=""></td>
                                                                                        <td><input type="text" class="form-control input_size line_num text-right" required="" readonly id="line_num" value=""></td>
                                                                                        <td><input type="text" class="form-control input_size head_company text-right" required="" readonly  value=""></td>
                                                                                        <td><input type="text" class="form-control input_size currency_head text-right" required="" readonly id="" value=""></td>
                                                                                        <td><input type="text" class="form-control input_size details_status text-right" required="" readonly id="details_status"></td>
                                                                                        <td><input type="text" id="details_gate_id" required="" readonly class="form-control input_size details_gate_id text-right">
                                                                                            
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr id="addr1"></tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row d-flex justify-content-start ml-0">
                                                                        <input type="button" id="add_row" class="btn btn-default border invisible " value="Add row">&nbsp;
                                                                        <input type="button" id="delete_row" class="btn btn-default border invisible " value="Delete row">
                                                                    </div><br><br>
                                                                </div>
                                                            </div>
                                                           </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            </div>
                            
                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary ">
                                        
                                        <div class="panel-body">
                                    <div class="ibox ">
                                        <div class="p-0">

                                            <div class="tabs-container">

                                                <div class="ibox-content" id="loader">
                                                    <div class="sk-spinner sk-spinner-double-bounce">
                                                        <div class="sk-double-bounce1"></div>
                                                        <div class="sk-double-bounce2"></div>
                                                    </div>


                                                <ul class="nav nav-tabs" role="tablist">
                                                    <li><a class="nav-link active" id="data" data-toggle="tab" href="#tab-1">Line</a></li>
                                                    <li id="data_list" class="invisible"><a class="nav-link" id="data1" data-toggle="tab" href="#tab-2">GRN</a></li>
                                                </ul>

                                                <div class="tab-content">


                                                    
                                                    <div role="tabpanel" id="tab-1" class="tab-pane active">
                                                        <div class="panel-body">
                                                            <div class="row d-flex justify-content-end">
                                                                <div class="container overflow-auto ">
                                                                    <div class="row clearfix">
                                                                        <div class="">
                                                                            <table class="table table-bordered" id="tab_logicc">
                                                                                <colgroup>
                                                                                <col span="7">
                                                                                <col span="1" id="col_hide">
                                                                            </colgroup>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th class="text-center"> line No.</th>
                                                                                        <th class="text-center"> PO No.</th>
                                                                                        <th class="text-center"> Item</th>
                                                                                        <th class="text-center"> Quantity</th>
                                                                                        <th class="text-center"> Currency</th>
                                                                                        <th class="text-center"> Next Status</th>
                                                                                        <th class="text-center"> Last Status</th>
                                                                                        <th class="text-center"> Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody id="table-body">
                                                                                  <tr>
                                                                                        <td><input type="text" readonly class="form-control input_size line_numm text-right" id="line_num"></td>
                                                                                        <td><input type="text" readonly class="form-control input_size onee text-right" value=""></td>
                                                                                        <td><input type="text" readonly class="form-control input_size po_item text-right" ></td>
                                                                                        <td><input type="text" class="form-control input_size details_statuss text-right" id="details_status"></td>
                                                                                        <td><input type="text" readonly id="details_gate_id" class="form-control input_size currency text-right"></td>
                                                                                        <td><input type="text" id="item_code" readonly class="form-control input_size next_status text-right"></td>
                                                                                        <td><input type="text" id="hsn_code" readonly class="form-control input_size last_status text-right"></td>
                                                                                    <td><button type="button" class="btn btn-danger delete-row">Delete</button></td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                              <input type="button" id="add_roww" class="btn btn-primary invisible" value="Add Row"/> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="row clearfix">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                

                                                    <div role="tabpanel" id="tab-2" class="tab-pane">
                                                        <div class="panel-body">
                                                            <div class="row d-flex justify-content-end">
                                                                <div class="container overflow-auto ">
                                                                    <div class="row clearfix">
                                                                        <div class="">
                                                                            <table class="table table-bordered" id="grn_table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th class="text-center"> Order NUmber</th>
                                                                                        <th class="text-center"> 2nd Item Number</th>
                                                                                        <th class="text-center"> Business Unit</th>
                                                                                        <th class="text-center"> Document Number</th>
                                                                                        <th class="text-center"> Do ty</th>
                                                                                        <th class="text-center"> Quantity Recieved</th>
                                                                                        <th class="text-center"> Amount Open</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody id="grn_table_body">
                                                                                  <tr>
                                                                                        <td><input type="text" readonly class="form-control input_size order_no text-right" id="line_num"></td>
                                                                                        <td><input type="text" readonly class="form-control input_size item_no text-right" id="details_status"></td>
                                                                                        <td><input type="text" readonly class="form-control input_size business_unit_grn text-right" id="details_status"></td>
                                                                                        <td><input type="text" readonly class="form-control input_size document_no text-right" id="details_status"></td>
                                                                                        <td><input type="text" readonly class="form-control input_size do_ty text-right" id="details_status"></td>
                                                                                        <td><input type="text" readonly class="form-control input_size quantity_recieved text-right" id="details_status"></td>
                                                                                        <td><input type="text" id="hsn_code" readonly class="form-control input_size amount_open text-right"></td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                              <input type="button" id="grn_row" class="btn btn-primary invisible" value="Add Row"/> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="row clearfix">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>

                                            </div><br>


                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>


                                </div>
                                

                            </div>
<!-- adsfadfs -->
<div class="row">
    <div class="col-12">
        <div class="panel panel-primary ">
            
            <div class="panel-body d-flex">
                
                    <input type="button" id="create_grn" class="btn col-6  border btn-secondary" value="Create GRN">
                    <input type="button" id="reverse_grn" class="btn col-6  border btn-secondary invisible" value="Reverse GRN">

    </div>
</div>


    </div>
    

</div>

<div class="row">
    <div class="col-12">
        <div class="panel panel-primary ">
            
            <div class="panel-body d-flex">
               
                    <input type="button" id="submit_invoice"  class="btn col-sm-6 btn-success border" value="Submit">
                    <input type="button"  class="btn col-sm-6 btn-danger border" value="Reject">
              

    </div>
</div>
    </div>

</div>
                        </div>
                    </div>
                    <div class="handler  bg-white "></div>
                    <div class="upload-image box border bg-body rounded d-f" id="hide" style="z-index: 1;">
                        <div class="container-fluid h-100 p-0 ravi">
                            <!-- <input class="my-1" type="file" id="inputimg" accept="*" onchange="previewFile()" crossorigin /> -->
                        </div>
                    </div>
                </div>
            </form>
            <br>
            <!--% including footer %-->
            <jsp:include page="../../../Basic/template/footer.jsp" />

        </div>

        <script src="../../../../custom/js/breadcrumb.js"></script>
        
        
        <script src="../js/updateInvoice.js?v=" + $.getCurrentVersion()></script>
        <script src="../../../Basic/js/updatestatus.js"></script>



</body>

</html>