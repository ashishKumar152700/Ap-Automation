<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Exception Invoice</title>
  <jsp:include page="../../../Basic/template/favicon.jsp" />
  <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../../static/css/style.css" rel="stylesheet">

  <script src="../../../../static/js/jquery-2.1.1.js"></script>

  <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">

  <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

  <link rel="stylesheet" href="../css/addGate.css">


  <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
  <!-- <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css"> -->

  <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
  <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>



  <script src="../../../../static/js/bootstrap.js"></script>


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

  <link href="https://transloadit.edgly.net/releases/uppy/v1.6.0/uppy.min.css" rel="stylesheet">
  <script src="../../../Configration/js/globalConfig.js"></script>


  <script src="../../../../cdn/js/sweetalert2.js"></script>
  <script src="../../../../cdn/js/sweetalert.min.js"></script>
  <script src="../../../../custom/js/pdf.js"></script>
  <script src="../../../../custom/js/pdf.worker.js"></script>



  <!-- breadcrumb JS -->
  <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->

  <script src="../../../Basic/js/updatestatus.js"></script>

  <style>
    .filter-multi-select>.dropdown-menu {
      position: relative !important;
    }

    .filter-multi-select>.viewbar>.selected-items>.item {

      background-color: #24537f !important;

    }

    .variation {
      padding: 16px !important;
      font-size: 13px !important;
    }

    .upload-images {
      overflow: scroll;
      overflow-x: hidden;
    }

    .my-swal-icon {
      font-size: 0.7em; /* Adjust the icon size */
    }
    .my-swal-icon .swal2-icon {
      width: 1em; /* Adjust the width */
      height: 1em; /* Adjust the height */
    }


    .table {
      text-align: center;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }


    #Dtable_length>label {
      margin-bottom: 0rem;
      margin-top: 0.5rem;
    }

    #role_length>label {
      margin-bottom: 0rem;
      margin-top: 0.5rem;
    }

    .head>th {
      margin-bottom: 500px;
    }

    .search tr>td>input {
      padding: 5px 7px;
      outline: none;
    }

    .search {
      padding: 15px 0px;
    }

    #userlistadd {
      margin-right: 100px;
    }

    #userlistsearch {
      margin-right: 400px;
    }

    table.dataTable>tbody>tr.child span.dtr-title {
      min-width: 110px !important;
    }


    .my-2 {
      margin-top: .85rem !important;
      margin-bottom: .85rem !important;
    }

    .btn-outline-success {
      border-color: #24537f !important;
    }

    .btn-outline-success:hover {
      background-color: #24537f !important;
    }

    .btn-success {
      border: 1px solid #24537f !important;
      background-color: #24537f !important;
    }

    .paginate_button {
      border: 1px solid #24537f !important;
      background: white !important;
      transition: all .5s;

    }

    .paginate_button:hover {
      background: #24537f !important;
    }

    #Dtable_paginate {
      display: flex;
      justify-content: flex-start;
    }

    .paginate_button {
      border-radius: 0px !important;
    }

    .previous {
      border-top-left-radius: 5px !important;
      border-bottom-left-radius: 5px !important;
      border-right: none !important;
    }

    .paginate_button {
      margin: 0px !important;
      margin-top: .5rem !important;
      padding: 5px 10px !important;

    }

    .next {
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
      border-top-right-radius: 5px !important;
      border-bottom-right-radius: 5px !important;
      border-left: none !important;
    }

    #Dtable_paginate a:hover {
      color: #fff !important;
    }


    .inmodal .modal-header {
      text-align: left !important;
    }

    .modal-footer {
      padding-bottom: 0px !important;
    }

    .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
      color: #24537f !important;
      border-top-color: #24537f !important;

    }

    .nav-tabs .nav-link {
      border-top-width: 5px;

    }

    .inmodal .modal-header {
      text-align: left !important;
    }

    .modal-footer {
      padding-bottom: 0px !important;
    }

    .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
      color: #24537f !important;
      border-top-color: #24537f !important;

    }

    .nav-tabs .nav-link {
      border-top-width: 5px;

    }

    .space {
      overflow: scroll;
    }

    .form-control:focus,
    .single-line:focus {
      border-color: #dde0e0;
    }

    .new_labels {
      border: 1px solid rgb(229, 230, 231);
      outline: none;
    }

    #contents {
      overflow-y: scroll;
    }

    .btn {
      z-index: 0 !important;
    }

    div.dataTables_info span.select-item {
      display: none !important;
    }

    .uppy-Dashboard-poweredBy {
      display: none !important;
    }
    .ibox-content{
      border-width: 0px !important;
    }

    #fix_scroll{
    overflow: hidden;
    overflow-x: scroll;
    }

    .item_code , .item_description{
    min-width: 300px !important;
    }
    .fix{
    min-width: 150px !important;
    }

    /* .draggable-modal .modal-dialog {
      position: absolute;
      top: 35%;
      left: 25%;
      transform: translate(0, 0);
    } */
    /* #Vendor_body td{
      padding-bottom: 0px;
      padding-top: 0px;
    } */
  </style>




</head>

<body>

  <script>
    let sessionString = localStorage.getItem("userrole")

    let name = JSON.parse(sessionString);

    if (name != null) {
      if (name.includes("Flaw Fix") || name.includes("Admin")) {

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




    <div class="modal inmodal fade" id="myModal15" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h2><strong>&nbsp;&nbsp;&nbsp; Additional Documents</strong></h2>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center">

            <div id="drag-drop-area"></div>

          </div>

          <div class="modal-footer m-2">
            <!-- <button type="button" class="btn btn-primary"
                                data-dismiss="modal">Skip</button> -->
            <button type="button" id="skip" class="btn btn-primary" data-dismiss="modal">Skip</button>
          </div>
        </div>
      </div>
    </div>




    <div class="modal inmodal fade" id="myModal20" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3><b>Vendor Details</b></h3>
            
          </div>
          <div class="modal-body">
            <table id="Vtable" class="display responsive nowrap text-left" style="width: 100%">
              <thead>
                <th class="text-left" data-hide="phone">Vendor Number</th>
                <th class="text-left" data-hide="phone">Vendor Name</th>
              </thead>
              <tbody id="Vendor_body">
              </tbody>
            </table>
          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="Vendor_selected" data-dismiss="modal">Select</button>
          </div>
        </div>
      </div>
    </div>




    <div class="modal inmodal fade" id="myModal21" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header pb-0 col-12">
            <h3><b>Select Purchase Order</b></h3>
            <hr>
            <div class="form-group d-flex p-0 col-12">
            <div class="col-5 p-0 d-flex align-items-center">
              <lable><b>Vendor Code</b></lable>
            <input type="text" name="" class="form-control col-8 ml-3" id="vendor_code_modal" readonly placeholder="">
            </div>
            <div class="col-5 p-0 d-flex align-items-center">
              <lable><b>Vendor Name</b></lable>
              <input type="text" name="" class="form-control col-8 ml-3" id="vendor_name_modal" readonly placeholder="">
            </div>
            <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
              <!-- <option value="" selected></option> -->
            <!-- </select> -->
            </div>

            <div class="form-group d-flex p-0 col-12">
              <div class="col-5 p-0 d-flex align-items-center">
                <lable class="col-2 p-0"><b>PO Number</b></lable>
                <input type="text" name="" class="form-control col-8 ml-3" id="po_no_selected" placeholder="PO Number">
              </div>
              <div class="col-5 p-0 d-flex align-items-center">
                <lable class="col-2 p-0"><b>PO Type</b></lable>
                <input type="text" class="form-control col-8 ml-4" placeholder="PO Type" id="po_type_search" value="">

                <input type="button" class="btn btn-primary btn btn-primary col-3 ml-2" placeholder="" id="po_no_selected_search" value="Search">
              </div>
              <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
                <!-- <option value="" selected></option> -->
              <!-- </select> -->
              </div>
              
              <div class="form-group d-flex p-0 col-12 d_number">
                <div class="col-5 p-0 d-flex align-items-center">
                  <lable class="col-3 p-0"><b>DC. Number</b></lable>
                  <input type="text" name="" class="form-control col-8 ml-3" id="dc_number" placeholder="DC Number">
                </div>
                
                </div>

            <!-- <div class="col-12 d-flex"> -->
              <!-- <div class="form-group col-12 d-flex justify-content-between">
              <input type="text" name="" class="form-control col-3" id="po_no_selected" placeholder="PO Number">
              <input type="text" class="btn btn-primary d-none" placeholder="" id="po_no_selected_search" value="">
              <input type="text" class="form-control col-3" placeholder="PO Type" id="po_type_search" value=""> -->
              <!-- <select name="" class="form-control col-3" id="item_code_search">
                <option value="" selected></option>
              </select> -->
              <!-- <input type="text" class="form-control col-3" placeholder="Item Code" id="item_code_search" value=""> -->
              <!-- <input type="text" class="form-control col-2" placeholder="Item No" id="item_no_type_search" value=""> -->
              <!-- </div> -->
            <!-- </div> -->

            
          </div>
          <div class="modal-body">

            <div class="py-0" id="loader_po">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_po">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>


            <table id="po_table" class="display responsive nowrap text-left" style="width: 100%">
              <thead>
                <th class="text-left" data-hide="phone">Po Number</th>
                <th class="text-left" data-hide="phone">Po Type</th>
                <th class="text-left" data-hide="phone">Po Company</th>
                <th class="text-left" data-hide="phone">Item Number</th>
                <th class="text-left" data-hide="phone">Item Description</th>
                <th class="text-left" data-hide="phone">Unit Rate</th>
                <th class="text-left" data-hide="phone">Open Quantity</th>
              </thead>
              <tbody id="po_table_body">
              </tbody>
            </table>

            </div>


          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="po_no_select_modal" data-dismiss="modal">Select</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal inmodal fade" id="myModal22" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3><b>Vendor Details</b></h3>
            <br><br>

            <div class="col-12 d-flex">
              <div class="input-group">
              <input type="text" name="" class="form-control" id="vendor_no_selected" placeholder="Search By Vendor Code / Vender Name">
              <input type="button" class="input-group-append btn btn-primary" id="vendor_selected_search" value="Search">
              </div>
            </div>

            
          </div>
          <div class="modal-body">

            <div class="py-0" id="loader_vendor">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_vendor">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>


                <table id="vendor_table_modal" class="display responsive nowrap text-left" style="width: 100%">
                  <thead>
                    <th class="text-left" data-hide="phone">Vendor Number</th>
                    <th class="text-left" data-hide="phone">Vendor Name</th>
                  </thead>
                  <tbody id="vendor_table_body">
                  </tbody>
                </table>

            </div>

          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="Vendor_selected_modal" data-dismiss="modal">Select</button>
          </div>
        </div>
      </div>
    </div>



    <div class="modal inmodal fade draggable-modals" id="myModal23" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header pb-0 col-12">
            <h3><b id="map_items">Map Item - </b></h3>
            <hr>
            <div class="form-group d-flex p-0 col-12">
            <div class="col-5 p-0 d-flex align-items-center">
              <lable><b>Vendor Code</b></lable>
            <input type="text" name="" class="form-control col-8 ml-3" id="vendor_code_modal_map" readonly placeholder="">
            </div>
            <div class="col-5 p-0 d-flex align-items-center">
              <lable><b>Vendor Name</b></lable>
              <input type="text" name="" class="form-control col-8 ml-3" id="vendor_name_modal_map" readonly placeholder="">
            </div>
            <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
              <!-- <option value="" selected></option> -->
            <!-- </select> -->
            </div>

            <div class="form-group d-flex p-0 col-12">
              <div class="col-5 p-0 d-flex align-items-center">
                <lable class="mr-2"><b>PO Number</b></lable>
                <input type="text" name="" class="form-control col-8 ml-3" readonly id="po_no_selected_map" placeholder="PO Number">
              </div>
              <div class="col-5 p-0 d-flex align-items-center">
                <lable class="mr-4 pr-2"><b>PO Type</b></lable>
                <input type="text" class="form-control col-8 ml-4" readonly placeholder="PO Type" id="po_type_search_map" value="">

                <input type="button" class="btn btn-primary btn btn-primary col-3 ml-2 d-none" placeholder="" id="po_no_selected_search_map" value="Search">
              </div>

              </div>

            <div class="form-group d-flex p-0 col-12 d_map_number invisible">
              <div class="col-5 p-0 d-flex align-items-center">
                <lable class="col-3 p-0"><b>DC Number</b></lable>
                <input type="text" name="" class="form-control col-8 ml-3" readonly id="dc_map_number" placeholder="DC Number">
              </div>
            </div>


          </div>
          <div class="modal-body">

            <div class="py-0" id="loader8">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin8">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>


            <table id="po_table_map" class="display responsive nowrap text-left" style="width: 100%">
              <thead>
                <th class="text-left" data-hide="phone">Po Number</th>
                <th class="text-left" data-hide="phone">Po Type</th>
                <th class="text-left" data-hide="phone">Po Company</th>
                <th class="text-left" data-hide="phone">Item Number</th>
                <th class="text-left" data-hide="phone">Item Description</th>
                <th class="text-left" data-hide="phone">Unit Rate</th>
                <th class="text-left" data-hide="phone">Line Number</th>
              </thead>
              <tbody id="po_table_body_map">
              </tbody>
            </table>

            </div>


          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="po_no_select_modal_map" data-dismiss="modal">Select</button>
          </div>
        </div>
      </div>
    </div>



    
    <div class="modal inmodal fade" id="myModal24" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h3><b>Delivery Challan Details</b></h3>
            <br>
            <div class="col-12 d-flex">
              <div class="input-group">
              <input type="text" name="" class="form-control" id="dc_number_selected" placeholder="Search By Delivery Challan Number">
              <input type="button" class="input-group-append btn btn-primary" id="dc_search_modal" value="Search">
              </div>
            </div>
            
          </div>
          <div class="modal-body">

            <div class="py-0" id="loader9">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin9">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>

            <table id="DC_table" class="display responsive nowrap text-left" style="width: 100%">
              <thead>
                <th class="text-left" data-hide="phone">Vendor Code</th>
                <th class="text-left" data-hide="phone">DC Number</th>
                <th class="text-left" data-hide="phone">WO Number</th>
                <th class="text-left" data-hide="phone">WO Type</th>
                <th class="text-left" data-hide="phone">PO Number</th>
                <th class="text-left" data-hide="phone">PO Type</th>
                <th class="text-left" data-hide="phone">Business Unit</th>
              </thead>
              <tbody id="DC_table_body">
              </tbody>
            </table>
            </div>
          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="DC_value_selected" data-dismiss="modal">Select</button>
          </div>
        </div>
      </div>
    </div>




    <div class="modal inmodal fade draggable-modal" id="myModal25" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header pb-0 col-12">
            <h3><b>Deliver Challan Details</b></h3>
          </div>
          <div class="modal-body">

            <div class="py-0" id="loaderdc">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spindc">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>


              <div class="row">
                <div class="col-md-6">
                 
                  <div class="form-group">

                    <label><b>PO Number</b></label>
                    <div class="input-group">
                      <input
                        type="text"
                        id="dc_po_number"
                        placeholder="Enter PO Number"
                        class="form-control response"
                        readonly
                      />
                    </div>

                  </div>
                  <div class="form-group">

                    <label><b>Receipt Date</b></label>
                    <div class="input-group">
                      <input
                        type="text"
                        id="dc_receipt_date"
                        placeholder="Receipt Date"
                        class="form-control response"
                        readonly
                      />
                    </div>

                  </div>
                  <div class="form-group">
                    <label><b>Item Number</b></label>
                  <div class="input-group">
                    <input
                      type="text"
                      id="dc_item_number"
                      placeholder="Item Number"
                      class="form-control response"
                      readonly
                    />
                  </div>
                  </div>
                  <div class="form-group">
                    <label><b>Supplier</b></label>
                  <div class="input-group">
                    <input
                      type="text"
                      readonly
                      id="dc_supplier"
                      placeholder="Supplier"
                      class="form-control response"
                    />
                  </div>
                  </div>
                  <div class="form-group">
                    <label><b>Evaluation Factor</b></label>
                  <div class="input-group">
                    <input
                      type="text"
                      readonly
                      id="dc_evaluation_factor_15"
                      placeholder="Evaluation Factor"
                      class="form-control response"
                    />
                  </div>
                  </div>
                  
                 
              </div>

              <div class="col-md-6">
                
                  <div class="form-group">
                    <label><b>PO Type</b></label>
                    <input
                      type="text"
                      id="dc_po_type"
                      placeholder="Enter PO Type"
                      class="form-control response"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <label><b>Receipt Quantity</b></label>
                    <input
                      type="text"
                      id="dc_receipt_quantity"
                      placeholder="Receipt Quantity"
                      class="form-control response"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                      <label><b>Balance</b></label>
                      <input
                        type="text"
                        id="dc_balance"
                        placeholder="Balance"
                        class="form-control response"
                        readonly
                      />
                  </div>
                  <div class="form-group">
                      <label><b>Transaction Quantity</b></label>
                      <input
                        type="text"
                        readonly
                        id="dc_transaction_quantity"
                        placeholder="Transaction Quantity"
                        class="form-control response"
                      />
                  </div>
                  <div class="form-group">
                      <label><b>DC Number</b></label>
                      <input
                        type="text"
                        readonly
                        id="dc_transaction_number"
                        placeholder="DC Number"
                        class="form-control response"
                      />
                  </div>

                 
                </div>

              </div>

            </div>


          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="selected_items" data-dismiss="modal">Select</button>
          </div>
        </div>
      </div>
    </div>




    <div class="modal inmodal fade" id="myModal27" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3><b>Dual UOM</b></h3>
            
          </div>
          <div class="modal-body">
            <table id="quantity_table" class="display table table-bordered responsive nowrap text-left" style="width: 100%">
              <thead>
                <th class="text-center d-none" data-hide="phone">Id</th>
                <th class="text-center w-50" data-hide="phone">Item Code</th>
                <th class="text-center" data-hide="phone">UOM</th>
                <th class="text-center" data-hide="phone">Quantity</th>
                <th class="text-center" data-hide="phone">Price</th>
                <th class="text-center" data-hide="phone">Action</th>
              </thead>
              <tbody id="quantity_body">
              </tbody>
            </table>
          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" id="scan_actual_qty">Select</button>
          </div>
        </div>
      </div>
    </div>








    <!--% including header %-->
    <jsp:include page="../../../Basic/template/header.jsp" />

    <!--% including breadcrumb %-->
    <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

    <div class="wrapper wrapper-content" >



      <div class="row">
        <div class="col-lg-12 ">
          <div class="card mx-auto white-bg">
            <div class="col-3">
              <div class="form-group row gate_number ">
                <div class="col-8">
                  <h3 id="gate_number" class="my-1"></h3>
                </div>
              </div>
            </div>
            <div class="col-9">
              <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
            </div>
          </div>
        </div>
      </div><br>

      <div class="row">
        <div class="col-sm-5">
          <div class="ibox ">
            <div class="py-0" id="loader1">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>
              <div class="ibox-content py-3">
                <!-- <h3 id="" class="">Supplier Number</h3> -->
                <div class="row justify-content-around">
                  
                      <button type="button" id="error_message" class="btn btn-primary select">View Error Message</button>
                      
                      <button type="button" id="uom_btn" class="btn btn-primary">Change Price</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-7">
          <div class="ibox">
            <div class="ibox-content py-3 px-2 col-12 d-flex justify-content-around">
              <input class="my-0 btn btn-primary py-2 col-3 d-none" type="file" id="preview_img" accept="application/pdf"
                onchange="previewFile()" crossorigin="">
                <input type="button" class="add_info btn py-2 btn-primary col-3"
                data-toggle="modal" data-target="#myModal11" id="modeldata" value="Additional Info">
              <input type="button" class="add_info btn btn-primary py-2 col-3"
                data-toggle="modal" data-target="#myModal15" id="modalCall"
                value="Additional Doc">
                <!-- <button type="button" id="print_tab" class="btn btn-primary py-2 col-3">Print Gate Pass</button> -->
                <button type="button" id="remap_data" class="btn btn-primary py-2 col-3">ReMap Data</button>
            </div>
          </div>
        </div>

      </div>

      <div class="row d-none" id="print_invoice_page">
        <div class="col-lg-12 vw-100" id="print_invoice">
          <div class="ibox-content p-xl">
            <div class="row">
              <div class="col-sm-6">
                <img src="../../../images/RSB_logo.png" alt="">
              </div>

              
              <div class="col-sm-6 text-right">
                
              </div>
              <div class="col-sm-4 text-left mt-5">
                <h3>INWARD GATEPASS</h3>
              </div>
              <div class="col-sm-4 text-center mt-5">
                <h3>RSB</h3>
              </div>
              <div class="col-sm-4 text-left mt-5">
                <h3>Date & Time <span id="data_time"></span></h3>
              </div>
              <br><br>
              <div class="col-sm-9 text-left mt-5">
                <h3>Undermentioned Goods Taken By: ...................................................</h3>
              </div>
              <div class="col-sm-3 text-left mt-5">
                <h3>Gate No: <span id="modal_gate_id"></span></h3>
              </div>

              <div class="col-sm-9 text-left">
                <h3>Supplied By: <span id="modal_vendor_name"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Type: <span id="modal_material_type"></span></h3>
              </div>
              <div class="col-sm-3 text-left">
                <!-- <h3>Date:........................</h3> -->
              </div>

              <div class="col-sm-9 text-left">
                <h3>Truck/Tractor Trolly/Railway Wagon No: <span id="modal_vehicle_no"></span></h3>
              </div>
              <div class="col-sm-3 text-left">
                <h3>Bill#: <span id="modal_invoice_no"></span></h3>
              </div>

              <div class="col-sm-9 text-left">
                <h3>Prepared By: <span id="modal_user_name"></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Status: GATE ENTRY</h3>
              </div>
              <div class="col-sm-3 text-right">
                <h3></h3>
              </div>






              <div class="table-responsive mt-5 col-11">
                <table class="table invoice-table border">
                  <thead>
                    <tr>
                      <th class="text-center border">PO NO.</th>
                      <th class="text-center border">Description</th>
                      <th class="text-center border">Qty / Weight</th>
                      <th class="text-center border">Unit Price</th>
                      <th class="text-center border">Remarks</th>
                    </tr>
                  </thead>
                  <tbody id="modal_table_details">
                    <!-- <tr>
                      <td class="text-center border py-2 po_1"></td>
                      <td class="text-center border py-2 des_1"></td>
                      <td class="text-center border py-2 qty_1"></td>
                      <td class="text-center border py-2 unit_1"></td>
                      <td class="text-center border py-2 remark_1">..........</td>
                    </tr> -->

                  </tbody>
                </table>
              </div><!-- /table-responsive -->
              
              <div class="table-responsive mt-5 col-11">
                <table class="table invoice-table border">
                  <thead>
                    <tr>
                      <th class="text-center border py-2">Checked By Gate</th>
                      <th class="text-center border py-2">Checked By Unloading</th>
                      <th class="text-center border py-2">Checked By Store</th>
                    </tr>
                  </thead>
                  <tbody id="">
                    <tr>
                      <td class="text-center border py-4 "></td>
                      <td class="text-center border py-4 "></td>
                      <td class="text-center border py-4 "></td>
                    </tr>

                  </tbody>
                </table>
              </div><!-- /table-responsive -->
            </div>
          </div>
        </div>
        </div>


        <div class="container-fluid  d-flex my-1 bg-white p-0">




          <div class="col-5" style="z-index: 1; width: 1100px;">
            <div class="container p-0">
                <div class="">

                  <div class="py-0" id="loader5">
                    <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin5">
                      <div class="sk-double-bounce1"></div>
                      <div class="sk-double-bounce2"></div>
                    </div>

                      <div class="col-lg-12 px-0">
                              <div class="card-body px-0">
                                  <div class="container ">
      
                                      <form class="contact-form" id="form1">
                                          <div class="controls"> 
                                            <div class="row">
                                              
                                              <div class="col-md-6">
                                            
                                                <div class="form-group">

                                                  <label><b>Vendor Code*</b></label>
                                                  <div class="input-group">
                                                    <input
                                                      type="text"
                                                      required=""
                                                      maxlength="10"
                                                      id="vendor_code"
                                                      placeholder="Enter Vendor Code"
                                                      class="form-control fetch_check vendor_code control_check"
                                                      readonly
                                                    />
                                                    <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select">
                                                  </div>
                
                                                </div>

                                                <div class="form-group hide_dc">
                                                  <label><b>DC Number*</b></label>
                                                <div class="input-group">
                                                  <input
                                                    type="text"
                                                    id="deliveryChallanNumber"
                                                    readonly
                                                    placeholder="Enter DC Number"
                                                    class="form-control fetch_check hand_written dc_number control_check"
                                                  />
                                                  <input type="button" id="dc_fetch" class="input-group-append btn btn-primary select d-none" value="Select">
                                                </div>
                                                </div>

                                                <div class="form-group">
                                                  <label><b>PO Number*</b></label>
                                                <div class="input-group">
                                                  <input
                                                    type="text"
                                                    required=""
                                                    maxlength="10"
                                                    id="po_number"
                                                    placeholder="Enter PO No."
                                                    class="form-control fetch_check po_number control_check"
                                                    readonly
                                                  />
                                                  <input type="button" id="po_no_search" class="input-group-append btn btn-primary select" value="Select">
                                                </div>
                                                </div>

                                                

                                                <div class="form-group">

                                                  <label><b>Vendor Invoice No.*</b></label>
                                                  <div class="input-group">
                                                    <input
                                                      type="text"
                                                      required=""
                                                      id="invoice_number"
                                                      placeholder="Enter Vendor Invoice"
                                                      class="form-control fetch_check hand_written vendor_invoice control_check"
                                                      readonly
                                                    />
                                                    <!-- <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select"> -->
                                                  </div>
                
                                                </div>

                                              <div class="form-group">
                                                <label><b>Weight / Quantity*</b></label>
                                                <input
                                                  type="number"
                                                  required=""
                                                  maxlength="10"
                                                  id="weight"
                                                  placeholder="Weight / Quantity"
                                                  class="form-control fetch_check control_check check_submit" 
                                                  />
                                                </div>
                                                <div class="form-group">
                                                  <label for="unitname"><b>Unit Name*</b></label> <br>
                                                  <select id="unitname" required name="unitname" placeholder="unit"
                                                      class="form-control">
                                                      <!-- <option value="" disabled selected>No Unit Name Selected
                                                      </option> -->
                                                  </select>
                                              </div>

                                                <div class="form-group">
                                                  <label>Vehicle Number*</label>
                                                  <input
                                                    type="text"
                                                    placeholder="Enter Vehicle No."
                                                    class="form-control hand_written fetch_check"
                                                    required=""
                                                    maxlength="20"
                                                    id="vehicle_nbr"
                                                    readonly
                                                  />
                                                </div>
                                            </div>
              
                                          <div class="col-md-6">
                                              <div class="form-group">
                                                <label><b>Vendor Name*</b></label>
                                                <input
                                                  type="text"
                                                  id="vendorname"
                                                  required=""
                                                  maxlength="25"
                                                  id="vendorname"
                                                  placeholder="Enter Vendor Name"
                                                  class="form-control fetch_check control_check"
                                                  readonly
                                                />
                                              </div>

                                              <div class="form-group hide_wo">
                                                <label><b>DC Type</b></label>
                                                <select name="" class="form-control input_size control_check outline-none" id="dc_number_type">
                                                  <option value="" selected>Select DC Type</option>
                                                  <option value="Regular">Processed</option>
                                                  <option value="Unprocessed">Unprocessed</option>
                                              </select>
                                            </div>

                                              <div class="form-group hide_wo">
                                                <label><b>Work Order NO.*</b></label>
                                                <input
                                                  type="text"
                                                  id="workOrderNumber"
                                                  placeholder="Enter Work Order No."
                                                  class="form-control fetch_check hand_written work_order control_check"
                                                  readonly
                                                />
                                            </div>

                                              <div class="form-group">
                                                  <label><b>PO Type*</b></label>
                                                  <input
                                                    type="text"
                                                    required=""
                                                    maxlength="2"
                                                    id="po_type"
                                                    placeholder="Enter PO Type"
                                                    class="form-control fetch_check po_type control_check"
                                                    readonly
                                                    />
                                                  </div>

                                                  

                                                  <div class="form-group">
                                                    <label><b>Vendor Invoice Date*</b></label>
                                                    <input
                                                      type="text"
                                                      id="invoice_date"
                                                      readonly
                                                      required=""
                                                      maxlength="25"
                                                      placeholder="Vendor Invoice Date"
                                                      class="form-control fetch_check hand_written control_check check_submit "
                                                    />
                                                  </div>
                                                  
                                                  <div class="form-group">
                                                    <label><b>Invoice Amount*</b></label>
                                                    <input
                                                      type="text"
                                                      required=""
                                                      id="amount"
                                                      placeholder="Enter Invoice Amount"
                                                      class="form-control fetch_check hand_written amount control_check check_submit unprocessed"
                                                      readonly
                                                    />
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>Transaction Type</b></label>
                                                    <select name="" class="form-control" id="Transaction">
                                                    </select>
                                                  </div>

                                                  <div class="form-group">
                                                    <label for="storeId"><b>Store Id*</b></label> <br>
                                                    <select id="storeId" class="form-control">
                                                      <!-- <option value="" disabled selected>No Unit Name Selected
                                                      </option> -->
                                                    </select>
                                                </div>
      
                                              <!-- <div class="form-group">
                                                <label>Report Time</label
                                                ><input
                                                  type="text"
                                                  readonly
                                                  required=""
                                                  id="in_time"
                                                  class="form-control fetch_check"
                                                />
                                              </div> -->
              
              
                                              <button
                                                type="button"
                                                id="Vendor_Search"
                                                data-toggle="modal"
                                                data-target="#myModal20"
                                                class="btn btn-primary d-none"
                                              ></button>
                                              <button
                                                type="button"
                                                id="dc_info_modal"
                                                data-toggle="modal"
                                                data-target="#myModal25"
                                                class="btn btn-primary d-none"
                                              ></button>
                                              <button
                                                type="button"
                                                id="dc_info_modal_table"
                                                data-toggle="modal"
                                                data-target="#myModal24" 
                                                class="btn btn-primary d-none"
                                              ></button>
                                              <button
                                                type="button"
                                                id="uom_change_details"
                                                data-toggle="modal"
                                                data-target="#myModal27" 
                                                class="btn btn-primary d-none"
                                              ></button>

                                              <button type="button" id="po_no_search_modal" data-toggle="modal" data-target="#myModal21"
                                    class="btn btn-primary d-none"></button>
                                    <button type="button" id="vendor_no_modal" data-toggle="modal" data-target="#myModal22"
                                    class="btn btn-primary d-none"></button>
                                    <button type="button" id="Map_item" data-toggle="modal" data-target="#myModal23"
                          class="btn btn-primary d-none"></button>
                                            </div>









                                                  <!-- <div class="col-1"></div> -->
                                                  <!-- <div class="col-md-6">
                                                      
                                                      <div class="form-group"><label><b>Vehicle Number*</b></label> <input
                                                              type="text" placeholder="Enter Vehicle Number" readonly
                                                              class="form-control fetch_check" required="" maxlength="20"
                                                              id="vehicle_nbr"></div>
                                                      <div class="form-group"><label><b>Vendor Name*</b></label> <input type="text"
                                                              required="" maxlength="25" id="vendorname" readonly
                                                              placeholder="Enter Vender Name" class="form-control fetch_check"></div>
                                                      <div class="form-group"><label>Material Type</label> <input type="text"
                                                              maxlength="20" id="material_type" readonly
                                                            class="form-control fetch_check"></div>
                                                              <div class="form-group"><label><b>Po Number*</b></label> <input type="text"
                                                                      required="" maxlength="10" id="po_number" 
                                                                      placeholder="Enter Po Number" class="form-control fetch_check"></div>
                                                      <div class="form-group"><label><b>Weight / Quantity*</b></label> <input type="text"
                                                              required="" maxlength="10" id="weight" readonly
                                                              placeholder="Enter Weight" class="form-control fetch_check"></div>
                                                      <div class="form-group"><label><b>Vendor Code*</b></label> <input type="text"
                                                              required="" maxlength="10" id="vendor_code" readonly
                                                              placeholder="Enter Vendor Code" class="form-control fetch_check"></div>
                                                      <div class="form-group"><label><b>Actual Weight/Quantity*</b></label> <input type="text"
                                                              required="" maxlength="10" id="actual_weight" 
                                                              placeholder="Enter Actual Weight / Quantity" class="form-control fetch_check"></div>
      
                                                            
                                                  </div> -->
                                                  <!-- <div class="col-2"></div> -->
                                                  <!-- <div class="col-md-6">
                                                      <div class="form-group"><label>Division</label> <input type="text"
                                                              maxlength="25" id="division" readonly
                                                              class="form-control fetch_check"></div>
                                                      <div class="form-group"><label>Remark*</label> <input type="text"
                                                              maxlength="25" id="remark" readonly
                                                              class="form-control fetch_check" required="">
                                                      </div>
      
                                                      <div id="content" class="d-none"></div> 

                                                      <div class="form-group"><label>Report Time</label><input type="text"
                                                          required="" maxlength="8" id="in_time" step="1"
                                                          placeholder="Report Time" class="form-control fetch_check" readonly></div>
                                                      <div class="form-group"><label><b>Po Type*</b></label><input type="text"
                                                          required="" maxlength="8" id="po_type" step="1"
                                                          placeholder="Po Type" class="form-control fetch_check" ></div>

                                                          <div class="form-group">
                                                            <label for="unitname"><b>Unit Name*</b></label> <br>
                                                            <select id="unitname" name="unitname" placeholder="unit"
                                                                class="form-control">
                                                                <option value="" disabled selected>No Unit Name Selected
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group">
                                                          <label for="storeId"><b>Store Id*</b></label> <br>
                                                          <select id="storeId" class="form-control">
                                                          </select>
                                                      </div>
      
                                                          <div class="form-group d-none"><label for="countries">Missing Tag</label>

                                                              <div id="roles"></div>
                                                          </div>
      
                                                  </div> -->

                                                  <div id="content" class="d-none"></div>
      
                                                  <!-- <div class="px-2 my-3 d-flex justify-content-start">
                                                      <button type="button" class="btn btn-outline-danger pt-2 m-1" id="cancel1">Back</button>
                                                      <button type="submit" class="btn add btn-primary pt-2 m-1">Submit</button>
                                                  </div> -->
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                      </div>

                    </div>


                </div>
            </div>
          </div>
          <div class="handler  bg-white"></div>
          <div class=" bg-body  col-7 " id="hide" style="z-index: 1; display: block;">
            <div class="" id="loader_remap">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_remap">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>
              <div class="container-fluid vh-100 p-0 ravi" id="preview">
                <!-- <input class="my-1" type="file" id="inputimg" accept="*" onchange="previewFile()" crossorigin /> -->
              </div>
            </div>
          </div>

          <!-- </div> -->

        </div>


        <div class="ibox-content">



          <div class="" id="loader_rem">
            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_rem">
              <div class="sk-double-bounce1"></div>
              <div class="sk-double-bounce2"></div>
            </div>

          <div class="container-fluid">

            <div class="row">
                <div class="col-12 px-1">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            Remark
                        </div>
                        <div class="panel-body">
                            <div class="row">

                              <div class="col-12">
                                <textarea name="" id="" cols="" rows="4" class="w-100 py-2 px-3"></textarea> 
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





    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-1">
            <div class="panel panel-primary ">
                
                <div class="panel-body d-flex">

                  <div class="container px-1">
                    <button type="submit" class="btn add btn-primary col-sm-12 " id="submit_error">Submit</button>
                  </div>
                  <div class="container px-1">
                    <button type="button" class="btn btn-danger col-sm-12" id="cancel1">Cancel</button>
                  </div>
                  <div class="container px-1">
                    <button type="button" class="btn btn-danger col-sm-12" id="back_invoice">Back</button>
                  </div>
                   
                        <!-- <input type="button" id="submit_invoice"  class="btn col-sm-6 btn-success border" value="Submit">
                        <input type="button" id="reject_invoice" class="btn col-sm-6 btn-danger border" value="Reject"> -->
                  
    
        </div>
    </div>
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

    <script src="https://transloadit.edgly.net/releases/uppy/v1.6.0/uppy.min.js"></script>
    

    <script src="../js/exceptionHandle.js?v="  + $.getCurrentVersion()></script>
    <!-- <script src="../js/gateocr.js"></script> -->

    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../../cdn/js/dataTables.select.min.js"></script>


    <!-- addGate JS -->

    <script>


      // $(window).load(() => {
      //   $("#in_time")[0].value = new Date().toLocaleTimeString();
      // })

      // ---->For preview of pdf<----
      function previewFile() {
        const file = $("#preview_img")[0].files[0];
        console.log(file);
        let extension = file.name.split('.');
        extension = extension.reverse();

        console.log("the extension is : ---", extension);
        console.log(extension[0]);
      if (extension[0] == "pdf") {
          $(".ravi").children().remove();
          $(".ravi").append(`<iframe src="" class="w-100 vh-100"></iframe>`)
          const preview = document.querySelector('iframe');
          const reader = new FileReader();
          var filename = file.name;
          console.log(reader);
          console.log(reader.result);


          reader.addEventListener("load", function () {

            

            preview.src = reader.result;
          }, false);

          if (file) {
            reader.readAsDataURL(file);
          }
        }
      }
    // ---->End of : For preview of pdf<----
    </script>
    <!-- 
<script>

    var login = $.login();

    $.ajax({

      type: 'GET',

      url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20V&%24limit=20000`,
      headers: {
        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
      },
      success: function (data) {

        var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;

        for (let i = 0; i < supplier.length; i++) {
          $("#Vendor_body").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
        }
      },
      error: function (xhr, ajaxOptions, throwError) {
        //Error block
      },
      complete: () => {


        table = $("#Vtable").DataTable({
          language: {
            'paginate': {
              'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
              'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
            }
          },
          dom: '<"top">t<"bottom"ip>',
          ordering: true,
          lengthMenu: [5, 10, 20, 25, 50],
          pagingType: "simple_numbers",
          select: true,
        });
        table.column(2).visible(false);

        $("#loader1").removeClass("sk-loading");
        $("#loader1").removeClass("ibox-content");
        $(".sk-spinner").addClass("d-none");

      }

    })




    $('#Vtable tbody').on('click', 'tr', function () {
      var dataa = table.row(this).data();
      var roww = $(this)[0];


      console.log(dataa[2]);
      function searchh(dataa) {
        $("#vendorcode").val(dataa[0]);
        // $("#vendor_code").val(dataa[0]);
        $("#supplier_gstin").val(dataa[2]);
        $("#vendor_name").val(dataa[1]);


        $(roww).removeClass("selected");
      }

      $("#vendor").click(() => {


        searchh(dataa);

      })
    });

    $("#vendor_search").click(() => {
      $('#Vtable').DataTable().column(0).search(
        $('#col' + 5 + '_filter').val(),
        $('#col' + 5 + '_smart').prop('checked')
      ).draw();
    })

    $("#col5_filter").keypress((event) => {
      if (event.keyCode === 13) {
        $('#Vtable').DataTable().column(0).search(
          $('#col' + 5 + '_filter').val(),
          $('#col' + 5 + '_smart').prop('checked')
        ).draw();
      }
    });





  </script> -->

    <!-- <script>

        



var sessionString =  sessionStorage.getItem("userrole")
 var auth = JSON.parse(sessionString);

if (auth.includes("GATE")) {

        $(document).ready(() => {

            

            $("form")[0].reset();
            var number

            $(window).load(()=>{
                $.ajax({
                    url: `http://192.168.0.177:8050/gate/number/150`,
                    success : function(data){
                        number = data.data.gateNumber;
                        $("#gate_number").val(number)

                        // console.log(number);
                    }
                })
            })

            $("#cancel").click((e)=>{
            e.preventDefault();

            var code = 100;

            $.ajax({
                    type: "POST",
                    url: `http://192.168.0.177:8050/gate/entry`,
                    data: JSON.stringify({
                        gate_number : $("#gate_number").val(),
                        vehicle_nbr: $("#vehicle_nbr").val(),
                        vendorname: $("#vendorname").val(),
                        material_type: $("#material_type").val(),
                        weight: $("#weight").val(),
                        in_time: $("#in_time").val(),
                        division: $("#division").val(),
                        remark: $("#remark").val(),
                        status:{code},
                    }),
                    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                    success: function (data, status, xhr) {
                        // console.log(data.data.id);
                        let gate = $("#gate_number").val()
                        sessionStorage.setItem("gate_number_id",JSON.stringify(data.data.id))
                        
                        if (xhr.status == 200) {
                            
                            sessionStorage.setItem("gate_number", JSON.stringify(gate))
                            window.open("../template/gate.jsp", "_self");
                            $("form")[0].reset();
                        }
                        else {
                            // swal("", data.message, "error");
                            $("form")[0].reset();
                        }
                    },

                    error: function (xhr, httpStatusMessage, customErrorMessage) {


                            swal("", xhr.responseJSON.error, "error")
                            $("form")[0].reset();
                        
                    }
                });
        })


            $('#form').submit(function (e) {

                // var test = $.test();

                e.preventDefault();
                // var display = $("#form6Example6").val().split(" ");

                
                var vehicle_nbr = $("#vehicle_nbr").val()
                var gate_number = $("#gate_number").val()
                var vendorname = $("#vendorname").val()
                var material_type = $("#material_type").val()
                var weight = $("#weight").val()
                var in_time = $("#in_time").val()
                var division = $("#division").val()
                var remark = $("#remark").val()
                var code = 200;
                
                
                sessionStorage.setItem("status_code" , JSON.stringify(status))

                
                $.ajax({
                    type: "POST",
                    url: `http://192.168.0.177:8050/gate/entry`,
                    data: JSON.stringify({
                        gate_number : gate_number,
                        vehicle_nbr: vehicle_nbr,
                        vendorname: vendorname,
                        material_type: material_type,
                        weight: weight,
                        in_time: in_time,
                        division: division,
                        remark: remark,
                        status:{code},
                    }),
                    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                    success: function (data, status, xhr) {
                        // console.log(data.data.id);
                        let gate = $("#gate_number").val()
                        sessionStorage.setItem("gate_number_id",JSON.stringify(data.data.id))
                        
                        if (xhr.status == 200) {
                            
                            sessionStorage.setItem("gate_number", JSON.stringify(gate))
                            window.open("../template/gate.jsp", "_self");
                            $("form")[0].reset();
                        }
                        else {
                            // swal("", data.message, "error");
                            $("form")[0].reset();
                        }
                    },

                    error: function (xhr, httpStatusMessage, customErrorMessage) {


                        if (xhr.status === 410) {
                            swal("", xhr.responseJSON.message, "error")
                            $("form")[0].reset();
                        }
                        else if (xhr.status == 400) {
                            swal("", xhr.responseJSON.message, "error")
                            $("form")[0].reset();
                        }
                        else {
                            swal("", xhr.responseJSON.error, "error")
                            $("form")[0].reset();
                        }
                        $("form")[0].reset();
                    }
                });


            });
        });

        $.checkstatus(100,false)
    }
    else{
        window.open("../../../Basic/template/404.jsp" , "_self")
    }

    </script>
   
    </script>
    -->

</body>

</html>