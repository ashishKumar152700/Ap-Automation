<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Appointment Request</title>

    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">

    <link href="../../../static/css/plugins/iCheck/custom.css" rel="stylesheet">

    <link href="../../../static/css/plugins/fullcalendar/fullcalendar.css" rel="stylesheet">
    <link href="../../../static/css/plugins/fullcalendar/fullcalendar.print.css" rel='stylesheet' media='print'>

    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">
    <script src="../../../static/js/jquery-2.1.1.js"></script>



    <script src="../../../cdn/js/jspdf.min.js"></script>

    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
    <!-- <link rel="stylesheet" href="../../../custom/css/userslist.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="../../UserMaster/css/users.css" rel="stylesheet">

    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">
    <script src="../../../cdn/js/sweetalert2.js"></script>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script> -->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script> -->

    <!-- <link rel="stylesheet" href="../css/roleMaster.css"> -->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script> -->

    <!-- <script src="https://cdn.jsdelivr.net/npm/bwip-js@1.8/bwip-js-min.js"></script> -->

    <!-- <style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid black;
    }

    th, td {
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }</style> -->





    <!-- Mainly scripts -->
    <script src="../../../static/js/plugins/fullcalendar/moment.min.js"></script>
    <script src="../../../static/js/popper.min.js"></script>
    <script src="../../../static/js/bootstrap.js"></script>
    <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../static/js/inspinia.js"></script>
    <script src="../../../static/js/plugins/pace/pace.min.js"></script>

    <script src="../../../cdn/js/bwip-js-min.js"></script>
    <!-- jQuery UI -->
    <script src="../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>

    <!-- <script src="../js/JsBarcode.all.min.js"></script> -->

    <!-- <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script> -->
    
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script> -->


    <!-- iCheck -->
    <script src="../../../static/js/plugins/iCheck/icheck.min.js"></script>

    <!-- Full Calendar -->
    <script src="../../../static/js/plugins/fullcalendar/fullcalendar.min.js"></script>



    <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../cdn/js/dataTables.responsive.min.js"></script>

    <script src="../../../cdn/js/sweetalert.min.js"></script>

</head>

<body>

    <script>
        let sessionString = localStorage.getItem("userrole")
        let menus = JSON.parse(localStorage.getItem("menuData"))
        let menuroles;
        let name = JSON.parse(sessionString);

        let data_menu = menus.map((item)=> {
            if(item.id == 106){
                menuroles = item.assignroles.map((value)=> value.rolecode)
            }
            }
        )
        let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
          
         if(name != null)
         {
            //  if(name.includes("Admin"))
            if(returned_arr.flat(Infinity).includes(true)) {

            }
            else {
                window.location.href = "../../Basic/template/404.jsp";
            }
        }
        else {
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
                                                            placeholder="Visitor Name" aria-label="Admin Theme"
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
                                    <!-- <a class="btn btn-primary " href="addRole.jsp">Scheduled Appointment</a> -->
                                    <button class='btn btn-primary' id="Scheduled_Appointment">Scheduled
                                        Appointment</button>


                                    <div id="content" class="d-none"></div>

                                    <!-- <button id="pdf">PDF</button> -->

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row ">
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-content">

                                <table id="role" class="display responsive nowrap text-left" style="width: 100%">

                                    <thead>
                                        <th class="text-left">ID</th>
                                        <th class="text-left">Name</th>
                                        <th class="text-left">Company</th>
                                        <th class="text-left">Mobile No.</th>
                                        <th class="text-left">Email</th>
                                        <th class="text-left">From Date & Time</th>
                                        <th class="text-left">To Date & Time</th>
                                        <th class="text-left">Action</th>
                                    </thead>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- <div class="modal inmodal fade" id="myModal7" tabindex="2" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2>visitor Gate Pass</h2>
                            </div>
                            <div id="customers" class="modal-body edit">
                                <div class="d-flex justify-content-center">

                                    <div class="">
                                        <div class="row border justify-content-center">
                                            <h2>visitor Gate Pass</h2>
                                        </div><br>
                                        <div class="row border py-1">
                                            <div class="col-6 ">
                                                <div class="font-weight-bold">Gate Number</div>

                                                <p id="modal_gate_number"></p>

                                                <div> Visitor Name</div>
                                                <span id="modal_first_name" class="font-weight-bold"></span>
                                                <span id="modal_last_name" class="font-weight-bold"></span>
                                            </div>
                                            

                                        </div><br>
                                        <div  class="row border p-3 ">
                                            <table class="">
                                                <tr>
                                                    <th>Field</th>
                                                    <th class="px-5">Value</th>
                                                </tr>
                                                <tr>
                                                    <td>Mobile Number</td>
                                                    <td id="mobileNumber" class="px-5">Your Mobile Number</td>
                                                </tr>
                                                <tr>
                                                    <td>Visitor Name</td>
                                                    <td id="visitorName" class="px-5">Visitor's Name</td>
                                                </tr>
                                                <tr>
                                                    <td>Visitor Company</td>
                                                    <td id="visitorCompany" class="px-5">Your Mobile Number</td>
                                                </tr>
                                                <tr>
                                                    <td>Visitor Email</td>
                                                    <td id="visitorEmail" class="px-5">Your Mobile Number</td>
                                                </tr>
                                                <tr>
                                                    <td>Emergency Contact Number</td>
                                                    <td id="emergencyContactNo" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Location</td>
                                                    <td id="location" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Department</td>
                                                    <td id="department" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Approver</td>
                                                    <td id="approver" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>To Meet</td>
                                                    <td id="toMeet" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>From Date</td>
                                                    <td id="fromDate" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>To Date</td>
                                                    <td id="toDate" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>From Time</td>
                                                    <td id="fromTime" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>To Time</td>
                                                    <td id="toTime" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Equipment</td>
                                                    <td id="equipment" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Material Name</td>
                                                    <td id="materialName" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Material Identity Number</td>
                                                    <td id="materialIdentityNumber" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Returnable</td>
                                                    <td id="returnable" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Purpose of Material</td>
                                                    <td id="purposeOfMaterial" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Vehicle</td>
                                                    <td id="vehicle" class="px-5"></td>
                                                </tr>
                                                <tr>
                                                    <td>Vehicle Number</td>
                                                    <td id="vehicleNumber" class="px-5"></td>
                                                </tr>
                                            </table>
                                        </div><br>
                                        <div class="row border d-flex justify-content-center p-3">
                                            <canvas id="barcode"></canvas>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer m-2">
                                <button type="button" class="btn btn-white" data-dismiss="modal">Cancel</button>
                                <button class="btn btn-primary pt-2 m-1" id="confirm" data-toggle="modal"
                                    data-target="#myModal7">Confirm</button>
                                <button class="btn btn-primary pt-2 m-1" id="print_tab" type="button">Print</button>
                            </div>

                        </div>
                    </div>
                </div> -->


                <div id="customers" class="edit d-none">
                    <div class="row">
                    </div>
                    <div class="row">
                        <img src="RSB_logo.png" alt="" width="100" height="50" style="float: right; margin-right: 5vw;">
                        <canvas id="barcode"></canvas>
                    </div>
                    <div class="row" style="margin-bottom: 5px;">
                        <table class="">
                            <tbody>
                                <tr>
                                    <th style="padding-right: 100px;">Your Details</th>
                                    <th class="px-5"> </th>
                                </tr>
                                <tr>
                                    <td>Visitor Name</td>
                                    <td id="visitorName" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Mobile Number</td>
                                    <td id="mobileNumber" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Visitor Company</td>
                                    <td id="visitorCompany" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Visitor Email</td>
                                    <td id="visitorEmail" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Emergency Contact Number</td>
                                    <td id="emergencyContactNo" class="px-5"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row" style="margin-bottom: 1vw;">
                        <table class="">
                            <tbody>
                                <tr>
                                    <th style="padding-right: 100px;">Meeting Details</th>
                                    <th class="px-5"> </th>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td id="location" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td id="department" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Approver</td>
                                    <td id="approver" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>To Meet</td>
                                    <td id="toMeet" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>From Date</td>
                                    <td id="fromDate" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>To Date</td>
                                    <td id="toDate" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>From Time</td>
                                    <td id="fromTime" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>To Time</td>
                                    <td id="toTime" class="px-5"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <table class="">
                            <tbody>
                                <tr>
                                    <th>Other Details</th>
                                    <th class="px-5">  </th>
                                </tr>
                                
                                <tr>
                                    <td>Equipment</td>
                                    <td id="equipment" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Material Name</td>
                                    <td id="materialName" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Material Identity Number</td>
                                    <td id="materialIdentityNumber" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Returnable</td>
                                    <td id="returnable" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Purpose of Material</td>
                                    <td id="purposeOfMaterial" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Vehicle</td>
                                    <td id="vehicle" class="px-5"></td>
                                </tr>
                                <tr>
                                    <td>Vehicle Number</td>
                                    <td id="vehicleNumber" class="px-5"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <div class="row">
                        <canvas id="barcode"></canvas>
                    </div> -->
                    <!-- <div class="d-flex justify-content-center">
                    </div> -->
                </div>
                <!-- <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                
                                <h4 class="modal-title">Visitor Details</h4>
                            </div>
                            <div class="modal-body">
                                <form class="contact-form" id="form">
                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-1"></div>
                                            <div class="col-md-4">
                                                <div class="form-group"><label>Visitor Name</label> <input type="text"
                                                        readonly class="form-control" id="visitorName"></div>
                                                <div class="form-group"><label>Mobile Number</label> <input type="text"
                                                        readonly class="form-control" id="mobileNumber"></div>
                                                <div class="form-group"><label>Emergency Contact No</label> <input
                                                        type="text" readonly class="form-control"
                                                        id="emergencyContactNo"></div>
                                                <div class="form-group"><label>Department</label> <input type="text"
                                                        readonly class="form-control" id="department"></div>
                                                <div class="form-group"><label>To Meet</label> <input type="text"
                                                        readonly class="form-control" id="toMeet"></div>

                                            </div>
                                            <div class="col-2"></div>
                                            <div class="col-md-4">
                                                <div class="form-group"><label>Visitor Company</label><input type="text"
                                                        readonly id="visitorCompany" class="form-control"></div>
                                                <div class="form-group"><label>Visitor Email</label><input type="text"
                                                        readonly id="visitorEmail" class="form-control"></div>
                                                <div class="form-group"><label>Location</label><input type="text"
                                                        readonly id="location" class="form-control"></div>
                                                <div class="form-group"><label>Approve</label><input type="text"
                                                        readonly id="approver" class="form-control"></div>

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

                <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">

                                <div class="ibox-content" id="loader1">
                                    <div class="sk-spinner sk-spinner-double-bounce">
                                        <div class="sk-double-bounce1"></div>
                                        <div class="sk-double-bounce2"></div>
                                    </div>


                                    <div class="tabs-container white-bg">
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="ibox ">
                                                    <div class="ibox-content py-0">
                                                        <div class="my-3">
                                                            <h2 class="font-bold d-inline" id=""></h2>
                                                        </div>
                                                        <div class="mb-4">
                                                            <p class="font-bold d-inline">Visitor Name :
                                                            <h3 class="d-inline" id="MvisitorName"></h3>
                                                            </p>
                                                        </div>
                                                        <div class="">
                                                            <p class="font-bold d-inline">Email :
                                                            <div class="d-inline" id="MvisitorEmail"></div>
                                                            </p>
                                                        </div>

                                                        <div class="hr-line-dashed py-0"></div>

                                                        <div class="tabs-container ">
                                                            <ul class="nav nav-tabs" role="tablist">
                                                                <li><a class="nav-link active ravi" id="data"
                                                                        data-toggle="tab" href="#tab-1">Visitor Info.
                                                                    </a>
                                                                </li>
                                                                <li><a class="nav-link" id="data1" data-toggle="tab"
                                                                        href="#tab-2">Meeting Details</a></li>


                                                            </ul>
                                                            <div class="tab-content">
                                                                <div role="tabpanel" id="tab-1" class="tab-pane active">
                                                                    <div class="panel-body">
                                                                        <form class="contact-form" id="form1">
                                                                            <div class="controls">
                                                                                <div class="row">
                                                                                    <div class="col-1"></div>
                                                                                    <div class="col-md-5">
                                                                                        <div class="form-group">
                                                                                            <label>Visitor's
                                                                                                Company</label> <input
                                                                                                type="text"
                                                                                                id="MvisitorCompany"
                                                                                                readonly
                                                                                                class="form-control font-bold"></input>
                                                                                        </div>

                                                                                        <div class="form-group">
                                                                                            <label>Visitor's Emergency
                                                                                                Contact No</label><input
                                                                                                type="address"
                                                                                                id="MemergencyContactNo"
                                                                                                readonly
                                                                                                class="form-control">
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- <div class="col-2"></div> -->
                                                                                    <div class="col-md-5">
                                                                                        <div class="form-group">
                                                                                            <label>Mobile No.</label>
                                                                                            <input type="text"
                                                                                                id="MmobileNumber"
                                                                                                readonly
                                                                                                class="form-control font-bold">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                                <div role="tabpanel" id="tab-2" class="tab-pane">
                                                                    <div class="panel-body">
                                                                        <form class="contact-form" id="form1">
                                                                            <div class="controls">
                                                                                <div class="row">
                                                                                    <div class="col-1"></div>
                                                                                    <div class="col-md-5">
                                                                                        <div class="form-group">
                                                                                            <label>Department</label>
                                                                                            <input type="text"
                                                                                                id="Mdepartment" readonly
                                                                                                class="form-control font-bold"></input>
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label>Location</label><input
                                                                                                type="address"
                                                                                                id="Mlocation" readonly
                                                                                                class="form-control">
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label>From
                                                                                                Date</label><input
                                                                                                type="address"
                                                                                                id="MfromDate" readonly
                                                                                                class="form-control">
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label>To Date</label><input
                                                                                                type="address"
                                                                                                id="MtoDate" readonly
                                                                                                class="form-control">
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- <div class="col-2"></div> -->
                                                                                    <div class="col-md-5">
                                                                                        <div class="form-group">
                                                                                            <label>Person to
                                                                                                meet</label> <input
                                                                                                type="text" id="MtoMeet"
                                                                                                readonly
                                                                                                class="form-control font-bold">
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label>Approver</label>
                                                                                            <input type="text"
                                                                                                id="Mapprover" readonly
                                                                                                class="form-control font-bold">
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label>From Time</label>
                                                                                            <input type="text"
                                                                                                id="MfromTime" readonly
                                                                                                class="form-control font-bold">
                                                                                        </div>
                                                                                        <div class="form-group">
                                                                                            <label>To Time</label>
                                                                                            <input type="text"
                                                                                                id="MtoTime" readonly
                                                                                                class="form-control font-bold">
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
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal inmodal fade" id="myModal6" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <!-- <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> -->
                                <h4 class="modal-title">Visitor Details</h4>
                            </div>
                            <div class="modal-body">
                                <!-- Add this div for the calendar -->
                                <div id="calendar"></div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-white my-2" data-dismiss="modal">Close</button>
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


    <!-- breadcrumb JS -->
    <script src="../../Configration/js/globalConfig.js"></script>
    <!-- <script src="../../../custom/js/breadcrumb.js"></script> -->
    <!-- rolemaster JS -->
    <script src="../js/appointmentRequest.js"></script>

</body>

</html>