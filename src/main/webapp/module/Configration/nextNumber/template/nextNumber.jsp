<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Nextnumber</title>

    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../../statusMaster/css/status.css">

    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>
    
    <script src="../../../../cdn/js/plotly-2.20.0.min.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>
    



    <style>
        .btn-success {
            width: 70px;
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
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">

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
                                                        placeholder="Gate ID" aria-label="Admin Theme"
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
                                <a class="btn btn-primary" href="../template/addnextNumber.jsp"><i class="fa fa-plus">
                                    </i>
                                    AddGate
                                </a>
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
                                    <th class="text-left" data-hide="phone">Company ID</th>
                                    <th class="text-left" data-hide="phone">Company </th>
                                    <th class="text-left" data-hide="phone,tablet">MCU</th>
                                    <th class="text-left" data-hide="phone">Process</th>
                                    <th class="text-left" data-hide="phone">Year</th>
                                    <th class="text-left" data-hide="phone">Current Index</th>
                                    <th class="text-left" data-hide="phone">Last Number</th>
                                    <th class="text-left" data-hide="phone">Status</th>

                                    <!-- <th class="text-left" data-hide="phone">User Id</th>
                                    <th class="text-lt" data-hide="phone">Completed</th>
                                    <th classeft" data-hide="phone">User Name</th>
                                    <th class="text-left" data-hide="phone">Address Number</th>
                                    <th class="text-left" data-hide="phone">Email</th>
                                    <th class="text-lef="text-left" data-hide="phone">Company Code</th>
                                    -->
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
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="ibox ">
                                            <div class="ibox-content py-0">
                                                <div class="panel-body">
                                                    <form class="contact-form" id="form1">
                                                        <div class="controls">
                                                            <div class="row">
                                                                <div class="col-1"></div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group"><label>Company
                                                                        </label> <input type="text" id="company"
                                                                            disabled
                                                                            class="form-control font-bold"></input>
                                                                    </div>
                                                                    <div class="form-group"><label>Business
                                                                            Unit
                                                                        </label> <input type="text" id="mcu" disabled
                                                                            class="form-control">
                                                                    </div>

                                                                    <div class="form-group"><label>GateId
                                                                    </label> <input type="text" id="gateid"
                                                                        disabled class="form-control">
                                                                </div>

                                                                    <div class="form-group"><label>Process
                                                                        </label> <input type="text" id="process"
                                                                            disabled class="form-control">
                                                                    </div>
                                                                </div>
                                                                <div class="col-2"></div>
                                                                <div class="col-md-4">

                                                                    <div class="form-group"><label>Year
                                                                        </label> <input type="text" id="year" disabled
                                                                            class="form-control font-bold">
                                                                    </div>

                                                                    <div class="form-group"><label>Length
                                                                        </label> <input type="text" id="length" disabled
                                                                            class="form-control font-bold">
                                                                    </div>

                                                                    <div class="form-group"><label>Status</label>
                                                                        <div class="fs-4" id="status"></div>
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
                                <button type="button" class="btn btn-white " data-dismiss="modal">Close</button>
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



    <!-- Sweetalert JS -->



    <!-- Nextnumber JS -->
    <script src="../js/nextNumber.js?v=" + $.getCurrentVersion()></script>

    <!-- <script src="../js/next.js"></script> -->

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>

    <!-- dataTable JS -->
    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>




</body>

</html>