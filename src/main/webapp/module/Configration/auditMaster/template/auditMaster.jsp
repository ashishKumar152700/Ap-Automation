<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Audit Master</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../../statusMaster/css/status.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery-ui.css">


    <script src="../../../../static/js/jquery-2.1.1.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>
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
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

       

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">

            <div class="row">
                <div class="col-sm-8">
                    <div class="ibox ">
                        <div class="ibox-content py-3 d-flex">
                            <table cellspacing="0" cellpadding="4" class="col-9">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text" class="form-control column_filter"
                                                        placeholder="User Name" aria-label="Admin Theme"
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

                            <table cellspacing="0" cellpadding="4" class="col-3">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class="">
                                        <td class="col-12">
                                            <div class="d-flex ">
                                                <div class="input-group">
                                                    <!-- <input type="text" name="" id="" class="form-control"> -->
                                                    <input type="text" class="form-control column_filter"
                                                        placeholder="" aria-label="Admin Theme" id="col3_filter"/>
                                                        <label class="input-group-text d-none" id="calendar" for="dateInput">
                                                            <i class="fa fa-calendar" ></i>
                                                          </label>
                                                    <!-- <input type="date" class="form-control column_filter"
                                                        placeholder="Gate Number" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="date_cal"> -->
                                                </div>
                                            </div>

                                            <!-- <div class="input-group">
                                                <input type="text" id="textInput" class="form-control"/>
                                                <div class="input-group-append">
                                                  <label class="input-group-text" for="dateInput">
                                                    <i class="far fa-calendar"></i>
                                                  </label>
                                                  <input type="date" id="dateInput" class="d-none" onchange="setDateValue()" />
                                                </div>
                                              </div> -->
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter d-none" id="col3_smart" checked="checked">
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
                            <div class="text-center my-2">
                                <a class="btn btn-primary invisible" href="#"><i class="fa fa-plus"> </i> </a>
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
                                    <th class="text-left" data-hide="phone">ID</th>
                                    <th class="text-left" data-hide="phone">User Id</th>
                                    <th class="text-left" data-hide="phone">User Name</th>
                                    <th class="text-left" data-hide="phone">IP Address</th>
                                    <th class="text-left" data-hide="phone">Login Time</th>
                                    <th class="text-left" data-hide="phone">Logout Time</th>
                                    <th class="text-left" data-hide="phone">User Agent</th>
                                </thead>
                            </table>
                        </div>
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


    
    <script src="../js/auditMaster.js?v=" + $.getCurrentVersion()></script>

    

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>

    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>

   


</body>

</html>