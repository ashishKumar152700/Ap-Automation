<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Add Invoice</title>
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



    <!-- <script src="../../../Basic/js/updateStatus.js"></script> -->

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
                                <div class="form-group row gate_number "><label class="col-4 col-form-label">Gate Number</label>
                                    <div class="col-8"><input type="text"
                                        required="" maxlength="20" id="gate_number" readonly
                                        placeholder="Gate Number" class="form-control">
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
                                                        required="" id="gate_no">
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



        <script>




            // var checkstatus = $.checkstatus()



            function previewFile() {
                const file = document.querySelector('input[type=file]').files[0];
                console.log(file.name);
                let extension = file.name.split('.');
                extension = extension.reverse();

                console.log(extension[0]);
                if (extension[0] == "jpg") {
                    $(".ravi").children().remove();
                    $(".ravi").append(`<img class="w-100 h-100" src="" id="iframe-pdf"></img>`)
                    const preview = document.querySelector('img');
                    const reader = new FileReader();
                    var filename = file.name;


                    reader.addEventListener("load", function () {
                        preview.src = reader.result;
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                } else if (extension[0] == "pdf") {
                    $(".ravi").children().remove();
                    $(".ravi").append(`<object data="" type="application/pdf" class="w-100 h-100"></object>`)
                    const preview = document.querySelector('object');
                    const reader = new FileReader();
                    var filename = file.name;


                    reader.addEventListener("load", function () {
                        preview.data = reader.result;
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }
            }

      

            $(window).load(()=>{

                
                $("#btn_panel").trigger("click");
                let sessionString = sessionStorage.getItem('gateid')
                let gate_number = JSON.parse(sessionString);
                var checkstatus = $.checkstatus(gate_number,"ture")
                
                let gateno = sessionStorage.getItem('gateno')
                let gate = JSON.parse(gateno);
                
                // console.log(gate_number);
                //  console.log(checkstatus);
                // $("#gate_number").val(gate)
            })

            $('input.global_filter').on('keyup click', function () {
                filterGlobal();
            });


            var tab;
            var table;
            var comp;
            var state;

            var login = $.login();
            var test = $.test();

            $.fn.DataTable.ext.pager.numbers_length = 5;
            $.ajax ({

                    type: 'GET',    
                    url: `${[login[0].url]}/jderest/v2/dataservice/table/F0006?$field=F0006.MCU&$field=F0006.DL01&$filter=F0006.MCU%20EQ%20*&$limit=50`,
                    // dataSrc : "fs_DATABROWSE_F0006",
                    headers: {
                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                    },
                    success : function(data) {
                    //Success block  
                            var Business = data.fs_DATABROWSE_F0006.data.gridData.rowset;
                            for(let i = 0 ; i < Business.length ; i++)

                            {

                            $("#Business_body").append(`<tr><td>${Business[i].F0006_MCU}</td><td>${Business[i].F0006_DL01}</td></tr>`)

                            }

                    },

                    error: function (xhr,ajaxOptions,throwError){

                    //Error block

                    },

                    complete : ()=>{

                    tab = $("#Btable").DataTable({
                            language: {
                            'paginate': {
                            'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                            'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                            }
                    },
                    dom: '<"top">t<"bottom"ip>',
                    ordering: true,
                    lengthMenu : [5,10,20,25,50],
                    pagingType: "simple_numbers",
                    select: true,
                    
                });

                // console.log(tab.page());
            }
             
        })


        $('#Btable tbody').on( 'click', 'tr', function () {
            var data= tab.row( this ).data();
            var row  = $(this)[0];
            function search(data)
            { 
                console.log("hello");
                $("#business_unit").val(data[0] +" - "+ data[1]); 

                $(row).removeClass("selected");
            }
            
            $("#business").click(()=>{
                
                search(data);
                
            })
        } );


    $("#business_search").click(() => {
    $('#Btable').DataTable().column(0).search(
        $('#col' + 2 + '_filter').val(),
        $('#col' + 2     + '_smart').prop('checked')
        ).draw();
    })

        // console.log($("#business"));




        $.ajax ({

                type: 'GET',    

                url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20V`,
                headers: {
                    "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                },
                success : function(data) {

                var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;

                        for(let i = 0 ; i < supplier.length ; i++)
                        {
                            $("#Vendor_body").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
                        }
                },
                error: function (xhr,ajaxOptions,throwError){
                //Error block
                },
                complete : ()=>{      


                        table = $("#Vtable").DataTable({
                        language: {
                        'paginate': {
                        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                        }
                        },
                        dom: '<"top">t<"bottom"ip>',
                        ordering: true,
                        lengthMenu : [5,10,20,25,50],
                        pagingType: "simple_numbers",
                        select: true,
                    });
                    table.column(2).visible(false);
                    
                }

                })

               


                $('#Vtable tbody').on( 'click', 'tr', function () {
                    var dataa= table.row(this).data();
                    var roww  = $(this)[0];


                    console.log(dataa[2]);
                    function searchh(dataa)
                    { 
                        $("#vendor_code").val(dataa[0]); 
                        $("#supplier_gstin").val(dataa[2])
                        $("#vendor_name").val(dataa[1]);


                        $(roww).removeClass("selected");
                    }
                    
                    $("#vendor").click(()=>{


                        searchh(dataa);
                        
                    })
                } );

                $("#vendor_search").click(() => {
                $('#Vtable').DataTable().column(0).search(
                    $('#col' + 5 + '_filter').val(),
                    $('#col' + 5     + '_smart').prop('checked')
                    ).draw();
                })




                $.ajax ({

                        type: 'GET',    

                        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0010?$field=F0010.CO&$field=F0010.NAME&$filter=F0010.CO%20EQ%20*`,
                        headers: {
                            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                        },
                        success : function(data) {

                            // console.log(data);

                        var company = data.fs_DATABROWSE_F0010.data.gridData.rowset;

                                for(let i = 0 ; i < company.length ; i++)
                                {
                                    $("#company_body").append(`<tr><td>${company[i].F0010_CO}</td><td>${company[i].F0010_NAME}</td></tr>`)
                                }
                        },
                        error: function (xhr,ajaxOptions,throwError){
                        //Error block
                        },
                        complete : ()=>{            
                            // console.log("complete");
                        comp = $("#comp_table").DataTable({
                        language: {
                        'paginate': {
                        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                        }
                        },
                        dom: '<"top">t<"bottom"ip>',
                        ordering: true,
                        lengthMenu : [5,10,20,25,50],
                        pagingType: "simple_numbers",
                        select: true,
                        });
                        }

                        })



                        $('#comp_table tbody').on( 'click', 'tr', function () {
                            var dat= comp.row( this ).data();
                            var rows  = $(this)[0];

                            // console.log(dat[0]);
                            function searchs(dat)
                            { 
                                $("#company_code").val(dat[0]  +" - "+ dat[1]); 
                                // $("#vendor_name").val(dat[1]); 

                                $(rows).removeClass("selected");
                            }
                            
                            $("#company").click(()=>{

                                searchs(dat);
                                
                            })
                        } );

                        $("#comp_search").click(() => {
                        $('#comp_table').DataTable().column(0).search(
                            $('#col' + 1 + '_filter').val(),
                            $('#col' + 1     + '_smart').prop('checked')
                            ).draw();
                        })







                        // STATE PENDENING

                        $.ajax ({

                                    type: 'GET',    

                                    url: `${[login[0].url]}/jderest/v2/dataservice/table/F0005?$field=F0005.KY&$field=F0005.DL01&$filter=F0005.SY%20EQ%2000&$filter=F0005.RT%20EQ%20S`,
                                    headers: {
                                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                    },
                                    success : function(data) {

                                        
                                        var state = data.fs_DATABROWSE_F0005.data.gridData.rowset;
                                        
                                        // console.log(data);
                                            for(let i = 0 ; i < state.length ; i++)
                                            {
                                                $("#state_body").append(`<tr><td>${state[i].F0005_KY}</td><td>${state[i].F0005_DL01}</td></tr>`)
                                            }
                                    },
                                    error: function (xhr,ajaxOptions,throwError){
                                    //Error block
                                    },
                                    complete : ()=>{            
                                        // console.log("complete");
                                    state = $("#state_table").DataTable({
                                    language: {
                                    'paginate': {
                                    'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                                    'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                                    }
                                    },
                                    dom: '<"top">t<"bottom"ip>',
                                    ordering: true,
                                    lengthMenu : [5,10,20,25,50],
                                    pagingType: "simple_numbers",
                                    select: true,
                                    });
                                    }

                                    })


                                    $('#state_table tbody').on( 'click', 'tr', function () {
                                            var sData= state.row( this ).data();
                                            var sRow  = $(this)[0];

                                            // console.log(sData[0]);
                                            function stateSearch(sData)
                                            { 
                                                $("#state").val(sData[0] + " - " + sData[1]); 
                                                // $("#vendor_name").val(dat[1]); 

                                                $(sRow).removeClass("selected");
                                            }
                                            
                                            $("#state_btn").click(()=>{

                                                stateSearch(sData);
                                                
                                            })
                                        } );


                                        $("#state_search").click(() => {
                                        $('#state_table').DataTable().column(0).search(
                                            $('#col' + 4 + '_filter').val(),
                                            $('#col' + 4     + '_smart').prop('checked')
                                            ).draw();
                                        })




                        var match = 0;
                        var arr = []
                        var overAllCurrency = [];

                        var k = 0;
                        var m = 1;

                        // var count = $("#tab_logicc tr").length - 2

                        var b = 2;

                        $("#fetch_btn").click(() => {

                               
                        console.log($(".fetch_check").length -1);

                            // for(let i = 0 ; i < $(".fetch_check").length ; i++)
                            // {
                            //     let check = $(".fetch_check")[i]
                            //     console.log("fetch : " + i);
                            //     if($(check).val() !=  "")
                            //     {
                            //         $(check).css("border" , "1px solid #e5e6e7")

                            //         if(i == $(".fetch_check").length-1)
                            //         {
                            //             console.log("access");

                                        $.ajax({
                                                url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_PurchaseOrder`,
                                                type: "POST",
                                                data: JSON.stringify({
                                                    // token: `${data.userInfo.token}`,
                                                    po_number: $("#purchase_order").val(),
                                                    po_type: $("#purchase_type").val(),
                                                    // supplier : $("#vendor_code").val()
                                                    supplier : 4343

                                                }),
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type':'application/json',
                                                    "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                                },

                                                success: function (data) {

                                                    // console.log(data);
                                                    let count = $("#tab_logicc tr").length - 2

                                                    // console.log("count : " +count);
                                                    
                                                    var Purchase_order = $("#purchase_order").val();

                                                    
                                                    if (arr.includes(Purchase_order) == false && data.amount != 0 && (overAllCurrency.length == 0 || overAllCurrency.includes(data.currency_code) == true)) {

                                                        
                                                        for (let i = 0; i < k ; i++)
                                                        {
                                                            $("#add_row").trigger("click");
                                                            
                                                        }
                                                        
                                                        k = 1;
                                                        let count_len = $("#tab_logic tr").length - 3
                                                        
                                                    
                                                            for (let i = (count_len == 0 ? count_len : count_len ); i < (count_len == 0 ? count_len + m : (count_len + 1) + m) ; i++)
                                                                {
                                                                    let head_one = $(".po")[i]
                                                                    let head_line = $(".line_num")[i]
                                                                    let head_company = $(".head_company")[i]
                                                                    let head_currency = $(".currency_head")[i]
                                                                    let head_status = $(".details_status")[i];
                                                                    let head_gate_id = $(".details_gate_id")[i];
                                                                    
                                                                    $(head_one).val(data.order_number)
                                                                    $(head_line).val(data.order_type)
                                                                    $(head_company).val(data.order_company)
                                                                    $(head_currency).val(data.currency_code)
                                                                    $(head_gate_id).val(data.amount)

                                                                    
                                                                }
                                                                
                                                                let validate = $(".onee")[0]


                                                        for (let i = 0; i < (count == 0 && $(validate).val() == "" ? data.po_details.length - 1 : data.po_details.length); i++)
                                                        // for(let i = 0 ; i <     ; i++)
                                                        {
                                                            $("#add_roww").trigger("click");
                                                        }


                                                        // console.log($(validate).val() ==  "");

                                                        // console.log(count == 0 ? count : (count + 1));


                                                        for (let i = (count == 0 ? count : (count + 1)) , j = 0; i < (count == 0 ? count + data.po_details.length  :  (count + 1) + data.po_details.length ); i++, j++)
                                                        // for(var i = 0 ; i < data.po_details.length ;  i++)
                                                        {
                             

                                                            if($(validate).val() != null && count == 0 && b  == 0){

                                                                // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

                                                                for(let s = 0 ; s < data.po_details.length ; s++)
                                                                {

                                                                    let one = $(".onee")[s+1]
                                                                    let line = $(".line_numm")[s+1]
                                                                    let item = $(".po_item")[s+1]
                                                                    let status = $(".details_statuss")[s+1];
                                                                    let gate_id = $(".currency")[s+1];
                                                                    let next_status = $(".next_status")[s+1];
                                                                    let last_status = $(".last_status")[s+1]
                                                                
        
        
                                                                    $(one).val(data.po_details[s].order_number)
                                                                    $(line).val(data.po_details[s].line_number)
                                                                    $(item).val(data.po_details[s].item_number)
                                                                    $(status).val(data.po_details[s].quantity_ordered)
                                                                    $(gate_id).val(data.po_details[s].currency_code)
                                                                    $(next_status).val(data.po_details[s].next_status);
                                                                    $(last_status).val(data.po_details[s].last_status);
                                                                }

                                                                break;
                                                            }
                                                            else{
                                                                // console.log("i : " + i);
                                                                let one = $(".onee")[i]
                                                                let line = $(".line_numm")[i]
                                                                let item = $(".po_item")[i]
                                                                let status = $(".details_statuss")[i];
                                                                let gate_id = $(".currency")[i];
                                                                let next_status = $(".next_status")[i];
                                                                let last_status = $(".last_status")[i]
                                                            
    
    
                                                                $(one).val(data.po_details[j].order_number)
                                                                $(line).val(data.po_details[j].line_number)
                                                                $(item).val(data.po_details[j].item_number)
                                                                $(status).val(data.po_details[j].quantity_ordered)
                                                                $(gate_id).val(data.po_details[j].currency_code)
                                                                $(next_status).val(data.po_details[j].next_status);
                                                                $(last_status).val(data.po_details[j].last_status);

                                                            }

                                                            b = data.po_details.length == 1 ? 1 : 2;
                                                            

                                                        // }
                                                    }
                                                    match = Purchase_order;
                                                    arr.push(Purchase_order)
                                                    overAllCurrency.push(data.currency_code)
                                                        }

                                                        else if(data.amount == 0)
                                                        {

                                                            const swalWithBootstrapButtons = Swal.mixin({
                                                            customClass: {
                                                                confirmButton: 'btn btn-sm btn-secondary mx-1',
                                                                // cancelButton: 'btn btn-sm btn-danger mx-1'
                                                            },
                                                            buttonsStyling: false
                                                        })

                                                            swalWithBootstrapButtons.fire({
                                                            // title: 'Are you sure?',
                                                            title: `Amount is 0`,
                                                            icon: 'warning',
                                                            // showCancelButton: true,
                                                            confirmButtonText: 'OK',
                                                            // cancelButtonText: 'cancel!',
                                                            reverseButtons: true
                                                        })
                                                        }

                                                        else if(overAllCurrency.includes(data.currency_code) == false)
                                                        {
                                                            const swalWithBootstrapButtonss = Swal.mixin({
                                                            customClass: {
                                                                confirmButton: 'btn btn-sm btn-secondary mx-1',
                                                                // cancelButton: 'btn btn-sm btn-danger mx-1'
                                                            },
                                                            buttonsStyling: false
                                                        })

                                                            swalWithBootstrapButtonss.fire({
                                                            // title: 'Are you sure?',
                                                            title: `The Currency is not same`,
                                                            icon: 'warning',
                                                            // showCancelButton: true,
                                                            confirmButtonText: 'OK',
                                                            // cancelButtonText: 'cancel!',
                                                            reverseButtons: true
                                                        })
                                                        }
                                                    },

                                                    error : function(xhr){

                                                        console.log(xhr);

                                                        const swalWithBootstrapButtons = Swal.mixin({
                                                            customClass: {
                                                                confirmButton: 'btn btn-sm btn-secondary mx-1',
                                                                cancelButton: 'btn btn-sm btn-danger mx-1'
                                                            },
                                                            buttonsStyling: false
                                                        })

                                                        swalWithBootstrapButtons.fire({
                                                            // title: 'Are you sure?',
                                                            text: `${xhr.responseJSON.message.DREQ_PO_Header.Message}`,
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonText: 'OK',
                                                            cancelButtonText: 'cancel!',
                                                            reverseButtons: true
                                                        })
                                                    }

                                                })


                                                            // }
                                                            
                                                        // }
                                    
                                    // else{
                                    //     $(check).css("border" , "1px solid #24537f")
                                    // }
                                // }
                                        
                        })





                    var grn_head = [];
                    var receipt_lines = [];
                    var po_check = [];
                    var reciept_no = []

                    $("#create_grn").click(()=>{

                        $("#loader").addClass("sk-loading")
                            let tab_head_len = $("#tab_logic tr").length - 3
                            let tab_details_len = $("#tab_logicc tr").length - 2


                          function checked()  {
                              for(let j = 0 ; j <= tab_details_len ; j++)
                              {
                                let details_po = $(".onee")[j]

                                // console.log(po_check[0]);
                                // console.log("==============");
                                // console.log($(details_po).val());

                                if(po_check[0] == $(details_po).val())
                                {

                                    let line = $(".line_numm")[j]
                                    let status = $(".details_statuss")[j];
                                    let hsn_code = $(".amount")[j];
    
                                    let Line_Number = $(line).val();
                                    let Quantity = $(status).val();
                                    let Amount = $(hsn_code).val();
    
                                    receipt_lines.push({Line_Number,Quantity,Amount})
                                }
                              
                              }

                            //   console.log(po_check);

                              po_check = []
                          }



                            for(i = 0 ; i<= tab_head_len ; i++)
                            {
                                let grn_order_no = $(".po")[i]
                                let grn_order_type = $(".line_num")[i]
                                let grn_order_company = $(".head_company")[i]
                                
                                let Order_Number = $(grn_order_no).val()
                                let Order_Type = $(grn_order_type).val()
                                let Order_Company = $(grn_order_company).val()
                                let G_L_Date = ""
                                let Receipt_Date = ""
                                let P4312_Version = "ZJDE0001"
                                
                                po_check.push(Order_Number);
                                checked();

                                grn_head.push({Order_Number,Order_Type,Order_Company,G_L_Date,Receipt_Date,P4312_Version,receipt_lines})

                                receipt_lines = [];
                                
                            }
                            console.log(grn_head);

                        // })

                        var d = 2;

                        for(let k = 0 ; k < grn_head.length ; k++)
                        {

                            // console.log("inside grn loop : " + k);

                            $.ajax({
                                url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_GRN`,
                                type : 'POST',
                                data : JSON.stringify(grn_head[k]),
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type':'application/json',
                                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                    },
    
                                    success: function(data){

                                        console.log(data.receipt_document);
                                        let receipt_document = data.receipt_document;
                                        reciept_no.push(receipt_document)

                                        $.audit("GAURAV" , "JDV920" , "http://103.65.20.159:8081/jderest/v3/orchestrator/ORCH_GRN" , JSON.stringify(grn_head[k]) , "success" , "P" )
    
                                        $.ajax({
                                                url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$filter=F43121.MATC%20EQ%201&$field=F43121.MCU&$filter=F43121.DOC%20EQ%20${data.receipt_document}`,
                                                // type : 'POST',
                                                // data : JSON.stringify(grn_head),
                                                headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type':'application/json',
                                                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                                    },
    
                                                    success: function(data){

                                                        $("#data_list").removeClass("invisible");
                                                        $("#data1").trigger("click")

                                                        // console.log(data);
                                                        // let grn_len = $("#grn_table tr").length - 2
                                                        let grn_rows = data.fs_DATABROWSE_F43121.data.gridData.rowset
                                                        
                                                        let table_rows = $("#grn_table tr").length - 2;
                                                        
                                                        let valid_data = $(".order_no")[0]

                                                        for(let j = 0 ; j < (table_rows == 0 && $(valid_data).val() == "" ? grn_rows.length -1 : grn_rows.length); j++)
                                                        {
                                                            $("#grn_row").trigger("click");
                                                        }
                                                        
                                                        for(let i = (table_rows == 0 ? table_rows : table_rows + 1) , p = 0 ; i < (table_rows == 0  ? table_rows + grn_rows.length  : (table_rows + 1) + grn_rows.length) ; i++ , p++)
                                                        {
                                                         
                                                            if($(valid_data).val() != null && table_rows == 0 && d  == 0){

                                                            // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

                                                                    for(let s = 0 ; s < grn_rows.length ; s++)
                                                                    {
                                                                      
                                                                        let order_no = $(".order_no")[s+1]
                                                                        let item_no = $(".item_no")[s+1]
                                                                        let business_unit_grn = $(".business_unit_grn")[s+1]
                                                                        let document_no = $(".document_no")[s+1]
                                                                        let do_ty = $(".do_ty")[s+1]
                                                                        let quantity_recieved = $(".quantity_recieved")[s+1]
                                                                        let amount_open = $(".amount_open")[s+1]
                
                
                                                                        $(order_no).val(grn_rows[s].F43121_DOCO)
                                                                        $(item_no).val(grn_rows[s].F43121_LITM)
                                                                        $(business_unit_grn).val(grn_rows[s].F43121_MCU)
                                                                        $(document_no).val(grn_rows[s].F43121_DOC)
                                                                        $(do_ty).val(grn_rows[s].F43121_DCT)
                                                                        $(quantity_recieved).val(grn_rows[s].F43121_UREC)
                                                                        $(amount_open).val(grn_rows[s].F43121_AOPN)
                                                                    }

                                                                    break;
                                                            }

                                                            else{

                                                                let order_no = $(".order_no")[i]
                                                                let item_no = $(".item_no")[i]
                                                                let business_unit_grn = $(".business_unit_grn")[i]
                                                                let document_no = $(".document_no")[i]
                                                                let do_ty = $(".do_ty")[i]
                                                                let quantity_recieved = $(".quantity_recieved")[i]
                                                                let amount_open = $(".amount_open")[i]
        
        
                                                                $(order_no).val(grn_rows[p].F43121_DOCO)
                                                                $(item_no).val(grn_rows[p].F43121_LITM)
                                                                $(business_unit_grn).val(grn_rows[p].F43121_MCU)
                                                                $(document_no).val(grn_rows[p].F43121_DOC)
                                                                $(do_ty).val(grn_rows[p].F43121_DCT)
                                                                $(quantity_recieved).val(grn_rows[p].F43121_UREC)
                                                                $(amount_open).val(grn_rows[p].F43121_AOPN)
        
                                                            }


                                                            d = grn_rows.length == 1 ? 1 : 2;

                                        
                                                        }
                                                    
                                                    },
                                                    complete : ()=>{

                                                        // if( k == grn_head.length - 1)
                                                        // {
                                                            // $("#data_list").removeClass("invisible")
                                                            $("#create_grn").addClass("invisible")
                                                            $("#reverse_grn").removeClass("invisible")
                                                            $("#col_hide").css("visibility" , "collapse");
                                                        // }

                                                        // if( k == grn_head.length-1)
                                                        // {
                                                            $("#loader").removeClass("sk-loading")
                                                        // }
                                                    },
                                                    error: function(xhr){
                                                        console.log(xhr);
                                                            // po_check = [];
                                                            // reciept_no = []

                                                        $("#loader").removeClass("sk-loading")
                                                        

                                                    }
                                                
                                            })
    
                                    },
    
                                    error: function(xhr){
    
                                        $("#loader").removeClass("sk-loading")
                                        $.audit("GAURAV" , "JDV920" , `${[login[0].url]}/jderest/v3/orchestrator/ORCH_GRN` , JSON.stringify(grn_head[k]) , "error" , "F" )
                                        grn_head = [];
                                        receipt_lines = [];

                                        const swalWithBootstrapButtons = Swal.mixin({
                                        customClass: {
                                            confirmButton: 'btn btn-sm btn-secondary mx-1',
                                            // cancelButton: 'btn btn-sm btn-danger mx-1'
                                        },
                                        buttonsStyling: false
                                    })
    
                                    swalWithBootstrapButtons.fire({
                                        // title: 'Are you sure?',
                                        text: `${xhr.responseJSON.jde__simpleMessage}`,
                                        icon: 'warning',
                                        // showCancelButton: true,
                                        confirmButtonText: 'OK',
                                        // cancelButtonText: 'cancel!',
                                        reverseButtons: true
                                    })
    
                                    }
    
                                })
                            }
                        })


                        $("#reverse_grn").click(()=>{

                            $("#loader").addClass("sk-loading")

                            let data = [];
                            
                            for(let i = 0  ; i < reciept_no.length ; i++){
                                let document_number = reciept_no[i];
                                let document_type = $("#purchase_type").val();
                                let document_comapny = $("#company_code").val().split(" - ")[0];
                                let supplier = $("#vendor_code").val();
                                let P43214_version = "ZJDE0001";

                                data.push({document_number,document_type,document_comapny,supplier,P43214_version})
                            }

                            console.log(data);


                                $.ajax({
                                    url : `${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_GRN_REV`,
                                    type : "POST",
                                    data : JSON.stringify({data : data}),
                                    headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                        },
                                        success : function (data){

                                            console.log(data);
                                            $("#reverse_grn").addClass("invisible")
                                            $("#create_grn").removeClass("invisible")
                                            $("#col_hide").css("visibility" , "visible");
                                            $("#grn_table tbody").children().remove()
                                            $("#grn_row").trigger("click");
                                            $("#data").trigger("click")
                                            $("#data_list").addClass("invisible")

                                            
                                            data = [];
                                            
                                        },
                                        error: function(xhr){
                                            $("#loader").removeClass("sk-loading")
                                            console.log(xhr);
                                        },
                                        complete : ()=>{
                                            
                                            $("#loader").removeClass("sk-loading")
                                            

                                        }                            
                                    })
                            


                            grn_head = [];
                            receipt_lines = []; 
                            reciept_no = [];
                        })


                        $("#submit_invoice").click((e)=>{

                            e.preventDefault();

                            if(reciept_no.length != 0)
                            {
                                
                                
                                let sessionString = sessionStorage.getItem("gate_number_id");
                                let gate_no = JSON.parse(sessionString)
                                
                                    // console.log(gate_no);
                                    
                                    $.ajax({
                                            type: "PUT",
                                            url: `${[test[0].url]}/gate/put/${gate_no}`,
                                            data: JSON.stringify({
                                            "status":300,
                                            }),
                                            headers: {
                                                'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            },
                                            success: function (data, status, xhr) {
                                                console.log(data);
                                                // alert(gate_no)
                                                // let quality_code = 300;
                
                                                // sessionString.setItem("quality" , JSON.stringify(quality_code));
                                            },
                                            error: function (xhr) {
                                                console.log(xhr);
                                                // alert(gate_no)
                                            },
                                        });}

                            
                            let submit_details = [];
                            let company = $("#company_code").val();
                            let business = $("#business_unit").val();
                            // let company = $("#company code").val();
                            let state = $("#state").val();
                            let invoiceNo = $("#invoice_no").val();
                            let invoiceType = $("#invoice_type").val();
                            let vendor = $("#vendor_code").val();

                            submit_details.push({company,business,state,invoiceNo,invoiceType,vendor ,reciept_no})

                            sessionStorage.setItem('quality', JSON.stringify(submit_details))
                            window.open(`../template/quality.jsp` , '_self');

                            }

                        )

                        
                        
                                // if(k == grn_head.length -1)
                                // {
                                //     $("#data1").trigger("click")
                                // }

                        // }


                            

                    // })



                    // $.ajax({
                    //     url : `${[login[0].url]}/jderest/v3/orchestrator/ORCH_GRN`

                    // })




























        //     $("#fetch_btn").click(() => {

        //         var [login[0].url] = $.[login[0].url]()

        //         $.ajax({
        //             url: `${[login[0].url]}/jderest/tokenrequest`,
        //             type: "POST",
        //             data: JSON.stringify({
        //                 username: "GAURAV",
        //                 password: "Pernod@123"
        //             }),
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },

        //             success: function (data) {
        //                 $.ajax({
        //                     url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_PurchaseOrder`,
        //                     type: "POST",
        //                     data: JSON.stringify({
        //                         token: `${data.userInfo.token}`,
        //                         order_number: $("#purchase_order").val(),
        //                         order_type: $("#purchase_type").val(),
        //                     }),
        //                     headers: {
        //                         'Accept': 'application/json',
        //                         'Content-Type': 'application/json'
        //                     },

        //                     success: function (data) {

        //                         // console.log(data);
        //                         let count = $("#tab_logic tr").length - 3
        //                         // console.log(count);

        //                         var Purchase_order = $("#purchase_order").val();

        //                         var supplier_number = $("#supplier_number").val()

        //                         // console.log(supply_data);
        //                         if (arr.includes(Purchase_order) == false && (supply_data == data.supplier || supply_data == undefined)) {
        //                             for (let i = 0; i < (count == 0 ? data.po_details.length - 1 : data.po_details.length); i++)
        //                             // for(let i = 0 ; i <     ; i++)
        //                             {
        //                                 $("#add_row").trigger("click");
        //                             }

        //                             for (var i = (count == 0 ? count : count + 1), j = 0; i < (count == 0 ? count + data.po_details.length : (count + 1) + data.po_details.length); i++, j++)
        //                             // for(var i = 0 ; i < data.po_details.length ;  i++)
        //                             {

        //                                 let status = $(".details_status")[i];
        //                                 let gate_id = $(".details_gate_id")[i];
        //                                 let item_code = $(".item_code")[i];
        //                                 let description = $(".description")[i];
        //                                 let hsn_code = $(".hsn_code")[i];
        //                                 let quantity = $(".quantity")[i];
        //                                 let uom = $(".uom")[i];
        //                                 let rate = $(".rate")[i];
        //                                 let amount = $(".amount")[i];


        //                                 // $(status).val(" ");
        //                                 // $(gate_id).val(" ");
        //                                 $(item_code).val(data.po_details[j].item_number);
        //                                 $(description).val(data.po_details[j].description);
        //                                 // $(hsn_code).val(" ");
        //                                 $(quantity).val(data.po_details[j].quantity_ordered);
        //                                 $(uom).val(data.po_details[j].uom);
        //                                 $(rate).val(data.po_details[j].unit_cost);
        //                                 $(amount).val(data.po_details[j].ectended_price);

        //                             }


        //                             match = Purchase_order;
        //                             supply_data = data.supplier;
        //                             arr.push(Purchase_order)
        //                             // console.log(supply_data);
        //                             // console.log(arr);
        //                         }





        //                     },

        //                     error: function (xhr) {
        //                         console.log(xhr);
        //                     }
        //                 })


        //             }
        //         })





        //     })

        // $("#tab_logic").on("click" , ".delete_row" , function(){

        //     console.log("hello");

        // })



            // function deleteRow(button) {
            //     var row = button.parentNode.parentNode;
            //     row.parentNode.removeChild(row);

            //     console.log($(row).parent());
                // console.log(button.parentNode.parentNode);

                // var del = .row(this).data()

            //     // updateSerialNumber();
            // }
        //     function previewFile() {
        //         const file = document.querySelector('input[type=file]').files[0];
        //         console.log(file.name);
        //         let extension = file.name.split('.');
        //         extension = extension.reverse();

        //         console.log(extension[0]);
        //         if (extension[0] == "jpg") {
        //             $(".ravi").children().remove();
        //             $(".ravi").append(`<img class="w-100 h-100" src="" id="iframe-pdf"></img>`)
        //             const preview = document.querySelector('img');
        //             const reader = new FileReader();
        //             var filename = file.name;


        //             reader.addEventListener("load", function () {
        //                 preview.src = reader.result;
        //             }, false);

        //             if (file) {
        //                 reader.readAsDataURL(file);
        //             }
        //         } else if (extension[0] == "pdf") {
        //             $(".ravi").children().remove();
        //             $(".ravi").append(`<object data="" type="application/pdf" class="w-100 h-100"></object>`)
        //             const preview = document.querySelector('object');
        //             const reader = new FileReader();
        //             var filename = file.name;


        //             reader.addEventListener("load", function () {
        //                 preview.data = reader.result;
        //             }, false);

        //             if (file) {
        //                 reader.readAsDataURL(file);
        //             }
        //         }
        //     }

        // 
        // 
            let hide = document.querySelector("#hide")
            let btn_panel = document.querySelector("#btn_panel")
            $(document).ready(() => {
                $(".image-minimalize").click(function () {
                    $("#hide").toggle("hide");

                    if (hide.classList.toggle("hide")) {
                        $(".upload-image").css("width", "auto")
                        btn_panel.value = "Show Invoice"
                    }
                    else {
                        $(".upload-image").css("width", "1100px")
                        btn_panel.value = "Hide Invoice"
                    }
                });
            })
        //     var oTable = document.querySelector('#tab_logic');
        //     var details = [];

        //     $("#trig").click(() => {
        //         $("#inputimg").trigger("click")
        //     })


        //     $("#invoice_form").submit((e) => {

        //         var [test[0].url] = $.[test[0].url]();
        //         e.preventDefault();

        //         var data = [...oTable.rows].map(t => [...t.children].map(u => [...u.children].map(c => c.value)));

        //         data.shift();
        //         data.pop()

        //         for (let i = 0; i < data.length; i++) {
        //             let tab_val = data[i].flat(2).flat(2)
        //             if (tab_val[2] || tab_val[2] == '') {
        //                 details.push({
        //                     line_nummber: tab_val[1],
        //                     status: tab_val[2],
        //                     gate_id: tab_val[3],
        //                     item_code: tab_val[4],
        //                     hsn_code: tab_val[6],
        //                     quantity: tab_val[7],
        //                     uom: tab_val[8],
        //                     rate: tab_val[9],
        //                     amount: tab_val[10],
        //                 })
        //             }
        //         }

        //         var fd = new FormData();
        //         var files = $('#inputimg')[0].files[0];
        //         fd.append('file', files);
        //         fd.append('json', JSON.stringify({
        //             billto_name: $("#billto_name").val(),
        //             billto_address1: $("#billto_address1").val(),
        //             billto_address2: $("#billto_address2").val(),
        //             billto_address3: $("#billto_address3").val(),
        //             billto_gstin: $("#billto_gstin").val(),
        //             billto_city: $("#billto_city").val(),
        //             billto_state: $("#billto_state").val(),
        //             billto_zipcode: $("#billto_zipcode").val(),

        //             shipto_name: $("#shipto_name").val(),
        //             shipto_address1: $("#shipto_address1").val(),
        //             shipto_address2: $("#shipto_address2").val(),
        //             shipto_address3: $("#shipto_address3").val(),
        //             shipto_gstin: $("#shipto_gstin").val(),
        //             shipto_city: $("#shipto_city").val(),
        //             shipto_state: $("#shipto_state").val(),
        //             shipto_zipcode: $("#shipto_zipcode").val(),

        //             supplier_invoice_nbr: $("#supplier_invoice_nbr").val(),
        //             supplier_date: $("#supplier_date").val(),
        //             supplier_order_nbr: $("#supplier_order_nbr").val(),
        //             supplier_vehicle_nbr: $("#supplier_vehicle_nbr").val(),
        //             supplier_order_date: $("#supplier_order_date").val(),
        //             supplier_supply_place: $("#supplier_supply_place").val(),
        //             supplier_supply_date: $("#supplier_supply_date").val(),
        //             supplier_supply_time: $("#supplier_supply_time").val(),
        //             supplier_despatch_mode: $("#supplier_despatch_mode").val(),

        //             gate_id: $("#gate_id").val(),
        //             status: $("#status").val(),
        //             vehicle_nbr: $("#vehicle_nbr").val(),
        //             material_type: $("#material_type").val(),
        //             weight: $("#weight").val(),
        //             in_time: $("#in_time").val(),
        //             out_time: $("#out_time").val(),
        //             devision: $("#devision").val(),
        //             remark: $("#remark").val(),
        //             queue_id: $("#queue_id").val(),
        //             details: details,
        //         }))

        //         $.ajax({
        //             url: `${[test[0].url]}/gate/entry`,
        //             type: 'post',
        //             data: fd,
        //             contentType: false,
        //             processData: false,
        //             success: function (response) {
        //                 console.log(response);
        //                 if (response.status == 200) {

        //                     window.open("invoice.jsp", "_self");
        //                 }
        //                 else {
        //                     const swalWithBootstrapButtons = Swal.mixin({
        //                         customClass: {
        //                             confirmButton: 'btn btn-success',
        //                         },
        //                         buttonsStyling: false
        //                     })
        //                     swalWithBootstrapButtons.fire({
        //                         title: `${response.message}`,
        //                         icon: 'warning',
        //                         confirmButtonText: 'OK',
        //                         reverseButtons: true
        //                     })
        
        //                 }
        //             },
        //             error: function (xhr) {
            //                 console.log(xhr);
            //             }
            //         });
            
            //     })
            
            
            //
             </script>

<script src="../../../Basic/js/updateStatus.js"></script>
<script src="../../../Configration/js/globalConfig.js"></script>
<script src="../js/addInvoice.js?v=" + $.getCurrentVersion()></script>

<script>
    //    let sessionString = sessionStorage.getItem('gateid')
    //             let gate_number = JSON.parse(sessionString);
                // console.log(gate_number);
   
</script>

</body>

</html>