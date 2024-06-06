<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Test Result</title>
  <jsp:include page="../../Basic/template/favicon.jsp" />
  <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../static/css/style.css" rel="stylesheet">



  <link href="../css/quality.css" rel="stylesheet">



  <script src="../../../static/js/jquery-2.1.1.js"></script>
  <script src="../js/businessmodal.js?v=" + $.getCurrentVersion()></script>

  <script src="../../../static/js/bootstrap.js"></script>


  <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">
  <link rel="stylesheet" href="../../../cdn/css/select.dataTables.min.css">

   <!-- sweetalert JS -->
   <script src="../../../cdn/js/sweetalert2.js"></script>

  <style>
    div.dataTables_info span.select-item {
      display: none !important;
    }
    textarea{
            border: 1px solid #24537f !important;
            outline: none;
        }
  </style>
  <script src="../../Basic/js/updatestatus.js"></script>


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
    else{
      window.location.href = "../../Basic/template/404.jsp";
    }

  </script>


  <div id="wrapper">
    <!--% including header %-->
    <jsp:include page="../../Basic/template/header.jsp" />

    <!--% including breadcrumb %-->
    <jsp:include page="../../Basic/template/breadcrumb.jsp" />

    <!--% Modal for business unit %-->
    <div class="modal inmodal fade" id="myModal6" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                class="sr-only">Close</span></button>
            <br><br>
            <table cellspacing="0" cellpadding="4">
              <tbody>
                <tr id="filter_col2" data-column="1" class=" ">
                  <td class=" col-12 ">
                    <div class="d-flex ">
                      <div class="input-group ">
                        <input type="text" class="form-control column_filter" placeholder="Business Unit"
                          aria-label="Admin Theme" aria-describedby="button-addon2" id="col2_filter">
                        <div class="input-group-append" id="business_search">
                          <button class="btn btn-primary" type="button" id="button-addon"><i class="fa fa-search"></i>
                            Search</button>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td align="center"><input type="checkbox" class="column_filter invisible" id="col1_smart"
                      checked="checked">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-body">
            <table id="Btable" class="display responsive nowrap text-left " style="width: 100%">
              <thead>
                <th class="text-left" data-hide="phone">Test Id</th>
                <th class="text-left" data-hide="phone">Business Unit</th>
                <th class="text-left" data-hide="phone">Effective Thru</th>
                <th class="text-left" data-hide="phone">Effective From</th>
                <th class="text-left" data-hide="phone">Description</th>
                <th class="text-left" data-hide="phone">Test Type</th>

              </thead>
              <tbody id="Business_body">
              </tbody>
            </table>
          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button id="select" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper wrapper-content">

      <div class="row">
        <div class="col-sm-12">
          <!-- <div class="ibox "> -->
          <div class="card mx-auto white-bg d-flex flex-row">
            <div class="col-5">
              <div class="form-group row gate_number my-1">
                <div class="col-9 mt-2">
                  <h3 id="gate_number"></h3>
                </div>
              </div>
            </div>
            <div class="col-7">
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

      <div class="row">
        <div class="col-lg-12 ">
          <div class="card  mx-auto p-4 white-bg">
            <div class="card-body ">
              <div class="container ">
                <form class="contact-form" id="form">
                  <div class="controls">
                    <div class="row">
                      <div class="col-1"></div>
                      <div class="col-md-4">
                        <div class="form-group"><label>Order Number*</label> <input type="text"
                            placeholder="Enter Order Number" class="form-control" required="" maxlength="12 "
                            id="form6Example1"></div>
                        <div class="form-group"><label>Item Number*</label> <input type="text"
                            placeholder="Enter Item Number" class="form-control" required="" maxlength="12 "
                            id="form6Example1"></div>
                        <div class="form-group"><label>Lot/SN*</label> <input type="text" placeholder="Enter Lot/SN"
                            class="form-control" required="" maxlength="12 " id="form6Example1"></div>

                      </div>
                      <div class="col-2"></div>
                      <div class="col-md-4">
                        <div class="form-group"><label>Location*</label><input type="text" required="" maxlength="12"
                            id="form6Example5" placeholder="Enter Location" class="form-control"></div>
                        <div class="form-group"><label>Branch/Plant*</label><input type="text" required=""
                            maxlength="12" id="form6Example5" placeholder="Enter Branch/Plant" class="form-control">
                        </div>

                      </div>

                      <!-- <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                                <button class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                <button type="submit" class="btn add btn-primary pt-2 m-1">Add</button>
                              </div> -->
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div><br>


      <div class="row">
        <div class="col-lg-12 ">
          <div class="card  mx-auto white-bg">
            <div class="card-body ">
              <div class="container ">
                <div class="row clearfix">
                  <div class="">
                    <table class="table table-bordered" id="tab_logicc">
                      <!-- <colgroup>
                        <col span="7">
                        <col span="1" id="col_hide">
                      </colgroup> -->
                      <thead>
                        <tr>
                          <th class="text-center"> Test Id</th>
                          <th class="text-center"> Business Unit</th>
                          <th class="text-center"> Effective Thru</th>
                          <th class="text-center"> Effective From</th>
                          <th class="text-center"> Description</th>
                          <th class="text-center"> Test Type</th>
                          <th class="text-center"> Action</th>
                        </tr>
                      </thead>
                      <tbody id="table-body">
                        <tr>
                          <td>
                            <div class="input-group col p-0">
                              <input type="text" class="form-control input_size fetch_check test_id" required=""
                                aria-label="Admin Theme" aria-describedby="button-addon2" readonly id="">
                              <div class=" input-group-append">
                                <button type="button" id="modeldata" class="btn btn-primary select" data-toggle="modal"
                                  data-target="#myModal6">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td><input type="text" class="form-control input_size po text-right business_unit" required=""
                              id="" value=""></td>
                          <td><input type="text" class="form-control input_size head_company text-right effective_Thru"
                              id="" required="" value=""></td>
                          <td><input type="text" class="form-control input_size currency_head text-right effective_From"
                              required="" id="" value=""></td>
                          <td><input type="text" class="form-control input_size details_status text-right description"
                              required="" id=""></td>
                          <td><input type="text" id="" required=""
                              class="form-control input_size details_gate_id text-right test_Type"></td>

                          <td><button type="button" class="btn btn-danger delete-row">Delete</button></td>
                        </tr>
                      </tbody>
                    </table>
                    <input type="button" id="add_roww" class="btn btn-primary " value="Add Row">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> <br>

      <div class="row">
        <div class="col-12">
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
                        <li><a class="nav-link active" id="data3" data-toggle="tab" href="#tab-3">Remark</a></li>
                        <li><a class="nav-link" id="data4" data-toggle="tab" href="#tab-4">Previous Remark</a></li>
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
                                    <table class="table table-bordered" id="grn_table">
                                      <thead>
                                        <tr>
                                          <th class="text-center"> Gate Id</th>
                                          <th class="text-center"> Username</th>
                                          <th class="text-center"> Remark</th>
                                          <th class="text-center"> Date</th>
                                          <!-- <th class="text-center"> Amount Open</th> -->
                                        </tr>
                                      </thead>
                                      <tbody id="grn_table_body">
                                        <tr>
                                          <td><input type="text" readonly="" class="form-control input_size text-right"
                                              id="line_num"></td>
                                          <td><input type="text" readonly="" class="form-control input_size text-right"
                                              id="details_status"></td>
                                          <td><input type="text" readonly="" class="form-control input_size text-right"
                                              id="details_status"></td>
                                          <td><input type="text" readonly="" class="form-control input_size text-right"
                                              id="details_status"></td>
                                          <!-- <td><input type="text" readonly class="form-control input_size text-right" id="details_status"></td>
                                                            <td><input type="text" readonly class="form-control input_size text-right" id="details_status"></td> -->
                                          <!-- <td><input type="text" id="hsn_code" readonly class="form-control input_size text-right"></td> -->
                                        </tr>
                                      </tbody>
                                    </table>
                                    <input type="button" id="" class="btn btn-primary invisible   []" value="Add Row">
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
      <br>


      <!--% including footer %-->
      <jsp:include page="../../Basic/template/footer.jsp" />

    </div>

    <script src="../js/addInvoice.js?v=" + $.getCurrentVersion()></script>
    <script src="../js/qualityTest.js?v=" + $.getCurrentVersion()></script>



    <!-- Mainly scripts -->
    <script src="../../../static/js/popper.min.js"></script>
    <script src="../../../static/js/bootstrap.js"></script>
    <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>



    <!-- Custom and plugin javascript -->
    <script src="../../../static/js/inspinia.js"></script>
    <script src="../../../static/js/plugins/pace/pace.min.js"></script>



    <!-- jQuery UI -->
    <script src="../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>


    <!-- userslist JS -->
    <script src="../../Configration/js/globalConfig.js"></script>

    <!-- breadcrumb JS -->
    <script src="../../../custom/js/breadcrumb.js"></script>

   

    <!-- dataTable JS -->
    <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../cdn/js/dataTables.responsive.min.js"></script>

    <script src="../../../cdn/js/dataTables.select.min.js"></script>

</body>

</html>