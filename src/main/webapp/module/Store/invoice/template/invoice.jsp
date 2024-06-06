<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Material GRN</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    
    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">
    
    <link rel="stylesheet" href="../css/invoice.css">
    
    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    
    <script src="../../../../static/js/jquery-2.1.1.js"></script>
    
    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
    
    <link rel="stylesheet" href="../../../../cdn/css/jquery-ui.css">
    <!-- <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"> -->

    <script src="../../../../cdn/js/sweetalert2.js"></script>




    <style>
        /* .inmodal .modal-header {
            text-align: left !important;
        }

        .modal-footer {
            padding-bottom: 0px !important;
        }

        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            color: #1ab394 !important;
            border-top-color: #1ab394 !important;

        }

        .nav-tabs .nav-link {
            border-top-width: 5px;

        }

        .space {
            overflow: scroll;
        }
        input[readonly] {
    background-color: #ffffff !important;
}
.form-control:focus, .single-line:focus {
    border-color: #dde0e0;
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
        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">

            <div class="ibox-content" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>


            <div class="row">
                <div class="col-sm-12">
                    <div class="ibox ">
                        <div class="ibox-content py-3 d-flex">
                            <table cellspacing="0" cellpadding="4" class="col-3">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <label for="col1_filter"> <b>Gate Number</b></label>
                                            <div class="d-flex">
                                                <div class="input-group ">
                                                    <input type="text" class="form-control column_filter"
                                                        placeholder="Gate Number" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col1_filter">
                                                    <div class="input-group-append" id="search">
                                                        <button class="btn btn-primary" type="button"
                                                            id="button-addon2"><i class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter d-none" id="col1_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellspacing="0" cellpadding="4" class="col-2">
                                <tbody>
                                    <tr id="filter_col3" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <label for="col2_filter"> <b>Status</b></label>
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <!-- <input type="text" class="form-control column_filter"
                                                        placeholder="Status" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col2_filter"> -->
                                                    <select name="cars" class="form-control column_filter"
                                                        placeholder="Status" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col2_filter">
                                                        <option value="">*</option>
                                                    </select>
                                                    <!-- <div class="input-group-append" id="searchStatus">
                                                        <button class="btn btn-primary" type="button"
                                                            id="button-addon2">
                                                            Status</button>
                                                    </div> -->
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter d-none" id="col2_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table cellspacing="0" cellpadding="4" class="col-3">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class="">
                                        <td class="col-12">
                                            <label for="col3_filter"> <b>Date</b></label>
                                            <div class="d-flex ">
                                                <div class="input-group">
                                                    <!-- <input type="text" name="" id="" class="form-control"> -->
                                                    <input type="text" class="form-control column_filter"
                                                        placeholder="DD-MM-YYYY" aria-label="Admin Theme"  id="col3_filter" autocomplete="off"/>
                                                        <label class="input-group-text d-none" id="calendar" for="dateInput">
                                                            <i class="fa fa-calendar" ></i>
                                                          </label>
                                                    <!-- <input type="date" class="form-control column_filter"
                                                        placeholder="Gate Number" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="date_cal"> -->
                                                </div>
                                            </div>

                                            <!-- <div class="input-group">
                                                <input type="text" id="textInput" class="form-control"/>
                                                <div class="input-group-append">
                                                  <label class="input-group-text" for="dateInput">
                                                    <i class="far fa-calendar"></i>
                                                  </label>
                                                  <input type="date" id="dateInput" class="d-none" onchange="setDateValue()" />
                                                </div>
                                              </div> -->
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter d-none" id="col3_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table cellspacing="0" cellpadding="4" class="col-2">
                                <tbody>
                                    <tr id="filter_col4" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <label for="col4_filter"> <b>Store ID</b></label>
                                            <div class="d-flex">
                                                <div class="input-group ">
                                                    <!-- <input type="text" class="form-control column_filter"
                                                        placeholder="Status" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col2_filter"> -->
                                                    <select name="cars" class="form-control column_filter"
                                                        placeholder="Status" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col4_filter">
                                                        <option value="">*</option>
                                                    </select>
                                                    <!-- <div class="input-group-append" id="searchStatus">
                                                        <button class="btn btn-primary" type="button"
                                                            id="button-addon2">
                                                            Status</button>
                                                    </div> -->
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter d-none" id="col4_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table cellspacing="0" cellpadding="4" class="col-2">
                                <tbody>
                                    <tr id="filter_col3" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <label for=""> <b>Transaction Type</b></label>
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <select name="" class="form-control column_filter"
                                                        placeholder="Transaction" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="Transaction">
                                                        <option value="">*</option>
                                                        <option value="Material_Bill">Material Bill</option>
                                                        <option value="Service_PO">Service PO</option>
                                                        <option value="Job_Work">Job Work</option>
                                                        <option value="ST/OT">ST/OT</option>
                                                        <option value="Credit_Note">Credit Note</option>
                                                        <option value="Debit_Note">Debit Note</option>
                                                        <option value="ServiceWithMaterial">Service With Material</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter d-none" id="Transaction1" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-2">
                            <div class="text-center my-2">
                                <a class="btn btn-primary" id="add_invoice" href="../template/addInvoice.jsp"><i
                                        class="fa fa-plus"> </i>
                                    Add
                                    Invoice</a>
                            </div>
                        </div>
                    </div>


                </div> -->

            </div>

            <div class="row ">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content">


                            <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">

                                <thead>
                                    <th class="text-left" data-toggle="true">ID</th>
                                    <th class="text-left" data-hide="phone">Status</th>
                                    <th class="text-left" data-hide="phone">Gate Number</th>
                                    <th class="text-left" data-hide="phone,tablet">Vendor Code</th>
                                    <th class="text-left" data-hide="phone,tablet">Vendor Name</th>
                                    <th class="text-left" data-hide="phone">Invoice No.</th>
                                    <th class="text-left" data-hide="phone">Vehicle No.</th>
                                    <th class="text-left" data-hide="phone,tablet">Scan Date</th>
                                    <th class="text-left" data-hide="phone">Report Time</th>
                                    <th class="text-left" data-hide="phone">Trans. Type</th>
                                    <th class="text-left" data-hide="phone">Store ID</th>
                                    <th class="text-left" data-hide="phone">Status</th>
                                    <th class="text-left" data-hide="phone"></th>
                                    <!-- <th class="text-left" data-sort-ignore="true">ACTIONS</th> -->
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <!-- <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> -->
                            <!-- <div class="tabs-container white-bg">
                            </div> -->
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="ibox ">
                                            <div class="ibox-content py-0">

                                                <div class="tabs-container ">
                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li><a class="nav-link active ravi" id="data" data-toggle="tab"
                                                                href="#tab-1">Billed To</a></li>
                                                        <li><a class="nav-link" id="data1" data-toggle="tab"
                                                                href="#tab-2">Shipped To</a></li>
                                                        <li><a class="nav-link" id="data2" data-toggle="tab"
                                                                href="#tab-3">Supplier</a></li>
                                                        <li><a class="nav-link" id="data3" data-toggle="tab"
                                                                href="#tab-4">Info.</a></li>
                                                    </ul>

                                                    <div class="tab-content">
                                                        <div role="tabpanel" id="tab-1" class="tab-pane active">
                                                            <div class="panel-body">
                                                                <form class="contact-form" id="form1">
                                                                    <div class="controls">
                                                                        <div class="row">
                                                                            <!-- <div class="col-1"></div> -->
                                                                            <div class="col-md-12">
                                                                                <div class="panel panel-primary">
                                                                                    <div class="panel-heading">
                                                                                        Billed To
                                                                                    </div>

                                                                                    <div class="col-12 b-r" id="form1">
                                                                                        <br>
                                                                                        <!-- <h4 class=" w-100 font-weight-bold">Billed To</h4>
                                                                                        <hr> -->

                                                                                        <div class="row">
                                                                                            <div class="col-6">
                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label ">Name</label>
                                                                                                    <div class=" col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control"
                                                                                                            id="billto_name">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label">Address</label>
                                                                                                    <div class="col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control"
                                                                                                            id="billto_address1">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label invisible">:</label>
                                                                                                    <div class="col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control"
                                                                                                            id="billto_address2">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-group row ">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label invisible ">:</label>
                                                                                                    <div class="col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control "
                                                                                                            id="billto_address3">
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="col-6">

                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label">GSTIN</label>
                                                                                                    <div class="col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control  "
                                                                                                            id="billto_gstin">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label">City</label>
                                                                                                    <div class="col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control  "
                                                                                                            id="billto_city">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label">State</label>
                                                                                                    <div class="col-9">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control  "
                                                                                                            id="billto_state">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="form-group row">
                                                                                                    <label
                                                                                                        class="col-3 col-form-label">State
                                                                                                        Code</label>
                                                                                                    <div class="col-7">
                                                                                                        <input readonly
                                                                                                            type="text"
                                                                                                            class="form-control"
                                                                                                            id="billto_zipcode">
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <!-- <div class="col-2"></div>
                                                                            <div class="col-md-4">
                                                                                
                                                                            </div> -->
                                                                        </div>
                                                                    </div>
                                                                    <!-- </form> -->

                                                                </form>
                                                            </div>
                                                        </div>

                                                        <div role="tabpanel" id="tab-2" class="tab-pane">
                                                            <div class="panel-body">
                                                                <!-- <form class="contact-form" id="form1"> -->
                                                                <div class="controls">
                                                                    <div class="row">
                                                                        <!-- <div class="col-1"></div> -->
                                                                        <div class="col-md-12">
                                                                            <div class="panel panel-primary">
                                                                                <div class="panel-heading">
                                                                                    Shipped To
                                                                                </div>


                                                                                <div class="col-12 b-r" id="form2"><br>
                                                                                    <!-- <h4 class="w-100 font-weight-bold">
                                                                                        Shipped To</h4>
                                                                                    <hr> -->

                                                                                    <div class="row">
                                                                                        <div class="col-6">
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Name</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="shipto_name"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Address</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="shipto_address1"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label invisible">:</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="shipto_address2"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label invisible">:</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="shipto_address3"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-6">
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">GSTIN</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="shipto_gstin"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">City</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="shipto_city"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">State</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control "
                                                                                                        id="shipto_state"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>


                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">State
                                                                                                    Code</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control "
                                                                                                        id="shipto_zipcode"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <!-- <div class="col-2"></div>
                                                                        <div class="col-md-4">
                                                                            <div class="form-group"><label>Business
                                                                                    Unit</label> <input readonly  type="text" id="form6Example8" readonly="" class="form-control" style="font-weight: bold;"></div>
        
                                                                        </div> -->

                                                                    </div>
                                                                </div>
                                                                <!-- </form> -->
                                                            </div>
                                                        </div>

                                                        <div role="tabpanel" id="tab-3" class="tab-pane">
                                                            <div class="panel-body">
                                                                <!-- <form class="contact-form" id="form1"> -->
                                                                <div class="controls">
                                                                    <div class="row">
                                                                        <!-- <div class="col-1"></div> -->
                                                                        <div class="col-md-12">
                                                                            <div class="panel panel-primary">
                                                                                <div class="panel-heading">
                                                                                    Supplier
                                                                                </div>


                                                                                <div class="col-12 b-r" id="form3"><br>

                                                                                    <!-- <h4 class="w-100 font-weight-bold">
                                                                                        Supplier</h4>
                                                                                    <hr> -->
                                                                                    <div class="row">
                                                                                        <div class="col-6">
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Invoice
                                                                                                    No.</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="supplier_invoice_nbr"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>

                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Date
                                                                                                </label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="date"
                                                                                                        class="form-control "
                                                                                                        id="supplier_date"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Order
                                                                                                    No.</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="supplier_order_nbr"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Vehicle
                                                                                                    No.</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="supplier_vehicle_nbr"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-6">
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Order
                                                                                                    Date</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="date"
                                                                                                        class="form-control"
                                                                                                        id="supplier_order_date"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Place
                                                                                                    of
                                                                                                    Supply</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="supplier_supply_place"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Date
                                                                                                    &amp; Time of
                                                                                                    Supply</label>
                                                                                                <div class="col-4">
                                                                                                    <input readonly
                                                                                                        type="date"
                                                                                                        class="form-control"
                                                                                                        id="supplier_supply_date"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                                <div class="col-5">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="supplier_supply_time"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Mode
                                                                                                    of
                                                                                                    Dispatch</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="supplier_despatch_mode"
                                                                                                        style="font-weight: bold;">
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
                                                        <div role="tabpanel" id="tab-4" class="tab-pane">
                                                            <div class="panel-body">
                                                                <!-- <form class="contact-form" id="form1"> -->
                                                                <div class="controls">
                                                                    <div class="row">
                                                                        <!-- <div class="col-1"></div> -->
                                                                        <div class="col-md-12">
                                                                            <div class="panel panel-primary">
                                                                                <div class="panel-heading">
                                                                                    Information
                                                                                </div>

                                                                                <div class="col-12 b-r" id="form4"><br>
                                                                                    <!-- <h4
                                                                                        class="w-100 font-weight-bold invisible">
                                                                                        Supplier</h4>
                                                                                    <hr> -->

                                                                                    <div class="row">
                                                                                        <div class="col-6">
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Gate
                                                                                                    Id</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="gate_id"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>

                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Status</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control "
                                                                                                        id="status"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>


                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Vehicle
                                                                                                    Nbr</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="vehicle_nbr"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Material
                                                                                                    Type</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="material_type"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Weight</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="weight"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-6">
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">In
                                                                                                    &amp; Out
                                                                                                    Time</label>
                                                                                                <div class="col-4">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="in_time"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                                <div class="col-5">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="out_time"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Devision</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="devision"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Remark</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        id="remark"
                                                                                                        style="font-weight: bold;">
                                                                                                </div>

                                                                                            </div>
                                                                                            <div class="form-group row">
                                                                                                <label
                                                                                                    class="col-3 col-form-label">Queue
                                                                                                    Id</label>
                                                                                                <div class="col-9">
                                                                                                    <input readonly
                                                                                                        type="text"
                                                                                                        class="form-control "
                                                                                                        id="queue_id"
                                                                                                        style="font-weight: bold;">
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
                                                    </div>



                                                </div><br>

                                                <div class="col-12">
                                                    <div class="panel panel-primary">
                                                        <div class="panel-heading">
                                                            Default Panel
                                                        </div>
                                                        <div class="panel-body">
                                                            <!-- <div class="container"> -->
                                                            <div class="row d-flex justify-content-end">
                                                                <div class="container overflow-auto">
                                                                    <div class="row clearfix">
                                                                        <div class="size">
                                                                            <table
                                                                                class="table table-bordered table-hover"
                                                                                id="tab_logic">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th class="text-center"> Sr. No
                                                                                        </th>
                                                                                        <th class="text-center"> line
                                                                                            number</th>
                                                                                        <th class="text-center"> Status
                                                                                        </th>
                                                                                        <th class="text-center"> Gate Id
                                                                                        </th>
                                                                                        <th class="text-center">Item
                                                                                            Code</th>
                                                                                        <th class="text-center"> HSN
                                                                                            Code </th>
                                                                                        <th class="text-center">
                                                                                            Quantity </th>
                                                                                        <th class="text-center"> UOM
                                                                                        </th>
                                                                                        <th class="text-center"> Rate
                                                                                        </th>
                                                                                        <th class="text-center"> Amount
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr id="addr0">
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                class="form-control one"
                                                                                                readonly="" value="1">
                                                                                        </td>
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                class="form-control line_num"
                                                                                                readonly=""
                                                                                                id="line_num"></td>
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                class="form-control details_status"
                                                                                                id="details_status">
                                                                                        </td>
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                id="details_gate_id"
                                                                                                class="form-control details_gate_id">
                                                                                        </td>
                                                                                        <td><input readonly type="text"
                                                                                                id="item_code"
                                                                                                class="form-control item_code">
                                                                                        </td>
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                id="hsn_code"
                                                                                                class="form-control hsn_code">
                                                                                        </td>
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                id="quantity"
                                                                                                class="form-control quantity">
                                                                                        </td>
                                                                                        <td><input readonly type="text"
                                                                                                id="uom"
                                                                                                class="form-control uom">
                                                                                        </td>
                                                                                        <td><input readonly
                                                                                                type="number" id="rate"
                                                                                                class="form-control rate">
                                                                                        </td>
                                                                                        <td><input readonly
                                                                                                type="number"
                                                                                                id="amount"
                                                                                                class="form-control amount">
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr id="addr1"></tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row clearfix">
                                                                        <!-- <div class=" float-right"> -->
                                                                        <input readonly type="button" id="add_row"
                                                                            class="btn btn-default pull-left border float-right invisible"
                                                                            value="Add row">&nbsp;
                                                                        <input readonly type="button" id="delete_row"
                                                                            class="pull-right btn btn-default border float-right invisible"
                                                                            value="Delete row">
                                                                        <!-- </div> -->
                                                                    </div>
                                                                </div>
                                                                <!-- <input readonly  type="submit" class="btn btn-outline-success mt-4" id="invoice" value="submit invoice"> -->
                                                            </div>

                                                            <!-- </div> -->

                                                        </div>

                                                    </div>
                                                </div>


                                            </div>

                                        </div>



                                    </div>
                                    </form>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    <!-- Mainly scripts -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>


    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>

    <!-- jQuery UI -->
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

    <!-- <script src="../../../Configration/js/globalConfig.js"></script> -->
    <!-- invoice JS -->
    <script src="../js/addInvoice.js?v=" + $.getCurrentVersion()></script>
    
    <script src="../js/invoice.js?v=" + $.getCurrentVersion()></script>
    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>



    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>


</body>

</html>