<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Update Nextnumber</title>

  <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../../static/css/style.css" rel="stylesheet">


  <script src="../../../../static/js/jquery-2.1.1.js"></script>
  <script src="../../../../static/js/bootstrap.js"></script>
  

  <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
  <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">
  

   <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
   <link href="../../../../custom/css/filter_multi_select.css" rel="stylesheet">
 


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
                if(item.id == 13){
                    menuroles = item.assignroles.map((value)=> value.rolecode)
                }
        
                }
            )
            let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            
            //  if(name.includes("Admin"))
            if(returned_arr.flat(Infinity).includes(true))
            {
        
            }
            else{
            window.location.href = "../../Basic/template/404.jsp";
            }
        }
        else{
            window.location.href = "../../Basic/template/404.jsp";
        }

   </script>

    <div id="wrapper">
        
        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />
        
        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="modal inmodal fade" id="myModal6" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"
                        data-dismiss="modal"><span
                            aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button> <br><br>
                    <table cellspacing="0" cellpadding="4">
                        <tbody>
                            <tr id="filter_col2" data-column="1" class=" ">
                                <td class=" col-12 ">
                                    <div class="d-flex ">
                                        <div class="input-group ">
                                            <input type="text"
                                                class="form-control column_filter"
                                                placeholder="Company"
                                                aria-label="Admin Theme"
                                                aria-describedby="button-addon2"
                                                id="col2_filter">
                                            <div class="input-group-append"
                                                id="searchrecord">
                                                <button class="btn btn-primary"
                                                    type="button"
                                                    id="button-addon2"><i
                                                        class="fa fa-search"></i>
                                                    Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
    
                                <td align="center"><input type="checkbox"
                                        class="column_filter invisible"
                                        id="col2_smart" checked="checked">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
    
                <div class="modal-body">
                    <table id="Datable"
                        class="display responsive nowrap text-left "
                        style="width: 100%">
                        <thead>
                            <th class="text-left" data-hide="phone">Company
                                </th>
                            <th class="text-left" data-hide="phone">
                                DESCRIPTION</th>
                        </thead>
                        <tbody id="tbodyy">
                        </tbody>
                    </table>
                </div>
    
                <div class="modal-footer">
                    <button type="button" class="btn btn-white"
                        data-dismiss="modal">Close</button>
                    <button id="selectt" type="button" data-dismiss="modal"
                        class="btn btn-primary">Select</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal inmodal fade" id="myModal5" tabindex="-1"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"
                        data-dismiss="modal"><span
                            aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button> <br><br>
                    <table cellspacing="0" cellpadding="4">
                        <tbody>
                            <tr id="filter_col2" data-column="1" class=" ">
                                <td class=" col-12 ">
                                    <div class="d-flex ">
                                        <div class="input-group ">
                                            <input type="text"
                                                class="form-control column_filter"
                                                placeholder="Business Unit"
                                                aria-label="Admin Theme"
                                                aria-describedby="button-addon2"
                                                id="col1_filter">
                                            <div class="input-group-append"
                                                id="search">
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

                                <td align="center"><input type="checkbox"
                                        class="column_filter invisible"
                                        id="col1_smart" checked="checked">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-body">
                    <table id="Dtable"
                        class="display responsive nowrap text-left "
                        style="width: 100%">
                        <thead>
                            <th class="text-left" data-hide="phone">Business
                                Number</th>
                            <th class="text-left" data-hide="phone">
                                DESCRIPTION</th>

                        </thead>
                        <tbody id="tbody">
                        </tbody>
                    </table>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-white"
                        data-dismiss="modal">Close</button>
                    <button id="select" type="button" data-dismiss="modal"
                        class="btn btn-primary">Select</button>
                </div>
            </div>
        </div>
    </div>

    <div class="wrapper wrapper-content animated fadeInRight ecommerce">
      <div class="row">
        <div class="col-12">
          <div class="ibox ">
            <div class="ibox-content py-3">
              <!-- <div class=""> -->
                <!-- <div> -->
                  <form class="contact-form" id="form1">
                    <div class="panel-body">
                      <div class="controls">
                        <div class="row">
                          <div class="col-1"></div>
                          <div class="col-md-4">
                            <label> Company*</label>
                            <div class="input-group">
                                <input type="text" class="form-control" required=""
                                    placeholder="Company" aria-label="Admin Theme"
                                    aria-describedby="button-addon2" readonly id="form6Example10">
                                <div class="input-group-append">
                                    <button type="button" id="modeldata" class="btn btn-primary"
                                        data-toggle="modal" data-target="#myModal6">
                                        Select
                                    </button>
                                </div>
                            </div><br>
                          

                            <label>Business Unit*</label>
                            <div class="input-group">
                                <input type="text" class="form-control" required=""
                                    placeholder="Business Unit" aria-label="Admin Theme"
                                    aria-describedby="button-addon2" readonly id="form6Example8">
                                <div class="input-group-append">
                                    <button type="button" id="model" class="btn btn-primary"
                                        data-toggle="modal" data-target="#myModal5">
                                        Select
                                    </button>
                                </div>
                            </div><br>
                            <div class="form-group">
                                <label>Gate Id*</label>
                              <input type="text" required="" maxlength="10" id="gateId" placeholder="Gate Id" readonly
                                class="form-control">
                            </div>
                        
                            <div class="form-group"><label>Process*</label> <input type="text" required=""
                                maxlength="10" id="input-text4" placeholder="Process" class="form-control">
                            </div>
                            <br>
                          </div>
                          <div class="col-2"></div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label>Year*</label>
                              <input type="text" required="" maxlength="10" id="input-text5" placeholder="Year"
                                class="form-control" disabled>
                            </div>
                            <div class="form-group">
                              <label>Length*</label>
                              <input type="text" required="" maxlength="10" id="input-text8" placeholder="Length"
                                class="form-control">
                            </div>

                            

                            <label>Status*</label>
                            <div class="form-group custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input" id="toggle-switch">
                              <label class="custom-control-label" for="toggle-switch" id="toggle-label">Inactive</label>
                            </div>
                            <br>
                          </div>
                        </div>
                        <div class="row">
                            <div class="col-1"></div>
                            <div class="col-4 d-flex justify-content-start">
                                <button class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                <button type="submit" class="btn add btn-primary pt-2 m-1">Save Changes</button>
                              </div>
                        </div>
                      </div>
                  </form>
                <!-- </div> -->
              </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>





  <!--% including footer %-->
  <jsp:include page="../../../Basic/template/footer.jsp" />

  </div>

  <script src="../../../../static/js/popper.min.js"></script>
  <script src="../../../../static/js/bootstrap.js"></script>
  <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
  <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

  <!-- Custom and plugin javascript -->
  <script src="../../../../static/js/inspinia.js"></script>
  <script src="../../../../static/js/plugins/pace/pace.min.js"></script>
  <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

    <!-- updateNextNumber  JS -->
    
    <!-- businessmodal JS -->
    <script src="../../../UserMaster/js/businessmodal.js?v=" + $.getCurrentVersion()></script>
    
    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>
    

    <script src="../../js/globalConfig.js"></script>

    <script src="../js/updatenextNumber.js?v=" + $.getCurrentVersion()></script>

      <!-- Sweetalert JS -->
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>


   <!-- jQuery UI -->
   <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
   <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
   <script src="../../../../cdn/js/dataTables.select.min.js"></script>

</body>

</html>