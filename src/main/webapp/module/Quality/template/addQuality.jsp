<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Quality</title>
    <jsp:include page="../../Basic/template/favicon.jsp" />
    <!-- <title><c:url> Tag Example</title> -->

    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">



    <link href="../css/addQuality.css" rel="stylesheet">


    <script src="../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../custom/adjustable-invoice/css/index.css">

    <script src="../../../static/js/bootstrap.js"></script>

    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">

    <script src="../template/qualityTest.jsp"></script>




    <style>
        /* .form-control {
            padding: 2px 2px !important;
            height: 30px;
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

        .resize {
            margin-bottom: 0.8rem !important;
        }


        /* .py-3 {
            padding-bottom: 4rem !important;

        } */

        .py-2 {
            padding-bottom: 0.7rem !important;
        }

        /* option:focus {
            background-color: #24537F !important;
        }

        div.dataTables_length select option:hover{
            color: green !important;
            background-color: blue !important;
        } */

        #Dtable_length>label>select>option {
            /* color:  !important; */
            /* background-color: #24537F !important; */
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
        .p-3 {
            padding: 1.1rem!important;
        }
        #Dtable_view td:nth-child(7){

        white-space: normal !important;

        }
        #Dtable_view td:nth-child(2){

        white-space: normal !important;

        }

        .validate{
            border: 3px solid #e5e6e7 !important;
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
                    if(item.id == 25){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                    }
                  }
              )
              let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Quality")  || name.includes("Admin"))
             if(returned_arr.flat(Infinity).includes(true)) {

            }
            else {
                window.location.href = "../../Basic/template/404.jsp";
            }
         }
         else {
             window.location.href = "../../Basic/template/404.jsp";
         }

    </script>

    <div id="wrapper">
        <!--% including header %-->
        <jsp:include page="../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../Basic/template/breadcrumb.jsp" />

        <div class="modal inmodal fade" id="myModal6" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <div class="tabs-container white-bg">
                        </div>
                        <div class="modal-body">

                            <div class="py-0" id="loader10">
                                <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin10">
                                    <div class="sk-double-bounce1"></div>
                                    <div class="sk-double-bounce2"></div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <div class="ibox ">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                    QA Result
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <!-- <div class="col-1"></div> -->
                                                        <div class="col-6">
                                                            <div class="form-group" id="modal_work_order_number"><label>Work Order No.
                                                            </label> <input type="text" id="modal_vendor_name1"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                            </div>
                                                            <div class="form-group" id="receipt_number"><label>Receipt Number
                                                            </label> <input type="text" id="modal_receipt_number1"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group" id="modal_work_order_type"><label>Work Order Type
                                                            </label> <input type="text" id="modal_vendor_code1"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                            </div>
                                                            <div class="form-group" id="receipt_type"><label>Receipt Type
                                                            </label> <input type="text" id="modal_receipt_type1"
                                                                readonly="" class="form-control"
                                                                style="font-weight: bold;">
                                                            </div>
                                                        </div>
                                                        <!-- <div class="col-1"></div> -->
                                                    </div>
                                                    <br><hr><br>
                                                    <div class="row">

                                                        <div class="col-12" id="form3">

                                                            <table id="Dtable_view"
                                                                class="display  text-left row_col"
                                                                style="width: 100%">

                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-left" data-hide="phone">Item Number</th>
                                                                        <th class="text-left" data-hide="phone">Description</th>
                                                                        <th class="text-left" data-hide="phone">Recived Qty</th>
                                                                        <th class="text-left" data-hide="phone,tablet">Accept Qty</th>
                                                                        <th class="text-left" data-hide="phone,tablet">Reject Qty</th>
                                                                        <th class="text-left" data-hide="phone,tablet">Inreview Qty</th>
                                                                        <th class="text-left" data-hide="phone,tablet">Branch Plant</th>
                                                                        <th class="text-left" data-hide="phone,tablet">Document No.</th>
                                                                        <th class="text-left" data-hide="phone,tablet">Doc. Type</th>
                                                                        <th class="text-left" data-hide="phone,tablet">From Loc.</th>
                                                                        <th class="text-left" data-hide="phone,tablet">To Loc.</th>
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
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="row">
                                    <div class="col-12">
                                        <div class="panel panel-primary ">

                                            <div class="panel-body">
                                                <div class="ibox m-0">
                                                    <div class="p-0">

                                                        <div class="tabs-container">

                                                            <div class="" id="myModal6_loader">
                                                                <div
                                                                    class="sk-spinner sk-spinner-double-bounce d-none">
                                                                    <div class="sk-double-bounce1"></div>
                                                                    <div class="sk-double-bounce2"></div>
                                                                </div>


                                                                <ul class="nav nav-tabs" role="tablist">
                                                                    <li><a class="nav-link active" id="data_in_review"
                                                                            data-toggle="tab"
                                                                            href="#tab_1_in_review">In-review Remark</a>
                                                                    </li>
                                                                    <li><a class="nav-link" id="data_reject"
                                                                            data-toggle="tab" href="#tab_1_reject">Reject Remark</a></li>
                                                                </ul>

                                                                <div class="tab-content">

                                                                    <div role="tabpanel" id="tab_1_in_review"
                                                                        class="tab-pane">
                                                                        <div class="panel-body">
                                                                            <div
                                                                                class="row d-flex justify-content-end mx-2">
                                                                                <div class="container-fluid">
                                                                                    <div
                                                                                        class="container-fluid clearfix">
                                                                                        <div class="">
                                                                                            <table
                                                                                                class="table table-bordered"
                                                                                                id="remark_table_in_review">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th
                                                                                                            class="text-center">
                                                                                                            Username
                                                                                                        </th>
                                                                                                        <th
                                                                                                            class="text-center">
                                                                                                            Date
                                                                                                        </th>
                                                                                                        <th
                                                                                                            class="text-center">
                                                                                                            Remark
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody
                                                                                                    id="remark_table_body_in_review">
                                                                                                    <tr>
                                                                                                        <td><input
                                                                                                                type="text"
                                                                                                                readonly
                                                                                                                class="form-control input_size text-center"
                                                                                                                id="">
                                                                                                        </td>
                                                                                                        <td><input
                                                                                                                type="text"
                                                                                                                readonly
                                                                                                                class="form-control input_size text-center"
                                                                                                                id="">
                                                                                                        </td>
                                                                                                        <td><input
                                                                                                                type="text"
                                                                                                                readonly
                                                                                                                class="form-control input_size text-center"
                                                                                                                id="">
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <input type="button"
                                                                                                id="remark_row_in_review"
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



                                                                    <div role="tabpanel" id="tab_1_reject"
                                                                        class="tab-pane">
                                                                        <div class="panel-body">
                                                                            <div
                                                                                class="row d-flex justify-content-end mx-2">
                                                                                <div class="container-fluid">
                                                                                    <div
                                                                                        class="container-fluid clearfix">
                                                                                        <div class="">
                                                                                            <table
                                                                                                class="table table-bordered"
                                                                                                id="remark_table_reject">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th
                                                                                                            class="text-center">
                                                                                                            Username
                                                                                                        </th>
                                                                                                        <th
                                                                                                            class="text-center">
                                                                                                            Date
                                                                                                        </th>
                                                                                                        <th
                                                                                                            class="text-center">
                                                                                                            Remark
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody
                                                                                                    id="remark_table_body_reject">
                                                                                                    <tr>
                                                                                                        <td><input
                                                                                                                type="text"
                                                                                                                readonly
                                                                                                                class="form-control input_size text-center"
                                                                                                                id="">
                                                                                                        </td>
                                                                                                        <td><input
                                                                                                                type="text"
                                                                                                                readonly
                                                                                                                class="form-control input_size text-center "
                                                                                                                id="">
                                                                                                        </td>
                                                                                                        <td><input
                                                                                                                type="text"
                                                                                                                readonly
                                                                                                                class="form-control input_size text-center"
                                                                                                                id="">
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                            <input type="button"
                                                                                                id="remark_row_reject"
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

                                                            </div><br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white close" id="close_btn"
                                    data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="modal inmodal fade" id="myModal7" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <div class="tabs-container white-bg">
                            </div>
                            <div class="modal-body">

                                <div class="py-0" id="loader12">
                                    <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin12">
                                        <div class="sk-double-bounce1"></div>
                                        <div class="sk-double-bounce2"></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="ibox ">
                                                <div class="panel panel-primary">
                                                    <div class="panel-heading">
                                                        QA Result
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-1"></div>
                                                            <div class="col-5">

                                                                <div class="form-group"><label>Vendor Name
                                                                    </label> <input type="text" id="modal_vendor_name2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>PO Number
                                                                    </label> <input type="text" id="modal_po_nbr2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Document Number
                                                                    </label> <input type="text" id="modal_document_nbr2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Branch Number
                                                                    </label> <input type="text" id="F43121_MCU2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Invoice Number
                                                                    </label> <input type="text" id="modal_invoice_nbr2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Line Number
                                                                    </label> <input type="text" id="modal_line_number2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Item Number
                                                                    </label> <input type="text" id="F43121_LITM2"
                                                                        readonly="" class="form-control "
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Work Order No.
                                                                    </label> <input type="text" id="work_order_number2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Received Quantity
                                                                    </label> <input type="text" id="F43121_UREC2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                            </div>
                                                            <hr>
                                                            <div class="col-5">

                                                                <div class="form-group"><label>Vendor Code
                                                                    </label> <input type="text" id="modal_vendor_code2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>PO Type
                                                                    </label> <input type="text" id="modal_po_type2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                                <div class="form-group"><label>Document Type
                                                                    </label> <input type="text" id="modal_type2"
                                                                        readonly="" value="OV" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none" id=""><label>Delivery Challan
                                                                        Number
                                                                    </label> <input type="text"
                                                                        id="deliveryChallanNumber2" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group" id="None_deliveryChallanNumber">
                                                                    <label>Item Description
                                                                    </label> <input type="text" id="Description2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none" id="open_quanity_show">
                                                                    <label>Open Quantity
                                                                    </label> <input type="text" id="open_quanity2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Invoice Date
                                                                    </label> <input type="text" id="modal_invoice_date2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Company Code
                                                                    </label> <input type="text" id="modal_company_code2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Work Order Type
                                                                    </label> <input type="text" id="work_order_type2"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                            </div>
                                                            <div class="col-1"></div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-1"></div>
                                                            <div class="col-5" id="">
                                                                <div class="form-group"><label>Accept Quantity
                                                                    </label> <input type="text" id="accept1"
                                                                        class="form-control validate"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="col-5" id="">
                                                                <div class="form-group"><label>Reject Quantity
                                                                    </label> <input type="text" id="reject1"
                                                                        class="form-control validate"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="col-1"></div>
                                                        </div>
                                                        <div class="offset-1 text-danger d-none " id="message1">Quantity
                                                            is not
                                                            matched</div><br>

                                                            <div class="row d-none" id="second_reject_remark">
                                                                <div class="col-1"></div>
                                                                
                                                                    <div class="col-10">
                                                                        <div class="panel panel-primary">
                                                                            <div class="panel-heading">
                                                                                Remark For Reject
                                                                            </div>
                                                                            <div class="panel-body">
                                                                                <div class="row">
                                                                                    <!-- <div class="col-1"></div> -->
                                                                                    <div class="col-12">
                                                                                        <div class="container-fluid">
                                                                                            <div class="container-fluid clearfix">
                                                                                                <div class="">
                                                                                                    <textarea name="" id="second_reject_remark_note" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="row clearfix">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <!-- <div class="col-1"></div> -->
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <!-- <div class="col-10">
                                                                    <div class="panel panel-primary ">
                        
                                                                        <div class="panel-body">
                                                                            <div class="ibox m-0">
                                                                                <div class="p-0">
                        
                                                                                    <div class="tabs-container">
                        
                                                                                        <div class="" id="loader">
                                                                                            <div class="sk-spinner sk-spinner-double-bounce d-none">
                                                                                                <div class="sk-double-bounce1"></div>
                                                                                                <div class="sk-double-bounce2"></div>
                                                                                            </div>
                        
                        
                                                                                            <ul class="nav nav-tabs" role="tablist">
                                                                                                <li><a class="nav-link active" id="data3" data-toggle="tab" href="#tab-3">Remark</a>
                                                                                                </li>
                                                                                                <li><a class="nav-link" id="data4" data-toggle="tab" href="#tab-4">Previous
                                                                                                        Remark</a></li>
                                                                                            </ul>
                        
                                                                                            <div class="tab-content">
                        
                        
                        
                                                                                                <div role="tabpanel" id="tab-3" class="tab-pane active">
                                                                                                    <div class="panel-body">
                                                                                                        <div class="row m-2">
                                                                                                            <div class="container-fluid">
                                                                                                                <div class="container-fluid clearfix">
                                                                                                                    <div class="">
                                                                                                                        <textarea name="" id="" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="row clearfix">
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                        
                        
                        
                                                                                                <div role="tabpanel" id="tab-4" class="tab-pane">
                                                                                                    <div class="panel-body">
                                                                                                        <div class="row d-flex justify-content-end mx-2">
                                                                                                            <div class="container-fluid">
                                                                                                                <div class="container-fluid clearfix">
                                                                                                                    <div class="">
                                                                                                                        <div id="remark_table_wrapper" class="dataTables_wrapper no-footer"><div class="top"></div><table class="table table-bordered dataTable no-footer" id="remark_table" aria-describedby="remark_table_info">
                                                                                                                            <thead>
                                                                                                                                <tr><th class="text-center sorting sorting_asc" tabindex="0" aria-controls="remark_table" rowspan="1" colspan="1" aria-sort="ascending" aria-label="
                                                                                                                                        Username
                                                                                                                                    : activate to sort column descending" style="width: 0px;">
                                                                                                                                        Username
                                                                                                                                    </th><th class="text-center sorting" tabindex="0" aria-controls="remark_table" rowspan="1" colspan="1" aria-label="
                                                                                                                                        Date
                                                                                                                                    : activate to sort column ascending" style="width: 0px;">
                                                                                                                                        Date
                                                                                                                                    </th><th class="text-center sorting" tabindex="0" aria-controls="remark_table" rowspan="1" colspan="1" aria-label="
                                                                                                                                        Remark
                                                                                                                                    : activate to sort column ascending" style="width: 0px;">
                                                                                                                                        Remark
                                                                                                                                    </th></tr>
                                                                                                                            </thead>
                                                                                                                            <tbody id="remark_table_body">
                                                                                                                                
                                                                                                                            <tr class="odd">
                                                                                                                                    <td class="sorting_1"><input type="text" readonly="" class="form-control input_size text-center re_username" id="">
                                                                                                                                    </td>
                                                                                                                                    <td><input type="text" readonly="" class="form-control input_size text-center re_date" id="">
                                                                                                                                    </td>
                                                                                                                                    <td><input type="text" readonly="" class="form-control input_size text-center re_remark" id="">
                                                                                                                                    </td>
                                                                                                                                   
                                                                                                                                </tr></tbody>
                                                                                                                        </table><div class="bottom"><div class="dataTables_info" id="remark_table_info" role="status" aria-live="polite">Showing 1 to 1 of 1 entries</div><div class="dataTables_length" id="remark_table_length"><label>Show <select name="remark_table_length" aria-controls="remark_table" class=""><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="25">25</option><option value="50">50</option></select> entries</label></div><div class="dataTables_paginate paging_simple_numbers" id="remark_table_paginate"><a class="paginate_button previous disabled" aria-controls="remark_table" aria-disabled="true" aria-role="link" data-dt-idx="previous" tabindex="-1" id="remark_table_previous">Previous</a><span><a class="paginate_button current" aria-controls="remark_table" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="remark_table" aria-disabled="true" aria-role="link" data-dt-idx="next" tabindex="-1" id="remark_table_next">Next</a></div></div></div>
                                                                                                                        <input type="button" id="remark_row" class="btn btn-primary invisible" value="Add Row">
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
                        
                        
                                                                </div> -->
                                                                <div class="col-1"></div>
                                                            </div>
                                                            <div class="offset-1 text-danger d-none " id="second_message_remark">Please Add Remarks</div><br>
                                                        <div class="row">
                                                            <div class="col-1"></div>
                                                            <div class="col-11 ">
                                                                <input type="button" class="btn btn-primary"
                                                                    id="in_review_qa_submit" value="Submit">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <div class="tabs-container white-bg">
                            </div>
                            <div class="modal-body">

                                <div class="py-0" id="loader11">
                                    <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin11">
                                        <div class="sk-double-bounce1"></div>
                                        <div class="sk-double-bounce2"></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="ibox ">
                                                <div class="panel panel-primary">
                                                    <div class="panel-heading">
                                                        QA Result
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-1"></div>
                                                            <div class="col-5">

                                                                <div class="form-group"><label>Vendor Name
                                                                    </label> <input type="text" id="modal_vendor_name"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>PO Number
                                                                    </label> <input type="text" id="modal_po_nbr"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Document Number
                                                                    </label> <input type="text" id="modal_document_nbr"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Branch Number
                                                                    </label> <input type="text" id="F43121_MCU"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Invoice Number
                                                                    </label> <input type="text" id="modal_invoice_nbr"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Line Number
                                                                    </label> <input type="text" id="modal_line_number"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Item Number
                                                                    </label> <input type="text" id="F43121_LITM"
                                                                        readonly="" class="form-control "
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Work Order No.
                                                                    </label> <input type="text" id="work_order_number"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>Received Quantity
                                                                    </label> <input type="text" id="F43121_UREC"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                            </div>
                                                            <hr>
                                                            <div class="col-5">

                                                                <div class="form-group"><label>Vendor Code
                                                                    </label> <input type="text" id="modal_vendor_code"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group"><label>PO Type
                                                                    </label> <input type="text" id="modal_po_type"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                                <div class="form-group"><label>Document Type
                                                                    </label> <input type="text" id="modal_type"
                                                                        readonly="" value="OV" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group" id="deliveryChallanNumber_none"><label>Delivery Challan
                                                                        Number
                                                                    </label> <input type="text"
                                                                        id="deliveryChallanNumber" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group" id="None_deliveryChallanNumber">
                                                                    <label>Item Description
                                                                    </label> <input type="text" id="Description"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none" id="open_quanity_show">
                                                                    <label>Open Quantity
                                                                    </label> <input type="text" id="open_quanity"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Invoice Date
                                                                    </label> <input type="text" id="modal_invoice_date"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Company Code
                                                                    </label> <input type="text" id="modal_company_code"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                                <div class="form-group d-none"><label>Work Order Type
                                                                    </label> <input type="text" id="work_order_type"
                                                                        readonly="" class="form-control"
                                                                        style="font-weight: bold;">
                                                                </div>

                                                            </div>
                                                            <div class="col-1"></div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-1"></div>
                                                            <div class="col-3" id="remove_acp_col_3">
                                                                <div class="form-group"><label>Accept Quantity
                                                                    </label> <input type="text" id="accept"
                                                                        class="form-control validate"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="col-3" id="remove_rej_col_3">
                                                                <div class="form-group"><label>Reject Quantity
                                                                    </label> <input type="text" id="reject"
                                                                        class="form-control validate"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="col-4" id="remove_in_review">
                                                                <div class="form-group"><label>In Review Quantity
                                                                    </label> <input type="text" id="in_review"
                                                                        class="form-control validate"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="col-1"></div>
                                                        </div>
                                                        <div class="offset-1 text-danger d-none " id="message">Quantity
                                                            is not
                                                            matched</div><br>

                                                            <div class="row d-none" id="first_reject_remark">
                                                                <div class="col-1"></div>
                                                                
                                                                    <div class="col-10">
                                                                        <div class="panel panel-primary">
                                                                            <div class="panel-heading">
                                                                                Remark For Reject Quantity 
                                                                            </div>
                                                                            <div class="panel-body">
                                                                                <div class="row">
                                                                                    <!-- <div class="col-1"></div> -->
                                                                                    <div class="col-12">
                                                                                        <div class="container-fluid">
                                                                                            <div class="container-fluid clearfix">
                                                                                                <div class="">
                                                                                                    <textarea name="" id="first_reject_remark_note" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="row clearfix">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <!-- <div class="col-1"></div> -->
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <!-- <div class="col-10">
                                                                    <div class="panel panel-primary ">
                        
                                                                        <div class="panel-body">
                                                                            <div class="ibox m-0">
                                                                                <div class="p-0">
                        
                                                                                    <div class="tabs-container">
                        
                                                                                        <div class="" id="loader">
                                                                                            <div class="sk-spinner sk-spinner-double-bounce d-none">
                                                                                                <div class="sk-double-bounce1"></div>
                                                                                                <div class="sk-double-bounce2"></div>
                                                                                            </div>
                        
                        
                                                                                            <ul class="nav nav-tabs" role="tablist">
                                                                                                <li><a class="nav-link active" id="data3" data-toggle="tab" href="#tab-3">Remark</a>
                                                                                                </li>
                                                                                                <li><a class="nav-link" id="data4" data-toggle="tab" href="#tab-4">Previous
                                                                                                        Remark</a></li>
                                                                                            </ul>
                        
                                                                                            <div class="tab-content">
                        
                        
                        
                                                                                                <div role="tabpanel" id="tab-3" class="tab-pane active">
                                                                                                    <div class="panel-body">
                                                                                                        <div class="row m-2">
                                                                                                            <div class="container-fluid">
                                                                                                                <div class="container-fluid clearfix">
                                                                                                                    <div class="">
                                                                                                                        <textarea name="" id="" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="row clearfix">
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                        
                        
                        
                                                                                                <div role="tabpanel" id="tab-4" class="tab-pane">
                                                                                                    <div class="panel-body">
                                                                                                        <div class="row d-flex justify-content-end mx-2">
                                                                                                            <div class="container-fluid">
                                                                                                                <div class="container-fluid clearfix">
                                                                                                                    <div class="">
                                                                                                                        <div id="remark_table_wrapper" class="dataTables_wrapper no-footer"><div class="top"></div><table class="table table-bordered dataTable no-footer" id="remark_table" aria-describedby="remark_table_info">
                                                                                                                            <thead>
                                                                                                                                <tr><th class="text-center sorting sorting_asc" tabindex="0" aria-controls="remark_table" rowspan="1" colspan="1" aria-sort="ascending" aria-label="
                                                                                                                                        Username
                                                                                                                                    : activate to sort column descending" style="width: 0px;">
                                                                                                                                        Username
                                                                                                                                    </th><th class="text-center sorting" tabindex="0" aria-controls="remark_table" rowspan="1" colspan="1" aria-label="
                                                                                                                                        Date
                                                                                                                                    : activate to sort column ascending" style="width: 0px;">
                                                                                                                                        Date
                                                                                                                                    </th><th class="text-center sorting" tabindex="0" aria-controls="remark_table" rowspan="1" colspan="1" aria-label="
                                                                                                                                        Remark
                                                                                                                                    : activate to sort column ascending" style="width: 0px;">
                                                                                                                                        Remark
                                                                                                                                    </th></tr>
                                                                                                                            </thead>
                                                                                                                            <tbody id="remark_table_body">
                                                                                                                                
                                                                                                                            <tr class="odd">
                                                                                                                                    <td class="sorting_1"><input type="text" readonly="" class="form-control input_size text-center re_username" id="">
                                                                                                                                    </td>
                                                                                                                                    <td><input type="text" readonly="" class="form-control input_size text-center re_date" id="">
                                                                                                                                    </td>
                                                                                                                                    <td><input type="text" readonly="" class="form-control input_size text-center re_remark" id="">
                                                                                                                                    </td>
                                                                                                                                   
                                                                                                                                </tr></tbody>
                                                                                                                        </table><div class="bottom"><div class="dataTables_info" id="remark_table_info" role="status" aria-live="polite">Showing 1 to 1 of 1 entries</div><div class="dataTables_length" id="remark_table_length"><label>Show <select name="remark_table_length" aria-controls="remark_table" class=""><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="25">25</option><option value="50">50</option></select> entries</label></div><div class="dataTables_paginate paging_simple_numbers" id="remark_table_paginate"><a class="paginate_button previous disabled" aria-controls="remark_table" aria-disabled="true" aria-role="link" data-dt-idx="previous" tabindex="-1" id="remark_table_previous">Previous</a><span><a class="paginate_button current" aria-controls="remark_table" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="remark_table" aria-disabled="true" aria-role="link" data-dt-idx="next" tabindex="-1" id="remark_table_next">Next</a></div></div></div>
                                                                                                                        <input type="button" id="remark_row" class="btn btn-primary invisible" value="Add Row">
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
                        
                        
                                                                </div> -->
                                                                <div class="col-1"></div>
                                                            </div>
                                                            <div class="offset-1 text-danger d-none " id="message_remark">Please Add Remarks</div>

                                                            <div class="row d-none" id="first_inreview_remark">
                                                                <div class="col-1"></div>
                                                                    <div class="col-10">
                                                                        <div class="panel panel-primary">
                                                                            <div class="panel-heading">
                                                                                Remark For In-review Quantity 
                                                                            </div>
                                                                            <div class="panel-body">
                                                                                <div class="row">
                                                                                    <div class="col-12">
                                                                                        <div class="container-fluid">
                                                                                            <div class="container-fluid clearfix">
                                                                                                <div class="">
                                                                                                    <textarea name="" id="first_in_review_remark_note" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
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
                                                                <div class="col-1"></div>
                                                            </div>
                                                            <div class="offset-1 text-danger d-none " id="in_review_message_remark">Please Add Remarks</div>

                                                            <div class="row d-none" id="both_remark">
                                                                <div class="col-1"></div>
                                                                <div class="col-5">
                                                                    <div class="panel panel-primary">
                                                                        <div class="panel-heading">
                                                                            Remark For Reject Quantity 
                                                                        </div>
                                                                        <div class="panel-body">
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    <div class="container-fluid">
                                                                                        <div class="container-fluid clearfix">
                                                                                            <div class="">
                                                                                                <textarea name="" id="first_reject_remark_note1" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row clearfix">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- <div class="row">
                                                                        <div class="col-1"></div>
                                                                            <div class="col-10">
                                                                            </div>
                                                                        <div class="col-1"></div>
                                                                    </div> -->
                                                                </div>
                                                                <div class="col-5">
                                                                    <div class="panel panel-primary">
                                                                        <div class="panel-heading">
                                                                            Remark For In-review Quantity 
                                                                        </div>
                                                                        <div class="panel-body">
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    <div class="container-fluid">
                                                                                        <div class="container-fluid clearfix">
                                                                                            <div class="">
                                                                                                <textarea name="" id="first_in_review_remark_note1" cols="" rows="4" class="w-100 py-2 px-3"></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="row clearfix">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- <div class="row">
                                                                        <div class="col-1"></div>
                                                                            <div class="col-10">
                                                                            </div>
                                                                        <div class="col-1"></div>
                                                                    </div> -->
                                                                </div>
                                                                <div class="col-1"></div>
                                                            </div>
                                                            <div class="offset-1 text-danger d-none " id="both_message_remark">Please Add Remarks</div>
                                                        <br>
                                                        <div class="row">
                                                            <div class="col-1"></div>
                                                            <div class="col-11 ">
                                                                <input type="button" class="btn btn-primary"
                                                                    id="qa_submit" value="Submit">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper wrapper-content animated fadeInRight ecommerce">

                <div class="row">
                    <div class="col-sm-12">
                        <!-- <div class="ibox "> -->
                        <div class="card mx-auto white-bg">
                            <div class="col-3">
                                <div class="form-group row gate_number ">
                                    <div class="col-9">
                                        <h3 id="gate_number"></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <jsp:include page="../../Basic/template/statusnavigation.jsp" />
                            </div>
                        </div>
                        <!-- </div> -->
                    </div>
                    <!-- <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-2">
                            <div class="text-center my-2">
                                <a class="btn btn-primary" href="../template/addQuality.jsp"><i class="fa fa-plus"> </i>
                                    Add Quality</a>
                            </div>
                        </div>
                    </div>


                </div> -->

                </div>
                <br>

                <form action="" id="invoice_form">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="ibox mb-0">
                                <div class="ibox-content p-3">
                                <div class="form-group row invisible"><label class="col-2 col-form-label mx-2 font-weight-bold">Gate Id : </label>
                                    <div class="col-4"><input type="text" readonly="" class="form-control font-weight-bold" required="" id="gateId">
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="ibox">
                                <div class="ibox-content p-2 ">
                                    <div class="text-center  my-2 d-flex justify-content-around">
                                        <input type="button" id="btn_panel" class="image-minimalize btn btn-primary" value="Hide Invoice">
    
                                            <input type="button" class="add_info btn btn-primary d-none" data-toggle="modal" data-target="#myModal11" readonly="" id="modeldata" value="Additional Info">
                                            <input type="button" class="add_info btn btn-primary d-none" data-toggle="modal" data-target="#myModal17" readonly="" id="modeldata" value="Additional Doc."></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                <form id="formABC" action="#">
                    <div class="ibox-content sk-loading" id="loader1">
                        <div class="sk-spinner sk-spinner-double-bounce" id="spin1">
                            <div class="sk-double-bounce1"></div>
                            <div class="sk-double-bounce2"></div>
                        </div>
                        <div class="container-fluid d-flex my-2 bg-white ">
                            <div class="upload-image box p-0 d-flex p-2 rounded  " style="z-index: 1; width: 900px;">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                    Organization Details
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-6 b-r" id="form1">

                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Company
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="company_code" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label
                                                                    class="col-4 py-1" for="storeId">Store ID
                                                                </label>
                                                                <div class="col-8">
                                                                    <select id="storeId" disabled class="form-control" style="font-weight: bold;">
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <!-- <div class="for">
                                                                <label for="storeId" class="col-4 col-form-label p-0 mr-2">Store Id*</label>
                                                                <div class="col-8">
                                                                <select id="storeId" disabled class="form-control">
                                                                </select>
                                                                </div>
                                                            </div> -->
                                                        </div>

                                                        <div class="col-6" id="form2">
                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Business
                                                                    Unit</label>
                                                                <div class="col-8">
                                                                    <input type="text" id="business_unit" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row d-none"><label
                                                                    class="col-4">State
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="state" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
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
                                                    Invoice Detail
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">

                                                        <div class="col-6 b-r" id="form3">
                                                            <div class="form-group row"><label class="col-4 py-1">Vendor
                                                                    Code
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="Vendor_code" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row"><label class="col-4 py-1">PO
                                                                    Number
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="po_number" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Invoice No
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="invoice_no" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>

                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Document
                                                                    Number
                                                                </label>
                                                                <div class="col-8">

                                                                    <input type="text" id="document_nbr" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>

                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Invoice
                                                                    Date</label>
                                                                <div class="col-8">
                                                                    <input type="text" id="invoice_date" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div class="col-6" id="form4">

                                                            <div class="form-group row"><label class="col-4 py-1">
                                                                    Vendor
                                                                    Name
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="vendor_name" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row"><label class="col-4 py-1">PO
                                                                    Type
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="po_type" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Invoice
                                                                    Type
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="invoice_type" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>

                                                            <div class="form-group row"><label
                                                                    class="col-4 py-1">Document Type
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="type" readonly=""
                                                                        class="form-control" value="OV"
                                                                        style="font-weight: bold;">
                                                                </div>
                                                            </div>

                                                            <div class="form-group row"><label class="col-4 py-1">GL
                                                                    Date
                                                                </label>
                                                                <div class="col-8">
                                                                    <input type="text" id="gl_date" readonly=""
                                                                        class="form-control" style="font-weight: bold;">
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="" id="loader1">
                                        <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin1">
                                            <div class="sk-double-bounce1"></div>
                                            <div class="sk-double-bounce2"></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                                    
                            <div class="handler  bg-white "></div>
                            <div class="upload-image box bg-body rounded" id="hide" style="z-index: 1;">
                                <div class="container-fluid h-100 p-0 ravi" id="pdf_receive">
                                </div>
                            </div>
                        </div>

                        <div class="container-fluid  d-flex my-1 bg-white ">
                            <div class="upload-image box p-0 d-fix p-2 border rounded  ">
                                <div class="container-fluid p-0">
                                    <div class="row d-none" id="getjde">
                                        <div class="col-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                    QA
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">

                                                        <div class="col-12" id="form3">

                                                            <table id="Dtable"
                                                                class="display responsive nowrap text-left row_col"
                                                                style="width: 100%">

                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-left" data-toggle="true">Doc No
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Item
                                                                            Number
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Work
                                                                            Order No.
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Work
                                                                            Order Type
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Business
                                                                            Unit</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Order
                                                                            Number</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Description</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Quantity</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Invoice Amount</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="Dtable_tbodyy">
                                                                </tbody>
                                                            </table>

                                                        </div>



                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-none" id="getdatabase11">
                                        <div class="col-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                    QA
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">

                                                        <div class="col-12" id="form3">

                                                            <table id="getdatabase11_Dtable1"
                                                                class="display responsive nowrap text-left row_col"
                                                                style="width: 100%">

                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-left" data-toggle="true">Doc No
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Item
                                                                            Number
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Work
                                                                            Order No.
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Work
                                                                            Order Type
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Business
                                                                            Unit</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Order
                                                                            Number</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Description</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Quantity</th>
                                                                        <!-- <th class="text-left" data-hide="phone,tablet">
                                                                        Amount</th> -->
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="tbodyy">
                                                                </tbody>
                                                            </table>

                                                        </div>



                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-none" id="getdatabase">
                                        <div class="col-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                    QA
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">

                                                        <div class="col-12" id="form3">

                                                            <table id="Dtable1"
                                                                class="display responsive nowrap text-left row_col"
                                                                style="width: 100%">

                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-left" data-toggle="true">Doc No
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Item
                                                                            Number
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Work
                                                                            Order No.
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Work
                                                                            Order Type
                                                                        </th>
                                                                        <th class="text-left" data-hide="phone">Business
                                                                            Unit</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Order
                                                                            Number</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Description</th>
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Quantity</th>
                                                                        <!-- <th class="text-left" data-hide="phone,tablet">
                                                                        Amount</th> -->
                                                                        <th class="text-left" data-hide="phone,tablet">
                                                                            Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="tbodyy">
                                                                </tbody>
                                                            </table>

                                                        </div>



                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="container"> -->
                                    
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="panel panel-primary">
                                                    <div class="panel-heading">
                                                        Remark
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="row">
                            
                                                          <div class="col-12">
                                                            <textarea name="" id="mandatory_msg" cols="" rows="4" class="w-100 py-2 px-3"></textarea> 
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="panel panel-primary">
                                                    <div class="panel-heading">
                                                        Previous Remark
                                                    </div>
                                                    <div class="panel-body">
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
                                                              <!-- <tr>
                                                                    <td><input type="text" readonly class="form-control input_size text-left re_username" id=""></td>
                                                                    <td><input type="text" readonly class="form-control input_size text-left re_date" id=""></td>
                                                                    <td><input type="text" readonly class="form-control input_size text-left re_label" id=""></td>
                                                                    <td><input type="text" readonly class="form-control input_size text-left re_remark" id=""></td>
                                                              </tr> -->
                                                            </tbody>
                                                          </table>
                                                              <input type="button" id="remarks_row" class="btn btn-primary invisible" value="Add Row"/>
                            
                                                          
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                </div>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-12">
                                <div class="panel panel-primary">

                                    <div class="panel-body d-flex">

                                        <input type="button" id="submit_invoice" class="btn col-sm-6 btn-success border"
                                            value="Submit">
                                        <input type="button" id="back_invoice" class="btn col-sm-6 ml-2 btn-danger border"
                                            value="Back">


                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </form>

                <div id="content" class="d-none"></div>



            </div>
            <!--% including footer %-->
            <jsp:include page="../../Basic/template/footer.jsp" />

        </div>

        <!-- Mainly scripts -->
        <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
        <script src="../../../static/js/popper.min.js"></script>
        <script src="../../../static/js/bootstrap.js"></script>
        <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
        <script src="../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

        <!-- Custom and plugin javascript -->
        <script src="../../../static/js/inspinia.js"></script>
        <script src="../../../static/js/plugins/pace/pace.min.js"></script>
        <script src="../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>



        <!-- <script src="../js/view.js"></script> -->

        <!-- jQuery UI -->

        <!-- breadcrumb JS -->
        <script src="../../../custom/js/breadcrumb.js"></script>

        <script src="../../../cdn/js/sweetalert2.js"></script>
        <script src="../../../cdn/js/sweetalert.min.js"></script>

        <!-- dataTable JS -->
        <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
        <script src="../../../cdn/js/dataTables.responsive.min.js"></script>


        <script src="../../Basic/js/updatestatus.js"></script>

        <script src="../../Configration/js/globalConfig.js"></script>
        <!-- <script src="../../GateEntry/invoice/js/addInvoice.js"></script> -->
        <script src="../js/addQuality.js?v=" + $.getCurrentVersion()></script>
        <script src="../js/addInvoice.js?v=" + $.getCurrentVersion()></script>
</body>

</html>