


$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test()
    
    // $(window).load(() => {

    //     $.ajax({
    //         url: `${[test[0].url]}/gate/number/150`,
    //         success: function (data) {
    //             number = data.data.gateNumber;
    //             console.log(number);
    //             $("#gate_number").html(number)

    //             // console.log(number);
    //         }
    //     })

    // })









    $("#select_vendor").change(() => {

        $("#preview_img").removeClass("invisible")
    })


    $("#preview_img").change(() => {
        $("#preview_invoice").removeClass("invisible")

    })




    $("#send_ocr").click(() => {

        // $("#loader").addClass("sk-loading")
        // $("#loader").addClass("ibox-content")
        // $("#spin").addClass("sk-spinner")
        // $("#spin").addClass("sk-spinner-double-bounce")

        let req_body = {}
        $("#send_ocr").html("Please wait...")
        let supplier = $("#select_vendor")[0].value;
        console.log(localStorage.getItem(`${supplier}`));
        let fd = new FormData();
        var files = $("#preview_img")[0].files[0];
        console.log(files);
        fd.append('file', files);
        console.log(fd);


        fetch(`${[test[0].url]}/api/ocr`, {
            method: 'POST',
            body: fd
        }).then(response => {

            console.log('Image uploaded successfully');

            return response.json()
        }).then(() => {

            const exist = JSON.parse(localStorage.getItem(`${supplier}`));
            console.log("the data : ==", exist);

            const va = fetch("output.json").then((data) => {
                // const va = fetch("TATA-1.jpg").then((data) => {
                return data.json()
            }).then((res) => {

                const vertices = res.map((d) => {
                    // console.log(d);
                    return d;
                });

                console.log(vertices);

                // //   for (let i = 0; i < exist.length-1; i++) {
                //       $("#addrow").trigger("click");

                //   }

                for (let i = 0; i < exist.length; i++) {
                    const element = exist[i];
                    console.log(element.label);

                    const startX = +element.boundingPoly.vertices[0].x;
                    const startY = +element.boundingPoly.vertices[0].y;
                    const endX = +element.boundingPoly.vertices[1].x
                    const endY = +element.boundingPoly.vertices[1].y

                    console.log(startX, startY, endX, endY);
                    const filteredCoordinates = vertices.filter(obj => obj.boundingPoly.vertices[0].x >= startX && obj.boundingPoly.vertices[3].x <= endX && obj.boundingPoly.vertices[0].y >= startY && obj.boundingPoly.vertices[3].y <= endY);
                    // Output the filtered coordinates
                    console.log("The coordinates", filteredCoordinates);
                    let out = ""
                    filteredCoordinates.map((des => {
                        // console.log(des.description);
                        out = out +  des.description+" " ;
                    }))
                    // console.log(out);

                    //   $(".fetch_label")[i].value = element.label;
                    //   $(".fetch_value")[i].value = out;
                    //   let key = element.label;
                    req_body[`${element.label}`] = out
                    //   let value = out;

                    //   let lab = {
                    //       [`${element.label}`] : value
                    //   }

                    //   req_body.push(lab)




                }

                let statu = { code: 100 }
                let tag = [{code : 1000}]

                req_body.status = statu;
                req_body.tags = tag;
                // req_body.weight = 0;
                req_body.invoice_date = null
                req_body.in_time = null
                req_body.weight = parseInt(req_body.weight)
                req_body.amount = parseFloat(req_body.amount)
                // req_body.billto_zipcode = 0
                // req_body.shipto_zipcode = 0
                req_body.gate_number = $("#gate_number").html();
                console.log("last cordinates : ===", req_body);

                $.ajax({
                    type: "POST",
                    url: `${[test[0].url]}/gate/entry`,
                    data: JSON.stringify(req_body),

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                    success: function (data, status, xhr) {
                        console.log(data);
                        // id = data.data.id;
                        // let gate = $("#gate_number").html()
                        //sessionStorage.setItem("gate_number_id",JSON.stringify(data.data.id))
                        // alert("dlaer")

                        if (xhr.status == 200) {
                            // alert("success")
                            window.open("../../gate/template/gate.jsp")

                            // sessionStorage.setItem("gate_number", JSON.stringify(gate))
                            // window.open("../template/gate.jsp", "_self");
                            // // $("#save").css("display", "none");
                            // // $(".add").css("display", "block");
                            // // e.preventDefault();
                            // $("form")[0].reset();
                        }
                        else {
                            // swal("", data.message, "error");
                            $("form")[0].reset();
                        }

                    },

                    error: function (xhr, httpStatusMessage, customErrorMessage) {

                        if(xhr.status == 498)
                        {
                            $.tokenError();
                        }
                        else{
                            swal("", xhr.responseJSON.message, "error")
                        }

                    }
                });

            })
        })
            .catch(error => {
                // Handle any errors
                console.error('Error uploading image:', error);
            })
    })





    // $.ajax({
    //     url:   `${[test[0].url]}/label/labels`,
    //     async: false,

    //     // Type of Request
    //     type: "GET",

    //     success: function (data) {
    //         console.log(data);

    //         for (let i = 0; i < data.data.length; i++) {
    //             // console.log();
    //             // console.log(data.data[i].code);

    //             // console.log(data.data[i].label);

    //             // $b = $(`<option value="${data.data[i].label}">${data.data[i].label}</option>`);
    //             // $("#col2_filter").append($b);
    //         }

    //     },
    //     complete : ()=>{
    //         $("#col2_filter").val("Scan").change()
    //     },

    //     // Error handling
    //     error: function (error) {
    //         console.log(`Error ${error}`);
    //     }
    // });


    $("#myModal5").on('hide.bs.modal', function () {
        $("#countries").children().remove();
    })




    $("#add_user").click(() => {
        window.open("adduser.jsp", "_self");
    })
})


function previewFile() {
    const file = document.querySelector('input[type=file]').files[0];
    console.log(file.name);
    let extension = file.name.split('.');
    extension = extension.reverse();

    console.log(extension[0]);
    if (extension[0] == "jpg") {
        $(".ravi").children().remove();
        $(".ravi").append(`<img class="w-100 h-100" src="" id="preview_img"></img>`)
        const preview = document.querySelector('img');
        const reader = new FileReader();
        var filename = file.name;


        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    } else if (extension[0] == "pdf") {
        $(".ravi").children().remove();
        $(".ravi").append(`<iframe data="" type="application/pdf" class="w-100 h-100"></iframe>`)
        const preview = document.querySelector('iframe');
        const reader = new FileReader();
        var filename = file.name;


        reader.addEventListener("load", function () {
            preview.data = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}