<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Update Department</title>
  <jsp:include page="../../../Basic/template/favicon.jsp" />
  <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../../static/css/style.css" rel="stylesheet">

  <script src="../../../../static/js/jquery-2.1.1.js"></script>
  <script src="../../../../static/js/bootstrap.js"></script>
  <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">


  <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
  <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">

  <style>
    #show {
        padding: 0.465rem 0.75rem;
    }
    .table{
text-align: center;
}
.bottom{
display: flex;
justify-content: space-between;
align-items: center;
}


#Dtable_length>label{
margin-bottom: 0rem;
margin-top: 0.5rem;
}

#role_length>label{
margin-bottom: 0rem;
margin-top: 0.5rem;
}

.head>th{
margin-bottom: 500px;
}
.search tr>td>input{
padding: 5px 7px;
outline: none;
}
.search{
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

#Dtable td:nth-child(3),#Dtable td:nth-child(4),#Dtable td:nth-child(5) {

white-space: normal !important;

}

#grn_table_body tr td{
padding: 2px !important;
}

#res_table{
overflow: hidden !important;
overflow-x: scroll !important;
}
#grn_table_fix{
overflow: hidden !important;
overflow-y: scroll !important;
overflow-x: scroll !important;
max-height: 400px !important;
}


.fix_len{
min-width: 75px !important;
}
.fix_length{
min-width: 250px !important;
}
.line_code{
min-width: 50px !important;
}
.fix_grn_len{
min-width: 100px !important;
}
.fix_grn_length{
min-width: 200px !important;
}

#Dtable_view td:nth-child(10)
#Dtable_view td:nth-child(9){

white-space: normal !important;

}
#Dtable_view td:nth-child(2),#Dtable_view td:nth-child(1){

white-space: normal !important;

}

.for_width{
         margin-right: 0px !important; 
}

#for_slider{
    overflow-x: auto;
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
               if(item.id == 13){
                   menuroles = item.assignroles.map((value)=> value.rolecode)
               }
   
               }
           )
           let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
             
            //  if(name.includes("Admin"))
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
  <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
              class="sr-only">Close</span></button> <br><br>
          <table cellspacing="0" cellpadding="4">
            <tbody>
              <tr id="filter_col2" data-column="1" class=" ">
                <td class=" col-12 ">
                  <div class="d-flex ">
                    <div class="input-group ">
                      <input type="text" class="form-control column_filter" placeholder="Email"
                        aria-label="Admin Theme" aria-describedby="button-addon2" id="eaemail2">
                      <div class="input-group-append" id="searchrecord">
                        <button class="btn btn-primary" type="button" id="button-addon1">
                          Add Email</button>
                      </div>
                    </div>
                  </div>
                </td>

                <td align="center"><input type="checkbox" class="column_filter invisible" id="col2_smart"
                    checked="checked">
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-body">
          <table id="Datable" class="display responsive nowrap text-left " style="width: 100%">
            <thead>
              <th class="text-left" data-hide="phone">EA Email</th>
              <th class="text-left" data-hide="phone">
                Type</th>
            </thead>
            <tbody id="ea_tbody">
            </tbody>
          </table>
        </div>


        <div class="modal-footer mb-2">
          <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
          <button id="selectRecords" type="button" data-dismiss="modal" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal inmodal fade" id="myModal6" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
              class="sr-only">Close</span></button> <br><br>
          <table cellspacing="0" cellpadding="4">
            <tbody>
              <tr id="filter_col2" data-column="1" class=" ">
                <td class=" col-12 ">
                  <div class="d-flex ">
                    <div class="input-group ">
                      <input type="text" class="form-control column_filter" placeholder="Email"
                        aria-label="Admin Theme" aria-describedby="button-addon2" id="hodemail2">
                      <div class="input-group-append" id="searchrecord">
                        <button class="btn btn-primary" type="button" id="button-addon2">
                          Add Email</button>
                      </div>
                    </div>
                  </div>
                </td>

                <td align="center"><input type="checkbox" class="column_filter invisible" id="col2_smart"
                    checked="checked">
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-body">
          <table id="Datable2" class="display responsive nowrap text-left " style="width: 100%">
            <thead>
              <th class="text-left" data-hide="phone">HOD Email</th>
              <th class="text-left" data-hide="phone">
                Type</th>
            </thead>
            <tbody id="hod_tbody">
            </tbody>
          </table>
        </div>


        <div class="modal-footer mb-2">
          <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
          <button id="selectRecords2" type="button" data-dismiss="modal" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

  <div class="wrapper wrapper-content">
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

                      <div class="form-group"><label>Department Code*</label><input type="text"
                          placeholder="Department Code" class="form-control" id="input-text1" required=""
                          maxlength="12"></div>


                      <div class="form-group">
                        <label for="accessories">EA</label> <br>
                        <select id="ea" class="form-control">
                          <option value="Y">Yes</option>
                          <option value="N" selected>No</option>
                        </select>
                      </div>

                      <div class="form-group"><label> Name*</label> <input type="text" placeholder="Name"
                          class="form-control" id="input-text2"></div>

                      <div class="form-group" id="ea_email_container">
                        <div id="eaEmailDropdown">
                          <label for="eaemail">EA Emails*</label> <br>
                          <select id="eaemail" name="eaemail" class="form-control" multiple>
                          </select>
                        </div>
                        <br>
                        <div>
                          <button class="btn btn-primary" type="button" id="addemail" data-toggle="modal"
                            data-target="#myModal5">Add EA
                            Email</button>
                        </div>
                      </div>

                    </div>

                    <div class="col-2"></div>

                    <div class="col-md-4">
                      <div class="form-group"><label>Department Name*</label>
                        <input type="text" placeholder="Department Name" class="form-control" id="input-text3"
                          required="" maxlength="30 ">
                      </div>

                      <div class="form-group">
                        <label for="accessories">HOD</label> <br>
                        <select id="hod" class="form-control">
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </div>


                      <div class="form-group"><label>HOD Name*</label> <input type="text" placeholder="HOD Name"
                          class="form-control" id="input-text4"></div>

                      <div class="form-group" id="hod_email_container">
                        <div id="hodEmailDropdown">
                          <label for="hodemail">HOD Emails*</label> <br>
                          <select id="hodemail" name="hodemail" class="form-control" multiple>
                          </select>
                        </div>
                        <br>
                        <div>
                          <button class="btn btn-primary" type="button" id="addemail2" data-toggle="modal"
                            data-target="#myModal6">Add HOD
                            Email</button>
                        </div>
                      </div>

                    </div>

                    <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                      <button type="button" class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                      <button type="submit" class="btn add btn-primary pt-2 m-1">Save Changes</button>
                    </div>

                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
    <jsp:include page="../../../Basic/template/footer.jsp" />
  </div>
  <!--% including footer %-->


</div>




  <!-- Mainly scripts -->
  <script src="../../../../static/js/popper.min.js"></script>
  <script src="../../../../static/js/bootstrap.js"></script>
  <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
  <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

  <!-- Custom and plugin javascript -->
  <script src="../../../../static/js/inspinia.js"></script>
  <script src="../../../../static/js/plugins/pace/pace.min.js"></script>
  <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

  <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

  <!-- updateStatus JS -->
  <!-- <script src="../js/updateemailSetup.js?v=" + $.getCurrentVersion()></script> -->
  <script src="../js/updateDepartment.js"></script>


  <script src="../../../Configration/js/globalConfig.js"></script>

  <!-- breadcrumb JS -->
  <script src="../../../../custom/js/breadcrumb.js"></script>

  <!-- Sweetalert JS -->
  <script src="../../../../cdn/js/sweetalert2.js"></script>
  <script src="../../../../cdn/js/sweetalert.min.js"></script>

  <!-- jQuery UI -->
  <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
  <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
  <script src="../../../../cdn/js/dataTables.select.min.js"></script>

</body>

</html>