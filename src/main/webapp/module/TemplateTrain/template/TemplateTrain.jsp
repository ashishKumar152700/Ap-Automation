<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Template Trained</title>
    <jsp:include page="../../Basic/template/favicon.jsp" />
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">



    <link href="../css/templateTrain.css" rel="stylesheet">


    <script src="../../../static/js/jquery-2.1.1.js"></script>

    <script src="../../../static/js/bootstrap.js"></script>

    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">

    <link rel="stylesheet" href="../../../cdn/css/jquery-ui.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.0/xlsx.full.min.js"></script>

    <script src="../../../cdn/js/sweetalert2.js"></script>


    <style>
        
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



        //above code is for the vendor management module 









        // let sessionString = localStorage.getItem("userrole")
        // let menus = JSON.parse(localStorage.getItem("menuData"))
        // let menuroles;
        // let name = JSON.parse(sessionString);

        // let data_menu = menus.map((item)=> {
        //     if(item.id == 245){
        //         menuroles = item.assignroles.map((value)=> value.rolecode)
        //     }

        //     }
        // )
        // let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
          
        //  if(name != null)
        //  {
        //     //  if(name.includes("Admin"))
        //      if(returned_arr.flat(Infinity).includes(true))
        //     {
        
        //     }
        //     else{
        //         window.location.href = "../../Basic/template/404.jsp";
        //     }

        // }
        // else{
        //     window.location.href = "../../Basic/template/404.jsp";
        // }

    </script>


    <div id="wrapper">
        <!--% including header %-->
        <jsp:include page="../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">

            <div class="ibox-content" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>


                <div class="row">
                    <div class="col-sm-12">
                        <div class="ibox ">
                            <div class="ibox-content py-3 d-flex">
                                <table cellspacing="0" cellpadding="4" class="col-4">
                                    <tbody>
                                        <tr id="filter_col2" data-column="1" class=" ">
                                            <td class=" col-12 ">
                                                <label for="col1_filter"> <b>Vendor Name</b></label>
                                                <div class="d-flex">
                                                    <div class="input-group ">
                                                        <input type="text" autocomplete="off" class="form-control column_filter"
                                                            placeholder="Vendor Name" aria-label="Admin Theme"
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
                                                    class="column_filter d-none" id="col1_smart" checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellspacing="0" cellpadding="4" class="col-4">
                                    <tbody>
                                        <tr id="filter_col3" data-column="1" class=" ">
                                            <td class=" col-12 ">
                                                <label for="col2_filter"> <b>Template Trained</b></label>
                                                <div class="d-flex ">
                                                    <div class="input-group ">
                                                        <!-- <input type="text" class="form-control column_filter"
                                                            placeholder="Status" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" id="col2_filter"> -->
                                                        <select name="cars" class="form-control column_filter"
                                                            placeholder="Status" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" id="col2_filter">
                                                            <option value="">*</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                        <!-- <div class="input-group-append" id="searchStatus">
                                                            <button class="btn btn-primary" type="button"
                                                                id="button-addon2">
                                                                Status</button>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </td>
                                            <td align="center"><input readonly type="checkbox"
                                                    class="column_filter d-none" id="col2_smart" checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellspacing="0" cellpadding="4" class="col-4">
                                    <tbody>
                                        <tr id="filter_col3" data-column="1" class=" ">
                                            <td class=" col-12 ">
                                                <label for="col4_filter"> <b>Export To Excel</b></label>
                                                <div class="d-flex">
                                                    <button class="excel btn btn-primary">Export All</button>
                                                </div>
                                            </td>
                                            <td align="center"><input readonly type="checkbox"
                                                    class="column_filter d-none" id="col2_smart" checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-sm-4">
                        <div class="ibox ">
                            <div class="ibox-content py-2">
                                <div class="text-center my-2">
                                    <a class="btn btn-primary" id="add_invoice" href="../template/addInvoice.jsp"><i
                                            class="fa fa-plus"> </i>
                                        Add
                                        Invoice</a>
                                </div>
                            </div>
                        </div>


                    </div> -->

                </div>

                <div class="row ">
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-content">


                                <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">

                                    <thead>
                                        <th class="text-left" data-toggle="true">Vendor Name</th>
                                        <th class="text-left" data-toggle="true">Vendor Code</th>
                                        <th class="text-left" data-toggle="true">Invoice Count</th>
                                        <th class="text-left" data-toggle="true">Template Trained</th>
                                        <!-- <th class="text-left" data-sort-ignore="true">ACTIONS</th> -->
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <!--% including footer %-->
        <jsp:include page="../../Basic/template/footer.jsp" />

    </div>

    
    
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
    
    
    <!-- userslist JS -->
    <script src="../../Configration/js/globalConfig.js"></script>
    
    <!-- breadcrumb JS -->
    <script src="../../../custom/js/breadcrumb.js"></script>
    
    <script src="../js/templateTrain.js?v=" + $.getCurrentVersion()></script>
    <!-- sweetalert JS -->

    <!-- dataTable JS -->
    <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../cdn/js/dataTables.responsive.min.js"></script>


</body>

</html>