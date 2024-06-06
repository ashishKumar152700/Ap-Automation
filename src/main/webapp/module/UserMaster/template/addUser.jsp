<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Add User</title>

    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">

    <link href="../css/addUser.css" rel="stylesheet">

    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../cdn/css/select.dataTables.min.css">

    <script src="../../../static/js/jquery-2.1.1.js"></script>
    <script src="../../Configration/js/globalConfig.js"></script>

    <link rel="stylesheet" href="../../../custom/css/filter_multi_select.css">
    <script src="../../../custom/js/filter-multi-select-bundle.min.js"></script>


    <style>
        .hr-line-dashed {
            height: 20px;
            margin: 0px;
        }

        .form-group input {
            border: none;
            /* Remove the default input border */
            border-bottom: 1px solid #e6e6e6;
            /* Add a 1px solid black bottom border */
        }

        .form-group select {
            border: none;
            /* Remove the default select border */
            border-bottom: 1px solid #e6e6e6;
            /* Add a 1px solid black bottom border */
        }

        .filter-multi-select .viewbar {
            border: none;
            /* Remove the default border */
            border-bottom: 1px solid #e6e6e6;
            /* Add a 1px solid black bottom border */
        }

        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            color: #24537f !important;
            border-top-color: #24537f !important;
        }

        .nav-tabs .nav-link {
            border-top-width: 5px;
        }
    </style>



    <!-- Mainly scripts -->
    <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
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
    <script src="../../../cdn/js/sweetalert.min.js"></script>
    <!-- <script src="../../../cdn/js/sweetalert2.js"></script> -->




    <!-- breadcrumb JS -->
    <!-- <script src="../../../custom/js/breadcrumb.js"></script> -->

    <!-- dataTable JS -->
    <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../cdn/js/dataTables.select.min.js"></script>

</head>
<script>

</script>

<body>

    <script>
        let sessionString = localStorage.getItem("userrole")
        let menus = JSON.parse(localStorage.getItem("menuData"))
        let menuroles;
        let name = JSON.parse(sessionString);

        
        if(name != null)
        {
             let data_menu = menus.map((item)=> {
                 if(item.id == 12){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                 }
     
                 }
             )
             let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Admin") || name.includes("USER"))
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

        <div class="wrapper wrapper-content  ">
            <div class="" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>
                <div class="row">


                    <div class="col-lg-12 ">
                        <div class="card mx-auto p-4 white-bg">
                            <div class="card-body ">
                                <div class="container ">

                                    <form class="contact-form" id="form">
                                        <div class="controls">
                                            <!-- <h3>Credential</h3>
                                            <div class="hr-line-dashed"></div> -->
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group"><label class="font-weight-bold">User
                                                            Name*</label> <input type="text" placeholder="Enter Name"
                                                            class="form-control" required="" id="form6Example1"></div>
                                                    <div class="form-group"><label
                                                            class="font-weight-bold">Password*</label> <input
                                                            type="password" required="" id="form6Example2"
                                                            placeholder="Password" class="form-control"></div>
                                                </div>
                                            </div>
                                            <h3>Personal Details</h3>
                                            <div class="hr-line-dashed"></div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group"><label class="font-weight-bold">First
                                                            Name*</label> <input type="text" required=""
                                                            id="form6Example3" placeholder="Enter First Name"
                                                            class="form-control"></div>
                                                    <div class="form-group">
                                                        <label class="font-weight-bold">Mobile No.*</label>
                                                        <input type="tel" required pattern="[0-9]{10}"
                                                            id="mobile_number" placeholder="Enter 10-Digit Mobile No."
                                                            class="form-control" maxlength="10" minlength="10">
                                                        <small class="text-danger" id="mobile_number_error"
                                                            style="display: none;">Please
                                                            enter a 10-digit mobile number.</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-group"><label class="font-weight-bold">Last
                                                            Name*</label> <input type="text" required=""
                                                            id="form6Example4" placeholder="Enter Last Name"
                                                            class="form-control"></div>

                                                    <div class="form-group"><label
                                                            class="font-weight-bold">Email*</label> <input type="email"
                                                            required="" id="form6Example7"
                                                            placeholder="Enter Email Address" class="form-control"
                                                            required=""></div>
                                                </div>
                                            </div>
                                            <h3>Access Rights</h3>
                                            <div class="hr-line-dashed"></div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <label for="unitname" class="font-weight-bold">Unit
                                                            Name*</label> <br>
                                                        <select id="unitname" name="unitname" placeholder="unit"
                                                            class="form-control">
                                                            <option value="" disabled selected>No Unit Name Selected
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <label for="gateId" class="font-weight-bold">Gate Id</label>
                                                        <br>
                                                        <select id="gateId" name="gateId" class="form-control">
                                                            <option value="" disabled selected>No Gate Id Selected
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="accessories" class="font-weight-bold">Role
                                                            Code*</label> <br>
                                                        <select name="roles" id="roles"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group" id="store_dynamic">
                                                        <label for="storeId" class="font-weight-bold">Store Id</label>
                                                        <select id="storeId" name="storeId" class="form-control">
                                                            <option value="" disabled selected>No Store Id Selected
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>    
                                                <div class="col-12 my-2">
                                                    <div class="form-check form-switch" >
                                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> &nbsp;
                                                        <label class="form-check-label" for="flexSwitchCheckChecked" style="font-weight: bold;" > Active User</label>
                                                      </div>
                                                </div>
                                            </div>

                                            <!-- <div class="row">
                                                <div class="col-12">
                                                    <div class="tabs-container ">
                                                        <ul class="nav nav-tabs" role="tablist">
                                                            <li><a class="nav-link ravi active" id="data"
                                                                    data-toggle="tab" href="#tab-1">
                                                                    <h3>Personal Details</h3>
                                                                </a></li>

                                                            <li><a class="nav-link" id="data1" data-toggle="tab"
                                                                    href="#tab-3">
                                                                    <h3>Access Rights</h3>
                                                                </a></li>
                                                        </ul>
                                                        <div class="tab-content">
                                                            <div role="tabpanel" id="tab-1" class="tab-pane active">
                                                                <div class="panel-body">
                                                                    <div class="controls">
                                                                        <div class="row">
                                                                            <div class="col-6">
                                                                                <div class="form-group"><label
                                                                                        class="font-weight-bold">First
                                                                                        Name*</label> <input type="text"
                                                                                        required="" id="form6Example3"
                                                                                        placeholder="Enter First Name"
                                                                                        class="form-control"></div>
                                                                                <div class="form-group">
                                                                                    <label
                                                                                        class="font-weight-bold">Mobile
                                                                                        No.*</label>
                                                                                    <input type="tel" required=""
                                                                                        pattern="[0-9]{10}"
                                                                                        id="mobile_number"
                                                                                        placeholder="Enter 10-Digit Mobile No."
                                                                                        class="form-control"
                                                                                        maxlength="10" minlength="10">
                                                                                    <small class="text-danger"
                                                                                        id="mobile_number_error"
                                                                                        style="display: none;">Please
                                                                                        enter a 10-digit mobile
                                                                                        number.</small>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <div class="form-group"><label
                                                                                        class="font-weight-bold">Last
                                                                                        Name*</label> <input type="text"
                                                                                        required="" id="form6Example4"
                                                                                        placeholder="Enter Last Name"
                                                                                        class="form-control"></div>

                                                                                <div class="form-group"><label
                                                                                        class="font-weight-bold">Email*</label>
                                                                                    <input type="email" required=""
                                                                                        id="form6Example7"
                                                                                        placeholder="Enter Email Address"
                                                                                        class="form-control"></div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-11 d-flex justify-content-end">
                                                                            <input type="button"
                                                                                class="btn btn-primary nextt"
                                                                                value="Next">
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div role="tabpanel" id="tab-3" class="tab-pane">
                                                                <div class="panel-body">
                                                                    <div class="controls">
                                                                        <div class="row">
                                                                            <div class="col-6">
                                                                                <div class="form-group">
                                                                                    <label for="unitname"
                                                                                        class="font-weight-bold">Unit
                                                                                        Name*</label> <br>
                                                                                    <select id="unitname"
                                                                                        name="unitname"
                                                                                        placeholder="unit"
                                                                                        class="form-control">
                                                                                        <option value="" disabled=""
                                                                                            selected="">No Unit Name
                                                                                            Selected
                                                                                        </option>
                                                                                        <option value="RSB UNIT - I">RSB
                                                                                            UNIT - I</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <div class="form-group">
                                                                                    <label for="gateId"
                                                                                        class="font-weight-bold">Gate
                                                                                        Id</label>
                                                                                    <br>
                                                                                    <select id="gateId" name="gateId"
                                                                                        class="form-control">
                                                                                        <option value="" disabled=""
                                                                                            selected="">No Gate Id
                                                                                            Selected
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-12">
                                                                                <div class="form-group">
                                                                                    <label for="accessories"
                                                                                        class="font-weight-bold">Role
                                                                                        Code*</label> <br>
                                                                                    <div id="roles"
                                                                                        class="filter-multi-select dropdown"
                                                                                        multiple="" tabindex="0">
                                                                                        <div
                                                                                            class="viewbar form-control dropdown-toggle">
                                                                                            <span hidden=""
                                                                                                class="col-form-label mr-2 text-dark"></span><span
                                                                                                hidden=""
                                                                                                class="mr-2">0/15</span><span
                                                                                                class="placeholder">No
                                                                                                Roles
                                                                                                Selected</span><span
                                                                                                class="selected-items"></span>
                                                                                        </div>
                                                                                        <div class="dropdown-menu">
                                                                                            <div
                                                                                                class="filter dropdown-item">
                                                                                                <input type="text"
                                                                                                    placeholder="Filter"
                                                                                                    class="form-control"><button
                                                                                                    type="button"
                                                                                                    tabindex="-1">×</button>
                                                                                            </div>
                                                                                            <div
                                                                                                class="items dropdown-item">
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles--1-chbx"
                                                                                                        name="roles"
                                                                                                        value=""
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles--1-chbx"
                                                                                                        class="custom-control-label">Select
                                                                                                        All</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-0-chbx"
                                                                                                        name="roles"
                                                                                                        value="USER"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-0-chbx"
                                                                                                        class="custom-control-label">USER</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-1-chbx"
                                                                                                        name="roles"
                                                                                                        value="FINANCE"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-1-chbx"
                                                                                                        class="custom-control-label">FINANCE</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-2-chbx"
                                                                                                        name="roles"
                                                                                                        value="STORE"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-2-chbx"
                                                                                                        class="custom-control-label">STORE</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-3-chbx"
                                                                                                        name="roles"
                                                                                                        value="GATE"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-3-chbx"
                                                                                                        class="custom-control-label">GATE</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-4-chbx"
                                                                                                        name="roles"
                                                                                                        value="QUALITY"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-4-chbx"
                                                                                                        class="custom-control-label">QUALITY</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-5-chbx"
                                                                                                        name="roles"
                                                                                                        value="MT BILL"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-5-chbx"
                                                                                                        class="custom-control-label">MT
                                                                                                        BILL</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-6-chbx"
                                                                                                        name="roles"
                                                                                                        value="Service PO"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-6-chbx"
                                                                                                        class="custom-control-label">Service
                                                                                                        PO</label></div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-7-chbx"
                                                                                                        name="roles"
                                                                                                        value="Voucher"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-7-chbx"
                                                                                                        class="custom-control-label">Voucher</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-8-chbx"
                                                                                                        name="roles"
                                                                                                        value="Admin"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-8-chbx"
                                                                                                        class="custom-control-label">Admin</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-9-chbx"
                                                                                                        name="roles"
                                                                                                        value="Unload"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-9-chbx"
                                                                                                        class="custom-control-label">Unload</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-10-chbx"
                                                                                                        name="roles"
                                                                                                        value="Training"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-10-chbx"
                                                                                                        class="custom-control-label">Training</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-11-chbx"
                                                                                                        name="roles"
                                                                                                        value="ERROR"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-11-chbx"
                                                                                                        class="custom-control-label">ERROR</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-12-chbx"
                                                                                                        name="roles"
                                                                                                        value="Visitor"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-12-chbx"
                                                                                                        class="custom-control-label">Visitor</label>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="dropdown-item custom-control">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id="roles-13-chbx"
                                                                                                        name="roles"
                                                                                                        value="SerV-maint"
                                                                                                        class="custom-control-input custom-checkbox"
                                                                                                        tabindex="-1"><label
                                                                                                        for="roles-13-chbx"
                                                                                                        class="custom-control-label">SerV-maint</label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-12">
                                                                                <div class="form-group"
                                                                                    id="store_dynamic">
                                                                                    <label for="storeId"
                                                                                        class="font-weight-bold">Store
                                                                                        Id</label>
                                                                                    <select id="storeId" name="storeId"
                                                                                        class="form-control">
                                                                                        <option value="" disabled=""
                                                                                            selected="">No Store Id
                                                                                            Selected
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div
                                                                                class="col-11 d-flex justify-content-end">
                                                                                <input type="button"
                                                                                    class="btn btn-primary nextt"
                                                                                    value="Previous">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> -->

                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="px-2 my-3 d-flex justify-content-start ">
                                                        <button type="button"
                                                            class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                                        <button type="submit"
                                                            class="btn add btn-primary pt-2 m-1">Add</button>
                                                    </div>
                                                    <div id="content" class="d-none"></div>
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
        </div>
        <br>
        <!--% including footer %-->
        <jsp:include page="../../Basic/template/footer.jsp" />

    </div>

    <script src="../../../custom/js/breadcrumb.js"></script>
    <!-- adduser JS -->
    <script src="../js/adduser.js?v=" + $.getCurrentVersion()></script>

    <!-- businessmodal JS -->
    <script src="../js/businessmodal.js?v=" + $.getCurrentVersion()></script>



</body>

</html>