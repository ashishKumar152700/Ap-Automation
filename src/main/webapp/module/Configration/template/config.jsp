<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>URL Configuration</title>
    <jsp:include page="../../Basic/template/favicon.jsp"/>
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../static/css/animate.css" rel="stylesheet">
    
    <link href="../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/config.css">



    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">

    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">

    <script src="../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../custom/css/filter_multi_select.css">

    <script src="../../../custom/js/filter-multi-select-bundle.min.js"></script>
    <!-- <script src="../../../custom/js/Configration/globalConfig.js"></script> -->

    
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


    
   

    <!-- breadcrumb JS -->
    <!-- <script src="../../../custom/js/breadcrumb.js"></script> -->


    <script src="../../../cdn/js/sweetalert2.js"></script>

    <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../cdn/js/dataTables.responsive.min.js"></script>


    <style>
        /* .inmodal .modal-header {
            text-align: left !important;
        }

        .modal-footer {
            padding-bottom: 0px !important;
        }

        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            color: #1ab394 !important;
            border-top-color: #1ab394 !important;

        }

        .nav-tabs .nav-link {
            border-top-width: 5px;

        } */
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

        <!-- <div class="modal inmodal fade show" id="myModal5" tabindex="-1" role="dialog" aria-modal="true" style="display: block; padding-right: 17px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                       
                    </div>
                    <div class="modal-body">
                        <form class="contact-form" id="form">
                            <div class="controls">
                              <div class="row">
                                <div class="col-1"></div>
                                <div class="col-md-4">
                                  <div class="form-group"><label>Role Code*</label> <input type="text" readonly="" class="form-control" id="form6Example1" style="font-weight: bold;"></div>
                                  
                                </div>
                                <div class="col-2"></div>
                                <div class="col-md-4">
                                  <div class="form-group"><label>Role Description*</label><input type="text" readonly="" id="form6Example5" class="form-control" style="font-weight: bold;"></div>
                        
                                </div>
                              </div>
                            </div>
                          </form>
                    </div>
        
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white my-2" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div> -->
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
                        <div class="ibox">
                            <div class="ibox-content py-3 d-flex">
                                <table cellspacing="0" cellpadding="4" class="col-6">        
                                    <tbody>
                                        <tr id="filter_col2" data-column="1" class=" ">
                                            <td class="">
                                                <div class="d-flex ">
                                                    <div class="input-group ">
                                                        <input type="text" class="form-control column_filter"
                                                            placeholder="Environment" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" id="col1_filter">
                                                        <div class="input-group-append" id="search">
                                                            <button class="btn btn-primary" type="button"
                                                                id="button-addon2"><i class="fa fa-search"></i>
                                                                Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
    
                                            <td align="center"><input type="checkbox"
                                                    class="column_filter invisible" id="col1_smart"
                                                    checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                                <table cellspacing="0" cellpadding="4" class="col-6">        
                                    <tbody>
                                        <tr id="filter_col2" data-column="1" class=" ">
                                            <td class="">
                                                <div class="d-flex">
                                                    <div class="input-group ">
                                                        <input type="text" class="form-control column_filter"
                                                            placeholder="Type" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" id="col2_filter">
                                                        <div class="input-group-append" id="searchName">
                                                            <button class="btn btn-primary" type="button"
                                                                id="button-addon2"><i class="fa fa-search"></i>
                                                                Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
    
                                            <td align="center"><input type="checkbox"
                                                    class="column_filter invisible" id="col2_smart"
                                                    checked="checked">
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
                                    <a class="btn btn-primary" href="addConfig.jsp"><i class="fa fa-plus"> </i> Add Configuration</a>
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
                                    <th class="text-left" data-toggle="true">ID</th>
                                    <th class="text-left" data-hide="phone">URL</th>
                                    <th class="text-left" data-hide="phone">Environment</th>
                                    <th class="text-left" data-hide="phone">Type</th>
                                    <th class="text-left" data-hide="phone">URL Active</th>
                                    <th class="text-left" data-hide="phone,tablet">ACTION</th>
                                    <!-- <th class="text-left" data-hide="phone">USERNAME</th> -->
                                    <!-- <th class="text-left" data-hide="phone">PASSWORD</th> -->
                                    <!-- <th class="text-left" data-hide="phone,tablet">URL</th> -->
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
                            <!-- <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> -->
                            <div class="tabs-container white-bg">
                            </div>

                            <div class="modal-body">
                                <form class="contact-form" id="form">
                                    <div class="controls">
                                      <div class="row">
                                        <div class="col-1"></div>
                                        <div class="col-md-4">
                                            <div class="form-group"><label>URL*</label><input type="text" readonly="" id="url" class="form-control" style="font-weight: bold;"></div>
                                          <div class="form-group"><label>User*</label> <input type="text" readonly="" class="form-control" id="user" style="font-weight: bold;"></div>
                                          <div class="form-group"><label>Password*</label> <input type="text" placeholder="JDE Password" class="form-control" required="" maxlength="12 " id="jdePassword" disabled></div>
                                          
                                          
                                        </div>
                                        <div class="col-2"></div>
                                        <div class="col-md-4">
                                            <div class="form-group"><label>Type*</label><input type="text" readonly="" id="type" class="form-control" style="font-weight: bold;"></div>
                                          <div class="form-group"><label>Environment*</label> <input type="text" readonly="" class="form-control" id="env" style="font-weight: bold;"></div>
                                          <div class="form-group"><label>URL Active*</label> <input type="text" readonly="" class="form-control" id="urlactive" style="font-weight: bold;"></div>

                                          <!-- <div class="form-group"><label>URL Active*</label><input type="text"  id="urlactive"  maxlength="12" disabled ></div> -->

                                
                                        </div>
                                      </div>
                                    </div>
                                  </form>
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
     <!-- Config JS -->

     <script src="../js/globalConfig.js"></script>

     <script src="../js/config.js?v=" + $.getCurrentVersion()></script>

</body>

</html>