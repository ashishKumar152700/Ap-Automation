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

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">

    <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

    <link rel="stylesheet" href="../css/addVisitor.css">


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

    <link rel="stylesheet" href="../../../../cdn/css/uppy.min.css">
    <script src="../../../Configration/js/globalConfig.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>



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

    #contents{
      overflow-y: scroll;
    }
    .btn{
      z-index: 0 !important;
    }
    div.dataTables_info span.select-item {
            display: none !important;
    }

    .uppy-Dashboard-poweredBy{
      display: none !important;
    }
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
               if(item.id == 38){
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

      


        <div class="modal inmodal fade" id="myModal15" tabindex="2"
                role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header"><h2><strong>&nbsp;&nbsp;&nbsp; Additional Documents</strong></h2>
                        </div>
                        <div class="modal-body d-flex justify-content-center align-items-center">

                          <div id="drag-drop-area"></div>

                          </div>

                        <div class="modal-footer m-2">
                            <!-- <button type="button" class="btn btn-primary"
                                data-dismiss="modal">Skip</button> -->
                            <button type="button" id="skip" class="btn btn-primary"
                                data-dismiss="modal">Skip</button>
                        </div>
                    </div>
                            </div>
                          </div>


        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content  ">

            <!--% Modal for Document company %-->
    <div class="modal inmodal fade" id="myModal7" tabindex="2" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
             <h2>visitor Gate Pass</h2>
            </div>
            <div class="modal-body" >
              

              <div class="d-flex justify-content-center" >
                
                <div class="">
                    <div class="row border justify-content-center">
                        <h2>visitor Gate Pass</h2>
                    </div><br>
                    <div class="row border py-1">
                        <div class="col-6 ">
                            <div id="gateNumber" class="font-weight-bold">Gate</div>
                            <div class="invisible">q</div>
                            <div class="invisible">q</div>
                            <div> Visitor Name</div>
                            <span id="modal_first_name" class="font-weight-bold"></span>
                            <span id="modal_last_name" class="font-weight-bold"></span>
                        </div>
                        <div class="col-6 d-flex align-item-center justify-content-center">
                           <canvas class="canvasElement" id="canvasElement" width="75%" height="100%" ></canvas> 
                        </div>
    
                    </div><br>
                    <div class="row border py-1">
                        <!-- <div class="col-3"></div> -->
                        <div class="col-5">
                            <!-- <div>Name</div> -->
                            <!-- <div>Last Name:</div> -->
                            <div>Mobile Number</div>
                            <div>Email</div>
                            <div>Address</div>
                            <div>Person to Meet</div>
                            <div>Request</div>
                            <div>Purpose</div>
                            <div>Vehicle Number</div>
                            <div>Date and Time</div>
                            <div>Out Time</div>
    
                        </div>
                        <!-- <div class="col-1 border"></div> -->
                        <div class="col-7">
                            <!-- <div id="lastName">qwerty</div> -->
                            <div id="modal_mobile"></div>
                            <div id="modal_email"></div>
                            <div id="modal_address"></div>
                            <div id="modal_person_to_meet"></div>
                            <div id="modal_request"></div>
                            <div id="modal_purpose"></div>
                            <div id="modal_in_time"></div>
                            <div id="outTime"></div>
                            <div id="modal_vehicle_nbr"></div>
                        </div>
                    </div>
                    <!-- <button type="submit">Download PDF</button> -->
                  </div>
            </div>
            </div>
  
            <div class="modal-footer m-2">
              <button type="button" class="btn btn-white" data-dismiss="modal">Cancel</button>
              <!-- <button class="btn btn-primary pt-2 m-1" id="confirm" data-toggle="modal" data-target="#myModal7">Confirm</button> -->
              <button class="btn btn-primary pt-2 m-1" id="print_tab" type="button" >Print</button>
            </div>
            
          </div>
        </div>
      </div>


            
            <div class="row">
                <div class="col-lg-12 ">
                <div class="card mx-auto white-bg">
                            <div class="col-5">
                                <div class="form-group row gate_number ">
                                    <div class="col-8"><h3 id="gate_number" class="my-1"></h3>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-7">
                                <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
                            </div> -->
                    </div>
                </div>
            </div><br>

            

            
            <div class="container-fluid  d-flex my-1 bg-white p-0">

                
    
    
                
                <div class=" col-12" style="z-index: 1; width: 1100px;">
                    <div class="container p-0">
                        <div class="row" >
                           
                            <div class="col-12">
                                <div class="mx-auto white-bg">
                                    <div class="card-body">
                                        <div class="container ">
            
                                            <form class="contact-form" id="form">
                                                <div class="controls">
                                                    <div class="row" >
                                                      <div class="col-1"></div>
                                                     
                                                      
                                                        <div class="col-md-4">
                                                            <!-- <div class="form-group row"><label class="col-3 col-form-label">Invoice No.</label>
                                                                <div class="col-9"><input type="text" class="form-control input_size fetch_check" required="" id="invoice_no">
                                                                </div>
                                                            </div> -->
                                                            <div class="form-group"><label>First Name*</label> <input type="text" id="first_name"
                                                                    required="" maxlength="25"
                                                                    placeholder="Enter First Name" class="form-control fetch_check"></div>
                                                                    <div class="form-group"><label>Person to meet*</label> <input type="text"
                                                                      required="" maxlength="25" id="person_to_meet" readonly
                                                                      placeholder="Enter Person name" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Mobile No.*</label> <input type="text"
                                                                    required="" maxlength="20" id="mobile"
                                                                    placeholder="Enter Mobile Number" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Email*</label> <input type="text"
                                                                    required=""  id="email"
                                                                    placeholder="Enter Email" class="form-control fetch_check"></div>
                                                            <div class="form-group"><label>Vehicle Number*</label> <input
                                                                    type="text" placeholder="Enter Vehicle Number"
                                                                    class="form-control fetch_check" required="" maxlength="20"
                                                                    id="vehicle_nbr"></div>
                                                         
                                                          
                                                                   
            
                                                                   
                                                        </div>
                                                       <div class="col-2"></div>
                                                        <div class="col-md-4">
                                                            <!-- <div class="form-group"><label>Gate Number*</label><input type="text"
                                                                    required="" maxlength="20" id="gate_number" readonly
                                                                    placeholder="Gate no" class="form-control"></div> -->
                                                            
                                                            <!-- <div class="form-group"><label>Out Time*</label><input type="time" readonly
                                                                    required="Out Time" maxlength="8" id="out_time" step="1"
                                                                    placeholder="" class="form-control"></div> -->
                                                            <div class="form-group"><label>Last Name*</label> <input type="text" id="last_name"
                                                              required="" maxlength="25"
                                                              placeholder="Enter Last Name" class="form-control fetch_check"></div>
                                                         
                                                            <div class="form-group"><label>Purpose*</label> <input type="text"
                                                                    required="" id="purpose"
                                                                    placeholder="Enter Purpose" class="form-control fetch_check" required="">
                                                            </div>
                                                            <!-- <div class="form-group"><label for="roles">Tag</label> <br> 
                                                                <select name="roles" id="roles"></select>
                                                            </div> -->
                                                            <!-- <div class="form-group"><label>Report Time*</label><input type="text" readonly required="" id="in_time" class="form-control fetch_check"></div> -->
                                                            
                                                            <div class="form-group"><label>Request*</label> <input type="text" 
                                                            required=""  id="request"
                                                            placeholder="Enter Request" class="form-control fetch_check po_number"></div>

                                                            <div class="form-group"><label>Address*</label> <input type="text" 
                                                                required="" maxlength="10" id="address"
                                                                placeholder="Enter address" class="form-control fetch_check vendor_code"></div>


                                                                    <input type="button" class="add_info btn btn-primary pt-2 m-1 d-none" data-toggle="modal" data-target="#myModal11" id="modeldata" value="Additional Info">
                                                                    <input type="button" class="add_info btn btn-primary pt-2 m-1 d-none" data-toggle="modal" data-target="#myModal15" id="modalCall" value="Additional Documents">
                                                            
            
                                                        </div>
                                                        <div class="col-1"></div>
                                                      </div>
                                                      <div class="my-3 offset-1">
                                                          <button type="button" class="btn btn-outline-danger pt-2 m-1" id="cancel">Back</button>
                                                          <!-- <button type="button" class="btn btn-primary pt-2 m-1" id="confirm" >SAVE</button> -->
                                                          <button class="btn btn-primary pt-2 m-1" type="button" id="confirm" >SAVE</button>
                                                          <!-- <button class="btn btn-primary pt-2 m-1" type="button" id="confirm">SAVE</button> -->

                                                          <!-- <button class="btn btn-primary pt-2 m-1" id="print_tab" type="button" >Print</button> -->

                                                          <!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal7">Open Modal</button> -->
                                                          <!-- <button type="submit" class="btn add btn-primary pt-2 m-1">Add</button> -->
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
                <!-- <div class="handler  bg-white "></div>
                <div class=" bg-body  col-5 " id="hide" style="z-index: 1; display: block;">
                    <div class="" id="loader">
                        <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin1">
                            <div class="sk-double-bounce1"></div>
                            <div class="sk-double-bounce2"></div>
                    </div>
                    <div class="container-fluid h-100 p-0">
                      <div class="row">
                        <div class="col-11 mt-4">
                          <video id="videoElement" width="100%" height="100%" autoplay></video>
                        </div>
                      </div>
                      <div class="row">
                        <h4 class="col-6">Preview</h4>
                        <button type="button" class="btn btn-primary" id="captureButton">Capture Photo</button>
                        <div class="col-6">
                          <img id="capturedImage"  width="75%" height="100%" style="display: none;">
                        </div>
                      </div> 
                       
                    </div>
                    </div>
                </div> -->

            </div>
        </div>
        <br>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    
    </div>



<script src="../js/updateVisitor.js?v=" + $.getCurrentVersion()></script>
    <script src="../../../../custom/js/breadcrumb.js"></script>

    <script src="../../../../cdn/js/uppy.min.js"></script>


    <!-- <script src="../js/addVisitor.js"></script> -->
    <!-- <script src="../js/gateocr.js"></script> -->

    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../../cdn/js/dataTables.select.min.js"></script>
  

    <!-- addGate JS -->

 

</body>

</html>