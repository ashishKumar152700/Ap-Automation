<!DOCTYPE html>
<html>
    
    <head>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Update Menu</title>
        <jsp:include page="../../../Basic/template/favicon.jsp" />
        <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
        <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
        <script src="../../../../static/js/jquery-2.1.1.js"></script>
        
        <link href="../../../../static/css/animate.css" rel="stylesheet">
        <link href="../../../../static/css/style.css" rel="stylesheet">

        <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">

        
       <!-- Mainly scripts -->
       <script src="../../../../static/js/popper.min.js"></script>
       <script src="../../../../static/js/bootstrap.js"></script>
       <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
       <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
   
       <!-- Custom and plugin javascript -->
       <script src="../../../../static/js/inspinia.js"></script>
       <script src="../../../../static/js/plugins/pace/pace.min.js"></script>

       <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
       

       <!-- jQuery UI -->
       <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

     

       <script src="../../../../cdn/js/sweetalert2.js"></script>
      <script src="../../../../cdn/js/sweetalert.min.js"></script>


        <style>
            .btn-success {
            border: 1px solid #24537f !important;
            background-color: #24537f !important;
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
        <jsp:include page="../../../Basic/template/header.jsp"/>
        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp"/>

        <div class="wrapper wrapper-content ">

          <div class="" id="loader">
            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin">
                <div class="sk-double-bounce1"></div>
                <div class="sk-double-bounce2"></div>
            </div>

            <div class="row">
              <div class="col-lg-12 ">
                <div class="card  mx-auto p-4 white-bg">
                  <div class="card-body ">
                    <div class="container ">
                      <form class="contact-form" id="formMenu">
                        <div class="controls">
                          <div class="row">
                            <div class="col-1"></div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="accessories">Menu Type</label> <br>
                                <select  id="menu_type" class="form-control">
                                  <option value=""></option>
                                  <option value="Parent">Parent</option>
                                  <option value="Child">Child</option>
 
                                </select>
                              </div>
                              <div class="form-group"><label>Menu Name*</label> <input type="text" placeholder="Menu name" class="form-control" required="" id="menuname"></div>
                              <div class="form-group"><label>Icon*</label> <input type="text" placeholder="Icon" class="form-control" required="" id="icon"></div>
                              <div class="form-group"><label>Link*</label> <input type="text" placeholder="Link" class="form-control"  id="link"></div>
                              
                              <!-- <div class="form-group"><label>Password*</label> <input type="text" placeholder="Role Code" class="form-control" required="" id="jdePassword"></div> -->
                            </div>
                            <div class="col-2"></div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="accessories">Parent Id*</label> <br>
                                <select  name="parentid" id="parentid" class="form-control">
                                  <option value=""></option>
                                  
                                </select>
                              </div>
                            <div class="form-group"><label>Sorting*</label><input type="text" required="" maxlength="80" id="sorting" placeholder="Sorting" class="form-control"></div>
                              <div class="form-group"><label>Roles</label><br><select name="Type" id="roleCode" class="form-control" placeholder="Role Code"></select></div>
                    
                            </div>
                            
                            <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                              <button class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
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

            </div>
          </div>
       <!--% including footer %-->
       <jsp:include page="../../../Basic/template/footer.jsp"/>
    </div>
        

    <script src="../../../../custom/js/breadcrumb.js"></script>
    <script src="../../js/globalConfig.js"></script>
    <script src="../js/updateMenu.js?v=" + $.getCurrentVersion()></script>

</body>

</html>
