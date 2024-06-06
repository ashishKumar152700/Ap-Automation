

$(document).ready(function(){
	// option_list('addr0');

	$('#add_modal_row').click(()=>{

		console.log("yes");
		let modalRow = `<tr>
		<td class="Mline_numm"></td>
		<td class="Monee"></td>
		<td class="Mpo_type"></td>
		<td class="Mpo_item"></td>
		<td class="Mdetail_company_code"></td>
		<td class="Mdetails_statuss"></td>
		<td class="Mcurrency"></td>
		<td class="Munit_cost"></td>
		<td class="Morder_quantity "></td>
		<td class="Morder_recieved "></td>
		<td class=""><input type="button" readonly id="" class="btn btn-primary modal_to_grn text-center" value="ADD"></td>
	</td>
  </tr>`

  $("#modal_table_body").append(modalRow)


	  });



	  $("#add_roww").click(()=>{


		let newRow = `<tr>

		<td class="text-center"><span class="minus-box delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-left" id="" ></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-left" id="po_number"></td>
		<td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-left"></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-left" id="line_number"></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-left" id="item_code" ></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-left" id="" ></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-left" id="" ></td>
		<td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-left"></td>
		<td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-right"></td>
		<td class="text-center p-0 d-none"><input type="text" class="form-control input_size details_statuss text-right" id=""></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-right" id=""></td>
		<td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-right"></td>
		<td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-right"></td>
		<td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-right"></td>
		<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size CGST_Amount text-center"></td>
		<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size SGST_Amount text-center"></td>
		<td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size IGST_Amount text-center"></td>
		<td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_value text-right"></td>
		<td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-right"></td>
		<td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size description text-right"></td>
		<td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size Location text-center"></td>
		<td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size business_detail text-right"></td>
		</tr>`;
		// <td class="d-flex"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Recieve</button></td>
		$('#table-body').append(newRow);
	  })



	$('#add_roww_view').click(function() {
		let newRow = `<tr>
		<td><input type="text" readonly class="form-control input_size line_numm text-right" id="line_num"></td>
		<td><input type="text" readonly class="form-control input_size onee text-right" value=""></td>
			<td><input type="text" readonly class="form-control input_size po_item text-right" ></td>
			<td><input type="text" readonly class="form-control input_size details_statuss text-right" id="details_status"></td>
			<td><input type="text" readonly id="details_gate_id" class="form-control input_size currency text-right"></td>
			<td><input type="text" id="item_code" readonly class="form-control input_size next_status text-right"></td>
			<td><input type="text" id="hsn_code" readonly class="form-control input_size last_status text-right"></td>
	  </tr>`;
		$('#table-body').append(newRow);
	  });


	$('#grn_row').click(function() {
		let grn_newRow = `<tr>
		<td><input type="text" readonly class="form-control input_size document_no text-center" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size do_ty text-center" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size business_unit_grn text-center" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size item_no text-center" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size invoice_no_grn text-center" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size glc text-center" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size quantity_recieved text-right" id="details_status"></td>
		<td><input type="text" readonly class="form-control input_size order_no text-left" id="line_num"></td>
		<td><input type="text" id="hsn_code" readonly class="form-control input_size amount_open text-right"></td>
		<td><input type="text" readonly class="form-control input_size location text-right"></td>
		<td><input type="text" readonly class="form-control input_size user_date text-right"></td>
	  </tr>`;
		$('#grn_table_body').append(grn_newRow);
	  });
	  
	//   $('#remarks_row').click(function() {
	// 	let remark_newRow = `<tr>
	// 	<td><input type="text" readonly class="form-control input_size text-left re_username" id=""></td>
	// 	<td><input type="text" readonly class="form-control input_size text-left re_date" id=""></td>
	// 	<td><input type="text" readonly class="form-control input_size text-left re_label" id=""></td>
	// 	<td><input type="text" readonly class="form-control input_size text-left re_remark" id=""></td>
	//   </tr>`;
	// 	$('#remark_table_body').append(remark_newRow);
	//   });

	  $(document).on('click', '.delete-row', function() {
		if($(".details_statuss")[0].value != "")
		{
			$(this).closest('tr').remove();
		}
	  });
	
    var i=1;
	// var l=1;
    $("#add_row").click(function()
	{b=i-1;

      	$('#addr'+i).html($('#addr'+b).html())
      	// $('#addr'+i).html($('#addr'+b+1).html()).find('.line_num').val(i+1);
      	$('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
		option_list('addr'+i);
      	i++; 
  	});

	//LINE AND GRN
    // $("#add_roww").click(function()
	// {c=l-1;

	// 	// console.log($('#addrr'+l));
    //   	$('#addrr'+l).html($('#addrr'+c).html()).find('.onee').val();
    //   	$('#tab_logicc').append('<tr id="addrr'+(l+1)+'"></tr>');
	// 	option_list('addrr'+l);
    //   	l++; 
  	// });



	
    $("#delete_row").click(function(){
    	if(i>1){
		$("#addr"+(i-1)).html('');
		i--;
		}
		calc();
	});

	//LINE AND GRN
    // $("#delete_roww").click(function(){
    // 	if(l>1){
	// 	$("#addrr"+(l-1)).html('');
	// 	l--;
	// 	}
	// 	// calcc();
	// });
	
	$(".product").on('change',function(){
	    option_checker(this)
	});
	
	
	$('#tab_logic tbody').on('keyup change',function(){
		calc();
	});
	$('#tax').on('keyup change',function(){
		calc_total();
	});

});

function option_checker(id)
{
	var myOption=$(id).val();
	var s =0;
	$('#tab_logic tbody tr select').each(function(index, element){
         var myselect = $(this).val();
		if(myselect==myOption){
			s += 1;
		}
    });
	if(s>1){
		alert(myOption+' as been added already try new..')	
	}
}

function option_list(id)
{
	el='#'+id;
	var myArray = ["Product 1", "Product 2", "Product 3", "Product 4"];
	var collect = '<option value="">Select Product</option>';
    for(var i = 0; i<myArray.length;i++){
        collect += '<option value="'+myArray[i]+'">'+myArray[i]+'</option>';
    }
    $(el+" select").html(collect);
}

function calc()
{
	$('#tab_logic tbody tr').each(function(i, element) {
		var html = $(this).html();
		
			var qty = $(this).find('.qty').val();
			var price = $(this).find('.price').val();
			$(this).find('.total').val(qty*price);
			
			calc_total();
    });
}


//LINE ANS GRN
function calcc()
{
	$('#tab_logicc tbody tr').each(function(i, element) {
		var html = $(this).html();
		
			var qty = $(this).find('.qty').val();
			var price = $(this).find('.price').val();
			$(this).find('.total').val(qty*price);
			
			// calc_total();
    });
}
function calc_total()
{
	total=0;
	$('.total').each(function() {
        total += parseInt($(this).val());
    });
	$('#sub_total').val(total.toFixed(2));
	tax_sum=total/100*$('#tax').val();
	$('#tax_amount').val(tax_sum.toFixed(2));
	$('#total_amount').val((tax_sum+total).toFixed(2));
}



