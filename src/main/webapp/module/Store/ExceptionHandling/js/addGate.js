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


    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'p') {
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

            $("#modal_gate_id").html($("#gate_number").html())
            $("#modal_vendor_name").html($("#vendorname").val())
            $("#modal_vehicle_no").html($("#vehicle_nbr").val())
            $("#modal_invoice_no").html($("#invoice_number").val())
            $("#modal_material_type").html($("#material_type").val())
            $(".detail_po_no").html($("#po_number").val())
            $(".qty_1").html($("#weight").val())
            $(".remark_1").html($("#remark").val())
            $("#modal_user_name").html($(".name")[1].innerText)
            var currentDate = new Date();

            var formattedDate = currentDate.toLocaleDateString();
            var formattedTime = currentDate.toLocaleTimeString();

            $("#data_time").html("  " + formattedDate + "   " + formattedTime)

            window.print();








        }
    })



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

        $("#modal_gate_id").html($("#gate_number").html())
        $("#modal_vendor_name").html($("#vendorname").val())
        $("#modal_vehicle_no").html($("#vehicle_nbr").val())
        $("#modal_invoice_no").html($("#invoice_number").val())
        $("#modal_material_type").html($("#material_type").val())
        $(".detail_po_no").html($("#po_number").val())
        $(".qty_1").html($("#weight").val())
        $(".remark_1").html($("#remark").val())
        $("#modal_user_name").html($(".name")[1].innerText)
        var currentDate = new Date();

        var formattedDate = currentDate.toLocaleDateString();
        var formattedTime = currentDate.toLocaleTimeString();

        $("#data_time").html("  " + formattedDate + "   " + formattedTime)

        window.print();





    })

    $(window).on('afterprint', function () {
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
            template[1].value == check_data[1]
        ) {
            return true;
        } else {
            return false;
        }
    }

    $("#vendorcode").on("keypress", function (event) {
        if (event.keyCode === 13) {
            $("#loader1").addClass("ibox-content");
            $("#loader1").addClass("sk-loading");
            $("#spin").removeClass("d-none");
            $("#VendorSearch").trigger("click");
        }
    });

    $("#VendorSearch").click(() => {
        

        let dynamic_vendor = isNaN($("#vendorcode").val() * 1) ? `$filter=F0101.ALPH CONTAINS ${$("#vendorcode").val()}` : `$filter=F0101.AN8 EQ ${$("#vendorcode").val()}`

        console.log(dynamic_vendor);

        if($("#vendorcode").val() != "")
        {
        $("#loader1").addClass("ibox-content");
        $("#loader1").addClass("sk-loading");
        $("#spin").removeClass("d-none");
        let vendor_code = $("#vendorcode").val();
        $.ajax({
            url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$filter=F0101.AT1 EQ V&${dynamic_vendor}`,
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
                        </tr>`)
                    }

                    $("#Vendor_Search").trigger("click")

                    $("#loader1").removeClass("ibox-content");
                    $("#loader1").removeClass("sk-loading");
                    $("#spin").addClass("d-none");
                    ;
                }
                if (record == 0) {
                    swal("", "Vendor Not Present In JDE", "error").then(() => {
                        Vtable.destroy();
                        $("#Vendor_body").empty();
                        $("#vendor_name").val("");
                        $("#loader1").removeClass("ibox-content");
                        $("#loader1").removeClass("sk-loading");
                        $("#spin").addClass("d-none");
                        $("#preview_img").addClass("invisible");
                    });
                }
            },
            error: function (xhr) {
                console.log(xhr);
                swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(() => {
                    $("#vendor_name").val("");
                    $("#loader1").removeClass("ibox-content");
                    $("#loader1").removeClass("sk-loading");
                    $("#spin").addClass("d-none");
                    $("#preview_img").addClass("invisible");
                });
            },
            complete: () => {

                Vtable = $("#Vtable").DataTable({
                    language: {
                        'paginate': {
                            'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                            'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                        }
                    },
                    dom: '<"top">t<"bottom"ip>',
                    ordering: true,
                    lengthMenu: [5, 10, 20, 25, 50],
                    pagingType: "simple_numbers",
                    select: true,

                });

            },
        });
    }
    else{
        swal("", "Please Enter The Vendor Name OR Code ", "error")
    }
    });


    $('#Vtable tbody').on('click', 'tr', function () {
        var dataa = Vtable.row(this).data();
        var roww = $(this)[0];

        console.log(roww);


        console.log(dataa);
        function searchh(dataa) {
            $("#vendorcode").val(dataa[0]);
            $("#vendor_name").val(dataa[1])

            if (dataa) {
                $("#preview_img").removeClass("invisible");
            }

            $(roww).removeClass("selected");
            $("#preview_img").removeClass("invisible")

            $.ajax({
                url: `${[test[0].url]}/ocrtraining/get?supplier=${dataa[0]}`,
                type: "GET",
                async: false,
                headers: {
                    'Authorization': 'Bearer ' + token,
                  },
                success: function (data,status,xhr) {
                    if(xhr.stats == 200)
                    {
                        console.log(data.data);
                        if (data.data == null) {
                            loopCount = 1;
                        } else {
                            loopCount = data.data.length;
                        }
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
            });

        }

        $("#Vendor_selected").click(() => {
            searchh(dataa);
        })
    });







    // ---->OCR Extraction and saving to output.json<----
    const preview = document.getElementById("preview_img");

    preview.addEventListener("change", (event) => {


        // -----> for getting inner loop count for multiple training


        // -----> End of inner loop count

        $("#tab_logic_body").empty();
        $("#modal_table_details").empty();
        const image = event.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.addEventListener("load", () => {


            // Adding Modal after loading a image 

            $("#wrapper").append(`<div class="modal inmodal fade" id="myModal11" tabindex="2"
            role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header"><h2><strong>&nbsp;&nbsp;&nbsp; OCR INFORMATION</strong></h2>
                    </div>
                    <div class="modal-body">

                      
                        <div class="panel panel-primary col-md-12 px-0">
                            <div class="panel-heading">
                               Supplier Billed To Shipped To
                            </div>
                            <div class="panel-body">
                                <div class="row">

                                    <div class="col-6 b-r" id="form3">

                                        <h4>Billed To</h4>
                                        <hr>
                                        
                                        <div class="form-group row"><label
                                                class="col-3 col-form-label">Name</label>
                                            <div class="col-9"><input type="text" class="form-control input_size check"
                                                    required="" id="billto_name">
                                            </div>
                                        </div>
                                    <div class="form-group row"><label
                                            class="col-3 col-form-label">Address 1</label>
                                        <div class="col-9"><input type="text" class="form-control check"
                                                required="" id="billto_address1">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label
                                            class="col-3 col-form-label">Address 2</label>
                                        <div class="col-9"><input type="text" class="form-control check"
                                                required="" id="billto_address2">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label
                                            class="col-3 col-form-label">Address 3</label>
                                        <div class="col-9"><input type="text" class="form-control check"
                                                required="" id="billto_address3">
                                        </div>
                                    </div>
                                    <div class="form-group row"><label
                                        class="col-3 col-form-label">GSTIN</label>
                                    <div class="col-9"><input type="text" class="form-control input_size check"
                                            required="" id="billto_gstin">
                                    </div>
                                </div>

                                
                            <div class="form-group row"><label
                                class="col-3 col-form-label">City</label>
                            <div class="col-9"><input type="text" class="form-control input_size check"
                                    required="" id="billto_city">
                            </div>
                        </div>

                        

                         <div class="form-group row"> 
                            <label
                                class="col-3 col-form-label">State</label>
                            <div class="col-9"><input type="text" class="form-control input_size check"
                                    required="" id="billto_state">
                            </div>
                        </div>

                    <div class="form-group row"><label
                            class="col-3 col-form-label">Zip Code</label>
                        <div class="col-9"><input type="text"  class="form-control input_size check"
                                required="" id="billto_zipcode">
                        </div>
                    </div>
                </div>

                <div class="col-6" id="form3">

                    <h4>Shipped To</h4>

                    <hr>
                    
                    <div class="form-group row"><label
                            class="col-3 col-form-label">Name</label>
                        <div class="col-9"><input type="text" class="form-control input_size check"
                                required="" id="shipto_name">
                        </div>
                    </div>
                    <div class="form-group row"><label
                        class="col-3 col-form-label">Address 1</label>
                    <div class="col-9"><input type="text" class="form-control input_size check"
                            required="" id="shipto_address1">
                    </div>
                </div>
                    <div class="form-group row"><label
                        class="col-3 col-form-label">Address 2</label>
                    <div class="col-9"><input type="text" class="form-control input_size check"
                            required="" id="shipto_address2">
                    </div>
                </div>
                    <div class="form-group row"><label
                        class="col-3 col-form-label">Address 3</label>
                    <div class="col-9"><input type="text" class="form-control input_size check"
                            required="" id="shipto_address3">
                    </div>
                </div>
                <div class="form-group row"><label
                    class="col-3 col-form-label">GSTIN</label>
                <div class="col-9"><input type="text" class="form-control input_size check"
                        required="" id="shipto_gstin">
                </div>
            </div>

            
        <div class="form-group row"><label
            class="col-3 col-form-label">City</label>
        <div class="col-9"><input type="text" class="form-control input_size check"
                required="" id="shipto_city">
        </div>
    </div>

    

     <div class="form-group row"> 
       
         <label class="col-3 col-form-label">State</label>
        <div class="col-9"><input type="text" class="form-control input_size check"
                required="" id="shipto_state">
        </div>
       
      
   

    </div>

    <div class="form-group row"><label
        class="col-3 col-form-label">Zip Code</label>
    <div class="col-9"><input type="text" class="form-control input_size check"
            required="" id="shipto_zipcode">
    </div>
</div>

</div>

                                </div>
                                
                            </div>
                            
                        </div>

                        <div class="panel panel-primary col-md-12 px-0">
                          <div class="panel-heading">
                              Supplier Invoice Information
                          </div>
                          <div class="panel-body">
                              <div class="row">

                                  <div class="col-6 b-r" id="form3">

                                      <h4></h4>
                                      <!-- <hr> -->

                  <div class="form-group row"><label
                          class="col-3 col-form-label">Invoice no.</label>
                      <div class="col-9"><input type="text"  class="form-control input_size check"
                              required="" id="invoice_number">
                      </div>
                  </div>
                  <div class="form-group row"><label
                          class="col-3 col-form-label">LR No.</label>
                      <div class="col-9"><input type="text"  class="form-control input_size check"
                              required="" id="lr_no">
                      </div>
                  </div>
                  <div class="form-group row"><label
                          class="col-3 col-form-label">Contract No.</label>
                      <div class="col-9"><input type="text"  class="form-control input_size check"
                              required="" id="contract_number">
                      </div>
                  </div>
                  <div class="form-group row"><label
                          class="col-3 col-form-label">Weight</label>
                      <div class="col-9"><input type="text"  class="form-control input_size check"
                              required="" id="weight">
                      </div>
                  </div>
                  <div class="form-group row"><label
                          class="col-3 col-form-label">Po Number</label>
                      <div class="col-9"><input type="text"  class="form-control input_size check"
                              required="" id="po_number">
                      </div>
                  </div>
                  
                  <div class="input-group col pb-3 p-0 "> 
                        <label class="col-3 col-form-label p-0 mr-2">EWAY BILL</label>   
                        <input type="text" class="form-control input_size check" readonly id="eway_number">
                        <div class=" input-group-append">
                            <button type="button" class="btn btn-primary validate">
                                Validate
                            </button>
                        </div>        
                    </div>

                  <div class="form-group row"><label
                    class="col-3 col-form-label">Amount</label>
                <div class="col-9"><input type="text" class="form-control input_size check"
                        required="" id="amount">
                </div>
            </div>
              </div>

              <div class="col-6" id="form3">

                  <h4></h4>

                  <!-- <hr> -->
  <div class="form-group row"><label
      class="col-3 col-form-label">LR Date</label>
  <div class="col-9"><input type="text" class="form-control input_size check"
          required="" id="lr_date">
  </div>
</div>
  <div class="form-group row"><label
      class="col-3 col-form-label">Contract Date</label>
  <div class="col-9"><input type="text" class="form-control input_size check"
          required="" id="contract_date">
  </div>
</div>
  <div class="form-group row"><label
      class="col-3 col-form-label">State</label>
  <div class="col-9"><input type="text" class="form-control input_size check"
          required="" id="state">
  </div>
</div>
  <div class="form-group row"><label
      class="col-3 col-form-label">Vehicle Number</label>
  <div class="col-9"><input type="text" class="form-control input_size check"
          required="" id="vehicle_nbr">
  </div>
</div>
  <div class="form-group row"><label
      class="col-3 col-form-label">Po Type</label>
  <div class="col-9"><input type="text" class="form-control input_size check"
          required="" id="po_type">
  </div>
</div>

<div class="input-group col p-0"> 
        <label class="col-3 col-form-label p-0 mr-2">IRN Number</label>   
        <input type="text" class="form-control input_size check" required=""  readonly id="irn_number">
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
                                Supplier Detail Information
                            </div>
                            <div class="panel-body">
                                <div class="row">

                                  <table class="table table-bordered" id="tab_logic">
                                    <thead>
                                        <tr>
                                            <!-- <th class="text-center"> PO No. </th> -->
                                            <th class="text-center"> Item Code </th>
                                            <th class="text-center"> Hsn Code </th>
                                            <th class="text-center"> Quantity </th>
                                            <th class="text-center"> Amount </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tab_logic_body">
                                        
                                    </tbody>
                                </table>


                                </div>
                                
                            </div>
                            
                        </div>

                        
                        </div>

                    <div class="modal-footer m-2">
                        <button type="button" class="btn btn-white"
                            data-dismiss="modal" id="closeModal">Close</button>
                            <input type="button" class="add_info btn btn-primary py-1 col-2"
                data-toggle="modal" data-target="#myModal15" id="modalCall"
                value="Additional Doc">
                    </div>
                </div>
                        </div>
    </div>`)



            $("#modalCall").click(() => {



                $("#closeModal").trigger("click")
            })





            req_body = {};
            req_body_details = {};
            details_payload = [];

            $("form")[0].reset();
            $("#loader").addClass("ibox-content");
            $("#loader").addClass("sk-loading");
            $("#spin1").removeClass("d-none");
            $("#in_time")[0].value = new Date().toLocaleTimeString();

            $(".check").attr("readonly", "readonly");

            let supplier = $("#vendorcode")[0].value;
            let fd = new FormData();
            files = $("#preview_img")[0].files[0];

            fd.append("file", files);

            // fetch("http://192.168.50.81:8888/api/ocr", {
            fetch("http://192.168.0.28:8888/api/ocr", {
                method: "POST",
                body: fd,
            })
                .then((response) => {
                    console.log("Image uploaded successfully");

                    return response.json();
                })
                .then(async (res, status, xhr) => {
                    if (res.status != 500) {
                        localStorage.setItem("ocr_output", JSON.stringify(res));



                        // for fetching vehicle number and vendor name
                        let supplier = $("#vendorcode")[0].value;

                      

                        const vertices = JSON.parse(localStorage.getItem("ocr_output"));
                        // alert(loopCount)

                        // -----> Checking all template one by one

                        if (loopCount != 0) {

                            for (let i = 1; i <= loopCount; i++) {
                                let templateHDRData = [];
                                let templateDTLData = [];
                                let findData = [];
                                tags_value = [];

                                // fetch(`/ocrtraining/get/${supplier}`,{
                                await fetch(
                                    `${[
                                        test[0].url,
                                    ]}/ocrtraining/get?supplier=${supplier}&template=Template_${i}`,
                                    {}
                                )
                                    .then((data) => {
                                        // console.log(data);
                                        return data.json();
                                    })
                                    .then(async (data) => {
                                        console.log(data);
                                        data.map((val) => {

                                            if (val.label_type == "Header") {
                                                templateHDRData.push(val);
                                            } else if (val.label_type == "Letter Head") {
                                                findData.push(val);
                                            } else {
                                                templateDTLData.push(val);
                                            }
                                        });
                                    });



                                const flag = getBestFit(findData);
                                if (flag) {
                                    // --> for fetching header data
                                    for (let i = 0; i < templateHDRData.length; i++) {
                                        const element = templateHDRData[i];

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
                                            out = out + des.description + " ";
                                        });
                                        // Remove spaces and special characters from start and end of the string
                                        out = out.replace(/^\s+|\s+$/g, "");
                                        if (out.length != 0) {
                                            req_body[`${element.label}`] = out;
                                        }
                                    }

                                    for (let i = 0; i < $(".fetch_check").length; i++) {
                                        const element = $(".fetch_check")[i];
                                        if (req_body[`${$(element).attr("id")}`]) {
                                            let out = req_body[`${$(element).attr("id")}`];
                                            var pattern = /^[\W_]+|[\W_]+$/g;
                                            var result = out.replace(pattern, '');
                                            $(element).val(result);
                                        }
                                    }

                                    // collecting all tags for assigning
                                    await fetch(
                                        `${[
                                            test[0].url,
                                        ]}/ocrtraining/get?supplier=${supplier}&template=Template_${i}`,
                                        {}
                                    )
                                        .then((data) => {
                                            // console.log(data);
                                            return data.json();
                                        })
                                        .then(async (data) => {
                                            console.log(data);
                                            data.map((val) => {
                                                if (val.label_type == "Header") {
                                                    tags_value_HDR.push(val);
                                                } else if (val.label_type == "Details") {
                                                    tags_value_DTL.push(val);
                                                }
                                            });
                                        });

                                    console.log("HEADER REQ BODY :----", req_body);

                                    // --> end of : fetching header data

                                    //------------------------- --> for fetching new details data

                                    for (let i = 0; i < templateDTLData.length; i++) {
                                        const element = templateDTLData[i];

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
                                            out = out + des.description + " ";
                                        });
                                        // Remove spaces and special characters from start and end of the string
                                        out = out.replace(/^\s+|\s+$/g, "");
                                        if (out.length != 0) {
                                            req_body_details[`${element.label}`] = out;
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
                                    console.log("Tags :----", tags);

                                    // -----> for getting total details in details
                                    let itemsCount = 0;

                                    for (const key in req_body_details) {
                                        if (key.startsWith("PRODUCT_")) {
                                            const numberPart = key.replace("PRODUCT_", "");
                                            const itemNumber = parseInt(numberPart);
                                            if (!isNaN(itemNumber) && itemNumber > itemsCount) {
                                                itemsCount = itemNumber;
                                            }
                                        }
                                    }

                                    // -----> Logic for creating array of object for gate entry
                                    for (let i = 1; i <= itemsCount; i++) {
                                        const itemCode = req_body_details[`PRODUCT_${i}`] || "";
                                        const hsnCode = req_body_details[`HSN_CODE_${i}`] || "";
                                        const quantity = req_body_details[`QUANTITY_${i}`] || "";
                                        const amount = req_body_details[`amount_${i}`] || "";

                                        const itemObject = {
                                            item_code: itemCode,
                                            hsn_code: hsnCode,
                                            quantity: quantity,
                                            amount: amount,
                                        };

                                        details_payload.push(itemObject);
                                    }

                                    console.log(
                                        "the final detail payload: : : : ",
                                        details_payload
                                    );
                                    console.log("the final  payload: : : : ", req_body);

                                    //adding details in req body
                                    req_body.details = details_payload;

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
                                        console.log(req_body.details.length);

                                        $("#tab_logic_body").append(`<tr>
                                    <td><input type="text" class="form-control input_size item_code text-center" readonly value="${req_body.details[i].item_code}" ></td>
                                    <td><input type="text" class="form-control input_size hsn_code text-center" readonly value="${req_body.details[i].hsn_code}"></td>
                                    <td><input type="text" class="form-control input_size quantity text-center" readonly value="${req_body.details[i].quantity}"></td>
                                    <td><input type="text" class="form-control input_size amount text-center" readonly value="${req_body.details[i].amount}"></td>
                                </tr>`);

                                        $("#modal_table_details").append(`<tr>
                                <td class="text-center border py-2 po_1" id="detail_po_no">${$("#po_number").val()}</td>
                                <td class="text-center border py-2 des_1" id="">${req_body.details[i].item_code}</td>
                                <td class="text-center border py-2 qty_1">${req_body.details[i].quantity}</td>
                                <td class="text-center border py-2 unit_1"></td>
                                <td class="text-center border py-2 remark_1"></td>
                              </tr>`)
                                        // const element = $(".check")[i];
                                        // if (req_body[`${$(element).attr("id")}`]) {
                                        //     $(element).val(req_body[`${$(element).attr("id")}`])
                                        // }
                                    }
                                    $("#modeldata").trigger("click")
                                    $("#loader").removeClass("ibox-content");
                                    $("#loader").removeClass("sk-loading");
                                    $("#spin1").addClass("d-none");

                                    break;
                                    // --> end of : fetching new details data
                                }
                                else if (!flag && i == loopCount) {
                                    swal("", `No Suitable Template Found in Master`, "error").then(() => {
                                        $("#loader").removeClass("ibox-content");
                                        $("#loader").removeClass("sk-loading");
                                        $("#spin1").addClass("d-none");
                                    })
                                }


                            }
                        } else {
                            swal("", "No template trained for the vendor", "error").then(() => {

                                $("#loader").removeClass("ibox-content");
                                $("#loader").removeClass("sk-loading");
                                $("#spin1").addClass("d-none");
                                $("#preview_img").addClass("invisible");
                            });

                        }

                        // --> for fetching details data ------------------------------------------

                        // let body_detail = [];

                        // let temp_startY = 0;
                        // let temp_endY =0;
                        // for (let j = 0; j < 7; j++) {
                        //     let req_body_details = {}

                        //     for (let i = 0; i < exist_details.length; i++) {

                        //         const element = exist_details[i];

                        //         let startX = +element.boundingPoly.vertices[0].x;
                        //         let startY = +element.boundingPoly.vertices[0].y;
                        //         let endX = +element.boundingPoly.vertices[1].x;
                        //         let endY = +element.boundingPoly.vertices[1].y;

                        //         if (j>0) {
                        //             startY = temp_startY;
                        //             endY = temp_endY;
                        //         }

                        //         const filteredCoordinates = vertices.filter(obj => obj.boundingPoly.vertices[0].x >= startX && obj.boundingPoly.vertices[3].x <= endX && obj.boundingPoly.vertices[0].y >= startY && obj.boundingPoly.vertices[3].y <= endY);
                        //         // Output the filtered coordinates

                        //         let out = ""
                        //         filteredCoordinates.map((des => {
                        //             out = out+des.description+" ";
                        //         }))
                        //         // Remove spaces and special characters from start and end of the string
                        //         out = out.replace(/^\s+|\s+$/g, '');
                        //         if (out.length != 0) {
                        //             req_body_details[`${element.label}`] = out
                        //         }

                        //         if (i==exist_details.length-1) {

                        //             temp_startY = endY;
                        //             temp_endY = endY + (endY-startY);
                        //         }

                        //     }
                        //     console.log(req_body_details);
                        //     body_detail.push(req_body_details)

                        // }

                        // console.log("req_body_details : ",body_detail);
                        // --> end of fetching details data ------------------------------------------

                        // });
                    } else {
                        swal("", res.error, "error");
                        $("#loader").removeClass("ibox-content");
                        $("#loader").removeClass("sk-loading");
                        $("#spin1").addClass("d-none");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Error uploading image:", error);
                });
        });
    });

    // ---->End of OCR Extraction and saving to output.json<----

    $("form")[0].reset();
    var number;

    $(window).load(() => {
        let gateId = JSON.parse(sessionStorage.getItem("gateId"));
        console.log(gateId);
        // console.log([test[0].url]);

        $.ajax({
            url: `${[test[0].url]}/gate/find?gateid=${gateId}`,
            headers: {
                'Authorization': 'Bearer ' + token,
              },
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
            }
        });
    });

    // $(".add").css("display", "none");
    // var id;

    $("#save").click((e) => {
        let count = 0;

        // var codes = [];
        var tag_code = [];

        e.preventDefault();

        // var code = 100;

        // var gate = $("#gate_number").html()

        for (let i = 0; i < $(".fetch_check").length; i++) {
            let check = $(".fetch_check")[i];
            // let code;
            // console.log("fetch : " + i);
            if ($(check).val() != "") {
                count++;
                $(check).css("border", "1px solid #e5e6e7");

                console.log(count);

                if (count == $(".fetch_check").length) {
                    // var span = $(".item");

                    // span.map((index, value) => {
                    //     codes.push(value.innerText.split("\n")[0]);
                    //     // console.log(codes);
                    // });

                    // $("#save").click(() => {
                    $("#loader").addClass("ibox-content");
                    $("#loader").addClass("sk-loading");
                    $("#spin1").removeClass("d-none");
                    $("#save").html("Please wait...");
                    let supplier = $("#vendorcode")[0].value;


                    req_body.gate_number = $("#gate_number").html();
                    req_body.vehicle_nbr = $("#vehicle_nbr").val();
                    req_body.vendorname = $("#vendorname").val();
                    req_body.division = $("#division").val();
                    req_body.material_type = $("#material_type").val();
                    req_body.remark = $("#remark").val();
                    req_body.weight = $("#weight").val();
                    req_body.in_time = $("#in_time").val();
                    req_body.vendor_code = $("#vendor_code").val();
                    req_body.po_number = $("#po_number").val();
                    req_body.po_type = $("#po_type").val();

                    let statu = { code: 100 };
                    // let tag = [{code : 1000}]

                    req_body.weight = parseInt(req_body.weight);
                    req_body.status = statu;

                    req_body.details = details_payload;
                    // delete req_body.details;

                    tags_value_HDR.map((res) => {
                        if (!req_body[`${res.label}`]) {
                            tags.push({ id: res.tag_id });
                        }
                    });
                    req_body.tags = tags;

                    console.log("last final payload:::::::: : ===", req_body);

                    let vendor_code = $("#vendor_code").val();
                    let DOCO = $("#po_number").val();
                    let DCTO = $("#po_type").val();
                    let weight = $("#weight").val();

                    let Supplier_name;

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


                                let req = {
                                    "po_number": $("#po_number").val(),
                                    "po_type": $("#po_type").val(),
                                    "supplier": $("#vendor_code").val(),
                                    "amount": $("#amount").val().split(",").join("")
                                }

                                console.log(req);

                                $.ajax({
                                    url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_PO_VALIDATE`,
                                    type: 'POST',
                                    data: JSON.stringify(req),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        "Authorization": "Basic " + btoa(`${login[0].username}` + ":" + `${[login[0].password]}`)
                                    },
                                    success: function (data, status, xhr) {

                                        if (data.status) {

                                            console.log("final payload to post", req_body);

                                            let fd_data = new FormData();

                                            fd_data.append("json", JSON.stringify(req_body));
                                            fd_data.append("file", files);

                                            console.log(fd_data);

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
                                                        if ($("#vendorname").val() == Supplier_name) {


                                                            $("#modalCall").trigger("click")
                                                        } else {
                                                            swal(
                                                                "",
                                                                "Vendor Name Is Not maching",
                                                                "warning"
                                                            ).then(() => {

                                                                window.open("../../gate/template/gate.jsp", "_self")
                                                                // $("#modalCall").trigger("click")

                                                            });
                                                        }
                                                    } else {
                                                        swal("", xhr.responseJSON.message, "error").then(
                                                            () => {
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

                                                    $("#loader").removeClass("ibox-content");
                                                    $("#loader").removeClass("sk-loading");
                                                    $("#spin1").addClass("d-none");
                                                    $("#save").html("SAVE");
                                                    // swal("", xhr.responseJSON.message, "error")
                                                    // console.log(xhr);
                                                    // swal("", "PO number and type not found in JDE", "error")
                                                },
                                            });
                                        }
                                        else{
                                            swal("", data.message, "error").then(()=>{
                                                $("#loader").removeClass("ibox-content");
                                                $("#loader").removeClass("sk-loading");
                                                $("#spin1").addClass("d-none");
                                                $("#save").html("SAVE");
                                            })
                                        }



                                    }, 
                                    error : function(xhr){

                                        if(xhr.status == 498)
                                        {
                                            $.tokenError();
                                        }
                                        else{
                                            swal("", xhr.responseJSON.message, "error").then(()=>{
                                                    $("#loader").removeClass("ibox-content");
                                                    $("#loader").removeClass("sk-loading");
                                                    $("#spin1").addClass("d-none");
                                                    $("#save").html("SAVE");
                                            })
                                        }
                                    }

                                })

                                //     fetch(`${[login[0].url]}/jderest/v2/bsfnservice`, {
                                //         method: "POST",
                                //         body: JSON.stringify(req),
                                //         headers: {
                                //             'Accept': 'application/json',
                                //             'Content-Type': 'application/json',
                                //             "Authorization": "Basic " + btoa(`${login[0].username}` + ":" + `${[login[0].password]}`)
                                //         }
                                //     }).then((response) => {
                                //         return response.json();
                                //     }).then((res) => {
                                //         // console.log(res.result.output[1].value);

                                //         if (res.result.output[1].value != 'F') {

                                //             console.log("final payload to post", req_body);

                                //             let fd_data = new FormData();

                                //             fd_data.append("json", JSON.stringify(req_body));
                                //             fd_data.append("file", files);

                                //             console.log(fd_data);

                                //             $.ajax({
                                //                 type: "POST",
                                //                 url: `${[test[0].url]}/gate/addgate`,
                                //                 // url: `http://192.168.0.177:8050/gate/entry`,
                                //                 data: fd_data,
                                //                 contentType: false,
                                //                 processData: false,

                                //                 // headers: {
                                //                 //     'Accept': 'application/json',
                                //                 //     'Content-Type': 'application/json'
                                //                 // },

                                //                 success: function (data, status, xhr) {
                                //                     console.log(xhr);
                                //                     if (xhr.status == 200) {
                                //                         if ($("#vendorname").val() == Supplier_name) {


                                //                             $("#modalCall").trigger("click")
                                //                         } else {
                                //                             swal(
                                //                                 "",
                                //                                 "Vendor Name Is Not maching",
                                //                                 "warning"
                                //                                 ).then(() => {

                                //                                     window.open("../../gate/template/gate.jsp", "_self")
                                //                                         // $("#modalCall").trigger("click")

                                //                             });
                                //                         }
                                //                     } else {
                                //                         swal("", xhr.responseJSON.message, "error").then(
                                //                             () => {
                                //                                 $("#loader").removeClass("ibox-content");
                                //                                 $("#loader").removeClass("sk-loading");
                                //                                 $("#spin1").addClass("d-none");
                                //                                 $("#save").html("SAVE");
                                //                                 $("form")[0].reset();
                                //                             }
                                //                         );
                                //                     }
                                //                 },

                                //                 error: function (
                                //                     xhr,
                                //                     httpStatusMessage,
                                //                     customErrorMessage
                                //                 ) {
                                //                     console.log(xhr);

                                //                     $("#loader").removeClass("ibox-content");
                                //                     $("#loader").removeClass("sk-loading");
                                //                     $("#spin1").addClass("d-none");
                                //                     $("#save").html("SAVE");
                                //                     // swal("", xhr.responseJSON.message, "error")
                                //                     // console.log(xhr);
                                //                     // swal("", "PO number and type not found in JDE", "error")
                                //                 },
                                //             });
                                //         } else {
                                //             swal(
                                //                 "",
                                //                 "PO number and type not found in JDE",
                                //                 "error"
                                //             ).then(() => {
                                //                 $("#loader").removeClass("ibox-content");
                                //                 $("#loader").removeClass("sk-loading");
                                //                 $("#spin1").addClass("d-none");
                                //                 $("#save").html("SAVE");
                                //             });
                                //         }

                                //     })
                                // }

                                //                     success: function (data) {
                                //                         console.log(data);

                                //                         var gridRecord =
                                //                             data.fs_DATABROWSE_F4301.data.gridData.summary.records;
                                //                         // Supplier_name =  data.fs_DATABROWSE_F4301.data.gridData.summary.

                                //                         if (gridRecord == 1) {
                                //                             console.log("final payload to post", req_body);

                                //                             let fd_data = new FormData();

                                //                             fd_data.append("json", JSON.stringify(req_body));
                                //                             fd_data.append("file", files);

                                //                             console.log(fd_data);

                                //                             $.ajax({
                                //                                 type: "POST",
                                //                                 url: `${[test[0].url]}/gate/addgate`,
                                //                                 // url: `http://192.168.0.177:8050/gate/entry`,
                                //                                 data: fd_data,
                                //                                 contentType: false,
                                //                                 processData: false,

                                //                                 // headers: {
                                //                                 //     'Accept': 'application/json',
                                //                                 //     'Content-Type': 'application/json'
                                //                                 // },

                                //                                 success: function (data, status, xhr) {
                                //                                     console.log(xhr);
                                //                                     if (xhr.status == 200) {
                                //                                         if ($("#vendorname").val() == Supplier_name) {


                                //                                             $("#modalCall").trigger("click")
                                //                                         } else {
                                //                                             swal(
                                //                                                 "",
                                //                                                 "Vendor Name Is Not maching",
                                //                                                 "warning"
                                //                                                 ).then(() => {

                                //                                                         $("#modalCall").trigger("click")

                                //                                             });
                                //                                         }
                                //                                     } else {
                                //                                         swal("", xhr.responseJSON.message, "error").then(
                                //                                             () => {
                                //                                                 $("#loader").removeClass("ibox-content");
                                //                                                 $("#loader").removeClass("sk-loading");
                                //                                                 $("#spin1").addClass("d-none");
                                //                                                 $("#save").html("SAVE");
                                //                                                 $("form")[0].reset();
                                //                                             }
                                //                                         );
                                //                                     }
                                //                                 },

                                //                                 error: function (
                                //                                     xhr,
                                //                                     httpStatusMessage,
                                //                                     customErrorMessage
                                //                                 ) {
                                //                                     console.log(xhr);

                                //                                     $("#loader").removeClass("ibox-content");
                                //                                     $("#loader").removeClass("sk-loading");
                                //                                     $("#spin1").addClass("d-none");
                                //                                     $("#save").html("SAVE");
                                //                                     // swal("", xhr.responseJSON.message, "error")
                                //                                     // console.log(xhr);
                                //                                     // swal("", "PO number and type not found in JDE", "error")
                                //                                 },
                                //                             });
                                //                         } else {
                                //                             swal(
                                //                                 "",
                                //                                 "PO number and type not found in JDE",
                                //                                 "error"
                                //                             ).then(() => {
                                //                                 $("#loader").removeClass("ibox-content");
                                //                                 $("#loader").removeClass("sk-loading");
                                //                                 $("#spin1").addClass("d-none");
                                //                                 $("#save").html("SAVE");
                                //                             });
                                //                         }

                                //     // var record = data.fs_DATABROWSE_F0101.data.gridData.summary.records;
                                //   },
                                //   error: function (xhr, httpStatusMessage, customErrorMessage) {
                                //     console.log(xhr);
                                //     swal("", xhr.responseJSON.exception, "error").then(
                                //       () => {
                                //         $("#loader").removeClass("ibox-content");
                                //         $("#loader").removeClass("sk-loading");
                                //         $("#spin1").addClass("d-none");
                                //         $("#save").html("SAVE");
                                //       }
                                //     );
                                //     // console.log(xhr.responseJSON.sysErrors[0].TITLE);
                                //   },
                                // });
                            }
                            else {
                                swal("", "No Vendor in JDE", "error").then(() => {
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
                                    $("#loader").removeClass("ibox-content");
                                    $("#loader").removeClass("sk-loading");
                                    $("#spin1").addClass("d-none");
                                    $("#save").html("SAVE");
                                }
                            );
                        },
                    });


                }
            } else {
                $(check).css("border", "1px solid rgb(215 150 156)");
            }
        }
    });


    $('input[name="vendor_select"]').change(function () {

        console.log("yes");


        if ($(this).is(':checked')) {
            console.log('Radio button selected: ' + $(this).val());
        }
    })


    $("#cancel1").click((e) => {
        e.preventDefault();
        window.open("../template/gate.jsp", "_self");
        $("form")[0].reset();
    });

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

    $("#myModal20").on('hide.bs.modal', function () {
        // Clear the contents of the modal
        Vtable.destroy();
        $("#Vendor_body").empty();

    });

    // $("#skip").click(()=>{
    //     // Clear the contents of the modal
    //     window.open("../../gate/template/gate.jsp", "_self")
    // });








    var uppy = Uppy.Core()

        .use(Uppy.Dashboard, { inline: true, target: '#drag-drop-area' })
    // .use(Uppy.Tus, {endpoint: 'http://192.168.0.177:8050/ap_automation_backend/additional/document/add'})


    uppy.on('complete', (result) => {
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
            formData.append('file', files_arr.data);
        });

        formData.append('gate', gate);
        // console.log(...file);


        $.ajax({
            url: `${[test[0].url]}/additional/document/add`,
            type: 'POST',
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
                    console.log('Files uploaded successfully');
                    console.log('API response:', response);
                    $("#skip").trigger("click")

                    // Process the response from your API
                    // window.open("../../gate/template/gate.jsp", "_self")
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
        });
    }
});


