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
    <link rel="stylesheet" href="../css/visitorOut.css">
    
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


        <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Visitor Gate Out</h1>
                        <!-- <button type="button" class="close" data-dismiss="modal"><span
                            aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> -->
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="ibox m-0">
                                    <div class="ibox-content py-3">
                                        <table cellspacing="0" cellpadding="4">
                                            <tbody>
                                                <tr id="filter_col2" data-column="1" class="">
                                                    <td class=" col-12 ">
                                                        <div class="d-flex ">
                                                            <div class="input-group ">
                                                                <input type="text" class="form-control column_filter"
                                                                    placeholder="Gate Number" aria-label="Admin Theme"
                                                                    aria-describedby="button-addon2" id="gate_number">
                                                                <div class="input-group-append" id="search">
                                                                    <button class="btn btn-primary" type="button"
                                                                        id="pass_out"><i class="fa fa-search"></i>
                                                                        Out</button>
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
                  
                        </div>
            
                        <!-- <div class="row ">
                            <div class="col-lg-12">
                                <div class="ibox mb-0">
                                    <div class="ibox-content">
                                        <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">
                                            <thead>
                                                <th class="text-left" data-hide="phone"><input type="checkbox" class="btn btn-primary" id="select_all" ></th>
                                                <th class="text-left" data-hide="phone">ID</th>
                                                <th class="text-left" data-hide="phone">Gate Number </th>
                                                <th class="text-left" data-hide="phone">First name</th>
                                                <th class="text-left" data-hide="phone">Vehicle Number</th>
                                                <th class="text-left" data-hide="phone">Report time</th>
                                                <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                            </thead>
                                        </table>
                                        
                                    </div>
                                </div>
                            </div>
                        </div> -->
                          
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white " data-dismiss="modal">Close</button>
                    </div><br>
                   
                </div>
            </div>
        </div>
        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">
            <button type="button" class="btn btn-primary pt-2 m-1 d-none" id="save" data-toggle="modal" data-target="#myModal5">SAVE</button>

            
            
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
    

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>


    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../js/visitorOut.js?v=" + $.getCurrentVersion()></script>



   


</body>

</html>