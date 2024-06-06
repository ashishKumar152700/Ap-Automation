<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Invoice Training</title>
  <jsp:include page="../../../Basic/template/favicon.jsp" />
  <script src="../../../../static/js/jquery-3.1.1.min.js"></script>
  <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>

  <!-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" crossorigin="anonymous"></script> -->

  <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

  <link href="../../../../static/css/animate.css" rel="stylesheet">
  <link href="../../../../static/css/style.css" rel="stylesheet">

  




  <link rel="stylesheet" href="../../../../custom/adjustable-invoice/css/index.css">

  <!-- <link rel="stylesheet" href="../../../UserMaster/css/users.css"> -->

  <link rel="stylesheet" href="../css/addGate.css">

  <link rel="stylesheet" href="../../../../custom/cropper/css/cropper.css">
  <link rel="stylesheet" href="../../../../custom/cropper/css/main.css">


  <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">
  <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
  <!-- <link rel="stylesheet" href="../../../../cdn/css/select.dataTables.min.css"> -->
  <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">



  <script src="../../../../static/js/bootstrap.js"></script>

  <script src="../../../../cdn/js/sweetalert2.js"></script>
  <script src="../../../../cdn/js/sweetalert.min.js"></script>



  <style>
    /* .card{
            flex-direction: row !important;
        }
        .gate_number{
            padding-top:11px ;
        } */

    .variation {
      padding: 16px !important;
      font-size: 13px !important;
    }

    .upload-images {
      overflow: scroll;
      overflow-x: hidden;
    }


    .table {
      text-align: center;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }


    #Dtable_length>label {
      margin-bottom: 0rem;
      margin-top: 0.5rem;
    }

    #role_length>label {
      margin-bottom: 0rem;
      margin-top: 0.5rem;
    }

    .head>th {
      margin-bottom: 500px;
    }

    .search tr>td>input {
      padding: 5px 7px;
      outline: none;
    }

    .search {
      padding: 15px 0px;
    }

    #userlistadd {
      margin-right: 100px;
    }

    #userlistsearch {
      margin-right: 400px;
    }

    table.dataTable>tbody>tr.child span.dtr-title {
      min-width: 110px !important;
    }


    .my-2 {
      margin-top: .85rem !important;
      margin-bottom: .85rem !important;
    }

    .btn-outline-success {
      border-color: #24537f !important;
    }

    .btn-outline-success:hover {
      background-color: #24537f !important;
    }

    .btn-success {
      border: 1px solid #24537f !important;
      background-color: #24537f !important;
    }

    .paginate_button {
      border: 1px solid #24537f !important;
      background: white !important;
      transition: all .5s;

    }

    .paginate_button:hover {
      background: #24537f !important;
    }

    #Dtable_paginate {
      display: flex;
      justify-content: flex-start;
    }

    .paginate_button {
      border-radius: 0px !important;
    }

    .previous {
      border-top-left-radius: 5px !important;
      border-bottom-left-radius: 5px !important;
      border-right: none !important;
    }

    .paginate_button {
      margin: 0px !important;
      margin-top: .5rem !important;
      padding: 5px 10px !important;

    }

    .next {
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
      border-top-right-radius: 5px !important;
      border-bottom-right-radius: 5px !important;
      border-left: none !important;
    }

    #Dtable_paginate a:hover {
      color: #fff !important;
    }

    /* s */


    /* .modal-lg, .modal-xl {
    max-width: 800px !important;
    } */


    .inmodal .modal-header {
      text-align: left !important;
    }

    .modal-footer {
      padding-bottom: 0px !important;
    }

    .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
      color: #24537f !important;
      border-top-color: #24537f !important;

    }

    .nav-tabs .nav-link {
      border-top-width: 5px;

    }

    .inmodal .modal-header {
      text-align: left !important;
    }

    .modal-footer {
      padding-bottom: 0px !important;
    }

    .nav-tabs .nav-item.show .nav-link,
    .nav-tabs .nav-link.active {
      color: #24537f !important;
      border-top-color: #24537f !important;

    }

    .nav-tabs .nav-link {
      border-top-width: 5px;

    }

    .space {
      overflow: scroll;
    }

    .form-control:focus,
    .single-line:focus {
      border-color: #dde0e0;
    }

    .new_labels {
      border: 1px solid rgb(229, 230, 231);
      outline: none;
    }

    #contents {
      overflow-y: scroll;
    }
  </style>

  <script src="../../../Configration/js/globalConfig.js"></script>



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
            if(item.id == 28){
                menuroles = item.assignroles.map((value)=> value.rolecode)
            }
            }
        )
        let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
        //  if(name.includes("Training")  || name.includes("Admin"))
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

    <!--% Modal for Document company %-->
    <div class="modal inmodal fade" id="myModal7" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                class="sr-only">Close</span></button>
            <br><br>
            <table cellspacing="0" cellpadding="4">
              <tbody>
                <tr id="filter_col2" data-column="1" class=" ">
                  <td class=" col-12 ">
                    <div class="d-flex ">
                      <div class="input-group ">
                        <input type="text" class="form-control column_filter" placeholder="Vendor Number"
                          aria-label="Admin Theme" aria-describedby="button-addon2" id="col5_filter">
                        <div class="input-group-append" id="vendor_search">
                          <button class="btn btn-primary" type="button" id="button-addon"><i class="fa fa-search"></i>
                            Search</button>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td align="center"><input type="checkbox" class="column_filter invisible" id="col5_smart"
                      checked="checked">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-body">
            <table id="Vtable" class="display responsive nowrap text-left " style="width: 100%">
              <thead>
                <th class="text-left" data-hide="phone">
                  Vendor Number</th>
                <th class="text-left" data-hide="phone">
                  Description</th>
                <th class="text-left" data-hide="phone">
                  Vendor Tax</th>

              </thead>
              <tbody id="Vendor_body">
              </tbody>
            </table>
          </div>

          <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
            <button id="vendor" type="button" data-dismiss="modal" class="btn btn-primary">Select</button>
          </div>
        </div>
      </div>
    </div>


    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row d-none">
        <div class="col-lg-12 ">
          <div class="card mx-auto white-bg">
            <div class="col-5">
              <div class="form-group row gate_number ">
                <div class="col-8">
                  <h3 id="" class="my-1">Supplier Number</h3>
                </div>
              </div>
            </div>
            <div class="col-7">
              <jsp:include page="../../../Basic/template/statusnavigation.jsp" />
            </div>
          </div>
        </div>
      </div><br>

      <div class="row">
        <!-- <div class="col-sm-4">
          <div class="ibox">
            <div class="ibox-content py-2">
              <div class="text-center  my-2 resize d-flex justify-content-center">
              
                <input class="image-minimalize btn btn-primary px-4 mx-2" type="file" accept="image/jpeg"
                  id="preview_img" style="z-index: 1;"><br>
              </div>
            </div>
          </div>
        </div> -->
        <div class="col-sm-12">
          <div class="ibox ">
            <div class="ibox-content py-2">
              <!-- <h3 id="" class="">Supplier Number</h3> -->
              <div class="row my-1 py-1 justify-content-around">
                <div class="input-group col-2 p-0">
                  <!-- <label class="col-3 col-form-label p-0 mr-2">Vendor code</label>  -->
                  <input type="text" class="form-control input_size fetch_check" required="" placeholder="Vendor code"
                    aria-label="Admin Theme" aria-describedby="button-addon2" readonly id="vendor_code">
                  <!-- <div class=" input-group-append">
                    <button type="button" id="modeldata" class="btn btn-primary select" data-toggle="modal"
                      data-target="#myModal7">
                      Select
                    </button>
                  </div> -->
                </div>
                <!-- <div class=""> -->

                  <div class="col-3 p-0">

                    
                  <input type="text"
                    class="form-control input_size fetch_check  align-self-center font-weight-bold pr-0" required=""
                    placeholder="Vendor Name" aria-label="Admin Theme" aria-describedby="button-addon2" readonly=""
                    id="vendor_name">
                  </div>

                  <div class="col-2 p-0">
                    <input type="text"
                    class="form-control input_size fetch_check align-self-center font-weight-bold pr-0" required=""
                    placeholder="Template Number" aria-label="Admin Theme" aria-describedby="button-addon2" readonly=""
                    id="template_number">
                  </div>
                  <div class="col-2 p-0">
                    <select  name="dateformate" id="date_formate" class="form-control">
                      
                      
                    </select>
                  </div>
 
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <div class="col-2 p-0" style="display: flex;align-items: center;">
                    <input class="form-check-input" type="checkbox" id="override_taxable_value">
                      <label class="form-check-label" for="override_taxable_value">
                          OverRide Taxable Value
                      </label>
                  </div>


                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-md-9 docs-buttons d-flex justify-content-center">
          <!-- <h3>Toolbar:</h3> -->
          <div class="btn-group">
            <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="move" title="Move">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;setDragMode&quot;, &quot;move&quot;)">
                <span class="fa fa-arrows-alt"></span>
              </span>
            </button>
            <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;setDragMode&quot;, &quot;crop&quot;)">
                <i class="fa fa-crop"></i>
              </span>
            </button>
          </div>



          <div class="btn-group">
            <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="" id="ui-id-2">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;zoom&quot;, 0.1)">
                <span class="fa fa-search-plus"></span>
              </span>
            </button>
            <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="" id="ui-id-1">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;zoom&quot;, -0.1)">
                <span class="fa fa-search-minus"></span>
              </span>
            </button>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-primary" id="fetch_value">
              <!-- <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.crop()">
              </span> -->
              <span class="fa fa-check"></span>
            </button>
            <button type="button" class="btn btn-primary" data-method="clear" title="Clear">
              <span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.clear()">
                <span class="fa fa-times"></span>
              </span>
            </button>
          </div>

          <div class="btn-group btn-group-crop d-none">
            <button type="button" class="btn btn-success" data-method="getCroppedCanvas"
              data-option="{ &quot;maxWidth&quot;: 4096, &quot;maxHeight&quot;: 4096 }">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;getCroppedCanvas&quot;, { maxWidth: 4096, maxHeight: 4096 })">
                Get Cropped Canvas
              </span>
            </button>
            <!-- <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 160, &quot;height&quot;: 90 }">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;getCroppedCanvas&quot;, { width: 160, height: 90 })">
                160×90
              </span>
            </button>
            <button type="button" class="btn btn-success" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 320, &quot;height&quot;: 180 }">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="" data-original-title="$().cropper(&quot;getCroppedCanvas&quot;, { width: 320, height: 180 })">
                320×180
              </span>
            </button> -->
          </div>


          <div class="btn-group">
            <button type="button" id="cross" class="btn btn-primary invisible" data-method="clear" title="Clear">
              <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title=""
                data-original-title="$().cropper(&quot;clear&quot;)">
                <span class="fa fa-times"></span>
              </span>
            </button>
          </div>


          <!-- Show the cropped image in modal -->
          <div class="modal fade docs-cropped" id="getCroppedCanvasModal" aria-hidden="true"
            aria-labelledby="getCroppedCanvasTitle" role="dialog" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="getCroppedCanvasTitle">Cropped</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">Ã—</span>
                  </button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <a class="btn btn-primary" id="download" href="javascript:void(0);"
                    download="cropped.jpg">Download</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    <div class="ibox-content sk-loading" id="loader">
      <div class="sk-spinner sk-spinner-double-bounce" id="spin1">
          <div class="sk-double-bounce1"></div>
          <div class="sk-double-bounce2"></div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <div class="ibox ">
              <div class="ibox-content">
                <div class="row">
                  <div class="col-sm-12">
                    <!-- <form role="form"> -->
    
                    <div class="img-container">
                      <!-- <img id="image" src="images/JSW.jpg" alt="Picture"> -->
                      <!-- <img src="images/JSW.jpg" height="200" alt="Image preview..."> -->
    
                      <img id="image" src="">
                    </div>
    
                    <!-- </form> -->
                  </div>
    
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="ibox ">
              <div class="ibox-content" id="contents">
                <h2>Invoice Label</h2>
    
                <div class="d-flex flex-column" id="assign_label">
                  <div id="require_feilds">
                    <h3 class="m-0"><label class="form-label">Required labels</label></h3>
                  </div>
                  <div id="header_feilds">
                    <h3 class="m-0 pt-2"><label class="form-label">Header labels</label></h3>
                  </div>
                  <div id="details_feilds">
                    <h3 class="m-0 pt-2"><label class="form-label">Details labels</label></h3>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
      

      <button type="button" class="btn btn-lg btn-primary" id="back_invoice">
        Back
      </button>
      <button type="button" class="btn btn-lg btn-primary " data-kt-stepper-action="submit" id="submit_invoice">
        Submit
      </button>

      <div class="docs-data">
        <div class="input-group input-group-sm d-none">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataX">x</label>
          </span>
          <input type="text" class="form-control" id="dataX" placeholder="Assign label">

          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
        <div class="input-group input-group-sm d-none">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataY">Y</label>
          </span>
          <input type="text" class="form-control" id="dataY" placeholder="y">
          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
        <div class="input-group input-group-sm d-none">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataWidth">Width</label>
          </span>
          <input type="text" class="form-control" id="dataWidth" placeholder="width">
          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>
        <div class="input-group input-group-sm d-none ">
          <span class="input-group-prepend">
            <label class="input-group-text" for="dataHeight">Height</label>
          </span>
          <input type="text" class="form-control" id="dataHeight" placeholder="height">
          <span class="input-group-append">
            <span class="input-group-text">px</span>
          </span>
        </div>


      </div>
      
    </div>
   



    <br>
    <!--% including footer %-->
    <jsp:include page="../../../Basic/template/footer.jsp" />

  </div>



  <script src="../../../../custom/js/breadcrumb.js"></script>

  

  <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
  <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>


  <!-- Mainly scripts -->
  <!-- <script src="static/js/jquery-2.1.1.js"></script> -->
  <script src="../../../../static/js/popper.min.js"></script>
  <script src="../../../../static/js/bootstrap.js"></script>
  <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
  <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

  <!-- Custom and plugin javascript -->
  <script src="../../../../static/js/inspinia.js"></script>
  <script src="../../../../static/js/plugins/pace/pace.min.js"></script>
  <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>


  <script src="../../../../cdn/js/dataTables.select.min.js"></script>


  <!-- breadcrumb JS -->
  <!-- <script src="../../../../custom/js/breadcrumb.js"></script> -->

  <script src="../../../Basic/js/updatestatus.js?v=" + $.getCurrentVersion()></script>




  <!-- <script src="../js/addGate.js"></script> -->


  <!-- addGate JS -->
  <script>

    var test = $.test();

    var login = $.login();
    

    $.ajax({

      type: 'GET',

      url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20V&%24limit=20000`,
      headers: {
        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
      },
      success: function (data) {

        var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;

        for (let i = 0; i < supplier.length; i++) {
          $("#Vendor_body").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
        }
      },
      error: function (xhr, ajaxOptions, throwError) {
        //Error block
      },
      complete: () => {


        table = $("#Vtable").DataTable({
          language: {
            'paginate': {
              'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
              'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
            }
          },
          dom: '<"top">t<"bottom"ip>',
          ordering: true,
          lengthMenu: [5, 10, 20, 25, 50],
          pagingType: "simple_numbers",
          select: true,
        });
        table.column(2).visible(false);

      }

    })




    $('#Vtable tbody').on('click', 'tr', function () {
      var dataa = table.row(this).data();
      var roww = $(this)[0];


      console.log(dataa[2]);
      function searchh(dataa) {
        $("#vendor_code").val(dataa[0]);
        $("#supplier_gstin").val(dataa[2]);
        $("#vendor_name").val(dataa[1]);


        $(roww).removeClass("selected");
      }

      $("#vendor").click(() => {


        searchh(dataa);

      })
    });

    $("#vendor_search").click(() => {
      $('#Vtable').DataTable().column(0).search(
        $('#col' + 5 + '_filter').val(),
        $('#col' + 5 + '_smart').prop('checked')
      ).draw();
    })

    $("#col5_filter").keypress((event) => {
      if (event.keyCode === 13) {
        $('#Vtable').DataTable().column(0).search(
          $('#col' + 5 + '_filter').val(),
          $('#col' + 5 + '_smart').prop('checked')
        ).draw();
      }
    });





  </script>
 

  <!-- cropper  -->




  <!-- <script>






    const preview = document.getElementById('preview_img');

    preview.addEventListener('change', (event) => {

      $("#loader").addClass("ibox-content")
      $("#loader").addClass("sk-loading")
      $(".sk-spinner").removeClass("d-none")

      const image = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(e){
        var imageData = e.target.result;
        localStorage.setItem("ocr_invoice",imageData);
      }      

      reader.readAsDataURL(image);

      reader.addEventListener('load', (e) => {
        
        let fd = new FormData();
        var files = $("#preview_img")[0].files[0];
        fd.append('file', files);
        console.log("setting image : ",files);

        sessionStorage.setItem('preview_invoice', JSON.stringify(reader.result));


        fetch('http://192.168.0.28:8888/api/imageocr', {
          method: 'POST',
          body: fd
        }).then(response => {

          console.log('Image uploaded successfully');
          // window.open("invoice.html","_self")
          return response.json()
        }).then(async (res) => {

          await localStorage.setItem("ocr_output", JSON.stringify(res))
          location.reload();
          $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
        })
          .catch(error => {
            // Handle any errors
            console.error('Error uploading image:', error);
          })


      });

    });</script> -->

  <script>

    const thumbnail = JSON.parse(sessionStorage.getItem('preview_invoice'));
    const previewImage = document.getElementById('image');

    $("#contents").css("height", $(".img-container")[0].offsetHeight + 50)
    if (thumbnail) {
      previewImage.setAttribute('src', thumbnail);

      setTimeout(() => {
        $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
      }, 2000);
      window.sessionStorage.removeItem('preview_invoice');
    } else {
      previewImage.setAttribute('src', '');
    }

    // fetch(`http://192.168.0.177:8050/invoice/6`)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         console.log(blob);
    //         const previewImage = document.getElementById('image');
    //         const objectURL = URL.createObjectURL(blob);
    //         sessionStorage.setItem('preview_invoice', JSON.stringify(objectURL));

         
    //         if (objectURL) {
    //           previewImage.setAttribute('src', objectURL);
        
    //           setTimeout(() => {
    //             $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
    //           }, 500);
    //           window.sessionStorage.removeItem('preview_invoice');
    //         } else {

    //         }
           
        // })
  </script>

  <script src="../../../../custom/cropper/js/cropper.js"></script>
  <script src="../../../../custom/cropper/js/extra.js"></script>
  <script src="../js/updateTraining.js?v=" + $.getCurrentVersion()></script>
  <script src="../../../../custom/cropper/js/updatemain.js"></script>


</body>

</html>