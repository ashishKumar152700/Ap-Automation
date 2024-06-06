<!DOCTYPE html>
<html>
    
    <head>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>URL Configuration</title>
        <jsp:include page="../../Basic/template/favicon.jsp"/>
        <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
        <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
        <script src="../../../static/js/jquery-2.1.1.js"></script>
        
        <link href="../../../static/css/animate.css" rel="stylesheet">
        <link href="../../../static/css/style.css" rel="stylesheet">

        <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">

        <link rel="stylesheet" href="../../../custom/css/filter_multi_select.css">
        <script src="../../../cdn/js/sweetalert.min.js"></script>

        
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

       <script src="../../../custom/js/filter-multi-select-bundle.min.js"></script>

       

       <style>
          #show {
              border-radius: 0px;
          }
       </style>
       
       <!-- breadcrumb JS -->
       <!-- <script src="../../../custom/js/breadcrumb.js"></script> -->

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
        <jsp:include page="../../Basic/template/header.jsp"/>
        <!--% including breadcrumb %-->
        <jsp:include page="../../Basic/template/breadcrumb.jsp"/>

        <div class="wrapper wrapper-content ">
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
                              <div class="form-group"><label>URL*</label><input type="text" required="" maxlength="80" id="jdeUrl" placeholder="JDE Url" class="form-control"></div>
                              <div class="form-group"><label>User*</label> <input type="text" placeholder="JDE User" class="form-control" required="" maxlength="12 " id="jdeUser"></div>
                              <div class="form-group"><label>Password*</label><div class="input-group"><input type="password" placeholder="JDE Password" class="form-control" required=""  id="jdePassword">
                                <span class="input-group-btn">
                                  <button class="btn btn-default reveal" id="show" type="button" style="padding-bottom: 9px"><i class="fa fa-eye-slash"></i></button>
                                </span>
                                </div>
                                </div>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-md-4">
                              <div class="form-group"><label for="accessories">Type*</label> <br><select name="Type" id="type" placeholder="JDE Type"><option value = "JDE"> JDE</option><option value = "JAVA"> JAVA</option><option value = "OCR"> OCR</option></select></div>
                              <div class="form-group"><label for="accessories">Env*</label> <br><select name="Env" id="env" placeholder="JDE Environment"><option value = "DV"> DV</option><option value = "PD"> PD</option><option value = "PY"> PY</option></select><br><br>
                                <div class="form-group"><label class="labeel">URL Active*</label>&nbsp;&nbsp;&nbsp;<input type="checkbox" id="url_active" maxlength="12"   readonly></div>
                                
                            </div>
                            </div>
                            <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                              <button class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                              <button type="submit" class="btn add btn-primary pt-2 m-1">Add</button>
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
       <jsp:include page="../../Basic/template/footer.jsp"/>
    </div>
        

    <script src="../../../custom/js/breadcrumb.js"></script>
    <!-- addconfig JS -->
    <script src="../js/globalConfig.js"></script>
    <!-- <script src="../js/addconfig.js"></script> -->
    <script src="../js/addConfig.js?v=" + $.getCurrentVersion()></script>


</body>

</html>
