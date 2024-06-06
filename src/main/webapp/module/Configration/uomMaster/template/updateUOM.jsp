<!DOCTYPE html>
<html>
    
    <head>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Update UOM</title>
        <jsp:include page="../../../Basic/template/favicon.jsp" />
        <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
        <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
        
        <link href="../../../../static/css/animate.css" rel="stylesheet">
        <link href="../../../../static/css/style.css" rel="stylesheet">
      
        <script src="../../../../static/js/bootstrap.js"></script>

    
        <script src="../../../../static/js/jquery-2.1.1.js"></script>

       <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
        <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

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
                              <div class="form-group d-none"><label>id*</label> <input type="text" name="id" placeholder="Id" class="form-control check" id="id"></div>
                              <div class="form-group"><label>From Unit*</label> <input type="text" name="fromUnit" placeholder="fromUnit" class="form-control check" id="fromUnit"></div>
                              <div class="form-group"><label>Conversion Factor*</label><input type="text"  placeholder="Conversion Factor" name="conversionFactor" class="form-control check" id="conversionFactor" required=""></div>
                            </div>

                            <div class="col-2"></div>
                            <div class="col-md-4">
                                <div class="form-group"><label>To Unit*</label><input type="text"  placeholder="To Unit" name="toUnit" class="form-control check" id="toUnit" required=""></div>
                            </div>
                           
                            <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                              <button type="button" class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                              <button type="submit" class="btn add btn-primary pt-2 m-1">Update</button>
                            </div>

                          </div>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <jsp:include page="../../../Basic/template/footer.jsp"/>
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

       <!-- jQuery UI -->
       <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

         <!-- addStatus JS -->
         
         <script src="../../../Configration/js/globalConfig.js"></script>
         <script src="../js/updateUOM.js"></script>

          <!-- breadcrumb JS -->
          <script src="../../../../custom/js/breadcrumb.js"></script>
  

            <!-- dataTable JS -->


     
       

</body>

</html>
