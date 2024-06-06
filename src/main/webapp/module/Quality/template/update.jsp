<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Update Quality</title>
    <jsp:include page="../../Basic/template/favicon.jsp" />
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../static/css/style.css" rel="stylesheet">



    <link href="../css/addQuality.css" rel="stylesheet">


    <script src="../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../custom/adjustable-invoice/css/index.css">

    <script src="../../../static/js/bootstrap.js"></script>

    <link rel="stylesheet" href="../../../cdn/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../../../cdn/css/responsive.dataTables.min.css">

    <script src="../../../cdn/js/sweetalert.min.js"></script>
    <script src="../../../cdn/js/sweetalert2.js"></script>




    <style>
        /* .form-control {
            padding: 2px 2px !important;
            height: 30px;
        } */

        .form-group {
            margin-bottom: 0.6rem;
        }

        label {
            display: inline-block;
            margin-bottom: .5rem;
        }

        .container-fluid {
            padding: 0px !important;
        }

        .resize {
            margin-bottom: 0.8rem !important;
        }


        /* .py-3 {
            padding-bottom: 4rem !important;

        } */

        .py-2 {
            padding-bottom: 0.7rem !important;
        }

        /* option:focus {
            background-color: #24537F !important;
        }

        div.dataTables_length select option:hover{
            color: green !important;
            background-color: blue !important;
        } */

        #Dtable_length>label>select>option {
            /* color:  !important; */
            /* background-color: #24537F !important; */
        }
        .card{
            flex-direction: row !important;
        }
        .gate_number{
            padding-top:11px ;
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
                    if(item.id == 25){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                    }
                  }
              )
              let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Quality")  || name.includes("Admin"))
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
        <jsp:include page="../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../Basic/template/breadcrumb.jsp" />

        <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span
                                aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <div class="tabs-container white-bg">
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="ibox ">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading">
                                                QA Result
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-1"></div>
                                                    <div class="col-5">
                                                        <div class="form-group"><label>Item Number
                                                            </label> <input type="text" id="F43121_LITM" readonly=""
                                                                class="form-control " style="font-weight: bold;">
                                                        </div>


                                                        <div class="form-group"><label>Branch Number
                                                            </label> <input type="text" id="F43121_MCU" readonly=""
                                                                class="form-control" style="font-weight: bold;">
                                                        </div>

                                                        <div class="form-group"><label>Quantity
                                                        </label> <input type="text" id="F43121_UREC" readonly=""
                                                            class="form-control" style="font-weight: bold;">
                                                    </div>
                                                    </div>
                                                    <hr>
                                                    <div class="col-5">

                                                        <div class="form-group"><label>Item Decscription
                                                            </label> <input type="text" id="form6Example8" readonly=""
                                                                class="form-control" style="font-weight: bold;">
                                                        </div>
                                                        <div class="form-group"><label>Purchase Order
                                                            </label> <input type="text" id="F43121_DOC" readonly=""
                                                                class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-1"></div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-1"></div>
                                                    <div class="col-3">
                                                        <div class="form-group"><label>Accept Quantity
                                                            </label> <input type="text" id="accept"
                                                                class="form-control validate"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-3">
                                                        <div class="form-group"><label>Reject Quantity
                                                            </label> <input type="text" id="reject"
                                                                class="form-control validate"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="form-group"><label>In Review Quantity
                                                            </label> <input type="text" id="in_review"
                                                                class="form-control validate"
                                                                style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="col-1"></div>
                                                </div>
                                                <div class="offset-1 text-danger d-none " id="message">Quantity is not
                                                    matched</div>

                                                <br>
                                                <div class="row">
                                                    <div class="col-1"></div>
                                                    <div class="col-11 ">
                                                        <input type="button" class="btn btn-primary" id="qa_submit"
                                                            value="Submit">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-white close" id="close_btn"
                                data-dismiss="modal">Close</button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">

            <div class="row">
                <div class="col-sm-12">
                    <!-- <div class="ibox "> -->
                        <div class="card mx-auto white-bg">
                            <div class="col-5">
                                <div class="form-group row gate_number ">
                                    <div class="col-9"><h3 id="gate_number"></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-7">
                                <jsp:include page="../../Basic/template/statusnavigation.jsp" />
                            </div>
                        </div>
                    <!-- </div> -->
                </div>
                <!-- <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-2">
                            <div class="text-center my-2">
                                <a class="btn btn-primary" href="../template/addQuality.jsp"><i class="fa fa-plus"> </i>
                                    Add Quality</a>
                            </div>
                        </div>
                    </div>


                </div> -->

            </div>
            <br>

            <form id="formABC" action="#">
                <!-- <div class="row">
                    <div class="col-sm-8">
                        <div class="ibox ">
                            <div class="ibox-content py-3">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="ibox">
                            <div class="ibox-content py-2">
                                <div class="text-center  my-2 resize d-flex justify-content-center">
                                    <input type="submit" class="btn btn-primary mx-2" id="invoice" value="Submit Invoice">

                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="container-fluid  d-flex my-1 bg-white ">
                    <div class="upload-image box p-0 d-fix p-2 border rounded  " style="z-index: 1;">
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            Organization Details
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-6 b-r" id="form1">

                                                    <div class="form-group row"><label class="col-3">Company
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="company_code" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>


                                                    <div class="form-group row"><label class="col-3">Document Number
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="document_nbr" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-6" id="form2">
                                                    <div class="form-group row"><label class="col-3">Business
                                                            Unit</label>
                                                        <div class="col-9">
                                                            <input type="text" id="business_unit" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-3">State
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="state" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            Invoice Detail
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">

                                                <div class="col-6 b-r" id="form3">
                                                    <div class="form-group row"><label class="col-3">Invoice No
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="invoice_no" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>

                                                    <div class="form-group row"><label class="col-3">Invoice Type
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="invoice_type" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>


                                                </div>

                                                <div class="col-6" id="form4">
                                                    <div class="form-group row"><label class="col-3">Vendor Code
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="Vendor_code" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-3">Type
                                                        </label>
                                                        <div class="col-9">
                                                            <input type="text" id="type" readonly="" class="form-control" style="font-weight: bold;">
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>


                            <div class="row">
                                <div class="col-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            QA
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">

                                                <div class="col-12" id="form3">

                                                    <table id="Dtable" class="display responsive nowrap text-left row_col" style="width: 100%">

                                                        <thead>
                                                            <tr><th class="text-left" data-toggle="true">Doc No</th>
                                                            <th class="text-left" data-hide="phone">Item Number</th>
                                                            <th class="text-left" data-hide="phone">Business Unit</th>
                                                            <th class="text-left" data-hide="phone,tablet">Order Number
                                                            </th>
                                                            <th class="text-left" data-hide="phone,tablet">Quantity
                                                            </th>
                                                            <th class="text-left" data-hide="phone,tablet">Amount
                                                            </th>
                                                            <th class="text-left" data-hide="phone,tablet">Status</th>
                                                        </tr></thead>
                                                        <tbody id="tbodyy">
                                                        </tbody>
                                                    </table>

                                                </div>



                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </form>

        </div>
        <!--% including footer %-->
        <jsp:include page="../../Basic/template/footer.jsp" />

    </div>

        <!-- Mainly scripts -->
        <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
        <script src="../../../static/js/popper.min.js"></script>
        <script src="../../../static/js/bootstrap.js"></script>
        <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
        <script src="../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

        <!-- Custom and plugin javascript -->
        <script src="../../../static/js/inspinia.js"></script>
        <script src="../../../static/js/plugins/pace/pace.min.js"></script>
        <script src="../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>


        <script src="../../Configration/js/globalConfig.js"></script>
        <script src="../../Store/invoice/js/addInvoice.js"></script>
        <!-- <script src="../js/view.js"></script> -->

        <!-- jQuery UI -->

        <!-- breadcrumb JS -->
        <script src="../../../custom/js/breadcrumb.js"></script>

    

        <!-- dataTable JS -->
        <script src="../../../cdn/js/jquery.dataTables.min.js"></script>
        <script src="../../../cdn/js/dataTables.responsive.min.js"></script>

        <script src="../js/addQuality.js?v=" + $.getCurrentVersion()></script>

        <script src="../../Basic/js/updatestatus.js"></script>
</body>

</html>