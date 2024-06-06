


$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    

    // $("#loader").addClass("ibox-content")
    // $("#loader").addClass("sk-loading")
    // $(".sk-spinner").removeClass("d-none")
   




    // Function to convert data URL to Blob
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



    var test = $.test()
    var vision = $.vision();

    
    var status1;
    function editbutton() {
        
            return '<button class="btn btn-outline-primary btn-sm edit">Edit</button>&nbsp;&nbsp;';
    }
    function cancelbutton() {
            return '<button class="btn btn-outline-danger btn-sm cancel">Delete</button>&nbsp;&nbsp;';
    }
    var tab;
    

    $.ajax({
        type: 'GET',
        url: `${[test[0].url]}/ocrtraining/get`,
        // url: `http://192.168.0.206:8050/ocrtraining/get`,
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success: function (data) {
            // console.log(data);
       

            data.data.map((res)=>{
                // console.log(res);
                
                $("#tbody").append(`<tr><td></td><td>${res.supplierNumber}</td><td>${res.supplier_name}</td><td>${res.template}</td><td><div class="btn-group"> 
                     ${cancelbutton()}
                     ${editbutton()}
                     <button class='btn btn-outline-success btn-sm view'>View</button>&nbsp;&nbsp;
                     </div></td></tr>`);

                // if (!unique.includes({"supplierNumber":res.supplierNumber,"template":res.template})) {

                //     unique.push({"supplierNumber":res.supplierNumber,"template":res.template})
                //     // unique.push(res.supplierNumber)
                //     // console.log(res.supplierNumber);
                    
                // }
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
              
        
                // columns: [
                //     { data: "id" },
                //     { data: "supplierNumber"},
                  
                //     {
                //         data: "id", render: function (data, type, row, meta) {
        
                //             return `
                //     <div class="btn-group"> 
                //     ${cancelbutton()}
                //     ${editbutton()}
                //     <button class='btn btn-outline-success btn-sm view'>View</button>&nbsp;&nbsp;
                //     </div>`
                //         }
                //     },
                // ],
        
        
                columnDefs: [
                    {
                        "defaultContent": "-",
                        "targets": "_all"
                    },
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: -2, targets: 2 }
                ],
        
            });

            $("#loader").removeClass("sk-loading");
            $("#loader").removeClass("ibox-content");
            $(".sk-spinner").addClass("d-none");
           
            tab.column(0).visible(false);
           
        }
    });
    


    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });


    $("#search").click(() => {
        $('#Dtable').DataTable().column(1).search(
            $('#col' + 1 + '_filter').val(),
            $('#col' + 1 + '_smart').prop('checked')
        ).draw();
    })

    $("#col1_filter").keypress((event)=> {
        if (event.keyCode === 13) {
            $('#Dtable').DataTable().column(1).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        }
    });

    $("#col2_filter").change(() => {

        $('#Dtable').DataTable().column(6).search(
            $('#col' + 2 + '_filter').val(),
            $('#col' + 2 + '_smart').prop('checked')
        ).draw();
    })


    $("#Dtable").on("click", ".cancel", function () {

        
        var code=999;

        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data().id;
        // console.log(row);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-success mx-1',
                cancelButton: 'btn btn-sm btn-secondary mx-1'
            },
            buttonsStyling: false
        })


        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Close',
            reverseButtons: true
        }).then((result) => {
            var vendorCode = tab.row(raw).data()[1];
            var vendorTemplate = tab.row(raw).data()[3]
            if (result.isConfirmed) {
                $.ajax({
                    url: `${[test[0].url]}/ocrtraining/delete?supplier=${(vendorCode)}&template=${(vendorTemplate)}`,
                    type: "delete",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data) {
                        window.location.reload();
                        // tab.ajax.reload();
                    },
                    error: function (xhr) {
                        if(xhr.status == 498)
                        {
                            $.tokenError();
                        }
                    }

                })
            }
            else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Data is safe :)',
                )
            }
        })
    })




    $("#Dtable").on("click", ".edit", function () {

        $("#loader").addClass("ibox-content")
        $("#loader").addClass("sk-loading")
        $(".sk-spinner").removeClass("d-none")

        var raw = $(this).closest("tr").children();
        

        var vendorCode = tab.row(raw).data()[1];
        var vendorName = tab.row(raw).data()[2];
        var vendorTemplate = tab.row(raw).data()[3]
        
        
        vendorInfo = {
            vendorCode,
            vendorName,
            vendorTemplate
        }
        console.log(vendorCode,vendorTemplate);
        
        sessionStorage.setItem("vendorInfo",JSON.stringify(vendorInfo))

        fetch(`${[test[0].url]}/invoice?supplier=${vendorCode}&template=${vendorTemplate}`,
        {
            headers: {
            'Authorization': 'Bearer ' + token,
          },
        })
        .then(response => response.blob())
        .then((blob) => 
            {
            // console.log(blob);
            

            const objectURL = URL.createObjectURL(blob);
     
            var reader = new FileReader();
            
            reader.onload = function(e) {
                var imageData = e.target.result;
 
                sessionStorage.setItem('preview_invoice', JSON.stringify(imageData));  
                

                // sending image for ocr for updating the trained invoice 
                let fd = new FormData();
                var ocr_image = dataURLToBlob(imageData);
                fd.append('file', ocr_image);

                fetch(`${[vision[0].url]}/api/imageocr`, {
                // fetch('http://192.168.50.81:8888/api/imageocr', {
                    method: 'POST',
                    body: fd,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                  }).then(response => {
          
                    console.log('Image uploaded successfully');
                    // window.open("invoice.html","_self")
                    return response.json()
                  }).then((res) => {          
                    localStorage.setItem("ocr_output", JSON.stringify(res))
                    $("#loader").removeClass("sk-loading");
                    $("#loader").removeClass("ibox-content");
                    $(".sk-spinner").addClass("d-none");
                    window.location.href = `../template/updateTraining.jsp`;
                  })
                    .catch(error => {
                      // Handle any errors
                      console.error('Error uploading image:', error);
                    })
            };
            reader.readAsDataURL(blob)
        }).catch((xhr)=>{
            if(xhr.status == 498)
                {
                    $.tokenError();
                }
        })
        
    })


    $("#Dtable").on("click", ".view", function () {

        $("#loader").addClass("ibox-content")
        $("#loader").addClass("sk-loading")
        $(".sk-spinner").removeClass("d-none")

        var raw = $(this).closest("tr").children();

        var vendorCode = tab.row(raw).data()[1];
        var vendorName = tab.row(raw).data()[2];
        var vendorTemplate = tab.row(raw).data()[3]
        
        
        vendorInfo = {
            vendorCode,
            vendorName,
            vendorTemplate
        }
      
        sessionStorage.setItem("vendorInfo",JSON.stringify(vendorInfo))

        fetch(`${[test[0].url]}/invoice?supplier=${vendorCode}&template=${vendorTemplate}`,{
            headers: {
            'Authorization': 'Bearer '+ token,
          },
        })
        .then(response => response.blob())
        .then((blob) => 
            {

            var reader = new FileReader();
            reader.onload = function(e) {
                var imageData = e.target.result;
                sessionStorage.setItem('preview_invoice', JSON.stringify(imageData));  
                $("#loader").removeClass("sk-loading ibox-content");
                $(".sk-spinner").addClass("d-none");
                window.location.href = `../template/viewTraining.jsp`;
            };
            reader.readAsDataURL(blob)
        }).catch((xhr)=>{
            if(xhr.status == 498)
                {
                    $.tokenError();
                }
        })

       
    })

    $.ajax({
        url:   `${[test[0].url]}/status/get`,
        async: false,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success: function (data) {

            for (let i = 0; i < data.data.length; i++) {
                // console.log();
                // console.log(data.data[i].code);
                // console.log(data.data[i].label);

                $b = $(`<option value="${data.data[i].label}">${data.data[i].label}</option>`);
                $("#col2_filter").append($b);
            }

        },
        complete : ()=>{
            $("#col2_filter").val("Scan").change()
        },
        error: function (xhr) {
            if(xhr.status == 498)
            {
                $.tokenError();
            }
        }
    });


    $("#myModal5").on('hide.bs.modal', function () {
        $("#countries").children().remove();
    })

    $("#add_user").click(() => {
        window.open("adduser.jsp", "_self");
    })
})
