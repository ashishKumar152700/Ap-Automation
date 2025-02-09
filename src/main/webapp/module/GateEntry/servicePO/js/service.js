$(document).ready(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    $("#print_invoice").css("display", "none");
    var login = $.login();
  
    var test = $.test();
  
    var Vtable;
  
    var tags_value_HDR = [];
    var tags_value_DTL = [];
    var tags = [];
  
    let req_body = {};
    let req_body_details = {};
  
    let details_payload = [];
  
    var files;
    let loopCount = 0;
  
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
        $(".remark_1").html($("#remark").val());
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
      $(".remark_1").html($("#remark").val());
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
  
    // function for get Best fit
  
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
            obj.boundingPoly.vertices[3].x <= endX &&
            obj.boundingPoly.vertices[0].y >= startY &&
            obj.boundingPoly.vertices[3].y <= endY
        );
        // Output the filtered coordinates
  
        let out = "";
        filteredCoordinates.map((des) => {
          console.log("description :" ,des);
          out = out + des.description + " ";
        });
        // Remove spaces and special characters from start and end of the string
        out = out.replace(/^\s+|\s+$/g, "");
  
        check_data.push(out || "");
        // req_body[`${element.label}`] = out
      }
      console.log("the elemet value",template);
      console.log("the elemet ",check_data);
  
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
  
    $("#vendor_code_name").on("keypress", function (event) {
      if (event.keyCode === 13) {
        // $("#loader1").addClass("ibox-content");
        // $("#loader1").addClass("sk-loading");
        // $("#spin").removeClass("d-none");
        $("#vendor_code_name_search").trigger("click");
      }
    });
  
    $("#VendorSearch").click(()=>{
  
      Vtable = $("#Vtable").DataTable({
        language: {
          paginate: {
            previous:
              '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
            next: '<span class="next-icon"><i class="fa fa-angle-right"></i></span>',
          },
        },
        dom: '<"top">t<"bottom"ip>',
        ordering: true,
        lengthMenu: [5, 10, 20, 25, 50],
        pagingType: "simple_numbers",
        select: true,
      });
  
      $("#vendor_code_name").val("")
      $("#Vendor_Search").trigger("click")
    })
  
  
  
    $("#vendor_code_name_search").click(() => {
      let dynamic_vendor = isNaN($("#vendor_code_name").val() * 1) ? `$filter=F0101.ALPH CONTAINS ${$("#vendor_code_name").val()}` : `$filter=F0101.AN8 EQ ${$("#vendor_code_name").val()}`;
  
      console.log(dynamic_vendor);
  
      if ($("#vendor_code_name").val() != "") {
        $("#loader5").addClass("ibox-content");
        $("#loader5").addClass("sk-loading");
        $("#spin5").removeClass("d-none");
        let vendor_code = $("#vendorcode").val();
        $.ajax({
          url: `${[
            login[0].url,
          ]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&${dynamic_vendor}`,
          type: "GET",
          // async : false,
          headers: {
            Authorization:
              "Basic " +
              btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
          },
          success: function (data) {
            console.log(data);
  
            var record = data.fs_DATABROWSE_F0101.data.gridData.summary.records;
  
            $("#loader5").removeClass("ibox-content");
            $("#loader5").removeClass("sk-loading");
            $("#spin5").addClass("d-none");
  
            Vtable.destroy();
            $("#Vendor_body").empty();
  
            if (record > 0) {
              // $("#vendor_name").val(
              //     data.fs_DATABROWSE_F0101.data.gridData.rowset[0].F0101_ALPH
              // );
            
  
              let vendor_rows = data.fs_DATABROWSE_F0101.data.gridData.rowset;
  
              console.log(vendor_rows);
  
              for (let i = 0; i < vendor_rows.length; i++) {
                $("#Vendor_body").append(`<tr>
                          <td>${vendor_rows[i].F0101_AN8}</td>
                          <td>${vendor_rows[i].F0101_ALPH}</td>
                          </tr>`);
              }
  
              // $("#Vendor_Search").trigger("click");
  
              
            }
            if (record == 0) {
              swal("", "Vendor Not Present In JDE", "error").then(() => {
                $("#vendor_name").val("");
                $("#preview_img").addClass("invisible");
              });
            }
          },
          error: function (xhr) {
            console.log(xhr);
            swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(() => {
              $("#Vendor_body").empty();
              $("#vendor_name").val("");
              $("#loader5").removeClass("ibox-content");
              $("#loader5").removeClass("sk-loading");
              $("#spin5").addClass("d-none");
              $("#preview_img").addClass("invisible");
            });
          },
          complete: () => {
            Vtable = $("#Vtable").DataTable({
              language: {
                paginate: {
                  previous:
                    '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                  next: '<span class="next-icon"><i class="fa fa-angle-right"></i></span>',
                },
              },
              dom: '<"top">t<"bottom"ip>',
              ordering: true,
              lengthMenu: [5, 10, 20, 25, 50],
              pagingType: "simple_numbers",
              select: true,
            });
          },
        });
      } else {
        swal("", "Please Enter The Vendor Name OR Code ", "error");
      }
    });
  
    var dataa , roww;
  
    $("#Vtable tbody").on("click", "tr", function () {
      dataa = Vtable.row(this).data();
      roww = $(this)[0];
  
    });
    
    function searchh(dataa) {
  
      if(dataa != undefined){
  
  
      $("#vendorcode").val(dataa[0]);
      $("#vendor_name").val(dataa[1]);
      $("#vendor_code").val(dataa[0]);
      $("#vendorname").val(dataa[1]);
  
      // if (dataa) {
      //   $("#preview_img").removeClass("invisible");
      // }
  
      $(roww).removeClass("selected");
      // $("#preview_img").removeClass("invisible");
  
      $.ajax({
        url: `${[test[0].url]}/ocrtraining/get?supplier=${dataa[0]}`,
        type: "GET",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data,status,xhr) {;
          if(xhr.status == 200)
          {
            console.log(data.data);
            // data.data.map((value)=> {console.log( value.label_id.tag.description ," : startx  ", value.startx ,": starty  ", value.starty , ": endx ", value.endx , ": endy ", value.endy)});
            $("#loader1").removeClass("ibox-content");
            $("#loader1").removeClass("sk-loading");
            $("#spin").addClass("d-none");
            if (data.data == null) {
              loopCount = 1;
              $("#preview_img").removeClass("invisible");
            } else {
              loopCount = data.data.length;
              console.log(loopCount);
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
  
  
  
        }
        else{
  
          $("#loader1").removeClass("ibox-content");
          $("#loader1").removeClass("sk-loading");
          $("#spin").addClass("d-none");
  
        }
  
    }
  
    $("#Vendor_selected").click(() => {
  
  
      $("#loader1").addClass("ibox-content");
      $("#loader1").addClass("sk-loading");
      $("#spin").removeClass("d-none");
      searchh(dataa);
    });



    var po_table;


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
  

  // $("#po_no_selected").val($("#po_number").val())
  // $("#po_type_search").val($("#po_type").val())


  
  
  // $("#vendor_name_modal").val($("#vendorname").val())
  // $("#vendor_code_modal").val($("#vendor_code").val())
  
  $("#loader_po").addClass("ibox-content")
  $("#loader_po").addClass("sk-loading")
  $("#spin_po").removeClass("d-none")
  

  let po_no_value , po_type_search;

//   console.log(count);


    //   if(count == 0)
    //   {
    //     po_no_value = $("#po_no_selected").val() != "" ?  `&%24filter=F4311.OORN EQ ${$("#po_no_selected").val()}` : "";
    //     po_type_search = $("#po_type_search").val() != "" ?  `&%24filter=F4311.OCTO EQ ${$("#po_type_search").val()}` : "";
    //   }
    //   else{
        po_no_value = $("#po_no_selected").val() != "" ?  `&%24filter=F4311.DOCO EQ ${$("#po_no_selected").val()}` : "" ;
        po_type_search = $("#po_type_search").val() != "" ?  `&%24filter=F4311.DCTO EQ ${$("#po_type_search").val()}` : "" ;
    //   }
  
  

//   count++;


  // let po_no_value = $("#po_no_selected").val() != "" ?  `&%24filter=F4311.DOCO EQ ${$("#po_no_selected").val()}` : "" ;
  // let po_type_search = $("#po_type_search").val() != "" ?  `&%24filter=F4311.DCTO EQ ${$("#po_type_search").val()}` : "" ;



  let dynamic_url;
  let checkCancel = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' }).split("/").join("")

    dynamic_url =`${[login[0].url]}/jderest/v2/dataservice/table/F4311?%24field=F4311.DOCO&$filter=F4311.CNDJ GE ${checkCancel}&%24field=F4311.KCOO&%24field=F4311.DCTO&%24field=F4311.AN8&%24field=F4311.DSC1&%24field=F4311.LITM&%24filter=F4311.NXTR%20GE%20400&%24filter=F4311.CNDJ%20LE%2001011900&%24filter=F4311.LTTR%20NE%20980&%24filter=F4311.AOPN%20GE%201&%24filter=F4311.AN8%20EQ%20${$("#vendor_code").val()}${po_no_value}${po_type_search}`
  

  
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

      
          data.fs_DATABROWSE_F4311.data.gridData.rowset.map((value)=>{

          $("#po_table_body").append(`<tr><td>${value.F4311_DOCO}</td><td>${value.F4311_DCTO}</td><td>${value.F4311_KCOO}</td><td>${value.F4311_LITM}</td><td>${value.F4311_DSC1}</td></tr>`)

          })
      
      

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
        dom: '<"top">t<"bottom"ip>',
        ordering: true,
        lengthMenu : [5,10,20,25,50],
        pagingType: "simple_numbers",
        select: true,
    });



    }

    
    
    
  })
  


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








    // ---->OCR Extraction and saving to output.json<----
    // const preview = document.getElementById("preview_img");
  
    // preview.addEventListener("change", (event) => {
    //   // -----> for getting inner loop count for multiple training
  
    //   // -----> End of inner loop count
  
    //   $("#tab_logic_body").empty();
    //   $("#modal_table_details").empty();
    //   const image = event.target.files[0];
  
    //   const reader = new FileReader();
  
    //   reader.readAsDataURL(image);
  
    //   reader.addEventListener("load", () => {
    //     // Adding Modal after loading a image
  
    //     $("#wrapper")
    //       .append(`    <div class="modal inmodal fade" id="myModal11" tabindex="2" role="dialog" aria-hidden="true">
    //     <div class="modal-dialog modal-xl">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <h2><strong>&nbsp;&nbsp;&nbsp; OCR INFORMATION</strong></h2>
    //             </div>
    //             <div class="modal-body">
    //                 <div class="tabs-container">
    
    //                     <ul class="nav nav-tabs" role="tablist">
                
    //                         <li><a class="nav-link active" data-toggle="tab" href="#tab-1">OCR Data</a></li>
                
    //                         <li><a class="nav-link" data-toggle="tab" href="#tab-2">Vendor Invoice</a></li>
                
    //                     </ul>
                
    //                     <div class="tab-content">
                
    //                         <div role="tabpanel" id="tab-1" class="tab-pane active">
    //                           <div class="panel-body">
    
    //                             <div class="panel panel-primary col-md-12 px-0">
    //                                 <div class="panel-heading">
    //                                     Vendor Billed To Shipped To
    //                                 </div>
    //                                 <div class="panel-body">
    //                                     <div class="row">
        
    //                                         <div class="col-6 b-r" id="form3">
        
    //                                             <h4>Billed To</h4>
    //                                             <hr>
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Name</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="billto_name">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Address 1</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control check" required=""
    //                                                         id="billto_address1">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Address 2</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control check" required=""
    //                                                         id="billto_address2">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Address 3</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control check" required=""
    //                                                         id="billto_address3">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">GSTIN</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="billto_gstin">
    //                                                 </div>
    //                                             </div>
        
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">City</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="billto_city">
    //                                                 </div>
    //                                             </div>
        
        
        
    //                                             <div class="form-group row">
    //                                                 <label class="col-3 col-form-label">State</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="billto_state">
    //                                                 </div>
    //                                             </div>
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Zip Code</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="billto_zipcode">
    //                                                 </div>
    //                                             </div>
    //                                         </div>
        
    //                                         <div class="col-6" id="form3">
        
    //                                             <h4>Shipped To</h4>
        
    //                                             <hr>
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Name</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_name">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Address 1</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_address1">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Address 2</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_address2">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Address 3</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_address3">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">GSTIN</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_gstin">
    //                                                 </div>
    //                                             </div>
        
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">City</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_city">
    //                                                 </div>
    //                                             </div>
        
        
        
    //                                             <div class="form-group row">
        
    //                                                 <label class="col-3 col-form-label">State</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_state">
    //                                                 </div>
        
        
        
        
    //                                             </div>
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Zip Code</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="shipto_zipcode">
    //                                                 </div>
    //                                             </div>
        
    //                                         </div>
        
    //                                     </div>
        
    //                                 </div>
        
    //                             </div>
        
    //                             <div class="panel panel-primary col-md-12 px-0">
    //                                 <div class="panel-heading">
    //                                     Vendor Invoice Information
    //                                 </div>
    //                                 <div class="panel-body">
    //                                     <div class="row">
        
    //                                         <div class="col-6 b-r" id="form3">
        
    //                                             <h4></h4>
    //                                             <!-- <hr> -->
        
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Invoice no.</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="invoice_number">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">LR No.</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="lr_no">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Contract No.</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="contract_number">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Weight</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="weight">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Po Number</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="po_number">
    //                                                 </div>
    //                                             </div>
        
    //                                             <div class="input-group col pb-3 p-0 ">
    //                                                 <label class="col-3 col-form-label p-0 mr-2">EWAY
    //                                                     BILL</label>
    //                                                 <input type="text" class="form-control input_size check"
    //                                                     readonly id="eway_number">
    //                                                 <div class=" input-group-append">
    //                                                     <button type="button" class="btn btn-primary validate">
    //                                                         Validate
    //                                                     </button>
    //                                                 </div>
    //                                             </div>
        
                                                
    //                                         </div>
        
    //                                         <div class="col-6" id="form3">
        
    //                                             <h4></h4>
        
    //                                             <!-- <hr> -->
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">LR Date</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="lr_date">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Contract Date</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="contract_date">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">State</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="state">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Vehicle Number</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="vehicle_nbr">
    //                                                 </div>
    //                                             </div>
    //                                             <div class="form-group row"><label
    //                                                     class="col-3 col-form-label">Po Type</label>
    //                                                 <div class="col-9"><input type="text"
    //                                                         class="form-control input_size check" required=""
    //                                                         id="po_type">
    //                                                 </div>
    //                                             </div>
        
    //                                             <div class="input-group col p-0">
    //                                                 <label class="col-3 col-form-label p-0 mr-2">IRN
    //                                                     Number</label>
    //                                                 <input type="text" class="form-control input_size check"
    //                                                     required="" readonly id="irn_number">
    //                                                 <div class=" input-group-append">
    //                                                     <button type="button" class="btn btn-primary validate">
    //                                                         Validate
    //                                                     </button>
    //                                                 </div>
    //                                             </div>
        
    //                                         </div>
        
    //                                     </div>
        
    //                                 </div>
        
    //                             </div>
    //                             <div class="panel panel-primary col-md-12 px-0">
    //                                 <div class="panel-heading">
    //                                     Product Detail Information
    //                                 </div>
    //                                 <div class="panel-body">
    //                                     <div class="row">
        
    //                                         <table class="table table-bordered" id="tab_logic">
    //                                             <thead>
    //                                                 <tr>
    //                                                     <!-- <th class="text-center"> PO No. </th> -->
    //                                                     <th class="text-center"> Item Code </th>
    //                                                     <th class="text-center"> Hsn Code </th>
    //                                                     <th class="text-center"> UOM  </th>
    //                                                     <th class="text-center"> Qty </th>
    //                                                     <th class="text-center"> Unit Rate  </th>
    //                                                     <th class="text-center"> Amount </th>
  
    //                                                     <th class="text-center d-none"> Primary UOM </th>
    //                                                     <th class="text-center d-none"> Primary Unit </th>
    //                                                     <th class="text-center d-none"> Secondary UOM </th>
    //                                                     <th class="text-center d-none"> Secondary Unit </th>
    //                                                     <th class="text-center d-none"> Taxable Value </th>
    //                                                     <th class="text-center d-none"> Freight </th>
    //                                                     <th class="text-center d-none"> Pack Forwarding </th>
    //                                                     <th class="text-center d-none"> Insurance </th>
    //                                                     <th class="text-center d-none"> Custom Duty </th>
    //                                                     <th class="text-center d-none"> Other Charges </th>
    //                                                     <th class="text-center d-none"> Loading Unloading </th>
    //                                                     <th class="text-center d-none"> Handling Charges </th>
    //                                                     <th class="text-center d-none"> Detention Charges </th>
                                                    
  
  
    //                                                 </tr>
    //                                             </thead>
    //                                             <tbody id="tab_logic_body">
        
    //                                             </tbody>
    //                                         </table>
        
        
    //                                     </div>
        
    //                                 </div>
        
    //                             </div>
  
    //                             <div class="panel panel-primary col-md-12 px-0">
    //                             <div class="panel-heading">
    //                             TAX INFORMATION
    //                             </div>
    //                             <div class="panel-body">
    //                                 <div class="row">
                          
    //                                     <div class="col-6 b-r" id="form3">
                          
    //                                         <h4></h4>
    //                                         <!-- <hr> -->
                          
    //                                         <div class="form-group row"><label class="col-3 col-form-label">CGST RATE</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cgst_percentage" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">SGST RATE</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="sgst_percentage" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">IGST RATE</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="igst_percentage" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">CESS RATE</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cess_percentage" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">Taxable value</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="weight" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                     </div>
                          
    //                                     <div class="col-6" id="form3">
                          
    //                                         <h4></h4>
                          
    //                                         <!-- <hr> -->
    //                                         <div class="form-group row"><label class="col-3 col-form-label">CGST AMOUNT</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cgst_amount" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">SGST AMOUNT</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="sgst_amount" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">IGST AMOUNT</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="igst_amount" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">CESS AMOUNT</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="cess_amount" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                         <div class="form-group row"><label class="col-3 col-form-label">Invoice Amount</label>
    //                                             <div class="col-9"><input type="text" class="form-control input_size check" required="" id="amount" readonly="readonly">
    //                                             </div>
    //                                         </div>
    //                                     </div>
                          
    //                                 </div>
                          
    //                             </div>
                          
    //                         </div>
                                
        
        
                     
        
        
        
        
        
    //                     </div>
                
                                
                
    //                         </div>
                
    //                         <div role="tabpanel" id="tab-2" class="tab-pane">
                
    //                           <div class="panel-body d-flex justify-content-center">
    //                             <canvas id="canvas" width="800" height="600"></canvas>
            
    //                         </div>
                
    //                         </div>
                
    //                     </div>
                
                
                
                
                
    //                 </div>
    
    
    
    //             </div>
    
    //             <div class="modal-footer m-2">
    //                 <button type="button" class="btn btn-white" data-dismiss="modal" id="closeModal">Close</button>
    //                 <input type="button" class="add_info btn btn-primary py-1 col-2" data-toggle="modal"
    //                     data-target="#myModal15" id="modalCall" value="Additional Doc">
    //             </div>
    //         </div>
    //     </div>
    // </div>`);
  
    //     $("#modalCall").click(() => {
    //       $("#closeModal").trigger("click");
    //     });
  
    //     req_body = {};
    //     req_body_details = {};
    //     details_payload = [];
    //     tags = [];
  
    //     $("form")[0].reset();
    //     $("#loader").addClass("ibox-content");
    //     $("#loader").addClass("sk-loading");
    //     $("#spin1").removeClass("d-none");
    //     $("#in_time")[0].value = new Date().toLocaleTimeString();
  
    //     $(".check").attr("readonly", "readonly");
  
    //     let supplier = $("#vendorcode")[0].value;
    //     let fd = new FormData();
    //     files = $("#preview_img")[0].files[0];
  
    //     fd.append("file", files);
  
    //     // fetch("http://192.168.0.28:8888/api/ocr", {
    //     fetch(`${[test[0].url]}_vision/api/ocr`, {
    //       method: "POST",
    //       body: fd,
    //     })
    //       .then((response) => {
    //         console.log("Image uploaded successfully");
  
    //         return response.json();
    //       })
    //       .then(async (res, status, xhr) => {
    //         if (res.status != 500) {
    //           console.log(res);
    //           localStorage.setItem("ocr_output", JSON.stringify(res));
  
    //           // for fetching vehicle number and vendor name
    //           let supplier = $("#vendorcode")[0].value;
  
    //           const vertices = JSON.parse(localStorage.getItem("ocr_output"));
    //           // alert(loopCount)
  
    //           // -----> Checking all template one by one
  
    //           if (loopCount != 0) {
    //             for (let i = 1; i <= loopCount; i++) {
    //               let templateHDRData = [];
    //               let templateDTLData = [];
    //               let findData = [];
    //               let coordinates_for_labeling = [];
    //               tags_value = [];
  
    //               // fetch(`/ocrtraining/get/${supplier}`,{
    //               await fetch(
    //                 `${[
    //                   test[0].url,
    //                 ]}/ocrtraining/get?supplier=${supplier}&template=Template_${i}`,
    //                 {
    //                   headers: {
    //                     Authorization: "Bearer " + token,
    //                   },
    //                 }
    //               )
    //                 .then((data) => {
    //                   // console.log(data);
    //                   return data.json();
    //                 })
    //                 .then(async (data) => {
    //                   data.map((val) => {
    //                     const startX = +val.boundingPoly.vertices[0].x;
    //                     const startY = +val.boundingPoly.vertices[0].y;
    //                     const endX = +val.boundingPoly.vertices[1].x;
    //                     const endY = +val.boundingPoly.vertices[1].y;
  
    //                     if (val.label_type == "Header") {
    //                       if (
    //                         startX != 0 ||
    //                         startY != 0 ||
    //                         endX != 0 ||
    //                         endY != 0
    //                       ) {
    //                         templateHDRData.push(val);
    //                       }
    //                     } else if (val.label_type == "Letter Head") {
    //                       findData.push(val);
    //                     } else {
    //                       if (
    //                         startX != 0 ||
    //                         startY != 0 ||
    //                         endX != 0 ||
    //                         endY != 0
    //                       ) {
    //                         templateDTLData.push(val);
    //                       }
    //                     }
    //                   });
    //                 });
  
    //               const flag = getBestFit(findData);
    //               console.log("templateHDRData::::", templateHDRData);
    //               console.log("templateDTLData::::", templateDTLData);
    //               if (flag) {
    //                 // --> for fetching header data
    //                 console.log(i+"template number");
    //                 for (let i = 0; i < templateHDRData.length; i++) {
    //                   const element = templateHDRData[i];
  
    //                   const startX = +element.boundingPoly.vertices[0].x;
    //                   const startY = +element.boundingPoly.vertices[0].y;
    //                   const endX = +element.boundingPoly.vertices[1].x;
    //                   const endY = +element.boundingPoly.vertices[1].y;
  
    //                   const filteredCoordinates = vertices.filter(
    //                     (obj) =>
    //                       obj.boundingPoly.vertices[0].x >= startX &&
    //                       obj.boundingPoly.vertices[3].x <= endX &&
    //                       obj.boundingPoly.vertices[0].y >= startY &&
    //                       obj.boundingPoly.vertices[3].y <= endY
    //                   );
  
    //                   // Output the filtered coordinates
  
    //                   let out = "";
    //                   filteredCoordinates.map((des) => {
    //                     out = out + des.description + " ";
    //                   });
  
    //                   coordinates_for_labeling.push(filteredCoordinates);
  
    //                   // Remove spaces and special characters from start and end of the string
    //                   var pattern = /^[\W_]+|[\W_]+$/g;
    //                   var result = out.replace(pattern, "");
    //                   if (out.length != 0) {
  
    //                     console.log("element.label : " , element.label);
  
    //                     req_body[`${element.label}`] = result;
    //                   }
    //                 }
  
    //                 for (let i = 0; i < $(".fetch_check").length; i++) {
    //                   const element = $(".fetch_check")[i];
    //                   if (req_body[`${$(element).attr("id")}`]) {
    //                     let out = req_body[`${$(element).attr("id")}`];
    //                     var pattern = /^[\W_]+|[\W_]+$/g;
    //                     var result = out.replace(pattern, "");
    //                     $(element).val(result);
    //                   }
    //                 }
  
    //                 // collecting all tags for assigning
    //                 await fetch(
    //                   `${[
    //                     test[0].url,
    //                   ]}/ocrtraining/get?supplier=${supplier}&template=Template_${i}`,
    //                   {
    //                     headers: {
    //                       Authorization: "Bearer " + token,
    //                     },
    //                   }
    //                 )
    //                   .then((data) => {
    //                     // console.log(data);
    //                     return data.json();
    //                   })
    //                   .then(async (data) => {
    //                     console.log(data);
    //                     data.map((val) => {
    //                       const startX = +val.boundingPoly.vertices[0].x;
    //                       const startY = +val.boundingPoly.vertices[0].y;
    //                       const endX = +val.boundingPoly.vertices[1].x;
    //                       const endY = +val.boundingPoly.vertices[1].y;
    //                       if (val.label_type == "Header") {
    //                         if (
    //                           startX != 0 ||
    //                           startY != 0 ||
    //                           endX != 0 ||
    //                           endY != 0
    //                         ) {
    //                           tags_value_HDR.push(val);
    //                         }
    //                       } else if (val.label_type == "Details") {
    //                         if (
    //                           startX != 0 ||
    //                           startY != 0 ||
    //                           endX != 0 ||
    //                           endY != 0
    //                         ) {
    //                           tags_value_DTL.push(val);
    //                         }
    //                       }
    //                     });
    //                   });
  
    //                 console.log("tags_value_HDR ::::", tags_value_HDR);
    //                 console.log("tags_value_DTL ::::", tags_value_DTL);
    //                 console.log("HEADER REQ BODY :----", req_body);
  
    //                 // --> end of : fetching header data
  
    //                 //------------------------- --> for fetching new details data
  
    //                 for (let i = 0; i < templateDTLData.length; i++) {
    //                   const element = templateDTLData[i];
  
    //                   const startX = +element.boundingPoly.vertices[0].x;
    //                   const startY = +element.boundingPoly.vertices[0].y;
    //                   const endX = +element.boundingPoly.vertices[1].x;
    //                   const endY = +element.boundingPoly.vertices[1].y;
  
    //                   const filteredCoordinates = vertices.filter(
    //                     (obj) =>
    //                       obj.boundingPoly.vertices[0].x >= startX &&
    //                       obj.boundingPoly.vertices[3].x <= endX &&
    //                       obj.boundingPoly.vertices[0].y >= startY &&
    //                       obj.boundingPoly.vertices[3].y <= endY
    //                   );
    //                   // Output the filtered coordinates
  
    //                   let out = "";
    //                   filteredCoordinates.map((des) => {
    //                     out = out + des.description + " ";
    //                   });
    //                   coordinates_for_labeling.push(filteredCoordinates);
    //                   // Remove spaces and special characters from start and end of the string
    //                   var pattern = /^[\W_]+|[\W_]+$/g;
    //                   var result = out.replace(pattern, "");
    //                   if (out.length != 0) {
    //                     req_body_details[`${element.label}`] = result;
    //                   }
    //                 }
  
    //                 for (let i = 0; i < $(".fetch_check").length; i++) {
    //                   const element = $(".fetch_check")[i];
    //                   if (req_body_details[`${$(element).attr("id")}`]) {
    //                     $(element).val(
    //                       req_body_details[`${$(element).attr("id")}`]
    //                     );
    //                   }
    //                 }
  
    //                 tags_value_DTL.map((res) => {
    //                   if (!req_body_details[`${res.label}`]) {
    //                     tags.push({ id: res.tag_id });
    //                   }
    //                 });
  
    //                 console.log("DETAILS REQ BODY :----", req_body_details);
    //                 console.log("Tags :----", tags);
  
    //                 // -----> for getting total details in details
    //                 let itemsCount = 0;
  
    //                 for (const key in req_body_details) {
    //                   if (key.startsWith("PRODUCT_")) {
    //                     const numberPart = key.replace("PRODUCT_", "");
    //                     const itemNumber = parseInt(numberPart);
    //                     if (!isNaN(itemNumber) && itemNumber > itemsCount) {
    //                       itemsCount = itemNumber;
    //                     }
    //                   }
    //                 }
  
    //                 // -----> Logic for creating array of object for gate entry
    //                 for (let i = 1; i <= itemsCount; i++) {
    //                   const item_code = req_body_details[`PRODUCT_${i}`] || "";
    //                   const hsn_code = req_body_details[`HSN_CODE_${i}`] || "";
    //                   const uom =req_body_details[`UOM_${i}`] || "";
    //                   const quantity = req_body_details[`QUANTITY_${i}`] || "";
    //                   const unit_amount = req_body_details[`UNIT_RATE_${i}`] || "";
    //                   const amount = req_body_details[`AMOUNT_${i}`] || "";
    //                   // const cgstAmount =req_body_details[`CGST_AMOUNT_${i}`] || "";
    //                   // const cgstPercentage =req_body_details[`CGST_PERCENTAGE_${i}`] || "";
    //                   // const sgstAmount = req_body_details[`SGST_AMOUNT_${i}`] || "";
    //                   // const sgstPercentage =req_body_details[`SGST_PERCENTAGE_${i}`] || "";
    //                   // const igstAmount =req_body_details[`IGST_AMOUNT_${i}`] || "";
    //                   // const igstPercentage =req_body_details[`IGST_PERCENTAGE_${i}`] || "";
  
    //                   const primaryUom =req_body_details[`PRIMARY_UOM_${i}`] || "";
    //                   const primaryUnit =req_body_details[`PRIMARY_UNIT_${i}`] || "";
    //                   const secondaryUom =req_body_details[`SECONDARY_UOM_${i}`] || "";
    //                   const secondaryUnit =req_body_details[`SECONDARY_UNIT_${i}`] || "";
    //                   const dtlTaxableValue =req_body_details[`TAXABLE_VALUE_${i}`] || "";
    //                   const dtlFreight =req_body_details[`DTL_FREIGHT_${i}`] || "";
    //                   const dtlPackForwarding =req_body_details[`DTL_PACK_FORWARDING_${i}`] || "";
    //                   const dtlInsurance =req_body_details[`DTL_INSURANCE_${i}`] || "";
    //                   const dtlCustomDuty =req_body_details[`DTL_CUSTOM_DUTY_${i}`] || "";
    //                   const dtlOtherCharges =req_body_details[`DTL_OTHER_CHARGES_${i}`] || "";
    //                   const dtlLoadingUnloading =req_body_details[`DTL_LOADING_UNLOADING_${i}`] || "";
    //                   const dtlHandlingCharges =req_body_details[`DTL_HANDLING_CHARGES_${i}`] || "";
    //                   const dtlDetentionCharges =req_body_details[`DTL_DETENTION_CHARGES_${i}`] || "";
    //                   const taxableAmount =req_body_details[`TAXABLE_AMOUNT_${i}`] || "";
  
  
    //                   const itemObject = {
    //                     item_code,
    //                     hsn_code,
    //                     uom,
    //                     quantity,
    //                     unit_amount,
    //                     amount,
    //                     // cgstAmount,
    //                     // cgstPercentage,
    //                     // sgstAmount,
    //                     // sgstPercentage,
    //                     // igstAmount,
    //                     // igstPercentage,
  
    //                     primaryUom,
    //                     primaryUnit,
    //                     secondaryUom,
    //                     secondaryUnit,
    //                     dtlTaxableValue,
    //                     dtlFreight,
    //                     dtlPackForwarding,
    //                     dtlInsurance,
    //                     dtlCustomDuty,
    //                     dtlOtherCharges,
    //                     dtlLoadingUnloading,
    //                     dtlHandlingCharges,
    //                     dtlDetentionCharges,
    //                     taxableAmount
    //                   };
  
    //                   details_payload.push(itemObject);
    //                 }
  
    //                 console.log(
    //                   "the final detail payload: : : : ",
    //                   details_payload
    //                 );
    //                 console.log("the final  payload: : : : ", req_body);
  
    //                 //adding details in req body
    //                 req_body.details = details_payload;
  
    //                 for (let i = 0; i < $(".check").length; i++) {
    //                   const element = $(".check")[i];
    //                   if (req_body[`${$(element).attr("id")}`]) {
    //                     let out = req_body[`${$(element).attr("id")}`];
    //                     var pattern = /^[\W_]+|[\W_]+$/g;
    //                     var result = out.replace(pattern, "");
    //                     $(element).val(result);
    //                   }
    //                 }
  
    //                 for (let i = 0; i < req_body.details.length; i++) {
    //                   console.log(req_body.details.length);
  
    //                   $("#tab_logic_body").append(`<tr>
  
    //                                   <td><input type="text" class="form-control input_size item_code text-center" readonly value="${req_body.details[i].item_code}" ></td>
    //                                   <td><input type="text" class="form-control input_size hsn_code text-center" readonly value="${req_body.details[i].hsn_code}"></td>
    //                                   <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].uom}"></td>
    //                                   <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].quantity}"></td>
    //                                   <td><input type="text" class="form-control input_size unit_amount text-center" readonly value="${req_body.details[i].unit_amount}"></td>
    //                                   <td><input type="text" class="form-control input_size amount text-center" readonly value="${req_body.details[i].amount}"></td>
                                      
                                      
    //                                   </tr>`);
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].primaryUom}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].primaryUnit}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].secondaryUom}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].secondaryUnit}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlTaxableValue}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlFreight}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlPackForwarding}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlInsurance}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlCustomDuty}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlOtherCharges}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlLoadingUnloading}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlHandlingCharges}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].dtlDetentionCharges}"></td>
    //                                   // <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].taxableAmount}"></td>
  
    //                   $("#modal_table_details").append(`<tr>
    //                                 <td class="text-center border py-2 po_1" id="detail_po_no">${$(
    //                                   "#po_number"
    //                                 ).val()}</td>
    //                                 <td class="text-center border py-2 des_1" id="">${
    //                                   req_body.details[i].item_code
    //                                 }</td>
    //                                 <td class="text-center border py-2 qty_1">${
    //                                   req_body.details[i].quantity
    //                                 }</td>
    //                                 <td class="text-center border py-2 unit_1"></td>
    //                                 <td class="text-center border py-2 remark_1"></td>
    //                   </tr>`);
    //                   // const element = $(".check")[i];
    //                   // if (req_body[`${$(element).attr("id")}`]) {
    //                   //     $(element).val(req_body[`${$(element).attr("id")}`])
    //                   // }
    //                 }
  
    //                 // ---loading image for labeling
    //                 try {
    //                   fetch(`${[test[0].url]}_vision/api/getimage`)
    //                     .then((response) => response.blob())
    //                     .then((blob) => {
    //                       var reader = new FileReader();
    //                       reader.onload = function (e) {
    //                         var imageData = e.target.result;
    //                         try {
    //                           // --- for uploading image in canvas
    //                           const canvas = document.getElementById("canvas");
    //                           const ctx = canvas.getContext("2d");
  
    //                           // Load the image
    //                           const image = new Image();
    //                           image.src = imageData;
  
    //                           image.onload = function () {
    //                             // Calculate the aspect ratio of the image
    //                             const aspectRatio = image.width / image.height;
  
    //                             // Set the canvas size to fit the image while maintaining aspect ratio
    //                             const canvasWidth = 800; // You can adjust the desired width here
    //                             const canvasHeight = canvasWidth / aspectRatio;
    //                             canvas.width = canvasWidth;
    //                             canvas.height = canvasHeight;
  
    //                             // Draw the image on the canvas
    //                             ctx.drawImage(
    //                               image,
    //                               0,
    //                               0,
    //                               canvasWidth,
    //                               canvasHeight
    //                             );
  
    //                             // }, 3000);
  
    //                             coordinates_for_labeling.map((value) => {
    //                               if (value.length != 0) {
    //                                 let start_label_coordinates = value[0];
    //                                 let end_label_coordinates =
    //                                   value[value.length - 1];
  
    //                                 const startX =
    //                                   start_label_coordinates.boundingPoly
    //                                     .vertices[0].x;
    //                                 const startY =
    //                                   start_label_coordinates.boundingPoly
    //                                     .vertices[0].y;
    //                                 const endX =
    //                                   end_label_coordinates.boundingPoly
    //                                     .vertices[2].x;
    //                                 const endY =
    //                                   end_label_coordinates.boundingPoly
    //                                     .vertices[2].y;
  
    //                                 // Map the image coordinates to canvas coordinates
    //                                 const canvasX =
    //                                   (startX / image.width) * canvasWidth;
    //                                 const canvasY =
    //                                   (startY / image.height) * canvasHeight;
    //                                 const canvasWidthBox =
    //                                   (endX / image.width) * canvasWidth -
    //                                   canvasX;
    //                                 const canvasHeightBox =
    //                                   (endY / image.height) * canvasHeight -
    //                                   canvasY;
  
    //                                 // Draw the filled bounding box on the canvas using canvas coordinates
    //                                 ctx.beginPath();
    //                                 ctx.fillStyle = "rgba(134, 197, 0, 0.3)"; // Lighter yellow with 30% opacity
    //                                 ctx.fillRect(
    //                                   canvasX,
    //                                   canvasY,
    //                                   canvasWidthBox,
    //                                   canvasHeightBox
    //                                 );
    //                                 ctx.strokeStyle = "#00FF00"; // Yellow outline color
    //                                 ctx.lineWidth = 0.5; // 2 pixels line width
    //                                 ctx.strokeRect(
    //                                   canvasX,
    //                                   canvasY,
    //                                   canvasWidthBox,
    //                                   canvasHeightBox
    //                                 );
    //                                 ctx.closePath();
    //                               }
    //                             });
  
    //                             // Provide the startX, startY, endX, and endY coordinates of the bounding box in image coordinates
    //                           };
    //                         } catch (error) {
                              
    //                           // swal("", error, "warning");
    //                         }
    //                       };
    //                       reader.readAsDataURL(blob);
    //                     })
    //                     .catch((err) => console.log(err));
    //                 } catch (error) {
    //                   swal("", "JSON Response is too large.", "warning");
    //                 }
  
    //                 $("#modeldata").trigger("click");
    //                 $("#loader").removeClass("ibox-content");
    //                 $("#loader").removeClass("sk-loading");
    //                 $("#spin1").addClass("d-none");
  
    //                 break;
    //                 // --> end of : fetching new details data
    //               } else if (!flag && i == loopCount) {
    //                 swal(
    //                   "",
    //                   `No Suitable Template Found in Master`,
    //                   "error"
    //                 ).then(() => {
    //                   req_body.error_message =
    //                     "No Suitable Template Found in Master";
    //                   req_body.status = { code: 100 };
    //                   req_body.gate_number = $("#gate_number").html();
    //                   req_body.in_time = new Date().toLocaleTimeString();
  
    //                   let fd_data = new FormData();
  
    //                   fd_data.append("json", JSON.stringify(req_body));
    //                   fd_data.append("file", files);
  
    //                   errorStatusScan(fd_data);
  
    //                   $("#loader").removeClass("ibox-content");
    //                   $("#loader").removeClass("sk-loading");
    //                   $("#spin1").addClass("d-none");
    //                 });
    //               }
    //             }
    //           } else {
    //             swal("", "No template trained for the vendor", "error").then(
    //               () => {
    //                 req_body.error_message = "No template trained for the vendor";
    //                 req_body.status = { code: 100 };
    //                 req_body.gate_number = $("#gate_number").html();
    //                 req_body.in_time = new Date().toLocaleTimeString();
  
    //                 let fd_data = new FormData();
  
    //                 fd_data.append("json", JSON.stringify(req_body));
    //                 fd_data.append("file", files);
  
    //                 errorStatusScan(fd_data);
  
    //                 $("#loader").removeClass("ibox-content");
    //                 $("#loader").removeClass("sk-loading");
    //                 $("#spin1").addClass("d-none");
    //                 $("#preview_img").addClass("invisible");
    //               }
    //             );
    //           }
    //         } else {
    //           swal("", res.error, "error").then(() => {
    //             req_body.error_message = res.error;
    //             req_body.status = { code: 100 };
    //             req_body.gate_number = $("#gate_number").html();
    //             req_body.in_time = new Date().toLocaleTimeString();
  
    //             let fd_data = new FormData();
  
    //             fd_data.append("json", JSON.stringify(req_body));
    //             fd_data.append("file", files);
  
    //             errorStatusScan(fd_data);
  
    //             $("#loader").removeClass("ibox-content");
    //             $("#loader").removeClass("sk-loading");
    //             $("#spin1").addClass("d-none");
    //           });
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         swal("" , error , "error");
    //         console.log("Error uploading image:", error);
    //       });
    //   });
    // });
  
    // ---->End of OCR Extraction and saving to output.json<----
  
    $("form")[0].reset();
    var number;
  
    $(window).load(() => {
      var gateId = JSON.parse(localStorage.getItem("gateId"));
      console.log(gateId);
      // console.log([test[0].url]);
  
      $.ajax({
        url: `${[test[0].url]}/gate/find?gateid=${gateId}`,
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        // url: `${[test[0].url]}/gate/find?gateid=${gateId}`,
        success: function (data,status,xhr) {
          if(xhr.status == 200)
          {
            console.log(data);
            number = data.data[0].gateNumber;
            $("#gate_number").html(number);
          }
          else{
  
                $.errorMessage(xhr.responseJSON.message);
          }
          
  
          // console.log(number);
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
      },
        complete : ()=>{
          options = {
            bcid: "code128",     // Specify the barcode format (e.g., code128, ean13, etc.)
            text: $("#gate_number").html(),  // Replace with the actual value you want to encode
            scale: 2,           // Adjust the barcode size (2 is default)
          };
  
           // Generate the barcode
  bwipjs.toCanvas("barcode", options, function (err, canvas) {
  if (err) {
  // Handle error if barcode generation fails
  console.error(err);
  } else {
    // Set the desired width and height for the canvas
  canvas.style.width = "200px";
  canvas.style.height = "100px";
  // Append the generated barcode canvas to the DOM
  document.body.appendChild(canvas);
  }
  });
        }
      });
    });
  
  
  
  
    $("#save").click((e) => {
      let count = 0;
  
      // var codes = [];
      var tag_code = [];
  
      e.preventDefault();
  
      // var code = 100;
  
      // var gate = $("#gate_number").html()
      let amount;
  
      var number = $('#amount').val();
      var modifiedNumber = number.replace(/\.{2,}/g, '.').replace(/,{2,}/g, ',');
      console.log(modifiedNumber);
      if (modifiedNumber !== number) {
        console.log("Modified number: " + modifiedNumber);
  
      let arr1 = modifiedNumber.split(/[,.]/)
      let pop1 = arr1.pop()
      let lastNum1 = pop1.includes(".") ? pop1 : `.${pop1}`
      amount = arr1.join("") + lastNum1
      console.log("if :" ,amount);
  
      } else {
      let arr1 = number.split(/[,.]/)
      let pop1 = arr1.pop()
      let lastNum1 = pop1.includes(".") ? pop1 : `.${pop1}`
      amount = arr1.join("") + lastNum1
      console.log('else :', amount );
      }
  
  
      
  
  
  
  
  
  
            // var span = $(".item");
  
            // span.map((index, value) => {
            //     codes.push(value.innerText.split("\n")[0]);
            //     // console.log(codes);
            // });
  
            // $("#save").click(() => {
           
            let supplier = $("#vendorcode")[0].value;
  
            // req_body.gate_number = $("#gate_number").html();
            // req_body.vehicle_nbr = $("#vehicle_nbr").val();
            // req_body.vendorname = $("#vendorname").val();
            // req_body.weight = $("#weight").val();
            // req_body.in_time = $("#in_time").val();
            // req_body.vendor_code = $("#vendor_code").val();
            // req_body.po_number = $("#po_number").val();
            // req_body.po_type = $("#po_type").val();
  
            // let statu = { code: 1000 };
            // // let tag = [{code : 1000}]
  
            // req_body.weight = parseInt(req_body.weight);
  
            // req_body.amount = amount
  
            // req_body.status = statu;
            // req_body.details = details_payload;
            // // delete req_body.details;
  
            // tags_value_HDR.map((res) => {
            //   if (!req_body[`${res.label}`]) {
            //     // alert(req_body[`${res.label}`])
            //     tags.push({ id: res.tag_id });
            //   }
            // });
            // req_body.tags = tags;
  
            // console.log("last final payload:::::::: : ===", req_body);
  
            let vendor_code = $("#vendor_code").val();
            // let DOCO = $("#po_number").val();
            // let DCTO = $("#po_type").val();
            // let weight = $("#weight").val();
  
            let Supplier_name;
            let blank_values;
            let input_blank = 0;

            let object_data = {}
            object_data.gate_number = $("#gate_number").html();
            object_data.transactionType = "SERVICE_PO"




            for(let i = 0 ; i < $(".control_check").length ; i++)
            {

                if($(".control_check")[i].value != "")
                {


                    blank_values = $(".control_check")[i]
                    $(blank_values).css("border" , "1px solid #e5e6e7")
                    
                    let check_id = $(".control_check")[i].getAttribute("id")
                    let check_value = $(".control_check")[i].value  

                    object_data[`${check_id}`] = check_value
                    

                    input_blank++;
                }
                else{
                    blank_values = $(".control_check")[i]
                    $(blank_values).css("border" , "1px solid red")
                }


            }


            console.log(object_data);


        if(input_blank == $(".control_check").length)
        {



            files = $("#preview_img")[0].files[0];

            $("#loader").addClass("ibox-content");
            $("#loader").addClass("sk-loading");
            $("#spin1").removeClass("d-none");
            $("#save").html("Please wait...");




            let invoice_date = $("#invoice_date").val().split("-").reverse().join("-")

  
            
            $.ajax({
              url : `${[test[0].url]}/validateDate?date=${invoice_date}`,
              headers: {
                'Authorization': 'Bearer ' + token,
              },
              success : function(data,status,xhr)
              {
                if(xhr.status == 200)
                {
                  if(data.result)
                  {
  
                  
  
  
                  $.ajax({
                    url: `${[test[0].url]}/gate/getAll?vendor=${$("#vendor_code").val()}&invoice=${$("#invoice_number").val()}`,
                    headers: {
                      'Authorization': 'Bearer ' + token,
                    },
                    success : function(data , status , xhr)
                    {
                      
                      if(xhr.status == 200)
                      {
                        if(data.data == null)
                        {
  
                          object_data.invoice_date = data.invoice_date;
            
  
  
  
  
                          $.ajax({
                            url: `${[
                              login[0].url,
                            ]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&%24field=F0101.ALPH&%24filter=F0101.AT1%20EQ%20V&%24filter=F0101.AN8%20EQ%20${vendor_code}`,
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
  
  
  
                                // if($("#DELIVERY_CHALLAN_NUMBER").val() != ""){
  
                                //   let dc_number = $("#DELIVERY_CHALLAN_NUMBER").val() != "" ? `&%24filter=F56UD911.YCHL%20EQ%20${$("#DELIVERY_CHALLAN_NUMBER").val()}` : "" ;  
                                //   let po_no_value = $("#po_number").val() != "" ?  `&$filter=F56UD911.DOCO EQ ${$("#po_number").val()}` : "" ;
                                //   let po_type_search = $("#po_type").val() != "" ?  `&$filter=F56UD911.DCTO EQ ${$("#po_type").val()}` : ""
                      
                                //   $.ajax({
                                //     url : `${[login[0].url]}/jderest/v2/dataservice/table/F56UD911?$field=F56UD911.DOCO&$field=F56UD911.YCHL&$field=F56UD911.DCTO&$field=F56UD911.KCOO&$field=F56UD911.DSC1&$field=F56UD911.LITM&%24filter=F56UD911.AN8%20EQ%20${vendor_code}${dc_number}${po_no_value}${po_type_search}`,
                                //     headers: { Authorization:"Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)},
                                //     success : function(data,status,xhr)
                                //     {
                      
                                //       console.log("data F56UD911 : " , data);
                                //       let data_record = data.fs_DATABROWSE_F56UD911.data.gridData.summary.records
                                //       let item = req_body.details[0].jdeItemCode != null ? req_body.details[0].jdeItemCode : $(".item_code")[0].value;
                      
                                //     if(data_record > 0)
                                //     {
                      
                                //       data.fs_DATABROWSE_F56UD911.data.gridData.rowset.map((value)=>{
                      
                                //         if(value.F56UD911_DCTO != "WO")
                                //         {
                      
                                //           if(item == value.F56UD911_LITM)
                                //           {
                                //             req_body.details[0].jdeItemCode = value.F4311_LITM
  
  
                                //             $.ajax({
                                //               type: "POST",
                                //               url: `${[test[0].url]}/gate/addgate`,
                                //               data: fd_data,
                                //               contentType: false,
                                //               processData: false,
        
                                //               headers: {
                                //                 'Authorization': 'Bearer ' + token,
                                //               },
        
                                //               success: function (data, status, xhr) {
                                //                 if (xhr.status == 200) {
        
                                //                   // let file = relative path of pdf 
                                //                   $.sendEmail(data.data, "Unload");
        
                                //                   if ($("#vendorname").val() == Supplier_name) {
                                //                     // $("#modalCall").trigger("click");
                                //                     swal(
                                //                       "",
                                //                       "Vendor Name Is Not maching",
                                //                       "warning"
                                //                       ).then(() => {
                                //                       window.open(
                                //                         "../../gate/template/gate.jsp",
                                //                         "_self"
                                //                       );
                                //                       $("#modalCall").trigger("click")
                                //                     });
                                                    
                                //                   } else {
                                //                     swal(
                                //                       "",
                                //                       "Vendor Name Is Not maching",
                                //                       "warning"
                                //                       ).then(() => {
                                //                       window.open(
                                //                         "../../gate/template/gate.jsp",
                                //                         "_self"
                                //                       );
                                //                       $("#modalCall").trigger("click")
                                //                     });
                                //                   }
                                //                 } else {
                                //                   console.log(xhr);
                                //                   console.log(data);
                                //                   swal("", xhr.responseJSON.message, "error").then(
                                //                     () => {
                                //                       // Error func
        
                                //                       req_body.error_message =
                                //                         xhr.responseJSON.message;
                                //                       req_body.status = { code: 1000 };
                                //                       req_body.deliveryChallanNumber = $("#DELIVERY_CHALLAN_NUMBER").val()
                                //                       req_body.workOrderNumber = $("#WORK_ORDER_NUMBER").val()
        
                                //                       if($("#DELIVERY_CHALLAN_NUMBER").val() != null)
                                //                       {
                                //                         req_body.transactionType = "JOB_WORK"
                                //                       }
        
                                //                       let fd_data = new FormData();
        
                                //                       fd_data.append(
                                //                         "json",
                                //                         JSON.stringify(req_body)
                                //                       );
                                //                       fd_data.append("file", files);
        
                                //                       errorStatus(fd_data);
        
                                //                       $("#loader").removeClass("ibox-content");
                                //                       $("#loader").removeClass("sk-loading");
                                //                       $("#spin1").addClass("d-none");
                                //                       $("#save").html("SAVE");
                                //                       $("form")[0].reset();
                                //                     }
                                //                   );
                                //                 }
                                //               },
        
                                //               error: function (
                                //                 xhr,
                                //                 httpStatusMessage,
                                //                 customErrorMessage
                                //               ) {
                                //                 console.log(xhr);
        
                                //                 if(xhr.status == 498)
                                //                 {
                                //                     $.tokenError();
                                //                 }
                                //                 else{
                                //                   swal("", xhr.responseJSON.message, "error").then(
                                //                     () => {
                                //                       // Error func
                        
                                //                       req_body.error_message = xhr.responseJSON.message;
                                //                       req_body.status = { code: 1000 };
                                //                       req_body.deliveryChallanNumber = $("#DELIVERY_CHALLAN_NUMBER").val()
                                //                       req_body.workOrderNumber = $("#WORK_ORDER_NUMBER").val()
        
                                //                       if($("#DELIVERY_CHALLAN_NUMBER").val() != null)
                                //                       {
                                //                         req_body.transactionType = "JOB_WORK"
                                //                       }
                        
                                //                       let fd_data = new FormData();
                        
                                //                       fd_data.append("json", JSON.stringify(req_body));
                                //                       fd_data.append("file", files);
        
                                //                       errorStatus(fd_data);
        
                                //                       $("#loader").removeClass("ibox-content");
                                //                       $("#loader").removeClass("sk-loading");
                                //                       $("#spin1").addClass("d-none");
                                //                       $("#save").html("SAVE");
                                //                     }
                                //                   );
                                //                 }
                                //               },
                                //             });
                      
                                //           }
                                //           else{
                      
                                            
                      
                                //             $.errorMessage(`${item} - Cross Refrence Item Not Found`)
  
  
                                //             setTimeout(() => {
  
                                //               req_body.error_message = `${item} - Cross Refrence Item Not Found`;
                                //               req_body.status = { code: 1000 };
                                //               req_body.deliveryChallanNumber = $("#DELIVERY_CHALLAN_NUMBER").val()
                                //               req_body.workOrderNumber = $("#WORK_ORDER_NUMBER").val()
  
                                //               if($("#DELIVERY_CHALLAN_NUMBER").val() != null)
                                //               {
                                //                 req_body.transactionType = "JOB_WORK"
                                //               }
                
                                //               let fd_data = new FormData();
                
                                //               fd_data.append("json", JSON.stringify(req_body));
                                //               fd_data.append("file", files);
  
                                //               errorStatus(fd_data);
                                              
                                //             }, 1000);
                      
                                //             $("#loader5").removeClass("ibox-content")
                                //             $("#loader5").removeClass("sk-loading")
                                //             $("#spin5").addClass("d-none")
                                            
                                            
                      
                                //           }
                      
                                //         }
                      
                                //       })
                                //     }
                                //     else{
                                //       $.errorMessage(`Record Not Found In JDE For This Vendor`)
  
  
                                //       setTimeout(() => {
  
                                //         req_body.error_message = `Record Not Found In JDE For This Vendor`;
                                //         req_body.status = { code: 1000 };
                                //         req_body.deliveryChallanNumber = $("#DELIVERY_CHALLAN_NUMBER").val()
                                //         req_body.workOrderNumber = $("#WORK_ORDER_NUMBER").val()
  
                                //         if($("#DELIVERY_CHALLAN_NUMBER").val() != null)
                                //         {
                                //           req_body.transactionType = "JOB_WORK"
                                //         }
          
                                //         let fd_data = new FormData();
          
                                //         fd_data.append("json", JSON.stringify(req_body));
                                //         fd_data.append("file", files);
  
                                //         errorStatus(fd_data);
                                        
                                //       }, 1000);
  
                                //       $("#loader5").removeClass("ibox-content")
                                //         $("#loader5").removeClass("sk-loading")
                                //         $("#spin5").addClass("d-none")
                                //     }
                      
                                //     },
                                //     error : function(xhr){
                      
                                //       $.errorMessage(xhr.responseJSON.message)
  
                                //       setTimeout(() => {
  
                                //         req_body.error_message = xhr.responseJSON.message;
                                //         req_body.status = { code: 1000 };
                                //         req_body.deliveryChallanNumber = $("#DELIVERY_CHALLAN_NUMBER").val()
                                //         req_body.workOrderNumber = $("#WORK_ORDER_NUMBER").val()
  
                                //         if($("#DELIVERY_CHALLAN_NUMBER").val() != null)
                                //         {
                                //           req_body.transactionType = "JOB_WORK"
                                //         }
          
                                //         let fd_data = new FormData();
          
                                //         fd_data.append("json", JSON.stringify(req_body));
                                //         fd_data.append("file", files);
  
                                //         errorStatus(fd_data);
                                        
                                //       }, 1000);
                                //       $("#loader5").removeClass("ibox-content")
                                //       $("#loader5").removeClass("sk-loading")
                                //       $("#spin5").addClass("d-none")
                      
                                //     }
                      
                                //   })
                      
                                // }
                                // else{
                                  
                                  let req = {
                                    po_number: $("#po_number").val(),
                                    po_type: $("#po_type").val(),
                                    supplier: $("#vendor_code").val(),
                                    amount: $("#amount").val().split(",").join(""),
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
                                      if (data.status) {
                                        console.log("final payload to post", req_body);
    
                                        let fd_data = new FormData();
    
                                        object_data.status = {code : 200}
                                        fd_data.append("json", JSON.stringify(object_data));
                                        fd_data.append("file", files);
    
    
                                        $.ajax({
                                          type: "POST",
                                          url: `${[test[0].url]}/gate/addgate`,
                                          data: fd_data,
                                          contentType: false,
                                          processData: false,
    
                                          headers: {
                                            'Authorization': 'Bearer ' + token,
                                          },
    
                                          success: function (data, status, xhr) {
                                            if (xhr.status == 200) {
    
                                              // let file = relative path of pdf 
                                              $.sendEmail(data.data, "Store");
    
                                              if ($("#vendorname").val() == Supplier_name) {
                                                // $("#modalCall").trigger("click");
                                                swal(
                                                  "",
                                                  "Vendor Name Is Not maching",
                                                  "warning"
                                                  ).then(() => {
                                                  window.open(
                                                    "../../gate/template/gate.jsp",
                                                    "_self"
                                                  );
                                                  $("#modalCall").trigger("click")
                                                });
                                                
                                              } else {
                                                swal(
                                                  "",
                                                  "Vendor Name Is Not maching",
                                                  "warning"
                                                  ).then(() => {
                                                  window.open(
                                                    "../../gate/template/gate.jsp",
                                                    "_self"
                                                  );
                                                  $("#modalCall").trigger("click")
                                                });
                                              }
                                            } else {
                                              console.log(xhr);
                                              console.log(data);
                                              swal("", xhr.responseJSON.message, "error").then(
                                                () => {
                                                  // Error func
    
                                                  object_data.status = {code : 1000}
                                                  object_data.error_message = xhr.responseJSON.message
    
                                                  let fd_data = new FormData();
    
                                                  fd_data.append(
                                                    "json",
                                                    JSON.stringify(object_data)
                                                  );
                                                  fd_data.append("file", files);
    
                                                  errorStatus(fd_data);
    
                                                  $("#loader").removeClass("ibox-content");
                                                  $("#loader").removeClass("sk-loading");
                                                  $("#spin1").addClass("d-none");
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
                                              swal("", xhr.responseJSON.message, "error").then(
                                                () => {
                                                  // Error func
                    
                                                  object_data.status = {code : 1000}
                                                  object_data.error_message = xhr.responseJSON.message
                    
                                                  let fd_data = new FormData();
                    
                                                  fd_data.append("json", JSON.stringify(object_data));
                                                  fd_data.append("file", files);
    
                                                  errorStatus(fd_data);
    
                                                  $("#loader").removeClass("ibox-content");
                                                  $("#loader").removeClass("sk-loading");
                                                  $("#spin1").addClass("d-none");
                                                  $("#save").html("SAVE");
                                                }
                                              );
                                            }
                                          },
                                        });
                                      } else {
                                        swal("", xhr.responseJSON.message, "error").then(() => {
                                          

                                            object_data.status = {code : 1000}
                                            object_data.error_message = xhr.responseJSON.message
                                          let fd_data = new FormData();
    
                                          fd_data.append("json", JSON.stringify(object_data));
                                          fd_data.append("file", files);
    
                                          errorStatus(fd_data);
    
                                          // Error func
                                          $("#loader").removeClass("ibox-content");
                                          $("#loader").removeClass("sk-loading");
                                          $("#spin1").addClass("d-none");
                                          $("#save").html("SAVE");
                                        });
                                      }
                                    },
                                    error: function (xhr) {
    
                                      console.log(xhr);
                                      if (xhr.status < 500) {
                                        swal("", xhr.responseJSON.message.DREQ_PO_Header.Message, "error").then(() => {
                                          // Error func
    
                                          object_data.status = {code : 1000}
                                          object_data.error_message = xhr.responseJSON.message.DREQ_PO_Header.Message
                                          
                                          let fd_data = new FormData();
    
                                          fd_data.append("json", JSON.stringify(object_data));
                                          fd_data.append("file", files);
    
                                          errorStatus(fd_data);
    
                                          $("#loader").removeClass("ibox-content");
                                          $("#loader").removeClass("sk-loading");
                                          $("#spin1").addClass("d-none");
                                          $("#save").html("SAVE");
                                        });
                                      } else {
                                        try {
    
                                          swal(
                                            "",
                                            xhr.responseJSON.message,
                                            "error"
                                          ).then(() => {
                                            // Error func
                    
                                            object_data.status = {code : 1000}
                                            object_data.error_message = xhr.responseJSON.message
                    
                                            let fd_data = new FormData();
                    
                                            fd_data.append("json", JSON.stringify(object_data));
                                            fd_data.append("file", files);
                    
                                            errorStatus(fd_data);
                    
                                            $("#loader").removeClass("ibox-content");
                                            $("#loader").removeClass("sk-loading");
                                            $("#spin1").addClass("d-none");
                                            $("#save").html("SAVE");
                                          });
                                          
                                        } catch (error) {
                                          
                                          swal(
                                            "",
                                            xhr.responseJSON.message.DREQ_PO_Header.Message,
                                            "error"
                                          ).then(() => {
                                            // Error func
                    
                                            object_data.status = {code : 1000}
                                            object_data.error_message = xhr.responseJSON.message.DREQ_PO_Header.Message
                    
                                            let fd_data = new FormData();
                    
                                            fd_data.append("json", JSON.stringify(object_data));
                                            fd_data.append("file", files);
                    
                                            errorStatus(fd_data);
                    
                                            $("#loader").removeClass("ibox-content");
                                            $("#loader").removeClass("sk-loading");
                                            $("#spin1").addClass("d-none");
                                            $("#save").html("SAVE");
                                          });
    
                                        }
                                      }
                                    },
                                  });
  
                                
  
  
  
  
                              } else {
                                swal("", "Vendor Not Present In JDE", "error").then(() => {
                                    
                                  object_data.status = {code : 1000}
                                  object_data.error_message = "Vendor Not Present In JDE"
  
                                  let fd_data = new FormData();
  
                                  fd_data.append("json", JSON.stringify(object_data));
                                  fd_data.append("file", files);
  
                                  errorStatus(fd_data);
                                  $("#loader").removeClass("ibox-content");
                                  $("#loader").removeClass("sk-loading");
                                  $("#spin1").addClass("d-none");
                                  $("#save").html("SAVE");
                                });
                              }
                            },
                            error: function (xhr) {
                              swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(
                                () => {
                                  object_data.status = {code : 1000}
                                  object_data.error_message = xhr.responseJSON.sysErrors[0].TITLE
  
                                  let fd_data = new FormData();
  
                                  fd_data.append("json", JSON.stringify(object_data));
                                  fd_data.append("file", files);
  
                                  errorStatus(fd_data);
                                  $("#loader").removeClass("ibox-content");
                                  $("#loader").removeClass("sk-loading");
                                  $("#spin1").addClass("d-none");
                                  $("#save").html("SAVE");
                                }
                              );
                            },
                          });
  
  
  
                        }
                        else{
  
                          $.errorMessage(`${data.data} - ${data.message}`)
  
                          $("#loader").removeClass("ibox-content");
                          $("#loader").removeClass("sk-loading");
                          $("#spin1").addClass("d-none");
                          $("#save").html("SAVE");
  
  
                        }
                      }
                      else{
  
                        $.errorMessage(`${data.data} - ${data.message}`)
  
                        $("#loader").removeClass("ibox-content");
                        $("#loader").removeClass("sk-loading");
                        $("#spin1").addClass("d-none");
                        $("#save").html("SAVE");
  
                          
  
                      }
                      
                    },
                    error : function(xhr)
                    {
                      $("#loader").removeClass("ibox-content");
                        $("#loader").removeClass("sk-loading");
                        $("#spin1").addClass("d-none");
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
                else{
                  $.errorMessage(data.message)
                  $("#loader").removeClass("ibox-content");
                  $("#loader").removeClass("sk-loading");
                  $("#spin1").addClass("d-none");
                  $("#save").html("SAVE");
                }
              }
              else{
                $.errorMessage(xhr.responseJSON.message)
                $("#loader").removeClass("ibox-content");
                $("#loader").removeClass("sk-loading");
                $("#spin1").addClass("d-none");
                $("#save").html("SAVE");
              }
            }, 
            error : function(xhr)
            {
  
              $("#loader").removeClass("ibox-content");
              $("#loader").removeClass("sk-loading");
              $("#spin1").addClass("d-none");
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
  
    
  
    
    
  })
  
  
   
  
   // $("#skip").click(()=>{
   //     // Clear the contents of the modal
   //     window.open("../../gate/template/gate.jsp", "_self")
   // });
  
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
       async: false,
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
  
         
         }
         else{
  
               $.errorMessage(xhr.responseJSON.message);
         }
       },
       error: function (xhr, status, error) {
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
  
  
  function errorStatus(fd_data) {
    $.ajax({
      type: "POST",
      url: `${[test[0].url]}/gate/addgate`,
      data: fd_data,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
  
      success: function (data, status, xhr) {
        console.log(xhr);
        if (xhr.status == 200) {
  
          $.sendEmail(data.data, "Error");
          setTimeout(() => {
            window.open("../../gate/template/gate.jsp", "_self");
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
  
              $.errorMessage(xhr.responseJSON.message);
        }
        else{
              $.errorMessage(xhr.responseJSON.error)
        }
      },
    });
  }
  
  
//   function errorStatusScan(fd_data) {
//     $.ajax({
//       type: "POST",
//       url: `${[test[0].url]}/gate/addgate`,
//       data: fd_data,
//       contentType: false,
//       processData: false,
//       headers: {
//         'Authorization': 'Bearer ' + token,
//       },
  
//       success: function (data, status, xhr) {
//         console.log(xhr);
//         if (xhr.status == 200) {
  
//           // $.sendEmail(data.data, "Error");
//           setTimeout(() => {
//             window.open("../../gate/template/gate.jsp", "_self");
//           }, 500);
//         } 
//         else{
  
//               $.errorMessage(xhr.responseJSON.message);
//         }
        
//       },
//       error: function (xhr) {
//         if(xhr.status == 498)
//         {
//             $.tokenError();
//         }
//         else if(xhr.status >= 400 && xhr.status < 500){
  
//               $.errorMessage(xhr.responseJSON.message);
//         }
//         else{
//               $.errorMessage(xhr.responseJSON.error)
//         }
//       },
//     });
//   }
  
  $('input[name="vendor_select"]').change(function () {
    if ($(this).is(":checked")) {
      console.log("Radio button selected: " + $(this).val());
    }
  });
  
  $("#cancel1").click((e) => {
    e.preventDefault();
    window.open("../template/gate.jsp", "_self");
    // $("form")[0].reset();
  });
    var number;
    var options;
  
  $.checkstatus(100, false);
  
  $("#vendor").click(() => {
    // $("#preview_img").removeClass("invisible"); // remove this from here
  });
  
  $("#preview_img").change(() => {
    $("#preview_invoice").removeClass("invisible");
  });
  
  $("#myModal11").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    $("#myModal11").remove();
  });
  // $("#myModal15").on('hide.bs.modal', function () {
  //     // Clear the contents of the modal
  //     window.open("../../gate/template/gate.jsp", "_self")
  // });
  
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
  $("#myModal22").on("hide.bs.modal", function () {
    // Clear the contents of the modal
    vendor_modal.destroy();
    $("#vendor_table_body").empty();
  });
  
  
  
  });
  