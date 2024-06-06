var $remap_arr = []

$(function () {
    "use strict";

    
  
    let token = JSON.parse(localStorage.getItem("token"));
    let req_body = JSON.parse(sessionStorage.getItem("object"));
    let label_count = 1;

    let in_name ;
    let field_name;
    $("#assign_label").on("click", ".check", function (e) {
      label_count++;
      console.log("console values : ", e.currentTarget);
      in_name = e.currentTarget;
      let parent_element = e.currentTarget.parentElement;
      console.log($(parent_element));

      console.log('e value  ---->' ,e.currentTarget.id);
  
      // Get the inner value of the label element
      console.log('values genral  ---->' ,$(parent_element).siblings('label.col-6.col-form-label').text());
      let labelValue = $(parent_element).siblings('label.col-6.col-form-label').text();
      console.log("Inner Value of Label:", labelValue);
      field_name = labelValue != "" ? labelValue : e.currentTarget.id ;
      $(e.currentTarget).attr("data-push-id", `push_value_${label_count}`);
  });
  
    $("#fetch_value").click(() => {

      const vertices = JSON.parse(localStorage.getItem("ocr_output"));
  
      const startX = +$("#dataX").val();
      const w = +$("#dataWidth").val();
      const endX = startX + w;
      const startY = +$("#dataY").val();
      const h = +$("#dataHeight").val();
      const endY = startY + h;
  
      const filteredCoordinates = vertices.filter(
        (obj) =>
          obj.boundingPoly.vertices[0].x >= startX &&
          obj.boundingPoly.vertices[2].x <= endX &&
          obj.boundingPoly.vertices[0].y >= startY &&
          obj.boundingPoly.vertices[2].y <= endY
      );
      // Output the filtered coordinates
      console.log("The coordinates", filteredCoordinates);
  
      let out = "";
      filteredCoordinates.map((des) => {
        // console.log(des.description);
        out = out + des.description + " ";
      });
      let new_out = out.trim();
      console.log(out);
  
      try {
        console.log(startX, startY, endX, endY);
  
        let previous_old_value =  $(in_name).val();
        $(in_name).val(new_out);
        console.log($(in_name).attr("id"));
        if ($(in_name).attr("id") == 'amount' || $(in_name).attr("id") == 'taxable_value') {

          console.log('selected value ---->' ,new_out);
          $(in_name).val(new_out.replace(/[a-zA-Z]+/g, '').trim().replace(/^[.,]+|[.,]+$/g, ''));
        }
        if($(in_name).attr("id") == 'invoice_number')
        {
          $(in_name).val(new_out.replace(/DeliveryNote/gi, "").replace(/InvoiceNo.:/gi, "").replace(/InvoiceNo./gi, "").replace(/No./gi , "").replace(/invoice/gi, "").replace(/No:/gi , "").replace(/[^A-Za-z0-9/-]/gi, ''));
        }
        $(in_name).css("border","1px solid rgb(14 139 0)");

        let today = new Date();
        let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-")
        let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

        // console.log(date +"  "+time );
        console.log(`FieldName - ${field_name}, Old Value - ${previous_old_value}, New Value - ${new_out}`);
        console.log($("#gate_number").html(),$(".name")[1].innerText,`${date}` ,`${time}`);


        



        console.log('field_name ---->' ,new_out );
        console.log('field_name 123 ---->' ,field_name );

      if(field_name && filteredCoordinates.length != 0)
      {
        let remap_data = {
                  gateNumber: $("#gate_number").html(),
                  remark : `FieldName - ${field_name}, Old Value - ${previous_old_value}, New Value - ${new_out}`,
                  status  : req_body.status.code,
                  username  : $(".name")[1].innerText,
                  timestamp : `${date} ${time}` 
              }
  
              if($remap_arr.length == 0 )
              {
                $remap_arr.push(remap_data)
              }
              else{

               let returned_value =  $remap_arr.map((value)=> 
                {

                    if(value.remark.includes(field_name))
                    {
                      let new_remark_value = value.remark.split("New Value -")
                      let new_value = new_remark_value[1] = `${new_out}`

                      value.remark = `${new_remark_value[0]} New Value - ${new_out}`
                      return true;
                    }
                    else{
                      return false;
                    }

                });

                if(returned_value.includes(true))
                {

                }
                else{
                  $remap_arr.push(remap_data);
                }
              }
  


  
              console.log('data remap  ---->' , $remap_arr);
      }


        
        // $.ajax({
        //     url : `${[test[0].url]}/remark/add`,
        //     type : 'POST',
        //     data : JSON.stringify({

        //         gate_number: $("#gate_number").html(),
        //         remark : `FieldName - ${field_name}, Old Value - ${previous_old_value}, New Value - ${new_out}`,
        //         status  : req_body.status.code,
        //         username  : $(".name")[1].innerText,
        //         timestamp : `${date} ${time}` 
        //     }),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     },
        //     success : function(data,status,xhr)
        //     {

        //         console.log(data);
        //     }
        //   })
        label_count++;
      } catch (error) {
        console.log(error);
      }
  
      $("#cross").trigger("click");
  
      // })
    });
  
    $("#assign_label").on("click", ".delete", function () {
      if ($(".label").length == 1) {
        $(".label")[$(".label").length - 1].value = "";
      } else {
        $(this).parent().remove();
      }
    });
  
    $("#assign_label").on("click", ".check", function (e) {
      label_count++;
      console.log(e.currentTarget);
      let parent_element = e.currentTarget.parentElement;
      console.log(parent_element);
      $(e.currentTarget).attr("data-push-id", `push_value_${label_count}`);
    });
  
    // $("#assign_label").on("change", ".new_labels", function () {
    //   alert("da")
    // })
  
    let all_labels = [];
    $.ajax({
      url: `${[test[0].url]}/label/labels`,
      async: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (data, status, xhr) {
        all_labels.push(...data.data);
      },
      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        }
      },
    });
  
    var console = window.console || { log: function () {} };
    var URL = window.URL || window.webkitURL;
    var $image = $("#image");
    var $download = $("#download");
    var $dataX = $("#dataX");
    var $dataY = $("#dataY");
    var $dataHeight = $("#dataHeight");
    var $dataWidth = $("#dataWidth");
    var $dataRotate = $("#dataRotate");
    var $dataScaleX = $("#dataScaleX");
    var $dataScaleY = $("#dataScaleY");
  
    var options = {
      aspectRatio: NaN,
      preview: ".img-preview",
      crop: function (e) {
        $dataX.val(Math.round(e.detail.x));
        $dataY.val(Math.round(e.detail.y));
        $dataHeight.val(Math.round(e.detail.height));
        $dataWidth.val(Math.round(e.detail.width));
        $dataRotate.val(e.detail.rotate);
        $dataScaleX.val(e.detail.scaleX);
        $dataScaleY.val(e.detail.scaleY);
      },
    };
  
    var originalImageURL = $image.attr("src");
    var uploadedImageName = "cropped.jpg";
    var uploadedImageType = "image/jpeg";
    var uploadedImageURL;
  
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
  
    // Cropper
    $image
      .on({
        ready: function (e) {
          console.log(e.type);
        },
        cropstart: function (e) {
          console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
          console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
          // $("#cross").trigger("click")
          // })
        },
        
  
        crop: function (e) {
          console.log(e.type);
        },
        zoom: function (e) {
          // console.log(e.type, e.detail.ratio);
        },
      })
      .cropper(options);
  
    // Buttons
    if (!$.isFunction(document.createElement("canvas").getContext)) {
      $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
    }
  
    if (
      typeof document.createElement("cropper").style.transition === "undefined"
    ) {
      $('button[data-method="rotate"]').prop("disabled", true);
      $('button[data-method="scale"]').prop("disabled", true);
    }
  
    // Download
    if (typeof $download[0].download === "undefined") {
      $download.addClass("disabled");
    }
  
    // Options
    $(".docs-toggles").on("change", "input", function () {
      var $this = $(this);
      var name = $this.attr("name");
      var type = $this.prop("type");
      var cropBoxData;
      var canvasData;
  
      if (!$image.data("cropper")) {
        return;
      }
  
      if (type === "checkbox") {
        options[name] = $this.prop("checked");
        cropBoxData = $image.cropper("getCropBoxData");
        canvasData = $image.cropper("getCanvasData");
  
        options.ready = function () {
          $image.cropper("setCropBoxData", cropBoxData);
          $image.cropper("setCanvasData", canvasData);
        };
      } else if (type === "radio") {
        options[name] = $this.val();
      }
  
      $image.cropper("destroy").cropper(options);
    });
  
    // Methods
    $(".docs-buttons").on("click", "[data-method]", function () {
      var $this = $(this);
      var data = $this.data();
      var cropper = $image.data("cropper");
      var cropped;
      var $target;
      var result;
  
      if ($this.prop("disabled") || $this.hasClass("disabled")) {
        return;
      }
  
      if (cropper && data.method) {
        data = $.extend({}, data); // Clone a new one
  
        if (typeof data.target !== "undefined") {
          $target = $(data.target);
  
          if (typeof data.option === "undefined") {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }
  
        cropped = cropper.cropped;
  
        switch (data.method) {
          case "rotate":
            if (cropped && options.viewMode > 0) {
              $image.cropper("clear");
            }
  
            break;
  
          case "getCroppedCanvas":
            if (uploadedImageType === "image/jpeg") {
              if (!data.option) {
                data.option = {};
              }
  
              data.option.fillColor = "#fff";
            }
  
            break;
        }
  
        result = $image.cropper(data.method, data.option, data.secondOption);
  
        switch (data.method) {
          case "rotate":
            if (cropped && options.viewMode > 0) {
              $image.cropper("crop");
            }
  
            break;
  
          case "scaleX":
          case "scaleY":
            $(this).data("option", -data.option);
            break;
  
          case "getCroppedCanvas":
            if (result) {
              // Bootstrap's Modal
              $("#getCroppedCanvasModal")
                .modal()
                .find(".modal-body")
                .html(result);
  
              if (!$download.hasClass("disabled")) {
                download.download = uploadedImageName;
                $download.attr("href", result.toDataURL(uploadedImageType));
              }
            }
  
            break;
  
          case "destroy":
            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
              uploadedImageURL = "";
              $image.attr("src", originalImageURL);
            }
  
            break;
        }
  
        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }
      }
    });
  
    // Keyboard
    $(document.body).on("keydown", function (e) {
      if (e.target !== this || !$image.data("cropper") || this.scrollTop > 300) {
        return;
      }
  
      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper("move", -1, 0);
          break;
  
        case 38:
          e.preventDefault();
          $image.cropper("move", 0, -1);
          break;
  
        case 39:
          e.preventDefault();
          $image.cropper("move", 1, 0);
          break;
  
        case 40:
          e.preventDefault();
          $image.cropper("move", 0, 1);
          break;
      }
    });
  
    // Import image
    var $inputImage = $("#inputImage");
  
    if (URL) {
      $inputImage.change(function () {
        var files = this.files;
        var file;
  
        if (!$image.data("cropper")) {
          return;
        }
  
        if (files && files.length) {
          file = files[0];
  
          if (/^image\/\w+$/.test(file.type)) {
            uploadedImageName = file.name;
            uploadedImageType = file.type;
  
            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
            }
  
            uploadedImageURL = URL.createObjectURL(file);
            $image
              .cropper("destroy")
              .attr("src", uploadedImageURL)
              .cropper(options);
            $inputImage.val("");
          } else {
            window.alert("Please choose an image file.");
          }
        }
      });
    } else {
      $inputImage.prop("disabled", true).parent().addClass("disabled");
    }
  });
  
  //=======
  
  $("container-fluid").mouseup(function () {
    alert("gh");
  });
  