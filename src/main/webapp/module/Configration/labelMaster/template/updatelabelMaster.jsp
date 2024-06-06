<!DOCTYPE html>
<html>
    
    <head>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Update LabelMaster</title>
        <jsp:include page="../../../Basic/template/favicon.jsp" />
        <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
        <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
        
        <link href="../../../../static/css/animate.css" rel="stylesheet">
        <link href="../../../../static/css/style.css" rel="stylesheet">

        <link rel="stylesheet" href="../../nextNumber/css/addnextNumber.css">


        
        <script src="../../../../static/js/jquery-2.1.1.js"></script>
        <script src="../../../../static/js/bootstrap.js"></script>
      
      
        <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
        <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
        <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">
        
        <link href="../../../../custom/css/filter_multi_select.css" rel="stylesheet">
      
         <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

          <!-- Sweetalert JS -->
       <script src="../../../../cdn/js/sweetalert2.js"></script>
       <script src="../../../../cdn/js/sweetalert.min.js"></script>
       
    

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
           window.location.href = "../../../Basic/template/404.jsp";
        }
    }
    else{
        window.location.href = "../../../Basic/template/404.jsp";
    }

</script>

    <div id="wrapper">
       <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp"/>
        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp"/>

        <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog ">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span
                              aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <br><br>
                      <table cellspacing="0" cellpadding="4">
                          <tbody>
                              <tr id="filter_col2" data-column="1" class=" ">
                                  <td class=" col-12 ">
                                      <div class="d-flex ">
                                          <div class="input-group ">
                                              <input type="text" class="form-control column_filter" placeholder="Tags"
                                                  aria-label="Admin Theme" aria-describedby="button-addon2"
                                                  id="col1_filter">
                                              <div class="input-group-append" id="search">
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
                      <table id="Dtable" class="display responsive nowrap text-left " style="width: 100%">
                          <thead>
                              <th class="text-left" data-hide="phone">id

                              </th>
                              <th class="text-left" data-hide="phone">Label

                              </th>
                              <th class="text-left" data-hide="phone">
                                  DESCRIPTION</th>

                          </thead>
                          <tbody id="tbody">
                          </tbody>
                      </table>
                  </div>

                  <div class="modal-footer">
                      <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                      <button id="select" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                  </div>
              </div>
          </div>
      </div>


        <div class="wrapper wrapper-content ">
            <div class="row">
              <div class="col-lg-12 ">
                <div class="card  mx-auto p-4 white-bg">
                  <div class="card-body ">
                    <div class="container ">
                      <form class="contact-form" id="form1">
                        <div class="controls">
                          <div class="row">
                            <div class="col-1"></div>
                            <div class="col-md-4">
                              <!-- <div class="form-group"><label>Label ID*</label> <input type="text" placeholder="Label ID" class="form-control" required="" maxlength="12 " id="input-text1"></div> -->
                              <div class="form-group"><label>Label Name*</label><input type="text" placeholder="Label Name" class="form-control" required="" id="input-text2"></div>
                              
                             
                              <!-- <option>Demo</option> -->
                              <label>Tag Name*</label>
                              <div class="input-group">
                                  <input type="text" class="form-control" required=""
                                      placeholder="Tag Name" aria-label="Admin Theme"
                                      aria-describedby="button-addon2" readonly id="form6Example8">
                                  <div class="input-group-append">
                                      <button type="button" id="model" class="btn btn-primary"
                                          data-toggle="modal" data-target="#myModal5">
                                          Select
                                      </button>
                                  </div>
                                  
                                  
                                  
                                </div>
                                
                              </div>
                              <div class="col-2"></div>
                              <div class="col-md-4">
                                <div class="form-group"><label>GRN Column*</label> <select id="grn_column" class="form-group grn_col h-100 w-100 pl-2" name="new_labels"
                                  data-placeholder="Select a variation">
                                </select></div>
                                <div class="form-group"><label>Label Type*</label> <select id="label_type" class="form-control py-2 h-100 w-100 pl-2" name="new_labels">
                                  <option>Header</option>
                                  <option>Details</option>
                                  <option value="LH">Letter Head</option>
                                </select></div>
                                <div class="form-group"><label>Label Required*</label>&nbsp;&nbsp;&nbsp;<input type="checkbox" placeholder="Label Required"  id="input-text3"></div>


                            </div>
                            
                            
                            <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                              <button  type="button" class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                              <button type="submit" class="btn add btn-primary pt-2 m-1">Saves Changes</button>
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
       <!--% including footer %-->
       <jsp:include page="../../../Basic/template/footer.jsp"/>
    </div>
        
    <!-- Mainly scripts -->
    <script src="../../../Configration/js/globalConfig.js"></script>
       <script src="../../../../static/js/popper.min.js"></script>
       <script src="../../../../static/js/bootstrap.js"></script>
       <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
       <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
   
       <!-- Custom and plugin javascript -->
       <script src="../../../../static/js/inspinia.js"></script>
       <script src="../../../../static/js/plugins/pace/pace.min.js"></script>
       <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

       <script src="../js/businessmodal.js?v=" + $.getCurrentVersion()></script>




       <!-- updateStatus JS -->
       <script src="../js/updatelabelMaster.js?v=" + $.getCurrentVersion()></script>


       <!-- breadcrumb JS -->
       <script src="../../../../custom/js/breadcrumb.js"></script>
       
      

      <!-- jQuery UI -->
      <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
      <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
      <script src="../../../../cdn/js/dataTables.select.min.js"></script>

</body>

</html>
