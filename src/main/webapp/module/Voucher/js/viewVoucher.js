
$(document).ready(()=>{

	const token = JSON.parse(localStorage.getItem("token"));
	let user_store = JSON.parse(localStorage.getItem("store"));
	
	$(".check").attr("readonly" , "readonly")
	
	var entity = [];
	var details = [];
	var reciept_no = []
	var Matched_item = [];
	var Matched_line_no = [];
	var obj_success;
	let grid_details_append = []
	let payload_voucher_number;
	let payload_voucher_number_details;
	var voucher_table;

	
	var test = $.test();
	var login = $.login();

	var grn_data;



$('#pointingBox').hide();

var tolerance ;

var convertedFiles;

user_store.map((value)=>{

	$("#storeId").append(`<option value="${value}">${value}</option>`);
  
  })



$.ajax({
	url: `${[test[0].url]}/tolerance/findtolerance`,
	headers: {
			'Authorization': 'Bearer ' + token,
		},
		success : function(data,status,xhr){
			
			if(xhr.status == 200)
			{
				data.data.map((value)=>{
					
					if(value.tolerance == "GRN")
					{
						tolerance = value.process
						
					}
				})
			}
			// else{

				//         $.errorMessage(xhr.responseJSON.message);
				// }
				
				
			},
		error: function (xhr) {
			if(xhr.status == 498)
			{
				$.tokenError();
			}
			// else if(xhr.status >= 400 && xhr.status < 500){

			//         $.errorMessage(xhr.responseJSON.message);
			// }
			// else{
			//         $.errorMessage(xhr.responseJSON.error)
			// }
		}
	})



	$('#filterInput').on('input', function() {
		var filterValue = $(this).val().toLowerCase(); // Get the filter value and convert to lowercase
		$('.list-group-item').each(function() {
		  var text = $(this).text().toLowerCase(); // Get the text of each list item and convert to lowercase

		  if (text.includes(filterValue)) {
			console.log(this);
			$(this).show(); // Show the list item if it matches the filter
		  } else {
			$(this).hide() // Add the filtered-out class to hide the list item
		  }
		});
	  });



		
		
		let sessionString = sessionStorage.getItem('gateid')
		var Gate_no = JSON.parse(sessionString);
		//  console.log(gate_number);
		var checkstatus = $.checkstatus(Gate_no,"ture")
		
		var gateno = sessionStorage.getItem('gateno')
		gate = JSON.parse(gateno);
		
		// console.log(gate_number);
		//  console.log(checkstatus);
		$("#gate_number").html(gate);
		console.log(gate);


		$(window).load(()=>{
			// $("#btn_panel").trigger("click");
			if($("#vender_code").val() != "" && $("#purchase_order").val() != "" && $("#purchase_type").val() != ""){
				
			}


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




			$.ajax({
				url: `${[test[0].url]}/additional/document?gate=${gate}`,
				headers: {
					'Authorization': 'Bearer ' + token,
				  },
				success : function(data,status,xhr)
				{
					if(xhr.status == 200){
						if(data.data != null)
						{
							data.data.map((value)=>{
								console.log(value.name);
								$(".list-group").append(`<li class="list-group-item">${value.name}</li>`)
							})
						}

						if($(".list-group-item").length == 0)
							{
								$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center">No Additional Document Available to preview</h2>`)
							}
							else{
								$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center"> Click on list to preview the document</h2>`)
							}
					}

					else{

							// $.errorMessage(xhr.responseJSON.message);
					}
					
				},

				error : function(xhr){

					if(xhr.status == 498)
					{
						$.tokenError();
					}
					else if(xhr.status >= 400 && xhr.status < 500){

						// $.errorMessage(xhr.responseJSON.message);
						if($(".list-group-item").length == 0)
						{
							$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center">No Additional Document Available to preview</h2>`)
						}
						else{
							$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center"> Click on list to preview the document</h2>`)
						}
					}
					else{
						// $.errorMessage(xhr.responseJSON.error)
						if($(".list-group-item").length == 0)
						{
							$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center">No Additional Document Available to preview</h2>`)
						}
						else{
							$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center"> Click on list to preview the document</h2>`)
						}
					}
					
				   
				}
			})


			$('.list-group').on('click', ".list-group-item" ,function() {
				// alert("hello")
				var itemName = $(this).text(); // Get the name of the clicked list item
				$('#selectedItemName').text(itemName); // Update the content of the selected item element


				let selected_document = $(this).text();
				var container = document.getElementById('selected-item');
				$(container).empty();
				var xhr = new XMLHttpRequest();
				xhr.open('GET', `${[test[0].url]}/additional/document?gate=${gate}&name=${selected_document}`, true);
				xhr.responseType = 'blob';
				xhr.setRequestHeader('Authorization', `Bearer ${token}`);
			  
				xhr.onload = function () {
				  if (xhr.status === 200) {
					console.log(xhr.response);
					var blob = xhr.response;
					var fileType = blob.type;
			  
					if (fileType === 'application/pdf') {
					  var url = URL.createObjectURL(blob);
			  
					  var iframe = document.createElement('iframe');
					  iframe.src = url;
					  iframe.style.width = '100%';
					  iframe.style.height = '100%';
			  
					  // Append the iframe to the container element
					  container.appendChild(iframe);
			  
					  // Clean up the temporary URL when the iframe is no longer needed
					  iframe.onload = function () {
						URL.revokeObjectURL(url);
					  };
					} else if (fileType.startsWith('image/')) {
					  var imageURL = URL.createObjectURL(blob);
			  
					  var image = document.createElement('img');
					  image.src = imageURL;
					  image.style.maxWidth = '100%';
					  image.style.height = '100%';
			  
					  // Append the image to the container element
					  container.appendChild(image);
			  
					  // Clean up the temporary URL when the image is no longer needed
					  image.onload = function () {
						URL.revokeObjectURL(imageURL);
					  };
					} else {
					  console.error('Unsupported file type: ' + fileType);
					}
				  } else {
					console.error('Request failed. Status: ' + xhr.status);
				  }
				};
			  
				xhr.onerror = function (xhr) {
					if(xhr.status == 498)
					{
						$.tokenError();
					}
				};
			  
				xhr.send();


			  });


			// $("#doc_list").change(() => {
				
			//   });


			$("#myModal17").on('hide.bs.modal', function () {
				// Clear the contents of the modal
				$("#selected-item").empty();
				if($(".list-group-item").length == 0)
				{
					$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center">No Additional Document Available to preview</h2>`)
				}
				else{
					$("#selected-item").append(`<h3 id="selectedItemName" class="align-self-center justify-center"> Click on list to preview the document</h2>`)
				}
				
				
			});

			let gate_id = $("#gate_number").html();
			
			var xhr = new XMLHttpRequest();
			xhr.open('GET', `${[test[0].url]}/file/data?gate=${gate}`, true);
			xhr.responseType = 'blob';
			xhr.setRequestHeader('Authorization', `Bearer ${token}`);
			
			
			xhr.onload = function() {
			if (xhr.status === 200) {
				console.log(xhr.response);
				var blob = xhr.response;
				var url = URL.createObjectURL(blob);

				// Set the desired file name and type
				var fileName = `${gate_id}.pdf`
				var fileType = blob.type; // You should use the appropriate MIME type
								
				// Create a File object from the Blob data
				convertedFiles = new File([blob], fileName, { type: fileType });
								
				var iframe = document.createElement('iframe');
				iframe.src = url;
				iframe.style.width = '100%';
				iframe.style.height = '100%';

				// Append the iframe to a container element
				var container = document.getElementById('pdf_receive');
				container.appendChild(iframe);

				// Clean up the temporary URL when the iframe is no longer needed
				iframe.onload = function() {
				URL.revokeObjectURL(url);
				};
			} else {
				console.error('Request failed. Status: ' + xhr.status);
			}
			};

			xhr.onerror = function(xhr) {
				if(xhr.status == 498)
				{
					$.tokenError();
				}
			};

			xhr.send();







			  







			var remark = []
			
			// $.ajax({
			//     url : `${[test[0].url]}/remarks`,
			//     // async : false,
			//     headers: {
			//         'Authorization': 'Bearer ' + token,
			//       },
			//     success: function(data,status,xhr)
			//     {
			//         if(xhr.status == 200)
			//         {
			//             data.data.map(value=>{

			//                 // console.log(value);
			//                 if(value.gate_number == $("#gate_number").html())
			//                 {
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

			//             let rem_table = $("#remark_table").dataTable({
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

			console.log("gate_number : ",Gate_no);

			let rem_table = $("#remark_table").dataTable({
				dom: '<"top">Rt<"bottom"ilp>',
				ajax: {
					url: `${[test[0].url]}/remarks?gateNumber=${gate}`,
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
				ordering: false,
				// processing : true,
				lengthMenu: [5, 10, 20, 25, 50],
			})


			
						


			})
	
	

var arr = []




let obj = {};

console.log(Gate_no , "gate number");
$.ajax({
	url : `${[test[0].url]}/gate/getAll?id=${Gate_no}`,
	type : "GET",
	// async : false,
	headers: {
		'Authorization': 'Bearer ' + token,
	  },
	success :(data,status,xhr)=>{

if(xhr.status == 200)
{

console.log(data.data[0]);

obj = data.data[0];

quality_call();

$.debitNote(obj)

for(let i = 0 ; i < $(".check").length ; i++)
{

	let check_id = $(".check")[i].getAttribute("id")
	let check_value = $(".check")[i]

	$(check_value).val(obj[`${check_id}`])

}

grid_details_append =  obj.details;

console.log(JSON.stringify(data.data[0].details))
// obj_success = data.data[0];
console.log("obj",obj);



	
payload_voucher_number = data.data[0].voucher_number
data.data[0].details.forEach((value)=> {
	if(value.voucher_number != null)
	{
		return payload_voucher_number_details = true
	}
})


	// else{
	// 	$("#back_invoice").val("Back")
	// }
	

var gate_numbers = $("#gate_number").html(data.data[0].gate_number);
var company_codes = $("#company_code").val(data.data[0].company_code);
var business_units = $("#business_unit").val(data.data[0].business_unit);
var doc_companys = $("#doc_company").val(data.data[0].doc_company);
var states = $("#state").val(data.data[0].state);
// $("#state_select_table").val(data.data[0].state);
var invoice_numbers = $("#invoice_number").val(data.data[0]?.invoice_number);
var invoice_numberss = $("#invoice_noo").val(data.data[0]?.invoice_number);
var invoice_types = $("#invoice_type").val(data.data[0].invoice_type);
var currency_codes = $("#curr_code").val(data.data[0].currency_code);
var supplier_gstins = $("#supplier_gstin").val(data.data[0].supplier_gstin);
var tds_codes = $("#tds_code").val(data.data[0].tds_code);
var vendor_codes = $("#vendor_code").val(data.data[0].vendor_code);
var invoice_dates = $("#invoice_date").val(data.data[0].invoice_date.split("-").reverse().join("-"));
var GL_dates = $("#gl_date").val(data.data[0].gl_date != null ? data.data[0].gl_date.split("-").reverse().join("-")  : (new Date()).toISOString().split('T')[0].split("-").reverse().join("-"));
var amounts = $("#amount").val(data.data[0].amount);
$("#Total_Invoice_amount").val(data.data[0].amount);
$(".amount").val(data.data[0].amount);
var sources = $("#source").val(data.data[0].source);
var physical_docs = $("#physical_doc_rec").val(data.data[0].physical_doc);
var vendornames = $("#vendor_name").val(data.data[0].vendorname);
$("#storeId").val(data.data[0].storeId)
$("#road_permit_number").val(data.data[0].roadPermitNumber);
$("#gl_date").val(data.data[0].gl_date != null ? data.data[0].gl_date.split("-").reverse().join("-")  : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-"));
$("#dc_number_head").val(data.data[0].deliveryChallanNumber);
$("#taxable_value").val(data.data[0].taxable_value)
$("#cgst_percentage").val(data.data[0].cgst_percentage)
$("#sgst_percentage").val(data.data[0].sgst_percentage)
$("#igst_percentage").val(data.data[0].igst_percentage)
$("#cess_percentage").val(data.data[0].cess_percentage)
$("#cgst_amount").val(data.data[0].cgst_amount)
$("#sgst_amount").val(data.data[0].sgst_amount)
$("#igst_amount").val(data.data[0].igst_amount)
$("#cess_amount").val(data.data[0].cess_amount)
$("#Diffrence").val(data.data[0].tax_difference)
$("#Total_Amount").val(data.data[0].tax_total_amount)
$("#dc_number_type").val(data.data[0].dc_type)
$("#port_code").val(data.data[0].port)
$("#boe_number").val(data.data[0].boe)

if (payload_voucher_number != null || payload_voucher_number_details == true) {

	// $("#voucher_body").append(`<tr><td>${payload_voucher_number}</td><td>PV</td></tr>`)
	$('#create-vc').hide()
	// voucher_table = $("#voucher_table").DataTable()

	$.voucherMatch(login , payload_voucher_number, data.data[0].vendor_code , obj)
}
else{
	$('#create-vc').hide()
	$("#data3").addClass("invisible");
}

if(data.data[0].deliveryChallanNumber == null)
{
	$("#dc_number_type").attr("disabled" , "disabled")
}

if(data.data[0].transactionType == "Service_PO")
{
    $(".scanned_code").addClass("d-none")
    $(".short_code").addClass("d-none")
    $(".Sacnned_qty").parents("td").addClass("d-none")
    $(".short_quantity").parents("td").addClass("d-none")
	$("#data_list1").addClass("d-none") 
	$("#road").addClass("d-none") 

}

$("#billto_name").val(data.data[0].billto_name) 
$("#billto_address1").val(data.data[0].billto_address1) 
$("#billto_gstin").val(data.data[0].billto_gstin) 
$("#billto_city").val(data.data[0].billto_city) 
$("#billto_state").val(data.data[0].billto_state) 
$("#billto_zipcode").val(data.data[0].billto_zipcode) 
$("#shipto_name").val(data.data[0].shipto_name) 
$("#shipto_address1").val(data.data[0].shipto_address1) 
$("#shipto_gstin").val(data.data[0].shipto_gstin) 
$("#shipto_city").val(data.data[0].shipto_city) 
$("#shipto_state").val(data.data[0].shipto_state) 
$("#shipto_zipcode").val(data.data[0].shipto_zipcode)
$("#purchase_order").val(data.data[0].po_number)
$("#purchase_type").val(data.data[0].po_type)
$("#lr_no").val(data.data[0].lr_number)
$("#lr_date").val(data.data[0].lr_date)
$("#contract_no").val(data.data[0].contract_number)
$("#contract_date").val(data.data[0].contract_date)

Matched_item.push(data.data[0].details.map((value)=> value.jdeItemCode))
Matched_line_no.push(data.data[0].details.map((value)=> value.lineNumber))

console.log("match" , Matched_item);


var gate_number = $(gate_numbers).html()
var company_code = $(company_codes).val()
var business_unit = $(business_units).val()
var doc_company = $(doc_companys).val()
var state = $(states).val()
var invoice_number = $(invoice_numbers).val()
var invoice_type = $(invoice_types).val()
var currency_code = $(currency_codes).val()
var supplier_gstin = $(supplier_gstins).val()
var tds_code = $(tds_codes).val()
var vendor_code = $(vendor_codes).val()
var invoice_date = $(invoice_dates).val()
var GL_date = $(GL_dates).val()
var amount = $(amounts).val()
var source = $(sources).val()
var physical_doc = $(physical_docs).val()
var vendorname = $(vendornames).val()

$("#fetch_btn").trigger("click")


for (let i = 0; i < data.data[0].details.length; i++) {
	// $("#add_row").trigger("click");
$("#tab_logic_body").append(`<tr>
	<td><input type="text" class="form-control input_size item_code text-center" readonly value="${data.data[0].details[i].item_code}" ></td>
	<td><input type="text" class="form-control input_size hsn_code text-center" readonly value="${data.data[0].details[i].hsn_code}"></td>
	<td><input type="text" class="form-control input_size uom text-center" readonly value="${data.data[0].details[i].uom}"></td>
	<td><input type="text" class="form-control input_size quantity text-center" readonly value="${data.data[0].details[i].quantity}"></td>
	<td><input type="text" class="form-control input_size unit_amount text-center" readonly value="${data.data[0].details[i].unit_amount}"></td>
	<td><input type="text" class="form-control input_size amount text-center" readonly value="${data.data[0].details[i].amount}"></td>
</tr>`);

}

let b = 2;

let receipt = data.data[0].details.filter((value)=> value.receipt_number)
let receipts = data.data[0].receipt_number;
console.log(receipt);

reciept_no.push(receipt)

if(receipt.length > 0 || receipts != null)
{

	// alert("entered")
	$(".fetch_check").attr("readonly" , "readonly");
	$("#reject_invoice").addClass("invisible")
	$("#invoice_noo_entry").val($("#invoice_noo").val())
	if(obj.dc_type == "Unprocessed")
	{
		$("#data_list8").removeClass("d-none");
	}
	// $("#calculate_diffrence").parent().parent().addClass("d-none")

	var d = 2;

	
	// url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.LOCN&$field=F43121.URDT&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$field=F43121.MCU&$filter=F43121.DOCO EQ 23000017&$filter=F43121.DCTO EQ ON&$filter=F43121.CNID EQ 1053/23-24&$filter=F43121.DCT EQ OV&$field=F43121.AREC&$field=F43121.VRMK&$field=F43121.CNID&$field=F43121.MATC&$filter=F43121.MCU EQ 20100`,
	
	let po_numbers = [];
	let loop_length ;

	if(obj.transactionType == "ServiceWithMaterial")
      {
        obj.details.map((value)=>po_numbers.push({po_number:value.po_number , po_type : value.po_type})) 
        
        var uniqueArray = [];
        var seen = {};
      
        $.each(po_numbers, function(index, val) {
            var key = val.po_number + '|' + val.po_type; // Concatenate both properties
            if (!(key in seen)) {
                uniqueArray.push(val);
                seen[key] = true;
            }
        });
      
        console.log("details po : ",uniqueArray);

        loop_length = uniqueArray.length;

        
      }
      else{

        loop_length  = 1;
        
      }

	
	// url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.LOCN&$field=F43121.URDT&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$field=F43121.MCU&$filter=F43121.DOCO EQ 23000017&$filter=F43121.DCTO EQ ON&$filter=F43121.CNID EQ 1053/23-24&$filter=F43121.DCT EQ OV&$field=F43121.AREC&$field=F43121.VRMK&$field=F43121.CNID&$field=F43121.MATC&$filter=F43121.MCU EQ 20100`,
	
	for( let i = 0 ; i < loop_length ; i++){
		console.log('loop counts ' , i);
	$.ajax({
	url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.LOCN&$field=F43121.GLC&$field=F43121.DGL&$field=F43121.URDT&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$filter=F43121.MATC EQ 1&$filter=F43121.MCU EQ ${$("#business_unit").val()}&$field=F43121.MCU&$filter=F43121.CNID EQ ${$("#invoice_noo").val()}&$filter=F43121.DCT EQ OV&$field=F43121.AREC&$field=F43121.VRMK&$field=F43121.CNID&$filter=F43121.DOCO EQ ${ loop_length > 1 ? uniqueArray[i].po_number : $("#purchase_order").val()}&$filter=F43121.DCTO EQ ${ loop_length > 1 ? uniqueArray[i].po_type : $("#purchase_type").val()}`,
	// type : 'POST',
	// data : JSON.stringify(grn_head),
	headers: {
			'Accept': 'application/json',
			'Content-Type':'application/json',
			"Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
		},

		success: function(data){

			console.log("grn data : ",data);

			grn_data = data.fs_DATABROWSE_F43121.data.gridData.rowset

			$("#data_list").removeClass("invisible");
			// $("#data1").trigger("click")

			// console.log(data);
			// let grn_len = $("#grn_table tr").length - 2
			let grn_rows = data.fs_DATABROWSE_F43121.data.gridData.rowset

			
			let table_rows = $("#grn_table tr").length - 2;
			
			let valid_data = $(".order_no")[0]

			// for(let j = 0 ; j < (table_rows == 0 && $(valid_data).val() == "" ? grn_rows.length -1 : grn_rows.length); j++)
			// {
			// 	$("#grn_row").trigger("click");
			// }
			
			for(let i = 0 ; i < grn_rows.length ; i++)
			{
			 

				// console.log("MATCH TYPE: ",typeof +grn_rows[i].F43121_MATC);

				// if($(valid_data).val() != null && table_rows == 0 && d  == 0){

				// // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

				// 		for(let s = 0 ; s < grn_rows.length ; s++)
				// 		{
						  
				// 			let order_no = $(".document_no")[s+1]
				// 			let item_no = $(".do_ty")[s+1]
				// 			let business_unit_grn = $(".business_unit_grn")[s+1]
				// 			let document_no = $(".item_no")[s+1]
				// 			let invoice_no_grn = $(".invoice_no_grn")[s+1]
				// 			let do_ty = $(".quantity_recieved")[s+1]
				// 			let quantity_recieved = $(".order_no")[s+1]
				// 			let amount_open = $(".amount_open")[s+1]
				// 			let location = $(".location")[s+1]
				// 			let user_date = $(".user_date")[s+1]
				// 			let glc = $(".glc")[s+1]

				// 			+grn_rows[s].F43121_MATC == 4 ? $(user_date).parent().parent().css("background-color" , "red") : "";


				// 			$(order_no).val(grn_rows[s].F43121_DOC)
				// 			$(item_no).val(grn_rows[s].F43121_DCT)
				// 			$(business_unit_grn).val(grn_rows[s].F43121_MCU.replace(/ /g,''))
				// 			$(document_no).val(grn_rows[s].F43121_LITM)
				// 			$(invoice_no_grn).val(grn_rows[s].F43121_CNID)
				// 			$(do_ty).val(grn_rows[s].F43121_UREC)
				// 			$(quantity_recieved).val(grn_rows[s].F43121_VRMK.replace(/ /g,''))
				// 			$(amount_open).val(grn_rows[s].F43121_AREC)
				// 			$(location).val(grn_rows[s].F43121_LOCN)
				// 			$(glc).val(grn_rows[s].F43121_GLC);
				// 			let inputDate = grn_rows[s].F43121_URDT;
				// 			let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
				// 			$(user_date).val(formattedDate.split("-").reverse().join("-"))
				// 			// $(user_date).val(grn_rows[s].F43121_URDT)

				// 			if(+grn_rows[s].F43121_MATC == 4)
				// 			{
				// 				$(user_date).parent().parent().children().children().css("color" , "red")

				// 			}
				// 				}

				// 		break;
				// }

				// else{

					let order_no = $(".document_no")[i]
					let item_no = $(".do_ty")[i]
					let business_unit_grn = $(".business_unit_grn")[i]
					let document_no = $(".item_no")[i]
					let invoice_no_grn = $(".invoice_no_grn")[i]
					let do_ty = $(".quantity_recieved")[i]
					let quantity_recieved = $(".order_no")[i]
					let amount_open = $(".amount_open")[i]
					let location = $(".location")[i]
					let user_date = $(".user_date")[i]
					let glc = $(".glc")[i]
					let gl_date = $(".gl_date")[i]

					
					
					
					$(order_no).val(grn_rows[i].F43121_DOC)
					$(item_no).val(grn_rows[i].F43121_DCT)
					$(business_unit_grn).val(grn_rows[i].F43121_MCU.replace(/ /g,''))
					$(document_no).val(grn_rows[i].F43121_LITM)
					$(invoice_no_grn).val(grn_rows[i].F43121_CNID)
					$(do_ty).val(grn_rows[i].F43121_UREC)
					$(quantity_recieved).val(grn_rows[i].F43121_VRMK.replace(/ /g,''))
					$(amount_open).val(grn_rows[i].F43121_AREC)
					$(location).val(grn_rows[i].F43121_LOCN)
					$(glc).val(grn_rows[i].F43121_GLC)
					let inputDate = grn_rows[i].F43121_URDT;
					let inputGLDate = grn_rows[i].F43121_DGL;
					let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
					let formattedGLDate = `${inputGLDate.substr(0, 4)}-${inputGLDate.substr(4, 2)}-${inputGLDate.substr(6, 2)}`
					$(user_date).val(formattedDate.split("-").reverse().join("-"))
					$(gl_date).val(formattedGLDate.split("-").reverse().join("-"))

					// console.log(+grn_rows[i].F43121_MATC == 4);
					if(+grn_rows[i].F43121_MATC == 4)
					{
						// $(user_date).parent().parent().css("background-color" , "red")
						$(user_date).parent().parent().children().children().css("color" , "red")

					}


					

					let grn_newRow = `<tr>
						<td><input type="text" readonly class="form-control input_size document_no text-center" id="details_status" value="${grn_rows[i].F43121_DOC}"></td>
						<td><input type="text" readonly class="form-control input_size do_ty text-center" id="details_status" value="${grn_rows[i].F43121_DCT}"></td>
						<td><input type="text" readonly class="form-control input_size business_unit_grn text-center" id="details_status" value="${grn_rows[i].F43121_MCU.replace(/ /g,'')}"></td>
						<td><input type="text" readonly class="form-control input_size item_no text-center" id="details_status" value="${grn_rows[i].F43121_LITM}"></td>
						<td><input type="text" readonly class="form-control input_size invoice_no_grn text-center" id="details_status" value="${grn_rows[i].F43121_CNID}"></td>
						<td><input type="text" readonly class="form-control input_size glc text-center" id="details_status" value="${grn_rows[i].F43121_GLC}"></td>
						<td><input type="text" readonly class="form-control input_size gl_date text-center" id="details_status" value="${formattedGLDate.split("-").reverse().join("-")}"></td>
						<td><input type="text" readonly class="form-control input_size quantity_recieved text-right" id="details_status" value="${grn_rows[i].F43121_UREC}"></td>
						<td><input type="text" readonly class="form-control input_size order_no text-left" id="line_num" value="${grn_rows[i].F43121_VRMK.replace(/ /g,'')}"></td>
						<td><input type="text" id="hsn_code" readonly class="form-control input_size amount_open text-right" value="${grn_rows[i].F43121_AREC}"></td>
						<td><input type="text" readonly class="form-control input_size location text-right" value="${grn_rows[i].F43121_LOCN}"></td>
						<td><input type="text" readonly class="form-control input_size user_date text-right" value="${formattedDate.split("-").reverse().join("-")}"></td>
					</tr>`;
						$('#grn_table_body').append(grn_newRow);

				// }


				// d = grn_rows.length == 1 ? 0 : 2;


			}
		
		},
		complete : ()=>{


			// if( k == grn_head.length - 1)
			// {
				// $("#data_list").removeClass("invisible")
				$("#create_grn").addClass("invisible")
				$("#reverse_grn").removeClass("invisible")
				// $("#col_hide").css("visibility" , "collapse");
				$("#purchase_order").attr("readonly" , "readonly")
				$("#purchase_type").attr("readonly" , "readonly")
				$('.accept_quantity').attr("readonly" , "readonly")
				setTimeout(() => {
					$(".details_statuss").attr("readonly", "readonly")
				}, 500);

				$(".check").attr("readonly" , "readonly")
			// }


			// if( k == grn_head.length-1)
			// {
				$("#loader").removeClass("sk-loading")

				let tab_head_len = $("#tab_logic tr").length - 3
				// k = 1


				for(i = 0 ; i<= tab_head_len ; i++)
					{
						let grn_order_no = $(".po")[i]
						let grn_order_type = $(".line_num")[i]
						let grn_order_company = $(".head_company")[i]
						let grn_amount = $(".details_gate_id")[i]
						let grn_total = $(".details_status")[i]
						let grn_currency = $(".currency_head")[i]
						
						let po_number = $(grn_order_no).val()
						let po_type = $(grn_order_type).val()
						let company_code = $(grn_order_company).val()
						let amount = $(grn_amount).val()
						let total = $(grn_total).val()
						let currency = $(grn_currency).val()
					   
						
						details.push({po_number,po_type,company_code,currency,total,amount})                                   
					}


					

					


			// }
		},
		error: function(xhr){
			console.log(xhr);
				// po_check = [];
				// reciept_no = []

			$("#loader").removeClass("sk-loading")
			
			

		}
	
})
// }

					let status = {code : 200}

					entity.push({gate_number,company_code,business_unit,status,doc_company,state,invoice_number,invoice_type,currency_code,supplier_gstin,tds_code,vendor_code,invoice_date,GL_date,amount,source,physical_doc,vendorname})

					// console.log(entity);
	
}



	}
	else{

		// $.errorMessage(xhr.responseJSON.message);
	}
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




function quality_call(){
	console.log('obj.gate_number ---->' ,obj.gate_number);
	var api;

	$.ajax({
	
		type: 'GET',
	
		url: `${[test[0].url]}/quality/get?gateNumber=${obj.gate_number}`,
	
		headers: {
	
			'Accept': 'application/json',
	
			'Content-Type': 'application/json',
	
			'Authorization': `Bearer ${token}`
	
		},
	
		success: function (data) {
	
			console.log("data.data",data.data);

			if(data.data.length != 0)
			{

				
				tab2 = $("#Dtable_view").DataTable({
		
					data: data.data, // Assuming data.data contains the necessary array of objects
		
					columns: [
		
						// { data: "id" },
		
						{ data: "item_code" },
		
						{ data: "description" },
		
						{ data: "received_quantity" },
		
						{ data: "accept_quantity" },
		
						{ data: "reject_quantity" },
		
						{ data: "inreview_quantity" },
		
						{ data: "branch_plant" },
		
						{ data: "document_number" },
		
						{ data: "document_type" },
		
						{ data: "from_location" },
		
						{ data: "to_location" },
		
						{ data: "remark" },
		
					],
		
					columnDefs: [
		
						{
		
							"defaultContent": "-",
		
							"targets": "_all"
		
						},
		
						{ responsivePriority: 1, targets: 0 },
		
						{ responsivePriority: -2, targets: 7 }
		
					],
		
					rowCallback: function (row, data, index) {
		
						var labelColor = ""; // This will store the color value based on the label value
		
				   
		
						// console.log("color data" , data.document_type);
		
						// Map the label value to the corresponding color value
		
						switch (data.document_type) {
		
						  case "IT":
		
							labelColor = "#28a745"; // Blue color
		
							break;
		
						  case "IR":
		
							labelColor = "#dc3545"; // Gray color
		
							break;
		
						}
		
				   
		
						// Apply the labelColor to the row text
		
						$(row).find("td").css("color", labelColor);
		
						$(row).find("button").css("color", labelColor);
		
						// $(row).find(".cancel").css("border-color", labelColor);
		
						// let back_color = $(row).find(".cancel").css("color");
		
					   
		
						// $(row).find(".cancel").hover(
		
						//     function() {
		
						//       // Code to be executed when the mouse enters the button
		
						//       $(this).css('background-color', labelColor);
		
						//       $(this).css('color', "white");
		
						//     },
		
						//     function() {
		
						//       // Code to be executed when the mouse leaves the button
		
						//       $(this).css('background-color', '');
		
						//       $(this).css('color', labelColor);
		
						//     }
		
						//   );
						api = this.api();

						console.log('row call bback' , this);
						// console.log('row call back tab' , tab2);

						

							//   setTimeout(function() {
							// 	  api.columns.adjust().draw();
							//   }, 0);
		
					},
					


		
					language: {
		
						'paginate': {
		
							'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
		
							'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
		
						}
		
					},
		
					dom: '<"top">t<"bottom"ilp>',
		
					ordering: true,
		
					lengthMenu: [5, 10, 20, 25, 50],
		
					pagingType: "simple_numbers",
		
					select: true,
		
					// Other DataTable configurations
		
				});
		
				try {
					
					tab2.column(6).visible(false);
			
					// tab1.column(1).visible(false);
			
					// tab1.column(4).visible(false);
			
					tab2.column(5).visible(false);
				} catch (error) {
					
				}
		
			}
			else{

				$("#data2").remove()

			}
	
	 
	
			// Your other success callback code here
	
		},
	
		complete: () => {
	
			// Your complete callback code here
	
		},


		
	
	});


	

}


	
// }
// catch (error) {
	
//     console.log(error);
// }

	function previewFile() {
		const file = document.querySelector('input[type=file]').files[0];
		console.log(file.name);
		let extension = file.name.split('.');
		extension = extension.reverse();

		console.log(extension[0]);
		if (extension[0] == "jpg") {
			$(".ravi").children().remove();
			$(".ravi").append(`<img class="w-100 h-100" src="" id="iframe-pdf"></img>`)
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
			$(".ravi").append(`<object data="" type="application/pdf" class="w-100 h-100"></object>`)
			const preview = document.querySelector('object');
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

	var gate;
	// var gate_number



	
	

	$('input.global_filter').on('keyup click', function () {
		filterGlobal();
	});


	var tab;
	var table;
	var comp;
	var state;

	$.fn.DataTable.ext.pager.numbers_length = 5;




	$("#business_select").click(()=>{
		tab = $("#Btable").DataTable({
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

		$("#col2_filter").val("")
		
		$("#business_search").trigger("click")
	})


	$("#business_search").click(()=>{

		$("#loader_business").addClass("ibox-content")
		$("#loader_business").addClass("sk-loading")
		$("#spin_business").removeClass("d-none")




	$.ajax ({

			type: 'GET',    
			url: `${[login[0].url]}/jderest/v2/dataservice/table/F0006?$field=F0006.MCU&$field=F0006.DL01&$filter=F0006.MCU%20EQ%20*&$limit=50`,
			// dataSrc : "fs_DATABROWSE_F0006",
			headers: {
				"Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
			},
			success : function(data) {
			//Success block  

			tab.destroy();
			$("#Business_body").empty();

					var Business = data.fs_DATABROWSE_F0006.data.gridData.rowset;
					for(let i = 0 ; i < Business.length ; i++)

					{

					$("#Business_body").append(`<tr><td>${Business[i].F0006_MCU}</td><td>${Business[i].F0006_DL01}</td></tr>`)

					}

					$("#loader_business").removeClass("ibox-content")
					$("#loader_business").removeClass("sk-loading")
					$("#spin_business").addClass("d-none")
					
				},
				
				error: function (xhr,ajaxOptions,throwError){
					
					$("#loader_business").removeClass("ibox-content")
					$("#loader_business").removeClass("sk-loading")
					$("#spin_business").addClass("d-none")

			},

			complete : ()=>{

			tab = $("#Btable").DataTable({
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

		// console.log(tab.page());
	}
	 
})

})


$('#Btable tbody').on( 'click', 'tr', function () {
	var data = tab.row( this ).data();
	var row  = $(this)[0];
	function search(data)
	{ 
		// console.log("hello");
		$("#business_unit").val(data[0] +" - "+ data[1]); 

		$(row).removeClass("selected");
	}
	
	$("#business").click(()=>{
		
		search(data);
		
	})
} );


$("#business_search").click(() => {
$('#Btable').DataTable().column(0).search(
	$('#col' + 2 + '_filter').val(),
	$('#col' + 2     + '_smart').prop('checked')
).draw();
})


$("#col2_filter").keypress((event)=> {
if (event.keyCode === 13) {
	$('#Btable').DataTable().column(0).search(
		$('#col' + 2 + '_filter').val(),
		$('#col' + 2     + '_smart').prop('checked')
	).draw();
}
});

// console.log($("#business"));




$("#vendor_select").click(()=>{
	table = $("#Vtable").DataTable({
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

	console.log("table" , table);
	table.column(2).visible(false);

	$("#col5_filter").val("")

	$("#vendor_search").trigger("click")


})



$('#export-button').click(function () {
	// Create an empty array to hold the table data
	var tableData = [];

	// Extract table headers (th data)
	var headers = [];
	$('#grn_table thead tr th').each(function () {
	  headers.push($(this).text());
	});

	console.log('headers ---->' ,headers);
	tableData.push(headers);

	// Iterate through each row in the table body
	$('#grn_table tbody tr').each(function () {
	  var rowData = [];

	  // Iterate through each input field in the row
	  $(this).find('input').each(function () {
		rowData.push($(this).val());
	  });

	  // Add the row data to the table data array
	  tableData.push(rowData);
	});
	

	// Create a Blob object containing the table data as a CSV
	var csv = tableData.map(function (row) {
	  return row.join(',');
	}).join('\n');
	var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

	// Use FileSaver.js to save the Blob as an Excel file
	saveAs(blob, `${$("#gate_number").html()}.csv`);
  });








$("#vendor_search").click(()=>{


	$("#loader_vendor").addClass("ibox-content")
	$("#loader_vendor").addClass("sk-loading")
	$("#spin_vendor").removeClass("d-none")




$.ajax ({

		type: 'GET',    

		url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX`,
		headers: {
			"Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
		},
		success : function(data) {

		var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;

			table.destroy();
			$('#Vendor_body').empty()

				for(let i = 0 ; i < supplier.length ; i++)
				{
					$("#Vendor_body").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
				}


				$("#loader_vendor").removeClass("ibox-content")
				$("#loader_vendor").removeClass("sk-loading")
				$("#spin_vendor").addClass("d-none")



		},
		error: function (xhr,ajaxOptions,throwError){

				$("#loader_vendor").removeClass("ibox-content")
				$("#loader_vendor").removeClass("sk-loading")
				$("#spin_vendor").addClass("d-none")


		//Error block
		},
		complete : ()=>{      


				table = $("#Vtable").DataTable({
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

			console.log("table" , table);
			table.column(2).visible(false);
			
		}

		})


	})

	   


		$('#Vtable tbody').on( 'click', 'tr', function () {
			var dataa= table.row(this).data();
			var roww  = $(this)[0];


			console.log(dataa[2]);
			function searchh(dataa)
			{ 
				$("#vendor_code").val(dataa[0]); 
				$("#supplier_gstin").val(dataa[2])
				$("#vendor_name").val(dataa[1]);


				$(roww).removeClass("selected");
			}
			
			$("#vendor").click(()=>{


				searchh(dataa);
				
			})
		} );


		$("#vendor_search").click(() => {
		$('#Vtable').DataTable().column(0).search(
			$('#col' + 5 + '_filter').val(),
			$('#col' + 5     + '_smart').prop('checked')
			).draw();
		})

		$("#col5_filter").keypress((event)=> {
			if (event.keyCode === 13) {
				$('#Vtable').DataTable().column(0).search(
					$('#col' + 5 + '_filter').val(),
					$('#col' + 5     + '_smart').prop('checked')
				).draw();
			}
		});



		$("#comp_select").click(()=>{
			comp = $("#comp_table").DataTable({
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
	
			$("#col1_filter").val("")
			
			$("#comp_search").trigger("click")
		})


	$("#comp_search").click(()=>{

		$("#loader_comp").addClass("ibox-content")
		$("#loader_comp").addClass("sk-loading")
		$("#spin_comp").removeClass("d-none")



		$.ajax ({

				type: 'GET',    

				url: `${[login[0].url]}/jderest/v2/dataservice/table/F0010?$field=F0010.CO&$field=F0010.NAME&$filter=F0010.CO%20EQ%20*`,
				headers: {
					"Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
				},
				success : function(data) {

					// console.log(data);

						comp.destroy();
						$("#company_body").empty();

				var company = data.fs_DATABROWSE_F0010.data.gridData.rowset;

						for(let i = 0 ; i < company.length ; i++)
						{
							$("#company_body").append(`<tr><td>${company[i].F0010_CO}</td><td>${company[i].F0010_NAME}</td></tr>`)
						}

						$("#loader_comp").removeClass("ibox-content")
						$("#loader_comp").removeClass("sk-loading")
						$("#spin_comp").addClass("d-none")
					},
				error: function (xhr,ajaxOptions,throwError){
					$("#loader_comp").removeClass("ibox-content")
					$("#loader_comp").removeClass("sk-loading")
					$("#spin_comp").addClass("d-none")
						//Error block
				},
				complete : ()=>{            
					// console.log("complete");
				comp = $("#comp_table").DataTable({
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
				}

				})

			})



				$('#comp_table tbody').on( 'click', 'tr', function () {
					var dat= comp.row( this ).data();
					var rows  = $(this)[0];

					// console.log(dat[0]);
					function searchs(dat)
					{ 
						$("#company_code").val(dat[0]  +" - "+ dat[1]); 
						// $("#vendor_name").val(dat[1]); 

						$(rows).removeClass("selected");
					}
					
					$("#company").click(()=>{

						searchs(dat);
						
					})
				} );

				$("#comp_search").click(() => {
				$('#comp_table').DataTable().column(0).search(
					$('#col' + 1 + '_filter').val(),
					$('#col' + 1     + '_smart').prop('checked')
					).draw();
				})

				$("#col1_filter").keypress((event)=> {
					if (event.keyCode === 13) {
						$('#comp_table').DataTable().column(0).search(
							$('#col' + 1 + '_filter').val(),
							$('#col' + 1     + '_smart').prop('checked')
						).draw();
					}
				});

				var state_select;


				$("#state_select").click(()=>{

					console.log("clicked");

					state_select = $("#state_table").DataTable({
						language: {
							
						'paginate': {
							
						'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
						'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
						},
														dom: '<"top">t<"bottom"ip>',
						ordering: true,
						lengthMenu : [5,10,20,25,50],
						pagingType: "simple_numbers",
						select: true,
						},
						dom: '<"top">t<"bottom"ip>',
						ordering: true,
						lengthMenu : [5,10,20,25,50],
						pagingType: "simple_numbers",
						select: true,
						});
						
						$("#col4_filter").val("")
						
						$("#state_search").trigger("click")

				})








				$("#state_search").click(()=>{


					$("#loader_state").addClass("ibox-content")
					$("#loader_state").addClass("sk-loading")
					$("#spin_state").removeClass("d-none")


				// STATE PENDENING

					$.ajax ({

							type: 'GET',    

							url: `${[login[0].url]}/jderest/v2/dataservice/table/F0005?$field=F0005.KY&$field=F0005.DL01&$filter=F0005.SY%20EQ%2000&$filter=F0005.RT%20EQ%20S`,
							headers: {
								"Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
							},
							success : function(data) {

								
								var state_row = data.fs_DATABROWSE_F0005.data.gridData.rowset;
								
								state_select.destroy();
								$("#state_body").empty();

								// console.log(data);
									for(let i = 0 ; i < state_row.length ; i++)
									{
										$("#state_body").append(`<tr><td>${state_row[i].F0005_KY}</td><td>${state_row[i].F0005_DL01}</td></tr>`)
									}
									
									$("#loader_state").removeClass("ibox-content")
									$("#loader_state").removeClass("sk-loading")
									$("#spin_state").addClass("d-none")

							},
							error: function (xhr,ajaxOptions,throwError){

								$("#loader_state").removeClass("ibox-content")
								$("#loader_state").removeClass("sk-loading")
								$("#spin_state").addClass("d-none")

							//Error block
							},
							complete : ()=>{            
								// console.log("complete");
							state_select = $("#state_table").DataTable({
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
							}

							})

						})


							$('#state_table tbody').on( 'click', 'tr', function () {
									var sData= state.row( this ).data();
									var sRow  = $(this)[0];

									// console.log(sData[0]);
									function stateSearch(sData)
									{ 
										console.log(sData);
										$("#state_select_table").val(sData[0] + " - " + sData[1]); 
										// $("#vendor_name").val(dat[1]); 

										$(sRow).removeClass("selected");
									}
									
									$("#state_btn").click(()=>{

										stateSearch(sData);
										
									})
								} );


								$("#state_search").click(() => {
								$('#state_table').DataTable().column(0).search(
									$('#col' + 4 + '_filter').val(),
									$('#col' + 4     + '_smart').prop('checked')
									).draw();
								})

								$("#col4_filter").keypress((event)=> {
									if (event.keyCode === 13) {
										$('#state_table').DataTable().column(0).search(
											$('#col' + 4 + '_filter').val(),
											$('#col' + 4     + '_smart').prop('checked')
											).draw();
									}
								});




				var match = 0;
				// var arr = []
				// var entity = [];
				var overAllCurrency = [];

				var k = 0;
				var m = 1;

				// var count = $("#tab_logicc tr").length - 2

				
				var gateNumber;

				var vehicle_nbr;
				var material_type;
				var weight;
				var in_time;
				var division;
				var remark;
				var b = 2;
				var tab_count = 0;
				var modal_table;

				

				$("#fetch_btn").click(()=>{

                    $.fetch_btn(login , obj , $("#vendor_code").val() , arr , overAllCurrency)

                })


				




			var grn_head = [];
			var reciept_details = [];
			var po_check = [];
			// var reciept_no = []
			
			// var details = [];


			var company_code;
			var doc_company ;
			var business_unit ;
			var state ;
			var invoice_number ;
			var invoice_date ;
			var invoice_type ;
			var currency_code ;
			var supplier_gstin ;
			var tds_code ;
			var vendor_code ;
			var vendorname ;
			var physical_doc ;
			var source ;
			var amount ;
			var GL_date ;

			var billto_name;
			var billto_address1;
			var billto_gstin;
			var billto_city;
			var billto_state;
			var billto_zipcode;
			var shipto_name;
			var shipto_address1;
			var shipto_gstin;
			var shipto_city;
			var shipto_state;
			var shipto_zipcode;
			var lr_no;
			var lr_date;
			var contract_no;
			var contract_date;

			// var sessionString = sessionStorage.getItem('gateid')
			// var Gate_no = JSON.parse(sessionString);
			// console.log(Gate_no);


			$("#delete_unnessary").click(()=>{
				let length_table = $("#table-body tr").length  
				
				let remove_list = []
				obj_item = [] 
				// for(let j = 0 ; j < obj.details.length ; j++)
				// {

				//     obj_item.push(obj.details[j].item_code)

				// }
				
				for(let i = 0 ; i < length_table ; i++)
				{
					console.log(Matched_item.flat(500).includes($(".po_item")[i]?.value));

					if(Matched_item.flat(500).includes($(".po_item")[i]?.value) && Matched_line_no.flat(Infinity).includes($(".line_numm")[i]?.value))
					{

						console.log($("#table-body tr")[i]);
					   
					}
					else{
						
						remove_list.push($("#table-body tr")[i])
					}
					
				}

				console.log("list " , remove_list);

				remove_list.map((value)=> value.remove())

				tab_count =  $("#table-body tr").length -1 == 0 ? 1 : 0; 
				// console.log(" length " , $("#table-body tr").length);

				for(let i = 0 ; i <  $("#table-body tr").length ; i++)
                {

                    let occ_count = 0;
                    let scanned = 0;

                    for(let j = 0 ; j < obj.details.length ; j++)
                        {
                            
                            if(obj.details[j].jdeItemCode == $(".po_item")[i].value)
                            {
                                occ_count++;
                            }
                        }

                    for(let j = 0 ; j < obj.details.length ; j++)
                    {

                        if($(".po_item")[i].value == obj.details[j].jdeItemCode)
                        {

                            // console.log(`${}obj.details[i]?.actualRecievedQuantity);
                            scanned += Number(obj.details[j]?.quantity)
                            $(".Sacnned_qty")[i].value = scanned
                            $(".accept_quantity")[i].value = obj.details[j]?.actualRecievedQuantity * occ_count
                            $(".short_quantity")[i].value = (+$(".Sacnned_qty")[i].value.split(" ")[0]) - (+$(".accept_quantity")[i].value)
                            $(".taxable_value")[i].value = obj.details[j]?.taxValue
                            $(".taxable_amount_payload")[i].value = obj.details[j]?.taxAmount
                        }
                    }

                }

					$("#Total_Amount").val()
					$("#Diffrence").val()

				// console.log(tab_count);
			})


			
			$("#modal_delete_unnessary").click(()=>{

				let modal_length_table = $("#modal_table_body tr").length
				
				let modal_remove_list = []

			
				
				for(let i = 0 ; i < modal_length_table ; i++)
				{

					if($(".Mline_numm")[i].value == "")
					{
						modal_remove_list.push($("#modal_table_body tr")[i])
					}
					
				}

				modal_remove_list.map((value)=> value.remove())

				// tab_count =  $("#table-body tr").length -1 == 0 ? 1 : 0; 

				// console.log(tab_count);
			})


			$("#table-body").on("click" , ".delete-icon" , function(){
				// Find the parent row and remove it
				

				let line_number = $(this).closest('tr').find(".line_numm").val()
				let po_item_number = $(this).closest('tr').find(".po_item").val()

				let grid_index = grid_details_append.map((value,index)=>{ 
					if(value.lineNumber == line_number  && value.item_code == po_item_number)
					{
						grid_details_append.splice(index,1)
					}

				})

				$(this).closest('tr').remove();

				console.log(grid_details_append);

				console.log("========");

				console.log(obj.details);


			});



			let target_button;
			$("#table-body").on("click" , ".recieved-row" , function(){

				if($(".details_statuss")[0].value != "")
				{
		
					target_button = this;
					$(this).attr("data-target","#myModal13")
		
					let quantity = $(this).parent().parent().children()[8];
					let po_no = $(this).parent().parent().children()[1];
					let po_type = $(this).parent().parent().children()[2];
					let order_quantity = $(this).parent().parent().children()[5];
					// console.log("childrens" , obj.details[0].quantity)
					let order_recieved = $(this).parent().parent().children()[9];
		
		
					$("#po_no_panel").val($(po_no).children().val())
					$("#po_type_panel").val($(po_type).children().val())
					$("#po_quantity_panel").val($(order_quantity).children().val())
					$("#po_recieved_panel").val($(order_recieved).children().val())
					$("#quantity_panel").val($(quantity).children().val())
					$("#scanned_quantity").val(obj.details[0].quantity)
		
		
				$(".check_sum").val("")
		
				$("#message").addClass("d-none")
		
				}
				else{
					$(this).attr("data-target" , "")
				}
		
			  })


			  $("#quantity_submit").click(()=>{

				let sum = 0;
			
				for(let i = 0 ; i < $(".check_sum").length ; i++)
				{
					sum +=  +$(".check_sum")[i].value
				}
			
				if(sum <= $("#quantity_panel").val())
				{
					$(target_button).html("Received")
					$(".close").trigger("click")
				}
				else{
					$(target_button).html("Receive")
					$("#message").removeClass("d-none")
				}
			})




		//     $("#modal_table").on("click" , ".modal_to_grn" , function(){
					
		//        let modal_value =  $(this).parent().parent().children().children()

		//        console.log($(this).val("ADDED")) 


		//        console.log(modal_value);
		//         $("#table-body").append(`<tr>
		//         <td class="py-0"><input type="text" readonly class="form-control input_size line_numm text-right" id="line_number" value="${modal_value[0].value}"></td>
		//         <td class="py-0"><input type="text" readonly class="form-control input_size onee text-right" id="po_number" value="${modal_value[1].value}"></td>
		//         <td class="py-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-right" value="${modal_value[2].value}"></td>
		//         <td class="py-0"><input type="text" readonly class="form-control input_size po_item text-right" id="item_code" value="${modal_value[3].value}" ></td>
		//         <td class="py-0"><input type="text" readonly class="form-control input_size detail_company_code text-right" id="" value="${modal_value[4].value}" ></td>
		//         <td class="py-0"><input type="text" class="form-control input_size details_statuss text-right" id="quantity" value="${modal_value[5].value}"></td>
		//         <td class="py-0"><input type="text" readonly id="uom" class="form-control input_size currency text-right" value="${modal_value[6].value}"></td>
		//         <td class="py-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-right" value="${modal_value[7].value}"></td>
		//         <td class="d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-right" value="${modal_value[8].value}"></td>
		//         <td class="d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-right" value="${modal_value[9].value}"></td>
		//     <td class="d-flex py-0"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Receive</button></td>
		//   </tr>`)

		//         let color = td_back(modal_value[4].value)

		//         // console.log(color);

		//         // console.log($(".details_statuss")[$("#table-body tr").length -1]);
		//         // console.log($("#table-body tr").length);

		//         $($(".details_statuss")[$("#table-body tr").length -1]).parent().parent().addClass(`${color}`)
		//         $($(".details_statuss")[$("#table-body tr").length -1]).parent().parent().children().children().css("background-color" ,"transparent")
		//         $($(".details_statuss")[$("#table-body tr").length -1]).parent().parent().children().children().css("border" , "none")

		//     })


		// $('#modal_table_body').on( 'click', 'tr', function () {
		//     let roww  = $(this)[0];
		//     let dataa = modal_table.row(this).data();
			
		//     console.log(modal_table.row(this).data());
		//     console.log(roww);


		//     console.log(dataa);
		//     function search_modal(dataa)
		//     { 

			   
		//         $("#table-body").append(`<tr>
		//          <td class="py-0"><input type="text" readonly class="form-control input_size line_numm text-right" id="line_number" value="${dataa[0]}"></td>
		//          <td class="py-0"><input type="text" readonly class="form-control input_size onee text-right" id="po_number" value="${dataa[1]}"></td>
		//          <td class="py-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-right" value="${dataa[2]}"></td>
		//          <td class="py-0"><input type="text" readonly class="form-control input_size po_item text-right" id="item_code" value="${dataa[3]}" ></td>
		//          <td class="py-0"><input type="text" readonly class="form-control input_size detail_company_code text-right" id="" value="${dataa[4]}" ></td>
		//          <td class="py-0"><input type="text" class="form-control input_size details_statuss text-right" id="quantity" value="${dataa[5]}"></td>
		//          <td class="py-0"><input type="text" readonly id="uom" class="form-control input_size currency text-right" value="${dataa[6]}"></td>
		//          <td class="py-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-right" value="${dataa[7]}"></td>
		//          <td class="d-none py-0"><input type="text" readonly id="" class="form-control input_size order_quantity text-right" value="${dataa[8]}"></td>
		//          <td class="d-none py-0"><input type="text" readonly id="" class="form-control input_size order_recieved text-right" value="${dataa[9]}"></td>
		//      <td class="d-flex py-0"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Receive</button></td>
		//    </tr>`)



		// //    let color =  td_back(dataa[5])
	
		// //     $(roww).addClass(`${color}`)
		// //     $(roww).children().children().css("background-color" ,"transparent")
		// //     $(roww).children().children().css("border" , "none")
		// //     $("button").removeClass(`${color}`)
		// //     $("#table-body td").css("padding-top" , "0px")
		// //     $("#table-body td").css("padding-bottom" , "0px")


		//         // $("#vendor_code").val(dataa[0]); 
		//         // $("#supplier_gstin").val(dataa[2])
		//         // $("#vendor_name").val(dataa[1]);


		//         $(roww).removeClass("selected");
		//     }
			
		//     $("#select_modal_info").click(()=>{


		//         search_modal(dataa);
				
		//     })
		// } );



		let rowws , selectedRowData;


		$('#modal_table_body').on('click', 'tr', function () {
			rowws = $(this)[0];
			selectedRowData = modal_table.row(this).data();

			// Highlight the selected row if needed
			$(rowws).addClass("selected");
		  });
		  
		  function search_modal(dataa) {
			// Function to add a row with dataa to the #table-body
			let itemcode = [];
			let lineNumber = [];
			for(let i = 0 ; i < $("#table-body tr").length ; i++)
			{
				console.log(i);
				lineNumber.push($(".line_numm")[i].value);
				itemcode.push($(".po_item")[i].value);
			}
			console.log("========");
			console.log(lineNumber);
			console.log(itemcode);
			console.log(dataa[3]);
			console.log(dataa[4]);



			console.log(lineNumber.includes(dataa[3]) == false  && itemcode.includes(dataa[4]) == false);

			if(lineNumber.includes(dataa[3]) == false && itemcode.includes(dataa[4]) == false)
			{

				console.log("data: ",dataa);




			$("#table-body").append(`<tr>
					<td class="text-center minus_box"><span class="minus-box delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
					<td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-center" id="" value="${dataa[0]}"></td>
					<td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-center" id="po_number" value="${dataa[1]}"></td>
					<td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-centert" value="${dataa[2]}"></td>
					<td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-center" id="line_number" value="${dataa[3]}"></td>
					<td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-center" id="item_code" value="${dataa[4]}"></td>
					<td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-center" id="" value="${dataa[5]}"></td>
					<td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-center" value="${dataa[6]}"></td>
					<td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-center" value="${dataa[7]}"></td>
					<td class="text-center p-0 d-none"><input type="text" readonly class="form-control input_size details_statuss text-center" id=""></td>
					<td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-center" id="" value="${dataa[9]}"></td>
					<td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-center" ></td>
					<td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-center"></td>
					<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size Sacnned_qty text-center" id="quantity" value="${$(".quantity").val()}"></td>
					<td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-center"></td>
					<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size short_quantity text-center"></td>
					<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size taxable_value text-center"></td>
					<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size taxable_amount_payload text-center"></td>
					<td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size description text-center" value="${dataa[15]}"></td>
					<td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size business_detail text-center" value="${dataa[16]}"></td>
				 </tr>`)






				

				  grid_details_append.push({
					"po_number": null,
					"po_type": null,
					"receipt_number": null,
					"company_code": dataa[0],
					"currency": null,
					"amount": null,
					"total": null,
					"weight": null,
					"item_code": dataa[4],
					"quantity":$(".quantity").val(),
					"gate_number": null,
					"unit_amount": dataa[7],
					"dtlTaxableValue": null,
					"primaryUnit": null,
					"primaryUom": null,
					"secondaryUnit": null,
					"secondaryUom": null,
					"dtlFreight": null,
					"dtlPackForwarding": null,
					"dtlInsurance": null,
					"dtlCustomDuty": null,
					"dtlOtherCharges": null,
					"dtlLoadingUnloading": null,
					"dtlHandlingCharges": null,
					"dtlDetentionCharges": null,
					"jdeItemCode": dataa[4],
					"lineNumber": dataa[3],
					"description1": null,
					"description2": null,
					"description3": null,
					"description4": null,
					"description5": null,
					"dtlAmount1": null,
					"dtlAmount2": null,
					"dtlAmount3": null,
					"dtlAmount4": null,
					"dtlAmount5": null,
					"actualRecievedQuantity": null,
					"taxValue": null,
					"taxAmount": null,
					"uom": dataa[6]
				  })

				  console.log(grid_details_append);


				//   console.log("sending data : ", obj);

				//   $.ajax({
				//     url : `${[test[0].url]}/gate/put?id=${Gate_no}`,
				//     type : "PUT",
				//     data : JSON.stringify(obj),
				//     headers: {
				//         'Accept': 'application/json',
				//         'Content-Type': 'application/json',
				//         'Authorization': 'Bearer ' + token,
				//       },
				//     success :(data,status,xhr)=>{
		
				//         if(xhr.status == 200)
				//         {
				//             console.log(data);
				//         }
				//     },
				//     error : function(xhr){
				//         console.log(xhr);
				//     }
				// })


				//  <td class="d-flex py-0"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Receive</button></td>

				 {/* <td class="py-0 px-0 text-center"><input type="text" readonly class="form-control input_size detail_company_code text-center" id="" value="${dataa[4]}" ></td>
				 <td class="py-0 px-0 text-center"><input type="text" readonly class="form-control input_size onee text-center" id="po_number" value="${dataa[1]}"></td>
				 <td class="py-0 px-0 text-center"><input type="text" readonly id="po_type" class="form-control input_size po_type text-center" value="${dataa[2]}"></td>
				 <td class="py-0 px-0 text-center"><input type="text" readonly class="form-control input_size line_numm text-center" id="line_number" value="${dataa[0]}"></td>
				 <td class="py-0 px-0 text-center"><input type="text" readonly class="form-control input_size po_item text-center" id="item_code" value="${dataa[3]}" ></td>
				 <td class="py-0 px-0 text-center"><input type="text" readonly id="uom" class="form-control input_size currency text-center" value=""></td>
				 <td class="py-0 px-0 text-center"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-center" value="${dataa[6]}"></td>
				 <td class="py-0 px-0 text-center d-none"><input type="text" readonly class="form-control input_size details_statuss text-center" id="quantity" value="${dataa[5]}"></td>
				 <td class="px-0 text-center py-0"><input type="text" readonly id="" class="form-control input_size open_quantity text-center" value="${dataa[7]}"></td>
				 <td class="d-none px-0 text-center py-0"><input type="text" readonly id="" class="form-control input_size order_recieved text-center" value="${dataa[8]}"></td>
				 <td class="text-center px-0"><input type="text" id="" readonly class="form-control input_size Sacnned_qty text-center" value="${$(".quantity").val()}"></td>
				 <td class="py-0 px-0 text-center"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-center" value=""></td>
				 <td class="py-0 px-0 text-center"><input type="text" id="" readonly class="form-control input_size short_quantity text-center" value=""></td>
				 <td class="py-0 px-0 text-center"><input type="text" id="" readonly class="form-control input_size taxable_value text-center" value=""></td>
				 <td class="py-0 px-0 text-center"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-center" value=""></td> */}
		   $(rowws).removeClass("selected");

		   let status = $(".details_statuss")[$("#table-body tr").length-1]

		   let color =  $.td_back($(".details_statuss")[$("#table-body tr").length-1].value)
	
		   $(status).parent().parent().addClass(`${color}`)
		   $(status).parent().parent().children().children().css("background-color" ,"transparent")
		   $(status).parent().parent().children().children().css("border" , "none")
		   $("button").removeClass(`${color}`)
		//    $("#table-body td").css("padding-top" , "0px")
		//    $("#table-body td").css("padding-bottom" , "0px")
		//    $(".minus_box").css("padding" , "unset")

			
		}
		else
		{

			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-sm btn-secondary mx-1',
					// cancelButton: 'btn btn-sm btn-danger mx-1'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: '',
				text: `This Line Is Already Selected`,
				icon: 'error',
				confirmButtonText: 'OK',
			}).then(()=>{
				$(rowws).removeClass("selected");
			})

			// swal("" , "This Line Is Already Selected" , "error")
		}




		  }
		  
		  $("#select_modal_info").click(() => {
			if (selectedRowData) {
			  search_modal(selectedRowData);
			  selectedRowData = null; // Reset the selected row data after appending it
			} else {
			  // Handle the case when no row is selected (optional)
			  console.log("Please select a row before clicking 'Select Modal Info'.");
			}
		  });



		  $("#myModal18").on('hide.bs.modal', function () {
			// Clear the contents of the modal
			$(rowws).removeClass("selected");
		});
	






			$("#modal_filter").keyup(function() {
				$('#modal_table').DataTable().column(3).search(
					$('#modal_filter').val(),
				).draw();
				});




			$.td_back = function(quantity){



				// for(let i = 0 ; i < obj.details.length ; i++)
				// {

					
				//     let quantity_ordered = obj.details[i].quantity
					
				//     let numbers = quantity_ordered.match(/\d+(\.\d+)?/);
					
				//     var extractedNumber = numbers ? numbers[0] : null;
					
					
				//     var givenValue = extractedNumber;
				//     var currentValue = parseFloat(quantity);
				//     var percentageDifference = Math.abs((currentValue - givenValue) / givenValue) * 100;
				//     // console.log("currentValue" , currentValue);
				//     // console.log("givenValue" , givenValue);
					
				//     if(quantity == extractedNumber)
				//     {
				//         return ""
				//     }
				//     else if (percentageDifference < tolerance) {

				//         return ""

				//     } 
				//     else {
						
				//         return ""

				//     }
				// }

			}





			



			let receipt_number_details;


			$("#table-body").on("keyup" , ".accept_quantity" ,  function(){

				let scanned_values = $(".Sacnned_qty").val().split(" ")[0]
				let arr1 = scanned_values.split(/[,]/).join("")

				$(".short_quantity").val(+arr1 - +$(".accept_quantity").val())

			})


			$("#validate_amount").click(()=>{
				let sum = 0;  
				for(let i = 0 ; i < $("#table-body tr").length ; i++)
				{
					sum = sum + (+$(".accept_quantity")[i].value);
				}

				console.log("sum" , sum);
				console.log("actual" , +obj.actualWeightQuantity);
				if(sum == +obj.actualWeightQuantity)
				{
					const swalWithBootstrapButtons = Swal.mixin({
						customClass: {
						  confirmButton: 'btn btn-sm btn-success mx-1',
						},
						buttonsStyling: false
					  })
				  
					swalWithBootstrapButtons.fire({
						title: '',
						text: "Quantity Matched",
						icon: 'success',
						confirmButtonText: 'OK',
						reverseButtons: true
					  })
				}
				else if(sum < +obj.actualWeightQuantity)
				{
					const swalWithBootstrapButtons = Swal.mixin({
						customClass: {
						  confirmButton: 'btn btn-sm btn-success mx-1',
						},
						buttonsStyling: false
					  })
				  
					swalWithBootstrapButtons.fire({
						title: '',
						text: "Quantity Is Less",
						icon: 'warning',
						confirmButtonText: 'OK',
						reverseButtons: true
					  })

				}
				else
				{
					$.errorMessage("Quantity Not Matching")
				}
			})
			




				$("#calculate_diffrence").click((e)=>{

 

 

                if($("#table-body tr").length != 0)

                {

 

                    $("#loader4").addClass("sk-loading")

                    $("#loader4").addClass("ibox-content")

                    $("#spin4").removeClass("d-none")

 

                e.preventDefault();

 

                let sum_amount = 0;

 

                let sumOfF43121_AREC=0;

 

                // console.log("(grn_table_body tr).length",$("#grn_table_body tr").length);

 

               

 

                for (const item of grn_data) {

                    if (item.hasOwnProperty("F43121_AREC")) {

                      sumOfF43121_AREC += parseFloat(item.F43121_AREC);

                    }

                  }

 

                  // Get the value of the input field with id "Total_Invoice_amount"

                    var totalInvoiceAmount = parseFloat($("#Total_Invoice_amount").val());

 

                    // Define the tolerance range

                    var tolerance1 = 1;

 

                    // Calculate the absolute difference between the input value and sumOfF43121_AREC

                    var difference1 = Math.abs(totalInvoiceAmount - sumOfF43121_AREC);

 

                    console.log(difference1);

 

                    // Check if the difference is within the tolerance range (1 to -1)

                    if (difference1 <= tolerance1) {

                        $("#create_voucher").removeClass("invisible")

                        $("#loader4").removeClass("sk-loading")

                        $("#loader4").removeClass("ibox-content")

                        $("#spin4").addClass("d-none")

                  }

                  else{

                    $.errorMessage("Invaild GRN")

                    $("#loader4").removeClass("sk-loading")

                    $("#loader4").removeClass("ibox-content")

                    $("#spin4").addClass("d-none")

                }

                 

                  console.log("Sum of F43121_AREC:", sumOfF43121_AREC);

 

                console.log("grn_data",grn_data);

 

                // for(let i = 0 ; i < $("#table-body tr").length ; i++)

                // {

 

                //     let qty = $(".Sacnned_qty")[i].value.split(".")[0]

                //     let tax_payload = {

 

 

                //         po_number: $(".onee")[i].value,

                //         po_type: $(".po_type")[i].value,

                //         po_company: $(".detail_company_code")[i].value,

                //         currency_code: $("#curr_code").val(),

                //         line_number: $(".line_numm")[i].value,

                //         quantity: qty,

                //         product_description: $(".description")[i].value

                //         // product_description: "C.B BKT 620JT WITH COATING"

                   

                //     }

                   

                //     console.log("payload :" ,tax_payload);

               

 

                //         $.ajax({

                //             url: `${[test[0].url]}/validateTax`,

                //             type : 'POST',

                //             // async : false,

                //             data : JSON.stringify(tax_payload),

                //             headers: {

                //                 'Accept': 'application/json',

                //                 'Content-Type': 'application/json',

                //                 'Authorization': 'Bearer ' + token,

                //               },

           

                //             success: function(data){

 

                //                 console.log("tax data: ", data);

 

                //                 $(".taxable_value")[i].value = data.Taxable_Amount

                //                 $(".taxable_amount_payload")[i].value = data.Tax_Amount

                //                 sum_amount = sum_amount + data.Total_Invoice_Amount

 

 

                //             },

                //             error: function(xhr){

 

                //                 $.errorMessage(xhr.responseJSON.message)

 

                //                 $("#loader4").removeClass("sk-loading")

                //                 $("#loader4").removeClass("ibox-content")

                //                 $("#spin4").addClass("d-none")

                //             },

                //             complete : ()=>{

 

                //                 if(i == $("#table-body tr").length -1)

                //                 {

 

 

                //                     $("#create_grn").removeClass("invisible")

 

                //                         for(let i = 0 ; i < $("#table-body tr").length ; i++)

                //                         {

 

                //                             for(let j = 0 ; j < obj.details.length ; j++)

                //                             {

 

                //                                 console.log("i : ", i);

                //                                 console.log("j : ", j);

                //                                 if(obj.details[j].jdeItemCode == $(".po_item")[i].value)

                //                                 {

                //                                     obj.details[j].actualRecievedQuantity = $(".accept_quantity")[i].value

                //                                     obj.details[j].taxValue = $(".taxable_value")[i].value

                //                                     obj.details[j].taxAmount = $(".taxable_amount_payload")[i].value

                //                                 }

                //                             }

 

                //                         }

 

 

 

                //                         obj.status = {code : 200};

                //                         obj.roadPermitNumber = $("#road_permit_number").val()

                //                         // obj.receipt_number = receipt_number_details;

                //                         obj.company_code = $("#company_code").val()

                //                         obj.business_unit = $("#business_unit").val()

                //                         obj.state = $("#state").val()

                //                         obj.invoice_number = $("#invoice_noo").val()

                //                         obj.invoice_date = $("#invoice_date").val()

                //                         obj.invoice_type = $("#invoice_type").val()

                //                         obj.currency_code = $("#curr_code").val()

                //                         obj.supplier_gstin = $("#supplier_gstin").val()

                //                         obj.tds_code = $("#tds_code").val()

                //                         obj.vendor_code = $("#vendor_code").val()

                //                         obj.vendorname = $("#vendor_name").val()

                //                         obj.physical_doc = $("#physical_doc_rec").val()

                //                         obj.source = $("#source").val()

                //                         obj.amount = $("#amount").val()

                //                         obj.gl_date = $("#gl_date").val()

 

 

 

                                       

 

                //                             $.ajax({

                //                                 url : `${[test[0].url]}/gate/put?id=${Gate_no}`,

                //                                 type : 'PUT',

                //                                 data : JSON.stringify(obj),

                //                                 headers: {

                //                                     'Accept': 'application/json',

                //                                     'Content-Type': 'application/json',

                //                                     'Authorization': 'Bearer ' + token,

                //                                 },

                //                                 success : (data,status,xhr)=>{

 

                //                                     if(xhr.status == 200)

                //                                     {

 

                //                                         console.log("data saved", data);

                //                                         // alert("done")

                //                                     }

                //                                     else{

 

                //                                             $.errorMessage(xhr.responseJSON.message);

                //                                     }

                                               

                //                                 },

                //                                 error : (xhr)=>{

                //                                     if(xhr.status == 498)

                //                                     {

                //                                         $.tokenError();

                //                                     }

                //                                     else if(xhr.status >= 400 && xhr.status < 500){

 

                //                                             $.errorMessage(xhr.responseJSON.message);

                //                                     }

                //                                     else{

                //                                             $.errorMessage(xhr.responseJSON.error)

                //                                     }

                //                                 }

                //                             })

 

 

 

 

                //                     $("#loader4").removeClass("sk-loading")

                //                     $("#loader4").removeClass("ibox-content")

                //                     $("#spin4").addClass("d-none")

                //                     $("#Total_Amount").val(sum_amount)

                //                     $("#Diffrence").val((+$("#amount").val().replace("," , "") - sum_amount).toFixed(2))

 

 

                //                     if($("#Diffrence").val() == 0)

                //                     {

 

                //                         $(".po_item").parent().parent().addClass("table-success")

                //                         $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")

                //                         $(".po_item").parent().parent().children().children().css("border" , "none")

 

                //                     }

                //                     else{

                //                         $.errorMessage("PO Total Amount Not Matched")

 

                //                         $(".po_item").parent().parent().addClass("table-danger")

                //                         $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")

                //                         $(".po_item").parent().parent().children().children().css("border" , "none")

                //                     }

                //                 }

 

                //             }

 

 

   

   

                //         })        

 

 

                       

                   

 

 

                // }

               

                }

                else{

                    $.errorMessage("No Grid Present In The Table to Calculate")

                }

 

            })




		   







			
			





				$("#Modal_details").click(()=>{
					$("#vendor_code_modal_map").val($("#vendor_code").val())
					$("#vendor_name_modal_map").val($("#vendor_name").val())
					$("#po_no_selected_map").val($("#purchase_order").val())
					$("#po_type_search_map").val($("#purchase_type").val())
					$("#company_code_map").val($(".head_company")[0].value)
				})

				


					$("#back_invoice").click((e) => {
						e.preventDefault();
					  
								
										  window.open("../template/voucher.jsp", "_self");
											
										
					  });

				
				
						// if(k == grn_head.length -1)
						// {
						//     $("#data1").trigger("click")
						// }

				// }


					

			// })



			// $.ajax({
			//     url : `http://103.65.20.159:8081/jderest/v3/orchestrator/ORCH_GRN`

			// })




























//     $("#fetch_btn").click(() => {

//         var [login[0].url] = $.[login[0].url]()

//         $.ajax({
//             url: `${[login[0].url]}/jderest/tokenrequest`,
//             type: "POST",
//             data: JSON.stringify({
//                 username: "GAURAV",
//                 password: "Pernod@123"
//             }),
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },

//             success: function (data) {
//                 $.ajax({
//                     url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_PurchaseOrder`,
//                     type: "POST",
//                     data: JSON.stringify({
//                         token: `${data.userInfo.token}`,
//                         order_number: $("#purchase_order").val(),
//                         order_type: $("#purchase_type").val(),
//                     }),
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },

//                     success: function (data) {

//                         // console.log(data);
//                         let count = $("#tab_logic tr").length - 3
//                         // console.log(count);

//                         var Purchase_order = $("#purchase_order").val();

//                         var supplier_number = $("#supplier_number").val()

//                         // console.log(supply_data);
//                         if (arr.includes(Purchase_order) == false && (supply_data == data.supplier || supply_data == undefined)) {
//                             for (let i = 0; i < (count == 0 ? data.po_details.length - 1 : data.po_details.length); i++)
//                             // for(let i = 0 ; i <     ; i++)
//                             {
//                                 $("#add_row").trigger("click");
//                             }

//                             for (var i = (count == 0 ? count : count + 1), j = 0; i < (count == 0 ? count + data.po_details.length : (count + 1) + data.po_details.length); i++, j++)
//                             // for(var i = 0 ; i < data.po_details.length ;  i++)
//                             {

//                                 let status = $(".details_status")[i];
//                                 let gate_id = $(".details_gate_id")[i];
//                                 let item_code = $(".item_code")[i];
//                                 let description = $(".description")[i];
//                                 let hsn_code = $(".hsn_code")[i];
//                                 let quantity = $(".quantity")[i];
//                                 let uom = $(".uom")[i];
//                                 let rate = $(".rate")[i];
//                                 let amount = $(".amount")[i];


//                                 // $(status).val(" ");
//                                 // $(gate_id).val(" ");
//                                 $(item_code).val(data.po_details[j].item_number);
//                                 $(description).val(data.po_details[j].description);
//                                 // $(hsn_code).val(" ");
//                                 $(quantity).val(data.po_details[j].quantity_ordered);
//                                 $(uom).val(data.po_details[j].uom);
//                                 $(rate).val(data.po_details[j].unit_cost);
//                                 $(amount).val(data.po_details[j].ectended_price);

//                             }


//                             match = Purchase_order;
//                             supply_data = data.supplier;
//                             arr.push(Purchase_order)
//                             // console.log(supply_data);
//                             // console.log(arr);
//                         }





//                     },

//                     error: function (xhr) {
//                         console.log(xhr);
//                     }
//                 })


//             }
//         })





//     })

// $("#tab_logic").on("click" , ".delete_row" , function(){

//     console.log("hello");

// })



	// function deleteRow(button) {
	//     var row = button.parentNode.parentNode;
	//     row.parentNode.removeChild(row);

	//     console.log($(row).parent());
		// console.log(button.parentNode.parentNode);

		// var del = .row(this).data()

	//     // updateSerialNumber();
	// }
//     function previewFile() {
//         const file = document.querySelector('input[type=file]').files[0];
//         console.log(file.name);
//         let extension = file.name.split('.');
//         extension = extension.reverse();

//         console.log(extension[0]);
//         if (extension[0] == "jpg") {
//             $(".ravi").children().remove();
//             $(".ravi").append(`<img class="w-100 h-100" src="" id="iframe-pdf"></img>`)
//             const preview = document.querySelector('img');
//             const reader = new FileReader();
//             var filename = file.name;


//             reader.addEventListener("load", function () {
//                 preview.src = reader.result;
//             }, false);

//             if (file) {
//                 reader.readAsDataURL(file);
//             }
//         } else if (extension[0] == "pdf") {
//             $(".ravi").children().remove();
//             $(".ravi").append(`<data.data data="" type="application/pdf" class="w-100 h-100"></data.data>`)
//             const preview = document.querySelector('data.data');
//             const reader = new FileReader();
//             var filename = file.name;


//             reader.addEventListener("load", function () {
//                 preview.data = reader.result;
//             }, false);

//             if (file) {
//                 reader.readAsDataURL(file);
//             }
//         }
//     }

// 
// 
	let hide = document.querySelector("#hide")
	let btn_panel = document.querySelector("#btn_panel")
	$(document).ready(() => {
		$(".image-minimalize").click(function () {
			$("#hide").toggle("hide");

			if (hide.classList.toggle("hide")) {
				$(".upload-image").css("width", "auto")
				btn_panel.value = "Show Invoice"
			}
			else {
				$(".upload-image").css("width", "900px")
				// $("#hide").addClass("d-none")
				btn_panel.value = "Hide Invoice"
			}
		});
	})
})


//     var oTable = document.querySelector('#tab_logic');
//     var reciept_details = []

//     $("#trig").click(() => {
//         $("#inputimg").trigger("click")
//     })


//     $("#invoice_form").submit((e) => {

//         var [test[0].url] = $.[test[0].url]();
//         e.preventDefault();

//         var data = [...oTable.rows].map(t => [...t.children].map(u => [...u.children].map(c => c.value)));

//         data.shift();
//         data.pop()

//         for (let i = 0; i < data.length; i++) {
//             let tab_val = data[i].flat(2).flat(2)
//             if (tab_val[2] || tab_val[2] == '') {
//                 reciept_details = []
//                     line_nummber: tab_val[1],
//                     status: tab_val[2],
//                     gate_id: tab_val[3],
//                     item_code: tab_val[4],
//                     hsn_code: tab_val[6],
//                     quantity: tab_val[7],
//                     uom: tab_val[8],
//                     rate: tab_val[9],
//                     amount: tab_val[10],
//                 })
//             }
//         }

//         var fd = new FormData();
//         var files = $('#inputimg')[0].files[0];
//         fd.append('file', files);
//         fd.append('json', JSON.stringify({
//             billto_name: $("#billto_name").val(),
//             billto_address1: $("#billto_address1").val(),
//             billto_address2: $("#billto_address2").val(),
//             billto_address3: $("#billto_address3").val(),
//             billto_gstin: $("#billto_gstin").val(),
//             billto_city: $("#billto_city").val(),
//             billto_state: $("#billto_state").val(),
//             billto_zipcode: $("#billto_zipcode").val(),

//             shipto_name: $("#shipto_name").val(),
//             shipto_address1: $("#shipto_address1").val(),
//             shipto_address2: $("#shipto_address2").val(),
//             shipto_address3: $("#shipto_address3").val(),
//             shipto_gstin: $("#shipto_gstin").val(),
//             shipto_city: $("#shipto_city").val(),
//             shipto_state: $("#shipto_state").val(),
//             shipto_zipcode: $("#shipto_zipcode").val(),

//             supplier_invoice_nbr: $("#supplier_invoice_nbr").val(),
//             supplier_date: $("#supplier_date").val(),
//             supplier_order_nbr: $("#supplier_order_nbr").val(),
//             supplier_vehicle_nbr: $("#supplier_vehicle_nbr").val(),
//             supplier_order_date: $("#supplier_order_date").val(),
//             supplier_supply_place: $("#supplier_supply_place").val(),
//             supplier_supply_date: $("#supplier_supply_date").val(),
//             supplier_supply_time: $("#supplier_supply_time").val(),
//             supplier_despatch_mode: $("#supplier_despatch_mode").val(),

//             gate_id: $("#gate_id").val(),
//             status: $("#status").val(),
//             vehicle_nbr: $("#vehicle_nbr").val(),
//             material_type: $("#material_type").val(),
//             weight: $("#weight").val(),
//             in_time: $("#in_time").val(),
//             out_time: $("#out_time").val(),
//             devision: $("#devision").val(),
//             remark: $("#remark").val(),
//             queue_id: $("#queue_id").val(),
//             reciept_details = [],.         }))

//         $.ajax({
//             url: `${[test[0].url]}/gate/entry`,
//             type: 'post',
//             data: fd,
//             contentType: false,
//             processData: false,
//             success: function (response) {
//                 console.log(response);
//                 if (response.status == 200) {

//                     window.open("invoice.jsp", "_self");
//                 }
//                 else {
//                     const swalWithBootstrapButtons = Swal.mixin({
//                         customClass: {
//                             confirmButton: 'btn btn-success',
//                         },
//                         buttonsStyling: false
//                     })
//                     swalWithBootstrapButtons.fire({
//                         title: `${response.message}`,
//                         icon: 'warning',
//                         confirmButtonText: 'OK',
//                         reverseButtons: true
//                     })

//                 }
//             },
//             error: function (xhr) {
	//                 console.log(xhr);
	//             }
	//         });
	
	//     })
	
	
	//