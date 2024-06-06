$(document).ready(() => {
  const token = JSON.parse(localStorage.getItem("token"));
  let vendorInfo = JSON.parse(sessionStorage.getItem("vendorInfo"));
  console.log(vendorInfo);

  var userRoles = JSON.parse(localStorage.getItem("userrole"));

    console.log('user role ---->' ,userRoles);

    if(userRoles.includes("Admin") || userRoles.includes("TRAINING_WITH_DUOM"))
    {
      
    }
    else{
      $("#override_taxable_value").prop("disabled", true)
    }

  $("#vendor_code").val(vendorInfo.vendorCode);
  $("#vendor_name").val((vendorInfo.vendorName).replace(/amp;/g, ""));
  $("#template_number").val(vendorInfo.vendorTemplate);

  let all_labels = [];
  let trained_labels = [];

  $.ajax({
    // url: `${[test[0].url]}/ocrtraining/get?supplier=${
      url: `${[test[0].url]}/ocrtraining/get?supplier=${
      vendorInfo.vendorCode
    }&template=${vendorInfo.vendorTemplate}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    async: false,
    success: function (data, status, xhr) {
      trained_labels.push(...data);
      console.log(data,'99999999999999999999999999');
  
data.forEach(label => {
 
  if (label.override_taxable_value) {
    
      $('#override_taxable_value').prop('checked', true);
  }
});

    },
    error: function (xhr) {
      if (xhr.status == 498) {
        $.tokenError();
      }
    },
  });
  $("#date_formate").append(`<option value="${trained_labels[0].date_formate}" >${trained_labels[0].date_formate}</option>`);
  $.ajax({
    url: `${[test[0].url]}/label/labels`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    async: false,
    success: function (data, status, xhr) {
      all_labels.push(...data.data);
    },
    error: function (xhr) {
      if (xhr.status == 498) {
        $.tokenError();
      }
    },
  });

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
          console.log(value.dateFormat);
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


  let i = 0;

  let label_count = 1;


  //   trained_labels.map( (res) => {
  //     allLabels.map(async (re) => {
  //         if (res.labelId.id == re.id) {
  //             res.label = re.grn_column;
  //         }
  //     })
  // })
  all_labels.map((value) => {
        if (value.label_required) {
          $("#require_feilds")
            .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
          <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="  new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
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


  
  
  // ----previous code
  // all_labels.map((value) => {
  //   trained_labels.map((re) => {
  //     if (value.label_name == re.display_name) {
  //       let trained_item_value = re.value;
  //       if (trained_item_value == undefined) {
  //         trained_item_value = ""
  //       }
  //       if (value.label_required) {
  //         $("#require_feilds")
  //           .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
  //         <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="  new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
  //             <input type="text" value="${trained_item_value}" class="label form-control mw-100 w-200px variation variation1 red_border_error" >
  //             <input type="text" value="${re.boundingPoly.vertices[0].x}" class="form-control d-none startX mandatory"  placeholder="startX">
  //             <input type="text" value="${re.boundingPoly.vertices[0].y}" class="form-control d-none startY" placeholder="startY">
  //             <input type="text" value="${re.boundingPoly.vertices[1].x}" class="form-control d-none endX" placeholder="endX">
  //             <input type="text" value="${re.boundingPoly.vertices[1].y}" class="form-control d-none endY" placeholder="endY">
    
              
  //           </div>`);
  //         label_count++;
  //       } else if (value.label_type == "Header") {
  //         $("#header_feilds")
  //           .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
  //             <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
  //             <input type="text" value="${trained_item_value}" class="label form-control mw-100 w-200px variation variation1" >
  //             <input type="text" value="${re.boundingPoly.vertices[0].x}" class="form-control d-none startX" placeholder="startX">
  //             <input type="text" value="${re.boundingPoly.vertices[0].y}" class="form-control d-none startY" placeholder="startY">
  //             <input type="text" value="${re.boundingPoly.vertices[1].x}" class="form-control d-none endX" placeholder="endX">
  //             <input type="text" value="${re.boundingPoly.vertices[1].y}" class="form-control d-none endY" placeholder="endY">
        
                  
  //               </div>`);
  //         label_count++;
  //       } else if (value.label_type == "Details") {
  //         $("#details_feilds")
  //           .append(`<div class="box update_labels mt-2" id="count_siblings_${label_count}">
  //             <input type="text" value="${value.label_name}" readonly id="label_${label_count}" data-label-id="${value.id}" class="new_labels form-control mw-100 w-200px  pl-2"  placeholder="Variation">
  //             <input type="text" value="${trained_item_value}" class="label form-control mw-100 w-200px variation variation1" >
  //             <input type="text" value="${re.boundingPoly.vertices[0].x}" class="form-control d-none startX" placeholder="startX">
  //             <input type="text" value="${re.boundingPoly.vertices[0].y}" class="form-control d-none startY" placeholder="startY">
  //             <input type="text" value="${re.boundingPoly.vertices[1].x}" class="form-control d-none endX" placeholder="endX">
  //             <input type="text" value="${re.boundingPoly.vertices[1].y}" class="form-control d-none endY" placeholder="endY">
        
                  
  //               </div>`);
  //         label_count++;
  //       }
  //     }
  //   });
  // });


  $("#loader").removeClass("sk-loading");
  $("#loader").removeClass("ibox-content");
  $("#spin1").addClass("d-none");

  $("#submit_invoice").click(() => {
    
    //collecting data for adjusting coordinates
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

    console.log(filteredCoordinates);

    let center_x1=filteredCoordinates[0].boundingPoly.vertices[0].x;
    let center_x2=filteredCoordinates[0].boundingPoly.vertices[1].x;
    let center_x3=filteredCoordinates[0].boundingPoly.vertices[2].x;
    let center_x4=filteredCoordinates[0].boundingPoly.vertices[3].x;
    let center_y1=filteredCoordinates[0].boundingPoly.vertices[0].y;
    let center_y2=filteredCoordinates[0].boundingPoly.vertices[1].y;
    let center_y3=filteredCoordinates[0].boundingPoly.vertices[2].y;
    let center_y4=filteredCoordinates[0].boundingPoly.vertices[3].y;
    


    


    let test = $.test();
    console.log($(".variation1")[0].value);

    let lab = [];
    let allLabels = [];
    let findData = [];

    let adjust_fields = []
    let overrideTaxableValue = $('#override_taxable_value').is(':checked');


    $.ajax({
      url: `${[test[0].url]}/label/labels`,
      async: false,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (data, status, xhr) {
        console.log(data);
        data.data.map((value) => {
          allLabels.push(value);
        });
      },
    });

    for (let i = 0; i < $(".new_labels").length; i++) {
      let labelID = $(".new_labels")[i].id;
      

      let train_label = {
        supplierNumber: +$("#vendor_code").val(),
        label: "",
        startx: +$(".startX")[i].value,
        starty: +$(".startY")[i].value,
        endx: +$(".endX")[i].value,
        endy: +$(".endY")[i].value,
        supplierName: $("#vendor_name").val(),
        value: $(".variation1")[i].value,
        template: $("#template_number").val(),
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
        override_taxable_value:overrideTaxableValue,
        date_format : $("#date_formate").val(),
        labelId: {
          id: +$(`#${labelID}`).attr("data-label-id"),
        },
      };
      lab.push(train_label);
    }


    // console.log("the lab ========",lab);

    lab.map((res) => {
      allLabels.map(async (re) => {
        if (res.labelId.id == re.id) {
          res.label = re.grn_column;
        }
      });
    });

    // console.log('after lab ======',lab);




    let count = 0;
    for (let i = 0; i < $(".mandatory").length; i++) {
      const element = $(".mandatory")[i];
      const red_border_error = $(".red_border_error")[i];
  
      if ($(element).val() != "") {
        count++;
      

        if (count == $(".mandatory").length) {
          $("#submit_invoice").html("Please wait...");
          $("#loader").addClass("ibox-content");
          $("#loader").addClass("sk-loading");
          $("#spin1").removeClass("d-none");

          console.log(overrideTaxableValue,'overrideraxable')

          // Add the checkbox value to your payload
          // let lab = {
          //     // Other payload data...
          //     overrideTaxableValue: overrideTaxableValue
          // };


          // console.log(lab);
          // fetch(`${[test[0].url]}/ocrtraining/update?supplier=${(vendorInfo.vendorCode)}&template=${(vendorInfo.vendorTemplate)}`, {
            fetch(`${[test[0].url]}/ocrtraining/update?supplier=${(vendorInfo.vendorCode)}&template=${(vendorInfo.vendorTemplate)}`, {
              method: 'PUT',
              body: JSON.stringify(lab),
              headers:{'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
          }).then(response => {
              return response.json()
          }).then((data)=>{
              $("#loader").removeClass("sk-loading");
              $("#loader").removeClass("ibox-content");
              $("#spin1").addClass("d-none");
              window.sessionStorage.removeItem('preview_invoice');

              try {

                swal("" , "Successfully Updated" , "success").then(()=>{
                  window.open("../template/trainingList.jsp","_self")
                  console.log(data)
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
                      text: "Successfully Updated",
                      icon: "success",
                      confirmButtonText: "OK",
                    })
                    .then(() => {

                      swal("" , "Successfully Template Created" , "success").then(()=>{
                        window.open("../template/trainingList.jsp","_self")
                        console.log(data)
                      })

                    })
                
                
            }

              // window.open("../template/trainingList.jsp","_self")
              // console.log(data)
          }).catch(err => console.log(err));
        }
      } else {
        swal("", "Please train all Required labels!", "warning");
        $(red_border_error).css("border", "1px solid rgb(213 83 83)");
      }
    }

  });

  $("#back_invoice").click(() => {
    window.open("../template/trainingList.jsp", "_self");
  });
});
