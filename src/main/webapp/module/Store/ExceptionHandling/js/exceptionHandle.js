$(document).ready(() => {

   // Function to convert data URL to Blob
   let fd = new FormData();
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
    const user_company = JSON.parse(localStorage.getItem("comapny"));
    const role_prov = JSON.parse(JSON.stringify("userrole"))
    const user_store = JSON.parse(localStorage.getItem("store"));
    var object =  JSON.parse(sessionStorage.getItem("object"));
    let object_put = object;
    let details = object_put.details;
    let unit_rate_tolerance = 0.01;
    let total_Line_item_weight=0

    console.log("details : ", details);



      for(let i=0;i<details.length;i++){
        if(!isNaN(details[i].quantity) &&  details[i].quantity != null ){ 
          
          total_Line_item_weight += parseFloat(details[i].quantity);  
        }
      }


    $("#weight").change(()=>{
      let weight = $("#weight").val()
      if(weight > total_Line_item_weight )
        {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
          
          swalWithBootstrapButtons.fire({
            // title: "Error Message",
            text: `Greater Than Actual Quantity`,
            icon: "warning",
            confirmButtonText: "OK",
            reverseButtons: true,
          });
          var inputElement = document.getElementById('weight');
          inputElement.style.border = '1px solid red';
        }
        else{
          var inputElement = document.getElementById('weight');
          inputElement.style.border = '';

          
        }

    })
    
    
   
  

    var convertedFile;
    console.log(object_put);
  $.checkstatus(object.id, true);

  console.log(object);

  let weight_sum = object.details.reduce(function(index,value,sum,array){


    index = index + +value.quantity;
  
    return index;
    
  
  },0)
  
  console.log("weight / qty :" ,weight_sum);

  $("#vehicle_nbr").val(object.vehicle_nbr);
  $("#vendorname").val(object.vendorname);
  $("#material_type").val(object.material_type);
  $("#weight").val(object.weight == null ? weight_sum : object.weight);
  $("#gate_number").html(object.gate_number);
  // $("#in_time").val(object.in_time);
  $("#division").val(object.division);
  $("#remark").val(object.remark);
  $("#po_number").val(object.po_number);
  $("#po_type").val(object.po_type);
  $("#vendor_code").val(object.vendor_code);
  $("#invoice_number").val(object.invoice_number);
  $("#invoice_date").val(object.invoice_date != null && object.invoice_date != "" && object.invoice_date != undefined ? object.invoice_date.split("-").reverse().join("-") : object.invoice_date);
  $("#amount").val(object.amount);
  $("#workOrderNumber").val(object.workOrderNumber);
  $("#deliveryChallanNumber").val(object.deliveryChallanNumber);
  

  // if(object.transactionType != "Job_work")
  // {
  //   $("#dc_fetch").addClass("d-none")
  // }
  // else{
  //   $("#po_no_search").addClass("d-none")
  // }

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

  $("#Transaction").val(object.transactionType);


  if(object.transactionType == "Handwritten_Bill")
  {
    $(".hand_written").removeAttr("readonly")
    // $("#invoice_date").attr("type" , "date")
    if(object.deliveryChallanNumber != null)
    {
      $("#deliveryChallanNumber").attr("readonly", "readonly")
    }
  }
  
  user_company.map((value)=>{
    
      $("#unitname").append(`<option value="${value}">${value}</option>`);

  })

  user_store.map((value)=>{

    $("#storeId").append(`<option value="${value}">${value}</option>`);

  })

  if(object.transactionType == "Service_PO" || object.transactionType == "Material_Bill" || object.transactionType == "Credit_Note" || object.transactionType == "Debit_Note" || object.transactionType == "ServiceWithMaterial")
  {
    $(".hide_wo").addClass("d-none")
    $(".hide_dc").addClass("d-none")
    $("#po_no_search").removeClass("d-none")
  }
  else if(object.transactionType == "Job_Work")
  {
    $("#po_no_search").addClass("d-none")
    $("#dc_fetch").removeClass("d-none")
  }


  $("#Transaction").change(()=>{

    
    if($("#Transaction").val() == "Job_Work")
    {
      // console.log('hello');
      $("#po_no_search").addClass("d-none")
      $("#dc_fetch").removeClass("d-none")
      $(".hide_wo").removeClass("d-none")
      $(".hide_dc").removeClass("d-none")

    }
    else if($("#Transaction").val() == "ST/OT")
    {
      $("#po_no_search").removeClass("d-none")
      $("#dc_fetch").addClass("d-none")
      $(".hide_wo").removeClass("d-none")
      $(".hide_dc").removeClass("d-none")

    }
    else{
    
    if($("#Transaction").val() != "Job_Work")
    {
      $("#deliveryChallanNumber").val("")
    }
      $(".hide_wo").addClass("d-none")
      $(".hide_dc").addClass("d-none")
      $("#dc_fetch").addClass("d-none")
      $("#po_no_search").removeClass("d-none")
    }

  })

  
  // $("#storeId").val(object.storeId);
  $("#actual_weight").val(object.actualWeightQuantity)
  $("#storeId").val(object.storeId)
  
  
  
  var tags = [];
  var codes = [];
  var tag_code = [];
  var tags_value = [];
  var invoice_pdf;

  // console.log(object);

  $("#error_message").click(() => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "Error Message",
      text: `${object.error_message}`,
      icon: "warning",
      confirmButtonText: "OK",
      reverseButtons: true,
    });
  });




  $("#uom_btn").click(()=>{
    $("#uom_change_details").trigger("click");
  })




  
  
  
  

  var test = $.test();
  var login = $.login();
  var vision = $.vision();
  
  
  $("#quantity_table").on("click", ".uom_change_value", function () {

    let ths = this;

    console.log('uom value  ---->' ,$(ths).parent().parent().find(".scan_uom").val());

    if ($(ths).parent().parent().find(".scan_uom").val() != 'null'  && $(ths).parent().parent().find(".scan_uom").val() != "") {
      
      $.ajax({
        url : `${[test[0].url]}/dualUOM/get?fromUnit=${$(ths).parent().parent().find(".scan_uom").val()}`,
        headers: {
              'Authorization': 'Bearer ' + token,
            },
        success: function (data, status, xhr) {
                if(xhr.status == 200) 
                {
  
  
                  console.log('ts value  ---->' ,data);
  
                  if(data.data.length != 0)
                  {
                    data.data.map((value)=>{
    
                        console.log('yess ---->' , value.conversionFactor);
                         
                        let newUnitRate = $(ths).parent().parent().find(".scan_unit_rate").val(($(ths).parent().parent().find(".scan_unit_rate").val() / value.conversionFactor).toFixed(5));
                        let newQuantity = $(ths).parent().parent().find(".scan_qty").val(($(ths).parent().parent().find(".scan_qty").val() * value.conversionFactor));
                        let newUOM = $(ths).parent().parent().find(".scan_uom").val(value.toUnit);
                        
                        let qtyId = $(ths).parent().parent().find(".scan_id").val();


                        $("#weight").val($(newQuantity).val())
    
    
                          for(let i = 0; i < $("#tab_logic_body tr").length ; i++)
                          {
    
                            if($(".item_id")[i].value == qtyId)
                            {
    
                              $(".quantity")[i].value = $(newQuantity).val();
                              $(".unit_amount")[i].value = $(newUnitRate).val();
                              $(".uom")[i].value = $(newUOM).val();
                            }
    
    
                          }
                          
    
    
    
    
                        $(ths).attr('disabled' , 'disabled');
                        $(ths).css('background-color' , 'green');
                        $(ths).val('Changed');
                        
                      
    
                    })
                  }
                  else{
                    $.errorMessage(`UOM Not Present Currently`)
                  }
  
                }
                else{
                  $.errorMessage(`${xhr.responseJSON.message}}`)
                }
            },
      })
    }
    else{
       $.errorMessage(`Please Remap The UOM`)
    }
 
    

  })

  // $.ajax({
  //   url: `${[test[0].url]}/companymaster/companies`,
  //   headers: {
  //     'Authorization': 'Bearer ' + token,
  //   },
  //   success: function (data, status, xhr) {
  //       if(xhr.status == 200) 
  //       {
  //         data.data.forEach(value => {
  //           $("#unitname").append(`<option value="${value.unit_name}">${value.unit_name}</option>`);
  //         });
  //       }
  //   },
  //   error: function (xhr) {
  //     if (xhr.status == 498) {
  //       $.tokenError();
  //     }
  //     else if(xhr.status >= 400 && xhr.status < 500){

  //           $.errorMessage(xhr.responseJSON.message);
  //     }
  //     else{
  //           $.errorMessage(xhr.responseJSON.error)
  //     }
  //   },
  //   complete : ()=>{
  //     $("#unitname").val(object.unitName).change();
  //   }
  // });

  // $('#unitname').on('change', function () {
  //   if($("#unitname").val() != null){

  //   var selectedOption = $("#unitname").val();
  //   console.log('Selected Option:', selectedOption);
  //   var unitName = selectedOption;

  //   var storeUrl = `${[test[0].url]}/factoryStore/findcompanystore?unit_name=` + encodeURIComponent(unitName);
    

  //   console.log("unitname :", unitName);

  //   if(unitName != null)
  //   {

  //     console.log(storeUrl);

    
  //   $.ajax({
  //     url: storeUrl,
  //     headers: {
  //       'Authorization': 'Bearer ' + token,
  //     },
  //     success: function (data, status, xhr) {
  //       console.log(xhr);
  //       if(xhr.status == 200)
  //       {
  //         $("#storeId").empty();
  //         data.data.forEach(value => {
  //           console.log(value);
  //           $("#storeId").append(`<option value="${value.storeCode}">${value.storeCode}</option>`);
  //         });
  //       }
  //       else{
          
  //         $("#storeId").empty();
  //         // $("#storeId").append(`<option value="" disabled selected>No Unit Name Selected</option>`);
  //         $.errorMessage(xhr.responseJSON.message);
  //       }
        
  //     },
  //     error: function (xhr) {

  //       console.log(xhr);
  //       if (xhr.status == 498) {
  //         $.tokenError();
  //       }
  //       else if(xhr.status >= 400 && xhr.status < 500){
          
  //         $.errorMessage(xhr.responseJSON.message);
  //         $("#storeId").empty();
  //         // $("#storeId").append(`<option value="" disabled selected>No Unit Name Selected</option>`);
  //       }
  //       else{
  //         $.errorMessage(xhr.responseJSON.error)
  //         $("#storeId").empty();
  //         // $("#storeId").append(`<option value="" disabled selected>No Unit Name Selected</option>`);
  //       }
        
  //     },
  //     complete : ()=>{
  //       if(object.storeId != null)
  //     {
  //       $("#storeId").val(object.storeId);
  //     }
  //       // $("#storeId").val(object.storeId);
  //       // if($("#storeId").val() == null){
  //       //   $("#storeId").append(`<option value="" disabled selected>No Unit Name Selected</option>`);
  //       // }

  //     }
  //   });

  // }

  //   // $.ajax({
  //   //   url: storeUrl,
  //   //   headers: {
  //   //     'Authorization': 'Bearer ' + token,
  //   //   },
  //   //   success: function (data, status, xhr) {
  //   //     if(xhr.status == 200)
  //   //     {
  //   //       $("#storeId").empty();
  //   //       data.data.forEach(value => {
  //   //         $("#storeId").append(`<option value="${value.store_code}">${value.store_code}</option>`);
  //   //       });
  //   //     }
  //   //     else{
          
  //   //       $("#storeId").empty();
  //   //           $.errorMessage(xhr.responseJSON.message);
  //   //     }
        
  //   //   },
  //   //   error: function (xhr) {
  //   //     if (xhr.status == 498) {
  //   //       $.tokenError();
  //   //     }
  //   //     else if(xhr.status >= 400 && xhr.status < 500){

  //   //           $.errorMessage(xhr.responseJSON.message);
  //   //           $("#storeId").empty();
  //   //     }
  //   //     else{
  //   //           $.errorMessage(xhr.responseJSON.error)
  //   //           $("#storeId").empty();
  //   //     }
       
  //   //   }
  //   // });


  // }


  // console.log(object.unitName);

  

  // if (object.tags.length == 0) {
  //   $("#roles").append(`<p class="border p-2 bg-primary">NO MISSING TAG</p>`);
  // } else {
  //   object.tags.map((value) => {
  //     $("#roles").append(
  //       `<button type="button" name="${value.id}" class="btn border tagss my-1 mx-1 fa fa-tag"> ${value.label}</button>`
  //     );
  //   });
  // }

  let gate_id = $("#gate_number").html();

  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${[test[0].url]}/file/data?gate=${gate_id}`, true);
    xhr.responseType = "blob";
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.response);
        var blob = xhr.response;
        // console.log(blob);

         // ----setting image to form data for rescan
        var reader = new FileReader();
              
        reader.onload = function(e) {
          var imageData = e.target.result;
          invoice_pdf = imageData;
          sessionStorage.setItem('preview_invoice', JSON.stringify(imageData));  
          

          // sending image for ocr for updating the trained invoice 
          var ocr_image = dataURLToBlob(imageData);
          fd.append('file', ocr_image);
        };
        reader.readAsDataURL(blob)
    
      // ---- end setting image to form data for rescan

        // Set the desired file name and type
      var fileName = `${gate_id}.pdf`
      var fileType = blob.type; // You should use the appropriate MIME type

      // Create a File object from the Blob data
      convertedFile = new File([blob], fileName, { type: fileType });  

        var url = URL.createObjectURL(blob);

        console.log("url : " ,url);

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
      } else {
        console.error("Request failed. Status: " + xhr.status);
      }
    };

    xhr.onerror = function () {
      console.error("Request failed");
    };

    xhr.send();
  } catch (error) {
    console.log(error);
  }




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
                                                  <input type="text" class="form-control input_size check"
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
                                                      <th class="d-none"> id </th>
                                                      <th class="text-center"> Item Code </th>
                                                      <th class="text-center"> Item Description </th>
                                                      <th class="text-center"> Hsn Code </th>
                                                      <th class="text-center"> UOM  </th>
                                                      <th class="text-center"> Qty </th>
                                                      <th class="text-center"> Unit Rate </th>
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
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="cgst_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">SGST RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="sgst_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">IGST RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="igst_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">CESS RATE</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="cess_percentage" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">Taxable value</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check check_submit unprocessed" required="" id="taxable_value" readonly="readonly">
                                              </div>
                                          </div>
                                      </div>
                        
                                      <div class="col-6" id="form3">
                        
                                          <h4></h4>
                        
                                          <!-- <hr> -->
                                          <div class="form-group row"><label class="col-3 col-form-label">CGST AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="cgst_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">SGST AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="sgst_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">IGST AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="igst_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">CESS AMOUNT</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="cess_amount" readonly="readonly">
                                              </div>
                                          </div>
                                          <div class="form-group row"><label class="col-3 col-form-label">Invoice Amount</label>
                                              <div class="col-9"><input type="text" class="form-control input_size check unprocessed" required="" id="amount" readonly="readonly">
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


  console.log(object.details,'objectobjectobjectobject');
  
  // for (let i = 0; i < $(".check").length; i++) {
  //   const element = $(".check")[i];
  //   if (object[`${$(element).attr("id")}`]) {
  //     let out = object[`${$(element).attr("id")}`];
  //     // var pattern = /^[\W_]+|[\W_]+$/g;
  //     // console.log(out);
  //     // console.log(pattern);
  //     // // var result = out.replace(pattern, '');
  //     $(element).val(out);
  //   }
  // }
  
//   $('#dc_number_type').change(function() {
//     if ($(this).val() === 'Unprocessed') {
//         $('.unprocessed').val(0);
//     }
//     else{
      
//   for (let i = 0; i < $(".check").length; i++) {
//     const element = $(".check")[i];
//     if (object[`${$(element).attr("id")}`]) {
//       let out = object[`${$(element).attr("id")}`];
     
//       $(element).val(out);
//     }
//   }

//     }
// });


//   for (let i = 0; i < object.details.length; i++) {
//     $("#tab_logic_body").append(`<tr>
//     <td class='d-none'><input type="text" class="form-control input_size item_id text-center" readonly value="${object.details[i].id}" ></td>
//     <td><input type="text" class="form-control input_size item_code text-center" readonly value="${object.details[i].item_code}" ></td>
//     <td><input type="text" class="form-control input_size item_description text-center" readonly value="${object.details[i].description1}" ></td>
//     <td><input type="text" class="form-control input_size fix hsn_code text-center" readonly value="${object.details[i].hsn_code}"></td>
//     <td><input type="text" class="form-control input_size fix uom text-center" readonly value="${object.details[i].uom}"></td>
//     <td><input type="text" id="detail_quantity" class="form-control input_size fix quantity check_submit text-center" readonly value="${object.details[i].quantity}"></td>
//     <td><input type="text" id="unit_amount" class="form-control input_size fix unit_amount check_submit text-center unprocessed" readonly value="${object.details[i].unit_amount}"></td>
//     <td><input type="text" id="detail_amount" class="form-control input_size fix amount text-center check_submit unprocessed" readonly value="${object.details[i].amount}"></td>
    
// </tr>`);

    


//     $("#modal_table_details").append(`<tr>
//             <td class="text-center border py-2 po_1" id="detail_po_no">${$(
//       "#po_number"
//     ).val()}</td>
//             <td class="text-center border py-2 des_1" id="">${object.details[i].item_code
//       }</td>
//             <td class="text-center border py-2 qty_1">${object.details[i].quantity
//       }</td>
//             <td class="text-center border py-2 unit_1"></td>
//             <td class="text-center border py-2 remark_1">............</td>
//             </tr>`);



//         $("#quantity_body").append(`
//           <tr>
//             <td class="d-none"><input type="text" readonly class="form-control input_size scan_id text-center" value="${object.details[i].id}"></td>
//             <td><input type="text" readonly class="form-control input_size scan_item text-center" value="${object.details[i].jdeItemCode ? object.details[i].jdeItemCode : object.details[i].item_code }"></td>
//             <td><input type="text" readonly class="form-control input_size scan_uom text-center" value="${object.details[i].uom}"></td>
//             <td><input type="text" readonly class="form-control input_size scan_qty text-center" value="${object.details[i].quantity}"></td>
//             <td><input type="text" readonly class="form-control input_size scan_unit_rate text-center" value="${object.details[i].unit_amount}"></td>
//             <td class="d-flex justify-content-center align-content-center"><input type="button" class="btn btn-primary scan_actual_quantity uom_change_value py-1" value="Change"></td>
//           </tr>
      
//             `)





//   }



// Function to populate check elements with values from the object
function populateCheckElements() {
  for (let i = 0; i < $(".check").length; i++) {
    const element = $(".check")[i];
    if (object[$(element).attr("id")]) {
      let out = object[$(element).attr("id")];
      $(element).val(out);
    }
  }
}

// Function to handle change event for both #dc_number_type and #Transaction
function handleDcAndTransactionChange() {
  if ($('#dc_number_type').val() === 'Unprocessed' && $("#Transaction").val() === "Job_Work") {
    $('.unprocessed').each(function() {
      $(this).data('original', $(this).val());  // Store original value
      $(this).val(0);  // Set value to 0
    });
  } else {
    $('.unprocessed').each(function() {
      if ($(this).data('original') !== undefined) {
        $(this).val($(this).data('original'));  // Revert to original value
      }
    });
    populateCheckElements();  // Re-populate check elements
  }
}

// Bind the change event handler to both #dc_number_type and #Transaction
$('#dc_number_type, #Transaction').change(handleDcAndTransactionChange);

// Initial population of check elements
populateCheckElements();

// Append rows to the table and store original values
for (let i = 0; i < object.details.length; i++) {
  $("#tab_logic_body").append(`
    <tr>
      <td class='d-none'>
        <input type="text" class="form-control input_size item_id text-center" readonly value="${object.details[i].id}">
      </td>
      <td>
        <input type="text" class="form-control input_size item_code text-center" readonly value="${object.details[i].item_code}">
      </td>
      <td>
        <input type="text" class="form-control input_size item_description text-center" readonly value="${object.details[i].description1}">
      </td>
      <td>
        <input type="text" class="form-control input_size fix hsn_code text-center" readonly value="${object.details[i].hsn_code}">
      </td>
      <td>
        <input type="text" class="form-control input_size fix uom text-center" readonly value="${object.details[i].uom}">
      </td>
      <td>
        <input type="text" id="detail_quantity" class="form-control input_size fix quantity check_submit text-center" readonly value="${object.details[i].quantity}">
      </td>
      <td>
        <input type="text" id="unit_amount" class="form-control input_size fix unit_amount check_submit text-center unprocessed" readonly value="${object.details[i].unit_amount}" data-original="${object.details[i].unit_amount}">
      </td>
      <td>
        <input type="text" id="detail_amount" class="form-control input_size fix amount check_submit text-center unprocessed" readonly value="${object.details[i].amount}" data-original="${object.details[i].amount}">
      </td>
    </tr>
  `);
}





  $(".check").map((index, value) => $(value).attr("readonly", "readonly"))



                // $('#remarks_row').click(function() {
                //   let remark_newRow = `<tr>
                //   <td><input type="text" readonly class="form-control input_size text-left re_username" id=""></td>
                //   <td><input type="text" readonly class="form-control input_size text-left re_date" id=""></td>
                //   <td><input type="text" readonly class="form-control input_size text-left re_label" id=""></td>
                //   <td><input type="text" readonly class="form-control input_size text-left re_remark" id=""></td>
                // </tr>`;
                //   $('#remark_table_body').append(remark_newRow);
                // });



                    let remark = []
                    
                    // $.ajax({
                    //     url : `${[test[0].url]}/remarks`,
                    //     headers: {
                    //         'Authorization': 'Bearer ' + token,
                    //       },
                    //     success: function(data,status,xhr)
                    //     {
                          
                    //       if(xhr.status == 200)
                    //       {
                    //         data.data.map(value=>{
                              
                    //           // console.log(value);
                    //           if(value.gate_number == $("#gate_number").html())
                    //           {
                    //                   console.log(" remarks " , data);
                    //                         remark.push(value)
                    //                     }
                    //                 })
                    //         }
                    //         // else{

                    //         //         $.errorMessage(xhr.responseJSON.message);
                    //         // }
        
                    //         },
                    //         complete: ()=>{
        
                    //             // console.log(remark);
        
                    //             // $("#remark_table tr").length
        
                    //             $.fn.DataTable.ext.pager.numbers_length = 5;
        
                    //             for(let i = 0 ; i < remark.length -1 ; i++)
                    //             {
                    //                 $("#remarks_row").trigger("click")
                    //             }
        
                    //             for(let i = 0 ; i < remark.length ; i++)
                    //             {
        
                    //                 // $(".re_gate_id")[i].value = remark[i].gate_number
                    //                 $(".re_username")[i].value = remark[i].username
                    //                 $(".re_remark")[i].value = remark[i].remark
                    //                 $(".re_date")[i].value = remark[i].timestamp
                    //                 $(".re_label")[i].value = remark[i].label
        
                    //             }
        
                    //             rem_table = $("#remark_table").dataTable({
                    //                 dom: '<"top">Rt<"bottom"ilp>',
                    //                 'colReorder': {
                    //                     'allowReorder': false
                    //                 },
                    //                 // ordering: true,
                    //                 // processing : true,
                    //                 lengthMenu: [5, 10, 20, 25, 50],
                    //             })
                    //         },
                    //         error: function (xhr) {
                    //             if(xhr.status == 498)
                    //             {
                    //                 $.tokenError();
                    //             }
                    //         }
                    //     })

                    let rem_table = $("#remark_table").dataTable({
                      dom: '<"top">Rt<"bottom"ilp>',
                      ordering: false,
                      ajax: {
                          url: `${[test[0].url]}/remarks?gateNumber=${$("#gate_number").html()}`,
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










  var po_table;
  var vendor_modal;



  // $("#vendor_no_selected").on("keypress", function (event) {
  //   if (event.keyCode === 13) {
      
  //     $("#vendor_selected_search").trigger("click");
  //   }
  // });


  // $("#po_no_selected").on("keypress", function (event) {
  //   if (event.keyCode === 13) {
     
  //     $("#po_no_selected_search").trigger("click");
  //   }
  // });



  $("#vendor_code_search").click(()=>{

    vendor_modal = $("#vendor_table_modal").DataTable({
      language: {
        paginate: {
          previous:
            '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          next: '<span class="next-icon"><i class="fa fa-angle-right"></i></span>',
        },
      },
      dom: '<"top">ft<"bottom"ip>',
      ordering: true,
      lengthMenu: [5, 10, 20, 25, 50],
      pagingType: "simple_numbers",
      select: true,
    });

    $("#vendor_no_selected").val("")
    $("#vendor_no_modal").trigger("click")
    // $("#vendor_selected_search").trigger("click")

  })




  $("#vendor_selected_search").click(() => {



    if($("#vendor_no_selected").val() != "")
    {
      

      $("#loader_vendor").addClass("ibox-content")
      $("#loader_vendor").addClass("sk-loading")
      $("#spin_vendor").removeClass("d-none")

    let dynamic_vendor = isNaN($("#vendor_no_selected").val() * 1) ? `$filter=F0101.ALPH CONTAINS ${$("#vendor_no_selected").val()}` : `$filter=F0101.AN8 EQ ${$("#vendor_no_selected").val()}`;

    console.log(dynamic_vendor);

      // $("#loader5").addClass("ibox-content");
      // $("#loader5").addClass("sk-loading");
      // $("#spin5").removeClass("d-none");

      let vendor_code_modal = $("#vendor_code").val();


      $.ajax({
        url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&${dynamic_vendor}`,
        type: "GET",
        // async : false,
        headers: {
          Authorization:
            "Basic " +
            btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
        },
        success: function (data) {
          console.log(data);
          
          // $("#loader5").removeClass("ibox-content");
          // $("#loader5").removeClass("sk-loading");
          // $("#spin5").addClass("d-none");

          vendor_modal.destroy();
          $("#vendor_table_body").empty();

          let records = data.fs_DATABROWSE_F0101.data.gridData.summary.records;

          console.log(records);

            
          data.fs_DATABROWSE_F0101.data.gridData.rowset.map((value)=>{

            console.log(value);

            $("#vendor_table_body").append(`<tr><td>${value.F0101_AN8}</td><td>${value.F0101_ALPH}</td></tr>`)


          })

          $("#loader_vendor").removeClass("ibox-content")
          $("#loader_vendor").removeClass("sk-loading")
          $("#spin_vendor").addClass("d-none")
          
          
          
        },
        error : function(xhr)
        {
          $("#loader_vendor").removeClass("ibox-content")
          $("#loader_vendor").removeClass("sk-loading")
          $("#spin_vendor").addClass("d-none")
          console.log(xhr);
        },
        complete : ()=>{

          vendor_modal = $("#vendor_table_modal").DataTable({
            language: {
              paginate: {
                previous:
                  '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                next: '<span class="next-icon"><i class="fa fa-angle-right"></i></span>',
              },
            },
            dom: '<"top">ft<"bottom"ip>',
            ordering: true,
            lengthMenu: [5, 10, 20, 25, 50],
            pagingType: "simple_numbers",
            select: true,
          });

        }


      })

    }
    else{
      swal("", "Please Enter Vendor Code Or Vendor Name", "warning");
    }

    })



let count;

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
      dom: '<"top">ft<"bottom"ip>',
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
  

  // $("#po_no_selected").val($("#po_number").val())
  // $("#po_type_search").val($("#po_type").val())


  
  
  // $("#vendor_name_modal").val($("#vendorname").val())
  // $("#vendor_code_modal").val($("#vendor_code").val())
  
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

      console.log("po value : ",po_no_value);
      console.log(" type : ",po_type_search);
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

  let next;

  if($("#Transaction").val() == "ST/OT")
  {
    next = 279
  }
  else{
    next = 400
  }


  if($("#deliveryChallanNumber").val() != "")
  {
      dynamic_url = `${[login[0].url]}/jderest/v2/dataservice/table/F56UD911?$field=F56UD911.DOCO&$field=F56UD911.YCHL&$field=F56UD911.MATH01&$field=F56UD911.A1CC&$field=F56UD911.DCTO&$field=F56UD911.KCOO&$field=F56UD911.DSC1&$filter=F56UD911.FLAG EQ P&$filter=F56UD911.QBAL GT 0&$field=F56UD911.LITM&%24filter=F56UD911.AN8%20EQ%20${po_vendor_code}${dc_number}${po_no_value}${po_type_search}`
      console.log(dynamic_url);
  }
  else{
    dynamic_url =`${[login[0].url]}/jderest/v2/dataservice/table/F4311?%24field=F4311.DOCO&%24field=F4311.KCOO&$field=F4311.UOPN&%24field=F4311.DCTO&%24field=F4311.AN8&%24field=F4311.DSC1&%24field=F4311.PRRC&%24field=F4311.LITM&%24filter=F4311.NXTR%20GE%20${next}&%24filter=F4311.LTTR%20NE%20980&%24filter=F4311.AOPN%20NE%200&%24filter=F4311.MCU EQ 20100&%24filter=F4311.AN8%20EQ%20${po_vendor_code}${po_no_value}${po_type_search}`
  }

  console.log("next : ",next);
  
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

          $("#po_table_body").append(`<tr><td>${value.F4311_DOCO}</td><td>${value.F4311_DCTO}</td><td>${value.F4311_KCOO}</td><td>${value.F4311_LITM}</td><td>${value.F4311_DSC1}</td><td>${value.F4311_PRRC}</td><td>${value.F4311_UOPN}</td></tr>`)

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
        language: {
        'paginate': {
        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
        }
        },
        dom: '<"top">ft<"bottom"ip>',
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





            var vendor_select , vendor_row , po_select , po_row
            

              $("#vendor_table_body").on("click", "tr", function () {

                vendor_select = vendor_modal.row(this).data();
                vendor_row = $(this)[0];

              });

              function search_vendor(vendor_select) {
                $("#vendor_code").val(vendor_select[0]);
                $("#vendorname").val(vendor_select[1]);
                
                console.log(vendor_select);

                $(vendor_row).removeClass("selected");
                
              }

              $("#Vendor_selected_modal").click(()=>{

                  search_vendor(vendor_select)
              })
              
              
              $("#po_table_body").on("click", "tr", function () {
                po_select = po_table.row(this).data();
                po_row = $(this)[0];

              });

              function search_po(po_select) {
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



              for(let i = 0 ; i < $(".item_code").length ; i++)
              {
                 let item_values  = $(".item_code")[i].value

                $("#item_code_search").append(`<option value="${item_values}">${item_values}</option>`)

              }

              $("#po_no_selected").on("keyup", function (event) {

                if($("#po_no_selected").val().length == 0)
                {
                  $("#po_type_search").val("")
                }
                // if (event.keyCode === 13) {
                //   $("#po_table").DataTable().column(0).search(
                //     $("#po_no_selected").val()
                // ).draw();
              });




              let dc_fetch;
              let dc_data;
              let dc_row;


              $("#dc_fetch").click(()=>{


                if($("#vendor_code").val() != "")
                {
                dc_fetch = $("#DC_table").DataTable({
                  language: {
                  'paginate': {
                  'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                  'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                  }
                  },
                  dom: '<"top">ft<"bottom"ip>',
                  ordering: true,
                  lengthMenu : [5,10,20,25,50],
                  pagingType: "simple_numbers",
                  select: true,
              });

               $("#dc_number_selected").val($("#deliveryChallanNumber").val())
            
                // $("#po_no_selected").val("");
              //   $("#po_no_search_modal").trigger("click")
              //   $("#po_no_selected").val($("#po_number").val())
              // $("#po_type_search").val($("#po_type").val())
              
              $("#dc_info_modal_table").trigger("click");
              $("#dc_search_modal").trigger("click");

              count = 0;
              // $("#vendor_name_modal").val($("#vendorname").val())
              // $("#vendor_code_modal").val($("#vendor_code").val())
              // $("#po_no_selected_search").trigger("click")
            
            
            }
            else{
              swal("", "Please Select Vendor Code", "warning");
            }
            
            })




              $("#dc_search_modal").click(()=>{

                $("#loader9").addClass("ibox-content")
                $("#loader9").addClass("sk-loading")
                $("#spin9").removeClass("d-none")
               
                

                let dc_number_value = $("#dc_number_selected").val() != "" ? `&$filter=F56UD911.YCHL EQ ${$("#dc_number_selected").val()}` : "";

                console.log(`${[login[0].url]}/jderest/v2/dataservice/table/F56UD911?$field=F56UD911.DOCO&$field=F56UD911.YCHL&$field=F56UD911.MCU0&$field=F56UD911.DCTO&$field=F56UD911.AN8&$field=F56UD911.KCOO&$filter=F56UD911.AN8 EQ ${$("#vendor_code").val()}${dc_number_value}`);

                $.ajax({
                  "url": `${[login[0].url]}/jderest/v2/dataservice/table/F56UD911?$field=F56UD911.DOCO&$field=F56UD911.YCHL&$field=F56UD911.MATH01&$field=F56UD911.A1CC&$field=F56UD911.MCU0&$field=F56UD911.DCTO&$field=F56UD911.AN8&$field=F56UD911.KCOO&$filter=F56UD911.FLAG EQ P&$filter=F56UD911.MCU0 EQ 20100&$filter=F56UD911.QBAL GT 0&$filter=F56UD911.AN8 EQ ${$("#vendor_code").val()}${dc_number_value}`,
                  headers: {
                    Authorization: "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                  },
                  success : function(data , status , xhr)
                  {
              
              
                    dc_fetch.destroy();
                    $("#DC_table_body").empty();
              
                    // let incoming_value  = data.fs_DATABROWSE_F4311.data.gridData.rowset;
              
                   
              
                      data.fs_DATABROWSE_F56UD911.data.gridData.rowset.map((value)=>{
              
                        $("#DC_table_body").append(`<tr><td>${value.F56UD911_AN8}</td><td>${value.F56UD911_YCHL}</td><td>${value.F56UD911_DOCO}</td><td>${value.F56UD911_DCTO}</td><td>${value.F56UD911_MATH01}</td><td>${value.F56UD911_A1CC}</td><td>${value.F56UD911_MCU0}</td></tr>`)
              
                        })
              
                    
              
                      $("#loader9").removeClass("ibox-content")
                      $("#loader9").removeClass("sk-loading")
                      $("#spin9").addClass("d-none")
              
                  },
                  error : function(xhr){
              
                    $("#loader9").removeClass("ibox-content")
                      $("#loader9").removeClass("sk-loading")
                      $("#spin9").addClass("d-none")
              
                  },
                  complete : function(xhr, status)
                  {
              
                    dc_fetch = $("#DC_table").DataTable({
                      language: {
                      'paginate': {
                      'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                      'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                      }
                      },
                      dom: '<"top">ft<"bottom"ip>',
                      ordering: true,
                      lengthMenu : [5,10,20,25,50],
                      pagingType: "simple_numbers",
                      select: true,
                  });

                  }
              
                })
              
                
              })


             
              $("#DC_table_body").on("click", "tr", function () {
                dc_data = dc_fetch.row(this).data();
                dc_row = $(this)[0];

              });

              function search_dc(dc_select) {
                // $("#po_number").val(po_select[1]);
                // $("#po_type").val(po_select[1]);

                let dc_obj = {
                  business_unit : `${dc_select[6]}`,
                  consignment_number : `${dc_select[1]}`
                }

                console.log("dc_obj : ", dc_obj);

                setTimeout(() => {
                  $("#dc_info_modal").trigger("click")
                  $("#loaderdc").addClass("ibox-content")
                  $("#loaderdc").addClass("sk-loading")
                  $("#spindc").removeClass("d-none")
                },500 );


                $.ajax({
                  url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_GetDcInfo`,
                  type : "POST",
                  data : JSON.stringify(dc_obj),
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json',
                    Authorization: "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                  },
                  success : function(data , status , xhr)
                  {

                        console.log("dcinfo : ", data);

                              for(let j = 0 ; j < $(".response").length ; j++)
                              {
                                        let key = $(".response")[j].getAttribute("id")

                                        console.log(data[`${key}`]);
                                
                                  $(".response")[j].value = data[`${key}`]
                                

                              }

                              $("#dc_transaction_number").val(dc_select[1])
                              $("#workOrderNumber").val(dc_select[2])
                              object_put.division = dc_select[3]

                              $("#loaderdc").removeClass("ibox-content")
                              $("#loaderdc").removeClass("sk-loading")
                              $("#spindc").addClass("d-none")

                        

                  },
                  error : (xhr)=>{
                    $.errorMessage(xhr.responseJSON.message)
                    console.log("🚀 ~ file: exceptionHandle.js:1498 ~ search_dc ~ xhr:", xhr);
                  }
                })

                $(dc_row).removeClass("selected");
                // $("#preview_img").removeClass("invisible");


              }

              $("#DC_value_selected").click(()=>{


                search_dc(dc_data)

              })


              $("#selected_items").click(()=>{
                
                $("#deliveryChallanNumber").val($("#dc_number_selected").val())
                $("#po_number").val($("#dc_po_number").val())
                $("#po_type").val($("#dc_po_type").val())
              })






    // let items_matched = [];
    let objValue;
    
    
    
    $("#submit_error").click((e) => {
      e.preventDefault();
      // var code = 200;
      // var to_email = [];
      let weight = $("#weight").val()

      if(weight > total_Line_item_weight )
        {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
          
          swalWithBootstrapButtons.fire({
            title: "Error Message",
            text: `Greater Than Actual Quantity`,
            icon: "warning",
            confirmButtonText: "OK",
            reverseButtons: true,
          });
          var inputElement = document.getElementById('weight');
          inputElement.style.border = '1px solid red';
          return;
          }
          else{
            var inputElement = document.getElementById('weight');
            inputElement.style.border = '';
            
          }
      
      let dynamic_table_item;
      
      let shouldbreak = true
      objValue = 0;




     


      for(let i = 0 ; i < $("#tab_logic_body tr").length ; i++)
      {

        details[i].item_code = $(".item_code")[i].value
        details[i].hsn_code = $(".hsn_code")[i].value
        details[i].uom = $(".uom")[i].value
        details[i].quantity = $(".quantity")[i].value
        details[i].unit_amount = $(".unit_amount")[i].value
        details[i].amount = $(".amount")[i].value

      }



    // $.ajax({
    //   url: `${[test[0].url]}/notificationgroup/findByGroupName?storeId=` + $("#storeId").val(),
    //   headers: {
    //     'Authorization': 'Bearer ' + token,
    //   },
    //   success: function (data, status, xhr) {
    //     console.log(data.data);

    //     data.data.map((value)=>{
    //       to_email.push(value.email)
    //     })

       

    //     if(xhr.status == 200)
    //     {
    //       $.sendEmail(data.data[0], "Unloading");
    //     }
    //     else{
    //       $.errorMessage(xhr.responseJSON.message)
    //     }

        
    //   },
    //   error: function (xhr) {
    //     if (xhr.status == 498) {
    //       $.tokenError();
    //     }
    //     else if(xhr.status >= 400 && xhr.status < 500){

    //           $.errorMessage(xhr.responseJSON.message);
    //     }
    //     else{
    //           $.errorMessage(xhr.responseJSON.error)
    //     }
    //   }
    // });

    
  
  

                            let vendor_code = $("#vendor_code").val();

                            for (let i = 0; i < $(".tagss").length ; i++) {
                              tags.push({ id: $(".tagss")[i].attributes[1].value });
                            }

                            if($("textarea").val().length != 0)
                            {


                              $("#loader5").addClass("ibox-content")
                              $("#loader5").addClass("sk-loading")
                              $("#spin5").removeClass("d-none")

                              $("#loader_rem").addClass("ibox-content");
                              $("#loader_rem").addClass("sk-loading");
                              $("#spin_rem").removeClass("d-none");


                              let check_submit_values = 0;
                              let check_submit_array = []


                              for(let i = 0 ; i < $(".check_submit").length ; i++)
                                {
                                  let check = $(".check_submit")[i];
                                  if($(".check_submit")[i].value != "" && $(".check_submit")[i].value != "null")
                                    {
                                      check_submit_values++
                                    }
                                    else{
                                      check_submit_array.push($(check).attr("id"))
                                    }

                                }


                                if(check_submit_values == $(".check_submit").length)
                                  {
                                    
                                  }
                                  else{

                                    console.log('error values ---->' , check_submit_array);

                                    $.errorMessage(`Please Remap The Fields\n\n ${check_submit_array.join(" , ").toLocaleUpperCase()}`)
                                    $("#loader5").removeClass("ibox-content")
                                    $("#loader5").removeClass("sk-loading")
                                    $("#spin5").addClass("d-none")
                                    $("#loader_rem").removeClass("ibox-content");
                                    $("#loader_rem").removeClass("sk-loading");
                                    $("#spin_rem").addClass("d-none");
                                    return;
                                  }

                                  window.scrollTo({
                                    top:  70,
                                    behavior: 'smooth'
                                  });


                                  const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                      icon: 'my-swal-icon',
                                      confirmButton: "btn btn-sm btn-success mx-1",
                                      cancelButton: "btn btn-sm btn-info mx-1",
                                      denyButton : "btn btn-sm btn-danger mx-1",
                                    },
                                    buttonsStyling: false,
                                  });
                              
                                  swalWithBootstrapButtons
                                    .fire({
                                      position: "top",
                                      // title: "Please Re-Check The Below Details",
                                      html: `<b>Re-Check The Below Details<br>Invoice Number :- ${$("#invoice_number").val()}<br>Invoice Date :- ${$("#invoice_date").val()}</b>`,
                                      // text: `Invoice Number :- ${$("#invoice_number").val()}\n\nInvoice Date :- ${$("#invoice_date").val()}`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      showDenyButton: true,
                                      confirmButtonText: "OK",
                                      cancelButtonText: "Re-Map",
                                      denyButtonText: "Back",
                                      // reverseButtons: true,
                                    })
                                    .then((result) => {
                                      if (result.isConfirmed) {

                                        let today = new Date();
                                        let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                        let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

                                        // console.log(date +"  "+time );

                                        $.ajax({
                                            url : `${[test[0].url]}/remark/add`,
                                            type : 'POST',
                                            data : JSON.stringify({

                                                gate_number: $("#gate_number").html(),
                                                remark : "INVOICE NUMNER AND INVOICE DATE CHECKED FOUND OK",
                                                status  : 1000,
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
                                              console.log("remarks data :" ,data);
                                            }
                                          })
                                                
                                      

                                
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
          
                                          $.errorMessage(`Duplicate Supplier Invoice`)
          
                                          $("#loader5").removeClass("ibox-content")
                                          $("#loader5").removeClass("sk-loading")
                                          $("#spin5").addClass("d-none")
          
                                          $("#loader_rem").removeClass("ibox-content");
                                          $("#loader_rem").removeClass("sk-loading");
                                          $("#spin_rem").addClass("d-none");
          
                                          
          
                                          // console.log(date +"  "+time );
                                            
                                        }
                                        else{

                                      



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




                                      
                                        
                                        
                                      


                                        var record = data.fs_DATABROWSE_F0101.data.gridData.summary.records;
                                        try {
                                          Supplier_name =
                                            data.fs_DATABROWSE_F0101.data.gridData.rowset[0].F0101_ALPH;
                                        } catch (error) {
                                          console.log(error);
                                        }
                                        

                                        if($("#po_number").val() != "" && $("#po_type").val() != "" &&  ($("#deliveryChallanNumber").val() != "" ? $("#dc_number_type").val() != "" : true))
                                        {

                                          object_put.dc_type = $("#dc_number_type").val()


                                          $.ajax({
                                            url : `${[test[0].url]}/validateDate?date=${$("#invoice_date").val().split("-").reverse().join("-").replace(/ /g,'')}`,
                                            headers: {
                                              'Authorization': 'Bearer ' + token,
                                            },
                                            success : function(data,status,xhr)
                                            {

                                              if(xhr.status == 200)
                                              {
                                                console.log("date format");
                                                
                                                if(data.result)
                                                {

                                                  console.log('invoice validated date  ---->' ,data.invoice_date);

                                                  object_put.invoice_date = data.invoice_date;



                                              if (record == 1) {

                                                if($("#Transaction").val() != "Service_PO" && $("#Transaction").val() != "Credit_Note" && $("#Transaction").val() != "Debit_Note" && $("#Transaction").val() != "ServiceWithMaterial")
                                                {


                                                let next;

                                                if($("#Transaction").val() == "ST/OT")
                                                {
                                                  next  = 279
                                                }
                                                else if($("#deliveryChallanNumber").val() != "")
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
                                                      amount: $("#taxable_value").val().split(",").join("").replace(/ /g,''),
                                                      date_today: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").reverse().join("-"),
                                                      next_status : next
                                                    };

                                                    console.log("req : ", JSON.stringify(req));

                                                    $.ajax({
                                                      url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_PO_VALIDATE`,
                                                      type: "POST",
                                                      data: JSON.stringify(req),
                                                      headers: {
                                                        "Content-Type": "application/json",
                                                        Accept: "application/json",
                                                        Authorization:
                                                          "Basic " +
                                                          btoa(`${login[0].username}` + ":" + `${[login[0].password]}`),
                                                      },
                                                      success: function (data, status, xhr) {
                                                        if (data.status) {

                                                        console.log("company code :", data);



                                                        let company_code_line = data.data.order_company

                                                      

                                                        if(object_put.transactionType != "Handwritten_Bill" &&  object.details.length != 0)
                                                        {

                                                          console.log("right");





                                                        for(let i = 0 ;  i < $(".item_code").length && shouldbreak; i ++)
                                                        {

                                                          if($(".unit_amount")[i].value == "null" || $(".unit_amount")[i].value == "")
                                                            {
                                                              console.log('please remap unit rate  ---->' ,$(".unit_amount")[i].value);
            
                                                              $.errorMessage("PLease Remap The Unit Rate")
            
                                                              $("#loader5").addClass("ibox-content")
                                                              $("#loader5").addClass("sk-loading")
                                                              $("#spin5").removeClass("d-none")

                                                              $("#loader_rem").addClass("ibox-content");
                                                              $("#loader_rem").addClass("sk-loading");
                                                              $("#spin_rem").removeClass("d-none");
                                            
                                                              return;
                                                            }

                                                            if(details[i].jdeItemCode != null  && ($(".item_code")[i].value == "null" || $(".item_code")[i].value == ""))
                                                              {
                                                                console.log('please remap unit rate  ---->' ,$(".item_code")[i].value);
              
                                                                $.errorMessage("PLease Remap The Item Code")
              
                                                                $("#loader5").addClass("ibox-content")
                                                                $("#loader5").addClass("sk-loading")
                                                                $("#spin5").removeClass("d-none")

                                                                $("#loader_rem").addClass("ibox-content");
                                                                $("#loader_rem").addClass("sk-loading");
                                                                $("#spin_rem").removeClass("d-none");
              
                                                                return;
                                                              }

                                                          let item = details[i].jdeItemCode != null ? details[i].jdeItemCode : $(".item_code")[i].value;
                                                          let line_amount = $(".unit_amount")[i].value;
                                                          let lineNumber = details[i].lineNumber != null ? `&$filter=F4311.LNID EQ ${details[i].lineNumber}` : ""

                                                          console.log("item " , item);

                                                          console.log(`${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$field=F4311.LNID${lineNumber}&$field=F4311.DSC1&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ 00201&$field=F4311.PRRC&%24field=F4311.LITM`);


                                                          $.ajax({
                                                            url : `${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$filter=F4311.UOPN GE 1&$field=F4311.LNID${lineNumber}&$field=F4311.DSC1&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ 00201&$field=F4311.PRRC&%24field=F4311.LITM`,
                                                            headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                                                            },
                                                            async : false, 
                                                            success: function (data) {

                                                              console.log("F4311" , data);

                                                              let dynamic_tables = data.fs_DATABROWSE_F4311.data.gridData.summary.records

                                                              if(dynamic_tables > 0)
                                                              {
                                                                let match_cost = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_PRRC;
                                                                // data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_PRRC;

                                                                let rounded_jde = Math.round(match_cost * 100) / 100;
                                                                let rounded_invoice = Math.round(line_amount * 100) / 100;

                                                       

                                                                if($("#deliveryChallanNumber").val() == "" || $("#dc_number_type").val() != "Unprocessed" )
                                                                {

                                                                    if(Math.abs(rounded_jde - rounded_invoice) <= unit_rate_tolerance)
                                                                      {

                                                                        details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM
                                                                        details[i].description1 = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_DSC1
                                                                        details[i].lineNumber = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LNID
                                                                        // items_matched.push(data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM)
                                                  
                                                                        if(i == $(".item_code").length -1)
                                                                        {

                                                                          success(details);
                                                                          // localStorage.setItem("item_code_match" , JSON.stringify(items_matched))
                                                                        }
                                                  
                                                                      }
                                                                      else{

                                                                        // console.log("1");

                                                                        $.errorMessage(`${item} - ${line_amount}- Item Rate Not Matched`);

                                                                        $("#loader5").removeClass("ibox-content")
                                                                        $("#loader5").removeClass("sk-loading")
                                                                        $("#spin5").addClass("d-none")
                                                                        $("#loader_rem").removeClass("ibox-content");
                                                                        $("#loader_rem").removeClass("sk-loading");
                                                                        $("#spin_rem").addClass("d-none");

                                                                        shouldbreak = false;
                                                                        // object_put.error_message = `Cross Refrence Item Not Found`
                                                                        // object_put.status = {code  : 1000}

                                                                        // delete object.details
                                                                        // delete object.tags


                                                                        // errorStatus(object_put)
                                                                      }
                                                                    }
                                                                    else{
                                                                      details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM
                                                                      details[i].description1 = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_DSC1
                                                                      details[i].lineNumber = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LNID

                                                                      success(details);
                                                                    }
                                                                
                                                              }
                                                              else{

                                                              let dynamic_item_refrence_table = login[0].url == `http://103.65.20.159:8081` ? `${[login[0].url]}/jderest/v2/dataservice/table/F4104?$field=F4104.AN8&$field=F4104.LITM&$field=F4104.DSC1&$filter=F4104.AN8 EQ ${$("#vendor_code").val()}&$filter=F4104.DSC1 EQ ${item}` :   `${[login[0].url]}/jderest/v2/dataservice/table/F56IN115?$field=F56IN115.AN8&$field=F56IN115.LITM&$filter=F56IN115.AN8 EQ ${$("#vendor_code").val()}&$filter=F56IN115.D200 EQ ${item}`

                                                                console.log(`${[login[0].url]}/jderest/v2/dataservice/table/F56IN115?$field=F56IN115.AN8&$field=F56IN115.LITM&$filter=F56IN115.AN8 EQ ${$("#vendor_code").val()}&$filter=F56IN115.D200 EQ ${item}`);
                                                                $.ajax({
                                                                  url : dynamic_item_refrence_table,
                                                                  type: "GET",
                                                                  async : false,
                                                                  headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                                                                  },
                                                                  success: function (data) {
                                                                    console.log(data);
                                                  
                                                                    let dynamic_databrowse_table = login[0].url == `http://103.65.20.159:8081` ?  data.fs_DATABROWSE_F4104.data.gridData.summary.records : data.fs_DATABROWSE_F56IN115.data.gridData.summary.records ; 
                                                  
                                                                    if(dynamic_databrowse_table > 0)
                                                                    {


                                                                      dynamic_table_item = login[0].url == `http://103.65.20.159:8081` ? data.fs_DATABROWSE_F4104.data.gridData.rowset[0].F4104_LITM : data.fs_DATABROWSE_F56IN115.data.gridData.rowset[0].F56IN115_LITM ;



                                                                      $.ajax({
                                                                        url : `${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$filter=F4311.UOPN GE 1&$field=F4311.DSC1&$field=F4311.LNID${lineNumber}&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${dynamic_table_item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ 00201&$field=F4311.PRRC`,
                                                                        headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                                                                        },
                                                                        async : false,
                                                                        success: function (data,status,xhr) {
                                                                          console.log(data);
                                                                          console.log(`${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$field=F4311.LNID${lineNumber}&$field=F4311.DSC1&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${dynamic_table_item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ 00201&$field=F4311.PRRC`);
                                                        
                                                        
                                                                          if(data.fs_DATABROWSE_F4311.data.gridData.summary.records > 0)
                                                                          {

                                                                            // console.log("if -1");
                                                                            
                                                                            let table_unit_cost = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_PRRC;

                                                                            let rounded_jde = Math.round(table_unit_cost * 100) / 100;
                                                                            let rounded_invoice = Math.round(line_amount * 100) / 100;


                                                                        if($("#deliveryChallanNumber").val() == "" || $("#dc_number_type").val() != "Unprocessed" )
                                                                        {

                                                                            if(Math.abs(rounded_jde - rounded_invoice) <= unit_rate_tolerance)
                                                                            {

                                                                              // console.log("if-2");

                                                                              details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM
                                                                              details[i].description1 = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_DSC1
                                                                              details[i].lineNumber = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LNID


                                                                              if(i == $(".item_code").length -1)
                                                                              {
                                                                                // console.log("if-3");
                                                                                    success(details);
                                                                                    // localStorage.setItem("item_code_match" , JSON.stringify(items_matched))
                                                                              }

                                                                            }
                                                                            else{

                                                                              // console.log("1");

                                                                              $.errorMessage(`${dynamic_table_item} - Item Rate Not Matched`);

                                                                              $("#loader5").removeClass("ibox-content")
                                                                              $("#loader5").removeClass("sk-loading")
                                                                              $("#spin5").addClass("d-none")

                                                                              $("#loader_rem").removeClass("ibox-content");
                                                                              $("#loader_rem").removeClass("sk-loading");
                                                                              $("#spin_rem").addClass("d-none");

                                                                              shouldbreak = false;
                                                                              // object_put.error_message = `Cross Refrence Item Not Found`
                                                                              // object_put.status = {code  : 1000}

                                                                              // delete object.details
                                                                              // delete object.tags

                                                
                                                                              // errorStatus(object_put)
                                                                            }

                                                                          }
                                                                          else{

                                                                            details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM
                                                                            details[i].description1 = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_DSC1
                                                                            details[i].lineNumber = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LNID
      
                                                                            success(details);
                                                                          }

                                                                            
                                                                          }
                                                                          else{

                                                                            // console.log("2");
                                                                            $.errorMessage(`${dynamic_table_item} - PO Line Item Not Found`);
                                                                            $("#loader5").removeClass("ibox-content")
                                                                            $("#loader5").removeClass("sk-loading")
                                                                            $("#spin5").addClass("d-none")

                                                                            $("#loader_rem").removeClass("ibox-content");
                                                                            $("#loader_rem").removeClass("sk-loading");
                                                                            $("#spin_rem").addClass("d-none");

                                                                            shouldbreak = false;

                                                                            

                                                                            //  object_put.error_message = `Cross Refrence Item Not Found`
                                                                            // object_put.status = {code  : 1000}

                                                                            // delete object.details
                                                                            //   delete object.tags

                                                                            // errorStatus(object_put)
                                                                          }
                                                                        },
                                                                        error : function(xhr)
                                                                        {

                                                                          $.errorMessage(xhr.responseJSON.message)

                                                                          $("#loader5").removeClass("ibox-content")
                                                                          $("#loader5").removeClass("sk-loading")
                                                                          $("#spin5").addClass("d-none")

                                                                          $("#loader_rem").removeClass("ibox-content");
                                                                          $("#loader_rem").removeClass("sk-loading");
                                                                          $("#spin_rem").addClass("d-none");

                                                                          // $.errorMessage("Cross Refrence Item Not Found")

                                                                          //  object_put.error_message = `Cross Refrence Item Not Found`
                                                                          // object_put.status = {code  : 1000}

                                                                          // errorStatus(object_put)
                                                                        }
                                                                      })



                                                                    }
                                                                    else{
                                                  
                                                                      map(`${item} - ${line_amount} - Cross Refrence Item Not Found` , item)

                                                                      $("#loader5").removeClass("ibox-content")
                                                                      $("#loader5").removeClass("sk-loading")
                                                                      $("#spin5").addClass("d-none")

                                                                      $("#loader_rem").removeClass("ibox-content");
                                                                      $("#loader_rem").removeClass("sk-loading");
                                                                      $("#spin_rem").addClass("d-none");

                                                                      shouldbreak = false;
                                                  
                                                  
                                                                    }
                                                                  },
                                                                  error : function(xhr)
                                                                  {
                                                                    console.log(xhr);
                                                                    try {
                                                                      $.errorMessage(xhr.responseJSON.errorDetails.errors)
                                                                      
                                                                    } catch (error) {
                                                                      
                                                                      $.errorMessage(xhr.responseJSON.sysErrors[0].TITLE)
                                                                    }

                                                                    $("#loader5").removeClass("ibox-content")
                                                                    $("#loader5").removeClass("sk-loading")
                                                                    $("#spin5").addClass("d-none")

                                                                    $("#loader_rem").removeClass("ibox-content");
                                                                    $("#loader_rem").removeClass("sk-loading");
                                                                    $("#spin_rem").addClass("d-none");
                                                                  }
                                                                })

                                                              }


                                                            },
                                                            error : function(xhr)
                                                            {
                                                              // $.errorMessage("Cross Refrence Item Not Found")

                                                              $("#loader5").removeClass("ibox-content")
                                                              $("#loader5").removeClass("sk-loading")
                                                              $("#spin5").addClass("d-none")

                                                              $("#loader_rem").removeClass("ibox-content");
                                                              $("#loader_rem").removeClass("sk-loading");
                                                              $("#spin_rem").addClass("d-none");

                                                              console.log(xhr);

                                                            }


                                                          })

                                                          
                                                          objValue++

                                                          console.log(objValue);


                                                          


                                                          


                                                        }
                                                        
                                                        }
                                                      else{

                                                        if(object.details.length == 0 && $("#Transaction").val() != "Service_PO" || $("#Transaction").val() != "Credit_Note" || $("#Transaction").val() != "Debit_Note" || $("#Transaction").val() != "ServiceWithMaterial"){

                                                          swal("", "Please Remap the details ... details can't be null", "error").then(() => {
                                                            $("#loader").removeClass("ibox-content");
                                                            $("#loader").removeClass("sk-loading");
                                                            $("#spin1").addClass("d-none");
                                                            $("#loader5").removeClass("ibox-content")
                                                            $("#loader5").removeClass("sk-loading")
                                                            $("#spin5").addClass("d-none")

                                                            $("#loader_rem").removeClass("ibox-content");
                                                            $("#loader_rem").removeClass("sk-loading");
                                                            $("#spin_rem").addClass("d-none");
                                                            $("#save").html("SAVE");
                                                          });

                                                        }
                                                        else{
                                                          success(details);
                                                        }


                                                          }

                                                        


                                                        } else {

                                                          console.log(data);
                                                          swal("", data.message, "error").then(() => {
                                                            $("#loader").removeClass("ibox-content");
                                                            $("#loader").removeClass("sk-loading");
                                                            $("#spin1").addClass("d-none");
                                                            $("#loader5").removeClass("ibox-content")
                                                            $("#loader5").removeClass("sk-loading")
                                                            $("#spin5").addClass("d-none")

                                                            $("#loader_rem").removeClass("ibox-content");
                                                            $("#loader_rem").removeClass("sk-loading");
                                                            $("#spin_rem").addClass("d-none");
                                                            $("#save").html("SAVE");
                                                          });
                                                        }
                                                      },
                                                      error: function (xhr) {
                                                        console.log("PO  VALIDATE :" ,  xhr);

                                                        try {
                                                          swal("", xhr.responseJSON.message, "error").then(() => {
                                                            $("#loader").removeClass("ibox-content");
                                                            $("#loader").removeClass("sk-loading");
                                                            $("#spin1").addClass("d-none");
                                                            $("#loader5").removeClass("ibox-content")
                                                            $("#loader5").removeClass("sk-loading")
                                                            $("#spin5").addClass("d-none")

                                                            $("#loader_rem").removeClass("ibox-content");
                                                            $("#loader_rem").removeClass("sk-loading");
                                                            $("#spin_rem").addClass("d-none");
                                                            $("#save").html("SAVE");
                                                          });
                                                        } catch (error) {
                                                          swal("", xhr.responseJSON.message.DREQ_AP_PO_Header.Message, "error").then(() => {
                                                            $("#loader").removeClass("ibox-content");
                                                            $("#loader").removeClass("sk-loading");
                                                            $("#spin1").addClass("d-none");
                                                            $("#loader5").removeClass("ibox-content")
                                                            $("#loader5").removeClass("sk-loading")
                                                            $("#spin5").addClass("d-none")

                                                            $("#loader_rem").removeClass("ibox-content");
                                                            $("#loader_rem").removeClass("sk-loading");
                                                            $("#spin_rem").addClass("d-none");
                                                            $("#save").html("SAVE");
                                                          });
                                                        }
                                                      },
                                                    });

                                                  }

                                                  else{

                                                    success(details)
        
                                                  }


                                                  } else {
                                                    swal("", "Vendor Not Present in JDE", "error").then(() => {
                                                      $("#loader").removeClass("ibox-content");
                                                      $("#loader").removeClass("sk-loading");
                                                      $("#spin1").addClass("d-none");
                                                      $("#loader5").removeClass("ibox-content")
                                                      $("#loader5").removeClass("sk-loading")
                                                      $("#spin5").addClass("d-none")

                                                      $("#loader_rem").removeClass("ibox-content");
                                                      $("#loader_rem").removeClass("sk-loading");
                                                      $("#spin_rem").addClass("d-none");
                                                      $("#save").html("SAVE");
                                                    });
                                                  }


                                            
                                  }
                                  else{
                                    $.errorMessage(data.message)
                                    $("#loader").removeClass("ibox-content");
                                    $("#loader").removeClass("sk-loading");
                                    $("#spin1").addClass("d-none");
                                    $("#loader5").removeClass("ibox-content")
                                    $("#loader5").removeClass("sk-loading")
                                    $("#spin5").addClass("d-none")

                                    $("#loader_rem").removeClass("ibox-content");
                                    $("#loader_rem").removeClass("sk-loading");
                                    $("#spin_rem").addClass("d-none");
                                    $("#save").html("SAVE");
                                  }
                                }
                                else{

                                  console.log('xhr date ---->' ,xhr);

                                  $.errorMessage(xhr.responseJSON.message)
                                  $("#loader").removeClass("ibox-content");
                                  $("#loader").removeClass("sk-loading");
                                  $("#spin1").addClass("d-none");
                                  $("#loader5").removeClass("ibox-content")
                                  $("#loader5").removeClass("sk-loading")
                                  $("#spin5").addClass("d-none")

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
                                $("#loader5").removeClass("ibox-content")
                                $("#loader5").removeClass("sk-loading")
                                $("#spin5").addClass("d-none")

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

                            })
                                          
                                          

                                      }
                                      else{

                                        $("#loader5").removeClass("ibox-content")
                                        $("#loader5").removeClass("sk-loading")
                                        $("#spin5").addClass("d-none")

                                        $("#loader_rem").removeClass("ibox-content");
                                        $("#loader_rem").removeClass("sk-loading");
                                        $("#spin_rem").addClass("d-none");
                                        if($("#po_number").val() == "")
                                        {
                                          $.errorMessage("PO Number Field Is Empty")
                                        }
                                        else if($("#po_type").val() == ""){
                                          $.errorMessage("PO Type Field Is Empty")
                                        }
                                        else{
                                          $.errorMessage("Please Select DC Type")
                                        }
                                      }


                                      },
                                      error: function (xhr) {
                                        if(xhr.status > 500)
                                        {
                                          swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(() => {
                                            $("#loader").removeClass("ibox-content");
                                            $("#loader").removeClass("sk-loading");
                                            $("#spin1").addClass("d-none");
                                            $("#loader5").removeClass("ibox-content")
                                            $("#loader5").removeClass("sk-loading")
                                            $("#spin5").addClass("d-none")

                                            $("#loader_rem").removeClass("ibox-content");
                                            $("#loader_rem").removeClass("sk-loading");
                                            $("#spin_rem").addClass("d-none");
                                            $("#save").html("SAVE");
                                          });
                                        }
                                        else
                                        swal("", xhr.responseJSON.message, "error").then(() => {
                                          $("#loader").removeClass("ibox-content");
                                          $("#loader").removeClass("sk-loading");
                                          $("#spin1").addClass("d-none");
                                          $("#loader5").removeClass("ibox-content")
                                          $("#loader5").removeClass("sk-loading")
                                          $("#spin5").addClass("d-none")

                                          $("#loader_rem").removeClass("ibox-content");
                                          $("#loader_rem").removeClass("sk-loading");
                                          $("#spin_rem").addClass("d-none");
                                          $("#save").html("SAVE");
                                        });
                                        {

                                        }
                                      },
                                    });

                                          }
                                        }
                                    })


                                  }
                                  else if(result.isDismissed){

                                    $("#remap_data").trigger("click");
                                    
                                    $("#loader5").removeClass("ibox-content")
                                    $("#loader5").removeClass("sk-loading")
                                    $("#spin5").addClass("d-none")
                                    $("#loader_rem").removeClass("ibox-content");
                                    $("#loader_rem").removeClass("sk-loading");
                                    $("#spin_rem").addClass("d-none");
                                    }
                                  else {
                                    $("#loader5").removeClass("ibox-content")
                                    $("#loader5").removeClass("sk-loading")
                                    $("#spin5").addClass("d-none")
                                    $("#loader_rem").removeClass("ibox-content");
                                    $("#loader_rem").removeClass("sk-loading");
                                    $("#spin_rem").addClass("d-none");

                                    console.log('value of result  ---->' ,result);
                                 }
                               });

                                 
                            }
                            else{
                              $.errorMessage("Please Add Remark")
                            }


  });




  function success(details){


    console.log(details);

    let code;

    if($("#Transaction").val() == "Service_PO" || $("#Transaction").val() == "Credit_Note" || $("#Transaction").val() == "Debit_Note" || $("#Transaction").val() == "ServiceWithMaterial")
    {
      // transactionType = "SERVICE_PO"
      code = {code : 200}
    }
    else{

      let actual = object.details.reduce((value , values)=> value += values.actualRecievedQuantity ,0)

      if(actual > 0 && actual != null)
      {
        code = {code : 200}
      }
      else{
        code = {code : 150}
      }

      
      if($("#deliveryChallanNumber").val() != "")
      {
        transactionType = "Job_worK"
      }
      else{
        // transactionType = ""
      }

    }







              if($("#storeId").val() != null)
              {


                                let today = new Date();
                                let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

                                // console.log(date +"  "+time );

                                $.ajax({
                                    url : `${[test[0].url]}/remark/add`,
                                    type : 'POST',
                                    data : JSON.stringify({

                                        gate_number: $("#gate_number").html(),
                                        remark : $("textarea").val().toUpperCase(),
                                        status  : 1000,
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
                                      console.log("remarks data :" ,data);
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
                                          remark : "SUCCESSFULLY UPDATED FROM FLAW-FIX",
                                          status  : 1000,
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


                object_put.vehicle_nbr = $("#vehicle_nbr").val();
                object_put.vendorname = $("#vendorname").val();
                object_put.material_type = $("#material_type").val();
                object_put.weight = $("#weight").val();
                object_put.gate_number = $("#gate_number").html();
                object_put.po_number = $("#po_number").val();
                object_put.po_type = $("#po_type").val();
                object_put.vendor_code = $("#vendor_code").val();
                object_put.storeId = $("#storeId").val(),
                object_put.unitName = $("#unitname").val(),
                object_put.invoice_number = $("#invoice_number").val();
                object_put.invoice_date = $("#invoice_date").val().split("-").reverse().join("-");
                object_put.amount = $("#amount").val();
                object_put.workOrderNumber = $("#workOrderNumber").val();
                object_put.deliveryChallanNumber = $("#deliveryChallanNumber").val();
                object_put.transactionType = $("#Transaction").val()
                object_put.error_message = null;
                object_put.status = code;
                object_put.details = details;

                console.log(JSON.stringify(object_put));


                object_put.is_reserved = "N"
                console.log("object_data : ", object_put.is_reserved);
        
                
                        $.ajax({
                            url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object_put.gate_number}&username=${$(".name")[1].innerText}`,
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
                                    data: JSON.stringify(object_put),
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json",
                                      'Authorization': 'Bearer ' + token,
                                    },
                                    success: function (data, status, xhr) {
                                      // console.log(data);
                  
                                      if (xhr.status == 200) {
                                        // console.log(data.data);
                  
                                        if(object.transactionType == "SERVICE_PO" || object.transactionType == "Handwritten_Bill")
                                        {
                                          $.sendEmail(data.data, "Store",convertedFile);
                                        }
                                      else{
                                        $.sendEmail(data.data, "Unload",convertedFile);
                                      }

                                      let title_mes;

                                      if(object_put.status.code == 200)
                                      {
                                        title_mes = `${$("#gate_number").html()} Updated To Store`
                                      }
                                      else{
                                        
                                        title_mes = `${$("#gate_number").html()} Updated To Unload`
                                      }
                  
                  
                                        const swalWithBootstrapButtons = Swal.mixin({
                                          customClass: {
                                            confirmButton: "btn btn-success",
                                          },
                                          buttonsStyling: false,
                                        });
                    
                                        swalWithBootstrapButtons
                                          .fire({
                                            title: title_mes,
                                            icon: "success",
                                            confirmButtonText: "OK",
                                            reverseButtons: true,
                                          })
                                          .then((result) => {
                                            window.open("../template/exception.jsp", "_self");
                                          });
                  
                                      } else {
                  
                                        $.errorMessage(xhr.responseJSON.message);
                  
                                        $("#loader5").removeClass("ibox-content")
                                        $("#loader5").removeClass("sk-loading")
                                        $("#spin5").addClass("d-none")
                  
                                      }
                                    },
                                    
                                    error: function (xhr) {
                                      if(xhr.status == 498)
                                      {
                                          $.tokenError();
                                      }
                                      else if(xhr.status >= 400 && xhr.status < 500){
                  
                                        $.errorMessage(xhr.responseJSON.message);
                  
                                        $("#loader5").removeClass("ibox-content")
                                        $("#loader5").removeClass("sk-loading")
                                        $("#spin5").addClass("d-none")
                  
                                      }else{
                  
                                        $.errorMessage(xhr.responseJSON.message);
                  
                                        $("#loader5").removeClass("ibox-content")
                                        $("#loader5").removeClass("sk-loading")
                                        $("#spin5").addClass("d-none")
                      
                                      }
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

                swal("" , "Please Select Store Id " , "error").then(()=>{
                  $("#loader").removeClass("ibox-content");
                  $("#loader").removeClass("sk-loading");
                  $("#spin1").addClass("d-none");
                  $("#save").html("SAVE");
                })

              }
  }


  let po_table_map , po_select_map , po_row_map;


  function map(message , item ){

    swal({
      title: "",
      text: `${message}`,
      icon: "warning",
      buttons: {
        cancel: {
          text: "OK",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Map",
          value: true,
          visible: true,
          closeModal: true,
        }
      }
    }).then((value) => {
      if (value) {
        $("#Map_item").trigger("click")
        $("#map_items").html(`Map Item - ${item}`)
        $("#vendor_code_modal_map").val($("#vendor_code").val())
        $("#vendor_name_modal_map").val($("#vendorname").val())
        $("#po_no_selected_map").val($("#po_number").val())
        $("#po_type_search_map").val($("#po_type").val())

        $("#po_no_selected_search_map").trigger("click")

        

        po_table_map = $("#po_table_map").DataTable({
          language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
          }
          },
          dom: '<"top">ft<"bottom"ip>',
          ordering: true,
          lengthMenu : [5,10,20,25,50],
          pagingType: "simple_numbers",
          select: true,
      });

      $("#loader8").addClass("ibox-content")
      $("#loader8").addClass("sk-loading")
      $("#spin8").removeClass("d-none")

      po_no_selected_search_map()
        
      }
      else {
      }
    })

    // swal("" , `${message}` , "error").then(()=>{
    //   $("#Map_item").trigger("click")
    // })
  }


  $("#po_table_body_map").on("click", "tr", function () {
    po_select_map = po_table_map.row(this).data();
    console.log(po_select_map);
    po_row_map = $(this)[0];

  });

  function search_po_map(po_select_map) {

    // $("#po_type").val(po_select_map[1]);
    // $("#vendor_name").val(dataa[1]);
    
    // if (dataa) {
      //   $("#preview_img").removeClass("invisible");
      // }
      $(po_row).removeClass("selected");
      details[objValue - 1].lineNumber = po_select_map[6]
      details[objValue - 1].jdeItemCode =  po_select_map[3]
      details[objValue - 1].description1 = po_select_map[4]
    // $("#preview_img").removeClass("invisible");


  }

  $("#po_no_select_modal_map").click(()=>{

    search_po_map(po_select_map)

  })
  


  


  // $("#po_no_selected_search_map").click(()=>{
  function po_no_selected_search_map(){

        // $("#vendor_code_modal_map").val()
        // $("#po_no_selected_map").val()
        // $("#po_type_search_map").val()

        let po_no_value_map;
        let po_type_search_map;



        // if($("#deliveryChallanNumber").val() == "")
        // {

          // $(".d_map_number").addClass("invisible")
          // $("#dc_map_number").val("")

          po_no_value_map = `&%24filter=F4311.DOCO EQ ${$("#po_no_selected_map").val()}`;
          po_type_search_map = `&%24filter=F4311.DCTO EQ ${$("#po_type_search_map").val()}`;
          // dynamic_map_item = `${[login[0].url]}/jderest/v2/dataservice/table/F4311?%24field=F4311.DOCO&%24field=F4311.KCOO&%24field=F4311.DSC1&%24field=F4311.DCTO&%24field=F4311.AN8&%24field=F4311.LITM&%24filter=F4311.NXTR%20GE%20400&%24filter=F4311.CNDJ%20LE%2001011900&%24filter=F4311.LTTR%20NE%20980&%24filter=F4311.AOPN%20GE%201&%24filter=F4311.AN8%20EQ%20${$("#vendor_code_modal_map").val()}`

        // }
        // else{

        //   $(".d_map_number").removeClass("invisible")
        //   $("#dc_map_number").val($("#dc_number").val())

        //   dc_number = $("#dc_number").val() != "" ? `&%24filter=F56UD911.YCHL%20EQ%20${$("#dc_number").val()}` : "" ;  
        //   po_no_value_map = `&%24filter=F56UD911.DOCO EQ ${$("#po_no_selected_map").val()}`;
        //   po_type_search_map = `&%24filter=F56UD911.DCTO EQ ${$("#po_type_search_map").val()}`;
        //   dynamic_map_item = `${[login[0].url]}/jderest/v2/dataservice/table/F56UD911?$field=F56UD911.DOCO&$field=F56UD911.YCHL&$field=F56UD911.DCTO&$field=F56UD911.KCOO&$field=F56UD911.DSC1&$field=F56UD911.LITM&%24filter=F56UD911.AN8%20EQ%20${$("#vendor_code_modal_map").val()}${dc_number}`;
        // }

        let next;

        if($("#Transaction").val() == "ST/OT")
        {
          next = 279
        }
        else if($("#deliveryChallanNumber").val() != "")
        {
          next = 280
        }
        else{
          next = 400
        }


    $.ajax({
      "url": `${[login[0].url]}/jderest/v2/dataservice/table/F4311?%24field=F4311.DOCO&%24field=F4311.KCOO&%24field=F4311.DSC1&%24field=F4311.LNID&%24field=F4311.DCTO&%24field=F4311.AN8&%24field=F4311.LITM&%24field=F4311.PRRC&%24filter=F4311.NXTR%20GE%20${next}&%24filter=F4311.LTTR%20NE%20980&%24filter=F4311.AOPN%20NE%200&%24filter=F4311.AN8%20EQ%20${$("#vendor_code_modal_map").val()}${po_no_value_map}${po_type_search_map}`,
      headers: {
        Authorization: "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
      },
      success : function(data , status , xhr)
      {
  


  
        po_table_map.destroy();
        $("#po_table_body_map").empty();
  
        // let incoming_value  = data.fs_DATABROWSE_F4311.data.gridData.rowset;
  
          // data.fs_DATABROWSE_F4311.data.gridData.rowset.map((value)=>{
  
          //   $("#po_table_body_map").append(`<tr><td>${value.F4311_DOCO}</td><td>${value.F4311_DCTO}</td><td>${value.F4311_KCOO}</td><td>${value.F4311_LITM}</td><td>${value.F4311_DSC1}</td></tr>`)
  
          // })


          // if($("#deliveryChallanNumber").val() == "")
          // {
              data.fs_DATABROWSE_F4311.data.gridData.rowset.map((value)=>{

              $("#po_table_body_map").append(`<tr><td>${value.F4311_DOCO}</td><td>${value.F4311_DCTO}</td><td>${value.F4311_KCOO}</td><td>${value.F4311_LITM}</td><td>${value.F4311_DSC1}</td><td>${value.F4311_PRRC}</td><td>${value.F4311_LNID}</td></tr>`)

              })
          // }
          // else{

          //   data.fs_DATABROWSE_F56UD911.data.gridData.rowset.map((value)=>{

          //     $("#po_table_body_map").append(`<tr><td>${value.F56UD911_DOCO}</td><td>${value.F56UD911_DCTO}</td><td>${value.F56UD911_KCOO}</td><td>${value.F56UD911_LITM}</td><td>${value?.F56UD911_DSC1 == undefined ? "" : value.F56UD911_DSC1 }</td></tr>`)

          //     })

          // }
  
          $("#loader8").removeClass("ibox-content")
          $("#loader8").removeClass("sk-loading")
          $("#spin8").addClass("d-none")
  
      },
      error : function(xhr){
  
        $("#loader8").removeClass("ibox-content")
        $("#loader8").removeClass("sk-loading")
        $("#spin8").addClass("d-none")
  
      },
      complete : function(xhr, status)
      {
  
        po_table_map = $("#po_table_map").DataTable({
          language: {
          'paginate': {
          'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
          'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
          }
          },
          dom: '<"top">ft<"bottom"ip>',
          ordering: true,
          lengthMenu : [5,10,20,25,50],
          pagingType: "simple_numbers",
          select: true,
      });

      // if($("#deliveryChallanNumber").val() != "")
      // {
      //   po_table_map.column(4).visible(false)
      // }
      // else{
      //   po_table_map.column(4).visible(true)
      // }
  
      }
  
    })
  }



      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      $(".draggable-modal .modal-dialog").on("mousedown", function(e) {
        isDragging = true;
        offsetX = e.clientX - parseInt($(".draggable-modal .modal-dialog").css("left"));
        offsetY = e.clientY - parseInt($(".draggable-modal .modal-dialog").css("top"));
      });

      $(document).on("mouseup", function() {
        isDragging = false;
      });

      $(document).on("mousemove", function(e) {
        if (isDragging) {
          $(".draggable-modal .modal-dialog").css({
            top: e.clientY - offsetY,
            left: e.clientX - offsetX,
            right: "auto"
          });
        }
      });



      let offsetXX = 0;
      let offsetYY = 0;
      let isDraggingg = false;

      $(".draggable-modals .modal-dialog").on("mousedown", function(e) {
        isDraggingg = true;
        offsetXX = e.clientX - parseInt($(".draggable-modals .modal-dialog").css("left"));
        offsetYY = e.clientY - parseInt($(".draggable-modals .modal-dialog").css("top"));
      });

      $(document).on("mouseup", function() {
        isDraggingg = false;
      });

      $(document).on("mousemove", function(e) {
        if (isDraggingg) {
          $(".draggable-modals .modal-dialog").css({
            top: e.clientY - offsetYY,
            left: e.clientX - offsetXX,
            right: "auto"
          });
        }
      });
  


  // function errorStatus(objects) {


  //   // console.log(objects);

  //   $.ajax({
  //     url: `${[test[0].url]}/gate/put?id=${objects.id}`,
  //     type: "PUT",
  //     data: JSON.stringify(objects),
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       'Authorization': 'Bearer ' + token,
  //     },

  //     success: function (data, status, xhr) {
  //       console.log(xhr);
  //       if (xhr.status == 200) {

  //         console.log("success");
  //         window.open("../template/exception.jsp", "_self");
  //       } 
  //       else{


  //             $.errorMessage(xhr.responseJSON.message);
  //       }
        
  //     },
  //     error: function (xhr) {
  //       if(xhr.status == 498)
  //       {
  //         $.tokenError();
  //       }
  //       else if(xhr.status >= 400 && xhr.status < 500){

  //         console.log(xhr);
  //             $.errorMessage(xhr.responseJSON.message);
  //       }
  //       else{

  //         console.log(xhr);
  //             $.errorMessage(xhr.responseJSON.error)
  //       }
  //     },
  //   });
  // }

  console.log(gate_id);
  let additional_name = [];

  var uppy = Uppy.Core().use(Uppy.Dashboard, {
    inline: true,
    target: "#drag-drop-area",
  });

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

            // $.errorMessage(xhr.responseJSON.message);
      }
    },
    error: function (xhr) {
      if (xhr.status == 498) {
        $.tokenError();
      }
      else if(xhr.status >= 400 && xhr.status < 500){

            // $.errorMessage(xhr.responseJSON.message);
      }
      else{
            // $.errorMessage(xhr.responseJSON.error)
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
      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        }
        else if(xhr.status >= 400 && xhr.status < 500){

              $.errorMessage(xhr.responseJSON.message);
        }
        else{
              $.errorMessage(xhr.responseJSON.error)
        }
    }
    });
  }


  $("#myModal21").on("hide.bs.modal", function () {
    
    // Clear the contents of the modal
    po_table.destroy();
    $("#po_table_body").empty();
  });

  $("#myModal22").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    vendor_modal.destroy();
    $("#vendor_table_body").empty();
  });

  $("#myModal23").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    po_table_map.destroy();
    $("#po_table_body_map").empty();
  });

  $("#myModal24").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    dc_fetch.destroy();
    $("#DC_table_body").empty();
  });








  $("#back_invoice").click((e) => {
    e.preventDefault();
  
    object_put.is_reserved = "N"
    console.log("object_data : ", object_put.is_reserved);
  
    
            $.ajax({
                url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object_put.gate_number}&username=${$(".name")[1].innerText}`,
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
  
                      window.open("../template/exception.jsp", "_self");
                        
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-sm btn-success mx-1",
          cancelButton: "btn btn-sm btn-danger mx-1",
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: "",
          text: "Do You Want To Cancel This Gate Number",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
          
  
                  object_put.vehicle_nbr = $("#vehicle_nbr").val();
                  object_put.vendorname = $("#vendorname").val();
                  object_put.material_type = $("#material_type").val();
                  object_put.weight = $("#weight").val();
                  object_put.gate_number = $("#gate_number").html();
                  object_put.po_number = $("#po_number").val();
                  object_put.po_type = $("#po_type").val();
                  object_put.vendor_code = $("#vendor_code").val();
                  object_put.storeId = $("#storeId").val(),
                  object_put.unitName = $("#unitname").val(),
                  object_put.invoice_number = $("#invoice_number").val();
                  object_put.invoice_date = $("#invoice_date").val().split("-").reverse().join("-");
                  object_put.amount = $("#amount").val();
                  object_put.workOrderNumber = $("#workOrderNumber").val();
                  object_put.deliveryChallanNumber = $("#deliveryChallanNumber").val();
                  object_put.transactionType = $("#Transaction").val()
                  object_put.status = {code : 999};
                  object_put.details = details;
  
                  console.log(JSON.stringify(object_put));
  
  
                  object_put.is_reserved = "N"
                  console.log("object_data : ", object_put.is_reserved);
          
                  
                          $.ajax({
                              url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${object_put.gate_number}&username=${$(".name")[1].innerText}`,
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
                                      data: JSON.stringify(object_put),
                                      headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                        'Authorization': 'Bearer ' + token,
                                      },
                                      success: function (data, status, xhr) {
                                        // console.log(data);
                    
                                        if (xhr.status == 200) {

                                          let today = new Date();
                                          let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                          let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

                                          $.ajax({
                                            url : `${[test[0].url]}/remark/add`,
                                            type : 'POST',
                                            data : JSON.stringify({
                                    
                                                gate_number: $("#gate_number").html(),
                                                remark : $("textarea").val().toUpperCase(),
                                                status  : 1000,
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
                                              window.open("../template/exception.jsp", "_self");
                                                console.log(data);
                                            }
                                          })
                    
                    
                                         
                    
                                        }
                                      }
                                    })
  
                                      
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
    
                
  
                  // window.open("../template/exception.jsp", "_self");
        }
      })

    }
    else{

      $.errorMessage("Please Add Remarks")

    }

    // e.preventDefault();


    
  });


  //--------------Remap process
  $("#remap_data").click(()=>{
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
      $("#loader_remap").addClass("ibox-content")
      $("#loader_remap").addClass("sk-loading")
      $("#spin_remap").removeClass("d-none")
      
      sessionStorage.setItem("remap_gateNumber",$("#gate_number").html())
          
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
        
                var imageData = res.ocrImage;
                try {
                  sessionStorage.setItem('preview_invoice', JSON.stringify('data:image/jpeg;base64,'+imageData));
                  localStorage.setItem("ocr_invoice",JSON.stringify('data:image/jpeg;base64,'+imageData));
                    window.open("../../reMappingData/template/reMapData.jsp", "_self");
                  } catch (error) {
                    swal("", "Image size is too large.", "warning")
                  }
            
      } catch (error) {
          swal("", "JSON Response is too large.", "warning")
          }
          $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
      })
      .catch(error => {
        // Handle any errors
        console.error('Error uploading image:', error);
      })
    }

  })
  //--------------End of Remap process
});
