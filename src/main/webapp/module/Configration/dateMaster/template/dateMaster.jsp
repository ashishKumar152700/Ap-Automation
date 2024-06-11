<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Date Master</title> 

   <jsp:include page="../../../Basic/template/favicon.jsp" />

    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">
    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../statusMaster/css/status.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css">


    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->
    <script src="../../../../cdn/js/sweetalert2.js"></script>  







    <style>
        #modalbutton{
            padding: 5px !important;
            margin-top: -21px;
        }
        #modalbutton1{
            padding: 8px !important;
            margin-top: -25px;
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
        
    
    <!-- Add modal for date -->
    <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="close">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Date Picker -->
                    <div class="form-group mb-4">
                        <input type="text" placeholder=" Date Format" class="form-control" id="date">

                    </div>
                </div>
                <div class="modal-footer" id="modalbutton">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                    <button type="button" class="btn btn-primary" id="saveDate">Save Date</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="close">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Date Picker -->
                    <div class="form-group mb-2">
                        <input class="d-none" type="text" placeholder="ID" class="form-control" id="editidformat" >
                    </div>
                    <div class="form-group mb-4">
                        <input type="text" placeholder=" Date Format" class="form-control" id="editDateInput">
                    </div>
                </div>
                <div class="modal-footer"  id="modalbutton1">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="editDate">Save Changes</button>
                </div>
            </div>
        </div>
    </div>

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
                                                        placeholder="Date Format" aria-label="Admin Theme"
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
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#exampleModalCenter">
                                    Add Date
                                </button>
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
                                    <th class="text-left" data-hide="phone">Date Format </th>
                                    <!-- <th class="text-left" data-hide="phone">Date Editable</th> -->
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
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

    <!-- DateMaster JS -->
    <script src="../js/dateMaster.js"></script>
    <script src="../js/addDateMaster.js"></script>


    <script src="../../../Configration/js/globalConfig.js"></script>

    
    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>

    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>

 
    

</body>



</html>
