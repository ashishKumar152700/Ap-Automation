<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Gate Entry</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.9.2/semantic.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.semanticui.min.css"> -->
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/gate.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">

    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">

    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

    <!-- <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"> -->

    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css"> -->

    <link rel="stylesheet" href="../../../../cdn/css/jquery-ui.css">


    <script src="../../../../cdn/js/bwip-js-min.js"></script>




    <style>
      #Dtable td:nth-child(3),#Dtable td:nth-child(4),#Dtable td:nth-child(5) {

      white-space: normal !important;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 50px;
      }
    </style>


</head>

<body>



  <script src="../../../Basic/template/404.jsp"></script>

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
                              <table cellspacing="0" cellpadding="4" class="col-3">
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
  
                              <table cellspacing="0" cellpadding="4" class="col-3">
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

                              <!-- <button type="button" id="export">Export</button> -->
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

                          <!-- ui celled table  -  class to change the dataTable design -->

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
                                    <th class="text-left" data-hide="phone">Out Time</th>
                                    <th class="text-left" data-hide="phone">Status</th>
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        </div>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    <script src="../../../../custom/js/breadcrumb.js"></script>

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
    
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <!-- Gate JS -->
    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>

    <!-- <script src="https://cdn.datatables.net/fixedheader/3.4.0/js/dataTables.fixedHeader.min.js"></script>

    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script> -->

    
    <script src="../js/gate.js?v=" + $.getCurrentVersion()></script>
    
    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->









</body>

</html>