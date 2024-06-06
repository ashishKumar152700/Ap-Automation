$(function () {
  "use strict";

  let token = JSON.parse(localStorage.getItem("token"));
  let label_count =+$(".new_labels")[$(".new_labels").length - 1].id.split("_")[1] + 1;

  let sibling_parent;

  $("#fetch_value").click(() => {
    let disabled_label = [];

    for (let i = 0; i < $("#assign_label").children().length; i++) {
      disabled_label.push(+$(".new_labels")[i].value);
    }

    // let valuecheck=$(".variation1").val();
    // // console.log(valuecheck);

    // _____for appending new label
    // if ($(".variation")[$(".variation").length-1].value != "") {
    //   $("#assign_label").append(`<div class="box d-flex mt-1">
    //   <div class="w-100 w-md-200px new_labe mr-1">
    //     <select  id="label_${label_count}"  class="form-select new_labels h-100 w-100 pl-2"
    //       data-placeholder="Select a variation">
    //       <optgroup label="Header" id="header_label_${label_count}" class="header_label_${label_count}"></optgroup>
    //       <optgroup label="Details" id="details_label_${label_count}" class="details_label_${label_count}"></optgroup>
    //       <optgroup label="Letter Head" id="laterhead_label_${label_count}" class="laterhead_label_${label_count}"></optgroup>
    //     </select>
    //   </div>

    //   <input type="text" class="label form-control mw-100 w-200px variation variation1" >
    //   <input type="text"  class="form-control d-none startX" placeholder="startX">
    //   <input type="text"  class="form-control d-none startY" placeholder="startY">
    //   <input type="text"  class="form-control d-none endX" placeholder="endX">
    //   <input type="text"  class="form-control d-none endY" placeholder="endY">

    //   <button type="button" data-repeater-delete="" class="btn btn-sm btn-icon btn-outline-danger delete ml-1">X
    //     <!--begin::Svg Icon | path: icons/duotune/arrows/arr088.svg-->
    //     <!--<span class="svg-icon svg-icon-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    //         xmlns="http://www.w3.org/2000/svg">
    //         <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1"
    //           transform="rotate(-45 7.05025 15.5356)" fill="currentColor"></rect>
    //         <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)"
    //         fill="currentColor"></rect>
    //         </svg></span>-->
    //         <!--end::Svg Icon--> </button>
    //         </div>`)

    //         all_labels.map(value => {
    //           if (value.label_type == "Header") {
    //                 if (disabled_label.includes(value.id)) {
    //                   $(`#header_label_${label_count}`).append(`<option disabled name="${value.label_name}" value="${value.id}">${value.label_name}</option>`)
    //                 }else{
    //                   $(`#header_label_${label_count}`).append(`<option name="${value.label_name}" value="${value.id}">${value.label_name}</option>`)

    //                   if (value.label_required) {
    //                     $(`#header_label_${label_count} option[value="${value.id}"]`).css("font-weight", "bold").text(`${value.label_name}`+ " *");
    //                   }
    //                 }
    //               }else if(value.label_type == "Details"){
    //                 if (disabled_label.includes(value.id)) {
    //                   $(`#details_label_${label_count}`).append(`<option disabled name="${value.label_name}" value="${value.id}">${value.label_name}</option>`)
    //                 }else{
    //                   $(`#details_label_${label_count}`).append(`<option name="${value.label_name}" value="${value.id}">${value.label_name}</option>`)
    //                   if (value.label_required) {

    //                     $(`#details_label_${label_count} option[value="${value.id}"]`).css("font-weight", "bold").text(`${value.label_name}`+ " *");

    //                   }
    //                 }
    //               }else if(value.label_type=="Letter Head"){
    //                 if (disabled_label.includes(value.id)) {
    //                   $(`#laterhead_label_${label_count}`).append(`<option disabled name="${value.label_name}"  value="${value.id}">${value.label_name}</option>`)
    //                 }else{
    //                   $(`#laterhead_label_${label_count}`).append(`<option name="${value.label_name}"  value="${value.id}">${value.label_name}</option>`)
    //                   if (value.label_required) {
    //                     $(`#laterhead_label_${label_count} option[value="${value.id}"]`).css("font-weight", "bold").text(`${value.label_name}`+ " *");

    //                   }
    //                 }
    //             }
    //         })

    // }

    // const va = fetch("/custom/cropper/OCRJson/output.json").then((data) => {
    //   // const va = fetch("TATA-1.jpg").then((data) => {
    //   return data.json()
    // }).then((res) => {

    //   const vertices = res.map((d) => {
    //     // console.log(d);
    //     return d;
    //   });

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
    console.log(filteredCoordinates);
    console.log(out);


    try {
      console.log(startX, startY, endX, endY);

      console.log('labels ---->' , sibling_parent);
      if (sibling_parent == "Center") {
              console.log(new_out.includes(" "));
              if (new_out.includes(" ")) {
                // alert("Center should be one word like : Quantity, Description.")
                $.errorMessage("Center must be one word from middle of invoice \n Example : Quantity, Description etc.")
                return;
              }
              $(`#push_value_${label_count}`).val(new_out);
              $(`#push_value_${label_count}`).css("border","1px solid rgb(14 139 0)");
              $(`#startX_${label_count}`).val(startX);
              $(`#startY_${label_count}`).val(startY);
              $(`#endX_${label_count}`).val(endX);
              $(`#endY_${label_count}`).val(endY);
            }else{
              $(`#push_value_${label_count}`).val(new_out);
              $(`#push_value_${label_count}`).css("border","1px solid rgb(14 139 0)");
              $(`#startX_${label_count}`).val(startX);
              $(`#startY_${label_count}`).val(startY);
              $(`#endX_${label_count}`).val(endX);
              $(`#endY_${label_count}`).val(endY); 
      }

      // label_count++;

      // // $(".label")[$(".label").length - 1].value = new_out;
      // $(".startX")[$(".startX").length - 1].value = startX;
      // $(".startY")[$(".startY").length - 1].value = startY;
      // $(".endX")[$(".endX").length - 1].value = endX;
      // $(".endY")[$(".endY").length - 1].value = endY;
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

  $("#assign_label").on("click", ".variation", function (e) {
    label_count++;
    console.log(e.currentTarget);
    let parent_element = e.currentTarget.parentElement;
    console.log(parent_element);
    // Get all the siblings (including the target input itself)
    const siblings = Array.from(parent_element.children);
    console.log(siblings);
    console.log(siblings[0].value);

    sibling_parent = siblings[0].value
    $(e.currentTarget).attr("id", `push_value_${label_count}`);
    $(siblings[2]).attr("id", `startX_${label_count}`);
    $(siblings[3]).attr("id", `startY_${label_count}`);
    $(siblings[4]).attr("id", `endX_${label_count}`);
    $(siblings[5]).attr("id", `endY_${label_count}`);
    // $("#cropper_box").trigger("click")

    // alert("demo")
    // if($(".label").length == 1 )

    // {
    //   $(".label")[$(".label").length - 1].value  = ""
    // }
    // else{
    //   $(this).parent().remove()
    // }
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
        console.log(e.type, e.detail.ratio);
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
