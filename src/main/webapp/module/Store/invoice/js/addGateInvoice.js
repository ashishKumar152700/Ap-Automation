
        $(document).ready(()=>{


           
            
           


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
            const user_store = JSON.parse(localStorage.getItem("store"));




            
        


              
            
         
            


            
            $(".check").attr("readonly" , "readonly")
            
            var entity = [];
            var details = [];
            var reciept_no = []
            var Matched_item = [];
            var Matched_line_no = [];
            var obj_success;
            let grid_details_append = []
            let grn_done = false;
            var invoice_pdf;
            let override_taxable_value;
            let nrb_lcr_object;

            
            var test = $.test();
            var login = $.login();
            var vision = $.vision();
        
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
                        ordering: false,
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
                        // ordering: true,
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

        sessionStorage.setItem('object', JSON.stringify(obj))
        grid_details_append =  obj.details;
        
        // console.log(JSON.stringify(data.data[0].details))
        // obj_success = data.data[0];
        console.log("obj",obj);


        for(let i = 0 ; i < $(".check").length ; i++)
        {

            let check_id = $(".check")[i].getAttribute("id")
            let check_value = $(".check")[i]

                $(check_value).val(obj[`${check_id}`])

        }


        $.debitNote(obj)



        let conditionCheck , recieptNumberAvail = false;

        conditionCheck = obj.details.map((values)=> values.receipt_number != null);

        if(obj.receipt_number)
        {
            recieptNumberAvail = true;
        }
        else if(conditionCheck.includes(true)){
            
            recieptNumberAvail = true;
        }
        else{
            recieptNumberAvail = false;
        }

            

        var gate_numbers = $("#gate_number").html(data.data[0].gate_number);
        var company_codes = $("#company_code").val(data.data[0].company_code);
        var business_units = $("#business_unit").val(data.data[0].business_unit);
        var doc_companys = $("#doc_company").val(data.data[0].doc_company);
        var states = $("#state").val(data.data[0].state);
        // $("#state_select_table").val(data.data[0].state);
        var invoice_numbers = $("#invoice_number").val(data.data[0]?.invoice_number);
        var invoice_numberss = $("#invoice_noo").val(data.data[0]?.invoice_number);
        $("#invoice_noo_entry").val(data.data[0]?.invoice_number);
        var invoice_types = $("#invoice_type").val(data.data[0].invoice_type);
        var currency_codes = $("#curr_code").val(data.data[0].currency_code);
        var supplier_gstins = $("#supplier_gstin").val(data.data[0].supplier_gstin);
        var tds_codes = $("#tds_code").val(data.data[0].tds_code);
        var vendor_codes = $("#vendor_code").val(data.data[0].vendor_code).val()
        console.log(vendor_codes,'vendor code-------------------')
        var invoice_dates = $("#invoice_date").val(data.data[0].invoice_date.split("-").reverse().join("-"));
        // var GL_dates = $("#gl_date").val(recieptNumberAvail ? new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")  : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-"));
        var GL_dates = $("#gl_date").val(recieptNumberAvail ? data.data[0].gl_date.split("-").reverse().join("-")  : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-"));
        var amounts = $("#amount").val(data.data[0].amount);
        $("#Total_Invoice_amount").val(data.data[0].amount);
        $(".amount").val(data.data[0].amount);
        var sources = $("#source").val(data.data[0].source);
        var physical_docs = $("#physical_doc_rec").val(data.data[0].physical_doc);
        var vendornames = $("#vendor_name").val(data.data[0].vendorname);
        $("#road_permit_number").val(data.data[0].eway_Bill == null || data.data[0].eway_Bill == "" ? data.data[0].roadPermitNumber : data.data[0].eway_Bill);
        // $("#gl_date").val(recieptNumberAvail ? data.data[0].gl_date.split("-").reverse().join("-") : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-"));
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
        $("#storeId").val(data.data[0].storeId)
        $("#dc_number_type").val(data.data[0].dc_type)


        if(data.data[0].deliveryChallanNumber == null)
        {
            $("#dc_number_type").attr("disabled" , "disabled")
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
        console.log("match_line number" , Matched_line_no);


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






//      // Use setTimeout to remove read-only attribute after 5 seconds
// setTimeout(() => {
   
// }, 5000);

// Make asynchronous AJAX request



// Make AJAX request
$.ajax({
    url: `${[test[0].url]}/ocrtraining/get?supplier=${vendor_codes}`,
    async: false,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    success: function(data, status, xhr) {
        // console.log(data, '99999999999999999999999999');

        // Get override_taxable_value from response

        if(xhr.status == 200)
        {

            override_taxable_value = data.data[0].override_taxable_value;
            console.log(override_taxable_value, 'override_taxable_value');
        }
        else{

            $.errorMessage(xhr.responseJSON.message)
            
        }


        // swal({  
        //     title: "Success",
        //     text: "Data loaded successfully",
        //     icon: "success",
        // });
    },
    error: function(xhr) {
        if (xhr.status == 498) {
            $.tokenError();
        } else {
            console.error("Error:", xhr.responseJSON.message);
            $.errorMessage(xhr.responseJSON.message)       //swal error message

            // swal({
            //     title: "Error",
            //     text: "Failed to load data",
            //     icon: "error",
            // });
        }
    },
});





        

        $("#fetch_btn").trigger("click")
        

        for (let i = 0; i < data.data[0].details.length; i++) {
            // $("#add_row").trigger("click");
        $("#tab_logic_body").append(`<tr>
            <td><input type="text" class="form-control input_size item_code text-center" readonly value="${data.data[0].details[i].item_code}" ></td>
            <td><input type="text" class="form-control input_size item_description text-center" readonly value="${data.data[0].details[i].description1}" ></td>
            <td><input type="text" class="form-control input_size fix hsn_code text-center" readonly value="${data.data[0].details[i].hsn_code}"></td>
            <td><input type="text" class="form-control input_size fix uom text-center" readonly value="${data.data[0].details[i].uom}"></td>
            <td><input type="text" class="form-control input_size fix quantity text-center" readonly value="${data.data[0].details[i].quantity}"></td>
            <td><input type="text" class="form-control input_size fix unit_amount text-center" readonly value="${data.data[0].details[i].unit_amount}"></td>
            <td><input type="text" class="form-control input_size fix amount text-center" readonly value="${data.data[0].details[i].amount}"></td>
        </tr>`);

        }

        let b = 2;

        

        
        let receipt = data.data[0].details.filter((value)=> value.receipt_number)
        console.log(receipt);

        reciept_no.push(receipt)

        if(reciept_no.flat(Infinity).includes(null) != true && reciept_no.flat(Infinity).length > 0)
        {

            $(".fetch_check").attr("readonly" , "readonly");
            $("#reject_invoice").addClass("invisible")
            $("#invoice_noo_entry").val($("#invoice_noo").val())
            $("#calculate_diffrence").parent().parent().addClass("d-none")

            if(obj.dc_type == "Unprocessed")
                {
                    $("#data_list8").removeClass("d-none");
                    $("#submit_invoice").parent().addClass("d-none");

                }

            var d = 2; 
            // url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.LOCN&$field=F43121.URDT&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$field=F43121.MCU&$filter=F43121.DOCO EQ 23000017&$filter=F43121.DCTO EQ ON&$filter=F43121.CNID EQ 1053/23-24&$filter=F43121.DCT EQ OV&$field=F43121.AREC&$field=F43121.VRMK&$field=F43121.CNID&$field=F43121.MATC&$filter=F43121.MCU EQ 20100`,
            
            for( let i = 0 ; i < 1; i++){
            $.ajax({
            url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.LOCN&$field=F43121.GLC&$field=F43121.DGL&$field=F43121.URDT&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$filter=F43121.MATC EQ 1&$filter=F43121.MCU EQ 20100&$field=F43121.MCU&$filter=F43121.DOCO EQ ${$("#purchase_order").val()}&$filter=F43121.DCTO EQ ${$("#purchase_type").val()}&$filter=F43121.CNID EQ ${$("#invoice_noo").val()}&$filter=F43121.DCT EQ OV&$field=F43121.AREC&$field=F43121.VRMK&$field=F43121.CNID`,
            // type : 'POST',
            // data : JSON.stringify(grn_head),
            headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json',
                    "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                },

                success: function(data){

                    console.log("grn data : ",data);


                    $("#data_list").removeClass("invisible");
                    $("#data1").trigger("click")

                    // console.log(data);
                    // let grn_len = $("#grn_table tr").length - 2
                    let grn_rows = data.fs_DATABROWSE_F43121.data.gridData.rowset

                    
                    let table_rows = $("#grn_table tr").length - 2;
                    
                    let valid_data = $(".order_no")[0]

                    for(let j = 0 ; j < (table_rows == 0 && $(valid_data).val() == "" ? grn_rows.length -1 : grn_rows.length); j++)
                    {
                        $("#grn_row").trigger("click");
                    }
                    
                    for(let i = (table_rows == 0 ? table_rows : table_rows + 1) , p = 0 ; i < (table_rows == 0  ? table_rows + grn_rows.length  : (table_rows + 1) + grn_rows.length) ; i++ , p++)
                    {
                     

                        // console.log("MATCH TYPE: ",typeof +grn_rows[i].F43121_MATC);

                        if($(valid_data).val() != null && table_rows == 0 && d  == 0){

                        // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

                                for(let s = 0 ; s < grn_rows.length ; s++)
                                {
                                  
                                    let order_no = $(".document_no")[s+1]
                                    let item_no = $(".do_ty")[s+1]
                                    let business_unit_grn = $(".business_unit_grn")[s+1]
                                    let document_no = $(".item_no")[s+1]
                                    let invoice_no_grn = $(".invoice_no_grn")[s+1]
                                    let do_ty = $(".quantity_recieved")[s+1]
                                    let quantity_recieved = $(".order_no")[s+1]
                                    let amount_open = $(".amount_open")[s+1]
                                    let location = $(".location")[s+1]
                                    let user_date = $(".user_date")[s+1]
                                    let glc = $(".glc")[s+1]
                                    let gl_date = $(".gl_date")[s+1]

                                    +grn_rows[s].F43121_MATC == 4 ? $(user_date).parent().parent().css("background-color" , "red") : "";


                                    $(order_no).val(grn_rows[s].F43121_DOC)
                                    $(item_no).val(grn_rows[s].F43121_DCT)
                                    $(business_unit_grn).val(grn_rows[s].F43121_MCU.replace(/ /g,''))
                                    $(document_no).val(grn_rows[s].F43121_LITM)
                                    $(invoice_no_grn).val(grn_rows[s].F43121_CNID)
                                    $(do_ty).val(grn_rows[s].F43121_UREC)
                                    $(quantity_recieved).val(grn_rows[s].F43121_VRMK.replace(/ /g,''))
                                    $(amount_open).val(grn_rows[s].F43121_AREC)
                                    $(location).val(grn_rows[s].F43121_LOCN)
                                    $(glc).val(grn_rows[s].F43121_GLC);
                                    let inputDate = grn_rows[s].F43121_URDT;
                                    let inputGLDate = grn_rows[s].F43121_DGL;
                                    let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
                                    let formattedGLDate = `${inputGLDate.substr(0, 4)}-${inputGLDate.substr(4, 2)}-${inputGLDate.substr(6, 2)}`
                                    $(user_date).val(formattedDate.split("-").reverse().join("-"))
                                    $(gl_date).val(formattedGLDate.split("-").reverse().join("-"))
                                    // $(user_date).val(grn_rows[s].F43121_URDT)

                                    if(+grn_rows[s].F43121_MATC == 4)
                                    {
                                        $(user_date).parent().parent().children().children().css("color" , "red")

                                    }
                                        }

                                break;
                        }

                        else{

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

                            
                            
                            
                            $(order_no).val(grn_rows[p].F43121_DOC)
                            $(item_no).val(grn_rows[p].F43121_DCT)
                            $(business_unit_grn).val(grn_rows[p].F43121_MCU.replace(/ /g,''))
                            $(document_no).val(grn_rows[p].F43121_LITM)
                            $(invoice_no_grn).val(grn_rows[p].F43121_CNID)
                            $(do_ty).val(grn_rows[p].F43121_UREC)
                            $(quantity_recieved).val(grn_rows[p].F43121_VRMK.replace(/ /g,''))
                            $(amount_open).val(grn_rows[p].F43121_AREC)
                            $(location).val(grn_rows[p].F43121_LOCN)
                            $(glc).val(grn_rows[p].F43121_GLC)
                            let inputDate = grn_rows[p].F43121_URDT;
                            let inputGLDate = grn_rows[p].F43121_DGL;
                            let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
                            let formattedGLDate = `${inputGLDate.substr(0, 4)}-${inputGLDate.substr(4, 2)}-${inputGLDate.substr(6, 2)}`
                            $(user_date).val(formattedDate.split("-").reverse().join("-"))
                            $(gl_date).val(formattedGLDate.split("-").reverse().join("-"))

                            console.log(+grn_rows[p].F43121_MATC == 4);
                            if(+grn_rows[p].F43121_MATC == 4)
                            {
                                // $(user_date).parent().parent().css("background-color" , "red")
                                $(user_date).parent().parent().children().children().css("color" , "red")

                            }

                        }


                        d = grn_rows.length == 1 ? 0 : 2;

    
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


                    if( k == data.data[0].details.length - 1)
                    {
                        $("#loader").removeClass("sk-loading")
                    }
                    
                    // {

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

                        if(i == data.data[0].details.length - 1)
                        {
                            $("#loader").removeClass("sk-loading")
                        }

                    
                    

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
                    });

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
                    });

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
                            console.log(Matched_item.flat(Infinity).includes($(".po_item")[i]?.value));
                            console.log(Matched_line_no.flat(Infinity).includes($(".line_numm")[i]?.value));

                            if(Matched_item.flat(500).includes($(".po_item")[i]?.value) && Matched_line_no.flat(Infinity).includes($(".line_numm")[i]?.value))
                            {

                                console.log($("#table-body tr")[i]);

                                console.log('matching item and line number');
                               
                            }
                            else{
                                
                                remove_list.push($("#table-body tr")[i])
                            }
                            
                        }

                        console.log("list " , remove_list);

                        remove_list.map((value)=> value.remove())

                        tab_count =  $("#table-body tr").length -1 == 0 ? 1 : 0; 
                        // console.log(" length " , $("#table-body tr").length);

                        let new_result = Object.values(obj.details.reduce((acc, item) => {
                            const key = `${item.jdeItem}-${item.lineNumber}`;
                            acc[key] = acc[key] || { ...item, quantity: "0", actualRecievedQuantity: "0" };
                            acc[key].quantity = String(Number(acc[key].quantity) + Number(item.quantity));
                            acc[key].actualRecievedQuantity = String(Number(acc[key].actualRecievedQuantity) + Number(item.actualRecievedQuantity));
                            return acc;
                          }, {}));
                          
                          console.log("new object result" , new_result);
                          


                        for(let i = 0 ; i <  $("#table-body tr").length ; i++)
                        {
                            for(let j = 0 ; j < new_result.length ; j++)
                            {

                                if($(".po_item")[i].value == new_result[j].jdeItemCode)
                                {

                                    // $(".Sacnned_qty")[i].value = obj.details[j]?.quantity
                                    // $(".accept_quantity")[i].value = obj.details[j]?.actualRecievedQuantity
                                    // $(".short_quantity")[i].value = (+$(".Sacnned_qty")[i].value.split(" ")[0]) - (+$(".accept_quantity")[i].value)

                                    // console.log(`${}obj.details[i]?.actualRecievedQuantity);
                                    $(".Sacnned_qty")[i].value = new_result[j]?.quantity != null ? new_result[j]?.quantity : obj?.weight ;
                                    $(".accept_quantity")[i].value = new_result[j]?.actualRecievedQuantity
                                    let scanned_values1 = $(".Sacnned_qty")[i].value.split(" ")[0]
                                    // let arr2 = scanned_values1.split(/[,]/).join("")
                                    $(".short_quantity")[i].value = (+scanned_values1) - (+$(".accept_quantity")[i].value)

                                    $(".taxable_value")[i].value = new_result[j]?.taxValue
                                    $(".taxable_amount_payload")[i].value = new_result[j]?.taxAmount
                                    $(".Location")[i].value = new_result[j]?.location
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
                            <td class="text-center p-0"><input type="text"  class="form-control input_size detail_company_code text-center" id="" value="${dataa[0]}"></td>
                            <td class="text-center p-0"><input type="text"  class="form-control input_size onee text-center" id="po_number" value="${dataa[1]}"></td>
                            <td class="text-center p-0"><input type="text"  id="po_type" class="form-control input_size po_type text-centert" value="${dataa[2]}"></td>
                            <td class="text-center p-0"><input type="text"  class="form-control input_size line_numm text-center" id="line_number" value="${dataa[3]}"></td>
                            <td class="text-center p-0"><input type="text"  class="form-control input_size po_item text-center" id="item_code" value="${dataa[4]}"></td>
                            <td class="text-center p-0"><input type="text"  class="form-control input_size description_item text-center" id="" value="${dataa[5]}"></td>
                            <td class="text-center p-0"><input type="text"  class="form-control input_size cost_rule text-center" id="" value="${dataa[6]}"></td>
                            <td class="text-center p-0"><input type="text"  id="uom" class="form-control input_size currency text-center" value="${dataa[7]}"></td>
                            <td class="text-center p-0"><input type="text"  id="unit_cost" class="form-control input_size unit_cost text-center" value="${dataa[8]}"></td>
                            <td class="text-center p-0 d-none"><input type="text" readonly class="form-control input_size details_statuss text-center" id=""></td>
                            <td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-center" id="" value="${dataa[10]}"></td>
                            <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-center" ></td>
                            <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-center"></td>
                            <td class="text-center p-0"><input type="text" id=""  class="form-control input_size Sacnned_qty text-center" id="quantity" value=""></td>
                            <td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-center"></td>
                            <td class="text-center p-0"><input type="text" id=""  class="form-control input_size short_quantity text-center"></td>
                            <td class="text-center p-0"><input type="text" id=""  class="form-control input_size taxable_value text-center"></td>
                            <td class="text-center p-0"><input type="text" id=""  class="form-control input_size taxable_amount_payload text-center"></td>
                            <td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size description text-center" value="${dataa[16]}"></td>
                            <td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size business_detail text-center" value="${dataa[17]}"></td>
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
                            "quantity":null,
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
                            "description1": dataa[5],
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





                    // $("#tab_logicc").on("mouseover" , "td" , function(){

                    //     let values = $(this).children().attr("id");
                    //     // console.log(obj.details[0][`${values}`])

                    //         // Hover-in event handler
                    //         // var cellValue = $(this).text();
                    //         var cellPosition = $(this).position();
                    //         var cellWidth = $(this).outerWidth();
                    //         var boxTop = cellPosition.top + $(this).outerHeight() - 5;
                    //         var boxLeft = cellPosition.left + (cellWidth / 2);
                    //         $('#pointingBox').css({ top: boxTop, left: boxLeft }).text("Scanned value : "+ obj.details[0][`${values}`]).show();
                          
                    //         // Hover-out event handler
                    //         // $('#pointingBox').show();
                          
                        
                    // })
                    // $("#tab_logicc").on("mouseleave" , "td" , function(){

                    //     var cellPosition = $(this).position();
                    //     var cellWidth = $(this).outerWidth();
                    //     var boxTop = cellPosition.top + $(this).outerHeight() - 5;
                    //     var boxLeft = cellPosition.left + (cellWidth / 2);
                    //     $('#pointingBox').css({ top: boxTop, left: boxLeft }).text("").hide();

                          
                        
                    // })



                    let receipt_number_details;


                    $("#table-body").on("keyup" , ".accept_quantity" ,  function(){

                        if($(this).val() <=  +$(this).parents("tr").find(".Sacnned_qty").val())
                        {
                            $(this).parents("tr").find(".short_quantity").val(+$(this).parents("tr").find(".Sacnned_qty").val() - +$(this).val())
                        }
                        else{
                            $.errorMessage("Actual Quantity Can Not be More Than Scanned Quantity")

                            $(this).val(+$(this).parents("tr").find(".Sacnned_qty").val())
                            $(this).parents("tr").find(".short_quantity").val(+$(this).parents("tr").find(".Sacnned_qty").val() - +$(this).val())
                        }

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

                            $("#loader2").addClass("sk-loading")
                            $("#loader2").addClass("ibox-content")
                            $("#spin2").removeClass("d-none")

                            let next;

                            if(obj.transactionType == "ST/OT")
                            {
                            next  = 279
                            }
                            else if(obj.deliveryChallanNumber != null)
                            {
                            next  = 280
                            }
                            else{
                            next = 400
                            }

                            let req = {
                                po_number: $("#purchase_order").val().replace(/ /g,''),
                                po_type: $("#purchase_type").val().replace(/ /g,''),
                                supplier: $("#vendor_code").val().replace(/ /g,''),
                                amount: +$('#taxable_value').val().split(",").join(""),
                                date_today: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").reverse().join("-"),
                                next_status : next
                              };

                              console.log("req :" , req);


                              if($("#dc_number_head").val() != "")
                                {
                                $.ajax({
                                    url : `${[test[0].url]}/gate/validate/wo?dcNumber=${$("#dc_number_head").val()}&supplier=${$("#vendor_code").val()}&gateNumber=${obj.gate_number}&business_unit=20100`,
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
                                            $("#loader2").removeClass("sk-loading")
                                            $("#loader2").removeClass("ibox-content")
                                            $("#spin2").addClass("d-none")
                                            $.errorMessage(data.message)

                                            let today = new Date();
                                            let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                            let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');


                                            $.ajax({
                                                url : `${[test[0].url]}/remark/add`,
                                                type : 'POST',
                                                data : JSON.stringify({

                                                    gate_number: $("#gate_number").html(),
                                                    remark : data.message.toUpperCase(),
                                                    status  : 200,
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

                                        }
                                        else{

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
                    
                                                if($("#table-body tr").length != 0)
                                                {
                    
                                                    
                    
                                                e.preventDefault();
                    
                                                let sum_amount = 0;
                                                let sum_tax = 0;
                    
                                                for(let i = 0 ; i < $("#table-body tr").length ; i++)
                                                {
                    
                                                    let qty = $(".Sacnned_qty")[i].value


                                                    console.log("qty :",qty);
                                                    let tax_payload = {
                    
                                                        po_number: $(".onee")[i].value,
                                                        po_type: $(".po_type")[i].value,
                                                        po_company: $(".detail_company_code")[i].value,
                                                        currency_code: $("#curr_code").val(),
                                                        line_number: $(".line_numm")[i].value,
                                                        quantity: qty,
                                                        product_description: $(".description")[i].value,
                                                        vendor_code : $("#vendor_code").val(),
                                                        item_code : $(".po_item")[i].value
                                                        // product_description: "C.B BKT 620JT WITH COATING"
                                                    
                                                    }
                                                    

                                                    let async_value;
                                                    if($("#table-body tr").length > 1)
                                                    {
                                                        async_value = false
                                                    }else{
                                                        async_value = true
                                                    }

                                                    console.log("payload :" ,tax_payload);
                                                
                    
                                                        $.ajax({
                                                            url: `${[test[0].url]}/validateTax`,
                                                            type : 'POST',
                                                            async : async_value,
                                                            data : JSON.stringify(tax_payload),
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                'Authorization': 'Bearer ' + token,
                                                            },
                                            
                                                            success: function(data){
                    
                                                                console.log("tax data: ", data);
                    
                                                                $(".taxable_value")[i].value = data.Taxable_Amount
                                                                $(".taxable_amount_payload")[i].value = data.Tax_Amount
                                                                $(".CGST_Amount")[i].value = data.CGST_Amount
                                                                $(".SGST_Amount")[i].value = data.SGST_Amount
                                                                $(".IGST_Amount")[i].value = data.IGST_Amount
                                                                $(".Location")[i].value = data.Location
                                                                sum_amount = sum_amount + data.Total_Invoice_Amount
                                                                sum_tax = sum_tax + data.Taxable_Amount
                    
                    
                                                            },
                                                            error: function(xhr){
                    
                                                                $.errorMessage(xhr.responseJSON.message)
                    
                                                                $("#loader2").removeClass("sk-loading")
                                                                $("#loader2").removeClass("ibox-content")
                                                                $("#spin2").addClass("d-none")
                                                            },
                                                            complete : ()=>{
                    
                                                                if(i == $("#table-body tr").length -1)
                                                                {
                    
                    
                                                                    
                    
                                                                        for(let i = 0 ; i < $("#table-body tr").length ; i++)
                                                                        {
                    
                                                                            for(let j = 0 ; j < obj.details.length ; j++)
                                                                            {
                                                                               
                                                                                if(obj.details[j].jdeItemCode == $(".po_item")[i].value)
                                                                                {
                                                                                    obj.details[j].actualRecievedQuantity = $(".accept_quantity")[i].value
                                                                                    obj.details[j].taxValue = $(".taxable_value")[i].value
                                                                                    obj.details[j].location = $(".Location")[i].value
                                                                                    obj.details[j].taxAmount = $(".taxable_amount_payload")[i].value
                                                                                }
                                                                            }
                    
                                                                        }
                    
                                                                        $("#Total_Amount").val(sum_amount)
                                                                        $("#Diffrence").val((+$("#amount").val().replace("," , "") - sum_amount).toFixed(2))
                                                                        let tax_values = +$("#taxable_value").val() - sum_tax 

                                                                        console.log('tax_values ---->' ,tax_values);
                    
                    
                                                                        obj.status = {code : 200};
                                                                        obj.roadPermitNumber = $("#road_permit_number").val()
                                                                        // obj.receipt_number = receipt_number_details;
                                                                        obj.company_code = $("#company_code").val()
                                                                        obj.business_unit = $("#business_unit").val()
                                                                        obj.state = $("#state").val()
                                                                        // obj.invoice_number = $("#invoice_noo_entry").val()
                                                                        obj.invoice_date = $("#invoice_date").val().split("-").reverse().join("-")
                                                                        obj.invoice_type = $("#invoice_type").val()
                                                                        obj.currency_code = $("#curr_code").val()
                                                                        obj.supplier_gstin = $("#supplier_gstin").val()
                                                                        obj.tds_code = $("#tds_code").val()
                                                                        obj.vendor_code = $("#vendor_code").val()
                                                                        obj.vendorname = $("#vendor_name").val()
                                                                        obj.physical_doc = $("#physical_doc_rec").val()
                                                                        obj.source = $("#source").val()
                                                                        obj.amount = $("#amount").val()
                                                                        obj.gl_date = $("#gl_date").val().split("-").reverse().join("-")
                                                                        obj.tax_difference = $("#Diffrence").val()
                                                                        obj.tax_total_amount = $("#Total_Amount").val()
                    
                    
                    
                                                                            $.ajax({
                                                                                url : `${[test[0].url]}/gate/put?id=${Gate_no}`,
                                                                                type : 'PUT',
                                                                                data : JSON.stringify(obj),
                                                                                headers: {
                                                                                    'Accept': 'application/json',
                                                                                    'Content-Type': 'application/json',
                                                                                    'Authorization': 'Bearer ' + token,
                                                                                },
                                                                                success : (data,status,xhr)=>{
                    
                                                                                    if(xhr.status == 200)
                                                                                    {
                    
                                                                                        console.log("data saved", data);
                                                                                        // alert("done")
                                                                                    }
                                                                                    else{
                    
                                                                                            $.errorMessage(xhr.responseJSON.message);
                                                                                    }
                                                                                
                                                                                },
                                                                                error : (xhr)=>{
                                                                                    
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
                    
                    
                    
                    
                                                                    $("#loader2").removeClass("sk-loading")
                                                                    $("#loader2").removeClass("ibox-content")
                                                                    $("#spin2").addClass("d-none")

                                                                    console.log("override_taxable_value : " , override_taxable_value);
                                                                    
                                                                    if(override_taxable_value)
                                                                    {
                                                                        $("#override_taxable_value").removeClass("d-none")
                                                                        $("#calculate_diffrence").addClass("d-none")
                                                                    }
                                                                    if(($("#Diffrence").val() == 0 && (tax_values == 0 || tax_values <= 1 && tax_values > -1 )) || $("#dc_number_type").val() == "Unprocessed")
                                                                    {
                    
                                                                        $(".po_item").parent().parent().removeClass("table-danger")
                                                                        $(".po_item").parent().parent().addClass("table-success")
                                                                        $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                                                                        $(".po_item").parent().parent().children().children().css("border" , "none")
                                                                        $("#create_grn").removeClass("invisible")
                    
                                                                    }
                                                                    else if(($("#Diffrence").val() <= 1 && $("#Diffrence").val() > -1) && (tax_values == 0 || tax_values <= 1 && tax_values > -1 )){
                    
                                                                        // $.errorMessage(`PO Total Does Not Match But Under Tolerance...Do You Want To Proceed?`)
                    
                                                                        $(".po_item").parent().parent().removeClass("table-success")
                                                                        $(".po_item").parent().parent().addClass("table-warning")
                                                                        $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                                                                        $(".po_item").parent().parent().children().children().css("border" , "none")
                                                                        $("#create_grn").removeClass("invisible")
                    
                                                                    }
                                                                    else{

                                                                        if((+$("#Diffrence").val() > 1 || +$("#Diffrence").val() < -1) && (tax_values != 0 || tax_values > 1 && tax_values < -1)){

                                                                            $.errorMessage(`PO Taxable Value Not Matched And PO Total Amount Not Matched`)
                                                                        }
                                                                        else if(tax_values != 0 || tax_values > 1 && tax_values < -1)
                                                                        {
                                                                            $.errorMessage("PO Taxable Value Not Matched")
                                                                        }
                                                                        else if((+$("#Diffrence").val() > 1 || +$("#Diffrence").val() < -1) && (+$("#Diffrence").val() != 0)){

                                                                            $.errorMessage("PO Total Amount Not Matched")
                                                                        }
                    
                                                                        $(".po_item").parent().parent().removeClass("table-success")
                                                                        $(".po_item").parent().parent().addClass("table-danger")
                                                                        $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                                                                        $(".po_item").parent().parent().children().children().css("border" , "none")
                                                                    }
                                                                }
                    
                                                            }
                    
                    
                                    
                                    
                                                        })         
                    
                    
                                                        
                                                    
                            
                    
                                                }
                                                
                                                }
                                                else{
                                                                
                                                $("#loader2").removeClass("sk-loading")
                                                $("#loader2").removeClass("ibox-content")
                                                $("#spin2").addClass("d-none")
                                                


                                                    $.errorMessage("No Grid Present In The Table to Calculate")
                                                }
                                            }
                                            ,error : function(xhr)
                                            {
                                                $("#loader2").removeClass("sk-loading")
                                                $("#loader2").removeClass("ibox-content")
                                                $("#spin2").addClass("d-none")
                                                console.log(xhr);
                                                    // swal("", xhr.responseJSON.message.DREQ_AP_PO_Header.Message, "error")
                    
                                                    try {
                                                        console.log("try");
                                                        $.errorMessage(xhr.responseJSON.message.DREQ_AP_PO_Header.Message)
                                                    }
                                                    catch (error) {
                                                        
                                                        try {
                    
                                                            console.log("inside try ");
                                                            
                                                            $.errorMessage(xhr.responseJSON.message)
                                                             
                                                        } catch (error) {
                    
                                                            console.log("insiside try catch");
                                                                                                    
                                                            $.errorMessage(xhr.responseJSON.message.DREQ_AP_PO_Header.Message)
                    
                                                        }
                                                        
                                                    }
                                                    
                    
                                                
                    
                                            }
                                        })

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
                                else{


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
            
                                        if($("#table-body tr").length != 0)
                                        {
            
                                            
            
                                        e.preventDefault();
            
                                        let sum_amount = 0;
                                        let sum_tax = 0;
            
                                        for(let i = 0 ; i < $("#table-body tr").length ; i++)
                                        {
            
                                            let qty = $(".Sacnned_qty")[i].value
                                            let tax_payload = {
            
                                                po_number: $(".onee")[i].value,
                                                po_type: $(".po_type")[i].value,
                                                po_company: $(".detail_company_code")[i].value,
                                                currency_code: $("#curr_code").val(),
                                                line_number: $(".line_numm")[i].value,
                                                quantity: qty,
                                                product_description: $(".description")[i].value,
                                                vendor_code : $("#vendor_code").val(),
                                                item_code : $(".po_item")[i].value
                                                // product_description: "C.B BKT 620JT WITH COATING"
                                            
                                            }
                                            
                                            console.log("payload :" ,tax_payload);

                                            let async_value;
                                            if($("#table-body tr").length > 1)
                                            {
                                                async_value = false
                                            }else{
                                                async_value = true
                                            }
                                        
            
                                                $.ajax({
                                                    url: `${[test[0].url]}/validateTax`,
                                                    type : 'POST',
                                                    async : async_value,
                                                    data : JSON.stringify(tax_payload),
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + token,
                                                    },
                                    
                                                    success: function(data){
            
                                                        console.log("tax data: ", data);
            
                                                        $(".taxable_value")[i].value = data.Taxable_Amount
                                                        $(".taxable_amount_payload")[i].value = data.Tax_Amount
                                                        $(".CGST_Amount")[i].value = data.CGST_Amount
                                                        $(".SGST_Amount")[i].value = data.SGST_Amount
                                                        $(".IGST_Amount")[i].value = data.IGST_Amount
                                                        $(".Location")[i].value = data.Location
                                                        sum_amount = sum_amount + data.Total_Invoice_Amount
                                                        sum_tax = sum_tax + data.Taxable_Amount
            
            
                                                    },
                                                    error: function(xhr){
            
                                                        $.errorMessage(xhr.responseJSON.message)
            
                                                        $("#loader2").removeClass("sk-loading")
                                                        $("#loader2").removeClass("ibox-content")
                                                        $("#spin2").addClass("d-none")
                                                    },
                                                    complete : ()=>{
            
                                                        if(i == $("#table-body tr").length -1)
                                                        {
            
            
                                                            
                                                            for(let i = 0 ; i < $("#table-body tr").length ; i++)
                                                            {
                                                                    let occ_count = 0;
            
                                                                    for(let j = 0 ; j < obj.details.length ; j++)
                                                                    {
                                                                        
                                                                        if(obj.details[j].jdeItemCode == $(".po_item")[i].value)
                                                                        {
                                                                            occ_count++;
                                                                        }
                                                                    }

                                                                    for(let j = 0 ; j < obj.details.length ; j++)
                                                                    {
                                                                        
                                                                        if(obj.details[j].jdeItemCode == $(".po_item")[i].value)
                                                                        {
                                                                            obj.details[j].actualRecievedQuantity = $(".accept_quantity")[i].value / occ_count
                                                                            obj.details[j].taxValue = $(".taxable_value")[i].value
                                                                            obj.details[j].location = $(".Location")[i].value
                                                                            obj.details[j].taxAmount = $(".taxable_amount_payload")[i].value
                                                                        }
                                                                    }

                                                                    console.log('occ count ---->' ,occ_count , i);
            
                                                                }
                                                            
            
                                                                // for(let i = 0 ; i < $("#table-body tr").length ; i++)
                                                                // {
            
                                                                //     for(let j = 0 ; j < obj.details.length ; j++)
                                                                //     {
                                                                        
                                                                //         if(obj.details[j].jdeItemCode == $(".po_item")[i].value)
                                                                //         {
                                                                //             obj.details[j].actualRecievedQuantity = $(".accept_quantity")[i].value / occ_count
                                                                //             obj.details[j].taxValue = $(".taxable_value")[i].value
                                                                //             obj.details[j].location = $(".Location")[i].value
                                                                //             obj.details[j].taxAmount = $(".taxable_amount_payload")[i].value
                                                                //         }
                                                                //     }
            
                                                                // }
            

                                                                $("#Total_Amount").val(sum_amount)
                                                                $("#Diffrence").val((+$("#amount").val().replace("," , "") - sum_amount).toFixed(2))
                                                                let tax_values = +$("#taxable_value").val() - sum_tax 
    
                                                                console.log('tax_values ---->' ,tax_values);
            
            
                                                                obj.status = {code : 200};
                                                                obj.roadPermitNumber = $("#road_permit_number").val()
                                                                // obj.receipt_number = receipt_number_details;
                                                                obj.company_code = $("#company_code").val()
                                                                obj.business_unit = $("#business_unit").val()
                                                                obj.state = $("#state").val()
                                                                // obj.invoice_number = $("#invoice_noo_entry").val()
                                                                obj.invoice_date = $("#invoice_date").val().split("-").reverse().join("-")
                                                                obj.invoice_type = $("#invoice_type").val()
                                                                obj.currency_code = $("#curr_code").val()
                                                                obj.supplier_gstin = $("#supplier_gstin").val()
                                                                obj.tds_code = $("#tds_code").val()
                                                                obj.vendor_code = $("#vendor_code").val()
                                                                obj.vendorname = $("#vendor_name").val()
                                                                obj.physical_doc = $("#physical_doc_rec").val()
                                                                obj.source = $("#source").val()
                                                                obj.amount = $("#amount").val()
                                                                obj.gl_date = $("#gl_date").val().split("-").reverse().join("-")
                                                                obj.tax_difference = $("#Diffrence").val()
                                                                obj.tax_total_amount = $("#Total_Amount").val()
            
            
            
                                                                    $.ajax({
                                                                        url : `${[test[0].url]}/gate/put?id=${Gate_no}`,
                                                                        type : 'PUT',
                                                                        data : JSON.stringify(obj),
                                                                        headers: {
                                                                            'Accept': 'application/json',
                                                                            'Content-Type': 'application/json',
                                                                            'Authorization': 'Bearer ' + token,
                                                                        },
                                                                        success : (data,status,xhr)=>{
            
                                                                            if(xhr.status == 200)
                                                                            {
            
                                                                                console.log("data saved", data);
                                                                                // alert("done")
                                                                            }
                                                                            else{
            
                                                                                    $.errorMessage(xhr.responseJSON.message);
                                                                            }
                                                                        
                                                                        },
                                                                        error : (xhr)=>{
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
            
            
            
            
                                                            $("#loader2").removeClass("sk-loading")
                                                            $("#loader2").removeClass("ibox-content")
                                                            $("#spin2").addClass("d-none")
                                                            console.log("override_taxable_value : " , override_taxable_value);

                                                                    
                                                            if(override_taxable_value)
                                                            {
                                                                $("#override_taxable_value").removeClass("d-none")
                                                                $("#calculate_diffrence").addClass("d-none")
                                                            }
                                                            if($("#Diffrence").val() == 0 && (tax_values == 0 || tax_values <= 1 && tax_values > -1 ))
                                                            {
            
                                                                $(".po_item").parent().parent().removeClass("table-danger")
                                                                $(".po_item").parent().parent().addClass("table-success")
                                                                $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                                                                $(".po_item").parent().parent().children().children().css("border" , "none")
                                                                $("#create_grn").removeClass("invisible")
            
                                                            }
                                                            else if(($("#Diffrence").val() <= 1 && $("#Diffrence").val() > -1) && (tax_values == 0 || tax_values <= 1 && tax_values > -1 )){
            
                                                                // $.errorMessage(`PO Total Does Not Match But Under Tolerance...Do You Want To Proceed?`)
            
                                                                $(".po_item").parent().parent().removeClass("table-success")
                                                                $(".po_item").parent().parent().addClass("table-warning")
                                                                $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                                                                $(".po_item").parent().parent().children().children().css("border" , "none")
                                                                $("#create_grn").removeClass("invisible")
            
                                                            }
                                                            else{

                                                                if((+$("#Diffrence").val() > 1 || +$("#Diffrence").val() < -1) && (tax_values != 0 || tax_values > 1 && tax_values < -1)){

                                                                    $.errorMessage(`PO Taxable Value Not Matched And PO Total Amount Not Matched`)
                                                                }
                                                                else if(tax_values != 0 || tax_values > 1 && tax_values < -1)
                                                                {
                                                                    $.errorMessage("PO Taxable Value Not Matched")
                                                                }
                                                                else if((+$("#Diffrence").val() > 1 || +$("#Diffrence").val() < -1) && (+$("#Diffrence").val() != 0)){

                                                                    $.errorMessage("PO Total Amount Not Matched")
                                                                }
            
                                                                $(".po_item").parent().parent().removeClass("table-success")
                                                                $(".po_item").parent().parent().addClass("table-danger")
                                                                $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                                                                $(".po_item").parent().parent().children().children().css("border" , "none")
                                                            }
                                                        }
            
                                                    }
            
            
                            
                            
                                                })         
            
            
                                                
                                            
                    
            
                                        }
                                        
                                        }
                                        else{
                                            
                                            $("#loader2").removeClass("sk-loading")
                                            $("#loader2").removeClass("ibox-content")
                                            $("#spin2").addClass("d-none")
                                            $.errorMessage("No Grid Present In The Table to Calculate")
                                        }
                                    }
                                    ,error : function(xhr)
                                    {
                                        $("#loader2").removeClass("sk-loading")
                                        $("#loader2").removeClass("ibox-content")
                                        $("#spin2").addClass("d-none")
                                        console.log(xhr);
                                            // swal("", xhr.responseJSON.message.DREQ_AP_PO_Header.Message, "error")
            
                                            try {
                                                console.log("try");
                                                $.errorMessage(xhr.responseJSON.message.DREQ_AP_PO_Header.Message)
                                            }
                                            catch (error) {
                                                
                                                try {
            
                                                    console.log("inside try ");
                                                    
                                                    $.errorMessage(xhr.responseJSON.message)
                                                     
                                                } catch (error) {
            
                                                    console.log("insiside try catch");
                                                                                            
                                                    $.errorMessage(xhr.responseJSON.message.DREQ_AP_PO_Header.Message)
            
                                                }
                                                
                                            }
                                            
            
                                        
            
                                    }
                                })
                                }





                            
   
                    })




                    $("#override_taxable_value").click(()=>{  
                        $("#loader1").addClass("ibox-content")
                        $("#loader1").addClass("sk-loading")
                        $("#spin1").removeClass("d-none")
                        $("#loader2").addClass("ibox-content")
                        $("#loader2").addClass("sk-loading")
                        $("#spin2").removeClass("d-none")
                        $("#loader2").addClass("sk-loading")
                        $("#loader2").addClass("ibox-content")
                        $("#spin2").removeClass("d-none")

                        let actualRecievedQuantity=$(".accept_quantity").val()
                        let shortQuantity=$(".short_quantity").val()


                        

                        
        $.ajax({
            url: `${[test[0].url]}/nrb/gst?gate=${obj.gate_number}&actualRecievedQuantity=${actualRecievedQuantity}&shortQuantity=${shortQuantity}`,
            // url: `http://192.168.0.206:8050/nrb/gst?gate=${obj.gate_number}&actualRecievedQuantity=${actualRecievedQuantity}&shortQuantity=${shortQuantity}`,
           
            headers: {
                    'Authorization': 'Bearer ' + token,
                },
                success : function(data,status,xhr){


                    $("#loader1").removeClass("ibox-content")
                    $("#loader1").removeClass("sk-loading")
                    $("#spin1").addClass("d-none")
                    $("#loader2").removeClass("ibox-content")
                    $("#loader2").removeClass("sk-loading")
                    $("#spin2").addClass("d-none")
                    $("#loader2").removeClass("sk-loading")
                    $("#loader2").removeClass("ibox-content")
                    $("#spin2").addClass("d-none")


                    
                    
                    if(xhr.status == 200)
                    {
                      console.log(data,'override_values_data')
                        nrb_lcr_object=data.data

                        console.log(nrb_lcr_object,'-----------')

                        $(".CGST_Amount").val(data.data.scanned_cgst_amount)
                        $(".SGST_Amount").val(data.data.scanned_sgst_amount)   
                        $(".IGST_Amount").val(data.data.scanned_igst_amount)
                        $(".taxable_value").val(data.data.scanned_taxable_value)
                        $(".taxable_amount_payload").val(data.data.scanned_taxable_amount)


                        $("#Total_Amount").val(+data.data.scanned_taxable_value + +data.data.scanned_taxable_amount)

                        $("#Diffrence").val((+$("#Total_Amount").val().replace("," , "") - +$("#Total_Invoice_amount").val()).toFixed(2))


                        if(($("#Diffrence").val() == 0) || $("#dc_number_type").val() == "Unprocessed")
                        {

                            $(".po_item").parent().parent().removeClass("table-danger")
                            $(".po_item").parent().parent().addClass("table-success")
                            $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                            $(".po_item").parent().parent().children().children().css("border" , "none")
                            $("#create_grn").removeClass("invisible")

                        }
                        else if(($("#Diffrence").val() <= 1 && $("#Diffrence").val() > -1)){

                            // $.errorMessage(`PO Total Does Not Match But Under Tolerance...Do You Want To Proceed?`)

                            $(".po_item").parent().parent().removeClass("table-success")
                            $(".po_item").parent().parent().addClass("table-warning")
                            $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                            $(".po_item").parent().parent().children().children().css("border" , "none")
                            $("#create_grn").removeClass("invisible")

                        }
                        else{

                            if((+$("#Diffrence").val() > 1 || +$("#Diffrence").val() < -1)){

                                $.errorMessage(`PO Taxable Value Not Matched And PO Total Amount Not Matched`)
                            }
                            else if(tax_values != 0 || tax_values > 1 && tax_values < -1)
                            {
                                $.errorMessage("PO Taxable Value Not Matched")
                            }
                            else if((+$("#Diffrence").val() > 1 || +$("#Diffrence").val() < -1) && (+$("#Diffrence").val() != 0)){

                                $.errorMessage("PO Total Amount Not Matched")
                            }

                            $(".po_item").parent().parent().removeClass("table-success")
                            $(".po_item").parent().parent().addClass("table-danger")
                            $(".po_item").parent().parent().children().children().css("background-color" ,"transparent")
                            $(".po_item").parent().parent().children().children().css("border" , "none")
                        }




                                }
                    else{

                                $.errorMessage(xhr.responseJSON.message);
                        }
                        
                        
                    },
                error: function (xhr) {

                    $("#loader1").removeClass("ibox-content")
                    $("#loader1").removeClass("sk-loading")
                    $("#spin1").addClass("d-none")
                    $("#loader2").removeClass("ibox-content")
                    $("#loader2").removeClass("sk-loading")
                    $("#spin2").addClass("d-none")
                    $("#loader2").removeClass("sk-loading")
                    $("#loader2").removeClass("ibox-content")
                    $("#spin2").addClass("d-none")
                    console.log(xhr  , "  print xhr");
                    if(xhr.status == 498)
                    {
                        $.tokenError();
                    }
                    else if(xhr.status >= 300 && xhr.status < 500){

                            $.errorMessage(xhr.responseJSON.message);
                    }
                    else{
                            $.errorMessage(xhr.responseJSON.error)
                    }
                }
            })




                    })
                    







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
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                              confirmButton: "btn btn-sm btn-success mx-1",
                              cancelButton: "btn btn-sm btn-danger mx-1",
                            },
                            buttonsStyling: false,
                          });
                      
                          swalWithBootstrapButtons
                            .fire({
                              title: "Do You Want to Re-Map",
                           
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Ok",
                              cancelButtonText: "Cancel",
                              reverseButtons: true,
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                  sendPdf(`${[vision[0].url]}/api/ocr`);
                              } 
                            });
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
        $("#loader1").addClass("ibox-content")
        $("#loader1").addClass("sk-loading")
        $("#spin1").removeClass("d-none")

        $("#loader2").addClass("ibox-content");
        $("#loader2").addClass("sk-loading");
        $("#spin2").removeClass("d-none");
    
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

                        $("#loader1").removeClass("ibox-content")
                        $("#loader1").removeClass("sk-loading")
                        $("#spin1").addClass("d-none")

                        $("#loader2").removeClass("ibox-content");
                        $("#loader2").removeClass("sk-loading");
                        $("#spin2").addClass("d-none");
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

                            $("#loader1").removeClass("ibox-content")
                            $("#loader1").removeClass("sk-loading")
                            $("#spin1").addClass("d-none")

                            $("#loader2").removeClass("ibox-content");
                            $("#loader2").removeClass("sk-loading");
                            $("#spin2").addClass("d-none");

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

                        $("#loader1").removeClass("ibox-content")
                        $("#loader1").removeClass("sk-loading")
                        $("#spin1").addClass("d-none")

                        $("#loader2").removeClass("ibox-content");
                        $("#loader2").removeClass("sk-loading");
                        $("#spin2").addClass("d-none");

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



                   



           



                    $("#create_grn").click((e)=>{

                     
                        e.preventDefault();

                        
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
                        .then(async(result) => {
                          if (result.isConfirmed) {

                            $("#loader2").addClass("sk-loading")
                            $("#loader2").addClass("ibox-content")
                            $("#spin2").removeClass("d-none")
                            
                        let cgstAmount = $(".CGST_Amount").val();
                        let igstAmount = $(".IGST_Amount").val();
                        let sgstAmount = $(".SGST_Amount").val();



                        if (!cgstAmount && !igstAmount && !sgstAmount) {

                            $.errorMessage("Please fill at least one of the fields: CGST Amount, IGST Amount, or SGST Amount");
                            $("#loader2").removeClass("sk-loading")
                            $("#loader2").removeClass("ibox-content")
                            $("#spin2").addClass("d-none")
                            return;
                            
                        }


                        


                        if(override_taxable_value){


                            let nrb_obj = [];

                        for(let i = 0 ; i < $("#table-body tr").length ; i++)
                        {


                            let grids_data = [];
                                                    
                            if($(".accept_quantity")[i].value != ""){

                                grids_data.push({
                                    "location": "PRILOCATN",
                                    "item_number": $(".po_item")[i].value,
                                    "quantity": $(".accept_quantity")[i].value,
                                })

                            }

                            if($(".short_quantity")[i].value != "" && +$(".short_quantity")[i].value > 0){

                                grids_data.push({
                                    "location": "QTYSHORT",
                                    "item_number":$(".po_item")[i].value,
                                    "quantity": $(".short_quantity")[i].value,
                                })

                            }



                            let nrb_obj_values = {
                                supplier_number : $("#vendor_code").val(),
                                branch_plant : $("#business_unit").val(),
                                boe_number : $("#boe_number").val(),
                                port_code : $("#port_code").val(),
                                cost_rule : $(".cost_rule")[i].value,
                                order_number : $(".onee")[i].value,
                                gl_date : $("#gl_date").val().split("-").join("/"),
                                taxable_amount : $(".taxable_amount_payload")[i].value,
                                taxable_value : $(".taxable_value")[i].value,
                                company_code : $("#company_code").val(),
                                business_unit : $("#business_unit").val(),
                                taxTotalAmount : $("#Total_Amount").val(),
                                taxDifference : $("#Diffrence").val(),
                                order_company : $("#company_code").val(),
                                road_permit_number : $("#road_permit_number").val(),
                                supplier_invoice_date : $("#invoice_date").val().split("-").join("/"),
                                supplier_invoice_number : $("#invoice_noo_entry").val(),
                                gate_entry_number : $("#gate_number").html(),
                                gate_entry_date : obj.createdAt.split("-").join("/"),
                                cgst_amount : nrb_lcr_object.actualRecievedQuantity_cgst_amount,
                                igst_amount : nrb_lcr_object.actualRecievedQuantity_igst_amount,
                                sgst_amount : nrb_lcr_object.actualRecievedQuantity_sgst_amount,
                                order_type : $("#po_type").val(),
                                order_quantity : $(".Sacnned_qty")[i].value,
                                P4312_Version : 'IAL000002',
                                line_number:$("#line_number").val(),
                                location_data: grids_data,
                                flag_short_quantity: "1",
                                igst_short: nrb_lcr_object.shortQuantity_igst_amount,
                                cgst_short: nrb_lcr_object.shortQuantity_cgst_amount,
                                sgst_short: nrb_lcr_object.shortQuantity_sgst_amount,
                                scan_igst_amount : nrb_lcr_object.scanned_igst_amount ,
                                scan_cgst_amount : nrb_lcr_object.scanned_cgst_amount ,
                                scan_sgst_amount : nrb_lcr_object.scanned_sgst_amount ,
                            }
    
                            
                            nrb_obj.push(nrb_obj_values)
                        }
                        

                    
                        console.log("nrb_obj:  "  ,  nrb_obj);
                        
                        
                        console.log("override_taxable_value :  "  ,  override_taxable_value);  
                            


                            $("#loader1").addClass("ibox-content")
                            $("#loader1").addClass("sk-loading")
                            $("#spin1").removeClass("d-none")
                            $("#loader2").addClass("ibox-content")
                            $("#loader2").addClass("sk-loading")
                            $("#spin2").removeClass("d-none")
                            $("#loader2").addClass("sk-loading")
                            $("#loader2").addClass("ibox-content")
                            $("#spin2").removeClass("d-none")





                            $.ajax({
                                url : `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.AN8&$field=F43121.CNID&$filter=F43121.MATC EQ 1&$filter=F43121.AN8 EQ ${$("#vendor_code").val()}&$filter=F43121.CNID EQ ${$("#invoice_noo_entry").val()}&$filter=F43121.TRDJ GE 01042024`,
                                headers: {
                                    "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                },
                                success : function(res_daata,status,xhr)
                                {
    
                                    if(res_daata.fs_DATABROWSE_F43121.data.gridData.summary.records > 0)
                                    {
    
                                        $.errorMessage(`Duplicate Supplier Invoice`)

                                        
    
                                        $("#loader1").removeClass("ibox-content")
                                        $("#loader1").removeClass("sk-loading")
                                        $("#spin1").addClass("d-none")
                                        $("#loader2").removeClass("ibox-content")
                                        $("#loader2").removeClass("sk-loading")
                                        $("#spin2").addClass("d-none")
                                        $("#loader2").removeClass("sk-loading")
                                        $("#loader2").removeClass("ibox-content")
                                        $("#spin2").addClass("d-none")
    
                                    }
                                    
                                    else{
                                        $.ajax({
                                            url: `${[test[0].url]}/nrb/grn`,
                                            // url: `http://192.168.0.206:8050/nrb/grn`,
                                            type: "POST",
                                            data: JSON.stringify(nrb_obj),
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token,
                                            },
                                            success: function(data, status, xhr) {
                                                console.log(data, 'radhe');
    
                                                if(xhr.status == 200)
                                                {






                    let today_date = new Date();
                    let date_today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                    let Curr_time = String(today_date.getHours()).padStart(2, '0')+':'+String(today_date.getMinutes()).padStart(2, '0')+':'+String(today_date.getSeconds()).padStart(2, '0');

                    // console.log(date +"  "+time );

                    $.ajax({
                        url : `${[test[0].url]}/remark/add`,
                        type : 'POST',
                        data : JSON.stringify({

                            gate_number: $("#gate_number").html(),
                            remark : "INVOICE NUMNER AND INVOICE DATE CHECKED FOUND OK",
                            status  : 200,
                            username  : $(".name")[1].innerText,
                            timestamp : `${date_today} ${Curr_time}` 
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                        success : function(data,status,xhr)
                        {
                          console.log("remarks data :" ,data);
                          let today = new Date();
                          let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                          let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');                  

                          // console.log("data saved", data);

                          $.ajax({
                              url : `${[test[0].url]}/remark/add`,
                              type : 'POST',
                              data : JSON.stringify({

                                  gate_number: $("#gate_number").html(),
                                  remark : "SUCCESSFULLY GRN CREATED",
                                  status  : 200,
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
                                  window.location.reload();

                              }
                          })
                        }
                      })


    
                                                   
                                                   
                                                 
                                                }
                                                else{
    
                                                    $.errorMessage(xhr.responseJSON.message)
                                                }
                                             
                                                
    
    
                                        $("#loader1").removeClass("ibox-content")
                                        $("#loader1").removeClass("sk-loading")
                                        $("#spin1").addClass("d-none")
                                        $("#loader2").removeClass("ibox-content")
                                        $("#loader2").removeClass("sk-loading")
                                        $("#spin2").addClass("d-none")
                                        $("#loader2").removeClass("sk-loading")
                                        $("#loader2").removeClass("ibox-content")
                                        $("#spin2").addClass("d-none")
                                                
                                            
                                                                                  
                                            },
                                            error: function(xhr) {
    
                                                
                                                
                                                $("#loader1").removeClass("ibox-content")
                                                $("#loader1").removeClass("sk-loading")
                                                $("#spin1").addClass("d-none")
                                                $("#loader2").removeClass("ibox-content")
                                                $("#loader2").removeClass("sk-loading")
                                                $("#spin2").addClass("d-none")
                                                $("#loader2").removeClass("sk-loading")
                                                $("#loader2").removeClass("ibox-content")
                                                $("#spin2").addClass("d-none")
            
            
                                                if (xhr.status == 498) {
                                                    $.tokenError();
                                                } else {
                                                    console.error("Error:", xhr);
                                                    // Handle other error scenarios here
                                                    $.errorMessage(xhr.responseJSON.message)
                                                }
                                            },
                                        });

                                    }
                                },
                                error : function(xhr){

                                    console.log("f43121 table nrb error : " ,xhr);

                                }
                            })

        
                                    
        
                        }
                                else{


                                    let check_grn = 0;


                        

                                    let shouldBreak = true;
            
                                    // if($("#dc_number_type").val() != null && $("#invoice_noo_entry").val() != "")
                                    // {
                                    //     $("#dc_number_type").css("border" , "1px solid #e9ecef")
            
                                    if($("#dc_number_head").val() == "")
                                    {
                                        $("#dc_number_type").removeClass("check_grn")
                                    }
                                    if($("#excahange_rate").val() != ""){
            
                                        $("#excahange_rate").addClass("check_grn")
            
                                    }
                                    
                                    for(let i = 0 ; i < $(".check_grn").length ; i++)
                                    {
                                        let check_grn_border = $(".check_grn")[i];
                                        
                                        if( $(".check_grn")[i].value != "")
                                        {
                                            $(check_grn_border).css("border" , "1px solid #e5e6e7")
                                            check_grn++;
                                        }
                                        else{
                                            $.errorMessage("Please Fill The Required Fields")
            
                                            $(check_grn_border).css("border" , "1px solid red")
            
            
                                        }
            
                                    }
            
            
                                
            
            
                                    if(check_grn == $(".check_grn").length)
                                    {
            
            
                                    
                                    // $("#loader2").addClass("sk-loading")
                                    // $("#loader2").addClass("ibox-content")
                                    // $("#spin2").removeClass("d-none")
            
                                        let tab_head_len = $("#tab_logic tr").length - 3
                                        let tab_details_len = $("#tab_logicc tr").length - 2
            
            
                                      function checked()  {
                                          for(let j = 0 ; j <= tab_details_len ; j++)
                                          {
                                            let details_po = $(".onee")[j]
            
                                            if(po_check[0] == $(details_po).val())
                                            {
            
                                                let line = $(".line_numm")[j]
                                                let statuss = $(".details_statuss")[j];
                                                // let hsn_code = $(".amount")[j];
                
                                                let line_number = $(line).val();
                                                let quantity = $(statuss).val();
                                                let amount = 55555; //
                                                let status = 300; 
                                                let item_code = 5656; //
                                                let hsn_code = 123456; //
                                                let uom = "AC"; //
                                                let rate = 98765;  //
                                                let gate_number = $("#gate_number").html()
            
                
                                                reciept_details.push({line_number,status,gate_number,item_code,hsn_code,quantity,uom,rate,amount})
                                            }
                                          
                                          }
            
                                        //   console.log(po_check);
            
                                          po_check = []
                                      }
            
            
            
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
                                            let G_L_Date = ""
                                            let Receipt_Date = ""
                                            let P4312_Version = "ZJDE0001"
                                            
                                            po_check.push(po_number);
            
                                            details.push({po_number,po_type,company_code,currency,total,amount})
                                            // checked();
            
                                            // let business_unit = 101;
            
                                            
                                           
                                            
                                            
                                             let reciept_number;
                                            //  let vendorname = "QWERTY"
                                             
                                             let gate_number = $("#gate_number").html()
                                            
                                            
                                            
                                            
                                             
            
            
                                            grn_head.push({vehicle_nbr,material_type,vendorname,weight,division,remark,in_time,gate_number,po_number,po_type,business_unit,billto_name,billto_address1,billto_gstin,billto_city,billto_state,billto_zipcode,shipto_name,shipto_address1,shipto_gstin,shipto_city,shipto_state,shipto_zipcode,lr_no,lr_date,contract_no,contract_date,reciept_details})
            
                                            
            
                                                                            
                                        }
            
            
            
            
                                       
            
                                        // vendorname = "ravi"
            
                                        let gate_number = $("#gate_number").html()
            
                                        let status = {code : 200}
            
                                        company_code = $("#company_code").val()
                                        // doc_company = $("#doc_company").val()
                                        business_unit = $("#business_unit").val()
                                        state = $("#state").val()
                                        invoice_number = $("#invoice_no").val()
                                        invoice_date = $("#invoice_date").val().split("-").reverse().join("-")
                                        invoice_type = $("#invoice_type").val()
                                        currency_code = $("#curr_code").val()
                                        supplier_gstin = $("#supplier_gstin").val()
                                        tds_code = $("#tds_code").val()
                                        vendor_code = $("#vendor_code").val()
                                        vendorname = $("#vendor_name").val()
                                        physical_doc = $("#physical_doc_rec").val()
                                        source = $("#source").val()
                                        amount = $("#amount").val()
                                        GL_date = $("#gl_date").val().split("-").reverse().join("-")
            
                                        billto_name = $("#billto_name").val() 
                                        billto_address1 = $("#billto_address1").val() 
                                        billto_gstin = $("#billto_gstin").val() 
                                        billto_city = $("#billto_city").val() 
                                        billto_state = $("#billto_state").val() 
                                        billto_zipcode = $("#billto_zipcode").val() 
                                        shipto_name = $("#shipto_name").val() 
                                        shipto_address1 = $("#shipto_address1").val() 
                                        shipto_gstin = $("#shipto_gstin").val() 
                                        shipto_city = $("#shipto_city").val() 
                                        shipto_state = $("#shipto_state").val() 
                                        shipto_zipcode = $("#shipto_zipcode").val()
                                        lr_no = $("#lr_no").val()
                                        lr_date = $("#lr_date").val()
                                        contract_no = $("#contract_no").val()
                                        contract_date = $("#contract_date").val()
            
            
                                        // company_code,doc_company,business_unit,state,invoice_no,invoice_date,invoice_type,currency_code,supplier_gstin,tds_code,vendor_code,vendor_name,physical_doc,source,amount,gl_date
                                        
            
                                        entity.push({company_code,doc_company,business_unit,state,invoice_number,invoice_date,invoice_type,currency_code,supplier_gstin,tds_code,vendor_code,vendorname,physical_doc,source,amount,GL_date,gate_number,vendorname,vehicle_nbr,material_type,weight,in_time,division,remark,status,billto_name,billto_address1,billto_gstin,billto_city,billto_state,billto_zipcode,shipto_name,shipto_address1,shipto_gstin,shipto_city,shipto_state,shipto_zipcode,lr_no,lr_date,contract_no,contract_date})
            
                                        console.log("entity : " , entity);
            
                                    // })
            
                                    var d = 2;
            
            
                                    let tab_logicc_rows = $("#table-body tr").length
            
            
                                    
            
            
                                    $.ajax({
                                        url : `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.AN8&$field=F43121.CNID&$filter=F43121.MATC EQ 1&$filter=F43121.AN8 EQ ${$("#vendor_code").val()}&$filter=F43121.CNID EQ ${$("#invoice_noo_entry").val()}&$filter=F43121.TRDJ GE 01042024`,
                                        headers: {
                                            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                        },
                                        success : function(res_daata,status,xhr)
                                        {
            
                                            if(res_daata.fs_DATABROWSE_F43121.data.gridData.summary.records > 0)
                                            {
            
                                                $.errorMessage(`Duplicate Supplier Invoice`)

                                                
            
                                                $("#loader2").removeClass("sk-loading")
                                                $("#loader2").removeClass("ibox-content")
                                                $("#spin2").addClass("d-none")
            
                                            }
                                            else{
            
                                                let asyc_value;
            
                                                let row_obj_data = [];
            
            
            
                                                if(tab_logicc_rows > 1)
                                                {
                                                    asyc_value = false;
                                                }
                                                else{
                                                    asyc_value = true;
                                                }
            
                                                for(let k = 0 ; k < tab_logicc_rows && shouldBreak ; k++){
            
                                                    let grids_data = [];
                                                    
                                                    if($(".accept_quantity")[k].value != ""){
            
                                                        grids_data.push({
                                                            "location": $(".Location")[k].value,
                                                            "item_number": $(".po_item")[k].value,
                                                            "quantity": $(".accept_quantity")[k].value,
                                                        })
            
                                                    }
            
                                                    if($(".short_quantity")[k].value != "" && +$(".short_quantity")[k].value > 0){
            
                                                        grids_data.push({
                                                            "location": "QTYSHORT",
                                                            "item_number":$(".po_item")[k].value,
                                                            "quantity": $(".short_quantity")[k].value,
                                                        })
            
                                                    }
            
                                                    let date = obj.createdAt.split("-").join("/");
            
                                                    let row_obj = {};
            
                                                    if(obj.deliveryChallanNumber == null)
                                                    {
            
                                                        let version;
            
                                                        if(obj.transactionType == "ST/OT")
                                                        {
                                                            version  = "RSB001"
                                                        }
                                                        else{
                                                            version = "IAL000002"
                                                        }
            
            
                                                        if($("#excahange_rate").val() == "")
                                                        {
                                                            
                                                            row_obj = {
                                                                    supplier_number: $("#vendor_code").val(),
                                                                    line_number: $(".line_numm")[k].value,
                                                                    order_number : $(".onee")[k].value,
                                                                    order_type : $(".po_type")[k].value,
                                                                    order_company : $(".detail_company_code")[k].value,
                                                                    branch_plant : $(".business_detail")[0].value.replace(/ /g,''),
                                                                    location_data : grids_data,
                                                                    supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                                    supplier_invoice_date: $("#invoice_date").val().split("-").join("/"),
                                                                    gate_entry_number: obj.gate_number,
                                                                    gate_entry_date: date,
                                                                    P4312_Version: version,
                                                                    road_permit_number: $("#road_permit_number").val(),
                                                                    gl_date: $("#gl_date").val().split("-").join("/"),
                                                                    boe_number : $("#boe_number").val(),
                                                                    port_code : $("#port_code").val()
                                                            }
                                                        }
                                                        else{
                                                            row_obj = {
                                                                    supplier_number: $("#vendor_code").val(),
                                                                    line_number: $(".line_numm")[k].value,
                                                                    order_number : $(".onee")[k].value,
                                                                    order_type : $(".po_type")[k].value,
                                                                    order_company : $(".detail_company_code")[k].value,
                                                                    branch_plant : $(".business_detail")[0].value.replace(/ /g,''),
                                                                    location_data : grids_data,
                                                                    supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                                    supplier_invoice_date: $("#invoice_date").val().split("-").join("/"),
                                                                    gate_entry_number: obj.gate_number,
                                                                    gate_entry_date: date,
                                                                    P4312_Version: version,
                                                                    road_permit_number: $("#road_permit_number").val(),
                                                                    gl_date: $("#gl_date").val().split("-").join("/"),
                                                                    boe_number : $("#boe_number").val(),
                                                                    port_code : $("#port_code").val(),
                                                                    exchange_rate : $("#excahange_rate").val()
                                                            }
                                                        }
            
                                                        if($(".short_quantity")[k].value != "" &&  +$(".short_quantity")[k].value > 0){
            
                                                            row_obj.cost_rule = $(".cost_rule")[k].value
            
                                                        }
            
            
                                                        row_obj_data.push(row_obj)
                                                        
                                                    }
                                                    else{
            
                                                        let grids_data = [];
                                                    
                                                        if($(".accept_quantity")[k].value != ""){
            
                                                            grids_data.push({
                                                                "location": $(".Location")[k].value,
                                                                "item_number": $(".po_item")[k].value,
                                                                "quantity": $(".accept_quantity")[k].value,
                                                            })
            
                                                        }
            
                                                        if($(".short_quantity")[k].value != "" &&  +$(".short_quantity")[k].value > 0){
            
                                                            grids_data.push({
                                                                "location": "QTYSHORT",
                                                                "item_number":$(".po_item")[k].value,
                                                                "quantity": $(".short_quantity")[k].value,
                                                            })
            
                                                        }

                                                        // let line_item = $(".po_item")[k].value;
                                                        // line_item = line_item.replace("*OP10" , "");
                                                        // let work_order_location;
                                                        // console.log('line item ---->' , k);

                                                        // console.log('line item ---->' , line_item);
                                                        // console.log('line item ---->' , $(".po_item")[k].value);

                                                        // console.log('line_item.replace("*OP10" , "") ---->' ,line_item.replace("*OP10" , ""));


                                                        // $.ajax({
                                                        //     url: `${[login[0].url]}/jderest/v2/dataservice/table/F43090?$filter=F43090.AN8 EQ ${$("#vendor_code").val()} &$filter=F43090.MCU EQ ${$("#business_unit").val()}&$filter=F43090.LITM EQ ${line_item}&$field=F43090.NROU`,
                                                        //     async : false,
                                                        //     headers: {
                                                        //         'Accept': '*/*',
                                                        //         // 'Content-Type':'application/json',
                                                        //         "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                                        //     },
                                                        //     success : function(data){

                                                        //         let records = data.fs_DATABROWSE_F43090.data.gridData.rowset.length

                                                        //         if(records == 0)
                                                        //         {
                                                        //             work_order_location = "PRILOCATN"
                                                        //         }
                                                        //         else{
                                                        //            let location = data.fs_DATABROWSE_F43090.data.gridData.rowset[0].F43090_NROU

                                                        //            if(location == "DOL")
                                                        //             {
                                                        //                 work_order_location = "PRILOCATN"
                                                        //             }
                                                        //             else{
                                                        //                 work_order_location = "QLTLOCATN"
                                                        //             }
                                                        //         }


                                                        //         if($("#excahange_rate").val() == "")
                                                        //             {
                                                        //                 row_obj = {
                                                                            
                                                        //                     line_number: $(".line_numm")[k].value,
                                                        //                     order_number : "",
                                                        //                     order_type : "",
                                                        //                     order_company : $(".detail_company_code")[k].value,
                                                        //                     branch_plant : $(".business_detail")[0].value.replace(/ /g,''),
                                                        //                     location_data : grids_data,
                                                        //                     supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                        //                     supplier_invoice_date: $("#invoice_date").val().split("-").join("/"),
                                                        //                     gate_entry_number: obj.gate_number,
                                                        //                     gate_entry_date: date,
                                                        //                     P4312_Version: "",
                                                        //                     road_permit_number: $("#road_permit_number").val(),
                                                        //                     gl_date: $("#gl_date").val().split("-").join("/"),
                                                        //                     order_quantity: $(".accept_quantity")[k].value,
                                                        //                     dc_number: obj.deliveryChallanNumber,
                                                        //                     business_unit: $(".business_detail")[0].value.replace(/ /g,''),
                                                        //                     work_order_location : work_order_location,
                                                        //                     work_order_quantity: $(".accept_quantity")[k].value,
                                                        //                     dc_type: $("#dc_number_type").val(),
                                                        //                     boe_number : $("#boe_number").val(),
                                                        //                     port_code : $("#port_code").val(),
                                                        //                     supplier_number : $("#vendor_code").val()
                                                        //                 }
                                                        //             }
                                                        //             else{
                                                        //                 row_obj = {
                                                                            
                                                        //                     line_number: $(".line_numm")[k].value,
                                                        //                     order_number : "",
                                                        //                     order_type : "",
                                                        //                     order_company : $(".detail_company_code")[k].value,
                                                        //                     branch_plant : $(".business_detail")[0].value.replace(/ /g,''),
                                                        //                     location_data : grids_data,
                                                        //                     supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                        //                     supplier_invoice_date: $("#invoice_date").val().split("-").join("/"),
                                                        //                     gate_entry_number: obj.gate_number,
                                                        //                     gate_entry_date: date,
                                                        //                     P4312_Version: "",
                                                        //                     road_permit_number: $("#road_permit_number").val(),
                                                        //                     gl_date: $("#gl_date").val().split("-").join("/"),
                                                        //                     order_quantity: $(".accept_quantity")[k].value,
                                                        //                     dc_number: obj.deliveryChallanNumber,
                                                        //                     business_unit: $(".business_detail")[0].value.replace(/ /g,''),
                                                        //                     work_order_location : work_order_location,
                                                        //                     work_order_quantity: $(".accept_quantity")[k].value,
                                                        //                     dc_type: $("#dc_number_type").val(),
                                                        //                     boe_number : $("#boe_number").val(),
                                                        //                     port_code : $("#port_code").val(),
                                                        //                     exchange_rate : $("#excahange_rate").val(),
                                                        //                     supplier_number : $("#vendor_code").val()
                                                        //                 }
                                                        //             }
                        
                                                        //             if($(".short_quantity")[k].value != "" &&  +$(".short_quantity")[k].value > 0){
                        
                                                        //                 row_obj.cost_rule = $(".cost_rule")[k].value
                        
                                                        //             }
                                                                     
                                                        //             row_obj_data.push(row_obj)



                                                        //     },
                                                        //     error: function(xhr)
                                                        //     {
                                                        //         console.log('error in F43090 table ---->' , xhr);
                                                        //         $("#loader2").removeClass("sk-loading")
                                                        //         $("#loader2").removeClass("ibox-content")
                                                        //         $("#spin2").addClass("d-none")
                                                        //     }
                                                        // })




                                                        if($("#excahange_rate").val() == "")
                                                            {
                                                                row_obj = {
                                                                    
                                                                    line_number: $(".line_numm")[k].value,
                                                                    order_number : "",
                                                                    order_type : "",
                                                                    order_company : $(".detail_company_code")[k].value,
                                                                    branch_plant : $(".business_detail")[0].value.replace(/ /g,''),
                                                                    location_data : grids_data,
                                                                    supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                                    supplier_invoice_date: $("#invoice_date").val().split("-").join("/"),
                                                                    gate_entry_number: obj.gate_number,
                                                                    gate_entry_date: date,
                                                                    P4312_Version: "",
                                                                    road_permit_number: $("#road_permit_number").val(),
                                                                    gl_date: $("#gl_date").val().split("-").join("/"),
                                                                    order_quantity: $(".accept_quantity")[k].value,
                                                                    dc_number: obj.deliveryChallanNumber,
                                                                    business_unit: $(".business_detail")[0].value.replace(/ /g,''),
                                                                    work_order_location : $(".Location")[k].value,
                                                                    work_order_quantity: $(".accept_quantity")[k].value,
                                                                    dc_type: $("#dc_number_type").val(),
                                                                    boe_number : $("#boe_number").val(),
                                                                    port_code : $("#port_code").val(),
                                                                    supplier_number : $("#vendor_code").val()
                                                                }
                                                            }
                                                            else{
                                                                row_obj = {
                                                                    
                                                                    line_number: $(".line_numm")[k].value,
                                                                    order_number : "",
                                                                    order_type : "",
                                                                    order_company : $(".detail_company_code")[k].value,
                                                                    branch_plant : $(".business_detail")[0].value.replace(/ /g,''),
                                                                    location_data : grids_data,
                                                                    supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                                    supplier_invoice_date: $("#invoice_date").val().split("-").join("/"),
                                                                    gate_entry_number: obj.gate_number,
                                                                    gate_entry_date: date,
                                                                    P4312_Version: "",
                                                                    road_permit_number: $("#road_permit_number").val(),
                                                                    gl_date: $("#gl_date").val().split("-").join("/"),
                                                                    order_quantity: $(".accept_quantity")[k].value,
                                                                    dc_number: obj.deliveryChallanNumber,
                                                                    business_unit: $(".business_detail")[0].value.replace(/ /g,''),
                                                                    work_order_location : $(".Location")[k].value,
                                                                    work_order_quantity: $(".accept_quantity")[k].value,
                                                                    dc_type: $("#dc_number_type").val(),
                                                                    boe_number : $("#boe_number").val(),
                                                                    port_code : $("#port_code").val(),
                                                                    exchange_rate : $("#excahange_rate").val(),
                                                                    supplier_number : $("#vendor_code").val()
                                                                }
                                                            }
                
                                                            if($(".short_quantity")[k].value != "" &&  +$(".short_quantity")[k].value > 0){
                
                                                                row_obj.cost_rule = $(".cost_rule")[k].value
                
                                                            }
                                                             
                                                            row_obj_data.push(row_obj)




            
                                                       
                                                        console.log("row_obj " , row_obj_data);
            
                                                    }
            
                                                }
            
            
                                                    
            
            
                                                                        if(($("#Diffrence").val() <= 1 && $("#Diffrence").val() > -1) || $("#dc_number_type").val() == "Unprocessed")
                                                                        {
                                            
                                                                            $.ajax({
                                                                                url: `${[test[0].url]}/gate/grn`,
                                                                                type : 'POST',
                                                                                data : JSON.stringify(row_obj_data),
                                                                                headers: {
                                                                                    'Accept': 'application/json',
                                                                                    'Content-Type': 'application/json',
                                                                                    'Authorization': 'Bearer ' + token,
                                                                                },
                                                                                    success: function(data,status,xhr){
            
                                                                                    console.log(data);
            
                                                                                    console.log("success : ",xhr);
            
                                                                                    if(data.status == 200)
                                                                                    {
            
                                                                                        // console.log(data.receipt_document);
                                                                                        // // console.log(details[k]);
                                                                                        // receipt_number_details = data.receipt_document;
                                                                                        // console.log("receipt number :" ,receipt_number_details);
                                                                                        // obj.details[k].receipt_number = data.receipt_document;
            
                                                                                        grn_done = true;
            
                                                    
                                                                                        $.ajax({
                                                                                                url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.LOCN&$field=F43121.GLC&$field=F43121.DGL&$field=F43121.URDT&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$field=F43121.MCU&$filter=F43121.MATC EQ 1&$filter=F43121.MCU EQ 20100&$filter=F43121.DOCO EQ ${$("#purchase_order").val()}&$filter=F43121.DCTO EQ ${$("#purchase_type").val()}&$filter=F43121.CNID EQ ${$("#invoice_noo_entry").val()}&$filter=F43121.DCT EQ OV&$field=F43121.AREC&$field=F43121.VRMK&$field=F43121.CNID`,
                                                                                                // async: false,
                                                                                                headers: {
                                                                                                        'Accept': 'application/json',
                                                                                                        'Content-Type':'application/json',
                                                                                                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                                                                                    },
                                                    
                                                                                                    success: function(data){
            
                                                                                                        $("#reject_invoice").addClass("invisible")
            
                                                                                                        $("#data_list").removeClass("invisible");
                                                                                                        $("#data1").trigger("click")
            
                                                                                                        console.log("grn data : ", data);
                                                                                                        // let grn_len = $("#grn_table tr").length - 2
                                                                                                        let grn_rows = data.fs_DATABROWSE_F43121.data.gridData.rowset
                                                                                                        
                                                                                                        let table_rows = $("#grn_table tr").length - 2;
                                                                                                        
                                                                                                        let valid_data = $(".order_no")[0]
            
                                                                                                        for(let j = 0 ; j < (table_rows == 0 && $(valid_data).val() == "" ? grn_rows.length -1 : grn_rows.length); j++)
                                                                                                        {
                                                                                                            $("#grn_row").trigger("click");
                                                                                                        }
                                                                                                        
                                                                                                        for(let i = (table_rows == 0 ? table_rows : table_rows + 1) , p = 0 ; i < (table_rows == 0  ? table_rows + grn_rows.length  : (table_rows + 1) + grn_rows.length) ; i++ , p++)
                                                                                                        {
                                                                                                        
                                                                                                            if($(valid_data).val() != "" && table_rows == 0 && d == 0){
            
                                                                                                            // console.log(`inside if  ${data.po_details.length}   ${i+1}`);
            
                                                                                                            console.log(grn_rows[p].F43121_DOCO)
            
                                                                                                            
                                                                                                            for(let s = 0 ; s < grn_rows.length ; s++)
                                                                                                            {

                                                                                                                let order_no = $(".document_no")[s+1]
                                                                                                                let item_no = $(".do_ty")[s+1]
                                                                                                                let business_unit_grn = $(".business_unit_grn")[s+1]
                                                                                                                let document_no = $(".item_no")[s+1]
                                                                                                                let invoice_no_grn = $(".invoice_no_grn")[s+1]
                                                                                                                let do_ty = $(".quantity_recieved")[s+1]
                                                                                                                let quantity_recieved = $(".order_no")[s+1]
                                                                                                                let amount_open = $(".amount_open")[s+1]
                                                                                                                let location = $(".location")[s+1]
                                                                                                                let user_date = $(".user_date")[s+1]
                                                                                                                let glc = $(".glc")[s+1]
                                                                                                                let gl_date = $(".gl_date")[s+1]
                                                                            
                                                                            
                                                                                                                $(order_no).val(grn_rows[s].F43121_DOC)
                                                                                                                $(item_no).val(grn_rows[s].F43121_DCT)
                                                                                                                $(business_unit_grn).val(grn_rows[s].F43121_MCU.replace(/ /g,''))
                                                                                                                $(document_no).val(grn_rows[s].F43121_LITM)
                                                                                                                $(invoice_no_grn).val(grn_rows[s].F43121_CNID)
                                                                                                                $(do_ty).val(grn_rows[s].F43121_UREC)
                                                                                                                $(quantity_recieved).val(grn_rows[s].F43121_VRMK.replace(/ /g,''))
                                                                                                                $(amount_open).val(grn_rows[s].F43121_AREC)
                                                                                                                $(location).val(grn_rows[s].F43121_LOCN)
                                                                                                                let inputDate = grn_rows[s].F43121_URDT;
                                                                                                                let inputGLDate = grn_rows[s].F43121_DGL;
                                                                                                                $(glc).val(grn_rows[s].F43121_GLC);
                                                                                                                let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
                                                                                                                let formattedGLDate = `${inputGLDate.substr(0, 4)}-${inputGLDate.substr(4, 2)}-${inputGLDate.substr(6, 2)}`
                                                                                                                $(user_date).val(formattedDate.split("-").reverse().join("-"))
                                                                                                                $(gl_date).val(formattedGLDate.split("-").reverse().join("-"))
                                                                                                                // $(user_date).val(grn_rows[s].F43121_URDT)
            
                                                                                                                if(+grn_rows[s].F43121_MATC == 4)
                                                                                                                {
                                                                                                                    // $(user_date).parent().parent().css("background-color" , "red")
                                                                                                                    $(user_date).parent().parent().children().children().css("color" , "red")
            
                                                                                                                }
                                                                                                                        
                                                                                                                    }
            
                                                                                                                    break;
                                                                                                            }
            
                                                                                                            else{
            
                                                                                                                
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
                                                                                                                
                                                                                                                
                                                                                                                $(order_no).val(grn_rows[p].F43121_DOC)
                                                                                                                $(item_no).val(grn_rows[p].F43121_DCT)
                                                                                                                $(business_unit_grn).val(grn_rows[p].F43121_MCU.replace(/ /g,''))
                                                                                                                $(document_no).val(grn_rows[p].F43121_LITM)
                                                                                                                $(invoice_no_grn).val(grn_rows[p].F43121_CNID)
                                                                                                                $(do_ty).val(grn_rows[p].F43121_UREC)
                                                                                                                $(quantity_recieved).val(grn_rows[p].F43121_VRMK.replace(/ /g,''))
                                                                                                                $(amount_open).val(grn_rows[p].F43121_AREC)
                                                                                                                $(location).val(grn_rows[p].F43121_LOCN)
                                                                                                                let inputDate = grn_rows[p].F43121_URDT;
                                                                                                                let inputGLDate = grn_rows[p].F43121_DGL;
                                                                                                                $(glc).val(grn_rows[p].F43121_GLC);
                                                                                                                let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
                                                                                                                let formattedGLDate = `${inputGLDate.substr(0, 4)}-${inputGLDate.substr(4, 2)}-${inputGLDate.substr(6, 2)}`
                                                                                                                $(user_date).val(formattedDate.split("-").reverse().join("-"))
                                                                                                                $(gl_date).val(formattedGLDate.split("-").reverse().join("-"))
                                                                                                                // $(user_date).val(grn_rows[p].F43121_URDT)
            
                                                                                                                if(+grn_rows[p].F43121_MATC == 4)
                                                                                                                {
                                                                                                                    $(user_date).parent().parent().children().children().css("color" , "red")
            
                                                                                                                }
            
                                                        
                                                                                                            }
            
            
                                                                                                            d = grn_rows.length == 1 ? 0 : 2;
            
                                                                                                            console.log(grn_rows.length);
            
                                                                                        
                                                                                                        }
                                                                                                    
                                                                                                    },
                                                                                                    complete : ()=>{
            
            
                                                                                                        
                                                                                                        
            
                                                                                                        // obj.status = {code : 200};
                                                                                                        // obj.roadPermitNumber = $("#road_permit_number").val()
                                                                                                        // obj.company_code = $("#company_code").val()
                                                                                                        // obj.business_unit = $("#business_unit").val()
                                                                                                        // obj.state = $("#state").val()
                                                                                                        // obj.invoice_number = $("#invoice_noo_entry").val()
                                                                                                        // obj.invoice_date = $("#invoice_date").val()
                                                                                                        // obj.invoice_type = $("#invoice_type").val()
                                                                                                        // obj.currency_code = $("#curr_code").val()
                                                                                                        // obj.supplier_gstin = $("#supplier_gstin").val()
                                                                                                        // obj.tds_code = $("#tds_code").val()
                                                                                                        // obj.vendor_code = $("#vendor_code").val()
                                                                                                        // obj.vendorname = $("#vendor_name").val()
                                                                                                        // obj.physical_doc = $("#physical_doc_rec").val()
                                                                                                        // obj.source = $("#source").val()
                                                                                                        // obj.amount = $("#amount").val()
                                                                                                        // obj.gl_date = $("#gl_date").val()
                                                                                                        // obj.tax_difference = $("#Diffrence").val()
                                                                                                        // obj.tax_total_amount = $("#Total_Amount").val()
                                                                                                        // obj.dc_type = $("#dc_number_type").val()
                                                                                                        // obj.port = $("#port_code").val()
                                                                                                        // obj.boe = $("#boe_number").val()
            
                                                                                                        
                                                                                                        // for(let i = 0 ; i < $("#tab_logicc tbody tr").length ; i++)
                                                                                                        // {
                                                                                                        //     for(let j =0  ; j < obj.details.length ; j++)
                                                                                                        //     {
                                                                                                        //         if($(".po_item")[i].value == obj.details[j].jdeItemCode)
                                                                                                        //         {
                                                                                                        //             obj.details[j].actualRecievedQuantity = $(".accept_quantity")[i].value
                                                                                                        //         }
                                                                                                        //     }
                                                                                                        // }
            
                                                                                                        
            
            
                                                                                                        
            
                                                                                                        //     $.ajax({
                                                                                                        //         url : `${[test[0].url]}/gate/put?id=${Gate_no}`,
                                                                                                        //         type : 'PUT',
                                                                                                        //         data : JSON.stringify(obj),
                                                                                                        //         headers: {
                                                                                                        //             'Accept': 'application/json',
                                                                                                        //             'Content-Type': 'application/json',
                                                                                                        //             'Authorization': 'Bearer ' + token,
                                                                                                        //         },
                                                                                                        //         success : (data,status,xhr)=>{
                                                    
                                                                                                        //             if(xhr.status == 200)
                                                                                                        //             {

                                                                                                        
                                                                                                                                    let today_date = new Date();
                                                                                                                                    let date_today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                                                                                                                    let Curr_time = String(today_date.getHours()).padStart(2, '0')+':'+String(today_date.getMinutes()).padStart(2, '0')+':'+String(today_date.getSeconds()).padStart(2, '0');

                                                                                                                                    // console.log(date +"  "+time );

                                                                                                                                    $.ajax({
                                                                                                                                        url : `${[test[0].url]}/remark/add`,
                                                                                                                                        type : 'POST',
                                                                                                                                        data : JSON.stringify({

                                                                                                                                            gate_number: $("#gate_number").html(),
                                                                                                                                            remark : "INVOICE NUMNER AND INVOICE DATE CHECKED FOUND OK",
                                                                                                                                            status  : 200,
                                                                                                                                            username  : $(".name")[1].innerText,
                                                                                                                                            timestamp : `${date_today} ${Curr_time}` 
                                                                                                                                        }),
                                                                                                                                        headers: {
                                                                                                                                            'Accept': 'application/json',
                                                                                                                                            'Content-Type': 'application/json',
                                                                                                                                            'Authorization': 'Bearer ' + token,
                                                                                                                                        },
                                                                                                                                        success : function(data,status,xhr)
                                                                                                                                        {
                                                                                                                                        console.log("remarks data :" ,data);

                                                                                                                                        
                                                                                                                        let today = new Date();
                                                                                                                        let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                                                                                                                        let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');                  
            
                                                                                                                        // console.log("data saved", data);
            
                                                                                                                        $.ajax({
                                                                                                                            url : `${[test[0].url]}/remark/add`,
                                                                                                                            type : 'POST',
                                                                                                                            data : JSON.stringify({
                                                                                
                                                                                                                                gate_number: $("#gate_number").html(),
                                                                                                                                remark : "SUCCESSFULLY GRN CREATED",
                                                                                                                                status  : 200,
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
                                                                                                                                
                                                                                                                                window.location.reload();
                                                                                                                            }
                                                                                                                        })
                                                                                                                                        }
                                                                                                                                    })


                                                                                                        

                                                                                                        
            
                                                                                                                        // alert("done")
                                                                                                            //         }
                                                                                                            //         else{
            
                                                                                                            //                 $.errorMessage(xhr.responseJSON.message);
                                                                                                            //         }
                                                                                                                
                                                                                                            //     },
                                                                                                            //     error : (xhr)=>{
                                                                                                            //         if(xhr.status == 498)
                                                                                                            //         {
                                                                                                            //             $.tokenError();
                                                                                                            //         }
                                                                                                            //         else if(xhr.status >= 400 && xhr.status < 500){
            
                                                                                                            //                 $.errorMessage(xhr.responseJSON.message);
                                                                                                            //         }
                                                                                                            //         else{
                                                                                                            //                 $.errorMessage(xhr.responseJSON.error)
                                                                                                            //         }
                                                                                                            //     }
                                                                                                            // })
                                                                                                        // }
            
                                                                                                        // if( k == grn_head.length - 1)
                                                                                                        // {
                                                                                                            // $("#data_list").removeClass("invisible")
                                                                                                            $("#create_grn").addClass("invisible")
                                                                                                            $(".fetch_check").attr("readonly" , "readonly")
                                                                                                            // $("#reverse_grn").removeClass("invisible")
                                                                                                            // $("#col_hide").css("visibility" , "collapse");
                                                                                                            $("#purchase_order").attr("readonly" , "readonly")
                                                                                                            $("#purchase_type").attr("readonly" , "readonly")
                                                                                                            $(".details_statuss").attr("readonly", "readonly")
                                                                                                            $(".accept_quantity").attr("readonly", "readonly")
                                                                                                            $("#calculate_diffrence").parent().parent().addClass("d-none")
                                                                                                        // }
            
                                                                                                        // if( k == grn_head.length-1)
                                                                                                        // {
                                                                                                        
            
                                                                                                        // }
            
                                                                                                        // if(k == (tab_logicc_rows - 1)){
                                                                                                            $("#loader2").removeClass("sk-loading")
                                                                                                            $("#loader2").removeClass("ibox-content")
                                                                                                            $("#spin2").addClass("d-none")
                                                                                                        // }
            
                                                                                                        window.location.reload();
            
                                                                                                        $("#Modal_details").addClass("invisible")
                                                                                                        // $("#data_list").removeClass("invisible")
                                                                                                        // $("#data1").trigger("click")
                                                                                                        // $("#create_grn").addClass("invisible")
                                                                                                        // $("#reverse_grn").removeClass("invisible")
                                                                                                        // $("#col_hide").css("visibility" , "collapse");
                                                                                                    },
                                                                                                    error: function(xhr){
                                                                                                        console.log(xhr);
                                                                                                            // po_check = [];
                                                                                                            // reciept_no = []
            
                                                                                                    $("#loader2").removeClass("sk-loading")
                                                                                                    $("#loader2").removeClass("ibox-content")
                                                                                                    $("#spin2").addClass("d-none")
                                                                                                        
            
                                                                                                    }
                                                                                                
                                                                                            })
            
                                                                                    }
                                                                                    else{

                                                                                        function checkIfArray(data) {
                                                                                            return Array.isArray(data);
                                                                                        }
                                                                                        
                                                                                        console.log("checking the data array or not :" ,checkIfArray(data.data))
                                                                                        console.log('xhr mes of jde error grn  ---->' , data.data);

                                                                                        if(!checkIfArray(data.data)){
                                                                                            $.errorMessage(`${data.data}`)
                                                                                        }
                                                                                        else{

                                                                                            let messages = data.data.map((value)=> value).join(" | ")
                    
                                                                                            console.log("jde message :" ,messages);
                    
                                                                                                $.errorMessage(`${messages}`)
                                                                                        }

            
            
                                                                                        
                                                                                        shouldBreak = false;
                                                                                        
                                                                                        if(shouldBreak == false || k == tab_logicc_rows - 1)
                                                                                        {
                                                                                            $("#loader2").removeClass("sk-loading")
                                                                                            $("#loader2").removeClass("ibox-content")
                                                                                            $("#spin2").addClass("d-none")
                                                                                        }
            
                                                                                    }
                                                
                                                                                },
                                                
                                                                                error: function(xhr){
            
                                                                                    console.log("jde simple message : ",xhr);
            
                                                                                    if(xhr.status == 498)
                                                                                    {
                                                                                        $.tokenError()
                                                                                    }
                                                                                    else
                                                                                    {
            
                                                                                        console.log(xhr);
                
                                                                                        const swalWithBootstrapButtons = Swal.mixin({
                                                                                            customClass: {
                                                                                                confirmButton: 'btn btn-sm btn-secondary mx-1',
                                                                                            },
                                                                                            buttonsStyling: false
                                                                                        })
                
                                                                                        console.log(xhr.responseJSON.message);
                
                                                                                        swalWithBootstrapButtons.fire({
                                                                                            // title: 'Are you sure?',
                                                                                            text: `${xhr.responseJSON.jde__simpleMessage}`,
                                                                                            icon: 'error',
                                                                                            confirmButtonText: 'OK',
                                                                                            reverseButtons: true
                                                                                        })
                                                                                    }
            
                                                
                                                                                    $("#loader2").removeClass("sk-loading")
                                                                                    $("#loader2").removeClass("ibox-content")
                                                                                    $("#spin2").addClass("d-none")
                                                                                //     $.audit("GAURAV" , "JDV920" , `${[login[0].url]}/jderest/v3/orchestrator/ORCH_GRN` , JSON.stringify(grn_head[k]) , "error" , "F" )
                                                                                //     grn_head = [];
                                                                                //     reciept_details = [];
            
                                                                                //     const swalWithBootstrapButtons = Swal.mixin({
                                                                                //     customClass: {
                                                                                //         confirmButton: 'btn btn-sm btn-secondary mx-1',
                                                                                //         // cancelButton: 'btn btn-sm btn-danger mx-1'
                                                                                //     },
                                                                                //     buttonsStyling: false
                                                                                // })
                                                
                                                                                // swalWithBootstrapButtons.fire({
                                                                                //     // title: 'Are you sure?',
                                                                                //     text: `${xhr.responseJSON.jde__simpleMessage}`,
                                                                                //     icon: 'warning',
                                                                                //     // showCancelButton: true,
                                                                                //     confirmButtonText: 'OK',
                                                                                //     // cancelButtonText: 'cancel!',
                                                                                //     reverseButtons: true
                                                                                // })
                                                
                                                                                },
                                                                                complete : ()=>{
            
                                                                                    // $("#loader2").removeClass("sk-loading")
                                                                                    // $("#loader2").removeClass("ibox-content")
                                                                                    // $("#spin2").addClass("d-none")
            
                                                                                    // $("#Modal_details").addClass("invisible")
                                                                                    // // $("#data_list").removeClass("invisible")
                                                                                    // // $("#data1").trigger("click")
                                                                                    // $("#create_grn").addClass("invisible")
                                                                                    // $("#reverse_grn").removeClass("invisible")
                                                                                    // $("#col_hide").css("visibility" , "collapse");
                                                                                    // $("#purchase_order").attr("readonly" , "readonly")
                                                                                    // $("#purchase_type").attr("readonly" , "readonly")
                                                                                    // $(".details_statuss").attr("readonly", "readonly")
            
                                                                                    // console.log("entity : ", entity);
                                                                                    // console.log("grn_head : " ,grn_head);
            
                                                                                }
                                                
                                                                            })
            
            
                                                                            // if(+$(".short_quantity")[k].value > 0)
                                                                            // {
            
                                                                            //     let date = obj.createdAt.split("-").join("/");
            
            
                                                                            //     let reject_po = {
                                                                            //         supplier_number: $("#vendor_code").val(),
                                                                            //         ship_to_number: $("#vendor_code").val(),
                                                                            //         order_type: "O4",
                                                                            //         branch_plant: $(".business_detail")[k].value,
                                                                            //         grid_lines: [
                                                                            //             {
                                                                            //                 item_number: $(".po_item")[k].value,
                                                                            //                 quantity_ordered: -$(".short_quantity")[k].value,
                                                                            //                 cost_rule: $(".cost_rule")[k].value
                                                                            //             }
                                                                            //         ],
                                                                            //         P4310_Version: "TEST001",
                                                                            //         supplier_invoice_number: $("#invoice_noo_entry").val(),
                                                                            //         supplier_invoice_date: $("#invoice_date").val().split("-").reverse().join("/"),
                                                                            //         gate_entry_number: obj.gate_number,
                                                                            //         gate_entry_date: date,
                                                                            //         road_permit_number: $("#road_permit_number").val(),
                                                                            //         gl_date: $("#gl_date").val().split("-").reverse().join("/"),
                                                                            //         boe_number : $("#boe_number").val(),
                                                                            //         port_code : $("#port_code").val(),
                                                                            //         location_data: [
                                                                            //             {
                                                                            //                 location: "SHTLOCATN",
                                                                            //                 quantity: -$(".short_quantity")[k].value
                                                                            //             }
                                                                            //         ]
                                                                            //     }
            
                                                                            //     console.log("reject po payload : ", reject_po);
            
                                                                            //     $.ajax({
                                                                            //         url:`${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_CreatePO`,
                                                                            //         type : 'POST',
                                                                            //         data : JSON.stringify(reject_po),
                                                                            //         // async : false,
                                                                            //         headers: {
                                                                            //                 'Accept': 'application/json',
                                                                            //                 'Content-Type':'application/json',
                                                                            //                 // "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                                                            //                 "Authorization": "Basic " + btoa(`GSKIRTI1` + ":" + `Pernod@123`)
                                                                            //             },
                                                                            //             success : function(data){
                                                                            //                 console.log("reject po : " , data);
                                                                            //             }
                                                                            //     })
            
            
            
            
                                                                            // }
            
            
            
            
                                                                        }
                                                                        else{
            
                                                                            $.errorMessage(`Total Invoice Amount with PO Not Matching`)
            
                                                                            $("#loader2").removeClass("sk-loading")
                                                                            $("#loader2").removeClass("ibox-content")
                                                                            $("#spin2").addClass("d-none")
            
                                                                        }
            
            
            
                                                    
                                                }
                                            }
                                        })
            
            
            
                                    }else{
            
                                        $("#loader2").removeClass("sk-loading")
                                        $("#loader2").removeClass("ibox-content")
                                        $("#spin2").addClass("d-none")
            
                                    }



                                    
                                }

                          
                          

                    
                    


                      }
                      else if(result.isDismissed){

                        $("#reMap").trigger("click");
                        
                        }
                      else {

                        console.log('value of result  ---->' ,result);
                     }
                   });



                       

                


                    


                        })


                        $("#reverse_grn").click(()=>{

                            $("#loader2").addClass("sk-loading")
                            $("#loader2").addClass("ibox-content")
                            $("#spin2").removeClass("d-none")

                            let data = [];
                            
                            
                            // for(let i = 0  ; i < reciept_no.flat(500).length ; i++){
                                
                                // console.log(reciept_no[i]);
                                // let receipt_rev = receipt_number_details     
                                
                                let document_number = receipt_number_details;
                                let document_type = $("#purchase_type").val();
                                let document_comapny = $("#company_code").val().split(" - ")[0];
                                let supplier = $("#vendor_code").val();
                                let P43214_version = "ZJDE0001";
                                
                                data.push({document_number,document_type,document_comapny,supplier,P43214_version})
                            // }
                            
                            // console.log(data);


                                $.ajax({
                                    url : `${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_GRN_REV`,
                                    type : "POST",
                                    data : JSON.stringify({data : data}),
                                    headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                                        },
                                        success : function (data,status,xhr){

                                            console.log(data);
                                            $("#reverse_grn").addClass("invisible")
                                            $("#create_grn").removeClass("invisible")
                                            // $("#col_hide").css("visibility" , "visible");
                                            $("#grn_table tbody").children().remove()
                                            $("#grn_row").trigger("click");
                                            $("#data").trigger("click")
                                            $("#data_list").addClass("invisible")
                                            $("#purchase_order").removeAttr("readonly" , "readonly")
                                            $("#purchase_type").removeAttr("readonly" , "readonly")
                                            // console.log(entity);
                                            console.log("=======");

                                            // for(let o = 0 ; o < entity.length ; o++)
                                            // {
                                            //     entity[o].details = []
                                            // }
                                            // entity[0].status = 



                                            if(xhr.status == 200)
                                            {


                                                obj.status = {code : 200};
                                                obj.receipt_number = null;
                                                obj.company_code = $("#company_code").val()
                                                obj.business_unit = $("#business_unit").val()
                                                obj.state = $("#state").val()
                                                obj.invoice_number = $("#invoice_no").val()
                                                obj.invoice_date = $("#invoice_date").val().split("-").reverse().join("-")
                                                obj.invoice_type = $("#invoice_type").val()
                                                obj.currency_code = $("#curr_code").val()
                                                obj.supplier_gstin = $("#supplier_gstin").val()
                                                obj.tds_code = $("#tds_code").val()
                                                obj.vendor_code = $("#vendor_code").val()
                                                obj.vendorname = $("#vendor_name").val()
                                                obj.physical_doc = $("#physical_doc_rec").val()
                                                obj.source = $("#source").val()
                                                obj.amount = $("#amount").val()
                                                obj.gl_date = $("#gl_date").val().split("-").reverse().join("-")


                                            $.ajax({
                                                url : `${[test[0].url]}/gate/put?id=${Gate_no}`,
                                                type : 'PUT',
                                                data : JSON.stringify(obj),
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer ' + token,
                                                  },
                                                success : (data,status,xhr)=>{
                                                    console.log(data);
                                                    console.log(xhr);

                                                    if(xhr.status ==200){
                                                        // alert("success")
                                                    }
                                                    else{

                                                            $.errorMessage(xhr.responseJSON.message);
                                                    }
                                                },
                                                error : function(xhr){
                                                    
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
                                            
                                        },
                                        error: function(xhr){
                                            $("#loader2").removeClass("sk-loading")
                                            $("#loader2").removeClass("ibox-content")
                                            $("#spin2").addClass("d-none")
                                            console.log(xhr);
                                        },
                                        complete : ()=>{

                                            entity = [];
                                            details = [];
                                            data = [];
                                            
                                            $("#loader2").removeClass("sk-loading")
                                            $("#loader2").removeClass("ibox-content")
                                            $("#spin2").addClass("d-none")
                                            $(".details_statuss").removeAttr("readonly", "readonly")
                                            $("#Modal_details").removeClass("invisible")
                                            

                                        }                            
                                    })
                            


                            grn_head = [];
                            reciept_details = [] 
                            reciept_no = [];
                        })

                        $("#Modal_details").click(()=>{
                            $("#vendor_code_modal_map").val($("#vendor_code").val())
                            $("#vendor_name_modal_map").val($("#vendor_name").val())
                            $("#po_no_selected_map").val($("#purchase_order").val())
                            $("#po_type_search_map").val($("#purchase_type").val())
                            $("#company_code_map").val($(".head_company")[0].value)
                        })


                       


                        $("#submit_invoice").click((e)=>{

                            // entity.push(details)
                            // console.log(entity);
                            e.preventDefault(); 

                            





                            
                            if($("textarea").val().length != 0)

                            {
                                
                                let today = new Date();
                                let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
                                let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');
                                // console.log(date +"  "+time );
                                
                                let receipt_doc = obj.receipt_number ? [obj.receipt_number] :  obj.details.filter((value)=> value.receipt_number)
                                 
                                
                                let obj_data_match =  obj.details.map((value)=> value.location == "QLTLOCATN")


                                // console.log('value of reciept_doc  ---->' ,receipt_doc ,  "     " ,receipt_doc.length != 0 && !receipt_doc.includes(null));
                                
                                
                                if(receipt_doc.flat(Infinity).length != 0 && !receipt_doc.flat(Infinity).includes(null) || grn_done)
                                {
                                    $("#loader1").addClass("ibox-content")
                                    $("#loader1").addClass("sk-loading")
                                    $("#spin1").removeClass("d-none")
                                    $("#loader2").addClass("ibox-content")
                                    $("#loader2").addClass("sk-loading")
                                    $("#spin2").removeClass("d-none")

                                        $.ajax({
                                            url : `${[test[0].url]}/remark/add`,
                                            type : 'POST',
                                            data : JSON.stringify({

                                                gate_number: $("#gate_number").html(),
                                                remark : $("textarea").val().toUpperCase(),
                                                status  : 200,
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

                                                if(xhr.status == 200)
                                                {

                                                    obj.is_reserved = "N"
                                                    console.log("object_data : ", obj.is_reserved);
                                        
                                                
                                                $.ajax({
                                                    url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${obj.gate_number}&username=${$(".name")[1].innerText}`,
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


                                                    $("#loader1").removeClass("ibox-content")
                                                    $("#loader1").removeClass("sk-loading")
                                                    $("#spin1").addClass("d-none")
                                                    $("#loader2").removeClass("ibox-content")
                                                    $("#loader2").removeClass("sk-loading")
                                                    $("#spin2").addClass("d-none")
                        
                                                        // console.log(...entity);
                                                    
                                                    

                                                        
                                                        let sessionString = sessionStorage.getItem('gateid')
                                                        let Gate_no = JSON.parse(sessionString);
                                                        console.log(Gate_no);

                                                        // if(obj.transactionType == "ST/OT")
                                                        // {
                                                        //     obj.status = {code : 400};
                                                        // }
                                                        // else{
                                                            // if(obj.deliveryChallanNumber == null)
                                                            // {
                                                                if(override_taxable_value)
                                                                {
                                                                    obj.status = {code : 400};
                                                                }
                                                                else{
                                                                    if(obj_data_match.includes(true))
                                                                    {
                                                                        obj.status = {code : 300};
                                                                    }
                                                                    else{

                                                                        obj.status = {code : 400};
                                                                    }
                                                                }
                                                                
                                                            // }
                                                            // else{

                                                            //     if(obj.workOrderLocation == "QLTLOCATN")
                                                            //     {
                                                            //         obj.status = {code : 300};
                                                            //     }
                                                            //     else if(obj_data_match.includes(true))
                                                            //     {
                                                            //         obj.status = {code : 300};
                                                            //     }
                                                            //     else{
                                                            //         obj.status = {code : 400};
                                                            //     }

                                                            // }
                                                        // }
                                                        // delete obj.details;
                                                        // delete obj.tags;

                                                            
                                                            $.ajax({
                                                                    type: "PUT",
                                                                    url: `${[test[0].url]}/gate/put?id=${Gate_no}`,
                                                                    data: JSON.stringify(obj),
                                                                    headers: {
                                                                        'Accept': 'application/json',
                                                                        'Content-Type': 'application/json',
                                                                        'Authorization': 'Bearer ' + token,
                                                                    },
                                                                    success: function (data, status, xhr) {
                                                                        console.log(data);
                                                                        if(xhr.status == 200)
                                                                        {
                                                                            $.sendEmail(data.data ,"Quality",convertedFiles)

                                                                            setTimeout(() => {

                                                                                const swalWithBootstrapButtons = Swal.mixin({
                                                                                    customClass: {
                                                                                        confirmButton: 'btn btn-sm btn-secondary mx-1',
                                                                                    },
                                                                                    buttonsStyling: false
                                                                                })
                        
                                                                                swalWithBootstrapButtons.fire({
                                                                                    // title: 'Are you sure?',
                                                                                    text: `Successfully Updated`,
                                                                                    icon: 'success',
                                                                                    confirmButtonText: 'OK',
                                                                                    reverseButtons: true
                                                                                }).then(()=>{
                                                                                    window.open(`../template/invoice.jsp` , '_self');
                                                                                })
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
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-sm btn-secondary mx-1',
                                        cancelButton: 'btn btn-sm btn-danger mx-1'
                                    },
                                    buttonsStyling: false
                                })

                                swalWithBootstrapButtons.fire({
                                    // title: 'Are you sure?',
                                    text: `Please Create GRN First`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'cancel!',
                                    reverseButtons: true
                                })
                            }



                                

                            }
                            else{
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-sm btn-secondary mx-1',
                                        cancelButton: 'btn btn-sm btn-danger mx-1'
                                    },
                                    buttonsStyling: false
                                })

                                swalWithBootstrapButtons.fire({
                                    // title: 'Are you sure?',
                                    text: `Please Add Remarks`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'cancel!',
                                    reverseButtons: true
                                })
                            }


                            }

                        )


                        $("#reject_invoice").click((e)=>{

                            // entity.push(details)
                            // console.log(entity);
                            e.preventDefault();
                            
                            if($("textarea").val().length != 0)
                            {

                                $("#loader1").addClass("ibox-content")
                                $("#loader1").addClass("sk-loading")
                                $("#spin1").removeClass("d-none")
                                $("#loader2").addClass("ibox-content")
                                $("#loader2").addClass("sk-loading")
                                $("#spin2").removeClass("d-none")

                                let today = new Date();
                                let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
                                let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

                                // console.log(date +"  "+time );

                                $.ajax({
                                    url : `${[test[0].url]}/remark/add`,
                                    type : 'POST',
                                    data : JSON.stringify({

                                        gate_number: $("#gate_number").html(),
                                        remark : $("textarea").val().toUpperCase(),
                                        status  : 200,
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

                                        if(xhr.status == 200)
                                        {

                                    obj.is_reserved = "N"
                                    console.log("object_data : ", obj.is_reserved);
                                    
                                            
                                    $.ajax({
                                        url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${obj.gate_number}&username=${$(".name")[1].innerText}`,
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
                

                                            $("#loader1").removeClass("ibox-content")
                                            $("#loader1").removeClass("sk-loading")
                                            $("#spin1").addClass("d-none")
                                            $("#loader2").removeClass("ibox-content")
                                            $("#loader2").removeClass("sk-loading")
                                            $("#spin2").addClass("d-none")
                                                
                                                let sessionString = sessionStorage.getItem('gateid')
                                                let Gate_no = JSON.parse(sessionString);
                                                console.log(Gate_no);
                                                
                                                    // console.log(gate_no);

                                                    obj.status = {code : 1000};

                                                    // console.log(obj);
                                                    
                                                    $.ajax({
                                                        url: `${[test[0].url]}/gate/put?id=${Gate_no}`,
                                                        type: "PUT",
                                                        data: JSON.stringify(obj),
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                'Authorization': 'Bearer ' + token,
                                                            },
                                                            success: function (data, status, xhr) {
                                                                console.log(data);
                                                                console.log(xhr);
                                                                if(xhr.status == 200)
                                                                {
                                                                    $.sendEmail(data.data , "Error" ,convertedFiles)

                                                                    setTimeout(() => {
                                                                        window.open(`../template/invoice.jsp` , '_self');
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

                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-sm btn-secondary mx-1',
                                        cancelButton: 'btn btn-sm btn-danger mx-1'
                                    },
                                    buttonsStyling: false
                                })

                                swalWithBootstrapButtons.fire({
                                    // title: 'Are you sure?',
                                    text: `Please Add Remarks`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'cancel!',
                                    reverseButtons: true
                                })
                                
                            }


                            })




                            $("#back_invoice").click((e) => {
                                e.preventDefault();
                              
                                obj.is_reserved = "N"
                                console.log("object_data : ", obj.is_reserved);
                              
                                
                                        $.ajax({
                                            url: `${[test[0].url]}/reservationMaster/delete?gateNumber=${obj.gate_number}&username=${$(".name")[1].innerText}`,
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
                              
                                                  window.open("../template/invoice.jsp", "_self");
                                                    
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