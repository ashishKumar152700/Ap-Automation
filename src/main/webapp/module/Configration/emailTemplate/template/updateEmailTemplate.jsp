<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Update Email Template</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../../../../static/css/plugins/summernote/summernote-bs4.css" rel="stylesheet">
    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/addEmailTemplate.css">

    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/jquery-2.1.1.js"></script>
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

        <div class="wrapper wrapper-content ">
            <div class="row">
                <div class="col-lg-12 ">
                    <div class="card  mx-auto p-4 white-bg">
                        <div class="card-body ">
                            <div class="container ">
                                <form class="contact-form" id="form">
                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-1"></div>
                                            <div class="col-md-4">
                                                <div class="form-group"><label> Name*</label> <input type="text"
                                                        placeholder="Name" class="form-control" id="name" readonly required=""
                                                        maxlength="25"></div>
                                                <!-- <div class="form-group"><label> Applies to*</label> <input type="text"
                                                        placeholder="e.g. Contact" class="form-control" id="applies_to"
                                                        required="" maxlength="25"></div> -->
                                                <br>
                                                <div class="form-group"><label>Template Description*</label>
                                                </div>
                                            </div>
                                            <div class="col-2"></div>
                                            <div class="col-md-4">
                                                <div class="form-group"><label>Subject*</label> <input type="text"
                                                        placeholder="Subject" class="form-control" id="subject"
                                                        required="" maxlength="100"></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-1"></div>
                                            <div class="col-10">
                                                <div class="tabs-container ">
                                                    <ul class="nav nav-tabs" role="tablist">
                                                        <li><a class="nav-link active ravi" id="data" data-toggle="tab"
                                                                href="#tab-1">Email Configration</a></li>

                                                        <li><a class="nav-link" id="data1" data-toggle="tab"
                                                                href="#tab-2">Content</a></li>

                                                        <li><a class="nav-link" id="data1" data-toggle="tab"
                                                                href="#tab-3">Setting</a></li>
                                                    </ul>
                                                    <div class="tab-content">
                                                        <div role="tabpanel" id="tab-1" class="tab-pane active">
                                                            <div class="panel-body">
                                                                <div class="controls">
                                                                    <div class="row">
                                                                        <div class="col-1"></div>
                                                                        <div class="col-md-4">
                                                                            <div class="form-group"><label>From</label>
                                                                                <input type="email" id="send_email"
                                                                                    class="form-control"
                                                                                    >
                                                                            </div>

                                                                            <div class="form-group"><label>To (Emails)
                                                                                </label><input type="email"
                                                                                    id="to_email" class="form-control"
                                                                                    ></div>

                                                                            <!-- <div class="form-group">
                                                                                <label for="unitname">To
                                                                                    (Partners)</label>
                                                                                <input type="address" id="toPartners"
                                                                                    class="form-control"
                                                                                    >
                                                                            </div> -->

                                                                        </div>

                                                                        <div class="col-2"></div>
                                                                        <div class="col-md-4">
                                                                            <div class="form-group">
                                                                                <label for="unitname">Cc</label>
                                                                                <input type="address" id="cc"
                                                                                    class="form-control"
                                                                                    >
                                                                            </div>

                                                                            <div class="form-group">
                                                                                <label for="unitname">Reply
                                                                                    To</label>
                                                                                <input type="address" id="toPartners"
                                                                                    class="form-control"
                                                                                    >
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <br>

                                                                    <div class="col-11 d-flex justify-content-end">
                                                                        <input type="button"
                                                                            class="btn btn-primary nextt"
                                                                            value="Next">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div role="tabpanel" id="tab-2" class="tab-pane">
                                                            <!-- <form class="contact-form" id="form1"> -->
                                                                <div class="panel-body">
                                                                    <div class="controls">
                                                                        <div class="row">
                                                                            <div class="col-lg-12  fadeInRight">
                                                                                <div class="border">
                                                                                    <!-- <form> -->
                                                                                        <textarea id="summernote" name="editordata"></textarea>
                                                                                    <!-- </form> -->
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <br>
                                                                        <div class="col-11 d-flex justify-content-end">
                                                                            <input type="button"
                                                                                class="btn btn-primary prev"
                                                                                value="Previous">&nbsp;&nbsp;
                                                                            <input type="button"
                                                                                class="btn btn-primary last"
                                                                                value="Next">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <!-- </form> -->
                                                        </div>
                                                        <div role="tabpanel" id="tab-3" class="tab-pane">
                                                            <div class="panel-body">
                                                                <div class="controls">
                                                                    <div class="row">
                                                                        <div class="col-1"></div>
                                                                        <div class="col-md-4">
                                                                            <div class="form-group"><label>Outgoing
                                                                                    Mail Server</label>
                                                                                <input type="text" id="outgoing_mail_server"
                                                                                    class="form-control"
                                                                                    >
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-2"></div>
                                                                        <div class="col-md-4">
                                                                        </div>
                                                                        <div
                                                                            class="px-2 offset-1 my-3 d-flex justify-content-start">
                                                                            <button
                                                                                class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                                                            <button type="submit"
                                                                                class="btn add btn-primary pt-2 m-1">Save
                                                                                Changes</button>
                                                                        </div>
                                                                        <div class="col-11 d-flex justify-content-end">
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
                                        </div>
                                    </div>
                                    <div class="px-2 offset-1 my-3 d-flex justify-content-start ">
                                        <button type="button" class="btn cancel btn-outline-danger pt-2 m-1">Cancel</button>
                                        <button type="submit" class="btn add btn-primary pt-2 m-1">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />
    </div>

    <script src="../js/updateEmailTemplate.js?v=" + $.getCurrentVersion()></script>
    
    <!-- Mainly scripts -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- SUMMERNOTE -->
    <script src="../../../../static/js/plugins/summernote/summernote-bs4.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>


    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>
   

    <!-- dataTable JS -->
    <!-- <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../../../../cdn/js/dataTables.select.min.js"></script> -->





</body>

</html>