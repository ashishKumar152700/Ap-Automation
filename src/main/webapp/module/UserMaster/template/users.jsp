<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Users</title>
    <jsp:include page="../../Basic/template/favicon.jsp" />
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/users.css">

    
    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">
    
    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
    <script src="../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../custom/css/filter_multi_select.css">

    <script src="../../../custom/js/filter-multi-select-bundle.min.js"></script>

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

        
    <!-- sweetalert JS -->
    <script src="../../../cdn/js/sweetalert2.js"></script>
    <script src="../../../cdn/js/sweetalert.min.js"></script>
    
    
   
    
    <!-- breadcrumb JS -->

    <!-- dataTable JS -->
    <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../cdn/js/dataTables.responsive.min.js"></script>
    
    
    
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
                 console.log(item);
                 if(item.id == 12){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                 }
     
                 }
             )
             let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Admin") || name.includes("USER"))
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
                <div class="col-sm-8">
                    <div class="ibox ">
                        <div class="ibox-content py-3">
                            <table cellspacing="0" cellpadding="4">
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
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-2">
                            <div class="text-center my-2">
                                <a class="btn btn-primary" href="addUser.jsp"><i class="fa fa-plus"> </i> Add User</a>
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
                                    <th class="text-left" data-toggle="true">USER ID</th>
                                    <th class="text-left" data-hide="phone">USERNAME</th>
                                    <th class="text-left" data-hide="phone">ADDRESS NO.</th>
                                    <th class="text-left" data-hide="phone,tablet">EMAIL</th>
                                    <th class="text-left" data-hide="phone,tablet">ACTIVE</th>
                                    <!-- <th class="text-left" data-hide="phone">COMAPNY CODE</th> -->
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            
                            <div class="tabs-container white-bg">
                            </div>
                            <div class="modal-body">

                                <div class="ibox-content" id="loader1">
                                    <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin1">
                                        <div class="sk-double-bounce1"></div>
                                        <div class="sk-double-bounce2"></div>
                                    </div>


                                <div class="row">
                                    <div class="col-12">
                                        <div class="ibox ">
                                            <div class="ibox-content py-0">
                                                <div class="my-3">
                                                    <h2 class="font-bold d-inline" id="input-text11"></h2>
                                                </div>
                                                <div class="mb-4">
                                                    <p class="font-bold d-inline">User name :
                                                    <div class="d-inline" id="input-text12"></div>
                                                    </p>
                                                </div>
                                                <div class="">
                                                    <p class="font-bold d-inline">Email :
                                                    <div class="d-inline" id="input-text13"></div>
                                                    </p>
                                                </div>

                                                <div class="hr-line-dashed py-0"></div>

                                                        <div class="tabs-container ">
                                                            <ul class="nav nav-tabs" role="tablist">
                                                                <li><a class="nav-link active ravi" id="data" data-toggle="tab"
                                                                        href="#tab-1">Personal Info. </a></li>
                                                                <!-- <li><a class="nav-link" id="data1" data-toggle="tab" href="#tab-2">JDE
                                                                        Info.</a></li> -->
                                                              
                
                                                            </ul>
                                                            <div class="tab-content">
                                                                <div role="tabpanel" id="tab-1" class="tab-pane active">
                                                                    <div class="panel-body">
                                                                        <form class="contact-form" id="form1">
                                                                            <div class="controls">
                                                                                <div class="row">
                                                                                    <div class="col-1"></div>
                                                                                    <div class="col-md-4">
                                                                                        <div class="form-group"><label>First
                                                                                                Name</label> <input type="text"
                                                                                                id="form6Example3" readonly
                                                                                                class="form-control font-bold"></input>
                                                                                        </div>
                                                                           
                                                                                            <div class="form-group"><label>Address
                                                                                                number</label><input type="address"
                                                                                                id="form6Example5" readonly
                                                                                                class="form-control"></div>

                                                                                                <div class="form-group">
                                                                                                    <label for="unitname">Unit Name</label>
                                                                                                    <div id="unitname"></div>
                                                                                                </div>
                                                                                    </div>
                                  
                                                                                    <div class="col-2"></div>
                                                                                    <div class="col-md-4">
                                                                                        <div class="form-group"><label>Last
                                                                                            Name</label> <input type="text"
                                                                                            id="form6Example4" readonly
                                                                                            class="form-control font-bold"></div>

                                                                                            <div class="form-group"><label>
                                                                                                Gate Id</label><input type="text"
                                                                                                id="gate_id" readonly
                                                                                                class="form-control"></div>

                                                                                            <div class="form-group">
                                                                                                <label for="countries">Role Id</label>
                                                                                                <div id="countries"></div>
                                                                                            </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                               
                
                                                      
                                                            </div>
                
                
                                                        </div><br><br>
                                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>

        <!--% including footer %-->
        <jsp:include page="../../Basic/template/footer.jsp" />
    </div>
    
    <script src="../../../custom/js/breadcrumb.js"></script>
     <!-- userslist JS -->
     <!-- <script src="../../Configration/js/globalConfig.js"></script> -->
     <script src="../js/users.js?v=" + $.getCurrentVersion()></script>

    

</body>

</html>