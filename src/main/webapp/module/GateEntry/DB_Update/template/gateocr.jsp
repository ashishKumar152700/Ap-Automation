<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Gate</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/gate.css">



    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">

    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>




</head>

<body>


    <script>
        let sessionString = localStorage.getItem("userrole")

        let name = JSON.parse(sessionString);

        if(name != null)
        {
            if(name.includes("GATE")  || name.includes("Admin"))
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

        <div class="wrapper wrapper-content  ">

            <!-- <div class="ibox-content" id="loader">
                <div class="sk-spinner sk-spinner-double-bounce">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div> -->

          

            <div class="row">
                <div class="col-sm-8">
                    <div class="ibox ">
                        <div class="ibox-content py-3 d-flex">

                            <div class="col-6">
                                <div class="form-group row gate_number ">
                                    <div class="col-8"><h3 id="gate_number" class="my-1"></h3>
                                    </div>
                                </div>
                            </div>
                            
                            <table cellspacing="0" cellpadding="4" class="col-6">
                                <tbody>
                                    <tr id="filter_col3" data-column="1" class=" ">
                                        <td class=" col-12 ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <!-- <input type="text" class="form-control column_filter"
                                                        placeholder="Status" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col2_filter"> -->
                                                    <select name="cars" class="form-control column_filter select_vendor"
                                                        placeholder="Status" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="select_vendor">

                                                        <option >*</option>
                                                        <option >JSW</option>
                                                        <option >Purchase Order</option>
                                                        <option >Delivery Challan</option>
                                                    </select>
                                                    <div class="input-group-append " id="searchStatus">
                                                        <button class="btn btn-primary" type="button"
                                                            id="select_image">
                                                            <!-- <i class="fa fa-search"></i> -->
                                                            Select Vendor</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center"><input readonly type="checkbox"
                                                class="column_filter invisible" id="col2_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-3">
                            <input class="my-0 btn btn-primary invisible" type="file" id="preview_img" accept="*"
                                onchange="previewFile()" crossorigin />
                        </div>
                    </div>
                </div>

            </div>

            <div class="row invisible" id="preview_invoice">

                <div class="" id="loader">
                    <div class="" id="spin">
                        <div class="sk-double-bounce1"></div>
                        <div class="sk-double-bounce2"></div>
                    </div>
                <div class="col-lg-12 "> 
                    <div class="card mx-auto p-4 white-bg">
                        <div class="card-body ">
                            <div class="container ">

                                <div class="upload-image box border bg-body rounded d-f" id="hide" style="z-index: 1;">
                                    <div class="container-fluid h-100 p-0 ravi" id="preview_invoice">
                                        <!-- <input class="my-1" type="file" id="inputimg" accept="*" onchange="previewFile()" crossorigin /> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                     
                            <button class="btn btn-primary pt-2 m-1" id="send_ocr">Submit</button>
                          </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <br>


        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

    <script>
        function previewFile() {
                const file = document.querySelector('input[type=file]').files[0];
                console.log(file.name);
                let extension = file.name.split('.');
                extension = extension.reverse();

                console.log(extension[0]);
                if (extension[0] == "jpg") {
                    $(".ravi").children().remove();
                    $(".ravi").append(`<img class="w-100 h-100" src="" id="preview_img"></img>`)
                    const preview = document.querySelector('img');
                    const reader = new FileReader();
                    var filename = file.name;


                    reader.addEventListener("load", function () {
                        preview.src = reader.result;
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                } else if (extension[0] == "pdf") {
                    $(".ravi").children().remove();
                    $(".ravi").append(`<iframe data="" type="application/pdf" class="w-100 h-100"></iframe>`)
                    const preview = document.querySelector('iframe');
                    const reader = new FileReader();
                    var filename = file.name;


                    reader.addEventListener("load", function () {
                        preview.data = reader.result;
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }
            }
    </script>

    <script src="../../../../custom/js/breadcrumb.js"></script>

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

    <!-- Gate JS -->


    <!-- breadcrumb JS -->
    <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->


    <script src="../../../../cdn/js/sweetalert2.js"></script>

    <script src="../js/gateocr.js?v=" + $.getCurrentVersion()></script>



   



    <script>


    // }
    </script>


</body>

</html>