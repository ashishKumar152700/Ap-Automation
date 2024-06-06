


    $(document).ready(() => {

        const token = JSON.parse(localStorage.getItem("token"));

        var test = $.test();
        var login = $.login();

        
        var arr = []
        var sessionString = sessionStorage.getItem('object2');
        var object = JSON.parse(sessionString);
        console.log(object);
        $.checkstatus(object.id, true)

        $("#gate_number").html(object.gate_number);

        $("#company_code").val(object.company_code);
        $("#business_unit").val(object.business_unit);
        $("#form6Example10").val(object.doc_company);
        $("#state").val(object.state);
        $("#invoice_no").val(object.invoice_number);
        $("#invoice_type").val(object.invoice_type);
        $("#curr_code").val(object.currency_code);
        $("#supplier_gstin").val(object.supplier_gstin);
        $("#tds_code").val(object.tds_code);
        $("#vendor_code").val(object.vendor_code);

        $("#invoice_date").val(object.invoice_date);
        $("#gl_date").val(object.GL_date);
        $("#amount").val(object.amount);
        $("#source").val(object.source);
        $("#physical_doc_rec").val(object.physical_doc);
        $("#vendor_name").val(object.vendorname);

        for (let i = 0; i < object.details.length - 1; i++) {
            $("#add_row").trigger("click");

        }


        for (let i = 0; i < object.details.length; i++) {
            let grn_order_no = $(".po")[i]
            let grn_order_type = $(".line_num")[i]
            let grn_order_company = $(".head_company")[i]
            let grn_amount = $(".details_gate_id")[i]
            let grn_total = $(".details_status")[i]
            let grn_currency = $(".currency_head")[i]


            arr.push(object.details[i].po_number)

            let po_number = $(grn_order_no).val(object.details[i].po_number)
            let po_type = $(grn_order_type).val(object.details[i].po_type)
            let company_code = $(grn_order_company).val(object.details[i].company_code)
            let amount = $(grn_amount).val(object.details[i].amount)
            let total = $(grn_total).val(object.details[i].total)
            let currency = $(grn_currency).val(object.details[i].currency)

            $.ajax({
                url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_PurchaseOrder`,
                type: "POST",
                data: JSON.stringify({
                    // token: `${data.userInfo.token}`,
                    po_number: (object.details[i].po_number),
                    po_type: (object.details[i].po_type),
                    // supplier : $("#vendor_code").val()
                    supplier: 4343

                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                },

                success: function (data) {
                    console.log(data);

                    var b = 2;

                    let validate = $(".onee")[0]

                    let count = $("#tab_logicc tr").length - 2


                    for (let i = 0; i < (count == 0 && $(validate).val() == "" ? data.po_details.length - 1 : data.po_details.length); i++)
                    // for(let i = 0 ; i <     ; i++)
                    {
                        $("#add_roww").trigger("click");
                    }


                    // console.log($(validate).val() ==  "");

                    // console.log(count == 0 ? count : (count + 1));


                    for (let i = (count == 0 ? count : (count + 1)), j = 0; i < (count == 0 ? count + data.po_details.length : (count + 1) + data.po_details.length); i++, j++)
                    // for(var i = 0 ; i < data.po_details.length ;  i++)
                    {


                        if ($(validate).val() != null && count == 0 && b == 0) {

                            // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

                            for (let s = 0; s < data.po_details.length; s++) {

                                let one = $(".onee")[s + 1]
                                let line = $(".line_numm")[s + 1]
                                let item = $(".po_item")[s + 1]
                                let status = $(".details_statuss")[s + 1];
                                let gate_id = $(".currency")[s + 1];
                                let next_status = $(".next_status")[s + 1];
                                let last_status = $(".last_status")[s + 1]



                                $(one).val(data.po_details[s].order_number)
                                $(line).val(data.po_details[s].line_number)
                                $(item).val(data.po_details[s].item_number)
                                $(status).val(data.po_details[s].quantity_ordered)
                                $(gate_id).val(data.po_details[s].currency_code)
                                $(next_status).val(data.po_details[s].next_status);
                                $(last_status).val(data.po_details[s].last_status);
                            }

                            break;
                        }
                        else {
                            // console.log("i : " + i);
                            let one = $(".onee")[i]
                            let line = $(".line_numm")[i]
                            let item = $(".po_item")[i]
                            let status = $(".details_statuss")[i];
                            let gate_id = $(".currency")[i];
                            let next_status = $(".next_status")[i];
                            let last_status = $(".last_status")[i]



                            $(one).val(data.po_details[j].order_number)
                            $(line).val(data.po_details[j].line_number)
                            $(item).val(data.po_details[j].item_number)
                            $(status).val(data.po_details[j].quantity_ordered)
                            $(gate_id).val(data.po_details[j].currency_code)
                            $(next_status).val(data.po_details[j].next_status);
                            $(last_status).val(data.po_details[j].last_status);

                        }

                        b = data.po_details.length == 1 ? 1 : 2;


                        // }
                    }

                }
            })
        }


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
                }, false);

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
                }, false);

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
        }

        var gate;
        var gate_number


        $(window).load(() => {


            $("#btn_panel").trigger("click");
            // let sessionString = sessionStorage.getItem('gateid')
            // gate_number = JSON.parse(sessionString);
            //  console.log(gate_number);
            // var checkstatus = $.checkstatus(object2.id,"ture")

            // let gateno = sessionStorage.getItem('gateno')
            // gate = JSON.parse(gateno);

            // console.log(gate_number);
            //  console.log(checkstatus);

        })

        $('input.global_filter').on('keyup click', function () {
            filterGlobal();
        });
        var tab;
        var table;
        var comp;
        var state;

        $.fn.DataTable.ext.pager.numbers_length = 5;
        $.ajax({

            type: 'GET',
            url: `${[login[0].url]}/jderest/v2/dataservice/table/F0006?$field=F0006.MCU&$field=F0006.DL01&$filter=F0006.MCU%20EQ%20*&$limit=50`,
            // dataSrc : "fs_DATABROWSE_F0006",
            headers: {
                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
            },
            success: function (data) {
                //Success block  
                var Business = data.fs_DATABROWSE_F0006.data.gridData.rowset;
                for (let i = 0; i < Business.length; i++) {

                    $("#Business_body").append(`<tr><td>${Business[i].F0006_MCU}</td><td>${Business[i].F0006_DL01}</td></tr>`)

                }

            },

            error: function (xhr, ajaxOptions, throwError) {

                //Error block

            },

            complete: () => {

                tab = $("#Btable").DataTable({
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

                // console.log(tab.page());
            }

        })


        $('#Btable tbody').on('click', 'tr', function () {
            var data = tab.row(this).data();
            var row = $(this)[0];
            function search(data) {
                console.log("hello");
                $("#business_unit").val(data[0] + " - " + data[1]);

                $(row).removeClass("selected");
            }

            $("#business").click(() => {

                search(data);

            })
        });


        $("#business_search").click(() => {
            $('#Btable').DataTable().column(0).search(
                $('#col' + 2 + '_filter').val(),
                $('#col' + 2 + '_smart').prop('checked')
            ).draw();
        })
        $.ajax({
            type: 'GET',

            url: `${[login[0].url]}/jderest/v2/dataservice/table/F0101?$field=F0101.AN8&$field=F0101.ALPH&$field=F0101.TAX&$filter=F0101.AT1%20EQ%20V`,
            headers: {
                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
            },
            success: function (data) {

                var supplier = data.fs_DATABROWSE_F0101.data.gridData.rowset;

                for (let i = 0; i < supplier.length; i++) {
                    $("#Vendor_body").append(`<tr><td>${supplier[i].F0101_AN8}</td><td>${supplier[i].F0101_ALPH}</td><td>${supplier[i].F0101_TAX}</td></tr>`)
                }
            },
            error: function (xhr, ajaxOptions, throwError) {
                //Error block
            },
            complete: () => {


                table = $("#Vtable").DataTable({
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
                table.column(2).visible(false);

            }

        })




        $('#Vtable tbody').on('click', 'tr', function () {
            var dataa = table.row(this).data();
            var roww = $(this)[0];


            console.log(dataa[2]);
            function searchh(dataa) {
                $("#vendor_code").val(dataa[0]);
                $("#supplier_gstin").val(dataa[2])
                $("#vendor_name").val(dataa[1]);


                $(roww).removeClass("selected");
            }

            $("#vendor").click(() => {


                searchh(dataa);

            })
        });

        $("#vendor_search").click(() => {
            $('#Vtable').DataTable().column(0).search(
                $('#col' + 5 + '_filter').val(),
                $('#col' + 5 + '_smart').prop('checked')
            ).draw();
        })




        $.ajax({

            type: 'GET',

            url: `${[login[0].url]}/jderest/v2/dataservice/table/F0010?$field=F0010.CO&$field=F0010.NAME&$filter=F0010.CO%20EQ%20*`,
            headers: {
                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
            },
            success: function (data) {

                // console.log(data);

                var company = data.fs_DATABROWSE_F0010.data.gridData.rowset;

                for (let i = 0; i < company.length; i++) {
                    $("#company_body").append(`<tr><td>${company[i].F0010_CO}</td><td>${company[i].F0010_NAME}</td></tr>`)
                }
            },
            error: function (xhr, ajaxOptions, throwError) {
                //Error block
            },
            complete: () => {
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
                    lengthMenu: [5, 10, 20, 25, 50],
                    pagingType: "simple_numbers",
                    select: true,
                });
            }

        })



        $('#comp_table tbody').on('click', 'tr', function () {
            var dat = comp.row(this).data();
            var rows = $(this)[0];

            // console.log(dat[0]);
            function searchs(dat) {
                $("#company_code").val(dat[0] + " - " + dat[1]);
                // $("#vendor_name").val(dat[1]); 

                $(rows).removeClass("selected");
            }

            $("#company").click(() => {

                searchs(dat);

            })
        });

        $("#comp_search").click(() => {
            $('#comp_table').DataTable().column(0).search(
                $('#col' + 1 + '_filter').val(),
                $('#col' + 1 + '_smart').prop('checked')
            ).draw();
        })
        $.ajax({

            type: 'GET',

            url: `${[login[0].url]}/jderest/v2/dataservice/table/F0005?$field=F0005.KY&$field=F0005.DL01&$filter=F0005.SY%20EQ%2000&$filter=F0005.RT%20EQ%20S`,
            headers: {
                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
            },
            success: function (data) {


                var state = data.fs_DATABROWSE_F0005.data.gridData.rowset;

                // console.log(data);
                for (let i = 0; i < state.length; i++) {
                    $("#state_body").append(`<tr><td>${state[i].F0005_KY}</td><td>${state[i].F0005_DL01}</td></tr>`)
                }
            },
            error: function (xhr, ajaxOptions, throwError) {
                //Error block
            },
            complete: () => {
                // console.log("complete");
                state = $("#state_table").DataTable({
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


        $('#state_table tbody').on('click', 'tr', function () {
            var sData = state.row(this).data();
            var sRow = $(this)[0];

            // console.log(sData[0]);
            function stateSearch(sData) {
                $("#state").val(sData[0] + " - " + sData[1]);
                // $("#vendor_name").val(dat[1]); 

                $(sRow).removeClass("selected");
            }

            $("#state_btn").click(() => {

                stateSearch(sData);

            })
        });


        $("#state_search").click(() => {
            $('#state_table').DataTable().column(0).search(
                $('#col' + 4 + '_filter').val(),
                $('#col' + 4 + '_smart').prop('checked')
            ).draw();
        })




        var match = 0;
        // var arr = []
        var entity = [];
        var overAllCurrency = [];

        var k = 0;
        var m = 1;

        // var count = $("#tab_logicc tr").length - 2

        var b = 2;
        var gateNumber;

        var vehicle_nbr;
        var material_type;
        var weight;
        var in_time;
        var division;
        var remark;


        $("#fetch_btn").click(() => {

            console.log(arr);


            console.log($(".fetch_check").length - 1);

            for (let i = 0; i < $(".fetch_check").length; i++) {
                let check = $(".fetch_check")[i]
                // console.log("fetch : " + i);
                if ($(check).val() != "") {
                    $(check).css("border", "1px solid #e5e6e7")

                    if (i == $(".fetch_check").length - 1) {
                        // console.log("access");


                        $.ajax({
                            url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_PurchaseOrder`,
                            type: "POST",
                            data: JSON.stringify({
                                // token: `${data.userInfo.token}`,
                                po_number: $("#purchase_order").val(),
                                po_type: $("#purchase_type").val(),
                                // supplier : $("#vendor_code").val()
                                supplier: 4343

                            }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                            },

                            success: function (data) {

                                // console.log(data);

                                let sessionString = sessionStorage.getItem("gateid")

                                let gateNumber = JSON.parse(sessionString)

                                // console.log(gateNumber);

                                $.ajax({
                                    url: `${[test[0].url]}/gate/get/${gateNumber}`,
                                    success: function (data) {
                                        console.log(data);

                                        // $("#business_unit").val(data.data[0].business_unit)
                                        // $("#company_code").val(data.data[0].company_code)
                                        // $("#purchase_order").val(data.data[0].po_number)
                                        // $("#purchase_type").val(data.data[0].po_type)
                                        // $("#vendor_name").val(data.data[0].vendorname)
                                        // $("#vendor_code").val(data.data[0].supplier_code)
                                        // $("#vendor_code").val(data.data[0].supplier_code)

                                        vehicle_nbr = data.data.vehicle_nbr
                                        material_type = data.data.material_type
                                        weight = data.data.weight
                                        in_time = data.data.in_time
                                        division = data.data.division
                                        remark = data.data.remark
                                        vendorname = data.data.vendorname

                                    }
                                })



                                // console.log(data);
                                let count = $("#tab_logicc tr").length - 2

                                // console.log("count : " +count);

                                var Purchase_order = $("#purchase_order").val();

                                console.log(arr.includes(Purchase_order) == false);


                                if (arr.includes(Purchase_order) == false && data.amount != 0 && (overAllCurrency.length == 0 || overAllCurrency.includes(data.currency_code) == true)) {


                                    k = 1;
                                    for (let i = 0; i < k; i++) {
                                        $("#add_row").trigger("click");

                                    }

                                    let count_len = $("#tab_logic tr").length - 3


                                    for (let i = (count_len == 0 ? count_len : count_len); i < (count_len == 0 ? count_len + m : (count_len + 1) + m); i++) {
                                        let head_one = $(".po")[i]
                                        let head_line = $(".line_num")[i]
                                        let head_company = $(".head_company")[i]
                                        let head_currency = $(".currency_head")[i]
                                        let head_status = $(".details_status")[i];
                                        let head_gate_id = $(".details_gate_id")[i];

                                        $(head_one).val(data.order_number)
                                        $(head_line).val(data.order_type)
                                        $(head_company).val(data.order_company)
                                        $(head_currency).val(data.currency_code)
                                        $(head_gate_id).val(data.amount)


                                    }

                                    let validate = $(".onee")[0]


                                    for (let i = 0; i < (count == 0 && $(validate).val() == "" ? data.po_details.length - 1 : data.po_details.length); i++)
                                    // for(let i = 0 ; i <     ; i++)
                                    {
                                        $("#add_roww").trigger("click");
                                    }


                                    // console.log($(validate).val() ==  "");

                                    // console.log(count == 0 ? count : (count + 1));


                                    for (let i = (count == 0 ? count : (count + 1)), j = 0; i < (count == 0 ? count + data.po_details.length : (count + 1) + data.po_details.length); i++, j++)
                                    // for(var i = 0 ; i < data.po_details.length ;  i++)
                                    {


                                        if ($(validate).val() != null && count == 0 && b == 0) {

                                            // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

                                            for (let s = 0; s < data.po_details.length; s++) {

                                                let one = $(".onee")[s + 1]
                                                let line = $(".line_numm")[s + 1]
                                                let item = $(".po_item")[s + 1]
                                                let status = $(".details_statuss")[s + 1];
                                                let gate_id = $(".currency")[s + 1];
                                                let next_status = $(".next_status")[s + 1];
                                                let last_status = $(".last_status")[s + 1]



                                                $(one).val(data.po_details[s].order_number)
                                                $(line).val(data.po_details[s].line_number)
                                                $(item).val(data.po_details[s].item_number)
                                                $(status).val(data.po_details[s].quantity_ordered)
                                                $(gate_id).val(data.po_details[s].currency_code)
                                                $(next_status).val(data.po_details[s].next_status);
                                                $(last_status).val(data.po_details[s].last_status);
                                            }

                                            break;
                                        }
                                        else {
                                            // console.log("i : " + i);
                                            let one = $(".onee")[i]
                                            let line = $(".line_numm")[i]
                                            let item = $(".po_item")[i]
                                            let status = $(".details_statuss")[i];
                                            let gate_id = $(".currency")[i];
                                            let next_status = $(".next_status")[i];
                                            let last_status = $(".last_status")[i]



                                            $(one).val(data.po_details[j].order_number)
                                            $(line).val(data.po_details[j].line_number)
                                            $(item).val(data.po_details[j].item_number)
                                            $(status).val(data.po_details[j].quantity_ordered)
                                            $(gate_id).val(data.po_details[j].currency_code)
                                            $(next_status).val(data.po_details[j].next_status);
                                            $(last_status).val(data.po_details[j].last_status);

                                        }

                                        b = data.po_details.length == 1 ? 1 : 2;


                                        // }
                                    }
                                    match = Purchase_order;
                                    arr.push(Purchase_order)
                                    overAllCurrency.push(data.currency_code)
                                }

                                else if (data.amount == 0) {

                                    const swalWithBootstrapButtons = Swal.mixin({
                                        customClass: {
                                            confirmButton: 'btn btn-sm btn-secondary mx-1',
                                            // cancelButton: 'btn btn-sm btn-danger mx-1'
                                        },
                                        buttonsStyling: false
                                    })

                                    swalWithBootstrapButtons.fire({
                                        // title: 'Are you sure?',
                                        title: `Amount is 0`,
                                        icon: 'warning',
                                        // showCancelButton: true,
                                        confirmButtonText: 'OK',
                                        // cancelButtonText: 'cancel!',
                                        reverseButtons: true
                                    })
                                }

                                else if (overAllCurrency.includes(data.currency_code) == false) {
                                    const swalWithBootstrapButtonss = Swal.mixin({
                                        customClass: {
                                            confirmButton: 'btn btn-sm btn-secondary mx-1',
                                            // cancelButton: 'btn btn-sm btn-danger mx-1'
                                        },
                                        buttonsStyling: false
                                    })

                                    swalWithBootstrapButtonss.fire({
                                        // title: 'Are you sure?',
                                        title: `The Currency is not same`,
                                        icon: 'warning',
                                        // showCancelButton: true,
                                        confirmButtonText: 'OK',
                                        // cancelButtonText: 'cancel!',
                                        reverseButtons: true
                                    })
                                }
                            },

                            error: function (xhr) {

                                console.log(xhr);

                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-sm btn-secondary mx-1',
                                        cancelButton: 'btn btn-sm btn-danger mx-1'
                                    },
                                    buttonsStyling: false
                                })

                                swalWithBootstrapButtons.fire({
                                    // title: 'Are you sure?',
                                    text: `${xhr.responseJSON.message.DREQ_PO_Header.Message}`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'cancel!',
                                    reverseButtons: true
                                })
                            }

                        })


                    }

                }

                else {
                    $(check).css("border", "1px solid #24537f")
                }
            }

        })







        var grn_head = [];
        var reciept_details = [];
        var po_check = [];
        var reciept_no = []

        var details = [];


        var company_code;
        var doc_company;
        var business_unit;
        var state;
        var invoice_number;
        var invoice_date;
        var invoice_type;
        var currency_code;
        var supplier_gstin;
        var tds_code;
        var vendor_code;
        var vendorname;
        var physical_doc;
        var source;
        var amount;
        var GL_date;

        var sessionString = sessionStorage.getItem('gateid')
        var Gate_no = JSON.parse(sessionString);
        console.log(object.id);

        $("#create_grn").click(() => {

            $("#loader").addClass("sk-loading")
            let tab_head_len = $("#tab_logic tr").length - 3
            let tab_details_len = $("#tab_logicc tr").length - 2


            function checked() {
                for (let j = 0; j <= tab_details_len; j++) {
                    let details_po = $(".onee")[j]

                    if (po_check[0] == $(details_po).val()) {

                        let line = $(".line_numm")[j]
                        let statuss = $(".details_statuss")[j];
                        // let hsn_code = $(".amount")[j];

                        let line_number = $(line).val();
                        let quantity = $(statuss).val();
                        let amount = 55555;
                        let status = 300;
                        let item_code = 5656;
                        let hsn_code = 123456;
                        let uom = "AC";
                        let rate = 98765;
                        let gate_number = $("#gate_number").html()


                        reciept_details.push({ line_number, status, gate_number, item_code, hsn_code, quantity, uom, rate, amount })
                    }

                }

                //   console.log(po_check);

                po_check = []
            }



            for (i = 0; i <= tab_head_len; i++) {
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
                checked();

                let business_unit = 101;





                let reciept_number;
                let vendorname = "QWERTY"

                let gate_number = $("#gate_number").html()






                grn_head.push({ vehicle_nbr, material_type, vendorname, weight, division, remark, in_time, gate_number, po_number, po_type, business_unit, reciept_details })

                details.push({ po_number, po_type, company_code, currency, total, amount })


            }

            // vendorname = "ravi"

            let gate_number = $("#gate_number").html()

            let status = { code: 200 }

            company_code = $("#company_code").val()
            doc_company = $("#doc_company").val()
            business_unit = $("#business_unit").val()
            state = $("#state").val()
            invoice_number = $("#invoice_no").val()
            invoice_date = $("#invoice_date").val()
            invoice_type = $("#invoice_type").val()
            currency_code = $("#curr_code").val()
            supplier_gstin = $("#supplier_gstin").val()
            tds_code = $("#tds_code").val()
            vendor_code = $("#vendor_code").val()
            vendorname = $("#vendor_name").val()
            physical_doc = $("#physical_doc_rec").val()
            source = $("#source").val()
            amount = $("#amount").val()
            GL_date = $("#gl_date").val()


            // company_code,doc_company,business_unit,state,invoice_no,invoice_date,invoice_type,currency_code,supplier_gstin,tds_code,vendor_code,vendor_name,physical_doc,source,amount,gl_date


            entity.push({ company_code, doc_company, business_unit, state, invoice_number, invoice_date, invoice_type, currency_code, supplier_gstin, tds_code, vendor_code, vendorname, physical_doc, source, amount, GL_date, gate_number, vendorname, vehicle_nbr, material_type, weight, in_time, division, remark, status, details })

            // console.log(grn_head);

            // })

            var d = 2;

            for (let k = 0; k < grn_head.length; k++) {

                // console.log("inside grn loop : " + k);

                $.ajax({
                    url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_GRN`,
                    type: 'POST',
                    data: JSON.stringify(grn_head[k]),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                    },

                    success: function (data) {


                        console.log(data.receipt_document);
                        console.log(details[k]);
                        let receipt_number = data.receipt_document;
                        details[k].receipt_number = data.receipt_document;

                        reciept_no.push(receipt_number)
                        console.log(details);

                        // $.audit("GAURAV", "JDV920", "http://103.65.20.159:8081/jderest/v3/orchestrator/ORCH_GRN", JSON.stringify(grn_head[k]), "success", "P")

                        $.ajax({
                            url: `${[login[0].url]}/jderest/v2/dataservice/table/F43121?$field=F43121.DOC&$field=F43121.DCT&$field=F43121.UREC&$field=F43121.AOPN&$field=F43121.DOCO&$field=F43121.LITM&$filter=F43121.MATC%20EQ%201&$field=F43121.MCU&$filter=F43121.DOC%20EQ%20${data.receipt_document}`,
                            // type : 'POST',
                            // data : JSON.stringify(grn_head),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                            },

                            success: function (data) {

                                console.log(...entity);

                                $.ajax({
                                    url: `${[test[0].url]}/gate/put/${object.id}`,
                                    type: 'PUT',
                                    data: JSON.stringify(...entity),
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    success: (data, status, xhr) => {

                                        if (xhr.status == 200) {
                                            console.log(data);
                                            // alert("done")
                                        }
                                        else {

                                            // alert("error")
                                        }
                                    },
                                    error: (xhr) => {
                                        console.log(xhr);
                                        console.log("error component");
                                    }
                                })

                                $("#data_list").removeClass("invisible");
                                $("#data1").trigger("click")

                                // console.log(data);
                                // let grn_len = $("#grn_table tr").length - 2
                                let grn_rows = data.fs_DATABROWSE_F43121.data.gridData.rowset

                                let table_rows = $("#grn_table tr").length - 2;

                                let valid_data = $(".order_no")[0]

                                for (let j = 0; j < (table_rows == 0 && $(valid_data).val() == "" ? grn_rows.length - 1 : grn_rows.length); j++) {
                                    $("#grn_row").trigger("click");
                                }

                                for (let i = (table_rows == 0 ? table_rows : table_rows + 1), p = 0; i < (table_rows == 0 ? table_rows + grn_rows.length : (table_rows + 1) + grn_rows.length); i++, p++) {

                                    if ($(valid_data).val() != null && table_rows == 0 && d == 0) {

                                        // console.log(`inside if  ${data.po_details.length}   ${i+1}`);

                                        for (let s = 0; s < grn_rows.length; s++) {

                                            let order_no = $(".order_no")[s + 1]
                                            let item_no = $(".item_no")[s + 1]
                                            let business_unit_grn = $(".business_unit_grn")[s + 1]
                                            let document_no = $(".document_no")[s + 1]
                                            let do_ty = $(".do_ty")[s + 1]
                                            let quantity_recieved = $(".quantity_recieved")[s + 1]
                                            let amount_open = $(".amount_open")[s + 1]


                                            $(order_no).val(grn_rows[s].F43121_DOCO)
                                            $(item_no).val(grn_rows[s].F43121_LITM)
                                            $(business_unit_grn).val(grn_rows[s].F43121_MCU)
                                            $(document_no).val(grn_rows[s].F43121_DOC)
                                            $(do_ty).val(grn_rows[s].F43121_DCT)
                                            $(quantity_recieved).val(grn_rows[s].F43121_UREC)
                                            $(amount_open).val(grn_rows[s].F43121_AOPN)
                                        }

                                        break;
                                    }

                                    else {

                                        let order_no = $(".order_no")[i]
                                        let item_no = $(".item_no")[i]
                                        let business_unit_grn = $(".business_unit_grn")[i]
                                        let document_no = $(".document_no")[i]
                                        let do_ty = $(".do_ty")[i]
                                        let quantity_recieved = $(".quantity_recieved")[i]
                                        let amount_open = $(".amount_open")[i]


                                        $(order_no).val(grn_rows[p].F43121_DOCO)
                                        $(item_no).val(grn_rows[p].F43121_LITM)
                                        $(business_unit_grn).val(grn_rows[p].F43121_MCU)
                                        $(document_no).val(grn_rows[p].F43121_DOC)
                                        $(do_ty).val(grn_rows[p].F43121_DCT)
                                        $(quantity_recieved).val(grn_rows[p].F43121_UREC)
                                        $(amount_open).val(grn_rows[p].F43121_AOPN)

                                    }


                                    d = grn_rows.length == 1 ? 1 : 2;


                                }

                            },
                            complete: () => {

                                // if( k == grn_head.length - 1)
                                // {
                                // $("#data_list").removeClass("invisible")
                                $("#create_grn").addClass("invisible")
                                $("#reverse_grn").removeClass("invisible")
                                $("#col_hide").css("visibility", "collapse");
                                // }

                                // if( k == grn_head.length-1)
                                // {
                                $("#loader").removeClass("sk-loading")
                                // }
                            },
                            error: function (xhr) {
                                console.log(xhr);
                                // po_check = [];
                                // reciept_no = []

                                $("#loader").removeClass("sk-loading")


                            }

                        })

                    },

                    error: function (xhr) {

                        $("#loader").removeClass("sk-loading")
                        // $.audit("GAURAV", "JDV920", "http://103.65.20.159:8081/jderest/v3/orchestrator/ORCH_GRN", JSON.stringify(grn_head[k]), "error", "F")
                        grn_head = [];
                        reciept_details = [];

                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn btn-sm btn-secondary mx-1',
                                // cancelButton: 'btn btn-sm btn-danger mx-1'
                            },
                            buttonsStyling: false
                        })

                        swalWithBootstrapButtons.fire({
                            // title: 'Are you sure?',
                            text: `${xhr.responseJSON.jde__simpleMessage}`,
                            icon: 'warning',
                            // showCancelButton: true,
                            confirmButtonText: 'OK',
                            // cancelButtonText: 'cancel!',
                            reverseButtons: true
                        })

                    }

                })
            }
        })


        $("#reverse_grn").click(() => {

            $("#loader").addClass("sk-loading")

            let data = [];

            for (let i = 0; i < reciept_no.length; i++) {
                let document_number = reciept_no[i];
                let document_type = $("#purchase_type").val();
                let document_comapny = $("#company_code").val().split(" - ")[0];
                let supplier = $("#vendor_code").val();
                let P43214_version = "ZJDE0001";

                data.push({ document_number, document_type, document_comapny, supplier, P43214_version })
            }

            console.log(data);


            $.ajax({
                url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_AP_GRN_REV`,
                type: "POST",
                data: JSON.stringify({ data: data }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                },
                success: function (data) {

                    console.log(data);
                    $("#reverse_grn").addClass("invisible")
                    $("#create_grn").removeClass("invisible")
                    $("#col_hide").css("visibility", "visible");
                    $("#grn_table tbody").children().remove()
                    $("#grn_row").trigger("click");
                    $("#data").trigger("click")
                    $("#data_list").addClass("invisible")

                    entity[0].details = []
                    // entity[0].status = 


                    console.log(...entity);

                    $.ajax({
                        url: `${[test[0].url]}/gate/put/${object.id}`,
                        type: 'PUT',
                        data: JSON.stringify(...entity),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        success: (data, status, xhr) => {
                            console.log(data);

                            if (xhr.status == 200) {
                                // alert("success")
                            }
                            else {
                                // alert("fail")
                            }
                        },
                        error: function (xhr) {
                            console.log(xhr);
                            // alert("error")
                        }
                    })


                    data = [];

                },
                error: function (xhr) {
                    $("#loader").removeClass("sk-loading")
                    console.log(xhr);
                },
                complete: () => {

                    entity = [];

                    $("#loader").removeClass("sk-loading")


                }
            })



            grn_head = [];
            reciept_details = []
            reciept_no = [];
        })


        $("#submit_invoice").click((e) => {



            // entity.push(details)
            console.log(entity);
            e.preventDefault();

            // console.log(gate_number);

            if (reciept_no.length != 0) {

                // console.log(...entity);


                let sessionString = sessionStorage.getItem('gateid')
                let Gate_no = JSON.parse(sessionString);
                console.log(Gate_no);

                // console.log(gate_no);

                $.ajax({
                    type: "PUT",
                    url: `${[test[0].url]}/gate/put/${object.id}`,
                    data: JSON.stringify({
                        status: { code: 300 }
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    success: function (data, status, xhr) {
                        console.log(data);
                        if (xhr.status == 200) {
                            window.open(`../template/invoice.jsp`, '_self');
                        }
                        // alert(gate_no)
                        // let quality_code = 300;

                        // sessionString.setItem("quality" , JSON.stringify(quality_code));
                    },
                    error: function (xhr) {
                        console.log(xhr);
                        // alert(gate_no)
                    },
                });
            }
        }

        )



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
                    $(".upload-image").css("width", "1100px")
                    btn_panel.value = "Hide Invoice"
                }
            });
        })
    })


