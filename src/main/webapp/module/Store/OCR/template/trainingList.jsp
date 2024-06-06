<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    <title>Invoice Training</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/scanocr.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">

    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">

    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>


    <style>
        .btn-outline-success{
            
            color: #24537f !important;
            /* background-color: #24537f; */
        }
        .btn-outline-success:hover {
            color: #fff !important;
        }

        .btn {
            z-index: 0 !important;
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
                 if(item.id == 28){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                 }
                 }
             )
             let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Training")  || name.includes("Admin"))
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

            <div class="ibox-content sk-loading" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>

            <div class="row">
                <div class="col-sm-8">
                    <div class="ibox ">
                        <div class="ibox-content py-3 d-flex">
                            <table cellspacing="0" cellpadding="4" class="col-12">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text" class="form-control column_filter"
                                                        placeholder="Vendor Code" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col1_filter">
                                                    <div class="input-group-append" id="search">
                                                        <button class="btn btn-primary" type="button"
                                                            id="button-addon2"><i class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter invisible" id="col1_smart" checked="checked">
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
                                <a class="btn btn-primary" href="../template/training.jsp"><i class="fa fa-plus"> </i>
                                    Add Vendor Invoice</a>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

            <!-- <div class="ibox-content" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce">
                   <div class="sk-double-bounce1"></div>
                   <div class="sk-double-bounce2"></div>
               </div>
        
            </div> -->
            
            
            <div class="row ">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content">
                            
                            
                            <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">
                                
                                <thead>
                                    <th class="text-left" data-toggle="true">ID</th>
                                    <th class="text-left" data-hide="phone">Vendor Code</th>
                                    <th class="text-left" data-hide="phone">Vendor Name</th>
                                    <th class="text-left" data-hide="phone">Template</th>
                                
                                   
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                </thead>
                                <tbody id="tbody">
    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        </div>
        <!--% including footer %-->
        <br>
        <jsp:include page="../../../Basic/template/footer.jsp" />
        
    </div>
    
    <script src="../../../../custom/js/breadcrumb.js"></script>
    
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

    <script src="../../../Configration/js/globalConfig.js"></script>

    <!-- Gate JS -->


    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->



    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../js/trainingList.js?v=" + $.getCurrentVersion()></script>




</body>

</html>