<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Gate Entry</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet" />
    <link
      href="../../../../static/font-awesome/css/font-awesome.css"
      rel="stylesheet"
    />

    <link href="../../../../static/css/animate.css" rel="stylesheet" />
    <link href="../../../../static/css/style.css" rel="stylesheet" />

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link
      rel="stylesheet"
      href="../../../../custom/adjustable-invoice/css/index.css"
    />

    <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

    <link rel="stylesheet" href="../css/addGate.css" />

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css" />
    <link
      rel="stylesheet"
      href="../../../../cdn/css/responsive.dataTables.min.css"
    />
    <!-- <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css"> -->

    <link
      rel="stylesheet"
      href="../../../../custom/css/filter_multi_select.css"
    />
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

    <script src="../../../../static/js/bootstrap.js"></script>
  
  <script src="../../../../cdn/js/bwip-js-min.js"></script>

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

   
    <link rel="stylesheet" href="../../../../cdn/css/uppy.min.css">
    <script src="../../../Configration/js/globalConfig.js"></script>

    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->

    <script src="../../../Basic/js/updatestatus.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>

    <style>
      .filter-multi-select > .dropdown-menu {
        position: relative !important;
      }

      .filter-multi-select > .viewbar > .selected-items > .item {
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

      .table {
        text-align: center;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #Dtable_length > label {
        margin-bottom: 0rem;
        margin-top: 0.5rem;
      }

      #role_length > label {
        margin-bottom: 0rem;
        margin-top: 0.5rem;
      }

      .head > th {
        margin-bottom: 500px;
      }

      .search tr > td > input {
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

      table.dataTable > tbody > tr.child span.dtr-title {
        min-width: 110px !important;
      }

      .my-2 {
        margin-top: 0.85rem !important;
        margin-bottom: 0.85rem !important;
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
        transition: all 0.5s;
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
        margin-top: 0.5rem !important;
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

      /* s */

      /* .modal-lg, .modal-xl {
    max-width: 800px !important;
    } */

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
      .ibox-content {
        border-width: 0px !important;
      }
      #myModal15 {
        overflow: hidden !important;
        overflow-y: scroll !important;
      }

    .ibox-content {
      padding: 0px;
      border-width: 0px;
    }

      /* #Vendor_body td{
      padding-bottom: 0px;
      padding-top: 0px;
    } */
    </style>
  </head>

  <body>
    <script>
      let sessionString = localStorage.getItem("userrole");

      let name = JSON.parse(sessionString);

      if (name != null) {
        if (name.includes("GATE") || name.includes("Admin")) {
        } else {
          window.location.href = "../../../Basic/template/404.jsp";
        }
      } else {
        window.location.href = "../../../Basic/template/404.jsp";
      }
    </script>

    <div id="wrapper">
      <div
        class="modal inmodal fade"
        id="myModal15"
        tabindex="2"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h2><strong>&nbsp;&nbsp;&nbsp; Additional Documents</strong></h2>
            </div>
            <div
              class="modal-body d-flex justify-content-center align-items-center"
            >
              <div id="drag-drop-area"></div>
            </div>

            <div class="modal-footer m-2">
              <!-- <button type="button" class="btn btn-primary"
                                data-dismiss="modal">Skip</button> -->
              <button
                type="button"
                id="skip"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal inmodal fade"
        id="myModal20"
        tabindex="2"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3><b>Vendor Details</b></h3>

              <br><br>

              <div class="col-12 d-flex">
                <div class="input-group">
                <input type="text" name="" class="form-control" id="vendor_code_name" placeholder="Search By Vendor Code / Vendor Name">
                <input type="button" class="input-group-append btn btn-primary" id="vendor_code_name_search" value="Search">
                </div>
              </div>
            </div>
            <div class="modal-body">

            <div class="py-0" id="loader5">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin5">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>

              <table
                id="Vtable"
                class="display responsive nowrap text-left"
                style="width: 100%"
              >
                <thead>
                  <th class="text-left" data-hide="phone">Vendor Number</th>
                  <th class="text-left" data-hide="phone">Vendor Name</th>
                </thead>
                <tbody id="Vendor_body"></tbody>
              </table>
            
            </div>

            <div class="modal-footer m-2">
              <button type="button" class="btn btn-white" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                id="Vendor_selected"
                data-dismiss="modal"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>



      
    <!-- <div class="modal inmodal fade" id="myModal21" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3><b>Vendor Details</b></h3>
            <br><br>

            <div class="col-12 d-flex">
              <div class="input-group">
              <input type="text" name="" class="form-control" id="po_no_selected" placeholder="Search By Vendor Code / Vender Name">
              <input type="button" class="input-group-append btn btn-primary" id="po_no_selected_search" value="Search">
              </div>
            </div>

            
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
    </div> -->


      <!--% including header %-->
      <jsp:include page="../../../Basic/template/header.jsp" />

      <!--% including breadcrumb %-->
      <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

      <div class="wrapper wrapper-content">
        <div class="row">
          <div class="col-lg-12">
            <div class="card mx-auto white-bg">
              <div class="col-5">
                <div class="form-group row gate_number">
                  <div class="col-8">
                    <h3 id="gate_number" class="my-1"></h3>
                  </div>
                </div>
              </div>
              <div class="col-7">
                <jsp:include
                  page="../../../Basic/template/statusnavigation.jsp"
                />
              </div>
            </div>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-sm-5">
            <div class="ibox">
              <div class="py-0" id="loader1">
                <div
                  class="sk-spinner sk-spinner-double-bounce d-none"
                  id="spin"
                >
                  <div class="sk-double-bounce1"></div>
                  <div class="sk-double-bounce2"></div>
                </div>
                <div class="ibox-content py-3 px-2 pl-4">
                  <!-- <h3 id="" class="">Supplier Number</h3> -->
                  <div class="row justify-content-around">
                    <div class="input-group col-5 p-0 ml-3 mr-4">
                      <!-- <label class="col-3 col-form-label p-0 mr-2">Vendor code</label>  -->
                      <input
                        type="text"
                        class="form-control input_size fetch_check control_check"
                        required=""
                        placeholder="Search Vendor code"
                        aria-label="Admin Theme"
                        readonly
                        aria-describedby="button-addon2"
                        id="vendorcode"
                      />
                      <div class="input-group-append">
                        <button
                          type="button"
                          id="VendorSearch"
                          class="btn btn-primary select"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                    <!-- <div class=""> -->
                    <input
                      type="text"
                      class="form-control input_size fetch_check col-5 align-self-center font-weight-bold pr-0 mr-3"
                      required=""
                      placeholder="Vendor Name"
                      aria-label="Admin Theme"
                      aria-describedby="button-addon2"
                      readonly=""
                      id="vendor_name"
                    />
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-7">
            <div class="ibox">
              <div
                class="ibox-content py-3 px-2 col-12 d-flex justify-content-around"
              >
                <input
                  class="my-0 btn btn-primary col-3 py-1 invisible"
                  type="file"
                  id="preview_img"
                  accept="application/pdf"
                  onchange="previewFile()"
                  crossorigin=""
                />
                <input
                  type="button"
                  class="add_info btn btn-primary py-1 col-3"
                  data-toggle="modal"
                  data-target="#myModal11"
                  id="modeldata"
                  value="Additional Info"
                />
                <button
                  type="button"
                  id="print_tab"
                  class="btn btn-primary py-1 col-3"
                >
                  Print Gate Pass
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row d-none" id="print_invoice_page">
          <div class="col-lg-12 vw-100" id="print_invoice">
            <div class="ibox-content p-xl">
              <div class="row">
                <div class="col-sm-6">
                  <img src="../../../images/RSB_logo.png" alt="" />
                </div>

                <div class="col-sm-6 text-right"></div>
                <div class="col-sm-4 text-left mt-5">
                  <h3>INWARD GATEPASS</h3>
                </div>
                <div class="col-sm-4 text-center mt-5">
                  <h3>RSB</h3>
                </div>
                <div class="col-sm-4 text-left mt-5">
                  <h3>Date & Time <span id="data_time"></span></h3>
                </div>
                <br /><br />
                <div class="col-sm-8 text-left mt-5">
                  <h3>
                    Undermentioned Goods Taken By:
                    ...................................................
                  </h3>
                </div>
                <div class="col-sm-4 text-left mt-5">
                  <h3>Gate No: <span id="modal_gate_id"></span></h3>
                </div>

                <div class="col-sm-9 text-left">
                  <h3>
                    Supplied By:
                    <span id="modal_vendor_name"></span
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type:
                    <span id="modal_material_type"></span>
                  </h3>
                </div>
                <div class="col-sm-3 text-left">
                  <!-- <h3>Date:........................</h3> -->
                </div>

                <div class="col-sm-8 text-left">
                  <h3>
                    Truck/Tractor Trolly/Railway Wagon No:
                    <span id="modal_vehicle_no"></span>
                  </h3>
                </div>
                <div class="col-sm-4 text-left">
                  <h3>Bill#: <span id="modal_invoice_no"></span></h3>
                </div>

                <div class="col-sm-9 text-left">
                  <h3>
                    Prepared By:
                    <span id="modal_user_name"></span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status: GATE
                    ENTRY
                  </h3>
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
                </div>
                <!-- /table-responsive -->

                  </tbody>
                </table>
              </div><!-- /table-responsive -->

              <div class="table-responsive mt-5 col-12">
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
              <div class="row d-flex justify-content-center mt-4">
                <canvas id="barcode"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid d-flex my-1 bg-white p-0">
          <div class="col-5" style="z-index: 1; width: 1100px">
            <div class="container p-0">
              <div class="row">
                <div class="col-12">
                  <div class="mx-auto white-bg">
                    <div class="card-body px-0">
                      <div class="container">
                        <form class="contact-form" id="form">
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
                                      class="form-control fetch_check bill vendor_code control_check"
                                      readonly
                                    />
                                    <!-- <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select"> -->
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
                                      class="form-control fetch_check bill vendor_invoice control_check"
                                      readonly
                                    />
                                    <!-- <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select"> -->
                                  </div>

                                </div>
                                <div class="form-group">
                                  <label><b>PO Number*</b></label>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    required=""
                                    id="po_number"
                                    placeholder="Enter PO No."
                                    class="form-control fetch_check po_number control_check"
                                    readonly
                                  />
                                  <!-- <input type="button" id="po_no_search" class="input-group-append btn btn-primary select" value="Select"> -->
                                </div>
                                </div>
                                <div class="form-group">
                                  <label><b>DC Number*</b></label>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    readonly
                                    id="DELIVERY_CHALLAN_NUMBER"
                                    placeholder="Enter DC Number"
                                    class="form-control fetch_check dc_number control_check"
                                  />
                                  <!-- <input type="button" id="po_no_search" class="input-group-append btn btn-primary select" value="Select"> -->
                                </div>
                                </div>
                                <div class="form-group">
                                  <label>Vehicle Number*</label>
                                  <input
                                    type="text"
                                    placeholder="Enter Vehicle No."
                                    class="form-control fetch_check control_check"
                                    required=""
                                    maxlength="20"
                                    id="vehicle_nbr"
                                    readonly
                                  />
                                </div>
                                <div class="form-group">
                                  <label><b>Weight / Quantity*</b></label>
                                  <input
                                    type="text"
                                    required=""
                                    id="weight"
                                    placeholder="Weight / Quantity"
                                    class="form-control fetch_check control_check"
                                    readonly
                                  />
                                </div>
                                <div class="form-group">
                                  <label><b>Transaction Type</b></label>
                                  <select name="" class="form-control" id="Transaction">
                                  </select>
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
                                    placeholder="Enter Vendor Name"
                                    class="form-control fetch_check control_check"
                                    readonly
                                  />
                                </div>
                                <div class="form-group">
                                  <label><b>Vendor Invoice Date*</b></label>
                                  <input
                                    type="text"
                                    id="invoice_date"
                                    required=""
                                    maxlength="25"
                                    placeholder="Vendor Invoice Date"
                                    class="form-control fetch_check control_check"
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
                                    <label><b>Work Order NO.*</b></label>
                                    <input
                                      type="text"
                                      readonly
                                      id="WORK_ORDER_NUMBER"
                                      placeholder="Enter Work Order No."
                                      class="form-control fetch_check work_order control_check"
                                    />
                                </div>
                               
                                <div class="form-group">
                                  <label>Report Time</label
                                  ><input
                                    type="text"
                                    readonly
                                    required=""
                                    id="in_time"
                                    class="form-control fetch_check"
                                  />
                                </div>

                                <div class="form-group">
                                  <label><b>Invoice Amount*</b></label>
                                  <input
                                    type="text"
                                    required=""
                                    id="amount"
                                    placeholder="Enter Invoice Amount"
                                    class="form-control fetch_check amount control_check"
                                    readonly
                                  />
                                </div>

                                
                                <button
                                  type="button"
                                  id="Vendor_Search"
                                  data-toggle="modal"
                                  data-target="#myModal20"
                                  class="btn btn-primary d-none"
                                ></button>

                                <!-- <button type="button" id="po_no_search_modal" data-toggle="modal" data-target="#myModal21"
                                  class="btn btn-primary d-none"></button>
                                <button type="button" id="vendor_no_modal" data-toggle="modal" data-target="#myModal22"
                                  class="btn btn-primary d-none"></button> -->
                              </div>

                              <div
                                class="px-2 my-3 d-flex justify-content-start"
                              >
                                <!-- <button
                                  class="btn btn-outline-danger pt-2 m-1"
                                  id="cancel1"
                                >
                                  Back
                                </button>
                                <button
                                  class="btn btn-primary pt-2 m-1"
                                  id="save"
                                >
                                  SAVE
                                </button> -->


                                <button
                                type="button"
                                  class="btn btn-primary pt-2 m-1 d-none"
                                  id="Check"
                                >
                                  check
                                </button>

                                <div id="content" class="d-none"></div>

                                
                              </div>
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
          <div class="handler bg-white"></div>
          <div
            class="bg-body col-7"
            id="hide"
            style="z-index: 1; display: block"
          >
            <div class="" id="loader">
              <div
                class="sk-spinner sk-spinner-double-bounce d-none"
                id="spin1"
              >
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>
              <div class="container-fluid h-100 p-0 ravi">
                
              </div>
            </div>
          </div>

        </div>





          <div class="ibox-content">

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
    
          <div class="row">
            <div class="col-12">
                <div class="panel panel-primary ">
                    
                    <div class="panel-body d-flex">

                      <button class="btn btn-primary col-sm-6 pt-2 m-1" id="save" > SAVE </button>
                      <button class="btn btn-danger col-sm-6 pt-2 m-1" id="cancel1" > Back </button>
                       
                            <!-- <input type="button" id="submit_invoice"  class="btn col-sm-6 btn-success border" value="Submit">
                            <input type="button" id="reject_invoice" class="btn col-sm-6 btn-danger border" value="Reject"> -->
                      
        
            </div>
        </div>
            </div>
        
        </div>
    
        












        </div>
        
      <br />
    <!--% including footer %-->
    <jsp:include page="../../../Basic/template/footer.jsp" />

    <script src="../../../../custom/js/breadcrumb.js"></script>

    <script src="../../../../cdn/js/uppy.min.js"></script>





    
  

    <!-- <script src="../js/gateocr.js"></script> -->

    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../../cdn/js/dataTables.select.min.js"></script>

    <!-- addGate JS -->

    <script>
      $(window).load(() => {
        $("#in_time")[0].value = new Date().toLocaleTimeString();
      });

      // ---->For preview of pdf<----
      function previewFile() {
        const file = $("#preview_img")[0].files[0];
        console.log(file);
        let extension = file.name.split(".");
        extension = extension.reverse();

        console.log("the extension is : ---", extension);
        console.log(extension[0]);
        if (extension[0] == "pdf") {
          $(".ravi").children().remove();
          $(".ravi").append(`<iframe src="" class="w-100 vh-100"></iframe>`);
          const preview = document.querySelector("iframe");
          const reader = new FileReader();
          var filename = file.name;
          console.log(reader);
          console.log(reader.result);

          reader.addEventListener(
            "load",
            function () {
              preview.src = reader.result;
            },
            false
          );

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    }
    // ---->End of : For preview of pdf<----
  </script>
    <script src="../js/addGate.js?v=" + $.getCurrentVersion()></script>

  
  </body>
</html>
