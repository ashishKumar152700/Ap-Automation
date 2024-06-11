<style>
  li {
    list-style-type: none;
  }
  
</style>
<div class="row wrapper border-bottom white-bg page-heading shadow px-3 py-3 bg-white rounded" role="navigation" id="dynamic_breadcrumb">
  <div class="col-lg-4">
    <h2 id="pagename1" class="mb-0 mt-2"></h2>
    <ul class="itemss breadcrumb">
      <li class="list-item breadcrumb-item">
        <a href="/ap_automation/module/DashBoard/dashBoard/template/dashBoard.jsp">Home</a>
      </li>
    </ul>
  </div>


  <div class="col-8 d-flex justify-content-end" id="breadcrumb_items_display">

    <div class="col-lg-1"></div>

  <div class="col-lg-2 d-flex flex-column justify-content-end">
    <h5>Unit Name</h5>
    <select name="" class="form-control" id="user_unit">
    </select>
   
</div>


<div class="col-lg-2 d-flex flex-column justify-content-end">
    <h5>Store</h5>
    <select name="" class="form-control" id="unit_store">
      
    </select>
   
</div>




<div class="col-lg-2 d-flex flex-column justify-content-end">
    <h5>From</h5>
    <div class="container px-0">
        <input type="text" id="selected-date" class="form-control" placeholder="Select a date">
        <div id="inline-datepicker"></div>
      </div>
   
</div>
<div class="col-lg-2 d-flex flex-column justify-content-end">
    <h5>To</h5>
    <div class="container px-0">
        <input type="text" id="selected-date2" class="form-control" placeholder="Select a date">
        <div id="inline-datepicker2"></div>
      </div>
   
</div>
<div class="col-lg-1 d-flex align-items-end mr-4">
    
    <button type="button" id="search_invoices" class="btn btn-primary"> Search </button>
   
</div>

</div>

  
</div>

<script>

  var test = $.test();

  $("title").html() == "DashBoard" ? $("#breadcrumb_items_display").removeClass("d-none")    : $("#breadcrumb_items_display").removeClass("d-flex") ; $("#breadcrumb_items_display").addClass("d-none")
  
  // $("title").html() == "Invoice Training" ? $("#dynamic_breadcrumb").removeClass("navbar-fixed-topp")    : $("#dynamic_breadcrumb").addClass("navbar-fixed-topp")

  const user_company = JSON.parse(localStorage.getItem("comapny"));
  const user_store = JSON.parse(localStorage.getItem("store"));

  user_company.map((value)=>{
  
  $("#user_unit").append(`<option value="${value}">${value}</option>`);

})
  user_store.map((value)=>{
  
    $("#unit_store").append(`<option value="${value}">${value}</option>`);

})

$("#unit_store").append(`<option value="" selected>Select Store Id</option>`);






if($("#user_unit").val() != null){

var selectedOption = $("#user_unit").val();
console.log('Selected Option:', selectedOption);
var unitName_dash = selectedOption;
}


</script>
