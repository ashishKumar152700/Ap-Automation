$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"));
  const user_company = JSON.parse(localStorage.getItem("comapny"));
  const user_store = JSON.parse(localStorage.getItem("store"));
  var object =  JSON.parse(sessionStorage.getItem("object"));
  let object_put = structuredClone(object);
  let details = object_put.details;

  let unit_rate_tolerance = 0.01;


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


  
  $.checkstatus(object.id, true);

console.log(object);

var convertedFile;


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
try {
  
  // $("#invoice_date").val(object.invoice_date.split("-").reverse().join("-"));
  $("#invoice_date").val(moment(object.invoice_date, "YYYY-MM-DD", true).isValid() ? object.invoice_date.split("-").reverse().join("-") : object.invoice_date);
} catch (error) {
  
}
$("#invoice_number").val(object.invoice_number);
$("#amount").val(object.amount);
$("#workOrderNumber").val(object.workOrderNumber);
$("#deliveryChallanNumber").val(object.deliveryChallanNumber);


  

user_company.map((value)=>{
  
    $("#unitname").append(`<option value="${value}">${value}</option>`);

})

user_store.map((value)=>{

  $("#storeId").append(`<option value="${value}">${value}</option>`);

})





// $("#storeId").val(object.storeId);
$("#actual_weight").val(object.actualWeightQuantity)
$("#storeId").val(object.storeId)



object_put.invoice_date = moment(object_put.invoice_date, "DD-MM-YYYY", true).isValid() ? object_put.invoice_date.split("-").reverse().join("-") : object_put.invoice_date;


// object_put.invoice_date = object_put.invoice_date ? object_put.invoice_date.split("-").reverse().join("-") : object_put.invoice_date;
console.log("object put values : " ,object_put);



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

var test = $.test();
var login = $.login();
var vision = $.vision();





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
    $("#loader5").addClass("ibox-content")
    $("#loader5").addClass("sk-loading")
    $("#spin5").removeClass("d-none")

    $("#loader_rem").addClass("ibox-content");
    $("#loader_rem").addClass("sk-loading");
    $("#spin_rem").removeClass("d-none");

      sessionStorage.setItem("remap_gateNumber",$("#gate_number").html())
  // $("#loader_remap").addClass("ibox-content")
  // $("#loader_remap").addClass("sk-loading")
  // $("#spin_remap").removeClass("d-none")
 

      fetch(url, {
      // fetch('http://localhost:8888/api/ocr', {
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

                  $("#loader5").removeClass("ibox-content")
                  $("#loader5").removeClass("sk-loading")
                  $("#spin5").addClass("d-none")

                  $("#loader_rem").removeClass("ibox-content");
                  $("#loader_rem").removeClass("sk-loading");
                  $("#spin_rem").addClass("d-none");
                  window.open("../../../Store/reMappingData/template/reMapData.jsp", "_self");
              } catch (error) {
              
              const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                      confirmButton: "btn btn-sm btn-success mx-1",
                  },
                  buttonsStyling: false,
                  });
              
                  swalWithBootstrapButtons
                  .fire({
                      title: "",
                      text: "Image size is too large",
                      icon: "warning",
                      confirmButtonText: "OK",
                      reverseButtons: true,
                  })
                  .then(() => {

                    $("#loader5").removeClass("ibox-content")
                    $("#loader5").removeClass("sk-loading")
                    $("#spin5").addClass("d-none")
          
                    $("#loader_rem").removeClass("ibox-content");
                    $("#loader_rem").removeClass("sk-loading");
                    $("#spin_rem").addClass("d-none");

                  })
              }

      } catch (error) {
          // swal("", "JSON Response is too large.", "warning")
          const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-sm btn-success mx-1",
              },
              buttonsStyling: false,
            });
        
            swalWithBootstrapButtons
              .fire({
                title: "",
                text: "JSON Response is too large",
                icon: "warning",
                confirmButtonText: "OK",
                reverseButtons: true,
              })
              .then(() => {

                $("#loader5").removeClass("ibox-content")
                $("#loader5").removeClass("sk-loading")
                $("#spin5").addClass("d-none")
      
                $("#loader_rem").removeClass("ibox-content");
                $("#loader_rem").removeClass("sk-loading");
                $("#spin_rem").addClass("d-none");

              })
         }
          $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
      })
        .catch(error => {
          // Handle any errors
          
          console.error('Error uploading image:', error);
        })


      
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
//       {
//         $("#storeId").val(object.storeId);
//       }
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
                        { data: "remark",
                        // createdCell: function (td, cellData, rowData, row, col) {
                        //       $(td).css('font-style', 'italic');
                        //       $(td).css('color', 'red');

                        //     }
                         },
                    ],
                    columnDefs : [

                        {"className" : "dt-body-left" , "targets" : "_all"}
                    ],
                    // ordering: true,
                    // processing : true,
                    lengthMenu: [5, 10, 20, 25, 50],
                })
                    
                    // $.ajax({
                    //     url : `${[test[0].url]}/remarks`,
                    //     headers: {
                    //         'Authorization': 'Bearer ' + token,
                    //       },
                    //     success: function(data,status,xhr)
                    //     {
                    //       console.log(data , " remarks " , xhr);

                    //         if(xhr.status == 200)
                    //         {
                    //             data.data.map(value=>{
    
                    //                 // console.log(value);
                    //                 if(value.gate_number == $("#gate_number").html())
                    //                 {
                    //                   console.log("remark" , data);
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
      console.log(blob);

      // Set the desired file name and type
      var fileName = `${gate_id}.pdf`
      var fileType = blob.type; // You should use the appropriate MIME type

      // Create a File object from the Blob data
      convertedFile = new File([blob], fileName, { type: fileType });  
      // Now you can use the convertedFile as needed
      


      var url = URL.createObjectURL(blob);

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

      console.log(url);

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

        console.log(URL.revokeObjectURL(url));
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
    // var pattern = /^[\W_]+|[\W_]+$/g;
    // console.log(out);
    // console.log(pattern);
    // // var result = out.replace(pattern, '');
    $(element).val(out);
  }
}

for (let i = 0; i < object.details.length; i++) {
  $("#tab_logic_body").append(`<tr>

  <td><input type="text" class="form-control input_size item_code text-center" readonly value="${object.details[i].item_code}" ></td>
  <td><input type="text" class="form-control input_size item_description text-center" readonly value="${object.details[i].description1}" ></td>
  <td><input type="text" class="form-control input_size fix hsn_code text-center" readonly value="${object.details[i].hsn_code}"></td>
  <td><input type="text" class="form-control input_size fix uom text-center" readonly value="${object.details[i].uom}"></td>
  <td><input type="text" class="form-control input_size fix quantity text-center" readonly value="${object.details[i].quantity}"></td>
  <td><input type="text" class="form-control input_size fix unit_amount text-center" readonly value="${object.details[i].unit_amount}"></td>
  <td><input type="text" class="form-control input_size fix amount text-center" readonly value="${object.details[i].amount}"></td>
  
  
  </tr>`);

  

  $("#modal_table_details").append(`<tr>
          <td class="text-center border py-2 po_1" id="detail_po_no">${$(
    "#po_number"
  ).val()}</td>
          <td class="text-center border py-2 des_1" id="">${object.details[i].item_code
    }</td>
          <td class="text-center border py-2 qty_1">${object.details[i].quantity
    }</td>
          <td class="text-center border py-2 unit_1"></td>
          <td class="text-center border py-2 remark_1">............</td>
          </tr>`);



          $("#quantity_body").append(`
          <tr>
            <td><input type="text" readonly class="form-control input_size scan_item text-left" value="${$(".item_code")[i].value}"></td>
            <td><input type="text" readonly class="form-control input_size scan_item_des text-left" value="${$(".item_description")[i].value}"></td>
            <td><input type="text" readonly class="form-control input_size scan_quantity text-center" value="${$(".quantity")[i].value}"></td>
            <td><input type="text" class="form-control input_size text-center scan_actual_quantity"></td>
          </tr>
      
            `)
      
            $(".scan_actual_quantity")[i].value = object.details[i].actualRecievedQuantity ?? object.details[i].quantity
}



$(".check").map((index, value) => $(value).attr("readonly", "readonly"))




  $("#scan_actual_qty").click(()=>{


    $("#scan_actual_qty").removeAttr("data-dismiss" , "modal")
    let sum = 0;
    let count = 0;
    for(let i = 0 ; i < $(".scan_actual_quantity").length ; i++)
    {
      if($(".scan_actual_quantity")[i].value != "")
      {
        sum = sum + +$(".scan_actual_quantity")[i].value
        count++
      }
    }

    let all_ok = 0; 

    for(let i = 0 ; i < $("#quantity_body tr").length ; i++)
    {

      let actual_values  = $(".scan_actual_quantity")[i].value.split(" ")[0]
      let scanned_values = $(".scan_quantity")[i].value.split(" ")[0]

      let arr1 = actual_values.split(/[,]/).join("")
      let arr2 = scanned_values.split(/[,]/).join("")
       if(+arr1 <= +arr2)
       {
        let border = $(".scan_actual_quantity")[i]
        $(border).css("border", "1px solid #e5e6e7")
        all_ok++;
      }
      else{

         let border = $(".scan_actual_quantity")[i]
         $(border).css("border","1px solid red");

       }

    }

    if(count == $(".scan_actual_quantity").length && all_ok == $("#quantity_body tr").length)
    {
      console.log("sum : ", sum);
      $("#actual_weight").val(sum)
      $("#scan_actual_qty").attr("data-dismiss" , "modal")
    }

  })



let items_matched = [];



$("#submit_unloading").click((e) => {
  e.preventDefault();
  var code = 200;
  var to_email = [];

  let tab_count = 0;

  if($("#quantity_body tr").length > 0)
  {

    for(let i = 0 ; i < $(".scan_actual_quantity").length ; i++)
    {

      let scan_value = $(".scan_actual_quantity")[i]

      if($(scan_value).val() == "")
      {
        $(scan_value).css("border" , "1px solid red")
      }
      else{

        tab_count++;
        $(scan_value).css("border" , "1px solid #e5e6e7")
      }

      
    }

    if(tab_count != $("#quantity_body tr").length)
    {
      $("#search_quantity").trigger("click")
    }
    // let values = $(".scan_actual_quantity").map((index ,value)=> value == undefined || value == "")

    // console.log(values);

  }
  else{
    
    tab_count++
    

  }

  console.log(tab_count);

              if($("#invoice_number").val() != "")
              {
                if($("textarea").val().length != 0)
                {


                    if($("#deliveryChallanNumber").val() != "")
                    {
                      $.ajax({
                        url : `${[test[0].url]}/gate/validate/wo?dcNumber=${$("#deliveryChallanNumber").val()}&supplier=${$("#vendor_code").val()}&gateNumber=${$("#gate_number").html()}&business_unit=20100`,
                        type : "POST",
                        headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json",
                                  'Authorization': 'Bearer ' + token,
                          },
                        success : function(data,status,xhr)
                        {
                          console.log("dc data : " , data);
                          if(xhr.status == 200)
                          {


                            if(data.data == false)
                            {
                              $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${data.message}`)

                                let today = new Date();
                                let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');


                                $.ajax({
                                    url : `${[test[0].url]}/remark/add`,
                                    type : 'POST',
                                    data : JSON.stringify({

                                        gate_number: $("#gate_number").html(),
                                        remark : data.message.toUpperCase(),
                                        status  : 150,
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
                                    object_put.error_message = data.message
                                    object_put.status = {code  : 1000}

                                    errorStatus(object_put)
                                  }, 500);

                            }


                          }
                          else{

                            $.errorMessage(xhr.responseJSON.message)
                          }

                        },
                        error : function(xhr)
                        {
                          console.log(xhr);
                          if(xhr.status == 498)
                          {
                            $.tokenError()
                          }else{
                            $.errorMessage(xhr.responseJSON.message)
                          }

                        }
                      })
                    }
                                



                        if(+$("#weight").val() >= +$("#actual_weight").val()  && +$("#actual_weight").val() != 0  && $("#actual_weight").val() != "" &&  tab_count == $("#quantity_body tr").length) {




                          for(let i = 0 ; i < details.length ; i++)
                          {

                            for(let j = 0 ; j < $(".scan_item").length ; j++)
                            {
                              if(details[i].item_code == $(".scan_item")[j].value)
                              {
                                details[i].actualRecievedQuantity = $(".scan_actual_quantity")[j].value
                              }

                            }
                          }


                        object_put.actualWeightQuantity = $("#actual_weight").val();

                        $("#loader5").addClass("ibox-content")
                        $("#loader5").addClass("sk-loading")
                        $("#spin5").removeClass("d-none")

                        $("#loader_rem").addClass("ibox-content");
                        $("#loader_rem").addClass("sk-loading");
                        $("#spin_rem").removeClass("d-none");




                        for(let i = 0 ; i < $("#tab_logic_body tr").length ; i++)
                        {

                          details[i].item_code = $(".item_code")[i].value
                          details[i].hsn_code = $(".hsn_code")[i].value
                          details[i].uom = $(".uom")[i].value
                          details[i].quantity = $(".quantity")[i].value
                          details[i].unit_amount = $(".unit_amount")[i].value
                          details[i].amount = $(".amount")[i].value

                        }




                        let vendor_code = $("#vendor_code").val();

                        for (let i = 0; i < $(".tagss").length; i++) {
                          tags.push({ id: $(".tagss")[i].attributes[1].value });
                        }


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

                                $("#loader5").removeClass("ibox-content")
                                $("#loader5").removeClass("sk-loading")
                                $("#spin5").addClass("d-none")

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
                                        status  : 150,
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
                                    object_put.error_message = `Duplicate Supplier Invoice`
                                    object_put.status = {code  : 1000}

                                    errorStatus(object_put)
                                  }, 500);



                                  
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

                                    if (record == 1) {
                                      

                                          let next;

                                          if(object_put.transactionType == "ST/OT")
                                          {
                                            next  = 279
                                          }
                                          else if($("#deliveryChallanNumber").val() != null)
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


                                          console.log("req : ", req);

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

                                                console.log(data);

                                              let company_code_line = data.data.order_company


                                            for(let i = 0 ; i < $(".item_code").length  ; i ++)
                                            {

                                              let item = details[i].jdeItemCode != null ? details[i].jdeItemCode : $(".item_code")[i].value;

                                              if($(".unit_amount")[i].value == "null")
                                                {
                                                  console.log('please remap unit rate  ---->' ,$(".unit_amount")[i].value);

                                                  $.errorMessage("PLease Remap The Unit Rate First")

                                                  $("#loader5").removeClass("ibox-content")
                                                  $("#loader5").removeClass("sk-loading")
                                                  $("#spin5").addClass("d-none")
                  
                                                  $("#loader_rem").removeClass("ibox-content");
                                                  $("#loader_rem").removeClass("sk-loading");
                                                  $("#spin_rem").addClass("d-none");

                                                  return;
                                                }

                                              let line_amount = $(".unit_amount")[i].value;



                                              $.ajax({
                                                url : `${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$filter=F4311.UOPN GE 1&$field=F4311.LNID&$field=F4311.DSC1&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ 00201&$field=F4311.PRRC&%24field=F4311.LITM`,
                                                headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                                                },
                                                success: function (data) {

                                                  let dynamic_tables = data.fs_DATABROWSE_F4311.data.gridData.summary.records

                                                  if(dynamic_tables > 0)
                                                  {

                                                    let match_cost = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_PRRC;

                                                    if($("#deliveryChallanNumber").val() == "" || object_put.dc_type != "Unprocessed")
                                                      {

                                                        let rounded_jde = Math.round(match_cost * 100) / 100;
                                                        let rounded_invoice = Math.round(line_amount * 100) / 100;

                                                        if(Math.abs(rounded_jde - rounded_invoice) <= unit_rate_tolerance)
                                                          {

                                                            details[i].item_code =  data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM;
                                                            details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM;
                                                            details[i].actualRecievedQuantity =  $(".scan_actual_quantity")[i].value
                                                            details[i].description1 = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_DSC1
                                                            details[i].lineNumber = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LNID

                                                            if(i == $(".item_code").length -1)
                                                            {
                                                              success(details);
                                                              // localStorage.setItem("item_code_match" , JSON.stringify(items_matched))
                                                            }

                                                          }
                                                          else{

                                                            $.errorMessage(`Unit Cost Is Not Matching\n JDE Unit Cost ${match_cost}\n Invoice Unit Cost ${line_amount}`)


                                                                  $("#loader5").removeClass("ibox-content") 
                                                                  $("#loader5").removeClass("sk-loading")
                                                                  $("#spin5").addClass("d-none")

                                                                  $("#loader_rem").removeClass("ibox-content");
                                                                  $("#loader_rem").removeClass("sk-loading");
                                                                  $("#spin_rem").addClass("d-none");

                                                                  setTimeout(() => {
                                                                    object_put.error_message = `Unit Cost Is Not Matching\n JDE Unit Cost ${match_cost}\n Invoice Unit Cost ${line_amount}`
                                                                    object_put.status = {code  : 1000}

                                                                    errorStatus(object_put)
                                                                  }, 1500);

                                                          }
                                                    }

                                                      else{

                                                        details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM
                                                        details[i].description1 = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_DSC1
                                                        details[i].lineNumber = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LNID
                                                        details[i].actualRecievedQuantity =  $(".scan_actual_quantity")[i].value
                                                        details[i].item_code =  data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM;

                                                        success(details);
                                                      }
                                                    
                                                  }
                                                  else{

                                                  let dynamic_item_refrence_table = login[0].url == `http://103.65.20.159:8081` ? `${[login[0].url]}/jderest/v2/dataservice/table/F4104?$field=F4104.AN8&$field=F4104.LITM&$field=F4104.DSC1&$filter=F4104.AN8 EQ ${$("#vendor_code").val()}&$filter=F4104.DSC1 EQ ${item}` :   `${[login[0].url]}/jderest/v2/dataservice/table/F56IN115?$field=F56IN115.AN8&$field=F56IN115.LITM&$filter=F56IN115.AN8 EQ ${$("#vendor_code").val()}&$filter=F56IN115.D200 EQ ${item}`


                                                    $.ajax({
                                                      url : dynamic_item_refrence_table,
                                                      type: "GET",
                                                      headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                                                      },
                                                      success: function (data) {
                                                        console.log(data);
                                      
                                                        let dynamic_databrowse_table = login[0].url == `http://103.65.20.159:8081` ?  data.fs_DATABROWSE_F4104.data.gridData.summary.records : data.fs_DATABROWSE_F56IN115.data.gridData.summary.records ; 
                                      
                                                        if(dynamic_databrowse_table > 0)
                                                        {


                                                          let dynamic_table_item = login[0].url == `http://103.65.20.159:8081` ? data.fs_DATABROWSE_F4104.data.gridData.rowset[0].F4104_LITM : data.fs_DATABROWSE_F56IN115.data.gridData.rowset[0].F56IN115_LITM ;



                                                          $.ajax({
                                                            url : `${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$filter=F4311.UOPN GE 1&$field=F4311.LNID&$field=F4311.DSC1&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${dynamic_table_item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ 00201&$field=F4311.PRRC`,
                                                            headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
                                                            },
                                                            success: function (data,status,xhr) {
                                                              console.log(data);
                                                              // console.log(`${[login[0].url]}/jderest/v2/dataservice/table/F4311?$field=F4311.AN8&$field=F4311.LITM&$field=F4311.DSC1&$filter=F4311.AN8 EQ ${$("#vendor_code").val()}&$filter=F4311.LITM EQ ${dynamic_table_item}&$filter=F4311.DOCO EQ ${$("#po_number").val()}&$filter=F4311.DCTO EQ ${$("#po_type").val()}&$filter=F4311.KCOO EQ ${company_code_line}&$field=F4311.PRRC`);
                                            
                                            
                                                              if(data.fs_DATABROWSE_F4311.data.gridData.summary.records > 0)
                                                              {

                                                                // console.log("if -1");
                                                                
                                                                let table_unit_cost = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_PRRC;

                                                                let rounded_jde = Math.round(table_unit_cost * 100) / 100;
                                                                let rounded_invoice = Math.round(line_amount * 100) / 100;

             
                                                                if(Math.abs(rounded_jde - rounded_invoice) <= unit_rate_tolerance)
                                                                {

                                                                  details[i].actualRecievedQuantity =  $(".scan_actual_quantity")[i].value
                                                                  details[i].item_code = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM;
                                                                  details[i].jdeItemCode = data.fs_DATABROWSE_F4311.data.gridData.rowset[0].F4311_LITM;
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

                                                                  $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${dynamic_table_item} - Item Rate Not Matched`);

                                                                  $("#loader5").removeClass("ibox-content")
                                                                  $("#loader5").removeClass("sk-loading")
                                                                  $("#spin5").addClass("d-none")

                                                                  $("#loader_rem").removeClass("ibox-content");
                                                                  $("#loader_rem").removeClass("sk-loading");
                                                                  $("#spin_rem").addClass("d-none");

                                                              
                                                                  // delete object.details
                                                                  // delete object.tags
                                                                  setTimeout(() => {
                                                                    object_put.error_message = `${dynamic_table_item} - Item Rate Not Matched`
                                                                    object_put.status = {code  : 1000}

                                                                    errorStatus(object_put)
                                                                  }, 1000);

                                                                }

                                                                
                                                              }
                                                              else{

                                                                // console.log("2");
                                                                $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${dynamic_table_item} - PO Line Item Not Found`);
                                                                $("#loader5").removeClass("ibox-content")
                                                                $("#loader5").removeClass("sk-loading")
                                                                $("#spin5").addClass("d-none")

                                                                $("#loader_rem").removeClass("ibox-content");
                                                                $("#loader_rem").removeClass("sk-loading");
                                                                $("#spin_rem").addClass("d-none");

                                                                // delete object.details
                                                                //   delete object.tags

                                                                setTimeout(() => {
                                                                  object_put.error_message = `${dynamic_table_item} - PO Line Item Not Found`
                                                                  object_put.status = {code  : 1000}

                                                                  errorStatus(object_put)
                                                                }, 1000);

                                                              }
                                                            },
                                                            error : function(xhr)
                                                            {
                                                              $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${xhr.responseJSON.message}`)
                                                              $("#loader5").removeClass("ibox-content")
                                                              $("#loader5").removeClass("sk-loading")
                                                              $("#spin5").addClass("d-none")

                                                              $("#loader_rem").removeClass("ibox-content");
                                                              $("#loader_rem").removeClass("sk-loading");
                                                              $("#spin_rem").addClass("d-none");
                                                              // $.errorMessage("Cross Refrence Item Not Found")

                                                              setTimeout(() => {
                                                                object_put.error_message = xhr.responseJSON.message
                                                                object_put.status = {code  : 1000}
                                    
                                                              errorStatus(object_put)
                                                              }, 1000);

                                                            }
                                                          })



                                                        }
                                                        else{
                                      
                                                          $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \nCross Refrence Item Not Found`)

                                                          $("#loader5").removeClass("ibox-content")
                                                            $("#loader5").removeClass("sk-loading")
                                                            $("#spin5").addClass("d-none")

                                                            $("#loader_rem").removeClass("ibox-content");
                                                            $("#loader_rem").removeClass("sk-loading");
                                                            $("#spin_rem").addClass("d-none");

                                                          setTimeout(() => {
                                                            object_put.error_message = `Cross Refrence Item Not Found`
                                                            object_put.status = {code  : 1000}
                                    
                                                            errorStatus(object_put)
                                                          }, 1000);
                                      
                                      
                                                          
                                                          // $.ajax({
                                                          //       type: "PUT",
                                                          //       url: `${[test[0].url]}/gate/put?id=${object.id}`,
                                                          //       data: JSON.stringify(object_put),
                                                          //       headers: {
                                                          //         Accept: "application/json",
                                                          //         "Content-Type": "application/json",
                                                          //         'Authorization': 'Bearer ' + token,
                                                          //       },
                                                          //       success : function(data,status,xhr)
                                                          //       {
                                                          //         if(xhr.status == 200)
                                                          //           {
                                                          //             window.open(`../template/exception.jsp` , `_self`)
                                                          //           }
                                                          //           else{
                                                          //             $.errorMessage(xhr.responseJSON.message)
                                                          //           }
                                                          //       },
                                                          //     error : function(xhr){
                                      
                                                          //       if(xhr.status == 498)
                                                          //       {
                                                          //         $.tokenError();
                                                          //       }
                                                          //       else if(xhr.status >= 400 && xhr.status < 500){
                                                          //         $.errorMessage(xhr.responseJSON.message);
                                                          //       }
                                                          //       else{
                                                          //         $.errorMessage(xhr.responseJSON.error)
                                                          //       }
                                      
                                                          //     },
                                                          //   })
                                      
                                      
                                                        }
                                                      },
                                                      error : function(xhr)
                                                      {
                                                        $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n{xhr.responseJSON.errorDetails.errors}`)

                                                        $("#loader5").removeClass("ibox-content")
                                                        $("#loader5").removeClass("sk-loading")
                                                        $("#spin5").addClass("d-none")

                                                        $("#loader_rem").removeClass("ibox-content");
                                                        $("#loader_rem").removeClass("sk-loading");
                                                        $("#spin_rem").addClass("d-none");

                                                        object_put.error_message = `${xhr.responseJSON.errorDetails.errors}`
                                                        object_put.status = {code  : 1000}

                                                        errorStatus(object_put)
                                                      }
                                                    })

                                                  }


                                                },
                                                error : function(xhr)
                                                {
                                                  // $.errorMessage("Cross Refrence Item Not Found")
                                                  $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${xhr.responseJSON.errorDetails.errors}`)

                                                  $("#loader5").removeClass("ibox-content")
                                                  $("#loader5").removeClass("sk-loading")
                                                  $("#spin5").addClass("d-none")

                                                  $("#loader_rem").removeClass("ibox-content");
                                                  $("#loader_rem").removeClass("sk-loading");
                                                  $("#spin_rem").addClass("d-none");

                                                  object_put.error_message = `${xhr.responseJSON.errorDetails.errors}`
                                                  object_put.status = {code  : 1000}

                                                  errorStatus(object_put)
                                                  

                                                }


                                              })


                                              


                                          }

                                              


                                              } else {
                                                $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${data.message}`)

                                                $("#loader5").removeClass("ibox-content")
                                                $("#loader5").removeClass("sk-loading")
                                                $("#spin5").addClass("d-none")

                                                $("#loader_rem").removeClass("ibox-content");
                                                $("#loader_rem").removeClass("sk-loading");
                                                $("#spin_rem").addClass("d-none");

                                                object_put.error_message = `${data.message}`
                                                object_put.status = {code  : 1000}

                                                errorStatus(object_put)

                                                // swal("", data.message, "error").then(() => {
                                                //   $("#loader").removeClass("ibox-content");
                                                //   $("#loader").removeClass("sk-loading");
                                                //   $("#spin1").addClass("d-none");
                                                //   $("#save").html("SAVE");
                                                // });
                                              }
                                            },
                                            error: function (xhr) {

                                              $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n ${xhr.responseJSON.message}`)

                                              $("#loader5").removeClass("ibox-content")
                                              $("#loader5").removeClass("sk-loading")
                                              $("#spin5").addClass("d-none")

                                              $("#loader_rem").removeClass("ibox-content");
                                              $("#loader_rem").removeClass("sk-loading");
                                              $("#spin_rem").addClass("d-none");


                                              object_put.error_message = `${xhr.responseJSON.message}`
                                              object_put.status = {code  : 1000}

                                              errorStatus(object_put)
                                                  // swal("", xhr.responseJSON.message, "error").then(() => {
                                                    // $("#loader").removeClass("ibox-content");
                                                    // $("#loader").removeClass("sk-loading");
                                                    // $("#spin1").addClass("d-none");
                                                    // $("#save").html("SAVE");
                                                  // });
                                            },
                                          });

                                    // }



                                    } else {

                                      $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \nVendor Not Present in JDE`)

                                      $("#loader5").removeClass("ibox-content")
                                      $("#loader5").removeClass("sk-loading")
                                      $("#spin5").addClass("d-none")

                                      $("#loader_rem").removeClass("ibox-content");
                                      $("#loader_rem").removeClass("sk-loading");
                                      $("#spin_rem").addClass("d-none");



                                      setTimeout(() => {
                                        object_put.error_message = `Vendor Not Present in JDE`
                                        object_put.status = {code  : 1000}
                                
                                        errorStatus(object_put)
                                      }, 1000);

                                      // swal("", "Vendor Not Present in JDE", "error").then(() => {
                                      //   $("#loader").removeClass("ibox-content");
                                      //   $("#loader").removeClass("sk-loading");
                                      //   $("#spin1").addClass("d-none");
                                      //   $("#save").html("SAVE");
                                      // });
                                    }


                                  },
                                  error: function (xhr) {
                                    if(xhr.status == 500)
                                    {
                                      $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${xhr.responseJSON.sysErrors[0].TITLE}`)

                                      $("#loader5").removeClass("ibox-content")
                                      $("#loader5").removeClass("sk-loading")
                                      $("#spin5").addClass("d-none")

                                      $("#loader_rem").removeClass("ibox-content");
                                      $("#loader_rem").removeClass("sk-loading");
                                      $("#spin_rem").addClass("d-none");

                                      object_put.error_message = `${xhr.responseJSON.sysErrors[0].TITLE}`
                                      object_put.status = {code  : 1000}
                                      errorStatus(object_put)

                                      // swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(() => {
                                      //   $("#loader").removeClass("ibox-content");
                                      //   $("#loader").removeClass("sk-loading");
                                      //   $("#spin1").addClass("d-none");
                                      //   $("#save").html("SAVE");
                                      // });
                                    }
                                    else
                                    {

                                      $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \n${xhr.responseJSON.message}`)
                                      object_put.error_message = `${xhr.responseJSON.message}`
                                      object_put.status = {code  : 1000}

                                      $("#loader5").removeClass("ibox-content")
                                      $("#loader5").removeClass("sk-loading")
                                      $("#spin5").addClass("d-none")

                                      $("#loader_rem").removeClass("ibox-content");
                                      $("#loader_rem").removeClass("sk-loading");
                                      $("#spin_rem").addClass("d-none");

                                      errorStatus(object_put)

                                    // swal("", xhr.responseJSON.message, "error").then(() => {
                                    //   $("#loader").removeClass("ibox-content");
                                    //   $("#loader").removeClass("sk-loading");
                                    //   $("#spin1").addClass("d-none");
                                    //   $("#save").html("SAVE");
                                    // });

                                    }
                                  },
                                });

                                
                              }
                            }
                        })

                      }
                      else{

                        if(+$("#weight").val() < +$("#actual_weight").val())
                        {
                          $.errorMessage(`${$("#gate_number").html()} Updated To Flaw-fix \nQuantity Exceeds`)

                          object_put.error_message = `Quantity Exceeds`
                          object_put.status = {code  : 1000}

                          errorStatus(object_put)
                        }
                        else if(+$("#actual_weight").val() == 0)
                        {
                          $.errorMessage("Actual Quantity Can Not be 0")
                          
                        }
                        else if($("#actual_weight").val() == ""){
                          
                          $.errorMessage("Actual Quantity is null")
                        }

                        $("#loader5").removeClass("ibox-content")
                        $("#loader5").removeClass("sk-loading")
                        $("#spin5").addClass("d-none")

                        $("#loader_rem").removeClass("ibox-content");
                        $("#loader_rem").removeClass("sk-loading");
                        $("#spin_rem").addClass("d-none");

                      }

                    
                }
                else{
                  $.errorMessage("Please Add Remark")
                }
              }
              else{
                $.errorMessage(`Invoice Number Field Is Empty`)
              }


});




function success(details){

  // console.log(details);

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
                                        status  : 150,
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

                                  let todays = new Date();
                                  let dates = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                                  let times = String(todays.getHours()).padStart(2, '0')+':'+String(todays.getMinutes()).padStart(2, '0')+':'+String(todays.getSeconds()).padStart(2, '0');                  

                                  // console.log("data saved", data);

                                  $.ajax({
                                      url : `${[test[0].url]}/remark/add`,
                                      type : 'POST',
                                      data : JSON.stringify({

                                          gate_number: $("#gate_number").html(),
                                          remark : "SUCCESSFULLY UPDATED FROM UNLOAD",
                                          status  : 150,
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


                                  if($("#weight").val() !="" && +$("#weight").val() > +$("#actual_weight").val())
                                  {
                                    $.ajax({
                                        url : `${[test[0].url]}/remark/add`,
                                        type : 'POST',
                                        data : JSON.stringify({
  
                                            gate_number: $("#gate_number").html(),
                                            remark : `TOTAL WEIGHT/QUANTITY :- ${$("#weight").val()} , SHORT WEIGHT/QUANTITY :- ${+$("#weight").val() - +$("#actual_weight").val()}`,
                                            status  : 150,
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
                                  }

                                  




              object_put.vehicle_nbr = $("#vehicle_nbr").val();
              object_put.vendorname = $("#vendorname").val();
              object_put.material_type = $("#material_type").val();
              object_put.weight = $("#weight").val();
              object_put.gate_number = $("#gate_number").html();
              object_put.po_number = $("#po_number").val();
              object_put.po_type = $("#po_type").val();
              object_put.vendor_code = $("#vendor_code").val();
              object_put.storeId = $("#storeId").val();
              object_put.unitName = $("#unitname").val();
              try {
                object_put.invoice_date = $("#invoice_date").val().split("-").reverse().join("-");
              } catch (error) {
                
              }
              
              object_put.invoice_number = $("#invoice_number").val();
              object_put.amount = $("#amount").val();
              object_put.workOrderNumber = $("#workOrderNumber").val();
              object_put.deliveryChallanNumber = $("#deliveryChallanNumber").val();
              object_put.error_message = null;
              object_put.status = {code : 200}
              object_put.details = details

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
                  
                                      // $.sendEmail(data.data, "Store",convertedFile);

                                      $.dynamicMailSender("Store" , $("#gate_number").html())
                  
                                      const swalWithBootstrapButtons = Swal.mixin({
                                        customClass: {
                                          confirmButton: "btn btn-success",
                                        },
                                        buttonsStyling: false,
                                      });
                  
                                      swalWithBootstrapButtons
                                        .fire({
                                          title: `${$("#gate_number").html()} Updated To Store`,
                                          icon: "success",
                                          confirmButtonText: "OK",
                                          reverseButtons: true,
                                        })
                                        .then((result) => {
                                          window.open("../template/exception.jsp", "_self");
                                        });
                  
                                    } else {
                  
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
                  
                                    }else{
                  
                                      $.errorMessage(xhr.responseJSON.message);
                    
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





function errorStatus(objects) {




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
                      status  : 150,
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

                let todays = new Date();
                let dates = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                let times = String(todays.getHours()).padStart(2, '0')+':'+String(todays.getMinutes()).padStart(2, '0')+':'+String(todays.getSeconds()).padStart(2, '0');                  

                // console.log("data saved", data);

                $.ajax({
                    url : `${[test[0].url]}/remark/add`,
                    type : 'POST',
                    data : JSON.stringify({

                        gate_number: $("#gate_number").html(),
                        remark : "SUCCESSFULLY UPDATED FROM UNLOAD",
                        status  : 150,
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

                if($("#weight").val() !="" && +$("#weight").val() > +$("#actual_weight").val())
                  {
                    $.ajax({
                        url : `${[test[0].url]}/remark/add`,
                        type : 'POST',
                        data : JSON.stringify({

                            gate_number: $("#gate_number").html(),
                            remark : `TOTAL WEIGHT/QUANTITY :- ${$("#weight").val()} , SHORT WEIGHT/QUANTITY :- ${+$("#weight").val() - +$("#actual_weight").val()}`,
                            status  : 150,
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
                  }




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

                                  $.ajax({
                                    url: `${[test[0].url]}/gate/put?id=${objects.id}`,
                                    type: "PUT",
                                    data: JSON.stringify(objects),
                                    headers: {
                                      "Accept": "application/json",
                                      "Content-Type": "application/json",
                                      'Authorization': 'Bearer ' + token,
                                    },
                                
                                    success: function (data, status, xhr) {
                                      console.log(xhr);
                                      if (xhr.status == 200) {
                                
                                        // $.sendEmail(data.data, "Error",convertedFile);

                                        $.dynamicMailSender("Error" , $("#gate_number").html())

                                        setTimeout(() => {
                                          window.open("../template/exception.jsp", "_self");
                                        }, 500);
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
                                
                                        console.log(xhr);
                                            $.errorMessage(xhr.responseJSON.message);z
                                      }
                                      else{
                                
                                        console.log(xhr);
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

      if(data.data != null)
      {
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

$("#cancel1").click((e) => {
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





$("#reject_invoice").click((e)=>{

      e.preventDefault();

      object_put.is_reserved = "N";
      console.log("object_data : ", object_put.is_reserved);

      if($("textarea").val().length != 0)
      {

        let today = new Date();
        let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
        let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');


        $.ajax({
            url : `${[test[0].url]}/remark/add`,
            type : 'POST',
            data : JSON.stringify({

                gate_number: $("#gate_number").html(),
                remark : $("textarea").val().toUpperCase(),
                status  : 150,
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

            }
          })
          
          
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

                  object_put.status = {code : 1000};

                  $.ajax({
                    url: `${[test[0].url]}/gate/put?id=${object_put.id}`,
                    type: "PUT",
                    data: JSON.stringify(object_put),
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + token,
                    },
                
                    success: function (data, status, xhr) {
                      console.log(xhr);
                      if (xhr.status == 200) {
                
                        // $.sendEmail(data.data, "Error", convertedFile);

                        $.dynamicMailSender("Error" , $("#gate_number").html())
                        setTimeout(() => {
                          window.open("../template/exception.jsp", "_self");
                        }, 500);
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
                
                        console.log(xhr);
                            $.errorMessage(xhr.responseJSON.message);
                      }
                      else{
                
                        console.log(xhr);
                            $.errorMessage(xhr.responseJSON.error)
                      }
                    },
                  });

                  // window.open("../template/exception.jsp", "_self");
                    
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
        $.errorMessage("Please Add Remark")
      }

})
});
