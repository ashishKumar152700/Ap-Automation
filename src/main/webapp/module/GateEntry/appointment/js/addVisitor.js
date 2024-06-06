$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var login=$.login()
    var test = $.test()

    var Vtable;
    
    $.ajax({
        url: `${[test[0].url]}/status/get`,
        async: false,

        // Type of Request
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
          },

        success: function (data,status,xhr) {

            if(xhr.status == 200)
            {
                for(let i = 0 ; i < data.data.length ; i++)
                {

                    $a=$(`<a class="stats" >${data.data[i].label}</a>`);
                 
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
    
    

 


    $("form")[0].reset();
    $("#in_time")[0].value = new Date().toLocaleString();
    const d = new Date();


   
    $('#form').submit(function (e) {
        e.preventDefault();


       

    });



    $("#cancel").click((e) => {
        e.preventDefault();
        window.open("../template/visitor.jsp", "_self");
    })



    $("#col1_filter").keypress((event) => {

        if (event.keyCode === 13) {

            $('#Dtable').DataTable().column(1).search(

                $('#col' + 1 + '_filter').val(),

                $('#col' + 1 + '_smart').prop('checked')

            ).draw();

        }

    });
    $("#vendor_code_name").on("keypress", function (event) {
        if (event.keyCode === 13) {
            // $("#loader6").addClass("ibox-content");
            // $("#loader6").addClass("sk-loading");
            // $("#spin6").removeClass("d-none");
            $("#vendor_code_name_search").trigger("click");
        }
    });

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
        
        $("#Vendor_Search").trigger("click")

    })

    

    
    $("#vendor_code_name_search").click(() => {

    
        let dynamic_vendor = isNaN($("#vendor_code_name").val() * 1) ? `$filter=F0101.ALPH CONTAINS ${$("#vendor_code_name").val()}` : `$filter=F0101.AN8 EQ ${$("#vendor_code_name").val()}`
    
        // console.log(dynamic_vendor);
    
        // if($("#vendorcode").val() != "")
        // {
        $("#loader6").addClass("ibox-content");
        $("#loader6").addClass("sk-loading");
        $("#spin6").removeClass("d-none");
        let vendor_code = $("#vendor_code_name").val();
        $.ajax({
            url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$filter=F0101.AT1 EQ E&${dynamic_vendor}`,
            type: "GET",
            // async : false,
            headers: {
                Authorization:
                    "Basic " +
                    btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`),
            },
            success: function (data) {
    
                console.log(data);

                // $("#loader6").addClass("ibox-content")
                // $("#loader6").addClass("sk-loading")
                // $("#spin6").removeClass("d-none")

                try {
                    Vtable.destroy();
                    $("#Vendor_body").empty();
                } catch (error) {
                    
                }
    
                var record = data.fs_DATABROWSE_F0101.data.gridData.summary.records;
    
                if (record > 0) {
    
                    // $("#Vendor_body_table").removeClass("d-none")

                    
    
    
                    // $("#vendor_name").val(
                    //     data.fs_DATABROWSE_F0101.data.gridData.rowset[0].F0101_ALPH
                    // );
    
                    let vendor_rows = data.fs_DATABROWSE_F0101.data.gridData.rowset;
    
                    // console.log(vendor_rows);
    
                    for (let i = 0; i < vendor_rows.length; i++) {
                        $("#Vendor_body").append(`<tr>
                        <td>${vendor_rows[i].F0101_AN8}</td>
                        <td>${vendor_rows[i].F0101_ALPH}</td>
                        </tr>`)
                    }
    
                    // $("#Vendor_Search").trigger("click")
    
                    $("#loader6").removeClass("ibox-content");
                    $("#loader6").removeClass("sk-loading");
                    $("#spin6").addClass("d-none");
                    ;
                }
                if (record == 0) {
                    swal("", "Vendor Not Present In JDE", "error").then(() => {
                        // Vtable.destroy();
                        // $("#Vendor_body").empty();
                        $("#vendor_name").val("");
                        $("#loader6").removeClass("ibox-content");
                        $("#loader6").removeClass("sk-loading");
                        $("#spin6").addClass("d-none");
                        $("#preview_img").addClass("invisible");
                    });
                }
            },
            error: function (xhr) {
                // console.log(xhr);
                if(xhr.status == 0)
                {
                    console.log("coming");
                    $("#loader6").removeClass("ibox-content");
                    $("#loader6").removeClass("sk-loading");
                    $("#spi6").addClass("d-none");

                }
                swal("", xhr.responseJSON.sysErrors[0].TITLE, "error").then(() => {
                    // Vtable.destroy();
                    $("#Vendor_body").empty();
                    $("#vendor_name").val("");
                    $("#loader6").removeClass("ibox-content");
                    $("#loader6").removeClass("sk-loading");
                    $("#spi6").addClass("d-none");
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
                    processing: true,
                    lengthMenu: [5, 10, 20, 25, 50],
                    pagingType: "simple_numbers",
                    select: true,
    
                });
    
            },
        });
    // }
    // else{
    //     swal("", "Please Enter The Vendor Name OR Code ", "error")
    // }
    });
    var dataa;
    var roww;
    $('#Vtable tbody').on('click', 'tr', function () {
        dataa = Vtable.row(this).data();
        roww = $(this)[0];
    
        // console.log(roww);
    
    
        // console.log(dataa);
        
    
    });
    
    $("#Vendor_selected").click(() => {
        searchh(dataa);
    })


    function searchh(dataa) {
        // $("#vendorcode").val(dataa[0]);
        $("#vendorcode").val(dataa[1])

        $(roww).removeClass("selected");

        $.ajax({
            url: `${[test[0].url]}/ocrtraining/get?supplier=${dataa[0]}`,
            type: "GET",
            // async: false,
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    // console.log(data.data);
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
            },
        });

    }





$("#myModal20").on('hide.bs.modal', function () {
    // Clear the contents of the modal
    Vtable.destroy();
    $("#Vendor_body").empty();
    $("#vendor_code_name").val("")

});






$(window).load(() => {
    let test = $.test();
    let gateId = JSON.parse(localStorage.getItem("gateId"));
    // console.log(gateId);
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
                number =data.data[0].gateNumber;
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

$("#confirm").click(()=>{
  
     // var label = $("#labelid").val()
     var firstname = $("#first_name").val();
     var lastname = $("#last_name").val();
     var vehicleNumber = $("#vehicle_nbr").val();
     var mobile = $("#mobile").val();
     var email = $("#email").val();
     var personToMeet = $("#vendorcode").val();
     var purpose = $("#purpose").val();
     var inTime = $("#in_time").val();
     var request = $("#request").val();
     var address = $("#address").val();
     var gate_number = $("#gate_number").html();


    //  console.log(firstname,lastname,vehicleNumber,mobile,email,personToMeet,purpose,inTime,request,address,gate_number);
  



     $.ajax({
         url: `${[test[0].url]}/visitor/add`,                                                                                                       
         type: "POST",
         data: JSON.stringify({
             // labelId: label,
             first_name : firstname,
             last_name : lastname,
             mobile : mobile,
             email : email,
             address : address,
             person_to_meet : personToMeet,
             purpose : purpose,
             in_time : inTime,
             vehicle_number: vehicleNumber,
             gate_number : gate_number,
             request: request,
             status : "GATE-IN"
         }),
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+ token,
         },

         success: function (data, status, xhr) {
            //  console.log(data)
             console.log(xhr);


             if (xhr.status == 200) {
                 window.open("../template/visitor.jsp", "_self");
                 $("form")[0].reset();
             }
             else{

                $.errorMessage(xhr.responseJSON.message);
                 $("form")[0].reset();
             }
             
         },
         

         error: function (xhr, httpStatusMessage, customErrorMessage) {

            if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >= 400 && xhr.status < 500){

                        $.errorMessage(xhr.responseJSON.message);
                        $("form")[0].reset();
                }
                else{
                        $.errorMessage(xhr.responseJSON.error)
                        $("form")[0].reset();
                }
         }
     });
})
$("#save").click(()=>{

    $("#modal_gate_number").html($("#gate_number").html());
    $("#modal_first_name").html($("#first_name").val())
    $("#modal_last_name").html($("#last_name").val())
    $("#modal_mobile").html($("#mobile").val())
    $("#modal_email").html( $("#email").val())
    $("#modal_in_time").html($("#in_time").val())
    $("#modal_vehicle_nbr").html($("#vehicle_nbr").val())
    $("#modal_person_to_meet").html($("#vendorcode").val())
    $("#modal_purpose").html($("#purpose").val())
    $("#modal_request").html( $("#request").val())
    $("#modal_address").html($("#address").val())

    // Barcode generation 
   var options = {
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
})



 // Get the video, button, canvas, and image elements
 const video = document.getElementById('videoElement');
 const captureButton = document.getElementById('captureButton');
 const canvas = document.getElementById('canvasElement');
 const context = canvas.getContext('2d');
 const capturedImage = document.getElementById('capturedImage');
 
 // Access the camera
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   navigator.mediaDevices.getUserMedia({ video: true })
     .then(function(stream) {
       // Display the video stream in the video element
       video.srcObject = stream;
     })
     .catch(function(error) {
       console.error('Error accessing the camera: ', error);
     });
 } else {
   console.error('getUserMedia is not supported in this browser.');
 }
 
 // Capture photo when the button is clicked
 captureButton.addEventListener('click', function() {
   // Draw the current frame from the video stream onto the canvas
   context.drawImage(video, 0, 0, canvas.width, canvas.height);
   
   // Get the image data from the canvas as a base64-encoded string
   const imageData = canvas.toDataURL('image/png');
   
   // Set the captured image source and display it
   capturedImage.src = imageData;
   capturedImage.style.display = 'block';
 });


 
  






  


  // Listen for Ctrl + P key press
//   document.addEventListener('keydown', function(event) {
//     if (event.ctrlKey && event.key === 'p') {
//       event.preventDefault(); // Prevent the default print behavior

//       // Hide all elements except for the visitor pass
//       const bodyElements = document.body.children;
//       for (let i = 0; i < bodyElements.length; i++) {
//         if (bodyElements[i].id !== 'visitorPass') {
//           bodyElements[i].style.display = 'none';
//         }
//       }

//       // Print the visitor pass
//       window.print();

//       // Restore the visibility of all elements
//       for (let i = 0; i < bodyElements.length; i++) {
//         bodyElements[i].style.display = '';
//       }
//     }
//   });


$("#print_tab").click(()=>{


    $(".row").hide();
    // $(".row").addClass("vw-100");

    $(".modal-footer").hide();
    $(".modal-header").hide();
    $(".modal-body").show();
    $(".modal-body").children().show();
    $(".modal-body").children().children().show();
    $(".modal-body").children().children().children().show();
    $(".modal-body").children().children().children().children().show();



      window.print();

      

     $(".row").show();
    $(".modal-footer").show();
    $(".modal-header").show();
    $(".modal-body").show();
    $(".modal-body").children().show();
    $(".modal-body").children().children().show();
    $(".modal-body").children().children().children().show();
    $(".modal-body").children().children().children().children().show();
    

});

});

