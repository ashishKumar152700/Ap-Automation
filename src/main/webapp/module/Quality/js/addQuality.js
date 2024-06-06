$(document).ready(function () {

    const token = JSON.parse(localStorage.getItem("token"));
    let user_store = JSON.parse(localStorage.getItem("store"));


    var test = $.test();
    var login = $.login();
    let sessionString = sessionStorage.getItem('gateid')
    let gate_number = JSON.parse(sessionString);
    var checkstatus = $.checkstatus(gate_number, "ture")

    var check_inreview_quantity;

    let gateno = sessionStorage.getItem('gateno')
    let gate = JSON.parse(gateno);

    $(window).load(() => {
        $("#gate_number").html(gate)

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

    })

    user_store.map((value) => {

        $("#storeId").append(`<option value="${value}">${value}</option>`);

    })


    let rem_table = $("#remark_table").dataTable({
        dom: '<"top">Rt<"bottom"ilp>',
        ordering: false,
        ajax: {
            url: `${[test[0].url]}/remarks?gateNumber=${gate}`,
            dataSrc: "data",
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
        columnDefs: [

            { "className": "dt-body-left", "targets": "_all" }
        ],
        // ordering: true,
        // processing : true,
        lengthMenu: [5, 10, 20, 25, 50],
    })


    var obj
    var quality;
    var vendor;
    var po;

    var convertedFiles;

    var tab2;
    var tab3;

    var q;
    var disab;
    let new_obj = [];

    var document_nbr
    var total_qty_row

    let renderDataTable_new_obj = []

    var tab;

    let rows = $(".row_col tr").length

    // console.log(rows);

    var stored_data = [];

    // let tab_count = 0
    // let tab3_count = 0
    // let tab_count1 = 0
    // let tab3_count1 = 0

    var rowCount = 0

    var remove_Dtable=0

    let getdatabase_rowCount=0

    let remark_count_inreview = 1;
    let remark_count_reject = 1;
    let remark_count_both = 1;

    $(window).load(() => {

        let gate_id = $("#gate_number").html();

        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${[test[0].url]}/file/data?gate=${gate}`, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.response);
                var blob = xhr.response;
                var url = URL.createObjectURL(blob);

                // Set the desired file name and type
                var fileName = `${gate_id}.pdf`
                var fileType = blob.type; // You should use the appropriate MIME type

                // Create a File object from the Blob data
                convertedFiles = new File([blob], fileName, { type: fileType });
                var iframe = document.createElement('iframe');
                console.log("iframe    ", iframe);
                iframe.src = url;
                iframe.style.width = '100%';
                iframe.style.height = '100%'
                // Append the iframe to a container element

                var container = document.getElementById('pdf_receive');
                container.appendChild(iframe);
                // Clean up the temporary URL when the iframe is no longer needed
                iframe.onload = function () {
                    URL.revokeObjectURL(url);
                }
            } else {
                console.error('Request failed. Status: ' + xhr.status);
            }
        };

        recall()

        xhr.onerror = function (xhr) {
            if (xhr.status == 498) {
                $.tokenError();
            }
        };

        xhr.send();
    })

    function recall() {

        // alert("Shashi")
        $("#loader1").addClass("ibox-content")
        $("#loader1").addClass("sk-loading")
        $("#spin1").removeClass("d-none")
        $.ajax({
            type: 'GET',
            url: `${[test[0].url]}/gate/getAll?id=${gate_number}`,
            // async: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            success: function (data, status, xhr) {


                if (xhr.status == 200) {

                    obj = data.data[0]
                    console.log("data : ", data);
                    $("#company_code").val(data.data[0].company_code)
                    $("#business_unit").val(data.data[0].business_unit)
                    $("#state").val(data.data[0].state)
                    $("#invoice_no").val(data.data[0].invoice_number)
                    $("#invoice_type").val(data.data[0].invoice_type)
                    $("#Vendor_code").val(data.data[0].vendor_code)
                    $("#invoice_no").val(data.data[0].invoice_number)
                    $("#po_number").val(data.data[0].po_number)
                    $("#po_type").val(data.data[0].po_type)
                    $("#vendor_name").val(data.data[0].vendorname)
                    $("#invoice_date").val(data.data[0].invoice_date.split("-").reverse().join("-"))
                    $("#gl_date").val(data.data[0].gl_date.split("-").reverse().join("-"))

                    $("#storeId").val(data.data[0].storeId)

                    console.log("data.data[0].details.length",data.data[0].details.length);

                    // quality = data.data[0].details.map((value) => value.receipt_number);

                    const filteredObj = { ...obj }; // Create a shallow copy of the original object

                   
                    if(filteredObj.deliveryChallanNumber == null){
                        if (filteredObj.details && filteredObj.details.length > 0) {
                            // Filter details array to include only items with non-null location
                            filteredObj.details = filteredObj.details.filter(
                                (detail) => detail.location == "QLTLOCATN"
                                );
                            }
    
                        quality = filteredObj.details.map((value) => value.receipt_number);
                        console.log(filteredObj);
                    }else{
                        quality = filteredObj.details.map((value) => value.receipt_number);
                    }

                    let uniq_quality = Array.from(new Set(quality))
                    $("#document_nbr").val(uniq_quality)
                    vendor = data.data[0].vendor_code;
                    po = data.data[0].po_type;
                    console.log("vendor" + vendor);

                   

                    // Loop through all gate numbers and fetch/render data for each one
                    for (const receipt_number of quality) {
                        console.log(receipt_number);
                        fetchDataAndRenderDataTable(receipt_number);
                    }
                }
                else {

                    $.errorMessage(xhr.responseJSON.message);
                }



            },
            error: function (xhr) {
                if (xhr.status == 498) {
                    $.tokenError();
                }
                else if (xhr.status >= 400 && xhr.status < 500) {

                    $.errorMessage(xhr.responseJSON.message);
                }
                else {
                    $.errorMessage(xhr.responseJSON.error)
                }
            },
            complete: () => {
            }

        })

        // Function to fetch data for a specific gate number and render it in the DataTable
        function fetchDataAndRenderDataTable(receipt_number) {
            $.ajax({
                type: 'GET',
                url: `${test[0].url}/quality/get?receiptNumber=${receipt_number}&branchPlant=${obj.company_code}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                success: function (data, status, xhr) {

                    console.log("data.data", data.data);

                    if (data.data.length > 0) {
                        // There is data for this gateNumber, execute the process
                        for (let i = 0; i < data.data.length; i++) {
                            const value = data.data[i];

                            // Check if inreview_quantity is negative, and if so, make it positive
                            if (value.inreview_quantity < 0) {
                                value.inreview_quantity = value.inreview_quantity * (-1);
                                check_inreview_quantity = value.inreview_quantity;
                            }

                            // Set check_inreview_quantity to the current value
                            check_inreview_quantity = value.inreview_quantity;

                            // Render the DataTable for this value
                            renderDataTable(value);

                        }
                    } else {
                        // There is no data for this gateNumber
                        renderEmptyDataTable(receipt_number);

                    }
                },
                error: function (xhr) {
                    // Handle errors here
                }
            });
        }



        // Function to render the DataTable for a specific value
        function renderDataTable(value) {
            console.log(value.receipt_number);


            console.log(value);

            renderDataTable_new_obj.push(value);

            // Destroy the existing DataTable if it exists
            try {
                console.log("try");
                tab3.destroy();
            } catch (error) {
                // Handle the error if DataTable doesn't exist
            }
           

            tab3 = $("#Dtable1").DataTable({
                // data: renderDataTable_new_obj == 0 ? value : renderDataTable_new_obj,  //Assuming data.data contains the necessary array of objects
                data: renderDataTable_new_obj,  //Assuming data.data contains the necessary array of objects
                columns: [
                    { data: "id" },
                    { data: "item_code" },
                    { data: "work_order_number" },
                    { data: "work_order_type" },
                    { data: "receipt_number" },
                    { data: "document_number" },
                    { data: "description" },
                    // {
                    //     data: null, render: function (data, type, row) {
                    //         return description;
                    //     }
                    // },
                    { data: "received_quantity" },
                    {
                        data: "id", render: function (data, type, row, meta) {
                            return `
                    <div class="btn-group">
                      <div class="label label-primary">${row.accept_quantity} - Accepted</div>&nbsp;
                      <button type="button" class="label label-warning in_review attribute_remove_in_review${row.inreview_quantity}">${row.inreview_quantity} - In Review</button>
                      <button type="button" class="label label-warning attribute_remove${(row.total_quantity.toString().replace('.', ""))}">${row.total_quantity} - In Review</button>&nbsp;
                      <div class="label label-danger">${row.reject_quantity} - Rejected</div>&nbsp;
                      <button type="button" class="label view">View</button>
                    </div>
                    `;
                        }
                    },
                ],
                columnDefs: [
                    {
                        "defaultContent": "-",
                        "targets": "_all"
                    },
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: -2, targets: 7 }
                ],
                language: {
                    'paginate': {
                        'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                        'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                    }
                },
                dom: '<"top">t<"bottom"ilp>',
                ordering: true,
                lengthMenu: [5, 10, 20, 25, 50],
                pagingType: "simple_numbers",
                select: true,

                rowCallback: function (row, data, index) {
                    // var labelColor = ""; // This will store the color value based on the label value

                    console.log("rowCallback", data);

                    console.log(data.work_order_number);

                    //for dc case
                    if (data.accept_quantity > 0 || data.reject_quantity > 0 || data.inreview_quantity > 0) {
                        $(row).find(`.attribute_remove${(data.total_quantity.toString().replace('.', ""))}`).addClass("d-none")
                    }

                    // console.log("qwertyuioasdfghjkl",$(row).find(`.attribute_remove${data.total_quantity}`).addClass("action1"));

                    $(row).find(`.attribute_remove${(data.total_quantity.toString().replace('.', ""))}`).addClass("action1")

                    if (data.accept_quantity == 0 && data.reject_quantity == 0 && data.inreview_quantity == 0 && data.total_quantity > 0) {
                        // alert("hi")
                        $(row).find(".attribute_remove_in_review0").addClass("d-none")
                    }
                    // if(data.total_quantity>0){
                    // $(row).find(`.attribute_remove${data.total_quantity}`).siblings().filter(`.attribute_remove10`).addClass("d-none");
                    // }
                    // if (data.work_order_number == null) {
                    // } else {
                    //     $(row).find(`.attribute_remove${value.total_quantity}`).addClass("f4801_action1")
                    // }

                    if (data.inreview_quantity == 0) {
                        $(row).find(".attribute_remove_in_review0").attr("disabled", "disabled");
                    }



                    if (data.total_quantity <= 0) {
                        $(row).find(".attribute_remove0").addClass("d-none")
                    }


                }
                // Other DataTable configurations
            });

            tab3.column(0).visible(false);
            tab3.column(2).visible(false);
            tab3.column(3).visible(false);
            tab3.column(4).visible(false);
            tab3.column(5).visible(false);

            getdatabase_rowCount = tab3.rows().count();

            console.log("getdatabase_rowCount", getdatabase_rowCount);
            console.log("rowCount", rowCount);

            if(obj.details.length==getdatabase_rowCount){
                rowCount = 0
                $("#getjde").addClass("d-none")
            }


            if (getdatabase_rowCount > 0) {
                $("#getdatabase").removeClass("d-none");
            }

            $("#loader1").removeClass("ibox-content");
            $("#loader1").removeClass("sk-loading");
            $("#spin1").addClass("d-none");
            $("#getdatabase").removeClass("d-none");


        }



        // Function to render an empty DataTable for a specific gateNumber
        function renderEmptyDataTable(receipt_number) {

            console.log("renderEmptyDataTable", receipt_number);


            if (obj.deliveryChallanNumber != null) {

                // alert("12345")
                try {
                    tab.destroy();
                    stored_data = []
                } catch (error) {

                }
                $.ajax({
                    type: 'GET',
                    url: `${[login[0].url]}/jderest/v2/dataservice/table/F4801?$field=F4801.DOCO&$field=F4801.DCTO&$field=F4801.LITM&$filter=F4801.DOCO EQ ${obj.workOrderNumber}&$filter=F4801.DCTO EQ ${obj.division}&$field=F4801.DL01`,
                    headers: {
                        "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
                    },
                    success: function (data) {

                        console.log(data);
                        var Business = data.fs_DATABROWSE_F4801.data.gridData.rowset;
                        console.log(Business);

                        var F4801_DCTO, F4801_DL01, F4801_DOCO, F4801_LITM, F4801_QTY;

                        for (let j = 0; j < Business.length; j++) {

                            F4801_DCTO = Business[j].F4801_DCTO
                            F4801_DL01 = Business[j].F4801_DL01
                            F4801_DOCO = Business[j].F4801_DOCO
                            F4801_QTY = obj.details[j]?.actualRecievedQuantity
                            F4801_LITM = Business[j].F4801_LITM


                            stored_data.push({ F4801_DCTO, F4801_DL01, F4801_DOCO, F4801_QTY, F4801_LITM })
                        }

                        console.log("store : ", stored_data);

                    },



                    complete: () => {


                        console.log(stored_data);
                        console.log(obj);

                        // tab_count++

                        // console.log(obj.details[0].taxValue);
                        $("#getjde").removeClass("d-none")
                        tab = $("#Dtable").DataTable({
                            data: stored_data,
                            columns: [
                                { data: "" },
                                { data: "" },
                                { data: "F4801_DOCO" },
                                { data: "F4801_DCTO" },
                                { data: "" },
                                { data: "" },
                                { data: "F4801_DL01" },
                                { data: "F4801_QTY" },
                                { data: "" },
                                {
                                    data: "F43121", render: function (data, type, row, meta) {

                                        return `
                                <td><div class="btn-group">
                                    <input type="button" class='btn btn-outline-success btn-sm f4801_action' value="Accept / Reject" />
                                    </div>
                                <div class="btn-group">
                                    <input type="button" class='btn btn-outline-success btn-sm test d-none' value="Test Result" />
                                    </div>
                                    </td></tr>`
                                    }
                                },

                            ],
                            columnDefs: [
                                {
                                    "defaultContent": "-",
                                    "targets": "_all"
                                },
                                { responsivePriority: 1, targets: 0 },
                                { responsivePriority: -2, targets: 7 }
                            ],
                            language: {
                                'paginate': {
                                    'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                                    'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                                }
                            },
                            dom: '<"top">t<"bottom"ilp>',
                            ordering: true,
                            lengthMenu: [5, 10, 20, 25, 50],
                            pagingType: "simple_numbers",
                            select: true,
                        });
                        tab.column(0).visible(false);
                        tab.column(1).visible(false);
                        tab.column(4).visible(false);
                        tab.column(5).visible(false);
                        tab.column(8).visible(false);

                        rowCount = tab.rows().count();

                        if(rowCount == 1){
                           remove_Dtable++
                        }

                        $("#loader1").removeClass("ibox-content")
                        $("#loader1").removeClass("sk-loading")
                        $("#spin1").addClass("d-none")
                    }
                })
            } else {
                // tab_count1++
                // console.log($.fn.DataTable.isDataTable('#Dtable'));

                try {
                    tab.destroy();
                } catch (error) {

                }

                tab = $("#Dtable").DataTable({
                    data: new_obj.length == 0 ? obj.details : new_obj,
                    columns: [
                        { data: "receipt_number" },
                        { data: "" },
                        { data: "" },
                        { data: "" },
                        { data: "" },
                        { data: "" },
                        { data: "" },
                        { data: "actualRecievedQuantity" },
                        { data: "amount" },
                        {
                            data: "F43121", render: function (data, type, row, meta) {

                                return `
                                        <td><div class="btn-group">
                                            <input type="button" class='btn btn-outline-success btn-sm action' value="Accept / Reject" />
                                            </div>
                                            </td></tr>`
                            }
                        },
                        // <div class="btn-group">
                        //     <input type="button" class='btn btn-outline-success btn-sm test' value="Test Result" />
                        //     </div>

                    ],
                    columnDefs: [
                        {
                            "defaultContent": "-",
                            "targets": "_all"
                        },
                        { responsivePriority: 1, targets: 0 },
                        { responsivePriority: -2, targets: 7 }
                    ],
                    language: {
                        'paginate': {
                            'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                            'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                        }
                    },
                    dom: '<"top">t<"bottom"ilp>',
                    ordering: true,
                    lengthMenu: [5, 10, 20, 25, 50],
                    pagingType: "simple_numbers",
                    select: true,
                });
                tab.column(1).visible(false);
                tab.column(2).visible(false);
                tab.column(3).visible(false);
                tab.column(4).visible(false);
                tab.column(5).visible(false);
                tab.column(6).visible(false);

                console.log(obj.details);
                // console.log(receipt_number);
                var counter;

                if (counter == undefined) {
                    tab.clear().draw();
                }


                if (true) {
                    new_obj.push(...obj.details.filter(detail => detail.receipt_number == receipt_number));
                    counter++
                }


                // Now obj.details contains the filtered data without the specified receipt_number
                console.log(new_obj);

                // Clear the existing data from the DataTable


                // Update the DataTable with the filtered data
                tab.rows.add(new_obj).draw();

                rowCount = tab.rows().count();


                if (rowCount > 0) {
                    console.log("rowCount    ", rowCount);
                    $("#getjde").removeClass("d-none")
                }

                // console.log("rowCount", rowCount);


                // // Assuming 'stored_data' contains your main data
                // const detailsData = obj.details;

                // console.log(detailsData);

                // Redraw the DataTable to show the added rows
                tab.draw();
                $("#loader1").removeClass("ibox-content")
                $("#loader1").removeClass("sk-loading")
                $("#spin1").addClass("d-none")

                // Additional DataTable customization and logic can go here for the empty table
            }
            console.log("123456789987654  new_obj",new_obj);
        console.log("qwertyuioasdfghj  renderDataTable_new_obj",renderDataTable_new_obj);
        }

        

    }

    let hide = document.querySelector("#hide")
    let btn_panel = document.querySelector("#btn_panel")
    $(document).ready(() => {
        $(".image-minimalize").click(function () {
            $("#hide").toggle("hide");

            if (hide.classList.toggle("hide")) {
                $(".upload-image").css("width", "auto")
                $("#hide").removeClass("d-none")
                btn_panel.value = "Show Invoice"
            }
            else {
                $(".upload-image").css("width", "900px")
                btn_panel.value = "Hide Invoice"
            }
        });
    })


    $("#Dtable").on("click", ".test", function () {
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data();
        window.open("../template/qualityTest.jsp", "_self")

    });

    $("#Dtable").on("click", ".f4801_action", function () {
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data();
        console.log(row);
        console.log("f4801_action", obj);
        $('#myModal5').modal('show');
        $("#F43121_LITM").val(row.F4801_LITM).css("font-weight", "bold");
        $("#F43121_MCU").val(obj.business_unit.split(" ").join("")).css("font-weight", "bold");
        $("#Description").val(row.F4801_DL01).css("font-weight", "bold");
        $("#F43121_UREC").val(row.F4801_QTY).css("font-weight", "bold");
        // $("#F43121_DSC1").val(row.F43121_DSC1).css("font-weight", "bold");
        $("#modal_vendor_code").val(obj.vendor_code).css("font-weight", "bold");
        $("#modal_po_nbr").val(obj.po_number).css("font-weight", "bold");
        $("#modal_vendor_name").val(obj.vendorname).css("font-weight", "bold");
        $("#modal_po_type").val(obj.po_type).css("font-weight", "bold");
        $("#modal_invoice_nbr").val(obj.invoice_number).css("font-weight", "bold");
        $("#modal_invoice_date").val(obj.invoice_date).css("font-weight", "bold");
        $("#modal_line_number").val(row.F43121_LNID).css("font-weight", "bold");
        $("#modal_company_code").val(row.F43121_KCOO).css("font-weight", "bold");
        $("#deliveryChallanNumber").val(obj.deliveryChallanNumber).css("font-weight", "bold");
        $("#work_order_number").val(row.F4801_DOCO).css("font-weight", "bold");
        $("#work_order_type").val(row.F4801_DCTO).css("font-weight", "bold");

        console.log("workOrderNumber  ", obj.workOrderNumber);

        quality = obj.details.map((value) => value.receipt_number);
        $("#modal_document_nbr").val(quality[0]).css("font-weight", "bold");

        document_nbr= $("#modal_document_nbr").val()+"OV-"


        disab = this;
        q = row.F4801_QTY;

        // console.log(q);

    });
    $("#myModal5").on('hide.bs.modal', function () {
        $("#message").addClass("d-none")
        $(".validate").css("border", "1px solid #e5e6e7")
    })

    $("#Dtable1").on("click", ".f4801_action1", function () {
        var raw = $(this).closest("tr").children();
        // alert("asdfghj")
        var row = tab3.row(raw).data();
        console.log(row);
        $("#first_in_review_remark_note").val().length == 0
        $("#first_inreview_remark").addClass("d-none")
        $('#myModal5').modal('show');
        $("#F43121_LITM").val(row.item_code).css("font-weight", "bold");
        $("#F43121_MCU").val(obj.business_unit.split(" ").join("")).css("font-weight", "bold");
        // $("#F43121_DOC").val(row.F43121_DOC).css("font-weight", "bold");
        $("#F43121_UREC").val(row.received_quantity).css("font-weight", "bold");
        $("#F43121_DSC1").val(row.F43121_DSC1).css("font-weight", "bold");
        $("#modal_vendor_code").val(obj.vendor_code).css("font-weight", "bold");
        $("#modal_po_nbr").val(obj.po_number).css("font-weight", "bold");
        $("#modal_vendor_name").val(obj.vendorname).css("font-weight", "bold");
        $("#modal_po_type").val(obj.po_type).css("font-weight", "bold");
        $("#modal_invoice_nbr").val(obj.invoice_number).css("font-weight", "bold");
        $("#modal_invoice_date").val(obj.invoice_date).css("font-weight", "bold");
        $("#modal_line_number").val(row.F43121_LNID).css("font-weight", "bold");
        $("#modal_company_code").val(row.F43121_KCOO).css("font-weight", "bold");
        $("#Description").val(obj.details[0].description1).css("font-weight", "bold");
        $("#deliveryChallanNumber_none").addClass("d-none");

        quality = obj.details.map((value) => value.receipt_number);
        $("#modal_document_nbr").val(quality[0]).css("font-weight", "bold");

        document_nbr= $("#modal_document_nbr").val()+"OV-"


        disab = this;
        q = row.received_quantity;

    });
    $("#myModal5").on('hide.bs.modal', function () {
        $("#message").addClass("d-none")
        $(".validate").css("border", "1px solid #e5e6e7")
    })




    $("#Dtable1").on("click", ".action1", function () {
        var raw = $(this).closest("tr").children();
        // alert("asdfghj")
        var row = tab3.row(raw).data();
        console.log(row);
        $("#first_in_review_remark_note").val().length == 0
        $("#first_inreview_remark").addClass("d-none")
        $('#myModal5').modal('show');
        $("#F43121_LITM").val(row.item_code).css("font-weight", "bold");
        // $("#F43121_MCU").val(obj.business_unit.split(" ").join("")).css("font-weight", "bold");
        $("#F43121_MCU").val(obj.company_code).css("font-weight", "bold");
        // $("#F43121_DOC").val(row.F43121_DOC).css("font-weight", "bold");
        $("#F43121_UREC").val(row.received_quantity).css("font-weight", "bold");
        $("#F43121_DSC1").val(row.F43121_DSC1).css("font-weight", "bold");
        $("#modal_vendor_code").val(obj.vendor_code).css("font-weight", "bold");
        $("#modal_po_nbr").val(obj.po_number).css("font-weight", "bold");
        $("#modal_vendor_name").val(obj.vendorname).css("font-weight", "bold");
        $("#modal_po_type").val(obj.po_type).css("font-weight", "bold");
        $("#modal_invoice_nbr").val(obj.invoice_number).css("font-weight", "bold");
        $("#modal_invoice_date").val(obj.invoice_date).css("font-weight", "bold");
        $("#modal_line_number").val(row.F43121_LNID).css("font-weight", "bold");
        $("#modal_company_code").val(row.F43121_KCOO).css("font-weight", "bold");
        $("#Description").val(row.description).css("font-weight", "bold");

        if (obj.deliveryChallanNumber != null) {
            $("#deliveryChallanNumber").val(obj.deliveryChallanNumber).css("font-weight", "bold");
        } else {
            $("#deliveryChallanNumber_none").addClass("d-none");
        }

        // quality = obj.details.map((value) => value.receipt_number);
        $("#modal_document_nbr").val(row.receipt_number).css("font-weight", "bold");

        document_nbr= row.receipt_number+"OV-"

        total_qty_row=row.total_quantity


        disab = this;
        q = row.received_quantity;

        console.log("qqqqqqqqqqqqqqq", q);

    });
    $("#myModal5").on('hide.bs.modal', function () {
        // location.reload()
        $("#message").addClass("d-none")
        $(".validate").css("border", "1px solid #e5e6e7")
    })


    // let action_row_count = 0
    $("#Dtable").on("click", ".action", function () {
        var raw = $(this).closest("tr").children();
        var row = tab.row(raw).data();
        console.log("action", row);
        // action_row_count++
        // console.log(action_row_count);
        // console.log("Number of rows in DataTable:", rowCount);
        $('#myModal5').modal('show');
        $("#F43121_LITM").val(row.jdeItemCode).css("font-weight", "bold");
        $("#F43121_MCU").val(obj.company_code).css("font-weight", "bold");
        // $("#F43121_DOC").val(row.F43121_DOC).css("font-weight", "bold");
        $("#F43121_UREC").val(row.actualRecievedQuantity).css("font-weight", "bold");
        $("#F43121_DSC1").val(row.description1).css("font-weight", "bold");
        $("#modal_vendor_code").val(obj.vendor_code).css("font-weight", "bold");
        $("#modal_po_nbr").val(obj.po_number).css("font-weight", "bold");
        $("#modal_vendor_name").val(obj.vendorname).css("font-weight", "bold");
        $("#modal_po_type").val(obj.po_type).css("font-weight", "bold");
        $("#modal_invoice_nbr").val(obj.invoice_number).css("font-weight", "bold");
        $("#modal_invoice_date").val(obj.invoice_date).css("font-weight", "bold");
        $("#modal_line_number").val(row.F43121_LNID).css("font-weight", "bold");
        $("#modal_company_code").val(row.F43121_KCOO).css("font-weight", "bold");
        $("#Description").val(row.description1).css("font-weight", "bold");
        $("#deliveryChallanNumber_none").addClass("d-none");

        quality = obj.details.map((value) => value.receipt_number);
        // $("#modal_document_nbr").val(quality[0]).css("font-weight", "bold");
        $("#modal_document_nbr").val(row.receipt_number).css("font-weight", "bold");

        document_nbr= row.receipt_number+"OV-"

        console.log(document_nbr);

        disab = this;
        q = row.actualRecievedQuantity;

    });
    $("#myModal5").on('hide.bs.modal', function () {
        // location.reload()
        try {
            $("#both_remark").addClass("d-none");
            $("#first_reject_remark").addClass("d-none");
            $("#first_inreview_remark").addClass("d-none");
            $("#first_in_review_remark_note").val("")
            $("#first_reject_remark_note").val("")
            $("#first_reject_remark_note").val("")
            $("#first_in_review_remark_note").val("")
            $("#first_reject_remark_note1").val("")
            $("#first_in_review_remark_note1").val("")
            $("#accept").val("")
            $("#reject").val("")
            $("#in_review").val("")

            remark_count_inreview = 1;
            remark_count_reject = 1;
            remark_count_both = 1;
        } catch {

        }
        $("#message").addClass("d-none")
        $(".validate").css("border", "1px solid #e5e6e7")
    })

    let second_remark_count = 1

    $("#in_review_qa_submit").click((e) => {


        console.log("quality[0]", quality[0]);

        var accept = Number($("#accept1").val())
        var reject = Number($("#reject1").val())

        let total = (+accept) + (+reject);

        async function sendPayload(payload) {
            return new Promise((resolve, reject) => {
                var modal_vendor_name = $("#modal_vendor_name2").val()
                var modal_po_nbr = $("#modal_po_nbr2").val()
                var modal_document_nbr = $("#modal_document_nbr2").val()
                var branch_number = $("#F43121_MCU2").val()
                var item_number = $("#F43121_LITM2").val();
                var modal_vendor_code = $("#modal_vendor_code2").val()
                var modal_po_type = $("#modal_po_type2").val()
                var modal_type = $("#modal_type2").val()
                // var purchase_order = $("#F43121_DOC2").val()
                var receivedQuantity = $("#F43121_UREC2").val()
                var accept_qty = $("#accept1").val()
                var reject_qty = $("#reject1").val()
                // var review_qty = $("#in_review").val()
                var modal_invoice_nbr = $("#modal_invoice_nbr2").val();
                var modal_invoice_date = $("#modal_invoice_date2").val();
                var modal_line_number = $("#modal_line_number2").val();
                var modal_company_code = $("#modal_company_code2").val();
                var Description = $("#Description2").val();
                var work_order_number = $("#work_order_number2").val()
                var work_order_type = $("#work_order_type2").val()
                var open_review_quantity = $("#open_quanity2").val()

                var accept_sum = Number(accept_qty);
                var reject_sum = Number(reject_qty);

                var reject_remark

                if ($("#second_reject_remark_note").val().length != 0) {
                    reject_remark = $("#second_reject_remark_note").val()
                }

                // console.log({
                //     po_type: modal_po_type,
                //     po_number: modal_po_nbr,
                //     receiptNumber: ("#modal_document_nbr2").val(),
                //     receipt_type: modal_type,
                //     item_code: ("#F43121_LITM2").val(),
                //     branch_plant: obj.company_code,
                //     received_quantity: receivedQuantity,
                //     accept_quantity: accept_sum,
                //     reject_quantity: reject_sum,
                //     // inreview_quantity: review_qty_db,
                //     vendor_code: modal_vendor_code,
                //     vendor_name: modal_vendor_name,
                //     vendor_invoice_number: modal_invoice_nbr,
                //     vendor_invoice_date: modal_invoice_date,
                //     po_company_code: modal_company_code,
                //     line_number: modal_line_number,
                //     batch_number: data.batch_number,
                //     document_type: data.document_type,
                //     document_number: data.document_number,
                //     description: $("#Description2").val(),
                //     work_order_type: obj.work_order_type,
                //     work_order_number: obj.workOrderNumber,
                //     gateNumber: obj.gate_number,
                //     remark: reject_remark,
                //     from_location: "QLTLOCATN",
                //     // to_location: to_location
                // });

                $.ajax({
                    url: `${login[0].url}/jderest/v3/orchestrator/ORCH_AP_Inventory_Transfer`,
                    type: 'POST',
                    data: JSON.stringify(payload),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Basic " + btoa(`${login[0].username}:${login[0].password}`)
                    },
                    success: function (data, status, xhr) {
                        if (data.document_number > 0) {

                            let review_qty_db = 0

                            let to_location

                            if (open_review_quantity > 0 && accept_sum > 0 && reject_sum == 0) {
                                review_qty_db = open_review_quantity * -1
                                reject_sum = 0
                                to_location = "PRILOCATN"
                                reject_remark = null
                            }

                            if (open_review_quantity > 0 && accept_sum == 0 && reject_sum > 0) {
                                review_qty_db = open_review_quantity * -1
                                accept_sum = 0
                                to_location = "REJLOCATN"
                            }

                            if (open_review_quantity > 0 && accept_sum > 0 && reject_sum > 0 && data.document_type == 'IT') {
                                review_qty_db = open_review_quantity * -1
                                reject_sum = 0
                                reject_remark = null
                                to_location = "PRILOCATN"
                            }

                            if (open_review_quantity > 0 && accept_sum > 0 && reject_sum > 0 && data.document_type == 'IR') {
                                review_qty_db = 0
                                accept_sum = 0
                                to_location = "REJLOCATN"
                            }



                            $.ajax({
                                type: "POST",
                                url: `${[test[0].url]}/quality/add`,
                                async: false,
                                data: JSON.stringify({
                                    po_type: modal_po_type,
                                    po_number: modal_po_nbr,
                                    receiptNumber: $("#modal_document_nbr2").val(),
                                    receipt_type: modal_type,
                                    item_code: $("#F43121_LITM2").val(),
                                    branch_plant: obj.company_code,
                                    received_quantity: +receivedQuantity,
                                    accept_quantity: accept_sum,
                                    reject_quantity: reject_sum,
                                    inreview_quantity: review_qty_db,
                                    vendor_code: modal_vendor_code,
                                    vendor_name: modal_vendor_name,
                                    vendor_invoice_number: modal_invoice_nbr,
                                    vendor_invoice_date: modal_invoice_date,
                                    po_company_code: modal_company_code,
                                    line_number: modal_line_number,
                                    batch_number: data.batch_number,
                                    document_type: data.document_type,
                                    document_number: data.document_number,
                                    description: $("#Description2").val(),
                                    work_order_type: obj.work_order_type,
                                    work_order_number: obj.workOrderNumber,
                                    gateNumber: obj.gate_number,
                                    remark: reject_remark,
                                    from_location: "QLTLOCATN",
                                    to_location: to_location
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + token,
                                },
                                success: function (data, status, xhr) {
                                    // resolve(data);
                                    console.log(data.data);
                                },
                                error: function (xhr) {
                                    $("#loader12").removeClass("ibox-content")
                                    $("#loader12").removeClass("sk-loading")
                                    $("#spin12").addClass("d-none")
                                    if (xhr.status == 498) {
                                        $.tokenError();
                                    }
                                    else if (xhr.status >= 400 && xhr.status < 500) {

                                        $.errorMessage(xhr.responseJSON.message);
                                    }
                                    else {
                                        $.errorMessage(xhr.responseJSON.error)
                                    }
                                }
                            });
                        } else {
                            swal("", data.jde__simpleMessage, "error").then(() => {
                                $("#message1").addClass("d-none")
                                $("#loader12").removeClass("ibox-content")
                                $("#loader12").removeClass("sk-loading")
                                $("#spin12").addClass("d-none")
                                formReset1();
                                // resolve(data);
                            })
                        }
                        resolve(data);
                    },
                    error: function (xhr) {
                        reject(xhr);
                    }
                });
            });
        }

        async function datasend1(flag,reject_remark) {

            $("#loader12").addClass("ibox-content")
            $("#loader12").addClass("sk-loading")
            $("#spin12").removeClass("d-none")

            var accept_qty = $("#accept1").val()
            var reject_qty = $("#reject1").val()

            var accept_sum = Number(accept_qty);
            var reject_sum = Number(reject_qty);

            var itemNumber = $("#F43121_LITM2").val();

            var payloads = [];

            if (accept_sum > 0) {
                payloads.push({
                    from_branch_plant: "20100",
                    to_branch_plant: "20100",
                    grid_data: [
                        {
                            item_number: itemNumber,
                            quantity: accept_qty,
                            from_location: "QLTLOCATN",
                            to_location: "PRILOCATN"
                        }
                    ],
                    P4113_Version: "IAL000001",
                    remark:document_nbr
                });
            }
            if (reject_sum > 0) {
                payloads.push({
                    from_branch_plant: "20100",
                    to_branch_plant: "20100",
                    grid_data: [
                        {
                            item_number: itemNumber,
                            quantity: reject_qty,
                            from_location: "QLTLOCATN",
                            to_location: "REJLOCATN"
                        }
                    ],
                    P4113_Version: "IAL000002",
                    remark:document_nbr+reject_remark
                });
            }

            for (var i = 0; i < payloads.length; i++) {
                try {
                    console.log(payloads[i]);
                    let final_solution = await sendPayload(payloads[i]);
                    console.log(final_solution);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
            return flag;
        }

        function formReset1() {
            $("#accept1").val("")
            $("#reject1").val("")
            // $("#in_review").val("")
        }

        let reject_remark;

        if (reject == q && accept == 0) {
            $("#second_reject_remark").removeClass("d-none")
            if ($("#second_reject_remark_note").val().length != 0) {
                if ($("#second_reject_remark_note").val().length <= 19) {
                    reject_remark=$("#second_reject_remark_note").val()
                    let flag = 1;
                    datasend1(flag,reject_remark).then((value) => {
                        console.log(flag);
                        console.log(value);
                        if (value == 1) {
    
                            // location.reload()
                            try {
                                new_obj = []
                                renderDataTable_new_obj = []
                                // second_remark_count=1
                                // $("#second_reject_remark").addClass("d-none")
                                // $("#second_reject_remark_note").val("")
                            } catch {
    
                            }
                            recall()
                            $("#loader12").removeClass("ibox-content")
                            $("#loader12").removeClass("sk-loading")
                            $("#spin12").addClass("d-none")
                            $("#myModal7").modal('hide');
                        }
                        formReset1();
                        $("#loader12").removeClass("ibox-content")
                        $("#loader12").removeClass("sk-loading")
                        $("#spin12").addClass("d-none")
                    });
                }else{
                    $.errorMessage("Remark is less then 19 character")
                }
            } else {
                if (second_remark_count > 1) {
                    // $("#second_message_remark").removeClass("d-none")
                    $.errorMessage("Please Add Remark")
                } else {
                    second_remark_count++;
                    console.log(second_remark_count);
                }
            }
        } else if (reject == 0 && accept == q) {
            $("#second_reject_remark_note").val("")
            // alert("Hi")
            let flag = 1;
            datasend1(flag).then((value) => {
                if (value == 1) {
                    try {
                        new_obj = []
                        renderDataTable_new_obj = []
                    } catch {

                    }
                    recall()
                    // location.reload()
                    $("#loader12").removeClass("ibox-content")
                    $("#loader12").removeClass("sk-loading")
                    $("#spin12").addClass("d-none")
                    $("#myModal7").modal('hide');
                }
                formReset1();
                $("#loader12").removeClass("ibox-content")
                $("#loader12").removeClass("sk-loading")
                $("#spin12").addClass("d-none")
            });
        } else if (total == q) {
            $("#second_reject_remark").removeClass("d-none")
            if ($("#second_reject_remark_note").val().length != 0) {
                if ($("#second_reject_remark_note").val().length <= 19 ) {
                    reject_remark=$("#second_reject_remark_note").val()
                    let flag = 1;
                    datasend1(flag).then((value) => {
                        if (value == 1) {
                            try {
                                new_obj = []
                                renderDataTable_new_obj = []
                            } catch {
    
                            }
                            recall()
                            // location.reload()
                            $("#loader12").removeClass("ibox-content")
                            $("#loader12").removeClass("sk-loading")
                            $("#spin12").addClass("d-none")
                            $("#myModal7").modal('hide');
                        }
                        formReset1();
                        $("#loader12").removeClass("ibox-content")
                        $("#loader12").removeClass("sk-loading")
                        $("#spin12").addClass("d-none")
                    });
                }else{
                    $.errorMessage("Remark is less then 19 character")
                }
            } else {
                if (second_remark_count > 1) {
                    // $("#second_message_remark").removeClass("d-none")
                    $.errorMessage("Please Add Remark")
                } else {
                    second_remark_count++;
                    console.log(second_remark_count);
                }
            }
        } else {
            let len = $(".validate").length;
            for (let i = 0; i < len; i++) {
                let val = $(".validate")[i];
                if ($(val).val() != "") {
                    $(val).css("border", "1px solid #e5e6e7");
                    if (i == $(".validate").length - 1) {
                        if (total >= q || total < q) {
                            $("#message1").removeClass("d-none");
                            $(".validate").css("border", "1px solid #24537f");
                            formReset1();
                        } else {
                            let close = $(".close")[1];
                            formReset1();
                        }
                    }
                } else {
                    $("#message1").removeClass("d-none");
                    $(val).css("border", "1px solid #24537f");
                    formReset1();
                }
            }
        }

    });




    $("#qa_submit").click((e) => {

        var accept = $("#accept").val()
        var reject = $("#reject").val()
        var in_review = $("#in_review").val()

        var inReview = Number(in_review)

        var open_review_quantity = Number(in_review)

        var store_accept = 0;
        var store_rject = 0;
        var store_inreview = 0;

        store_accept = store_accept + (+accept)
        store_rject = store_rject + (+reject)

        console.log(store_rject);

        let total = (+accept) + (+reject) + (+in_review);

        async function sendPayload(payload) {
            return new Promise((resolve, reject) => {

                console.log(payload);
                var modal_vendor_name = $("#modal_vendor_name").val()
                var modal_po_nbr = $("#modal_po_nbr").val()
                var modal_document_nbr = $("#modal_document_nbr").val()
                var branch_number = $("#F43121_MCU").val()
                var item_number = $("#F43121_LITM").val();
                var modal_vendor_code = $("#modal_vendor_code").val()
                var modal_po_type = $("#modal_po_type").val()
                var modal_type = $("#modal_type").val()
                var purchase_order = $("#F43121_DOC").val()
                var receivedQuantity = $("#F43121_UREC").val()
                var accept_qty = $("#accept").val()
                var reject_qty = $("#reject").val()
                var review_qty = $("#in_review").val()
                var modal_invoice_nbr = $("#modal_invoice_nbr").val();
                var modal_invoice_date = $("#modal_invoice_date").val();
                var modal_line_number = $("#modal_line_number").val();
                var modal_company_code = $("#F43121_MCU").val();
                var Description = $("#Description").val();
                var work_order_number = $("#work_order_number").val()
                var work_order_type = $("#work_order_type").val()

                var final_reject_remark
                var final_inReview_remark
                var final_remark

                if ($("#first_in_review_remark_note").val().length != 0) {
                    final_inReview_remark = $("#first_in_review_remark_note").val()
                    
                }

                if ($("#first_in_review_remark_note1").val().length != 0) {
                    final_inReview_remark = $("#first_in_review_remark_note1").val()
                }

                if ($("#first_reject_remark_note").val().length != 0) {
                    final_reject_remark = $("#first_reject_remark_note").val()
                    
                }
                if ($("#first_reject_remark_note1").val().length != 0) {
                    final_reject_remark = $("#first_reject_remark_note1").val()
                }

                var accept_sum = Number(accept_qty);
                var reject_sum = Number(reject_qty);

                $.ajax({
                    url: `${login[0].url}/jderest/v3/orchestrator/ORCH_AP_Inventory_Transfer`,
                    type: 'POST',
                    data: JSON.stringify(payload),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Basic " + btoa(`${login[0].username}:${login[0].password}`)
                    },
                    success: function (data, status, xhr) {
                        if (data.document_number > 0) {

                            let review_qty_db = 0

                            let to_location

                            if (data.document_type == 'IT') {
                                review_qty_db = review_qty
                                reject_sum = 0
                                to_location = "PRILOCATN"
                                // final_reject_remark=null
                                final_remark = final_inReview_remark
                            }
                            if (data.document_type == 'IR') {
                                review_qty_db = 0
                                accept_sum = 0
                                to_location = 'REJLOCATN'
                                // final_inReview_remark=null;
                                final_remark = final_reject_remark
                            }

                            if (open_review_quantity > 0 && accept_sum > 0 && reject_sum == 0) {
                                review_qty_db = open_review_quantity
                                reject_sum = 0
                                to_location = "PRILOCATN"
                                // final_reject_remark=null
                                final_remark = final_inReview_remark
                            }

                            if (open_review_quantity > 0 && accept_sum == 0 && reject_sum > 0) {
                                review_qty_db = open_review_quantity * 0
                                accept_sum = 0
                                to_location = 'REJLOCATN'
                                // final_inReview_remark=null;
                                final_remark = final_reject_remark
                            }

                            if (open_review_quantity > 0 && accept_sum > 0 && reject_sum > 0 && data.document_type == 'IT') {
                                review_qty_db = open_review_quantity
                                accept_sum = 0
                                to_location = "PRILOCATN"
                                // final_reject_remark=null
                                final_remark = final_inReview_remark
                            }

                            $.ajax({
                                type: "POST",
                                url: `${[test[0].url]}/quality/add`,
                                async: false,
                                data: JSON.stringify({
                                    po_type: modal_po_type,
                                    po_number: modal_po_nbr,
                                    receiptNumber: $("#modal_document_nbr").val(),
                                    receipt_type: modal_type,
                                    item_code: item_number,
                                    branch_plant: obj.company_code,
                                    received_quantity: +receivedQuantity,
                                    accept_quantity: accept_sum,
                                    reject_quantity: reject_sum,
                                    inreview_quantity: review_qty_db,
                                    vendor_code: modal_vendor_code,
                                    vendor_name: modal_vendor_name,
                                    vendor_invoice_number: modal_invoice_nbr,
                                    vendor_invoice_date: modal_invoice_date,
                                    po_company_code: modal_company_code,
                                    line_number: modal_line_number,
                                    batch_number: data.batch_number,
                                    document_type: data.document_type,
                                    document_number: data.document_number,
                                    description: $("#Description").val(),
                                    work_order_type: obj.work_order_type,
                                    work_order_number: obj.workOrderNumber,
                                    gateNumber: obj.gate_number,
                                    remark: final_remark,
                                    from_location: "QLTLOCATN",
                                    to_location: to_location
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + token,
                                },
                                success: function (data, status, xhr) {
                                    // resolve(data);
                                    // alert("hi")
                                    console.log(data.data);
                                },
                                error: function (xhr) {
                                    $("#loader11").removeClass("ibox-content")
                                    $("#loader11").removeClass("sk-loading")
                                    $("#spin11").addClass("d-none")
                                    if (xhr.status == 498) {
                                        $.tokenError();
                                    }
                                    else if (xhr.status >= 400 && xhr.status < 500) {

                                        $.errorMessage(xhr.responseJSON.message);
                                    }
                                    else {
                                        $.errorMessage(xhr.responseJSON.error)
                                    }
                                }
                            });
                        } else {
                            swal("", data.jde__simpleMessage, "error").then(() => {
                                $("#message").addClass("d-none")
                                $("#loader11").removeClass("ibox-content")
                                $("#loader11").removeClass("sk-loading")
                                $("#spin11").addClass("d-none")
                                formReset();
                                // resolve(data);
                            })
                        }
                        resolve(data);
                    },
                    error: function (xhr) {
                        reject(xhr);
                    }
                });
            });
        }

        

        async function datasend(flag,reject_remark) {

            // alert("datasend")

            // console.log("reject_remarkreject_remarkreject_remarkreject_remark",reject_remark);

            $("#loader11").addClass("ibox-content")
            $("#loader11").addClass("sk-loading")
            $("#spin11").removeClass("d-none")

            var accept_qty = $("#accept").val()
            var reject_qty = $("#reject").val()

            var accept_sum = Number(accept_qty);
            var reject_sum = Number(reject_qty);

            var item_number = $("#F43121_LITM").val();

            var payloads = [];

            if (accept_sum > 0) {
                payloads.push({
                    from_branch_plant: "20100",
                    to_branch_plant: "20100",
                    grid_data: [
                        {
                            item_number: item_number,
                            quantity: accept_qty,
                            from_location: "QLTLOCATN",
                            to_location: "PRILOCATN"
                        }
                    ],
                    P4113_Version: "IAL000001",
                    remark:document_nbr
                });
            }
            if (reject_sum > 0) {
                payloads.push({
                    from_branch_plant: "20100",
                    to_branch_plant: "20100",
                    grid_data: [
                        {
                            item_number: item_number,
                            quantity: reject_qty,
                            from_location: "QLTLOCATN",
                            to_location: "REJLOCATN",
                        }
                    ],
                    P4113_Version: "IAL000002",
                    remark:document_nbr+reject_remark
                });
            }

            for (var i = 0; i < payloads.length; i++) {
                try {
                    console.log(payloads[i]);
                    let final_solution = await sendPayload(payloads[i]);
                    console.log("final_solution", final_solution);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
            return flag;
        }

        function formReset() {
            $("#accept").val("")
            $("#reject").val("")
            $("#in_review").val("")
        }

        console.log("total", total);
        let reject_remark
        // console.log("q", +q);
        if (reject == +q && accept == 0 && in_review == 0) {
            $("#first_in_review_remark_note1").val("")
            $("#first_reject_remark_note1").val("")
            $("#first_in_review_remark_note").val("")
            $("#first_reject_remark").removeClass("d-none")
            $("#first_inreview_remark").addClass("d-none")
            $("#both_remark").addClass("d-none")
            $("#message").addClass("d-none")
            if ($("#first_reject_remark_note").val().length != 0) {
            if ($("#first_reject_remark_note").val().length <= 19) {
                if(($("#first_reject_remark_note").val().length != 0)){
                    reject_remark=$("#first_reject_remark_note").val()
                }
                let flag = 1;
                datasend(flag,reject_remark).then((value) => {
                    console.log(flag);
                    console.log(value);
                    if (value == 1) {
                        // tab.destroy();s
                        // stored_data = []
                        // fetchData();
                        // window.location.reload();

                        try {
                            new_obj = []
                            renderDataTable_new_obj = []
                            stored_data = []
                            // remark_count_reject=1
                            // $("#both_remark").addClass("d-none");
                            // $("#first_reject_remark").addClass("d-none");
                            // $("#first_inreview_remark").addClass("d-none");
                            // $("#first_reject_remark_note").val("")
                        } catch {

                        }
                        recall()
                        $("#loader11").removeClass("ibox-content")
                        $("#loader11").removeClass("sk-loading")
                        $("#spin11").addClass("d-none")
                        $("#myModal5").modal('hide');
                    }
                    formReset();
                    $("#loader11").removeClass("ibox-content")
                    $("#loader11").removeClass("sk-loading")
                    $("#spin12").addClass("d-none")
                });
            }else{
                $.errorMessage("Remark is less then 19 character")
            }
            } else {
                if (remark_count_reject > 1) {
                    $.errorMessage("Please Add Remark")
                } else {
                    remark_count_reject++;
                    console.log(remark_count_reject);
                }
            }
        }
        else if (in_review == +q && reject == 0 && accept == 0) {

            // alert("asdfgh")

            if(total_qty_row==0){

            $("#loader11").addClass("ibox-content")
            $("#loader11").addClass("sk-loading")
            $("#spin11").removeClass("d-none")

            var modal_vendor_name = $("#modal_vendor_name").val()
            var modal_po_nbr = $("#modal_po_nbr").val()
            var modal_document_nbr = $("#modal_document_nbr").val()
            var branch_number = $("#F43121_MCU").val()
            var item_number = $("#F43121_LITM").val();
            var modal_vendor_code = $("#modal_vendor_code").val()
            var modal_po_type = $("#modal_po_type").val()
            var modal_type = $("#modal_type").val()
            var purchase_order = $("#F43121_DOC").val()
            var receivedQuantity = $("#F43121_UREC").val()
            var accept_qty = $("#accept").val()
            var reject_qty = $("#reject").val()
            var review_qty = $("#in_review").val()
            var modal_invoice_nbr = $("#modal_invoice_nbr").val();
            var modal_invoice_date = $("#modal_invoice_date").val();
            var modal_line_number = $("#modal_line_number").val();
            var modal_company_code = $("#modal_company_code").val();
            var Description = $("#Description").val();
            var work_order_number = $("#work_order_number").val()
            var work_order_type = $("#work_order_type").val()

            $("#first_inreview_remark").removeClass("d-none")
            $("#first_reject_remark").addClass("d-none")
            $("#both_remark").addClass("d-none")
            $("#message").addClass("d-none")

            let inReview = Number(in_review)

            $("#first_reject_remark_note").val("")
            $("#first_in_review_remark_note1").val("")
            $("#first_reject_remark_note1").val("")

            if ($("#first_in_review_remark_note").val().length != 0) {
                if ($("#first_in_review_remark_note").val().length <= 19) {
                    
                    $.ajax({
                        type: "POST",
                        url: `${[test[0].url]}/quality/add`,
                        async: false,
                        data: JSON.stringify({
                            item_code: item_number,
                            po_type: modal_po_type,
                            po_number: modal_po_nbr,
                            receiptNumber: $("#modal_document_nbr").val(),
                            receipt_type: modal_type,
                            branch_plant: obj.company_code,
                            received_quantity: +receivedQuantity,
                            accept_quantity: 0,
                            reject_quantity: 0,
                            inreview_quantity: 0,
                            vendor_code: modal_vendor_code,
                            vendor_name: modal_vendor_name,
                            vendor_invoice_number: modal_invoice_nbr,
                            vendor_invoice_date: modal_invoice_date,
                            po_company_code: modal_company_code,
                            line_number: modal_line_number,
                            description: Description,
                            work_order_type: obj.work_order_type,
                            work_order_number: obj.workOrderNumber,
                            gateNumber: obj.gate_number,
                            total_qty: inReview,
                            remark: $("#first_in_review_remark_note").val()
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                        success: function (data, status, xhr) {
    
                            console.log("xhr : ", xhr);
    
                            console.log(data.data);
                            try {
                                new_obj = []
                                renderDataTable_new_obj = []
                                stored_data = []
                                // tab.destroy();
                                console.log("tabtabtabtabtabtabtabtab",tab);
                                $("#Dtable").destroy();
                                // $('#Dtable_tbodyy').empty();
                                // remark_count_reject=1
                                // $("#both_remark").addClass("d-none");
                                // $("#first_reject_remark").addClass("d-none");
                                // $("#first_inreview_remark").addClass("d-none");
                                // $("#first_reject_remark_note").val("")
                            } catch {
    
                            }
                            recall()
                            $("#myModal5").modal('hide');
                            $("#loader11").removeClass("ibox-content")
                            $("#loader11").removeClass("sk-loading")
                            $("#spin11").addClass("d-none")
                        },
                        error: function (xhr) {
    
                            console.log("error xhr: ", xhr);
                            $("#loader11").removeClass("ibox-content")
                            $("#loader11").removeClass("sk-loading")
                            $("#spin11").addClass("d-none")
                            if (xhr.status == 498) {
                                $.tokenError();
                            }
                            else if (xhr.status >= 400 && xhr.status < 500) {
    
                                $.errorMessage(xhr.responseJSON.message);
                            }
                            else {
                                $.errorMessage(xhr.responseJSON.error)
                            }
                        }
                    });
                }else{
                    $.errorMessage("Remark is less then 19 character")
                }
            } else {
                if (remark_count_inreview > 1) {
                    $.errorMessage("Please Add Remark")
                } else {
                    remark_count_inreview++;
                    // console.log(remark_count);
                }
            }
        }else{
            $("#loader11").removeClass("ibox-content")
            $("#loader11").removeClass("sk-loading")
            $("#spin11").addClass("d-none")
            $.errorMessage("Do not accept entire quantity In-review")
        }

        }
        else if (in_review == 0 && reject == 0 && accept == +q) {

            $("#first_reject_remark_note").val("")
            $("#first_in_review_remark_note1").val("")
            $("#first_reject_remark_note1").val("")
            $("#first_in_review_remark_note").val("")

            $("#both_remark").addClass("d-none")
            $("#first_reject_remark").addClass("d-none")
            $("#first_inreview_remark").addClass("d-none")

            let flag = 1;
            datasend(flag).then((value) => {
                console.log(flag);
                console.log(value);
                if (value == 1) {

                    try {
                        new_obj = []
                        renderDataTable_new_obj = []
                        stored_data = []
                        // remark_count_reject=1
                        // $("#both_remark").addClass("d-none");
                        // $("#first_reject_remark").addClass("d-none");
                        // $("#first_inreview_remark").addClass("d-none");
                        // $("#first_reject_remark_note").val("")
                    } catch {

                    }
                    recall()

                    // location.reload();

                    $("#loader11").removeClass("ibox-content")
                    $("#loader11").removeClass("sk-loading")
                    $("#spin11").addClass("d-none")
                    $("#myModal5").modal('hide');
                }
                formReset();
                $("#loader11").removeClass("ibox-content")
                $("#loader11").removeClass("sk-loading")
                $("#spin11").addClass("d-none")

            });
        }
        else if (total == +q) {

            // alert("lkjhgfd")
            if (reject > 0 && Number(in_review) == 0) {
                $("#first_in_review_remark_note").val("")
                $("#first_reject_remark_note1").val("")
                $("#first_in_review_remark_note1").val("")
                $("#both_remark").addClass("d-none")
                $("#first_reject_remark").removeClass("d-none")
                $("#first_inreview_remark").addClass("d-none")
                $("#message").addClass("d-none")
            }
            if (inReview > 0 && reject == 0) {
                $("#first_reject_remark_note").val("")
                $("#first_reject_remark_note1").val("")
                $("#first_in_review_remark_note1").val("")
                $("#both_remark").addClass("d-none")
                $("#first_reject_remark").addClass("d-none")
                $("#first_inreview_remark").removeClass("d-none")
                $("#message").addClass("d-none")
            }
            if (Number(in_review) > 0 && reject > 0) {
                $("#first_in_review_remark_note").val("")
                $("#first_reject_remark_note").val("")
                $("#both_remark").removeClass("d-none")
                $("#first_reject_remark").addClass("d-none")
                $("#first_inreview_remark").addClass("d-none")
                $("#message").addClass("d-none")
            }
            if (($("#first_in_review_remark_note").val().length != 0 && $("#first_reject_remark_note").val().length == 0) || ($("#first_reject_remark_note").val().length != 0 && $("#first_in_review_remark_note").val().length == 0) || ($("#first_reject_remark_note1").val().length != 0 && $("#first_in_review_remark_note1").val().length != 0)) {
                    
                    if(($("#first_in_review_remark_note").val().length != 0 && $("#first_reject_remark_note").val().length == 0 && $("#first_in_review_remark_note").val().length <= 19 && $("#first_reject_remark_note").val().length == 0) || ($("#first_reject_remark_note").val().length != 0 && $("#first_in_review_remark_note").val().length == 0 && $("#first_reject_remark_note").val().length <=19 && $("#first_in_review_remark_note").val().length == 0) || ($("#first_reject_remark_note1").val().length <= 19 && $("#first_in_review_remark_note1").val().length <= 19 && $("#first_reject_remark_note1").val().length != 0 && $("#first_in_review_remark_note1").val().length != 0)){
                        if($("#first_reject_remark_note1").val().length != 0){
                            reject_remark=$("#first_reject_remark_note1").val()
                        }
                        if($("#first_reject_remark_note").val().length != 0){
                            reject_remark=$("#first_reject_remark_note").val()
                        }

                        let flag = 1;
                        datasend(flag,reject_remark).then((value) => {
                            console.log(flag);
                            console.log(value);
                            if (value == 1) {
                                // location.reload();
        
                                try {
                                    new_obj = []
                                    renderDataTable_new_obj = []
                                    stored_data = []
                                    // remark_count_both=1
                                    // $("#both_remark").addClass("d-none");
                                    // $("#first_reject_remark").addClass("d-none");
                                    // $("#first_inreview_remark").addClass("d-none");
                                    // $("#first_in_review_remark_note").val("")
                                    // $("#first_reject_remark_note").val("")
                                    // $("#first_reject_remark_note").val("")
                                    // $("#first_in_review_remark_note").val("")
                                    // $("#first_reject_remark_note1").val("")
                                    // $("#first_in_review_remark_note1").val("")
                                } catch {
        
                                }
                                recall()
                                $("#loader11").removeClass("ibox-content")
                                $("#loader11").removeClass("sk-loading")
                                $("#spin11").addClass("d-none")
                                $("#myModal5").modal('hide');
                            }
                            formReset();
        
                            $("#loader11").removeClass("ibox-content")
                            $("#loader11").removeClass("sk-loading")
                            $("#spin11").addClass("d-none")
                        });
                    }else{
                        $.errorMessage("Remark is less then 19 character")
                    }
                
            } else {
                if (remark_count_both > 1) {
                    $.errorMessage("Please Add Remark")
                } else {
                    remark_count_both++;
                    // console.log(remark_count);
                }
            }
        }
        else {
            $("#both_remark").addClass("d-none")
            $("#first_reject_remark").addClass("d-none")
            $("#first_inreview_remark").addClass("d-none")
            let len = $(".validate").length;
            for (let i = 0; i < len; i++) {
                let val = $(".validate")[i];

                if ($(val).val() != "") {
                    $(val).css("border", "1px solid #e5e6e7")

                    if (i == $(".validate").length - 1) {
                        if (total >= q || total < q) {
                            $("#message").removeClass("d-none")
                            $(".validate").css("border", "1px solid #24537f")
                            formReset();
                        }
                        else {
                            let close = $(".close")[1];
                            // $(close).trigger("click");
                            formReset();
                        }
                    }
                }
                else {
                    $("#message").removeClass("d-none")
                    $(val).css("border", "1px solid #24537f")
                    formReset();
                }
            }

        }

    }
    );

    $("#Dtable1").on("click", ".view", function () {

        var raw = $(this).closest("tr").children();
        console.log(raw);
        var row = tab3.row(raw).data().receipt_number;
        console.log("receiptNumber", row);

        // console.log("row",row);
        // for(let i=0;i<row;i++){
        //     console.log("row.receiptNumber",row.receiptNumber);
        // }

        $("#loader1").addClass("ibox-content")
        $("#loader1").addClass("sk-loading")
        $("#spin1").removeClass("d-none")


        $.ajax({
            type: 'GET',
            url: `${[test[0].url]}/quality/get?gateNumber=${obj.gate_number}&receiptNumber=${row}`,
            // url: `${[test[0].url]}/quality/get?gateNumber=${obj.gate_number}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            success: function (data) {
                // Create DataTable using the received data

                // sessionStorage.setItem("qtyGateNumber",JSON.stringify(data.data[0]))

                // if(data.data.)
                console.log(data.data);

                $('#myModal6').modal('show');
                if (data.data[0].work_order_number != "0" && data.data[0].work_order_number != null) {
                    $("#receipt_number").addClass("d-none");
                    $("#receipt_type").addClass("d-none");
                    $("#modal_vendor_name1").val(data.data[0].work_order_number).css("font-weight", "bold");
                    $("#modal_vendor_code1").val(data.data[0].work_order_type).css("font-weight", "bold");
                } else {
                    $("#modal_work_order_type").addClass("d-none");
                    $("#modal_work_order_number").addClass("d-none");
                    $("#modal_receipt_number1").val(data.data[0].receiptNumber).css("font-weight", "bold");
                    $("#modal_receipt_type1").val(data.data[0].receipt_type).css("font-weight", "bold");
                }

                $("#loader1").removeClass("ibox-content")
                $("#loader1").removeClass("sk-loading")
                $("#spin1").addClass("d-none")
                $("#getdatabase").removeClass("d-none")
                tab2 = $("#Dtable_view").DataTable({
                    data: data.data, // Assuming data.data contains the necessary array of objects
                    columns: [
                        // { data: "id" },
                        { data: "item_code" },
                        { data: "description" },
                        { data: "received_quantity" },
                        { data: "accept_quantity" },
                        { data: "reject_quantity" },
                        { data: "inreview_quantity" },
                        { data: "branch_plant" },
                        { data: "document_number" },
                        { data: "document_type" },
                        { data: "from_location" },
                        { data: "to_location" },
                        { data: "remark" },
                    ],
                    columnDefs: [
                        {
                            "defaultContent": "-",
                            "targets": "_all"
                        },
                        { responsivePriority: 1, targets: 0 },
                        { responsivePriority: -2, targets: 7 }
                    ],
                    rowCallback: function (row, data, index) {
                        var labelColor = ""; // This will store the color value based on the label value

                        // console.log("color data" , data.document_type);
                        // Map the label value to the corresponding color value
                        switch (data.document_type) {
                            case "IT":
                                labelColor = "#28a745"; // Blue color
                                break;
                            case "IR":
                                labelColor = "#dc3545"; // Gray color
                                break;
                        }

                        // Apply the labelColor to the row text
                        $(row).find("td").css("color", labelColor);
                        $(row).find("button").css("color", labelColor);
                        // $(row).find(".cancel").css("border-color", labelColor);
                        // let back_color = $(row).find(".cancel").css("color");

                        // $(row).find(".cancel").hover(
                        //     function() {
                        //       // Code to be executed when the mouse enters the button
                        //       $(this).css('background-color', labelColor);
                        //       $(this).css('color', "white");
                        //     },
                        //     function() {
                        //       // Code to be executed when the mouse leaves the button
                        //       $(this).css('background-color', '');
                        //       $(this).css('color', labelColor);
                        //     }
                        //   );
                    },
                    language: {
                        'paginate': {
                            'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
                            'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
                        }
                    },
                    dom: '<"top">t<"bottom"ilp>',
                    ordering: true,
                    lengthMenu: [5, 10, 20, 25, 50],
                    pagingType: "simple_numbers",
                    select: true,
                    // Other DataTable configurations
                });
                tab2.column(6).visible(false);
                // tab1.column(1).visible(false);
                // tab1.column(4).visible(false);
                tab2.column(5).visible(false);

                // Your other success callback code here
            },
            complete: () => {
                // Your complete callback code here
            },
        });


    });

    $("#myModal6").on("hide.bs.modal", function () {
        // Clear the contents of the modal
        tab2.destroy();
        console.log("DataTable destroyed")
        $("#tbodyy").empty();
    });

    $("#Dtable1").on("click", ".in_review", function () {

        $("#loader10").removeClass("ibox-content")
        $("#loader10").removeClass("sk-loading")
        $("#spin10").addClass("d-none")

        $("#open_quanity_show").removeClass("d-none")

        var raw = $(this).closest("tr").children();
        console.log(raw);
        var row = tab3.row(raw).data();
        console.log(row);
        if (row.inreview_quantity < 0) {
            row.inreview_quantity = row.inreview_quantity * (-1)
        }
        $('#myModal7').modal('show');

        console.log("row.item_code", row.item_code);
        $("#F43121_LITM2").val(row.item_code).css("font-weight", "bold");
        $("#F43121_MCU2").val(obj.business_unit.split(" ").join("")).css("font-weight", "bold");
        $("#Description2").val(row.description).css("font-weight", "bold");
        $("#modal_document_nbr2").val(row.receipt_number).css("font-weight", "bold");

        document_nbr=row.receipt_number+"OV"

        console.log("myModal7",document_nbr);

        $("#F43121_UREC2").val(row.received_quantity).css("font-weight", "bold");
        $("#open_quanity2").val(row.inreview_quantity).css("font-weight", "bold");
        $("#modal_vendor_code2").val(obj.vendor_code).css("font-weight", "bold");
        $("#modal_po_nbr2").val(obj.po_number).css("font-weight", "bold");
        $("#modal_vendor_name2").val(obj.vendorname).css("font-weight", "bold");
        $("#modal_po_type2").val(obj.po_type).css("font-weight", "bold");
        $("#modal_invoice_nbr2").val(obj.invoice_number).css("font-weight", "bold");
        $("#modal_invoice_date2").val(obj.invoice_date).css("font-weight", "bold");
        $("#modal_line_number2").val(row.F43121_LNID).css("font-weight", "bold");
        $("#modal_company_code2").val(row.F43121_KCOO).css("font-weight", "bold");
        $("#deliveryChallanNumber2").val(obj.deliveryChallanNumber).css("font-weight", "bold");
        $("#work_order_number2").val(row.work_order_number).css("font-weight", "bold");
        $("#work_order_type2").val(row.work_order_type).css("font-weight", "bold");

        // console.log("workOrderNumber  ", obj.workOrderNumber);
        // console.log("F4801_DOCO  ", row.F4801_DOCO);

        // quality = obj.details.map((value) => value.receipt_number);
        // $("#modal_document_nbr").val(row.receipt_number).css("font-weight", "bold");

        // alert(store_in_review);
        disab = this;


        // console.log("disab", disab);


        q = row.inreview_quantity;

        // console.log(q);

    });
    $("#myModal7").on('hide.bs.modal', function () {
        // location.reload()
        // try {
        //     new_obj = []
        //     renderDataTable_new_obj = []
        // } catch {

        // }
        // recall()

        try {
            $("#accept1").val("")
            $("#reject1").val("")
            $("#second_reject_remark").addClass("d-none")
            $("#second_reject_remark_note").val("")

            second_remark_count = 1
        } catch {

        }
        $("#message1").addClass("d-none")
        $(".validate").css("border", "1px solid #e5e6e7")
    })

    // This code is for show the remark
    var remark = []
    // $.ajax({
    //     url: `${[test[0].url]}/remarks`,
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //     },
    //     success: function (data, status, xhr) {

    //         data.data.map(value => {
    //             if (value.gate_number == $("#gate_number").html()) {
    //                 remark.push(value)
    //             }
    //         })

    //     },
    //     error: function (xhr) {
    //         if (xhr.status == 498) {
    //             $.tokenError();
    //         }
    //     },
    //     complete: () => {

    //         // console.log(remark);

    //         // $("#remark_table tr").length

    //         $.fn.DataTable.ext.pager.numbers_length = 5;

    //         for (let i = 0; i < remark.length - 1; i++) {
    //             $("#remarks_row").trigger("click")
    //         }

    //         for (let i = 0; i < remark.length; i++) {

    //             // $(".re_gate_id")[i].value = remark[i].gate_number
    //             $(".re_username")[i].value = remark[i].username
    //             $(".re_remark")[i].value = remark[i].remark
    //             $(".re_date")[i].value = remark[i].timestamp
    //             $(".re_label")[i].value = remark[i].label

    //         }

    //         $("#remark_table").dataTable({
    //             dom: '<"top">t<"bottom"ilp>',
    //             // ordering: true,
    //             // processing : true,
    //             lengthMenu: [5, 10, 20, 25, 50],
    //         })
    //     }
    // })







    $("#submit_invoice").click((e) => {
        

        // entity.push(details)
        // console.log(entity);
        e.preventDefault();

        let matched_quantity = renderDataTable_new_obj.map((value) => value.received_quantity == value.accept_quantity + value.reject_quantity ? true : false)

        if ($("#mandatory_msg").val().length != 0) {
            let today = new Date();
            let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
            let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');
            // console.log(date +"  "+time );

            // let receipt_doc = obj.details.

            console.log("submit_invoice rowCount", rowCount);

            if (rowCount == 0) {

                // $("#Dtable1 tbody tr").map((value)=> 

                if (!matched_quantity.includes(false)) {

                    $("#loader1").addClass("ibox-content")
                    $("#loader1").addClass("sk-loading")
                    $("#spin1").removeClass("d-none")

                    $.ajax({
                        url: `${[test[0].url]}/remark/add`,
                        type: 'POST',
                        data: JSON.stringify({

                            gate_number: $("#gate_number").html(),
                            remark: $("#mandatory_msg").val().toUpperCase(),
                            status: 300,
                            username: $(".name")[1].innerText,
                            timestamp: `${date} ${time}`
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                        success: function (data, status, xhr) {
                            $.ajax({
                                url: `${[test[0].url]}/remark/add`,
                                type: 'POST',
                                data: JSON.stringify({

                                    gate_number: $("#gate_number").html(),
                                    remark: "SUCCESSFULLY UPDATED FROM QUALITY",
                                    status: 300,
                                    username: $(".name")[1].innerText,
                                    timestamp: `${date} ${time}`
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + token,
                                },
                                success: function (data, status, xhr) {

                                    if (xhr.status == 200) {

                                        // console.log(...entity);


                                        let sessionString = sessionStorage.getItem('gateid')
                                        let Gate_no = JSON.parse(sessionString);
                                        console.log(Gate_no);

                                        obj.status = { code: 400 };
                                        // delete obj.details;
                                        // delete obj.tags;


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
                                                                    if (xhr.status == 200) {
                    
                    
                                                                        console.log("qwertyuiasdfghjk");
                    
                                                                        $.sendEmail(data.data, "Finance", convertedFiles)
                    
                                                                        setTimeout(() => {
                                                                            swal("", "Successfully Updated", "success").then(() => {
                                                                                window.open(`../template/quality.jsp`, '_self');
                                                                            })
                                                                        }, 500);
                    
                                                                    }
                                                                    else {
                    
                                                                        $.errorMessage(xhr.responseJSON.message);
                                                                    }
                                                                },
                                                                complete: function () {
                                                                    $("#loader1").removeClass("ibox-content")
                                                                    $("#loader1").removeClass("sk-loading")
                                                                    $("#spin1").addClass("d-none");
                                                                },
                                                                error: function (xhr) {
                    
                                                                    if (xhr.status == 498) {
                                                                        $.tokenError();
                                                                    }
                                                                    else if (xhr.status >= 400 && xhr.status < 500) {
                    
                                                                        $.errorMessage(xhr.responseJSON.message);
                                                                    }
                                                                    else {
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
                                    else {

                                        $.errorMessage(xhr.responseJSON.message);
                                    }


                                },
                                error: function (xhr) {
                                    if (xhr.status == 498) {
                                        $.tokenError();
                                    }
                                    else if (xhr.status >= 400 && xhr.status < 500) {

                                        $.errorMessage(xhr.responseJSON.message);
                                    }
                                    else {
                                        $.errorMessage(xhr.responseJSON.error)
                                    }
                                }
                            })
                        }
                    })

                }
                else {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-sm btn-secondary mx-1',
                            cancelButton: 'btn btn-sm btn-danger mx-1'
                        },
                        buttonsStyling: false
                    })

                    swalWithBootstrapButtons.fire({
                        // title: 'Are you sure?',
                        text: `Please Clear In-review Quantity`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'cancel!',
                        reverseButtons: true
                    })
                }
            } else {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-sm btn-secondary mx-1',
                        cancelButton: 'btn btn-sm btn-danger mx-1'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    // title: 'Are you sure?',
                    text: `Please Clear Accept/Reject Quantity Row`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'cancel!',
                    reverseButtons: true
                })
            }


        }
        else {
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

    $("#reject_invoice").click((e) => {

        // entity.push(details)
        // console.log(entity);
        e.preventDefault();

        if ($("#mandatory_msg").val().length != 0) {
            let today = new Date();
            let date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split("/").join("-");
            let time = String(today.getHours()).padStart(2, '0')+':'+String(today.getMinutes()).padStart(2, '0')+':'+String(today.getSeconds()).padStart(2, '0');

            // console.log(date +"  "+time );

            $.ajax({
                url: `${[test[0].url]}/remark/add`,
                type: 'POST',
                data: JSON.stringify({

                    gate_number: $("#gate_number").html(),
                    remark: $("#mandatory_msg").val(),
                    status: 300,
                    username: $(".name")[1].innerText,
                    timestamp: `${date} ${time}`
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                success: function (data, status, xhr) {

                    console.log(data);

                    if (xhr.status == 200) {


                        let sessionString = sessionStorage.getItem('gateid')
                        let Gate_no = JSON.parse(sessionString);
                        console.log(Gate_no);

                        // console.log(gate_no);

                        obj.status = { code: 200 };

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
                                if (xhr.status == 200) {
                                    $.sendEmail(data.data, "Error", convertedFiles)

                                    setTimeout(() => {
                                        window.open(`../template/quality.jsp`, '_self');
                                    }, 500);
                                }
                                else {

                                    $.errorMessage(xhr.responseJSON.message);
                                }

                            },
                            error: function (xhr) {

                                if (xhr.status == 498) {
                                    $.tokenError();
                                }
                                else if (xhr.status >= 400 && xhr.status < 500) {

                                    $.errorMessage(xhr.responseJSON.message);
                                }
                                else {
                                    $.errorMessage(xhr.responseJSON.error)
                                }
                            },
                        });
                    }
                    else {

                        $.errorMessage(xhr.responseJSON.message);
                    }

                },
                error: function (xhr) {
                    if (xhr.status == 498) {
                        $.tokenError();
                    }
                    else if (xhr.status >= 400 && xhr.status < 500) {

                        $.errorMessage(xhr.responseJSON.message);
                    }
                    else {
                        $.errorMessage(xhr.responseJSON.error)
                    }
                }
            })



        }
        else {

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


    $("#back_invoice").click(() => {

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
  
                            window.open("../template/quality.jsp", "_self");
                            
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
    })

});