$(document).ready(() => {



  $(window).load(()=>{
    function clearCache() {
      // Get the current URL.
      const url = window.location.href;
    
      // Create a new Request object.
      const request = new Request(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
    
      // Fetch the request.
      fetch(request).then(() => {
        // The cache has been cleared.
      });
    }

    clearCache()
  })


  var test = $.test();
  var login = $.login();
  var vision = $.vision();
     // Function to convert data URL to Blob
  function dataURLToBlob(dataURL) {
  var byteString = atob(dataURL.split(',')[1]);
  var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
  }
  

  const token = JSON.parse(localStorage.getItem("token"));
  var sessionString = sessionStorage.getItem("object");
  const role_prov = JSON.parse(JSON.stringify("userrole"))
  let user_company = JSON.parse(localStorage.getItem("comapny"))
  let user_store = JSON.parse(localStorage.getItem("store"))
  var object = JSON.parse(sessionString);

  var clonnedObject = structuredClone(object)

  $("#vendorcode").val(object.vendor_code)
  $("#vendor_name").val(object.vendorname)
  $.checkstatus(object.id, true);
  var details = [];
  var details_payload = [];
  var rescan_counts = 0;
  let invoice_date_formate;
  let ocrImage;


  let fd = new FormData();
  let loopCount = 0;
  
  if(role_prov.includes("MT BILL"))
  {
    $("#Transaction").append(`
    <option value="" selected disabled>Select Transaction Type </option>
    <option value="Material_Bill">Material Bill</option>
    <option value="Job_Work">Job Work</option>
    <option value="ST/OT">ST/OT</option>
    `)
  }
  else{
    $("#Transaction").append(`
    <option value="" selected disabled>Select Transaction Type </option>
    <option value="Material_Bill">Material Bill</option>
    <option value="Service_PO">Service PO</option>
    <option value="Job_Work">Job Work</option>
    <option value="ST/OT">ST/OT</option>
    <option value="Credit_Note">Credit Note</option>
    <option value="Debit_Note">Debit Note</option>
    <option value="ServiceWithMaterial">Service With Material</option>
    `)
  }


  if($("#deliveryChallanNumber").val() != "")
  {
    $("#Transaction").val("Job_Work")
  }


  $("#Transaction").change(()=>{

    if($("#Transaction").val() != "Job_Work")
    {
      $("#deliveryChallanNumber").val("")
    }
    if($("#Transaction").val() == "Service_PO" || $("#Transaction").val() == "Handwritten_Bill" ){

      $(".control_check").removeAttr("readonly")
      $("#vendorcode").attr("readonly" , "readonly")
    }
    if($("#Transaction").val() == "Handwritten_Bill"){

      $("#po_no_search").removeClass("d-none")
      $("#po_number").attr("readonly" , "readonly")
      $("#po_type").attr("readonly" , "readonly")
      $("#po_number").val("")
      $("#po_type").val("")
      $("#vendor_code").attr("readonly" , "readonly")
      $("#vendorname").attr("readonly" , "readonly")
      $("#vendor_name").attr("readonly" , "readonly")
      $("#invoice_date").attr("type" , "date")

      $(".control_check").val("")
      
    }
    else{
      $("#po_no_search").addClass("d-none")
      $(".control_check").attr('readonly', 'true');
      $("#invoice_date").attr("type" , "text")
      }
  })

    user_company.map((value)=>{

      $("#unitname").append(`<option value="${value}">${value}</option>`);

    })
    
    user_store.map((value)=>{

      $("#storeId").append(`<option value="${value}">${value}</option>`);

    })




                    console.log('object.gate_number ---->' ,object.gate_number);

                    let rem_table = $("#remark_table").dataTable({
                      dom: '<"top">Rt<"bottom"ilp>',
                      ordering: false,
                      ajax: {
                          url: `${[test[0].url]}/remarks?gateNumber=${object.gate_number}`,
                          dataSrc : "data",
                          headers: {
                              'Authorization': 'Bearer ' + token,
                            },
                      },
                      columns: [

                          { data: "username" },
                          { data: "timestamp" },
                          { data: "label" },
                          { data: "remark" },
                      ],
                      columnDefs : [

                          {"className" : "dt-body-left" , "targets" : "_all"}
                      ],
                      // ordering: true,
                      // processing : true,
                      lengthMenu: [5, 10, 20, 25, 50],
                  })




 


  var tags = [];
  var codes = [];
  var tag_code = [];
  var tags_value = [];
  var invoice_pdf;
  let totalPdf_page;
  var obj;

  var convertedFile_attachment;


  console.log(object);

  var gate_number = $("#gate_number").html(object.gate_number);

  for (let i = 0; i < $(".check").length; i++) {
    const element = $(".check")[i];
    if (object[`${$(element).attr("id")}`]) {
      let out = object[`${$(element).attr("id")}`];

      // console.log(`${$(element).attr("id")}` , out);
      // // var result = out.replace(pattern, '');
      $(element).val(out);
    }
  }
  
  // var vehicle_nbr = $("#vehicle_nbr").val(object.vehicle_nbr);
  try {
    
    $("#invoice_number").val(object.invoice_number.replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, ''));
  } catch (error) {
    console.log("NO invoice number");
  }
  // var vendorname = $("#vendorname").val(object.vendorname);
  // var material_type = $("#material_type").val(object.material_type);
  // var weight = $("#weight").val(object.weight);
  // var gate_number = $("#gate_number").html(object.gate_number);
  // var in_time = $("#in_time").val(object.in_time);
  // var po_number = $("#po_number").val(object.po_number);
  // var po_type = $("#po_type").val(object.po_type);
  // var vendor_code = $("#vendor_code").val(object.vendor_code);
  // $("#deliveryChallanNumber").val(object.deliveryChallanNumber);
  // $("#workOrderNumber").val(object.workOrderNumber);
  $("#Transaction").val(object.transactionType)
  $("#storeId").val(object.storeId)

  // if(object.transactionType == "ST/OT")
  // {
  //   $("#Transaction").attr("disabled" , "disabled")
  // }
 










  if (object.tags.length == 0) {
    $("#roles").append(`<p class="border p-2 bg-primary">NO MISSING TAG</p>`);
  } else {
    object.tags.map((value) => {
      $("#roles").append(
        `<button type="button" name="${value.id}" class="btn border tagss my-1 mx-1 fa fa-tag"> ${value.label}</button>`
      );
    });
  }

  let gate_id = $("#gate_number").html();

  var xhr = new XMLHttpRequest();
  xhr.open("GET", `${[test[0].url]}/file/data?gate=${gate_id}`, true);
  xhr.responseType = "blob";
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.response);
      var blob = xhr.response;
      console.log(blob ,  "blob data" );

      // Set the desired file name and type
      var fileName = `${gate_id}.pdf`
      var fileType = blob.type; // You should use the appropriate MIME type

      // Create a File object from the Blob data
      convertedFile_attachment = new File([blob], fileName, { type: fileType });  
      // Now you can use the convertedFile as needed


      // ----setting image to form data for rescan
      var reader = new FileReader();
            
      reader.onload = function(e) {
        var imageData = e.target.result;
        invoice_pdf = imageData;
        sessionStorage.setItem('preview_invoice', JSON.stringify(imageData));  
        
        // sending image for ocr for updating the trained invoice 
        var ocr_image = dataURLToBlob(imageData);
        if (ocr_image) {
          const fileReader = new FileReader();
    
          fileReader.onload = function() {
              const arrayBuffer = this.result;
              // Initialize PDF.js
              pdfjsLib.getDocument(arrayBuffer).promise.then(function(pdf) {
                totalPdf_page = pdf.numPages;
                  
              });
          };
    
          fileReader.readAsArrayBuffer(ocr_image);
        } else {
            alert('Please select a PDF file.');
        }
        fd.append('file', ocr_image,fileName);
      };
      reader.readAsDataURL(blob)
    
      // ---- end setting image to form data for rescan


      var url;
      if (blob.size > 300) {
        url = URL.createObjectURL(blob);
        var iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";

        // Append the iframe to a container element
        var container = document.getElementById("preview");
        container.appendChild(iframe);

        // Clean up the temporary URL when the iframe is no longer needed
        iframe.onload = function () {
          
          URL.revokeObjectURL(url);
        };

        
      }
    } else {
      //   console.error("Request failed. Status: " + xhr.status);
    }
  };

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          setTimeout(() => {
            if(object.transactionType != "ST/OT" && object.transactionType != "Service_PO")
            {

              console.log(object.invoice_number == null);
              console.log(object.invoice_date == null);
              console.log(object.amount == 0);
              console.log(object.taxable_value == 0);
              console.log(object.po_number == 0);

              if($("#tab_logic_body tr").length == 0 || object.invoice_number == null || object.invoice_date == null || object.po_number == 0 || object.taxable_value == 0 || object.amount == 0)
              {
                if($("#vendor_code").val() != ""){
                  if (totalPdf_page==1) {
                    $("#rescan").trigger("click")
                    $("#loader_rescan").addClass("ibox-content")
                    $("#loader_rescan").addClass("sk-loading")
                    $("#spin_rescan").removeClass("d-none")
                    rescan_counts++
                  }
                }
              }
              else{
                for(let i = 0 ; i < object.details.length ; i++)
                {

                  if(object.details[i].unit_amount == 0 || object.details[i].quantity == 0)
                  {
                    if (totalPdf_page == 1) {
                      $("#rescan").trigger("click")
                      $("#loader_rescan").addClass("ibox-content")
                      $("#loader_rescan").addClass("sk-loading")
                      $("#spin_rescan").removeClass("d-none")
                      rescan_counts++
                      break;
                    }
                  }

                }
              }
            }
          }, 1000);
        } else {
            console.log("XHR request completed with an error");
        }
    }
};

  xhr.onerror = function (xhr) {
    if(xhr.status == 498)
    {
        $.tokenError();
    }
  };

  xhr.send();

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "p") {
      event.preventDefault();

      $(".row").hide();
      $("#hide").hide();
      $(".handler").hide();
      $(".row").addClass("vw-100");

      $("#print_invoice_page").removeClass("d-none");
      $("#print_invoice_page").show();
      $("#print_invoice_page").children().show();
      $("#print_invoice_page").children().children().show();
      $("#print_invoice_page").children().children().children().show();

      $("#modal_gate_id").html($("#gate_number").html());
      $("#modal_vendor_name").html($("#vendorname").val());
      $("#modal_vehicle_no").html($("#vehicle_nbr").val());
      $("#modal_invoice_no").html($("#invoice_number").val());
      $("#modal_material_type").html($("#material_type").val());
      $(".detail_po_no").html($("#po_number").val());
      $(".qty_1").html($("#weight").val());
      // $(".remark_1").html($("#remark").val())
      $("#modal_user_name").html($(".name")[1].innerText);
      var currentDate = new Date();

      var formattedDate = currentDate.toLocaleDateString();
      var formattedTime = currentDate.toLocaleTimeString();

      $("#data_time").html("  " + formattedDate + "   " + formattedTime);

      window.print();
    }
  });

  $("#print_tab").click(() => {
    $(".row").hide();
    $("#hide").hide();
    $(".handler").hide();
    $(".row").addClass("vw-100");

    $("#print_invoice_page").removeClass("d-none");
    $("#print_invoice_page").show();
    $("#print_invoice_page").children().show();
    $("#print_invoice_page").children().children().show();
    $("#print_invoice_page").children().children().children().show();

    $("#modal_gate_id").html($("#gate_number").html());
    $("#modal_vendor_name").html($("#vendorname").val());
    $("#modal_vehicle_no").html($("#vehicle_nbr").val());
    $("#modal_invoice_no").html($("#invoice_number").val());
    $("#modal_material_type").html($("#material_type").val());
    $(".detail_po_no").html($("#po_number").val());
    $(".qty_1").html($("#weight").val());
    // $(".remark_1").html($("#remark").val())
    $("#modal_user_name").html($(".name")[1].innerText);
    var currentDate = new Date();

    var formattedDate = currentDate.toLocaleDateString();
    var formattedTime = currentDate.toLocaleTimeString();

    $("#data_time").html("  " + formattedDate + "   " + formattedTime);

    window.print();
  });

  $(window).on("afterprint", function () {
    $(".row").show();
    $("#hide").show();
    $(".handler").show();
    $(".row").removeClass("vw-100");
    $("#print_invoice").css("display", "none");
  });


  

  $("#wrapper")
  .append(`    <div class="modal inmodal fade" id="myModal11" tabindex="2" role="dialog" aria-hidden="true">
<div class="modal-dialog modal-xl">
    <div class="modal-content">
        <div class="modal-header">
            <h2><strong>&nbsp;&nbsp;&nbsp; OCR INFORMATION</strong></h2>
        </div>
        <div class="modal-body">
            <div class="tabs-container">

                <ul class="nav nav-tabs" role="tablist">
        
                    <li><a class="nav-link active" data-toggle="tab" href="#tab-1">OCR Data</a></li>
        
                    <li><a class="nav-link" data-toggle="tab" href="#tab-2">Vendor Invoice</a></li>
        
                </ul>
        
                <div class="tab-content">
        
                    <div role="tabpanel" id="tab-1" class="tab-pane active">
                      <div class="panel-body">

                        <div class="panel panel-primary col-md-12 px-0">
                            <div class="panel-heading">
                                Vendor Billed To Shipped To
                            </div>
                            <div class="panel-body">
                                <div class="row">

                                    <div class="col-6 b-r" id="form3">

                                        <h4>Billed To</h4>
                                        <hr>

                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Name</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="billto_name">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Address 1</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control check" required=""
                                                    id="billto_address1">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Address 2</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control check" required=""
                                                    id="billto_address2">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Address 3</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control check" required=""
                                                    id="billto_address3">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">GSTIN</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="billto_gstin">
                                            </div>
                                        </div>


                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">City</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="billto_city">
                                            </div>
                                        </div>



                                        <div class="form-group row">
                                            <label class="col-3 col-form-label">State</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="billto_state">
                                            </div>
                                        </div>

                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Zip Code</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="billto_zipcode">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-6" id="form3">

                                        <h4>Shipped To</h4>

                                        <hr>

                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Name</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_name">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Address 1</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_address1">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Address 2</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_address2">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Address 3</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_address3">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">GSTIN</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_gstin">
                                            </div>
                                        </div>


                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">City</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_city">
                                            </div>
                                        </div>



                                        <div class="form-group row">

                                            <label class="col-3 col-form-label">State</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_state">
                                            </div>




                                        </div>

                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Zip Code</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="shipto_zipcode">
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="panel panel-primary col-md-12 px-0">
                            <div class="panel-heading">
                                Vendor Invoice Information
                            </div>
                            <div class="panel-body">
                                <div class="row">

                                    <div class="col-6 b-r" id="form3">

                                        <h4></h4>
                                        <!-- <hr> -->

                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Invoice no.</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="invoice_number">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">LR No.</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="lr_no">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Contract No.</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="contract_number">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Weight</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="weight">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Po Number</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="po_number">
                                            </div>
                                        </div>

                                        <div class="input-group col pb-3 p-0 ">
                                            <label class="col-3 col-form-label p-0 mr-2">EWAY
                                                BILL</label>
                                            <input type="text" class="form-control input_size check"
                                                readonly id="eway_Bill">
                                            <div class=" input-group-append">
                                                <button type="button" class="btn btn-primary validate">
                                                    Validate
                                                </button>
                                            </div>
                                        </div>

                                        
                                    </div>

                                    <div class="col-6" id="form3">

                                        <h4></h4>

                                        <!-- <hr> -->
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">LR Date</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="lr_date">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Contract Date</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="contract_date">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">State</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="state">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Vehicle Number</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="vehicle_nbr">
                                            </div>
                                        </div>
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Po Type</label>
                                            <div class="col-9"><input type="text"
                                                    class="form-control input_size check" required=""
                                                    id="po_type">
                                            </div>
                                        </div>

                                        <div class="input-group col p-0">
                                            <label class="col-3 col-form-label p-0 mr-2">IRN
                                                Number</label>
                                            <input type="text" class="form-control input_size check irn_number"
                                                required="" readonly id="irn_number">
                                            <div class=" input-group-append">
                                                <button type="button" class="btn btn-primary validate">
                                                    Validate
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                        <div class="panel panel-primary col-md-12 px-0">
                            <div class="panel-heading">
                                Product Detail Information
                            </div>
                            <div class="panel-body" Id="fix_scroll">
                                <div class="row">

                                    <table class="table table-bordered" id="tab_logic">
                                        <thead>
                                            <tr>
                                                <!-- <th class="text-center"> PO No. </th> -->
                                                <th class="text-center"> S No. </th>
                                                <th class="text-center"> Item Code </th>
                                                <th class="text-center"> Item Description </th>
                                                <th class="text-center"> Hsn Code </th>
                                                <th class="text-center"> UOM  </th>
                                                <th class="text-center"> Qty </th>
                                                <th class="text-center"> Unit Rate  </th>
                                                <th class="text-center"> Amount </th>

                                                <th class="text-center d-none"> Primary UOM </th>
                                                <th class="text-center d-none"> Primary Unit </th>
                                                <th class="text-center d-none"> Secondary UOM </th>
                                                <th class="text-center d-none"> Secondary Unit </th>
                                                <th class="text-center d-none"> Taxable Value </th>
                                                <th class="text-center d-none"> Freight </th>
                                                <th class="text-center d-none"> Pack Forwarding </th>
                                                <th class="text-center d-none"> Insurance </th>
                                                <th class="text-center d-none"> Custom Duty </th>
                                                <th class="text-center d-none"> Other Charges </th>
                                                <th class="text-center d-none"> Loading Unloading </th>
                                                <th class="text-center d-none"> Handling Charges </th>
                                                <th class="text-center d-none"> Detention Charges </th>
                                            


                                            </tr>
                                        </thead>
                                        <tbody id="tab_logic_body">

                                        </tbody>
                                    </table>


                                </div>

                            </div>

                        </div>

                        <div class="panel panel-primary col-md-12 px-0">
                        <div class="panel-heading">
                        TAX INFORMATION
                        </div>
                        <div class="panel-body">
                            <div class="row">
                  
                                <div class="col-6 b-r" id="form3">
                  
                                    <h4></h4>
                                    <!-- <hr> -->
                  
                                    <div class="form-group row"><label class="col-3 col-form-label">CGST RATE</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cgst_percentage" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">SGST RATE</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="sgst_percentage" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">IGST RATE</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="igst_percentage" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">CESS RATE</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cess_percentage" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">Taxable value</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="taxable_value" readonly="readonly">
                                        </div>
                                    </div>
                                </div>
                  
                                <div class="col-6" id="form3">
                  
                                    <h4></h4>
                  
                                    <!-- <hr> -->
                                    <div class="form-group row"><label class="col-3 col-form-label">CGST AMOUNT</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cgst_amount" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">SGST AMOUNT</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="sgst_amount" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">IGST AMOUNT</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="igst_amount" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">CESS AMOUNT</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cess_amount" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label class="col-3 col-form-label">Invoice Amount</label>
                                        <div class="col-9"><input type="text" class="form-control input_size check" required="" id="amount" readonly="readonly">
                                        </div>
                                    </div>
                                </div>
                  
                            </div>
                  
                        </div>
                  
                    </div>
                        


             





                </div>
        
                        
        
                    </div>
        
                    <div role="tabpanel" id="tab-2" class="tab-pane">
        
                      <div class="panel-body d-flex justify-content-center">
                        <canvas id="canvas" width="800" height="600"></canvas>
    
                    </div>
        
                    </div>
        
                </div>
        
        
        
        
        
            </div>



        </div>

        <div class="modal-footer m-2">
            <button type="button" class="btn btn-white" data-dismiss="modal" id="closeModal">Close</button>
            <input type="button" class="add_info btn btn-primary py-1 col-2" data-toggle="modal"
                data-target="#myModal15" id="modalCall" value="Additional Doc">
        </div>
    </div>
</div>
</div>`);

  for (let i = 0; i < $(".check").length; i++) {
    const element = $(".check")[i];
    if (object[`${$(element).attr("id")}`]) {
      let out = object[`${$(element).attr("id")}`];

      // console.log(out);
      // var pattern = /^[\W_]+|[\W_]+$/g;
      // console.log(out);
      // console.log(pattern);
      // // var result = out.replace(pattern, '');
      $(element).val(out);
    }
  }


  try {
    
    $("#invoice_number").val(object.invoice_number.replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, ''));
  } catch (error) {
    
    console.log("NO invoice number");
  }

  for (let i = 0; i < object.details.length; i++) {

    $("#tab_logic_body").append(`<tr>
  
    <td><input type="text" class="form-control input_size s_no text-center" readonly value="${object.details[i].s_no}" ></td>
    <td><input type="text" class="form-control input_size item_code text-center" readonly value="${object.details[i].item_code}" ></td>
    <td><input type="text" class="form-control input_size item_description text-center" readonly value="${object.details[i].description1}" ></td>
    <td><input type="text" class="form-control input_size fix hsn_code text-center" readonly value="${object.details[i].hsn_code}"></td>
    <td><input type="text" class="form-control input_size fix uom text-center" readonly value="${object.details[i].uom}"></td>
    <td><input type="text" class="form-control input_size fix quantity text-center" readonly value="${object.details[i].quantity}"></td>
    <td><input type="text" class="form-control input_size fix unit_amount text-center" readonly value="${object.details[i].unit_amount != null && object.details[i].unit_amount != "" ? object.details[i].unit_amount.replace(/[^\d.]/g, '') : object.details[i].unit_amount} "></td>
    <td><input type="text" class="form-control input_size fix amount text-center" readonly value="${object.details[i].amount != null && object.details[i].amount != "" ? object.details[i].amount.replace(/[^\d.]/g, '') : object.details[i].amount}"></td>

    </tr>`);


//     $("#tab_logic_body").append(`<tr>
//     <td><input type="text" class="form-control input_size item_code text-center" readonly value="${object.details[i].item_code}" ></td>
//     <td><input type="text" class="form-control input_size hsn_code text-center" readonly value="${object.details[i].hsn_code}"></td>
//     <td><input type="text" class="form-control input_size quantity text-center" readonly value="${object.details[i].quantity}"></td>
//     <td><input type="text" class="form-control input_size amount text-center" readonly value="${object.details[i].amount}"></td>
// </tr>`);

    $("#modal_table_details").append(`<tr>
            <td class="text-center border py-2 po_1" id="detail_po_no">${$(
              "#po_number"
            ).val()}</td>
            <td class="text-center border py-2 des_1" id="">${
              object.details[i].item_code
            }</td>
            <td class="text-center border py-2 qty_1">${
              object.details[i].quantity
            }</td>
            <td class="text-center border py-2 unit_1"></td>
            <td class="text-center border py-2 remark_1">............</td>
            </tr>`);
  }




  $(".check").attr("readonly", "readonly");
  $("#vehicle_nbr").removeAttr("readonly")




  // $("#form1").submit((e) => {
  //   e.preventDefault();
  //   var code = 200;

  //   // var span = $(".item");

  //   // span.map((index, value) => {
  //   //     codes.push(value.innerText.split("\n")[0])
  //   //     // console.log(codes);
  //   // })

  //   // // console.log(tags_value);
  //   // for (let i = 0; i < tags_value.length; i++) {

  //   //     for (let j = 0; j < codes.length; j++) {
  //   //         if (tags_value[i].hasOwnProperty(codes[j])) {

  //   //             tag_code.push(Object.values(tags_value[i]))

  //   //         }
  //   //     }
  //   // }

  //   // tag_code.flat(5000).map(value => {

  //   //     tags.push({ id: value })
  //   // })

  //   for (let i = 0; i < $(".tagss").length; i++) {
  //     tags.push({ id: $(".tagss")[i].attributes[1].value });
  //   }

  //   // $.sendEmail(object,"Gate");

  //   $.ajax({
  //     type: "PUT",
  //     url: `${[test[0].url]}/gate/put?id=${object.id}`,
  //     data: JSON.stringify({
  //       gate_number: $("#gate_number").html(),
  //       vendorname: $("#vendorname").val(),
  //       vehicle_nbr: $("#vehicle_nbr").val(),
  //       material_type: $("#material_type").val(),
  //       in_time: $("#in_time").val(),
  //       division: $("#division").val(),
  //       remark: $("#remark").val(),
  //       weight: $("#weight").val(),
  //       vendor_code: $("#vendor_code").val(),
  //       po_number: $("#po_number").val(),
  //       po_type: $("#po_type").val(),
  //       status: { code },
  //       tags: tags,
  //     }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       'Authorization': 'Bearer '+ token,
  //     },
  //     success: function (data, status, xhr) {
  //       // console.log(data);

  //       if (xhr.status == 200) {
  //         // console.log(data.data);
  //         $.sendEmail(data.data, "Gate");
  //       } 
  //       else{

  //             $.errorMessage(xhr.responseJSON.message);
  //       }
       
  //     },
  //     complete: () => {
  //       const swalWithBootstrapButtons = Swal.mixin({
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //         buttonsStyling: false,
  //       });

  //       swalWithBootstrapButtons
  //         .fire({
  //           title: "Gate updated",
  //           icon: "success",
  //           confirmButtonText: "OK",
  //           reverseButtons: true,
  //         })
  //         .then((result) => {
  //           window.open("../template/gate.jsp", "_self");
  //         });
  //     },
  //     error: function (xhr) {
  //       if(xhr.status == 498)
  //       {
  //           $.tokenError();
  //       }
  //       else if(xhr.status >= 400 && xhr.status < 500){

  //             $.errorMessage(xhr.responseJSON.message);
  //       }
  //       else{
  //             $.errorMessage(xhr.responseJSON.error)
  //       }
  //     },
  //   });
  // });

  console.log(gate_id);
  let additional_name = [];

  var uppy = Uppy.Core().use(Uppy.Dashboard, {
    inline: true,
    target: "#drag-drop-area",
  });
  // .use(Uppy.Tus, {endpoint: 'http://192.168.0.177:8050/ap_automation_backend/additional/document/add'})

  uppy.on("complete", (result) => {
    console.log(result.successful);
    // Call the custom API
    sendFilesToCustomAPI(result.successful);
  });

  $.ajax({
    url: `${[test[0].url]}/additional/document?gate=${gate_id}`,
    // async: false,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    success: function (data, status, xhr) {
      if (xhr.status == 200) {
        data.data.map((value) => {
          console.log("value", value);
          additional_name.push(value.name);

          if (value.name) {
            convertedFile = new File(
              [{ size: value.documentFileSize, type: value.type }],
              value.name,
              { type: value.type }
            );
            console.log("Converted File:", convertedFile);

            if (convertedFile) {
              uppy.addFile({
                source: "converted-file",
                name: convertedFile.name,
                type: convertedFile.type,
                data: convertedFile,
              });
            } else {
              console.log("No converted file available");
            }
          } else {
            console.log("No converted Blob available");
          }
        });
      }
      else{

            $.errorMessage(xhr.responseJSON.message);
      }
      
    },
    error: function (xhr) {
      if(xhr.status == 498)
      {
          $.tokenError();
      }
  }
  });

  function sendFilesToCustomAPI(files) {
    var formData = new FormData();
    // console.log(gate);
    // console.log("files :" ,files);
    let gate = $("#gate_number").html();
    files.forEach((files_arr) => {
      console.log("file data :", files_arr.data);
      formData.append("file", files_arr.data);
    });

    formData.append("gate", gate);
    // console.log(...file);

    $.ajax({
      url: `${[test[0].url]}/additional/document/add`,
      type: "POST",
      // async: false,
      data: formData,
      processData: false,
      contentType: false,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      success: function (response, status, xhr) {
        console.log(response);
        console.log(xhr);

        if (xhr.status == 200) {
          console.log("Files uploaded successfully");
          console.log("API response:", response);
          $("#skip").trigger("click");

          // Process the response from your API
          // window.open("../../gate/template/gate.jsp", "_self")
        }
        else{

              $.errorMessage(xhr.responseJSON.message);
        }
       
      },
      error: function (xhr, status, error) {
        if(xhr.status == 498)
        {
            $.tokenError();
        }
        else if(xhr.status >= 400 && xhr.status < 500){

              $.errorMessage(xhr.responseJSON.message);
        }
        else{
              $.errorMessage(xhr.responseJSON.error)
        }
      },
    });
  }




  // $.ajax({
  //     url: `${[test[0].url]}/tag/tags`,

  //     success: function (data, status, xhr) {

  //         data.data.map(value => {

  //             let code = value.id

  //             tags_value.push({ [`${value.label}`]: code })

  //             $("#roles").append(`<button type="button" class="btn border my-1 mx-1 fa fa-tag"> ${value.label}</button>`)
  //             // $("#roles").append(`<option value="${value.description}">${value.label}</option>`)

  //             // $("#roles").attr("multiple", "")

  //             // if(object.tags_value.length==0)
  //             // {
  //             //     $("#countries").append(`<p class="border p-2 bg-primary">NO TAG ASSIGNED</p>`)
  //             // }
  //             // else{

  //             //     object.tags.map((value)=>{

  //             //         $("#countries").append(`<button type="button" class="btn border my-1 mx-1 fa fa-tag"> ${value.label}</button>`)
  //             //     })
  //             // }
  //         })

  //         call();

  //     }

  // })

  // function call() {

  //     let tags = $("#roles").filterMultiSelect();

  //     for (let obj of object.tags) {
  //         // console.log(obj.label);
  //         tags.selectOption(obj.description)
  //     }
  // }


  $("#vendor_code_name").on("keyup", function (event) {
    
    isNaN($("#vendor_code_name").val() * 1) ?  $("#Vtable").DataTable().column(1).search($('#vendor_code_name').val()).draw() :  $("#Vtable").DataTable().column(0).search($('#vendor_code_name').val()).draw();

  });

  $("#VendorSearch").click(()=>{



    Vtable = $("#Vtable").DataTable({
      ajax : {
        url: `${[test[0].url]}/ocrtraining/get`,
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        },
        error: function (xhr) {
          if(xhr.status == 498)
          {
              $.tokenError();
          }
      },
        columns: [
              { data: "supplierNumber" },
              { data: "supplier_name"},
        ],
        columnDefs: [
            {
                "defaultContent": "-",
                "targets": "_all"
            },
        ],
      
      language: {
        paginate: {
          previous:
            '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          next: '<span class="next-icon"><i class="fa fa-angle-right"></i></span>',
        },
      },
      dom: '<"top">ft<"bottom"ilp>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      pagingType: "simple_numbers",
      select: true,
    });

    $("#vendor_code_name").val("")
    $("#Vendor_Search").trigger("click")
  })



  // $("#vendor_code_name_search").click(() => {
  //   let dynamic_vendor = isNaN($("#vendor_code_name").val() * 1) ? `$filter=F0101.ALPH CONTAINS ${$("#vendor_code_name").val()}` : `$filter=F0101.AN8 EQ ${$("#vendor_code_name").val()}`;

  //   console.log(dynamic_vendor);

  //   if ($("#vendor_code_name").val() != "") {
  //     // $("#loader5").addClass("ibox-content");
  //     // $("#loader5").addClass("sk-loading");
  //     // $("#spin5").removeClass("d-none");
  //     let vendor_code = $("#vendorcode").val();



   











  //     // $.ajax({
  //     //   url: `${[
  //     //     login[0].url,
  //     //   ]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&${dynamic_vendor}`,
  //     //   type: "GET",
  //     //   // async : false,
  //     //   headers: {
  //     //     Authorization:
  //     //       "Basic " +
  //     //       btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
  //     //   },
  //     //   success: function (data) {
  //     //     console.log(data);

  //     //     var record = data.fs_DATABROWSE_F0101.data.gridData.summary.records;

  //     //     $("#loader5").removeClass("ibox-content");
  //     //     $("#loader5").removeClass("sk-loading");
  //     //     $("#spin5").addClass("d-none");

  //     //     Vtable.destroy();
  //     //     $("#Vendor_body").empty();

  //     //     if (record > 0) {
  //     //       // $("#vendor_name").val(
  //     //       //     data.fs_DATABROWSE_F0101.data.gridData.rowset[0].F0101_ALPH
  //     //       // );
          

  //     //       let vendor_rows = data.fs_DATABROWSE_F0101.data.gridData.rowset;

  //     //       console.log(vendor_rows);

  //     //       for (let i = 0; i < vendor_rows.length; i++) {
  //     //         $("#Vendor_body").append(`<tr>
  //     //                   <td>${vendor_rows[i].F0101_AN8}</td>
  //     //                   <td>${vendor_rows[i].F0101_ALPH}</td>
  //     //                   </tr>`);
  //     //       }

  //     //       // $("#Vendor_Search").trigger("click");

            
  //     //     }
  //     //     if (record == 0) {
  //     //       swal("", "Vendor Not Present In JDE", "error").then(() => {
  //     //         $("#vendor_name").val("");
  //     //         $("#preview_img").addClass("invisible");
  //     //       });
  //     //     }
  //     //   },
  //     //   error: function (xhr) {
  //     //     console.log(xhr);
  //     //     swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(() => {
  //     //       $("#Vendor_body").empty();
  //     //       $("#vendor_name").val("");
  //     //       $("#loader5").removeClass("ibox-content");
  //     //       $("#loader5").removeClass("sk-loading");
  //     //       $("#spin5").addClass("d-none");
  //     //       $("#preview_img").addClass("invisible");
  //     //     });
  //     //   },
  //     //   complete: () => {
  //     //     Vtable = $("#Vtable").DataTable({
  //     //       language: {
  //     //         paginate: {
  //     //           previous:
  //     //             '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
  //     //           next: '<span class="next-icon"><i class="fa fa-angle-right"></i></span>',
  //     //         },
  //     //       },
  //     //       dom: '<"top">t<"bottom"ip>',
  //     //       ordering: true,
  //     //       lengthMenu: [5, 10, 20, 25, 50],
  //     //       pagingType: "simple_numbers",
  //     //       select: true,
  //     //     });
  //     //   },
  //     // });
  //   } else {
  //     swal("", "Please Enter The Vendor Name OR Vendor Code ", "error");
  //   }
  // });

  var  roww , supplierNumber , supplier_name;

  $("#Vtable tbody").on("click", "tr", function () {
    supplierNumber = Vtable.row(this).data().supplierNumber;
    supplier_name = Vtable.row(this).data().supplier_name;
    console.log(supplierNumber);
    console.log(supplier_name);
    roww = $(this)[0];

  });

  let rescan_count = 0;
  
  function searchh(supplierNumber, supplier_name) {

    if(supplierNumber != undefined && supplier_name != undefined){
      

    $("#vendorcode").val(supplierNumber);
    $("#vendor_code").val(supplierNumber);
    $("#vendorname").val(supplier_name.replace(/amp;/gi, ""));
    $("#vendor_name").val(supplier_name.replace(/amp;/gi, ""));


    if(rescan_count == 0)
    {

      if (totalPdf_page == 1) {
        $("#rescan").trigger("click")
        $("#loader_rescan").addClass("ibox-content")
        $("#loader_rescan").addClass("sk-loading")
        $("#spin_rescan").removeClass("d-none")
      }
    }

    rescan_count++;

    $(roww).removeClass("selected");
    

    


      }
      else{

        $("#loader1").removeClass("ibox-content");
        $("#loader1").removeClass("sk-loading");
        $("#spin").addClass("d-none");

      }

  }

  $("#Vendor_selected").click(() => {


    // $("#loader1").addClass("ibox-content");
    // $("#loader1").addClass("sk-loading");
    // $("#spin").removeClass("d-none");
    searchh(supplierNumber , supplier_name);
  });






  $("#back_invoice").click((e) => {
    e.preventDefault();
  
    object.is_reserved = "N"
    console.log("object_data : ", object.is_reserved);
  
    
            $.ajax({
                url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object.gate_number}&username=${$(".name")[1].innerText}`,
                type: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token,
                },
                success: function (data,status,xhr) {
                    console.log(data);
                    console.log(xhr);
                    if(xhr.status == 200)
                    {
  
                      window.open("../template/gate.jsp", "_self");
                        
                    }
                    else{
                            $.errorMessage(xhr.responseJSON.message);
                    }
                },
                error: function (xhr) {
                    if(xhr.status == 498)
                    {
                        $.tokenError();
                    }
                    else if(xhr.status >= 400 && xhr.status < 500){
  
                            $.errorMessage(xhr.responseJSON.message);
                    }
                    else{
                            $.errorMessage(xhr.responseJSON.error)
                    }
                }
            })
  });




  $("#cancel1").click((e) => {

    if($("textarea").val().length != 0){

      swal({
        title: "",
        text: "Do You Want to Cancel This Gate Number",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            closeModal: true,
          },
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      }).then((value)=>{
  
        if(value){
  
            object.gate_number = $("#gate_number").html();
            object.vehicle_nbr = $("#vehicle_nbr").val();
            object.vendorname = $("#vendorname").val();
            object.weight = $("#weight").val();
            object.in_time = $("#in_time").val();
            object.vendor_code = $("#vendor_code").val();
            object.invoice_number = $("#invoice_number").val();
            object.po_number = $("#po_number").val();
            object.po_type = $("#po_type").val();
            object.deliveryChallanNumber = $("#deliveryChallanNumber").val()
            object.workOrderNumber = $("#workOrderNumber").val()
            object.storeId = $("#storeId").val(),
            object.unitName = $("#unitname").val(),
            object.taxable_value = $("#taxable_value").val().replace(/ /g,''),
            object.irn_number = $(".irn_number").val()
            object.eway_Bill = $("#eway_Bill").val() 
  
            
            object.weight = parseInt(object.weight);
            
            object.amount = $('#amount').val()
  
  
            if(object.transactionType != "ST/OT" ){
              if( rescan_counts != 0)
              {
                if(object.transactionType != "Service_PO")
                {
                  object.details = details_payload
                }
                else{
                  object.details = empty_arr
                }
              }
              else{
      
                if(object.transactionType == "Service_PO")
                {
                  object.details = empty_arr
                }
      
              }
            }
  
          object.status = {code : 999}
  
          console.log('object ---->' , object);
  
          object.is_reserved = "N"
  
          $.ajax({
            url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object.gate_number}&username=${$(".name")[1].innerText}`,
            type: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
            success: function (data,status,xhr) {
                console.log(data);
                console.log(xhr);
                if(xhr.status == 200)
                {
  
                  $.ajax({
                    type: "PUT",
                    url: `${[test[0].url]}/gate/put?id=${object.id}`,
                    data: JSON.stringify(object),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + token,
                    },
                
                    success: function (data, status, xhr) {
                      if (xhr.status == 200) {
                
                        // $.sendEmail(data.data, "Error",convertedFile_attachment);
                        // setTimeout(() => {

                        let today = new Date();
                        let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                        let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

                        $.ajax({
                          url : `${[test[0].url]}/remark/add`,
                          type : 'POST',
                          data : JSON.stringify({
                  
                              gate_number: $("#gate_number").html(),
                              remark : $("textarea").val().toUpperCase(),
                              status  : 100,
                              username  : $(".name")[1].innerText,
                              timestamp : `${date} ${time}` 
                          }),
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + token,
                          },
                          success : function(data,status,xhr)
                          {
                            window.open("../../gate/template/gate.jsp", "_self");
                              console.log(data);
                          }
                        })

                        // }, 500);
                      } 
                      else{
                
                            $.errorMessage(xhr.responseJSON.message);
                      }
                      
                    },
                    error: function (xhr) {
                
                      console.log(xhr);
                      if(xhr.status == 498)
                      {
                          $.tokenError();
                      }
                      else if(xhr.status >= 400 && xhr.status < 500){
                
                            $.errorMessage(xhr.responseJSON.message);
                      }
                      else{
                            $.errorMessage(xhr.responseJSON.error)
                      }
                    },
                  });
          
                    
                }
                else{
                        $.errorMessage(xhr.responseJSON.message);
                }
            },
            error: function (xhr) {
                if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >= 400 && xhr.status < 500){
  
                        $.errorMessage(xhr.responseJSON.message);
                }
                else{
                        $.errorMessage(xhr.responseJSON.error)
                }
            }
        })
  
  
  
          
  
        }
  
        
      })


    }
    else{
      $.errorMessage("Please Add Remarks")
    }


    
  });

   //--------------Remap process

  $("#reMap").click(()=>{
    var invoicePdf = dataURLToBlob(invoice_pdf);
    if (invoicePdf) {
      const fileReader = new FileReader();

      fileReader.onload = function() {
          const arrayBuffer = this.result;
          // Initialize PDF.js
          pdfjsLib.getDocument(arrayBuffer).promise.then(function(pdf) {
              pageCount = pdf.numPages;
            
              const page = pageCount; // Your variable
              // Generate HTML for the dropdown options dynamically
              if (pageCount==1) {    
                swal({
                  title: "",
                  text: "Do You Want to Re-Map",
                  icon: "warning",
                  buttons: {
                    cancel: {
                      text: "Cancel",
                      value: null,
                      visible: true,
                      closeModal: true,
                    },
                    confirm: {
                      text: "OK",
                      value: true,
                      visible: true,
                      closeModal: true,
                    },
                  },
                }).then((value)=>{
                  if(value){
                    sendPdf(`${[vision[0].url]}/api/ocr`);
                  } 
                })
              }else{
                let dropdownOptionsHTML = '<select id="myDropdown">';
                for (let i = 1; i <= page; i++) {
                  dropdownOptionsHTML += `<option value="${i}">${i}</option>`;
                }
                dropdownOptionsHTML += '</select>';
                Swal.fire({
                  icon:"warning",
                  title: 'Select Page ',
                  html: dropdownOptionsHTML,
                  showCancelButton: true,
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Handle the selected option here
                    const selectedOption = +document.getElementById('myDropdown').value;
                    console.log(selectedOption);
                    if(result){
                      sendPdf(`${[vision[0].url]}/api/ocr?page=${selectedOption}`);
                    }
                  }  
                });
                
              }

          });
      };

      fileReader.readAsArrayBuffer(invoicePdf);
    } else {
        alert('Please select a PDF file.');
    }

 
    function sendPdf(url){
      $("#loader").addClass("ibox-content")
      $("#loader").addClass("sk-loading")
      $("#spin1").removeClass("d-none")

      $("#loader_rem").addClass("ibox-content");
      $("#loader_rem").addClass("sk-loading");
      $("#spin_rem").removeClass("d-none");



      sessionStorage.setItem("remap_gateNumber",$("#gate_number").html())
      // $("#loader_remap").addClass("ibox-content")
      // $("#loader_remap").addClass("sk-loading")
      // $("#spin_remap").removeClass("d-none")


      // fetch('http://localhost:8888/api/ocr', {
      fetch(url, {
        method: 'POST',
        body: fd
      }).then(response => {

        
        console.log('Image uploaded successfully');
        // window.open("invoice.html","_self")
        return response.json()
      }).then((res) => {
        
     
      try {
          localStorage.setItem("ocr_output", JSON.stringify(res.ocrResponse))

      try {
        var imageData = res.ocrImage;
        sessionStorage.setItem('preview_invoice', JSON.stringify('data:image/jpeg;base64,'+imageData));
        localStorage.setItem("ocr_invoice",JSON.stringify('data:image/jpeg;base64,'+imageData));

        $("#loader").removeClass("ibox-content")
        $("#loader").removeClass("sk-loading")
        $("#spin1").addClass("d-none")

        $("#loader_rem").removeClass("ibox-content");
        $("#loader_rem").removeClass("sk-loading");
        $("#spin_rem").addClass("d-none");

        window.open("../../../Store/reMappingData/template/reMapData.jsp", "_self");
      } catch (error) {
        swal("", "Image size is too large.", "warning").then(()=>{
          $("#loader").removeClass("ibox-content")
        $("#loader").removeClass("sk-loading")
        $("#spin1").addClass("d-none")

        $("#loader_rem").removeClass("ibox-content");
        $("#loader_rem").removeClass("sk-loading");
        $("#spin_rem").addClass("d-none");
        })
      // }
};


      } catch (error) {
          swal("", "JSON Response is too large.", "warning").then(()=>{
            $("#loader").removeClass("ibox-content")
            $("#loader").removeClass("sk-loading")
            $("#spin1").addClass("d-none")

            $("#loader_rem").removeClass("ibox-content");
            $("#loader_rem").removeClass("sk-loading");
            $("#spin_rem").addClass("d-none");
          })
      }
      $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
      })
      .catch(error => {
        // Handle any errors
        $("#loader").removeClass("ibox-content")
        $("#loader").removeClass("sk-loading")
        $("#spin1").addClass("d-none")

        $("#loader_rem").removeClass("ibox-content");
        $("#loader_rem").removeClass("sk-loading");
        $("#spin_rem").addClass("d-none");
        console.error('Error uploading image:', error);
      })
    }


  })






  // ----Rescan Process-------

  function getBestFit(template) {
    let vertices = JSON.parse(localStorage.getItem("ocr_output"));
    let check_data = [];

    for (let i = 0; i < template.length; i++) {
      const element = template[i];

      const startX = +element.boundingPoly.vertices[0].x;
      const startY = +element.boundingPoly.vertices[0].y;
      const endX = +element.boundingPoly.vertices[1].x;
      const endY = +element.boundingPoly.vertices[1].y;

      const filteredCoordinates = vertices.filter(
        (obj) =>
          obj.boundingPoly.vertices[0].x >= startX &&
          obj.boundingPoly.vertices[2].x <= endX &&
          obj.boundingPoly.vertices[0].y >= startY &&
          obj.boundingPoly.vertices[2].y <= endY
      );
      // Output the filtered coordinates

      let out = "";
      filteredCoordinates.map((des) => {
        out = out + des.description + " ";
      });
      // Remove spaces and special characters from start and end of the string
      out = out.replace(/^\s+|\s+$/g, "");
      check_data.push(out || "");
      // req_body[`${element.label}`] = out
    }
    // console.log("the elemet value",template);
    // console.log("the elemet ",check_data);

    if (
      template[0].value == check_data[0] &&
      template[1].value == check_data[1] &&
      template[2].value == check_data[2]
    ) {
      return true;
    } else {
      return false;
    }
  }

  function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
}

function findNearestObject(jsonArray, targetCoords) {
    let nearestDistance = Infinity;
    let nearestObject = null;

    for (const obj of jsonArray) {
        const vertices = obj.boundingPoly.vertices;
        const center_x = (vertices[0].x + vertices[2].x) / 2;
        const center_y = (vertices[0].y + vertices[2].y) / 2;
        const centerCoords = [center_x, center_y];

        const distance = calculateDistance(targetCoords, centerCoords);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestObject = obj;
        }
    }

    return nearestObject;
}

  // function for get Best fit
  function adjustCoordinates(template) {
    console.log(template[0],"kjgfd");
    let vertices = JSON.parse(localStorage.getItem("ocr_output"));
    let find_vertices =[];
    let adjusting_values = [];

    vertices.map((val)=>{
      if (template[1].centerValue == val.description) {
         find_vertices.push(val);
      }
    })

    const targetCoords = [(template[1].center_x1 + template[1].center_x3) / 2, (template[1].center_y1 + template[1].center_y3) / 2];
   
    const nearestObj = findNearestObject(find_vertices, targetCoords);
    // console.log()
    console.log("Nearest object:", nearestObj);

    if (nearestObj != null) {
      
      adjusting_values.push(nearestObj.boundingPoly.vertices[0].x- template[1].center_x1)
      adjusting_values.push(nearestObj.boundingPoly.vertices[0].y- template[1].center_y1)
      adjusting_values.push(nearestObj.boundingPoly.vertices[2].x- template[1].center_x3)
      adjusting_values.push(nearestObj.boundingPoly.vertices[2].y- template[1].center_y3) 
      return adjusting_values;
    }else{
      swal("", "Please train center label of trained template", "warning")
    }
  
  }


  $("#rescan").click(()=>{
    // $("#myModal11").remove();




    $("#wrapper")
        .append(`    <div class="modal inmodal fade" id="myModal11" tabindex="2" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-xl">
          <div class="modal-content">
              <div class="modal-header">
                  <h2><strong>&nbsp;&nbsp;&nbsp; OCR INFORMATION</strong></h2>
              </div>
              <div class="modal-body">
                  <div class="tabs-container">
  
                      <ul class="nav nav-tabs" role="tablist">
              
                          <li><a class="nav-link active" data-toggle="tab" href="#tab-1">OCR Data</a></li>
              
                          <li><a class="nav-link" data-toggle="tab" href="#tab-2">Vendor Invoice</a></li>
              
                      </ul>
              
                      <div class="tab-content">
              
                          <div role="tabpanel" id="tab-1" class="tab-pane active">
                            <div class="panel-body">
  
                              <div class="panel panel-primary col-md-12 px-0">
                                  <div class="panel-heading">
                                      Vendor Billed To Shipped To
                                  </div>
                                  <div class="panel-body">
                                      <div class="row">
      
                                          <div class="col-6 b-r" id="form3">
      
                                              <h4>Billed To</h4>
                                              <hr>
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Name</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="billto_name">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Address 1</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control check" required=""
                                                          id="billto_address1">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Address 2</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control check" required=""
                                                          id="billto_address2">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Address 3</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control check" required=""
                                                          id="billto_address3">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">GSTIN</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="billto_gstin">
                                                  </div>
                                              </div>
      
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">City</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="billto_city">
                                                  </div>
                                              </div>
      
      
      
                                              <div class="form-group row">
                                                  <label class="col-3 col-form-label">State</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="billto_state">
                                                  </div>
                                              </div>
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Zip Code</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="billto_zipcode">
                                                  </div>
                                              </div>
                                          </div>
      
                                          <div class="col-6" id="form3">
      
                                              <h4>Shipped To</h4>
      
                                              <hr>
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Name</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_name">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Address 1</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_address1">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Address 2</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_address2">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Address 3</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_address3">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">GSTIN</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_gstin">
                                                  </div>
                                              </div>
      
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">City</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_city">
                                                  </div>
                                              </div>
      
      
      
                                              <div class="form-group row">
      
                                                  <label class="col-3 col-form-label">State</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_state">
                                                  </div>
      
      
      
      
                                              </div>
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Zip Code</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="shipto_zipcode">
                                                  </div>
                                              </div>
      
                                          </div>
      
                                      </div>
      
                                  </div>
      
                              </div>
      
                              <div class="panel panel-primary col-md-12 px-0">
                                  <div class="panel-heading">
                                      Vendor Invoice Information
                                  </div>
                                  <div class="panel-body">
                                      <div class="row">
      
                                          <div class="col-6 b-r" id="form3">
      
                                              <h4></h4>
                                              <!-- <hr> -->
      
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Invoice no.</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="invoice_number">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">LR No.</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="lr_no">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Contract No.</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="contract_number">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Weight</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="weight">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Po Number</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="po_number">
                                                  </div>
                                              </div>
      
                                              <div class="input-group col pb-3 p-0 ">
                                                  <label class="col-3 col-form-label p-0 mr-2">EWAY
                                                      BILL</label>
                                                  <input type="text" class="form-control input_size check"
                                                      readonly id="eway_Bill">
                                                  <div class=" input-group-append">
                                                      <button type="button" class="btn btn-primary validate">
                                                          Validate
                                                      </button>
                                                  </div>
                                              </div>
      
                                              
                                          </div>
      
                                          <div class="col-6" id="form3">
      
                                              <h4></h4>
      
                                              <!-- <hr> -->
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">LR Date</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="lr_date">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Contract Date</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="contract_date">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">State</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="state">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Vehicle Number</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="vehicle_nbr">
                                                  </div>
                                              </div>
                                              <div class="form-group row"><label
                                                      class="col-3 col-form-label">Po Type</label>
                                                  <div class="col-9"><input type="text"
                                                          class="form-control input_size check" required=""
                                                          id="po_type">
                                                  </div>
                                              </div>
      
                                              <div class="input-group col p-0">
                                                  <label class="col-3 col-form-label p-0 mr-2">IRN
                                                      Number</label>
                                                  <input type="text" class="form-control input_size check irn_number"
                                                      required="" readonly id="IRN_NO">
                                                  <div class=" input-group-append">
                                                      <button type="button" class="btn btn-primary validate">
                                                          Validate
                                                      </button>
                                                  </div>
                                              </div>
      
                                          </div>
      
                                      </div>
      
                                  </div>
      
                              </div>
                              <div class="panel panel-primary col-md-12 px-0">
                                  <div class="panel-heading">
                                      Product Detail Information
                                  </div>
                                  <div class="panel-body" Id="fix_scroll">
                                      <div class="row">
      
                                          <table class="table table-bordered" id="tab_logic">
                                              <thead>
                                                  <tr>
                                                      <th class="text-center"> S No. </th>
                                                      <th class="text-center"> Item Code </th>
                                                      <th class="text-center"> Item Description </th>
                                                      <th class="text-center"> Hsn Code </th>
                                                      <th class="text-center"> UOM  </th>
                                                      <th class="text-center"> Qty </th>
                                                      <th class="text-center"> Unit Rate  </th>
                                                      <th class="text-center"> Amount </th>

                                                      <th class="text-center d-none"> Primary UOM </th>
                                                      <th class="text-center d-none"> Primary Unit </th>
                                                      <th class="text-center d-none"> Secondary UOM </th>
                                                      <th class="text-center d-none"> Secondary Unit </th>
                                                      <th class="text-center d-none"> Taxable Value </th>
                                                      <th class="text-center d-none"> Freight </th>
                                                      <th class="text-center d-none"> Pack Forwarding </th>
                                                      <th class="text-center d-none"> Insurance </th>
                                                      <th class="text-center d-none"> Custom Duty </th>
                                                      <th class="text-center d-none"> Other Charges </th>
                                                      <th class="text-center d-none"> Loading Unloading </th>
                                                      <th class="text-center d-none"> Handling Charges </th>
                                                      <th class="text-center d-none"> Detention Charges </th>
                                                  


                                                  </tr>
                                              </thead>
                                              <tbody id="tab_logic_body">
      
                                              </tbody>
                                          </table>
      
      
                                      </div>
      
                                  </div>
      
                              </div>

                              <div class="panel panel-primary col-md-12 px-0">
                              <div class="panel-heading">
                              TAX INFORMATION
                              </div>
                              <div class="panel-body">
                                  <div class="row">
                        
                                      <div class="col-6 b-r" id="form3">
                        
                                          <h4></h4>
                                          <!-- <hr> -->
                        
                                          <div class="form-group row"><label class="col-3 col-form-label">CGST RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cgst_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">SGST RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="sgst_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">IGST RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="igst_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">CESS RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cess_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">Taxable value</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="taxable_value" readonly="readonly">
                                              </div>
                                          </div>
                                      </div>
                        
                                      <div class="col-6" id="form3">
                        
                                          <h4></h4>
                        
                                          <!-- <hr> -->
                                          <div class="form-group row"><label class="col-3 col-form-label">CGST AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cgst_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">SGST AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="sgst_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">IGST AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="igst_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">CESS AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cess_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">Invoice Amount</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check" required="" id="amount" readonly="readonly">
                                              </div>
                                          </div>
                                      </div>
                        
                                  </div>
                        
                              </div>
                        
                          </div>
                              
      
      
                   
      
      
      
      
      
                      </div>
              
                              
              
                          </div>
              
                          <div role="tabpanel" id="tab-2" class="tab-pane">
              
                            <div class="panel-body d-flex justify-content-center">
                              <canvas id="canvas" width="800" height="600"></canvas>
          
                          </div>
              
                          </div>
              
                      </div>
              
              
              
              
              
                  </div>
  
  
  
              </div>
  
              <div class="modal-footer m-2">
                  <button type="button" class="btn btn-white" data-dismiss="modal" id="closeModal">Close</button>
                  <input type="button" class="add_info btn btn-primary py-1 col-2" data-toggle="modal"
                      data-target="#myModal15" id="modalCall" value="Additional Doc">
              </div>
          </div>
      </div>
  </div>`);




  $("#modalCall").click(() => {
    $("#closeModal").trigger("click");
  });



  $(".check").attr("readonly", "readonly");
  $("#vehicle_nbr").removeAttr("readonly")


    var tags_value_HDR = [];
    var tags_value_DTL = [];
    let tags = [];
    let supplier_code = +$("#vendor_code").val()
  
    var req_body = {};
    var req_body_details = {};
  
    
  
    var files;
    console.log(supplier_code);
    console.log(supplier_code != "" );
    if (supplier_code != "") {
      $.ajax({
        url: `${[test[0].url]}/ocrtraining/get?supplier=${supplier_code}`,
        type: "GET",
        async:false,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data,status,xhr) {;
          if(xhr.status == 200)
          {
            console.log(data);
            $("#loader1").removeClass("ibox-content");
            $("#loader1").removeClass("sk-loading");
            $("#spin").addClass("d-none");
            if (data.data == null) {
              loopCount = 1;
              $("#preview_img").removeClass("invisible");
            } else {
              data.data.map((val)=>{
                if (+val.template.split("_")[1]>loopCount) {
                  loopCount = +val.template.split("_")[1];
                }
              })
              $("#preview_img").removeClass("invisible");
            }
          }
          else{
    
            $("#preview_img").addClass("invisible");
                $.errorMessage(xhr.responseJSON.message);
          }
    
        },
        error: function (xhr) {
          $("#preview_img").addClass("invisible");
          if(xhr.status == 498)
          {
              $.tokenError();
          }
          else if(xhr.status >= 400 && xhr.status < 500){
    
                $.errorMessage(xhr.responseJSON.message);
          }
          else{
                $.errorMessage(xhr.responseJSON.error)
          }
        },
      });

      let temp_vendorcode = $("#vendor_code").val();
      let temp_vendorname = $("#vendorname").val(); 
      $("form")[0].reset();
      $("#vendor_code").val(temp_vendorcode)
      $("#vendorname").val(temp_vendorname)
      
      $("#loader").addClass("ibox-content");
      $("#loader").addClass("sk-loading");
      $("#spin1").removeClass("d-none");
      $("#in_time")[0].value = object.in_time
      $(".check").attr("readonly", "readonly");
  
      console.log(loopCount);
      if (loopCount != 0) {
      fetch(`${[vision[0].url]}/api/ocr`, {
      // fetch('http://localhost:8888/api/ocr', {
        method: "POST",
        body: fd,
      })
        .then((response) => {
          console.log("Image uploaded successfully");

          return response.json();
        })
        .then(async (res, status, xhr) => {
          if (res.status != 500) {
            console.log(res);
            localStorage.setItem("ocr_output", JSON.stringify(res.ocrResponse));
            ocrImage = res.ocrImage;

            // for fetching vehicle number and vendor name
            let supplier = $("#vendorcode")[0].value;

            const vertices = JSON.parse(localStorage.getItem("ocr_output"));
          
            // -----> Checking all template one by one
            for (let i = 1; i <= loopCount; i++) {
              let templateHDRData = [];
              let templateDTLData = [];
              let findData = [];
              let coordinates_for_labeling = [];
              tags_value = [];

              // fetch(`/ocrtraining/get/${supplier}`,{
              await fetch(`${[test[0].url,]}/ocrtraining/get?supplier=${supplier}&template=Template_${i}`,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
                .then((data) => {
                  // console.log(data);
                  return data.json();
                })
                .then(async (data) => {
                  let fl = data.data;
                  console.log(fl);
          
                  if (typeof fl == "undefined") {   
                    data.map((val) => {
                      const startX = +val.boundingPoly.vertices[0].x;
                      const startY = +val.boundingPoly.vertices[0].y;
                      const endX = +val.boundingPoly.vertices[1].x;
                      const endY = +val.boundingPoly.vertices[1].y;

                      if (val.label_type == "Header") {
                        if (startX != 0 || startY != 0 || endX != 0 || endY != 0) {
                          templateHDRData.push(val);
                        }
                      } else if (val.label_type == "Letter Head") {
                        findData.push(val);
                      } else {
                        if (startX != 0 ||startY != 0 || endX != 0 ||endY != 0) {
                          templateDTLData.push(val);
                        }
                      }
                    });
                  }else{
                  }
                });

              console.log("templateHDRData::::", templateHDRData);
              invoice_date_formate = templateHDRData[0].date_formate;
              console.log("templateDTLData::::", templateDTLData);
              console.log(findData.length);
  
              if (findData.length != 0 ) {
                const flag = getBestFit(findData);

                console.log(flag );

                // const adjusting_values = adjustCoordinates(findData);
                // console.log(adjusting_values);
             

                if (flag) {
               
                
                gateEntry();
                
                break
                
                
                
                // --> end of : fetching new details data
                } else if (!flag && i == loopCount) {
           
                  // swal("",`No Suitable Template Found in Master`,"error").then(() => {
                    // gateEntry();
                    let check_center = adjustCoordinates(findData);
                    console.log(check_center,"==================================");
                    if (check_center!=undefined) {
                      gateEntry(check_center);
                    }else{
                      $("#loader_rescan").removeClass("ibox-content")
                      $("#loader_rescan").removeClass("sk-loading")
                      $("#spin_rescan").addClass("d-none")
                    }
                    // req_body.error_message ="No Suitable Template Found in Master";
                    // req_body.status = { code: 999 };
                    // req_body.gate_number = $("#gate_number").html();
                    // req_body.in_time = new Date().toLocaleTimeString();

                    // let fd_data = new FormData();

                    // fd_data.append("json", JSON.stringify(req_body));
                    // fd_data.append("file", files);

                    // errorStatusScan(fd_data);

                    $("#loader").removeClass("ibox-content");
                    $("#loader").removeClass("sk-loading");
                    $("#spin1").addClass("d-none");
                  // });
                  
       
                
                }


                async function gateEntry(adjusting_values) {
                      console.log(adjusting_values);
                  // --> for fetching header data
                  console.log(i+"template number");
                  for (let i = 0; i < templateHDRData.length; i++) {
                    const element = templateHDRData[i];

                    let startX;
                    let startY;
                    let endX;
                    let endY;

                    if (adjusting_values == undefined) {
                      
                        startX = +element.boundingPoly.vertices[0].x;
                        startY = +element.boundingPoly.vertices[0].y;
                        endX = +element.boundingPoly.vertices[1].x  ;
                        endY = +element.boundingPoly.vertices[1].y  ;
                    }else{

                        startX = +element.boundingPoly.vertices[0].x+adjusting_values[0];
                        startY = +element.boundingPoly.vertices[0].y+adjusting_values[1];
                        endX = +element.boundingPoly.vertices[1].x  +adjusting_values[2];
                        endY = +element.boundingPoly.vertices[1].y  +adjusting_values[3];
                    }


                    const filteredCoordinates = vertices.filter(
                      (obj) =>
                        obj.boundingPoly.vertices[0].x >= startX &&
                        obj.boundingPoly.vertices[2].x <= endX &&
                        obj.boundingPoly.vertices[0].y >= startY &&
                        obj.boundingPoly.vertices[2].y <= endY
                    );

                    // Output the filtered coordinates

                    let out = "";
                    filteredCoordinates.map((des) => {
                      out = out + des.description + " ";
                    });

                    coordinates_for_labeling.push(filteredCoordinates);

                    // Remove spaces and special characters from start and end of the string
                    var pattern = /^[^\w\d\s()]+|[^\w\d\s()](?=\s*$)/g;
                    var result = out.replace(pattern, "").replace(/\s*-\s*/g, '-');
                 
                    if (out.length != 0) {

                      req_body[`${element.label}`] = result;
                    }
                  }

                  // var object1 = { key1: "value1", key2: "value2", key3: "value3" };
                  // var object2 = { key1: null, key2: null, key3: null };

                  let before_req_body_value = JSON.parse(JSON.stringify(req_body))

                  console.log("actual req body : ", before_req_body_value);

                  // Iterate over keys in the first object
                  // $.each(req_body, function(key, value) {
                  //   // Check if the value is not null in the first object
                  //   if (value !== null && (object[key] == null || object[key] == "0" || object[key] == "") ) {
                  //     // Update the value in the second object
                  //       object[key] = value;
                  //   }
                  // });

                  // sessionStorage.setItem("object" , JSON.stringify(object))

                  req_body = JSON.parse(JSON.stringify(before_req_body_value))

                  $.each(req_body, function(key, value) {
                    // Check if the value is not null in the first object
                    if (value !== null && object[key] == null || object[key] == "0" || object[key] == "" ) {
                      // Update the value in the second object
                        object[key] = value;
                    }
                  });

                  object.vendor_code = $("#vendorcode").val()
                  object.vendorname = $("#vendor_name").val()


                  console.log('fetch check class ---->');

                  for (let i = 0; i < $(".fetch_check").length; i++) {
                    const element = $(".fetch_check")[i];
                    if (object[`${$(element).attr("id")}`]) {

                      let out = object[`${$(element).attr("id")}`];
                      var pattern = /^[^\w\d\s)]+|[^\w\d\s](?=\s*$)/g;
                      var result = out.replace(pattern, "").replace(/\s*-\s*/g, '-');
                      if ($(element).attr("id") == "invoice_number") {
                        result = result.replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, '');
                      }
                      if($(element).attr("id") == "weight" || $(element).attr("id") == "amount" || $(element).attr("id") == "po_number" || $(element).attr("id") == "taxable_value" || $(element).attr("id") == "cgst_amount" || $(element).attr("id") == "sgst_amount" || $(element).attr("id") == "igst_amount" || $(element).attr("id") == "cess_amount")
                      {
                        result = result.replace(/[^\d.]/g, '');
                        // result = result.replace(",", "");
                      }
                      if($(element).attr("id") == "invoice_number" || $(element).attr("id") == "workOrderNumber" || $(element).attr("id") == "deliveryChallanNumber"){
                        result = result.replace(/\s/g, "");
                      }
                      object[`${$(element).attr("id")}`] = result;
                      $(element).val(result);
                    }
                  }


                  console.log(' after fetch class  ---->' ,object);

                  // $.each(req_body, function(key, value) {
                  //   // Check if the value is not null in the first object
                  //   if (value !== null && object[key] == null || object[key] == "0" || object[key] == "") {
                  //     // Update the value in the second object
                  //       object[key] = value;
                  //   }
                  // });

                  sessionStorage.setItem("object" , JSON.stringify(object))

                  // collecting all tags for assigning
                  await fetch(`${[test[0].url,]}/ocrtraining/get?supplier=${supplier}&template=Template_${i}`,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    }
                  )
                  .then((data) => {
                    // console.log(data);
                    return data.json();
                  })
                  .then(async (data) => {
                    console.log(data,"data of train :::::");
                    data.map((val) => {
                      const startX = +val.boundingPoly.vertices[0].x ;
                      const startY = +val.boundingPoly.vertices[0].y ;
                      const endX = +val.boundingPoly.vertices[1].x   ;
                      const endY = +val.boundingPoly.vertices[1].y   ;
                      if (val.label_type == "Header") {
                        if (
                          startX != 0 ||
                          startY != 0 ||
                          endX != 0 ||
                          endY != 0
                        ) {
                          tags_value_HDR.push(val);
                        }
                      } else if (val.label_type == "Details") {
                        if (
                          startX != 0 ||
                          startY != 0 ||
                          endX != 0 ||
                          endY != 0
                        ) {
                          tags_value_DTL.push(val);
                        }
                      }
                    });
                  });

                  // console.log("tags_value_HDR ::::", tags_value_HDR);
                  // console.log("tags_value_DTL ::::", tags_value_DTL);
                  // console.log("HEADER REQ BODY :----", req_body);

                  // --> end of : fetching header data

                  //------------------------- --> for fetching new details data

                  for (let i = 0; i < templateDTLData.length; i++) {
                    const element = templateDTLData[i];
                    let startX;
                    let startY;
                    let endX;
                    let endY;

                    if (adjusting_values == undefined) {
                      
                        startX = +element.boundingPoly.vertices[0].x;
                        startY = +element.boundingPoly.vertices[0].y;
                        endX = +element.boundingPoly.vertices[1].x  ;
                        endY = +element.boundingPoly.vertices[1].y  ;
                    }else{

                        startX = +element.boundingPoly.vertices[0].x+adjusting_values[0];
                        startY = +element.boundingPoly.vertices[0].y+adjusting_values[1];
                        endX = +element.boundingPoly.vertices[1].x  +adjusting_values[2];
                        endY = +element.boundingPoly.vertices[1].y  +adjusting_values[3];
                    }

                    const filteredCoordinates = vertices.filter(
                      (obj) =>
                        obj.boundingPoly.vertices[0].x >= startX &&
                        obj.boundingPoly.vertices[2].x <= endX &&
                        obj.boundingPoly.vertices[0].y >= startY &&
                        obj.boundingPoly.vertices[2].y <= endY
                    );
                    // Output the filtered coordinates

                    let out = "";
                    filteredCoordinates.map((des) => {
                      out = out + des.description + " ";
                    });
                    coordinates_for_labeling.push(filteredCoordinates);
                    // Remove spaces and special characters from start and end of the string
                    var pattern = /^[^\w\d\s()]+|[^\w\d\s()](?=\s*$)/g;
                    var result = out.replace(pattern, "").replace(/\s*-\s*/g, '-');
                    result = result.replace(",", "");
                    if (out.length != 0) {
                      req_body_details[`${element.label}`] = result;
                    }
                  }

                  for (let i = 0; i < $(".fetch_check").length; i++) {
                    const element = $(".fetch_check")[i];
                    if (req_body_details[`${$(element).attr("id")}`]) {
                      $(element).val(
                        req_body_details[`${$(element).attr("id")}`]
                      );
                    }
                  }

                  tags_value_DTL.map((res) => {
                    if (!req_body_details[`${res.label}`]) {
                      tags.push({ id: res.tag_id });
                    }
                  });

                  console.log("DETAILS REQ BODY :----", req_body_details);
                  // console.log("Tags :----", tags);

                  // -----> for getting total details in details
                  let itemsCount = 0;

                  for (const key in req_body_details) {
                    if (key.startsWith("PRODUCT_")) {
                      const numberPart = key.replace("PRODUCT_", "");
                      const itemNumber = parseInt(numberPart);
                      if (!isNaN(itemNumber) && itemNumber > itemsCount) {
                        itemsCount = itemNumber;
                      }
                    }else{
                      if (key.startsWith("s_no_")) {
                        const numberPart = key.replace("s_no_", "");
                        const itemNumber = parseInt(numberPart);
                        if (!isNaN(itemNumber) && itemNumber > itemsCount) {
                          itemsCount = itemNumber;
                        }
                      }
                    }
                  }
                  console.log(itemsCount);
                  // -----> Logic for creating array of object for gate entry



                  if (itemsCount == 1) {  

                    for (let i = 1; i <= itemsCount; i++) {

                          let quantity = ""
                          let unit_amount = "";
                          const s_no = req_body_details[`s_no_${i}`] || "";
                          const item_code = req_body_details[`PRODUCT_${i}`] || "";
                          const hsn_code = req_body_details[`HSN_CODE_${i}`] || "";
                          const uom =req_body_details[`UOM_${i}`] || "";
                          const qty = req_body_details[`QUANTITY_${i}`] || "";

                        

                          if(qty != "")
                          {

                            console.log('quantity before ---->' ,qty);
                            quantity = qty.replace(/[^0-9.]/g, '')
                            console.log('quantity before ---->' ,quantity);
                          }
                          const unit = req_body_details[`UNIT_RATE_${i}`] || "";
                          if(unit != "")
                          {
                            unit_amount = unit.replace(/[^0-9.]/g, '')
                          }

                          let temp_amount = req_body_details[`AMOUNT_${i}`] || "";
                          const amount = temp_amount.replace(",", "");
                          const description = req_body_details[`DESCRIPTION_${i}`] || "";

     
                          const primaryUom =req_body_details[`PRIMARY_UOM_${i}`] || "";
                          const primaryUnit =req_body_details[`PRIMARY_UNIT_${i}`] || "";
                          const secondaryUom =req_body_details[`SECONDARY_UOM_${i}`] || "";
                          const secondaryUnit =req_body_details[`SECONDARY_UNIT_${i}`] || "";
                          const dtlTaxableValue =req_body_details[`TAXABLE_VALUE_${i}`] || "";
                          const dtlFreight =req_body_details[`DTL_FREIGHT_${i}`] || "";
                          const dtlPackForwarding =req_body_details[`DTL_PACK_FORWARDING_${i}`] || "";
                          const dtlInsurance =req_body_details[`DTL_INSURANCE_${i}`] || "";
                          const dtlCustomDuty =req_body_details[`DTL_CUSTOM_DUTY_${i}`] || "";
                          const dtlOtherCharges =req_body_details[`DTL_OTHER_CHARGES_${i}`] || "";
                          const dtlLoadingUnloading =req_body_details[`DTL_LOADING_UNLOADING_${i}`] || "";
                          const dtlHandlingCharges =req_body_details[`DTL_HANDLING_CHARGES_${i}`] || "";
                          const dtlDetentionCharges =req_body_details[`DTL_DETENTION_CHARGES_${i}`] || "";
                          const taxableAmount =req_body_details[`TAXABLE_AMOUNT_${i}`] || "";

                          const itemObject = {
                            s_no,
                            item_code,
                            hsn_code,
                            uom,
                            quantity,
                            unit_amount,
                            amount,
                            description,
                          
                            primaryUom,
                            primaryUnit,
                            secondaryUom,
                            secondaryUnit,
                            dtlTaxableValue,
                            dtlFreight,
                            dtlPackForwarding,
                            dtlInsurance,
                            dtlCustomDuty,
                            dtlOtherCharges,
                            dtlLoadingUnloading,
                            dtlHandlingCharges,
                            dtlDetentionCharges,
                            taxableAmount
                          };
                          details_payload.push(itemObject);

                    }

                  }else{

                    
                    for (let i = 1; i <= itemsCount; i++) {
                      for (let j = 1; j <= itemsCount; j++) {  
                        let temp_sn = req_body_details[`s_no_${j}`]
                        if (temp_sn != undefined) {   
                          if (i == +temp_sn.replace(/[^0-9]/g, '')) {
                            let quantity = "";
                            let unit_amount = ""
                            const s_no = +temp_sn.replace(/[^0-9]/g, '') || "";
                            const item_code = req_body_details[`PRODUCT_${i}`] || "";
                            const hsn_code = req_body_details[`HSN_CODE_${i}`] || "";
                            const uom =req_body_details[`UOM_${i}`] || "";
                            const qty = req_body_details[`QUANTITY_${i}`] || "";
                            if (qty != ""){
                              console.log('quantity before ---->' ,qty);
                              quantity = qty.replace(/[^0-9.]/g, '');
                              console.log('quantity after ---->' ,quantity);
                            }
                            const unit = req_body_details[`UNIT_RATE_${i}`] || "";
                            if(unit != "")
                            {
                              unit_amount = unit.replace(/[^0-9.]/g, '')
                            }
                            let temp_amount = req_body_details[`AMOUNT_${i}`] || "";
                            const amount = temp_amount.replace(",", "");
                            // const amount = req_body_details[`AMOUNT_${i}`] || "";
                            const description = req_body_details[`DESCRIPTION_${i}`] || "";

                          
                            const primaryUom =req_body_details[`PRIMARY_UOM_${i}`] || "";
                            const primaryUnit =req_body_details[`PRIMARY_UNIT_${i}`] || "";
                            const secondaryUom =req_body_details[`SECONDARY_UOM_${i}`] || "";
                            const secondaryUnit =req_body_details[`SECONDARY_UNIT_${i}`] || "";
                            const dtlTaxableValue =req_body_details[`TAXABLE_VALUE_${i}`] || "";
                            const dtlFreight =req_body_details[`DTL_FREIGHT_${i}`] || "";
                            const dtlPackForwarding =req_body_details[`DTL_PACK_FORWARDING_${i}`] || "";
                            const dtlInsurance =req_body_details[`DTL_INSURANCE_${i}`] || "";
                            const dtlCustomDuty =req_body_details[`DTL_CUSTOM_DUTY_${i}`] || "";
                            const dtlOtherCharges =req_body_details[`DTL_OTHER_CHARGES_${i}`] || "";
                            const dtlLoadingUnloading =req_body_details[`DTL_LOADING_UNLOADING_${i}`] || "";
                            const dtlHandlingCharges =req_body_details[`DTL_HANDLING_CHARGES_${i}`] || "";
                            const dtlDetentionCharges =req_body_details[`DTL_DETENTION_CHARGES_${i}`] || "";
                            const taxableAmount =req_body_details[`TAXABLE_AMOUNT_${i}`] || "";

                            const itemObject = {

                              s_no,
                              item_code,
                              hsn_code,
                              uom,
                              quantity,
                              unit_amount,
                              amount,
                              description,

                              primaryUom,
                              primaryUnit,
                              secondaryUom,
                              secondaryUnit,
                              dtlTaxableValue,
                              dtlFreight,
                              dtlPackForwarding,
                              dtlInsurance,
                              dtlCustomDuty,
                              dtlOtherCharges,
                              dtlLoadingUnloading,
                              dtlHandlingCharges,
                              dtlDetentionCharges,
                              taxableAmount
                            };
                            details_payload.push(itemObject);
                          }
                        }
                      }
                    }
                  }

                  console.log("details payload: ",details_payload);
                  req_body.details = details_payload;


                  
                  
                  try {

                    function updateFirstObject(firstObj, secondObj) {
                      for (var key in firstObj) {
                          if (secondObj.hasOwnProperty(key) && secondObj[key] !== null && secondObj[key] !== "") {
                              firstObj[key] = secondObj[key];
                          }
                      }
                      return firstObj;
                  }
              
                  // Update the objects
                  var updatedFirstArray = object.details.map(function(firstObj) {
                      var secondObj = details_payload[0]; // Assuming one object in secondArray
                      return updateFirstObject(firstObj, secondObj);
                  });


                  // var secondArrayMap = {};
                  // details_payload.forEach(function(second) {
                  //     secondArrayMap[second.amount ?? second.quantity] = second; // Assuming 'id' is the key to match
                  // });


                  // console.log('second Array map ---->' , secondArrayMap);
                  // Update the objects
                  // var updatedFirstArray = object.details.map(function(firstObj) {
                  //     var secondObj = details_payload.filter((value) =>
                  //       {

                  //         console.log('value in details payload---->' , value);
                  //         value.amount == firstObj.amount || value.quantity == firstObj.quantity

                  //       } )
                  //     // var secondObj = secondArrayMap[firstObj.amount ?? firstObj.quantity];

                  //     console.log('second object after matching  ---->' ,secondObj);
                  //     if (secondObj) {
                  //         return updateFirstObject(firstObj, secondObj);
                  //     }
                  //     return firstObj;
                  // });
              
                  console.log( "updated object " , updatedFirstArray);
                    // $.each(details_payload, function(key, value) {
                    //   // Check if the value is not null in the first object

                    //   console.log('value of details payload ---->' , key  , value);
                    //   if (value !== null && object.details[key] == "0" || object.details[key] == "" || object.details[key] == "" ) {
                    //     // Update the value in the second object
                    //       object.details[key] = value;
                    //   }
                    // });
                  } catch (error) {

                    console.log('error in object details ---->' , error );
                    
                  }

                  // $.each(req_body, function(key, value) {
                  //   // Check if the value is not null in the first object
                  //   if (value !== null && (object[key] == null || object[key] == "0" || object[key] == "") ) {
                  //     // Update the value in the second object
                  //       object[key] = value;
                  //   }
                  // });

                  // sessionStorage.setItem("object" , JSON.stringify(object))

                  console.log( "after rescan : ", req_body);

                  $.each(req_body, function(key, value) {
                    // Check if the value is not null in the first object
                    if (value !== null && object[key] == null || object[key] == "0" || object[key] == "" ) {
                      // Update the value in the second object
                        object[key] = value;
                    }
                  });

                  object.vendor_code = $("#vendorcode").val()
                  object.vendorname = $("#vendor_name").val()

                  // for (let i = 0; i < $(".check").length; i++) {
                  //   const element = $(".check")[i];
                  //   if (req_body[`${$(element).attr("id")}`]) {
                  //     let out = req_body[`${$(element).attr("id")}`];
                  //     var pattern = /^[^\w\d\s()]+|[^\w\d\s()](?=\s*$)/g;
                  //     var result = out.replace(pattern, "");
                  //     if ($(element).attr("id") == "invoice_number") {
                  //       result = result.replace("DeliveryNote", "").replace("InvoiceNo.:", "").replace("InvoiceNo.", "").replace("No." , "").replace("Invoice", "").replace("No:" , "").replace(/[^A-Za-z0-9/-]/g, '');
                  //     }

                  //     if($(element).attr("id") == "weight" || $(element).attr("id") == "po_number" || $(element).attr("id") == "taxable_value" || $(element).attr("id") == "amount" || $(element).attr("id") == "cgst_amount" || $(element).attr("id") == "sgst_amount" || $(element).attr("id") == "igst_amount" || $(element).attr("id") == "cess_amount")
                  //     {
                  //       result = result.replace(/[^\d.]/g, '');
                  //       // result = result.replace(",", "");
                  //     }
                  //     if($(element).attr("id") == "invoice_number" || $(element).attr("id") == "workOrderNumber" || $(element).attr("id") == "deliveryChallanNumber"){
                  //       result = result.replace(/\s/g, "");
                  //     } 
                  //     if ($(element).attr("id") == "po_type") {
                  //       result = result.replace(/[0-9\s/]+/g, '');
                  //     }
                  //     req_body[`${$(element).attr("id")}`] = result;
                  //     $(element).val(result);
                  //   }
                  // }


                  console.log('check classs');
                  
                  for (let i = 0; i < $(".check").length; i++) {
                    const element = $(".check")[i];
                    if (object[`${$(element).attr("id")}`]) {
                      let out = object[`${$(element).attr("id")}`];
                      var pattern = /^[^\w\d\s()]+|[^\w\d\s()](?=\s*$)/g;
                      var result = out.replace(pattern, "");
                      if ($(element).attr("id") == "invoice_number") {
                        result = result.replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, '');
                      }

                      if($(element).attr("id") == "weight" || $(element).attr("id") == "po_number" || $(element).attr("id") == "taxable_value" || $(element).attr("id") == "amount" || $(element).attr("id") == "cgst_amount" || $(element).attr("id") == "sgst_amount" || $(element).attr("id") == "igst_amount" || $(element).attr("id") == "cess_amount")
                      {
                        result = result.replace(/[^\d.]/g, '');
                        // result = result.replace(",", "");
                      }
                      if($(element).attr("id") == "invoice_number" || $(element).attr("id") == "workOrderNumber" || $(element).attr("id") == "deliveryChallanNumber"){
                        result = result.replace(/\s/g, "");
                      } 
                      if ($(element).attr("id") == "po_type") {
                        result = result.replace(/[0-9\s/]+/g, '');
                      }
                      object[`${$(element).attr("id")}`] = result;
                      $(element).val(result);
                    }
                  }


                  // $.each(req_body, function(key, value) {
                  //   // Check if the value is not null in the first object
                  //   if (value !== null && object[key] == null || object[key] == "0" || object[key] == "" ) {
                  //     // Update the value in the second object
                  //       object[key] = value;
                  //   }
                  // });

                  sessionStorage.setItem("object" , JSON.stringify(object))

                  if(clonnedObject.details.length <= 1){


                    $("#tab_logic_body").empty();

                  //   {
                      for (let i = 0; i < object.details.length; i++) {
                        

                        $("#tab_logic_body").append(`<tr>

                                        <td><input type="text" class="form-control input_size s_no text-center" readonly value="${object.details[i].s_no}" ></td>
                                        <td><input type="text" class="form-control input_size item_code text-center" readonly value="${object.details[i].item_code}" ></td>
                                        <td><input type="text" class="form-control input_size item_description text-center" readonly value="${object.details[i].description}" ></td>
                                        <td><input type="text" class="form-control input_size fix hsn_code text-center" readonly value="${object.details[i].hsn_code}"></td>
                                        <td><input type="text" class="form-control input_size fix uom text-center" readonly value="${object.details[i].uom}"></td>
                                        <td><input type="text" class="form-control input_size fix quantity text-center" readonly value="${object.details[i].quantity}"></td>
                                        <td><input type="text" class="form-control input_size fix unit_amount text-center" readonly value="${object.details[i].unit_amount}"></td>
                                        <td><input type="text" class="form-control input_size fix amount text-center" readonly value="${object.details[i].amount}"></td>       
                        </tr>`);
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].primaryUom}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].primaryUnit}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].secondaryUom}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].secondaryUnit}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlTaxableValue}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlFreight}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlPackForwarding}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlInsurance}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlCustomDuty}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlOtherCharges}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlLoadingUnloading}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlHandlingCharges}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlDetentionCharges}"></td>
                                        // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].taxableAmount}"></td>

                        $("#modal_table_details").append(`<tr>
                                      <td class="text-center border py-2 po_1" id="detail_po_no">${$(
                                        "#po_number"
                                      ).val()}</td>
                                      <td class="text-center border py-2 des_1" id="">${
                                        object.details[i].item_code
                                      }</td>
                                      <td class="text-center border py-2 qty_1">${
                                        object.details[i].quantity
                                      }</td>
                                      <td class="text-center border py-2 unit_1"></td>
                                      <td class="text-center border py-2 remark_1"></td>
                        </tr>`);
                        // const element = $(".check")[i];
                        // if (req_body[`${$(element).attr("id")}`]) {
                        //     $(element).val(req_body[`${$(element).attr("id")}`])
                        // }
                      }
                    }
                  

                  if($("#deliveryChallanNumber").val() != "")
                  {
                    $("#Transaction").val("Job_Work")
                  }

                  // ---loading image for labeling
                  try {
                   
                          var imageData = 'data:image/jpeg;base64,'+ocrImage;
                          try {
                            // --- for uploading image in canvas
                            const canvas = document.getElementById("canvas");
                            const ctx = canvas.getContext("2d");

                            // Load the image
                            const image = new Image();
                            image.src = imageData;

                            image.onload = function () {
                              // Calculate the aspect ratio of the image
                              const aspectRatio = image.width / image.height;

                              // Set the canvas size to fit the image while maintaining aspect ratio
                              const canvasWidth = 800; // You can adjust the desired width here
                              const canvasHeight = canvasWidth / aspectRatio;
                              canvas.width = canvasWidth;
                              canvas.height = canvasHeight;

                              // Draw the image on the canvas
                              ctx.drawImage(
                                image,
                                0,
                                0,
                                canvasWidth,
                                canvasHeight
                              );

                              // }, 3000);

                              coordinates_for_labeling.map((value) => {
                                if (value.length != 0) {
                                  let start_label_coordinates = value[0];
                                  let end_label_coordinates =
                                    value[value.length - 1];

                                  const startX =
                                    start_label_coordinates.boundingPoly
                                      .vertices[0].x;
                                  const startY =
                                    start_label_coordinates.boundingPoly
                                      .vertices[0].y;
                                  const endX =
                                    end_label_coordinates.boundingPoly
                                      .vertices[2].x;
                                  const endY =
                                    end_label_coordinates.boundingPoly
                                      .vertices[2].y;

                                  // Map the image coordinates to canvas coordinates
                                  const canvasX =
                                    (startX / image.width) * canvasWidth;
                                  const canvasY =
                                    (startY / image.height) * canvasHeight;
                                  const canvasWidthBox =
                                    (endX / image.width) * canvasWidth -
                                    canvasX;
                                  const canvasHeightBox =
                                    (endY / image.height) * canvasHeight -
                                    canvasY;

                                  // Draw the filled bounding box on the canvas using canvas coordinates
                                  ctx.beginPath();
                                  ctx.fillStyle = "rgba(134, 197, 0, 0.3)"; // Lighter yellow with 30% opacity
                                  ctx.fillRect(
                                    canvasX,
                                    canvasY,
                                    canvasWidthBox,
                                    canvasHeightBox
                                  );
                                  ctx.strokeStyle = "#00FF00"; // Yellow outline color
                                  ctx.lineWidth = 0.5; // 2 pixels line width
                                  ctx.strokeRect(
                                    canvasX,
                                    canvasY,
                                    canvasWidthBox,
                                    canvasHeightBox
                                  );
                                  ctx.closePath();
                                }
                              });

                              // Provide the startX, startY, endX, and endY coordinates of the bounding box in image coordinates
                            };
                          } catch (error) {
                            
                            swal("", error, "warning");
                          }
                    
                  } catch (error) {
                    swal("", "JSON Response is too large.", "warning");
                  }

                  
                  // Use the replace() method to replace the matched pattern with an empty string
               
                  
               
                  // Example usage:
                  // const inputDate = $("#invoice_date").val();
                  const inputDate = $("#invoice_date").val().replace(/^[\W_]+|[\W_]+$/g, '').trim();
                  const desiredFormat = invoice_date_formate; // Replace with your desired format
                  console.log(desiredFormat,"desier formate date===============");
                  console.log(inputDate,"input date===============");
                  
                  
                  if (desiredFormat != undefined) {
                    
                    const formattedDate = moment(inputDate, desiredFormat.toUpperCase()).format("YYYY-MM-DD");
                    console.log(formattedDate,"formated date===============");
                    object.invoice_date = formattedDate;
                    console.log("final object ===============",object);
                    $("#modeldata").trigger("click");
                    $("#loader_rescan").removeClass("ibox-content")
                    $("#loader_rescan").removeClass("sk-loading")
                    $("#spin_rescan").addClass("d-none")
                    $("#loader").removeClass("ibox-content");
                    $("#loader").removeClass("sk-loading");
                    $("#spin1").addClass("d-none");
                    
                  }else{
                    swal("", "Select Invoice date formate in trained!", "warning")
                    $("#loader_rescan").removeClass("ibox-content")
                    $("#loader_rescan").removeClass("sk-loading")
                    $("#spin_rescan").addClass("d-none")
                    $("#loader").removeClass("ibox-content");
                    $("#loader").removeClass("sk-loading");
                    $("#spin1").addClass("d-none");
                  }
        

            

                }
              }
            }
         


        
          }
           else {
            swal("", res.error, "error").then(() => {
              // req_body.error_message = res.error;
              // req_body.status = { code: 1000 };
              // req_body.gate_number = $("#gate_number").html();
              // req_body.details = [];
              // req_body.tags = [];
  
              // errorStatus(fd_data);
              
  
              $("#loader").removeClass("ibox-content");
              $("#loader").removeClass("sk-loading");
              $("#spin1").addClass("d-none");
              $("#loader_rescan").removeClass("ibox-content");
              $("#loadloader_rescaner").removeClass("sk-loading");
              $("#spin_rescan").addClass("d-none");


            });
          }
        })
        .catch((error) => {
          console.log(error);
          swal("" , error , "error");
          console.log("Error uploading image:", error);
        });

      } else {
        swal("", "No template trained for the vendor", "error").then(
          () => {
            $("#loader").removeClass("ibox-content");
            $("#loader").removeClass("sk-loading");
            $("#spin1").addClass("d-none");
            $("#loader_rescan").removeClass("ibox-content");
            $("#loadloader_rescaner").removeClass("sk-loading");
            $("#spin_rescan").addClass("d-none");
          

            

            
            $("#preview_img").addClass("invisible");
          }
        );
      }


    }else{
      swal("", "Please Enter Vendor Code", "warning");
    }
  
  

    




    
    
  })




  $("#po_no_search").click(()=>{


    if($("#vendor_code").val() != "")
    {
    po_table = $("#po_table").DataTable({
      language: {
      'paginate': {
      'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
      'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
      }
      },
      dom: '<"top">t<"bottom"ip>',
      ordering: true,
      lengthMenu : [5,10,20,25,50],
      pagingType: "simple_numbers",
      select: true,
  });

    // $("#po_no_selected").val("");
    $("#po_no_search_modal").trigger("click")
    $("#po_no_selected").val($("#po_number").val())
  $("#po_type_search").val($("#po_type").val())
  
  
  count = 0;
  $("#vendor_name_modal").val($("#vendorname").val())
  $("#vendor_code_modal").val($("#vendor_code").val())
  $("#po_no_selected_search").trigger("click")


}
else{
  swal("", "Please Select Vendor Code", "warning");
}

})





$("#po_no_selected_search").click(()=>{
  
  $("#loader_po").addClass("ibox-content")
  $("#loader_po").addClass("sk-loading")
  $("#spin_po").removeClass("d-none")
  

  let po_no_value , po_type_search;

  console.log(count);

  if($("#deliveryChallanNumber").val() == "")
  {

    $(".d_number").addClass("invisible")
    $("#dc_number").val("")

      if(count == 0)
      {
        po_no_value = $("#po_no_selected").val() != "" ?  `&%24filter=F4311.OORN EQ ${$("#po_no_selected").val()}` : "";
        po_type_search = $("#po_type_search").val() != "" ?  `&%24filter=F4311.OCTO EQ ${$("#po_type_search").val()}` : "";
      }
      else{
        po_no_value = $("#po_no_selected").val() != "" ?  `&%24filter=F4311.DOCO EQ ${$("#po_no_selected").val()}` : "" ;
        po_type_search = $("#po_type_search").val() != "" ?  `&%24filter=F4311.DCTO EQ ${$("#po_type_search").val()}` : "" ;
      }
  }
  else{

    $(".d_number").removeClass("invisible")
    $("#dc_number").val($("#deliveryChallanNumber").val())
    // $("#dc_number").val(0)

    po_no_value = $("#po_no_selected").val() != "" ?  `&$filter=F56UD911.MATH01 EQ ${$("#po_no_selected").val()}` : "" ;
    po_type_search = $("#po_type_search").val() != "" ?  `&$filter=F56UD911.A1CC EQ ${$("#po_type_search").val()}` : ""

  }

  count++;


  // let po_no_value = $("#po_no_selected").val() != "" ?  `&%24filter=F4311.DOCO EQ ${$("#po_no_selected").val()}` : "" ;
  // let po_type_search = $("#po_type_search").val() != "" ?  `&%24filter=F4311.DCTO EQ ${$("#po_type_search").val()}` : "" ;

  let po_vendor_code = $("#vendor_code").val();
  let dc_number = $("#dc_number").val() != "" ? `&%24filter=F56UD911.YCHL%20EQ%20${$("#dc_number").val()}` : "" ;  

  let dynamic_url;

  if($("#deliveryChallanNumber").val() != "")
  {
      dynamic_url = `${[login[0].url]}/jderest/v2/dataservice/table/F56UD911?$field=F56UD911.DOCO&$field=F56UD911.YCHL&$field=F56UD911.MATH01&$field=F56UD911.A1CC&$field=F56UD911.DCTO&$field=F56UD911.KCOO&$field=F56UD911.DSC1&$field=F56UD911.LITM&%24filter=F56UD911.AN8%20EQ%20${po_vendor_code}${dc_number}${po_no_value}${po_type_search}`
      console.log(dynamic_url);
  }
  else{
    dynamic_url =`${[login[0].url]}/jderest/v2/dataservice/table/F4311?%24field=F4311.DOCO&%24field=F4311.KCOO&%24field=F4311.DCTO&%24field=F4311.AN8&%24field=F4311.DSC1&%24field=F4311.LITM&%24filter=F4311.NXTR%20GE%20400&%24filter=F4311.LTTR%20NE%20980&%24filter=F4311.AOPN%20NE%200&%24filter=F4311.AN8%20EQ%20${po_vendor_code}${po_no_value}${po_type_search}`
  }

  
  $.ajax({
    "url": dynamic_url,
    headers: {
      Authorization: "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
    },
    success : function(data , status , xhr)
    {

      console.log(po_table);

      po_table.destroy();
      $("#po_table_body").empty();

      // let incoming_value  = data.fs_DATABROWSE_F4311.data.gridData.rowset;

      if($("#deliveryChallanNumber").val() == "")
      {
          data.fs_DATABROWSE_F4311.data.gridData.rowset.map((value)=>{

          $("#po_table_body").append(`<tr><td>${value.F4311_DOCO}</td><td>${value.F4311_DCTO}</td><td>${value.F4311_KCOO}</td><td>${value.F4311_LITM}</td><td>${value.F4311_DSC1}</td></tr>`)

          })
      }
      else{

        data.fs_DATABROWSE_F56UD911.data.gridData.rowset.map((value)=>{

          $("#po_table_body").append(`<tr><td>${value.F56UD911_MATH01}</td><td>${value.F56UD911_A1CC}</td><td>${value.F56UD911_KCOO}</td><td>${value.F56UD911_LITM}</td><td>${value?.F56UD911_DSC1 == undefined ? "" : value.F56UD911_DSC1 }</td></tr>`)

          })

      }

        $("#loader_po").removeClass("ibox-content")
        $("#loader_po").removeClass("sk-loading")
        $("#spin_po").addClass("d-none")

    },
    error : function(xhr){

      $("#loader_po").removeClass("ibox-content")
      $("#loader_po").removeClass("sk-loading")
      $("#spin_po").addClass("d-none")

    },
    complete : function(xhr, status)
    {

      po_table = $("#po_table").DataTable({
        select: {
          toggleable: false
        },
        language: {
        'paginate': {
        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
        },
        dom: '<"top">t<"bottom"ip>',
        ordering: true,
        lengthMenu : [5,10,20,25,50],
        pagingType: "simple_numbers",
        select: true,
    });

    
    if($("#deliveryChallanNumber").val() != "")
    {
      po_table.column(4).visible(false);
    }
    else{
      
      po_table.column(4).visible(true);
    }

    }
  
  })
  
})

let po_select;


$("#po_table_body").on("click", "tr", function () {
  po_select = ""
  po_row = $(this)[0];
  if($(po_row).hasClass("selected") == false)
  {
    po_select = po_table.row(this).data();
  }
  else{
    po_select = ""
  }
  console.log(po_select);

});

function search_po(po_select) {

  console.log(po_select);
  $("#po_number").val(po_select[0]);
  $("#po_type").val(po_select[1]);
  // $("#vendor_name").val(dataa[1]);

  // if (dataa) {
  //   $("#preview_img").removeClass("invisible");
  // }

  $(po_row).removeClass("selected");
  // $("#preview_img").removeClass("invisible");


}

$("#po_no_select_modal").click(()=>{


  search_po(po_select)

})








  
  $("#submit_gate").click((e) => {
    let count = 0;

    console.log("req == obj : " , obj);

    // var codes = [];
    var tag_code = [];

    e.preventDefault();

    // var code = 100;

    object.transactionType = $("#Transaction").val();

    // var gate = $("#gate_number").html()
    let amount,taxable_value;

    



      for(let i = 0 ; i < $(".check").length ; i++)
      {

        let check_id = $(".check")[i].getAttribute("id")
        let check_value = $(".check")[i].value

        object[`${check_id}`] = check_value

      }


      let empty_arr = []
      
      if(object.transactionType != "ST/OT" ){
        if( rescan_counts != 0)
        {
          if(object.transactionType != "Service_PO")
          {
            object.details = details_payload
          }
          else{
            object.details = empty_arr
          }
        }
        else{

          if(object.transactionType == "Service_PO")
          {
            object.details = empty_arr
          }
          else if(object.transactionType == "Credit_Note" || object.transactionType == "Debit_Note" || object.transactionType == "ServiceWithMaterial")
          {
            object.details = empty_arr
          }

        }
      }


      console.log('object ---->' ,object);
      // else{

      //   let details_obj = {
      //         po_number: null,
      //         po_type: null,
      //         receipt_number: null,
      //         company_code: null,
      //         currency: null,
      //         amount: null,
      //         total: null,
      //         weight: null,
      //         hsn_code: null,
      //         item_code: null,
      //         quantity: null,
      //         gate_number: null,
      //         unit_amount: null,
      //         dtlTaxableValue: null,
      //         primaryUnit: null,
      //         primaryUom: null,
      //         secondaryUnit: null,
      //         secondaryUom: null,
      //         dtlFreight: null,
      //         dtlPackForwarding: null,
      //         dtlInsurance: null,
      //         dtlCustomDuty: null,
      //         dtlOtherCharges: null,
      //         dtlLoadingUnloading: null,
      //         dtlHandlingCharges: null,
      //         dtlDetentionCharges: null,
      //         jdeItemCode: null,
      //         lineNumber: null,
      //         description1: null,
      //         description2: null,
      //         description3: null,
      //         description4: null,
      //         description5: null,
      //         dtlAmount1: null,
      //         dtlAmount2: null,
      //         dtlAmount3: null,
      //         dtlAmount4: null,
      //         dtlAmount5: null,
      //         actualRecievedQuantity: null,
      //         taxValue: null,
      //         taxAmount: null,
      //         uom: null
      //   }

      //   for(let j = 0 ; j < $("#tab_logic_body tr").length ; j++)
      //   {

      //     for(let i = 0 ; i < $(".input_size").length ; i++)
      //     {
    
      //       let check_id = $(".input_size")[i].getAttribute("id")
      //       let check_value = $(".input_size")[i].value
    
      //       details_obj[`${check_id}`] = check_value
    
      //     }

      //     object.details.push(details_obj)

      //   }
        

      // }
      
      
      
      

          // var span = $(".item");

          // span.map((index, value) => {
          //     codes.push(value.innerText.split("\n")[0]);
          //     // console.log(codes);
          // });
          
          // $("#save").click(() => {
            
          let supplier = $("#vendorcode")[0].value;
          
          object.gate_number = $("#gate_number").html();
          object.vehicle_nbr = $("#vehicle_nbr").val();
          object.vendorname = $("#vendorname").val();
          object.weight = $("#weight").val();
          object.in_time = $("#in_time").val();
          object.vendor_code = $("#vendor_code").val();
          try {
            
            object.invoice_number = $("#invoice_number").val().replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, '');
          } catch (error) {
            
          }
          // object.invoice_type = $("#invoice_type").val();
          object.po_number = $("#po_number").val();
          object.po_type = $("#po_type").val();
          object.deliveryChallanNumber = $("#deliveryChallanNumber").val()
          object.workOrderNumber = $("#workOrderNumber").val()
          object.storeId = $("#storeId").val(),
          object.unitName = $("#unitname").val(),
          object.taxable_value = $("#taxable_value").val().replace(/ /g,''),
          object.irn_number = $(".irn_number").val()
          object.eway_Bill = $("#eway_Bill").val() 



          if ($("#invoice_date").val() != "") {
            
            const inputDate = $("#invoice_date").val().replace(/^[\W_]+|[\W_]+$/g, '').trim();                
            const formattedDate = moment(inputDate).format("YYYY-MM-DD");
            object.invoice_date = formattedDate;
          }
          if (totalPdf_page !=1) {
            const inputDate = $("#invoice_date").val().replace(/^[\W_]+|[\W_]+$/g, '').trim();                
          
            $.ajax({
              url: `${[test[0].url]}/ocrtraining/get?supplier=${object.vendor_code}`,
              type: "GET",
              async:false,
              headers: {
                'Authorization': 'Bearer ' + token,
              },
              success: function (data,status,xhr) {;
                if(xhr.status == 200)
                {
                  const formattedDate = moment(inputDate, (data.data[0].date_format).toUpperCase()).format("YYYY-MM-DD");
                  console.log(formattedDate,"formated date===============");
                  object.invoice_date = formattedDate;                  
                }
              },
            });
          }
          // let statu = { code: 1000 };
          // let tag = [{code : 1000}]
          
          object.weight = parseInt(object.weight);
          
          object.amount = $('#amount').val()
          
          console.log("object send : ",object);
          // object.status = statu;
          // object.details = obj;
          // delete req_body.details;
          
          // console.log("last final payload:::::::: : ===", req_body);
          
          let vendor_code = $("#vendor_code").val();
          let Supplier_name;


        if($("#invoice_number").val() != "")
        {

          

          if($("textarea").val().length != 0 && $("#Transaction").val() != null)
          {


            $("#loader").addClass("ibox-content");
            $("#loader").addClass("sk-loading");
            $("#spin1").removeClass("d-none");
            
            $("#loader_rem").addClass("ibox-content");
            $("#loader_rem").addClass("sk-loading");
            $("#spin_rem").removeClass("d-none");

            $("#save").html("Please wait...");



            $.ajax({
              url : `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.AN8&$field=F43121.CNID&$filter=F43121.MATC EQ 1&$filter=F43121.AN8 EQ ${$("#vendor_code").val()}&$filter=F43121.CNID EQ ${$("#invoice_number").val()}&$filter=F43121.TRDJ GE 01042024`,
              headers: {
                  "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
              },
              success : function(res_daata,status,xhr)
              {

                console.log(res_daata);

                  if(res_daata.fs_DATABROWSE_F43121.data.gridData.summary.records > 0)
                  {


                    $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \nDuplicate Supplier Invoice`)

                    $("#loader").removeClass("ibox-content")
                    $("#loader").removeClass("sk-loading")
                    $("#spin1").addClass("d-none")

                    $("#loader_rem").removeClass("ibox-content");
                    $("#loader_rem").removeClass("sk-loading");
                    $("#spin_rem").addClass("d-none");

                    let today = new Date();
                    let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                    let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');
                    
                    // console.log(date +"  "+time );

                    $.ajax({
                        url : `${[test[0].url]}/remark/add`,
                        type : 'POST',
                        data : JSON.stringify({

                            gate_number: $("#gate_number").html(),
                            remark : `DUPLICATE SUPPLIER INVOICE`,
                            status  : 100,
                            username  : $(".name")[1].innerText,
                            timestamp : `${date} ${time}` 
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                        success : function(data,status,xhr)
                        {

                            console.log(data);
                        }
                      })


                      setTimeout(() => {
                        object.error_message = `Duplicate Supplier Invoice`
                        object.status = {code  : 1000}

                        errorStatus(object)
                      }, 500);



                      
                  }
                  else{
                    
                    $.ajax({
                        url : `${[test[0].url]}/gate/getAll?vendor=${$("#vendor_code").val()}&invoice=${$("#invoice_number").val()}&gate=${$("#gate_number").html()}`,
                        headers: {
                          'Authorization': 'Bearer ' + token,
                        },
                        success : function(data,status,xhr)
                        {
                          if(xhr.status == 200)
                          {

                            if(data.data == null)
                            {

                            if($("#Transaction").val() != "Handwritten_Bill")
                            {



                            $.ajax({
                              url: `${[
                                login[0].url,
                              ]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&%24field=F0101.ALPH&%24filter=F0101.AN8%20EQ%20${vendor_code}`,
                              type: "GET",
                              headers: {
                                Authorization:
                                  "Basic " +
                                  btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                              },
                              success: function (data) {
                                console.log(data);

                                var record =
                                  data.fs_DATABROWSE_F0101.data.gridData.summary.records;
                                try {
                                  Supplier_name =
                                    data.fs_DATABROWSE_F0101.data.gridData.rowset[0].F0101_ALPH;
                                } catch (error) {
                                  console.log(error);
                                }

                                if (record == 1) {


                                  let next;

                                  if($("#Transaction").val() == "ST/OT")
                                  {
                                    next  = 279
                                  }
                                  else if(object.deliveryChallanNumber != null)
                                  {
                                    next  = 280
                                  }
                                  else{
                                    next = 400
                                  }

                                    let req = {
                                      po_number: $("#po_number").val().replace(/ /g,''),
                                      po_type: $("#po_type").val().replace(/ /g,''),
                                      supplier: $("#vendor_code").val().replace(/ /g,''),
                                      amount: $('#taxable_value').val().split(",").join(""),
                                      date_today: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").reverse().join("-"),
                                      next_status : next
                                    };
      
                                    console.log(req);
      
                                    $.ajax({
                                      url: `${[
                                        login[0].url,
                                      ]}/jderest/v3/orchestrator/ORCH_AP_PO_VALIDATE`,
                                      type: "POST",
                                      data: JSON.stringify(req),
                                      headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        Authorization:
                                          "Basic " +
                                          btoa(
                                            `${login[0].username}` + ":" + `${[login[0].password]}`
                                          ),
                                      },
                                      success: function (data, status, xhr) {

                                        console.log(xhr);
                                        if (data.status) {
                                          // console.log("final payload to post", req_body);
      
                                          
                                          
                                          if($("#Transaction").val() == "Service_PO" || $("#Transaction").val() == "Credit_Note" || $("#Transaction").val() == "Debit_Note" || $("#Transaction").val() == "ServiceWithMaterial")
                                          {
                                            object.status = {code : 200}
                                          }
                                          else{
                                            object.status = {code : 150}
                                          }


                                          object.workOrderNumber = $("#workOrderNumber").val()



                                          let today = new Date();
                                          let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                                          let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

                       // console.log(date +"  "+time );

                                              $.ajax({
                                                  url : `${[test[0].url]}/remark/add`,
                                                  type : 'POST',
                                                  data : JSON.stringify({

                                                      gate_number: $("#gate_number").html(),
                                                      remark : $("textarea").val().toUpperCase(),
                                                      status  : 100,
                                                      username  : $(".name")[1].innerText,
                                                      timestamp : `${date} ${time}` 
                                                  }),
                                                  headers: {
                                                      'Accept': 'application/json',
                                                      'Content-Type': 'application/json',
                                                      'Authorization': 'Bearer ' + token,
                                                  },
                                                  success : function(data,status,xhr)
                                                  {          
                                                    console.log("remark :" , data);
                                                  }
                                                })          
                                                
                                                let todays = new Date();
                                                let dates = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                                                let times = String(todays.getHours()).padStart(2, '0')+':'+String(todays.getMinutes()).padStart(2, '0')+':'+String(todays.getSeconds()).padStart(2, '0');                  

                                                // console.log("data saved", data);

                                                $.ajax({
                                                    url : `${[test[0].url]}/remark/add`,
                                                    type : 'POST',
                                                    data : JSON.stringify({
        
                                                        gate_number: $("#gate_number").html(),
                                                        remark : "SUCCESSFULLY UPDATED FROM GATE",
                                                        status  : 100,
                                                        username  : $(".name")[1].innerText,
                                                        timestamp : `${dates} ${times}` 
                                                    }),
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + token,
                                                    },
                                                    success : function(data,status,xhr)
                                                    {
        
                                                    }
                                                })


                                                object.is_reserved = "N"

                                                $.ajax({
                                                  url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object.gate_number}&username=${$(".name")[1].innerText}`,
                                                  type: "delete",
                                                  headers: {
                                                      'Accept': 'application/json',
                                                      'Content-Type': 'application/json',
                                                      'Authorization': 'Bearer '+ token,
                                                  },
                                                  success: function (data,status,xhr) {
                                                      console.log(data);
                                                      console.log(xhr);
                                                      if(xhr.status == 200)
                                                      {

                                                        $.ajax({
                                                          type: "PUT",
                                                          url: `${[test[0].url]}/gate/put?id=${object.id}`,
                                                          data: JSON.stringify(object),
                                                          headers: {
                                                            Accept: "application/json",
                                                            "Content-Type": "application/json",
                                                            'Authorization': 'Bearer ' + token,
                                                          },
                    
                                                          success: function (data, status, xhr) {
              
                                                            console.log(xhr);
                                                            if (xhr.status == 200) {
                    
                                                              
                                                              // let file = relative path of pdf 
                                                              let messageSend;

                                                              if($("#Transaction").val() == "Service_PO" || $("#Transaction").val() == "Credit_Note" || $("#Transaction").val() == "Debit_Note" || $("#Transaction").val() == "ServiceWithMaterial")
                                                              {
                                                                $.sendEmail(data.data, "Store",convertedFile_attachment);
  
                                                                messageSend = `${$("#gate_number").html()} Updated To Store`
                                                              }
                                                              else{
                                                                $.sendEmail(data.data, "Unload",convertedFile_attachment);
  
                                                                messageSend = `${$("#gate_number").html()} Updated To Unload`
                                                              }

              
                                                              swal("" , `${messageSend}` , "success").then(()=>{
              
                                                                window.open("../../gate/template/gate.jsp","_self");
                                                                $("#modalCall").trigger("click")
              
                                                              })
                    
                                                            } else {
                                                              console.log(xhr);
                                                              console.log(data);
                                                              // swal("", xhr.responseJSON.message, "error")
                                                              swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(
                                                                () => {
                                                                  // Error func
                    
                                                                  object.error_message =
                                                                    xhr.responseJSON.message;
                                                                  object.status = { code: 1000 };
                                                                  object.workOrderNumber = $("#workOrderNumber").val()
                    
                                                                  errorStatus(object);
                    
                                                                  $("#loader").removeClass("ibox-content");
                                                                  $("#loader").removeClass("sk-loading");
                                                                  $("#spin1").addClass("d-none");
                                                                  
                                                                  $("#loader_rem").removeClass("ibox-content");
                                                                  $("#loader_rem").removeClass("sk-loading");
                                                                  $("#spin_rem").addClass("d-none");
              
                                                                  $("#save").html("SAVE");
                                                                  $("form")[0].reset();
                                                                  
                                                                }
                                                              );
                                                            }
                                                          },
                    
                                                          error: function (
                                                            xhr,
                                                            httpStatusMessage,
                                                            customErrorMessage
                                                          ) {
                                                            console.log(xhr);
                    
                                                            if(xhr.status == 498)
                                                            {
                                                                $.tokenError();
                                                            }
                                                            else{
                                                              // swal("", xhr.responseJSON.message, "error")
                                                              swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(
                                                                () => {
                                                                  // Error object
                                                                  object.objectmessage = xhr.responseJSON.message;
                                                                  object.object = { code: 1000 };
                                                                  object.workOrderNumber = $("#workOrderNumber").val()
                    
                                    
                    
                                                                  errorStatus(object);
                    
                                                                  $("#loader").removeClass("ibox-content");
                                                                  $("#loader").removeClass("sk-loading");
                                                                  $("#spin1").addClass("d-none");
              
                                                                  $("#loader_rem").removeClass("ibox-content");
                                                                  $("#loader_rem").removeClass("sk-loading");
                                                                  $("#spin_rem").addClass("d-none");
              
                                                                  $("#save").html("SAVE");
                                                                }
                                                              );
                                                            }
                                                          },
                                                        });
                                                          
                                                      }
                                                      else{
                                                              $.errorMessage(xhr.responseJSON.message);
                                                      }
                                                  },
                                                  error: function (xhr) {
                                                      if(xhr.status == 498)
                                                      {
                                                          $.tokenError();
                                                      }
                                                      else if(xhr.status >= 400 && xhr.status < 500){
                              
                                                              $.errorMessage(xhr.responseJSON.message);
                                                      }
                                                      else{
                                                              $.errorMessage(xhr.responseJSON.error)
                                                      }
                                                  }
                                              })
      
      
                                          
                                        } else {

                                          console.log(xhr);
                                          // swal("", xhr.responseJSON.message, "error")
                                          swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(() => {
                                            object.error_message = xhr.responseJSON.message;
                                            object.status = { code: 1000 };
                                            object.workOrderNumber = $("#workOrderNumber").val()
      
      
      
                                            errorStatus(object);
      
                                            // Error func
                                            $("#loader").removeClass("ibox-content");
                                            $("#loader").removeClass("sk-loading");
                                            $("#spin1").addClass("d-none");

                                            $("#loader_rem").removeClass("ibox-content");
                                            $("#loader_rem").removeClass("sk-loading");
                                            $("#spin_rem").addClass("d-none");
                                            $("#save").html("SAVE");
                                          });
                                        }
                                      },
                                      error: function (xhr) {
      
                                        console.log(xhr);
                                        if (xhr.status < 500 && xhr.responseJSON.message.DREQ_AP_PO_Header.Message) {
                                          // swal("", xhr.responseJSON.message.DREQ_AP_PO_Header.Message, "error")
                                          swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(() => {

                                            console.log("error");
                                            // Error func
      
                                            object.error_message = xhr.responseJSON.message.DREQ_AP_PO_Header.Message;
                                            object.status = { code: 1000 };
                                            object.workOrderNumber = $("#workOrderNumber").val()
      
                                            errorStatus(object);
      
                                            $("#loader").removeClass("ibox-content");
                                            $("#loader").removeClass("sk-loading");
                                            $("#spin1").addClass("d-none");

                                            $("#loader_rem").removeClass("ibox-content");
                                            $("#loader_rem").removeClass("sk-loading");
                                            $("#spin_rem").addClass("d-none");
                                            $("#save").html("SAVE");
                                          });
                                        } else {
      
                                            // swal(
                                            //   "",
                                            //   xhr.responseJSON.message,
                                            //   "error"

                                            try {
                                              
                                              if(xhr.responseJSON.message.DREQ_AP_PO_Header.Message){

                                                swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(() => {
                                                  // Error func
                          
                                                  console.log("500 if");
                                                  object.error_message = xhr.responseJSON.message.DREQ_AP_PO_Header.Message;
                                                  object.status = { code: 1000 };
                                                  object.workOrderNumber = $("#workOrderNumber").val()
                                                  
                          
                                                  errorStatus(object);
                          
                                                  $("#loader").removeClass("ibox-content");
                                                  $("#loader").removeClass("sk-loading");
                                                  $("#spin1").addClass("d-none");

                                                  $("#loader_rem").removeClass("ibox-content");
                                                  $("#loader_rem").removeClass("sk-loading");
                                                  $("#spin_rem").addClass("d-none");
                                                  $("#save").html("SAVE");
                                                });
                                              }
                                            } catch (error) {
                                              
                                              swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(() => {
                                                // Error func
                                                console.log("500 else");
                        
                                                object.error_message = xhr.responseJSON.message;
                                                object.status = { code: 1000 };
                                                
                                                object.workOrderNumber = $("#workOrderNumber").val()
        
                        
                                                errorStatus(object);
                        
                                                $("#loader").removeClass("ibox-content");
                                                $("#loader").removeClass("sk-loading");
                                                $("#spin1").addClass("d-none");

                                                $("#loader_rem").removeClass("ibox-content");
                                                $("#loader_rem").removeClass("sk-loading");
                                                $("#spin_rem").addClass("d-none");
                                                $("#save").html("SAVE");
                                              });
                                            }


                                              

                                            // )
                                            
                                        
                                        }
                                      },
                                    });

                                  




                                } else {
                                  // swal("", "No Vendor in JDE", "error")
                                  swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(() => {
                                    object.error_message = "No Vendor in JDE";
                                    object.status = { code: 1000 };
                                    object.workOrderNumber = $("#workOrderNumber").val()



                                    errorStatus(object);
                                    $("#loader").removeClass("ibox-content");
                                    $("#loader").removeClass("sk-loading");
                                    $("#spin1").addClass("d-none");

                                    $("#loader_rem").removeClass("ibox-content");
                                    $("#loader_rem").removeClass("sk-loading");
                                    $("#spin_rem").addClass("d-none");
                                    $("#save").html("SAVE");
                                  });
                                }
                              },
                              error: function (xhr) {
                                // swal("", xhr.responseJSON.sysErrors[0].TITLE, "error")
                                swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(
                                  () => {
                                    object.error_message = xhr.responseJSON.sysErrors[0].TITLE;
                                    object.status = { code: 1000 };
                                    object.workOrderNumber = $("#workOrderNumber").val()


                                    errorStatus(object);
                                    $("#loader").removeClass("ibox-content");
                                    $("#loader").removeClass("sk-loading");
                                    $("#spin1").addClass("d-none");

                                    $("#loader_rem").removeClass("ibox-content");
                                    $("#loader_rem").removeClass("sk-loading");
                                    $("#spin_rem").addClass("d-none");
                                    $("#save").html("SAVE");
                                  }
                                );
                              },
                            });

                          }
                          else{

                            let count = 0;
                            for(let i = 0 ; i < $(".bill").length ; i++)
                            {

                              if($(".bill")[i].value != '')
                              {
                                let bill = $(".bill")[i]
                                $(bill).css("border" , "1px solid #e9ecef")     
                                count++;                       
                              }
                              else{
                                let bill = $(".bill")[i]

                                $(bill).css("border" , "1px solid red") 
                              }
                            }

                            console.log(count);

                            let message;

                            if(count == $(".bill").length)
                            {

                              if(+$("#amount").val() > 0 && $("#po_number").val() != "") 
                              {
                                object.status = {code : 200};
                                message = `${$("#gate_number").html()} Updated To Store`

                              }
                              else{

                                object.status = {code : 1000};
                                message = `${$("#gate_number").html()} Updated To Flaw-fix`

                              }

                              console.log(object);

                              object.is_reserved = "N"

                              $.ajax({
                                url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object.gate_number}&username=${$(".name")[1].innerText}`,
                                type: "delete",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+ token,
                                },
                                success: function (data,status,xhr) {
                                    console.log(data);
                                    console.log(xhr);
                                    if(xhr.status == 200)
                                    {

                                      $.ajax({
                                        type: "PUT",
                                        url: `${[test[0].url]}/gate/put?id=${object.id}`,
                                        data: JSON.stringify(object),
                                        headers: {
                                          Accept: "application/json",
                                          "Content-Type": "application/json",
                                          'Authorization': 'Bearer ' + token,
                                        },
        
                                        success: function (data, status, xhr) {
                                          if (xhr.status == 200) {
        
                                            console.log(data);
        
                                            // let file = relative path of pdf 
                                            $.sendEmail(data.data, "Store",convertedFile_attachment);
                                            swal("" , `${message}` , "success").then(()=>{
                                              
                                                  window.open("../../gate/template/gate.jsp","_self");
                                                  $("#modalCall").trigger("click")
                                            })
        
                                            
                                          } else {
                                            console.log(xhr);
                                            console.log(data);
                                            // swal("", xhr.responseJSON.message, "error")
                                            swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(
                                              () => {
                                                // Error func
        
                                                object.error_message =
                                                  xhr.responseJSON.message;
                                                object.status = { code: 1000 };
                                                object.workOrderNumber = $("#workOrderNumber").val()
        
                                                errorStatus(object);
        
                                                $("#loader").removeClass("ibox-content");
                                                $("#loader").removeClass("sk-loading");
                                                $("#spin1").addClass("d-none");
        
                                                $("#loader_rem").removeClass("ibox-content");
                                                $("#loader_rem").removeClass("sk-loading");
                                                $("#spin_rem").addClass("d-none");
                                                $("#save").html("SAVE");
                                                $("form")[0].reset();
                                            
                                              }
                                            );
                                          }
                                        },
        
                                        error: function (
                                          xhr,
                                          httpStatusMessage,
                                          customErrorMessage
                                        ) {
                                          console.log(xhr);
        
                                          if(xhr.status == 498)
                                          {
                                              $.tokenError();
                                          }
                                          else{
                                            // swal("", xhr.responseJSON.message, "error")
                                            swal("" , `${$("#gate_number").html()} Updated To Flaw-fix` , "success").then(
                                              () => {
                                                // Error object
                                                object.objectmessage = xhr.responseJSON.message;
                                                object.object = { code: 1000 };
                                                object.workOrderNumber = $("#workOrderNumber").val()
        
                  
        
                                                errorStatus(object);
        
                                                $("#loader").removeClass("ibox-content");
                                                $("#loader").removeClass("sk-loading");
                                                $("#spin1").addClass("d-none");
        
                                              $("#loader_rem").removeClass("ibox-content");
                                              $("#loader_rem").removeClass("sk-loading");
                                              $("#spin_rem").addClass("d-none");
                                                $("#save").html("SAVE");
                                              }
                                            );
                                          }
                                        },
                                      });
                                       
                                    }
                                    else{
                                            $.errorMessage(xhr.responseJSON.message);
                                    }
                                },
                                error: function (xhr) {
                                    if(xhr.status == 498)
                                    {
                                        $.tokenError();
                                    }
                                    else if(xhr.status >= 400 && xhr.status < 500){
            
                                            $.errorMessage(xhr.responseJSON.message);
                                    }
                                    else{
                                            $.errorMessage(xhr.responseJSON.error)
                                    }
                                }
                            })



                              
                              
                            }
                            else{
                              $("#loader").removeClass("ibox-content");
                              $("#loader").removeClass("sk-loading");
                              $("#spin1").addClass("d-none");

                              $("#loader_rem").removeClass("ibox-content");
                              $("#loader_rem").removeClass("sk-loading");
                              $("#spin_rem").addClass("d-none");
                              $("#save").html("SAVE");
                            }


                          }

                        
                        }
                          else{

                            console.log("data : "  , data);

                            $.errorMessage(`${data.data} - ${data.message}`)

                            $("#loader").removeClass("ibox-content");
                            $("#loader").removeClass("sk-loading");
                            $("#spin1").addClass("d-none");

                            $("#loader_rem").removeClass("ibox-content");
                            $("#loader_rem").removeClass("sk-loading");
                            $("#spin_rem").addClass("d-none");
                            $("#save").html("SAVE");


                          }
                        }
                        else{

                          console.log("data 2 :" , data);
                          $.errorMessage(`${data.data} - ${data.message}`)

                          $("#loader").removeClass("ibox-content");
                          $("#loader").removeClass("sk-loading");
                          $("#spin1").addClass("d-none");

                          $("#loader_rem").removeClass("ibox-content");
                          $("#loader_rem").removeClass("sk-loading");
                          $("#spin_rem").addClass("d-none");
                          $("#save").html("SAVE");

                            

                        }
                        
                      },
                      error : function(xhr)
                      {
                        $("#loader").removeClass("ibox-content");
                          $("#loader").removeClass("sk-loading");
                          $("#spin1").addClass("d-none");

                          $("#loader_rem").removeClass("ibox-content");
                          $("#loader_rem").removeClass("sk-loading");
                          $("#spin_rem").addClass("d-none");
                          $("#save").html("SAVE");
                          if(xhr.status == 498)
                          {
                            $.tokenError();
                            
                          }
                          else if(xhr.status >= 400 && xhr.status < 500)
                          {
                            $.errorMessage(xhr.responseJSON.message);

                          }
                          else{
                            $.errorMessage(xhr.responseJSON.error)
                          }
                      }
                  




                    });


                        }
                      },
                      error: function(xhr){
                        console.log(xhr);
                        $("#loader").removeClass("ibox-content");
                        $("#loader").removeClass("sk-loading");
                        $("#spin1").addClass("d-none");

                        $("#loader_rem").removeClass("ibox-content");
                        $("#loader_rem").removeClass("sk-loading");
                        $("#spin_rem").addClass("d-none");
                        $("#save").html("SAVE");
                        $.errorMessage(xhr.responseJSON.sysErrors[0].TITLE)

                      }
              })

              
          }
          else{
            if($("#Transaction").val() == null)
            {
              $.errorMessage("Please Select the Transaction Type")
            }
            else{
              $.errorMessage("Please Add Remarks")
            }
          }

        }
        else{
          $.errorMessage(`Invoice Number Field Is Empty`)
        }
  

  
  
})





function errorStatus(object) {


              let today = new Date();
              let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
              let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

              // console.log(date +"  "+time );

              $.ajax({
                  url : `${[test[0].url]}/remark/add`,
                  type : 'POST',
                  data : JSON.stringify({

                      gate_number: $("#gate_number").html(),
                      remark : $("textarea").val().toUpperCase(),
                      status  : 100,
                      username  : $(".name")[1].innerText,
                      timestamp : `${date} ${time}` 
                  }),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token,
                  },
                  success : function(data,status,xhr)
                  {
                    console.log("remark :" , data);
                  }
                })

                let todays = new Date();
                let dates = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                let times = String(todays.getHours()).padStart(2, '0')+':'+String(todays.getMinutes()).padStart(2, '0')+':'+String(todays.getSeconds()).padStart(2, '0');                  

                // console.log("data saved", data);

                $.ajax({
                    url : `${[test[0].url]}/remark/add`,
                    type : 'POST',
                    data : JSON.stringify({

                        gate_number: $("#gate_number").html(),
                        remark : "SUCCESSFULLY UPDATED FROM GATE",
                        status  : 100,
                        username  : $(".name")[1].innerText,
                        timestamp : `${dates} ${times}` 
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    success : function(data,status,xhr)
                    {

                    }
                })

                object.is_reserved = "N"

                $.ajax({
                  url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object.gate_number}&username=${$(".name")[1].innerText}`,
                  type: "delete",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+ token,
                  },
                  success: function (data,status,xhr) {
                      console.log(data);
                      console.log(xhr);
                      if(xhr.status == 200)
                      {

                        $.ajax({
                          type: "PUT",
                          url: `${[test[0].url]}/gate/put?id=${object.id}`,
                          data: JSON.stringify(object),
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + token,
                          },
                      
                          success: function (data, status, xhr) {
                            if (xhr.status == 200) {
                      
                              $.sendEmail(data.data, "Error",convertedFile_attachment);
                                              
                                    setTimeout(() => {
                                      window.open("../../gate/template/gate.jsp", "_self");
                                    }, 500);
                            
                            } 
                            else{
                      
                                  $.errorMessage(xhr.responseJSON.message);
                            }
                            
                          },
                          error: function (xhr) {
                      
                            console.log(xhr);
                            if(xhr.status == 498)
                            {
                                $.tokenError();
                            }
                            else if(xhr.status >= 400 && xhr.status < 500){
                      
                                  $.errorMessage(xhr.responseJSON.message);
                            }
                            else{
                                  $.errorMessage(xhr.responseJSON.error)
                            }
                          },
                        });
                          
                      }
                      else{
                              $.errorMessage(xhr.responseJSON.message);
                      }
                  },
                  error: function (xhr) {
                      if(xhr.status == 498)
                      {
                          $.tokenError();
                      }
                      else if(xhr.status >= 400 && xhr.status < 500){

                              $.errorMessage(xhr.responseJSON.message);
                      }
                      else{
                              $.errorMessage(xhr.responseJSON.error)
                      }
                  }
              })

  
}




  $("#myModal20").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    Vtable.destroy();
    $("#Vendor_body").empty();
  });

  $("#myModal21").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    po_table.destroy();
    $("#po_table_body").empty();
  });





});


