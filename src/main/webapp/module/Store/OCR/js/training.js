
$(document).ready(()=>{

    const token = JSON.parse(localStorage.getItem("token"));
    var refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    var userRoles = JSON.parse(localStorage.getItem("userrole"));

    console.log('user role ---->' ,userRoles);

    if(userRoles.includes("Admin") || userRoles.includes("TRAINING_WITH_DUOM"))
      {
      }
      else{
        $("#override_taxable_value").prop("disabled", true)
      }

    
    
    var login = $.login();
    var test = $.test();
    var vision = $.vision();
    var Vtable;
    var tab;

    

    $.ajax({
      url: `${test[0].url}/dateFormat/list`,
      headers : {
        "Authorization" : `Bearer ${token}`
      },
      success: function (data, status, xhr) {
  
        if(xhr.status == 200)
        {
          // parentData = data.data;
          // console.log(data);
          data.data.forEach((value) => {
            // all_menus.push(value.sorting)
            $("#date_formate").append(
              `<option value="${value.dateFormat}">${value.dateFormat}</option>`
            );
          });
        }
        else{
  
          $.errorMessage(xhr.responseJSON.message);
        }
        
        // call(); // Call the 'call' function
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


        $.ajax({
            url: `${[test[0].url]}/auth/refreshtoken`,
            type: "POST",
            data: JSON.stringify({
              refreshToken: refreshToken,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            success: function (data, status, xhr) {
              if (xhr.status == 200) {
                localStorage.setItem("token", JSON.stringify(data.accessToken));
              }
            },
          });

    

          $.ajax({
            type: 'GET',
            url: `${[test[0].url]}/ocrtraining/get`,
            // url: `http://192.168.0.206:8050/ocrtraining/get`,
            async : false,
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data) {
                // console.log(data);
           
    
                data.data.map((res)=>{
                    
                    $("#tbody").append(`<tr><td></td><td>${res.supplierNumber}</td><td>${res.supplier_name}</td><td>${res.template}</td></tr>`);

                })
            },
            error: function (xhr) {
                if(xhr.status == 498)
                {
                    $.tokenError();
                }
            },
            complete: () => {
    
               tab =  $("#Dtable").DataTable({
    
                    dom: '<"top"f>t<"bottom"ilp>',
                    ordering: true,
                    processing: true,
                    select: true,
                  
                    columnDefs: [
                        {
                            "defaultContent": "-",
                            "targets": "_all"
                        },
                        { responsivePriority: 1, targets: 0 },
                        { responsivePriority: -2, targets: 2 }
                    ],
            
                });
    
                
               
                tab.column(0).visible(false);
               
            }
        });

        


      var da , ro;
      $('#Dtable tbody').on('click', 'tr', function () {
        da = tab.row(this).data();
        ro = $(this)[0];


    });
    
    function searchTemplate(data) {

    
        $("#require_feilds").children().remove();
        $("#header_feilds").children().remove();
        $("#details_feilds").children().remove();

        $("#require_feilds").append(`<h3 class="m-0"><label class="form-label">Required Labels</label></h3>`)
        $("#header_feilds").append(`<h3 class="m-0 pt-2"><label class="form-label">Header Labels</label></h3>`)
        $("#details_feilds").append(`<h3 class="m-0 pt-2"><label class="form-label">Details Labels</label></h3>`)

        let vendor_code = data[1]
        let template_name = data[3]

        console.log(vendor_code,template_name);

        let all_labels = [];
        let trained_labels = [];
      
        $.ajax({
          url: `${[test[0].url]}/ocrtraining/get?supplier=${vendor_code}&template=${template_name}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        //   async: false,
          success: function (data, status, xhr) {
            trained_labels.push(...data);
          },
          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            }
          },
          complete : ()=>{
            $.ajax({
                url: `${[test[0].url]}/label/labels`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                // async: false,
                success: function (data, status, xhr) {
                  all_labels.push(...data.data);
                },
                error: function (xhr) {
                  if (xhr.status == 498) {
                    $.tokenError();
                  }
                },
                complete: ()=>{
                  let i = 0;
            
                  let label_count = 1;
                
                  all_labels.map((value) => {
                        if (value.label_required) {
                          $("#require_feilds")
                            .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
                          <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="  new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation" style="font-weight:bold;">
                              <input type="text" value="" class="label form-control mw-100 w-200px variation variation1 red_border_error" >
                              <input type="text" value="" class="form-control d-none startX mandatory"  placeholder="startX">
                              <input type="text" value="" class="form-control d-none startY" placeholder="startY">
                              <input type="text" value="" class="form-control d-none endX" placeholder="endX">
                              <input type="text" value="" class="form-control d-none endY" placeholder="endY">
                    
                              
                            </div>`);
                          label_count++;
                        } else if (value.label_type == "Header") {
                          $("#header_feilds")
                            .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
                              <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
                              <input type="text" value="" class="label form-control mw-100 w-200px variation variation1" >
                              <input type="text" value="" class="form-control d-none startX" placeholder="startX">
                              <input type="text" value="" class="form-control d-none startY" placeholder="startY">
                              <input type="text" value="" class="form-control d-none endX" placeholder="endX">
                              <input type="text" value="" class="form-control d-none endY" placeholder="endY">
                        
                                  
                                </div>`);
                          label_count++;
                        } else if (value.label_type == "Details") {
                          $("#details_feilds")
                            .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
                              <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
                              <input type="text" value="" class="label form-control mw-100 w-200px variation variation1" >
                              <input type="text" value="" class="form-control d-none startX" placeholder="startX">
                              <input type="text" value="" class="form-control d-none startY" placeholder="startY">
                              <input type="text" value="" class="form-control d-none endX" placeholder="endX">
                              <input type="text" value="" class="form-control d-none endY" placeholder="endY">   
                                </div>`);
                          label_count++;
                        }
                  });
          
                  let update_label = $(".update_labels");
          
                  for (let i = 0; i < update_label.length; i++) {
                    var value = $(update_label[i]).children();
                    trained_labels.map((re) => {
                      if (value[0].value == re.display_name) {
                        console.log($(value[1]).val(re.value));
                        console.log($(value[2]).val(re.boundingPoly.vertices[0].x));
                        console.log($(value[3]).val(re.boundingPoly.vertices[0].y));
                        console.log($(value[4]).val(re.boundingPoly.vertices[1].x));
                        console.log($(value[5]).val(re.boundingPoly.vertices[1].y));
                      }
                    });
                    
                  }

                  $("#loader").removeClass("sk-loading");
                $("#loader").removeClass("ibox-content");
                $("#spin1").addClass("d-none");
                }
              });
          }
        });
      
       
      
       
        $(ro).removeClass("selected");
    }

    $("#select_template").click(() => {
        
        $("#loader").addClass("sk-loading");
        $("#loader").addClass("ibox-content");
        $("#spin1").removeClass("d-none");
        
        searchTemplate(da);
    })




    $("#vendor_code_name").on("keypress" , function(event){
        if (event.keyCode === 13) {
            // $("#loader1").addClass("ibox-content")
            // $("#loader1").addClass("sk-loading")
            // $("#spin").removeClass("d-none")
          $("#vendor_code_name_search").trigger("click")
        }
      });

      var dataa , roww;
      $('#Vtable tbody').on('click', 'tr', function () {
        dataa = Vtable.row(this).data();
        roww = $(this)[0];

   
    });
    
    function searchh(dataa) {
        $("#vendor_code").val(dataa[0]);
        $("#vendor_name").val(dataa[1])

        $(roww).removeClass("selected");

        // $("#loader1").addClass("ibox-content");
        // $("#loader1").addClass("sk-loading");
        // $("#spin").removeClass("d-none");

    }

    $("#Vendor_selected").click(() => {
        searchh(dataa);
    })



    $("#VendorSearch").click(()=>{
        
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

        $("#vendor_code_name").val("")
        
        $(".Vendor_Search").trigger("click")
    })


    $("#vendor_code_name_search").click(()=>{

        if($("#vendor_code_name").val() != "")
        {

        $("#loader5").addClass("ibox-content")
        $("#loader5").addClass("sk-loading")
        $("#spin5").removeClass("d-none")
         let vendor_code = $("#vendor_code").val()

         let dynamic_vendor = isNaN($("#vendor_code_name").val() * 1) ? `$filter=F0101.ALPH CONTAINS ${$("#vendor_code_name").val()}` : `$filter=F0101.AN8 EQ ${$("#vendor_code_name").val()}`

        console.log(dynamic_vendor);

        $.ajax({
            url : `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&${dynamic_vendor}`,
            type : "GET",
            headers: {

                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
    
            },
            success : function(data){
                
                var record = data.fs_DATABROWSE_F0101.data.gridData.summary.records;

                try {
                    Vtable.destroy();
                    $("#Vendor_body").empty();
                } catch (error) {
                    
                }

                if(record > 0)
                {

                    let vendor_rows = data.fs_DATABROWSE_F0101.data.gridData.rowset;

                    console.log(vendor_rows);

                    for (let i = 0; i < vendor_rows.length; i++) {
                        $("#Vendor_body").append(`<tr>
                        <td>${vendor_rows[i].F0101_AN8}</td>
                        <td>${vendor_rows[i].F0101_ALPH}</td>
                        </tr>`)
                    }

                    $("#Vendor_Search").trigger("click")

                    $("#loader5").removeClass("ibox-content");
                    $("#loader5").removeClass("sk-loading");
                    $("#spin5").addClass("d-none");

                        // $("#vendor_name").val(data.fs_DATABROWSE_F0101.data.gridData.rowset[0].F0101_ALPH)
                        
                        $("#loader5").removeClass("ibox-content")
                        $("#loader5").removeClass("sk-loading")
                        $("#spin5").addClass("d-none")
                }
                if(record == 0)
                {
                   
                    swal("" , "Vendor Not Present In JDE" , "error").then(()=>{
                        // Vtable.destroy();
                        // $("#vendor_name").val("")
                        $("#loader5").removeClass("ibox-content")
                        $("#loader5").removeClass("sk-loading")
                        $("#spin5").addClass("d-none")
                    })
                }

            },
            error : function(xhr){
                swal("" , xhr.responseJSON.sysErrors[0].TITLE , "error").then(()=>{
                    $("#vendor_name").val("")
                    $("#loader5").removeClass("ibox-content")
                    $("#loader5").removeClass("sk-loading")
                    $("#spin5").addClass("d-none")
                })
            },

            complete : ()=>{

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

            }
        })
    }
    else{
        swal("" , "Please Enter The Vendor Name OR Code" , "error").then(()=>{
            $("#loader5").removeClass("ibox-content");
            $("#loader5").removeClass("sk-loading");
            $("#spin5").addClass("d-none");
        })
    }

   

    })

$("#back_invoice").click(()=>{
    window.open("../template/trainingList.jsp","_self")
})


$("#submit_invoice").click(() => {

if ($("#vendor_name").val() != "" && $("#date_formate").val()!="") {
        let template_number;

        $.ajax({
            url : `${[test[0].url]}/ocrtraining/get?supplier=${dataa[0]}`,
            type : "GET",
            async:false,
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success : function(data,status,xhr){
                console.log(data.data.length + 1);

                
                if(xhr.status == 200)
                {
                    if (data.data == null) {
                        template_number = "Template_1";
                     
                    }else{
            
                        template_number = `Template_${data.data.length+1}`;                  

                     
                    }
                }
                else{
                    $.errorMessage(xhr.responseJSON.message)
                  
                }
            },
            error: function (xhr) {
        
                if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >=400 && xhr.status < 500)
                {
                    $.errorMessage(xhr.responseJSON.message)
                }
                else{
                    $.errorMessage(xhr.responseJSON.message)
                }

            }
        })
       
    let find_value = $(".variation1")[0].value;
    let find_startx= +$(".startX")[0].value;
    let find_starty= +$(".startY")[0].value;
    let find_endx= +$(".endX")[0].value;
    let find_endy= +$(".endY")[0].value;

    let vertices = JSON.parse(localStorage.getItem("ocr_output"));
    console.log(vertices[0]);

    let page_x1 = vertices[0].boundingPoly.vertices[0].x; 
    let page_x2 = vertices[0].boundingPoly.vertices[1].x;
    let page_x3 = vertices[0].boundingPoly.vertices[2].x;
    let page_x4 = vertices[0].boundingPoly.vertices[3].x;
    let page_y1 = vertices[0].boundingPoly.vertices[0].y;
    let page_y2 = vertices[0].boundingPoly.vertices[1].y;
    let page_y3 = vertices[0].boundingPoly.vertices[2].y;
    let page_y4 = vertices[0].boundingPoly.vertices[3].y;

    console.log(page_x1);
    console.log(page_x2);
    console.log(page_x3);
    console.log(page_x4);
    console.log(page_y1);
    console.log(page_y2);
    console.log(page_y3);
    console.log(page_y4);



    const filteredCoordinates = vertices.filter(
        (obj) =>
          obj.boundingPoly.vertices[0].x >= find_startx &&
          obj.boundingPoly.vertices[2].x <= find_endx &&
          obj.boundingPoly.vertices[0].y >= find_starty &&
          obj.boundingPoly.vertices[2].y <= find_endy
    );
  
    console.log(filteredCoordinates.length);

    if (filteredCoordinates.length != 0) {
        
        let center_x1=filteredCoordinates[0].boundingPoly.vertices[0].x;
        let center_x2=filteredCoordinates[0].boundingPoly.vertices[1].x;
        let center_x3=filteredCoordinates[0].boundingPoly.vertices[2].x;
        let center_x4=filteredCoordinates[0].boundingPoly.vertices[3].x;
        let center_y1=filteredCoordinates[0].boundingPoly.vertices[0].y;
        let center_y2=filteredCoordinates[0].boundingPoly.vertices[1].y;
        let center_y3=filteredCoordinates[0].boundingPoly.vertices[2].y;
        let center_y4=filteredCoordinates[0].boundingPoly.vertices[3].y;
    
          
      // Function to convert data URL to Blob
      let final_payload = new FormData();
      let lab = []
      let allLabels = [];
      let findData = []
      console.log(template_number,"THE");
      
      $.ajax({
          url: `${[test[0].url]}/label/labels`,
          async: false,
          headers: {
              'Authorization': 'Bearer ' + token,
            },
          success: function (data, status, xhr) {
              console.log(data);
              data.data.map(value => {
    
                  // if (value.label_required == true) {
                  //     findData.push(value.id);
                  // }
                  allLabels.push(value)
              })
              
          },
          error: function (xhr) {
              if(xhr.status == 498)
              {
                  $.tokenError();
              }
          }
      })
              
    
      var override_taxable_value = $('#override_taxable_value').is(':checked');
      console.log(override_taxable_value,'override_taxable_value')
      console.log(lab);
      for (let i = 0; i <$(".new_labels").length; i++) {
          let labelID = $(".new_labels")[i].id
          
          let train_label = {
              "supplierNumber": +$("#vendor_code").val(),
              "label": "",
              "startx": +$(".startX")[i].value,
              "starty": +$(".startY")[i].value,
              "endx": +$(".endX")[i].value,
              "endy": +$(".endY")[i].value,
              "value": $(".variation1")[i].value,
              "template" : template_number,
              "supplierName": $("#vendor_name").val(),
              page_x1  : page_x1,
              page_x2  : page_x2,
              page_x3  : page_x3,
              page_x4  : page_x4,
              page_y1  : page_y1,
              page_y2  : page_y2,
              page_y3  : page_y3,
              page_y4  : page_y4,
              center_x1 : center_x1,
              center_x2 : center_x2,
              center_x3 : center_x3,
              center_x4 : center_x4,
              center_y1 : center_y1,
              center_y2 : center_y2,
              center_y3 : center_y3,
              center_y4 : center_y4,
              centerValue : find_value,
              date_format : $("#date_formate").val(),
              override_taxable_value : override_taxable_value,
              "labelId": {
                "id": +$(`#${labelID}`).attr('data-label-id'),
              }
          }
          lab.push(train_label)
      }
      
      lab.map( (res) => {
          allLabels.map(async (re) => {
              if (res.labelId.id == re.id) {
                  if (re.grn_column == "supplier_gstin") {
                      let temp_value = res.value
                      res.value = temp_value.replace(/[^a-zA-Z0-9]/g, "");
                  }
                  res.label = re.grn_column;
                  }
              })
      })
      // })
    
    
      let ocr_image = JSON.parse(localStorage.getItem("ocr_invoice"));
      var blob = dataURLToBlob(ocr_image);
      console.log(blob,"===========");
    
      // lab.push('override_taxable_value', override_taxable_value);
      final_payload.append('file', blob);
      final_payload.append('json', JSON.stringify(lab))
    
      
      let count = 0;
      for (let i = 0; i < $(".mandatory").length; i++) {
          const element = $(".mandatory")[i];
          const red_border_error = $(".red_border_error")[i];
          console.log(count);
          if ($(element).val() != "") {
              count++;
              console.log(count);
    
              if (count == $(".mandatory").length) {
                          $("#submit_invoice").html("Please wait...")
                          $("#loader").addClass("ibox-content")
                          $("#loader").addClass("sk-loading")
                          $("#spin1").removeClass("d-none")
                          console.log(lab,"THE FINAL LAB");

                      

                          
                          
                          $.ajax({
                              // url: `${[test[0].url]}/ocrtraining/post`,
                              url: `${[test[0].url]}/ocrtraining/post`,
                              type: 'POST',
                              data : final_payload,
                              contentType: false,
                              processData: false,
                              headers: {
                                  'Authorization': 'Bearer ' + token,
                                },
                              success : function(data,status,xhr)
                              {
    
                                  try {
    
                                      swal("" , "Successfully Template Created" , "success").then(()=>{
                                        
                                          console.log(data);
                                          console.log(xhr);
                                          window.open("../template/trainingList.jsp","_self")
                                      })
                                      
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
                                            text: "Successfully Template Created",
                                            icon: "success",
                                            confirmButtonText: "OK",
                                          })
                                          .then(() => {
    
                                              console.log(data);
                                              console.log(xhr);
                                              window.open("../template/trainingList.jsp","_self")
    
                                          })
                                      
                                      
                                  }
    
                              },
                              error: function (xhr) {
                                  if(xhr.status == 498)
                                  {
                                      $.tokenError();
                                  }
                              }
                          })
              }
          }else{
              swal("", "Please train all Required labels!", "warning")
              $(red_border_error).css("border","1px solid rgb(213 83 83)")
          }  
      }
    }else{
        swal("", "Please train center label", "warning")
    }




    
    
}else{
  if ($("#vendor_name").val() == "" && $("#date_formate").val() == "") {
    swal("", "Please select vendor name and invoice-date type", "warning")
  }
  else if($("#vendor_name").val() == ""){
    swal("", "Please select vendor name", "warning")
  }else{
    swal("", "Please select vendor invoice-date type", "warning")
  }
}
            
})


$("#myModal20").on('hide.bs.modal', function () {
    // Clear the contents of the modal
    Vtable.destroy();
    $("#Vendor_body").empty();

});



    
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




// for uploading pdf 

const preview = document.getElementById('preview_img');

preview.addEventListener('change', (event) => {

  $("#loader").addClass("ibox-content")
  $("#loader").addClass("sk-loading")
  $("#spin1").removeClass("d-none")

  const image = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e){
    var imageData = e.target.result;
  }      

  reader.readAsDataURL(image);

  reader.addEventListener('load', (e) => {
    
    let fd = new FormData();
    var files = $("#preview_img")[0].files[0];
    fd.append('file', files);
    console.log("setting image : ",files);

    

    // fetch('http://localhost:8888/api/ocr', {
    fetch(`${[vision[0].url]}/api/ocr`, {
      method: 'POST',
      body: fd
    }).then(response => {

      console.log('Image uploaded successfully');
      // window.open("invoice.html","_self")
      return response.json()
    }).then((res) => {
      
      try {
      console.log(res.ocrResponse);

        localStorage.setItem("ocr_output", JSON.stringify(res.ocrResponse))
        // fetch(`http://192.168.0.28:8888/api/getimage`)
        try {
            var imageData = res.ocrImage;
            sessionStorage.setItem('preview_invoice', JSON.stringify('data:image/jpeg;base64,'+imageData));
            localStorage.setItem("ocr_invoice",JSON.stringify('data:image/jpeg;base64,'+imageData));
            location.reload();
          } catch (error) {
            swal("", "Image size is too large.", "warning")
          }
    } catch (error) {
        swal("", "JSON Response is too large.", "warning")
       }
        $("#contents").css("height", $(".cropper-container")[0].offsetHeight + 50)
    })
      .catch(error => {
        // Handle any errors
        console.error('Error uploading image:', error);
      })


  });


});

});