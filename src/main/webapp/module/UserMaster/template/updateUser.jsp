<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">


  <title>Updateuser</title>
  <jsp:include page="../../Basic/template/favicon.jsp" />
  <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">


  <link href="../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../static/css/style.css" rel="stylesheet">


  <script src="../../../cdn/js/sweetalert2.js"></script>


  <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../static/css/style.css" rel="stylesheet">

  <link href="../css/updateUser.css" rel="stylesheet">

  <script src="../../../static/js/jquery-2.1.1.js"></script>


  <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">
  <link rel="stylesheet" href="../../../cdn/css/select.dataTables.min.css">
  <script src="../../../cdn/js/jquery.dataTables.min.js"></script>

  <script src="../../../cdn/js/dataTables.responsive.min.js"></script>

  <script src="../../../cdn/js/dataTables.select.min.js"></script>

  <script src="../../../custom/js/filter-multi-select-bundle.min.js"></script>
  <link href="../../../custom/css/filter_multi_select.css" rel="stylesheet">




  <!-- Mainly scripts -->
  <script src="../../../static/js/popper.min.js"></script>
  <script src="../../../static/js/bootstrap.js"></script>
  <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
  <script src="../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

  <!-- Custom and plugin javascript -->
  <script src="../../../static/js/inspinia.js"></script>
  <script src="../../../static/js/plugins/pace/pace.min.js"></script>



  <!-- breadcrumb JS -->

  <!-- sweetalert JS -->
  <script src="../../../cdn/js/sweetalert.min.js"></script>

  <!-- jQuery UI -->
  <script src="../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

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
               if(item.id == 12){
                   menuroles = item.assignroles.map((value)=> value.rolecode)
               }
   
               }
           )
           let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Admin") || name.includes("USER"))
             if(returned_arr.flat(Infinity).includes(true)) {

      }
      else {
        window.location.href = "../../Basic/template/404.jsp";
      }
    }
    else {
      window.location.href = "../../Basic/template/404.jsp";
    }

  </script>

  <div id="wrapper">
    <!--% including header %-->
    <jsp:include page="../../Basic/template/header.jsp" />

    <!--% including breadcrumb %-->
    <jsp:include page="../../Basic/template/breadcrumb.jsp" />

    <div class="modal inmodal fade" id="exampleModalCenter1" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header text-left">
            <div class="form-group row ">
              <!-- <div class="col-1"></div> -->
              <div class="col-12 d-flex justify-content-start flex-column align-item-start">
                <label class="labelling">New Password*</label>
                <div class="input-group">
                  <input type="password" placeholder="New Password" class="form-control pwd" id="pass1" required="">
                  <span class="input-group-btn">
                    <button class="btn btn-default reveal" id="show" type="button"><i
                        class="fa fa-eye-slash"></i></button>
                  </span>
                </div><br>
                <label class="labelling">Confirm Password*</label>
                <div class="input-group">
                  <input type="password" placeholder="Confirm Password" class="form-control pwd1" id="pass2"
                    required="">
                  <span class="input-group-btn">
                    <button class="btn btn-default reveal1" id="show1" type="button"><i
                        class="fa fa-eye-slash"></i></button>
                  </span>
                </div>


                <div id="errorText" class="mt-2"></div>
              </div>
              <!-- <div class="col-1"></div> -->
            </div>

            <button type="button" class="close d-none" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary mb-2" data-dismiss="modal" id="modal_close">Close</button>
            <!-- <button type="button" class="btn btn-primary mb-2" onclick="validatePasswords()" >Save Password</button> -->
            <button type="button" class="btn btn-primary mb-2" id="savePassword">Save Password</button>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper wrapper-content animated fadeInRight ecommerce">
      <div class="" id="loader">
        <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin">
          <div class="sk-double-bounce1"></div>
          <div class="sk-double-bounce2"></div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="ibox ">
              <div class="ibox-content py-3">
                <div class="">
                  <div class="row">
                    <h1 id="input-text11" class="col-10">Full Name</h1>
                    <div class="col-2">
                      <input type="button" class="btn btn-success" id="Change_password" value="Change Password">
                    </div>
                  </div>
                  <div>
                    <!-- <p class="font-bold" id="input-text12">User name</p> -->
                    <p class="font-bold d-inline">User name :
                    <div class="d-inline" id="input-text12"></div>
                    </p>
                  </div><br>
                  <div class="">
                    <!-- <p class="font-bold" id="input-text13">Email</p> -->
                    <p class="font-bold d-inline">Email :
                    <div class="d-inline" id="input-text13"></div>
                    </p>
                  </div>
                </div>
                <div id="content" class="d-none"></div>
                <div class="hr-line-dashed py-0"></div>

                <div class="tabs-container ">
                  <ul class="nav nav-tabs" role="tablist">
                    <li><a class="nav-link active" data-toggle="tab" href="#tab-1">Personal Info. </a></li>
                    <li><a class="nav-link" data-toggle="tab" href="#tab-2">JDE Info.</a></li>
                    <!-- <li><a class="nav-link" data-toggle="tab" href="#tab-3">Role Code</a></li> -->

                  </ul>
                  <div class="tab-content">
                    <div role="tabpanel" id="tab-1" class="tab-pane active">
                      <form class="contact-form" id="form1">
                        <div class="panel-body">
                          <div class="controls">
                            <div class="row">
                              <div class="col-1"></div>
                              <div class="col-md-4">
                                <div class="form-group"><label>First Name*</label> <input type="text" required=""
                                    maxlength="10" id="input-text3" placeholder="Enter First Name" class="form-control">
                                </div>

                                <div class="form-group"><label>Address number*</label><input type="address" required=""
                                    maxlength="8" id="input-text6" placeholder="Address number" class="form-control">
                                </div>

                              </div>


                              <div class="col-2"></div>
                              <div class="col-md-4">
                                <div class="form-group"><label>Last Name*</label> <input type="text" required=""
                                    maxlength="10" id="input-text4" placeholder="Enter Last Name" class="form-control">
                                </div>
                                <div class="form-group">
                                  <label>Mobile No.*</label>
                                  <input type="tel" required pattern="[0-9]{10}" id="mobile_number"
                                    placeholder="Enter 10-Digit Mobile No." class="form-control" maxlength="10"
                                    minlength="10">
                                  <small class="text-danger" id="mobile_number_error" style="display: none;">Please
                                    enter a 10-digit mobile number.</small>
                                </div>

                              </div>
                              <br>
                            </div>
                            <div class="col-11 d-flex justify-content-end">
                              <input type="button" class="btn btn-outline-success nextt" value="Next">
                            </div>
                          </div>

                        </div>
                    </div>
                    <div role="tabpanel" id="tab-2" class="tab-pane">
                      <div class="panel-body">
                        <div class="controls">
                          <div class="row">
                            <div class="col-1"></div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="unitname">Unit Name</label> <br>
                                <select id="unitname" name="unitname" class="form-control">
                                  <option value="" disabled selected>No Unit Name Selected
                                  </option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label for="gateId">Gate Id</label> <br>
                                <select id="gateId" name="gateId" class="form-control">
                                  <option value="" disabled selected>No Gate Id Selected
                                  </option>
                                </select>
                              </div>

                              <div class="form-group" id="store_dynamic">
                                <label for="storeId">Store Id</label>
                                <select id="storeId" name="storeId" class="form-control">
                                  <option value="" disabled selected>No Store Id Selected
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="col-2"></div>
                            <div class="col-md-4">  
                              <div class="form-group">
                                <label for="">Role code</label>
                                <select name="roles" id="roles"></select>
                              </div>
                              <br>

                              <div class="form-check form-switch" >
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> &nbsp;
                                <label class="form-check-label" for="flexSwitchCheckChecked" style="font-weight: bold;" > Active User</label>
                              </div>
                              
                              


                            </div>


                          </div>

                          <div class="px-2 offset-1 my-3 d-flex justify-content-start">
                            <button class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                            <button type="submit" class="btn add btn-primary pt-2 m-1">Save Changes</button>
                          </div>

                          <div class="col-11 d-flex justify-content-end">
                            <input type="button" class="btn btn-outline-success prev" value="Previous">&nbsp;&nbsp;
                            <input type="button" class="btn btn-outline-success last" value="Next">
                          </div>


                        </div>
                      </div>
                    </div>
                    <!-- <div role="tabpanel" id="tab-3" class="tab-pane">
                    <div class="panel-body">
                      <div class="controls">
                        <div class="row">
                          <div class="col-1"></div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="">Role code</label>
                              <select name="roles" id="roles"></select>
                            </div>

                          </div>
                          <div class="col-2"></div>
                          <div class="col-md-4">


                          </div>

                          

                        <div class="col-11 d-flex justify-content-end">
                          <input type="button" class="btn btn-outline-success nextt" value="Previous">
                        </div>

                      </div>

                    </div>
                    </form>
                  </div> -->
                  </div>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div><br>
    <!--% including footer %-->
    <jsp:include page="../../Basic/template/footer.jsp" />
  </div>


  </div>

  <script src="../../../custom/js/breadcrumb.js"></script>






  <script>

//     $(document).ready(()=>{

//       $.fn.DataTable.ext.pager.numbers_length = 4;

//     $("#model").click(() => {
//       $("#col1_filter")[0].value = "";
//     })

//     var tab = $("#Dtable").DataTable({
//       // pageLength : 2,
//       language: {
//         'paginate': {
//           'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
//           'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
//         }
//       },

//       dom: '<"top">t<"bottom"ip>',
//       ordering: true,
//       lengthMenu: [5, 10, 20, 25, 50],

//       pagingType: "simple_numbers",
//       ajax: {
//         url: 'http://192.168.100.54:8050/businessunit/get',
//         dataSrc: "data",
//       },

//       columns: [
//         { data: "business_unit" },
//         { data: "description" },

//       ],

//       select: true,

//       columnDefs: [
//         {
//           "defaultContent": "-",
//           "targets": "_all"
//         },
//         { responsivePriority: 1, targets: 0 },
//         { responsivePriority: -2, targets: 1 }
//       ],

//     });


//     $('#Dtable tbody').on('click', 'tr', function () {
//       var data = tab.row(this).data();

//       var row  = $(this)[0];

//       function search(data) {

//         $("#input-text8").val(data.business_unit);

//         $(row).removeClass("selected");
//       }

//       $("#select").click(() => {

//         search(data);

//       })
//     });




//     $('input.global_filter').on('keyup click', function () {
//       filterGlobal();
//     });


//     $("#search").click(() => {
//       $('#Dtable').DataTable().column(0).search(
//         $('#col' + 1 + '_filter').val(),
//         $('#col' + 1 + '_smart').prop('checked')
//       ).draw();
//     })
// });



  </script>

  <script src="../../Configration/js/globalConfig.js"></script>

  <!-- updateuser JS -->
  <script src="../js/updateUser.js?v=" + $.getCurrentVersion()></script>

  <!-- businessmodal JS -->
  <script src="../js/businessmodal.js?v=" + $.getCurrentVersion()></script>


</body>

</html>