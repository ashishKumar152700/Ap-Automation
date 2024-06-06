
$(document).ready(function(){
	// option_list('addr0');

	$('#add_roww').click(function() {
		

		var f=$("#tab_logicc tr").length-2;
		let r=$(".fetch_check")[f].value;
		if(r==""){

		}else{
			let newRow = `<tr>
			<td>
			  <div class="input-group col p-0">
				<input type="text" class="form-control input_size fetch_check test_id" required=""
				  aria-label="Admin Theme" aria-describedby="button-addon2" readonly id="">
				<div class=" input-group-append">
				  <button type="button" id="modeldata" class="btn btn-primary select" data-toggle="modal"
					data-target="#myModal6">
					<i class="fa fa-search"></i>
				  </button>
				</div>
			  </div>
			</td>
			<td><input type="text" class="form-control input_size po text-right business_unit" required="" readonly
				id="" value=""></td>
			<td><input type="text" class="form-control input_size head_company text-right effective_Thru" readonly
				id="" required="" value=""></td>
			<td><input type="text" class="form-control input_size currency_head text-right effective_From" required="" readonly
				id="" value=""></td>
			<td><input type="text" class="form-control input_size details_status text-right description" required="" readonly
				id=""></td>
			<td><input type="text" id="" required="" readonly
				class="form-control input_size details_gate_id text-right test_Type"></td>
	
			<td><button type="button" class="btn btn-danger delete-row">Delete</button></td>
		  </tr>`;
			$('#table-body').append(newRow);
		}
	  });


	


	  $(document).on('click', '.delete-row', function() {
		let s = $("#tab_logicc tr").length - 2;
		if(s == 0){
		}
		else{
			$(this).closest('tr').remove();
		}
	  });
	
    var i=1;
	// var l=1;
    


	
    $("#delete_row").click(function(){
    	if(i>1){
		$("#addr"+(i-1)).html('');
		i--;
		}
		calc();
	});

	
	
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

