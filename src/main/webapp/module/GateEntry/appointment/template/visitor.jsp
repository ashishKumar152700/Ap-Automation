<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Visitor Gate Entry</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">


    <!-- <link rel="stylesheet" href="../../statusMaster/css/status.css"> -->


    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">
    <link rel="stylesheet" href="../css/visitor.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>
    <link rel="stylesheet" href="../css/visitor.css">

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

    <script src="../../../../cdn/js/sweetalert2.js"></script>




</head>

<body>

    <script>
        let sessionString = localStorage.getItem("userrole")

        let name = JSON.parse(sessionString);

        if(name != null)
        {
            if(name.includes("STORE"))
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

            <div class="row">
                <div class="col-sm-8">
                    <div class="ibox ">
                        <div class="ibox-content py-3">
                            <table cellspacing="0" cellpadding="4">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
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
                                        
                                        <td align="center"><input type="checkbox" class="column_filter invisible"
                                                id="col1_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-2">
                            <div class="text-center my-2 d-flex justify-content-around">
                                <button id="deleteAll" class="btn btn-primary">Delete Selected </button>
                                <a class="btn btn-primary" href="addVisitor.jsp"><i class="fa fa-plus"> </i> Add
                                   Visitor</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row ">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content">
                            <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">
                                <thead>
                                    <th class="text-left" data-hide="phone"><input type="checkbox" class="btn btn-primary" id="select_all" ></th>
                                    <th class="text-left" data-hide="phone">ID</th>
                                    <!-- <th class="text-left" data-hide="phone">Label Id</th> -->
                                    <th class="text-left" data-hide="phone">Gate Number </th>
                                    <th class="text-left" data-hide="phone">First name</th>
                                    <th class="text-left" data-hide="phone">Vehicle Number</th>
                                    <th class="text-left" data-hide="phone">Report time</th>
                                    <th class="text-left" data-hide="phone">Out time</th>
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                </thead>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">

                            <div class="row">
                                <div class="col-lg-12 ">
                                <div class="white-bg d-flex justify-content-between mx-4">
                                            <!-- <div class=""> -->
                                                <h2 class="align-self-start">Visitor Gate Entry</h2>
                                                <!-- <div class="d-flex justify-content-end"> -->
                                                  <div class="breadcrumbs flat mt-2 align-self-end" id="bread">
                                                    <a class="stats" id="gate-in">GATE-IN</a>
                                                    <a class="stats" id="gate-out">GATE-OUT</a>
                                              
                                                  <!-- </div> -->
                                              </div>
                                                
                                            <!-- </div> -->
                                    </div>
                                </div>
                            </div>
                           
                 
                        </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-12 ">
                                          <div class="card  mx-auto p-4 white-bg">
                                            <div class="card-body ">
                                              <div class="container ">
                                                <form class="contact-form" id="form">
                                                  <div class="controls">
                                                    <div class="row">
                                                          
                                                        <div class="col-md-6">
                                                            <!-- <div class="form-group row"><label class="col-3 col-form-label">Invoice No.</label>
                                                                <div class="col-9"><input type="text" class="form-control input_size fetch_check" required="" id="invoice_no">
                                                                </div>
                                                            </div> -->
                                                            <div class="form-group"><label>First Name*</label> <input readonly type="text" id="first_name"
                                                                    required="" maxlength="25"
                                                                    placeholder="Enter First Name" class="form-control fetch_check"></div>
                                                            
                                                                    <div class="form-group"><label>Person to meet*</label> <input readonly type="text"
                                                                        required="" maxlength="25" id="person_to_meet"
                                                                        placeholder="Enter Person name" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Mobile No.*</label> <input readonly type="text"
                                                                    required="" maxlength="20" id="mobile"
                                                                    placeholder="Enter Mobile Number" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Email*</label> <input readonly type="text"
                                                                    required="" maxlength="10" id="email"
                                                                    placeholder="Enter Email" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Vehicle Number*</label> <input readonly
                                                                    type="text" placeholder="Enter Vehicle Number"
                                                                    class="form-control fetch_check" required="" maxlength="20"
                                                                    id="vehicle_nbr"></div>
                                                                    <div class="form-group"><label>Address*</label> <input readonly type="text" 
                                                                        required="" maxlength="10" id="address"
                                                                        placeholder="Enter address" class="form-control fetch_check vendor_code"></div>

                                                                    
                                                          
                                                                   
            
                                                                   
                                                        </div>
                                                       
                                                        <div class="col-md-6">
                                                            <!-- <div class="form-group"><label>Gate Number*</label><input type="text"
                                                                    required="" maxlength="20" id="gate_number" readonly
                                                                    placeholder="Gate no" class="form-control"></div> -->
                                                            
                                                            <!-- <div class="form-group"><label>Out Time*</label><input type="time" readonly
                                                                    required="Out Time" maxlength="8" id="out_time" step="1"
                                                                    placeholder="" class="form-control"></div> -->
                                                                    <div class="form-group"><label>Last Name*</label> <input readonly type="text" id="last_name"
                                                                        required="" maxlength="25"
                                                                        placeholder="Enter Last Name" class="form-control fetch_check"></div>
                                                          
                                                            <div class="form-group"><label>Purpose*</label> <input readonly type="text"
                                                                    required="" id="purpose"
                                                                    placeholder="Enter Purpose" class="form-control fetch_check" required="">
                                                            </div>
                                                            <!-- <div class="form-group"><label for="roles">Tag</label> <br> 
                                                                <select name="roles" id="roles"></select>
                                                            </div> -->
                                                            <div class="form-group"><label>Report Time*</label><input type="text" readonly required="" id="in_time" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Out Time*</label><input type="text" readonly required="" id="out_time" class="form-control fetch_check"></div>
                                                            
                                                            <div class="form-group"><label>Request*</label> <input readonly type="text" 
                                                            required=""  id="request"
                                                            placeholder="Enter Request" class="form-control fetch_check po_number"></div>
    
                                                           
    
    
                                                                    <input type="button" class="add_info btn btn-primary pt-2 m-1 d-none" data-toggle="modal" data-target="#myModal11" id="modeldata" value="Additional Info">
                                                                    <input type="button" class="add_info btn btn-primary pt-2 m-1 d-none" data-toggle="modal" data-target="#myModal15" id="modalCall" value="Additional Documents">
                                                            
            
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
                                <!-- <div class="modal-body" >
                      
        
                                    <div class="d-flex justify-content-center" >
                                      
                                      <div class="">
                                          <div class="row border justify-content-center">
                                              <h2>visitor Gate Pass</h2>
                                          </div><br>
                                          <div class="row border py-1">
                                              <div class="col-6 ">
                                                  <div class="font-weight-bold">Gate Number</div>
                                                  
                                                  <p id="modal_gate_number"></p>
                                      
                                                  <div> Visitor Name</div>
                                                  <span id="modal_first_name" class="font-weight-bold"></span>
                                                  <span id="modal_last_name" class="font-weight-bold"></span>
                                              </div>
                                              <div class="col-6 d-flex align-item-center justify-content-center">
                                                 <canvas class="canvasElement" id="canvasElement" width="75%" height="100%" ></canvas> 
                                                </div>
                                                
                                              </div><br>
                                              <div class="row border p-3 ">
                                          <table>
                                            <tr>
                                              <th></th>
                                              <th></th>
                                             
                                       
                                            <tr>
                                              <td>Mobile Number :</td>
                                              <td  class="px-5" id="modal_mobile"></td>
                                            <tr>
                      
                                              <td>Email :</td>
                                              <td  class="px-5"id="modal_email"></td>
                                            </tr>
                                              <tr>
                      
                                                <td>Address :</td>
                                                <td  class="px-5"id="modal_address"></td>
                                              </tr>
                                              <tr>
                      
                                                <td>Person to Meet :</td>
                                                <td  class="px-5"id="modal_person_to_meet"></td>
                                              </tr>
                                              <tr>
                                                <td>Request :</td>
                                                
                                                <td class="px-5" id="modal_request"></td>
                                              </tr>
                                              <tr>
                      
                                                <td>Purpose :</td>
                                                <td  class="px-5"id="modal_purpose"></td>
                                              </tr>
                                              <tr>
                      
                                                <td>Vehicle Number :</td>
                                                <td class="px-5" id="modal_vehicle_nbr"></td>
                                              </tr>
                                              <tr>
                      
                                                <td>Date and Time :</td>
                                                <td class="px-5" id="modal_in_time"></td>
                                              </tr>
                                              <tr>
                      
                                          
                                              </tr>
                                              
                                            </tr>
                                            </tr>
                                          </table>
                                        </div><br>
                                        <div class="row border d-flex justify-content-center p-3">
                                          <canvas id="barcode" ></canvas>
                                        </div>
                      
                      
                                        </div>
                                  </div>
                                  </div> -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-white " data-dismiss="modal">Close</button>
                                    </div><br>
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


    <!-- Status JS -->
    
    
    <script src="../../../Configration/js/globalConfig.js"></script>
    <script src="../js/visitor.js?v=" + $.getCurrentVersion()></script>
    

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>

    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>


   


</body>

</html>