<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>View</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">

    <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

    <link rel="stylesheet" href="../css/view.css">


    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <!-- <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css"> -->


    <script src="../../../../static/js/bootstrap.js"></script>




    <script src="../../../../custom/adjustable-invoice/js/index.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <!-- adduser JS -->





    <style>
        
        #purchase_type {
            text-transform: uppercase;
        }

        Table div.dataTables_info span.select-item {
            display: none !important;
        }

        .btn-secondary {
            background-color: #24537f !important;
            border: none !important;
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


        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            border-top-color: #24537f !important;
            border-top-width: 4px !important;
        }

        label {
            display: flex;
            /* justify-content: center; */
            align-items: center;
        }

        .card {
            flex-direction: row !important;
        }

        .gate_number {
            padding-top: 11px;
        }

        textarea {
            border: 1px solid #24537f !important;
            outline: none;
        }

        .input-group-append .btn {
            z-index: 0 !important;
        }

        .btn-danger {
            color: #fff !important;
            background-color: #ED5565 !important;
            border-color: #ED5565 !important;
        }


        .pointing-box {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
            padding: 5px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            pointer-events: none;
        }

        .pointing-box::before {
            content: "";
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #ccc;
        }


        #myModal17 .modal-body {
            overflow: hidden;
            overflow-y: scroll;
        }

        .filter_body {
            height: 75vh;
            overflow: hidden !important;
        }

        .filter-section {
            overflow-y: scroll;
        }

        #selected-item {
            width: 1000px;
        }

        .list-group-item {
            cursor: pointer !important;
        }

        #modal_body_filter {
            overflow: hidden !important;
            overflow-y: scroll !important;
        }

        .fix_len{
            min-width: 75px !important;
        }
        .fix_length{
            min-width: 250px !important;
        }
        .line_code{
            min-width: 50px !important;
        }
        .fix_grn_len{
            min-width: 100px !important;
        }
        .fix_grn_length{
            min-width: 200px !important;
        }

        .po_code,.do_ty_head{
            width: 7% !important;
        }
        #grn_table_body tr td{
            padding: 2px !important;
        }

        #res_table{
            overflow: hidden !important;
            overflow-x: scroll !important;
        }
        .voucher_table_flex{
            overflow: hidden !important;
            overflow-x: scroll !important;
        }
        #grn_table_fix{
            overflow: hidden !important;
            overflow-y: scroll !important;
            overflow-x: scroll !important;
            max-height: 400px !important;
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

        let name = JSON.parse(sessionString);

        if (name != null) {
            if (name.includes("ERROR") || name.includes("Admin")) {

            }
            else {
                window.location.href = "../../../Basic/template/404.jsp";
            }
        }
        else {
            window.location.href = "../../../Basic/template/404.jsp";
        }

    </script>


    <div id="wrapper">


        <!-- Modal for recieved Quantity -->
        <!-- 
        <div class="modal inmodal fade" id="myModal17" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Additional Document</h3>
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <div class="tabs-container white-bg">
                        </div>
                        <div class="modal-body vh-100 d-flex flex-column">
                            <div class="row">
                                <div class="col-12">
                                    <div class="ibox">
                                        <div class="select_list border">
                                            <select name="" id="doc_list" class="form-control">
                                                <option value="" selected>No Document Selected</option>
                                            </select>
                                        </div>
                                        <div id="view_list_document" class="border my-2 d-flex flex-direction-coloumn"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white close" id="close_btn"
                                data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->



        <div class="modal fade filter-list-modal" id="myModal17" tabindex="-1" role="dialog"
            aria-labelledby="filterListModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterListModalLabel">Filtered List Modal</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body filter_body col-12 d-flex ">
                        <div class="filter-section col-sm-3">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Filter" id="filterInput">
                                <ul class="list-group">
                                    <!-- <li class="list-group-item">List Item 1</li>
                        <li class="list-group-item">List Item 2</li>
                        <li class="list-group-item">List Item 3</li>
                        <li class="list-group-item">List Item 4</li>
                        <li class="list-group-item">List Item 5</li>
                        <li class="list-group-item">List Item 6</li>
                        <li class="list-group-item">List Item 7</li>
                        <li class="list-group-item">List Item 8</li>
                        <li class="list-group-item">List Item 9</li>
                        <li class="list-group-item">List Item 10</li>
                        <li class="list-group-item">List Item 11</li>
                        <li class="list-group-item">List Item 12</li>
                        <li class="list-group-item">List Item 13</li>
                        <li class="list-group-item">List Item 14</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li>
                        <li class="list-group-item">List Item 15</li> -->
                                </ul>
                            </div>
                        </div>
                        <div class="list-section col-sm-9 d-flex justify-content-center border">
                            <div id="selected-item" class="d-flex justify-content-center">
                                <!-- <h3 id="selectedItemName" class="align-self-center justify-center"> Click on list to preview the document</h2> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer mb-2">
                        <button type="button" id="doc_modal" class="btn btn-secondary"
                            data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>












        <div class="modal inmodal fade" id="myModal18" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Purchase Order Detail</h3>
                        <hr>
                        <button type="button" class="close d-none" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <div class="tabs-container white-bg">
                        </div>

                        <div class="form-group d-flex col-12">

                            <div class="col-6 p-0 d-flex align-items-center">
                                <lable class="col-3"><b>Vendor Code</b></lable>
                                <input type="text" name="" class="form-control col-6" id="vendor_code_modal_map"
                                    readonly placeholder="Vendor Code">
                            </div>
                            <div class="col-6 p-0 d-flex align-items-center">
                                <lable class="col-3"><b>Vendor Name</b></lable>
                                <input type="text" name="" class="form-control col-6" id="vendor_name_modal_map"
                                    readonly placeholder="Vendor Name">
                            </div>
                            <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
                            <!-- <option value="" selected></option> -->
                            <!-- </select> -->
                        </div>

                        <div class="form-group d-flex col-12">

                            <div class="col-6 p-0 d-flex align-items-center">
                                <lable class="col-3"><b>PO Number</b></lable>
                                <input type="text" name="" class="form-control col-6" readonly id="po_no_selected_map"
                                    placeholder="PO Number">
                            </div>
                            <div class="col-6 p-0 d-flex align-items-center">
                                <lable class="col-3"><b>PO Type</b></lable>
                                <input type="text" class="form-control col-6" readonly placeholder="PO Type"
                                    id="po_type_search_map" value="">

                                <input type="button" class="btn btn-primary btn btn-primary col-3 ml-2 d-none"
                                    placeholder="" id="po_no_selected_search_map" value="Search">
                            </div>

                        </div>
                        <div class="form-group d-flex col-12">

                            <div class="col-6 p-0 d-flex align-items-center">
                                <lable class="col-3"><b>Company Code</b></lable>
                                <input type="text" name="" class="form-control col-6" readonly id="company_code_map"
                                    placeholder="Company Code">
                            </div>

                        </div>

                        <div class="modal-body" id="modal_body_filter">
                            <div class="row">
                                <div class="col-12">
                                    <div class="ibox">

                                        <div role="tabpanel" id="tab-1" class="tab-pane active">
                                            <div class="panel-body">
                                                <div class="row m-2">
                                                    <div class="container-fluid">
                                                        <div class="container-fluid clearfix">
                                                            <div class="">
                                                                <input type="text" id="modal_filter"
                                                                    class="form-control"
                                                                    placeholder="Filter by Item Code">
                                                                <br><br>
                                                                <table class="table display responsive nowrap w-100"
                                                                    id="modal_table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-center"> Line No.</th>
                                                                            <th class="text-center"> PO No.</th>
                                                                            <th class="text-center"> PO Type</th>
                                                                            <th class="text-center"> Item Code</th>
                                                                            <th class="text-center"> Company Code</th>
                                                                            <th class="text-center"> Quantity</th>
                                                                            <th class="text-center"> UOM</th>
                                                                            <th class="text-center"> Unit Cost</th>
                                                                            <th class="text-center"> Next Status</th>
                                                                            <th class="text-center"> Last Status</th>
                                                                            <!-- <th class="text-center"> Action</th> -->
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="modal_table_body">
                                                                       
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div class="row clearfix">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white close" id="close_btn"
                                data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary d-none" id="select_modal_info"
                                data-dismiss="modal">Select</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal inmodal fade" id="myModal13" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <div class="tabs-container white-bg">
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="ibox">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading">
                                                Quantity Recieved
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">
                                                    <!-- <div class="col-1"></div> -->
                                                    <div class="col-6">
                                                        <div class="form-group"><label>Po. Number
                                                            </label> <input type="text" id="po_no_panel" readonly=""
                                                                class="form-control " style="font-weight: bold;">
                                                        </div>


                                                        <div class="form-group"><label>Order Quantity
                                                            </label> <input type="text" id="po_quantity_panel"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                        </div>

                                                        <div class="form-group"><label>Quantity
                                                            </label> <input type="text" id="quantity_panel" readonly=""
                                                                class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <hr>
                                                    <div class="col-6">

                                                        <div class="form-group"><label>Po. Type
                                                            </label> <input type="text" id="po_type_panel" readonly=""
                                                                class="form-control" style="font-weight: bold;">
                                                        </div>
                                                        <div class="form-group"><label>Recieved Quantity
                                                            </label> <input type="text" id="po_recieved_panel"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                        </div>
                                                        <div class="form-group"><label> Scanned Quantity
                                                            </label> <input type="text" id="scanned_quantity"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-1"></div> -->
                                                </div>
                                                <br>

                                                <div class="row">
                                                    <!-- <div class="col-1"></div> -->
                                                    <div class="col-3">
                                                        <div class="form-group"><label>Accept
                                                            </label> <input type="text" id="in_accept"
                                                                class="form-control check_sum"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="form-group"><label>Damage
                                                            </label> <input type="text" id="in_reject"
                                                                class="form-control check_sum"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="form-group"><label>In Review
                                                            </label> <input type="text" id="in_review"
                                                                class="form-control check_sum"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="form-group"><label>Short
                                                            </label> <input type="text" id="in_short"
                                                                class="form-control check_sum"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-1"></div> -->
                                                </div>
                                                <div class="text-danger d-none" id="message">Quantity is not
                                                    matched</div>

                                                <br>
                                                <div class="row">
                                                    <!-- <div class="col-1"></div> -->
                                                    <div class="col-11">
                                                        <input type="button" class="btn btn-primary"
                                                            id="quantity_submit" value="Submit">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white close" id="close_btn"
                                data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal inmodal fade" id="myModal11" tabindex="2" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><strong>&nbsp;&nbsp;&nbsp; OCR INFORMATION</strong></h2>
                    </div>
                    <div class="modal-body">
                        <div class="tabs-container">

                            <ul class="nav nav-tabs" role="tablist">

                                <li><a class="nav-link active" data-toggle="tab" href="#tab-1">OCR Data</a></li>

                                <li><a class="nav-link" data-toggle="tab" href="#tab-2">Vendor Invoice</a></li>

                            </ul>

                            <div class="tab-content">

                                <div role="tabpanel" id="tab-1" class="tab-pane active">
                                    <div class="panel-body">

                                        <div class="panel panel-primary col-md-12 px-0">
                                            <div class="panel-heading">
                                                Vendor Billed To Shipped To
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">

                                                    <div class="col-6 b-r" id="form3">

                                                        <h4>Billed To</h4>
                                                        <hr>

                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Name</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="billto_name">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Address 1</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control check" required=""
                                                                    id="billto_address1">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Address 2</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control check" required=""
                                                                    id="billto_address2">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Address 3</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control check" required=""
                                                                    id="billto_address3">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">GSTIN</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="billto_gstin">
                                                            </div>
                                                        </div>


                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">City</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="billto_city">
                                                            </div>
                                                        </div>



                                                        <div class="form-group row">
                                                            <label class="col-3 col-form-label">State</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="billto_state">
                                                            </div>
                                                        </div>

                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Zip Code</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="billto_zipcode">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-6" id="form3">

                                                        <h4>Shipped To</h4>

                                                        <hr>

                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Name</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_name">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Address 1</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_address1">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Address 2</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_address2">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Address 3</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_address3">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">GSTIN</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_gstin">
                                                            </div>
                                                        </div>


                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">City</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_city">
                                                            </div>
                                                        </div>



                                                        <div class="form-group row">

                                                            <label class="col-3 col-form-label">State</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_state">
                                                            </div>




                                                        </div>

                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Zip Code</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="shipto_zipcode">
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div class="panel panel-primary col-md-12 px-0">
                                            <div class="panel-heading">
                                                Vendor Invoice Information
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">

                                                    <div class="col-6 b-r" id="form3">

                                                        <h4></h4>
                                                        <!-- <hr> -->

                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Invoice no.</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="invoice_number">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">LR No.</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="lr_no">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Contract No.</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="contract_number">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Weight</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="weight">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Po Number</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="po_number">
                                                            </div>
                                                        </div>

                                                        <div class="input-group col pb-3 p-0 ">
                                                            <label class="col-3 col-form-label p-0 mr-2">EWAY
                                                                BILL</label>
                                                            <input type="text" class="form-control input_size check"
                                                                readonly id="eway_number">
                                                            <div class=" input-group-append">
                                                                <button type="button" class="btn btn-primary validate">
                                                                    Validate
                                                                </button>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    <div class="col-6" id="form3">

                                                        <h4></h4>

                                                        <!-- <hr> -->
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">LR Date</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="lr_date">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Contract Date</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="contract_date">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">State</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="state">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Vehicle Number</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="vehicle_nbr">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Po Type</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="po_type">
                                                            </div>
                                                        </div>

                                                        <div class="input-group col p-0">
                                                            <label class="col-3 col-form-label p-0 mr-2">IRN
                                                                Number</label>
                                                            <input type="text" class="form-control input_size check"
                                                                required="" readonly id="irn_number">
                                                            <div class=" input-group-append">
                                                                <button type="button" class="btn btn-primary validate">
                                                                    Validate
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        <div class="panel panel-primary col-md-12 px-0">
                                            <div class="panel-heading">
                                                Product Detail Information
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">

                                                    <table class="table table-bordered" id="tab_logic">
                                                        <thead>
                                                            <tr>
                                                                <!-- <th class="text-center"> PO No. </th> -->
                                                                <th class="text-center"> Item Code </th>
                                                                <th class="text-center"> Hsn Code </th>
                                                                <th class="text-center"> UOM </th>
                                                                <th class="text-center"> Qty </th>
                                                                <th class="text-center"> Unit Rate </th>
                                                                <th class="text-center"> Amount </th>

                                                                <th class="text-center d-none"> Primary UOM </th>
                                                                <th class="text-center d-none"> Primary Unit </th>
                                                                <th class="text-center d-none"> Secondary UOM </th>
                                                                <th class="text-center d-none"> Secondary Unit </th>
                                                                <th class="text-center d-none"> Taxable Value </th>
                                                                <th class="text-center d-none"> Freight </th>
                                                                <th class="text-center d-none"> Pack Forwarding </th>
                                                                <th class="text-center d-none"> Insurance </th>
                                                                <th class="text-center d-none"> Custom Duty </th>
                                                                <th class="text-center d-none"> Other Charges </th>
                                                                <th class="text-center d-none"> Loading Unloading </th>
                                                                <th class="text-center d-none"> Handling Charges </th>
                                                                <th class="text-center d-none"> Detention Charges </th>



                                                            </tr>
                                                        </thead>
                                                        <tbody id="tab_logic_body">

                                                        </tbody>
                                                    </table>


                                                </div>

                                            </div>

                                        </div>

                                        <div class="panel panel-primary col-md-12 px-0">
                                            <div class="panel-heading">
                                                TAX INFORMATION
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">

                                                    <div class="col-6 b-r" id="form3">

                                                        <h4></h4>
                                                        <!-- <hr> -->

                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">CGST RATE</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="cgst_percentage" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">SGST RATE</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="sgst_percentage" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">IGST RATE</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="igst_percentage" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">CESS RATE</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="cess_percentage" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Taxable value</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="taxable_value" readonly="readonly">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-6" id="form3">

                                                        <h4></h4>

                                                        <!-- <hr> -->
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">CGST AMOUNT</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="cgst_amount" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">SGST AMOUNT</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="sgst_amount" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">IGST AMOUNT</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="igst_amount" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">CESS AMOUNT</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="cess_amount" readonly="readonly">
                                                            </div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                                class="col-3 col-form-label">Invoice Amount</label>
                                                            <div class="col-9"><input type="text"
                                                                    class="form-control input_size check" required=""
                                                                    id="amount" readonly="readonly">
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>









                                    </div>



                                </div>

                                <div role="tabpanel" id="tab-2" class="tab-pane">

                                    <div class="panel-body d-flex justify-content-center">
                                        <canvas id="canvas" width="800" height="600"></canvas>

                                    </div>

                                </div>

                            </div>





                        </div>



                    </div>

                    <div class="modal-footer m-2">
                        <button type="button" class="btn btn-white" data-dismiss="modal" id="closeModal">Close</button>
                        <input type="button" class="add_info btn btn-primary py-1 col-2" data-toggle="modal"
                            data-target="#myModal15" id="modalCall" value="Additional Doc">
                    </div>
                </div>
            </div>
        </div>








        <!--% Modal for Company Code %-->


        <!--% Modal for business unit %-->
        <div class="modal inmodal fade" id="myModal6" tabindex="2" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <br><br>
                        <table cellspacing="0" cellpadding="4">
                            <tbody>
                                <tr id="filter_col2" data-column="1" class=" ">
                                    <td class=" col-12 ">
                                        <div class="d-flex ">
                                            <div class="input-group ">
                                                <input type="text" class="form-control column_filter"
                                                    placeholder="Business Unit" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col2_filter">
                                                <div class="input-group-append" id="business_search">
                                                    <button class="btn btn-primary" type="button" id="button-addon"><i
                                                            class="fa fa-search"></i>
                                                        Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td align="center"><input type="checkbox" class="column_filter invisible"
                                            id="col1_smart" checked="checked">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-body">

                        <div class="" id="loader_business">
                            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_business">
                                <div class="sk-double-bounce1"></div>
                                <div class="sk-double-bounce2"></div>
                            </div>

                            <table id="Btable" class="display responsive nowrap text-left " style="width: 100%">
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


                    </div>

                    <div class="modal-footer m-2">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="business" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>
        <!--% Modal for State %-->
        <div class="modal inmodal fade" id="myModal8" tabindex="2" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <br><br>
                        <table cellspacing="0" cellpadding="4">
                            <tbody>
                                <tr id="filter_col2" data-column="1" class=" ">
                                    <td class=" col-12 ">
                                        <div class="d-flex ">
                                            <div class="input-group ">
                                                <input type="text" class="form-control column_filter"
                                                    placeholder="State" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col4_filter">
                                                <div class="input-group-append" id="state_search">
                                                    <button class="btn btn-primary" type="button" id="button-addon"><i
                                                            class="fa fa-search"></i>
                                                        Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td align="center"><input type="checkbox" class="column_filter invisible"
                                            id="col1_smart" checked="checked">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-body">

                        <div class="" id="loader_state">
                            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_state">
                                <div class="sk-double-bounce1"></div>
                                <div class="sk-double-bounce2"></div>
                            </div>


                            <table id="state_table" class="display responsive nowrap text-left " style="width: 100%">
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



                    </div>

                    <div class="modal-footer m-2">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="state_btn" type="button" data-dismiss="modal"
                            class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>


        <!--% Modal for Document company %-->
        <div class="modal inmodal fade" id="myModal7" tabindex="2" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <br><br>
                        <table cellspacing="0" cellpadding="4">
                            <tbody>
                                <tr id="filter_col2" data-column="1" class=" ">
                                    <td class=" col-12 ">
                                        <div class="d-flex ">
                                            <div class="input-group ">
                                                <input type="text" class="form-control column_filter"
                                                    placeholder="Vendor Number" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col5_filter">
                                                <div class="input-group-append" id="vendor_search">
                                                    <button class="btn btn-primary" type="button" id="button-addon"><i
                                                            class="fa fa-search"></i>
                                                        Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td align="center"><input type="checkbox" class="column_filter invisible"
                                            id="col5_smart" checked="checked">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-body">


                        <div class="" id="loader_vendor">
                            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_vendor">
                                <div class="sk-double-bounce1"></div>
                                <div class="sk-double-bounce2"></div>
                            </div>


                            <table id="Vtable" class="display responsive nowrap text-left " style="width: 100%">
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



                    </div>

                    <div class="modal-footer m-2">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="vendor" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal inmodal fade" id="myModal5" tabindex="2" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <br><br>
                        <table cellspacing="0" cellpadding="4">
                            <tbody>
                                <tr id="filter_col2" data-column="1" class=" ">
                                    <td class=" col-12 ">
                                        <div class="d-flex ">
                                            <div class="input-group ">
                                                <input type="text" class="form-control column_filter"
                                                    placeholder="Company Code" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col1_filter">
                                                <div class="input-group-append" id="comp_search">
                                                    <button class="btn btn-primary" type="button" id="button-addon"><i
                                                            class="fa fa-search"></i>
                                                        Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td align="center"><input type="checkbox" class="column_filter invisible"
                                            id="col1_smart" checked="checked">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-body">

                        <div class="" id="loader_comp">
                            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_comp">
                                <div class="sk-double-bounce1"></div>
                                <div class="sk-double-bounce2"></div>
                            </div>

                            <table id="comp_table" class="display responsive nowrap text-left " style="width: 100%">
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

                    </div>

                    <div class="modal-footer m-2">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="company" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>


        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content  pb-0">

            <div class="row">
                <div class="col-lg-12 ">
                    <div class="card mx-auto white-bg">
                        <div class="col-3">
                            <div class="form-group row gate_number ">
                                <!-- <h3 class="col-4">Gate Number :</h3> -->
                                <div class="col-8">
                                    <h3 id="gate_number"></h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-9">
                            <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
                        </div>
                    </div>
                </div>
            </div><br>

            <form action="" id="invoice_form">
                <div class="row">
                    <div class="col-sm-7">
                        <div class="ibox mb-0">
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
                    <div class="col-sm-5">
                        <div class="ibox">
                            <div class="ibox-content p-2 ">
                                <div class="text-center  my-2 d-flex justify-content-around">
                                    <input type="button" id="btn_panel" class="image-minimalize btn btn-primary"
                                        value="Show Invoice" />

                                    <input type="button" class="add_info btn btn-secondary" data-toggle="modal"
                                        data-target="#myModal11" readonly id="modeldata" value="Additional Info">
                                    <input type="button" class="add_info btn btn-secondary" data-toggle="modal"
                                        data-target="#myModal17" readonly id="modeldata" value="Additional Doc.">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>


        <div class="container-fluid d-flex my-2 bg-white ">
            <div class="upload-image box p-0 d-flex p-2 rounded  " style="z-index: 1;">
                <div class="container-fluid">

                    <div class="ibox-content sk-loading" id="loader1">
                        <div class="sk-spinner sk-spinner-double-bounce" id="spin1">
                            <div class="sk-double-bounce1"></div>
                            <div class="sk-double-bounce2"></div>
                        </div>

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
                                                    <label class="col-4 col-form-label p-0 mr-2">Company Code</label>
                                                    <input type="text" class="form-control input_size fetch_check"
                                                        required="" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" readonly id="company_code">
                                                    <div class=" input-group-append d-none">
                                                            <button type=" button" id="comp_select"
                                                        class="btn btn-secondary select" data-toggle="modal"
                                                        data-target="#myModal5">
                                                        Select
                                                        </button>
                                                    </div>
                                                </div>


                                                <!-- <div class="form-group col-12 p-0 border"> 
                                        <label class="col-2 col-form-label p-0 mr-2">Company Code</label>  
                                        <div class="col-5 input-group"> 
                                        <input type="text" class="form-control input_size fetch_check" required=""
                                             aria-label="Admin Theme"
                                            aria-describedby="button-addon2" readonly id="company_code">
                                        <div class=" input-group-append">
                                        <input type="button" class="btn btn-secondary select" data-toggle="modal" data-target="#myModal5" readonly id="comp_select" value="Select"></div> -->
                                                <!-- <div class=" input-group-append">
                                            <button type="button" id="modeldata" class="btn btn-secondary select"data-toggle="modal" data-target="#myModal5"> Select</button>
                                        </div>         -->
                                                <!-- </div> -->
                                                <!-- </div> -->





                                            </div>
                                            <div class="col-6 b-r" id="form1">

                                                <!-- <div class="input-group col p-0"> 
                                                        <label class="col-3 col-form-label p-0 mr-2">Doc. Company</label>   
                                                        <input type="text" class=" form-control input_size required=""
                                                             aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" readonly id="doc_company">
                                                        <div class=" input-group-append">
                                                            <button type="button" id="modeldata" class="btn btn-secondary select"
                                                                data-toggle="modal" data-target="#myModal">
                                                                Select
                                                            </button>
                                                        </div>        
                                                    </div>
                                                    <br> -->

                                                <div class="input-group col p-0">
                                                    <label class="col-4 col-form-label p-0 mr-2">Business Unit</label>
                                                    <input type="text"
                                                        class="form-control input_size business_unit_head_block fetch_check"
                                                        required="" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" readonly id="business_unit">
                                                    <div class=" input-group-append d-none">
                                                        <button type="button" id="business_select"
                                                            class="btn btn-secondary select" data-toggle="modal"
                                                            data-target="#myModal6">
                                                            Select
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="input-group d-none col p-0">
                                                    <label class="col-4 col-form-label p-0 mr-2">State</label>
                                                    <input type="text" class=" form-control input_size fetch_check"
                                                        required="" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" readonly
                                                        id="state_select_table">
                                                    <div class=" input-group-append">
                                                        <button type="button" id="state_select"
                                                            class="btn btn-secondary select" data-toggle="modal"
                                                            data-target="#myModal8">
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

                                                <div class="form-group row"><label class="col-4 col-form-label">Vendor
                                                        Invoice No.</label>
                                                    <div class="col-8"><input type="text" readonly
                                                            class="form-control input_size fetch_check check_grn"
                                                            required="" id="invoice_noo">
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label class="col-4 col-form-label">Vendor
                                                        Invoice Type</label>
                                                    <div class="col-8">
                                                        <input type="text" class="form-control input_size fetch_check"
                                                            required="" id="invoice_type">

                                                        <!-- <select name="" class="form-control input_size fetch_check outline-none" id="invoice_type">
                                                                <option value=""></option>
                                                                <option value="">OCR</option>
                                                                <option value="">Manual</option> 
                                                            </select> -->
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label class="col-4 col-form-label">Currency
                                                        Code</label>
                                                    <div class="col-8"><input type="text" readonly
                                                            class="form-control input_size fetch_check" required=""
                                                            id="curr_code">
                                                    </div>
                                                </div>


                                                <div class="form-group row d-none"><label
                                                        class="col-4 col-form-label">TDS Code</label>
                                                    <div class="col-8"><input type="text"
                                                            class="form-control input_size fetch_check" required=""
                                                            id="tds_code">
                                                    </div>
                                                </div>



                                                <div class="form-group row">
                                                    <label class="col-4 col-form-label">Vendor Code</label>
                                                    <div class="col-8">
                                                        <input type="text" class="form-control input_size fetch_check"
                                                            required="" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" readonly id="vendor_code">
                                                    </div>
                                                    <!-- <div class=" input-group-append">
                                            <button type="button" id="vendor_select" class="btn btn-secondary select"
                                                data-toggle="modal" data-target="#myModal7">
                                                Select
                                            </button>
                                        </div> -->


                                                </div>

                                                <div class="form-group row"><label class="col-4 col-form-label">Vendor
                                                        Name</label>
                                                    <div class="col-8"><input type="text"
                                                            class="form-control input_size fetch_check" readonly
                                                            required="" id="vendor_name">
                                                    </div>
                                                </div>
                                                <div class="form-group row" id="road"><label class="col-4 col-form-label">Road
                                                        Permit Number</label>
                                                    <div class="col-8"><input type="text"
                                                            class="form-control input_size fetch_check check_grn"
                                                            required="" id="road_permit_number">
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label class="col-4 col-form-label">Port
                                                        Code</label>
                                                    <div class="col-8"><input type="text"
                                                            class="form-control input_size fetch_check" required=""
                                                            id="port_code">
                                                    </div>
                                                </div>

                                                <!-- <div class="form-group row"><label
                                        class="col-3 col-form-label">Vendor GSTIN</label>
                                    <div class="col-9"><input type="text" readonly class="form-control input_size fetch_check"
                                            required="" id="supplier_gstin">
                                    </div>
                                </div> -->
                                            </div>

                                            <div class="col-6" id="form4">


                                                <div class="form-group row">
                                                    <label class="col-4 col-form-label">Invoice Date </label>
                                                    <div class="col-8"><input type="text"
                                                            class="form-control input_size fetch_check check_grn"
                                                            required="" id="invoice_date">
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-4 col-form-label">GL Date</label>
                                                    <div class="col-8"><input type="text" readonly
                                                            class="form-control input_size fetch_check check_grn"
                                                            required="" id="gl_date">
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label
                                                        class="col-4 col-form-label">Invoice Amount</label>
                                                    <div class="col-8"><input readonly type="text"
                                                            class="form-control amount input_size fetch_check"
                                                            required="" id="amount"></div>

                                                </div>
                                                <div class="form-group row"><label
                                                        class="col-4 col-form-label">Source</label>
                                                    <div class="col-8">
                                                        <!-- <input type="text" class="form-control input_size fetch_check"
                                                                required="" id="source"> -->
                                                        <select name=""
                                                            class="form-control input_size fetch_check outline-none"
                                                            id="source">
                                                            <!-- <option value=""></option> -->
                                                            <option value="">OCR</option>
                                                            <option value="">Manual</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label class="col-4 col-form-label">DC
                                                        Number / Type</label>
                                                    <div class="col-4"><input type="text"
                                                            class="form-control input_size fetch_check" required=""
                                                            id="dc_number_head">
                                                    </div>
                                                    <div class="col-4"><input type="text"
                                                            class="form-control input_size fetch_check" required=""
                                                            id="dc_type">
                                                    </div>
                                                </div>


                                                <div class="form-group row"><label class="col-4 col-form-label">Vendor
                                                        GSTIN</label>
                                                    <div class="col-8"><input type="text" readonly
                                                            class="form-control input_size fetch_check" required=""
                                                            id="supplier_gstin">
                                                    </div>
                                                </div>
                                                <div class="form-group row"><label class="col-4 col-form-label">BOE
                                                        Number</label>
                                                    <div class="col-8"><input type="text"
                                                            class="form-control input_size fetch_check" required=""
                                                            id="boe_number">
                                                    </div>
                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>
                    <!-- adsfadfs -->
                    <!-- <div class="row">
    <div class="col-12">
        <div class="panel panel-primary ">
            
            <div class="panel-body d-flex">
                
                    <input type="button" id="create_grn" class="btn col-6  border btn-secondary" value="Create GRN">
                    <input type="button" id="reverse_grn" class="btn col-6  border btn-secondary invisible" value="Reverse GRN">

    </div>
</div>


    </div>
    

</div> -->

                    <!-- <div class="row">
    <div class="col-12">
        <div class="panel panel-primary ">
            
            <div class="panel-body d-flex">
               
                    <input type="button" id="submit_invoice"  class="btn col-sm-6 btn-success border" value="Submit">
                    <input type="button"  class="btn col-sm-6 btn-danger border" value="Reject">
              

    </div>
</div>
    </div>

</div> -->
                </div>
            </div>
            <div class="handler  bg-white "></div>
            <div class="upload-image box bg-body rounded d-none" id="hide" style="z-index: 1;">
                <div class="container-fluid h-100 p-0 ravi" id="pdf_receive">
                    <!-- <input class="my-1" type="file" id="inputimg" accept="*" onchange="previewFile()" crossorigin /> -->
                </div>
            </div>
        </div>

        <div class="container-fluid d-flex my-1 bg-white">
            <div class="container-fluid upload-images box d-flex p-2 m-2 rounded  " style="z-index: 1;">
                <div class="container-fluid">

                    <div class="ibox-content sk-loading" id="loader2">
                        <div class="sk-spinner sk-spinner-double-bounce" id="spin2">
                            <div class="sk-double-bounce1"></div>
                            <div class="sk-double-bounce2"></div>
                        </div>

                        <div class="row d-none">
                            <div class="col-12 ">
                                <div class="panel panel-primary">

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
                                                                    <input type="text" class="form-control"
                                                                        id="purchase_order" placeholder="PO">
                                                                </div>

                                                                <div class="form-group col-6 mt-3 pt-1">
                                                                    <label class="control-label">Purchase Order
                                                                        Type</label>
                                                                    <input type="text" class="form-control"
                                                                        id="purchase_type" placeholder="PO Type">
                                                                </div>
                                                            </div>



                                                            <div class="form-group  p-2">
                                                                <input type="button" class="btn btn-secondary col-12"
                                                                    id="fetch_btn" value="Fetch Data">
                                                            </div>
                                                        </div>

                                                        <div class="col-8 p-0">
                                                            <div class="col d-flex justify-content-end">
                                                                <div class="container overflow-auto">
                                                                    <div class="row clearfix">
                                                                        <div class="">
                                                                            <table class="table table-bordered"
                                                                                id="tab_logics">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <!-- <th class="text-center"> PO No. </th> -->
                                                                                        <th class="text-center"> PO
                                                                                            Number </th>
                                                                                        <th class="text-center"> PO Type
                                                                                        </th>
                                                                                        <th class="text-center"> Company
                                                                                            Code</th>
                                                                                        <th class="text-center">
                                                                                            Currency</th>
                                                                                        <th class="text-center"> Total
                                                                                        </th>
                                                                                        <th class="text-center"> Amount
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr id="addr0">

                                                                                        <td><input type="text"
                                                                                                class="form-control input_size po text-right"
                                                                                                required="" readonly
                                                                                                value=""></td>
                                                                                        <td><input type="text"
                                                                                                class="form-control input_size line_num text-right"
                                                                                                required="" readonly
                                                                                                id="line_num" value="">
                                                                                        </td>
                                                                                        <td><input type="text"
                                                                                                class="form-control input_size head_company text-right"
                                                                                                required="" readonly
                                                                                                value=""></td>
                                                                                        <td><input type="text"
                                                                                                class="form-control input_size currency_head text-right"
                                                                                                required="" readonly
                                                                                                id="" value=""></td>
                                                                                        <td><input type="text"
                                                                                                class="form-control input_size details_status text-right"
                                                                                                required="" readonly
                                                                                                id="details_status">
                                                                                        </td>
                                                                                        <td><input type="text"
                                                                                                id="details_gate_id"
                                                                                                required="" readonly
                                                                                                class="form-control input_size details_gate_id text-right">

                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr id="addr1"></tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row d-flex justify-content-start ml-0">
                                                                        <input type="button" id="add_modal_row"
                                                                            class="btn btn-default border d-none"
                                                                            value="Add row">&nbsp;
                                                                        <input type="button" id="add_row"
                                                                            class="btn btn-default border d-none"
                                                                            value="Add row">&nbsp;
                                                                        <input type="button" id="delete_row"
                                                                            class="btn btn-default border invisible "
                                                                            value="Delete row">

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

                                            <div class="" id="loader4">
                                                <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin4">
                                                    <div class="sk-double-bounce1"></div>
                                                    <div class="sk-double-bounce2"></div>
                                                </div>


                                            <ul class="nav nav-tabs" role="tablist">
                                                <li><a class="nav-link active" id="data" data-toggle="tab" href="#tab-10">Line</a></li>
                                                <li id="data_list" class="invisible"><a class="nav-link" id="data1" data-toggle="tab" href="#tab-11">GRN</a></li>
                                                <li id="data_list4" class=""><a class="nav-link" id="data4" data-toggle="tab" href="#tab_11_5">Debit Note</a></li>
                                                <li id="data_list1" class="invisible"><a class="nav-link" id="data2" data-toggle="tab" href="#tab-12">Quality</a></li>
                                                <li id="data_list2"><a class="nav-link" id="data3" data-toggle="tab" href="#tab-13">Voucher</a></li>
                                                <li id="data_list8" class="d-none"><a class="nav-link">UNPROCESSED</a></li>
                                            </ul>

                                            <div class="tab-content">


                                                
                                                <div role="tabpanel" id="tab-10" class="tab-pane active">
                                                    <div class="panel-body">
                                                        <div class=" m-2">
                                                            <div class="container-fluid">
                                                                <div class="container-fluid">
                                                                    <div id="res_table">
                                                                        <table class="table table-bordered" id="tab_logicc">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th class="text-center fix_len px-0 co_code"> Co. Code</th>
                                                                                    <th class="text-center fix_len px-0 po_code"> PO No.</th>
                                                                                    <th class="text-center fix_len px-0 po_ty_code"> PO Type</th>
                                                                                    <th class="text-center px-0 line_code"> Line No.</th>
                                                                                    <th class="text-center fix_length px-0 item_code_grn"> Item No</th>
                                                                                    <th class="text-center fix_length px-0 description_grn">Item Description</th>
                                                                                    <th class="text-center fix_len px-0 cost_rule_head"> Cost Rule</th>
                                                                                    <th class="text-center fix_len px-0 uom_code"> UOM</th>
                                                                                    <th class="text-center fix_len px-0 unit_rate_code"> Unit Rate</th>
                                                                                    <th class="text-center fix_len px-0 ord_qty_code d-none"> Order Qty.</th>
                                                                                    <th class="text-center fix_len px-0 open_qty_code"> Open Qty.</th>
                                                                                    <th class="text-center fix_len px-0 scanned_code"> Scanned/Invoice Qty.</th>
                                                                                    <th class="text-center fix_len px-0 actual_code"> Actual Recieved Qty.</th>
                                                                                    <th class="text-center fix_len px-0 short_code"> Short Qty</th>
                                                                                    <th class="text-center fix_len px-0 taxable_code"> Taxable value</th>
                                                                                    <th class="text-center fix_len px-0 taxable_amount"> Tax Amount</th>
                                                                                    <th class="text-center px-0 description_head d-none"> description</th>
                                                                                    <th class="text-center px-0 business_detailsss d-none"> business Unit</th>
                                                                                    
                                                                                    <!-- <th class="text-center"> Next Status</th>
                                                                                    <th class="text-center"> Last Status</th> -->
                                                                                    <!-- <th class="text-center"> Action</th> -->
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="table-body">
                                                                              <tr>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-center" id="" ></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-center" id="po_number"></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-center"></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-center" id="line_number"></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-center" id="item_code" ></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-center" id="" ></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-center" id="" ></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-center"></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-center"></td>
                                                                                    <td class="text-center p-0 d-none"><input type="text" readonly class="form-control input_size details_statuss text-center" id=""></td>
                                                                                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-center" id=""></td>
                                                                                    <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-center"></td>
                                                                                    <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-center"></td>
                                                                                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size Sacnned_qty text-center" id="quantity"></td>
                                                                                    <td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-center"></td>
                                                                                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size short_quantity text-center"></td>
                                                                                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size taxable_value text-center"></td>
                                                                                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size taxable_amount_payload text-center"></td>
                                                                                    <td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size description text-center"></td>
                                                                                    <td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size business_detail text-center"></td>
                                                                                    <!-- <td><input type="text" id="item_code" readonly class="form-control input_size next_status text-right"></td>
                                                                                    <td><input type="text" id="hsn_code" readonly class="form-control input_size last_status text-right"></td> -->
                                                                                <!-- <td class="d-flex"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Receive</button></td> -->
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>

                                                                          <button class="btn btn-success d-none"  type="button" data-toggle="modal" data-target="#myModal18" id="Modal_details"><i class="fa fa-plus"></i></button>
                                                                          <input type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#myModal18" readonly id="Modal_details" value="Add">&nbsp;
                                                                          <input type="button" id="add_roww" class="btn btn-primary d-none" value="Add Row"/>
                                                                          <input type="button" id="delete_unnessary" class="btn btn-danger border d-none" value="Delete"> 
                                                                          <input type="button" id="modal_delete_unnessary" class="btn btn-danger border d-none" value="Delete"> 
                                                                          <div id="pointingBox" class="pointing-box"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="row clearfix">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 


                                                <div role="tabpanel" id="tab-11" class="tab-pane">
                                                    <div class="panel-body" id="grn_table_fix">
                                                        <div class="row d-flex justify-content-end mx-2">
                                                            <div class="container-fluid">
                                                                <div class="container-fluid clearfix">
                                                                    <div class="">
                                                                        <table class="table table-bordered" id="grn_table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th class="text-center fix_grn_len do_co_head"> Do. No.</th>
                                                                                    <th class="text-center fix_grn_len do_ty_head"> Do Ty</th>
                                                                                    <th class="text-center fix_grn_len mcu_head"> Business Unit</th>
                                                                                    <th class="text-center fix_grn_length"> Item No.</th>
                                                                                    <th class="text-center fix_grn_len"> Invoice No.</th>
                                                                                    <th class="text-center fix_grn_len"> GLC</th>
                                                                                    <th class="text-center fix_grn_len"> GL Date</th>
                                                                                    <th class="text-center fix_grn_len qty_head"> Qty Recieved</th>
                                                                                    <th class="text-center fix_grn_length remark_head"> Remark</th>
                                                                                    <th class="text-center fix_grn_len"> Amount Recieved</th>
                                                                                    <th class="text-center fix_grn_len"> Location</th>
                                                                                    <th class="text-center fix_grn_len"> User Date</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="grn_table_body">
                                                                                <!-- <tr>
                                                                                    <td><input type="text" readonly class="form-control input_size document_no text-center" id="details_status"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size do_ty text-center" id="details_status"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size business_unit_grn text-center" id="details_status"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size item_no text-center" id="details_status"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size invoice_no_grn text-center" id="details_status"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size glc text-center" id=""></td>
                                                                                    <td><input type="text" readonly class="form-control input_size quantity_recieved text-right" id="details_status"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size order_no text-left" id="line_num"></td>
                                                                                    <td><input type="text" id="hsn_code" readonly class="form-control input_size amount_open text-right"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size location text-right"></td>
                                                                                    <td><input type="text" readonly class="form-control input_size user_date text-right"></td>
                                                                              </tr> -->
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

                                                <div role="tabpanel" id="tab_11_5" class="tab-pane">
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="container-fluid" id="for_slider">
                                                                <div class="">
                                                                <table id="debit_table"
                                                                    class="display responsive text-left" style="width: 100%">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-left" data-hide="phone">Short Order No.</th>
                                                                            <th class="text-left" data-hide="phone">Short Receipt Document</th>
                                                                            <th class="text-left" data-hide="phone">Short Voucher No.</th>
                                                                            <th class="text-left" data-hide="phone">Short JDE Msg.</th>
                                                                         
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="debit_note_body">
                                                                    </tbody>
                                                                </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div role="tabpanel" id="tab-12" class="tab-pane">
                                                    <div class="panel-body">
                                                        <div class="row">

                                                            <div class="col-12" id="form3">
    
                                                                <table id="Dtable_view"
                                                                    class="display responsive nowrap text-left row_col"
                                                                    style="width: 100%">
    
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-left" data-hide="phone">Item Number</th>
                                                                            <th class="text-left" data-hide="phone">Recived Qty</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Accept Qty</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Reject Qty</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Inreview Qty</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Branch Plant</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Document No.</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Doc. Type</th>
                                                                            <th class="text-left" data-hide="phone,tablet">Remark</th>
                                                                            
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="tbodyy">
                                                                    </tbody>
                                                                </table>
    
                                                            </div>
    
                                                        </div>
                                                    </div>
                                                </div>

                                                <div role="tabpanel" id="tab-13" class="tab-pane">
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="container-fluid" id="for_slider">
                                                                <div class="voucher_table_flex">
                                                                <table id="voucher_table"
                                                                    class="display responsive nowrap text-left row_col"
                                                                    style="width: 100%">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-left" data-hide="phone">Vendor No.</th>
                                                                            <th class="text-left" data-hide="phone">Company Code</th>
                                                                            <th class="text-left" data-hide="phone">Doc. No.</th>
                                                                            <th class="text-left" data-hide="phone">Doc. Type</th>
                                                                            <th class="text-left" data-hide="phone">Invoice No.</th>
                                                                            <th class="text-left" data-hide="phone">Pay Stat</th>
                                                                            <th class="text-left" data-hide="phone">Invoice Date</th>
                                                                            <th class="text-left" data-hide="phone">GL Date</th>
                                                                            <th class="text-left" data-hide="phone">Gross Amount</th>
                                                                            <th class="text-left" data-hide="phone">Open Amount</th>
                                                                            <th class="text-left" data-hide="phone">Batch No.</th>
                                                                            <th class="text-left" data-hide="phone">Batch date</th>
                                                                            <th class="text-left" data-hide="phone">TDS Type</th>
                                                                         
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="voucher_body">
                                                                    </tbody>
                                                                </table>
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


                            <div class="form-group d-flex  col-12">
                                <div class="col-4 d-flex align-items-center">
                                  <lable ><b class="co-4 Diffrence">Diffrence</b></lable>
                                <input type="text" name="" class="form-control col-8 ml-3" id="Diffrence" readonly placeholder="">
                                </div>
                                <div class="col-4 d-flex align-items-center">
                                  <lable><b class="co-4">Total Amount JDE</b></lable>
                                  <input type="text" name="" class="form-control col-8 ml-3" id="Total_Amount" readonly placeholder="">
                                </div>
                                <div class="col-4 d-flex align-items-center">
                                  <lable><b class="co-4">Total Invoice Amount</b></lable>
                                  <input type="text" name="" class="form-control col-8 ml-3" id="Total_Invoice_amount" readonly placeholder="">
                                </div>
                                <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
                                  <!-- <option value="" selected></option> -->
                                <!-- </select> -->
                                </div>


                                <!-- <div class="form-group d-flex  col-12">
                                    <div class="col-5 p-0 d-flex align-items-center">
                                      <lable class="col-3 p-0"><b>PO Number</b></lable>
                                      <input type="text" name="" class="form-control col-8" id="po_no_selected" placeholder="PO Number">
                                    </div> -->
                                    <!-- <div class="col-5 p-0 d-flex align-items-center">
                                      <lable class="col-3 "><b>PO Type</b></lable>
                                      <input type="text" class="form-control col-8" placeholder="PO Type" id="po_type_search" value=""> -->
                      
                                      <!-- <input type="button" class="btn btn-primary btn btn-primary col-3 ml-2" placeholder="" id="po_no_selected_search" value="Search"> -->
                                    <!-- </div> -->
                                    <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
                                      <!-- <option value="" selected></option> -->
                                    <!-- </select> -->
                                <!-- </div> -->
                        </div>


                            </div>
                            

                        </div>
                        <!-- adsfadfs -->
                        <div class="row d-none">
                            <div class="col-12">
                                <div class="panel panel-primary ">

                                    <div class="panel-body d-flex">
                                        <input type="button" class="btn btn-primary col-3" id="calculate_diffrence"
                                            value="Calculate Diffrence"> &nbsp;&nbsp;&nbsp;
                                        <input type="button" class="btn btn-primary col-3 d-none" id="validate_amount"
                                            value="Validate"> &nbsp;&nbsp;&nbsp;
                                        <input type="button" id="create_grn"
                                            class="btn col-3  border btn-secondary invisible" value="Create GRN">
                                        <input type="button" id="reverse_grn"
                                            class="btn col-3  border btn-secondary invisible d-none"
                                            value="Reverse GRN">

                                    </div>
                                </div>


                            </div>


                        </div>

                        <div class="row">
                            <div class="col-12">




                                <div class="panel panel-primary ">

                                    <div class="panel-body">
                                        <div class="ibox m-0">
                                            <div class="p-0">

                                                <div class="tabs-container">


                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li><a class="nav-link d-none" id="data3" data-toggle="tab"
                                                                href="#tab-3">Remark</a></li>
                                                        <li><a class="nav-link active" id="data4" data-toggle="tab"
                                                                href="#tab-4">Previous Remark</a></li>
                                                    </ul>

                                                    <div class="tab-content">



                                                        <div role="tabpanel" id="tab-3" class="tab-pane">
                                                            <div class="panel-body">
                                                                <div class="row m-2">
                                                                    <div class="container-fluid">
                                                                        <div class="container-fluid clearfix">
                                                                            <div class="">
                                                                                <textarea name="" id="" cols="" rows="4"
                                                                                    class="w-100 py-2 px-3"></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row clearfix">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="content" class="d-none"></div>



                                                        <div role="tabpanel" id="tab-4" class="tab-pane active">
                                                            <div class="panel-body px-0">
                                                                <div class="row d-flex justify-content-end mx-2">
                                                                    <div class="container-fluid">
                                                                        <div class="container-fluid clearfix px-0">
                                                                            <div class="">
                                                                                <table class="table table-bordered display" id="remark_table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th class="text-left col-2"> Username</th>
                                                                                            <th class="text-left col-2"> Date</th>
                                                                                            <th class="text-left col-2"> Stage</th>
                                                                                            <th class="text-left col-8"> Remark</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody id="remark_table_body">
                                                                                      
                                                                                    </tbody>
                                                                                  </table>
                                                                                      <input type="button" id="remarks_row" class="btn btn-primary invisible" value="Add Row"/>
                                                                                <input type="button" id="remark_row"
                                                                                    class="btn btn-primary invisible"
                                                                                    value="Add Row" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="row clearfix">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <br>


                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>



                            </div>


                        </div>

                        <div class="row">
                            <div class="col-12">
                                <!-- <div class="panel panel-primary "> -->

                                    <!-- <div class="panel-body d-flex"> -->

                                        <input type="button" id="cancel" class="btn col-sm-1 btn-success border"
                                            value="Back">
                                        <input type="button" id="reject_invoice"
                                            class="btn col-sm-6 btn-danger border d-none" value="Reject">


                                    <!-- </div> -->
                                <!-- </div> -->
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        </form>
        <br>
        <br>
        <br>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    <script src="../../../../custom/js/breadcrumb.js"></script>

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
    <script src="../js/addGridInvoice.js" + $.getCurrentVersion()></script>
    <script src="../../../Basic/js/updatestatus.js"></script>

    <!-- <script src="../../../Basic/js/updatestatus.js"></script> -->

    <!-- jQuery UI -->
    <script src="../../../../cdn/js/dataTables.min.js"></script>

    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>

    <script src="../../../../cdn/js/dataTables.select.min.js"></script>
    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->




    <script src="../js/viewGate.js" + $.getCurrentVersion()></script>

    <script src="../../../Basic/js/updatestatus.js"></script>


</body>

</html>