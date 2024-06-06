


$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var sessionString = sessionStorage.getItem('object');
    var object = JSON.parse(sessionString);
    $.checkstatus(object.id, true)

    var tags = []
    var codes = []
    var tag_code = []
    var tags_value = [];


    console.log(object);

    var test = $.test()

    var vehicle_nbr = $("#vehicle_nbr").val(object.vehicle_nbr);
    var vendorname = $("#vendorname").val(object.vendorname);
    var material_type = $("#material_type").val(object.material_type);
    var weight = $("#weight").val(object.weight);
    var gate_number = $("#gate_number").html(object.gate_number);
    var in_time = $("#in_time").val(object.in_time);
    var division = $("#division").val(object.division);
    var remark = $("#remark").val(object.remark);



    $("#save").click((e) => {

        var code = 100;
        console.log($("#gate_number").html());

        e.preventDefault();


        var span = $(".item");

        span.map((index, value) => {
            codes.push(value.innerText.split("\n")[0])
            // console.log(codes);    
        })

        // console.log(tags_value);
        for (let i = 0; i < tags_value.length; i++) {

            for (let j = 0; j < codes.length; j++) {
                if (tags_value[i].hasOwnProperty(codes[j])) {

                    tag_code.push(Object.values(tags_value[i]))

                }
            }
        }


        tag_code.flat(5000).map(value => {

            tags.push({ id: value })
        })




        for (let i = 0; i < $(".fetch_check").length; i++) {
            let check = $(".fetch_check")[i]
            // console.log("fetch : " + i);
            if ($(check).val() != "") {
                $(check).css("border", "1px solid rgb(248,215,218)")

                if (i == $(".fetch_check").length - 1) {

                    $.ajax({
                        type: "PUT",
                        url: `${[test[0].url]}/gate/put?id=${object.id}`,
                        data: JSON.stringify({
                            "gate_number": $("#gate_number").html(),
                            "vendorname": $("#vendorname").val(),
                            "vehicle_nbr": $("#vehicle_nbr").val(),
                            "material_type": $("#material_type").val(),
                            "in_time": $("#in_time").val(),
                            "division": $("#division").val(),
                            "remark": $("#remark").val(),
                            "weight": $("#weight").val(),
                            "status": { code },
                            "tags": tags
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`

                        },
                        success: function (data, status, xhr) {
                            // console.log(data);

                            if (xhr.status == 200) {

                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-success',
                                    },
                                    buttonsStyling: false
                                })


                                swalWithBootstrapButtons.fire({
                                    title: 'Gate updated',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    reverseButtons: true
                                }).then((result) => {

                                    window.open("../template/gate.jsp", "_self")
                                })

                            }
                            else {
                                swal("", xhr.responseJSON.message, "error")
                            }
                        },
                        error: function (xhr) {
                            if(xhr.status == 498)
                            {
                                $.tokenError();
                            }
                        }
                    });
                }
            }
        }
    });

    $("#form1").submit((e) => {
        e.preventDefault();
        var code = 200;

        var span = $(".item");

        span.map((index, value) => {
            codes.push(value.innerText.split("\n")[0])
            // console.log(codes);    
        })

        // console.log(tags_value);
        for (let i = 0; i < tags_value.length; i++) {

            for (let j = 0; j < codes.length; j++) {
                if (tags_value[i].hasOwnProperty(codes[j])) {

                    tag_code.push(Object.values(tags_value[i]))

                }
            }
        }


        tag_code.flat(5000).map(value => {

            tags.push({ id: value })
        })

        // $.sendEmail(object,"Gate");


        $.ajax({
            type: "PUT",
            url: `${[test[0].url]}/gate/put?id=${object.id}`,
            data: JSON.stringify({
                "gate_number": $("#gate_number").html(),
                "vendorname": $("#vendorname").val(),
                "vehicle_nbr": $("#vehicle_nbr").val(),
                "material_type": $("#material_type").val(),
                "in_time": $("#in_time").val(),
                "division": $("#division").val(),
                "remark": $("#remark").val(),
                "weight": $("#weight").val(),
                "status": { code },
                tags: tags
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            success: function (data, status, xhr) {
                // console.log(data);

                if (xhr.status == 200) {

                    // console.log(data.data);
                    $.sendEmail(data.data,"Gate");

                }
                else {
                    swal("", xhr.responseJSON.message, "error")
                }



            },
            complete :()=>{

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                    buttonsStyling: false
                })


                swalWithBootstrapButtons.fire({
                    title: 'Gate updated',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then((result) => {
                    window.open("../template/gate.jsp", "_self")
                })
                
            },
            error: function (xhr) {
                if(xhr.status == 498)
                {
                    $.tokenError();
                }
            }
        });
    })


    $.ajax({
        url: `${[test[0].url]}/tag/tags`,

        headers: {
            'Authorization': 'Bearer ' + token,
          },

        success: function (data, status, xhr) {

            data.data.map(value => {

                let code = value.id

                tags_value.push({ [`${value.label}`]: code })

                $("#roles").append(`<option value="${value.description}">${value.label}</option>`)

                $("#roles").attr("multiple", "")

            })


            call();

        },
        error: function (xhr) {
            if(xhr.status == 498)
            {
                $.tokenError();
            }
        }

    })



    function call() {

        let tags = $("#roles").filterMultiSelect();

        for (let obj of object.tags) {
            // console.log(obj.label);
            tags.selectOption(obj.description)
        }
    }

    $("#cancel1").click((e) => {
        e.preventDefault();
        window.open("../template/gate.jsp", "_self");
    })
})



