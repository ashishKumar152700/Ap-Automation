<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Statusrouting</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../../css/invoice.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
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

            <div class="ibox-content" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce d-none">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>


                    <div class="row">
                        <div class="col-sm-12">
                            <div class="ibox ">
                                <div class="ibox-content py-3 d-flex">
                                    <table cellspacing="0" cellpadding="4" class="col-7">
                                        <tbody>
                                            <tr id="filter_col2" data-column="1" class=" ">
                                                <td class="col-12 px-0">
                                                    <div class="d-flex ">
                                                        <div class="input-group ">
                                                            <input type="text" class="form-control column_filter"
                                                                placeholder="Gate Number" aria-label="Admin Theme"
                                                                aria-describedby="button-addon2" id="col1_filter">
                                                            <div class="input-group-append" id="search">
                                                                <button class="btn btn-primary" type="button"
                                                                    id="button-addon2"><i class="fa fa-search"></i>
                                                                    Search</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="center"><input readonly="" type="checkbox"
                                                        class="column_filter invisible" id="col1_smart" checked="checked">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellspacing="0" cellpadding="4" class="col-5">
                                        <tbody>
                                            <tr id="filter_col3" data-column="1" class=" ">
                                                <td class=" col-12 px-0">
                                                    <div class="d-flex ">
                                                        <div class="input-group ">
                                                            <!-- <input type="text" class="form-control column_filter"
                                                                                            placeholder="Status" aria-label="Admin Theme"
                                                                                            aria-describedby="button-addon2" id="col2_filter"> -->
                                                            <select name="cars" class="form-control column_filter"
                                                                placeholder="Status" aria-label="Admin Theme"
                                                                aria-describedby="button-addon2" id="col2_filter">
                                                                <option value="">*</option>
                                                                
                                                            </select>
                                                            <div class="input-group-append" id="searchStatus">
                                                                <button class="btn btn-primary" type="button"
                                                                    id="button-addon2">
                                                                    <!-- <i class="fa fa-search"></i> -->
                                                                
                                                                    Status</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="center"><input readonly="" type="checkbox"
                                                        class="column_filter invisible" id="col2_smart" checked="checked">
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
                                        <a class="btn btn-primary invisible" id="add_invoice" href=""><i
                                                class="fa fa-plus"> </i>
                                            Add
                                            Status</a>
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
                                            <th class="text-left" data-toggle="true">ID</th>
                                            <th class="text-left" data-hide="phone">Status</th>
                                            <th class="text-left" data-hide="phone">Gate Number</th>
                                            <th class="text-left" data-hide="phone">Status</th>
                                            <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>


            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="ibox ">
                                            <div class="ibox-content py-0">
                                                <div class="my-3">
                                                    <h2 class="font-bold d-inline" id="gateid"></h2>
                                                </div>
                                                <div class="hr-line-dashed py-0"></div>
                                                <div class="panel-body">
                                                    <form class="contact-form" id="form1">
                                                        <div class="controls">
                                                            <div class="row gx-5">
                                                                <div class="col">
                                                                    <input type="text" id="row_id" disabled
                                                                        class="form-control font-bold d-none"></input>

                                                                    <div class="form-group"><label>From
                                                                        </label> <input type="text" id="from_status"
                                                                            disabled
                                                                            class="form-control font-bold"></input>
                                                                    </div>
                                                                </div>

                                                                <!-- <div class="col-1"></div> -->
                                                                <div class="col">
                                                                    <div class="form-group"><label>To</label>
                                                                        <select name="cars"
                                                                            class="form-control column_filter"
                                                                            placeholder="Status"
                                                                            aria-label="Admin Theme"
                                                                            aria-describedby="button-addon2"
                                                                            id="to_status">
                                                                            <option value="">*</option>
                                                                        </select>
                                                                    </div>
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
                            
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary " id="change_status">Submit</button>
                                <button type="button" class="btn btn-white " data-dismiss="modal">Cancel</button>
                            </div>

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

    <script src="../../js/globalConfig.js"></script>

    <!-- invoice JS -->
    <script src="../js/statusRouting.js?v=" + $.getCurrentVersion()></script>

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>



    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>


</body>

</html>