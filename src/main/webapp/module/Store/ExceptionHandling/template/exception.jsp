<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Flaw-Fix</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/gate.css">

    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">

    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">

    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>


    <!-- <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"> -->

    <link rel="stylesheet" href="../../../../cdn/css/jquery-ui.css">
    <script src="../../../../cdn/js/sweetalert2.js"></script>


</head>

<body>



    <script>
         let sessionString = localStorage.getItem("userrole")

         let name = JSON.parse(sessionString);

         if(name != null)
         {
             if(name.includes("Flaw Fix") || name.includes("Admin"))
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
                <div class="sk-spinner sk-spinner-double-bounce">
                    <div class="sk-double-bounce1"></div>
                    <div class="sk-double-bounce2"></div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="ibox ">
                            <div class="ibox-content py-3 d-flex">
                                <table cellspacing="0" cellpadding="4" class="col-3">
                                    <tbody>
                                        <tr id="filter_col2" data-column="1" class=" ">
                                            <td class=" col-12 ">
                                                <label for="col1_filter"> <b>Gate Number</b></label>
                                                <div class="d-flex">
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
                                            <td align="center"><input readonly type="checkbox"
                                                    class="column_filter d-none" id="col1_smart" checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellspacing="0" cellpadding="4" class="col-3">
                                    <tbody>
                                        <tr id="filter_col3" data-column="1" class=" ">
                                            <td class=" col-12 ">
                                                <label for="col2_filter"> <b>Status</b></label>
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
                                                        <!-- <div class="input-group-append" id="searchStatus">
                                                            <button class="btn btn-primary" type="button"
                                                                id="button-addon2">
                                                                Status</button>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </td>
                                            <td align="center"><input readonly type="checkbox"
                                                    class="column_filter d-none" id="col2_smart" checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
    
                                <table cellspacing="0" cellpadding="4" class="col-3">
                                    <tbody>
                                        <tr id="filter_col2" data-column="1" class="">
                                            <td class="col-12">
                                                <label for="col3_filter"> <b>Date</b></label>
                                                <div class="d-flex ">
                                                    <div class="input-group">
                                                        <!-- <input type="text" name="" id="" class="form-control"> -->
                                                        <input type="text" class="form-control column_filter"
                                                            placeholder="DD-MM-YYYY" aria-label="Admin Theme"  id="col3_filter" autocomplete="off"/>
                                                            <label class="input-group-text d-none" id="calendar" for="dateInput">
                                                                <i class="fa fa-calendar" ></i>
                                                              </label>
                                                        <!-- <input type="date" class="form-control column_filter"
                                                            placeholder="Gate Number" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" id="date_cal"> -->
                                                    </div>
                                                </div>
    
                                                <!-- <div class="input-group">
                                                    <input type="text" id="textInput" class="form-control"/>
                                                    <div class="input-group-append">
                                                      <label class="input-group-text" for="dateInput">
                                                        <i class="far fa-calendar"></i>
                                                      </label>
                                                      <input type="date" id="dateInput" class="d-none" onchange="setDateValue()" />
                                                    </div>
                                                  </div> -->
                                            </td>
                                            <td align="center"><input readonly type="checkbox"
                                                    class="column_filter d-none" id="col3_smart" checked="checked">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
    
                                <table cellspacing="0" cellpadding="4" class="col-3">
                                    <tbody>
                                        <tr id="filter_col3" data-column="1" class=" ">
                                            <td class=" col-12 ">
                                                <label for=""> <b>Transaction Type</b></label>
                                                <div class="d-flex ">
                                                    <div class="input-group ">
                                                        <select name="" class="form-control column_filter"
                                                            placeholder="Transaction" aria-label="Admin Theme"
                                                            aria-describedby="button-addon2" id="Transaction">
                                                            <option value="">*</option>
                                                            <option value="Material_Bill">Material Bill</option>
                                                            <option value="Service_PO">Service PO</option>
                                                            <option value="Job_Work">Job Work</option>
                                                            <option value="ST/OT">ST/OT</option>
                                                            <option value="Credit_Note">Credit Note</option>
                                                            <option value="Debit_Note">Debit Note</option>
                                                            <option value="ServiceWithMaterial">Service With Material</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>
                                            <td align="center"><input readonly type="checkbox"
                                                    class="column_filter d-none" id="Transaction1" checked="checked">
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
                                    <a class="btn btn-primary" id="add_invoice" href="../template/addInvoice.jsp"><i
                                            class="fa fa-plus"> </i>
                                        Add
                                        Invoice</a>
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
                                    <th class="text-left" data-hide="phone,tablet">Vendor Code</th>
                                    <th class="text-left" data-hide="phone,tablet">Vendor Name</th>
                                    <th class="text-left" data-hide="phone">Invoice No.</th>
                                    <th class="text-left" data-hide="phone">Vehicle No.</th>
                                    <th class="text-left" data-hide="phone,tablet">Scan Date</th>
                                    <th class="text-left" data-hide="phone">Report Time</th>
                                    <th class="text-left" data-hide="phone">Trans. Type</th>
                                    <th class="text-left" data-hide="phone">Out Time</th>
                                    <th class="text-left" data-hide="phone">Status</th>
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        </div>
        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />

    </div>

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



    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>
    <script src="../js/exception.js?v=" + $.getCurrentVersion()></script>



    <script>


// var sessionString =  sessionStorage.getItem("userrole")
//  var auth = JSON.parse(sessionString);

// if (auth.includes("GATE")) {

//         $(window).load(()=>{
//             $("#loader").addClass("sk-loading")
//         })

//         $(document).ready(() => {

        //     var test = $.test()

        //     var status1;
        //     function editbutton() {
        //         if (status1 == "Scan") {
        //             return '<button class="btn btn-outline-success btn-sm edit">Edit</button>&nbsp;&nbsp;';
        //         } else {
        //             return '<button class="btn btn-outline-success btn-sm" disabled>Edit</button>&nbsp;&nbsp;';
        //         }
        //     }
        //     function cancelbutton() {
        //         if (status1 == "Scan") {
        //             return '<button class="btn btn-outline-danger btn-sm cancel">Cancel</button>&nbsp;&nbsp;';
        //         } else {
        //             return '<button class="btn btn-outline-danger btn-sm" disabled>Cancel</button>&nbsp;&nbsp;';
        //         }
        //     }


        //     var tab = $("#Dtable").DataTable({

                // dom: '<"top">t<"bottom"ilp>',
                // ordering: true,
                // processing: true,
                // ajax: {
                //     url: `${test}/gate/get`,
                //     dataSrc: "data",
                //     complete : ()=>{
                //         $("#loader").removeClass("sk-loading")
                //         $("#loader").removeClass("ibox-content")
                //         $(".sk-spinner").addClass("d-none")
                //     }
                // },


        //         columns: [
        //             { data: "id" },
        //             { data: "gate_number" },
        //             { data: "vehicle_nbr" },
        //             { data: "vendorname" },
        //             { data: "in_time" },
        //             { data: "remark" },
        //             {
        //                 data: "status.label", render: function (data, type, row, meta) {

        //                     status1 = data;
        //                     // alert(data.status)
        //                     // console.log(data);
        //                     if (data == "Scan") {

        //                         return `
        //             <div class="btn-group">
        //                 <div class="label label-primary">${data}</div>&nbsp;  
        //             </div>`
        //                     }
        //                     else if (data == "Verification") {
        //                         return `
        //             <div class="btn-group">
        //             <div class="label label-secondary">${data}</div>&nbsp
        //             </div>`
        //                     }
        //                     else if (data == "Quality") {
        //                         return `
        //             <div class="btn-group">
        //             <div class="label label-success">${data}</div>&nbsp  
        //             </div>`
        //                     }
        //                     else if (data == "Finance") {
        //                         return `
        //             <div class="btn-group">
        //             <div class="label label-warning">${data}</div>&nbsp  
        //             </div>`
        //                     }
        //                     else if (data == "Voucher") {
        //                         return `
        //             <div class="btn-group">
        //             <div class="label label-info">${data}</div>&nbsp  
        //             </div>`
        //                     }
        //                     else if (data == "Canceled") {
        //                         return `
        //             <div class="btn-group">
        //             <div class="label label-danger">${data}</div>&nbsp  
        //             </div>`
        //                     }
        //                 }
        //             },
        //             {
        //                 data: "id", render: function (data, type, row, meta) {

        //                     return `
        //             <div class="btn-group"> 
        //             ${cancelbutton()}
        //             ${editbutton()}
        //             <button class='btn btn-outline-success btn-sm view'>View</button>&nbsp;&nbsp;
        //             </div>`
        //                 }
        //             },
        //         ],


        //         columnDefs: [
        //             {
        //                 "defaultContent": "-",
        //                 "targets": "_all"
        //             },
        //             { responsivePriority: 1, targets: 0 },
        //             { responsivePriority: -2, targets: 5 }
        //         ],

        //     });

        //     // console.log(editbutton());

        //     tab.column(0).visible(false);


        //     $('input.global_filter').on('keyup click', function () {
        //         filterGlobal();
        //     });


        //     $("#search").click(() => {
        //         $('#Dtable').DataTable().column(1).search(
        //             $('#col' + 1 + '_filter').val(),
        //             $('#col' + 1 + '_smart').prop('checked')
        //         ).draw();
        //     })

        //     $("#col2_filter").change(() => {

        //         $('#Dtable').DataTable().column(6).search(
        //             $('#col' + 2 + '_filter').val(),
        //             $('#col' + 2 + '_smart').prop('checked')
        //         ).draw();
        //     })


        //     $("#Dtable").on("click", ".cancel", function () {

        //         var test = $.test()
                
        //         var code=999;

        //         var raw = $(this).closest("tr").children();
        //         var row = tab.row(raw).data().id;
        //         console.log(row);

        //         const swalWithBootstrapButtons = Swal.mixin({
        //             customClass: {
        //                 confirmButton: 'btn btn-sm btn-success mx-1',
        //                 cancelButton: 'btn btn-sm btn-danger mx-1'
        //             },
        //             buttonsStyling: false
        //         })


        //         swalWithBootstrapButtons.fire({
        //             title: 'Are you sure?',
        //             text: "You won't be able to revert this!",
        //             icon: 'warning',
        //             showCancelButton: true,
        //             confirmButtonText: 'cancel',
        //             cancelButtonText: 'Ignore',
        //             reverseButtons: true
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 $.ajax({
        //                     url: `${test}/gate/updatestatus/${row}`,
        //                     type: "put",
        //                     dataSrc: "data",
        //                     data: JSON.stringify({
        //                         status:{code},
        //                     }),
        //                     headers: {
        //                         'Accept': 'application/json',
        //                         'Content-Type': 'application/json'
        //                     },
        //                     success: function (data) {
        //                         window.location.reload();
        //                     },
        //                     error:function(xhr){
        //                         console.log(xhr);
        //                     }

        //                 })
        //             }
        //             else if (
        //                 result.dismiss === Swal.DismissReason.cancel
        //             ) {
        //                 swalWithBootstrapButtons.fire(
        //                     'Cancelled',
        //                     'Your Data is safe :)',
        //                 )
        //             }
        //         })
        //     })




        //     $("#Dtable").on("click", ".edit", function () {
        //         var test = $.test()
        //         var raw = $(this).closest("tr").children();
        //         var row = tab.row(raw).data().id;
        //         var row1 = tab.row(raw).data();
        //         // console.log();

        //         $.ajax({
        //             url: `${test}/gate/get/${row}`,
        //             dataSrc: "data",
        //             success: function (data) {
        //                 // console.log(data);
        //                 sessionStorage.setItem('object', JSON.stringify(data.data))
        //                 window.location.href = `../template/updateGate.jsp`;
        //             }
        //         })
        //     })


        //     $("#Dtable").on("click", ".view", function () {
        //         var test = $.test()
        //         var raw = $(this).closest("tr").children();
        //         var row = tab.row(raw).data().id;

        //         $.ajax({
        //             url: `${test}/gate/get/${row}`,
        //             dataSrc: "data",
        //             success: function (data) {
        //                 console.log(data);
        //                 sessionStorage.setItem('object', JSON.stringify(data.data))
        //                 window.location.href = `../template/view.jsp`;
        //             }
        //         })
        //     })

        //     $.ajax({
        //         url: 'http://192.168.0.177:8050/status/get',
        //         async: false,

        //         // Type of Request
        //         type: "GET",

        //         success: function (data) {

        //             for (let i = 0; i < data.data.length; i++) {
        //                 // console.log();
        //                 // console.log(data.data[i].code);
        //                 // console.log(data.data[i].label);

        //                 $b = $(`<option value="${data.data[i].label}">${data.data[i].label}</option>`);
        //                 $("#col2_filter").append($b);
        //             }

        //         },

        //         // Error handling
        //         error: function (error) {
        //             console.log(`Error ${error}`);
        //         }
        //     });


        //     $("#myModal5").on('hide.bs.modal', function () {
        //         $("#countries").children().remove();
        //     })




    //         $("#add_user").click(() => {
    //             window.open("adduser.jsp", "_self");
    //         })
    //     });
    // }
    // else{
    //     window.open("../../../Basic/template/404.jsp" , "_self")
    // }
    </script>


</body>

</html>