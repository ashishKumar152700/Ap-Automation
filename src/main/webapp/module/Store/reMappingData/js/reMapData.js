$(document).ready(() => {

 
  const token = JSON.parse(localStorage.getItem("token"));
  var req_body =  JSON.parse(sessionStorage.getItem("object"));
  console.log(req_body);
  let temp_invoice_date = req_body.invoice_date;
// Create a temporary copy of the original request body
  const temp_req_body = { ...req_body };
  let total_weight=0
  let details_body=req_body.details




  let gate_id = req_body.id;
  let gate_number = req_body.gate_number;

  $("#gate_number").html(req_body.gate_number)

  for (let i = 0; i < $(".check").length; i++) {
    const element = $(".check")[i];
    if (req_body[`${$(element).attr("id")}`]) {
        let out = req_body[`${$(element).attr("id")}`];
        var pattern = /^[\W_]+|[\W_]+$/g;
        var result = out.replace(pattern, '');
        $(element).val(result);
    }
}


    for (let i = 0; i < req_body.details.length; i++) {
                      
  
           $("#tab_logic_body").append(`<tr>


           <td><input type="checkbox" class="form-control fixed_checkbox dtl_fields text-center"></td>
           <td><input type="text" id="Item_Code" class="form-control dtl_fields item_code text-center check" readonly value="${req_body.details[i].item_code}" ></td>
           <td><input type="text" id="Item_Code" class="form-control dtl_fields item_uom text-center check" readonly value="${req_body.details[i].uom}" ></td>
           <td><input type="text" id="Quantity" class="form-control dtl_fields quantity text-center check" readonly value="${req_body.details[i].quantity}"></td>
           <td><input type="text" id="Unit_Rate" class="form-control dtl_fields unit_amount text-center check" readonly value="${req_body.details[i].unit_amount}"></td>
           <td><input type="text" id="Line_Amount" class="form-control dtl_fields amount text-center check" readonly value="${req_body.details[i].amount}"></td>
           <td class="d-none"><input id="lineId" type="text" class="form-control dtl_fields  text-center check" readonly value="${req_body.details[i].id}"></td>
           <td class="d-flex justify-content-center align-content-center minus-box-td mt-1"><span class="minus-box delete_rowId delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
           
           
           </tr>`);
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
    }


// ---Add row 
  $("#add_row").click(()=>{
    $("#tab_logic_body").append(`<tr>
    <td><input type="checkbox" class="form-control fixed_checkbox dtl_fields text-center"></td>
    <td><input id="Item_Code" type="text" class="form-control dtl_fields item_code text-center check" readonly value="" ></td>
    <td><input id="Item_Code" type="text" class="form-control dtl_fields item_uom text-center check" readonly value="" ></td>
    <td><input id="Quantity" type="text" class="form-control dtl_fields quantity text-center check" readonly value=""></td>
    <td><input id="Unit_Rate" type="text" class="form-control dtl_fields unit_amount text-center check" readonly value=""></td>
    <td><input id="Line_Amount" type="text" class="form-control dtl_fields amount text-center check" readonly value=""></td>
    <td class="d-none"><input id="lineId" type="text" class="form-control dtl_fields text-center check" readonly value=""></td>
    <td class="d-flex justify-content-center align-content-center minus-box-td mt-1"><span class="minus-box delete_rowId delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
  </tr>`);
})

$("#tab_logic_body").on("click" , ".delete_rowId", function(){


  let rowId = $(this).parent().parent().children(':eq(-2)').children().map((index,value)=> value.value)[0] ; 
  // Find the last row in the table body and remove it

  let deleteThis = this


  console.log('delete this row ---->' , deleteThis);

  console.log("row id" , rowId != "");

        if(rowId != ""){``

            swal({
              title: "",
              text: "Do you want to delete Existing the detail",
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
            }).then((value) => {
              if (value) {

                console.log('row id  ---->' ,rowId);
                $.ajax({
                  url : `${[test[0].url]}/gate/details/delete/${rowId}`,
                  type : "delete",
                  headers: {
                    'Authorization': 'Bearer ' + token,
                  },
                  success : function(data, status , xhr)
                  {
                    if(xhr.status ==  200)
                    {
                      swal( "","Successfully Updated","success")

                      req_body.details = req_body.details.filter((value)=> value.id != rowId)
                      $(deleteThis).parent().parent().remove()
                    }
                    else{
                      $.errorMessage("error")
                    }
                  },
                  error : function(xhr)
                  {
                    console.log(xhr);
                  }
                })
              } else {
                
              }
            });
          
          // })
        }
        else{
          $(deleteThis).parent().parent().remove()
          // $("#tab_logic_body tr:last").remove();
        }

});

$('#tab_logic').on('click', '.fixed_checkbox', function() {
  var $checkboxes = $('.fixed_checkbox');
  $checkboxes.not(this).prop('checked', false);
});

$('#convert').click(function() {
  var checkedCheckboxes = $('.fixed_checkbox:checked');
  if (checkedCheckboxes.length === 0) {
    $.errorMessage(`Please select at least one checkbox`)
    return;
  }

  var rowData = [];
  checkedCheckboxes.each(function() {
    var $row = $(this).closest('tr');


    if($row.find('.item_uom').val() != 'null' && $row.find('.item_uom').val() != "")
    {
      $.ajax({
        url : `${[test[0].url]}/dualUOM/get?fromUnit=${$row.find('.item_uom').val()}`,
        headers: {
              'Authorization': 'Bearer ' + token,
            },
        success: function (data, status, xhr) {
                if(xhr.status == 200) 
                {
  
  
                  console.log('ts value  ---->' ,data);
  
                  if(data.data.length != 0){
  
                    data.data.map((value)=>{
                        console.log('yess ---->' , value.conversionFactor);
                        $row.find('.unit_amount').val(($row.find('.unit_amount').val() / value.conversionFactor).toFixed(5));
                        $row.find('.quantity').val($row.find('.quantity').val() * value.conversionFactor)
                        $row.find('.item_uom').val(value.toUnit)
                        $("#weight").val($row.find('.quantity').val())
                    })
                  }
                  else{
                    $.errorMessage(`UOM Not Present`)
                  }
  
                }
                else{
                  $.errorMessage(`${xhr.responseJSON.message}}`)
                }
            },
      })
    }
    else{
      $.errorMessage(`Please Remap UOM`);
    }




    // var rowDataItem = {
    //   column2: $row.find('.item_uom').val(),
    //   // column3: $row.find('td:eq(2)').text()
    //   // Add more data items as needed
    // };
    // rowData.push(rowDataItem);
  });

  console.log(rowData); // Here you can perform your desired action with the collected data
});




  








  $("#loader").removeClass("sk-loading");
  $("#loader").removeClass("ibox-content");
  $(".sk-spinner").addClass("d-none");

  $("#submit_invoice").click(() => {
    console.log(req_body);
    console.log(temp_req_body);

    $("#loader").addClass("ibox-content")
    $("#loader").addClass("sk-loading")
    $("#sk-spinner").removeClass("d-none")

    // Function to find changed keys
function findChangedKeys(original, modified) {
  const changedKeys = [];

  for (const key in original) {
    if (original.hasOwnProperty(key) && modified.hasOwnProperty(key)) {
      if (original[key] != modified[key]) {
        changedKeys.push(key);
      }
    }
  }

  return changedKeys;
}

// Find the changed keys
const changedKeys = findChangedKeys(temp_req_body, req_body);
console.log(changedKeys);
    
   // Initialize an empty object


// Iterate through all inputs with the class "input_size"
$(".input_size").each(function () {
  // Get the input's ID and value
  let input = $(this).attr("id");
  let inputValue = $(this).val();

  // Add the key-value pair to the object
  if (input == "weight" || input == "amount" ||  input == "taxable_value") {
    let out = inputValue.replace(/[^\d.]/g, "");
    req_body[`${input}`] = out;
  }else if(input == "invoice_number"){
    let out = inputValue.replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, '');
    req_body[`${input}`] = out;
  }else{
    req_body[`${input}`] = inputValue;
  }
});


$("#tab_logic_body tr").each(function (index) {
  let row = $(this);

  let itemCode = row.find(".item_code").val();
  let quantity = row.find(".quantity").val();
  let unitRate = row.find(".unit_amount").val();
  let amount = row.find(".amount").val();


    // Check if the index exists in req_body.details
    if (index < req_body.details.length) {
      // Update the values in the existing req_body.details[index]
      req_body.details[index].item_code = itemCode;
      let temp_qty =  quantity.replace(/[^\d.]/g, "");
      req_body.details[index].quantity =temp_qty;
      // req_body.details[index].actualRecievedQuantity =temp_qty;
      let temp_ur =  unitRate.replace(/[^\d.]/g, "");
      req_body.details[index].unit_amount = temp_ur
      let temp_amt =  amount.replace(/[^\d.]/g, "");
      req_body.details[index].amount = temp_amt
      // You can also update other properties from req_body.details as needed
    } else {
      // If the index doesn't exist, create a new object for it
      let detailObject = {
        item_code: itemCode  || "",
        quantity: quantity || "",
        unit_amount: unitRate || "",
        amount: amount || "",
        // You can also add other properties from req_body.details as needed
      };

      req_body.details.push(detailObject);
      console.log(detailObject);
    }

});

 

console.log('req_body before date change---->' , req_body);



// for(let i=0;i<details_body.length;i++){
//   if(!isNaN(details_body[i].quantity) &&  details_body[i].quantity != null ){ 
    
//     total_weight += parseFloat(details_body[i].quantity);  
//   }
// }


// console.log(total_weight,'req_bodyreq_body');




// console.log('remap data ---->' , $remap_arr);

// return

let fd_data =  new FormData()

fd_data.append('json', JSON.stringify($remap_arr))

//getting data formate of vendor
if (temp_invoice_date != req_body.invoice_date) {
  $.ajax({
    url: `${[test[0].url]}/ocrtraining/get?supplier=${req_body.vendor_code}`,
    type: "GET",
    async:false,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    success: function (data,status,xhr) {;
      // if(xhr.status == 200)
      // {

        const formattedDate = moment(req_body.invoice_date, (data.data[0].date_format).toUpperCase()).format("YYYY-MM-DD");
        console.log(formattedDate,"formated date===============");
        req_body.invoice_date = formattedDate;
        
        
        console.log('req invoice data ---->' , req_body.invoice_date);


        $.ajax({
            url : `${[test[0].url]}/addBatchRemark`,
            type : 'POST',
            data : fd_data,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            success : function(data,status,xhr)
            {

              
                  $.ajax({
                    url: `${[test[0].url]}/gate/put?id=${gate_id}`,
                    // url: `http://192.168.0.159:8050/gate/put?id=${gate_id}`,
                    type: "PUT",
                    data: JSON.stringify(req_body),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token,
                    },
                  
                    success: function (data, status, xhr) {
                      console.log("xhr :", xhr);
                        if (xhr.status == 200) {
                            console.log(data);
                  
                  
                        $("#loader").removeClass("ibox-content")
                        $("#loader").removeClass("sk-loading")
                        $("#sk-spinner").addClass("d-none")
                  
                        swal( "","Successfully Updated","success").then(() => {
                  
                          if(req_body.status.code == 100)
                            {
                              window.open(`../../../GateEntry/gate/template/updateGate2.jsp`, "_self")
                            }
                            else if(req_body.status.code == 150)
                            {
                              window.open(`../../../GateEntry/Unloading/template/exceptionHandle.jsp`, "_self")
                            }
                            else if(req_body.status.code == 200)
                            {
                              if(req_body.transactionType == "Service_PO")
                              {
                                window.open(`../../ServiceInvoice/template/UpdateServicePO.jsp`, "_self")
                              }
                              else{
                                window.open(`../../invoice/template/addGateInvoice.jsp`, "_self")
                              }
                            } 
                            else if(req_body.status.code == 1000)
                            {
          
                              window.open(`../../ExceptionHandling/template/exceptionHandle.jsp`, "_self")
                            }
                        })
                      }},
                      error: function(err){
                        console.log(err);

                        $("#loader").removeClass("ibox-content")
                        $("#loader").removeClass("sk-loading")
                        $("#sk-spinner").addClass("d-none")
                      }
                    })

                
            },
            error: function(xhr)
            {
              console.log(xhr);

              $("#loader").removeClass("ibox-content")
              $("#loader").removeClass("sk-loading")
              $("#sk-spinner").addClass("d-none")
            }
          })
      // }
    },
  });
}
else{

  $.ajax({
    url : `${[test[0].url]}/addBatchRemark`,
    type : 'POST',
    data : fd_data,
    contentType: false,
    processData: false,
    headers: {

        'Authorization': 'Bearer ' + token,
    },
    success : function(data,status,xhr)
    {


      console.log('xhr status of batch  ---->' ,xhr ,  data);
      
          $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/gate/put?id=${gate_id}`,
            // url: `http://192.168.0.159:8050/gate/put?id=${gate_id}`,
            data: JSON.stringify(req_body),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          
            success: function (data, status, xhr) {
              console.log("xhr :", xhr);
                if (xhr.status == 200) {
                    console.log(data,"#######################################################");
          
          
                $("#loader").removeClass("ibox-content")
                $("#loader").removeClass("sk-loading")
                $("#sk-spinner").addClass("d-none")
          
                sessionStorage.setItem('object', JSON.stringify(data.data));
                swal( "","Successfully Updated","success").then(() => {
          
                  if(req_body.status.code == 100)
                  {
                    window.open(`../../../GateEntry/gate/template/updateGate2.jsp`, "_self")
                  }
                  else if(req_body.status.code == 150)
                  {
                    window.open(`../../../GateEntry/Unloading/template/exceptionHandle.jsp`, "_self")
                  }
                  else if(req_body.status.code == 200)
                  {
                    if(req_body.transactionType == "Service_PO")
                    {
                      window.open(`../../ServiceInvoice/template/UpdateServicePO.jsp`, "_self")
                    }
                    else{
                      window.open(`../../invoice/template/addGateInvoice.jsp`, "_self")
                    }
                  } 
                  else if(req_body.status.code == 1000)
                  {

                    window.open(`../../ExceptionHandling/template/exceptionHandle.jsp`, "_self")
                  }
          
                })
              }},
              error: function(err){
                console.log(err);

                $("#loader").removeClass("ibox-content")
                $("#loader").removeClass("sk-loading")
                $("#sk-spinner").addClass("d-none")
              }
            })

        
    },
    error: function(xhr)
    {
      console.log(xhr);

      $("#loader").removeClass("ibox-content")
      $("#loader").removeClass("sk-loading")
      $("#sk-spinner").addClass("d-none")
    }
  })
}











    

  });

  $("#back_invoice").click(() => {

    if(req_body.status.code == 100)
      {
        window.open(`../../../GateEntry/gate/template/updateGate2.jsp`, "_self")
      }
      else if(req_body.status.code == 150)
      {
        window.open(`../../../GateEntry/Unloading/template/exceptionHandle.jsp`, "_self")
      }
      else if(req_body.status.code == 200)
      {
        if(req_body.transactionType == "Service_PO")
        {
          window.open(`../../ServiceInvoice/template/UpdateServicePO.jsp`, "_self")
        }
        else{
          window.open(`../../invoice/template/addGateInvoice.jsp`, "_self")
        }
      } 
      else if(req_body.status.code == 1000)
      {

        window.open(`../../ExceptionHandling/template/exceptionHandle.jsp`, "_self")
      }
  });
});
