

$(document).ready(function () {
	$('#add_modal_row').click(() => {

		// console.log("yes");
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

	$("#add_roww").click(() => {


		let newRow = `<tr>
		<td class="text-center px-0"><input type="text" readonly class="form-control input_size detail_company_code text-center" id="" ></td>
		<td class="text-center px-0"><input type="text" readonly class="form-control input_size onee text-center" id="po_number"></td>
		<td class="text-center px-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-center"></td>
		<td class="text-center px-0"><input type="text" readonly class="form-control input_size line_numm text-center" id="line_number"></td>
		<td class="text-center px-0"><input type="text" readonly class="form-control input_size po_item text-center" id="item_code" ></td>
		<td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-center" id="" ></td>
		<td class="text-center px-0"><input type="text" readonly class="form-control input_size cost_rule text-center" id="" ></td>
		<td class="text-center px-0"><input type="text" readonly id="uom" class="form-control input_size currency text-center"></td>
		<td class="text-center px-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-center"></td>
		<td class="text-center px-0 d-none"><input type="text" class="form-control input_size details_statuss text-center" id=""></td>
		<td class="text-center px-0"><input type="text" readonly class="form-control input_size open_quantity text-center" id=""></td>
		<td class="text-center px-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-center"></td>
		<td class="text-center px-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-center"></td>
		<td class="text-center px-0"><input type="text" id=""  readonly class="form-control input_size Sacnned_qty text-center" id="quantity"></td>
		<td class="text-center px-0"><input type="text" id="" readonly class="form-control input_size accept_quantity check_grn text-center"></td>
		<td class="text-center px-0"><input type="text" id="" readonly class="form-control input_size short_quantity text-center"></td>
		<td class="text-center px-0"><input type="text" id="" readonly class="form-control input_size taxable_value text-center"></td>
		<td class="text-center px-0"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-center"></td>
		<td class="text-center px-0 d-none"><input type="text" id="" readonly class="form-control input_size description text-center"></td>
		<td class="text-center px-0 d-none"><input type="text" id="" readonly class="form-control input_size business_detail text-center"></td>
		</tr>`;
		$('#table-body').append(newRow);
	})



	$('#add_roww_view').click(function () {
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

	$('#remark_row').click(function () {
		let remark_newRow = `<tr>
		  <td><input type="text" readonly class="form-control input_size text-center re_username" id=""></td>
		  <td><input type="text" readonly class="form-control input_size text-center re_date" id=""></td>
		  <td><input type="text" readonly class="form-control input_size text-center re_remark" id=""></td>
		</tr>`;
		$('#remark_table_body').append(remark_newRow);
	});

	$(document).on('click', '.delete-row', function () {
		if ($(".details_statuss")[0].value != "") {
			$(this).closest('tr').remove();
		}
	});

	var i = 1;
	$("#add_row").click(function () {
		b = i - 1;

		$('#addr' + i).html($('#addr' + b).html())
		$('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
		option_list('addr' + i);
		i++;
	});

	$("#delete_row").click(function () {
		if (i > 1) {
			$("#addr" + (i - 1)).html('');
			i--;
		}
		calc();
	});

	$(".product").on('change', function () {
		option_checker(this)
	});


	$('#tab_logic tbody').on('keyup change', function () {
		calc();
	});
	$('#tax').on('keyup change', function () {
		calc_total();
	});

});

function option_checker(id) {
	var myOption = $(id).val();
	var s = 0;
	$('#tab_logic tbody tr select').each(function (index, element) {
		var myselect = $(this).val();
		if (myselect == myOption) {
			s += 1;
		}
	});
	if (s > 1) {
		alert(myOption + ' as been added already try new..')
	}
}

function option_list(id) {
	el = '#' + id;
	var myArray = ["Product 1", "Product 2", "Product 3", "Product 4"];
	var collect = '<option value="">Select Product</option>';
	for (var i = 0; i < myArray.length; i++) {
		collect += '<option value="' + myArray[i] + '">' + myArray[i] + '</option>';
	}
	$(el + " select").html(collect);
}

function calc() {
	$('#tab_logic tbody tr').each(function (i, element) {
		var html = $(this).html();

		var qty = $(this).find('.qty').val();
		var price = $(this).find('.price').val();
		$(this).find('.total').val(qty * price);

		calc_total();
	});
}


//LINE ANS GRN
function calcc() {
	$('#tab_logicc tbody tr').each(function (i, element) {
		var html = $(this).html();

		var qty = $(this).find('.qty').val();
		var price = $(this).find('.price').val();
		$(this).find('.total').val(qty * price);

	});
}
function calc_total() {
	total = 0;
	$('.total').each(function () {
		total += parseInt($(this).val());
	});
	$('#sub_total').val(total.toFixed(2));
	tax_sum = total / 100 * $('#tax').val();
	$('#tax_amount').val(tax_sum.toFixed(2));
	$('#total_amount').val((tax_sum + total).toFixed(2));
}



