<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>DB Update</title>
  <jsp:include page="../../../Basic/template/favicon.jsp" />
  <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../../static/css/style.css" rel="stylesheet">

  <script src="../../../../static/js/jquery-2.1.1.js"></script>

  <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">


  <link rel="stylesheet" href="../css/addGate.css">


  <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">

  <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
  <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>


  <script src="../../../../custom/js/pdf.js"></script>
  <script src="../../../../custom/js/pdf.worker.js"></script>
  <script src="../../../../static/js/bootstrap.js"></script>
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
  <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>
  
  
  <link rel="stylesheet" href="../../../../cdn/css/uppy.min.css">
  <script src="../../../Configration/js/globalConfig.js"></script>
  
  <script src="../../../../cdn/js/moment.min.js"></script>
  
  

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
    /* #Vendor_body td{
      padding-bottom: 0px;
      padding-top: 0px;
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
                if(item.id == 21){
                 menuroles = item.assignroles.map((value)=> value.rolecode)
                }
              }
          )
          let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 

            //  if(name.includes("GATE")  || name.includes("Admin"))
              if(returned_arr.flat(Infinity).includes(true)){

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
    <!-- HTML template for the custom dropdown -->
<div id="custom-dropdown" style="display: none;">
  <label for="options">Select an option:</label>
  <select id="options">
    <option value="Option1">Option 1</option>
    <option value="Option2">Option 2</option>
    <option value="Option3">Option 3</option>
  </select>
</div>




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
            <!-- <input type="button" class="input-group-append btn btn-primary" id="vendor_code_name_search" value="Search"> -->
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


  <div class="modal inmodal fade" id="myModal21" tabindex="2" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-0 col-12">
          <h3><b>Select Purchase Order</b></h3>
          <hr>
          <div class="form-group d-flex p-0 col-12">
          <div class="col-5 p-0 d-flex align-items-center">
            <lable><b>Vendor Code</b></lable>
          <input type="text" name="" class="form-control col-8 ml-3" id="vendor_code_modal"  placeholder="">
          </div>
          <div class="col-5 p-0 d-flex align-items-center">
            <lable><b>Vendor Name</b></lable>
            <input type="text" name="" class="form-control col-8 ml-3" id="vendor_name_modal"  placeholder="">
          </div>
          <!-- <select name="" class="form-control col-2" id="item_code_search"> -->
            <!-- <option value="" selected></option> -->
          <!-- </select> -->
          </div>

          <div class="form-group d-flex p-0 col-12">
            <div class="col-5 p-0 d-flex align-items-center">
              <lable class="col-3 p-0"><b>PO Number</b></lable>
              <input type="text" name="" class="form-control col-8 ml-3" id="po_no_selected" placeholder="PO Number">
            </div>
            <div class="col-5 p-0 d-flex align-items-center">
              <lable class="col-3 p-0"><b>PO Type</b></lable>
              <input type="text" class="form-control col-8 ml-4" placeholder="PO Type" id="po_type_search" value="">

              <input type="button" class="btn btn-primary btn btn-primary col-3 ml-2" placeholder="" id="po_no_selected_search" value="Search">
            </div>
        
            </div>
            
            <div class="form-group d-flex p-0 col-12 d_number">
              <div class="col-5 p-0 d-flex align-items-center">
                <lable class="col-3 p-0"><b>DC. Number</b></lable>
                <input type="text" name="" class="form-control col-8 ml-3" id="dc_number" placeholder="DC Number">
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
              <th class="text-left" data-hide="phone">Po Company</th>
              <th class="text-left" data-hide="phone">Item Number</th>
              <th class="text-left" data-hide="phone">Description</th>
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
              <!-- <jsp:include page="../../../Basic/template/statusnavigation.jsp" /> -->
            </div>
          </div>
        </div>
      </div><br>

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
             
                      <!-- <select name="cars" class="form-control column_filter"
                          placeholder="Status" aria-label="Admin Theme"
                          aria-describedby="button-addon2" id="col2_filter">
                      </select> -->

                      <div class="form-group mb-0">
                  
                        <div class="input-group">
                          <select name="cars" class="form-control column_filter"
                          placeholder="Status" aria-label="Admin Theme"
                          aria-describedby="button-addon2" id="col2_filter">
                      </select>
                          <!-- <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select"> -->
                        </div>

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

              <div class="" id="loader_rescan">
                <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_rescan">
                  <div class="sk-double-bounce1"></div>
                  <div class="sk-double-bounce2"></div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                            <div class="card-body px-0">
                                <div class="container ">
    
                                    <form class="contact-form" id="form1">
                                        <div class="controls">
                                            <div class="row">
                                                <!-- <div class="col-1"></div> -->
                                                <div class="col-md-6">
                               
                                                  <div class="form-group">
                  
                                                    <label><b>Vendor Code</b></label>
                                                    <div class="input-group">
                                                      <input
                                                        type="text"
                                                        required=""
                                                        id="vendor_code"
                                                        placeholder="Enter Vendor Code"
                                                        class="form-control fetch_check vendor_code check control_check"
                                                        
                                                      />
                                                      <!-- <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select"> -->
                                                    </div>
                  
                                                  </div>
                                                  <div class="form-group">
                  
                                                    <label><b>Vendor Invoice No.</b></label>
                                                    <div class="input-group">
                                                      <input
                                                      vendor_codetype="text"
                                                        id="invoice_number"
                                                        placeholder="Enter Vendor Invoice"
                                                        class="form-control fetch_check bill vendor_invoice check control_check"
                                                        
                                                      />
                                                      <!-- <input type="button" id="vendor_code_search" class=" input-group-append btn btn-primary select" value="Select"> -->
                                                    </div>
                  
                                                  </div>
                                                  <div class="form-group">
                                                    <label><b>DC Number</b></label>
                                                  <div class="input-group">
                                                    <input
                                                      type="text"
                                                      
                                                      id="deliveryChallanNumber"
                                                      placeholder="Enter DC Number"
                                                      class="form-control fetch_check dc_number check control_check"
                                                    />
                                                    <!-- <input type="button" id="po_no_search" class="input-group-append btn btn-primary select" value="Select"> -->
                                                  </div>
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>PO Number</b></label>
                                                  <div class="input-group">
                                                    <input
                                                      type="text"
                                                      id="po_number"
                                                      placeholder="Enter PO No."
                                                      class="form-control fetch_check  po_number check control_check"
                                                      
                                                    />
                                                    <input type="button" id="po_no_search" class="input-group-append btn d-none btn-primary select" value="Select">
                                                  </div>
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>Vehicle Number</b></label>
                                                    <input
                                                      type="text"
                                                      placeholder="Enter Vehicle No."
                                                      class="form-control fetch_check check control_check" 
                                                      id="vehicle_nbr"
                                                    />
                                                  </div>
                                                  <div class="form-group">
                                                    <label><b>Weight / Quantity</b></label>
                                                    <input
                                                      type="text"
                                                      id="weight"
                                                      placeholder="Weight / Quantity"
                                                      class="form-control bill fetch_check check control_check"
                                                      
                                                    />
                                                  </div>

                                                  <div class="form-group">
                                                    <label for="unitname"><b>Unit Name</b></label> <br>
                                                    <select id="unitname" required name="unitname" placeholder="unit"
                                                        class="form-control">
                                                        <!-- <option value="" disabled selected>No Unit Name Selected
                                                        </option> -->
                                                    </select>
                                                </div>

                                                  <div class="form-group">
                                                    <label><b>Transaction Type</b></label>
                                                    <select name="" class="form-control" id="Transaction">
                                                    </select>
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>Work Order Location</b></label>
                                                    <input
                                                      type="text"
                                                      id="workOrderLocation"
                                                      placeholder="Work Order Location"
                                                      class="form-control bill fetch_check check control_check"
                                                      
                                                    />
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>Work Order Type</b></label>
                                                    <input
                                                      type="text"
                                                      id="work_order_type"
                                                      placeholder="Work Order Type"
                                                      class="form-control bill fetch_check check control_check"
                                                      
                                                    />
                                                  </div>

                                                  
                                                  <div class="form-group">
                                                    <label><b>Short Receipt Document</b></label>
                                                    <input
                                                      type="text"
                                                      id="short_receipt_document"
                                                      placeholder="Short Receipt Document"
                                                      class="form-control short_receipt_document fetch_check check control_check"
                                                      
                                                    />
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>Short Voucher Number</b></label>
                                                    <input
                                                      type="text"
                                                      id="short_voucher_number"
                                                      placeholder="Short Voucher Number"
                                                      class="form-control short_voucher_number fetch_check check control_check"
                                                      
                                                    />
                                                  </div>

                                                  
                                                  
                                                 
                                                </div>
                  
                                              <div class="col-md-6">
                                                
                                                  <div class="form-group">
                                                    <label><b>Vendor Name</b></label>
                                                    <input
                                                      type="text"
                                                      id="vendorname"
                                                      required=""
                                                      placeholder="Enter Vendor Name"
                                                      class="form-control fetch_check check control_check"
                                                      
                                                    />
                                                  </div>
                                                  <div class="form-group">
                                                    <label><b>Vendor Invoice Date</b></label>
                                                    <input
                                                      type="text"
                                                      id="invoice_date"
                                                      placeholder="Vendor Invoice Date"
                                                      class="form-control bill fetch_check check control_check"
                                                      
                                                    />
                                                  </div>
                                                  
                                                  <div class="form-group">
                                                      <label><b>Work Order NO.</b></label>
                                                      <input
                                                        type="text"
                                                        
                                                        id="workOrderNumber"
                                                        placeholder="Enter Work Order No."
                                                        class="form-control fetch_check check work_order control_check"
                                                      />
                                                  </div>

                                                  <div class="form-group">
                                                    <label><b>PO Type</b></label>
                                                    <input
                                                      type="text"
                                                      id="po_type"
                                                      placeholder="Enter PO Type"
                                                      class="form-control fetch_check  check po_type control_check"
                                                      
                                                    />
                                                </div>
                                                 
                                                  <div class="form-group">
                                                    <label><b>Report Time</b></label
                                                    ><input
                                                      type="text"
                                                      
                                                      id="in_time"
                                                      class="form-control check fetch_check"
                                                    />
                                                  </div>
                  
                                                  <div class="form-group">
                                                    <label><b>Invoice Amount</b></label>
                                                    <input
                                                      type="text"
                                                      id="amount"
                                                      placeholder="Enter Invoice Amount"
                                                      class="form-control bill fetch_check check amount control_check"
                                                      
                                                    />
                                                  </div>

                                                  <div class="form-group">
                                                    <label for="storeId"><b>Store Id</b></label> <br>
                                                    <select id="storeId" class="form-control">
                                                      <!-- <option value="" disabled selected>No Unit Name Selected
                                                      </option> -->
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                  <label><b>Receipt Number</b></label>
                                                  <input
                                                    type="text"
                                                    id="receipt_number"
                                                    placeholder="Enter Receipt Number"
                                                    class="form-control receipt_number fetch_check check amount control_check"
                                                    
                                                  />
                                                </div>

                                                <div class="form-group">
                                                  <label><b>Work Order Number</b></label>
                                                  <input
                                                    type="text"
                                                    id="workOrderNumber"
                                                    placeholder="Work Order Number"
                                                    class="form-control bill fetch_check check amount control_check"
                                                    
                                                  />
                                                </div>
                                                  

                                                <div class="form-group">
                                                  <label><b>Short JDE Msg</b></label>
                                                  <input
                                                    type="text"
                                                    id="short_jde_msg"
                                                    placeholder="Short JDE Msg"
                                                    class="form-control bill fetch_check check short_jde_msg
                                                    control_check"
                                                    
                                                  />
                                                </div>

                                                <div class="form-group">
                                                  <label><b>Short Order Number </b></label>
                                                  <input
                                                    type="text"
                                                    id="short_order_number"
                                                    placeholder="Short Order Number "
                                                    class="form-control short_order_number fetch_check check control_check"
                                                    
                                                  />
                                                </div>



                                                  <button
                                                    type="button"
                                                    id="Vendor_Search"
                                                    data-toggle="modal"
                                                    data-target="#myModal20"
                                                    class="btn btn-primary d-none"
                                                  ></button>
                                                  <button type="button" id="po_no_search_modal" data-toggle="modal" data-target="#myModal21"
                                                  class="btn btn-primary d-none"></button>


                                                  <div id="content" class="d-none"></div>
                  
                                                  <!-- <button type="button" id="po_no_search_modal" data-toggle="modal" data-target="#myModal21"
                                                    class="btn btn-primary d-none"></button>
                                                  <button type="button" id="vendor_no_modal" data-toggle="modal" data-target="#myModal22"
                                                    class="btn btn-primary d-none"></button> -->
                                                </div>
    
                                                <div class="px-2 my-3 d-flex justify-content-start ">

                                                  <button type="button" class="btn add btn-primary  pt-2 m-1 d-none" id="rescan">Rescan</button>
                                                    <!-- <button class="btn btn-outline-danger pt-2 m-1" id="cancel1">Back</button>
                                                    <button type="submit" class="btn add btn-primary pt-2 m-1">Submit</button>
                                                    <button type="button" class="btn add btn-primary pt-2 m-1 d-none" id="rescan">Rescan</button> -->
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
          </div>
          <div class="handler  bg-white "></div>
          <div class=" bg-body  col-7 " id="hide" style="z-index: 1; display: block;">
            <div class="" id="loader">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin1">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>
              <div class="container-fluid vh-100 p-0 ravi" id="preview">
                <!-- <input class="my-1" type="file" id="inputimg" accept="*" onchange="previewFile()" crossorigin /> -->
              </div>
            </div>
          </div>



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
                  
                  <div class="panel-body d-flex justify-content-around">

                    <div class="container px-1">
                    <button type="submit" class="btn add col-sm-12 btn-primary pt-2" id="submit_gate">Submit</button>
                    </div>
                   
                    <div class="container px-1">
                      <button class="btn btn-danger col-sm-12 " id="back_invoice">Back</button>
                    </div>

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

    
    <script src="../../../../cdn/js/uppy.min.js"></script>


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
    </script>
    
    <script src="../js/updateGate2.js?v=" + $.getCurrentVersion()></script>
</body>

</html>