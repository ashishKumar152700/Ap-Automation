<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Add groupNotification</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../../nextNumber/css/addnextNumber.css">

    <script src="../../../../static/js/bootstrap.js"></script>

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
    <script src="../../../../cdn/js/sweetalert.min.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>



    <style>
        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            border-top-color: #24537f !important;
            border-top-width: 4px !important;
        }

        .panel-primary {
            border-color: #24537f;
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
                 if(item.id == 29){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                 }
     
                 }
             )
             let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Admin"))
            if(returned_arr.flat(Infinity).includes(true)) {

            }
            else {
                window.location.href = "../../../Basic/template/404.jsp";
            }
        }
        else {
            window.location.href = "../../../Basic/template/404.jsp";
        }

    </script>


    <div id="wrapper">
        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />
        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />
        <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <br><br>
                        <table cellspacing="0" cellpadding="4">
                            <tbody>
                                <tr id="filter_col2" data-column="1" class=" ">
                                    <td class=" col-12 ">
                                        <div class="d-flex ">
                                            <div class="input-group ">
                                                <input type="text" class="form-control column_filter"
                                                    placeholder="Address Number" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col1_filter">
                                                <div class="input-group-append" id="vendor_search">
                                                    <button class="btn btn-primary" type="button" id="button-addon"><i
                                                            class="fa fa-search"></i>
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
                    <div class="modal-body">
                        <table id="Vtable" class="display responsive nowrap text-left " style="width: 100%">
                            <thead>
                                <th class="text-left" data-hide="phone">Address Number
                                </th>
                                <th class="text-left" data-hide="phone">
                                    Description</th>
                                <th class="text-left" data-hide="phone">
                                    Vendor Tax</th>

                            </thead>
                            <tbody id="Supplier_name">
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="vendor" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrapper wrapper-content ">
            <div class="row">
                <div class="col-lg-12 ">
                    <div class="card  mx-auto p-4 white-bg">
                        <div class="card-body ">
                            <div class="container ">
                                <form class="contact-form" id="form">
                                    <div class="controls">
                                        <div class="row">

                                            <div class="col-md-3">
                                                <!-- <div class="form-group">
                                                    <label for="accessories">Process Id*</label> <br>
                                                    <select name="groupname" class="w-75 p-2" id="groupname">
                                                        <option value="" aria-readonly="true">No Process Id Selected
                                                        </option>
                                                    </select>
                                                </div> -->
                                                <div class="form-group">
                                                    <label for="accessories">Process Id</label> <br>
                                                    <select id="groupname" name="groupname" 
                                                        class="form-control">
                                                        <option value="" disabled selected>No Process Id Selected
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-1"></div>

                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="unitname">Unit Name*</label> <br>
                                                    <select id="unitname" name="unitname" placeholder="unit"
                                                        class="form-control">
                                                        <option value="" disabled selected>No Unit Name Selected
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-1"></div>

                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="storeId">Store Id</label> <br>
                                                    <select id="storeId" name="storeId" class="form-control">
                                                        <option value="" disabled selected>No Store Id Selected
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div><br>


                                        <div class="row">
                                            <div class="col-12">
                                                <div class="panel-body">
                                                    <div class="ibox ">
                                                        <div class="p-0">
                                                            <div class="tabs-container">
                                                                <div class="tab-content">
                                                                    <div class="row clearfix">
                                                                        <div class="">
                                                                            <table class="table table-bordered"
                                                                                id="tab_logicc">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th class="text-center">
                                                                                            Address Number
                                                                                        </th>
                                                                                        <th class="text-center">
                                                                                            Name</th>
                                                                                        <th class="text-center">
                                                                                            Email</th>
                                                                                        <th class="text-center">
                                                                                            Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody id="table-body">
                                                                                    <tr>
                                                                                        <td>
                                                                                            <div class="input-group">
                                                                                                <input type="text"
                                                                                                    class="form-control input_size vendercode text-right "
                                                                                                    required=""
                                                                                                    aria-label="Admin Theme"
                                                                                                    aria-describedby="button-addon2"
                                                                                                    id="" disabled>
                                                                                                <div
                                                                                                    class="input-group-append">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        id="model"
                                                                                                        class="search btn btn-primary"
                                                                                                        data-toggle="modal"
                                                                                                        data-target="#myModal5">
                                                                                                        Select
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td><input type="text"
                                                                                                class="form-control input_size names text-right"
                                                                                                value="" id="">
                                                                                        </td>
                                                                                        <td><input type="text"
                                                                                                class="form-control input_size email text-right"
                                                                                                id="">
                                                                                        </td>

                                                                                        <td><button typce="button"
                                                                                                class="btn btn-danger delete-row">Delete</button>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <input type="button" id="add_roww"
                                                                                class="btn btn-primary "
                                                                                value="Add Row" />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>



                                            </div>


                                        </div>


                                        <div class="row">
                                            <div class="px-2  my-3 d-flex justify-content-start ">
                                                <button type="button"
                                                    class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                                <button type="submit" class="btn add btn-primary pt-2 m-1">Add</button>
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
        <jsp:include page="../../../Basic/template/footer.jsp" />
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

    <script src="../../../Configration/js/globalConfig.js"></script>

    <!-- addStatus JS -->
    <script src="../js/groupNotification.js?v=" + $.getCurrentVersion()></script>




    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>


    <!-- dataTable JS -->
    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../../cdn/js/dataTables.select.min.js"></script>




</body>

</html>