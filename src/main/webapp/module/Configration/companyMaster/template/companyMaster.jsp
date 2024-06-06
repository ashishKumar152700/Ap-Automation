<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Company Master</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link href="../../nextNumber/css/addnextNumber.css" rel="stylesheet">

    <script src="../../../../static/js/bootstrap.js"></script>

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">

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
                 if(item.id == 36){
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
            <div class="modal-dialog modal-lg">
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
                                                    placeholder="Business Unit" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col1_filter">
                                                <div class="input-group-append" id="search">
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

                        <div class="" id="loader7">
                            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin7">
                              <div class="sk-double-bounce1"></div>
                              <div class="sk-double-bounce2"></div>
                            </div>

                        <table id="Dtable" class="display responsive nowrap text-left " style="width: 100%">
                            <thead>
                                <th class="text-left" data-hide="phone">Business
                                    Unit

                                </th>
                                <th class="text-left" data-hide="phone">
                                    DESCRIPTION</th>

                            </thead>
                            <tbody id="tbody">
                            </tbody>
                        </table>

                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="select" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal inmodal fade" id="myModal6" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
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
                                                    placeholder="Company" aria-label="Admin Theme"
                                                    aria-describedby="button-addon2" id="col2_filter">
                                                <div class="input-group-append" id="searchrecord">
                                                    <button class="btn btn-primary" type="button" id="button-addon2"><i
                                                            class="fa fa-search"></i>
                                                        Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td align="center"><input type="checkbox" class="column_filter invisible"
                                            id="col2_smart" checked="checked">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-body">

                        <div class="" id="loader6">
                            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin6">
                              <div class="sk-double-bounce1"></div>
                              <div class="sk-double-bounce2"></div>
                            </div>

                        <table id="Datable" class="display responsive nowrap text-left " style="width: 100%">
                            <thead>
                                <th class="text-left" data-hide="phone">Company
                                </th>
                                <th class="text-left" data-hide="phone">
                                    DESCRIPTION</th>
                            </thead>
                            <tbody id="tbodyy">
                            </tbody>
                        </table>


                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="selectt" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-12 ">
                    <div class="card mx-auto p-4 white-bg">
                        <div class="card-body ">
                            <div class="container ">
                                <form class="contact-form" id="form">
                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-1"></div>
                                            <div class="col-md-4">

                                                <div class="form-group">
                                                    <label>Unit Name *</label>
                                                    <input type="text" maxlength="20" id="unit_name"
                                                        placeholder="Unit Name" class="form-control">
                                                </div>


                                                <label>State Location*</label>
                                                <div class="form-group">
                                                    <input type="text" maxlength="15" id="state_location"
                                                        placeholder="State" class="form-control">
                                                </div>

                                                <div class="form-group">
                                                    <label>Document Company*</label>
                                                    <input type="text" maxlength="20" id="doc_company"
                                                        placeholder="Document Company" class="form-control">
                                                </div>


                                                <!-- <div class="form-group">
                                                    <label>GSTIN*</label>
                                                    <input type="text" maxlength="20" id="gstin" placeholder="GSTIN"
                                                        class="form-control">
                                                </div> -->



                                            </div>
                                            <div class="col-2"></div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Name*</label>
                                                    <input type="text" maxlength="30" id="name" placeholder="Name"
                                                        class="form-control">
                                                </div>

                                                <label>Company*</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" required=""
                                                        placeholder="Company" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" readonly id="form6Example10">
                                                    <div class="input-group-append">
                                                        <button type="button" id="modeldata" class="btn btn-primary"
                                                            data-toggle="modal" data-target="#myModal6">
                                                            Select
                                                        </button>
                                                    </div>
                                                </div>
                                                <br>
                                                <label>Business Unit*</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" required=""
                                                        placeholder="Business Unit" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" readonly id="form6Example8">
                                                    <div class="input-group-append">
                                                        <button type="button" id="model" class="btn btn-primary"
                                                            data-toggle="modal" data-target="#myModal5">
                                                            Select
                                                        </button>
                                                    </div>
                                                </div><br>



                                                <br>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                                                <button type="button"
                                                    class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                                <button type="submit" class="btn add btn-primary pt-2 m-1"
                                                    id="add">Add</button>
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




        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    <!-- Mainly scripts -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <script src="../../../Configration/js/globalConfig.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>

    <!-- jQuery UI -->
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

    <script src="../js/companyMaster.js?v=" + $.getCurrentVersion()></script>

    <script src="../../../UserMaster/js/businessmodal.js?v=" + $.getCurrentVersion()></script>

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>
  

    <!-- dataTable JS -->
    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../../cdn/js/dataTables.select.min.js"></script>