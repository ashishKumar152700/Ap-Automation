<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Invoice Training</title>
  <jsp:include page="../../../Basic/template/favicon.jsp" />
  <script src="../../../../static/js/jquery-3.1.1.min.js"></script>
  <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

  <!-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" crossorigin="anonymous"></script> -->

  <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../../static/css/style.css" rel="stylesheet">






  <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">

  <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

  <link rel="stylesheet" href="../css/addGate.css">

  <link rel="stylesheet" href="../../../../custom/cropper/css/cropper.css">
  <link rel="stylesheet" href="../../../../custom/cropper/css/main.css">


  <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
  <!-- <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css"> -->
  <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">



  <script src="../../../../static/js/bootstrap.js"></script>
  <script src="../../../../cdn/js/sweetalert2.js"></script>
  <script src="../../../../cdn/js/sweetalert.min.js"></script>



  <style>
    /* .card{
            flex-direction: row !important;
        }
        .gate_number{
            padding-top:11px ;
        } */

    option::after {
      content: " *";
      color: red;
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

    .ibox-content {
      border-width: 0px;
    }

  </style>

  <script src="../../../Configration/js/globalConfig.js"></script>



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
            if(item.id == 28){
                menuroles = item.assignroles.map((value)=> value.rolecode)
            }
            }
        )
        let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
        //  if(name.includes("Training")  || name.includes("Admin"))
      if(returned_arr.flat(Infinity).includes(true)) {

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

    <!--% including header %-->
    <jsp:include page="../../../Basic/template/header.jsp" />

    <!--% including breadcrumb %-->
    <jsp:include page="../../../Basic/template/breadcrumb.jsp" />



    <div class="modal inmodal fade" id="myModal20" tabindex="2" role="dialog" aria-hidden="true">
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
    </div>

    <div class="modal inmodal fade" id="copy_from_modal" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3><b>Select Template</b></h3>
           
          </div>
          <div class="modal-body">

            <div class="py-0" id="loader_template">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin_template">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>
              <div class="row ">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content">
                            
                            
                            <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">
                                
                                <thead>
                                    <th class="text-left" data-toggle="true">ID</th>
                                    <th class="text-left" data-hide="phone">Vendor Code</th>
                                    <th class="text-left" data-hide="phone">Vendor Name</th>
                                    <th class="text-left" data-hide="phone">Template</th>
                                
                                   
                         
                                </thead>
                                <tbody id="tbody">
    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>  

          </div>

          
        </div>
        <div class="modal-footer m-2">
          <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="select_template" data-dismiss="modal">Select</button>
        </div>
        </div>
      </div>
    </div>

    <!--% Modal for Document company %-->
    <!-- <div class="modal inmodal fade" id="myModal7" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="ibox-content sk-loading" id="loader1">
            <div class="sk-spinner sk-spinner-double-bounce">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
            </div>

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
                        <input type="text" class="form-control column_filter" placeholder="Vendor Number"
                          aria-label="Admin Theme" aria-describedby="button-addon2" id="col5_filter">
                        <div class="input-group-append" id="vendor_search">
                          <button class="btn btn-primary" type="button" id="button-addon"><i class="fa fa-search"></i>
                            Search</button>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td align="center"><input type="checkbox" class="column_filter invisible" id="col5_smart"
                      checked="checked">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-body">
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

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button id="vendor" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
          </div>
          </div>
        </div>
      </div>
    </div> -->


    <div class="wrapper wrapper-content p-0 animated fadeInRight">
      <div class="row d-none">
        <div class="col-lg-12 ">
          <div class="card mx-auto white-bg">
            <div class="col-5">
              <div class="form-group row gate_number ">
                <div class="col-8">
                  <h3 id="" class="my-1">Supplier Number</h3>
                </div>
              </div>
            </div>
            <div class="col-7">
              <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
            </div>
          </div>
        </div>
      </div><br>

      <div class="row">
        <div class="col-sm-3">
          <div class="ibox">
              <div class="ibox-content py-2">
                  <div class="text-center my-2 resize d-flex justify-content-center">
                      <input class="image-minimalize btn btn-primary px-4 mx-2" type="file" accept="application/pdf" id="preview_img" style="z-index: 1;"><br>
                      <button type="button" id="" data-toggle="modal" data-target="#myModal20" class="btn btn-primary Vendor_Search d-none"></button>
                      <!-- Add your checkbox here -->
                   
                  </div>
              </div>
          </div>
      </div>
      
        <div class="col-sm-9">
          <div class="ibox ">
            <div class="py-0" id="loader1">
              <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
              </div>
              <div class="ibox-content py-3">
                
                <!-- <h3 id="" class="">Supplier Number</h3> -->
                <div class="invisible row  my-1 py-1 justify-content-around" id="vendor_select_div">
                  <div class="input-group col-2 p-0">
                    <!-- <label class="col-3 col-form-label p-0 mr-2">Vendor code</label>  -->
                    <input type="text" class="form-control input_size fetch_check" required="" placeholder="Vendor code"
                      aria-label="Admin Theme" aria-describedby="button-addon2" id="vendor_code" readonly >
                    <div class=" input-group-append">
                      <button type="button" id="VendorSearch" class="btn btn-primary">
                        Select
                      </button>
                    </div>
                  </div>
                  <!-- <div class=""> -->
                  <div class="col-2 p-0">
                    <input type="text"
                      class="form-control input_size fetch_check align-self-center font-weight-bold pr-0" required=""
                      placeholder="Vendor Name" aria-label="Admin Theme" aria-describedby="button-addon2" readonly=""
                      id="vendor_name">
                  </div>

                  
                  <div class="col-2 p-0">
                    <select  name="dateformate" id="date_formate" class="form-control">
                      <option value="" disabled selected>Select date format</option>

                      <!-- <option value=""></option> -->
                      
                    </select>
                  </div>


                  <div class="col-2 p-0 d-flex justify-content-center">
                    <button type="button" id="" data-toggle="modal" data-target="#copy_from_modal"
                    class="btn btn-primary">Copy From</button>
                  </div>

                  <div class="col-2 p-0" style="display: flex;align-items: center;">
                  
                      <input class="form-check-input" type="checkbox" id="override_taxable_value">
                      <label class="form-check-label" for="override_taxable_value">
                        WorkAround On DuOM
                      </label>
                  </div>


                  

                  

                  

                  <!-- <div class="col-4 p-0">
                    <input type="text"
                      class="form-control input_size fetch_check align-self-center font-weight-bold pr-0" required=""
                      placeholder="Template Number" aria-label="Admin Theme" aria-describedby="button-addon2"
                      readonly="" id="template_number">
                  </div> -->
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-md-9 docs-buttons d-flex justify-content-center">
          <!-- <h3>Toolbar:</h3> -->
          <div class="btn-group">
            <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="move" title="Move">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;setDragMode&quot;, &quot;move&quot;)">
                <span class="fa fa-arrows-alt"></span>
              </span>
            </button>
            <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;setDragMode&quot;, &quot;crop&quot;)">
                <i class="fa fa-crop"></i>
              </span>
            </button>
          </div>



          <div class=" btn-group">
            <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="" id="ui-id-2">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;zoom&quot;, 0.1)">
                <span class="fa fa-search-plus"></span>
              </span>
            </button>
            <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="" id="ui-id-1">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;zoom&quot;, -0.1)">
                <span class="fa fa-search-minus"></span>
              </span>
            </button>
          </div>

          <div class="btn-group">
            <button type="button" id="cropper_box" class="btn btn-primary d-none" data-method="crop" title="Crop">
              <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.crop()">
                <span class="fa fa-check"></span>
              </span>
            </button>
            <button type="button" class="btn btn-primary" id="fetch_value">
              <!-- <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.crop()">
              </span> -->
              <span class="fa fa-check"></span>
            </button>
            <button type="button" class="btn btn-primary" data-method="clear" title="Clear">
              <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.clear()">
                <span class="fa fa-times"></span>
              </span>
            </button>
          </div>

          <div class="btn-group d-none">
            <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate Left">
              <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(-45)">
                <span class="fa fa-undo-alt"></span>
              </span>
            </button>
            <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate Right">
              <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(45)">
                <span class="fa fa-redo-alt"></span>
              </span>
            </button>
          </div>

          <div class="btn-group btn-group-crop d-none">
            <button type="button" class="btn btn-success" data-method="getCroppedCanvas"
              data-option="{ &quot;maxWidth&quot;: 4096, &quot;maxHeight&quot;: 4096 }">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;getCroppedCanvas&quot;, { maxWidth: 4096, maxHeight: 4096 })">
                Get Cropped Canvas
              </span>
            </button>
            <!-- <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 160, &quot;height&quot;: 90 }">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;getCroppedCanvas&quot;, { width: 160, height: 90 })">
                160×90
              </span>
            </button>
            <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 320, &quot;height&quot;: 180 }">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;getCroppedCanvas&quot;, { width: 320, height: 180 })">
                320×180
              </span>
            </button> -->
          </div>


          <div class="btn-group">
            <button type="button" id="cross" class="btn btn-primary invisible" data-method="clear" title="Clear">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;clear&quot;)">
                <span class="fa fa-times"></span>
              </span>
            </button>
          </div>


          <!-- Show the cropped image in modal -->
          <div class="modal fade docs-cropped" id="getCroppedCanvasModal" aria-hidden="true"
            aria-labelledby="getCroppedCanvasTitle" role="dialog" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="getCroppedCanvasTitle">Cropped</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">Ã—</span>
                  </button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <a class="btn btn-primary" id="download" href="javascript:void(0);"
                    download="cropped.jpg">Download</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ibox-content sk-loading" id="loader">
        <div class="sk-spinner sk-spinner-double-bounce" id="spin1">
            <div class="sk-double-bounce1"></div>
            <div class="sk-double-bounce2"></div>
          </div>

        <div class="row">
          <div class="col-lg-8">
            <div class="ibox ">
              <div class="ibox-content">
                <div class="row">
                  <div class="col-sm-12">
                    <!-- <form role="form"> -->

                    <div class="img-container">
                      <!-- <img id="image" src="images/JSW.jpg" alt="Picture"> -->
                      <!-- <img src="images/JSW.jpg" height="200" alt="Image preview..."> -->

                      <img id="image" src="">
                    </div>

                    <!-- </form> -->
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="ibox ">
              <div class="ibox-content" id="contents">
                <h2>Invoice Label</h2>


                <div class="d-flex flex-column" id="assign_label">
                  <div id="require_feilds">
                    <h3 class="m-0"><label class="form-label">Required Labels</label></h3>
                  </div>
                  <div id="header_feilds">
                    <h3 class="m-0 pt-2"><label class="form-label">Header Labels</label></h3>
                  </div>
                  <div id="details_feilds">
                    <h3 class="m-0 pt-2"><label class="form-label">Details Labels</label></h3>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <button type="button" class="btn btn-lg btn-primary" id="back_invoice">
        Back
      </button>
      <button type="button" class="btn btn-lg btn-primary" data-kt-stepper-action="submit" id="submit_invoice">
        Submit
      </button>

      <div class="docs-data">
        <div class="input-group input-group-sm d-none">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataX">x</label>
          </span>
          <input type="text" class="form-control" id="dataX" placeholder="Assign label">

          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
        <div class="input-group input-group-sm d-none">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataY">Y</label>
          </span>
          <input type="text" class="form-control" id="dataY" placeholder="y">
          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
        <div class="input-group input-group-sm d-none">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataWidth">Width</label>
          </span>
          <input type="text" class="form-control" id="dataWidth" placeholder="width">
          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
        <div class="input-group input-group-sm d-none ">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataHeight">Height</label>
          </span>
          <input type="text" class="form-control" id="dataHeight" placeholder="height">
          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
      </div>
    </div>



<br>
    <br><br>
    <!--% including footer %-->
    <jsp:include page="../../../Basic/template/footer.jsp" />

  </div>



  <script src="../../../../custom/js/breadcrumb.js"></script>



  <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
  <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>


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


  <script src="../../../../cdn/js/dataTables.select.min.js"></script>


  <!-- breadcrumb JS -->
  <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->

  <script src="../../../Basic/js/updatestatus.js?v=" + $.getCurrentVersion()></script>





  <script>
    // let all_labels = [];

    // let token = JSON.parse(localStorage.getItem("token"))
    var test = $.test();
    let label_count = 1;

    let all_labels = []
    $.ajax({
      url: `${[test[0].url]}/label/labels`,
      async: false,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: function (data, status, xhr) {
        all_labels.push(...data.data)
      },
    })


    all_labels.map(
      value => {

        if (value.label_required) {

          // <div class="w-100 w-md-200px new_labe mr-1">
          //   <select  id="label_${label_count}"  class="form-select new_labels h-100 w-100 pl-2" 
          //   data-placeholder="Select a variation">    
          //   <option>${value.label_name}</option>
          //   <optgroup label="Header" id="header_label_${label_count}" class="header_label_${label_count}"></optgroup>
          //     <optgroup label="Details" id="details_label_${label_count}" class="details_label_${label_count}"></optgroup>
          //     <optgroup label="Letter Head" id="laterhead_label_${label_count}" class="laterhead_label_${label_count}"></optgroup>   
          //     </select>
          //     </div>

          // delete button 
          //   <button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-outline-danger delete ml-1">X
          // <!--begin::Svg Icon | path: icons/duotune/arrows/arr088.svg-->
          // <!--<span class="svg-icon svg-icon-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          //     xmlns="http://www.w3.org/2000/svg">
          //     <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1"
          //       transform="rotate(-45 7.05025 15.5356)" fill="currentColor"></rect>
          //     <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)"
          //     fill="currentColor"></rect>
          //     </svg></span>-->
          //     <!--end::Svg Icon--> </button>
          $("#require_feilds").append(`<div class="box    mt-2" id="count_siblings_${label_count}">
          <input type="text" value="${(value.label_name)}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation" style="font-weight:bold;">
              <input type="text" class="label form-control mw-100 w-200px variation variation1 red_border_error" >
              <input type="text"  class="form-control d-none startX mandatory" placeholder="startX">
              <input type="text"  class="form-control d-none startY" placeholder="startY">
              <input type="text"  class="form-control d-none endX" placeholder="endX">
              <input type="text"  class="form-control d-none endY" placeholder="endY">
    
              
            </div>`)
          label_count++;

        } else if (value.label_type == "Header") {
          $("#header_feilds").append(`<div class="box  mt-2" id="count_siblings_${label_count}">
              <input type="text" value="${(value.label_name)}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
                  <input type="text" class="label form-control mw-100 w-200px variation variation1" >
                  <input type="text"  class="form-control d-none startX" placeholder="startX">
                  <input type="text"  class="form-control d-none startY" placeholder="startY">
                  <input type="text"  class="form-control d-none endX" placeholder="endX">
                  <input type="text"  class="form-control d-none endY" placeholder="endY">
        
                  
                </div>`)
          label_count++;

        } else if (value.label_type == "Details") {
          $("#details_feilds").append(`<div class="box  mt-2" id="count_siblings_${label_count}">
              <input type="text" value="${(value.label_name)}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
                  <input type="text" class="label form-control mw-100 w-200px variation variation1" >
                  <input type="text"  class="form-control d-none startX" placeholder="startX">
                  <input type="text"  class="form-control d-none startY" placeholder="startY">
                  <input type="text"  class="form-control d-none endX" placeholder="endX">
                  <input type="text"  class="form-control d-none endY" placeholder="endY">
        
                  
                </div>`)
          label_count++;

        }
        // all_labels.map(value => {
        //   if (value.label_type == "Header") {
        //     $(`#header_label_${label_count}`).append(`<option disabled name="${value.label_name}" value="${value.id}">${value.label_name}</option>`)

        //       }else if(value.label_type == "Details"){
        //         $(`#details_label_${label_count}`).append(`<option disabled name="${value.label_name}" value="${value.id}">${value.label_name}</option>`)

        //       }else if(value.label_type=="Letter Head"){
        //         $(`#laterhead_label_${label_count}`).append(`<option disabled name="${value.label_name}"  value="${value.id}">${value.label_name}</option>`)


        //     }
        // })
        // if(value.label_required){
        //       $(".mandatory").append(`<option  value="${value.id}">${value.label_name}</option>`)
        //       if (value.label_required) {
        //         $(`option[value="${value.id}"]`).css("font-weight", "bold").text(`${value.label_name}`+ " *");
        //       }

        //     }else if (value.label_type == "Header") {
        //       $(".header_label").append(`<option  value="${value.id}">${value.label_name}</option>`)
        //       if (value.label_required) {
        //         $(`option[value="${value.id}"]`).css("font-weight", "bold").html(`${value.label_name}`+ " *");
        //       }
        //     }
        //     else if(value.label_type == "Details"){
        //     $(".details_label").append(`<option  value="${value.id}">${value.label_name}</option>`)
        //     if (value.label_required) {
        //       $(`option[value="${value.id}"]`).css("font-weight", "bold").text(`${value.label_name}`+ " *");
        //     }

        //     }
      })
      
      $("#loader").removeClass("sk-loading");
      $("#loader").removeClass("ibox-content");
      $(".sk-spinner").addClass("d-none");
  </script>



  <!-- cropper  -->



  <script>
    //     $(document).ready(function() {
    //     $('.new_labels').select2();
    // });
    $("#contents").css("height", $(".img-container")[0].offsetHeight + 50)

    const thumbnail = JSON.parse(sessionStorage.getItem('preview_invoice'));
    const previewImage = document.getElementById('image');


    if (thumbnail) {
      previewImage.setAttribute('src', thumbnail);

      setTimeout(() => {
        $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
      }, 500);
      const flag = JSON.parse(sessionStorage.getItem('preview_invoice'));
      console.log(flag);

      if (flag != null) {
          $("#vendor_select_div").removeClass("invisible");
      }
      window.sessionStorage.removeItem('preview_invoice');

    } else {
      previewImage.setAttribute('src', '');
    }
  </script>

  <script src="../../../../custom/cropper/js/cropper.js"></script>
  <script src="../../../../custom/cropper/js/extra.js"></script>
  <script src="../../../../custom/cropper/js/main.js"></script>
  <script src="../js/training.js?v=" + $.getCurrentVersion()></script>



</body>

</html>